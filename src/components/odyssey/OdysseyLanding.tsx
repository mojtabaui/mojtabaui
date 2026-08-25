"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react";
import Starfield from "./Starfield";
import MissionSection from "./MissionSection";
import Planet from "./Planet";
import Reveal from "./Reveal";
import { useStill } from "./useStill";
import { MISSIONS } from "@/lib/odyssey";
import type { Lang } from "@/lib/i18n";

const T = {
  fa: {
    kicker: "مدرسه دیزاین ملینا",
    lede: "یک سفر هفت‌مرحله‌ای از اولین پرامپت تا محصولی که منتشرش می‌کنی. هفت سیاره، هفت مأموریت، هفت فصل.",
    start: "شروع سفر",
    missions: "هفت مأموریت",
    scroll: "برای حرکت، اسکرول کن",
    statPlanets: "سیاره",
    statMissions: "مأموریت",
    statChapters: "فصل",
    manifestoTitle: "این دوره یک فهرست ابزار نیست.",
    manifestoBody:
      "ابزارها هر سه ماه عوض می‌شوند. چیزی که عوض نمی‌شود، طرزِ فکر است: این‌که چه کاری را بسپاری، چطور نتیجه را بسنجی، و کجا خودت باید تصمیم بگیری. این سفر دربارهٔ همان است.",
    finalTitle: "آمادهٔ پرتاب؟",
    finalBody: "هفت مأموریت، از اولین تماس تا انتشار. سفر از عطارد شروع می‌شود.",
    finalCta: "می‌خواهم شروع کنم",
    back: "بازگشت به مدرسه",
  },
  en: {
    kicker: "Melina Design School",
    lede: "A seven-stage journey from your first prompt to a product you actually ship. Seven planets, seven missions, seven chapters.",
    start: "Begin the journey",
    missions: "The seven missions",
    scroll: "Scroll to travel",
    statPlanets: "planets",
    statMissions: "missions",
    statChapters: "chapters",
    manifestoTitle: "This course is not a list of tools.",
    manifestoBody:
      "Tools change every three months. What does not change is the way of thinking: what to delegate, how to measure the result, and where the decision has to stay yours. That is what this journey is about.",
    finalTitle: "Ready for launch?",
    finalBody: "Seven missions, from first contact to launch. The journey starts at Mercury.",
    finalCta: "I want to start",
    back: "Back to the school",
  },
} as const;

