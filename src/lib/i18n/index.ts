/**
 * پایهٔ دوزبانگی سایت.
 *
 * زبان از سه جا خونده می‌شه، به همین ترتیب: پارامتر ?lang توی آدرس،
 * کوکی، و آخرش فارسی. پارامتر برای وقتیه که لینک انگلیسی رو مستقیم برای
 * کسی می‌فرستیم؛ کوکی کاریه که باعث می‌شه بعد از اون، کاربر با کلیک روی
 * لینک‌های داخلی از انگلیسی نیفته بیرون. برای همین لینک‌های سایت لازم
 * نیست ?lang رو با خودشون حمل کنن.
 *
 * عمداً از روی زبان مرورگر تصمیم نمی‌گیریم — خیلی از هنرجوهای ایرانی هم
 * مرورگرشون انگلیسیه و بی‌دلیل سایت براشون انگلیسی می‌شد.
 */

export type Lang = "fa" | "en";

export const LANGS: Lang[] = ["fa", "en"];

export const DEFAULT_LANG: Lang = "fa";

/** کوکی‌ای که انتخاب زبان رو بین صفحه‌ها نگه می‌داره */
export const LANG_COOKIE = "lang";

/** پروکسی زبانِ حل‌شده رو با این هدر به رندر می‌رسونه */
export const LANG_HEADER = "x-lang";

/** یک سال — انتخاب زبان چیزی نیست که هر هفته عوض بشه */
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const DIR: Record<Lang, "rtl" | "ltr"> = {
  fa: "rtl",
  en: "ltr",
};

/** اسم هر زبان به خط خودش، برای دکمهٔ تعویض */
export const LANG_LABEL: Record<Lang, string> = {
  fa: "فارسی",
  en: "English",
};

/** ورودی ناشناخته رو به زبان معتبر تبدیل می‌کنه، وگرنه null */
export function toLang(value: string | null | undefined): Lang | null {
  return value === "fa" || value === "en" ? value : null;
}

/** مثل toLang ولی همیشه یک زبان می‌ده */
export function resolveLang(value: string | null | undefined): Lang {
  return toLang(value) ?? DEFAULT_LANG;
}

/** یک جفت متن رو به زبان جاری می‌رسونه */
export function pick<T>(pair: Record<Lang, T>, lang: Lang): T {
  return pair[lang];
}
