import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PersonalNote from "@/components/PersonalNote";
import DiscountNotifyForm from "@/components/DiscountNotifyForm";
import { getLang } from "@/lib/i18n/server";
import { getHomeData, chapter, TELEGRAM } from "@/components/home-lab/data";

/**
 * نسخه‌ی سردبیری صفحه‌ی خانه.
 * Reading this as: صفحه‌ی خانه‌ی یک مدرسه‌ی طراحی برای آدم‌هایی که از نو
 * شروع می‌کنن، با زبان سردبیری برندبوک، dial ENERGY 2 / RHYTHM 3 / MOTION 1.
 *
 * موتیف: شماره‌ی فصل بنفش با خط مو، همون سرفصل‌های برندبوک. بنفش فقط
 * همین‌جا و روی لینک‌های داخل متن میاد؛ هیچ سطحی بنفش نیست.
 * حرکت فقط هاور و فشردنه. هیچ چیزی موقع اسکرول ظاهر نمی‌شه.
 */

export const metadata: Metadata = {
  title: "نسخه‌ی سردبیری خانه | مدرسه دیزاین ملینا",
  robots: { index: false, follow: false },
};

const COPY = {
  fa: {
    title: "طراحی محصول رو از صفر یاد بگیر، با یک پروژه‌ی واقعی که آخرش مال خودته.",
    facts: ["۸ سال طراحی حرفه‌ای", "۵ سال آموزش مستقیم", "بیش از ۶٬۵۰۰ شاگرد"],
    primary: "دوره‌ها و قیمت‌ها",
    secondary: "نمی‌دونم از کجا شروع کنم",
    portraitCaption: "مجتبا یزدان‌پناه، مدرس همه‌ی دوره‌ها",
    courses: {
      title: "دوره‌ها",
      lede: "دو شکل داره: بی‌نهایت، با منتورینگ گروهی هر هفته. یا ویدیویی، به سرعت خودت.",
      head: ["دوره", "ویدیو", "پروژه", "قیمت"],
      hours: "ساعت",
      mentoring: "با منتورینگ",
      closed: "ثبت‌نام فعلاً بسته‌ست",
      unit: "",
      all: "صفحه‌ی همه‌ی دوره‌ها",
    },
    robotype: {
      kicker: "ROBOTYPE",
      title: "دوره‌ی تازه: هوش مصنوعی برای طراح‌های محصول",
      body: "از اولین پرامپت تا محصولی که خودت می‌سازی و منتشر می‌کنی. هر فصل یک تکه‌ی واقعی از یک پروژه‌ی واقعی رو جلو می‌بره.",
      facts: (ch: string, ep: string) => [`${ch} فصل`, `${ep} درس ضبط‌شده`, "دسترسی همیشگی"],
      cta: "برنامه‌ی دوره‌ی ROBOTYPE",
      posterAlt: "پوستر دوره‌ی ROBOTYPE: پیکره‌ی مشکی رباتی با گیتار",
    },
    process: {
      title: "یک دوره هفته به هفته چطور پیش می‌ره",
      lede: "از لحظه‌ی ثبت‌نام تا ارائه‌ی پروژه‌ی آخر. دو مسیر، دو ریتم.",
    },
    words: {
      title: "حرف شاگردها",
      lede: "عین جمله‌هایی که بعد از دوره فرستادن.",
    },
    work: {
      title: "چیزی که شاگردها ساختن",
      lede: "پروژه‌های گروهی دوره‌ها. فایل‌ها بازن و می‌تونی داخلشون رو ببینی.",
      open: "باز کردن فایل فیگما",
      openOther: "دیدن پروژه",
      all: "همه‌ی پروژه‌ها",
    },
    reading: {
      title: "نوشته‌ها",
      lede: "آموزش متنی، بعضی‌ها با فایل دانلودی.",
      minutes: "دقیقه",
      all: "همه‌ی نوشته‌ها",
    },
    faq: {
      title: "سؤال‌هایی که زیاد می‌پرسن",
      lede: "اگه جوابت این‌جا نبود، توی تلگرام بپرس. خودم جواب می‌دم.",
    },
    close: {
      title: "ثبت‌نام بی‌نهایت بسته‌ست، ولی می‌تونیم حرف بزنیم.",
      body: "برای مشاوره و این‌که دوره‌ی بعدی کی شروع می‌شه، توی تلگرام پیام بده. یا شماره‌ت رو بذار تا وقتی ثبت‌نام باز شد خبرت کنیم.",
      telegram: "پیام در تلگرام",
    },
  },
  en: {
    title: "Learn product design from zero, with a real project that ends up being yours.",
    facts: ["8 years in practice", "5 years teaching", "6,500+ students"],
    primary: "Courses and prices",
    secondary: "I don't know where to start",
    portraitCaption: "Mojtaba Yazdanpanah, who teaches every course",
    courses: {
      title: "Courses",
      lede: "Two formats: Infinity, with group mentoring every week. Or video, at your own pace.",
      head: ["Course", "Video", "Projects", "Price"],
      hours: "hours",
      mentoring: "with mentoring",
      closed: "Enrolment closed for now",
      unit: "",
      all: "All courses",
    },
    robotype: {
      kicker: "ROBOTYPE",
      title: "New course: AI for product designers",
      body: "From your first prompt to a product you build and ship yourself. Each chapter moves a real piece of a real project forward.",
      facts: (ch: string, ep: string) => [`${ch} chapters`, `${ep} recorded lessons`, "Lifetime access"],
      cta: "ROBOTYPE syllabus",
      posterAlt: "ROBOTYPE course poster: a black robot figure with a guitar",
    },
    process: {
      title: "How a course runs, week by week",
      lede: "From the day you enrol to your final project review. Two tracks, two rhythms.",
    },
    words: {
      title: "In students' words",
      lede: "The sentences they sent after the course, as they wrote them.",
    },
    work: {
      title: "What students built",
      lede: "Group projects from the courses. The files are open, so you can look inside.",
      open: "Open the Figma file",
      openOther: "See the project",
      all: "All projects",
    },
    reading: { title: "", lede: "", minutes: "", all: "" },
    faq: {
      title: "Questions people ask a lot",
      lede: "If yours is not here, ask on Telegram. I answer myself.",
    },
    close: {
      title: "Infinity enrolment is closed, but we can still talk.",
      body: "Message on Telegram for advice and to hear when the next cohort starts. Or leave your number and we'll tell you when enrolment opens.",
      telegram: "Message on Telegram",
    },
  },
} as const;

