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

/** سالِ ورودی رو اعتبارسنجی می‌کنه: کوادکمپ سال نمی‌خواد، بقیه سال ۴ رقمی */
function normalizeInput(trackRaw: string, yearRaw: string) {
  const track = trackRaw as CertTrack;
  if (!TRACKS.includes(track)) return { error: "دوره نامعتبر است" as const };

  if (track === "QC") return { track, year: null };

  const year = toLatinDigits(yearRaw).trim();
  if (!/^\d{4}$/.test(year)) return { error: "سال باید ۴ رقم باشه (مثلاً ۱۴۰۵)" as const };
  return { track, year };
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

/** GET → پیش‌نمایش کد بعدی: /api/admin/certificates?track=UI&year=1405 */
export async function GET(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const norm = normalizeInput(
    req.nextUrl.searchParams.get("track") ?? "",
    req.nextUrl.searchParams.get("year") ?? ""
  );
  if ("error" in norm) {
    return NextResponse.json({ error: norm.error }, { status: 400 });
  }

  const seq = await nextSeqFor(norm.track, norm.year);
  return NextResponse.json({ code: buildCode(norm.track, norm.year, seq) });
}

/** POST → ساخت گواهی جدید با کد خودکار */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 403 });
  }

  const body = await req.json();
  const studentName = String(body.studentName ?? "").trim();
  const startDate = String(body.startDate ?? "").trim();

  if (!studentName) {
    return NextResponse.json({ error: "نام دانشجو رو وارد کنید" }, { status: 400 });
  }

  const norm = normalizeInput(String(body.track ?? ""), String(body.year ?? ""));
  if ("error" in norm) {
    return NextResponse.json({ error: norm.error }, { status: 400 });
  }
  const { track, year } = norm;

  // با کد خودکار می‌سازیم؛ اگه هم‌زمان دو نفر یه کد گرفتن (تداخل unique روی code)
  // شماره‌ی بعدی رو دوباره حساب می‌کنیم و تلاش می‌کنیم — حداکثر چند بار.
  for (let attempt = 0; attempt < 5; attempt++) {
    const seq = (await nextSeqFor(track, year)) + attempt;
    const code = buildCode(track, year, seq);

    try {
      const cert = await prisma.certificate.create({
        data: { code, studentName, track, year, startDate },
      });
      return NextResponse.json({ ok: true, certificate: cert }, { status: 201 });
    } catch (e) {
      // P2002 = نقض unique روی code؛ یعنی همون لحظه کد گرفته شد → دوباره تلاش
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        continue;
      }
      throw e;
    }
  }

  return NextResponse.json(
    { error: "ساخت کد ناموفق بود — دوباره تلاش کنید" },
    { status: 500 }
  );
}