export default function OdysseyLanding({ lang }: { lang: Lang }) {
  const t = T[lang];
  const rtl = lang === "fa";
  const Forward = rtl ? ArrowLeft : ArrowRight;
  const still = useStill();

  const heroRef = useRef<HTMLElement>(null);

  // نوار پیشرفتِ کل صفحه — همان «مسیر سفر»
  const { scrollYProgress } = useScroll();
  const rail = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  // افق سیاره در هرو: با اسکرول پایین می‌رود، انگار داریم ازش دور می‌شویم
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const horizonY = useTransform(heroP, [0, 1], ["0%", "38%"]);
  const heroFade = useTransform(heroP, [0, 0.75], [1, 0]);

  const title = "ODYSSEY";

  return (
    <div className="relative min-h-dvh overflow-x-clip bg-[#0F0F23] text-white">
      <Starfield />

      {/* نوار پیشرفت سفر */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: rail }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-[left] bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#F43F5E] rtl:origin-[right]"
      />

      {/* ═══ هرو ═══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative z-10 flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-40 pt-28 text-center"
      >
        <motion.div style={{ opacity: still ? 1 : heroFade }} className="relative z-10">
          <Reveal y={14}>
            <p className="font-[family-name:var(--font-space-grotesk)] text-[11px] uppercase tracking-[0.4em] text-[#A78BFA]">
              {t.kicker}
            </p>
          </Reveal>

          <h1 className="mt-6 font-[family-name:var(--font-space-grotesk)] font-bold leading-[0.9] tracking-tight">
            <Reveal delay={0.1} className="block text-[clamp(2.6rem,11vw,6rem)] text-white/90">
              <span dir="ltr">AI</span>
            </Reveal>

            {/* حرف‌به‌حرف بالا می‌آیند — همان stagger ۴۰ میلی‌ثانیه‌ای */}
            <span className="mt-1 block text-[clamp(3.2rem,15vw,9rem)]" dir="ltr">
              {title.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={still ? false : { opacity: 0, y: 44 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    still
                      ? { duration: 0 }
                      : { duration: 0.75, delay: 0.24 + i * 0.04, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="inline-block text-white"
                  style={{ textShadow: "0 0 42px rgba(167,139,250,.55), 0 0 90px rgba(124,58,237,.35)" }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </h1>

          <Reveal delay={0.6} y={18}>
            <p className="mx-auto mt-8 max-w-[46ch] text-base leading-[1.9] text-[#c3c0d4] sm:text-lg">
              {t.lede}
            </p>
          </Reveal>

          <Reveal delay={0.75} y={18} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#mission-01"
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-7 text-[15px] font-bold text-[#0F0F23] transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A78BFA] active:scale-[0.98]"
            >
              <Rocket size={18} aria-hidden="true" />
              {t.start}
            </a>
            <a
              href="#missions"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/25 px-7 text-[15px] font-bold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A78BFA]"
            >
              {t.missions}
              <Forward size={17} aria-hidden="true" />
            </a>
          </Reveal>
        </motion.div>

        {/* افق سیاره — کره‌ای بسیار بزرگ که فقط قوسِ بالایش دیده می‌شود */}
        <motion.div
          aria-hidden="true"
          style={{ x: "-50%", y: still ? 0 : horizonY }}
          className="pointer-events-none absolute bottom-[-92vw] left-1/2 z-0 h-[110vw] w-[220vw] rounded-[50%]"
        >
          <div
            className="absolute inset-0 rounded-[50%]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #2a1f5c 0%, #171142 30%, #0c0a1e 58%, #0F0F23 100%)",
              boxShadow:
                "inset 0 18px 50px rgba(167,139,250,.22), 0 -1px 0 rgba(199,180,255,.65), 0 -18px 70px rgba(124,58,237,.35)",
            }}
          />
        </motion.div>

        <Reveal delay={1.4} y={0} className="absolute bottom-8 z-20">
          <p className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-[0.3em] text-white/45">
            {t.scroll}
          </p>
        </Reveal>
      </section>

      {/* ═══ سه عدد هفت ════════════════════════════════════════════ */}
      <section className="relative z-10 border-y border-white/10 bg-[#0F0F23]/60 backdrop-blur-sm">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-white/10 px-6 rtl:divide-x-reverse">
          {[t.statPlanets, t.statMissions, t.statChapters].map((label, i) => (
            <Reveal
              key={label}
              onView
              delay={i * 0.08}
              y={16}
              className="px-2 py-8 text-center sm:py-10"
            >
              <div
                className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tabular-nums text-white sm:text-5xl"
                dir="ltr"
              >
                07
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[#A78BFA] sm:text-xs">
                {label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ مانیفست ══════════════════════════════════════════════ */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <Reveal onView y={22}>
          <h2 className="text-2xl font-bold leading-snug text-white sm:text-4xl">
            {t.manifestoTitle}
          </h2>
        </Reveal>
        <Reveal onView delay={0.12} y={22}>
          <p className="mx-auto mt-6 max-w-[54ch] text-base leading-[1.95] text-[#c3c0d4] sm:text-lg">
            {t.manifestoBody}
          </p>
        </Reveal>
      </section>

      {/* ═══ ردیف هفت سیاره ══════════════════════════════════════ */}
      <section id="missions" className="relative z-10 scroll-mt-24 px-6 pb-6">
        <ul className="mx-auto flex max-w-5xl flex-wrap items-end justify-center gap-x-5 gap-y-6 sm:gap-x-8">
          {MISSIONS.map((m, i) => (
            <li key={m.no}>
              <Reveal onView delay={i * 0.05} y={22}>
              <a
                href={`#mission-${m.no}`}
                className="group flex min-h-[44px] flex-col items-center gap-2 rounded-lg px-2 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A78BFA]"
              >
                <Planet
                  mission={m}
                  className="w-11 transition-transform duration-300 group-hover:scale-125 sm:w-14"
                />
                <span
                  className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-[0.14em] text-white/50 transition-colors group-hover:text-white"
                  dir="ltr"
                >
                  {m.planet}
                </span>
              </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ هفت مأموریت ═════════════════════════════════════════ */}
      <div className="relative z-10">
        {MISSIONS.map((m, i) => (
          <div key={m.no} id={`mission-${m.no}`} className="scroll-mt-20">
            <MissionSection mission={m} index={i} lang={lang} />
          </div>
        ))}
      </div>

      {/* ═══ پرتاب ════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 pb-32 pt-10 text-center">
        <Reveal
          onView
          y={26}
          className="mx-auto max-w-2xl rounded-3xl border border-white/12 bg-white/[0.04] px-6 py-14 backdrop-blur-md sm:px-12"
        >
          <h2 className="text-3xl font-bold text-white sm:text-5xl">{t.finalTitle}</h2>
          <p className="mx-auto mt-5 max-w-[44ch] text-base leading-[1.9] text-[#c3c0d4] sm:text-lg">
            {t.finalBody}
          </p>

          <Link
            href="/courses"
            className="group mt-9 inline-flex min-h-[54px] items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#F43F5E] px-9 text-[15px] font-bold text-white transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A78BFA] active:scale-[0.98]"
          >
            {t.finalCta}
            <Forward size={18} aria-hidden="true" />
          </Link>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center text-sm text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {t.back}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
