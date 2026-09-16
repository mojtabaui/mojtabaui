"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import {
  Boxes,
  FileText,
  ListOrdered,
  Check,
  Clock,
  KeyRound,
  MonitorPlay,
  Sparkles,
  Volume2,
  VolumeX,
  Terminal,
  Compass,
  Images,
  Users,
  Layers,
  Ticket,
  MessagesSquare,
  Route,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { BrandGlyph } from "@/components/BrandMark";
import { TOOL_MARKS } from "./ToolMarks";
import { RobotPattern } from "./RobotFlat";
import { useStill } from "@/components/odyssey/useStill";
import { MISSIONS, EPISODE_COUNT } from "@/lib/odyssey";
import {
  TOPICS,
  topicCount,
  TOOLS,
  FORMAT,
  FIT,
  NEED,
  PROJECTS,
  SLIDES,
  PRICING,
} from "@/lib/ai7-curriculum";
import type { Lang } from "@/lib/i18n";
import { STAGE_ART } from "./StageArt";

/**
 * صحنهٔ پیکرهٔ مشکیِ هیرو.
 *
 * `RobotStudio` و `DecodeStudio` هنوز در پروژه هستند و نسخهٔ
 * بایگانی‌شده (`/ai7/archive`) از آن‌ها استفاده می‌کند؛ این صفحه
 * دیگر نه. با `dynamic`، هر صفحه فقط صحنهٔ خودش را دانلود می‌کند.
 */
const NeoStudio = dynamic(() => import("./NeoStudio"), { ssr: false });

/**
 * AI7 — نسخهٔ مینیمال.
 *
 * نسخهٔ اول یک *دنیا* می‌سازد: آسمان، خاک، پرچم، رفیق. این یکی
 * عمداً برعکس است — یک جسم روی زمینهٔ خالی، و متن.
 *
 * چیدمان چسبیده است: صحنهٔ سه‌بعدی سرِ جایش می‌ماند و متن از کنارش
 * رد می‌شود. نتیجه این است که کاربر حس می‌کند دارد دورِ یک شیء
 * می‌چرخد، نه اینکه اسلایدشو می‌بیند.
 *
 * زمینه با ربات هم‌قدم است: هر دو از تاریکی شروع می‌کنند و با هم
 * روشن می‌شوند. اگر فقط ربات روشن می‌شد، به‌جای «صحنه دارد روز
 * می‌شود»، «چراغِ یک اسباب‌بازی روشن شد» دیده می‌شد.
 *
 * سه قاعده که این سبک رویشان سوار است:
 *   یک چیز در هر لحظه — هر پرده دقیقاً یک جمله دارد
 *   فضای خالی بخشی از طراحی است، نه چیزی که باید پر شود
 *   حرکت باید کند باشد؛ سرعت، مینیمال بودن را خراب می‌کند
 *
 * روی موبایل چیدمان عوض می‌شود، نه فقط کوچک: پرده‌ها از کنارِ جسم
 * به زیرِ آن می‌روند و جسم بالا می‌رود. متنِ کنارِ یک شیءِ بزرگ در
 * عرضِ ۳۷۵ پیکسل به هیچ اندازه‌ای خوانا نمی‌شود.
 */

/**
 * توکن‌های برند.
 *
 * هر کدام یک متغیرِ CSS با مقدارِ پیش‌فرض است، نه یک رشتهٔ ثابت. در
 * حالتِ عادی هیچ‌کس آن متغیرها را تعریف نمی‌کند و همان پیش‌فرضِ
 * روشن می‌نشیند — یعنی بیرون از این فایل چیزی عوض نشده.
 *
 * فایده‌اش جایی پیدا می‌شود که یک سکشن مشکی می‌شود: به‌جای اینکه
 * ده‌ها `style` داخلش تک‌تک رنگِ تیره بگیرند، فقط همان هفت متغیر
 * روی قابِ سکشن نوشته می‌شوند و کارت و خط و دکمه و شمارهٔ داخلش
 * خودشان برمی‌گردند. یعنی مشکی‌کردنِ یک سکشن، یک تصمیم است نه یک
 * بازنویسی.
 */
const PAPER = "var(--neo-paper, #faf6f1)";
const INK = "var(--neo-ink, #1a1714)";
const MUTE = "var(--neo-mute, #6b6560)";
const LINE = "var(--neo-line, #e8e2d9)";
/**
 * صفحه **تک‌رنگ** است: سیاه، سفید، خاکستری. هیچ لهجهٔ رنگی.
 *
 * هیرو یک جسمِ مشکیِ فلزی روی سیاهیِ مطلق است، و هر رنگی که پایین‌تر
 * بیاید آن قابِ اول را نقض می‌کند — کاربر یک صفحه نمی‌بیند، دو تا
 * می‌بیند که به هم چسبانده شده‌اند.
 *
 * جای رنگ، سلسله‌مراتب از سه چیزِ دیگر می‌آید: اندازه، وزن، و
 * فاصله. سخت‌تر است ولی نتیجه‌اش همان چیزی است که این صفحه لازم
 * دارد — آرام و فلزی، نه تبلیغاتی.
 *
 * نامِ متغیرها عمداً دست نخورد. اگر روزی لهجه برگشت، همین دو خط.
 */
/** خاکستریِ لهجه — نشانه‌های ریز، روی هر دو زمینه خوانا */
const VIOLET = "var(--neo-accent, #8f8a82)";
/** جوهر — پُرکنندهٔ دکمه‌ها و متنِ تأکیدی روی زمینهٔ روشن */
const VIOLET_INK = "var(--neo-strong, #1a1714)";
/** کارتِ روی کاغذ — کرمِ روشن‌تر از زمینه، نه سفیدِ خالص */
const CARD = "var(--neo-card, #fffcf6)";
/*
  لینکِ پشتیبانی و فلشِ دکمه‌ها تا باز شدنِ ثبت‌نام برداشته شدند.

  هر پنج دکمهٔ ثبت‌نام جایشان را به یک خط خبر داده‌اند، پس این دو
  دیگر مصرفی ندارند. وقتی ثبت‌نام باز شد هر دو با همان کامیت
  برمی‌گردند — نشانیِ تلگرام همان است که `BuyButton` در بقیهٔ سایت
  می‌رود، و قیمت‌ها که هیچ‌وقت اینجا نبودند و در `PRICING` زندگی
  می‌کنند.
*/
/**
 * نشانِ واژه‌ای قابِ اول.
 *
 * هشت حرف — و همین طولش لازم است: پیکره وسطِ کلمه می‌ایستد و یکی
 * از حروف را می‌پوشاند. با کلمهٔ کوتاه، آن یک حرف که برود، چیزی
 * برای خواندن نمی‌ماند.
 *
 * اگر روزی عوض شد، همین یک خط.
 */
const WORDMARK = "ROBOTYPE";
/**
 * دو سرِ قوسِ زمینه.
 *
 * مشکیِ گرم است نه خاکستریِ سرد: زمینهٔ روشنِ صفحه کرم است، و
 * مشکیِ آبی‌رنگ کنارش مثل دو برندِ متفاوت به‌نظر می‌رسد. همان
 * مشکیِ قهوه‌ای‌مایل، دو سرِ یک طیف می‌شود.
 */
const NIGHT = "#0a0908";
const NIGHT_INK = "#f4efe8";
const NIGHT_MUTE = "#9b9086";
/** خطِ نازکِ قابِ صحنه — هیرو تا آخر تاریک است، پس یک حالت بیشتر ندارد */
const NIGHT_LINE = "rgba(244,239,232,.09)";

/**
 * دانهٔ فیلم — یک بافت، نه یک فایل.
 *
 * `feTurbulence` یعنی هیچ تصویری دانلود نمی‌شود و در هر چگالیِ
 * پیکسل تیز می‌ماند.
 */
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * لایهٔ دانه — همان یک چیز، هرجا که زمینه تاریک است.
 *
 * تا اینجا فقط هیرو دانه داشت و همین بود که نوارهای تیرهٔ پایینِ
 * صفحه را از آن جدا می‌کرد: هر دو مشکی بودند، ولی یکی مشکیِ *فیلم*
 * بود و آن یکی مشکیِ CSS. چشم این تفاوت را بدونِ اینکه بداند
 * می‌گیرد، و نتیجه‌اش این است که نوارهای پایین مثلِ وصله به‌نظر
 * می‌رسند نه مثلِ ادامهٔ همان صحنه.
 *
 * حالتِ ترکیب فرق می‌کند و این عمدی است. روی هیرو `overlay` درست
 * است: آنجا یک جسمِ سه‌بعدی با میان‌پردهٔ کامل هست و overlay سیاه را
 * سیاه نگه می‌دارد و دانه را فقط در میان‌پرده‌ها می‌گذارد — رفتارِ
 * دانهٔ واقعی. ولی روی یک نوارِ تختِ مشکی هیچ میان‌پرده‌ای نیست، پس
 * overlay عملاً نامرئی است. آنجا `screen` لازم است تا سیاه را چند
 * درصد بالا بیاورد؛ همان چیزی که کفِ نگاتیوِ یک قابِ شبانه هست و
 * هیچ‌وقت سیاهِ مطلق نیست.
 *
 * لایه از قابش بزرگ‌تر است چون می‌لرزد: با قابِ دقیق، هر پرش یک
 * نوارِ بی‌دانه از لبه بیرون می‌گذارد.
 */
