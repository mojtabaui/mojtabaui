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
  title: "mojtabaui | آموزش دیزاین و فریلنسری",
  description:
    "دوره‌های آموزشی حرفه‌ای طراحی رابط کاربری و تجربه کاربری. از مبتدی تا حرفه‌ای.",
  openGraph: {
    title: "mojtabaui",
    description: "دوره‌های آموزشی UI/UX Design",
    locale: "fa_IR",
    type: "website",
  },
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${spaceGrotesk.variable} ${meem.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
