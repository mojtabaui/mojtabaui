"use client";

import { useEffect, useRef, createElement } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Award, Star, Users, Sparkles, Percent } from "lucide-react";

/**
 * مدل سه‌بعدی (public/images/3d_remember.glb) با <model-viewer> + المان‌های تزئینی.
 *
 * حرکت‌ها:
 *  • شناوریِ خودکارِ چیپ‌ها (bob) — فقط وقتی reduced-motion خاموشه.
 *  • پارالاکس گره‌خورده به چرخشِ مدل: با رویداد camera-change زاویه‌ی دوربین خونده
 *    می‌شه و چیپ‌ها به‌اندازه‌ی عمق‌شون جابه‌جا می‌شن.
 *  • پارالاکس نشانگر/لمس روی کل قاب (روی موبایل هم کار می‌کنه).
 *  حرکتِ کاربر-محور (درگ/لمس) حتی در reduced-motion فعاله؛ فقط bobِ خودکار خاموش می‌شه.
 */
export default function Model3D() {
  const ref = useRef<HTMLDivElement>(null);
  const mvRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  // اسکرول → شناوری عمودیِ کل تصویر
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ySpring = useSpring(yRaw, { stiffness: 80, damping: 20 });
  const y = reduce ? 0 : ySpring;

  // زاویه‌ی افقیِ دوربینِ مدل (رادیان) و موقعیت نشانگر/لمس روی قاب
  const azimuth = useMotionValue(0);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const azS = useSpring(azimuth, { stiffness: 120, damping: 22 });
  const pxS = useSpring(px, { stiffness: 120, damping: 22 });
  const pyS = useSpring(py, { stiffness: 120, damping: 22 });

  // پارالاکسِ هر چیپ (جهت یکسان، مقدار متفاوت = حس عمق)
  const c1x = useTransform([azS, pxS], ([a, p]: number[]) => Math.sin(a) * 24 + p * 26);
  const c1y = useTransform(pyS, (p) => p * 18);
  const c2x = useTransform([azS, pxS], ([a, p]: number[]) => Math.sin(a) * 34 + p * 34);
  const c2y = useTransform(pyS, (p) => p * 22);
  const c3x = useTransform([azS, pxS], ([a, p]: number[]) => Math.sin(a) * 18 + p * 20);
  const c3y = useTransform(pyS, (p) => p * -16);
  const c4x = useTransform([azS, pxS], ([a, p]: number[]) => Math.sin(a) * 28 + p * 30);
  const c4y = useTransform(pyS, (p) => p * -14);
  // جرقه‌ها/نقاط — پارالاکس ملایم‌تر
  const dotx = useTransform([azS, pxS], ([a, p]: number[]) => Math.sin(a) * 12 + p * 12);

  // ثبت وب‌کامپوننت + گوش‌دادن به چرخش مدل
  useEffect(() => {
    import("@google/model-viewer");
    const el = mvRef.current;
    if (!el) return;
    const onCam = () => {
      const orbit = (el as unknown as {
        getCameraOrbit?: () => { theta: number };
      }).getCameraOrbit?.();
      if (orbit) azimuth.set(orbit.theta);
    };
    el.addEventListener("camera-change", onCam);
    return () => el.removeEventListener("camera-change", onCam);
  }, [azimuth]);

  function handlePointer(e: React.PointerEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  const modelProps: Record<string, unknown> = {
    ref: mvRef,
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

  // شناوریِ خودکار (در reduced-motion غیرفعال)
  const bob = (delay: number, dist = 12) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -dist, 0] },
          transition: {
            duration: 3.4,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointer}
      onPointerLeave={handleLeave}
      className="relative flex items-center justify-center min-h-[420px]"
    >
      <div className="relative w-full max-w-[380px] flex items-center justify-center">
        {/* هاله‌ی بنفش */}
        <div
          className="absolute w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #8b5cf62e 0%, transparent 66%)" }}
        />

        {/* حلقه‌های نقطه‌چین */}
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

        {/* نقاط و جرقه‌ها — با چرخش مدل کمی جابه‌جا می‌شن */}
        <motion.span aria-hidden style={{ x: dotx }} className="absolute top-10 right-10 w-2.5 h-2.5 rounded-full bg-[#8b5cf6] pointer-events-none" {...bob(0.4, 8)} />
        <motion.span aria-hidden style={{ x: dotx }} className="absolute bottom-14 right-14 w-2 h-2 rounded-full bg-amber-400 pointer-events-none" {...bob(1.1, 8)} />
        <motion.span aria-hidden style={{ x: dotx }} className="absolute top-1/2 left-6 w-1.5 h-1.5 rounded-full bg-emerald-500 pointer-events-none" {...bob(1.8, 8)} />
        <motion.span aria-hidden style={{ x: dotx }} className="absolute bottom-24 left-16 w-2 h-2 rounded-full bg-[#8b5cf6]/60 pointer-events-none" {...bob(0.9, 8)} />
        <Sparkles size={18} className="absolute top-16 left-12 text-[#8b5cf6]/50 pointer-events-none" aria-hidden />
        <Sparkles size={14} className="absolute bottom-12 right-24 text-amber-400/60 pointer-events-none" aria-hidden />

        {/* مدل سه‌بعدی */}
        <motion.div style={{ y }} className="relative z-10 w-full will-change-transform">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {createElement("model-viewer", modelProps as any)}
        </motion.div>

        {/* چیپ‌ها — پارالاکسِ گره‌خورده به چرخش/نشانگر (بیرونی) + شناوری خودکار (درونی) */}
        <motion.div style={{ x: c1x, y: c1y }} className="absolute top-6 right-6 z-20 pointer-events-none">
          <motion.div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#e8e2d9] rounded-2xl px-3 py-2 shadow-[0_12px_30px_-12px_rgba(26,23,20,0.28)]" {...bob(0)}>
            <span className="w-7 h-7 rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center">
              <Award size={15} />
            </span>
            <span className="font-body font-semibold text-xs text-[#1a1714]">گواهی معتبر</span>
          </motion.div>
        </motion.div>

        <motion.div style={{ x: c2x, y: c2y }} className="absolute top-20 left-3 z-20 pointer-events-none">
          <motion.div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-[#e8e2d9] rounded-2xl px-3 py-2 shadow-[0_12px_30px_-12px_rgba(26,23,20,0.28)]" {...bob(0.7)}>
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="font-display font-bold text-sm text-[#1a1714]">۴.۹</span>
            <span className="font-body text-[10px] text-[#a09990]">از ۵</span>
          </motion.div>
        </motion.div>

        <motion.div style={{ x: c3x, y: c3y }} className="absolute bottom-12 left-6 z-20 pointer-events-none">
          <motion.div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#e8e2d9] rounded-2xl px-3 py-2 shadow-[0_12px_30px_-12px_rgba(26,23,20,0.28)]" {...bob(1.4)}>
            <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Users size={15} />
            </span>
            <div className="leading-tight">
              <div className="font-display font-bold text-sm text-[#1a1714]">+۶٬۵۰۰</div>
              <div className="font-body text-[10px] text-[#a09990] -mt-0.5">دانشجو</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ x: c4x, y: c4y }} className="absolute bottom-4 right-8 z-20 pointer-events-none">
          <motion.div className="flex items-center gap-1.5 bg-[#8b5cf6] text-white rounded-full px-3.5 py-2 shadow-[0_12px_30px_-10px_rgba(139,92,246,0.7)]" {...bob(2, 9)}>
            <Percent size={13} />
            <span className="font-body font-bold text-xs">تخفیف ویژه</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
