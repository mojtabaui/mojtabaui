import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star, ChevronLeft, ChevronRight, ExternalLink, Send, Layers, Clock, Calendar, Users, Check, Plus, Gift, MonitorPlay, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursesClient from "@/components/CoursesClient";
import MarqueeBand from "@/components/MarqueeBand";
import FadeIn from "@/components/FadeIn";
import AnimatedCounter from "@/components/AnimatedCounter";
import HeroImage from "@/components/HeroImage";
import HeroDecor from "@/components/HeroDecor";
import ParallaxY from "@/components/ParallaxY";
import ArticleRow from "@/components/ArticleRow";
import DiscountNotifyForm from "@/components/DiscountNotifyForm";
import Model3D from "@/components/Model3D";
import PersonalNote from "@/components/PersonalNote";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import { infinityCourses, videoCourses, formatPrice, articles, featuredProjects } from "@/lib/mock-data";
import { getLang } from "@/lib/i18n/server";
import { HOME } from "@/lib/i18n/dict/home";
import { TESTIMONIALS } from "@/lib/i18n/dict/testimonials";
import { localizeCourses } from "@/lib/i18n/content/courses";


export default async function Home() {
  const lang = await getLang();
  const t = HOME[lang];
  const rtl = lang === "fa";
  // پیکانِ «جلو» توی خط انگلیسی سمت راسته و توی فارسی سمت چپ
  const Forward = rtl ? ArrowLeft : ArrowRight;
  const Next = rtl ? ChevronLeft : ChevronRight;

  const infinity = localizeCourses(infinityCourses, lang);
  const videos = localizeCourses(videoCourses, lang);
  const faqs = (infinity[0]?.faqs ?? []).slice(0, 6);

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ─── Hero ─── */}
        {/* ارتفاع با clamp بسته شده. بدون سقف، روی نمایشگر بلند (مثلاً ۱۴۴۰) هیرو
            بیش از ۱۲۰۰ پیکسل می‌شد و چون محتوا ته‌چینه، بالای صفحه خالی می‌موند. */}
        {/* نوار بالا ثابته و روی صفحه شناوره، پس هیرو باید به اندازه‌ی ارتفاعش
            از بالا فاصله بگیره. قبلاً این فاصله فقط روی موبایل بود و روی
            نمایشگرِ کوتاه، بلوکِ ته‌چینِ دسکتاپ از بالا می‌زد بیرون و
            نوتِ «+۶٬۵۰۰ نفر» می‌رفت زیر منو. */}
        <section
          className="dot-bg overflow-hidden relative flex flex-col pt-[var(--nav-h)]"
          style={{ backgroundColor: "#FAF6F1", minHeight: "clamp(560px, 86vh, 860px)" }}
        >

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

            {/* Text — top on mobile, right on desktop.
                فاصله‌ی زیرِ منو رو حالا خودِ سکشن می‌ده، پس این‌جا فقط یک
                نفَسِ کوچیک لازمه نه جبرانِ ارتفاع نوار. */}
            <div className="flex-shrink-0 max-w-xl 2xl:max-w-2xl pt-10 pb-2 lg:pt-0 lg:pb-20">

                {/* Eyebrow */}
                <div
                  className="inline-flex items-center gap-2 bg-white border border-[#e8e2d9] rounded-full px-4 py-1.5 mb-7 fade-in-up"
                  style={{ animationDelay: "0ms" }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                  <span className="font-body text-xs text-[#6b6560]">
                    {t.hero.badge}
                  </span>
                </div>

                <h1
                  className="font-body font-extrabold text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.45] text-[#1a1714] mb-6 fade-in-up"
                  style={{ animationDelay: "80ms" }}
                >
                  {t.hero.title}
                </h1>

                <p
                  className="text-[#6b6560] font-body text-lg leading-relaxed mb-10 max-w-lg fade-in-up"
                  style={{ animationDelay: "160ms" }}
                >
                  {t.hero.body}
                </p>

                <div
                  className="flex items-center gap-4 flex-wrap fade-in-up"
                  style={{ animationDelay: "240ms" }}
                >
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] text-white font-body font-semibold px-7 py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {t.hero.primary}
                    <Forward size={16} />
                  </Link>
                  {/* دکمه‌ی ثانویه به‌جای اینستاگرام: چیزی که واقعاً قدم بعدی کاربره */}
                  <Link
                    href="/checklist"
                    className="inline-flex items-center gap-2 text-[#6b6560] hover:text-[#1a1714] font-body text-sm transition-colors border border-[#e8e2d9] hover:border-[#1a1714]/20 px-5 py-3.5 rounded-2xl bg-white hover:bg-[#faf8f5]"
                  >
                    {t.hero.secondary}
                    <Next size={15} />
                  </Link>
                </div>

                {/* Social proof */}
                <div
                  className="flex items-center gap-4 mt-10 fade-in-up"
                  style={{ animationDelay: "320ms" }}
                >
                  <div className="flex -space-x-2 space-x-reverse">
                    {t.hero.avatars.map((c, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-[#e8e2d9] border-2 border-[#f7f4ef] flex items-center justify-center text-[10px] font-body text-[#6b6560]"
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 mb-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={11} className="text-amber-400" fill="#fbbf24" />
                      ))}
                    </div>
                    <span className="text-[#a09990] text-xs font-body">{t.hero.proof}</span>
                  </div>
                </div>

            </div>

            {/* Mobile image — bottom, touches black bar */}
            <div className="lg:hidden relative flex-1 min-h-[40vh]">
              <Image
                src="/images/hero.png"
                alt={t.hero.portraitAlt}
                fill
                className="object-contain object-bottom"
                style={{ transform: "scaleX(-1)" }}
                priority
              />
            </div>

            {/* Desktop image */}
            <HeroImage />

          </div>
        </section>

        {/* ─── Stats band ─── */}
        <section className="bg-[#1a1714] border-b border-[#2a2520]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-[#2d2926]">
              {t.stats.map((s) => (
                <div key={s.label} className="py-7 px-6 text-center">
                  <AnimatedCounter value={s.value} label={s.label} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Marquee ─── */}
        <MarqueeBand />

        {/* ─── Why Us ─── */}
        <section style={{ backgroundColor: "#E4DAD5" }} className="py-24 border-b border-[#d4c8c2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* GIF — right side in RTL (first in DOM) */}
              <FadeIn className="flex justify-center">
                <img
                  src="/images/why_us.gif"
                  alt={t.whyUs.gifAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-[560px]"
                />
              </FadeIn>

              {/* Text — left side in RTL (second in DOM) */}
              <FadeIn delay={0.12}>
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#8a7b74] mb-4">
                  {t.whyUs.kicker}
                </div>
                <h2 className="font-body font-black text-3xl md:text-4xl text-[#1a1714] leading-tight mb-6">
                  {t.whyUs.titleTop}
                  <br />
                  {t.whyUs.titleBottom}
                </h2>
                <p className="text-[#6b6560] font-body leading-relaxed mb-10 text-base">
                  {t.whyUs.body}
                </p>

                <div className="space-y-5">
                  {t.whyUs.points.map((item, i) => (
                    <div key={i} className="flex items-center gap-5">
                      <div
                        className="font-display font-black text-2xl flex-shrink-0 w-20 text-start"
                        style={{ color: "#1a1714" }}
                      >
                        {item.num}
                      </div>
                      <div className="w-px h-6 bg-[#c4b8b0] flex-shrink-0" />
                      <div className="font-body text-sm text-[#6b6560]">{item.label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* ─── اعلان کارگاه پرامپت تا پروداکت ───
            سکشن مستقل و بالای صفحه، جدا از داده‌ی دوره (که هنوز مخفیه). محتوا
            این‌جا صریح نوشته شده تا بدون باز کردنِ صفحه‌ی کارگاه دیده بشه. CTA
            چون هنوز ثبت‌نام باز نیست «به زودی» می‌گه و لینک نمی‌ره. عکس رو
            بعداً می‌ذاریم؛ فعلاً یه پلیس‌هولدرِ تیره سرجاشه. */}
        <section className="relative overflow-hidden bg-black border-y border-white/10">
          <div className="grain-static absolute inset-0 pointer-events-none mix-blend-overlay" style={{ opacity: 0.12 }} />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,92,252,0.18), transparent 70%)" }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

              {/* متن — راست در RTL */}
              <FadeIn>
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-[#7c5cfc]/30 rounded-full px-3.5 py-1.5 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#a78bfa] pulse-dot" />
                    <span className="font-body text-xs font-semibold text-[#a78bfa]">{t.workshop.badge}</span>
                  </div>

                  <div className="font-display text-[10px] font-bold tracking-[0.28em] uppercase text-white/40 mb-3">
                    {t.workshop.kicker}
                  </div>
                  <h2 className="font-body font-black text-3xl md:text-[2.6rem] text-white leading-[1.2] mb-5">
                    {t.workshop.title}
                  </h2>
                  <p className="text-white/55 font-body leading-[1.9] mb-8 max-w-md">
                    {t.workshop.body}
                  </p>

                  {/* آنچه یاد می‌گیری */}
                  <ul className="space-y-2.5 mb-8">
                    {t.workshop.bullets.map((li) => (
                      <li key={li} className="flex items-start gap-3 text-white/70 font-body text-sm leading-relaxed">
                        <span className="w-5 h-5 rounded-md bg-[#7c5cfc]/15 text-[#a78bfa] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} />
                        </span>
                        {li}
                      </li>
                    ))}
                  </ul>

                  {/* متا: زمان، تاریخ، قیمت */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-9">
                    <span className="flex items-center gap-2 text-sm font-body text-white/70">
                      <Clock size={15} className="text-[#a78bfa]" /> {t.workshop.duration}
                    </span>
                    <span className="flex items-center gap-2 text-sm font-body text-white/70">
                      <Calendar size={15} className="text-[#a78bfa]" /> {t.workshop.date}
                    </span>
                    <span className="flex items-center gap-2 text-sm font-body">
                      <span className="font-body font-black text-white text-lg">{t.workshop.price}</span>
                      <span className="text-white/40 text-xs">{t.workshop.currency}</span>
                    </span>
                  </div>

                  {/* ظرفیت محدود، درست بالای دکمه تا حس فوریت بده */}
                  <div className="flex items-center gap-2 text-sm font-body text-white/70 mb-4">
                    <Users size={15} className="text-[#a78bfa]" />
                    {t.workshop.capacity}
                  </div>

                  {/* CTA — هنوز ثبت‌نام باز نیست */}
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/15 text-white/90 font-body font-semibold px-7 py-3.5 rounded-2xl cursor-not-allowed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] pulse-dot" />
                    {t.workshop.cta}
                  </button>
                </div>
              </FadeIn>

              {/* عکس کارگاه — چپ در RTL. بنر مربعیه، پس قاب هم مربعه. */}
              <FadeIn delay={0.12}>
                <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square bg-black">
                  <Image
                    src="/images/workshop_banner.jpg"
                    alt={t.workshop.bannerAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* ─── دوره‌ها (تب‌دار) ─── */}
        {/* دو سکشنِ جدا (بی‌نهایت و ویدیویی) شدن یک سکشنِ تب‌دار تا صفحه کوتاه‌تر
            بشه. تبِ کارگاه چون workshopCourses خالیه اصلاً نشون داده نمی‌شه. */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                  {t.courses.kicker}
                </div>
                <h2 className="font-body font-extrabold text-3xl md:text-4xl text-[#1a1714]">
                  {t.courses.title}
                </h2>
                <p className="text-[#a09990] text-sm font-body mt-1">
                  {t.courses.subtitle}
                </p>
              </div>
              <Link
                href="/courses"
                className="hidden md:flex items-center gap-1.5 text-[#6b6560] hover:text-[#1a1714] text-sm font-body transition-colors"
              >
                {t.courses.all}
                <Next size={14} />
              </Link>
            </div>
          </FadeIn>
          <CoursesClient infinityCourses={infinity} videoCourses={videos} workshopCourses={[]} />
        </section>

        {/* ─── Why Infinity ─── */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-16">
              <FadeIn>
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-3">
                  {t.whyCourses.kicker}
                </div>
                <h2 className="font-body font-extrabold text-3xl md:text-4xl lg:text-[2.75rem] text-[#1a1714] leading-[1.3] mb-4">
                  {t.whyCourses.title}
                </h2>
                <p className="text-[#6b6560] font-body text-base leading-relaxed max-w-lg">
                  {t.whyCourses.body}
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
              {t.whyCourses.items.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="group border-t border-[#e8e2d9] pt-7 pb-8 px-1 hover:bg-[#faf8f5] transition-colors rounded-xl p-4">
                    <ParallaxY speed={18}>
                      <div
                        className="font-display font-black text-5xl leading-none mb-5 transition-colors duration-300"
                        style={{ color: "#e8e2d9" }}
                      >
                        {item.num}
                      </div>
                    </ParallaxY>
                    <div className="font-body font-bold text-[#1a1714] text-sm mb-1.5">{item.title}</div>
                    <div className="text-[#a09990] text-xs font-body leading-relaxed">{item.desc}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── روند دوره‌ها ─── */}
        {/* دو مسیر واقعی: بی‌نهایت ۱۰ هفته با منتورینگ گروهی، آفلاین ۸ هفته با
            بررسی منتور. متن‌ها از همون اسلایدهای روند دوره اومدن. */}
        <section className="py-24 bg-[#1a1714] relative overflow-hidden">
          <div className="grain-static absolute inset-0 pointer-events-none mix-blend-overlay" style={{ opacity: 0.1 }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <FadeIn>
              <div className="max-w-2xl mb-14">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a78bfa] mb-3">
                  {t.howItWorks.kicker}
                </div>
                <h2 className="font-body font-extrabold text-3xl md:text-4xl text-white leading-[1.3] mb-4">
                  {t.howItWorks.title}
                </h2>
                <p className="text-white/50 font-body leading-relaxed">
                  {t.howItWorks.body}
                </p>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-6">
              {t.howItWorks.tracks.map((track, ti) => (
                <FadeIn key={track.name} delay={ti === 0 ? 0 : 0.1}>
                  <div
                    className={`h-full rounded-3xl p-8 border ${
                      ti === 0
                        ? "bg-white/[0.05] border-[#7c5cfc]/30"
                        : "bg-white/[0.02] border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-8">
                      <h3 className="font-body font-black text-xl text-white">{track.name}</h3>
                      <span className="text-[11px] font-body font-bold px-3 py-1 rounded-full bg-[#7c5cfc]/15 text-[#a78bfa] whitespace-nowrap">
                        {track.tag}
                      </span>
                    </div>

                    <ol className="space-y-5">
                      {track.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span
                            className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-black text-sm ${
                              ti === 0
                                ? "bg-[#7c5cfc] text-white"
                                : "bg-white/[0.06] text-white/60"
                            }`}
                          >
                            {t.howItWorks.digits[i]}
                          </span>
                          <span className="font-body text-sm leading-[1.9] text-white/70 pt-1">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* نوارِ نکته‌ها: چیزهایی که فارغ از نسخه، برای همه صادقه */}
            <FadeIn delay={0.15}>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {t.howItWorks.notes.map(({ title, desc }, i) => {
                  const Icon = [Gift, MonitorPlay, MessageCircle][i] ?? Gift;
                  return (
                  <div key={title} className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
                    <span className="w-10 h-10 rounded-xl bg-[#7c5cfc]/15 text-[#a78bfa] flex items-center justify-center mb-4">
                      <Icon size={18} />
                    </span>
                    <div className="font-body font-bold text-white text-sm mb-1.5">{title}</div>
                    <p className="font-body text-white/45 text-xs leading-relaxed">{desc}</p>
                  </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section className="py-24 bg-[#1a1714] dot-bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-white/20 mb-3">
                  {t.testimonialsSection.kicker}
                </div>
                <h2 className="font-body font-extrabold text-3xl md:text-4xl text-white mb-2">
                  {t.testimonialsSection.title}
                </h2>
                <p className="text-white/30 font-body text-sm">
                  {t.testimonialsSection.subtitle}
                </p>
              </div>
            </FadeIn>

            <TestimonialsGrid testimonials={TESTIMONIALS[lang]} />
          </div>
        </section>

        {/* ─── Student Projects ─── */}
        <section className="py-24 bg-[#1a1714]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeIn>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-white/20 mb-2">
                    {t.studentWork.kicker}
                  </div>
                  <h2 className="font-body font-extrabold text-3xl text-white">{t.studentWork.title}</h2>
                  <p className="text-white/30 text-sm font-body mt-1">{t.studentWork.subtitle}</p>
                </div>
                <Link
                  href="/projects"
                  className="hidden md:flex items-center gap-1.5 text-white/40 hover:text-white text-sm font-body transition-colors"
                >
                  {t.studentWork.all}
                  <Next size={14} />
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProjects.map((project, i) => {
                const isUI    = project.courseType === "ui";
                const isFigma = project.linkType   === "figma";
                const color   = isUI ? "#FFF0EE" : "#EEF3FF";
                const accent  = isUI ? "#dc2626"  : "#1d4ed8";
                return (
                  <FadeIn key={project.id} delay={i * 0.08}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:bg-white/10 hover:border-white/20 transition-all block"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {project.coverImage ? (
                          <Image
                            src={project.coverImage}
                            alt={project.projectTitle}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-3xl"
                            style={{ backgroundColor: color + "22" }}
                          >
                            <span className="opacity-20">{isUI ? "🖥" : "📋"}</span>
                          </div>
                        )}
                        <div className="absolute top-3 right-3 flex gap-1.5">
                          <span
                            className="text-[10px] font-body font-semibold px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: color + "ee", color: accent }}
                          >
                            {isUI ? "UI" : "UX"}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-body text-[#6b6560] bg-white/90 px-2.5 py-1 rounded-full">
                            {isFigma ? <><Layers size={9} />Figma</> : <><Send size={9} />PDF</>}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-body font-bold text-white text-sm mb-1">{project.projectTitle}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-white/40 text-xs font-body">{t.studentWork.groupProject}</span>
                          <ExternalLink size={12} className="text-white/25 group-hover:text-white/60 transition-colors" />
                        </div>
                      </div>
                    </a>
                  </FadeIn>
                );
              })}
            </div>

            <FadeIn delay={0.2}>
              <div className="mt-10 text-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 border border-white/15 hover:border-white/35 text-white/60 hover:text-white font-body text-sm px-6 py-2.5 rounded-xl transition-all"
                >
                  {t.studentWork.allLong}
                  <Forward size={14} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── Articles ───
            مقاله‌ها فقط فارسی‌ان. توی نسخهٔ انگلیسی کل سکشن برداشته می‌شه، چون
            تیترِ انگلیسی روی فهرستی از مقاله‌های فارسی، بدقولیه نه ترجمه. */}
        {rtl && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="border-t-2 border-[#1a1714] pt-6 mb-2">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                    {t.articles.kicker}
                  </div>
                  <h2 className="font-body font-extrabold text-3xl text-[#1a1714]">{t.articles.title}</h2>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <p className="text-[11px] font-body text-[#a09990]">{t.articles.note}</p>
                  <Link
                    href="/articles"
                    className="flex items-center gap-1 text-[#1a1714] text-sm font-body font-semibold hover:opacity-50 transition-opacity"
                  >
                    <Next size={13} />
                    {t.articles.all}
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
          <div>
            {articles.slice(0, 4).map((article, i) => (
              <FadeIn key={article.id} delay={i * 0.07}>
                <ArticleRow article={article} index={i} />
              </FadeIn>
            ))}
          </div>
        </section>
        )}

        {/* ─── About ─── */}
        <section id="about" className="py-24" style={{ backgroundColor: "#FAF6F1" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <FadeIn>
              <div className="border-t-2 border-[#1a1714] pt-6 mb-12">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                  {t.about.kicker}
                </div>
                <h2 className="font-body font-extrabold text-3xl text-[#1a1714]">{t.about.heading}</h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-start">

              {/* Text — DOM first = RIGHT in RTL */}
              <FadeIn>
                <div>
                  {/* Name + role */}
                  <div className="flex items-baseline gap-4 flex-wrap mb-6">
                    <h3 className="font-body font-black text-3xl md:text-4xl text-[#1a1714] leading-tight">
                      {t.about.name}
                    </h3>
                    <span className="font-body text-sm font-semibold" style={{ color: "#7c5cfc" }}>
                      {t.about.role}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="font-body text-[#6b6560] leading-[1.9] mb-8 text-[15px]">
                    {t.about.bio}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-8 mb-8 border-y border-[#e8e2d9] py-6">
                    {t.about.stats.map(({ num, label }) => (
                      <div key={label}>
                        <div className="font-display font-black text-2xl text-[#1a1714]">{num}</div>
                        <div className="text-[11px] font-body text-[#a09990] mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Expertise areas */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                    {t.about.expertise.map(({ title, desc }) => (
                      <div key={title} className="rounded-2xl p-4 border border-[#e8e2d9]" style={{ backgroundColor: "#f7f3ee" }}>
                        <div className="font-display text-[11px] font-bold tracking-wide text-[#1a1714] mb-1.5">{title}</div>
                        <div className="text-[12px] font-body text-[#a09990] leading-relaxed">{desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {["Trust UX", "Legal Tech", "e-Commerce", "Information Architecture", "Luxury Brands"].map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-body font-medium px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: "#f0ebe4", color: "#6b6560" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Photo — DOM second = LEFT in RTL, narrow column */}
              <FadeIn delay={0.12}>
                <div className="relative lg:sticky lg:top-24">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                    <Image
                      src="/images/about_me.PNG"
                      alt={t.about.photoAlt}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div
                    className="absolute -bottom-3 -left-3 w-16 h-16 rounded-xl -z-10"
                    style={{ backgroundColor: "#7c5cfc18" }}
                  />
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="mb-12 max-w-xl">
              <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                {t.faq.kicker}
              </div>
              <h2 className="font-body font-extrabold text-3xl md:text-4xl text-[#1a1714] mb-3">
                {t.faq.title}
              </h2>
              <p className="text-[#6b6560] font-body leading-relaxed">
                {t.faq.body}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-[1fr_440px] gap-10 lg:gap-14 items-center">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 0.05}>
                <details className="group bg-white border border-[#e8e2d9] rounded-2xl overflow-hidden hover:border-[#1a1714]/20 transition-colors">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                    <span className="font-body font-semibold text-[#1a1714] text-sm leading-relaxed">
                      {faq.q}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#f7f4ef] text-[#6b6560] flex items-center justify-center flex-shrink-0 transition-transform group-open:rotate-45">
                      <Plus size={14} />
                    </span>
                  </summary>
                  <div className="px-6 pb-5 -mt-1">
                    <p className="font-body text-sm text-[#6b6560] leading-[1.9]">{faq.a}</p>
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>

            {/* تصویر سکشن */}
            <FadeIn delay={0.1} className="hidden lg:block">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-[#e8e2d9] bg-white shadow-[0_28px_60px_-34px_rgba(26,23,20,0.4)]">
                <Image
                  src="/images/faq.jpg"
                  alt=""
                  fill
                  sizes="440px"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* یادداشت شخصی نزدیک انتها می‌شینه: بعد از اینکه کاربر همه‌چیز رو دید،
            درست قبل از دعوت نهایی، دلیلِ وجودِ مدرسه و معنیِ اسم ملینا رو می‌خونه. */}
        <PersonalNote />

        {/* ─── CTA ─── */}
        <section className="py-28 md:py-32 bg-[#1a1714] relative overflow-hidden">
          {/* Violet glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #7c5cfc26 0%, transparent 62%)" }}
          />
          {/* Big decorative word — parallax upward */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <ParallaxY speed={60}>
              <span
                className="font-display font-black leading-none text-white block"
                style={{ fontSize: "clamp(7rem, 20vw, 16rem)", opacity: 0.025 }}
              >
                START
              </span>
            </ParallaxY>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
            <FadeIn>
              <div
                className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                <span className="font-body text-xs text-white/60">
                  {t.cta.badge}
                </span>
              </div>

              <h2 className="font-body font-black text-4xl md:text-6xl text-white mb-5 leading-[1.08]">
                {t.cta.title}
              </h2>
              <p className="text-white/40 font-body max-w-lg mx-auto mb-10 leading-relaxed">
                {t.cta.body}
              </p>

              {/* Trust stats */}
              <div className="flex items-stretch justify-center divide-x divide-x-reverse divide-white/10 mb-11">
                {t.cta.stats.map((s) => (
                  <div key={s.label} className="px-6 sm:px-8">
                    <div className="font-display font-black text-2xl md:text-3xl text-white">
                      {s.num}
                    </div>
                    <div className="font-body text-white/40 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Primary CTAs */}
              <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
                <a
                  href="https://t.me/melina_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#1a1714] font-body font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send size={17} />
                  {t.cta.telegram}
                </a>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-body font-semibold px-7 py-4 rounded-2xl transition-all text-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t.cta.allCourses}
                  <Forward size={15} />
                </Link>
              </div>

              {/* Infinity course quick cards */}
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-start">
                {videos.slice(0, 2).map((c) => (
                  <Link
                    key={c.id}
                    href={`/courses/${c.slug}`}
                    className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#7c5cfc]/40 rounded-2xl p-5 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-body font-bold text-white text-sm">{c.title}</span>
                      <Next
                        size={16}
                        className="text-white/30 group-hover:text-white/70 transition-colors flex-shrink-0"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-[#a78bfa]">
                        {formatPrice(c.price, lang)}
                      </span>
                      {c.originalPrice && (
                        <span className="text-white/30 text-xs line-through font-body">
                          {formatPrice(c.originalPrice, lang)}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#8b5cf6] mb-3">
                {t.notify.kicker}
              </div>
              <h2 className="font-body font-black text-3xl md:text-4xl text-[#1a1714] leading-[1.3] mb-3">
                {t.notify.title}
              </h2>
              <p className="text-[#6b6560] font-body leading-relaxed max-w-md mx-auto">
                {t.notify.body}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* 3D element — DOM first = RIGHT in RTL */}
            <FadeIn>
              <Model3D />
            </FadeIn>

            {/* Notify form — DOM second = LEFT in RTL */}
            <FadeIn>
              <DiscountNotifyForm />
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
