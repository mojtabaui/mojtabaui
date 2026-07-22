import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronLeft, Clock, Send, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ParallaxY from "@/components/ParallaxY";
import MarqueeBand from "@/components/MarqueeBand";
import { stages, totalItems } from "@/lib/checklist";

export const metadata: Metadata = {
  title: "چک‌لیست یادگیری طراحی محصول | مدرسه دیزاین ملینا",
  description:
    "مسیر کامل یادگیری طراحی رابط و تجربه کاربری از صفر، به ترتیب و بدون حدس زدن. شش مرحله با آیتم‌های مشخص.",
};

const fa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function ChecklistPage() {
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
                  شکست می‌خورن. این همون ترتیبیه که توی دوره‌ها طی می‌کنیم.
                </p>
              </FadeIn>

              <ParallaxY speed={26}>
                <div className="font-display font-black text-[#1a1714]/[0.07] text-7xl leading-none select-none">
                  {fa(stages.length)}
                </div>
              </ParallaxY>
            </div>

            {/* آمار */}
            <FadeIn delay={0.12}>
              <div className="grid grid-cols-3 max-w-md bg-white border border-[#e8e2d9] rounded-3xl overflow-hidden mt-10">
                {[
                  { num: fa(stages.length), label: "مرحله" },
                  { num: fa(totalItems), label: "آیتم" },
                  { num: "۱۶", label: "هفته تقریبی" },
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

        {/* فهرست مراحل */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14">
          <FadeIn>
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-6">
              <div className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-[#a09990] mb-4">
                فهرست
              </div>
              <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {stages.map((stage) => (
                  <li key={stage.id}>
                    <a
                      href={`#${stage.id}`}
                      className="group flex items-center gap-3 py-1.5 transition-colors"
                    >
                      <span
                        className="font-display font-black text-sm w-7 flex-shrink-0"
                        style={{ color: stage.accent }}
                      >
                        {stage.num}
                      </span>
                      <span className="font-body text-sm text-[#4a4540] group-hover:text-[#1a1714] transition-colors">
                        {stage.title}
                      </span>
                      <span className="font-body text-[11px] text-[#c8c2ba] mr-auto">
                        {fa(stage.items.length)} آیتم
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>
        </section>

        {/* مراحل */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-16">
          {stages.map((stage) => (
            <div key={stage.id} id={stage.id} className="scroll-mt-28">
              <FadeIn>
                {/* سربرگ مرحله */}
                <div className="flex items-start gap-5 mb-7">
                  <ParallaxY speed={14}>
                    <span
                      className="font-display font-black text-5xl leading-none select-none block"
                      style={{ color: stage.accent, opacity: 0.22 }}
                    >
                      {stage.num}
                    </span>
                  </ParallaxY>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714] leading-[1.3]">
                        {stage.title}
                      </h2>
                      <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-body font-semibold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: stage.color, color: stage.accent }}
                      >
                        <Clock size={10} />
                        {stage.duration}
                      </span>
                    </div>
                    <p className="font-body text-[#6b6560] leading-relaxed max-w-2xl">
                      {stage.subtitle}
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* آیتم‌ها */}
              <div className="space-y-3">
                {stage.items.map((item, i) => (
                  <FadeIn key={item.title} delay={i * 0.05}>
                    <div className="group flex items-start gap-4 bg-white border border-[#e8e2d9] rounded-2xl p-5 hover:border-[#1a1714]/20 hover:-translate-y-0.5 transition-all">
                      <span
                        className="w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                        style={{ borderColor: `${stage.accent}44`, color: stage.accent }}
                      >
                        <Check
                          size={13}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </span>
                      <div>
                        <h3 className="font-body font-bold text-[#1a1714] text-sm mb-1">
                          {item.title}
                        </h3>
                        <p className="font-body text-sm text-[#6b6560] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* CTA همین مرحله */}
              {stage.course && (
                <FadeIn delay={0.1}>
                  <div
                    className="mt-5 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap border"
                    style={{ backgroundColor: stage.color, borderColor: `${stage.accent}26` }}
                  >
                    <p className="font-body text-sm text-[#4a4540] leading-relaxed">
                      این مرحله رو قدم به قدم توی{" "}
                      <span className="font-bold" style={{ color: stage.accent }}>
                        {stage.course.label}
                      </span>{" "}
                      با پروژه و فیدبک کار می‌کنیم.
                    </p>
                    <Link
                      href={`/courses/${stage.course.slug}`}
                      className="inline-flex items-center gap-2 text-white font-body font-bold text-sm px-5 py-2.5 rounded-xl transition-transform hover:scale-[1.02] flex-shrink-0"
                      style={{ backgroundColor: stage.accent }}
                    >
                      ثبت‌نام در دوره
                      <ChevronLeft size={14} />
                    </Link>
                  </div>
                </FadeIn>
              )}
            </div>
          ))}
        </section>

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
