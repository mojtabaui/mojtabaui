"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { STACHE_LEFT, STACHE_RIGHT, STACHE_HINGE } from "@/components/BrandMark";
import type { PathData, Fact, LinkItem } from "@/app/home-next/paths";
import s from "./home-next.module.css";

type Copy = {
  question: string;
  sub: string;
  groupLabel: string;
  empty: string;
  firstStep: string;
  courses: string;
  words: string;
  change: string;
};

const NUMS = { fa: ["۱", "۲", "۳", "۴"], en: ["1", "2", "3", "4"] };

/** نشان قناری؛ هر بار که مسیری انتخاب می‌شه یک بار بال می‌زنه. */
function Canary({ flapKey }: { flapKey: string }) {
  return (
    <svg key={flapKey} viewBox="0 4 120 108" width={56} height={50} className={s.mark} aria-hidden="true">
      <path d={STACHE_RIGHT} fill="currentColor" className={s.wingR} />
      <path d={STACHE_LEFT} fill="currentColor" className={s.wingL} />
      <ellipse cx={STACHE_HINGE.cx} cy={STACHE_HINGE.cy} rx={STACHE_HINGE.rx} ry={STACHE_HINGE.ry} fill="currentColor" />
    </svg>
  );
}

function Go({ item, className, children }: { item: { href: string; external?: boolean }; className: string; children: React.ReactNode }) {
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={item.href} className={className}>{children}</Link>
  );
}

function CourseRow({ c }: { c: Fact }) {
  return (
    <li className="border-t-2 border-[#FFD23F]/30 first:border-t-0">
      <Link href={c.href} className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5 min-h-[44px]">
        <span className="font-body font-black text-2xl md:text-3xl leading-[1.4] group-hover:text-[#FFD23F] transition-colors duration-200">
          <bdi>{c.title}</bdi>
        </span>
        <span className="flex flex-wrap gap-x-5 gap-y-1 font-body text-[#FAF6F1]/80">
          {c.meta.map((m) => <span key={m}>{m}</span>)}
          {c.closed && <span className="text-[#FAF6F1]/70">{c.closed}</span>}
        </span>
      </Link>
    </li>
  );
}

function LinkRow({ item }: { item: LinkItem }) {
  return (
    <li className="border-t border-[#FAF6F1]/15">
      <Go item={item} className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 min-h-[44px]">
        <span className="font-body font-bold text-lg leading-[1.7] underline decoration-[#FFD23F]/50 underline-offset-[6px] group-hover:decoration-[#FFD23F]">
          {item.title}
        </span>
        <span className="font-body text-sm text-[#FAF6F1]/70">{item.meta}</span>
      </Go>
    </li>
  );
}

