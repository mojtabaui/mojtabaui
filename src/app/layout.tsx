import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { DIR } from "@/lib/i18n";
import { getLang } from "@/lib/i18n/server";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const meem = localFont({
  src: [
    { path: "../../public/fonts/Meem-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Meem-Bold.ttf",  weight: "700", style: "normal" },
  ],
  variable: "--font-meem",
  display: "swap",
});

const META = {
  fa: {
    title: "مدرسه دیزاین ملینا | آموزش UI/UX و دیزاین با هوش مصنوعی",
    description:
      "مدرسه دیزاین ملینا — دوره‌های حرفه‌ای طراحی رابط کاربری و تجربه کاربری، از مبتدی تا حرفه‌ای. با مجتبا یزدان‌پناه.",
    ogTitle: "مدرسه دیزاین ملینا",
    ogDescription: "دوره‌های آموزشی UI/UX Design و دیزاین با هوش مصنوعی",
    locale: "fa_IR",
  },
  en: {
    title: "Melina Design School | UI/UX and AI-assisted design training",
    description:
      "Melina Design School — professional UI and UX design courses, from first steps to portfolio-ready. Taught by Mojtaba Yazdanpanah.",
    ogTitle: "Melina Design School",
    ogDescription: "UI/UX design courses and AI-assisted design training",
    locale: "en_US",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const m = META[lang];

  return {
    title: m.title,
    description: m.description,
    metadataBase: new URL("https://mojtabaui.ir"),
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      locale: m.locale,
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: m.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.ogDescription,
      images: ["/og.jpg"],
    },
  };
}

import CustomCursor from "@/components/CustomCursor";
import Providers from "@/components/Providers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // زبان از پروکسی میاد؛ همین‌جا روی <html> می‌شینه تا جهت، فونت و
  // معنای صفحه برای مرورگر و اسکرین‌ریدر یکی باشه
  const lang = await getLang();

  return (
    <html
      lang={lang}
      dir={DIR[lang]}
      data-lang={lang}
      className={`${spaceGrotesk.variable} ${meem.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <Providers lang={lang}>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
