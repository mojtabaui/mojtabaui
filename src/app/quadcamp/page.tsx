import type { Metadata } from "next";
import QuadcampApply from "@/components/QuadcampApply";
import { getLang } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const en = lang === "en";

  return {
    title: en ? "Quad Camp application" : "ثبت‌نام کوادکمپ",
    description: en
      ? "Send your portfolio and resume to apply for Quad Camp."
      : "پرتفولیو و رزومه‌ات رو برای شرکت در کوادکمپ اینجا بفرست.",
    robots: { index: false, follow: false },
  };
}

export default async function QuadcampPage() {
  const lang = await getLang();
  return <QuadcampApply lang={lang} />;
}
