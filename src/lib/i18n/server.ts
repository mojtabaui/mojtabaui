import "server-only";
import { headers } from "next/headers";
import { LANG_HEADER, resolveLang, type Lang } from "@/lib/i18n";

/**
 * زبان صفحهٔ جاری، همون که پروکسی حل کرده.
 *
 * چون هدر می‌خونه، هر صفحه‌ای که صداش بزنه داینامیک رندر می‌شه. این
 * هزینهٔ انتخابِ ?lang به‌جای مسیر /en هست و آگاهانه پذیرفته شده.
 */
export async function getLang(): Promise<Lang> {
  const h = await headers();
  return resolveLang(h.get(LANG_HEADER));
}
