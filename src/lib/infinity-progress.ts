import { toLatinDigits } from "@/lib/persian-months";

/**
 * پیگیری دانشجوهای دوره‌های بی‌نهایت.
 * این فایل هم سمت سرور (API) و هم توی مرورگر (فرم افزودن) استفاده می‌شه،
 * پس نباید چیزی از سمت سرور import کنه.
 */

export const WEEK_COUNT = 10;
export const WEEKS: readonly number[] = Array.from({ length: WEEK_COUNT }, (_, i) => i + 1);

export const INFINITY_COURSES = [
  { slug: "ui-infinity", label: "رابط کاربری", short: "UI" },
  { slug: "ux-infinity", label: "تجربه کاربری", short: "UX" },
] as const;

export type InfinityCourseSlug = (typeof INFINITY_COURSES)[number]["slug"];

export function isInfinityCourse(value: string): value is InfinityCourseSlug {
  return INFINITY_COURSES.some((c) => c.slug === value);
}

export function courseLabel(slug: string): string {
  return INFINITY_COURSES.find((c) => c.slug === slug)?.label ?? slug;
}

/** فقط عددهای معتبر ۱ تا ۱۰، بدون تکرار و مرتب */
export function cleanWeeks(list: readonly number[]): number[] {
  return [...new Set(list)]
    .filter((n) => Number.isInteger(n) && n >= 1 && n <= WEEK_COUNT)
    .sort((a, b) => a - b);
}

/** هفتهٔ داده‌شده رو به فهرست اضافه می‌کنه یا ازش برمی‌داره */
export function applyWeek(list: readonly number[], week: number, done: boolean): number[] {
  const without = list.filter((w) => w !== week);
  return done ? cleanWeeks([...without, week]) : without;
}

export interface ParsedStudent {
  name: string;
  phone: string;
}

/**
 * شمارهٔ موبایل رو یکدست می‌کنه: رقم لاتین، بدون فاصله و خط تیره.
 * اکسل صفر اول رو می‌خوره («9123456789»)، پس اگه ده رقم و با ۹ شروع بشه صفر برمی‌گرده.
 */
export function normalizePhone(raw: string): string {
  let p = toLatinDigits(raw).replace(/[^\d+]/g, "");
  if (p.startsWith("+98")) p = "0" + p.slice(3);
  else if (p.startsWith("0098")) p = "0" + p.slice(4);
  if (/^9\d{9}$/.test(p)) p = "0" + p;
  return p;
}

/**
 * فهرست چسبانده‌شده از اکسل یا CSV رو به دانشجو تبدیل می‌کنه.
 * هر خط «نام» یا «نام ⇥ موبایل» (جداکننده تب یا ویرگول). شمارهٔ ردیف ابتدای خط
 * («۱. علی») و سطر عنوان («نام، موبایل») نادیده گرفته می‌شن.
 */
export function parseStudentLines(raw: string): ParsedStudent[] {
  const out: ParsedStudent[] = [];
  const lines = raw.split(/\r?\n/);
  lines.forEach((line, i) => {
    const cols = line.split(/\t|,|،/).map((c) => c.trim());
    const name = cols[0]?.replace(/^\s*[\d۰-۹]+\s*[.)-]\s*/, "").trim() ?? "";
    if (!name) return;
    // فاصله و خط تیره وسط شماره ممکنه، پس اول یکدستش می‌کنیم بعد طولش رو می‌سنجیم
    const phone =
      cols
        .slice(1)
        .map(normalizePhone)
        .find((p) => p.replace(/\D/g, "").length >= 7) ?? "";
    const looksLikeHeader =
      i === 0 && /^(نام|اسم|name|full\s*name)/i.test(name) && cols.length > 1 && !phone;
    if (looksLikeHeader) return;
    out.push({ name: name.slice(0, 120), phone });
  });
  return out;
}
