import type { CSSProperties } from "react";
import { BrandGlyph } from "@/components/BrandMark";
import type { CertificateData } from "@/components/CertificateDocument";

/**
 * گواهی منتور — همون A4 افقیِ تیره‌ی کوادکمپ، با زبان بصری خودش.
 *
 * کوادکمپ بنفشِ برنده‌ست و منتور شامپاینی (همون رنگِ «با تمایز»)، پس
 * از دور هم معلومه این یکی سند دانشجو نیست، بدون اینکه هویت سند عوض بشه.
 * ستون چپ تیتر و نام و قدردانیه؛ ستون راست یک شبکه‌ی دو در دوئه با چهار
 * کاری که یک منتور می‌ده، و مهر دقیقاً روی تقاطع چهار خونه می‌شینه.
 *
 * قیدهای PDF (html2canvas) مثل کوادکمپ:
 *   • بدون گرادیانِ متن، mix-blend و filter؛ درخشش و شبکه SVG‌ان.
 *   • هر عنصری با فونت Michroma باید data-pdf-nudge داشته باشه.
 *   • اندازه‌ها فقط cqw‌ان تا سند روی هر عرضی و توی PDF یک‌شکل بمونه.
 *   • امضا یک فایل روشن جداست (sig-light.png).
 */

const BG = "#0A090D";
const INK = "#F4EFE6";
const INK_2 = "rgba(244,239,230,0.68)";
const INK_3 = "rgba(244,239,230,0.42)";
const LINE = "rgba(244,239,230,0.10)";
const ACCENT = "#E7C47E";
const ACCENT_RGB = "231,196,126";
const GLOW = "#C08A2E";
const GLOW_VIOLET = "#7C5CFC";

const SANS = "var(--font-space-grotesk), var(--font-meem), sans-serif";
const WIDE = "var(--font-wordmark), var(--font-space-grotesk), sans-serif";

function fs(cqw: number): CSSProperties {
  return { fontSize: `${cqw}cqw` };
}

function enDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/** چهار کاری که یک منتور برای دانشجوها می‌کنه */
const GIVES = [
  {
    tag: "FEEDBACK",
    title: "Hands-on feedback",
    points: ["Reviews on real student work", "Clear, honest, usable notes", "Fast loops, not long waits"],
  },
  {
    tag: "CRITIQUE",
    title: "Portfolio critique",
    points: ["Case studies that tell a story", "Sharper decisions, fewer screens", "Work worth showing"],
  },
  {
    tag: "CAREER",
    title: "Career guidance",
    points: ["Roles and what hiring looks for", "Interviews and how to prepare", "Honest advice on next steps"],
  },
  {
    tag: "COMMUNITY",
    title: "Time and presence",
    points: ["Showing up for the cohort", "Sharing the way real teams work", "Raising the bar for everyone"],
  },
];

/** پس‌زمینه: درخشش شامپاینی، یک لکه‌ی بنفش کم‌رنگ و شبکه‌ای که سمت لبه‌ها محو می‌شه */
function Backdrop() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1414 1000"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="mt-glow-a" cx="0.9" cy="0.02" r="0.62">
          <stop offset="0" stopColor={GLOW} stopOpacity="0.42" />
          <stop offset="0.45" stopColor={GLOW} stopOpacity="0.12" />
          <stop offset="1" stopColor={GLOW} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mt-glow-b" cx="0.02" cy="1" r="0.5">
          <stop offset="0" stopColor={GLOW_VIOLET} stopOpacity="0.22" />
          <stop offset="1" stopColor={GLOW_VIOLET} stopOpacity="0" />
        </radialGradient>
        <pattern id="mt-grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0V44" fill="none" stroke="#F4EFE6" strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
        <radialGradient id="mt-grid-fade" cx="0.72" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="mt-grid-mask">
          <rect width="1414" height="1000" fill="url(#mt-grid-fade)" />
        </mask>
      </defs>
      <rect width="1414" height="1000" fill={BG} />
      <rect width="1414" height="1000" fill="url(#mt-grid)" mask="url(#mt-grid-mask)" />
      <rect width="1414" height="1000" fill="url(#mt-glow-a)" />
      <rect width="1414" height="1000" fill="url(#mt-glow-b)" />
    </svg>
  );
}

