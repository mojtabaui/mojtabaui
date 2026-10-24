import type { CSSProperties } from "react";
import { BrandGlyph } from "@/components/BrandMark";
import type { CertificateData } from "@/components/CertificateDocument";
import {
  COHORT_INFO,
  QC_HOURS,
  QC_MODULES,
  deliverableSentence,
  resolveCohort,
} from "@/lib/quadcamp";

/**
 * گواهی کوادکمپ — همون A4 افقیِ گواهی‌های تکی، ولی تیره.
 *
 * بوت‌کمپ چهار دوره بود، پس فرم اصلی سند یک شبکه‌ی دو در دوئه: هر خونه یک
 * دوره با سرفصل‌هاش، و مهر دقیقاً روی تقاطع چهار خونه. محتوای خونه‌های بالا
 * به بالا و خونه‌های پایین به پایین می‌چسبه تا وسط شبکه برای مهر خالی بمونه.
 *
 * چند قید که از PDF ساختن (html2canvas) میاد و نباید شکسته بشه:
 *   • گرادیانِ متن (background-clip: text)، mix-blend و filter توی عکس
 *     نمیان — برای همین درخشش‌ها و شبکه‌ی پس‌زمینه SVG‌ان و امضا یک فایل
 *     روشن جداست (sig-light.png) نه invert شده‌ی امضای اصلی.
 *   • html2canvas متن Michroma رو پایین‌تر می‌کشه؛ هر عنصری با این فونت
 *     باید data-pdf-nudge داشته باشه تا PrintButton توی PDF جاش رو درست کنه.
 *   • اندازه‌ها فقط cqw‌ان، پس سند روی هر عرضی و توی PDF یک‌شکل می‌مونه.
 */

const BG = "#0A090D";
const INK = "#F4EFE6";
const INK_2 = "rgba(244,239,230,0.68)";
const INK_3 = "rgba(244,239,230,0.42)";
const LINE = "rgba(244,239,230,0.10)";
/**
 * دو تم سند. معمولی بنفشِ برنده؛ «با تمایز» شامپاینی تا از دور هم معلوم
 * باشه سطح بالاتره، بدون اینکه چیدمان یا محتوا جابه‌جا بشه.
 */
interface Theme {
  key: string;
  accent: string;
  /** رنگ درخشش پس‌زمینه */
  glow: string;
  /** همون accent به شکل r,g,b برای rgba */
  rgb: string;
}
const STANDARD: Theme = { key: "std", accent: "#A78BFA", glow: "#7C5CFC", rgb: "167,139,250" };
const DISTINCTION: Theme = { key: "dst", accent: "#E7C47E", glow: "#C08A2E", rgb: "231,196,126" };

const SANS = "var(--font-space-grotesk), var(--font-meem), sans-serif";
const WIDE = "var(--font-wordmark), var(--font-space-grotesk), sans-serif";

/**
 * اندازه‌ی فونت فقط بر حسب cqw، بدون کف پیکسلی. کف پیکسلی روی عرض کم
 * متن رو از تناسب سند بزرگ‌تر می‌کرد و پاورقی از قاب بیرون می‌زد؛ سند باید
 * مثل یک عکس یکجا کوچیک بشه. روی موبایل به‌جاش قاب حداقل عرض بیشتری داره.
 */
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

/** پس‌زمینه: درخشش رنگ تم و شبکه‌ی ریزی که سمت لبه‌ها محو می‌شه */
function Backdrop({ t }: { t: Theme }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1414 1000"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <radialGradient id={`qc-glow-a-${t.key}`} cx="0.9" cy="0.02" r="0.62">
          <stop offset="0" stopColor={t.glow} stopOpacity="0.42" />
          <stop offset="0.45" stopColor={t.glow} stopOpacity="0.12" />
          <stop offset="1" stopColor={t.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`qc-glow-b-${t.key}`} cx="0.02" cy="1" r="0.5">
          <stop offset="0" stopColor={t.glow} stopOpacity="0.2" />
          <stop offset="1" stopColor={t.glow} stopOpacity="0" />
        </radialGradient>
        <pattern id="qc-grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0V44" fill="none" stroke="#F4EFE6" strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
        <radialGradient id="qc-grid-fade" cx="0.72" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="qc-grid-mask">
          <rect width="1414" height="1000" fill="url(#qc-grid-fade)" />
        </mask>
      </defs>
      <rect width="1414" height="1000" fill={BG} />
      <rect width="1414" height="1000" fill="url(#qc-grid)" mask="url(#qc-grid-mask)" />
      <rect width="1414" height="1000" fill={`url(#qc-glow-a-${t.key})`} />
      <rect width="1414" height="1000" fill={`url(#qc-glow-b-${t.key})`} />
    </svg>
  );
}

