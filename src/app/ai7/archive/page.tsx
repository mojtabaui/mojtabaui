import type { Metadata } from "next";
import Ai7Scroll from "@/components/ai7/archive/Ai7Scroll";
import { getLang } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const en = lang === "en";

  return {
    title: en ? "AI7 · archive | Melina Design School" : "AI7 · بایگانی | مدرسه دیزاین ملینا",
    description: en
      ? "The earlier scroll-driven hero, kept for comparison."
      : "هیروِ اسکرول‌محورِ قبلی، برای مقایسه نگه داشته شده.",
    robots: { index: false, follow: false },
  };
}

/** نسخهٔ کنارگذاشته‌شده — فقط برای مقایسه، نه برای لینک دادن */
export default async function Ai7ArchivePage() {
  const lang = await getLang();
  return <Ai7Scroll lang={lang} bot="decode" />;
}
