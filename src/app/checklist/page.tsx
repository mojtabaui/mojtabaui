import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Send, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ParallaxY from "@/components/ParallaxY";
import MarqueeBand from "@/components/MarqueeBand";
import ChecklistTracks from "@/components/ChecklistTracks";
import { tracks, totalItemsOf } from "@/lib/checklist";

export const metadata: Metadata = {
  title: "چک‌لیست یادگیری طراحی محصول | مدرسه دیزاین ملینا",
  description:
    "مسیر کامل یادگیری طراحی رابط کاربری و تجربه کاربری از صفر، به ترتیب و بدون حدس زدن. دو مسیر مجزا با آیتم‌های مشخص.",
};

const fa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function ChecklistPage() {
  const totalStages = tracks.reduce((sum, t) => sum + t.stages.length, 0);
  const totalItems = tracks.reduce((sum, t) => sum + totalItemsOf(t), 0);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 min-h-screen bg-[#FAF6F1]">

        {/* Header */}
        <section className="dot-bg pt-16 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden">
            <ParallaxY speed={50}>
              <span
                className="font-display font-black leading-none block text-[#1a1714]"
                style={{ fontSize: "clamp(8rem, 22vw, 17rem)", opacity: 0.035, marginRight: "-1.5rem" }}
              >
                PATH
              </span>
            </ParallaxY>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div className="flex items-end justify-between gap-8 flex-wrap">
              <FadeIn className="max-w-2xl">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#7c5cfc] mb-4">
                  LEARNING PATH
                </div>
                <h1 className="font-body font-black text-4xl md:text-5xl text-[#1a1714] leading-[1.25] mb-4">
                  چک‌لیست یادگیری از صفر
                </h1>
                <p className="text-[#6b6560] font-body text-lg leading-relaxed">
                  بیشتر آدم‌ها به‌خاطر نداشتن منبع شکست نمی‌خورن، به‌خاطر نداشتن ترتیب
                  شکست می‌خورن. این همون ترتیبیه که توی دوره‌ها طی می‌کنیم، برای هر دو
                  مسیر رابط کاربری و تجربه کاربری.
                </p>
              </FadeIn>

              <FadeIn delay={0.1} className="w-full max-w-[320px]">
                <div className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden border border-[#e8e2d9] shadow-[0_24px_50px_-30px_rgba(26,23,20,0.5)] bg-white">
                  <Image
                    src="/images/checklist-hero.jpg"
                    alt=""
                    fill
                    priority
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            </div>

            {/* آمار */}
            <FadeIn delay={0.12}>
              <div className="grid grid-cols-3 max-w-md bg-white border border-[#e8e2d9] rounded-3xl overflow-hidden mt-10">
                {[
                  { num: fa(tracks.length), label: "مسیر" },
                  { num: fa(totalStages), label: "مرحله" },
                  { num: fa(totalItems), label: "آیتم" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`px-5 py-5 text-center ${i < 2 ? "border-l border-[#f0ebe4]" : ""}`}
                  >
                    <div className="font-display font-black text-2xl text-[#1a1714]">{s.num}</div>
                    <div className="font-body text-[#a09990] text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <MarqueeBand />

        {/* انتخاب مسیر و مراحل */}
        <ChecklistTracks />

        {/* CTA پایانی */}
        <section className="py-24 bg-[#1a1714] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <ParallaxY speed={50}>
              <span
                className="font-display font-black leading-none block text-white"
                style={{ fontSize: "clamp(7rem, 20vw, 15rem)", opacity: 0.03 }}
              >
                START
              </span>
            </ParallaxY>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
            <FadeIn>
              <h2 className="font-body font-black text-3xl md:text-4xl text-white leading-[1.3] mb-4">
                این مسیر رو تنها نرو
              </h2>
              <p className="font-body text-white/45 leading-relaxed mb-9 max-w-lg mx-auto">
                همه‌ی این چک‌لیست رو می‌شه خودت جلو بری. فقط معمولاً وسط راه گیر می‌کنی و
                کسی نیست بگه کجا رو اشتباه رفتی. کار ما دقیقاً همینه.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#1a1714] font-body font-bold px-8 py-4 rounded-2xl transition-all hover:scale-[1.02]"
                >
                  دیدن دوره‌ها
                  <ArrowLeft size={16} />
                </Link>
                <a
                  href="https://t.me/melina_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-body font-semibold px-7 py-4 rounded-2xl transition-all text-sm"
                >
                  <Send size={15} />
                  مشاوره‌ی رایگان
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