export default function PathPicker({
  paths,
  copy,
  lang,
  initial,
}: {
  paths: PathData[];
  copy: Copy;
  lang: "fa" | "en";
  /** از ?path=ai روی سرور میاد؛ لینک مستقیم به یک مسیر، تا بشه برای کسی فرستادش */
  initial: PathData["id"] | null;
}) {
  const [active, setActive] = useState<PathData["id"] | null>(initial);
  const panelRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const path = paths.find((p) => p.id === active) ?? null;

  function choose(id: PathData["id"]) {
    setActive(id);
    const url = new URL(window.location.href);
    url.searchParams.set("path", id);
    window.history.replaceState(null, "", url);
    // بعد از رندر، پنل رو بیار جلوی چشم و فوکوس رو بده به تیترش تا
    // صفحه‌خوان هم بفهمه محتوای تازه کجاست
    requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panelRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      headingRef.current?.focus({ preventScroll: true });
    });
  }

  return (
    <>
      {/* ─── سؤال: تمام صفحه زرد. تنها کاری که این‌جا می‌شه کرد، انتخابه. ─── */}
      <section id="top" className="bg-[#FFD23F] text-[#1a1714] pt-[var(--nav-h)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 md:pt-20 pb-14 md:pb-20">
          <h1 className="font-body font-black leading-[1.15]" style={{ fontSize: "clamp(3rem, 10vw, 8.5rem)" }}>
            {copy.question}
          </h1>
          <p className="font-body text-lg md:text-xl leading-[2] text-[#3d3833] mt-6 max-w-xl">{copy.sub}</p>

          <div role="group" aria-label={copy.groupLabel} className="grid sm:grid-cols-2 gap-0 mt-12 border-2 border-[#1a1714]">
            {paths.map((p, i) => {
              const on = p.id === active;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={on}
                  aria-controls="route"
                  onClick={() => choose(p.id)}
                  className={`${s.choice} text-start p-6 md:p-8 min-h-[120px] flex gap-5 items-start border-[#1a1714] ${
                    i % 2 === 0 ? "sm:border-e-2" : ""
                  } ${i < 2 ? "border-b-2 sm:border-b-2" : i === 2 ? "border-b-2 sm:border-b-0" : ""} ${
                    on ? "bg-[#1a1714] text-[#FFD23F]" : "hover:bg-[#1a1714]/[0.07] active:bg-[#1a1714]/[0.12]"
                  }`}
                >
                  <span className="font-body font-black text-4xl md:text-5xl leading-none tabular-nums">{NUMS[lang][i]}</span>
                  <span>
                    <span className="block font-body font-black text-xl md:text-2xl leading-[1.5]">{p.label}</span>
                    <span className={`block font-body mt-1 ${on ? "text-[#FFD23F]/85" : "text-[#3d3833]"}`}>{p.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── مسیر: روی مشکی، چون این‌جا جواب میاد نه سؤال ─── */}
      <section id="route" ref={panelRef} className="bg-[#1a1714] text-[#FAF6F1] scroll-mt-[var(--nav-h)]">
        {!path ? (
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
            <p className="font-body text-lg text-[#FAF6F1]/80">{copy.empty}</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24">
            <div className="flex items-center gap-4 text-[#FFD23F]">
              <Canary flapKey={path.id} />
            </div>
            <h2 ref={headingRef} tabIndex={-1} className="font-body font-black leading-[1.3] mt-6 outline-none" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              {path.route}
            </h2>
            <p className="font-body text-lg leading-[2] text-[#FAF6F1]/80 mt-6 max-w-2xl">{path.intro}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span className="font-body text-[#FAF6F1]/70">{copy.firstStep}</span>
              <Go
                item={path.step}
                className="inline-flex items-center min-h-[52px] px-8 bg-[#FFD23F] text-[#1a1714] font-body font-black text-lg transition-[background-color,transform] duration-200 hover:bg-[#ffe27a] active:scale-[0.98]"
              >
                {path.step.label}
              </Go>
            </div>

            <div className="grid lg:grid-cols-12 gap-x-14 gap-y-14 mt-16">
              {(path.courses.length > 0 || path.links) && (
                <div className={path.quotes.length ? "lg:col-span-7" : "lg:col-span-12"}>
                  {path.courses.length > 0 && (
                    <>
                      <h3 className="font-body font-bold text-[#FFD23F] mb-2">{copy.courses}</h3>
                      <ul>{path.courses.map((c) => <CourseRow key={c.href} c={c} />)}</ul>
                    </>
                  )}
                  {path.links && path.links.items.length > 0 && (
                    <div className={path.courses.length ? "mt-12" : ""}>
                      {path.links.title && <h3 className="font-body font-bold text-[#FFD23F] mb-2">{path.links.title}</h3>}
                      <ul>{path.links.items.map((it) => <LinkRow key={it.href} item={it} />)}</ul>
                    </div>
                  )}
                </div>
              )}

              {path.quotes.length > 0 && (
                <div className={path.courses.length || path.links ? "lg:col-span-5" : "lg:col-span-12"}>
                  <h3 className="font-body font-bold text-[#FFD23F] mb-6">{copy.words}</h3>
                  <div className="space-y-10">
                    {path.quotes.map((q) => (
                      <figure key={q.name} className="border-s-0">
                        <blockquote className="font-body text-lg leading-[2]">{q.text}</blockquote>
                        <figcaption className="font-body text-sm mt-3">
                          <span className="font-bold">{q.name}</span>
                          <span className="text-[#FAF6F1]/70">{lang === "fa" ? "، " : ", "}{q.role}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="#top" className="inline-flex items-center min-h-[44px] mt-14 font-body text-[#FAF6F1]/80 underline underline-offset-[6px] hover:text-[#FFD23F]">
              {copy.change}
            </a>
          </div>
        )}
      </section>
    </>
  );
}
