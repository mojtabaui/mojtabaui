import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { ProjectTrack } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isValidIntake, toLatinDigits } from "@/lib/persian-months";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

/**
 * فهرست اسم‌ها رو از یک متن چندخطی درمیاره.
 * از اکسل که کپی می‌شه ستون‌ها با tab جدا می‌شن، پس فقط ستون اول رو برمی‌داریم.
 * شمارهٔ ردیف ابتدای خط («۱. علی») هم اگه بود پاک می‌شه.
 */
function parseNames(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.split("\t")[0])
    .map((line) => line.replace(/^\s*[\d۰-۹]+\s*[.)-]\s*/, ""))
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * POST → افزودن دانشجو (یک نفر یا یک فهرست).
 * body: { names: string, track: "UI" | "UX", intakeMonth: "1405-04" }
 *
 * کسی که با همین اسم و همین ماه و همین دوره از قبل ثبت شده دوباره اضافه نمی‌شه.
 */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const body = await req.json();
  const names = parseNames(String(body.names ?? ""));
  const track = String(body.track ?? "") as ProjectTrack;
  const intakeMonth = toLatinDigits(String(body.intakeMonth ?? "")).trim();

  if (names.length === 0) {
    return NextResponse.json({ error: "هیچ اسمی وارد نشده" }, { status: 400 });
  }
  if (names.length > 300) {
    return NextResponse.json(
      { error: "هر بار حداکثر ۳۰۰ نفر — فهرست رو تکه‌تکه کنید" },
      { status: 400 }
    );
  }
  if (track !== "UI" && track !== "UX") {
    return NextResponse.json({ error: "دوره باید UI یا UX باشه" }, { status: 400 });
  }
  if (!isValidIntake(intakeMonth)) {
    return NextResponse.json(
      { error: "ماه ثبت‌نام معتبر نیست (مثل ۱۴۰۵-۰۴)" },
      { status: 400 }
    );
  }

  // تکراری‌های داخل خودِ فهرست
  const unique: string[] = [];
  const dupInList: string[] = [];
  for (const n of names) {
    if (unique.includes(n)) dupInList.push(n);
    else unique.push(n);
  }

  // کسایی که قبلاً توی همین ماه و همین دوره ثبت شدن
  const existing = await prisma.studentProject.findMany({
    where: { track, intakeMonth, studentName: { in: unique } },
    select: { studentName: true },
  });
  const existingNames = new Set(existing.map((s) => s.studentName));
  const toCreate = unique.filter((n) => !existingNames.has(n));

  if (toCreate.length > 0) {
    await prisma.studentProject.createMany({
      data: toCreate.map((studentName) => ({ studentName, track, intakeMonth })),
    });
  }

  return NextResponse.json(
    {
      ok: true,
      added: toCreate.length,
      skipped: [...existingNames],
      duplicatesInList: dupInList,
    },
    { status: 201 }
  );
}
