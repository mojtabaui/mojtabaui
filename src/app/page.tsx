import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ChevronLeft, ExternalLink, Send, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import MarqueeBand from "@/components/MarqueeBand";
import FadeIn from "@/components/FadeIn";
import AnimatedCounter from "@/components/AnimatedCounter";
import HeroImage from "@/components/HeroImage";
import HeroDecor from "@/components/HeroDecor";
import ParallaxY from "@/components/ParallaxY";
import ArticleRow from "@/components/ArticleRow";
import { courses, infinityCourses, videoCourses, stats, formatPrice, articles, freeResources, studentProjects } from "@/lib/mock-data";

const testimonials = [
  {
    name: "نگار",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "از صفر شروع کردم. برنامه هفتگی باعث شد ویدیوها تلنبار نشن. منتورینگ با حوصله، و جلسات رفع اشکال خودش یه دوره جدا بود.",
    course: "رابط کاربری بی‌نهایت",
    avatar: "ن",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "پریدخت",
    role: "دوره تجربه کاربری بی‌نهایت",
    text: "تو مصاحبه، تنها نمونه‌کارم که بررسی شد کیس استادی گروهی‌مون بود. خیلی خوششون اومد — بیشتر سوالات حول همون بود.",
    course: "تجربه کاربری بی‌نهایت",
    avatar: "پ",
    color: "#EEF3FF",
    accent: "#1d4ed8",
  },
  {
    name: "غزاله",
    role: "طراح UI/UX",
    text: "بعد از اتمام دوره استخدام شدم. امروز روز دوم کاریمه به عنوان طراح UI/UX — خوشحالم که به این دوره اعتماد کردم.",
    course: "رابط کاربری بی‌نهایت",
    avatar: "غ",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "امیرحسین",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "رفتم مصاحبه — اعتماد به نفسم فوق‌العاده بود و همه سوالات فنی رو جواب دادم. هنوز دوره تموم نشده بود.",
    course: "رابط کاربری بی‌نهایت",
    avatar: "ا",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "نازنین",
    role: "دوره تجربه کاربری بی‌نهایت",
    text: "UX برام همیشه پر از ابهام بود. اینجا یاد گرفتم فرایند رو مرحله به مرحله پیش ببرم. همه علامت سوال‌هام رفع شد.",
    course: "تجربه کاربری بی‌نهایت",
    avatar: "ن",
    color: "#EEF3FF",
    accent: "#1d4ed8",
  },
  {
    name: "ندا",
    role: "دوره تجربه کاربری بی‌نهایت",
    text: "تنها دانش یه معلم باعث یادگیری نمیشه. اون حس امنیت که اگه اشتباه کنی اشکالی نداره — این فرق می‌کنه.",
    course: "تجربه کاربری بی‌نهایت",
    avatar: "ن",
    color: "#EEF3FF",
    accent: "#1d4ed8",
  },
  {
    name: "سارا",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "هیچوقت انگیزه برای ادامه دوره‌ای نداشتم — فقط دوره شما بود که واقعاً دوست داشتم یاد بگیرم و پیشرفت کنم.",
    course: "رابط کاربری بی‌نهایت",
    avatar: "س",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "نسرین",
    role: "دوره رابط کاربری و تجربه کاربری",
    text: "رفتم مصاحبه شرکت مهرام. گفتم دوره‌های مجتبی یزدانپناه رو گذروندم. گفتن خیلی مسلطی.",
    course: "رابط و تجربه کاربری",
    avatar: "ن",
    color: "#F5F0FF",
    accent: "#7c5cfc",
  },
  {
    name: "آرزو",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "با هم‌گروهی‌های بااستعداد آشنا شدم. یه نظم تو زندگیم اومد — علاوه بر کار شرکت، تونستم روی پروژه دیگه‌ای هم کار کنم.",
    course: "رابط کاربری بی‌نهایت",
    avatar: "آ",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ─── Hero ─── */}
        <section
          className="dot-bg overflow-hidden relative flex flex-col"
          style={{ backgroundColor: "#FAF6F1", minHeight: "86vh" }}
        >

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

            {/* Text — top on mobile, right on desktop */}
            <div className="flex-shrink-0 max-w-xl pt-8 pb-2 lg:pt-0 lg:pb-20">

                {/* Eyebrow */}
                <div
                  className="inline-flex items-center gap-2 bg-white border border-[#e8e2d9] rounded-full px-4 py-1.5 mb-7 fade-in-up"
                  style={{ animationDelay: "0ms" }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                  <span className="font-body text-xs text-[#6b6560]">
                    دوره‌های بی‌نهایت — فاز جدید باز شد
                  </span>
                </div>

                <h1
                  className="font-body font-extrabold text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.08] text-[#1a1714] mb-5 fade-in-up"
                  style={{ animationDelay: "80ms" }}
                >
                  یادگیری دیزاین{" "}
                  <span className="relative inline-block">
                    به صرف چای
                    <svg className="absolute -bottom-1 right-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                      <path d="M0 5 Q75 0 150 5 Q225 10 300 5" stroke="#7c5cfc" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    </svg>
                  </span>
                </h1>

                <p
                  className="text-[#6b6560] font-body text-lg leading-relaxed mb-10 max-w-lg fade-in-up"
                  style={{ animationDelay: "160ms" }}
                >
                  دوره‌های UI/UX با ویدیو، ۱۰ هفته منتورینگ واقعی،
                  پروژه عملی و پشتیبانی مستقیم — از صفر بدون پیش‌نیاز.
                </p>

                <div
                  className="flex items-center gap-4 flex-wrap fade-in-up"
                  style={{ animationDelay: "240ms" }}
                >
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] text-white font-body font-semibold px-7 py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    مشاهده دوره‌ها
                    <ArrowLeft size={16} />
                  </Link>
                  <a
                    href="https://instagram.com/mojtabaui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#6b6560] hover:text-[#1a1714] font-body text-sm transition-colors border border-[#e8e2d9] hover:border-[#1a1714]/20 px-5 py-3.5 rounded-2xl bg-white"
                  >
                    @mojtabaui
                  </a>
                </div>

                {/* Social proof */}
                <div
                  className="flex items-center gap-4 mt-10 fade-in-up"
                  style={{ animationDelay: "320ms" }}
                >
                  <div className="flex -space-x-2 space-x-reverse">
                    {["م", "ع", "س", "ف", "ن"].map((c, i) => (
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
                    <span className="text-[#a09990] text-xs font-body">+۷,۰۰۰ دانشجوی راضی</span>
                  </div>
                </div>

            </div>

            {/* Mobile image — bottom, touches black bar */}
            <div className="lg:hidden relative flex-1 min-h-[40vh]">
              <Image
                src="/images/hero.png"
                alt="مجتبا یزدان‌پناه"
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
              {stats.map((s) => (
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
                  alt="مدل آموزشی هیبریدی"
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-[560px]"
                />
              </FadeIn>

              {/* Text — left side in RTL (second in DOM) */}
              <FadeIn delay={0.12}>
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#8a7b74] mb-4">
                  WHY US
                </div>
                <h2 className="font-body font-black text-3xl md:text-4xl text-[#1a1714] leading-tight mb-6">
                  ۷ سال تجربه،
                  <br />
                  یه مدل آموزشی که کار می‌کنه
                </h2>
                <p className="text-[#6b6560] font-body leading-relaxed mb-10 text-base">
                  ۷ سال طراحی حرفه‌ای UI/UX و ۵ سال آموزش مستقیم به دانشجوها — این تجربه باعث شد
                  یه مدل هیبریدی طراحی کنیم که جای هیچ‌جا ندیدیم: ویدیوی ضبط‌شده با کیفیت بالا،
                  کنار جلسات منتورینگ گروهی هفتگی. نه فقط یاد می‌گیری — پروژه واقعی می‌سازی و
                  فیدبک مستقیم می‌گیری.
                </p>

                <div className="space-y-5">
                  {[
                    { num: "۷+",   label: "سال تجربه حرفه‌ای طراحی UI/UX" },
                    { num: "۵+",   label: "سال آموزش مستقیم به دانشجوها" },
                    { num: "۴۰+",  label: "کد کلاس با منتورینگ واقعی" },
                    { num: "۴۰۰+", label: "پروژه گروهی تحویل داده شده" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5">
                      <div
                        className="font-display font-black text-2xl flex-shrink-0 w-20 text-right"
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

        {/* ─── Infinity Courses ─── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                  BESTSELLER
                </div>
                <h2 className="font-body font-extrabold text-3xl md:text-4xl text-[#1a1714]">
                  دوره‌های بی‌نهایت
                </h2>
                <p className="text-[#a09990] text-sm font-body mt-1">
                  ویدیو + منتورینگ + پروژه — همه در یه بسته
                </p>
              </div>
              <Link
                href="/courses"
                className="hidden md:flex items-center gap-1.5 text-[#6b6560] hover:text-[#1a1714] text-sm font-body transition-colors"
              >
                همه دوره‌ها
                <ChevronLeft size={14} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {infinityCourses.map((course, i) => (
              <FadeIn key={course.id} delay={i * 0.1}>
                <CourseCard course={course} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ─── Video Courses ─── */}
        <section className="py-24 bg-white border-y border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeIn>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                    VIDEO COURSES
                  </div>
                  <h2 className="font-body font-extrabold text-3xl md:text-4xl text-[#1a1714]">
                    دوره‌های ویدیویی
                  </h2>
                  <p className="text-[#a09990] text-sm font-body mt-1">
                    بدون منتورینگ — یاد بگیر به تمپو خودت
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="hidden md:flex items-center gap-1.5 text-[#6b6560] hover:text-[#1a1714] text-sm font-body transition-colors"
                >
                  همه دوره‌ها
                  <ChevronLeft size={14} />
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {videoCourses.map((course, i) => (
                <FadeIn key={course.id} delay={i * 0.08}>
                  <CourseCard course={course} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why Infinity ─── */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeIn>
              <div className="mb-14">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                  WHY INFINITY
                </div>
                <h2 className="font-body font-extrabold text-3xl md:text-4xl text-[#1a1714]">
                  چرا بی‌نهایت؟
                </h2>
                <p className="text-[#a09990] font-body text-sm mt-2">
                  فقط ویدیو نیست — یه تجربه کامل یادگیریه
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
              {[
                { num: "۰۱", title: "ویدیوهای ضبط‌شده",      desc: "محتوای کامل — هر وقت خواستی، هر چند بار خواستی." },
                { num: "۰۲", title: "۱۰ هفته منتورینگ",       desc: "جلسه گروهی هفتگی با مجتبا — بررسی پروژه و رفع اشکال." },
                { num: "۰۳", title: "پروژه عملی",              desc: "گروهی یا فردی — واقعی و اضافه‌شدنی به پورتفولیو." },
                { num: "۰۴", title: "برنامه هفتگی",            desc: "ساختار مشخص هر هفته — بدون سردرگمی و تلنبار شدن." },
                { num: "۰۵", title: "پشتیبانی مدرس",           desc: "سوال داری؟ مجتبا جواب می‌ده. نه ربات، نه فرم." },
                { num: "۰۶", title: "از صفر بدون پیش‌نیاز",  desc: "حتی اگه اصلاً دیزاین بلد نباشی — از اول شروع می‌کنیم." },
              ].map((item, i) => (
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

        {/* ─── Free Resources ─── */}
        <section className="py-24 bg-white border-y border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeIn>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-emerald-600/60 mb-2">
                    FREE
                  </div>
                  <h2 className="font-body font-extrabold text-3xl text-[#1a1714]">آموزش‌های رایگان</h2>
                  <p className="text-[#a09990] text-sm font-body mt-1">ویدیو، ویس، فایل — بردار برو</p>
                </div>
                <Link
                  href="/free"
                  className="hidden md:flex items-center gap-1.5 text-[#6b6560] hover:text-[#1a1714] text-sm font-body transition-colors"
                >
                  همه منابع
                  <ChevronLeft size={14} />
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {freeResources.slice(0, 3).map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.08}>
                  <Link
                    href="/free"
                    className="rounded-2xl p-5 flex items-start gap-4 hover:opacity-90 hover:scale-[1.01] transition-all"
                    style={{ backgroundColor: item.color }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ backgroundColor: item.accent + "18" }}
                    >
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-body font-semibold text-[#1a1714] text-sm leading-snug mb-1">{item.title}</div>
                      <div className="text-[#a09990] text-xs font-body">{item.meta}</div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section className="py-24 bg-[#1a1714] dot-bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-white/20 mb-3">
                  TESTIMONIALS
                </div>
                <h2 className="font-body font-extrabold text-3xl md:text-4xl text-white mb-2">
                  دانشجوها چی می‌گن؟
                </h2>
                <p className="text-white/30 font-body text-sm">
                  +۷,۰۰۰ نفر تا الان یاد گرفتن
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="relative bg-white/[0.04] border border-white/8 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors overflow-hidden">
                    {/* Decorative big quote */}
                    <div
                      className="absolute -top-2 left-4 font-display font-black leading-none select-none pointer-events-none"
                      style={{ fontSize: "6rem", color: "white", opacity: 0.04 }}
                    >
                      "
                    </div>
                    <div className="relative">
                      <p className="text-white/70 font-body text-sm leading-relaxed mb-6">
                        {t.text}
                      </p>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-body font-bold flex-shrink-0"
                            style={{ backgroundColor: t.color, color: t.accent }}
                          >
                            {t.avatar}
                          </div>
                          <div>
                            <div className="font-body font-semibold text-white text-sm">{t.name}</div>
                            <div className="text-white/30 text-[10px] font-body">{t.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(j => (
                            <Star key={j} size={9} fill={t.accent} style={{ color: t.accent }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Student Projects ─── */}
        <section className="py-24 bg-[#1a1714]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeIn>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-white/20 mb-2">
                    STUDENT WORK
                  </div>
                  <h2 className="font-body font-extrabold text-3xl text-white">نمونه کارهای دانشجوها</h2>
                  <p className="text-white/30 text-sm font-body mt-1">چیزی که بعد از دوره می‌سازی</p>
                </div>
                <Link
                  href="/projects"
                  className="hidden md:flex items-center gap-1.5 text-white/40 hover:text-white text-sm font-body transition-colors"
                >
                  همه پروژه‌ها
                  <ChevronLeft size={14} />
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentProjects.slice(0, 3).map((project, i) => {
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
                          <span className="text-white/40 text-xs font-body">{project.studentName}</span>
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
                  مشاهده همه نمونه کارها
                  <ArrowLeft size={14} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── Articles ─── */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="border-t-2 border-[#1a1714] pt-6 mb-2">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                    ARTICLES
                  </div>
                  <h2 className="font-body font-extrabold text-3xl text-[#1a1714]">مقالات</h2>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <p className="text-[11px] font-body text-[#a09990]">آموزش متنی + فایل دانلودی</p>
                  <Link
                    href="/articles"
                    className="flex items-center gap-1 text-[#1a1714] text-sm font-body font-semibold hover:opacity-50 transition-opacity"
                  >
                    <ChevronLeft size={13} />
                    همه مقالات
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

        {/* ─── About ─── */}
        <section id="about" className="py-24" style={{ backgroundColor: "#FAF6F1" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <FadeIn>
              <div className="border-t-2 border-[#1a1714] pt-6 mb-12">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                  ABOUT
                </div>
                <h2 className="font-body font-extrabold text-3xl text-[#1a1714]">درباره من</h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-start">

              {/* Text — DOM first = RIGHT in RTL */}
              <FadeIn>
                <div>
                  {/* Name + role */}
                  <div className="flex items-baseline gap-4 flex-wrap mb-6">
                    <h3 className="font-body font-black text-3xl md:text-4xl text-[#1a1714] leading-tight">
                      مجتبا یزدان‌پناه
                    </h3>
                    <span className="font-body text-sm font-semibold" style={{ color: "#7c5cfc" }}>
                      طراح محصول و محقق تجربه کاربری
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="font-body text-[#6b6560] leading-[1.9] mb-8 text-[15px]">
                    بیش از ۷ سال در طراحی محصولات enterprise، e-commerce و پلتفرم کار کردم.
                    برام طراحی یعنی تبدیل «ابهام» به ساختاری که کاربر بتونه باهاش کار کنه — نه با حدس، با تحقیق.
                    پروژه‌هام با سوال شروع می‌شن و با خروجی قابل‌اندازه‌گیری تموم می‌شن.
                    بنیان‌گذار مدرسه دیزاین ملینا هستم و تا امروز با بیش از ۶,۰۰۰ نفر همراه بودم.
                  </p>

                  {/* Stats */}
                  <div className="flex gap-8 mb-8 border-y border-[#e8e2d9] py-6">
                    {[
                      { num: "+۷",  label: "سال تجربه"  },
                      { num: "+۶K", label: "دانش‌آموز"   },
                      { num: "+۳۰", label: "پروژه تحویل‌داده‌شده" },
                    ].map(({ num, label }) => (
                      <div key={label}>
                        <div className="font-display font-black text-2xl text-[#1a1714]">{num}</div>
                        <div className="text-[11px] font-body text-[#a09990] mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Expertise areas */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                    {[
                      { title: "Enterprise & Platform UX", desc: "طراحی محصولات پیچیده با flow های چندلایه کاربری" },
                      { title: "Design System",            desc: "ساخت سیستم‌های مقیاس‌پذیر برای تیم‌های بزرگ"    },
                      { title: "UX Research",              desc: "تحقیق کاربری، A/B testing و تصمیم‌های داده‌محور"  },
                    ].map(({ title, desc }) => (
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
                      alt="مجتبا یزدانپناه"
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

        {/* ─── CTA ─── */}
        <section className="py-32 bg-[#1a1714] relative overflow-hidden">
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
            <FadeIn>
              <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-white/20 mb-5">
                GET STARTED
              </div>
              <h2 className="font-body font-black text-4xl md:text-6xl text-white mb-5 leading-[1.05]">
                آماده‌ای
                <br />
                شروع کنی؟
              </h2>
              <p className="text-white/35 font-body max-w-lg mx-auto mb-10 leading-relaxed">
                بعد از خرید، لایسنس اسپات پلیر خودکار تو پنلت ظاهر می‌شه
                و فوری می‌تونی شروع کنی.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {courses.map((c) => (
                  <Link
                    key={c.id}
                    href={`/courses/${c.slug}`}
                    className="bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/25 text-white font-body font-semibold px-7 py-3.5 rounded-2xl transition-all text-sm hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {c.title} — {formatPrice(c.price)}
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section id="contact" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-body font-bold text-2xl text-[#1a1714] mb-2">سوال داری؟</h2>
          <p className="text-[#a09990] font-body text-sm mb-6">
            از طریق اینستاگرام یا ایمیل باهام در تماس باش
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a
              href="mailto:mojtaba.yazdanpanah0771@gmail.com"
              className="text-[#6b6560] hover:text-[#1a1714] font-body text-sm border border-[#e8e2d9] hover:border-[#1a1714]/20 bg-white px-5 py-2.5 rounded-xl transition-all"
            >
              mojtaba.yazdanpanah0771@gmail.com
            </a>
            <a
              href="https://instagram.com/mojtabaui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b6560] hover:text-[#1a1714] font-body text-sm border border-[#e8e2d9] hover:border-[#1a1714]/20 bg-white px-5 py-2.5 rounded-xl transition-all"
            >
              @mojtabaui اینستاگرام
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
