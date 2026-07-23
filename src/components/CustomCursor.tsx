"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import {
  STACHE_LEFT,
  STACHE_RIGHT,
  STACHE_PIVOT,
  STACHE_HINGE,
} from "@/components/BrandMark";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * آیا این دستگاه نشانگر دقیق داره.
 *
 * با useSyncExternalStore خونده می‌شه نه با setState داخل effect، چون
 * این یک مقدار خارجیه و این هوک دقیقاً برای همین ساخته شده. اسنپ‌شات
 * سمت سرور false برمی‌گردونه تا رندر اولیه با کلاینت مطابق باشه.
 */
function useFinePointer() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(FINE_POINTER);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(FINE_POINTER).matches,
    () => false
  );
}

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
  const [isHovering, setIsHovering] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  // با ref نگه می‌داریم تا هر mousemove باعث رندر دوباره نشه؛
  // فقط لحظه‌ی شروع و پایان حرکت state عوض می‌شه
  const movingRef = useRef(false);
  const idleTimer = useRef<number | undefined>(undefined);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const glyphX = useSpring(mouseX, { stiffness: 1100, damping: 42 });
  const glyphY = useSpring(mouseY, { stiffness: 1100, damping: 42 });
  const ringX = useSpring(mouseX, { stiffness: 170, damping: 26 });
  const ringY = useSpring(mouseY, { stiffness: 170, damping: 26 });

  const finePointer = useFinePointer();
  const enabled = finePointer && !reduce;

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!movingRef.current) {
        movingRef.current = true;
        setIsMoving(true);
      }
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        movingRef.current = false;
        setIsMoving(false);
      }, 160);
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
      window.clearTimeout(idleTimer.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mouseX, mouseY, enabled]);

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

      {/* سیبیل برند، با بال‌هایی که موقع حرکت آروم می‌زنن */}
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
        <svg viewBox="0 4 120 108" width={30} height={27} aria-hidden>
          {/* هر بال به سمت خودش می‌چرخه: راست به راست، چپ به چپ */}
          {[
            { d: STACHE_LEFT, dir: -1 },
            { d: STACHE_RIGHT, dir: 1 },
          ].map(({ d, dir }) => (
            <motion.path
              key={dir}
              d={d}
              fill="currentColor"
              style={{
                transformBox: "view-box",
                transformOrigin: `${STACHE_PIVOT.x}px ${STACHE_PIVOT.y}px`,
              }}
              animate={isMoving ? { rotate: [0, dir * 15, 0] } : { rotate: 0 }}
              transition={
                isMoving
                  ? { duration: 0.55, repeat: Infinity, ease: "easeInOut" }
                  : { type: "spring", stiffness: 260, damping: 20 }
              }
            />
          ))}
          {/* لولای ثابت، درز مرکزی را می‌پوشاند */}
          <ellipse
            cx={STACHE_HINGE.cx}
            cy={STACHE_HINGE.cy}
            rx={STACHE_HINGE.rx}
            ry={STACHE_HINGE.ry}
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </>
  );
}
