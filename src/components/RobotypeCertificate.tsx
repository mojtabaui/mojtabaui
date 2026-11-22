import type { CSSProperties } from "react";
import { BrandGlyph } from "@/components/BrandMark";
import type { CertificateData } from "@/components/CertificateDocument";

/**
 * گواهی ROBOTYPE — همون A4 افقیِ تیره‌ی کوادکمپ و منتور، ولی تک‌رنگ.
 *
 * صفحهٔ دوره عمداً مونوکروم‌ه (کرم روی مشکی، بدون لهجهٔ رنگی)، پس سند هم
 * همین‌طوره: بنفشِ کوادکمپ و شامپاینیِ منتور اینجا نمی‌آد و فقط کرم و
 * خاکستریِ کرم می‌مونه. تفاوتش با اون دو از چیدمانه: ستون چپ نام و متن،
 * ستون راست هفت فصل دوره به‌صورت فهرست شماره‌دار، و ردیفِ فصل آخر
 * («Ship It») چون خروجی دوره‌ست کمی پررنگ‌تره.
 *
 * عمداً ساعت آموزش روش نیست: دوره ویدیوییه و به سرعت هر نفر بستگی داره،
 * پس عددی که کارفرما استعلامش می‌کنه نمی‌تونه ثابت باشه.
 *
 * قیدهای PDF (html2canvas) مثل کوادکمپ و منتور:
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

/**
 * هفت فصل دوره، به همون ترتیب و اسمِ `MISSIONS` در lib/odyssey.ts.
 * اون فایل منبعِ حقیقته؛ اگه فصلی عوض شد این‌جا هم عوض بشه.
 */
const CHAPTERS = [
  { name: "AI Thinking", does: "How models work, and where they fail" },
  { name: "AI Tools", does: "Claude, skills, connectors and Claude Code" },
  { name: "AI Native UX Design", does: "Understanding people with AI in the loop" },
  { name: "Agentic UX Design", does: "Designing agents and how they behave" },
  { name: "AI Native UI Design", does: "Building interfaces with AI" },
  { name: "Agentic UI Design", does: "Orchestrating a team of agents on the UI" },
  { name: "Vibe Coding For Product Designers", does: "Code it, ship it, link it" },
];

/** پس‌زمینه: شبکه‌ی محو و یک درخششِ خنثیِ کرم؛ بدون هیچ رنگ دیگه */
function Backdrop() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1414 1000"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="rt-glow" cx="0.92" cy="0.02" r="0.6">
          <stop offset="0" stopColor={INK} stopOpacity="0.10" />
          <stop offset="1" stopColor={INK} stopOpacity="0" />
        </radialGradient>
        <pattern id="rt-grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0V44" fill="none" stroke={INK} strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
        <radialGradient id="rt-grid-fade" cx="0.72" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="rt-grid-mask">
          <rect width="1414" height="1000" fill="url(#rt-grid-fade)" />
        </mask>
      </defs>
      <rect width="1414" height="1000" fill={BG} />
      <rect width="1414" height="1000" fill="url(#rt-grid)" mask="url(#rt-grid-mask)" />
      <rect width="1414" height="1000" fill="url(#rt-glow)" />
    </svg>
  );
}

/** مهر گرد؛ متن با textPath روی دایره خم می‌شه تا چاپ برداری بمونه */
function Seal() {
  const ring = "MELINA DESIGN SCHOOL • ROBOTYPE • ";
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <defs>
        <path id="rt-seal-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill={BG} />
      <circle cx="100" cy="100" r="92" fill="none" stroke={INK} strokeWidth="2" />
      <circle cx="100" cy="100" r="58" fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="1" />
      <text
        fill={INK}
        fontSize="13"
        fontWeight="700"
        textLength="458"
        lengthAdjust="spacing"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        <textPath href="#rt-seal-ring" startOffset="0" textLength="458" lengthAdjust="spacing">
          {ring}
        </textPath>
      </text>
      {/* هفت نقطه: هفت فصل */}
      <g fill={INK}>
        {Array.from({ length: 7 }, (_, i) => {
          const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
          return <circle key={i} cx={100 + Math.cos(a) * 30} cy={91 + Math.sin(a) * 30} r="4" />;
        })}
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
        7 / 7
      </text>
    </svg>
  );
}

/** نشانه‌های گوشه‌ی قاب */
function Corner({ className }: { className: string }) {
  return <span className={`absolute w-[1.5cqw] h-[1.5cqw] ${className}`} style={{ borderColor: INK }} />;
}

