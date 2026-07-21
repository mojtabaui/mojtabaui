import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** ارقام فارسی (۰-۹) و عربی (٠-٩) رو به لاتین تبدیل می‌کنه */
function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

/** برچسب دوره بر اساس track */
function disciplineLabel(track: string): string {
  if (track === "UI") return "طراحی رابط کاربری";
  if (track === "UX") return "طراحی تجربه کاربری";
  return "کوادکمپ"; // QC
}

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "کد گواهی را وارد کنید" }, { status: 400 });
  }

  // نرمال‌سازی: ارقام فارسی→لاتین، حذف فاصله و خط‌تیره، حروف بزرگ.
  // این‌طوری «mu1405001»، «MU-1405-001» و «MU 1405 001» همه یکی می‌شن.
  const normalized = toLatinDigits(code)
    .toUpperCase()
    .replace(/[\s-]/g, "")
    .trim();

  // کدهای قدیمی فقط عدد بودن؛ کدهای جدید حرف و عدد. طول منطقی: ۳ تا ۱۴.
  if (!/^[A-Z0-9]{3,14}$/.test(normalized)) {
    return NextResponse.json({ error: "کد گواهی معتبر نیست" }, { status: 400 });
  }

  const cert = await prisma.certificate.findUnique({
    where: { code: normalized },
  });

  // پیدا نشدن یعنی گواهی نامعتبره، نه خطای سرور — پس ۲۰۰ برمی‌گردونیم
  if (!cert) {
    return NextResponse.json({ found: false });
  }

  const discipline = disciplineLabel(cert.track);
  // کوادکمپ سال نداره؛ بقیه با «دوره <سال>» نمایش داده می‌شن
  const courseTitle = cert.year ? `${discipline} — دوره ${cert.year}` : discipline;

  return NextResponse.json({
    found: true,
    studentName: cert.studentName,
    courseTitle,
    startDate: cert.startDate,
  });
}
