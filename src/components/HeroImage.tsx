"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroImage() {
  const { scrollY } = useScroll();
  const scale   = useTransform(scrollY, [0,   800], [1,    1.18]);
  const opacity = useTransform(scrollY, [300, 750], [1,    0   ]);

  return (
    <div
      className="self-end flex-shrink-0 hidden lg:block relative"
      style={{ width: 520 }}
    >
      {/* entrance: CSS fade-in-up (no SSR flash, no clip-path) */}
      <div className="fade-in-up" style={{ animationDelay: "350ms" }}>
        {/* scroll: scale up + fade out */}
        <motion.div
          style={{ scale, opacity }}
          className="will-change-transform origin-bottom"
        >
          <Image
            src="/images/hero.png"
            alt="مجتبا یزدان‌پناه"
            width={520}
            height={650}
            className="w-full h-auto block"
            style={{ transform: "scaleX(-1)", objectFit: "contain" }}
            priority
          />
        </motion.div>
      </div>

      {/* animated grain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="grain-animated absolute"
          style={{ inset: "-40%", width: "180%", height: "180%" }}
        />
      </div>
    </div>
  );
}
