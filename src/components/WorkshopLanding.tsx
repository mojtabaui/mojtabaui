"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Clock, Calendar, Users, Sparkle, Target, Layers, Code, Rocket,
  Check, ChevronLeft, Zap, PenTool, Gauge,
} from "lucide-react";
import BuyButton from "@/components/BuyButton";
import { Course, formatPrice } from "@/lib/mock-data";

// ── decorative floating sparkles (fixed positions → no hydration mismatch) ──
const SPARKLES = [
  { left: "7%",  top: "24%", size: 12, delay: 0.0, dur: 4.0 },
  { left: "20%", top: "62%", size: 7,  delay: 1.2, dur: 5.0 },
  { left: "40%", top: "14%", size: 9,  delay: 0.6, dur: 4.5 },
  { left: "63%", top: "30%", size: 6,  delay: 2.0, dur: 6.0 },
  { left: "88%", top: "52%", size: 11, delay: 0.9, dur: 5.5 },
  { left: "52%", top: "74%", size: 8,  delay: 1.6, dur: 4.2 },
];

const PILLARS = [
  { n: "۱", en: "RESEARCH & INSIGHT", fa: "ریسرچ و اینسایت",     desc: "از دیتای خام تا persona و journey map",  Icon: Target  },
  { n: "۲", en: "IDEATE & CONCEPT",   fa: "ایده و کانسپت",        desc: "ایده‌پردازی، یوزرفلو و UX writing",       Icon: Sparkle },
  { n: "۳", en: "DESIGN SYSTEM",      fa: "دیزاین‌سیستم",         desc: "توکن، کامپوننت و مستندسازی",             Icon: Layers  },
  { n: "۴", en: "CODE READY",         fa: "پروتوتایپ کدمحور",     desc: "با Artifacts — بدون برنامه‌نویس",         Icon: Code    },
  { n: "۵", en: "ITERATE & DELIVER",  fa: "تحویل و بهبود",        desc: "نقد، ممیزی و هندآف",                     Icon: Rocket  },
];

