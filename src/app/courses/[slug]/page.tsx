import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Users,
  Layers,
  Check,
  ChevronLeft,
  Calendar,
  Star,
  Palette,
  Search,
  Award,
  ShieldCheck,
  Send,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BuyButton from "@/components/BuyButton";
import WorkshopLanding from "@/components/WorkshopLanding";
import { courses, formatPrice, typeLabel, featuredProjects } from "@/lib/mock-data";
import { contentFor, disciplineOf, uiVsUx, guarantees } from "@/lib/course-content";

interface Props {
  params: Promise<{ slug: string }>;
}

const colorMap: Record<string, { bg: string; badge: string; accent: string }> = {
  "ui-infinity": { bg: "#FFF0EE", badge: "#FECACA", accent: "#dc2626" },
  "ux-infinity": { bg: "#EEF3FF", badge: "#BFDBFE", accent: "#1d4ed8" },
  "ui-offline":  { bg: "#FFF5F5", badge: "#FEE2E2", accent: "#ef4444" },
  "ux-offline":  { bg: "#F0F4FF", badge: "#DBEAFE", accent: "#2563eb" },
  "claude-for-designers": { bg: "#FBF0EA", badge: "#F3D9C7", accent: "#C2410C" },
};

// بنر اختصاصی هر دوره — بالای ستون محتوا
const posterMap: Record<string, string> = {
  "ui-infinity": "/images/banner-ui-infinity.jpg",
  "ux-infinity": "/images/banner-ux-infinity.jpg",
  "ui-offline":  "/images/banner-ui-offline.jpg",
  "ux-offline":  "/images/banner-ux-offline.jpg",
  "portfolio":   "/images/banner-portfolio.jpg",
  "prototype":   "/images/banner-prototype.jpg",
};

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  if (course.type === "workshop") {
    return (
      <>
        <Navbar />
        <WorkshopLanding course={course} />
        <Footer />
      </>
    );
  }

  const color = colorMap[slug] ?? colorMap["ui-infinity"];
  const discipline = slug.startsWith("ui") ? "UI" : slug.startsWith("ux") ? "UX" : "AI";
  const poster = posterMap[slug];

  const counterpartSlug = course.type === "infinity"
    ? slug.replace("-infinity", "-offline")
    : slug.replace("-offline", "-infinity");
  const counterpart = courses.find((c) => c.slug === counterpartSlug);

  const discountPct = course.originalPrice
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : null;

  // محتوای معرفی رشته / پیش‌نیاز / مسیر یادگیری بر اساس رشته‌ی دوره
  const content = contentFor(slug);
  const focus = disciplineOf(slug); // UI | UX | SKILL — کارت مرتبط هایلایت می‌شه
  const projects = featuredProjects.slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">

        {/* ── Hero ── */}
        <section style={{ backgroundColor: color.bg }} className="dot-bg py-20 relative overflow-hidden">
          {/* big decorative discipline word */}
          <div className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden">
            <span
              className="font-display font-black leading-none"
              style={{
                fontSize: "clamp(9rem, 26vw, 20rem)",
                color: color.accent,
                opacity: 0.05,
                marginRight: "-1rem",
              }}
            >
              {discipline}
            </span>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-[#6b6560] hover:text-[#1a1714] text-sm font-body mb-10 transition-colors"
            >
              <ChevronLeft size={14} className="rotate-180" />
              بازگشت به دوره‌ها
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                {/* Banner — full square image, no crop */}
                {poster && (
                  <div
                    className="relative w-full max-w-[340px] aspect-square rounded-3xl overflow-hidden shadow-md mb-7"
                    style={{ border: `1px solid ${color.accent}22` }}
                  >
                    <Image
                      src={poster}
                      alt={course.title}
                      fill
                      priority
                      sizes="340px"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Eyebrow chips */}
                <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                  <span
                    className="text-[11px] font-display font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{ backgroundColor: color.badge, color: color.accent }}
                  >
                    {typeLabel(course.type)}
                  </span>
                  <span className="text-[#c9c2b8] font-body text-xs">—</span>
                  <span className="text-[#6b6560] font-body text-xs">{course.level}</span>
                </div>

                {/* Label */}
                <div
                  className="font-display text-[10px] font-bold tracking-[0.22em] uppercase mb-2"
                  style={{ color: color.accent }}
                >
                  {course.subtitle}
                </div>

                <h1 className="font-body font-black text-4xl md:text-5xl text-[#1a1714] leading-[1.05] mb-5">
                  {course.title}
                </h1>
                <p className="text-[#6b6560] font-body text-base leading-relaxed mb-8 max-w-lg">
                  {course.longDescription}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-y-2 mb-8">
                  {[
                    { label: `${course.videoHours} ساعت ویدیو`, icon: <Clock size={13} /> },
                    course.type === "infinity"
                      ? { label: `${course.mentoringHours} ساعت منتورینگ`, icon: <Users size={13} /> }
                      : { label: `پشتیبانی ${course.supportMonths} ماهه`, icon: <Calendar size={13} /> },
                    { label: `${course.projects} پروژه عملی`, icon: <Layers size={13} /> },
                  ].map((s, i, arr) => (
                    <span key={i} className="flex items-center">
                      <span className="flex items-center gap-1.5 text-sm font-body text-[#6b6560]">
                        <span style={{ color: color.accent }}>{s.icon}</span>
                        {s.label}
                      </span>
                      {i < arr.length - 1 && (
                        <span className="mx-4 text-[#d4cdc5] select-none">·</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-body px-2.5 py-1 rounded-full bg-white/70 border border-[#e8e2d9] text-[#6b6560]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Purchase Card ── */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl border border-[#e8e2d9] p-7 sticky top-24 shadow-sm">
                  <div className="mb-5">
                    {course.originalPrice && (
                      <div className="font-body text-sm text-[#a09990] line-through mb-0.5">
                        {formatPrice(course.originalPrice)}
                      </div>
                    )}
                    <div className="font-body font-black text-3xl text-[#1a1714]">
                      {formatPrice(course.price)}
                    </div>
                    {discountPct && (
                      <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-body font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                        ↓ {discountPct}٪ تخفیف
                      </span>
                    )}
                  </div>

                  <BuyButton
                    slug={slug}
                    comingSoon={course.comingSoon}
                    externalUrl={course.externalUrl}
                  />
                  <p className="text-center text-[#a09990] text-xs font-body mb-6">
                    برای ثبت‌نام و مشاوره، در تلگرام به پشتیبانی پیام بده
                  </p>

                  <div className="space-y-2.5 pt-5 border-t border-[#f0ebe4]">
                    {course.features.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm font-body text-[#6b6560]">
                        <Check size={13} className="text-[#7c5cfc] flex-shrink-0 mt-0.5" />
                        {item}
                      </div>
                    ))}
                  </div>

                  {counterpart && (
                    <div className="mt-6 pt-5 border-t border-[#f0ebe4]">
                      <p className="text-[#a09990] text-xs font-body mb-2">
                        {course.type === "infinity" ? "نسخه آفلاین همین دوره:" : "نسخه بی‌نهایت با منتورینگ:"}
                      </p>
                      <Link
                        href={`/courses/${counterpart.slug}`}
                        className="flex items-center justify-between bg-[#f7f4ef] hover:bg-[#f0ebe4] rounded-xl px-4 py-3 transition-colors group"
                      >
                        <span className="font-body text-sm text-[#1a1714] font-medium">{counterpart.title}</span>
                        <span className="font-body text-sm text-[#6b6560] group-hover:text-[#1a1714] transition-colors">
                          {formatPrice(counterpart.price)}
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Basics: UI/UX چیست؟ ── */}
        <section className="py-20 bg-[#f7f4ef] border-t border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-10">
              <div
                className="font-display text-[10px] font-bold tracking-[0.22em] uppercase mb-3"
                style={{ color: color.accent }}
              >
                BASICS
              </div>
              <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714] leading-[1.4] mb-4">
                اصلاً UI و UX چی هستن؟
              </h2>
              <p className="font-body text-[#6b6560] leading-relaxed">{content.intro}</p>
            </div>

            {/* دو کارت مقایسه — کارتِ مرتبط با این دوره هایلایت می‌شه */}
            <div className="grid md:grid-cols-2 gap-5 mb-12">
              {[
                { key: "UI", Icon: Palette, ...uiVsUx.ui },
                { key: "UX", Icon: Search, ...uiVsUx.ux },
              ].map(({ key, Icon, label, question, desc, items }) => {
                const active = focus === key;
                return (
                  <div
                    key={key}
                    className="rounded-3xl p-6 bg-white border transition-colors relative"
                    style={{
                      borderColor: active ? color.accent : "#e8e2d9",
                      boxShadow: active ? `0 18px 40px -22px ${color.accent}` : undefined,
                    }}
                  >
                    {active && (
                      <span
                        className="absolute -top-2.5 right-6 text-[10px] font-body font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ backgroundColor: color.accent }}
                      >
                        تمرکز این دوره
                      </span>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: color.badge, color: color.accent }}
                      >
                        <Icon size={18} />
                      </span>
                      <div>
                        <div className="font-body font-bold text-sm text-[#1a1714]">{label}</div>
                        <div className="font-body text-xs text-[#a09990]">{question}</div>
                      </div>
                    </div>
                    <p className="font-body text-sm text-[#6b6560] leading-relaxed mb-4">{desc}</p>
                    <ul className="flex flex-wrap gap-2">
                      {items.map((it) => (
                        <li
                          key={it}
                          className="text-[11px] font-body text-[#6b6560] bg-[#f7f4ef] border border-[#e8e2d9] px-2.5 py-1 rounded-lg"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* این دوره به درد کیا می‌خوره */}
            <div className="max-w-3xl">
              <h3 className="font-body font-bold text-lg text-[#1a1714] mb-5">
                این دوره به درد کیا می‌خوره؟
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {content.goodFor.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 bg-white border border-[#e8e2d9] rounded-2xl px-4 py-3"
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: color.badge, color: color.accent }}
                    >
                      <Check size={12} />
                    </span>
                    <span className="font-body text-sm text-[#6b6560] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="py-20 bg-white border-t border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl">
              {[
                { num: "۰۱", label: "چی یاد می‌گیری",      items: course.learningOutcomes },
                { num: "۰۲", label: "این دوره برای کیه",   items: course.targetAudience   },
                { num: "۰۳", label: "بعد از دوره چی داری", items: course.afterCompletion   },
              ].map((col, i, arr) => (
                <div
                  key={i}
                  className={[
                    "py-8 md:py-0 md:px-8",
                    i === 0 ? "md:pr-0" : "",
                    i === arr.length - 1 ? "md:pl-0" : "",
                    i < arr.length - 1 ? "border-b md:border-b-0 md:border-l border-[#e8e2d9]" : "",
                  ].join(" ")}
                >
                  {/* Big pale number */}
                  <div
                    className="font-display font-black text-6xl leading-none mb-2 select-none"
                    style={{ color: color.accent, opacity: 0.12 }}
                  >
                    {col.num}
                  </div>
                  <h3 className="font-body font-bold text-sm text-[#1a1714] mb-5 tracking-tight">
                    {col.label}
                  </h3>
                  <ul className="space-y-3">
                    {col.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm font-body text-[#6b6560] leading-relaxed"
                      >
                        <span
                          className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: color.accent }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Prerequisites ── */}
        <section className="py-16 border-t border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <div
                className="font-display text-[10px] font-bold tracking-[0.22em] uppercase mb-3"
                style={{ color: color.accent }}
              >
                PREREQUISITES
              </div>
              <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714] leading-[1.4] mb-6">
                قبلش چی باید بلد باشی؟
              </h2>
              <ul className="space-y-3">
                {content.prerequisites.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: color.badge, color: color.accent }}
                    >
                      <Check size={12} />
                    </span>
                    <span className="font-body text-[#6b6560] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Topics ── */}
        <section className="py-20 border-t border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Section header */}
            <div className="flex items-end justify-between mb-10 max-w-3xl">
              <div>
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                  CURRICULUM
                </div>
                <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714]">
                  سرفصل‌های دوره
                </h2>
              </div>
              <span
                className="font-display font-bold text-sm px-3 py-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: color.badge, color: color.accent }}
              >
                {course.topics.length} فصل
              </span>
            </div>

            <div className="max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.topics.map((topic, i) => {
                const isProject = topic.title.includes("(Project)");
                return (
                  <div
                    key={i}
                    className="rounded-2xl px-4 py-3.5 flex items-start gap-3 transition-all"
                    style={{
                      backgroundColor: isProject ? color.badge : "white",
                      border: `1px solid ${isProject ? color.accent + "28" : "#e8e2d9"}`,
                    }}
                  >
                    {/* Chapter number */}
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[9px] font-display font-black mt-0.5"
                      style={{
                        backgroundColor: isProject ? color.accent : color.badge,
                        color: isProject ? "white" : color.accent,
                      }}
                    >
                      {i + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-body text-xs font-semibold text-[#1a1714] leading-snug">
                          {topic.title}
                        </span>
                        {isProject && (
                          <span
                            className="text-[8px] font-display font-black tracking-wider px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: color.accent, color: "white" }}
                          >
                            PROJECT
                          </span>
                        )}
                      </div>
                      <div className="font-body text-[11px] text-[#a09990] leading-relaxed">
                        {topic.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section className="py-20 bg-white border-t border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-10">
              <div
                className="font-display text-[10px] font-bold tracking-[0.22em] uppercase mb-3"
                style={{ color: color.accent }}
              >
                ROADMAP
              </div>
              <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714] leading-[1.4] mb-3">
                مسیر یادگیری، قدم به قدم
              </h2>
              <p className="font-body text-[#6b6560] leading-relaxed">
                از صفر شروع می‌کنی و هر قدم روی قدم قبلی سوار می‌شه — آخرش یه خروجی واقعی داری.
              </p>
            </div>

            <div className="relative">
              {/* خط عمودی مسیر */}
              <div className="absolute top-2 bottom-2 right-[19px] w-px bg-[#e8e2d9] hidden sm:block" />
              <div className="space-y-5">
                {content.roadmap.map((step, i) => (
                  <div key={step.title} className="flex items-start gap-5 relative">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-black text-sm relative z-10 border-4 border-white"
                      style={{ backgroundColor: color.badge, color: color.accent }}
                    >
                      {String(i + 1).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d])}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="font-body font-bold text-[#1a1714] mb-1">{step.title}</h3>
                      <p className="font-body text-sm text-[#6b6560] leading-relaxed max-w-2xl">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Mentoring (infinity only) ── */}
        {course.type === "infinity" && (
          <section className="py-20 bg-[#1a1714] border-t border-[#e8e2d9] relative overflow-hidden">
            {/* Big decorative 10 */}
            <div
              className="absolute -bottom-10 left-0 font-display font-black leading-none select-none pointer-events-none"
              style={{ fontSize: "clamp(10rem, 28vw, 22rem)", color: "white", opacity: 0.03 }}
            >
              10
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
              <div className="max-w-4xl">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-white/25 mb-4">
                  MENTORING
                </div>

                <div className="flex flex-wrap items-end gap-x-6 gap-y-2 mb-3">
                  <h2 className="font-body font-black text-2xl md:text-3xl text-white">
                    جلسات منتورینگ چطوره؟
                  </h2>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="font-display font-black text-5xl leading-none" style={{ color: color.accent }}>
                      ۱۰
                    </span>
                    <span className="font-body text-sm text-white/30">هفته</span>
                  </div>
                </div>

                <p className="text-white/40 font-body text-sm mb-10 max-w-lg leading-relaxed">
                  هر هفته یه جلسه گروهی آنلاین — پروژه‌ها بررسی میشن، فیدبک مستقیم می‌گیری
                  و از فیدبک بقیه هم یاد می‌گیری
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { num: "۱", title: "جلسه گروهی",    desc: "همه هم‌دوره‌ای‌ها با هم. از فیدبک بقیه هم یاد می‌گیری." },
                    { num: "۲", title: "بررسی پروژه",    desc: "کار هفته قبل بررسی میشه — نقاط قوت، ضعف و راه بهبود." },
                    { num: "۳", title: "فردی یا گروهی",  desc: "پروژه رو تنها انجام بده یا با یه هم‌دوره‌ای. انتخاب با خودته." },
                    { num: "۴", title: "ضبط جلسات",      desc: "همه جلسات ضبط میشن. هیچ جلسه‌ای از دست نمیره." },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-5 border border-white/8 bg-white/[0.04] hover:bg-white/[0.07] transition-colors"
                    >
                      <div
                        className="font-display font-black text-3xl leading-none mb-4"
                        style={{ color: color.accent, opacity: 0.55 }}
                      >
                        {item.num}
                      </div>
                      <div className="font-body font-bold text-white text-sm mb-1.5">{item.title}</div>
                      <div className="font-body text-xs text-white/35 leading-relaxed">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        <section className="py-20 border-t border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl">
              <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-3">
                FAQ
              </div>
              <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714] mb-10">
                سوالات پرتکرار
              </h2>

              <div className="space-y-2">
                {course.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-[#e8e2d9] rounded-2xl overflow-hidden bg-white"
                  >
                    <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none">
                      <span
                        className="font-display font-black text-xs w-5 text-right flex-shrink-0"
                        style={{ color: color.accent, opacity: 0.4 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-body font-semibold text-sm text-[#1a1714] flex-1">
                        {faq.q}
                      </span>
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-transform duration-200 group-open:rotate-45"
                        style={{ backgroundColor: color.badge, color: color.accent }}
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 pt-2 border-t border-[#f0ebe4]">
                      <p className="font-body text-sm text-[#6b6560] leading-relaxed pr-9">
                        {faq.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        {course.testimonials.length > 0 && (
          <section className="py-20 bg-[#f7f4ef] border-t border-[#e8e2d9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-3">
                TESTIMONIALS
              </div>
              <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714] mb-10">
                دانشجوها می‌گن
              </h2>

              <div className="max-w-3xl space-y-3">
                {/* Featured */}
                <div className="bg-white rounded-3xl p-7 border border-[#e8e2d9] relative overflow-hidden">
                  {/* decorative big quote */}
                  <div
                    className="absolute -top-3 left-5 font-display font-black leading-none select-none pointer-events-none"
                    style={{ fontSize: "7rem", color: color.accent, opacity: 0.06 }}
                  >
                    "
                  </div>
                  <div className="relative">
                    <p className="font-body text-base text-[#1a1714] leading-relaxed mb-6 font-medium">
                      {course.testimonials[0].text}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-body font-bold flex-shrink-0"
                          style={{ backgroundColor: color.badge, color: color.accent }}
                        >
                          {course.testimonials[0].avatar}
                        </div>
                        <div>
                          <div className="font-body font-bold text-sm text-[#1a1714]">
                            {course.testimonials[0].name}
                          </div>
                          <div className="flex items-center gap-0.5 mt-0.5">
                            {[1,2,3,4,5].map((j) => (
                              <Star
                                key={j}
                                size={10}
                                fill={color.accent}
                                style={{ color: color.accent }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      {course.testimonials[0].outcome && (
                        <span className="text-[11px] font-body font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600">
                          ✓ {course.testimonials[0].outcome}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rest */}
                {course.testimonials.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.testimonials.slice(1).map((t, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl p-5 border border-[#e8e2d9] flex flex-col gap-4"
                      >
                        <p className="font-body text-sm text-[#6b6560] leading-relaxed flex-1">
                          {t.text}
                        </p>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-body font-bold"
                              style={{ backgroundColor: color.badge, color: color.accent }}
                            >
                              {t.avatar}
                            </div>
                            <span className="font-body text-xs font-semibold text-[#1a1714]">
                              {t.name}
                            </span>
                          </div>
                          {t.outcome && (
                            <span className="text-[10px] font-body font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">
                              ✓ {t.outcome}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Student work ── */}
        {projects.length > 0 && (
          <section className="py-20 bg-white border-t border-[#e8e2d9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
                <div>
                  <div
                    className="font-display text-[10px] font-bold tracking-[0.22em] uppercase mb-3"
                    style={{ color: color.accent }}
                  >
                    STUDENT WORK
                  </div>
                  <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714] leading-[1.4]">
                    نمونه‌کار دانشجوها
                  </h2>
                </div>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm font-body text-[#6b6560] hover:text-[#1a1714] border border-[#e8e2d9] hover:border-[#1a1714]/20 px-4 py-2.5 rounded-xl transition-colors"
                >
                  همه‌ی نمونه‌کارها
                  <ChevronLeft size={14} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((p) => (
                  <a
                    key={p.id}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-[#f7f4ef] border border-[#e8e2d9] hover:border-[#1a1714]/20 rounded-3xl p-5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-body font-bold text-[#1a1714] text-sm leading-snug">
                        {p.projectTitle}
                      </h3>
                      <ExternalLink
                        size={14}
                        className="text-[#c8c2ba] group-hover:text-[#1a1714] transition-colors flex-shrink-0 mt-0.5"
                      />
                    </div>
                    <p className="font-body text-xs text-[#a09990] mb-3">{p.studentName}</p>
                    <p className="font-body text-sm text-[#6b6560] leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Certificate ── */}
        <section className="py-14 bg-[#1a1714] border-t border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-start gap-4 max-w-xl">
                <span className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                  <Award size={20} />
                </span>
                <div>
                  <h2 className="font-body font-bold text-white text-lg mb-1.5">
                    گواهی پایان دوره، قابل استعلام
                  </h2>
                  <p className="font-body text-white/50 text-sm leading-relaxed">
                    بعد از اتمام دوره گواهی می‌گیری که یه کد یکتا داره — هر کسی (و هر کارفرمایی)
                    می‌تونه اعتبارش رو همین‌جا روی سایت چک کنه.
                  </p>
                </div>
              </div>
              <Link
                href="/certificates"
                className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#1a1714] font-body font-bold text-sm px-6 py-3.5 rounded-2xl transition-colors flex-shrink-0"
              >
                استعلام گواهی
                <ChevronLeft size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Instructor ── */}
        <section className="py-16 bg-white border-t border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between flex-wrap gap-6 max-w-3xl">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-body font-bold"
                  style={{ backgroundColor: color.badge, color: color.accent }}
                >
                  م
                </div>
                <div>
                  <div className="font-display text-[9px] font-bold tracking-[0.2em] uppercase text-[#a09990] mb-0.5">
                    INSTRUCTOR
                  </div>
                  <div className="font-body font-bold text-[#1a1714]">{course.instructor}</div>
                  <div className="text-[#a09990] text-xs font-body">طراح UI/UX — @mojtabaui</div>
                </div>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-[#f7f4ef] hover:bg-[#f0ebe4] text-[#1a1714] font-body text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                <ChevronLeft size={14} className="rotate-180" />
                دیدن همه دوره‌ها
              </Link>
            </div>
          </div>
        </section>

        {/* ── Guarantees ── */}
        <section className="py-20 border-t border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-9">
              <div
                className="font-display text-[10px] font-bold tracking-[0.22em] uppercase mb-3"
                style={{ color: color.accent }}
              >
                WHY US
              </div>
              <h2 className="font-body font-black text-2xl md:text-3xl text-[#1a1714] leading-[1.4]">
                چی تحویل می‌گیری؟
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {guarantees.map((g) => (
                <div
                  key={g.title}
                  className="bg-white border border-[#e8e2d9] rounded-3xl p-6"
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: color.badge, color: color.accent }}
                  >
                    <ShieldCheck size={18} />
                  </span>
                  <h3 className="font-body font-bold text-sm text-[#1a1714] mb-2">{g.title}</h3>
                  <p className="font-body text-sm text-[#6b6560] leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 bg-[#1a1714] border-t border-[#e8e2d9]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-body font-black text-3xl md:text-4xl text-white leading-[1.3] mb-4">
              هنوز مطمئن نیستی این دوره مناسبته؟
            </h2>
            <p className="font-body text-white/45 leading-relaxed mb-8 max-w-lg mx-auto">
              قبل از ثبت‌نام بپرس. توی تلگرام بگو الان کجای مسیری و چی می‌خوای —
              اگه این دوره برات مناسب نبود، خودم صادقانه می‌گم.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href="https://t.me/melina_support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#1a1714] font-body font-bold px-8 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send size={17} />
                مشاوره و ثبت‌نام در تلگرام
              </a>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-body font-semibold px-7 py-4 rounded-2xl transition-all text-sm"
              >
                مقایسه با بقیه دوره‌ها
                <ChevronLeft size={15} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return courses
    .filter((c) => !c.externalUrl)
    .map((c) => ({ slug: c.slug }));
}
