"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroDecor() {
  const { scrollY } = useScroll();
  // DESIGN text moves up faster than scroll → classic parallax
  const y       = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 500], [1,  0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
      style={{ y, opacity }}
      dir="ltr"
    >
      <span
        className="font-display font-black leading-none whitespace-nowrap"
        style={{
          fontSize: "clamp(4rem, 11vw, 9.5rem)",
          color: "#7c5cfc",
          opacity: 0.1,
          letterSpacing: "-0.02em",
        }}
      >
        DESIGN
      </span>
    </motion.div>
  );
}
