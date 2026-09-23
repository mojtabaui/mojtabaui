"use client";

import Image from "next/image";

/**
 * ویترینِ پروژهٔ دوره — هم‌قدم.
 *
 * سکشنِ «پروژه» می‌گوید چه چیزی ساخته می‌شود؛ این یکی *نشانش* می‌دهد.
 * همه‌چیز از خودِ مخزنِ هم‌قدم آمده: صفحه‌ها اسکرین‌شاتِ اپِ واقعی‌اند
 * (۳۹۰ پیکسل، سه‌برابر)، و عددها و توکن‌ها عیناً از
 * `datas/ui/design-system.html`. اگر آنجا عوض شد، اینجا هم باید عوض شود.
 *
 * قابِ این سکشن مثلِ بقیهٔ صفحه تک‌رنگ است. رنگ فقط جایی دیده می‌شود
 * که خودش *محتوا* است — نمونه‌های پالت، نشانه و صفحه‌های اپ — چون
 * نشان دادنِ یک دیزاین سیستم بدونِ رنگ‌هایش، نشان ندادنِ آن است.
 */

const PAPER = "var(--neo-paper, #faf6f1)";
const INK = "var(--neo-ink, #1a1714)";
const MUTE = "var(--neo-mute, #6b6560)";
const LINE = "var(--neo-line, #e8e2d9)";
const CARD = "var(--neo-card, #fffcf6)";

type Lang = "fa" | "en";

const SCREENS = [
  { src: "/images/hamghadam/s1-picked.webp", code: "station-1" },
  { src: "/images/hamghadam/consent.webp", code: "consent" },
  { src: "/images/hamghadam/s2-picked.webp", code: "station-2" },
  { src: "/images/hamghadam/loading.webp", code: "loading" },
  { src: "/images/hamghadam/results.webp", code: "results" },
] as const;

const STATS = [40, 12, 8, 13, 40, 100] as const;

const CHAIN = [
  ["color/ground", "role/bg-page", "tag"],
  ["color/ink-900", "role/text-primary", "btn-primary"],
  ["color/accent-600", "role/accent-strong", "result-card"],
] as const;

const PALETTE = [
  { name: "ground", hex: "#F3EFE7" },
  { name: "surface", hex: "#FFFDF8" },
  { name: "line", hex: "#DCD5C9" },
  { name: "ink-900", hex: "#14120F" },
  { name: "ink-700", hex: "#3A342C" },
  { name: "ink-500", hex: "#6B6257" },
  { name: "accent-600", hex: "#A8421C" },
  { name: "accent-500", hex: "#D4653A" },
  { name: "accent-100", hex: "#F6E7DF" },
  { name: "signal", hex: "#27664A" },
  { name: "on-ink", hex: "#FFFDF8" },
] as const;

/** اندازه و وزنِ هر استایل — نمونه‌متن‌ها در `COPY` هستند چون فارسی‌اند */
const TYPE = [
  { spec: "heading/question · 20/Bold", size: 20, weight: 700 },
  { spec: "title/card · 15/Bold", size: 15, weight: 700 },
  { spec: "body/default · 15/Regular", size: 15, weight: 400 },
  { spec: "label/default · 14/Medium", size: 14, weight: 500 },
  { spec: "caption/default · 13/Regular", size: 13, weight: 400 },
  { spec: "caption/meta · 12/Regular", size: 12, weight: 400 },
] as const;

const SPACES = [4, 8, 12, 16, 24, 32, 64, 72] as const;

