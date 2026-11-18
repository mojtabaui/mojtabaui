import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isInfinityCourse, parseStudentLines } from "@/lib/infinity-progress";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

/**
 * POST → افزودن دانشجوهای بی‌نهایت (یک نفر یا یک فهرست).
 * body: { lines: string, course: "ui-infinity" | "ux-infinity" }
 *
 * هر خط «نام» یا «نام ⇥ موبایل». کسی که توی همین دوره با همین موبایل
 * (یا، اگه موبایل نداره، با همین اسم) از قبل ثبت شده دوباره اضافه نمی‌شه.
 */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const body = await req.json();
  const course = String(body.course ?? "");
  const parsed = parseStudentLines(String(body.lines ?? ""));

  if (!isInfinityCourse(course)) {
    return NextResponse.json({ error: "دوره باید UI یا UX بی‌نهایت باشه" }, { status: 400 });
  }
  if (parsed.length === 0) {
    return NextResponse.json({ error: "هیچ اسمی وارد نشده" }, { status: 400 });
  }
  if (parsed.length > 500) {
    return NextResponse.json(
      { error: "هر بار حداکثر ۵۰۰ نفر — فهرست رو تکه‌تکه کنید" },
      { status: 400 }
    );
  }

  const existing = await prisma.infinityStudent.findMany({
    where: { course },
    select: { name: true, phone: true },
  });
  const keyOf = (s: { name: string; phone: string }) =>
    s.phone ? `p:${s.phone}` : `n:${s.name}`;
  const seen = new Set(existing.map(keyOf));

  const toCreate: { name: string; phone: string }[] = [];
  const skipped: string[] = [];
  for (const s of parsed) {
    const k = keyOf(s);
    if (seen.has(k)) {
      skipped.push(s.name);
    } else {
      seen.add(k);
      toCreate.push(s);
    }
  }

  if (toCreate.length > 0) {
    // createMany همه رو با یک زمان ثبت می‌کنه؛ میلی‌ثانیه‌ای فاصله می‌ذاریم
    // تا ترتیب فهرست همون ترتیب فایل بمونه
    const base = Date.now();
    await prisma.infinityStudent.createMany({
      data: toCreate.map((s, i) => ({
        name: s.name,
        phone: s.phone,
        course,
        createdAt: new Date(base + i),
      })),
    });
  }

  return NextResponse.json(
    { ok: true, added: toCreate.length, skipped },
    { status: 201 }
  );
}
