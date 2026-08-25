"use client";

import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStill } from "./useStill";

/**
 * سه لایه ستاره با سرعت پارالاکس متفاوت — همان چیزی که عمق را می‌سازد.
 *
 * ستاره‌ها یک div با هزار box-shadow نیستند (که کند است) و Math.random هم
 * نیستند (که سرور و کلاینت را ناهماهنگ می‌کند و hydration را می‌شکند).
 * به‌جایش یک مولد عددِ قطعی با بذر ثابت داریم، پس هر بار همان آسمان
 * ساخته می‌شود — روی سرور و روی مرورگر، یکسان.
 *
 * هر لایه یک المان است با box-shadow چندگانه؛ کل صفحه سه المان دارد،
 * نه سیصدتا. جابه‌جایی هم فقط transform است تا روی GPU بماند.
 */

/** mulberry32 — کوچک، سریع، و با یک بذر همیشه همان دنباله را می‌دهد */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stars(count: number, seed: number, spread: number) {
  const rnd = seeded(seed);
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = (rnd() * spread).toFixed(1);
    const y = (rnd() * 100).toFixed(2);
    // بیشترشان کم‌نور باشند، وگرنه آسمان به‌جای عمق، نویز می‌شود
    const a = (0.18 + rnd() * 0.62).toFixed(2);
    out.push(`${x}px ${y}vh 0 0 rgba(255,255,255,${a})`);
  }
  return out.join(",");
}

export default function Starfield() {
  const still = useStill();
  const { scrollYProgress } = useScroll();

  // لایهٔ دور کم‌ترین حرکت را دارد و لایهٔ نزدیک بیشترین — قاعدهٔ پارالاکس
  const far = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const mid = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const near = useTransform(scrollYProgress, [0, 1], ["0%", "-44%"]);

  const layers = useMemo(
    () => [
      { shadow: stars(220, 12345, 2400), size: 1, y: far, blur: 0 },
      { shadow: stars(110, 67890, 2400), size: 2, y: mid, blur: 0 },
      { shadow: stars(38, 24680, 2400), size: 3, y: near, blur: 0.4 },
    ],
    [far, mid, near],
  );

  return (
    // z-0 و نه z منفی: والد پس‌زمینهٔ خودش را دارد و لایهٔ منفی پشت آن گم می‌شود
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* سحابی — رنگی که کل صفحه را از سیاهِ مرده درمی‌آورد */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 78% 8%,  rgba(124,58,237,.22), transparent 62%),
            radial-gradient(ellipse 60% 45% at 12% 34%, rgba(59,130,196,.16), transparent 60%),
            radial-gradient(ellipse 80% 40% at 60% 78%, rgba(244,63,94,.10),  transparent 66%),
            #0F0F23`,
        }}
      />

      {layers.map((l, i) => (
        <motion.div
          key={i}
          style={{ y: still ? 0 : l.y }}
          className="absolute inset-0 will-change-transform"
        >
          <div
            className="absolute left-0 top-0 rounded-full"
            style={{
              width: l.size,
              height: l.size,
              boxShadow: l.shadow,
              filter: l.blur ? `blur(${l.blur}px)` : undefined,
            }}
          />
        </motion.div>
      ))}

      {/* پایین صفحه تیره‌تر می‌شود تا فوتر و متن‌ها جدا بنشینند */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0F0F23] to-transparent" />
    </div>
  );
}
