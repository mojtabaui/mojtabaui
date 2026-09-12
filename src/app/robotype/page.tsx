import type { Metadata } from "next";
import Ai7Minimal from "@/components/ai7/Ai7Minimal";
import { getLang } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const en = lang === "en";

  return {
    title: en
      ? "ROBOTYPE — AI Native Product Design | Melina Design School"
      : "ROBOTYPE — AI Native Product Design | مدرسه دیزاین ملینا",
    description: en
      ? "Seven chapters, from your first prompt to a product you can send a link to."
      : "هفت فصل، و آخرش یک چیز که می‌شود لینکش را فرستاد.",
    alternates: { canonical: "/robotype" },
  };
}

/**
 * آدرسِ اصلیِ دوره.
 *
 * `/ai7/v2` و `/ai7/v3` تا امروز آدرس‌های کاریِ همین صفحه بودند و
 * نامشان از دورهٔ قبل مانده بود. حالا که نامِ دوره ROBOTYPE است،
 * آدرس هم همان است — و برخلافِ آن دوتا، این یکی ایندکس می‌شود.
 */
export default async function RobotypePage() {
  const lang = await getLang();
  return <Ai7Minimal lang={lang} bot="decode" />;
}
