/**
 * ماه‌های شمسی — برای ماهِ ثبت‌نام دانشجوها.
 * توی دیتابیس به شکل «1405-04» ذخیره می‌شه تا مرتب‌سازی رشته‌ای درست کار کنه،
 * و برای نمایش به «تیر ۱۴۰۵» تبدیل می‌شه.
 */

export const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

/** ارقام فارسی/عربی رو به لاتین تبدیل می‌کنه */
export function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

/** ارقام لاتین رو به فارسی برمی‌گردونه (فقط برای نمایش) */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

/** «1405» + «04» → «1405-04» */
export function buildIntake(year: string, month: string): string {
  return `${toLatinDigits(year).trim()}-${toLatinDigits(month).trim().padStart(2, "0")}`;
}

/** «1405-04» معتبره؟ */
export function isValidIntake(value: string): boolean {
  const v = toLatinDigits(value).trim();
  if (!/^\d{4}-\d{2}$/.test(v)) return false;
  const m = Number(v.slice(5));
  return m >= 1 && m <= 12;
}

/** «1405-04» → «تیر ۱۴۰۵» */
export function intakeLabel(value: string): string {
  const v = toLatinDigits(value).trim();
  if (!isValidIntake(v)) return value;
  const year = v.slice(0, 4);
  const month = Number(v.slice(5));
  return `${PERSIAN_MONTHS[month - 1]} ${toPersianDigits(year)}`;
}
