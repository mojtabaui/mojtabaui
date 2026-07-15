import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** ارقام فارسی (۰-۹) و عربی (٠-٩) رو به لاتین تبدیل می‌کنه */
function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "کد گواهی را وارد کنید" }, { status: 400 });
  }

  const normalized = toLatinDigits(code).trim();

  if (!/^\d{4,12}$/.test(normalized)) {
    return NextResponse.json({ error: "کد گواهی باید فقط عدد باشد" }, { status: 400 });
  }

  const cert = await prisma.certificate.findUnique({
    where: { code: normalized },
  });

  // پیدا نشدن یعنی گواهی نامعتبره، نه خطای سرور — پس ۲۰۰ برمی‌گردونیم
  if (!cert) {
    return NextResponse.json({ found: false });
  }

  const discipline = cert.track === "UI" ? "طراحی رابط کاربری" : "طراحی تجربه کاربری";

  return NextResponse.json({
    found: true,
    studentName: cert.studentName,
    courseTitle: `${discipline} — دوره ${cert.year}`,
    startDate: cert.startDate,
  });
}
