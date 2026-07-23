import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Play, CheckSquare } from "lucide-react";
import BrandMark, { BrandGlyph } from "@/components/BrandMark";
import PrintButton from "@/components/PrintButton";
import { planners, START_NOTES } from "@/lib/planner";

interface Props {
  params: Promise<{ track: string }>;
}

export async function generateStaticParams() {
  return [{ track: "ui" }, { track: "ux" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track } = await params;
  const p = planners[track as "ui" | "ux"];
  if (!p) return { title: "برنامه هفتگی" };
  return { title: `برنامه هفتگی ${p.title}`, robots: { index: false, follow: false } };
}

/**
 * برنامه‌ی هفتگی، به‌صورت سند چاپی A4.
 *
 * هر صفحه یک .sheet است که موقع چاپ دقیقاً یک برگ می‌شود. اندازه‌ها بر حسب
 * میلی‌متر تعریف شدن نه پیکسل، تا خروجی چاپی با چیزی که روی صفحه می‌بینی یکی
 * باشه. متن‌ها HTML واقعی‌ان پس در PDF قابل انتخاب می‌مونن.
 */
export default async function PlannerPage({ params }: Props) {
  const { track } = await params;
  const p = planners[track as "ui" | "ux"];
  if (!p) notFound();

  return (
    <main className="min-h-screen bg-[#e8e2d9] py-10 print:bg-white print:py-0">

      <div className="no-print max-w-[210mm] mx-auto px-4 mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-body font-black text-xl text-[#1a1714]">
            برنامه هفتگی {p.title}
          </h1>
          <p className="font-body text-sm text-[#6b6560] mt-1">
            برای گرفتن PDF دکمه را بزنید و مقصد را روی Save as PDF بگذارید. کاغذ A4 عمودی.
          </p>
        </div>
        <PrintButton />
      </div>

      <div className="planner space-y-8 print:space-y-0">

        {/* ── جلد ── */}
        <section className="sheet" style={{ backgroundColor: p.tint }}>
          <div className="relative h-full flex flex-col p-[18mm]">
            <div
              className="absolute -bottom-[26mm] -left-[20mm] w-[150mm] opacity-[0.07]"
              style={{ color: p.accent }}
            >
              <BrandGlyph className="w-full h-auto" />
            </div>

            <div className="relative flex items-center gap-3">
              <BrandMark size={40} rounded={28} />
              <div className="leading-tight">
                <div className="font-body font-bold text-[11pt] text-[#1a1714]">
                  مدرسه دیزاین ملینا
                </div>
                <div
                  dir="ltr"
                  className="font-display text-[6.5pt] tracking-[0.22em] uppercase text-[#a09990]"
                >
                  mojtabaui.ir
                </div>
              </div>
            </div>

            <div className="relative flex-1 flex flex-col justify-center">
              <div
                dir="ltr"
                className="font-display text-[8pt] font-bold tracking-[0.3em] uppercase mb-[6mm]"
                style={{ color: p.accent }}
              >
                {p.latin}
              </div>
              <h1 className="font-body font-black text-[42pt] text-[#1a1714] leading-[1.3]">
                برنامه
                <br />
                هفتگی
              </h1>
              <div
                className="inline-flex self-start mt-[8mm] px-[7mm] py-[3.5mm] rounded-full text-white font-body font-bold text-[13pt]"
                style={{ backgroundColor: p.accent }}
              >
                {p.title}
              </div>
            </div>

            <div className="relative font-body text-[8pt] text-[#a09990]">
              هشت هفته، از صفر تا ارائه‌ی پروژه
            </div>
          </div>
        </section>

        {/* ── نکات شروع ── */}
        <section className="sheet bg-[#FAF6F1]">
          <div className="h-full flex flex-col p-[18mm]">
            <Head accent={p.accent} latin={p.latin} />
            <h2
              className="font-body font-black text-[26pt] leading-[1.35] mb-[8mm]"
              style={{ color: p.accent }}
            >
              نکات شروع دوره
            </h2>
            <p className="font-body text-[10pt] text-[#4a4540] leading-[2] mb-[8mm]">
              به این دوره خیلی خوش اومدی. فرق این دوره با بقیه‌ی دوره‌ها اینه که یک برنامه‌ی
              هفتگی برای تماشای ویدیوها و انجام تسک داره، که باعث میشه جدیت تو برای دنبال
              کردن دوره بیشتر بشه. برای هرچه نتیجه‌گیری بهتر حتما به نکات زیر دقت کن.
            </p>

            <div className="space-y-[6mm]">
              {START_NOTES.map((n) => (
                <div key={n.lead} className="flex gap-[4mm]">
                  <span
                    className="mt-[2.4mm] w-[2mm] h-[2mm] rounded-full flex-shrink-0"
                    style={{ backgroundColor: p.accent }}
                  />
                  <p className="font-body text-[9.5pt] text-[#4a4540] leading-[1.95]">
                    <span className="font-bold text-[#1a1714]">{n.lead}</span> {n.body}
                  </p>
                </div>
              ))}
            </div>

            <Foot n="۰۲" />
          </div>
        </section>

        {/* ── هفته‌ها ── */}
        {p.weeks.map((w, i) => (
          <section key={w.n} className="sheet bg-[#FAF6F1]">
            <div className="h-full flex flex-col p-[18mm]">
              <Head accent={p.accent} latin={p.latin} />

              <div className="text-center mb-[12mm]">
                <div
                  className="font-body font-black text-[34pt] leading-none"
                  style={{ color: p.accent }}
                >
                  هفته {w.n}
                </div>
              </div>

              {/* فصل‌ها */}
              <div className="space-y-[3mm] mb-[12mm]">
                {w.chapters.map((c) => (
                  <div key={c.title} className="flex items-center gap-[3.5mm] justify-end">
                    <span className="font-body text-[11pt] text-[#1a1714]" dir="rtl">
                      فصل {c.n}:{" "}
                      <span dir="ltr" className="font-display">
                        {c.title}
                      </span>
                    </span>
                    <span
                      className="w-[5mm] h-[5mm] rounded-[1.2mm] flex items-center justify-center flex-shrink-0 text-white"
                      style={{ backgroundColor: p.accent }}
                    >
                      <Play size={9} fill="currentColor" />
                    </span>
                  </div>
                ))}
              </div>

              {/* تسک‌ها */}
              <div className="mt-auto">
                {w.either && (
                  <p className="font-body text-[9pt] text-[#6b6560] text-left mb-[4mm]">
                    یکی از این دو را انجام دهید:
                  </p>
                )}
                <div className="space-y-[7mm]">
                  {w.tasks.map((t) => (
                    <div key={t.title}>
                      <div className="flex items-center gap-[3.5mm] justify-end">
                        <span className="font-body font-black text-[13pt] text-[#1a1714]">
                          {t.title}
                        </span>
                        <span
                          className="w-[5.5mm] h-[5.5mm] rounded-[1.2mm] flex items-center justify-center flex-shrink-0 text-white"
                          style={{ backgroundColor: p.accent }}
                        >
                          <CheckSquare size={10} />
                        </span>
                      </div>
                      {t.desc && (
                        <p className="font-body text-[9.5pt] text-[#6b6560] leading-[1.9] mt-[1.5mm] pl-[9mm]">
                          {t.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {w.note && (
                  <p className="font-body text-[8.5pt] text-[#a09990] leading-[1.8] mt-[7mm] pt-[4mm] border-t border-[#e8e2d9]">
                    {w.note}
                  </p>
                )}

                <Foot n={String(i + 3).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d])} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function Head({ accent, latin }: { accent: string; latin: string }) {
  return (
    <div className="flex items-center gap-[4mm] mb-[10mm]">
      <span className="h-[1.2mm] flex-1 rounded-full" style={{ backgroundColor: accent }} />
      <span
        dir="ltr"
        className="font-display text-[7pt] tracking-[0.24em] uppercase text-[#6b6560]"
      >
        {latin}
      </span>
    </div>
  );
}

function Foot({ n }: { n: string }) {
  return (
    <div className="flex items-center justify-between mt-[10mm] pt-[4mm] border-t border-[#e8e2d9] text-[#c8c2ba]">
      <span dir="ltr" className="font-display text-[7pt] tracking-[0.2em] uppercase">
        mojtabaui.ir
      </span>
      <span className="font-display text-[7pt]">{n}</span>
    </div>
  );
}