/** مهر روی تقاطع شبکه. وسطش همون چهار خونه‌ست، کوچیک. */
function Seal({ t, label }: { t: Theme; label: string }) {
  const ring = "MELINA DESIGN SCHOOL • PRODUCT DESIGN BOOTCAMP • ";
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <defs>
        <path id={`qc-seal-ring-${t.key}`} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill={BG} />
      <circle cx="100" cy="100" r="92" fill="none" stroke={t.accent} strokeWidth="2" />
      <circle cx="100" cy="100" r="58" fill="none" stroke={t.accent} strokeOpacity="0.35" strokeWidth="1" />
      {/* یک دور کامل؛ textLength فاصله‌ها رو طوری باز می‌کنه که ته متن
          دقیقاً به سرش برسه و روی هم نیفتن */}
      <text
        fill={t.accent}
        fontSize="13"
        fontWeight="700"
        textLength="458"
        lengthAdjust="spacing"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        <textPath href={`#qc-seal-ring-${t.key}`} startOffset="0" textLength="458" lengthAdjust="spacing">
          {ring}
        </textPath>
      </text>
      {/* چهار خونه: یکی پر، سه تا خط دور */}
      <rect x="77" y="70" width="21" height="21" rx="3" fill={t.accent} />
      <rect x="102" y="70" width="21" height="21" rx="3" fill="none" stroke={t.accent} strokeWidth="2" />
      <rect x="77" y="95" width="21" height="21" rx="3" fill="none" stroke={t.accent} strokeWidth="2" />
      <rect x="102" y="95" width="21" height="21" rx="3" fill="none" stroke={t.accent} strokeWidth="2" />
      <text
        x="100"
        y="137"
        textAnchor="middle"
        fill={INK}
        fontSize={label.length > 9 ? 9 : 10}
        fontWeight="700"
        letterSpacing={label.length > 9 ? 1.4 : 2.6}
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        {label}
      </text>
    </svg>
  );
}

/** نشانه‌های گوشه‌ی قاب */
function Corner({ className, color }: { className: string; color: string }) {
  return <span className={`absolute w-[1.5cqw] h-[1.5cqw] ${className}`} style={{ borderColor: color }} />;
}

function Label({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <div
      className="uppercase font-bold tracking-[0.24em]"
      style={{ ...fs(0.7), color: INK_3, ...style }}
    >
      {children}
    </div>
  );
}

