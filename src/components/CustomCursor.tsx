"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 40 });
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 26 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 26 });

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      setIsHovering(!!t.closest("a, button, summary, [role='button'], [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* dot — mix-blend-difference inverts underlying colour */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#1a1714] mix-blend-difference"
        style={{ translateX: dotX, translateY: dotY, marginLeft: -4, marginTop: -4 }}
        animate={{ width: isHovering ? 14 : 8, height: isHovering ? 14 : 8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
      {/* ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#1a1714]/30"
        style={{ translateX: ringX, translateY: ringY }}
        animate={{
          width:       isHovering ? 52 : 32,
          height:      isHovering ? 52 : 32,
          marginLeft:  isHovering ? -26 : -16,
          marginTop:   isHovering ? -26 : -16,
          opacity:     isHovering ? 0.5 : 0.25,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}
