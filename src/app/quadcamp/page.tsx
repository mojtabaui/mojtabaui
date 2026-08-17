import type { Metadata } from "next";
import QuadcampApply from "@/components/QuadcampApply";
import type { Lang } from "@/lib/quadcamp-copy";

/**
 * صفحهٔ اپلای کوادکمپ — تنها صفحهٔ دوزبانهٔ سایت.
 *
 * ?lang=en انگلیسی رو باز می‌کنه تا بشه لینکش رو مستقیم برای کسی فرستاد.
 * بقیهٔ حالت‌ها فارسیه؛ عمداً از روی زبان مرورگر تصمیم نمی‌گیریم، چون
 * خیلی از هنرجوهای ایرانی هم مرورگرشون انگلیسیه.
 */

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { lang } = await searchParams;
  const en = lang === "en";

  return {
    title: en ? "Quad Camp application" : "ثبت‌نام کوادکمپ",
    description: en
      ? "Send your portfolio and resume to apply for Quad Camp."
      : "پرتفولیو و رزومه‌ات رو برای شرکت در کوادکمپ اینجا بفرست.",
    robots: { index: false, follow: false },
  };
}

export default async function QuadcampPage({ searchParams }: Props) {
  const { lang } = await searchParams;
  const initialLang: Lang = lang === "en" ? "en" : "fa";

  return <QuadcampApply initialLang={initialLang} />;
}