function Grain({
  className = "",
  blend = "overlay",
  opacity = 0.13,
}: {
  className?: string;
  blend?: "overlay" | "screen";
  opacity?: number;
}) {
  const still = useStill();
  if (still) return null;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-[12%] ${className}`}
      style={{
        opacity,
        mixBlendMode: blend,
        backgroundImage: GRAIN_URL,
        backgroundSize: "180px 180px",
        /*
          دانه باید هر فریم *بپرد*، نه اینکه نرم بلغزد. با
          `steps(1)` هر مرحله یک جهشِ ناگهانی است؛ لغزشِ نرم، نویز
          را به یک بافتِ شناور تبدیل می‌کند که دیده می‌شود، و جهش
          همان تپشی است که فقط حس می‌شود.
        */
        animation: "ai7-grain 640ms steps(1) infinite",
      }}
    />
  );
}

/**
 * رقم‌های فارسی.
 *
 * هر عددی که در متنِ فارسی دیده می‌شود از اینجا رد می‌شود. رقمِ
 * لاتین وسطِ جملهٔ فارسی، حتی وقتی درست است، غلط دیده می‌شود.
 *
 * تابعِ `withCount` که قبلاً «{n} درس» را پر می‌کرد، با برداشتنِ
 * نوارِ پایینِ هیرو بی‌مصرف شد و حذف شد؛ شمارِ درس‌ها حالا در سکشنِ
 * خلاصه به‌صورتِ عددِ مستقل نوشته می‌شود، نه داخلِ جمله.
 */
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const faNum = (n: number) => String(n).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

/** خروجیِ هر ماژول — چیزی که بعد از آن فصل در دست داری */
const OUTCOME = {
  fa: [
    "یک کیتِ پرامپتِ شخصی که در کارِ روزمره استفاده می‌کنی",
    "محیطِ کارِ آماده، با ابزارهایی که به هم وصل‌اند",
    "پروندهٔ تجربه — پژوهش، تم‌ها، پرسونا و یوزکیسِ معیاردار",
    "یک ایجنتِ کارکننده که یک کارِ واقعی را انجام می‌دهد",
    "یک دیزاین‌سیستمِ کوچک و چند صفحهٔ ساخته‌شده",
    "تیمی از ایجنت‌ها که رابط را می‌سازند و می‌سنجند",
    "نسخهٔ زندهٔ محصول، منتشرشده روی اینترنت",
  ],
  en: [
    "A personal prompt kit you actually use day to day",
    "A working setup, with the tools wired together",
    "The UX folder — research, themes, personas, use cases with criteria",
    "A running agent that does one real job",
    "A small design system and several built screens",
    "A team of agents that builds the interface and checks it",
    "A live version of the product, on the internet",
  ],
} as const;

const T = {
  fa: {
    kicker: "مدرسه دیزاین ملینا",
    title: "آموزش AI برای طراحان محصول",
    lede: "هفت فصل؛ از اولین پرامپت تا محصولی که خودت می‌سازی و منتشر می‌کنی.",
    sub: "هفت فصل، {n} درس",
    blurb:
      "از اولین پرامپت شروع می‌کنیم و قدم‌به‌قدم می‌رسیم به چیزی که واقعاً ساخته شده، آدرس دارد و می‌شود لینکش را برای بقیه فرستاد. هفت فصل داریم و توی هر فصل یک بخش واقعی از پروژه را جلو می‌بریم.",
    scroll: "اسکرول کن تا بیدار بشه!",
    /** دو خطِ کوتاه، نه یک جملهٔ بلند — روی سینه جا باز می‌کند */
    scrollLines: ["اسکرول کن", "تا بیدار بشه"],
    soundOn: "صدا روشن است",
    soundOff: "صدا خاموش است",
    heroCta: "ثبت‌نام",
    /**
     * تا وقتی ثبت‌نام باز نشده، همین یک خط جای هر پنج دکمهٔ صفحه
     * می‌نشیند. یک رشته، پنج جا — تاریخ که عوض شد، یک‌جا عوض می‌شود.
     */
    openAt: "شروع ثبت‌نام ۱ مهر، ساعت ۱۱",
    heroCta2: "سرفصل‌ها را ببین",
    heroSeats: "ظرفیت محدود است",
    briefLabel: "در یک نگاه",
    briefHead: "هفت فصل جلو می‌ریم و آخرش یک محصول واقعی داری.",
    briefLede:
      "اگر عجله داری، همین‌جا خلاصه‌اش را ببین: اندازهٔ دوره و قیمت مشخص است. بقیهٔ جزئیات را پایین‌تر با حوصله توضیح داده‌ایم.",
    briefReady: "ضبط‌شده",
    briefSoon: "در حال آماده‌سازی",
    briefLesson: "درس",
    briefOutline: "سرفصل و خلاصه",
    wordSub: "AI Native Product Design",
    panels: [
      {
        no: "۰۱",
        head: "از صفر شروع می‌کنیم",
        body: "هر فصل با یک مسئلهٔ واقعی شروع می‌شود؛ چیزی که احتمالاً خودت هم باهاش روبه‌رو شده‌ای. آخر فصل هم فقط چند ساعت ویدیو پشت سر نگذاشته‌ای؛ یک خروجی واقعی داری که می‌توانی نشانش بدهی.",
      },
      {
        no: "۰۲",
        head: "ابزارها عوض می‌شن، روش نه",
        body: "مدل‌ها و ابزارهای AI مدام عوض می‌شوند. قرار نیست حفظ کنیم امروز کدام ابزار بهتر است؛ قرار است یاد بگیری چطور با این ابزارها فکر و کار کنی، طوری که با عوض شدنشان همه‌چیز از صفر شروع نشود.",
      },
      {
        no: "۰۳",
        head: "پروژه باید بالاخره منتشر بشه",
        body: "فصل آخر جایی است که پروژه از فایل‌های روی لپ‌تاپت بیرون می‌آید و به یک محصول واقعی تبدیل می‌شود؛ همان بخشی که خیلی از پروژه‌ها معمولاً هیچ‌وقت به آن نمی‌رسند.",
      },
    ],
    pathTitle: "سه مرحله که قدم‌به‌قدم جلو می‌رن",
    pathLede: "قرار نیست از همان اول بپریم سراغ ابزارهای خفن. هر مرحله روی قبلی ساخته می‌شود.",
    path: [
      {
        n: "۱",
        t: "فهمیدن",
        d: "فصل‌های ۱ و ۲ — اول می‌فهمی AI و این ابزارها چطور کار می‌کنند، کجاها خوب جواب می‌دهند و کجاها ممکن است گولت بزنند. اگر این بخش را بلد نباشی، بقیهٔ دوره بیشتر شبیه کپی کردن می‌شود.",
      },
      {
        n: "۲",
        t: "ساختن",
        d: "فصل‌های ۳ تا ۶ — می‌رسیم به تجربه، ایجنت، رابط و تیمی از ایجنت‌ها که روی رابط کار می‌کنند. از اینجا AI کم‌کم از یک دستیار ساده تبدیل می‌شود به بخشی از فرآیند طراحی و ساخت محصولت.",
      },
      {
        n: "۳",
        t: "رساندن",
        d: "فصل آخر — می‌رسیم به کد، انتشار و تمام کردن پروژه. یعنی جایی که دیگر فقط یک فایل طراحی نداری و چیزی ساخته‌ای که واقعاً می‌شود از آن استفاده کرد.",
      },
    ],
    forTitle: "این دوره برای چه کسیه؟",
    forHead: "می‌دونی AI می‌تونه خیلی کارها بکنه، ولی هنوز نمی‌دونی کجا باید بهش اعتماد کنی.",
    forLede:
      "اگر این حس برایت آشناست، احتمالاً مسئلهٔ اصلی‌ات کمبود ابزار نیست. مسئله اینه که نمی‌دونی کجا باید کار رو بسپری دست AI و کجا باید خودت تصمیم بگیری. این دوره دقیقاً روی همین مرز تمرکز دارد.",
    forYes: "این دوره به درد تو می‌خوره اگر",
    forNo: "این دوره احتمالاً به دردت نمی‌خوره اگر",
    toolsLabel: "ابزارهایی که باهاشون کار می‌کنیم",
    formatLabel: "دوره چطور پیش می‌ره؟",
    metaTopics: "زیرسرفصل",
    metaDeliver: "خروجی",
    sum: ["فصل", "درس", "زیرسرفصل", "پروژهٔ واقعی"],
    outline: "سرفصل‌ها",
    outlineLede:
      "هر فصل یک مهارت جدید بهت می‌دهد و روی چیزی که قبلش یاد گرفته‌ای ساخته می‌شود. ترتیب فصل‌ها اتفاقی نیست.",
    lessons: "درس",
    readyCount: "فصلِ ضبط‌شده",
    draftCount: "فصلِ در حال نهایی شدن",
    soon: "در حال نهایی شدن",
    ready: "ضبط‌شده",
    takeSum:
      "و وقتی این هفت فصل را کنار هم بگذاری، یک محصول واقعی داری که خودت از صفر جلو برده‌ای و می‌توانی با خیال راحت دربارهٔ فرآیند ساختش حرف بزنی.",
    takeTitle: "آخر دوره چی با خودت می‌بری؟",
    takeLede:
      "آخر هر فصل یک خروجی واقعی داری. این هفت خروجی کنار هم تبدیل می‌شوند به پروژهٔ نهایی.",
    needTitle: "قبل از شروع چی لازم داری؟",
    joinTitle: "ثبت‌نام",
    joinHead: "ثبت‌نام از طریق پشتیبانی انجام می‌شه",
    joinBody:
      "فعلاً درگاه پرداخت روی سایت نداریم و ثبت‌نام کارت‌به‌کارت انجام می‌شود. توی تلگرام پیام بده؛ همان‌جا می‌گوییم الان قیمت روی کدام پله است، چند ظرفیت باقی مانده و شماره کارت را برایت می‌فرستیم. بعد از پرداخت هم دسترسی‌ات باز می‌شود.",
    joinCta: "پیام در تلگرام",
    joinNote: "معمولاً کمتر از یک روز جواب می‌دیم.",
    noteTitle: "چرا این دوره رو ساختم؟",
    note: "چند ساله کارم طراحی محصوله و بارها به این نقطه رسیدم که چیزی رو طراحی کردم، تحویل دادم و بعد منتظر موندم یکی دیگه بسازتش. AI این قسمت ماجرا رو خیلی تغییر داده. ولی در عوض یک سؤال مهم‌تر به وجود اومده: حالا که می‌تونیم خیلی چیزها رو بسازیم، کجا باید از AI کمک بگیریم و کجا نباید تصمیم رو بهش بسپریم؟ این دوره دربارهٔ همین موضوعه.",
    noteBy: "مجتبی — مدرسه دیزاین ملینا",
    noteRole: "طراح رابط و تجربهٔ کاربری، بنیان‌گذار مدرسه دیزاین ملینا",
    note2:
      "چیزهایی که توی این دوره می‌بینی از دل پروژه‌های واقعی اومده. طبیعتاً اشتباه و خرابکاری هم داشته‌ایم! حتی بعضی از همان اشتباه‌ها را عمداً نشانت می‌دهم، چون به نظرم دیدن اینکه یک تصمیم چرا جواب نداده، خیلی بیشتر از دیدن یک خروجی بی‌نقص به آدم یاد می‌دهد.",
    stepsTitle: "سه قدم و شروع می‌کنیم",
    steps: [
      { t: "توی تلگرام پیام بده", d: "بهت می‌گیم الان قیمت روی کدوم پله‌ست و چند جا باقی مونده." },
      { t: "کارت‌به‌کارت کن", d: "شماره کارت رو همون‌جا می‌فرستیم؛ بعد رسید رو برامون بفرست." },
      {
        t: "دسترسی باز می‌شه",
        d: "فصل‌های ضبط‌شده از همان لحظه در دسترست هستند و فصل‌های بعدی هم به‌محض آماده شدن برایت باز می‌شوند.",
      },
    ],
    faqTitle: "سؤال‌هایی که معمولاً می‌پرسید",
    faq: [
      {
        q: "باید برنامه‌نویسی بلد باشم؟",
        a: "نه. ولی قرار هم نیست از کد فرار کنیم! توی دوره یاد می‌گیری کد رو بخونی، بفهمی چه کاری انجام می‌ده و در صورت نیاز تغییرش بدی؛ حتی اگر قرار نباشه خودت از صفر برنامه بنویسی.",
      },
      {
        q: "با چه ابزارهایی کار می‌کنیم؟",
        a: "با Claude، ChatGPT، Codex و Figma کار می‌کنیم و یک فصل کامل هم به همین ابزارها اختصاص دارد. ولی هدف دوره حفظ کردن اسم ابزارها نیست. روش کار کردن را یاد می‌گیریم، چون ابزارها بالاخره عوض می‌شوند.",
      },
      {
        q: "چقدر زمان می‌بره؟",
        a: "بستگی به سرعت خودت داره. هر فصل چند ساعت ویدیو و یک‌سری تمرین دارد و قرار است خروجی تمرین‌ها مستقیماً به پروژهٔ نهایی اضافه شود.",
      },
      {
        q: "همهٔ فصل‌ها آماده‌ان؟",
        a: "فصل‌های اول ضبط شده‌اند و بقیه در حال نهایی شدن‌اند. وضعیت هر فصل را هم کنارش نوشته‌ایم تا دقیقاً بدانی چه چیزی آماده است و چه چیزی در راهه.",
      },
      {
        q: "بعد از دوره چی دارم؟",
        a: "یک محصول واقعی که خودت ساختی و می‌تونی نشونش بدی. قرار نیست مدرک و گواهی را به‌عنوان دستاورد اصلی دوره تحویلت بدیم؛ چیزی که ساختی، خیلی بیشتر از یک گواهی دربارهٔ توانایی‌هات حرف می‌زنه.",
      },
      {
        q: "چرا اسم فصل‌ها و درس‌ها انگلیسیه؟",
        a: "چون خیلی از این‌ها اسم و اصطلاح تخصصی‌اند. مثلاً «Agentic UX Design» را در منابع، بازار کار و رزومه‌ها با همین اسم می‌بینی. ترجمه کردنشان گاهی فقط پیدا کردن و استفاده کردن از منابع بعدی را سخت‌تر می‌کند. توضیحات، ویدیوها و جزوه‌ها فارسی‌اند.",
      },
      {
        q: "پرداخت چطوریه؟",
        a: "فعلاً کارت‌به‌کارت و از طریق پشتیبانی. درگاه پرداخت سایت هنوز فعال نیست. قیمت و پله‌های تخفیف هم شفاف همین صفحه نوشته شده و چیزی پشت پرده نیست.",
      },
      {
        q: "اگه پلهٔ اول پر شده باشه چی؟",
        a: "پلهٔ بعدی فعال می‌شود. توی تلگرام پیام می‌دهی و همان‌جا می‌گوییم الان روی کدام پله هستیم و چند ظرفیت باقی مانده.",
      },
      {
        q: "دسترسی تا کی دارم؟",
        a: "همیشگیه. حتی فصل‌هایی که بعداً به دوره اضافه می‌شوند هم بدون پرداخت اضافه برایت باز خواهند شد.",
      },
    ],
    finalTitle: "از همین‌جا شروع می‌کنیم.",
    finalBody: "هفت فصل؛ از اولین پرامپت تا محصولی که منتشرش می‌کنی.",
    cta: "می‌خوام شروع کنم",
    back: "برگشت به مدرسه",
    others: "نسخه‌های دیگر",
    vFull: "نسخهٔ کامل",
    vBust: "نسخهٔ نیم‌تنه",
    vDevice: "نسخهٔ دستگاه",
    vArchive: "نسخهٔ بایگانی",
  },  en: {
    kicker: "Melina Design School",
    title: "AI for product designers",
    lede: "Seven chapters, from your first prompt to a product you actually ship.",
    sub: "Seven chapters, {n} lessons",
    blurb:
      "From your first prompt to a product with a URL that opens. Not a tool list, not shortcuts — a method that still holds when the models move.",
    scroll: "scroll to wake it up",
    scrollLines: ["scroll", "to wake it up"],
    soundOn: "sound on",
    soundOff: "sound off",
    heroCta: "Enrol",
    openAt: "Enrolment opens 23 September, 11:00",
    heroCta2: "See the outline",
    heroSeats: "limited seats",
    briefLabel: "At a glance",
    briefHead: "Seven chapters, and at the end something you can send a link to.",
    briefLede:
      "In a hurry? Stay right here — how big it is and what it costs. The rest is further down, at your own pace.",
    briefReady: "recorded",
    briefSoon: "coming",
    briefLesson: "lessons",
    briefOutline: "The outline, short",
    wordSub: "AI Native Product Design",
    panels: [
      {
        no: "01",
        head: "You never start from nothing",
        body: "Every chapter opens on a real problem, not a made-up exercise. What you build is what you can show.",
      },
      {
        no: "02",
        head: "The tools move, the method doesn't",
        body: "Models shift every month. What you learn is how to think about them, and that stays put.",
      },
      {
        no: "03",
        head: "It isn't done until it ships",
        body: "The last chapter is about getting the work in front of people — the exact place most projects stall.",
      },
    ],
    pathTitle: "Three stages that stand on each other",
    pathLede: "Until the one before lands, the next is just tool-collecting.",
    path: [
      {
        n: "1",
        t: "Understand",
        d: "Chapters 1–2 — how these things work and where they fail. Without it, the rest of the course is imitation.",
      },
      {
        n: "2",
        t: "Build",
        d: "Chapters 3–6 — experience, agents, interface, and an agent team on the interface. This is where AI stops being an assistant and becomes part of your process.",
      },
      {
        n: "3",
        t: "Ship",
        d: "The last chapter — code, launch, and a project that actually finishes. Where the work leaves the file.",
      },
    ],
    forTitle: "Who it's for",
    forHead: "We know AI does something. We do not know where to give ground.",
    forLede:
      "That is where most of us stall — and the line this whole course is about. If that sentence sounds familiar, the two columns below say whether this is for you.",
    forYes: "It fits if you're",
    forNo: "It doesn't if you're",
    toolsLabel: "Tools",
    formatLabel: "The format",
    metaTopics: "sub-topics",
    metaDeliver: "deliverable",
    sum: ["chapters", "lessons", "sub-topics", "real projects"],
    outline: "The outline",
    outlineLede:
      "Each chapter is a skill that stands on the one before it. The order is not arbitrary.",
    lessons: "lessons",
    readyCount: "chapters recorded",
    draftCount: "still being finished",
    soon: "outline still settling",
    ready: "recorded",
    noteTitle: "Why I built this",
    note: "For years my job was to design a product and then wait for someone to build it. That wait is gone now, but something else took its place: we no longer know where to give ground and where to hold it. These seven chapters are that line.",
    noteBy: "Mojtaba — Melina Design School",
    noteRole: "Product and interface designer, founder of Melina Design School",
    note2:
      "Everything in this course came out of real projects. So did its failures — and I repeat a few of them deliberately, in front of you, because that is the best way to learn them.",
    stepsTitle: "Three steps, today",
    steps: [
      { t: "Message on Telegram", d: "We will tell you which price tier we are on and how many seats are left." },
      { t: "Transfer", d: "We send the account details there and you send back the receipt." },
      { t: "Access opens", d: "The recorded chapters straight away, the rest as they are finished." },
    ],
    takeSum: "Put the seven side by side and they are one product you built from nothing, and can tell the story of.",
    takeTitle: "What you walk away with",
    takeLede:
      "Each chapter ends in a thing you built, not a chapter you finished. These seven are what you hold afterwards.",
    needTitle: "Before you start",
    joinTitle: "Enrolling",
    joinHead: "Enrolment goes through support",
    joinBody:
      "There is no checkout on the site yet — enrolment is handled directly. Message us on Telegram: we will tell you how many seats are left in the current tier, send the payment details, and open your access.",
    joinCta: "Message on Telegram",
    joinNote: "We usually reply within a day.",
    faqTitle: "The usual questions",
    faq: [
      {
        q: "Do I need to code?",
        a: "No. But we're not running from code either. You'll learn to read it and change it, even if you never write it from scratch.",
      },
      {
        q: "Which tools do we use?",
        a: "Claude, ChatGPT and Codex, and Figma — a whole chapter is about exactly these. But the course is about method, so when the tools move, the lessons still hold.",
      },
      {
        q: "How long does it take?",
        a: "At your own pace. Each chapter is a few hours of video plus one exercise whose output feeds the final project.",
      },
      {
        q: "Is every chapter ready?",
        a: "The early chapters are recorded and the rest are still being finished. Each chapter says where it stands.",
      },
      {
        q: "What do I walk away with?",
        a: "A working product you built yourself and can show — not a certificate of attendance.",
      },
      {
        q: "Why are the chapter and lesson names in English?",
        a: "Because they are terms, not sentences. “Agentic UX Design” is what the market and your CV will call it, and translating it only makes your own work harder. The explanations, the videos and the handouts are in Persian.",
      },
      {
        q: "How does payment work?",
        a: "Bank transfer, handled through support. There is no checkout on the site. The price and the discount steps are written above — nothing is held back.",
      },
      {
        q: "What if the first tier is full?",
        a: "The next one opens. Ask on Telegram and we will tell you which tier we are on and how many seats are left.",
      },
      {
        q: "How long does access last?",
        a: "Permanently. Chapters recorded later open up for you without a new charge.",
      },
    ],
    finalTitle: "It starts here.",
    finalBody: "Seven chapters, from first contact to launch.",
    cta: "I want to start",
    back: "Back to the school",
    others: "Other versions",
    vFull: "Full version",
    vBust: "Bust version",
    vDevice: "Device version",
    vArchive: "Archived version",
  },
} as const;

export default function Ai7Minimal({
  lang,
}: {
  lang: Lang;
  /**
   * انتخابِ ربات — دیگر مصرفی ندارد و فقط برای سازگاریِ مسیرهای
   * قدیمی (`/ai7/v2` و `/ai7/v3`) پذیرفته می‌شود. صحنه یکی است.
   */
  bot?: "device" | "bust" | "decode";
}) {
  const t = T[lang];
  const rtl = lang === "fa";
  /**
   * صدا پیش‌فرض روشن است، ولی راهِ خاموش کردنش همیشه جلوی چشم است.
   *
   * آهنگ با اولین اسکرول می‌آید و کاربر انتخابش نکرده؛ کمترین کاری
   * که می‌شود کرد این است که دکمهٔ خاموشش را دنبالِ چیزی نگردد.
   */
  const [muted, setMuted] = useState(false);
  const proj = PROJECTS[lang];
  const slides = SLIDES[lang];
  const tools = TOOLS[lang];
  const format = FORMAT[lang];
  const fit = FIT[lang];
  const need = NEED[lang];
  /** عددهای ریزِ صفحه — فارسی که باشد، رقمِ لاتین وسطِ جمله می‌زند توی ذوق */
  const num = (n: number) => (lang === "fa" ? faNum(n) : String(n));
  const price = PRICING[lang];
  const still = useStill();

  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.0005 });

  /** در کاهش حرکت، هر چیز از همان اول در حالت نهایی می‌نشیند */
  /**
   * در حالتِ کاهشِ حرکت، این مقدار **جابه‌جا** نشود.
   *
   * فقط برای `transform` است، عمداً. یک دور همین کمک روی شفافیت هم
   * به کار رفت و نتیجه‌اش این شد که هرچه با اسکرول محو می‌شد، برای
   * کاربرِ کاهشِ حرکت **از اول** نامرئی می‌ماند: نوارِ بالا، نشانِ
   * واژه‌ای، و دو پردهٔ آخر. یعنی تنظیمی که قرار بود حرکت را کم کند،
   * نصفِ صفحه را حذف می‌کرد.
   *
   * محوشدن حرکت نیست؛ لغزیدن و پارالاکس است که هست. پس شفافیت همیشه
   * از اسکرول می‌آید و فقط جابه‌جایی صفر می‌شود.
   */
  const fixed = <V,>(v: MotionValue<V>, end: V) => (still ? end : v);

  /**
   * صحنه تا آخر تاریک می‌ماند — قوسِ «بیدار شدن» برداشته شد.
   *
   * نسخهٔ قبل زمینه را از سیاه به کرم می‌بُرد و جسم هم‌قدمش روشن
   * می‌شد. با پیکرهٔ مشکیِ براق آن قوس برعکس عمل می‌کند: چیزی که
   * این فرم را می‌سازد فقط بازتابِ باریکه‌های نور روی لبه است، و آن
   * بازتاب‌ها روی زمینهٔ کرم دیده نمی‌شوند. نتیجه‌اش یک سیلوئتِ
   * تختِ بریده بود، مثلِ استیکر.
   *
   * پس هیرو یک فصلِ سیاه است و تمام، و صفحه *بعد* از آن کرم می‌شود.
   * مرزِ تیزِ بینشان عیب نیست؛ همان چیزی است که به «اینجا تمام شد»
   * شکل می‌دهد.
   */
  const bg = NIGHT;
  const ink = NIGHT_INK;
  const mute = NIGHT_MUTE;
  const line = NIGHT_LINE;

  const heroOut = useTransform(p, [0.02, 0.13], [1, 0]);
  /**
   * نشانِ واژه‌ای دیرتر از نوارها می‌رود.
   *
   * اگر هر سه با هم محو شوند، قاب یک‌باره خالی می‌شود و پرده‌ها روی
   * هیچ می‌آیند. با ماندنِ واژه تا میانهٔ راه، پیکره لحظه‌ای *تنها*
   * در قاب دیده می‌شود — همان مکثی که بینِ پوستر و متن لازم است.
   */
  const wordOut = useTransform(p, [0.05, 0.19], [1, 0]);
  const wordY = useTransform(p, [0.05, 0.19], [0, -40]);
  /**
   * دکمه‌های قابِ اول، وقتی محو شدند نباید کلیک بگیرند.
   *
   * کلِ بلوکِ تیتر `pointer-events-none` است و فقط همین ردیف استثنا
   * می‌شود؛ پس بدونِ این، یک دکمهٔ نامرئی وسطِ پرده‌ها می‌ماند و
   * کلیکِ کاربر را می‌بلعد.
   */
  const heroClicks = useTransform(heroOut, (v) => (v > 0.5 ? "auto" : "none"));

  /**
   * حرکت تا بعد از اولین رندرِ مرورگر روشن نمی‌شود.
   *
   * قاعده‌های ظهور بچه‌های سکشن را نامرئی می‌کنند؛ اگر همان HTMLِ
   * سرور هم نامرئی بیاید، هر کسی که JS برایش اجرا نشود صفحه‌ای خالی
   * می‌بیند. پس سرور صفحهٔ کامل را می‌فرستد و حرکت یک فریم بعد سوار
   * می‌شود.
   */
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    root.current?.classList.add("neo-anim");

    /*
      صفحه باید از بالای صحنه باز شود.

      مرورگر — و به‌خصوص سافاریِ آی‌فون — جای اسکرولِ دفعهٔ قبلِ همین
      نشانی را به خاطر می‌سپارد و موقعِ باز شدن به همان‌جا برمی‌گردد.
      روی یک صفحهٔ معمولی این لطف است؛ روی صفحه‌ای که کلِ هیرواش یک
      کوریوگرافیِ وابسته به اسکرول است، فاجعه است: کاربر یک لحظه نوار
      و صحنه را می‌بیند و بعد صفحه خودش می‌پرد وسط یا تهِ آن، و آنچه
      می‌ماند حسِ «هیرو نیامد» است.

      پس بازگردانیِ خودکار خاموش می‌شود و از بالا شروع می‌کنیم — مگر
      اینکه نشانی خودش لنگر داشته باشد، که آن‌وقت کاربر عمداً وسطِ
      صفحه را خواسته. موقعِ ترکِ صفحه، رفتارِ قبلی برمی‌گردد تا بقیهٔ
      سایت دکمهٔ بازگشتِ سالمش را از دست ندهد.
    */
    const prev = history.scrollRestoration;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    /*
      یک بار کافی نیست.

      سافاری جای اسکرول را *بعد از* رویدادِ `load` برمی‌گرداند، یعنی
      بعد از این افکت. و اگر صفحه از حافظهٔ عقب/جلو بیاید (`pageshow`
      با `persisted`) اصلاً این افکت دوباره اجرا نمی‌شود. پس همان
      «بالا برو» در هر سه لحظه‌ای که صفحه دارد *می‌رسد* تکرار می‌شود،
      نه در لحظه‌های دلخواهِ بعدی — وگرنه اسکرولِ خودِ کاربر را خراب
      می‌کردیم.
    */
    const toTop = () => {
      if (!window.location.hash) window.scrollTo(0, 0);
    };
    toTop();
    window.addEventListener("load", toTop);
    window.addEventListener("pageshow", toTop);

    return () => {
      window.removeEventListener("load", toTop);
      window.removeEventListener("pageshow", toTop);
      if ("scrollRestoration" in history) history.scrollRestoration = prev;
    };
  }, []);

  return (
    /*
      نشانگرِ سیستم، نه نشانگرِ سفارشیِ سایت.

      نشانگرِ سفارشی روی یک صفحهٔ معمولی جواب می‌دهد، ولی اینجا
      نصفِ قاب یک صحنهٔ سه‌بعدیِ تمام‌صفحه است و یک نقطهٔ شناور روی
      آن، به‌جای «نشانگر»، مثلِ چیزی داخلِ خودِ صحنه خوانده می‌شود.
      `native-cursor` همان کلاسی است که پنل و فرم‌های سایت هم برای
      همین کار استفاده می‌کنند.
    */
    <div
      /*
        `neo-anim` تنها بعد از سوارشدنِ JS روشن می‌شود.

        قاعده‌های ظهور در `globals.css` همه پشتِ همین کلاس‌اند، پس
        اگر اسکریپت اجرا نشود — خزنده، مرورگرِ بی‌JS، یا فقط چند صدم
        ثانیه پیش از هیدریشن — چیزی که دیده می‌شود متنِ کامل است، نه
        صفحه‌ای که هیچ‌وقت ظاهر نشد.
      */
      ref={root}
      className="native-cursor relative min-h-dvh"
      style={{ background: PAPER, color: INK }}
    >
      {/*
        دانه باید هر فریم *بپرد*، نه اینکه نرم بلغزد.

        با `steps(1)` هر مرحله یک جهشِ ناگهانی است. لغزشِ نرم، نویز
        را به یک بافتِ متحرکِ شناور تبدیل می‌کند که دیده می‌شود؛
        جهشِ ناگهانی همان تپشِ دانهٔ فیلم است که دیده نمی‌شود و فقط
        حس می‌شود.
      */}
      <style>{`
        @keyframes ai7-grain {
          0%   { transform: translate(0, 0) }
          20%  { transform: translate(-6%, 3%) }
          40%  { transform: translate(4%, -5%) }
          60%  { transform: translate(-3%, -2%) }
          80%  { transform: translate(5%, 4%) }
          100% { transform: translate(0, 0) }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes ai7-grain { from, to { transform: none } }
        }
      `}</style>

      {/* ── صحنه: پیکره می‌ایستد، متن از کنارش رد می‌شود ── */}
      {/*
        بلندیِ صحنه روی گوشی کمتر است، و این فقط «کوچک‌کردن» نیست.

        ۴۸۰dvh روی یک آی‌فون یعنی حدودِ ۴۰۰۰ پیکسل، یعنی پنج صفحه
        اسکرول تا پردهٔ سوم. روی دسکتاپ همین عدد درست است — آنجا هر
        چرخِ ماوس چند صد پیکسل می‌برد و حرکت آرام حس می‌شود. روی
        گوشی همان عدد یعنی کاربر قبل از پردهٔ دوم خسته می‌شود و
        نتیجه‌گیری می‌کند که «چیزی نمی‌آید».

        ۳۲۰dvh همان سه پرده را در نصفِ مسافت می‌دهد؛ کوریوگرافی عوض
        نمی‌شود، فقط فشرده‌تر می‌شود.
      */}
      {/*
        `svh` برای بلندیِ صحنه، نه `dvh`.

        روی آی‌فون نوارِ آدرس با اسکرول جمع و باز می‌شود و `dvh` هر
        بار عوض می‌شود. وقتی واحدِ یک عنصرِ **بلند** این باشد، بلندیِ
        کلِ صفحه وسطِ اسکرول تغییر می‌کند، مرورگر جای اسکرول را جبران
        می‌کند، و کاربر یک پرش می‌بیند — همان «یک لحظه می‌آید و سریع
        می‌رود پایین».

        `svh` کوچک‌ترین حالتِ نما است و **ثابت** می‌ماند، پس طولِ
        مسیرِ اسکرول دیگر زیرِ پا تکان نمی‌خورد. پردهٔ چسبانِ داخلش
        همچنان `dvh` است، چون آن باید دقیقاً قابِ دیده‌شده را پر کند
        و تغییرِ بلندی‌اش طولِ مسیر را عوض نمی‌کند.
      */}
      <div ref={stage} className="relative h-[320svh] md:h-[480svh]">
        <motion.div
          className="sticky top-0 h-dvh overflow-hidden"
          style={{ background: bg, color: ink }}
        >
          {/*
            نوارِ بالا.

            تنها چیزِ قابِ اول که *کلیک* می‌گیرد، و عمداً همان سه تکهٔ
            کمینه: نام، نشان، و یک دکمه. هرچه بیشتر از این، پوسترِ
            پایین را به یک صفحهٔ وب تبدیل می‌کند.
          */}
          <motion.div
            className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-6"
            style={{ opacity: heroOut, pointerEvents: heroClicks }}
          >
            <span className="neo-cap hidden text-[0.62rem] sm:inline" style={{ color: mute }}>
              {t.kicker}
            </span>

            <BrandGlyph size={22} style={{ color: VIOLET }} />

            <div className="flex items-center gap-2.5">
              <LangPick lang={lang} line={line} ink={ink} mute={mute} bg={bg} />

              {/* خاموشیِ صدا — آیکن‌تنها، چون توضیح نمی‌خواهد */}
              <button
                type="button"
                onClick={() => setMuted((v) => !v)}
                aria-pressed={muted}
                aria-label={muted ? t.soundOff : t.soundOn}
                className="inline-flex items-center justify-center border p-2.5 transition-opacity hover:opacity-70"
                style={{ borderColor: line, color: muted ? mute : ink }}
              >
                {muted ? (
                  <VolumeX className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                ) : (
                  <Volume2 className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                )}
              </button>

              <OpenNote text={t.openAt} color={ink} size="text-[0.72rem] sm:text-[0.78rem]" />
            </div>

          </motion.div>

          {/*
            نشانِ واژه‌ای — غول‌پیکر، پشتِ پیکره.

            هم‌پوشانی عمدی است و کلِ ترکیب‌بندی رویش سوار: پیکره از
            وسطِ حروف بیرون می‌آید، پس صحنه دو لایه پیدا می‌کند و تخت
            نمی‌ماند. به همین دلیل هم واژه باید *بلند* باشد — اگر سه
            حرف بود، سر یکی‌شان را می‌پوشاند و دیگر خوانده نمی‌شد.

            لاتین و نازک و بازفاصله، چون فارسی هیچ‌کدامِ این سه را
            نمی‌پذیرد: حروفِ فارسی به هم می‌چسبند و `tracking` اتصال
            را می‌شکند. تیترِ فارسی پایینِ قاب است، جایی که اندازه‌اش
            اجازهٔ خوانده‌شدن می‌دهد.
          */}
          <motion.h1
            className="pointer-events-none absolute inset-x-0 top-[15dvh] z-0 px-2 text-center sm:top-[13dvh]"
            style={{ opacity: wordOut, y: fixed(wordY, 0) }}
          >
            <span className="sr-only">{t.title}</span>
            {/*
              زیرنویس **بالای** نشان می‌نشیند، نه زیرش.

              زیرِ نشان، درست همان‌جایی است که سرِ پیکره از حروف
              بیرون می‌زند — و یک دور همان شد: نصفِ جمله پشتِ کلاه‌خود
              گم بود. بالای نشان هیچ‌چیز جلویش نیست.
            */}
            <span
              className="mb-4 block text-[0.6rem] sm:mb-5 sm:text-[0.7rem]"
              style={{
                fontFamily: "var(--font-wordmark), var(--font-space-grotesk), sans-serif",
                letterSpacing: "0.32em",
                color: mute,
              }}
              dir="ltr"
            >
              {t.wordSub}
            </span>
            <span
              aria-hidden="true"
              /*
                فونتِ تکنوی عریض، نه سنس‌سریفِ پیش‌فرضِ صفحه.

                حرفِ «O»ی تقریباً مربع و انتهای صافِ حروف، همان چیزی
                است که نشانِ مرجع را می‌سازد؛ با یک گروتسکِ معمولی
                هرچقدر هم نازک و بازفاصله، آن حس درنمی‌آید.

                `clamp` کوچک‌تر شد چون این فونت خودش از گروتسک
                عریض‌تر است و با اندازهٔ قبلی از دو طرفِ قاب می‌زد
                بیرون.
              */
              className="block uppercase leading-[0.9] text-[clamp(2rem,10.2vw,8.4rem)]"
              style={{
                fontFamily: "var(--font-wordmark), var(--font-space-grotesk), sans-serif",
                letterSpacing: "0.01em",
              }}
              dir="ltr"
            >
              {WORDMARK}
            </span>
          </motion.h1>

          {/*
            دانه‌های فیلم — روی کلِ قاب، بالای سه‌بعدی.

            یک رندرِ سه‌بعدی بی‌عیب است، و همان بی‌عیبی لو می‌دهد که
            ساختگی است: هیچ دوربینی تصویرِ بی‌دانه نمی‌گیرد. یک لایهٔ
            نازکِ نویز روی همه‌چیز، همان نقصِ کوچکی است که چشم آن را
            «فیلم» می‌خواند نه «رندر» — و روی گرادیان‌های نرمِ مشکی،
            نوارنوار شدن (banding) را هم می‌پوشاند.

            با `feTurbulence` ساخته می‌شود نه تصویر: هیچ فایلی دانلود
            نمی‌شود و در هر اندازه‌ای تیز است. `mix-blend-mode` روی
            overlay یعنی سیاه‌ها سیاه می‌مانند و دانه فقط در میان‌پرده‌ها
            دیده می‌شود، که رفتارِ دانهٔ واقعیِ فیلم است.
          */}
          <Grain className="z-30" />

          <NeoStudio
            progress={p}
            /* متن سمتِ شروع می‌نشیند، پس پیکره به سمتِ پایان می‌رود */
            shift={rtl ? -1 : 1}
            chestText={t.scrollLines}
            muted={muted}
            className="absolute inset-0 z-10 h-full w-full"
          />

          {/*
            قابِ اول دیگر نوارِ پایین ندارد.

            عنوان، شمارِ درس‌ها، دعوتِ اسکرول و قیمت — هر چهارتا از
            اینجا رفتند. دلیلش یک چیز است: قابِ اول باید **یک** چیز
            بگوید، و آن یک چیز پیکره و نامِ دوره است. هرچه دورِ کادر
            اضافه شود، همان تمرکز را می‌شکند و پوستر را به بروشور
            تبدیل می‌کند.
            دعوتِ اسکرول حالا روی سینهٔ خودِ پیکره است، و قیمت و
            مشخصات در سکشنِ بلافاصله بعدی.
          */}

          {/* سه پرده، هرکدام یک جمله. هم‌پوشانی ندارند تا در هر
              لحظه دقیقاً یکی خوانده شود. */}
          {t.panels.map((s, i) => (
            <Panel
              key={s.no}
              p={p}
              still={still}
              index={i}
              lang={lang}
              no={s.no}
              head={s.head}
              body={s.body}
              mute={mute}
              line={line}
              /**
               * هر پرده یک *بازه از فصل‌ها* است، نه یک شعار.
               *
               * سه پرده روی هفت فصل: فهمیدن (۱–۲)، ساختن (۳–۵)،
               * رساندن (۶–۷). همان تقسیم‌بندیِ «مسیرِ دوره»، تا
               * خواننده دو دسته‌بندیِ متفاوت در ذهنش نسازد.
               */
              range={([[0, 1], [2, 5], [6, 6]] as const)[i]}
            />
          ))}
        </motion.div>
      </div>

      {/* ── خلاصه ──
          اولین چیزی که بعد از پوستر می‌آید.

          نسخهٔ اول این بخش یک ستونِ متن بود کنارِ یک ستونِ متن، و
          درست همان ایرادی را داشت که به چشم می‌آمد: چیزی برای
          *دیدن* نداشت. حالا سه المانِ گرافیکی کارِ توضیح را می‌کنند
          و متن فقط لنگرشان است —

            نوارِ هفت‌بخشیِ وضعیت، که در یک نگاه می‌گوید چقدرش
            ضبط شده و چقدرش نه.

            میله‌های افقیِ کنارِ هر فصل، که طولشان نسبتِ درس‌هاست.
            عدد را باید خواند؛ میله را می‌شود مقایسه کرد.

            عددِ درشتِ قیمت، به‌اندازه‌ای بزرگ که با فهرستِ کنارش
            هم‌وزن باشد.

          دو ستون از یک خطِ افقیِ مشترک شروع می‌شوند و هر دو با یک
          خط تمام — بدونِ آن، ستونِ کوتاه‌تر معلق می‌ماند. */}
      <Sec className="mx-auto max-w-5xl px-5 pt-24 sm:px-6 sm:pt-32" mark="OVERVIEW" icon={Compass}>
        <Eyebrow icon={Compass}>{t.briefLabel}</Eyebrow>
        <h2 className="-mt-4 max-w-[20ch] text-balance font-light leading-[1.14] text-[clamp(1.8rem,4.8vw,3.2rem)]">
          {t.briefHead}
        </h2>
        <p className="mt-5 max-w-md text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
          {t.briefLede}
        </p>

        <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-[1.1fr_1fr]">
          {/* فهرستِ فصل‌ها، با میلهٔ نسبتِ درس‌ها */}
          <div className="border-t pt-2" style={{ borderColor: INK }}>
            <ol>
              {MISSIONS.map((m) => (
                <li
                  key={m.no}
                  className="flex items-center gap-4 border-b py-3.5"
                  style={{ borderColor: LINE }}
                >
                  <span className="shrink-0 text-[0.68rem] tabular-nums" style={{ color: MUTE }}>
                    {m.no}
                  </span>
                  <span className="flex-1 text-[0.88rem]" dir="ltr">
                    {m.chapter[lang]}
                  </span>
                  <span
                    className="w-6 shrink-0 text-end text-[0.68rem] tabular-nums"
                    style={{ color: MUTE }}
                  >
                    {num(m.episodes.length)}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/*
            قیمت، در همان قاب.

            جدا کردنش به سکشنِ دیگر یعنی خواننده باید دوباره دنبالش
            بگردد. کنارِ فهرستِ فصل‌ها، سؤال و جواب در یک نگاه‌اند.
          */}
          <div className="flex flex-col border-t pt-2" style={{ borderColor: INK }}>
            <p className="neo-cap py-3.5 text-[0.66rem]" style={{ color: MUTE }}>
              {price.title}
            </p>

            {/* عددِ درشت — تنها جایی از صفحه که عدد، تصویر است */}
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-light leading-none tabular-nums text-[clamp(2.6rem,7vw,4.4rem)]">
                {price.tiers[0].price}
              </span>
              <span className="text-sm" style={{ color: MUTE }}>
                {price.unit}
              </span>
            </p>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-3 text-sm">
              <span className="tabular-nums line-through" style={{ color: MUTE }}>
                {price.full}
              </span>
              <span style={{ color: INK }}>{price.tiers[0].off}</span>
              <span style={{ color: MUTE }}>· {price.tiers[0].seat}</span>
            </p>

            <ol className="mt-8">
              {price.tiers.slice(1).map((tier) => (
                <li
                  key={tier.seat}
                  className="flex items-baseline gap-4 border-t py-3"
                  style={{ borderColor: LINE }}
                >
                  <span className="flex-1 text-[0.8rem]" style={{ color: MUTE }}>
                    {tier.seat}
                  </span>
                  <span className="tabular-nums text-[0.85rem]">{tier.price}</span>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-xs leading-relaxed" style={{ color: MUTE }}>
              {price.note}
            </p>

            <OpenNote
              text={t.openAt}
              color={VIOLET_INK}
              className="mt-auto"
              size="text-[0.85rem]"
            />
          </div>
        </div>
      </Sec>

      {/* ── مسیرِ دوره ── */}
      <Sec className="mx-auto max-w-5xl px-5 sm:px-6" mark="PATH" icon={Route}>
        <div className="flex min-h-[62dvh] flex-col items-center justify-center py-24 text-center sm:min-h-[70dvh]">
          <h2 className="max-w-[20ch] text-balance font-light leading-[1.12] text-[clamp(2rem,6vw,4.25rem)]">
            {t.pathTitle}
          </h2>
          <p
            className="mt-6 max-w-md text-balance text-sm leading-loose sm:text-base"
            style={{ color: MUTE }}
          >
            {t.pathLede}
          </p>
        </div>
        <PathStack path={t.path} lang={lang} />
      </Sec>

      {/* ── ابزارها ──
          در بنتو فقط چهار چیپ بود، و چیپ هیچ‌چیز نمی‌گوید.

          سؤالِ واقعیِ خواننده «چه ابزارهایی؟» نیست — اسمشان را همه
          شنیده‌اند. سؤال این است که «داخلِ هرکدام چه چیزی هست که من
          نمی‌دانم؟» و جوابش دقیقاً همان است که فصلِ دوم را می‌فروشد.
          پس هر ابزار یک کارتِ کامل شد: نقشش در یک خط، شش جزءِ داخلش،
          و یک جملهٔ نظر — همان چیزی که یک فهرستِ لوگو هرگز ندارد. */}
      <Sec className="mx-auto max-w-5xl px-5 pt-20 sm:px-6 sm:pt-24" mark="TOOLS" icon={Boxes}>
        <Eyebrow icon={Boxes}>{t.toolsLabel}</Eyebrow>
        <h2 className="-mt-4 max-w-[18ch] text-balance font-light leading-[1.12] text-[clamp(1.7rem,4.4vw,2.9rem)]">
          {tools.title}
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
          {tools.lede}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {tools.items.map((tool, i) => (
            <div
              key={tool.name}
              className="flex flex-col rounded-none border p-6 sm:p-7"
              style={{ borderColor: LINE, background: CARD }}
            >
              {/* لوگو بالای اسم، نه کنارش: سه کارتِ هم‌شکل با یک
                  نشانهٔ بزرگ در بالا، از یک نگاه از هم جدا می‌شوند. */}
              <div className="flex items-start justify-between gap-3">
                <span
                  className="flex h-9 items-center"
                  style={{ color: VIOLET_INK }}
                  aria-hidden="true"
                >
                  {(() => {
                    const Mark = TOOL_MARKS[i % TOOL_MARKS.length];
                    return <Mark className="h-full w-auto" />;
                  })()}
                </span>
                <span className="text-[0.65rem] tabular-nums" style={{ color: VIOLET }} dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold sm:text-xl">{tool.name}</h3>
              <p className="mt-1.5 text-[0.8rem]" style={{ color: MUTE }}>
                {tool.role}
              </p>
              {/* اجزا — همان چیزی که «ابزار» را از «اسم» جدا می‌کند */}
              <ul className="mt-5">
                {tool.parts.map((part) => (
                  <li
                    key={part}
                    className="flex items-baseline gap-2.5 border-t py-2 text-[0.78rem]"
                    style={{ borderColor: LINE }}
                  >
                    <span
                      className="size-1 shrink-0 rounded-none"
                      style={{ background: VIOLET }}
                      aria-hidden="true"
                    />
                    <span className="flex-1">{part}</span>
                  </li>
                ))}
              </ul>
              <p
                className="mt-auto border-t pt-5 text-[0.78rem] leading-relaxed"
                style={{ borderColor: LINE, color: MUTE }}
              >
                {tool.note}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-none border border-dashed px-5 py-4 text-[0.8rem]"
          style={{ borderColor: LINE, color: MUTE }}
        >
          <span style={{ color: VIOLET_INK }}>{tools.more}</span>
          {tools.moreNote}
        </p>
      </Sec>

      {/* ── قالبِ فصل ──
          «ویدیوی ضبط‌شده» یک خانهٔ بنتو بود و عملاً هیچ نمی‌گفت.
          آنچه واقعاً تحویل داده می‌شود چهار چیز است، و یکی‌شان —
          جزوه — همان چیزی است که به کسی که هنوز حساب نخریده اجازه
          می‌دهد دنبال کند. این را نگفتن، فروختنِ کمتر است نه بیشتر. */}
      <Sec className="mx-auto max-w-5xl px-5 pt-20 sm:px-6 sm:pt-24" mark="FORMAT" icon={MonitorPlay}>
        <Eyebrow icon={MonitorPlay}>{t.formatLabel}</Eyebrow>
        <h2 className="-mt-4 max-w-[20ch] text-balance font-light leading-[1.12] text-[clamp(1.7rem,4.4vw,2.9rem)]">
          {format.title}
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
          {format.lede}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {format.items.map((f, i) => {
            const Icon = [MonitorPlay, Boxes, FileText, ListOrdered][i];
            return (
              <div
                key={f.t}
                className="relative overflow-hidden rounded-none border p-6 sm:p-7"
                style={{ borderColor: LINE, background: CARD }}
              >
                {/* شمارهٔ کم‌رنگِ پس‌زمینه — همان زبانِ «پیش از شروع» */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-5 select-none font-light leading-none text-[6rem]"
                  style={{ color: INK, opacity: 0.045, insetInlineEnd: "0.5rem" }}
                >
                  {i + 1}
                </span>
                <Icon
                  className="size-5"
                  strokeWidth={1.6}
                  style={{ color: VIOLET }}
                  aria-hidden="true"
                />
                <h3 className="relative mt-6 text-[0.95rem] font-semibold">{f.t}</h3>
                <p className="relative mt-2.5 text-[0.82rem] leading-relaxed" style={{ color: MUTE }}>
                  {f.d}
                </p>
              </div>
            );
          })}
        </div>

        <p
          className="mt-4 rounded-none border p-6 text-sm leading-loose sm:p-7 sm:text-[0.95rem]"
          style={{ borderColor: LINE, background: CARD }}
        >
          {format.note}
        </p>
      </Sec>

      {/* ── اسلایدها ──
          بلافاصله بعد از «قالبِ فصل»، چون آنجا از دک حرف زده شد و
          اینجا نشانش می‌دهیم.

          ادعای «اسلایدِ دقیق» را هر صفحه‌ای می‌کند؛ نشان دادنش را
          نه. این چهارتا عکسِ همان فایل‌هایی است که سرِ کلاس باز
          می‌شوند — بدونِ بازسازی و بدونِ تمیزکاری، با همان شمارهٔ
          صفحه و پاورقی که در دک هست. */}
      <Sec className="mx-auto max-w-5xl px-5 pt-24 sm:px-6 sm:pt-32" mark="SLIDES" icon={Images}>
        <Eyebrow icon={Images}>{slides.title}</Eyebrow>
        <p className="-mt-4 max-w-xl text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
          {slides.lede}
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {slides.items.map((sl) => (
            <li key={sl.src}>
              {/*
                نسبتِ ۱۶:۹ روی خودِ قاب قفل شده.

                تصویرها همه یک اندازه‌اند، ولی اگر به ارتفاعِ طبیعی
                رها شوند، تا وقتی بارگذاری نشده‌اند ارتفاعشان صفر است
                و صفحه موقعِ آمدنشان می‌پرد.
              */}
              <div
                className="overflow-hidden border"
                style={{ borderColor: LINE, aspectRatio: "16 / 9" }}
              >
                <Image
                  src={sl.src}
                  alt={sl.cap}
                  width={1536}
                  height={864}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 text-[0.76rem]" style={{ color: MUTE }}>
                {sl.cap}
              </p>
            </li>
          ))}
        </ul>
      </Sec>

      {/* ── برای چه کسی ──
          هر بند حالا یک دلیل هم دارد.

          «دنبالِ فهرستِ پرامپت آماده‌ای» به‌تنهایی یک برچسب است و
          خواننده خودش را در آن نمی‌بیند. جمله‌ای که *چرا* را می‌گوید،
          هم قانع می‌کند و هم — مهم‌تر — کسی را که نباید بخرد بیرون
          می‌گذارد. همین است که باقیِ ادعاهای صفحه را باورپذیر می‌کند. */}
      <Sec className="mx-auto max-w-5xl px-5 pt-20 sm:px-6 sm:pt-24" mark="AUDIENCE" icon={Users} dark>
        <Eyebrow icon={Users}>{t.forTitle}</Eyebrow>
        {/*
          تیترِ این بخش، جمله‌ای است که تا پیش از این روی صفحهٔ
          ترمینالِ بنتو نوشته بود. با رفتنِ بنتو، تنها چیزِ آن شبکه
          که جای دیگری تکرار نشده بود همین بود — و اینجا بهتر هم
          می‌نشیند: درست بالای دو ستونی که می‌گویند این دوره برای
          توست یا نه.
        */}
        <h2 className="-mt-4 max-w-[22ch] text-balance font-light leading-[1.12] text-[clamp(1.7rem,4.4vw,2.9rem)]">
          {t.forHead}
        </h2>
        <p className="mt-5 mb-10 max-w-xl text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
          {t.forLede}
        </p>
        <div className="grid items-stretch gap-4 md:grid-cols-2">
          <FitList title={t.forYes} items={fit.yes} tone="yes" />
          <FitList title={t.forNo} items={fit.no} tone="no" />
        </div>
      </Sec>

      {/* ── سرفصل‌ها ── */}
      <Sec
        id="outline"
        className="mx-auto max-w-4xl scroll-mt-8 px-5 pt-20 sm:px-6 sm:pt-24"
        mark="SYLLABUS"
        icon={ListOrdered}
      >
        <Eyebrow icon={ListOrdered}>{t.outline}</Eyebrow>
        <p className="-mt-5 max-w-lg text-sm leading-relaxed" style={{ color: MUTE }}>
          {t.outlineLede}
        </p>

        {/*
          دفترِ وضعیت.

          چند فصل ضبط شده و چند فصل نه — از خودِ `draft` خوانده
          می‌شود، نه از یک عددِ دستی که فردا کهنه شود.

          گفتنِ اینکه نصفِ دوره هنوز آماده نیست، روی یک صفحهٔ فروش
          عجیب است. ولی خواننده این را از فهرستِ پایین به‌هرحال
          می‌فهمد؛ فرقش این است که وقتی خودت اول گفته باشی، بقیهٔ
          حرف‌هایت هم باور می‌شود.
        */}
        <div
          className="mb-9 mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-5 text-xs"
          style={{ borderColor: LINE, color: MUTE }}
        >
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5" style={{ background: INK }} />
            {num(MISSIONS.filter((m) => !m.draft).length)} {t.readyCount}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5" style={{ background: VIOLET_INK }} />
            {num(MISSIONS.filter((m) => m.draft).length)} {t.draftCount}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5" style={{ background: LINE }} />
            {num(EPISODE_COUNT)} {t.lessons}
          </span>
        </div>
        {/*
          هر فصل یک کارت است، نه یک ردیف.

          با `border-t` تنها، هفت فصل یک ستونِ بلندِ بی‌وزن می‌شدند و
          چشم هیچ‌جا فرود نمی‌آمد — همان چیزی که صفحه را «خام» نشان
          می‌داد. قاب و زمینهٔ کارت، هر فصل را یک شیءِ مستقل می‌کند که
          جای خودش را اشغال می‌کند، و نوارِ مشخصات زیرِ عنوان همان
          کاری را می‌کند که برچسبِ پشتِ جلدِ کتاب: قبل از خواندن،
          اندازه را می‌گوید.
        */}
        <ol className="grid gap-4">
          {MISSIONS.map((m, i) => (
            <li
              key={m.no}
              className="relative overflow-hidden rounded-none border p-6 sm:p-8"
              style={{ borderColor: LINE, background: CARD }}
            >
              {/*
                نوارِ لهجه — تنها چیزی که از سیاره‌ها باقی ماند.

                نامِ سیاره حذف شد چون به خواننده چیزی نمی‌گفت، ولی
                پالتش می‌ماند: هر فصل یک رنگِ خودش دارد و در اسکرول،
                تغییرِ رنگِ همین نوار می‌گوید فصل عوض شده — بی‌آنکه
                لازم باشد چیزی خوانده شود.
              */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 start-0 w-1"
                style={{ background: m.base }}
              />

              <div className="relative min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="text-xs tabular-nums" style={{ color: VIOLET_INK }} dir="ltr">
                    {m.no} — {MISSIONS.length.toString().padStart(2, "0")}
                  </span>
                  <span
                    className="rounded-none px-2 py-0.5 text-[0.65rem]"
                    style={
                      m.draft
                        ? { background: "rgba(26,23,20,.06)", color: MUTE }
                        : { background: "rgba(26,23,20,.9)", color: PAPER }
                    }
                  >
                    {m.draft ? t.soon : t.ready}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                  {/* فعلِ امری جلو می‌آید، عنوانِ فصل پشتش.
                      «متفاوت فکر کن» چیزی از تو می‌خواهد؛ «AI Thinking»
                      فقط اسمِ یک موضوع است. */}
                  <h3 className="text-xl font-bold sm:text-3xl">{m.action[lang]}</h3>
                  <span className="text-xs" style={{ color: MUTE }} dir="ltr">
                    {m.chapter[lang]}
                  </span>
                </div>

                <p className="mt-3 max-w-xl text-sm leading-loose" style={{ color: MUTE }}>
                  {m.body[lang]}
                </p>

                {/* نوارِ مشخصات — درس، زیرسرفصل، خروجی. عددها شمرده
                    می‌شوند نه نوشته، تا با فهرستِ زیرشان نخوانند. */}
                <dl
                  className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-y py-4"
                  style={{ borderColor: LINE }}
                >
                  <div className="flex items-baseline gap-2">
                    <dd className="text-lg font-bold tabular-nums">{num(m.episodes.length)}</dd>
                    <dt className="text-[0.72rem]" style={{ color: MUTE }}>
                      {t.lessons}
                    </dt>
                  </div>
                  {topicCount(m.no) > 0 && (
                    <div className="flex items-baseline gap-2">
                      <dd className="text-lg font-bold tabular-nums">{num(topicCount(m.no))}</dd>
                      <dt className="text-[0.72rem]" style={{ color: MUTE }}>
                        {t.metaTopics}
                      </dt>
                    </div>
                  )}
                  <div className="flex min-w-0 flex-1 items-baseline gap-2">
                    <dt className="shrink-0 text-[0.72rem]" style={{ color: VIOLET_INK }}>
                      {t.metaDeliver}
                    </dt>
                    <dd className="min-w-0 text-[0.8rem] leading-relaxed">{OUTCOME[lang][i]}</dd>
                  </div>
                </dl>

                  {/*
                    زیرِ هر درس، آنچه واقعاً باز می‌شود.

                    نسخهٔ قبل فقط نامِ درس‌ها را چیپ‌وار می‌چید، و
                    «آناتومی دستور» برای کسی که نمی‌داند چیست هیچ
                    اطلاعاتی ندارد. ولی همهٔ زیرشاخه‌ها، بازِ کامل،
                    صفحه را از سرفصل به دفترچهٔ راهنما می‌برد — پس
                    بسته می‌مانند و هرکس همان درسی را باز می‌کند که
                    برایش سؤال است.

                    فصل‌های ضبط‌نشده زیرشاخه ندارند و ردیفشان اصلاً
                    باز نمی‌شود. یک مثلثِ بازشو که پشتش خالی است،
                    بدتر از نبودنش است.
                  */}
                  <ol className="mt-6">
                    {m.episodes.map((e, j) => {
                      const topics = TOPICS[m.no]?.[j];
                      const no = lang === "fa" ? faNum(j + 1) : String(j + 1);
                      return (
                        <li key={e.en} className="border-t" style={{ borderColor: LINE }}>
                          {topics ? (
                            <details className="group">
                              <summary className="flex cursor-pointer list-none items-baseline gap-3 py-2.5 text-[0.82rem] sm:text-sm">
                                <span
                                  className="shrink-0 text-[0.65rem] tabular-nums"
                                  style={{ color: MUTE }}
                                >
                                  {no}
                                </span>
                                <span className="flex-1">{e.en}</span>
                                {/* شمارِ زیرسرفصل — هم اطلاعات است و هم
                                    وسطِ خالیِ ردیف را پر می‌کند */}
                                <span
                                  className="shrink-0 text-[0.65rem] tabular-nums"
                                  style={{ color: MUTE }}
                                >
                                  {num(topics.length)}{" "}
                                  {t.metaTopics}
                                </span>
                                <span
                                  className="shrink-0 text-sm leading-none transition-transform group-open:rotate-45"
                                  style={{ color: VIOLET_INK }}
                                  aria-hidden="true"
                                >
                                  +
                                </span>
                              </summary>
                              <ul className="flex flex-wrap gap-1.5 pb-4 ps-7">
                                {topics.map((x) => (
                                  <li
                                    key={x}
                                    className="rounded-none border px-2.5 py-1 text-[0.68rem] sm:text-[0.72rem]"
                                    style={{ borderColor: LINE, color: MUTE }}
                                  >
                                    {x}
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : (
                            <div className="flex items-baseline gap-3 py-2.5 text-[0.82rem] sm:text-sm">
                              <span
                                className="shrink-0 text-[0.65rem] tabular-nums"
                                style={{ color: MUTE }}
                              >
                                {no}
                              </span>
                              <span className="flex-1" style={{ color: MUTE }}>
                                {e.en}
                              </span>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ol>
              </div>
            </li>
          ))}
        </ol>
      </Sec>

      {/* ── پروژه ──
          یک محصول، و فقط آنچه بدونش نمی‌شود فهمید چرا این یکی
          انتخاب شده.

          نسخهٔ قبل دو محصول داشت به‌علاوهٔ هشت عددِ پژوهش، پروندهٔ
          تحویلی و فهرستِ خطاها. همه درست بود و همه زیادی: خواننده در
          این نقطه هنوز دوره را نشناخته و «۲۷ خوشه» برایش عدد است نه
          معنا. آن جزئیات جای خودشان را دارند — داخلِ فصل‌های سوم و
          چهارم، جایی که خواننده دنبالشان می‌گردد. */}
      {/*
        این سکشن هم تیره شد.

        تا حالا فقط دو نوارِ تیره در کلِ صفحه بود و فاصله‌شان آن‌قدر
        زیاد که هرکدام مثلِ یک اتفاقِ جدا خوانده می‌شد. سه‌تا که شد،
        ضرب پیدا می‌کند: کاغذ، تاریکی، کاغذ، تاریکی — و از آن به بعد
        تاریکی دیگر وقفه نیست، یکی از دو حالتِ صفحه است. هیرو هم
        همان‌جا از غریبگی درمی‌آید.

        جایش هم انتخابی است: پروژه همان چیزی است که کاربر آخرش
        می‌سازد، و بردنش روی تاریکی از یک بندِ توضیحی یک *نمایش*
        می‌سازد. کارت‌ها و خط‌ها همه از همان متغیرهای `--neo-*`
        می‌خوانند، پس با عوض‌شدنِ زمینه خودشان وارونه می‌شوند.
      */}
      <Sec className="mx-auto max-w-4xl px-5 pt-24 sm:px-6 sm:pt-32" mark="PROJECT" icon={Layers} dark>
        <div className="border-t pt-10" style={{ borderColor: LINE }}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-2xl font-bold sm:text-3xl">{proj.name}</h3>
            <span className="text-sm" style={{ color: MUTE }}>
              {proj.what}
            </span>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-loose sm:text-base">{proj.body}</p>

          {/* دلیلِ انتخاب — تنها چیزی که از این پروژه یک *درس* می‌سازد */}
          <p
            className="mt-5 max-w-2xl border-s-2 ps-5 text-sm leading-loose"
            style={{ borderColor: INK, color: MUTE }}
          >
            {proj.why}
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.78rem]" style={{ color: MUTE }}>
            {proj.out.map((o) => (
              <li key={o} className="inline-flex items-baseline gap-2">
                <span className="size-1 shrink-0" style={{ background: VIOLET }} aria-hidden="true" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </Sec>

      {/* ── پیش از شروع ──
          صادق‌بودن دربارهٔ هزینه‌ای که کاربر باید بدهد، همان‌قدر می‌فروشد
          که شمردنِ مزیت‌ها. کسی که وقت ندارد بهتر است همین‌جا برود. */}
      <Sec className="mx-auto max-w-4xl px-5 pt-20 sm:px-6 sm:pt-24" mark="SETUP" icon={KeyRound}>
        <Eyebrow icon={KeyRound}>{t.needTitle}</Eyebrow>
        {/*
          سه چیزی که کاربر باید *بیاورد*، نه سه چیزی که می‌گیرد.

          هر ستون یک نشانه دارد و یک شمارهٔ کم‌رنگ. بدونِ آن‌ها، این
          بخش سه پاراگرافِ هم‌شکل بود و چشم هیچ جایی برای فرود نداشت —
          دقیقاً همان چیزی که یک سکشن را «تنبل» نشان می‌دهد.
        */}
        {/*
          پنج چیز، نه سه.

          سه‌تای قبلی عمومی بودند («یک کامپیوتر و حساب‌های رایگان») و
          هر دوره‌ای می‌توانست همان را بنویسد. پنج‌تای الان از خودِ
          اسلایدِ `Setup` درآمده‌اند، و آخری — یک دفتر — همان چیزی است
          که ثابت می‌کند این فهرست از یک دورهٔ واقعی آمده نه از یک
          قالبِ لندینگ.

          آخری عرضِ کامل می‌گیرد، چون ابزار نیست و نباید کنارِ ابزارها
          در یک ستون بنشیند.
        */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {need.slice(0, 4).map((n, i) => {
            const Icon = [Sparkles, KeyRound, Boxes, Terminal][i];
            return (
              <div
                key={n.t}
                className="relative overflow-hidden rounded-none border p-6 sm:p-7"
                style={{ borderColor: LINE, background: CARD }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-4 select-none font-light leading-none text-[5.5rem]"
                  style={{ color: INK, opacity: 0.05, insetInlineEnd: "0.75rem" }}
                >
                  {i + 1}
                </span>
                <Icon
                  className="size-5"
                  strokeWidth={1.6}
                  style={{ color: VIOLET }}
                  aria-hidden="true"
                />
                <h3 className="relative mt-5 text-[0.95rem] font-semibold">{n.t}</h3>
                <p className="relative mt-2.5 text-[0.82rem] leading-relaxed" style={{ color: MUTE }}>
                  {n.d}
                </p>
              </div>
            );
          })}
        </div>

        <div
          className="mt-4 flex flex-col gap-5 rounded-none border p-6 sm:flex-row sm:items-center sm:p-8"
          style={{ borderColor: VIOLET_INK, background: CARD }}
        >
          <Clock
            className="size-6 shrink-0"
            strokeWidth={1.5}
            style={{ color: VIOLET }}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <h3 className="text-[0.95rem] font-semibold sm:text-base">{need[4].t}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>
              {need[4].d}
            </p>
          </div>
        </div>
      </Sec>

      {/* ── یادداشت ── */}
      <Sec className="mx-auto max-w-3xl px-5 pt-20 sm:px-6 sm:pt-24">
        <div
          className="rounded-none border p-7 sm:p-11"
          style={{ borderColor: LINE, background: CARD }}
        >
          <BrandGlyph size={30} style={{ color: VIOLET }} />
          <h2 className="mt-5 text-xl font-bold sm:text-2xl">{t.noteTitle}</h2>
          <p className="mt-4 text-sm leading-loose sm:text-base">{t.note}</p>
          {/* پاراگرافِ دوم — همان جمله‌ای که در اسلایدِ معرفی است.
              «شکست‌ها هم داخلش است» چیزی است که هیچ صفحهٔ فروشی
              نمی‌گوید، و دقیقاً به همین دلیل باور می‌شود. */}
          <p className="mt-4 text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
            {t.note2}
          </p>
          <div
            className="mt-8 border-t pt-5"
            style={{ borderColor: LINE }}
          >
            <p className="text-sm font-semibold">{t.noteBy}</p>
            <p className="mt-1.5 text-xs leading-relaxed" style={{ color: MUTE }}>
              {t.noteRole}
            </p>
          </div>
        </div>
      </Sec>

      {/* ── ثبت‌نام ──
          پیش از سؤال‌ها می‌آید، نه بعدشان: کسی که تا اینجا خوانده تصمیمش را
          گرفته، و نباید مجبور شود از پنج سؤال رد شود تا راهِ ثبت‌نام را
          پیدا کند. سؤال‌ها برای کسی است که هنوز مردد است. */}
      <Sec className="mx-auto max-w-3xl px-5 pt-20 sm:px-6 sm:pt-24" mark="PRICING" icon={Ticket} dark>
        <Eyebrow icon={Ticket}>{t.joinTitle}</Eyebrow>
        <div
          className="mt-8 rounded-none border p-7 sm:p-11"
          style={{ borderColor: LINE, background: CARD }}
        >
          <h2 className="text-xl font-bold sm:text-2xl">{t.joinHead}</h2>
          <p className="mt-4 text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
            {t.joinBody}
          </p>

          {/*
            سه قدم، شماره‌دار.

            «در تلگرام پیام بده» به‌تنهایی یک درِ بسته است: کاربر
            نمی‌داند بعدش چه می‌شود و همین نادانی، مکث می‌سازد. وقتی
            هر سه قدم از پیش نوشته شده باشد، دکمه دیگر یک ریسک نیست.
          */}
          <ol className="mt-8 grid gap-px overflow-hidden rounded-none border sm:grid-cols-3"
            style={{ borderColor: LINE, background: LINE }}
          >
            {t.steps.map((st, i) => (
              <li key={st.t} className="p-5" style={{ background: PAPER }}>
                <span
                  className="flex size-6 items-center justify-center rounded-none text-[0.65rem] font-semibold tabular-nums"
                  style={{ background: VIOLET_INK, color: PAPER }}
                >
                  {num(i + 1)}
                </span>
                <p className="mt-3.5 text-[0.85rem] font-semibold">{st.t}</p>
                <p className="mt-1.5 text-[0.78rem] leading-relaxed" style={{ color: MUTE }}>
                  {st.d}
                </p>
              </li>
            ))}
          </ol>

          <OpenNote text={t.openAt} color={VIOLET_INK} className="mt-7" />
          <p className="mt-4 text-xs" style={{ color: MUTE }}>
            {t.joinNote}
          </p>
        </div>
      </Sec>

      {/* ── سؤال‌ها ── */}
      <Sec className="mx-auto max-w-3xl px-5 pt-20 sm:px-6 sm:pt-24" mark="FAQ" icon={MessagesSquare}>
        <Eyebrow icon={MessagesSquare}>{t.faqTitle}</Eyebrow>
        <div>
          {t.faq.map((f) => (
            <details key={f.q} className="group border-t py-5" style={{ borderColor: LINE }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.95rem] font-semibold sm:text-base">
                {f.q}
                <span
                  className="shrink-0 text-lg transition-transform group-open:rotate-45"
                  style={{ color: VIOLET_INK }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: MUTE }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Sec>


      {/* ── پایان ──
          آخرین چیزی که خوانده می‌شود باید یک کار باشد.

          کسی که تا اینجا آمده سؤالش را پرسیده و جوابش را گرفته. اگر
          این پایین دکمه‌ای نباشد، باید تا بالای صفحه برگردد — و کسی
          این کار را نمی‌کند.

          دکمهٔ دوم به خودِ مدرسه می‌رود، برای کسی که هنوز تصمیم
          نگرفته و نباید به بن‌بست بخورد. */}
      <Sec className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-6 sm:py-32">
        <h2 className="text-2xl font-bold sm:text-4xl">{t.finalTitle}</h2>
        <p className="mt-4 text-sm sm:text-base" style={{ color: MUTE }}>
          {t.finalBody}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <OpenNote text={t.openAt} color={VIOLET_INK} size="text-base" />
          <Link
            href="/"
            className="inline-flex items-center gap-2 border px-6 py-4 text-sm transition-opacity hover:opacity-70"
            style={{ borderColor: LINE }}
          >
            {t.back}
          </Link>
        </div>

        <p className="mt-8 text-xs" style={{ color: MUTE }}>
          {t.joinNote}
        </p>
      </Sec>

      {/* ── فوتر ──
          صفحه با یک پیکره باز می‌شود؛ اگر روی یک خطِ متن تمام شود،
          حسِ «تمام شد» نمی‌دهد، حسِ «قطع شد» می‌دهد.

          ولی پیکرهٔ دوم هم لازم نیست — همان یکی در هیرو کارش را کرده.
          اینجا فقط ردِ او می‌ماند: ردیفی از سرهای محو پشتِ نشان، و
          لبه‌ای صاف که بی‌مقدمه به سیاهی می‌رود. محوکردنِ لبه امتحان
          شد و نتیجه‌اش لکهٔ خاکستری بود، نه گذر. */}
      <footer
        className="relative isolate mt-24 overflow-hidden"
        style={{ background: NIGHT, color: NIGHT_INK, ["--robot-cut" as string]: NIGHT }}
      >
        <RobotPattern
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ color: NIGHT_INK, opacity: 0.038 }}
        />
        {/* آخرین سطحِ تیرهٔ صفحه هم باید همان جنسِ هیرو را داشته باشد */}
        <Grain blend="screen" opacity={0.07} />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 py-24 text-center sm:px-6 sm:py-28">
          <p className="neo-cap text-[0.7rem]" style={{ color: NIGHT_MUTE }} dir="ltr">
            {t.kicker}
          </p>
          <p
            className="mt-5 text-[clamp(2.6rem,11vw,6rem)] leading-none"
            style={{
              fontFamily: "var(--font-wordmark), var(--font-space-grotesk), sans-serif",
              letterSpacing: "-0.02em",
            }}
            dir="ltr"
          >
            {WORDMARK}
          </p>
          <p className="mt-4 text-[0.78rem] tracking-[0.22em]" style={{ color: NIGHT_MUTE }} dir="ltr">
            {t.wordSub}
          </p>

          <div className="mt-8">
            <LangPick lang={lang} line={NIGHT_LINE} ink={NIGHT_INK} mute={NIGHT_MUTE} bg={NIGHT} />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <OpenNote text={t.openAt} color={NIGHT_INK} />
            <Link
              href="/"
              className="inline-flex items-center gap-2 border px-5 py-3.5 text-sm transition-opacity hover:opacity-70"
              style={{ borderColor: NIGHT_LINE }}
            >
              {t.back}
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

/**
 * سه مرحلهٔ مسیر، به‌صورتِ پشتهٔ کارت.
 *
 * هر کارت در جای خودش می‌چسبد و کارتِ بعدی از زیر بالا می‌آید و
 * رویش می‌نشیند. کارتِ پوشیده‌شده هم‌زمان کوچک می‌شود و کمی تیره —
 * همان دو نشانه‌ای که «رفت زیرِ آن یکی» را می‌سازند. بدونشان، کارت
 * جدید فقط قبلی را پاک می‌کند و حسِ عمق از بین می‌رود.
 *
 * این حرکت برای سه مرحله جواب می‌دهد و برای هفت فصل نه: پشته وقتی
 * معنا دارد که تعدادش کم و ترتیبش روایت باشد. هفت کارتِ روی هم،
 * فهرستی می‌شود که خواننده مجبور است برای دیدنِ آخرش کلِ صفحه را
 * رد کند — و سرفصل چیزی است که باید بشود سریع مرورش کرد.
 */
/**
 * سه مرحله روی هفت فصل.
 *
 * کارتِ سوم فقط فصلِ آخر را می‌گیرد، نه دوتای آخر را. «رساندن»
 * یعنی همان Vibe Coding؛ فصلِ ششم هنوز طراحیِ رابط است و کنارِ
 * انتشار گذاشتنش، هر دو را مبهم می‌کرد.
 */
const STAGE_RANGE = [
  [0, 1],
  [2, 5],
  [6, 6],
] as const;

function PathStack({
  path,
  lang,
}: {
  path: readonly { readonly n: string; readonly t: string; readonly d: string }[];
  lang: Lang;
}) {
  const wide = useWide();

  if (!wide) {
    return (
      <ol className="space-y-4">
        {path.map((s, i) => (
          <li key={s.n}>
            <PathCard s={s} lang={lang} range={STAGE_RANGE[i]} index={i} total={path.length} />
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol>
      {path.map((s, i) => (
        <StackItem key={s.n} index={i} total={path.length}>
          <PathCard s={s} lang={lang} range={STAGE_RANGE[i]} index={i} total={path.length} />
        </StackItem>
      ))}
    </ol>
  );
}

/**
 * آیا چیدمانِ دسکتاپ است؟
 *
 * پشتهٔ کارت به ارتفاعِ ثابت نیاز دارد و روی صفحهٔ کوچک، کارتی که
 * محتوایش از قاب بلندتر است زیرِ کارتِ بعدی بریده می‌شود. پس روی
 * موبایل به فهرستِ معمولی برمی‌گردیم — همان محتوا، بدونِ پشته.
 */
function useWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return wide;
}

/** یک پلهٔ پشته: می‌چسبد، و وقتی رد شد کوچک و تیره می‌شود */
function StackItem({
  index,
  total,
  children,
}: {
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // از لحظه‌ای که کارت به بالای قاب می‌رسد تا وقتی پایینش رد می‌شود
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 18%", "end 18%"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.42]);

  return (
    <li
      ref={ref}
      className="sticky h-[80vh]"
      // هر کارت کمی پایین‌تر از قبلی، تا لبهٔ زیرین‌ها دیده شود
      style={{ top: `calc(6rem + ${index * 16}px)`, zIndex: index + 1 }}
    >
      <motion.div style={{ scale }} className="origin-top">
        <div className="relative">
          {children}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-none"
            style={{ opacity: shade, background: INK }}
          />
        </div>
      </motion.div>
      <span className="sr-only">
        {index + 1} / {total}
      </span>
    </li>
  );
}

/**
 * محتوای یک مرحله — در هر دو چیدمان یکی است.
 *
 * نسخهٔ اول یک شماره، یک تیتر و یک پاراگراف بود، و مشکلش این بود که
 * دقیقاً همان سه‌تا را می‌شد روی هر دورهٔ دیگری هم گذاشت. چیزی که این
 * کارت را به *این* دوره وصل می‌کند، فصل‌هایی است که واقعاً داخلِ آن
 * مرحله‌اند — با شماره، اسم و تعدادِ درس — و آنچه در انتهایش در دست
 * داری.
 *
 * عددِ غول‌پیکرِ کم‌رنگِ گوشه کارِ دیگری می‌کند: در پشتهٔ کارت‌ها که
 * لبه‌های زیرین دیده می‌شوند، همین عدد است که از دور می‌گوید کدام
 * کارت رویِ کدام است.
 */
function PathCard({
  s,
  lang,
  range,
  index,
  total,
}: {
  s: { readonly n: string; readonly t: string; readonly d: string };
  lang: Lang;
  range: readonly [number, number];
  index: number;
  total: number;
}) {
  const missions = MISSIONS.slice(range[0], range[1] + 1);
  const outcome = OUTCOME[lang][range[1]];
  const stage =
    lang === "fa" ? `مرحلهٔ ${s.n} از ${faNum(total)}` : `Stage ${s.n} of ${total}`;
  const after = lang === "fa" ? "در انتهای این مرحله" : "At the end of this stage";
  const lessonWord = lang === "fa" ? "درس" : "lessons";

  const Art = STAGE_ART[index];

  return (
    <article
      className="relative grid gap-8 overflow-hidden rounded-none border p-7 shadow-[0_18px_50px_-32px_rgba(26,23,20,.5)] sm:p-11 md:grid-cols-[1fr_auto] md:items-center md:gap-12"
      style={{ borderColor: LINE, background: CARD }}
    >
      {/* عددِ سایه — تزئین نیست، نشانگرِ جای کارت در پشته است */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 select-none font-light leading-none text-[10rem] sm:text-[13rem]"
        style={{ color: INK, opacity: 0.045, insetInlineEnd: "1.5rem" }}
      >
        {s.n}
      </span>

      <div className="relative">
        <span className="neo-cap text-[0.66rem]" style={{ color: VIOLET_INK }}>
          {stage}
        </span>
        <h3 className="mt-3 text-2xl font-normal sm:text-4xl">{s.t}</h3>
        <p className="mt-4 max-w-xl text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
          {s.d}
        </p>

        {/* فصل‌هایی که واقعاً داخلِ این مرحله‌اند */}
        <ol className="mt-7 max-w-xl">
          {missions.map((m) => (
            <li
              key={m.no}
              className="flex items-baseline gap-3 border-t py-2.5 text-sm sm:gap-4"
              style={{ borderColor: LINE }}
            >
              <span className="shrink-0 text-[0.68rem] tabular-nums" style={{ color: VIOLET }}>
                {m.no}
              </span>
              <span className="flex-1">{m.chapter[lang]}</span>
              <span className="shrink-0 text-[0.68rem] tabular-nums" style={{ color: MUTE }}>
                {lang === "fa" ? faNum(m.episodes.length) : m.episodes.length} {lessonWord}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-6 max-w-xl text-[0.82rem] leading-relaxed" style={{ color: MUTE }}>
          <span style={{ color: VIOLET_INK }}>{after} — </span>
          {outcome}
        </p>

        {/* ریلِ مرحله — سه خطِ کوتاه که یکی‌شان پُر است */}
        <div className="mt-8 flex gap-1.5" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className="h-0.5 flex-1 rounded-none"
              style={{ background: i <= index ? VIOLET_INK : LINE }}
            />
          ))}
        </div>
      </div>

      {/*
        تصویرِ عمودیِ مرحله.

        روی موبایل بالای متن می‌آید و کوتاه می‌شود؛ ستونِ باریکِ کنارِ
        متن آنجا وجود ندارد. ارتفاعش ثابت است نه نسبی، چون سه کارت باید
        هم‌قد دیده شوند حتی وقتی متنشان هم‌اندازه نیست.
      */}
      <div
        className="order-first mx-auto h-40 w-[7.5rem] shrink-0 md:order-none md:mx-0 md:h-[19rem] md:w-[13.5rem]"
        aria-hidden="true"
      >
        <Art />
      </div>
    </article>
  );
}

/**
 * یک خانهٔ بنتو.
 *
 * چهار تصمیم:
 *
 *   `flex-col` است تا هرچه `mt-auto` دارد به کفِ خانه بچسبد. در
 *   خانه‌های بلند، تیتر باید پایین بنشیند نه وسطِ فضای خالی — وگرنه
 *   ارتفاعِ نابرابرِ خانه‌ها به‌جای ریتم، بی‌نظمی می‌سازد.
 *
 *   رنگِ زمینه و خط از بیرون می‌آید، به‌شکلِ `MotionValue`. خانه
 *   خودش نمی‌داند تم روشن است یا تیره؛ فقط رنگی را که به آن داده‌اند
 *   می‌پوشد. همین است که اجازه می‌دهد کلِ بخش با اسکرول تم عوض کند
 *   بی‌آنکه هیچ خانه‌ای دوباره رندر شود.
 *
 *   ظاهرشدن پلکانی است، با تأخیرِ ۴۵ میلی‌ثانیه به ازای هر خانه. اگر
 *   همه با هم بیایند، شبکه «لود شد» می‌خواند؛ پلکانی که بیایند،
 *   «چیده شد».
 *
 *   هاور فقط ۱٫۰۲ برابر بزرگ می‌کند. بیشتر از این، خانه از شبکه بیرون
 *   می‌زند و لبه‌اش با همسایه هم‌تراز نمی‌ماند.
 */

/** یک عددِ «در یک نگاه» — عددِ درشت، برچسبِ ریزِ زیرش */

/**
 * قابِ نازکِ صحنه.
 *
 * چهار خطِ مو، هم‌فاصله از چهار لبه. هیچ اطلاعاتی نمی‌دهند و
 * کارشان فقط این است که مرکزِ قاب را تعریف کنند: وقتی جسم دقیقاً
 * وسطِ این چهار خط بنشیند، چشم قرینگی را می‌بیند حتی اگر خطوط را
 * آگاهانه نبیند. بدونشان، همان جسم «کج افتاده» به‌نظر می‌رسد.
 */

/** برچسبِ بالای هر بخش — یک شکل، همه‌جا */
/**
 * تیترِ کوچکِ بالای هر سکشن.
 *
 * خطِ کوتاهِ قبلی فقط یک جداکننده بود. آیکن همان جا می‌نشیند و یک
 * کار بیشتر می‌کند: وقتی خواننده صفحه را تند بالا و پایین می‌کند،
 * نشانه‌ها زودتر از حروف دیده می‌شوند و می‌فهمد کجای صفحه است.
 * داخلِ یک قابِ مربعِ بی‌گِردی، مثلِ بقیهٔ صفحه.
 */
/**
 * جای دکمهٔ ثبت‌نام، تا وقتی ثبت‌نام باز شود.
 *
 * دکمه‌ها برداشته شده‌اند، نه خاموش. دکمهٔ غیرفعال یک وعدهٔ شکسته
 * است: چشم آن را می‌بیند، دست می‌رود سمتش، و هیچ اتفاقی نمی‌افتد.
 * یک خط نوشته همان خبر را بدونِ آن تعارف می‌دهد.
 *
 * ساعت با آیکن می‌آید چون بدونِ آن، این جمله در میانِ متنِ صفحه گم
 * می‌شود — و این تنها چیزی است که همین الان باید خوانده شود.
 */
function OpenNote({
  text,
  color,
  className,
  size = "text-sm",
}: {
  text: string;
  color: string;
  className?: string;
  size?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 font-semibold ${size} ${className ?? ""}`}
      style={{ color }}
    >
      <Clock className="size-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
      {text}
    </p>
  );
}