/** سرفصل هر بخش: شماره‌ی بنفش، خط مو، تیتر. همون الگوی برندبوک. */
function ChapterHead({ n, title, lede, dark }: { n: string; title: string; lede?: string; dark?: boolean }) {
  return (
    <header className="mb-12 md:mb-16">
      <div className="flex items-center gap-4 mb-6">
        <span className={`font-display font-black text-sm tabular-nums ${dark ? "text-[#b9a6ff]" : "text-[#6240e0]"}`}>
          {n}
        </span>
        <span className={`h-px flex-1 ${dark ? "bg-white/15" : "bg-[#e8e2d9]"}`} />
      </div>
      <h2
        className={`font-body font-black leading-[1.35] max-w-3xl ${dark ? "text-[#FAF6F1]" : "text-[#1a1714]"}`}
        style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)" }}
      >
        {title}
      </h2>
      {lede && (
        <p className={`font-body text-lg leading-[2] mt-4 max-w-2xl ${dark ? "text-[#FAF6F1]/70" : "text-[#5e5853]"}`}>
          {lede}
        </p>
      )}
    </header>
  );
}

export default async function HomeEditorial() {
  const lang = await getLang();
  const c = COPY[lang];
  const d = getHomeData(lang);
  const fa = lang === "fa";
  const sep = fa ? "، " : ", ";

  // شماره‌ی فصل‌ها پشت سر هم می‌مونه، حتی وقتی نسخه‌ی انگلیسی بخش نوشته‌ها رو نداره
  let n = 0;
  const next = () => chapter(++n, lang);

  const [leadQuote, ...otherQuotes] = d.testimonials;
  const [leadProject, ...otherProjects] = d.projects;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FAF6F1] text-[#1a1714]">

        {/* ─── هیرو: تیتر درشت تنها نقطه‌ی تمرکز. پرتره کنارش، کوچیک‌تر از تیتر. ─── */}
        <section className="pt-[var(--nav-h)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <h1
                className="font-body font-black leading-[1.35]"
                style={{ fontSize: "clamp(2.1rem, 5.2vw, 4.4rem)" }}
              >
                {c.title}
              </h1>
              <p className="font-body text-lg leading-[2] text-[#6b6560] mt-8 max-w-xl">{d.t.hero.body}</p>

              <div className="flex flex-wrap items-center gap-3 mt-10">
                <Link
                  href="/courses"
                  className="inline-flex items-center min-h-[48px] px-7 rounded-xl bg-[#1a1714] text-[#FAF6F1] font-body font-bold transition-[background-color,transform] duration-200 hover:bg-[#3a342f] active:scale-[0.98]"
                >
                  {c.primary}
                </Link>
                <Link
                  href="/checklist"
                  className="inline-flex items-center min-h-[48px] px-6 rounded-xl border border-[#1a1714]/20 font-body text-[#1a1714] transition-colors duration-200 hover:border-[#1a1714] hover:bg-white active:bg-[#f0ebe4]"
                >
                  {c.secondary}
                </Link>
              </div>

              <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-12 pt-6 border-t border-[#e8e2d9] font-body text-sm text-[#6b6560]">
                {c.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <figure className="lg:col-span-4">
              <div className="bg-[#E4DAD5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/hero.png"
                  alt={d.t.hero.portraitAlt}
                  width={960}
                  height={944}
                  priority
                  sizes="(min-width: 1024px) 400px, 90vw"
                  className="w-full h-auto mix-blend-multiply"
                  style={{ transform: "scaleX(-1)" }}
                />
              </div>
              <figcaption className="font-body text-sm text-[#6b6560] mt-3">{c.portraitCaption}</figcaption>
            </figure>
          </div>
        </section>

        {/* ─── دوره‌ها: فهرست، نه کارت. چهار ستون همون چهار چیزیه که قبل از خرید مقایسه می‌کنی. ─── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <ChapterHead n={next()} title={c.courses.title} lede={c.courses.lede} />

          <div className="border-t-2 border-[#1a1714]">
            <div aria-hidden="true" className="hidden md:grid grid-cols-[1fr_7rem_6rem_10rem] gap-6 py-3 font-body text-sm text-[#6b6560] border-b border-[#e8e2d9]">
              {c.courses.head.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
            <ul>
            {d.courses.map((course) => (
              <li key={course.slug} className="border-b border-[#e8e2d9]">
                <Link
                  href={`/courses/${course.slug}`}
                  className="group grid grid-cols-2 md:grid-cols-[1fr_7rem_6rem_10rem] gap-x-6 gap-y-2 py-6 transition-colors duration-200 hover:bg-white -mx-3 px-3 rounded-lg"
                >
                  <span className="col-span-2 md:col-span-1">
                    <span className="block font-body font-black text-xl md:text-2xl leading-[1.5] group-hover:text-[#6240e0] transition-colors duration-200">
                      {course.title}
                    </span>
                    <span className="block font-body text-sm text-[#6b6560] mt-1">
                      <span dir="ltr">{course.latin}</span>
                      {course.mentoring && <> · {c.courses.mentoring}</>}
                    </span>
                  </span>
                  <span className="font-body text-[#1a1714] md:pt-1.5">
                    <span className="md:sr-only">{c.courses.head[1]} </span>{course.videoHours} {c.courses.hours}
                  </span>
                  <span className="font-body text-[#1a1714] md:pt-1.5">
                    {course.projects} <span className="md:sr-only">{c.courses.head[2]}</span>
                  </span>
                  <span className="col-span-2 md:col-span-1 font-body md:pt-1.5">
                    {course.closed ? (
                      <span className="text-[#6b6560]">{c.courses.closed}</span>
                    ) : (
                      <span className="font-bold">{course.price}</span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
            </ul>
          </div>
          <Link href="/courses" className="inline-flex items-center min-h-[44px] mt-6 font-body font-bold text-[#6240e0] underline underline-offset-8 decoration-1 hover:decoration-2">
            {c.courses.all}
          </Link>
        </section>

        {/* ─── ROBOTYPE: تنها نوار تیره‌ی بالای صفحه. پوستر خود دوره مشکیه، پس این‌جا هم. ─── */}
        <section className="bg-[#1a1714] text-[#FAF6F1]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-24 grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 md:order-1">
              <p dir="ltr" className={`font-display text-xs tracking-[0.3em] text-[#FAF6F1]/60 ${fa ? "text-right" : ""}`}>
                {c.robotype.kicker}
              </p>
              <h2 className="font-body font-black leading-[1.4] mt-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                {c.robotype.title}
              </h2>
              <p className="font-body text-lg leading-[2] text-[#FAF6F1]/70 mt-5 max-w-xl">{c.robotype.body}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-8 font-body text-[#FAF6F1]/85">
                {c.robotype.facts(d.robotype.chapters, d.robotype.lessons).map((f) => (
                  <li key={f}>{f}</li>
                ))}
                <li>
                  {d.robotype.price} {d.robotype.unit}
                </li>
              </ul>
              <Link
                href="/robotype"
                className="inline-flex items-center min-h-[48px] px-7 mt-10 rounded-xl bg-[#FAF6F1] text-[#1a1714] font-body font-bold transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.98]"
              >
                {c.robotype.cta}
              </Link>
            </div>
            <div className="md:col-span-5">
              <Image
                src="/images/robotype-poster.webp"
                alt={c.robotype.posterAlt}
                width={900}
                height={1350}
                sizes="(min-width: 768px) 420px, 90vw"
                className="w-full max-w-sm mx-auto aspect-[4/5] object-cover object-[50%_40%] rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* ─── روند: دو مسیر واقعی، پنج قدم واقعی. دو ستون چون آدم‌ها همین دو تا رو با هم مقایسه می‌کنن. ─── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <ChapterHead n={next()} title={c.process.title} lede={c.process.lede} />
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {d.tracks.map((track) => (
              <div key={track.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b-2 border-[#1a1714]">
                  <h3 className="font-body font-black text-xl">{track.name}</h3>
                  <span className="font-body text-sm text-[#6b6560]">{track.tag}</span>
                </div>
                <ol>
                  {track.steps.map((step, i) => (
                    <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-3 py-5 border-b border-[#e8e2d9]">
                      <span className="font-display font-black text-[#6b6560] tabular-nums">{d.t.howItWorks.digits[i]}</span>
                      <span className="font-body leading-[2]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <dl className="grid sm:grid-cols-3 gap-8 mt-14">
            {d.notes.map((note) => (
              <div key={note.title}>
                <dt className="font-body font-bold">{note.title}</dt>
                <dd className="font-body text-[#6b6560] leading-[2] mt-1">{note.desc}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ─── حرف شاگردها: یکی درشت، بقیه ستون متن. نظرها هم‌وزن نیستن، یکی بهتر از بقیه داستان رو می‌گه. ─── */}
        <section className="bg-[#E4DAD5]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
            <ChapterHead n={next()} title={c.words.title} lede={c.words.lede} />
            {leadQuote && (
              <figure className="max-w-4xl">
                <blockquote
                  className="font-body font-black leading-[1.7]"
                  style={{ fontSize: "clamp(1.3rem, 2.6vw, 2rem)" }}
                >
                  {leadQuote.text}
                </blockquote>
                <figcaption className="font-body mt-6">
                  <span className="font-bold">{leadQuote.name}</span>
                  <span className="text-[#5e5853]">{sep}{leadQuote.role}</span>
                </figcaption>
              </figure>
            )}
            <div className="grid md:grid-cols-2 gap-x-14 gap-y-10 mt-16 pt-12 border-t border-[#1a1714]/15">
              {otherQuotes.slice(0, 4).map((q) => (
                <figure key={q.name}>
                  <blockquote className="font-body leading-[2] text-[#1a1714]">{q.text}</blockquote>
                  <figcaption className="font-body text-sm mt-3">
                    <span className="font-bold">{q.name}</span>
                    <span className="text-[#5e5853]">{sep}{q.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ─── کار شاگردها: اولی بزرگ، بقیه کوچیک‌تر. ارزش یک پروژه رو تصویرش نشون می‌ده، پس تصویر جلوست. ─── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <ChapterHead n={next()} title={c.work.title} lede={c.work.lede} />
          <div className="grid md:grid-cols-12 gap-x-8 gap-y-12">
            {leadProject && (
              <a href={leadProject.url} target="_blank" rel="noopener noreferrer" className="group md:col-span-12 block">
                {leadProject.cover && (
                  <div className="overflow-hidden rounded-2xl bg-[#e8e2d9]">
                    <Image
                      src={leadProject.cover}
                      alt=""
                      width={1280}
                      height={640}
                      sizes="(min-width: 1280px) 1200px, 100vw"
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.015]"
                    />
                  </div>
                )}
                <div className="flex flex-wrap items-baseline justify-between gap-3 mt-5">
                  <div>
                    <bdi className="font-body font-black text-2xl">{leadProject.name}</bdi>
                    <span className="font-body text-[#6b6560]"> · {leadProject.kind}</span>
                  </div>
                  <span className="font-body text-sm text-[#6b6560] group-hover:text-[#1a1714] underline underline-offset-4">
                    {leadProject.figma ? c.work.open : c.work.openOther}
                  </span>
                </div>
              </a>
            )}
            {otherProjects.map((p) => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="group md:col-span-6 lg:col-span-4 block">
                {p.cover && (
                  <div className="overflow-hidden rounded-xl bg-[#e8e2d9] aspect-[16/10]">
                    <Image
                      src={p.cover}
                      alt=""
                      width={1280}
                      height={800}
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <span className="block font-body font-bold text-lg group-hover:text-[#6240e0] transition-colors duration-200">
                    <bdi>{p.name}</bdi>
                  </span>
                  <span className="block font-body text-sm text-[#6b6560] mt-0.5">
                    {p.kind}{p.kind && p.cohort ? sep : ""}{p.cohort}
                  </span>
                </div>
              </a>
            ))}
          </div>
          <Link href="/projects" className="inline-flex items-center min-h-[44px] mt-10 font-body font-bold text-[#6240e0] underline underline-offset-8 decoration-1 hover:decoration-2">
            {c.work.all}
          </Link>
        </section>

        {/* ─── نوشته‌ها: فقط فارسی. فهرست ساده، چون عنوان خودش تصمیم خوندن رو می‌گیره. ─── */}
        {d.articles.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20 md:pb-28">
            <ChapterHead n={next()} title={c.reading.title} lede={c.reading.lede} />
            <ul className="border-t-2 border-[#1a1714]">
              {d.articles.map((a) => (
                <li key={a.id} className="border-b border-[#e8e2d9]">
                  <Link
                    href={`/articles/${a.slug}`}
                    className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 py-6 -mx-3 px-3 rounded-lg transition-colors duration-200 hover:bg-white"
                  >
                    <span className="font-body font-bold text-lg md:text-xl leading-[1.7] group-hover:text-[#6240e0] transition-colors duration-200">
                      {a.title}
                    </span>
                    <span className="font-body text-sm text-[#6b6560] flex-shrink-0">
                      {a.readTime.toLocaleString("fa-IR")} {c.reading.minutes}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/articles" className="inline-flex items-center min-h-[44px] mt-6 font-body font-bold text-[#6240e0] underline underline-offset-8 decoration-1 hover:decoration-2">
              {c.reading.all}
            </Link>
          </section>
        )}

        <PersonalNote />

        {/* ─── سؤال‌ها: سؤال‌های واقعی صفحه‌ی دوره‌ی بی‌نهایت. خط مو به جای کارت. ─── */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <ChapterHead n={next()} title={c.faq.title} lede={c.faq.lede} />
          <div className="border-t-2 border-[#1a1714]">
            {d.faqs.map((f) => (
              <details key={f.q} className="group border-b border-[#e8e2d9]">
                <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-body font-bold text-lg leading-[1.8]">{f.q}</span>
                  <span aria-hidden="true" className="font-display text-2xl leading-none mt-1 text-[#6b6560] transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="font-body text-[#4a4540] leading-[2] pb-7 max-w-3xl">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ─── پایان: صادق درباره‌ی بسته بودن ثبت‌نام، و دو کار واقعی که الان می‌شه کرد. ─── */}
        <section className="bg-white border-t border-[#e8e2d9]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="font-body font-black leading-[1.4]" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)" }}>
                {c.close.title}
              </h2>
              <p className="font-body text-lg leading-[2] text-[#6b6560] mt-5 max-w-lg">{c.close.body}</p>
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[48px] px-7 mt-9 rounded-xl bg-[#1a1714] text-[#FAF6F1] font-body font-bold transition-[background-color,transform] duration-200 hover:bg-[#3a342f] active:scale-[0.98]"
              >
                {c.close.telegram}
              </a>
            </div>
            <DiscountNotifyForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
