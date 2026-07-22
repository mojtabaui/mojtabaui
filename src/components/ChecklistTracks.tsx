"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronLeft, Clock } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ParallaxY from "@/components/ParallaxY";
import { tracks, totalItemsOf } from "@/lib/checklist";

const fa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function ChecklistTracks() {
  const [active, setActive] = useState<"ui" | "ux">("ui");
  const track = tracks.find((t) => t.key === active)!;

  return (
    <>
      {/* انتخاب مسیر */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        <div className="grid sm:grid-cols-2 gap-4">
          {tracks.map((t) => {
            const on = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                aria-pressed={on}
                className="text-right rounded-3xl p-6 border transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: on ? t.color : "#ffffff",
                  borderColor: on ? t.accent : "#e8e2d9",
                  boxShadow: on ? `0 20px 44px -26px ${t.accent}` : undefined,
                }}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span
                    className="font-display text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{ color: on ? t.accent : "#a09990" }}
                  >
                    {t.latin}
                  </span>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: on ? t.accent : "#f0ebe4",
                      color: on ? "#fff" : "transparent",
                    }}
                  >
                    <Check size={11} />
                  </span>
                </div>

                <h2 className="font-body font-black text-xl text-[#1a1714] mb-2">{t.label}</h2>
                <p className="font-body text-sm text-[#6b6560] leading-relaxed mb-4">
                  {t.tagline}
                </p>

                <div className="flex items-center gap-4 font-body text-xs text-[#a09990]">
                  <span>{fa(t.stages.length)} مرحله</span>
                  <span className="w-1 h-1 rounded-full bg-[#d4cdc5]" />
                  <span>{fa(totalItemsOf(t))} آیتم</span>
                  <span className="w-1 h-1 rounded-full bg-[#d4cdc5]" />
                  <span>{t.weeks}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* فهرست مراحل مسیر انتخاب‌شده */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white border border-[#e8e2d9] rounded-3xl p-6">
          <div className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-[#a09990] mb-4">
            فهرست مسیر {track.label}
          </div>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {track.stages.map((stage) => (
              <li key={stage.id}>
                <a href={`#${stage.id}`} className="group flex items-center gap-3 py-1.5">
                  <span
                    className="font-display font-black text-sm w-7 flex-shrink-0"
                    style={{ color: stage.accent }}
                  >
                    {stage.num}
                  </span>
                  <span className="font-body text-sm text-[#4a4540] group-hover:text-[#1a1714] transition-colors">
                    {stage.title}
                  </span>
                  <span className="font-body text-[11px] text-[#c8c2ba] mr-auto flex-shrink-0">
                    {fa(stage.items.length)} آیتم
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* مراحل */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-16">
        {track.stages.map((stage) => (
          <div key={stage.id} id={stage.id} className="scroll-mt-28">
            <FadeIn>
              <div className="flex items-start gap-5 mb-7">
                <ParallaxY speed={14}>
                  <span
                    className="font-display font-black text-5xl leading-none select-none block"
                    style={{ color: stage.accent, opacity: 0.22 }}
                  >
                    {stage.num}
                  </span>
                </ParallaxY>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714] leading-[1.3]">
                      {stage.title}
                    </h2>
                    <span
                      className="inline-flex items-center gap-1.5 text-[11px] font-body font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: stage.color, color: stage.accent }}
                    >
                      <Clock size={10} />
                      {stage.duration}
                    </span>
                  </div>
                  <p className="font-body text-[#6b6560] leading-relaxed max-w-2xl">
                    {stage.subtitle}
                  </p>
                </div>
              </div>
            </FadeIn>

            <div className="space-y-3">
              {stage.items.map((item, i) => (
                <FadeIn key={item.title} delay={Math.min(i, 5) * 0.04}>
                  <div className="group flex items-start gap-4 bg-white border border-[#e8e2d9] rounded-2xl p-5 hover:border-[#1a1714]/20 hover:-translate-y-0.5 transition-all">
                    <span
                      className="w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ borderColor: `${stage.accent}44`, color: stage.accent }}
                    >
                      <Check
                        size={13}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </span>
                    <div>
                      <h3 className="font-body font-bold text-[#1a1714] text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-[#6b6560] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {stage.course && (
              <FadeIn delay={0.1}>
                <div
                  className="mt-5 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap border"
                  style={{ backgroundColor: stage.color, borderColor: `${stage.accent}26` }}
                >
                  <p className="font-body text-sm text-[#4a4540] leading-relaxed">
                    این مرحله رو قدم به قدم توی{" "}
                    <span className="font-bold" style={{ color: stage.accent }}>
                      {stage.course.label}
                    </span>{" "}
                    با پروژه و فیدبک کار می‌کنیم.
                  </p>
                  <Link
                    href={`/courses/${stage.course.slug}`}
                    className="inline-flex items-center gap-2 text-white font-body font-bold text-sm px-5 py-2.5 rounded-xl transition-transform hover:scale-[1.02] flex-shrink-0"
                    style={{ backgroundColor: stage.accent }}
                  >
                    ثبت‌نام در دوره
                    <ChevronLeft size={14} />
                  </Link>
                </div>
              </FadeIn>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
