"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

/**
 * المان سه‌بعدی اسکرول‌خور برای سکشن تماس.
 *
 * منبع الگو: دیتای motion اسکیل ui-ux-pro-max —
 *   • «3d tilt / cursor follow» (رفتار موس، شدت clamp‌شده)
 *   • «scroll scrub» (چرخش گره‌خورده به موقعیت اسکرول، نه پرشی)
 *   • «parallax depth» (لایه‌های تزئینی با translateZ متفاوت)
 *
 * اصول رعایت‌شده: فقط transform/opacity، will-change: transform،
 * چرخش‌ها spring‌شده تا نرم باشن، و در حالت reduced-motion کاملاً ساکن.
 */
export default function Scroll3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // چرخش/شناوریِ گره‌خورده به اسکرول
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollRotX = useSpring(useTransform(scrollYProgress, [0, 1], [16, -16]), {
    stiffness: 80,
    damping: 20,
  });
  const scrollY = useSpring(useTransform(scrollYProgress, [0, 1], [36, -36]), {
    stiffness: 80,
    damping: 20,
  });

  // کج‌شدن به‌سمت نشانگر موس (شدت محدود تا از قاب بیرون نزنه)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-16, 16]), {
    stiffness: 150,
    damping: 15,
  });
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 15,
  });

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  // در حالت reduced-motion همه چیز ساکن
  const rotateX = reduce ? 0 : scrollRotX;
  const rotateY = reduce ? 0 : tiltY;
  const rotateXCursor = reduce ? 0 : tiltX;
  const y = reduce ? 0 : scrollY;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex items-center justify-center min-h-[360px] select-none"
      style={{ perspective: 1000 }}
    >
      {/* هاله‌ی بنفش پشت */}
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf633 0%, transparent 65%)" }}
      />

      <motion.div
        style={{ y, rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative will-change-transform"
      >
        {/* لایه‌های شناور با عمق مختلف */}
        <motion.div
          aria-hidden
          className="absolute -top-9 -right-9 w-16 h-16 rounded-2xl bg-[#8b5cf6]/15 border border-[#8b5cf6]/30"
          style={{ transform: "translateZ(70px)" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-7 -left-11 w-24 h-9 rounded-full bg-white border border-[#e8e2d9] shadow-sm"
          style={{ transform: "translateZ(38px)" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/2 -left-14 w-3 h-3 rounded-full bg-[#8b5cf6]"
          style={{ transform: "translateZ(90px)" }}
        />

        {/* کارت اصلی — کج‌شدن عمودی از روی موس روی همین لایه */}
        <motion.div
          style={{ rotateX: rotateXCursor, transformStyle: "preserve-3d" }}
          className="w-52 h-52 sm:w-60 sm:h-60 rounded-[2rem] bg-white border border-[#e8e2d9] shadow-[0_30px_60px_-15px_rgba(26,23,20,0.25)] flex items-center justify-center"
        >
          <Image
            src="/images/logo_square.png"
            alt="مدرسه دیزاین ملینا"
            width={778}
            height={710}
            className="w-28 h-auto"
            style={{ transform: "translateZ(45px)" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
