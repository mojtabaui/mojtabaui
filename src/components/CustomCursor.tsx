"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { BrandGlyph } from "@/components/BrandMark";

/**
 * نشانگر سفارشی: خودِ سیبیلِ برند.
 *
 * سه لایه داره:
 *   • سیبیل که دقیق دنبال ماوس میاد
 *   • حلقه‌ای که با تأخیر می‌رسه و حس وزن می‌ده
 *   • موج کلیک که یک بار پخش می‌شه و محو
 *
 * روی دستگاه لمسی و در حالت reduced-motion اصلاً رندر نمی‌شه، چون اونجا
 * نشانگری در کار نیست و مخفی‌کردن نشانگر سیستم فقط مزاحمت می‌سازه.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const glyphX = useSpring(mouseX, { stiffness: 1100, damping: 42 });
  const glyphY = useSpring(mouseY, { stiffness: 1100, damping: 42 });
  const ringX = useSpring(mouseX, { stiffness: 170, damping: 26 });
  const ringY = useSpring(mouseY, { stiffness: 170, damping: 26 });

  useEffect(() => {
    // فقط روی دستگاهی که واقعاً نشانگر دقیق داره
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches || reduce) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      setIsHovering(
        !!t.closest("a, button, summary, input, textarea, select, [role='button'], [data-cursor-hover]")
      );
    };
    const onDown = (e: MouseEvent) => {
      setIsDown(true);
      const id = e.timeStamp;
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      // موج بعد از پایان انیمیشن از لیست پاک می‌شه تا DOM رشد نکنه
      window.setTimeout(() => {
        setRipples((r) => r.filter((p) => p.id !== id));
      }, 650);
    };
    const onUp = () => setIsDown(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mouseX, mouseY, reduce]);

  if (!enabled) return null;

  return (
    <>
      {/* موج کلیک */}
      {ripples.map((p) => (
        <motion.span
          key={p.id}
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border border-[#7c5cfc]"
          style={{ translateX: p.x, translateY: p.y, marginLeft: -14, marginTop: -14 }}
          initial={{ width: 28, height: 28, opacity: 0.55 }}
          animate={{ width: 78, height: 78, marginLeft: -39, marginTop: -39, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* حلقه‌ی دنبال‌کننده */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#1a1714]/25"
        style={{ translateX: ringX, translateY: ringY }}
        animate={{
          width: isHovering ? 54 : 34,
          height: isHovering ? 54 : 34,
          marginLeft: isHovering ? -27 : -17,
          marginTop: isHovering ? -27 : -17,
          opacity: isHovering ? 0.45 : 0.2,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      {/* سیبیل برند */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] text-[#1a1714]"
        style={{ translateX: glyphX, translateY: glyphY }}
        animate={{
          scale: isDown ? 0.78 : isHovering ? 1.28 : 1,
          marginLeft: -15,
          marginTop: -7,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 24 }}
      >
        <BrandGlyph size={30} />
      </motion.div>
    </>
  );
}
