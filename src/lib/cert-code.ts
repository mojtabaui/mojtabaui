import type { CertTrack } from "@prisma/client";

/**
 * کد گواهی مدرسه ملینا — دو نسل:
 *
 * ۱) قدیمی (۱۴۰۳ و ۱۴۰۴، فقط عدد — دست‌نخورده معتبر می‌مونن):
 *      1040301  →  [1]رابط/[2]تجربه  +  سال  +  ترتیب
 *
 * ۲) از ۱۴۰۵ به بعد (حرف‌دار، تا track از روی کد لو نره):
 *      • UI و UX:   MU + سال + شماره‌ی ۳ رقمی   → مثل MU1405001
 *        پیشوند MU برای هر دو دوره یکیه و شماره بین‌شون مشترکه،
 *        پس از روی کد معلوم نیست UI بوده یا UX.
 *      • کوادکمپ:   QC + شماره‌ی ۴ رقمی (بدون سال) → مثل QC0001
 */

/** بخش ثابت کدِ یک گروه — کدهای هم‌گروه شماره‌ی ترتیبیِ مشترک می‌گیرن */
export function codePrefix(track: CertTrack, year: string | null): string {
  if (track === "QC") return "QC";
  return `MU${(year ?? "").trim()}`; // UI و UX در یک سال، یک گروه‌اند
}

/** تعداد ارقام شماره‌ی ترتیبی: کوادکمپ ۴ رقم، بقیه ۳ رقم */
function seqPad(track: CertTrack): number {
  return track === "QC" ? 4 : 3;
}

/** ساخت کد کامل از روی شماره‌ی ترتیبی */
export function buildCode(track: CertTrack, year: string | null, seq: number): string {
  return `${codePrefix(track, year)}${String(seq).padStart(seqPad(track), "0")}`;
}

/**
 * شماره‌ی ترتیبیِ بعدی را از روی کدهای موجودِ همون گروه حساب می‌کنه.
 * بزرگ‌ترین شماره + ۱ برمی‌گرده تا کد جدید هیچ‌وقت تکراری نشه.
 */
export function nextSeq(
  existingCodes: string[],
  track: CertTrack,
  year: string | null
): number {
  const prefix = codePrefix(track, year);
  const max = existingCodes.reduce((m, code) => {
    if (!code.startsWith(prefix)) return m;
    const seq = parseInt(code.slice(prefix.length), 10);
    return Number.isNaN(seq) ? m : Math.max(m, seq);
  }, 0);
  return max + 1;
}
