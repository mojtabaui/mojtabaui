"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useStill } from "./useStill";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * ورودِ یک المان به صفحه — یا با اسکرول (`onView`) یا موقع لود.
 *
 * تفاوتش با FadeIn سایت این است که در حالت کاهش حرکت، انیمیشن را کوتاه
 * نمی‌کند بلکه از اساس اجرا نمی‌کند: `initial` هم خاموش می‌شود. اگر فقط
 * مدت را صفر کنیم، المان همچنان از opacity صفر شروع می‌کند و کاربری که
 * حرکت را خاموش کرده یک پرشِ ناگهانی می‌بیند — دقیقاً همان چیزی که
 * نمی‌خواسته ببیند.
 *
 * نوعِ المان هیچ‌وقت عوض نمی‌شود (همیشه motion.div) تا React مجبور به
 * ساختن دوبارهٔ درخت نشود.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  onView = false,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** با ورود به دید اجرا شود، نه موقع لود */
  onView?: boolean;
  className?: string;
}) {
  const still = useStill();
  const shown = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={still ? false : { opacity: 0, y }}
      {...(onView
        ? { whileInView: shown, viewport: { once: true, margin: "-70px" } }
        : { animate: shown })}
      transition={still ? { duration: 0 } : { duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
