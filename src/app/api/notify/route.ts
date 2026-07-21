import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** ارقام فارسی (۰-۹) و عربی (٠-٩) رو به لاتین تبدیل می‌کنه */
function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

/**
 * شماره‌ی موبایل ایران رو نرمال می‌کنه به فرمت ۰۹xxxxxxxxx.
 * ورودی‌های ‎+98، ‎0098، ‎98 و بدون صفر هم پذیرفته می‌شن.
 * اگه معتبر نباشه null برمی‌گردونه.
 */
function normalizeIranMobile(raw: string): string | null {
  let d = toLatinDigits(raw).replace(/[\s()-]/g, "");
  if (d.startsWith("+98")) d = "0" + d.slice(3);
  else if (d.startsWith("0098")) d = "0" + d.slice(4);
  else if (d.startsWith("98")) d = "0" + d.slice(2);
  else if (d.startsWith("9") && d.length === 10) d = "0" + d;
  return /^09\d{9}$/.test(d) ? d : null;
}

export async function POST(req: NextRequest) {
  const { phone, name } = await req.json();

  const normalized = normalizeIranMobile(String(phone ?? ""));
  if (!normalized) {
    return NextResponse.json(
      { error: "شماره موبایل معتبر نیست (مثل ۰۹۱۲۳۴۵۶۷۸۹)" },
      { status: 400 }
    );
  }

  const cleanName = name ? String(name).trim().slice(0, 80) : null;

  // شماره‌ی تکراری خطا نیست — همون رکورد به‌روز می‌شه (اسم اگه اومده)
  await prisma.discountSubscriber.upsert({
    where: { phone: normalized },
    update: cleanName ? { name: cleanName } : {},
    create: { phone: normalized, name: cleanName },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