const VALUES = [
  { title: "هوشمندتر کار کن", sub: "نه سخت‌تر",       Icon: Zap    },
  { title: "بهتر طراحی کن",   sub: "با قدرت هوش مصنوعی", Icon: PenTool },
  { title: "سریع‌تر تحویل بده", sub: "با اطمینان",       Icon: Gauge  },
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

export default function WorkshopLanding({ course }: { course: Course }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bannerY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bannerScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  const clean = (t: string) => t.replace(/^جلسه [۱۲] · /, "");
  const s1 = course.topics.filter((t) => t.title.includes("جلسه ۱")).map((t) => clean(t.title));
  const s2 = course.topics.filter((t) => t.title.includes("جلسه ۲")).map((t) => clean(t.title));

  return (
    <main className="flex-1">

      {/* ═══════════ HERO (dark, cinematic) ═══════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-28"
        style={{ backgroundColor: "#160e08" }}
      >
        <div className="absolute inset-0 dot-bg-copper pointer-events-none" />

        {/* animated warm glows */}
        <motion.div
          style={{ y: glowY, background: "radial-gradient(circle, rgba(226,120,68,0.22), transparent 70%)" }}
          className="absolute -top-32 -right-24 w-[620px] h-[620px] rounded-full pointer-events-none"
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ background: "radial-gradient(circle, rgba(194,65,12,0.18), transparent 70%)" }}
          className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full pointer-events-none"
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* floating sparkles */}
        {SPARKLES.map((s, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: s.left, top: s.top }}
            animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.2, 0.8], rotate: [0, 90, 0] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          >
            <Sparkle size={s.size} className="text-[#E88A5C]" fill="#E88A5C" />
          </motion.div>
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm font-body mb-10 transition-colors"
          >
            <ChevronLeft size={14} className="rotate-180" />
            بازگشت به دوره‌ها
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text — right in RTL */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-[#E88A5C]/25 rounded-full px-3.5 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#E88A5C] pulse-dot" />
                <span className="font-body text-xs font-semibold text-[#E88A5C]">کارگاه زنده — ظرفیت محدود</span>
              </div>

              <div className="font-display text-[10px] font-bold tracking-[0.24em] uppercase text-[#E88A5C]/80 mb-4">
                {course.subtitle}
              </div>

              <h1 className="font-body font-black text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
                {course.title}
              </h1>

              <p className="text-white/55 font-body text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-9 text-sm font-body text-white/60">
                <span className="flex items-center gap-2"><Clock size={15} className="text-[#E88A5C]" /> {course.durationHours} ساعت</span>
                <span className="flex items-center gap-2"><Calendar size={15} className="text-[#E88A5C]" /> {course.sessionDate}</span>
                <span className="flex items-center gap-2"><Users size={15} className="text-[#E88A5C]" /> ظرفیت {course.capacity} نفر</span>
              </div>

              <div className="max-w-xs">
                <BuyButton slug={course.slug} comingSoon={course.comingSoon} externalUrl={course.externalUrl} />
                <p className="text-white/30 text-xs font-body">همراه با کتابخانه‌ی پرامپت و فایل‌های آموزشی</p>
              </div>
            </motion.div>

            {/* Portrait photo — left in RTL, parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              style={{ y: bannerY }}
            >
              <motion.div style={{ scale: bannerScale }} className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/workshop-glow-1.png"
                  alt={course.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Values strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 pt-10 border-t border-white/10">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#C2410C26" }}>
                  <v.Icon size={20} className="text-[#E88A5C]" />
                </div>
                <div>
                  <div className="font-body font-bold text-white text-sm">{v.title}</div>
                  <div className="font-body text-white/40 text-xs">{v.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PILLARS (light) ═══════════ */}
      <section className="py-24 bg-[#FAF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...reveal} className="text-center mb-16 max-w-2xl mx-auto">
            <div className="font-display text-[10px] font-bold tracking-[0.24em] uppercase text-[#C2410C]/70 mb-3">THE JOURNEY</div>
            <h2 className="font-body font-black text-3xl md:text-4xl text-[#1a1714] mb-3">مسیر کارگاه در ۵ قدم</h2>
            <p className="text-[#6b6560] font-body">از ریسرچ تا تحویل — با Claude کنارت در هر مرحله</p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* connecting line (desktop) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="hidden md:block absolute top-9 right-[10%] left-[10%] h-px origin-right"
              style={{ background: "linear-gradient(90deg, transparent, #E0B49A, transparent)" }}
            />
            {PILLARS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="relative z-10 w-[70px] h-[70px] mx-auto mb-5 rounded-2xl bg-white border border-[#efe2d6] shadow-sm flex items-center justify-center">
                  <p.Icon size={26} className="text-[#C2410C]" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C2410C] text-white text-[11px] font-display font-black flex items-center justify-center">
                    {p.n}
                  </span>
                </div>
                <div className="font-display text-[9px] font-bold tracking-[0.16em] uppercase text-[#C2410C]/60 mb-1.5">{p.en}</div>
                <div className="font-body font-bold text-[#1a1714] text-sm mb-1.5">{p.fa}</div>
                <div className="font-body text-xs text-[#a09990] leading-relaxed px-2">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CURRICULUM — 2 sessions (light) ═══════════ */}
      <section className="py-24 bg-white border-y border-[#e8e2d9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...reveal} className="mb-12 max-w-2xl">
            <div className="font-display text-[10px] font-bold tracking-[0.24em] uppercase text-[#a09990] mb-2">CURRICULUM</div>
            <h2 className="font-body font-black text-3xl md:text-4xl text-[#1a1714] mb-2">دو جلسه، شش ساعت</h2>
            <p className="text-[#6b6560] font-body">دستی و تعاملی روی یه پروژه‌ی واقعی</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[{ label: "جلسه اول", items: s1 }, { label: "جلسه دوم", items: s2 }].map((sess, si) => (
              <motion.div
                key={si}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: si * 0.12 }}
                className="rounded-3xl border border-[#e8e2d9] p-8 bg-[#FBF7F2] hover:border-[#E0B49A] transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-display font-black text-4xl" style={{ color: "#C2410C", opacity: 0.2 }}>{si === 0 ? "۰۱" : "۰۲"}</span>
                  <div>
                    <div className="font-display text-[10px] font-bold tracking-[0.18em] uppercase text-[#C2410C]/70">SESSION {si + 1}</div>
                    <div className="font-body font-black text-lg text-[#1a1714]">{sess.label} — ۳ ساعت</div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {sess.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-body text-[#4b4640] leading-relaxed">
                      <span className="mt-0.5 w-5 h-5 rounded-lg bg-[#C2410C]/10 text-[#C2410C] text-[10px] font-display font-black flex items-center justify-center flex-shrink-0">{j + 1}</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ OUTCOMES (light) ═══════════ */}
      <section className="py-24 bg-[#FAF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
            {[
              { label: "چی یاد می‌گیری", items: course.learningOutcomes },
              { label: "این کارگاه برای کیه", items: course.targetAudience },
              { label: "بعد از کارگاه چی داری", items: course.afterCompletion },
            ].map((col, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}>
                <div className="font-display font-black text-5xl leading-none mb-3 select-none" style={{ color: "#C2410C", opacity: 0.14 }}>{`۰${i + 1}`}</div>
                <h3 className="font-body font-bold text-sm text-[#1a1714] mb-5">{col.label}</h3>
                <ul className="space-y-3">
                  {col.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm font-body text-[#6b6560] leading-relaxed">
                      <Check size={14} className="text-[#C2410C] flex-shrink-0 mt-0.5" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ (light) ═══════════ */}
      <section className="py-24 bg-white border-t border-[#e8e2d9]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div {...reveal} className="mb-10">
            <div className="font-display text-[10px] font-bold tracking-[0.24em] uppercase text-[#a09990] mb-3">FAQ</div>
            <h2 className="font-body font-black text-3xl text-[#1a1714]">سوالات پرتکرار</h2>
          </motion.div>
          <div className="space-y-2">
            {course.faqs.map((faq, i) => (
              <details key={i} className="group border border-[#e8e2d9] rounded-2xl overflow-hidden bg-white">
                <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none">
                  <span className="font-display font-black text-xs w-5 text-right flex-shrink-0 text-[#C2410C]/50">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-body font-semibold text-sm text-[#1a1714] flex-1">{faq.q}</span>
                  <span className="w-6 h-6 rounded-full bg-[#C2410C]/10 text-[#C2410C] flex items-center justify-center flex-shrink-0 text-sm font-bold transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-5 pt-2 border-t border-[#f0ebe4]">
                  <p className="font-body text-sm text-[#6b6560] leading-relaxed pr-9">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA (dark) ═══════════ */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#160e08" }}>
        {/* cinematic background photo */}
        <Image src="/images/workshop-glow-2.png" alt="" fill sizes="100vw" className="object-cover object-center opacity-25 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(22,14,8,0.82), rgba(22,14,8,0.72))" }} />
        <div className="absolute inset-0 dot-bg-copper pointer-events-none" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(226,120,68,0.16), transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div {...reveal} className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex mb-6"><Sparkle size={30} className="text-[#E88A5C]" fill="#E88A5C" /></div>
          <h2 className="font-body font-black text-4xl md:text-5xl text-white mb-4 leading-tight">آماده‌ای Claude رو<br />وارد کارت کنی؟</h2>
          <p className="text-white/45 font-body mb-3">{formatPrice(course.price)} · ظرفیت {course.capacity} نفر</p>
          <p className="text-[#E88A5C] font-body text-sm mb-10">{course.sessionDate}</p>
          <div className="max-w-xs mx-auto">
            <BuyButton slug={course.slug} comingSoon={course.comingSoon} externalUrl={course.externalUrl} />
          </div>
        </motion.div>
      </section>

    </main>
  );
}
