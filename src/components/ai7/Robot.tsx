"use client";

import { useId } from "react";

/**
 * ربات AI7. تمام رنگ‌هایش از متغیرهای CSS می‌آید نه از prop.
 *
 * دلیلش این است که رنگ‌ها با اسکرول تغییر می‌کنند و اگر prop بودند، هر
 * فریم کل کامپوننت دوباره رندر می‌شد. با متغیر، فقط مرورگر مقدار را
 * عوض می‌کند و React اصلاً بیدار نمی‌شود.
 *
 *   --r-lit   سطحِ رو به نور
 *   --r-mid   سطحِ میانه
 *   --r-dark  سطحِ سایه
 *   --r-edge  خطِ لبه‌ها
 *   --r-glow  نورِ چشم و هستهٔ سینه
 *   --r-eye   شدت آن نور، ۰ تا ۱
 *   --r-halo  شدت هالهٔ پشتِ سر
 *
 * شناسه‌های گرادیانت با useId ساخته می‌شوند چون ربات ممکن است بیش از
 * یک بار روی صفحه باشد و شناسهٔ تکراری باعث می‌شود نسخهٔ دوم گرادیانتِ
 * اولی را بردارد — که در آزمایش دقیقاً همین اتفاق افتاد.
 */
export default function Robot({ className = "" }: { className?: string }) {
  const raw = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${raw}`;

  return (
    <svg
      viewBox="0 0 400 520"
      className={`block h-auto w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id("shell")} x1="18%" y1="0%" x2="88%" y2="100%">
          <stop offset="0" stopColor="var(--r-lit)" />
          <stop offset=".45" stopColor="var(--r-mid)" />
          <stop offset="1" stopColor="var(--r-dark)" />
        </linearGradient>

        <linearGradient id={id("shellV")} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0" stopColor="var(--r-mid)" />
          <stop offset="1" stopColor="var(--r-dark)" />
        </linearGradient>

        <linearGradient id={id("visor")} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0" stopColor="var(--r-visor-a)" />
          <stop offset="1" stopColor="var(--r-visor-b)" />
        </linearGradient>

        <radialGradient id={id("core")} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--r-glow)" stopOpacity="var(--r-eye)" />
          <stop offset=".55" stopColor="var(--r-glow)" stopOpacity="var(--r-eye-soft)" />
          <stop offset="1" stopColor="var(--r-glow)" stopOpacity="0" />
        </radialGradient>

        {/* بازتابِ لبه: کره را از پس‌زمینه جدا می‌کند */}
        <linearGradient id={id("rim")} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0" stopColor="#fff" stopOpacity="var(--r-rim-a)" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="var(--r-rim-b)" />
        </linearGradient>
      </defs>

      {/* هالهٔ نور پشتِ سر */}
      <ellipse
        cx="200"
        cy="152"
        rx="132"
        ry="124"
        fill={`url(#${id("core")})`}
        style={{ opacity: "var(--r-halo)" }}
      />

      {/* تنه */}
      <path
        d="M70 476 C74 404 104 344 152 326 L248 326 C296 344 326 404 330 476 Z"
        fill={`url(#${id("shellV")})`}
        stroke="var(--r-edge)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M70 476 C74 404 104 344 152 326 L248 326 C296 344 326 404 330 476 Z"
        fill={`url(#${id("rim")})`}
      />

      {/* درزهای سینه */}
      <path d="M200 336 L200 470" stroke="var(--r-edge)" strokeWidth="1.2" opacity=".5" />
      <path
        d="M126 404 C154 386 246 386 274 404"
        fill="none"
        stroke="var(--r-edge)"
        strokeWidth="1.2"
        opacity=".42"
      />

      {/* هستهٔ سینه */}
      <circle cx="200" cy="392" r="30" fill={`url(#${id("core")})`} />
      <circle
        cx="200"
        cy="392"
        r="15"
        fill="none"
        stroke="var(--r-glow)"
        strokeWidth="2.4"
        style={{ opacity: "var(--r-eye)" }}
      />
      <circle cx="200" cy="392" r="5.5" fill="var(--r-glow)" style={{ opacity: "var(--r-eye)" }} />

      {/* گردن */}
      <path
        d="M172 246 L228 246 L232 316 L168 316 Z"
        fill={`url(#${id("shellV")})`}
        stroke="var(--r-edge)"
        strokeWidth="1.3"
      />
      <path d="M170 272 L230 272" stroke="var(--r-edge)" strokeWidth="1.1" opacity=".55" />
      <path d="M169 292 L231 292" stroke="var(--r-edge)" strokeWidth="1.1" opacity=".55" />

      {/* سر */}
      <rect
        x="118"
        y="66"
        width="164"
        height="188"
        rx="72"
        fill={`url(#${id("shell")})`}
        stroke="var(--r-edge)"
        strokeWidth="1.6"
      />
      <rect x="118" y="66" width="164" height="188" rx="72" fill={`url(#${id("rim")})`} />

      {/* ویزور */}
      <rect
        x="142"
        y="112"
        width="116"
        height="66"
        rx="33"
        fill={`url(#${id("visor")})`}
        stroke="var(--r-edge)"
        strokeWidth="1.2"
      />

      {/* چشم‌ها */}
      <circle cx="174" cy="145" r="20" fill={`url(#${id("core")})`} />
      <circle cx="226" cy="145" r="20" fill={`url(#${id("core")})`} />
      <circle cx="174" cy="145" r="9" fill="var(--r-glow)" style={{ opacity: "var(--r-eye)" }} />
      <circle cx="226" cy="145" r="9" fill="var(--r-glow)" style={{ opacity: "var(--r-eye)" }} />

      {/* خطوط سر */}
      <path
        d="M158 92 C180 80 220 80 242 92"
        fill="none"
        stroke="var(--r-edge)"
        strokeWidth="1.3"
        opacity=".65"
      />
      <path
        d="M150 214 C176 228 224 228 250 214"
        fill="none"
        stroke="var(--r-edge)"
        strokeWidth="1.3"
        opacity=".5"
      />

      {/* گوش‌ها */}
      <rect
        x="104"
        y="140"
        width="16"
        height="44"
        rx="8"
        fill="var(--r-dark)"
        stroke="var(--r-edge)"
        strokeWidth="1.2"
      />
      <rect
        x="280"
        y="140"
        width="16"
        height="44"
        rx="8"
        fill="var(--r-dark)"
        stroke="var(--r-edge)"
        strokeWidth="1.2"
      />
    </svg>
  );
}