const COPY = {
  fa: {
    screens: [
      "ایستگاه ۱ · حالِ این روزها",
      "رضایت، پیش از نگه داشتن",
      "ایستگاه ۲ · زمان و شیوه",
      "اسکلت، تا فهرست برسد",
      "فهرستِ درمانگرها",
    ],
    screensNote: "اسکرین‌شاتِ خودِ اپ، نه ماکاپ. کشیدنی است.",
    dsTitle: "دیزاین سیستمِ هم‌قدم",
    dsLede:
      "یک کالکشن، یک مود، چهل توکن. رنگِ پایه مقدار را نگه می‌دارد، نقش می‌گوید آن مقدار کجا به کار می‌رود، و کامپوننت‌ها فقط به نقش وصل می‌شوند. این را توی فیگما می‌سازی و بعد عیناً به کد می‌بری.",
    stats: ["توکن", "نقش", "استایل متن", "کامپوننت", "رشتهٔ متنیِ ثبت‌شده", "متنِ استایل‌دار"],
    chainTitle: "سه لایه، بدونِ میان‌بر",
    chainCols: ["رنگ پایه", "نقش", "کامپوننت"],
    chainSub: ["مقدار", "معنا", "مصرف"],
    chainNote:
      "هیچ کامپوننتی مستقیم به رنگِ پایه وصل نیست. رنگ که عوض شود، یک توکن عوض می‌شود — نه سیزده کامپوننت.",
    logoTitle: "نشانهٔ «هم‌تراز»",
    logoBody:
      "دو میلهٔ هم‌اندازه، و هم‌اندازه بودنشان خودِ معناست. دور کردن، چرخاندن و سایه دادن ممنوع؛ فاصلهٔ آزاد به اندازهٔ عرضِ یک میله. ۲۱ فایلِ SVG، با قاعده.",
    paletteTitle: "۱۱ رنگ پایه",
    typeTitle: "تایپوگرافی · ۸ استایل",
    typeSamples: [
      "این روزها بیشتر درگیر چه چیزی هستید؟",
      "نگار موسوی",
      "این فهرست بر اساس چیزهایی چیده شده که خودتان گفتید.",
      "شب‌ها خوابم نمی‌برد",
      "به قلم درمانگر",
      "دو پرسش، بعد فهرست.",
    ],
    spaceTitle: "فاصله · مضربِ ۴",
  },
  en: {
    screens: [
      "Station 1 · how the days feel",
      "Consent, before keeping anything",
      "Station 2 · time and format",
      "Skeleton, until the list arrives",
      "The therapist list",
    ],
    screensNote: "Screenshots of the app itself, not mockups. Scroll sideways.",
    dsTitle: "The Hamghadam design system",
    dsLede:
      "One collection, one mode, forty tokens. Primitives hold the value, roles say where it is used, and components bind only to roles. You build it in Figma and carry it into code unchanged.",
    stats: ["tokens", "roles", "text styles", "components", "strings recorded", "text styled"],
    chainTitle: "Three layers, no shortcuts",
    chainCols: ["Primitive", "Role", "Component"],
    chainSub: ["value", "meaning", "use"],
    chainNote:
      "No component binds to a primitive directly. When a colour changes, one token changes — not thirteen components.",
    logoTitle: "The “level” mark",
    logoBody:
      "Two bars of equal size, and the equality is the meaning. No spacing them apart, rotating or shadowing; clear space is one bar wide. 21 SVG files, with rules.",
    paletteTitle: "11 primitives",
    typeTitle: "Typography · 8 styles",
    typeSamples: [
      "این روزها بیشتر درگیر چه چیزی هستید؟",
      "نگار موسوی",
      "این فهرست بر اساس چیزهایی چیده شده که خودتان گفتید.",
      "شب‌ها خوابم نمی‌برد",
      "به قلم درمانگر",
      "دو پرسش، بعد فهرست.",
    ],
    spaceTitle: "Spacing · multiples of 4",
  },
} as const;

/** عنوانِ ریزِ هر قاب — همان حروفِ بازِ بقیهٔ صفحه */
function Cap({ children }: { children: React.ReactNode }) {
  return (
    <p className="neo-cap text-[0.66rem]" style={{ color: MUTE }}>
      {children}
    </p>
  );
}

/** نشانه، با همان دو مستطیلِ فایلِ `hamghadam-mark.svg` */
function Mark({ size, left = "#AA3E17", right = "#14120F" }: { size: number; left?: string; right?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect x="26" y="8" width="14" height="32" rx="7" fill={right} />
      <rect x="8" y="8" width="14" height="32" rx="7" fill={left} />
    </svg>
  );
}

