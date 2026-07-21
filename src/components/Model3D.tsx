"use client";

import { useEffect, useRef, createElement } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

/**
 * نمایش مدل سه‌بعدی (public/images/3d_remember.glb) با <model-viewer> گوگل.
 * خودِ مدل آروم می‌چرخه (auto-rotate) و کل المان با اسکرول بالا/پایین شناور می‌شه.
 * در حالت reduced-motion چرخش و شناوری خاموشه.
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
    style: { width: "100%", height: "360px", backgroundColor: "transparent" },
  };

  return (
    <div ref={ref} className="relative flex items-center justify-center min-h-[360px]">
      {/* هاله‌ی بنفش پشت مدل */}
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf633 0%, transparent 65%)" }}
      />
      <motion.div style={{ y }} className="w-full will-change-transform">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {createElement("model-viewer", modelProps as any)}
      </motion.div>
    </div>
  );
}