/** مهر روی تقاطع شبکه؛ متن با textPath روی دایره خم می‌شه تا چاپ برداری بمونه */
function Seal() {
  const ring = "MELINA DESIGN SCHOOL • MENTOR PROGRAM • ";
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <defs>
        <path id="mt-seal-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill={BG} />
      <circle cx="100" cy="100" r="92" fill="none" stroke={ACCENT} strokeWidth="2" />
      <circle cx="100" cy="100" r="58" fill="none" stroke={ACCENT} strokeOpacity="0.35" strokeWidth="1" />
      <text
        fill={ACCENT}
        fontSize="13"
        fontWeight="700"
        textLength="458"
        lengthAdjust="spacing"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        <textPath href="#mt-seal-ring" startOffset="0" textLength="458" lengthAdjust="spacing">
          {ring}
        </textPath>
      </text>
      {/* ستاره‌ی هشت‌پر: نشانه‌ی راهنما */}
      <g transform="translate(100 91)" fill={ACCENT}>
        <path d="M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z" />
      </g>
      <text
        x="100"
        y="137"
        textAnchor="middle"
        fill={INK}
        fontSize="10"
        fontWeight="700"
        letterSpacing="2.6"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        MENTOR
      </text>
    </svg>
  );
}

/** نشانه‌های گوشه‌ی قاب */
function Corner({ className }: { className: string }) {
  return <span className={`absolute w-[1.5cqw] h-[1.5cqw] ${className}`} style={{ borderColor: ACCENT }} />;
}

function Label({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <div className="uppercase font-bold tracking-[0.24em]" style={{ ...fs(0.7), color: INK_3, ...style }}>
      {children}
    </div>
  );
}