/**
 * انتخابِ زبان.
 *
 * این صفحه نوار و فوترِ سایت را ندارد، پس کلیدِ زبانِ همیشگی هم اینجا
 * نیست. و چون زبان در کوکی می‌ماند، کسی که یک‌بار جای دیگری انگلیسی
 * را زده باشد اینجا هم انگلیسی می‌بیند و **هیچ راهی برای برگشتن
 * ندارد** جز دست‌کاریِ آدرس. همین یک دکمه آن بن‌بست را می‌بندد.
 *
 * کاری که می‌کند همان کارِ `LangSwitch` سایت است — `?lang` را به
 * همین آدرس می‌چسباند و پروکسی کوکی را می‌نویسد — ولی ظاهرش مربعی و
 * تک‌رنگ است تا با بقیهٔ صفحه یکی باشد.
 */
function LangPick({
  lang,
  line,
  ink,
  mute,
  bg,
}: {
  lang: Lang;
  line: string;
  ink: string;
  mute: string;
  bg: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function go(next: Lang) {
    if (next === lang) return;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    start(() => {
      router.push(url.pathname + url.search);
      // بدونِ این، نسخهٔ کش‌شدهٔ زبانِ قبلی سرِ جایش می‌ماند
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex border"
      style={{ borderColor: line, opacity: pending ? 0.6 : 1 }}
    >
      {(["fa", "en"] as const).map((code) => {
        const on = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => go(code)}
            aria-pressed={on}
            className="px-2.5 py-2 text-[0.68rem] leading-none transition-opacity hover:opacity-80"
            style={on ? { background: ink, color: bg } : { color: mute }}
          >
            {code === "fa" ? "فا" : "EN"}
          </button>
        );
      })}
    </div>
  );
}

function Eyebrow({ children, icon: Icon }: { children: React.ReactNode; icon?: LucideIcon }) {
  return (
    <h2
      className="neo-cap mb-8 flex items-center gap-3 text-[0.66rem] sm:text-[0.7rem]"
      style={{ color: MUTE }}
    >
      {Icon ? (
        <span
          className="grid size-7 shrink-0 place-items-center border"
          style={{ borderColor: LINE, color: VIOLET_INK }}
          aria-hidden="true"
        >
          <Icon className="size-3.5" strokeWidth={1.5} />
        </span>
      ) : (
        <span className="inline-block h-px w-6" style={{ background: VIOLET }} />
      )}
      {children}
    </h2>
  );
}

/**
 * سکشنِ محتوا: ظهورِ پلکانی، به‌علاوهٔ یک نشانهٔ تزئینی که کندتر از
 * صفحه حرکت می‌کند.
 *
 * پارالکس اینجا روی متن اعمال نمی‌شود — متنی که با اسکرول بلغزد،
 * خواندنش سخت می‌شود. فقط همان ستونِ کناری می‌لغزد: در ستونِ خالیِ
 * سمتِ چپ (صفحه راست‌چین است) یک آیکن، یک خطِ عمودی و نامِ انگلیسیِ
 * سکشن. همین کافی است تا اسکرول عمق داشته باشد.
 *
 * روی موبایل کلاً نمایش داده نمی‌شود: آنجا ستونِ خالی‌ای وجود ندارد
 * که تزئین در آن بنشیند.
 */
/**
 * پالتِ سکشنِ تیره — همان هفت متغیر، وارونه.
 *
 * `--robot-cut` هم اینجاست چون چشمِ کاشی با رنگِ زمینه بریده می‌شود،
 * و زمینه اینجا دیگر کاغذ نیست.
 */
const DARK_VARS: React.CSSProperties = {
  background: NIGHT,
  color: NIGHT_INK,
  ["--neo-paper" as string]: NIGHT,
  ["--neo-ink" as string]: NIGHT_INK,
  ["--neo-mute" as string]: NIGHT_MUTE,
  ["--neo-line" as string]: NIGHT_LINE,
  ["--neo-card" as string]: "rgba(255,255,255,.035)",
  ["--neo-accent" as string]: NIGHT_MUTE,
  ["--neo-strong" as string]: NIGHT_INK,
  ["--robot-cut" as string]: NIGHT,
};

function Sec({
  className,
  children,
  mark,
  icon: Icon,
  id,
  dark = false,
}: {
  className?: string;
  children: React.ReactNode;
  mark?: string;
  icon?: LucideIcon;
  id?: string;
  /** نوارِ تمام‌عرضِ مشکی با کاشیِ سرها پشتش */
  dark?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const still = useStill();
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /*
      یک‌بار مصرف: بعد از اولین ورود، ناظر قطع می‌شود. سکشنی که با
      هر بار رد شدن دوباره محو و ظاهر شود، در اسکرولِ برگشت آزاردهنده
      است — خواننده دنبالِ چیزی می‌گردد که همین الان دیده بود.
    */
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setOn(true);
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [64, -64]);
  const soft = useSpring(drift, { stiffness: 70, damping: 22, mass: 0.6 });

  /**
   * پارالکسِ پس‌زمینهٔ نوارِ تیره — عکسِ جهتِ تزئینِ کناری.
   *
   * تزئین با اسکرول *بالا* می‌رود، یعنی تندتر از صفحه، یعنی
   * نزدیک‌تر از آن. پس‌زمینه باید دقیقاً برعکس باشد: نسبت به خودِ
   * سکشن به پایین بلغزد، که یعنی کندتر از صفحه می‌آید، که یعنی
   * دورتر است. همین یک علامت است که یک مستطیلِ مشکی را به یک
   * *فضا* تبدیل می‌کند.
   *
   * و همین است که نوار را به هیرو وصل می‌کند: در هیرو هم پیکره
   * ثابت می‌ماند و متن از کنارش رد می‌شود. تجربهٔ مشترک، «چیزی
   * پشتِ صفحه ایستاده» است؛ نوارِ تیره‌ای که پس‌زمینه‌اش با صفحه
   * میخ‌کوب باشد، همان تجربه را قطع می‌کند و می‌شود یک بلوکِ
   * جدا.
   *
   * فنر لازم است نه برای نرمی، برای *تأخیر*: چیزِ دور باید کمی
   * دیر برسد.
   */
  const back = useTransform(scrollYProgress, [0, 1], [-56, 56]);
  const backSoft = useSpring(back, { stiffness: 60, damping: 24, mass: 0.7 });
  /** در دو سرِ سکشن محو می‌شود تا ناگهان قطع نشود */
  const fade = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const deco = mark && (
        <motion.div
          className="neo-deco pointer-events-none absolute end-0 top-16 hidden select-none flex-col items-center gap-4 md:flex"
          style={{ y: still ? 0 : soft, opacity: still ? 0.55 : fade }}
          aria-hidden="true"
        >
          {Icon && (
            <span
              className="grid size-9 place-items-center border"
              style={{ borderColor: LINE, color: VIOLET }}
            >
              <Icon className="size-4" strokeWidth={1.4} />
            </span>
          )}
          <span className="h-14 w-px" style={{ background: LINE }} />
          <span
            className="text-[0.6rem]"
            style={{
              writingMode: "vertical-rl",
              fontFamily: "var(--font-wordmark), var(--font-space-grotesk), sans-serif",
              letterSpacing: "0.28em",
              color: VIOLET,
            }}
            dir="ltr"
          >
            {mark}
          </span>
        </motion.div>
  );

  const inner = (
    <>
      {deco}
      {children}
    </>
  );

  if (!dark) {
    return (
      <section
        id={id}
        ref={ref}
        className={`neo-reveal relative ${on ? "is-on" : ""} ${className ?? ""}`}
      >
        {inner}
      </section>
    );
  }

  /*
    نوارِ تیره تمام‌عرض است، ولی محتوایش داخلِ همان ستونِ همیشگی
    می‌ماند: اگر خودِ ستون را سیاه کنیم، یک مستطیلِ شناور وسطِ صفحه
    می‌شود، نه یک وقفه. وقفه وقتی کار می‌کند که از لبه تا لبه برود.
  */
  return (
    /*
      `isolate` لازم است، نه تزئینی.

      لایهٔ دانه با `mix-blend-mode` کار می‌کند و ترکیب با نزدیک‌ترین
      زمینهٔ چیده‌شده انجام می‌شود. بدونِ این، «زمینه» می‌شد کلِ صفحه
      و دانه از لبه‌های نوار به کاغذِ کرمِ بیرون هم می‌زد.
    */
    <section
      id={id}
      ref={ref}
      className="relative isolate mt-20 overflow-hidden sm:mt-24"
      style={DARK_VARS}
    >
      {/*
        قاب از سکشن بلندتر است چون می‌لغزد؛ با قابِ دقیق، در دو سرِ
        سکشن یک نوارِ بی‌کاشی از بالا و پایین بیرون می‌زد.
      */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -inset-y-[16%]"
        style={{ y: still ? 0 : backSoft }}
      >
        <RobotPattern className="h-full w-full" style={{ color: NIGHT_INK, opacity: 0.038 }} />
      </motion.div>
      <Grain blend="screen" opacity={0.07} />
      <div className={`neo-reveal relative pb-20 sm:pb-24 ${on ? "is-on" : ""} ${className ?? ""}`}>
        {inner}
      </div>
    </section>
  );
}

/** فهرستِ «مناسب / نامناسب» */
/**
 * دو ستونِ «مناسبِ تو هست / نیست».
 *
 * نسخهٔ اول دو فهرست با نقطه‌های یک‌شکل بود، و مشکلش این بود که
 * چشم بدونِ خواندنِ تیتر نمی‌فهمید کدام کدام است — نقطه‌ها هر دو
 * طرف یکسان بودند و فقط رنگشان فرق می‌کرد. تیک و ضربدر بدونِ
 * خواندن هم خوانده می‌شوند، و همین که فقط به رنگ تکیه نمی‌کنند
 * یعنی برای کسی که رنگ را متفاوت می‌بیند هم کار می‌کنند.
 *
 * ستونِ «نیست» عمداً کم‌رنگ‌تر نیست: صادق‌بودن دربارهٔ اینکه این
 * دوره برای چه کسی *نیست*، همان‌قدر بخشی از فروش است. کم‌رنگ‌کردنش
 * یعنی پنهان‌کردنش.
 */
function FitList({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly { t: string; d: string }[];
  tone: "yes" | "no";
}) {
  const Mark = tone === "yes" ? Check : X;
  const accent = tone === "yes" ? VIOLET_INK : "#a0968c";
  return (
    <div
      className="h-full rounded-none border p-6 sm:p-8"
      style={{ borderColor: LINE, background: tone === "yes" ? CARD : "transparent" }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-none"
          style={{ background: accent }}
          aria-hidden="true"
        >
          <Mark className="size-4" strokeWidth={2.5} style={{ color: PAPER }} />
        </span>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <ul className="mt-5">
        {items.map((s) => (
          <li key={s.t} className="flex gap-3 border-t py-4" style={{ borderColor: LINE }}>
            <Mark
              className="mt-1 size-4 shrink-0"
              strokeWidth={2}
              style={{ color: accent }}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-[0.88rem] font-semibold leading-relaxed">{s.t}</p>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed" style={{ color: MUTE }}>
                {s.d}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * یک پردهٔ متنی که در بازهٔ خودش می‌آید و می‌رود.
 *
 * جدا شده چون هر پرده hook خودش را لازم دارد و useTransform را
 * نمی‌شود داخل map صدا زد.
 *
 * روی موبایل زیرِ جسم می‌نشیند و تمام‌عرض می‌شود؛ کنارِ یک شیءِ
 * بزرگ در عرضِ ۳۷۵ پیکسل هیچ متنی خوانا نمی‌شود.
 */
/**
 * یک پردهٔ اسکرول.
 *
 * نسخهٔ اول فقط یک تیتر و دو جمله بود و مشکلش این بود که هر سه پرده
 * می‌توانستند مالِ *هر* دورهٔ AI باشند. چیزی که یک صفحه را از جنسِ
 * «تبلیغِ عمومی» بیرون می‌آورد، جزئیاتِ قابلِ راستی‌آزمایی است:
 * شمارهٔ فصل، اسمِ واقعیِ درس‌ها، و آنچه دقیقاً بعدش در دست داری.
 *
 * این جزئیات از `MISSIONS` خوانده می‌شوند نه از متنِ این فایل. اگر
 * روزی فصلی عوض شود، پرده هم با آن عوض می‌شود؛ متنِ دستی‌نویس بعد از
 * اولین تغییرِ سرفصل دروغ می‌شود و کسی خبردار نمی‌شود.
 */
function Panel({
  p,
  still,
  index,
  lang,
  no,
  head,
  body,
  mute,
  line,
  range,
}: {
  p: MotionValue<number>;
  still: boolean;
  index: number;
  lang: Lang;
  no: string;
  head: string;
  body: string;
  /** رنگ‌های شبِ صحنه — حالا ثابت‌اند، چون هیرو تا آخر تاریک می‌ماند */
  mute: string;
  line: string;
  range: readonly [number, number];
}) {
  // سه بازهٔ پشت‌سرهم، با کمی فاصلهٔ خالی بینشان
  const from = 0.22 + index * 0.25;
  const opacity = useTransform(
    p,
    [from, from + 0.06, from + 0.16, from + 0.22],
    [0, 1, 1, 0],
  );
  const y = useTransform(p, [from, from + 0.06, from + 0.16, from + 0.22], [30, 0, 0, -30]);

  const missions = MISSIONS.slice(range[0], range[1] + 1);
  const lessonCount = missions.reduce((n, m) => n + m.episodes.length, 0);

  /**
   * نامِ فصل‌های همین بازه، نه چند درسِ تصادفی از میانشان.
   *
   * نسخهٔ قبل دو درس از هر فصل برمی‌داشت تا «اثباتِ وجود» بدهد، و
   * نتیجه‌اش چهار عنوانِ بی‌ربط کنارِ هم بود که خواننده نمی‌دانست از
   * کجا آمده‌اند. نامِ فصل‌ها همان کار را می‌کند و یک چیزِ بیشتر:
   * مستقیم به فهرستِ پایینِ صفحه گره می‌خورد، پس وقتی خواننده به
   * سرفصل‌ها می‌رسد، اسم‌ها را از قبل دیده است.
   */
  const chapters = missions.map((m) => m.chapter[lang]);

  const outcome = OUTCOME[lang][range[1]];
  const label = lang === "fa" ? "فصل" : "Chapters";
  const lessonWord = lang === "fa" ? "درس" : "lessons";
  const after = lang === "fa" ? "بعد از این بخش" : "After this stretch";

  return (
    <motion.div
      style={{
        /*
          شفافیت همیشه از اسکرول می‌آید.

          اینجا در حالتِ کاهشِ حرکت فقط پردهٔ اول نشان داده می‌شد و دو
          تای دیگر همیشه صفر می‌ماندند — یعنی دو سومِ متنِ هیرو برای
          آن کاربر اصلاً وجود نداشت. فرقی هم نمی‌کرد چقدر اسکرول کند.
        */
        opacity,
        y: still ? 0 : y,
      }}
      data-panel={no}
      /**
       * ستونِ متن، در نیمهٔ *شروعِ* قاب — نه نواری روی کلِ عرض.
       *
       * نسخهٔ قبل متن را وسط و بالای کادر می‌گذاشت و پیکره درست زیرش
       * می‌ایستاد. روی نمایشگرِ کوتاه، سر و شانه تا داخلِ همان متن
       * بالا می‌آمدند و هیچ‌کدام خوانده نمی‌شدند — متنِ روشن روی جسمِ
       * مشکیِ براق، بدترین ترکیبِ ممکن.
       *
       * حالا صحنه دو ستون است: متن یک طرف، پیکره طرفِ دیگر (خودش با
       * اسکرول کنار می‌رود، در `NeoStudio`). هیچ‌کدام روی آن یکی
       * نمی‌افتد و هر دو تمام‌قد دیده می‌شوند.
       *
       * روی قابِ باریک این تقسیم جواب نمی‌دهد: نصفِ ۳۹۰ پیکسل برای
       * جمله جا نیست. آنجا متن دوباره تمام‌عرض و بالا می‌نشیند و
       * پیکره پایین می‌ماند.
       */
      className="pointer-events-none absolute inset-x-0 top-[8dvh] px-6 text-center md:inset-x-auto md:top-1/2 md:w-[46%] md:-translate-y-1/2 md:px-0 md:text-start md:[inset-inline-start:6vw]"
    >
      <span className="block text-[0.66rem] tracking-[0.28em]" style={{ color: VIOLET }}>
        {no}
      </span>

      <h2 className="mx-auto mt-3 max-w-[20ch] text-balance font-normal leading-snug text-[clamp(1.5rem,3.6vw,2.6rem)] md:mx-0">
        {head}
      </h2>

      <p
        className="mx-auto mt-4 max-w-[36rem] text-balance text-[0.82rem] leading-loose sm:text-[0.92rem] md:mx-0"
        style={{ color: mute }}
      >
        {body}
      </p>

      {/*
        اسمِ چند درسِ واقعی، به‌شکلِ چیپ.
        فهرستِ عمودی اینجا بلوک را دو برابر بلند می‌کرد و روی جسم
        می‌افتاد؛ یک ردیفِ افقی همان اطلاعات را در یک خط می‌دهد. روی
        موبایل حذف می‌شود، چون آنجا ارتفاع گران‌ترین چیز است.
      */}
      <ul className="mt-6 hidden flex-wrap justify-center gap-2 sm:flex md:justify-start">
        {chapters.map((c) => (
          <li
            key={c}
            className="rounded-none border px-3.5 py-1.5 text-[0.72rem]"
            style={{ borderColor: line, color: mute }}
            dir="ltr"
          >
            {c}
          </li>
        ))}
        <li
          className="rounded-none border border-dashed px-3.5 py-1.5 text-[0.72rem]"
          style={{ borderColor: line, color: mute }}
        >
          {label} {missions[0].no}–{missions[missions.length - 1].no} ·{" "}
          {lang === "fa" ? faNum(lessonCount) : lessonCount} {lessonWord}
        </li>
      </ul>

      <p
        className="mx-auto mt-5 hidden max-w-[34rem] text-[0.78rem] leading-relaxed sm:block md:mx-0"
        style={{ color: mute }}
      >
        <span style={{ color: VIOLET }}>{after} — </span>
        {outcome}
      </p>
    </motion.div>
  );
}

