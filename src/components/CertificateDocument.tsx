import Image from "next/image";
import BrandMark from "@/components/BrandMark";
import { contentForTrack } from "@/lib/certificate-skills";

/**
 * سند گواهی، A4 افقی، کاملاً انگلیسی و چپ‌چین.
 *
 * ساختارش از گواهی‌های قبلی مدرسه میاد (ستون مهارت‌ها، کد، QR، امضا) ولی
 * زبان بصریش هویت جدیده: کِرِم و مشکیِ برند با لهجه‌ی بنفش، نه قاب‌های پرکنتراست.
 *
 * اندازه‌ها بر حسب cqw تعریف شدن تا سند روی هر عرضی و موقع چاپ یکسان دربیاد،
 * و متن‌ها HTML واقعی‌ان پس در PDF قابل انتخاب و جستجو می‌مونن.
 */

export interface CertificateData {
  code: string;
  studentName: string;
  track: string;
  year: string | null;
  startDate: string;
  createdAt: Date;
}

/**
 * مهر گرد سند. با SVG و textPath ساخته شده تا متن واقعاً روی دایره خم بشه،
 * نه اینکه تصویر باشه. این‌طوری موقع چاپ برداری و تیز می‌مونه.
 */
function Seal({ track }: { track: string }) {
  const accent = "#7c5cfc";
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <defs>
        {/* کمان بالا: از چپ به راست از روی بالای دایره */}
        <path id="seal-top" d="M 32,100 a 68,68 0 0 1 136,0" fill="none" />
        {/* کمان پایین: سوئیپ برعکس تا متن وارونه نشه */}
        <path id="seal-bottom" d="M 38,100 a 62,62 0 0 0 124,0" fill="none" />
      </defs>

      <circle cx="100" cy="100" r="86" fill="none" stroke={accent} strokeWidth="2.5" opacity="0.85" />
      <circle cx="100" cy="100" r="76" fill="none" stroke={accent} strokeWidth="1" opacity="0.45" />

      <text
        fill={accent}
        fontSize="15"
        fontWeight="700"
        letterSpacing="3.4"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        <textPath href="#seal-top" startOffset="50%" textAnchor="middle">
          MELINA SCHOOL
        </textPath>
      </text>

      <text
        fill={accent}
        fontSize="10"
        fontWeight="700"
        letterSpacing="3"
        opacity="0.75"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        <textPath href="#seal-bottom" startOffset="50%" textAnchor="middle">
          OFFICIAL SEAL
        </textPath>
      </text>

      {/* نقطه‌های جداکننده در چپ و راست */}
      <circle cx="17" cy="100" r="2.6" fill={accent} opacity="0.7" />
      <circle cx="183" cy="100" r="2.6" fill={accent} opacity="0.7" />

      {/* مرکز */}
      <text
        x="100"
        y="96"
        textAnchor="middle"
        fill={accent}
        fontSize="34"
        fontWeight="700"
        letterSpacing="1"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        {track}
      </text>
      <line x1="72" y1="110" x2="128" y2="110" stroke={accent} strokeWidth="1.4" opacity="0.5" />
      <text
        x="100"
        y="126"
        textAnchor="middle"
        fill={accent}
        fontSize="9"
        fontWeight="700"
        letterSpacing="1.6"
        opacity="0.7"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        CERTIFIED
      </text>
    </svg>
  );
}

function enDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export default function CertificateDocument({
  cert,
  qrDataUrl,
}: {
  cert: CertificateData;
  qrDataUrl?: string;
}) {
  const { discipline, hours, skills } = contentForTrack(cert.track);

  return (
    <div
      id="certificate"
      dir="ltr"
      className="certificate-sheet relative bg-[#FAF6F1] overflow-hidden flex"
      style={{ aspectRatio: "1.414 / 1" }}
    >
      {/* ── ستون کناری ── */}
      <aside className="w-[34%] bg-[#1a1714] text-white flex flex-col px-[4cqw] py-[4.2cqw]">
        <div className="flex items-center gap-[1cqw] mb-[3.4cqw]">
          <BrandMark size={54} rounded={16} bg="#FAF6F1" fg="#1a1714" className="flex-shrink-0" />
          <div className="leading-tight">
            <div className="font-display font-bold text-[clamp(10px,1.4cqw,18px)] tracking-tight">
              Melina Design School
            </div>
            <div className="font-display text-[clamp(6px,0.8cqw,10px)] tracking-[0.2em] uppercase text-white/40 mt-[0.2cqw]">
              mojtabaui.ir
            </div>
          </div>
        </div>

        <div className="font-display text-[clamp(7.5px,0.98cqw,13px)] font-bold tracking-[0.24em] uppercase text-[#a78bfa] mb-[1.4cqw]">
          Acquired skills
        </div>

        <ul className="space-y-[0.78cqw]">
          {skills.map((s) => (
            <li
              key={s}
              className="flex items-start gap-[0.7cqw] font-display text-[clamp(8px,1.06cqw,14px)] leading-[1.5] text-white/75"
            >
              <span className="mt-[0.55cqw] w-[0.3cqw] h-[0.3cqw] min-w-[2px] min-h-[2px] rounded-full bg-[#a78bfa] shrink-0" />
              {s}
            </li>
          ))}
        </ul>

        {/* QR و کد */}
        <div className="mt-auto pt-[2cqw]">
          {qrDataUrl && (
            <div className="bg-white rounded-[6px] p-[0.7cqw] w-[9.2cqw] min-w-[72px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="" className="w-full h-auto block" />
            </div>
          )}
          <div
            className="font-display font-bold text-[clamp(11px,1.5cqw,20px)] tracking-[0.14em] text-white mt-[1cqw]"
          >
            {cert.code}
          </div>
          <div className="font-display text-[clamp(6px,0.8cqw,10.5px)] text-white/35 mt-[0.25cqw] leading-snug">
            Verify at mojtabaui.ir/certificates
          </div>
        </div>
      </aside>

      {/* ── متن اصلی ── */}
      <section className="flex-1 relative flex flex-col px-[5cqw] py-[4.4cqw]">
        {/* مهر گرد */}
        <div className="absolute top-[4cqw] right-[5cqw] w-[clamp(78px,13cqw,168px)] aspect-square">
          <Seal track={cert.track} />
        </div>

        <div className="font-display text-[clamp(7.5px,0.98cqw,13px)] font-bold tracking-[0.3em] uppercase text-[#7c5cfc] mb-[1.2cqw]">
          Certificate
        </div>

        <h1 className="font-display font-bold text-[clamp(24px,4.3cqw,58px)] text-[#1a1714] leading-[1.08] tracking-tight">
          Certificate of
          <br />
          Completion
        </h1>

        <p className="font-display text-[clamp(9px,1.25cqw,17px)] text-[#6b6560] mt-[2.6cqw] leading-relaxed">
          This certificate in <span className="font-bold text-[#1a1714]">{discipline}</span> is
          awarded by Melina Design School to
        </p>

        <div className="mt-[1.1cqw]">
          <div className="font-display font-bold text-[clamp(21px,3.7cqw,50px)] text-[#1a1714] leading-tight">
            {cert.studentName}
          </div>
          <div className="h-px w-[72%] bg-[#1a1714]/15 mt-[1cqw]" />
        </div>

        <p className="font-display text-[clamp(8.5px,1.2cqw,16px)] text-[#4a4540] leading-[1.8] mt-[1.8cqw] max-w-[88%]">
          in recognition of completing {hours} hours of rigorous {discipline.toLowerCase()} training,
          covering the skills listed alongside, and delivering a complete hands on project.
          We wish them continued success in their future endeavors.
        </p>

        {/* امضا */}
        <div className="mt-auto flex items-end justify-between gap-[2cqw]">
          <div>
            {/* عرض صریح می‌دیم نه fill، چون fill به ارتفاع والد وابسته‌ست و
                اگر واحد cqw جایی حساب نشه، امضا کاملاً محو می‌شه */}
            <Image
              src="/images/sig.png"
              alt=""
              width={690}
              height={252}
              className="w-[clamp(120px,17cqw,230px)] h-auto mb-[0.6cqw] select-none"
            />
            <div className="h-px w-[clamp(120px,17cqw,230px)] bg-[#1a1714]/20 mb-[0.7cqw]" />
            <div className="font-display font-bold text-[clamp(8.5px,1.15cqw,15px)] text-[#1a1714]">
              Mojtaba Yazdanpanah
            </div>
            <div className="font-display text-[clamp(7px,0.92cqw,12px)] text-[#a09990] mt-[0.15cqw]">
              Head of Melina Design School
            </div>
          </div>

          <div className="text-right">
            <div className="font-display font-bold text-[clamp(8.5px,1.15cqw,15px)] text-[#1a1714]">
              {enDate(cert.createdAt)}
            </div>
            <div className="font-display text-[clamp(7px,0.92cqw,12px)] text-[#a09990] mt-[0.15cqw]">
              Date of issue
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
