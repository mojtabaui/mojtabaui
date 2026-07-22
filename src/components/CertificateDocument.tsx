import Image from "next/image";

/**
 * سند گواهی، در نسبت A4 افقی.
 *
 * این کامپوننت عمداً همه‌ی اندازه‌ها را بر حسب واحدهای نسبی همان قاب تعریف
 * می‌کند تا هم روی صفحه و هم موقع چاپ یکسان دربیاید. متن‌ها متنِ واقعی HTML
 * هستند نه تصویر، پس در PDF قابل انتخاب و جستجو می‌مانند و فونت فارسی
 * بدون افت کیفیت رندر می‌شود.
 */

export interface CertificateData {
  code: string;
  studentName: string;
  track: string;
  year: string | null;
  startDate: string;
  createdAt: Date;
}

const TRACK_LABEL: Record<string, string> = {
  UI: "طراحی رابط کاربری",
  UX: "طراحی تجربه کاربری",
  QC: "کوادکمپ",
};

const fa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

function faDate(d: Date) {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

export default function CertificateDocument({ cert }: { cert: CertificateData }) {
  const discipline = TRACK_LABEL[cert.track] ?? cert.track;
  const title = cert.year ? `${discipline}، دوره ${fa(cert.year)}` : discipline;

  return (
    <div
      id="certificate"
      className="certificate-sheet relative bg-[#FAF6F1] overflow-hidden"
      style={{ aspectRatio: "1.414 / 1" }}
    >
      {/* قاب دولایه */}
      <div className="absolute inset-[2.2%] border border-[#1a1714]/15 rounded-[6px]" />
      <div className="absolute inset-[3.1%] border border-[#7c5cfc]/25 rounded-[3px]" />

      {/* نوار تزئینی بالا سمت چپ */}
      <div className="absolute top-0 left-[9%] w-[3.4%] h-[13%] bg-[#1a1714] flex items-end justify-center">
        <span
          className="block w-full"
          style={{
            height: "22%",
            background: "#FAF6F1",
            clipPath: "polygon(0 0, 50% 65%, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      </div>

      <div className="relative h-full flex flex-col px-[8%] pt-[6.5%] pb-[4%]">

        {/* سربرگ */}
        <div className="flex items-center gap-3 mb-[3.5%]">
          <Image
            src="/images/logo_square.png"
            alt=""
            width={778}
            height={710}
            className="h-[clamp(28px,3.6cqw,44px)] w-auto"
          />
          <div className="leading-tight">
            <div className="font-body font-bold text-[clamp(11px,1.5cqw,17px)] text-[#1a1714]">
              مدرسه دیزاین ملینا
            </div>
            <div className="font-display text-[clamp(6px,0.85cqw,10px)] tracking-[0.22em] uppercase text-[#a09990]">
              MELINA DESIGN SCHOOL
            </div>
          </div>
        </div>

        {/* عنوان */}
        <h1 className="font-body font-black text-[clamp(22px,4.4cqw,52px)] text-[#1a1714] leading-[1.15] tracking-tight">
          گواهی پایان دوره
        </h1>
        <div className="font-display font-bold text-[clamp(8px,1.1cqw,13px)] tracking-[0.3em] uppercase text-[#7c5cfc] mt-[1%]">
          CERTIFICATE OF COMPLETION
        </div>

        <p className="font-body text-[clamp(9px,1.15cqw,14px)] text-[#6b6560] mt-[3%]">
          این گواهی به
        </p>

        {/* نام دانشجو */}
        <div className="mt-[1.5%] max-w-[68%]">
          <div className="font-body font-bold text-[clamp(20px,3.6cqw,42px)] text-[#1a1714] leading-[1.3] pb-[1%]">
            {cert.studentName}
          </div>
          <div className="h-px w-full bg-[#1a1714]/20" />
        </div>

        <p className="font-body text-[clamp(9px,1.2cqw,15px)] text-[#4a4540] leading-[1.9] mt-[2.5%] max-w-[72%]">
          بابت گذراندن کامل دوره‌ی <span className="font-bold text-[#1a1714]">{title}</span> در
          مدرسه دیزاین ملینا، همراه با انجام پروژه‌های عملی، اهدا می‌شود.
        </p>

        {/* مهر */}
        <div className="absolute left-[8%] top-[38%] w-[15%] aspect-square">
          <div className="absolute inset-0 rounded-full border-2 border-[#7c5cfc]/30" />
          <div className="absolute inset-[9%] rounded-full border border-[#7c5cfc]/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-display font-black text-[clamp(10px,1.7cqw,20px)] text-[#7c5cfc] leading-none">
              {cert.track === "QC" ? "QC" : cert.track}
            </span>
            <span className="font-body text-[clamp(5px,0.72cqw,9px)] text-[#7c5cfc]/70 mt-[6%] leading-tight px-[12%]">
              گواهی معتبر
            </span>
          </div>
        </div>

        {/* پانوشت */}
        <div className="mt-auto">
          <div className="h-px w-full bg-[#1a1714]/10 mb-[2.2%]" />
          <div className="flex items-end justify-between gap-4">

            <div>
              <div className="font-body font-bold text-[clamp(8px,1.05cqw,13px)] text-[#1a1714]">
                مجتبا یزدانپناه
              </div>
              <div className="font-body text-[clamp(6px,0.85cqw,10px)] text-[#a09990] mt-[2px]">
                بنیان‌گذار و مدرس
              </div>
            </div>

            <div className="text-center">
              <div
                dir="ltr"
                className="font-mono font-bold text-[clamp(9px,1.35cqw,17px)] text-[#1a1714] tracking-[0.18em]"
              >
                {cert.code}
              </div>
              <div className="font-body text-[clamp(5px,0.78cqw,9px)] text-[#a09990] mt-[3px]">
                کد استعلام در mojtabaui.ir/certificates
              </div>
            </div>

            <div className="text-left">
              <div className="font-body font-bold text-[clamp(8px,1.05cqw,13px)] text-[#1a1714]">
                {faDate(cert.createdAt)}
              </div>
              <div className="font-body text-[clamp(6px,0.85cqw,10px)] text-[#a09990] mt-[2px]">
                تاریخ صدور
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
