import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma, type CertTrack } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildCode, codePrefix, nextSeq } from "@/lib/cert-code";

/** ارقام فارسی/عربی رو به لاتین تبدیل می‌کنه (سال ممکنه با کیبورد فارسی وارد شه) */
function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

const TRACKS: CertTrack[] = ["UI", "UX", "QC"];

function normalizeInput(trackRaw: string, yearRaw: string) {
  const track = trackRaw as CertTrack;
  if (!TRACKS.includes(track)) return { error: "دوره نامعتبر است" as const };
  if (track === "QC") return { track, year: null };

  const year = toLatinDigits(yearRaw).trim();
  if (!/^\d{4}$/.test(year)) return { error: "سال باید ۴ رقم باشه (مثلاً ۱۴۰۵)" as const };
  return { track, year };
}

/**
 * فهرست اسم‌ها رو از یک متن چندخطی درمیاره.
 * از اکسل که کپی می‌شه ستون‌ها با tab جدا می‌شن، پس فقط ستون اول رو برمی‌داریم.
 * شماره‌ی ردیف ابتدای خط («۱. علی») هم اگه بود پاک می‌شه.
 */
function parseNames(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.split("\t")[0])
    .map((line) => line.replace(/^\s*[\d۰-۹]+\s*[.)-]\s*/, ""))
    .map((line) => line.trim())
    .filter(Boolean);
}

/** شماره‌ی ترتیبیِ بعدی برای یک گروه (بر اساس پیشوند کد، نه track) */
async function nextSeqFor(track: CertTrack, year: string | null) {
  const prefix = codePrefix(track, year);
  const existing = await prisma.certificate.findMany({
    where: { code: { startsWith: prefix } },
    select: { code: true },
  });
  return nextSeq(existing.map((c) => c.code), track, year);
}

/**
 * POST → صدور گروهی.
 * body: { names: string, track, year, startDate }
 *
 * کسایی که با همین دوره و سال قبلاً گواهی گرفتن دوباره صادر نمی‌شن؛
 * کدِ قبلی‌شون برگردونده می‌شه تا ادمین ببینه و تصمیم بگیره.
 */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const body = await req.json();
  const names = parseNames(String(body.names ?? ""));
  const startDate = String(body.startDate ?? "").trim();

  if (names.length === 0) {
    return NextResponse.json({ error: "هیچ اسمی وارد نشده" }, { status: 400 });
  }
  if (names.length > 300) {
    return NextResponse.json(
      { error: "هر بار حداکثر ۳۰۰ نفر — فهرست رو تکه‌تکه کنید" },
      { status: 400 }
    );
  }

  const norm = normalizeInput(String(body.track ?? ""), String(body.year ?? ""));
  if ("error" in norm) {
    return NextResponse.json({ error: norm.error }, { status: 400 });
  }
  const { track, year } = norm;

  // اسم‌های تکراریِ داخل خودِ فهرست رو یک بار حساب می‌کنیم
  const unique: string[] = [];
  const dupInList: string[] = [];
  for (const n of names) {
    if (unique.includes(n)) dupInList.push(n);
    else unique.push(n);
  }

  // کسایی که قبلاً توی همین دوره و سال گواهی دارن
  const already = await prisma.certificate.findMany({
    where: { track, year, studentName: { in: unique } },
    select: { studentName: true, code: true },
  });
  const alreadyMap = new Map(already.map((c) => [c.studentName, c.code]));
  const toCreate = unique.filter((n) => !alreadyMap.has(n));

  if (toCreate.length === 0) {
    return NextResponse.json({
      ok: true,
      created: [],
      skipped: already.map((c) => ({ name: c.studentName, code: c.code })),
      duplicatesInList: dupInList,
    });
  }

  // کل دسته با شماره‌های پشت‌سرهم ساخته می‌شه. اگه وسط کار یکی دیگه
  // هم‌زمان کد گرفت (تداخل unique)، از شماره‌ی جدید دوباره تلاش می‌کنیم.
  let created: { name: string; code: string }[] = [];

  for (let attempt = 0; attempt < 5; attempt++) {
    const start = (await nextSeqFor(track, year)) + attempt;
    const batch = toCreate.map((name, i) => ({
      code: buildCode(track, year, start + i),
      studentName: name,
      track,
      year,
      startDate,
    }));

    try {
      await prisma.$transaction(
        batch.map((data) => prisma.certificate.create({ data }))
      );
      created = batch.map((b) => ({ name: b.studentName, code: b.code }));
      break;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        continue; // کد گرفته شده بود؛ از شماره‌ی بعدی دوباره
      }
      throw e;
    }
  }

  if (created.length === 0) {
    return NextResponse.json(
      { error: "صدور گروهی ناموفق بود — دوباره تلاش کنید" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      created,
      skipped: already.map((c) => ({ name: c.studentName, code: c.code })),
      duplicatesInList: dupInList,
    },
    { status: 201 }
  );
}
