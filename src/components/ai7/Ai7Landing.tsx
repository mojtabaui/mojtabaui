"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const Robot3D = dynamic(() => import("./Robot3D"), { ssr: false });
import { useStill } from "@/components/odyssey/useStill";
import { MISSIONS } from "@/lib/odyssey";
import type { Lang } from "@/lib/i18n";

/**
 * AI7 — صحنهٔ اسکرول.
 *
 * قوسِ روایت: ربات در تاریکی خاموش است، با اسکرول روشن می‌شود، بعد کلِ
 * صفحه از شب به روز می‌رود، بعد نام ظاهر می‌شود، و آخر می‌رویم سراغ
 * سرفصل‌ها. همه‌اش روی یک محورِ اسکرول سوار است تا کاربر حس کند دارد
 * خودش این اتفاق را جلو می‌برد، نه اینکه تماشاچیِ یک ویدیو باشد.
 *
 * پنجره‌های زمانی عمداً هم‌پوشانی دارند: تا نور کامل نشده، روز شروع
 * می‌شود و تا روز تمام نشده، نام بالا می‌آید. اگر پشت سر هم می‌بودند،
 * حرکت تکه‌تکه حس می‌شد.
 *
 * رنگ‌ها از طریق متغیرهای CSS به ربات می‌رسند، پس تغییرشان باعث رندر
 * دوبارهٔ React نمی‌شود — فقط مرورگر مقدار را عوض می‌کند.
 */

const NIGHT = "#08080f";
const DAY = "#f4f2ee";
const INK_NIGHT = "#f4f2ee";
const INK_DAY = "#14120e";
const ACCENT = "#6d4bf0";

const T = {
  fa: {
    boot: "در حال روشن شدن",
    scroll: "اسکرول کن",
    lede: "هفت مرحله، از اولین پرامپت تا محصولی که منتشرش می‌کنی.",
    kicker: "مدرسه دیزاین ملینا",
    start: "شروع کن",
    outline: "سرفصل‌ها",
    chapters: "هفت فصل",
    chaptersLede:
      "هر فصل یک مهارت است که روی فصل قبل سوار می‌شود. ترتیبشان تصادفی نیست.",
    epLabel: "اپیزود",
    soon: "در حال نهایی شدن",
    ready: "ضبط‌شده",
    finalTitle: "از همین‌جا شروع می‌شود.",
    finalBody: "هفت فصل، از اولین تماس تا انتشار.",
    finalCta: "می‌خواهم شروع کنم",
    back: "بازگشت به مدرسه",
  },
  en: {
    boot: "powering up",
    scroll: "scroll",
    lede: "Seven stages, from your first prompt to a product you actually ship.",
    kicker: "Melina Design School",
    start: "Begin",
    outline: "The outline",
    chapters: "Seven chapters",
    chaptersLede:
      "Each chapter is a skill that stands on the one before it. The order is not arbitrary.",
    epLabel: "episode",
    soon: "outline still settling",
    ready: "recorded",
    finalTitle: "It starts here.",
    finalBody: "Seven chapters, from first contact to launch.",
    finalCta: "I want to start",
    back: "Back to the school",
  },
} as const;