export default function HamghadamShowcase({
  lang,
  num,
}: {
  lang: Lang;
  num: (n: number) => string;
}) {
  const c = COPY[lang];

  return (
    <div>
      {/*
        صفحه‌ها — ریلِ افقی روی موبایل، پنج ستون روی دسکتاپ.

        روی گوشی پنج صفحه زیرِ هم یعنی پنج بار اسکرول برای یک ایده؛
        کنارِ هم و کشیدنی، همان حسِ ورق زدنِ خودِ اپ را می‌دهد. نسبتِ
        قاب قفل است تا پیش از بارگذاری، صفحه نپرد.
      */}
      <ol className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
        {SCREENS.map((s, i) => (
          <li key={s.code} className="w-[62vw] max-w-[230px] shrink-0 snap-start lg:w-auto lg:max-w-none">
            <div
              className="overflow-hidden border"
              style={{ borderColor: LINE, aspectRatio: "390 / 844" }}
            >
              <Image
                src={s.src}
                alt={c.screens[i]}
                width={780}
                height={1688}
                sizes="(min-width: 1024px) 190px, 62vw"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-[0.76rem]">{c.screens[i]}</p>
            <p className="mt-1 text-start text-[0.66rem] tabular-nums" style={{ color: MUTE }}>
              {String(i + 1).padStart(2, "0")} · {s.code}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs lg:hidden" style={{ color: MUTE }}>
        {c.screensNote}
      </p>

      {/* ── دیزاین سیستم ── */}
      <div className="mt-20 border-t pt-10" style={{ borderColor: INK }}>
        <h3 className="text-2xl font-bold sm:text-3xl">{c.dsTitle}</h3>
        <p className="mt-4 max-w-2xl text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
          {c.dsLede}
        </p>

        {/* عددها — همان شش عددِ بالای فایلِ دیزاین سیستم */}
        <dl
          className="mt-10 grid grid-cols-3 gap-px border sm:grid-cols-6"
          style={{ borderColor: LINE, background: LINE }}
        >
          {STATS.map((n, i) => (
            <div key={c.stats[i]} className="px-4 py-5" style={{ background: PAPER }}>
              <dt className="sr-only">{c.stats[i]}</dt>
              <dd className="text-[clamp(1.6rem,4vw,2.2rem)] font-light leading-none tabular-nums">
                {num(n)}
                {n === 100 ? (lang === "fa" ? "٪" : "%") : ""}
              </dd>
              <p className="mt-2 text-[0.72rem]" style={{ color: MUTE }} aria-hidden="true">
                {c.stats[i]}
              </p>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/*
            زنجیرهٔ توکن.

            مهم‌ترین ایدهٔ کلِ سیستم در یک تصویر: وسط، نقش، پررنگ است
            چون تنها لایه‌ای است که هر دو طرف به آن نگاه می‌کنند.
          */}
          <div className="border p-5 sm:p-7" style={{ borderColor: LINE, background: CARD }}>
            <Cap>{c.chainTitle}</Cap>
            <div className="mt-6 grid grid-cols-3 gap-x-3 sm:gap-x-6">
              {c.chainCols.map((col, i) => (
                <div key={col}>
                  <p className="text-[0.82rem] font-semibold">{col}</p>
                  <p className="text-[0.68rem]" style={{ color: MUTE }}>
                    {c.chainSub[i]}
                  </p>
                </div>
              ))}
            </div>
            <ul className="mt-4 space-y-3">
              {CHAIN.map((row) => (
                <li key={row[1]} className="relative grid grid-cols-3 gap-x-3 sm:gap-x-6">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-[16%] top-1/2 h-px"
                    style={{ background: INK, opacity: 0.35 }}
                  />
                  {row.map((tok, j) => (
                    <code
                      key={tok}
                      dir="ltr"
                      className="relative break-all border px-2 py-2 text-[0.62rem] leading-snug sm:truncate sm:px-3 sm:text-[0.72rem]"
                      style={{
                        borderColor: j === 1 ? INK : LINE,
                        background: j === 1 ? CARD : PAPER,
                        fontWeight: j === 1 ? 600 : 400,
                      }}
                    >
                      {tok}
                    </code>
                  ))}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.78rem] leading-relaxed" style={{ color: MUTE }}>
              {c.chainNote}
            </p>
          </div>

          {/* نشانه — در سه اندازه، تا قاعدهٔ «هم‌اندازه» دیده شود نه خوانده */}
          <div className="flex flex-col border p-5 sm:p-7" style={{ borderColor: LINE, background: CARD }}>
            <Cap>{c.logoTitle}</Cap>
            <div className="mt-6 flex items-end gap-6">
              <Mark size={88} />
              <Mark size={56} />
              <Mark size={28} />
              <span className="grid size-14 place-items-center" style={{ background: "#14120F" }}>
                <Mark size={44} left="#D4653A" right="#F2EFEA" />
              </span>
            </div>
            <p className="mt-6 text-[0.78rem] leading-relaxed" style={{ color: MUTE }}>
              {c.logoBody}
            </p>
          </div>
        </div>

        {/* پالت */}
        <div className="mt-6 border p-5 sm:p-7" style={{ borderColor: LINE, background: CARD }}>
          <Cap>{c.paletteTitle}</Cap>
          <ul className="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11" dir="ltr">
            {PALETTE.map((p) => (
              <li key={p.name}>
                <span
                  className="block aspect-square border"
                  style={{ background: p.hex, borderColor: LINE }}
                  aria-hidden="true"
                />
                <p className="mt-2 truncate text-[0.66rem] font-medium">{p.name}</p>
                <p className="text-[0.62rem] tabular-nums" style={{ color: MUTE }}>
                  {p.hex}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* تایپوگرافی — نمونه به همان اندازه و وزنی که در اپ هست */}
          <div className="border p-5 sm:p-7" style={{ borderColor: LINE, background: CARD }}>
            <Cap>{c.typeTitle}</Cap>
            <ul className="mt-4">
              {TYPE.map((ty, i) => (
                <li
                  key={ty.spec}
                  className="flex flex-col gap-1 border-t py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  style={{ borderColor: LINE }}
                >
                  <span dir="rtl" style={{ fontSize: ty.size, fontWeight: ty.weight, lineHeight: 1.5 }}>
                    {c.typeSamples[i]}
                  </span>
                  <span className="shrink-0 text-[0.64rem]" style={{ color: MUTE }} dir="ltr">
                    {ty.spec}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* فاصله — میله‌ها طولِ واقعی دارند، به پیکسل */}
          <div className="border p-5 sm:p-7" style={{ borderColor: LINE, background: CARD }}>
            <Cap>{c.spaceTitle}</Cap>
            <ul className="mt-5 space-y-2.5" dir="ltr">
              {SPACES.map((s) => (
                <li key={s} className="flex items-center gap-4">
                  <span className="w-20 shrink-0 text-[0.66rem]" style={{ color: MUTE }}>
                    space/{s}
                  </span>
                  <span className="h-3" style={{ width: s * 1.6, background: INK }} aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
