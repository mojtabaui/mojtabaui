import type { Metadata } from "next";
import OdysseyLanding from "@/components/odyssey/OdysseyLanding";
import { getLang } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const en = lang === "en";

  return {
    title: en ? "AI Odyssey | Melina Design School" : "AI Odyssey | مدرسه دیزاین ملینا",
    description: en
      ? "A seven-stage journey from your first prompt to a shipped product. Seven planets, seven missions, seven chapters."
      : "سفری هفت‌مرحله‌ای از اولین پرامپت تا محصولی که منتشر می‌شود. هفت سیاره، هفت مأموریت، هفت فصل.",
    // صفحه هنوز منتشر نشده و فقط داخلی دیده می‌شه
    robots: { index: false, follow: false },
  };
}

export default async function AiOdysseyPage() {
  const lang = await getLang();
  return <OdysseyLanding lang={lang} />;
}
