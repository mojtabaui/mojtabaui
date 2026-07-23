import type { Metadata } from "next";
import BrandBook from "@/components/BrandBook";

export const metadata: Metadata = {
  title: "برندبوک | مدرسه دیزاین ملینا",
  robots: { index: false, follow: false },
};

export default function BrandBookPage() {
  return (
    <main className="min-h-screen bg-[#f0ebe4] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="no-print mb-12 max-w-2xl">
          <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#7c5cfc] mb-3">
            BRAND BOOK
          </div>
          <h1 className="font-body font-black text-3xl text-[#1a1714] leading-[1.3] mb-4">
            برندبوک، در قالب استوری
          </h1>
          <p className="font-body text-[#6b6560] leading-relaxed">
            هشت اسلاید با نسبت ۹:۱۶. برای گرفتن خروجی، روی هر اسلاید راست کلیک کن و
            گزینه‌ی ذخیره‌ی تصویر رو بزن، یا با ابزار اسکرین‌شات مرورگر همون قاب رو
            بگیر. اندازه‌ها به عرض خود اسلاید گره خوردن، پس در هر رزولوشنی چیدمان
            یکسان می‌مونه.
          </p>
        </div>

        <BrandBook />
      </div>
    </main>
  );
}