function Label({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <div className="uppercase font-bold tracking-[0.24em]" style={{ ...fs(0.7), color: INK_3, ...style }}>
      {children}
    </div>
  );
}

export default function RobotypeCertificate({
  cert,
  qrDataUrl,
}: {
  cert: CertificateData;
  qrDataUrl?: string;
}) {
  const start = cert.startDate.trim();

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

          <span
            className="uppercase font-bold tracking-[0.2em] border rounded-full px-[1.1cqw] py-[0.45cqw]"
            style={{ ...fs(0.68), color: INK_2, borderColor: "rgba(244,239,230,0.22)" }}
          >
            AI Native Product Design
          </span>
        </header>

        {/* ── بدنه ── */}
        <div className="flex-1 flex gap-[3.4cqw] mt-[3.4cqw] min-h-0">
          {/* ستون چپ: عنوان، نام، متن، آمار */}
          <div className="w-[46cqw] shrink-0 flex flex-col">
            <div className="flex items-center gap-[0.8cqw]">
              <span className="h-px w-[2.4cqw]" style={{ background: INK }} />
              <span className="uppercase font-bold tracking-[0.32em]" style={fs(0.86)}>
                Certificate of Completion
              </span>
            </div>

            <div
              className="mt-[0.4cqw] leading-normal tracking-[-0.01em]"
              data-pdf-nudge
              style={{ ...fs(5.3), fontFamily: WIDE }}
            >
              ROBOTYPE
            </div>
            <div className="-mt-[0.6cqw]" style={{ ...fs(1.12), color: INK_2 }}>
              From the first prompt to a product with a link.
            </div>

            <Label style={{ marginTop: "3.2cqw" }}>Proudly presented to</Label>
            <div className="font-bold leading-[1.1] tracking-tight mt-[0.7cqw]" style={fs(3.2)}>
              {cert.studentName}
            </div>
            <div
              className="h-px w-[88%] mt-[1.1cqw]"
              style={{
                background: `linear-gradient(90deg, ${INK} 0%, rgba(244,239,230,0.25) 45%, rgba(244,239,230,0) 100%)`,
              }}
            />

            <p className="mt-[1.3cqw] leading-[1.75] max-w-[44cqw]" style={{ ...fs(1.02), color: INK_2 }}>
              for completing ROBOTYPE, the AI Native Product Design course by Melina Design School:
              seven chapters on thinking with AI, working with its tools, designing agents and
              interfaces, and shipping the result as a real product. We wish them every success in
              what they build next.
            </p>

            {/* آمار + مهر */}
            <div className="mt-auto flex items-end justify-between">
              <div className="flex items-stretch">
                {[
                  { v: "07", l: "Chapters completed", size: 2.5 },
                  ...(start ? [{ v: start, l: "Start date", size: 1.5 }] : []),
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className={i === 0 ? "pr-[2.2cqw]" : "px-[2.2cqw] border-l"}
                    style={{ borderColor: LINE }}
                  >
                    <span data-pdf-nudge className="leading-none block" style={{ ...fs(s.size), fontFamily: WIDE, whiteSpace: "nowrap" }}>
                      {s.v}
                    </span>
                    <Label style={{ marginTop: "0.8cqw" }}>{s.l}</Label>
                  </div>
                ))}
              </div>
              <div className="w-[9cqw] aspect-square shrink-0">
                <Seal />
              </div>
            </div>
          </div>

          {/* ستون راست: هفت فصل */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-[0.9cqw]">
              <Label>The seven chapters</Label>
              <Label>Understand · Build · Ship</Label>
            </div>

            <ol className="flex-1 flex flex-col border" style={{ borderColor: LINE }}>
              {CHAPTERS.map((c, i) => {
                const last = i === CHAPTERS.length - 1;
                return (
                  <li
                    key={c.name}
                    className={`flex-1 flex items-center gap-[1.4cqw] px-[1.5cqw] ${last ? "" : "border-b"}`}
                    style={{
                      borderColor: LINE,
                      background: last ? "rgba(244,239,230,0.05)" : "rgba(244,239,230,0.018)",
                    }}
                  >
                    <span data-pdf-nudge className="shrink-0 w-[2.2cqw]" style={{ ...fs(0.95), fontFamily: WIDE, color: INK_3 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold tracking-tight leading-tight" style={fs(1.2)}>
                        {c.name}
                      </div>
                      <div className="mt-[0.25cqw] leading-tight" style={{ ...fs(0.8), color: INK_2 }}>
                        {c.does}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
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