export default function QuadcampCertificate({
  cert,
  qrDataUrl,
}: {
  cert: CertificateData;
  qrDataUrl?: string;
}) {
  const startDate = cert.startDate.trim();
  const cohort = resolveCohort(cert.year, startDate);
  const info = COHORT_INFO[cohort];
  const totalProjects = info.projects.ux + info.projects.ui;
  const distinction = Boolean(cert.distinction);
  const t = distinction ? DISTINCTION : STANDARD;

  return (
    <div
      id="certificate"
      dir="ltr"
      className="certificate-sheet relative overflow-hidden flex flex-col"
      style={{ aspectRatio: "1.414 / 1", background: BG, color: INK, fontFamily: SANS }}
    >
      <Backdrop t={t} />
      <div className="absolute inset-0 grain-static opacity-[0.05] pointer-events-none" />

      {/* قاب و گوشه‌ها */}
      <div className="absolute inset-[1.6cqw] border pointer-events-none" style={{ borderColor: "rgba(244,239,230,0.07)" }}>
        <Corner className="-top-px -left-px border-t-2 border-l-2" color={t.accent} />
        <Corner className="-top-px -right-px border-t-2 border-r-2" color={t.accent} />
        <Corner className="-bottom-px -left-px border-b-2 border-l-2" color={t.accent} />
        <Corner className="-bottom-px -right-px border-b-2 border-r-2" color={t.accent} />
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
              Product Design Bootcamp
            </span>
            <span
              className="inline-flex items-center gap-[0.5cqw] uppercase font-bold tracking-[0.2em] rounded-full px-[1.1cqw] py-[0.45cqw]"
              style={{
                ...fs(0.68),
                color: t.accent,
                background: `rgba(${t.rgb},0.12)`,
                border: `1px solid rgba(${t.rgb},0.35)`,
              }}
            >
              <span className="w-[0.45cqw] h-[0.45cqw] rounded-full" style={{ background: t.accent }} />
              {info.en} cohort
            </span>
          </div>
        </header>

        {/* ── بدنه ── */}
        <div className="flex-1 flex gap-[3.4cqw] mt-[3.4cqw] min-h-0">
          {/* ستون چپ: عنوان، نام، متن، آمار */}
          <div className="w-[46cqw] shrink-0 flex flex-col">
            <div className="flex items-center gap-[0.8cqw]">
              <span className="h-px w-[2.4cqw]" style={{ background: t.accent }} />
              <span className="uppercase font-bold tracking-[0.32em]" style={{ ...fs(0.86), color: t.accent }}>
                {distinction ? "Certificate of Completion · With Distinction" : "Certificate of Completion"}
              </span>
            </div>

            <div
              className="mt-[0.4cqw] leading-normal tracking-[-0.01em]"
              data-pdf-nudge style={{ ...fs(5.3), fontFamily: WIDE }}
            >
              QUADCAMP
            </div>
            <div className="-mt-[0.6cqw]" style={{ ...fs(1.12), color: INK_2 }}>
              Four courses. One product designer.
            </div>

            <Label style={{ marginTop: "3.2cqw" }}>Awarded to</Label>
            <div className="font-bold leading-[1.1] tracking-tight mt-[0.7cqw]" style={fs(3.2)}>
              {cert.studentName}
            </div>
            <div
              className="h-px w-[88%] mt-[1.1cqw]"
              style={{
                background: `linear-gradient(90deg, ${t.accent} 0%, rgba(${t.rgb},0.25) 45%, rgba(${t.rgb},0) 100%)`,
              }}
            />

            <p className="mt-[1.3cqw] leading-[1.75] max-w-[44cqw]" style={{ ...fs(1.02), color: INK_2 }}>
              for completing {QC_HOURS} hours of intensive training across four consecutive
              courses — user experience, user interface, interaction and portfolio — and{" "}
              {deliverableSentence(cohort)}.{" "}
              {distinction &&
                "Awarded with distinction, in recognition of outstanding engagement and the quality of their work. "}
              We wish them continued success in their future endeavours.
            </p>

            {/* آمار */}
            <div className="mt-auto flex items-stretch">
              {[
                { v: String(QC_HOURS), l: "Hours of training" },
                { v: "04", l: "Courses completed" },
                {
                  v: String(totalProjects).padStart(2, "0"),
                  l: "Projects delivered",
                  sub: `${info.projects.ux} UX · ${info.projects.ui} UI`,
                },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={i === 0 ? "pr-[2.2cqw]" : "px-[2.2cqw] border-l"}
                  style={{ borderColor: LINE }}
                >
                  <div className="flex items-baseline gap-[0.6cqw]">
                    <span data-pdf-nudge className="leading-none" style={{ ...fs(2.5), fontFamily: WIDE }}>
                      {s.v}
                    </span>
                    {s.sub && (
                      <span className="font-bold tracking-[0.12em]" style={{ ...fs(0.72), color: t.accent }}>
                        {s.sub}
                      </span>
                    )}
                  </div>
                  <Label style={{ marginTop: "0.8cqw" }}>{s.l}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* ستون راست: چهار دوره */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-[0.9cqw]">
              <Label>Curriculum</Label>
              <Label>UX · UI · Interaction · Portfolio</Label>
            </div>

            <div className="relative flex-1 grid grid-cols-2 grid-rows-2 border" style={{ borderColor: LINE }}>
              {QC_MODULES.map((m, i) => {
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
                      <span data-pdf-nudge style={{ ...fs(0.8), fontFamily: WIDE, color: t.accent }}>
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
                      {m.skills.map((s) => (
                        <li
                          key={s}
                          className="flex items-start gap-[0.6cqw] leading-[1.35]"
                          style={{ ...fs(0.8), color: INK_2 }}
                        >
                          <span
                            className="mt-[0.5cqw] w-[0.32cqw] h-[0.32cqw] shrink-0"
                            style={{ background: t.accent }}
                          />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10cqw] aspect-square">
                <Seal t={t} label={distinction ? "DISTINCTION" : "CERTIFIED"} />
              </div>
            </div>
          </div>
        </div>

        {/* ── پاورقی ── */}
        <footer className="mt-[2.6cqw] pt-[1.8cqw] border-t flex items-end justify-between" style={{ borderColor: LINE }}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sig-light.png"
              alt=""
              className="w-[11cqw] h-auto -mb-[0.2cqw] select-none"
            />
            <div className="font-bold" style={fs(0.98)}>
              Mojtaba Yazdanpanah
            </div>
            <div className="mt-[0.15cqw]" style={{ ...fs(0.74), color: INK_3 }}>
              Head of Melina Design School
            </div>
          </div>

          <div className="flex items-end gap-[3cqw]">
            {startDate && (
              <div>
                <Label>Start date</Label>
                <div className="font-bold mt-[0.5cqw]" style={fs(0.98)}>
                  {startDate}
                </div>
              </div>
            )}
            <div>
              <Label>Date of issue</Label>
              <div className="font-bold mt-[0.5cqw]" style={fs(0.98)}>
                {enDate(cert.createdAt)}
              </div>
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
