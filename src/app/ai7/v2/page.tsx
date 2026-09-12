import type { Metadata } from "next";
import Ai7Minimal from "@/components/ai7/Ai7Minimal";
import { getLang } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const en = lang === "en";

  return {
    title: en ? "AI7 · minimal | Melina Design School" : "AI7 · مینیمال | مدرسه دیزاین ملینا",
    description: en
      ? "Seven chapters, from your first prompt to a shipped product."
      : "هفت فصل، از اولین پرامپت تا محصولی که منتشر می‌شود.",
    // هنوز منتشر نشده و فقط داخلی دیده می‌شود
    robots: { index: false, follow: false },
  };
}

export default async function Ai7MinimalPage() {
  const lang = await getLang();
  return <Ai7Minimal lang={lang} bot="decode" />;
}