export default function Ai7Landing({ lang }: { lang: Lang }) {
  const t = T[lang];
  const rtl = lang === "fa";
  const Forward = rtl ? ArrowLeft : ArrowRight;
  const still = useStill();

  const scene = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ["start start", "end end"],
  });

  /** حرکت را نرم می‌کند تا اسکرولِ پله‌ای، پرش ندهد */
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 });

  // ── ۱. ربات روشن می‌شود ────────────────────────────────────────
  const wake = p;

  // ── ۲. شب به روز ──────────────────────────────────────────────
  const dayIn = useTransform(p, [0.26, 0.44], [0, 1]);
  const ink = useTransform(p, [0.3, 0.46], [INK_NIGHT, INK_DAY]);

  // ── ۳. ربات جا باز می‌کند ─────────────────────────────────────
  const robotScale = useTransform(p, [0, 0.45, 0.85], [1.06, 1, 0.72]);
  const robotY = useTransform(p, [0, 0.45, 0.85], [0, 0, -110]);

  // ── ۴. نام و بقیه ─────────────────────────────────────────────
  const bootFade = useTransform(p, [0, 0.18], [1, 0]);
  const titleIn = useTransform(p, [0.5, 0.68], [0, 1]);
  const titleY = useTransform(p, [0.5, 0.68], [40, 0]);
  const ledeIn = useTransform(p, [0.66, 0.8], [0, 1]);
  const ctaIn = useTransform(p, [0.76, 0.9], [0, 1]);

  /** در کاهش حرکت، همه‌چیز از همان اول در حالت نهایی می‌نشیند */
  const fixed = <V,>(v: MotionValue<V>, end: V) => (still ? end : v);

  return (
    <motion.div
      style={{ color: still ? INK_DAY : ink }}
      className="relative min-h-dvh"
    >
      {/* شب — همیشه زیر همه‌چیز */}
      <div className="fixed inset-0 -z-20" style={{ background: NIGHT }} />

      {/* روز — پشتِ صحنه روشن می‌شود تا وقتی دنیا محو شد، سفیدی بماند */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: still ? 1 : dayIn, background: DAY }}
        className="fixed inset-0 -z-10"
      />
      {/* ═══ صحنهٔ اسکرول ═════════════════════════════════════════ */}
      <div ref={scene} className="relative h-[340vh]">
        <div className="sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden px-6">
          {/* ربات */}
          <motion.div
            style={{ scale: fixed(robotScale, 1), y: fixed(robotY, -110) }}
            className="absolute inset-0 will-change-transform"
          >
            <Robot3D progress={wake} className="h-full w-full" />
          </motion.div>

          {/* «در حال روشن شدن» — فقط اول کار */}
          <motion.p
            style={{ opacity: fixed(bootFade, 0) }}
            className="absolute bottom-16 font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-[0.42em] opacity-60"
          >
            {t.boot}
          </motion.p>

          {/* نام */}
          <motion.div
            style={{ opacity: fixed(titleIn, 1), y: fixed(titleY, 0) }}
            className="pointer-events-none absolute inset-x-0 top-[54%] z-10 -translate-y-1/2 text-center"
          >
            <h1
              className="font-[family-name:var(--font-space-grotesk)] text-[clamp(4.5rem,20vw,13rem)] font-bold leading-[0.85] tracking-tight"
              dir="ltr"
            >
              AI7
            </h1>
          </motion.div>

          {/* توضیح و دکمه */}
          <motion.div
            style={{ opacity: fixed(ledeIn, 1) }}
            className="absolute inset-x-0 bottom-[19%] z-10 px-6 text-center"
          >
            <p className="mx-auto max-w-[42ch] text-base leading-[1.9] opacity-70 sm:text-lg">
              {t.lede}
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: fixed(ctaIn, 1) }}
            className="absolute inset-x-0 bottom-[9%] z-10 flex justify-center px-6"
          >
            <a
              href="#outline"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full px-8 text-[15px] font-bold text-white transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-[0.98]"
              style={{ background: ACCENT, outlineColor: ACCENT }}
            >
              {t.outline}
              <Forward size={17} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ═══ سرفصل‌ها ═════════════════════════════════════════════ */}
      <section
        id="outline"
        className="relative scroll-mt-16 px-6 pb-32 pt-10"
        style={{ background: DAY, color: INK_DAY }}
      >
        <div className="mx-auto max-w-5xl">
          <header className="border-b pb-10" style={{ borderColor: "rgba(20,18,14,.14)" }}>
            <p
              className="font-[family-name:var(--font-space-grotesk)] text-[11px] uppercase tracking-[0.36em]"
              style={{ color: ACCENT }}
            >
              {t.kicker}
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">{t.chapters}</h2>
            <p className="mt-5 max-w-[54ch] text-base leading-[1.9] opacity-65 sm:text-lg">
              {t.chaptersLede}
            </p>
          </header>

          <ol>
            {MISSIONS.map((m, i) => (
              <motion.li
                key={m.no}
                initial={still ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={
                  still ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
                }
                className="grid gap-x-8 gap-y-4 border-b py-10 md:grid-cols-[auto_1fr_1fr]"
                style={{ borderColor: "rgba(20,18,14,.14)" }}
              >
                {/* شماره */}
                <div
                  className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold tabular-nums leading-none opacity-25 sm:text-6xl"
                  dir="ltr"
                >
                  {m.no}
                </div>

                {/* عنوان فصل */}
                <div>
                  <h3 className="text-2xl font-bold leading-snug sm:text-3xl">
                    {m.chapter[lang]}
                  </h3>
                  <p
                    className="mt-2 font-[family-name:var(--font-space-grotesk)] text-[13px] uppercase tracking-[0.2em]"
                    style={{ color: ACCENT }}
                    dir="ltr"
                  >
                    {m.action.en}
                  </p>
                  <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.85] opacity-65">
                    {m.body[lang]}
                  </p>
                  <p className="mt-4 text-[13px] opacity-45">
                    {m.episodes.length} {t.epLabel} · {m.draft ? t.soon : t.ready}
                  </p>
                </div>

                {/* اپیزودها */}
                <ul className="space-y-0 self-start">
                  {m.episodes.map((ep, k) => (
                    <li
                      key={ep.en}
                      className="flex items-baseline gap-4 border-t py-2.5 text-[15px] opacity-80 first:border-t-0"
                      style={{ borderColor: "rgba(20,18,14,.10)" }}
                    >
                      <span
                        className="w-5 shrink-0 font-[family-name:var(--font-space-grotesk)] text-[11px] tabular-nums opacity-50"
                        dir="ltr"
                      >
                        {String(k + 1).padStart(2, "0")}
                      </span>
                      <span>{ep[lang]}</span>
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>

          {/* ═══ پایان ═════════════════════════════════════════ */}
          <div className="pt-20 text-center">
            <h2 className="text-3xl font-bold sm:text-5xl">{t.finalTitle}</h2>
            <p className="mx-auto mt-4 max-w-[40ch] text-base leading-[1.9] opacity-65 sm:text-lg">
              {t.finalBody}
            </p>
            <Link
              href="/courses"
              className="mt-8 inline-flex min-h-[54px] items-center gap-2 rounded-full px-9 text-[15px] font-bold text-white transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-[0.98]"
              style={{ background: ACCENT, outlineColor: ACCENT }}
            >
              {t.finalCta}
              <Forward size={18} aria-hidden="true" />
            </Link>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex min-h-[44px] items-center text-sm underline-offset-4 opacity-50 transition-opacity hover:opacity-100 hover:underline"
              >
                {t.back}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
