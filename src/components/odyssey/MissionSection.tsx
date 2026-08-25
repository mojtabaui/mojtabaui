"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useStill } from "./useStill";
import Reveal from "./Reveal";
import Planet from "./Planet";
import type { Mission } from "@/lib/odyssey";
import type { Lang } from "@/lib/i18n";

/**
 * یک مأموریت: سیاره در یک ستون، متن در ستون دیگر.
 *
 * سیاره sticky است و در طول اسکرولِ سکشن می‌چرخد و کمی جلو می‌آید،
 * پس حسِ «نزدیک شدن به سیاره» می‌دهد به‌جای اینکه فقط رد شود. حرکت
 * روی transform است (نه width/top) و با spring نرم می‌شود.
 *
 * سمتِ سیاره یک‌درمیان عوض می‌شود تا صفحه یکنواخت نشود؛ در حالت راست‌چین
 * ترتیب ستون‌ها را خود grid برعکس می‌کند، پس اینجا کاری لازم نیست.
 */

export default function MissionSection({
  mission,
  index,
  lang,
}: {
  mission: Mission;
  index: number;
  lang: Lang;
}) {
  const ref = useRef<HTMLElement>(null);
  const still = useStill();
  const en = lang === "en";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.72, 1, 0.82]);
  const rawY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const rawTilt = useTransform(scrollYProgress, [0, 1], [14, -14]);

  const scale = useSpring(rawScale, { stiffness: 70, damping: 22 });
  const y = useSpring(rawY, { stiffness: 70, damping: 22 });
  const tilt = useSpring(rawTilt, { stiffness: 60, damping: 24 });

  const flip = index % 2 === 1;

  return (
    <section
      ref={ref}
      className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:gap-16 md:grid-cols-2 md:py-28"
      aria-labelledby={`mission-${mission.no}`}
    >
      {/* ── سیاره ───────────────────────────────────────────────── */}
      <div className={flip ? "md:order-2" : ""}>
          <motion.div
            style={{
              scale: still ? 1 : scale,
              y: still ? 0 : y,
              rotate: still ? 0 : tilt,
              transformPerspective: 900,
            }}
            className="mx-auto w-[58vw] max-w-[300px] will-change-transform sm:w-[40vw] sm:max-w-[340px] md:w-full md:max-w-[400px]"
          >
            <Planet mission={mission} />
          </motion.div>
      </div>

      {/* ── متن ─────────────────────────────────────────────────── */}
      <div className={flip ? "md:order-1" : ""}>
        <Reveal onView y={30}>
          {/* شماره و نام سیاره */}
          <div className="flex items-baseline gap-3 font-[family-name:var(--font-space-grotesk)]">
            <span
              className="text-5xl font-bold tabular-nums sm:text-6xl"
              style={{ color: mission.tint, opacity: 0.32 }}
            >
              {mission.no}
            </span>
            <span
              className="text-xs uppercase tracking-[0.32em]"
              style={{ color: mission.tint }}
            >
              {mission.planet}
            </span>
          </div>

          {/* فعلِ مأموریت */}
          <h2
            id={`mission-${mission.no}`}
            className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            {mission.action[lang]}
          </h2>

          {/* فصل دوره */}
          <p
            className={`mt-3 text-lg font-bold sm:text-xl ${
              en ? "font-[family-name:var(--font-space-grotesk)]" : ""
            }`}
            style={{ color: mission.tint }}
          >
            {mission.chapter[lang]}
          </p>

          <p className="mt-5 max-w-[52ch] text-base leading-[1.85] text-[#c3c0d4] sm:text-lg">
            {mission.body[lang]}
          </p>

          {/* خط لهجه‌ای که با ورود به دید کشیده می‌شود */}
          <motion.div
            initial={still ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={still ? { duration: 0 } : { duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-px w-28 ltr:origin-left rtl:origin-right"
            style={{ background: mission.tint, opacity: 0.5 }}
          />
        </Reveal>
      </div>
    </section>
  );
}
