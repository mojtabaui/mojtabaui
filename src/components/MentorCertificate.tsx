import Image from "next/image";
import type { CSSProperties } from "react";
import { BrandGlyph } from "@/components/BrandMark";
import type { CertificateData } from "@/components/CertificateDocument";

/**
 * گواهی منتور — A4 افقی، با زبان بصری جدا از گواهی دانشجوها.
 *
 * گواهی دانشجو چپ‌چینه با ستون کناری تیره (UI/UX) یا کاملاً تیره (کوادکمپ).
 * این یکی برعکس: کرم، متقارن و وسط‌چین، با قاب دوخط و مهر بزرگ وسط پایین.
 * هدف اینه که یک نگاه کافی باشه تا معلوم شه «این سند دانشجو نیست».
 *
 * قیدهای PDF (html2canvas) مثل بقیه‌ی اسناد: فقط cqw، بدون گرادیانِ متن و
 * mix-blend، و هر عنصری با فونت Michroma باید data-pdf-nudge داشته باشه.
 */

const PAPER = "#F7F1E6";
const INK = "#1A1714";
const INK_2 = "#4A4540";
const INK_3 = "#8A8379";
const VIOLET = "#6D4BF0";
const RULE = "rgba(26,23,20,0.14)";

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

/** مهر گرد؛ متن با textPath روی دایره خم می‌شه تا چاپ برداری بمونه */
function Seal() {
  const ring = "MELINA DESIGN SCHOOL • MENTOR PROGRAM • ";
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <defs>
        <path id="mt-seal-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill={PAPER} />
      <circle cx="100" cy="100" r="94" fill="none" stroke={VIOLET} strokeWidth="2.4" />
      <circle cx="100" cy="100" r="58" fill="none" stroke={VIOLET} strokeOpacity="0.4" strokeWidth="1" />
      <text
        fill={VIOLET}
        fontSize="12.5"
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
      <g transform="translate(100 88)" fill={VIOLET}>
        <path d="M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z" />
      </g>
      <text
        x="100"
        y="130"
        textAnchor="middle"
        fill={INK}
        fontSize="13"
        fontWeight="700"
        letterSpacing="3.4"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        MENTOR
      </text>
    </svg>
  );
}

function Label({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <div className="uppercase font-bold tracking-[0.24em]" style={{ ...fs(0.7), color: INK_3, ...style }}>
      {children}
    </div>
  );
}

/** گوشه‌ی تزئینی قاب داخلی */
function Corner({ className }: { className: string }) {
  return <span className={`absolute w-[1.1cqw] h-[1.1cqw] ${className}`} style={{ borderColor: VIOLET }} />;
}

export default function MentorCertificate({
  cert,
  qrDataUrl,
}: {
  cert: CertificateData;
  qrDataUrl?: string;
}) {
  const since = cert.startDate.trim();

  return (
    <div
      id="certificate"
      dir="ltr"
      className="certificate-sheet relative overflow-hidden flex"
      style={{ aspectRatio: "1.414 / 1", background: PAPER, color: INK, fontFamily: SANS }}
    >
      {/* قاب دوخط */}
      <div className="absolute inset-[1.5cqw] border pointer-events-none" style={{ borderColor: INK, borderWidth: "0.14cqw" }} />
      <div className="absolute inset-[2.3cqw] border pointer-events-none" style={{ borderColor: RULE }}>
        <Corner className="-top-px -left-px border-t-2 border-l-2" />
        <Corner className="-top-px -right-px border-t-2 border-r-2" />
        <Corner className="-bottom-px -left-px border-b-2 border-l-2" />
        <Corner className="-bottom-px -right-px border-b-2 border-r-2" />
      </div>

      <div className="relative flex-1 flex flex-col items-center text-center px-[7cqw] pt-[4.6cqw] pb-[4.2cqw]">
        {/* سربرگ وسط‌چین */}
        <div className="flex items-center gap-[0.9cqw]">
          <BrandGlyph className="w-[3cqw] h-[3cqw] shrink-0" style={{ color: INK }} />
          <div className="text-left leading-tight">
            <div className="font-bold tracking-tight" style={fs(1.2)}>
              Melina Design School
            </div>
            <div className="uppercase tracking-[0.22em] mt-[0.15cqw]" style={{ ...fs(0.64), color: INK_3 }}>
              mojtabaui.ir
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[1cqw] mt-[3.2cqw]">
          <span className="h-px w-[4cqw]" style={{ background: VIOLET }} />
          <span className="uppercase font-bold tracking-[0.36em]" style={{ ...fs(0.86), color: VIOLET }}>
            Certificate of Mentorship
          </span>
          <span className="h-px w-[4cqw]" style={{ background: VIOLET }} />
        </div>

        <div
          className="mt-[1.6cqw] leading-normal tracking-[-0.01em]"
          data-pdf-nudge
          style={{ ...fs(4.4), fontFamily: WIDE }}
        >
          MENTOR
        </div>

        <Label style={{ marginTop: "2.2cqw" }}>Proudly presented to</Label>
        <div className="font-bold leading-[1.1] tracking-tight mt-[0.8cqw]" style={fs(3.4)}>
          {cert.studentName}
        </div>
        <div className="h-px w-[34cqw] mt-[1.2cqw]" style={{ background: VIOLET, opacity: 0.55 }} />

        <p className="mt-[1.6cqw] leading-[1.8] max-w-[58cqw]" style={{ ...fs(1.08), color: INK_2 }}>
          in recognition of generously giving their time and expertise as a mentor at Melina
          Design School, guiding designers through hands-on feedback, critique and career
          advice. Their commitment helped students grow into confident product designers.
        </p>

        {/* پاورقی سه‌ستونه: امضا | مهر | کد و QR */}
        <div className="mt-auto w-full grid grid-cols-[1fr_auto_1fr] items-end gap-[2cqw]">
          <div className="text-left">
            <Image
              src="/images/sig.png"
              alt=""
              width={690}
              height={252}
              className="w-[clamp(110px,14cqw,200px)] h-auto mb-[0.4cqw] select-none"
            />
            <div className="h-px w-[14cqw] mb-[0.6cqw]" style={{ background: RULE }} />
            <div className="font-bold" style={fs(0.98)}>
              Mojtaba Yazdanpanah
            </div>
            <div className="mt-[0.15cqw]" style={{ ...fs(0.74), color: INK_3 }}>
              Head of Melina Design School
            </div>
          </div>

          <div className="w-[11cqw] aspect-square">
            <Seal />
          </div>

          <div className="flex items-end justify-end gap-[1.4cqw] text-right">
            <div>
              {since && (
                <div className="mb-[1cqw]">
                  <Label>Mentoring since</Label>
                  <div className="font-bold mt-[0.4cqw]" style={fs(0.98)}>
                    {since}
                  </div>
                </div>
              )}
              <Label>Date of issue</Label>
              <div className="font-bold mt-[0.4cqw]" style={fs(0.98)}>
                {enDate(cert.createdAt)}
              </div>
              <div data-pdf-nudge className="mt-[1cqw] tracking-[0.08em]" style={{ ...fs(1.25), fontFamily: WIDE }}>
                {cert.code}
              </div>
              <div className="mt-[0.3cqw]" style={{ ...fs(0.64), color: INK_3 }}>
                Verify at mojtabaui.ir/certificates
              </div>
            </div>
            {qrDataUrl && (
              <div className="rounded-[0.3cqw] p-[0.4cqw] w-[6cqw] border" style={{ background: "#fff", borderColor: RULE }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="" className="w-full h-auto block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
