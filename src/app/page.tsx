import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ChevronLeft, ExternalLink, Send, Layers, Clock, Calendar, Users, Check, Plus, Gift, MonitorPlay, MessageCircle } from "lucide-react";
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
import { infinityCourses, videoCourses, stats, formatPrice, articles, featuredProjects } from "@/lib/mock-data";


const testimonials = [
  {
    name: "غزاله حلاجی",
    role: "الان: طراح UI/UX",
    text: "بعد از اتمام دوره استخدام شدم و الان روزهای اول کاریمه به‌عنوان طراح UI/UX. مشخصه که تلاش شده همه‌ی مطالب به ساده‌ترین شکل ممکن آموزش داده بشه. یه تشکر ویژه بابت زحماتتون.",
    avatar: "غ",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "حنانه ملک‌زاده",
    role: "الان: یو‌ایکس ریسرچر",
    text: "اول با یه دوره‌ی اقتصادی رفتم و نصفه موند، ولی بی‌نهایت برام جواب داد. اگه می‌دونستم UX انقدر جذابه خیلی زودتر میومدم سمتش. بعد از یه ماه دنبال کار، به‌عنوان یو‌ایکس ریسرچر جوین شدم.",
    avatar: "ح",
    color: "#EEF3FF",
    accent: "#1d4ed8",
  },
  {
    name: "سحر نژادبهرام",
    role: "دوره‌های UI و UX بی‌نهایت",
    text: "هم UI بی‌نهایت رو گذروندم هم UX. چیزهایی که سال‌ها پیش دانشگاه، رشته‌ی تجارت الکترونیک، خونده بودم اینجا عملی یاد گرفتم و حسرت خوردم که چرا زودتر نبود. این کلاس برای من بیشتر از مهارت، انرژی و انگیزه بود.",
    avatar: "س",
    color: "#F5F0FF",
    accent: "#7c5cfc",
  },
  {
    name: "زهرا امینی",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "دوره اونقدر کامل بود که وقتی آگهی‌های استخدام رو می‌دیدم، تقریباً همه‌ی مهارت‌های خواسته‌شده توش آموزش داده شده بود. توی جلسات رفع اشکال برای تک‌تک سوال‌ها وقت می‌ذاشتین و چیزی که هیچ‌جا ندیدم، نظم و برنامه‌ریزی دقیق بود.",
    avatar: "ز",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "الینا آبیان",
    role: "دوره‌های UI و UX بی‌نهایت",
    text: "هیچ زمینه‌ای در UI/UX نداشتم و از صفر شروع کردم، ولی دوره کامل و عالی بود. صبوری و انرژی مثبتی که به بچه‌ها می‌دادین انگیزه‌ی ادامه رو چند برابر می‌کرد. یکی از بهترین اتفاق‌ها آشنایی با هم‌گروهی‌هام بود که الان روی پروژه‌های دیگه هم با هم کار می‌کنیم.",
    avatar: "ا",
    color: "#F5F0FF",
    accent: "#7c5cfc",
  },
  {
    name: "زهرا حبیبیان",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "گروه‌بندی و منتورینگ هفتگی مزیت خیلی خوب دوره بود؛ اگه این‌ها نبود نه ویدیوها رو کامل می‌دیدم نه ایراد کارم رو می‌فهمیدم. از وقتی دوره تموم شده تا الان سه تا پروژه زدم و دارم چهارمی رو می‌گیرم.",
    avatar: "ز",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "ریحانه فلاحتی",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "مشخص بودنِ تسک‌های هفتگی و جلسات هر هفته باعث شد هیچ جای ابهامی نمونه. من معمولاً کارهای بی‌برنامه رو نصفه رها می‌کنم، ولی اینجا برعکس شد و به خروجی رسیدم. اولین مصاحبه‌م هم رفتم و هر سوال فنی‌ای پرسیدن جواب دادم.",
    avatar: "ر",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "آرزو",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "برای یادگیری صرف نیومده بودم؛ هدفم پروژه زدن و ساختن کانکشن بود، ولی هیچ‌وقت فکر نمی‌کردم جلسات رفع اشکال هفتگی انقدر توی روند دوره تاثیر بذاره. یه نظم قشنگ به کارم داد و با هم‌گروهی‌های بااستعدادم آشنا شدم.",
    avatar: "آ",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "مرضیه",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "پروژه‌ی گروهی‌مون با همه‌ی چالش‌هاش بالاخره به پایان رسید و خیلی خوشحالم که این تجربه رو داشتم. با هم‌تیمیم خیلی خوب پیش رفتیم و شما همیشه پاسخگوی سوال‌هامون بودین. حالا یه پروژه‌ی تکی هم دارم که ادامه‌ش می‌دم.",
    avatar: "م",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "صدف لیاقت‌فر",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "اگه یه کار خوب در حق خودم کرده باشم، اون خرید دوره‌ی شماست. گذشته از آموزش عالیتون، تو رفع اشکال و راهنمایی و امید دادن برای ادامه‌ی مسیر طراحی، استاد فوق‌العاده‌ای هستین.",
    avatar: "ص",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "سمین غفاری",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "قبلاً پراکنده از منابع مختلف، مخصوصاً یوتیوب، یه چیزایی یاد گرفته بودم ولی انسجام نداشت. روندی که پیش بردین عالیه و سلسله‌مراتب به بهترین شکل رعایت شده. امیدوارم زودتر به جایی برسم که بتونم توی تیم‌تون همکاری کنم.",
    avatar: "س",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "محمد",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "توی کل عمرم هیچ‌وقت انگیزه‌ی ادامه‌ی دوره‌ای نداشتم و فقط دوره‌ی شما بود که همه‌جوره دوست داشتم یاد بگیرم و پیشرفت کنم. انقدر دوستانه هوای همه‌ی بچه‌ها رو دارین که اسم شما سر زبونِ هر کسیه که تو این حوزه‌ست.",
    avatar: "م",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "ندا زارعیان",
    role: "دوره تجربه کاربری بی‌نهایت",
    text: "برای منی که از دوره‌های آنلاین تجربه‌ی خوبی نداشتم، این کلاس نظرم رو عوض کرد. تنها دانشِ یه معلم باعث یادگیری نمیشه؛ اون صبر و شوق و حس امنیتی که اگه اشتباه کنی اشکالی نداره، نقش مهمی داره.",
    avatar: "ن",
    color: "#EEF3FF",
    accent: "#1d4ed8",
  },
  {
    name: "نازنین",
    role: "دوره‌های UI و UX بی‌نهایت",
    text: "این دوره خیلی چیزا بهم یاد داد و بهترین تجربه‌م بود. خیلی از آموزش‌ها فقط فیگما نبود و به نحوه‌ی آموزش و انرژی شما وابسته بود. ممنون بابت تک‌تک لحظه‌هایی که تو کلاس گذاشتین.",
    avatar: "ن",
    color: "#F5F0FF",
    accent: "#7c5cfc",
  },
  {
    name: "پریدخت",
    role: "دوره تجربه کاربری بی‌نهایت",
    text: "توی مصاحبه، تنها نمونه‌کاری که بررسی شد کیس‌استادی گروهیمون بود و خیلی خوششون اومد؛ بیشتر سوال‌ها حول همون بود. جلسات آنلاین و دیدن کار بقیه هم از جذابیت‌های دوره بود.",
    avatar: "پ",
    color: "#EEF3FF",
    accent: "#1d4ed8",
  },
  {
    name: "امیرحسین",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "رفتم مصاحبه و اعتماد به‌نفسم فوق‌العاده بود؛ همه‌ی سوال‌های فنی رو جواب دادم، اونم وقتی هنوز دوره تموم نشده بود. فهمیدم چیزایی که یاد گرفتیم واقعاً به کار بازار می‌خوره.",
    avatar: "ا",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "نسرین",
    role: "دوره‌های UI و UX بی‌نهایت",
    text: "رفتم مصاحبه‌ی شرکت مهرام و گفتم دوره‌های مجتبی یزدان‌پناه رو گذروندم. گفتن خیلی مسلطی.",
    avatar: "ن",
    color: "#F5F0FF",
    accent: "#7c5cfc",
  },
  {
    name: "کیمیا",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "ممنونم بابت دوره‌ی عالی و آموزش‌های مفیدتون. خوشحالم که این راه رو با شما شروع کردم و توی این سه ماهی که کنار هم بودیم چیزهای زیادی یاد گرفتیم.",
    avatar: "ک",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    name: "نگار",
    role: "دوره رابط کاربری بی‌نهایت",
    text: "از صفر شروع کردم و برنامه‌ی هفتگی باعث شد ویدیوها روی هم تلنبار نشن. منتورینگ با حوصله بود و جلسات رفع اشکال خودش یه دوره‌ی جدا بود.",
    avatar: "ن",
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
        {/* ارتفاع با clamp بسته شده. بدون سقف، روی نمایشگر بلند (مثلاً ۱۴۴۰) هیرو
            بیش از ۱۲۰۰ پیکسل می‌شد و چون محتوا ته‌چینه، بالای صفحه خالی می‌موند. */}
        <section
          className="dot-bg overflow-hidden relative flex flex-col"
          style={{ backgroundColor: "#FAF6F1", minHeight: "clamp(560px, 86vh, 860px)" }}
        >

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

            {/* Text — top on mobile, right on desktop.
                روی موبایل محتوا ته‌چین نیست و از بالای سکشن شروع می‌شه، پس بدون
                فاصله‌ی بالا، نوارِ ثابتِ منو (۶۴px) روی نوتِ «+۶٬۵۰۰ نفر» می‌افتاد
                و مخفیش می‌کرد. pt-24 اون رو از زیر منو می‌کشه بیرون؛ در دسکتاپ که
                بلوک ته‌چینه lg:pt-0 دست‌نخورده می‌مونه. */}
            <div className="flex-shrink-0 max-w-xl 2xl:max-w-2xl pt-24 pb-2 lg:pt-0 lg:pb-20">

                {/* Eyebrow */}
                <div
                  className="inline-flex items-center gap-2 bg-white border border-[#e8e2d9] rounded-full px-4 py-1.5 mb-7 fade-in-up"
                  style={{ animationDelay: "0ms" }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                  <span className="font-body text-xs text-[#6b6560]">
                    تا به حال +۶٬۵۰۰ نفر در دوره‌ها شرکت کرده‌اند
                  </span>
                </div>

                <h1
                  className="font-body font-extrabold text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.45] text-[#1a1714] mb-6 fade-in-up"
                  style={{ animationDelay: "80ms" }}
                >
                  آموزش اصولی و پروژه‌محورِ طراحی محصول دیجیتال
                </h1>

                <p
                  className="text-[#6b6560] font-body text-lg leading-relaxed mb-10 max-w-lg fade-in-up"
                  style={{ animationDelay: "160ms" }}
                >
                  از صفر شروع می‌کنی، پروژه‌ی واقعی می‌سازی و هر هفته فیدبک می‌گیری.
                  لازم نیست قبلش چیزی بلد باشی.
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
                  {/* دکمه‌ی ثانویه به‌جای اینستاگرام: چیزی که واقعاً قدم بعدی کاربره */}
                  <Link
                    href="/checklist"
                    className="inline-flex items-center gap-2 text-[#6b6560] hover:text-[#1a1714] font-body text-sm transition-colors border border-[#e8e2d9] hover:border-[#1a1714]/20 px-5 py-3.5 rounded-2xl bg-white hover:bg-[#faf8f5]"
                  >
                    از کجا شروع کنم؟
                    <ChevronLeft size={15} />
                  </Link>
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
                    <span className="text-[#a09990] text-xs font-body">+۶٬۵۰۰ دانشجوی حرفه‌ای</span>
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
                  ۸ سال تجربه،
                  <br />
                  یه مدل آموزشی که کار می‌کنه
                </h2>
                <p className="text-[#6b6560] font-body leading-relaxed mb-10 text-base">
                  ۸ سال طراحی حرفه‌ای UI/UX و ۵ سال آموزش مستقیم به دانشجوها — این تجربه باعث شد
                  یه مدل هیبریدی طراحی کنیم که جای هیچ‌جا ندیدیم: ویدیوی ضبط‌شده با کیفیت بالا،
                  کنار جلسات منتورینگ گروهی هفتگی. نه فقط یاد می‌گیری — پروژه واقعی می‌سازی و
                  فیدبک مستقیم می‌گیری.
                </p>

                <div className="space-y-5">
                  {[
                    { num: "۸+",   label: "سال تجربه حرفه‌ای طراحی UI/UX" },
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
                    <span className="font-body text-xs font-semibold text-[#a78bfa]">کارگاه جدید</span>
                  </div>

                  <div className="font-display text-[10px] font-bold tracking-[0.28em] uppercase text-white/40 mb-3">
                    PROMPT TO PRODUCT
                  </div>
                  <h2 className="font-body font-black text-3xl md:text-[2.6rem] text-white leading-[1.2] mb-5">
                    کارگاه پرامپت تا پروداکت
                  </h2>
                  <p className="text-white/55 font-body leading-[1.9] mb-8 max-w-md">
                    موجِ AI اومده و طراحی رو زیر و رو کرده. من کلِ ورک‌فلوی طراحیم رو
                    هوشمند کردم و توی همین چند ماه سه تا محصول منتشر کردم. توی این کارگاه
                    دقیقاً می‌گم چطور می‌شه AI رو وارد فرایندِ طراحی کرد.
                  </p>

                  {/* آنچه یاد می‌گیری */}
                  <ul className="space-y-2.5 mb-8">
                    {[
                      "مهندسیِ لوپ و مهندسیِ پرامپت",
                      "استفاده از ایجنت‌ها در فرایندِ طراحی",
                      "یادگیریِ Claude Code و Figma AI",
                      "دیپلوی سبک و تستِ خروجی",
                    ].map((li) => (
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
                      <Clock size={15} className="text-[#a78bfa]" /> ۳ جلسه‌ی ۳ ساعته
                    </span>
                    <span className="flex items-center gap-2 text-sm font-body text-white/70">
                      <Calendar size={15} className="text-[#a78bfa]" /> اواسط مرداد ۱۴۰۵
                    </span>
                    <span className="flex items-center gap-2 text-sm font-body">
                      <span className="font-body font-black text-white text-lg">۵٬۰۰۰٬۰۰۰</span>
                      <span className="text-white/40 text-xs">تومان</span>
                    </span>
                  </div>

                  {/* ظرفیت محدود، درست بالای دکمه تا حس فوریت بده */}
                  <div className="flex items-center gap-2 text-sm font-body text-white/70 mb-4">
                    <Users size={15} className="text-[#a78bfa]" />
                    ظرفیت: ۲۰ نفر
                  </div>

                  {/* CTA — هنوز ثبت‌نام باز نیست */}
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/15 text-white/90 font-body font-semibold px-7 py-3.5 rounded-2xl cursor-not-allowed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] pulse-dot" />
                    به زودی!
                  </button>
                </div>
              </FadeIn>

              {/* عکس کارگاه — چپ در RTL. بنر مربعیه، پس قاب هم مربعه. */}
              <FadeIn delay={0.12}>
                <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square bg-black">
                  <Image
                    src="/images/workshop_banner.jpg"
                    alt="کارگاه پرامپت تا پروداکت"
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
                  COURSES
                </div>
                <h2 className="font-body font-extrabold text-3xl md:text-4xl text-[#1a1714]">
                  دوره‌ها
                </h2>
                <p className="text-[#a09990] text-sm font-body mt-1">
                  بی‌نهایت با منتورینگ، یا ویدیویی به تمپوی خودت
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
          <CoursesClient infinityCourses={infinityCourses} videoCourses={videoCourses} workshopCourses={[]} />
        </section>

        {/* ─── Why Infinity ─── */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-16">
              <FadeIn>
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-3">
                  WHY OUR COURSES
                </div>
                <h2 className="font-body font-extrabold text-3xl md:text-4xl lg:text-[2.75rem] text-[#1a1714] leading-[1.3] mb-4">
                  چرا دوره‌های ما؟
                </h2>
                <p className="text-[#6b6560] font-body text-base leading-relaxed max-w-lg">
                  تفاوت یادگیری تنها با یادگیری هدایت‌شده، همینه که کجا تموم می‌شه. یکی
                  دور خودش می‌چرخه و یکی به مقصد می‌رسه.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
              {[
                { num: "۰۱", title: "ویدیوهای ضبط‌شده",      desc: "هر وقت خواستی نگاه می‌کنی، هر چند بار که لازم شد." },
                { num: "۰۲", title: "منتورینگ زنده",           desc: "توی دوره‌های بی‌نهایت هر هفته یه جلسه‌ی گروهی با مجتبا داری." },
                { num: "۰۳", title: "پروژه عملی",              desc: "چیزی که می‌سازی رو می‌تونی توی پرتفولیوت بذاری." },
                { num: "۰۴", title: "برنامه هفتگی",            desc: "هر هفته معلومه چی کار کنی، پس ویدیوها روی هم تلنبار نمی‌شن." },
                { num: "۰۵", title: "پشتیبانی مدرس",           desc: "سوالت رو خود مجتبا جواب می‌ده. نه ربات، نه فرم." },
                { num: "۰۶", title: "از صفر بدون پیش‌نیاز",  desc: "اگه اصلاً دیزاین بلد نباشی هم از اول شروع می‌کنیم." },
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

        {/* ─── روند دوره‌ها ─── */}
        {/* دو مسیر واقعی: بی‌نهایت ۱۰ هفته با منتورینگ گروهی، آفلاین ۸ هفته با
            بررسی منتور. متن‌ها از همون اسلایدهای روند دوره اومدن. */}
        <section className="py-24 bg-[#1a1714] relative overflow-hidden">
          <div className="grain-static absolute inset-0 pointer-events-none mix-blend-overlay" style={{ opacity: 0.1 }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <FadeIn>
              <div className="max-w-2xl mb-14">
                <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a78bfa] mb-3">
                  HOW IT WORKS
                </div>
                <h2 className="font-body font-extrabold text-3xl md:text-4xl text-white leading-[1.3] mb-4">
                  روند دوره‌ها به چه صورته؟
                </h2>
                <p className="text-white/50 font-body leading-relaxed">
                  از لحظه‌ای که ثبت‌نام می‌کنی تا ارائه‌ی پروژه‌ی نهایی. هر نسخه ریتم خودش
                  رو داره، ولی هیچ‌کدوم تنهات نمی‌ذاره.
                </p>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-6">
              {[
                {
                  name: "دوره‌های بی‌نهایت",
                  tag: "۱۰ هفته · منتورینگ گروهی",
                  steps: [
                    "دریافت لایسنس ویدیوها، لینک گروه و کانال، و برنامه‌ی هفتگی تماشای ویدیوها",
                    "جلسه‌ی معارفه‌ی آنلاین، شروع برنامه‌ی ده‌هفته‌ای و معرفی خودت به بقیه‌ی اعضای گروه",
                    "انجام تسک اول به‌صورت انفرادی، جلسه‌ی منتورینگ و تحلیل تمام تسک‌ها",
                    "گروه‌بندی و شروع پروژه‌ی اصلی دوره، انتخاب موضوع و تقسیم کارها",
                    "کار روی پروژه به‌مدت نه هفته، همزمان با تماشای ویدیوها و پشتیبانی آنلاین",
                  ],
                  featured: true,
                },
                {
                  name: "دوره‌های آفلاین",
                  tag: "۸ هفته · بررسی منتور",
                  steps: [
                    "دریافت لایسنس ویدیوها، لینک گروه و کانال، و برنامه‌ی هفتگی تماشای ویدیوها",
                    "معرفی خودت به بقیه‌ی اعضای گروه و شروع برنامه‌ی هشت‌هفته‌ای دوره",
                    "انجام تسک اول به‌صورت انفرادی و بررسی توسط منتور",
                    "شروع پروژه‌ی اصلی دوره و انتخاب موضوع",
                    "کار روی پروژه به‌مدت هفت هفته، همزمان با تماشای ویدیوها",
                  ],
                  featured: false,
                },
              ].map((track) => (
                <FadeIn key={track.name} delay={track.featured ? 0 : 0.1}>
                  <div
                    className={`h-full rounded-3xl p-8 border ${
                      track.featured
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
                              track.featured
                                ? "bg-[#7c5cfc] text-white"
                                : "bg-white/[0.06] text-white/60"
                            }`}
                          >
                            {"۱۲۳۴۵"[i]}
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
                {[
                  { Icon: Gift, title: "آپدیت‌های دوره رایگانه", desc: "هر بار محتوای دوره به‌روز بشه، بدون هزینه‌ی اضافه در اختیارته." },
                  { Icon: MonitorPlay, title: "جلسات آنلاین بی‌نهایت", desc: "روی گوگل‌میت یا اسکای‌روم برگزار می‌شن، بسته به شرایط." },
                  { Icon: MessageCircle, title: "پشتیبانی تلگرامی", desc: "سوالت رو می‌پرسی و توی تلگرام جوابت رو می‌گیری." },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
                    <span className="w-10 h-10 rounded-xl bg-[#7c5cfc]/15 text-[#a78bfa] flex items-center justify-center mb-4">
                      <Icon size={18} />
                    </span>
                    <div className="font-body font-bold text-white text-sm mb-1.5">{title}</div>
                    <p className="font-body text-white/45 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
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
                  TESTIMONIALS
                </div>
                <h2 className="font-body font-extrabold text-3xl md:text-4xl text-white mb-2">
                  دانشجوها چی می‌گن؟
                </h2>
                <p className="text-white/30 font-body text-sm">
                  +۶٬۵۰۰ نفر تا الان یاد گرفتن
                </p>
              </div>
            </FadeIn>

            <TestimonialsGrid testimonials={testimonials} />
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
                          <span className="text-white/40 text-xs font-body">پروژه گروهی</span>
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
                    بنیان‌گذار مدرسه دیزاین ملینا هستم و تا امروز با بیش از ۶٬۵۰۰ نفر همراه بودم.
                  </p>

                  {/* Stats */}
                  <div className="flex gap-8 mb-8 border-y border-[#e8e2d9] py-6">
                    {[
                      { num: "+۸",  label: "سال تجربه"  },
                      { num: "+۷K", label: "دانش‌آموز"   },
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

        {/* ─── FAQ ─── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="mb-12 max-w-xl">
              <div className="font-display text-[10px] font-bold tracking-[0.22em] uppercase text-[#a09990] mb-2">
                FAQ
              </div>
              <h2 className="font-body font-extrabold text-3xl md:text-4xl text-[#1a1714] mb-3">
                سوالای پرتکرار
              </h2>
              <p className="text-[#6b6560] font-body leading-relaxed">
                اگر جوابت اینجا نبود، توی تلگرام بپرس.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-[1fr_440px] gap-10 lg:gap-14 items-center">
          <div className="space-y-3">
            {(infinityCourses[0]?.faqs ?? []).slice(0, 6).map((faq, i) => (
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
                  پشتیبانی آنلاین — همین حالا پاسخ‌گوییم
                </span>
              </div>

              <h2 className="font-body font-black text-4xl md:text-6xl text-white mb-5 leading-[1.08]">
                آماده‌ای شروع کنی؟
              </h2>
              <p className="text-white/40 font-body max-w-lg mx-auto mb-10 leading-relaxed">
                ثبت‌نام دوره‌های بی‌نهایت فعلاً بسته‌ست. برای مشاوره‌ی رایگان و اطلاع از
                شروع دوره‌ی بعدی، همین حالا در تلگرام پیام بده.
              </p>

              {/* Trust stats */}
              <div className="flex items-stretch justify-center divide-x divide-x-reverse divide-white/10 mb-11">
                {[
                  { num: "+۸", label: "سال تجربه" },
                  { num: "+۶٬۵۰۰", label: "دانشجو" },
                  { num: "۴.۹", label: "از ۵ رضایت" },
                ].map((s) => (
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
                  مشاوره و ثبت‌نام در تلگرام
                </a>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-body font-semibold px-7 py-4 rounded-2xl transition-all text-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  همه‌ی دوره‌ها
                  <ArrowLeft size={15} />
                </Link>
              </div>

              {/* Infinity course quick cards */}
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-right">
                {videoCourses.slice(0, 2).map((c) => (
                  <Link
                    key={c.id}
                    href={`/courses/${c.slug}`}
                    className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#7c5cfc]/40 rounded-2xl p-5 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-body font-bold text-white text-sm">{c.title}</span>
                      <ChevronLeft
                        size={16}
                        className="text-white/30 group-hover:text-white/70 transition-colors flex-shrink-0"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-[#a78bfa]">
                        {formatPrice(c.price)}
                      </span>
                      {c.originalPrice && (
                        <span className="text-white/30 text-xs line-through font-body">
                          {formatPrice(c.originalPrice)}
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
                GET NOTIFIED
              </div>
              <h2 className="font-body font-black text-3xl md:text-4xl text-[#1a1714] leading-[1.3] mb-3">
                از تخفیف‌ها جا نمون
              </h2>
              <p className="text-[#6b6560] font-body leading-relaxed max-w-md mx-auto">
                شماره‌ت رو بذار تا زمان تخفیف دوره‌ها و ثبت‌نام‌های ویژه رو اول از همه
                بهت خبر بدیم.
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
