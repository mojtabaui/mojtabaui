"use client";

import { useEffect, useRef, createElement } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Award, Star, Users, Sparkles, Percent } from "lucide-react";

/**
 * نمایش مدل سه‌بعدی (public/images/3d_remember.glb) با <model-viewer> گوگل،
 * همراه با المان‌های تزئینی شناور (چیپ‌های گواهی/امتیاز/دانشجو/تخفیف، حلقه‌های
 * نقطه‌چین، هاله و نقاط درخشان). همه‌چیز داخل یک قاب مرکزیِ باعرض ثابت چیده شده
 * تا چیپ‌ها نزدیک خودِ کلاه بشینن. مدل ثابته و فقط با درگ کاربر می‌چرخه؛ کل تصویر
 * با اسکرول کمی شناور می‌شه. در حالت reduced-motion همه‌ی حرکت‌ها خاموشن.
 */
export default function Model3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ySpring = useSpring(yRaw, { stiffness: 80, damping: 20 });
  const y = reduce ? 0 : ySpring;

  // ثبت وب‌کامپوننت فقط سمت کلاینت
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  // مدل ثابت می‌مونه (بدون چرخش خودکار)، ولی کاربر می‌تونه با درگ بچرخونتش
  const modelProps: Record<string, unknown> = {
    src: "/images/3d_remember.glb",
    alt: "المان سه‌بعدی مدرسه دیزاین ملینا",
    "camera-controls": true,
    "disable-zoom": true,
    "touch-action": "pan-y",
    "interaction-prompt": "none",
    "shadow-intensity": "0.6",
    exposure: "1.05",
    style: { width: "100%", height: "320px", backgroundColor: "transparent" },
  };

  // حرکت شناورِ ملایم (در reduced-motion غیرفعال)
  const bob = (delay: number, dist = 9) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -dist, 0] },
          transition: {
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <div ref={ref} className="relative flex items-center justify-center min-h-[420px]">
      {/* قاب مرکزی — چیپ‌ها نسبت به همین قاب نزدیک کلاه می‌شینن */}
      <div className="relative w-full max-w-[380px] flex items-center justify-center">
        {/* هاله‌ی بنفش پشت مدل */}
        <div
          className="absolute w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #8b5cf62e 0%, transparent 66%)" }}
        />

        {/* حلقه‌های نقطه‌چین تزئینی */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          width="360"
          height="360"
          viewBox="0 0 360 360"
          fill="none"
          aria-hidden
        >
          <circle cx="180" cy="180" r="132" stroke="#8b5cf6" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="3 9" />
          <circle cx="180" cy="180" r="168" stroke="#1a1714" strokeOpacity="0.06" strokeWidth="1.5" />
          <circle cx="180" cy="180" r="168" stroke="#8b5cf6" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="2 26" />
        </svg>

        {/* نقاط و جرقه‌های درخشان */}
        <motion.span aria-hidden className="absolute top-10 right-10 w-2.5 h-2.5 rounded-full bg-[#8b5cf6] pointer-events-none" {...bob(0.4)} />
        <motion.span aria-hidden className="absolute bottom-14 right-14 w-2 h-2 rounded-full bg-amber-400 pointer-events-none" {...bob(1.1)} />
        <motion.span aria-hidden className="absolute top-1/2 left-6 w-1.5 h-1.5 rounded-full bg-emerald-500 pointer-events-none" {...bob(1.8)} />
        <motion.span aria-hidden className="absolute bottom-24 left-16 w-2 h-2 rounded-full bg-[#8b5cf6]/60 pointer-events-none" {...bob(0.9)} />
        <Sparkles size={18} className="absolute top-16 left-12 text-[#8b5cf6]/50 pointer-events-none" aria-hidden />
        <Sparkles size={14} className="absolute bottom-12 right-24 text-amber-400/60 pointer-events-none" aria-hidden />

        {/* مدل سه‌بعدی — با اسکرول کمی شناور می‌شه */}
        <motion.div style={{ y }} className="relative z-10 w-full will-change-transform">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {createElement("model-viewer", modelProps as any)}
        </motion.div>

        {/* چیپ‌های شناور — نزدیک کلاه */}
        <motion.div
          className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#e8e2d9] rounded-2xl px-3 py-2 shadow-[0_12px_30px_-12px_rgba(26,23,20,0.28)] pointer-events-none"
          {...bob(0)}
        >
          <span className="w-7 h-7 rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center">
            <Award size={15} />
          </span>
          <span className="font-body font-semibold text-xs text-[#1a1714]">گواهی معتبر</span>
        </motion.div>

        <motion.div
          className="absolute top-20 left-3 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-[#e8e2d9] rounded-2xl px-3 py-2 shadow-[0_12px_30px_-12px_rgba(26,23,20,0.28)] pointer-events-none"
          {...bob(0.7)}
        >
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span className="font-display font-bold text-sm text-[#1a1714]">۴.۹</span>
          <span className="font-body text-[10px] text-[#a09990]">از ۵</span>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#e8e2d9] rounded-2xl px-3 py-2 shadow-[0_12px_30px_-12px_rgba(26,23,20,0.28)] pointer-events-none"
          {...bob(1.4)}
        >
          <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Users size={15} />
          </span>
          <div className="leading-tight">
            <div className="font-display font-bold text-sm text-[#1a1714]">+۷٬۰۰۰</div>
            <div className="font-body text-[10px] text-[#a09990] -mt-0.5">دانشجو</div>
          </div>
        </motion.div>

        {/* پیل تخفیف — تِمِ سکشن */}
        <motion.div
          className="absolute bottom-4 right-8 z-20 flex items-center gap-1.5 bg-[#8b5cf6] text-white rounded-full px-3.5 py-2 shadow-[0_12px_30px_-10px_rgba(139,92,246,0.7)] pointer-events-none"
          {...bob(2, 7)}
        >
          <Percent size={13} />
          <span className="font-body font-bold text-xs">تخفیف ویژه</span>
        </motion.div>
      </div>
    </div>
  );
}
