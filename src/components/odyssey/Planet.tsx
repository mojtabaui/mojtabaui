"use client";

import { useId } from "react";
import type { Mission } from "@/lib/odyssey";

/**
 * یک سیاره، ساخته از فیلترهای SVG. عمداً WebGL نیست.
 *
 * سبکِ «3D & Hyperrealism» روی موبایل کارایی ضعیفی دارد، پس عمق را از
 * چیزهایی می‌گیریم که مرورگر خودش بلد است:
 *
 *   feTurbulence     نویزِ فرکتال → بافت واقعی سطح، نه یک گرادیانِ صاف
 *   feColorMatrix    همان نویز را به ماسکِ آلفا تبدیل می‌کند
 *   feDiffuseLighting همان نویز را این‌بار به‌عنوان ارتفاع می‌خواند و
 *                    با یک نورِ دوردست، برجستگی می‌سازد
 *   سایهٔ کروی        روزِ بالا-چپ تا شبِ عمیقِ پایین-راست
 *   نورِ لبه          باریکه‌ای که کره را از پس‌زمینه جدا می‌کند
 *
 * شناسه‌های فیلتر با useId ساخته می‌شوند چون یک سیاره ممکن است دو بار
 * روی صفحه باشد (ردیف بالا و سکشن خودش) و شناسهٔ تکراری باعث می‌شود
 * دومی فیلترِ اولی را بردارد.
 */

/** حلقهٔ زحل. front یعنی فقط نیمهٔ جلویی، که روی خودِ کره می‌افتد. */
function Ring({ m, uid, front }: { m: Mission; uid: string; front?: boolean }) {
  return (
    <g
      transform="translate(120 120) rotate(-15)"
      clipPath={front ? `url(#rf-${uid})` : undefined}
    >
      <g transform="scale(1 .23)">
        <circle r="152" fill="none" stroke={m.hi} strokeOpacity=".30" strokeWidth="30" />
        <circle r="132" fill="none" stroke={m.deep} strokeOpacity=".55" strokeWidth="4" />
        <circle r="121" fill="none" stroke={m.base} strokeOpacity=".50" strokeWidth="15" />
        <circle r="107" fill="none" stroke={m.hi} strokeOpacity=".24" strokeWidth="7" />
      </g>
    </g>
  );
}

export default function Planet({
  mission: m,
  className = "",
}: {
  mission: Mission;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 240 240"
      className={`block h-auto w-full overflow-visible ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* رنگِ سطح */}
        <filter id={`t-${uid}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={m.freq}
            numOctaves={m.oct}
            seed={m.seed}
            stitchTiles="stitch"
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            result="mask"
            values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .40 .40 .40 0 ${m.blot ?? -0.06}`}
          />
          <feFlood floodColor={m.hi} result="hi" />
          <feComposite in="hi" in2="mask" operator="in" result="blots" />
          <feFlood floodColor={m.base} result="base" />
          <feMerge>
            <feMergeNode in="base" />
            <feMergeNode in="blots" />
          </feMerge>
        </filter>

        {/* برجستگی سطح */}
        <filter id={`b-${uid}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={m.freq}
            numOctaves={m.oct}
            seed={m.seed}
            stitchTiles="stitch"
            result="n"
          />
          <feDiffuseLighting
            in="n"
            surfaceScale={m.rough * 3}
            diffuseConstant={1}
            lightingColor="#fff"
          >
            <feDistantLight azimuth={215} elevation={58} />
          </feDiffuseLighting>
        </filter>

        <clipPath id={`c-${uid}`}>
          <circle cx="120" cy="120" r="88" />
        </clipPath>
        <clipPath id={`rf-${uid}`}>
          <rect x="-60" y="120" width="360" height="220" />
        </clipPath>

        {/* سایهٔ کروی */}
        <radialGradient id={`s-${uid}`} cx="33%" cy="29%" r="76%">
          <stop offset="0" stopColor="#fff" stopOpacity=".16" />
          <stop offset=".28" stopColor="#000" stopOpacity="0" />
          <stop offset=".55" stopColor="#000" stopOpacity=".42" />
          <stop offset=".76" stopColor="#000" stopOpacity=".80" />
          <stop offset=".92" stopColor="#000" stopOpacity=".95" />
          <stop offset="1" stopColor="#000" stopOpacity="1" />
        </radialGradient>

        {/* نورِ لبه */}
        <radialGradient id={`r-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset=".84" stopColor={m.air} stopOpacity="0" />
          <stop offset=".97" stopColor={m.air} stopOpacity=".6" />
          <stop offset="1" stopColor={m.air} stopOpacity="0" />
        </radialGradient>

        {/* جوّ */}
        <radialGradient id={`g-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset=".62" stopColor={m.air} stopOpacity=".22" />
          <stop offset="1" stopColor={m.air} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="120" cy="120" r="112" fill={`url(#g-${uid})`} />
      {m.ring && <Ring m={m} uid={uid} />}

      <g clipPath={`url(#c-${uid})`}>
        <rect x="0" y="0" width="240" height="240" filter={`url(#t-${uid})`} />
        <rect
          x="0"
          y="0"
          width="240"
          height="240"
          filter={`url(#b-${uid})`}
          style={{ mixBlendMode: "overlay", opacity: m.mix }}
        />
        <circle cx="120" cy="120" r="88" fill={`url(#s-${uid})`} />
      </g>

      <circle cx="120" cy="120" r="88" fill={`url(#r-${uid})`} />
      {m.ring && <Ring m={m} uid={uid} front />}
    </svg>
  );
}
