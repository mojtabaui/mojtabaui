"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  value: string;   // e.g. "۷,۰۰۰+"
  label: string;
}

export default function AnimatedCounter({ value, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isInView) setShow(true);
  }, [isInView]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display font-black text-3xl md:text-4xl text-white transition-all duration-700"
        style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(16px)" }}
      >
        {value}
      </div>
      <div className="font-body text-xs text-white/40 mt-1">{label}</div>
    </div>
  );
}
