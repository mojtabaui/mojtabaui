import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "مدرسه دیزاین ملینا | آموزش UI/UX و دیزاین با هوش مصنوعی",
  description:
    "مدرسه دیزاین ملینا — دوره‌های حرفه‌ای طراحی رابط کاربری و تجربه کاربری، از مبتدی تا حرفه‌ای. با مجتبا یزدان‌پناه.",
  metadataBase: new URL("https://mojtabaui.ir"),
  openGraph: {
    title: "مدرسه دیزاین ملینا",
    description: "دوره‌های آموزشی UI/UX Design و دیزاین با هوش مصنوعی",
    locale: "fa_IR",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "مدرسه دیزاین ملینا" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "مدرسه دیزاین ملینا",
    description: "دوره‌های آموزشی UI/UX Design و دیزاین با هوش مصنوعی",
    images: ["/og.jpg"],
  },
};

import CustomCursor from "@/components/CustomCursor";
import Providers from "@/components/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${spaceGrotesk.variable} ${meem.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
