"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

/**
 * شبکه‌ای که فقط دورِ نشانگر دیده می‌شود.
 *
 * پس‌زمینهٔ شبکه‌ایِ همیشه‌روشن، صفحه را شلوغ می‌کند و با «مینیمال»
 * جور درنمی‌آید. ولی شبکه‌ای که با ماوس روشن می‌شود، دو کار می‌کند:
 * به فضای خالی بافت می‌دهد بدون اینکه دیده شود، و به کاربر می‌گوید
 * صفحه زنده است.
 *
 * روی canvas کشیده می‌شود نه DOM. یک شبکهٔ ۲۴ پیکسلی روی صفحهٔ
 * ۱۴۴۰×۹۰۰ حدود ۲۲۰۰ سلول دارد؛ همان تعداد گرهٔ DOM با opacityِ
 * متغیر، هر فریم یک layout کاملِ صفحه می‌سازد و روی موبایل کلاً
 * می‌ایستد.
 *
 * فقط سلول‌های داخلِ شعاعِ نور پیمایش می‌شوند، پس هزینه به اندازهٔ
 * صفحه بستگی ندارد.
 */

const CELL = 26;
/** شعاعِ روشنایی بر حسبِ پیکسل */
const REACH = 190;

export default function GridField({
  /**
   * رنگِ خطوط به‌صورت «r,g,b».
   *
   * می‌تواند MotionValue باشد: در آن حالت مستقیم به آن گوش می‌دهیم
   * و مقدار را در یک ref می‌نویسیم. اگر به‌جایش با useTransform به
   * prop وصلش می‌کردیم، هر فریمِ اسکرول یک رندرِ React می‌گرفت —
   * برای چیزی که فقط یک رشته در canvas است.
   */
  color = "124,92,252",
  className = "",
}: {
  color?: string | MotionValue<string>;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const tone = useRef(typeof color === "string" ? color : color.get());

  useEffect(() => {
    if (typeof color === "string") {
      tone.current = color;
      return;
    }
    tone.current = color.get();
    return color.on("change", (v) => {
      tone.current = v;
    });
  }, [color]);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      const r = cvs.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      cvs.width = Math.round(w * dpr);
      cvs.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cvs);

    /**
     * دو نقطه نگه می‌داریم: جایی که نشانگر واقعاً هست، و جایی که
     * نور *رسیده*. دومی با تأخیر به اولی نزدیک می‌شود — بدون این
     * تأخیر، حرکت عصبی و چسبیده به ماوس حس می‌شود.
     */
    const target = { x: -9999, y: -9999 };
    const at = { x: -9999, y: -9999 };
    /** ۰ وقتی نشانگر بیرون است، ۱ وقتی داخل. برای محو شدنِ نرم. */
    let presence = 0;
    let wanted = 0;

    /**
     * روی لمس، ماوسی در کار نیست و اثر هیچ‌وقت دیده نمی‌شود.
     *
     * به‌جای خاموش کردنش، نقطهٔ نور را روی یک مسیرِ آرام می‌گذاریم
     * تا پس‌زمینه همان بافت را داشته باشد. دو بسامدِ ناهم‌خوان است
     * تا مسیر بسته و تکراری نشود.
     */
    const coarse = window.matchMedia("(hover: none)").matches;
    if (coarse) wanted = 1;

    const onMove = (e: PointerEvent) => {
      const r = cvs.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      wanted = 1;
      // اولین حرکت نباید از گوشهٔ صفحه بیاید
      if (at.x < -1000) {
        at.x = target.x;
        at.y = target.y;
      }
    };
    const onLeave = () => {
      wanted = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);

      if (coarse) {
        const s = performance.now() / 1000;
        target.x = w * (0.5 + 0.3 * Math.sin(s * 0.21));
        target.y = h * (0.5 + 0.26 * Math.sin(s * 0.13 + 1.7));
        if (at.x < -1000) {
          at.x = target.x;
          at.y = target.y;
        }
      }

      at.x += (target.x - at.x) * 0.12;
      at.y += (target.y - at.y) * 0.12;
      presence += (wanted - presence) * 0.07;

      ctx.clearRect(0, 0, w, h);
      if (presence < 0.01) return;

      // فقط سلول‌های داخلِ شعاع — نه کلِ صفحه
      const c0 = Math.max(0, Math.floor((at.x - REACH) / CELL));
      const c1 = Math.min(Math.ceil(w / CELL), Math.ceil((at.x + REACH) / CELL));
      const r0 = Math.max(0, Math.floor((at.y - REACH) / CELL));
      const r1 = Math.min(Math.ceil(h / CELL), Math.ceil((at.y + REACH) / CELL));

      ctx.lineWidth = 1;
      const rgb = tone.current;

      for (let c = c0; c <= c1; c++) {
        for (let r = r0; r <= r1; r++) {
          const x = c * CELL;
          const y = r * CELL;
          const d = Math.hypot(x - at.x, y - at.y);
          if (d > REACH) continue;

          // افتِ نرم از مرکز به لبه — خطی، لبهٔ شعاع را نشان می‌دهد
          const f = (1 - d / REACH) ** 2 * presence;
          if (f < 0.012) continue;

          ctx.strokeStyle = `rgba(${rgb},${f * 0.55})`;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + CELL, y);
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + CELL);
          ctx.stroke();

          // گرهٔ تقاطع — نزدیکِ مرکز پررنگ‌تر، مثل چراغِ شبکه
          if (f > 0.3) {
            ctx.fillStyle = `rgba(${rgb},${(f - 0.3) * 1.1})`;
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }
    };

    if (!reduce) draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