export default function MentorCertificate({
  cert,
  qrDataUrl,
}: {
  cert: CertificateData;
  qrDataUrl?: string;
}) {
  const since = cert.startDate.trim();
  const issueYear = cert.createdAt.getFullYear();

  return (
    <div
      id="certificate"
      dir="ltr"
      className="certificate-sheet relative overflow-hidden flex flex-col"
      style={{ aspectRatio: "1.414 / 1", background: BG, color: INK, fontFamily: SANS }}
    >
      <Backdrop />
      <div className="absolute inset-0 grain-static opacity-[0.05] pointer-events-none" />

      {/* قاب و گوشه‌ها */}
      <div className="absolute inset-[1.6cqw] border pointer-events-none" style={{ borderColor: "rgba(244,239,230,0.07)" }}>
        <Corner className="-top-px -left-px border-t-2 border-l-2" />
        <Corner className="-top-px -right-px border-t-2 border-r-2" />
        <Corner className="-bottom-px -left-px border-b-2 border-l-2" />
        <Corner className="-bottom-px -right-px border-b-2 border-r-2" />
      </div>

      <div className="relative flex-1 flex flex-col px-[4.6cqw] pt-[3.8cqw] pb-[3.5cqw]">
        {/* ── سربرگ ── */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-[0.9cqw]">
            <BrandGlyph className="w-[3.4cqw] h-[3.4cqw] shrink-0" style={{ color: INK }} />
            <div className="leading-tight">
              <div className="font-bold tracking-tight" style={fs(1.22)}>
                Melina Design School
              </div>
              <div className="uppercase tracking-[0.22em] mt-[0.15cqw]" style={{ ...fs(0.66), color: INK_3 }}>
                mojtabaui.ir
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[0.7cqw]">
            <span
              className="uppercase font-bold tracking-[0.2em] border rounded-full px-[1.1cqw] py-[0.45cqw]"
              style={{ ...fs(0.68), color: INK_2, borderColor: LINE }}
            >
              Mentor Program
            </span>
            <span
              className="inline-flex items-center gap-[0.5cqw] uppercase font-bold tracking-[0.2em] rounded-full px-[1.1cqw] py-[0.45cqw]"
              style={{
                ...fs(0.68),
                color: ACCENT,
                background: `rgba(${ACCENT_RGB},0.12)`,
                border: `1px solid rgba(${ACCENT_RGB},0.35)`,
              }}
            >
              <span className="w-[0.45cqw] h-[0.45cqw] rounded-full" style={{ background: ACCENT }} />
              Guide of the school
            </span>
          </div>
        </header>

        {/* ── بدنه ── */}
        <div className="flex-1 flex gap-[3.4cqw] mt-[3.4cqw] min-h-0">
          {/* ستون چپ: عنوان، نام، متن، آمار */}
          <div className="w-[46cqw] shrink-0 flex flex-col">
            <div className="flex items-center gap-[0.8cqw]">
              <span className="h-px w-[2.4cqw]" style={{ background: ACCENT }} />
              <span className="uppercase font-bold tracking-[0.32em]" style={{ ...fs(0.86), color: ACCENT }}>
                Certificate of Mentorship
              </span>
            </div>

            <div
              className="mt-[0.4cqw] leading-normal tracking-[-0.01em]"
              data-pdf-nudge
              style={{ ...fs(5.3), fontFamily: WIDE }}
            >
              MENTOR
            </div>
            <div className="-mt-[0.6cqw]" style={{ ...fs(1.12), color: INK_2 }}>
              Time given. Designers grown.
            </div>

            <Label style={{ marginTop: "3.2cqw" }}>Proudly presented to</Label>
            <div className="font-bold leading-[1.1] tracking-tight mt-[0.7cqw]" style={fs(3.2)}>
              {cert.studentName}
            </div>
            <div
              className="h-px w-[88%] mt-[1.1cqw]"
              style={{
                background: `linear-gradient(90deg, ${ACCENT} 0%, rgba(${ACCENT_RGB},0.25) 45%, rgba(${ACCENT_RGB},0) 100%)`,
              }}
            />

            <p className="mt-[1.3cqw] leading-[1.75] max-w-[44cqw]" style={{ ...fs(1.02), color: INK_2 }}>
              in recognition of generously giving their time and expertise as a mentor at Melina
              Design School, guiding designers through hands-on feedback, critique and career
              advice. Their commitment helped students grow into confident product designers.
              Our heartfelt thanks, and every good wish for what comes next.
            </p>

            {/* آمار */}
            <div className="mt-auto flex items-stretch">
              {[
                ...(since ? [{ v: since, l: "Mentoring since" }] : []),
                { v: String(issueYear), l: "Year of recognition" },
                { v: "04", l: "Ways of giving back" },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={i === 0 ? "pr-[2.2cqw]" : "px-[2.2cqw] border-l"}
                  style={{ borderColor: LINE }}
                >
                  <span data-pdf-nudge className="leading-none block" style={{ ...fs(2.5), fontFamily: WIDE }}>
                    {s.v}
                  </span>
                  <Label style={{ marginTop: "0.8cqw" }}>{s.l}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* ستون راست: چهار کاری که یک منتور می‌ده */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-[0.9cqw]">
              <Label>What a mentor gives</Label>
              <Label>Feedback · Critique · Career · Time</Label>
            </div>

            <div className="relative flex-1 grid grid-cols-2 grid-rows-2 border" style={{ borderColor: LINE }}>
              {GIVES.map((m, i) => {
                const top = i < 2;
                return (
                  <div
                    key={m.tag}
                    className={`flex flex-col p-[1.5cqw] ${top ? "justify-start" : "justify-end"} ${
                      i % 2 === 0 ? "border-r" : ""
                    } ${top ? "border-b" : ""}`}
                    style={{ borderColor: LINE, background: "rgba(244,239,230,0.018)" }}
                  >
                    <div className="flex items-baseline justify-between">
                      <span data-pdf-nudge style={{ ...fs(0.8), fontFamily: WIDE, color: ACCENT }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-bold tracking-[0.2em]" style={{ ...fs(0.66), color: INK_3 }}>
                        {m.tag}
                      </span>
                    </div>
                    <div className="font-bold tracking-tight mt-[0.45cqw]" style={fs(1.2)}>
                      {m.title}
                    </div>
                    <ul className="mt-[0.8cqw] space-y-[0.42cqw]">
                      {m.points.map((s) => (
                        <li
                          key={s}
                          className="flex items-start gap-[0.6cqw] leading-[1.35]"
                          style={{ ...fs(0.8), color: INK_2 }}
                        >
                          <span className="mt-[0.5cqw] w-[0.32cqw] h-[0.32cqw] shrink-0" style={{ background: ACCENT }} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10cqw] aspect-square">
                <Seal />
              </div>
            </div>
          </div>
        </div>

        {/* ── پاورقی ── */}
        <footer className="mt-[2.6cqw] pt-[1.8cqw] border-t flex items-end justify-between" style={{ borderColor: LINE }}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/sig-light.png" alt="" className="w-[11cqw] h-auto -mb-[0.2cqw] select-none" />
            <div className="font-bold" style={fs(0.98)}>
              Mojtaba Yazdanpanah
            </div>
            <div className="mt-[0.15cqw]" style={{ ...fs(0.74), color: INK_3 }}>
              Head of Melina Design School
            </div>
          </div>

          <div>
            <Label>Date of issue</Label>
            <div className="font-bold mt-[0.5cqw]" style={fs(0.98)}>
              {enDate(cert.createdAt)}
            </div>
          </div>

          <div className="flex items-end gap-[1.2cqw]">
            <div className="text-right">
              <Label>Certificate No.</Label>
              <div data-pdf-nudge className="mt-[0.5cqw] tracking-[0.08em]" style={{ ...fs(1.3), fontFamily: WIDE }}>
                {cert.code}
              </div>
              <div className="mt-[0.35cqw]" style={{ ...fs(0.66), color: INK_3 }}>
                Verify at mojtabaui.ir/certificates
              </div>
            </div>
            {qrDataUrl && (
              <div className="rounded-[0.4cqw] p-[0.4cqw] w-[6cqw]" style={{ background: INK }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="" className="w-full h-auto block" />
              </div>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
