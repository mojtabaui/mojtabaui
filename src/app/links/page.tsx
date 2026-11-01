import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  GraduationCap,
  Sparkles,
  LayoutGrid,
  Send,
  Camera,
  Headphones,
  ArrowLeft,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { BrandGlyph } from "@/components/BrandMark";
import { getLang } from "@/lib/i18n/server";

/**
 * صفحهٔ لینک‌های بیو — همون چیزی که توی بیوی اینستاگرام و تلگرام می‌ره.
 *
 * عمداً ناوبار و فوتر نداره: کسی که از بیو میاد روی گوشیه و فقط
 * می‌خواد یکی از این شش در رو باز کنه. لینک اول سیاهه چون سایت مدرسه
 * درِ اصلیه؛ بقیه کارت سفید روی کرم‌اند.
 */

type Item = {
  href: string;
  Icon: LucideIcon;
  title: string;
  sub: string;
  external?: boolean;
  primary?: boolean;
};

const COPY = {
  fa: {
    name: "مجتبا یزدان‌پناه",
    role: "مدرس طراحی محصول دیجیتال · مدرسه دیزاین ملینا",
    items: [
      { href: "/", Icon: GraduationCap, title: "سایت مدرسه ملینا", sub: "آموزش طراحی محصول دیجیتال", primary: true },
      { href: "/robotype", Icon: Sparkles, title: "دوره هوش مصنوعی برای طراحان محصول", sub: "ROBOTYPE · AI Native Product Design" },
      { href: "/projects", Icon: LayoutGrid, title: "نمونه‌کار دانشجوها", sub: "پروژه‌های واقعی بچه‌های دوره" },
      { href: "https://t.me/mojtabaui", Icon: Send, title: "کانال تلگرام", sub: "@mojtabaui", external: true },
      { href: "https://instagram.com/mojtabaui", Icon: Camera, title: "پیج اینستاگرام", sub: "@mojtabaui", external: true },
      { href: "https://t.me/melina_support", Icon: Headphones, title: "پشتیبانی در تلگرام", sub: "@melina_support", external: true },
    ] as Item[],
    meta: { title: "لینک‌ها | مدرسه دیزاین ملینا", description: "همهٔ لینک‌های مجتبا یزدان‌پناه و مدرسه دیزاین ملینا در یک صفحه." },
  },
  en: {
    name: "Mojtaba Yazdanpanah",
    role: "Digital product design teacher · Melina Design School",
    items: [
      { href: "/", Icon: GraduationCap, title: "Melina Design School", sub: "Digital product design training", primary: true },
      { href: "/robotype", Icon: Sparkles, title: "AI course for product designers", sub: "ROBOTYPE · AI Native Product Design" },
      { href: "/projects", Icon: LayoutGrid, title: "Student work", sub: "Real projects from our students" },
      { href: "https://t.me/mojtabaui", Icon: Send, title: "Telegram channel", sub: "@mojtabaui", external: true },
      { href: "https://instagram.com/mojtabaui", Icon: Camera, title: "Instagram", sub: "@mojtabaui", external: true },
      { href: "https://t.me/melina_support", Icon: Headphones, title: "Support on Telegram", sub: "@melina_support", external: true },
    ] as Item[],
    meta: { title: "Links | Melina Design School", description: "All of Mojtaba Yazdanpanah's and Melina Design School's links in one place." },
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const m = COPY[await getLang()].meta;
  return { title: m.title, description: m.description };
}

export default async function LinksPage() {
  const lang = await getLang();
  const t = COPY[lang];
  const Forward = lang === "fa" ? ArrowLeft : ArrowRight;

  return (
    <main className="flex-1 min-h-screen dot-bg bg-[#FAF6F1] px-4 py-14 sm:py-20">
      <div className="max-w-md mx-auto">
        {/* پروفایل */}
        <header className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-5">
            <Image
              src="/images/links-avatar.png"
              alt={t.name}
              width={112}
              height={112}
              priority
              className="w-28 h-28 rounded-full object-cover object-[50%_35%] border-4 border-white shadow-[0_8px_30px_rgba(26,23,20,0.12)]"
            />
            <span className="absolute -bottom-1 -end-1 w-9 h-9 rounded-xl bg-[#1a1714] text-[#FAF6F1] flex items-center justify-center border-2 border-[#FAF6F1]">
              <BrandGlyph size={20} />
            </span>
          </div>
          <h1 className="font-body font-black text-2xl text-[#1a1714] mb-2">{t.name}</h1>
          <p className="font-body text-sm text-[#6b6560] leading-relaxed">{t.role}</p>
        </header>

        {/* لینک‌ها */}
        <ul className="flex flex-col gap-3">
          {t.items.map(({ href, Icon, title, sub, external, primary }) => {
            const className = primary
              ? "group flex items-center gap-4 rounded-2xl p-4 bg-[#1a1714] text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c5cfc]"
              : "group flex items-center gap-4 rounded-2xl p-4 bg-white border border-[#e8e2d9] text-[#1a1714] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7c5cfc]/40 hover:shadow-[0_8px_24px_rgba(124,92,252,0.10)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c5cfc]";

            const inner = (
              <>
                <span
                  className={
                    primary
                      ? "w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0"
                      : "w-11 h-11 rounded-xl bg-[#7c5cfc]/10 text-[#7c5cfc] flex items-center justify-center flex-shrink-0"
                  }
                >
                  <Icon size={20} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-body font-bold text-[15px] leading-snug">{title}</span>
                  <span
                    dir={sub.startsWith("@") || /^[A-Z]/.test(sub) ? "ltr" : undefined}
                    className={`block font-body text-xs mt-1 truncate ${primary ? "text-white/60" : "text-[#6b6560]"} ${lang === "fa" && (sub.startsWith("@") || /^[A-Z]/.test(sub)) ? "text-right" : ""}`}
                  >
                    {sub}
                  </span>
                </span>
                <Forward
                  size={18}
                  className={`flex-shrink-0 transition-transform duration-200 ${lang === "fa" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"} ${primary ? "text-white/70" : "text-[#a09990] group-hover:text-[#7c5cfc]"}`}
                />
              </>
            );

            return (
              <li key={href}>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                    {inner}
                  </a>
                ) : (
                  <Link href={href} className={className}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <footer className="mt-12 flex items-center justify-center gap-2 text-[#a09990]">
          <BrandGlyph size={18} />
          <span dir="ltr" className="font-body text-xs">mojtabaui.ir</span>
        </footer>
      </div>
    </main>
  );
}
