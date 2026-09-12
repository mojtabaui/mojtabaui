"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  ChevronDown,
  FileText,
  ListOrdered,
  Check,
  Clock,
  KeyRound,
  MonitorPlay,
  Sparkles,
  Terminal,
  Users,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import { BrandGlyph } from "@/components/BrandMark";
import { useStill } from "@/components/odyssey/useStill";
import { MISSIONS, EPISODE_COUNT } from "@/lib/odyssey";
import {
  TOPICS,
  topicCount,
  TOOLS,
  FORMAT,
  FIT,
  NEED,
  PRICING,
} from "@/lib/ai7-curriculum";
import { ARCHIVED_PROJECTS } from "./archivedProjects";
import type { Lang } from "@/lib/i18n";
import GridField from "../GridField";
import { STAGE_ART } from "../StageArt";

const RobotStudio = dynamic(() => import("../RobotStudio"), { ssr: false });
/**
 * صحنهٔ رباتِ نارنجی جداست، نه یک حالتِ دیگرِ RobotStudio.
 *
 * آن صحنه برای جسمِ کرم روی زمینهٔ کرم تنظیم شده و این یکی تقریباً
 * در هر تصمیمی برعکس است — محیط، نور، تضاد و پست‌پروسس. با dynamic
 * جدا، هر صفحه فقط صحنهٔ خودش را دانلود می‌کند.
 */
const DecodeStudio = dynamic(() => import("../DecodeStudio"), { ssr: false });

/**
 * AI7 — نسخهٔ اسکرول‌محور. **بایگانی.**
 *
 * این همان صفحه‌ای است که تا پیش از هیروِ تازه روی `/ai7/v2` بود:
 * یک صحنهٔ سه‌بعدیِ چسبیده به بلندای ۴۸۰dvh که ربات در آن از
 * تاریکی بیدار می‌شود و سه پرده متن از کنارش رد می‌شوند.
 *
 * کنار گذاشته شد، حذف نشد — روی `/ai7/archive` زنده است تا بشود با
 * نسخهٔ تازه مقایسه‌اش کرد. اگر چیزی از آن برگشت، از همین‌جا برش
 * دار؛ ولی تغییرِ تازه در این فایل نگذار.
 *
 * ماجرای اصلیِ طراحی‌اش:
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

// توکن‌های برند — globals.css منبعِ اصلی است
const PAPER = "#faf6f1";
const INK = "#1a1714";
const MUTE = "#6b6560";
const LINE = "#e8e2d9";
/**
 * لهجهٔ دوره نارنجی است، نه بنفشِ بقیهٔ سایت.
 *
 * ربات نارنجی است و اگر دکمه‌ها بنفش بمانند، صفحه دو برند هم‌زمان
 * می‌خواند. نامِ متغیرها عمداً خنثی است تا اگر بعداً لهجه عوض شد،
 * فقط همین دو خط تغییر کند.
 */
const VIOLET = "#e8760f";
const VIOLET_INK = "#d4620a";
/** کارتِ روی کاغذ — کرمِ روشن‌تر از زمینه، نه سفیدِ خالص */
const CARD = "#fffcf6";
/**
 * ثبت‌نام از راه پشتیبانی، نه درگاهِ پرداخت.
 *
 * همان مسیری که `BuyButton` در بقیهٔ سایت می‌رود: فروش کارت‌به‌کارت
 * است و درگاه فعلاً خاموش. قیمت اما روی صفحه چاپ می‌شود و در
 * `PRICING` زندگی می‌کند — چون تخفیفِ رونمایی پلکانی است و پله،
 * خودش بخشی از پیام است. عددها فقط یک جا نوشته شده‌اند.
 */
const SUPPORT = "https://t.me/melina_support";
/**
 * دو سرِ قوسِ زمینه.
 *
 * مشکیِ گرم است نه خاکستریِ سرد: زمینهٔ روشنِ صفحه کرم است، و
 * مشکیِ آبی‌رنگ کنارش مثل دو برندِ متفاوت به‌نظر می‌رسد. همان
 * مشکیِ قهوه‌ای‌مایل، دو سرِ یک طیف می‌شود.
 */
const NIGHT = "#151210";
const NIGHT_INK = "#f4efe8";
const NIGHT_MUTE = "#9b9086";
/** خطوطِ نازکِ قابِ صحنه، در دو حالت */
const NIGHT_LINE = "rgba(244,239,232,.09)";
const DAY_LINE = "rgba(26,23,20,.08)";

/**
 * شمارِ درس‌ها از خودِ دادهٔ دوره خوانده می‌شود، نه از متن.
 *
 * سه جای صفحه این عدد را می‌گویند. تا وقتی در متن چاپ می‌شد، اضافه
 * شدنِ یک درس یعنی سه جای فراموش‌شدنی — و صفحه‌ای که با فهرستِ
 * پایینِ خودش نمی‌خواند. حالا `{n}` در متن می‌ماند و همین‌جا پر می‌شود.
 */
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const faNum = (n: number) => String(n).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
const withCount = (s: string, lang: Lang) =>
  s.replace("{n}", lang === "fa" ? faNum(EPISODE_COUNT) : String(EPISODE_COUNT));

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
    title: "آموزش AI برای طراحانِ محصول",
    lede: "هفت فصل، از اولین پرامپت تا محصولی که منتشرش می‌کنی.",
    sub: "هفت فصل، {n} درس",
    blurb:
      "از اولین پرامپت تا چیزی که آدرس دارد و باز می‌شود. هفت فصل، و در هرکدام یک کار که باید تمامش کنی.",
    scroll: "اسکرول کن تا بیدار بشه!",
    heroCta: "ثبت‌نام",
    heroCta2: "سرفصل‌ها را ببین",
    heroSeats: "جا محدود است",
    panels: [
      {
        no: "۰۱",
        head: "با دست خالی شروع نمی‌کنی",
        body: "هر فصل با مسئله‌ای باز می‌شود که خودت هم داشته‌ای. آخرش چیزی در دست داری که می‌شود نشانش داد.",
      },
      {
        no: "۰۲",
        head: "ابزار عوض می‌شود، روش نه",
        body: "مدل‌ها هر ماه جابه‌جا می‌شوند. آنچه یاد می‌گیری طرزِ فکر کردن دربارهٔ آن‌هاست، که سرِ جایش می‌ماند.",
      },
      {
        no: "۰۳",
        head: "تا منتشر نشود، تمام نشده",
        body: "فصلِ آخر دربارهٔ رساندنِ کار به دستِ آدم‌هاست. همان جایی که بیشترِ پروژه‌ها متوقف می‌مانند.",
      },
    ],
    pathTitle: "سه مرحله که روی هم سوار می‌شوند",
    pathLede: "تا مرحلهٔ قبل جا نیفتد، مرحلهٔ بعد فقط ابزار یاد گرفتن است.",
    path: [
      {
        n: "۱",
        t: "فهمیدن",
        d: "فصل‌های ۱ و ۲ — می‌فهمی این چیزها چطور کار می‌کنند و کجا خطا می‌دهند. بدونِ این، بقیهٔ دوره تقلید است.",
      },
      {
        n: "۲",
        t: "ساختن",
        d: "فصل‌های ۳ تا ۵ — تجربه، ایجنت، رابط. از اینجا AI از دستیار به بخشی از فرآیندِ کارت تبدیل می‌شود.",
      },
      {
        n: "۳",
        t: "رساندن",
        d: "فصل‌های ۶ و ۷ — تیمِ ایجنت روی رابط، و بعد کد و انتشار. جایی که کار از فایل بیرون می‌آید.",
      },
    ],
    forTitle: "برای چه کسی",
    forHead: "می‌دانیم AI کاری می‌کند، نمی‌دانیم کجا باید کوتاه بیاییم.",
    forLede:
      "همان جایی که بیشترِ ما گیر می‌کنیم — و همان خطی که کلِ این دوره دربارهٔ آن است. اگر این جمله برایت آشناست، دو ستونِ پایین می‌گوید این دوره برای تو هست یا نه.",
    forYes: "مناسبِ تو است اگر",
    forNo: "مناسبِ تو نیست اگر",
    toolsLabel: "ابزارها",
    formatLabel: "قالبِ دوره",
    metaTopics: "زیرسرفصل",
    metaDeliver: "خروجی",
    sum: ["فصل", "درس", "زیرسرفصل", "پروژهٔ واقعی"],
    outline: "سرفصل‌ها",
    outlineLede:
      "هر فصل یک مهارت است که روی فصلِ قبل سوار می‌شود. ترتیبشان تصادفی نیست.",
    lessons: "درس",
    readyCount: "فصلِ ضبط‌شده",
    draftCount: "فصلِ در حالِ نهایی شدن",
    soon: "در حال نهایی شدن",
    ready: "ضبط‌شده",
    takeSum: "و هفت‌تا که کنارِ هم بگذاری، یک محصول است که خودت از صفر ساخته‌ای و می‌توانی روایتش کنی.",
    takeTitle: "چه چیزی با خودت می‌بری",
    takeLede: "آخرِ هر فصل یک چیز در دست داری. این هفت‌تا همان‌هاست.",
    needTitle: "پیش از شروع",
    joinTitle: "ثبت‌نام",
    joinHead: "ثبت‌نام از راه پشتیبانی انجام می‌شود",
    joinBody:
      "درگاهِ پرداخت فعلاً روی سایت نیست و ثبت‌نام کارت‌به‌کارت است. در تلگرام پیام بده؛ همان‌جا می‌گوییم از پلهٔ فعلی چند جا مانده، شمارهٔ کارت را می‌فرستیم و بعد از پرداخت دسترسی‌ات باز می‌شود.",
    joinCta: "پیام در تلگرام",
    joinNote: "معمولاً کمتر از یک روز جواب می‌دهیم.",
    noteTitle: "چرا این دوره را ساختم",
    note: "سال‌ها کارم این بوده که محصول طراحی کنم و بعد منتظرِ کسی بمانم تا بسازدش. آن انتظار حالا لازم نیست، ولی جای خالیِ آن را چیزِ دیگری پر کرده: نمی‌دانیم کجا باید کوتاه بیاییم و کجا نه. این هفت فصل، همان خط است.",
    noteBy: "مجتبی — مدرسه دیزاین ملینا",
    noteRole: "طراحِ رابط و تجربهٔ کاربری، بنیان‌گذارِ مدرسهٔ دیزاین ملینا",
    note2:
      "هرچه در این دوره می‌بینی از پروژه‌های واقعی درآمده. شکست‌هایش هم همین‌طور — و چندتایی را عمداً جلوی چشمت تکرار می‌کنم، چون بهترین راهِ یاد گرفتنشان همین است.",
    stepsTitle: "سه قدم، همین امروز",
    steps: [
      { t: "در تلگرام پیام بده", d: "می‌گوییم روی کدام پلهٔ قیمت هستیم و چند جا مانده." },
      { t: "کارت‌به‌کارت", d: "شمارهٔ کارت را همان‌جا می‌فرستیم و رسید را برایمان بفرست." },
      { t: "دسترسی باز می‌شود", d: "فصل‌های ضبط‌شده از همان لحظه، و بقیه به‌محضِ آماده شدن." },
    ],
    faqTitle: "سؤال‌های همیشگی",
    faq: [
      {
        q: "باید برنامه‌نویسی بلد باشم؟",
        a: "نه. ولی قرار هم نیست از کد فرار کنیم. یاد می‌گیری کد را بخوانی و تغییرش بدهی، حتی اگر خودت از صفر ننویسی.",
      },
      {
        q: "با کدام ابزارها کار می‌کنیم؟",
        a: "کلاد، چت‌جی‌پی‌تی و کودکس، و فیگما — یک فصلِ کامل فقط دربارهٔ همین‌هاست. ولی تمرکزِ دوره روی روش است، پس وقتی ابزار عوض شد، درس‌ها هنوز کار می‌کنند.",
      },
      {
        q: "چقدر وقت می‌برد؟",
        a: "به سرعتِ خودت بستگی دارد. هر فصل چند ساعت ویدیو دارد و یک تمرین که خروجی‌اش به پروژهٔ نهایی اضافه می‌شود.",
      },
      {
        q: "همهٔ فصل‌ها آماده‌اند؟",
        a: "فصل‌های اول ضبط شده‌اند و بقیه در حال نهایی شدن‌اند. کنارِ هر فصل نوشته‌ایم در چه وضعیتی است.",
      },
      {
        q: "بعد از دوره چه چیزی دستم را می‌گیرد؟",
        a: "یک محصولِ کارکننده که خودت ساخته‌ای. گواهی نمی‌دهیم؛ چیزی که ساخته‌ای خودش گواهی است.",
      },
      {
        q: "چرا نامِ فصل‌ها و درس‌ها انگلیسی است؟",
        a: "چون اصطلاح‌اند، نه جمله. «Agentic UX Design» را در بازار و در رزومه با همین نام می‌شناسند و ترجمه‌اش کارِ خودت را سخت‌تر می‌کند. توضیح‌ها، ویدیوها و جزوه‌ها فارسی‌اند.",
      },
      {
        q: "پرداخت چطور انجام می‌شود؟",
        a: "کارت‌به‌کارت، از راه پشتیبانی. درگاهِ پرداخت روی سایت فعال نیست. قیمت و پله‌های تخفیف همین بالا نوشته شده و چیزی پشتِ پرده نیست.",
      },
      {
        q: "اگر پلهٔ اول پر شده باشد چه؟",
        a: "پلهٔ بعدی فعال می‌شود. در تلگرام می‌پرسی و همان لحظه می‌گوییم روی کدام پله هستیم و چند جا مانده.",
      },
      {
        q: "دسترسی تا کِی باز است؟",
        a: "همیشگی. فصل‌هایی هم که بعداً ضبط شوند بدونِ هزینهٔ تازه برایت باز می‌شوند.",
      },
    ],
    finalTitle: "از همین‌جا شروع می‌شود.",
    finalBody: "هفت فصل، از اولین تماس تا انتشار.",
    cta: "می‌خواهم شروع کنم",
    back: "بازگشت به مدرسه",
    others: "نسخه‌های دیگر",
    vFull: "نسخهٔ کامل",
    vBust: "نسخهٔ نیم‌تنه",
    vDevice: "نسخهٔ دستگاه",
  },
  en: {
    kicker: "Melina Design School",
    title: "AI for product designers",
    lede: "Seven chapters, from your first prompt to a product you actually ship.",
    sub: "Seven chapters, {n} lessons",
    blurb:
      "From your first prompt to a product with a URL that opens. Not a tool list, not shortcuts — a method that still holds when the models move.",
    scroll: "scroll to wake it up",
    heroCta: "Enrol",
    heroCta2: "See the outline",
    heroSeats: "limited seats",
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
        d: "Chapters 3–5 — experience, agents, interface. This is where AI stops being an assistant and becomes part of your process.",
      },
      {
        n: "3",
        t: "Ship",
        d: "Chapters 6–7 — an agent team on the interface, then code and launch. Where the work leaves the file.",
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
  },
} as const;

export default function Ai7Scroll({
  lang,
  /** کدام ربات — دستگاهِ ایستاده، نیم‌تنهٔ انسان‌وار، یا مانیتورِ نارنجی */
  bot = "device",
}: {
  lang: Lang;
  bot?: "device" | "bust" | "decode";
}) {
  const t = T[lang];
  const rtl = lang === "fa";
  const proj = ARCHIVED_PROJECTS[lang];
  const tools = TOOLS[lang];
  const format = FORMAT[lang];
  const fit = FIT[lang];
  const need = NEED[lang];
  /** عددهای ریزِ صفحه — فارسی که باشد، رقمِ لاتین وسطِ جمله می‌زند توی ذوق */
  const num = (n: number) => (lang === "fa" ? faNum(n) : String(n));
  const price = PRICING[lang];
  const Forward = rtl ? ArrowLeft : ArrowRight;
  const still = useStill();

  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.0005 });

  /** در کاهش حرکت، هر چیز از همان اول در حالت نهایی می‌نشیند */
  const fixed = <V,>(v: MotionValue<V>, end: V) => (still ? end : v);

  // زمینه و متن، هم‌قدم با روشن شدنِ ربات
  const bg = useTransform(p, [0.04, 0.34], [NIGHT, PAPER]);
  const ink = useTransform(p, [0.08, 0.34], [NIGHT_INK, INK]);
  const mute = useTransform(p, [0.08, 0.34], [NIGHT_MUTE, MUTE]);
  /** شبکه در تاریکی بنفشِ روشن است و در روشنایی بنفشِ کم‌رمق */
  const gridTone = useTransform(p, [0.08, 0.34], ["167,139,250", "124,92,252"]);
  const gridAlpha = useTransform(p, [0.08, 0.34], [1, 0.55]);
  const line = useTransform(p, [0.08, 0.34], [NIGHT_LINE, DAY_LINE]);

  const heroOut = useTransform(p, [0.02, 0.15], [1, 0]);
  const heroY = useTransform(p, [0.02, 0.15], [0, -60]);
  /**
   * دکمه‌های قابِ اول، وقتی محو شدند نباید کلیک بگیرند.
   *
   * کلِ بلوکِ تیتر `pointer-events-none` است و فقط همین ردیف استثنا
   * می‌شود؛ پس بدونِ این، یک دکمهٔ نامرئی وسطِ پرده‌ها می‌ماند و
   * کلیکِ کاربر را می‌بلعد.
   */
  const heroClicks = useTransform(heroOut, (v) => (v > 0.5 ? "auto" : "none"));
  /** چهار عددِ قابِ اول — همان‌هایی که پایینِ صفحه هم تکرار می‌شوند */
  const heroStats = [
    MISSIONS.length,
    EPISODE_COUNT,
    MISSIONS.reduce((n, m) => n + topicCount(m.no), 0),
    proj.items.length,
  ];

  return (
    <div className="relative min-h-dvh" style={{ background: PAPER, color: INK }}>
      {/* ── صحنه: چسبیده می‌ماند، متن از کنارش رد می‌شود ── */}
      <div ref={stage} className="relative" style={{ height: "480dvh" }}>
        <motion.div
          className="sticky top-0 h-dvh overflow-hidden"
          style={{ background: fixed(bg, PAPER), color: fixed(ink, INK) }}
        >
          {!still && (
            <motion.div className="absolute inset-0" style={{ opacity: gridAlpha }}>
              <GridField color={gridTone} className="absolute inset-0 h-full w-full" />
            </motion.div>
          )}

          {/*
            تیترِ غول‌پیکر، پشتِ ربات.
            هم‌پوشانیِ جسم و حروف عمدی است: تا وقتی متن پشتِ چیزی
            نرود، صحنه دو لایه ندارد و تخت می‌ماند.
          */}
          <motion.div
            style={{ opacity: fixed(heroOut, 0), y: fixed(heroY, -60) }}
            className="pointer-events-none absolute inset-x-0 top-[9dvh] px-4 text-center sm:top-[11dvh]"
          >
            <motion.p
              className="mb-4 inline-flex items-center gap-2.5 text-[0.62rem] font-normal sm:mb-6 sm:text-[0.68rem]"
              style={{ color: fixed(mute, MUTE) }}
            >
              <BrandGlyph size={16} style={{ color: VIOLET }} />
              {t.kicker}
            </motion.p>
            {/*
              تیتر یک خط می‌ماند و کوچک‌تر از قبل است.
              تیترِ چندخطیِ غول‌پیکر پشتِ جسم، وسطش می‌افتاد و هیچ‌کدام
              خوانده نمی‌شدند. یک خطِ کوتاه‌تر بالای قاب، هم کامل دیده
              می‌شود و هم جسم را آزاد می‌گذارد.
            */}
            <h1 className="mx-auto max-w-[18ch] text-balance font-light leading-[1.08] text-[clamp(2rem,6.1vw,4.6rem)] sm:max-w-none sm:whitespace-nowrap">
              {t.title}
            </h1>

            <p className="mt-5 text-[0.8rem] sm:mt-6 sm:text-[0.9rem]">{withCount(t.sub, lang)}</p>

            <motion.p
              className="mx-auto mt-3 max-w-[34rem] text-balance px-2 text-[0.82rem] leading-loose sm:text-[0.92rem]"
              style={{ color: fixed(mute, MUTE) }}
            >
              {t.blurb}
            </motion.p>

            {/*
              قیمت و دکمه، در همان قابِ اول.

              تا پیش از این، کسی که صفحه را باز می‌کرد هیچ کارِ ممکنی
              جلویش نبود: نه قیمتی، نه دکمه‌ای، و تا رسیدن به بخشِ
              ثبت‌نام حدودِ نوزده‌هزار پیکسل اسکرول. تخفیفِ رونمایی
              هم دقیقاً همان چیزی است که باید *اول* دیده شود، وگرنه
              پلکانی بودنش بی‌معنا می‌شود.

              قیمت از `PRICING` خوانده می‌شود، نه از متنِ اینجا — همان
              یک‌جا بودنی که پایینِ صفحه هم رویش حساب شده.
            */}
            <motion.div
              className="mt-8 flex flex-col items-center gap-5 sm:mt-9"
              style={{ pointerEvents: fixed(heroClicks, "none") }}
            >
              <p className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1.5 text-[0.8rem] sm:text-[0.88rem]">
                <span
                  className="rounded-full px-2.5 py-1 text-[0.65rem]"
                  style={{ background: VIOLET_INK, color: PAPER }}
                >
                  {price.tiers[0].off}
                </span>
                <span className="font-bold tabular-nums">
                  {price.tiers[0].price} {price.unit}
                </span>
                <motion.span
                  className="tabular-nums line-through"
                  style={{ color: fixed(mute, MUTE) }}
                >
                  {price.full}
                </motion.span>
                <motion.span style={{ color: fixed(mute, MUTE) }}>
                  · {price.tiers[0].seat}
                </motion.span>
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={SUPPORT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
                  style={{ background: VIOLET_INK, color: PAPER }}
                >
                  {t.heroCta}
                  <Forward className="size-4" aria-hidden="true" />
                </a>
                {/* دکمهٔ دوم به سرفصل می‌رود، نه به ثبت‌نام.
                    کسی که هنوز تصمیم نگرفته، مقصدش فهرست است. */}
                <motion.a
                  href="#outline"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm transition-opacity hover:opacity-70"
                  style={{ borderColor: fixed(line, DAY_LINE) }}
                >
                  {t.heroCta2}
                </motion.a>
              </div>

              {/*
                نوارِ عددها — همان چهارتای پایینِ صفحه.

                روی موبایل نیست: آنجا ارتفاع گران‌ترین چیزِ قاب است و
                این ردیف، جسم را از کادر بیرون می‌اندازد.
              */}
              <motion.p
                className="hidden flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[0.72rem] sm:flex"
                style={{ color: fixed(mute, MUTE) }}
              >
                {heroStats.map((v, i) => (
                  <span key={t.sum[i]} className="inline-flex items-center gap-2.5">
                    {i > 0 && (
                      <span aria-hidden="true" style={{ opacity: 0.45 }}>
                        ·
                      </span>
                    )}
                    <span>
                      <b className="font-semibold tabular-nums">{num(v)}</b> {t.sum[i]}
                    </span>
                  </span>
                ))}
              </motion.p>
            </motion.div>

            {/* دعوتِ اسکرول — با لهجهٔ برند، نه خاکستریِ کم‌جان */}
            <p
              className="mt-8 inline-flex items-center gap-2 text-[0.78rem] sm:mt-10 sm:text-[0.85rem]"
              style={{ color: VIOLET }}
            >
              {t.scroll}
              <ChevronDown className="size-4 animate-bounce" strokeWidth={2} aria-hidden="true" />
            </p>
          </motion.div>

          {bot === "decode" ? (
            <DecodeStudio
              progress={p}
              flip={rtl ? -1 : 1}
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <RobotStudio
              progress={p}
              flip={rtl ? -1 : 1}
              bot={bot}
              className="absolute inset-0 h-full w-full"
            />
          )}


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
              range={([[0, 1], [2, 4], [5, 6]] as const)[i]}
            />
          ))}
        </motion.div>
      </div>

      {/* ── مسیرِ دوره ── */}
      <section className="mx-auto max-w-5xl px-5 sm:px-6">
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
      </section>

      {/* ── ابزارها ──
          در بنتو فقط چهار چیپ بود، و چیپ هیچ‌چیز نمی‌گوید.

          سؤالِ واقعیِ خواننده «چه ابزارهایی؟» نیست — اسمشان را همه
          شنیده‌اند. سؤال این است که «داخلِ هرکدام چه چیزی هست که من
          نمی‌دانم؟» و جوابش دقیقاً همان است که فصلِ دوم را می‌فروشد.
          پس هر ابزار یک کارتِ کامل شد: نقشش در یک خط، شش جزءِ داخلش،
          و یک جملهٔ نظر — همان چیزی که یک فهرستِ لوگو هرگز ندارد. */}
      <section className="mx-auto max-w-5xl px-5 pt-20 sm:px-6 sm:pt-24">
        <Eyebrow>{t.toolsLabel}</Eyebrow>
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
              className="flex flex-col rounded-3xl border p-6 sm:p-7"
              style={{ borderColor: LINE, background: CARD }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-bold sm:text-xl">{tool.name}</h3>
                <span className="text-[0.65rem] tabular-nums" style={{ color: VIOLET_INK }} dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
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
                      className="size-1 shrink-0 rounded-full"
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
          className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border border-dashed px-5 py-4 text-[0.8rem]"
          style={{ borderColor: LINE, color: MUTE }}
        >
          <span style={{ color: VIOLET_INK }}>{tools.more}</span>
          {tools.moreNote}
        </p>
      </section>

      {/* ── قالبِ فصل ──
          «ویدیوی ضبط‌شده» یک خانهٔ بنتو بود و عملاً هیچ نمی‌گفت.
          آنچه واقعاً تحویل داده می‌شود چهار چیز است، و یکی‌شان —
          جزوه — همان چیزی است که به کسی که هنوز حساب نخریده اجازه
          می‌دهد دنبال کند. این را نگفتن، فروختنِ کمتر است نه بیشتر. */}
      <section className="mx-auto max-w-5xl px-5 pt-20 sm:px-6 sm:pt-24">
        <Eyebrow>{t.formatLabel}</Eyebrow>
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
                className="relative overflow-hidden rounded-3xl border p-6 sm:p-7"
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
          className="mt-4 rounded-3xl border p-6 text-sm leading-loose sm:p-7 sm:text-[0.95rem]"
          style={{ borderColor: LINE, background: CARD }}
        >
          {format.note}
        </p>
      </section>

      {/* ── برای چه کسی ──
          هر بند حالا یک دلیل هم دارد.

          «دنبالِ فهرستِ پرامپت آماده‌ای» به‌تنهایی یک برچسب است و
          خواننده خودش را در آن نمی‌بیند. جمله‌ای که *چرا* را می‌گوید،
          هم قانع می‌کند و هم — مهم‌تر — کسی را که نباید بخرد بیرون
          می‌گذارد. همین است که باقیِ ادعاهای صفحه را باورپذیر می‌کند. */}
      <section className="mx-auto max-w-5xl px-5 pt-20 sm:px-6 sm:pt-24">
        <Eyebrow>{t.forTitle}</Eyebrow>
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
      </section>

      {/* ── سرفصل‌ها ── */}
      <section
        id="outline"
        className="mx-auto max-w-4xl scroll-mt-8 px-5 pt-20 sm:px-6 sm:pt-24"
      >
        <Eyebrow>{t.outline}</Eyebrow>
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
            <span className="size-1.5 rounded-full" style={{ background: "#047857" }} />
            {num(MISSIONS.filter((m) => !m.draft).length)} {t.readyCount}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full" style={{ background: VIOLET_INK }} />
            {num(MISSIONS.filter((m) => m.draft).length)} {t.draftCount}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full" style={{ background: LINE }} />
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
              className="relative overflow-hidden rounded-3xl border p-6 sm:p-8"
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
                    className="rounded-full px-2 py-0.5 text-[0.65rem]"
                    style={
                      m.draft
                        ? { background: "rgba(232,118,15,.12)", color: VIOLET_INK }
                        : { background: "rgba(4,120,87,.12)", color: "#047857" }
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
                                    className="rounded-full border px-2.5 py-1 text-[0.68rem] sm:text-[0.72rem]"
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
      </section>

      {/* ── پروژه ──
          بعد از سرفصل می‌آید، نه قبلش.

          کسی که هنوز نمی‌داند فصل‌ها چیستند، «هم‌قدم» برایش یک اسم
          است. ولی وقتی فهرست را دیده، این بخش همان چیزی است که
          فهرست را از وعده به کار تبدیل می‌کند: همان درس‌ها، روی یک
          محصول، با عددهایی که از خودِ پروندهٔ پژوهش درآمده‌اند.

          و بخشِ «چه چیزی خراب شد» عمداً همین‌جاست. صفحهٔ فروشی که
          فقط بردهایش را می‌شمارد، دربارهٔ روش هیچ نمی‌گوید؛ پروژه‌ای
          که سه اشتباهش را نام می‌برد، ثابت می‌کند روشی در کار بوده. */}
      <section className="mx-auto max-w-4xl px-5 pt-20 sm:px-6 sm:pt-24">
        <Eyebrow>{proj.title}</Eyebrow>
        <p className="-mt-4 max-w-xl text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
          {proj.lede}
        </p>

        {/* دو محصول، کنارِ هم. اندازه‌شان یکی است چون هیچ‌کدام
            «مثالِ اصلی» نیست — یکی مرزها را می‌سازد و یکی پرونده را. */}
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {proj.items.map((it) => (
            <div
              key={it.name}
              className="flex flex-col rounded-3xl border p-6 sm:p-7"
              style={{ borderColor: LINE, background: CARD }}
            >
              <span
                className="self-start rounded-full px-2.5 py-1 text-[0.65rem]"
                style={{ background: "rgba(232,118,15,.12)", color: VIOLET_INK }}
              >
                {it.tag}
              </span>
              <h3 className="mt-5 text-2xl font-bold sm:text-3xl">{it.name}</h3>
              <p className="mt-1.5 text-sm" style={{ color: MUTE }}>
                {it.what}
              </p>
              <p className="mt-4 text-sm leading-loose">{it.body}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {it.out.map((o) => (
                  <li
                    key={o}
                    className="rounded-full border px-2.5 py-1 text-[0.68rem]"
                    style={{ borderColor: LINE, color: MUTE }}
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* عددهای یک دورِ واقعی.
            اینجا عمداً هیچ عددِ گِردی نیست — ۲ مصاحبه و ۹۶ یادداشت
            همان چیزی است که واقعاً شمرده شده. عددِ گِرد بوی تبلیغ
            می‌دهد؛ ۲۷ خوشه بوی کار. */}
        <div
          className="mt-12 rounded-3xl border p-6 sm:p-9"
          style={{ borderColor: LINE, background: CARD }}
        >
          <Users className="size-5" strokeWidth={1.6} style={{ color: VIOLET }} aria-hidden="true" />
          <h3 className="mt-5 text-lg font-bold sm:text-xl">{proj.caseTitle}</h3>
          <p className="mt-3 max-w-xl text-sm leading-loose" style={{ color: MUTE }}>
            {proj.caseLede}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {proj.stats.map((s) => (
              <div key={s.k}>
                <dd className="text-2xl font-bold leading-none sm:text-3xl">{s.v}</dd>
                <dt className="mt-2.5 text-[0.72rem] leading-relaxed" style={{ color: MUTE }}>
                  {s.k}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* پرونده‌ای که تحویل می‌گیرید */}
          <div
            className="rounded-3xl border p-6 sm:p-7"
            style={{ borderColor: LINE, background: CARD }}
          >
            <FileText
              className="size-5"
              strokeWidth={1.6}
              style={{ color: VIOLET }}
              aria-hidden="true"
            />
            <h3 className="mt-5 text-base font-semibold sm:text-lg">{proj.filesTitle}</h3>
            <ul className="mt-4">
              {proj.files.map((f) => (
                <li
                  key={f}
                  className="flex items-baseline gap-2.5 border-t py-2.5 text-[0.82rem] leading-relaxed"
                  style={{ borderColor: LINE }}
                >
                  <span className="shrink-0 text-[0.6rem]" style={{ color: VIOLET }} aria-hidden="true">
                    ●
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* و چیزهایی که خراب شد */}
          <div
            className="rounded-3xl border p-6 sm:p-7"
            style={{ borderColor: LINE, background: CARD }}
          >
            <X className="size-5" strokeWidth={1.6} style={{ color: VIOLET }} aria-hidden="true" />
            <h3 className="mt-5 text-base font-semibold sm:text-lg">{proj.lessonsTitle}</h3>
            <ul className="mt-4">
              {proj.lessons.map((l) => (
                <li key={l.t} className="border-t py-4" style={{ borderColor: LINE }}>
                  <p className="text-[0.86rem] font-semibold leading-relaxed">{l.t}</p>
                  <p className="mt-2 text-[0.82rem] leading-relaxed" style={{ color: MUTE }}>
                    {l.d}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── هفت خروجی ──
          همان فهرستی که تا اینجا تکه‌تکه، پایینِ هر فصل، دیده شده. یک بار
          کنارِ هم گذاشتنش کارِ دیگری می‌کند: خواننده تا اینجا هفت وعدهٔ
          جدا شنیده و اینجا برای اولین بار *جمعشان* را می‌بیند. */}
      <section className="mx-auto max-w-4xl px-5 pt-20 sm:px-6 sm:pt-24">
        <Eyebrow>{t.takeTitle}</Eyebrow>
        <p className="mt-4 max-w-xl text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
          {t.takeLede}
        </p>
        {/*
          هر خانه، سه چیز دارد نه یکی: شماره، نامِ فصلی که از آن
          می‌آید، و خودِ چیز. بدونِ نامِ فصل این فهرست هفت جملهٔ
          شناور بود؛ با آن، به سرفصلِ بالا گره می‌خورد و خواننده
          می‌بیند کدام وعده از کجا می‌آید.
        */}
        <ol
          className="mt-10 grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-2"
          style={{ borderColor: LINE, background: LINE }}
        >
          {OUTCOME[lang].map((o, i) => {
            const m = MISSIONS[i];
            return (
              <li key={o} className="p-6 sm:p-7" style={{ background: CARD }}>
                <div className="flex items-baseline gap-3">
                  <span
                    className="shrink-0 text-[0.7rem] font-semibold tabular-nums"
                    style={{ color: VIOLET_INK }}
                  >
                    {m ? m.no : String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[0.72rem]" style={{ color: MUTE }} dir="ltr">
                    {m?.chapter[lang]}
                  </span>
                  {m?.draft && (
                    <span
                      className="size-1.5 shrink-0 rounded-full"
                      style={{ background: VIOLET_INK }}
                      title={t.soon}
                      aria-label={t.soon}
                    />
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed">{o}</p>
              </li>
            );
          })}

          {/* خانهٔ هشتم — جمعِ هفت‌تا، تا شبکه ناقص نماند و
              پیامِ کل هم یک جا گفته شود */}
          <li
            className="flex items-center p-6 sm:p-7"
            style={{ background: VIOLET_INK, color: PAPER }}
          >
            <p className="text-sm leading-loose">{t.takeSum}</p>
          </li>
        </ol>
      </section>

      {/* ── پیش از شروع ──
          صادق‌بودن دربارهٔ هزینه‌ای که کاربر باید بدهد، همان‌قدر می‌فروشد
          که شمردنِ مزیت‌ها. کسی که وقت ندارد بهتر است همین‌جا برود. */}
      <section className="mx-auto max-w-4xl px-5 pt-20 sm:px-6 sm:pt-24">
        <Eyebrow>{t.needTitle}</Eyebrow>
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
                className="relative overflow-hidden rounded-3xl border p-6 sm:p-7"
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
          className="mt-4 flex flex-col gap-5 rounded-3xl border p-6 sm:flex-row sm:items-center sm:p-8"
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
      </section>

      {/* ── یادداشت ── */}
      <section className="mx-auto max-w-3xl px-5 pt-20 sm:px-6 sm:pt-24">
        <div
          className="rounded-3xl border p-7 sm:p-11"
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
      </section>

      {/* ── قیمت ──
          درست پیش از ثبت‌نام، نه بالاتر.

          کسی که قیمت را بالای صفحه ببیند، پیش از فهمیدنِ اینکه چه
          می‌خرد قضاوت می‌کند. اینجا سرفصل، پروژه و «پیش از شروع» را
          خوانده و عدد در جای درستش می‌نشیند: بعد از ارزش، قبل از دکمه.

          پله‌ها سه‌تا هستند و سومی همان قیمتِ اصلی است. بدونِ پلهٔ
          سوم، دو عددِ تخفیف معنا ندارند — و با آن، خواننده خودش
          می‌بیند که این تخفیف تا کجا می‌رود. */}
      <section className="mx-auto max-w-3xl px-5 pt-20 sm:px-6 sm:pt-24">
        <Eyebrow>{price.title}</Eyebrow>
        <div
          className="rounded-3xl border p-7 sm:p-11"
          style={{ borderColor: LINE, background: CARD }}
        >
          <h2 className="text-xl font-bold sm:text-2xl">{price.head}</h2>
          <p className="mt-4 text-sm leading-loose sm:text-base" style={{ color: MUTE }}>
            {price.lede}
          </p>

          <ol className="mt-8 grid gap-3 sm:grid-cols-3">
            {price.tiers.map((tier) => {
              /** پلهٔ باز — تنها یکی، وگرنه «الان» معنایش را از دست می‌دهد */
              const open = tier.now;
              /** پلهٔ آخر همان قیمتِ اصلی است و خط‌خوردگی رویش بی‌معناست */
              const cut = tier.price !== price.full;
              return (
                <li
                  key={tier.seat}
                  className="flex flex-col rounded-2xl border p-5"
                  style={
                    open
                      ? { borderColor: VIOLET_INK, background: VIOLET_INK, color: PAPER }
                      : { borderColor: LINE, background: PAPER }
                  }
                >
                  <p className="text-[0.72rem]" style={open ? undefined : { color: MUTE }}>
                    {tier.seat}
                  </p>
                  {/*
                    خطِ خورده روی پلهٔ آخر معنا ندارد، ولی جایش خالی
                    می‌ماند. اگر ردیف را حذف کنیم، عددِ آن کارت بالاتر
                    از دوتای دیگر می‌نشیند و سه کارتِ کنارِ هم ناهم‌تراز
                    می‌شوند — همان چیزی که چشم قبل از خواندن می‌بیند.
                  */}
                  <p
                    aria-hidden={!cut}
                    className="mt-3 text-[0.7rem] line-through"
                    style={{
                      color: open ? "rgba(250,246,241,.6)" : MUTE,
                      visibility: cut ? undefined : "hidden",
                    }}
                  >
                    {price.full}
                  </p>
                  <p className="mt-1.5 font-bold tabular-nums leading-none text-[1.35rem] sm:text-[1.55rem]">
                    {tier.price}
                  </p>
                  <p className="mt-1.5 text-[0.72rem]" style={open ? undefined : { color: MUTE }}>
                    {price.unit}
                  </p>
                  {/* نشانِ تخفیف کفِ کارت می‌ماند تا هر سه هم‌تراز باشند */}
                  <div className="mt-auto pt-4">
                    <span
                      className="inline-block rounded-full px-2.5 py-1 text-[0.65rem]"
                      style={
                        open
                          ? { background: "rgba(250,246,241,.16)", color: PAPER }
                          : { background: "rgba(232,118,15,.12)", color: VIOLET_INK }
                      }
                    >
                      {tier.off}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="mt-7 text-xs leading-relaxed" style={{ color: MUTE }}>
            {price.note}
          </p>
        </div>
      </section>

      {/* ── ثبت‌نام ──
          پیش از سؤال‌ها می‌آید، نه بعدشان: کسی که تا اینجا خوانده تصمیمش را
          گرفته، و نباید مجبور شود از پنج سؤال رد شود تا راهِ ثبت‌نام را
          پیدا کند. سؤال‌ها برای کسی است که هنوز مردد است. */}
      <section className="mx-auto max-w-3xl px-5 pt-20 sm:px-6 sm:pt-24">
        <Eyebrow>{t.joinTitle}</Eyebrow>
        <div
          className="mt-8 rounded-3xl border p-7 sm:p-11"
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
          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3"
            style={{ borderColor: LINE, background: LINE }}
          >
            {t.steps.map((st, i) => (
              <li key={st.t} className="p-5" style={{ background: PAPER }}>
                <span
                  className="flex size-6 items-center justify-center rounded-full text-[0.65rem] font-semibold tabular-nums"
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

          <a
            href={SUPPORT}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-85"
            style={{ background: VIOLET_INK, color: PAPER }}
          >
            {t.joinCta}
            <Forward className="size-4" aria-hidden="true" />
          </a>
          <p className="mt-4 text-xs" style={{ color: MUTE }}>
            {t.joinNote}
          </p>
        </div>
      </section>

      {/* ── سؤال‌ها ── */}
      <section className="mx-auto max-w-3xl px-5 pt-20 sm:px-6 sm:pt-24">
        <Eyebrow>{t.faqTitle}</Eyebrow>
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
      </section>

      {/* ── پایان ──
          نوارِ عددها پیش از دکمه می‌آید.

          یک تیتر و یک دکمه در فضای خالی، پایانِ صفحه را سبک می‌کند —
          انگار حرف تمام شده بود و این فقط تشریفات است. چهار عددی که
          همه‌شان از دادهٔ خودِ دوره شمرده می‌شوند، آخرین چیزی است که
          خواننده می‌بیند: نه یک شعار، اندازهٔ چیزی که می‌خرد. */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-6 sm:py-28">
        <h2 className="text-2xl font-bold sm:text-4xl">{t.finalTitle}</h2>
        <p className="mt-4 text-sm sm:text-base" style={{ color: MUTE }}>
          {t.finalBody}
        </p>

        <dl
          className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-3xl border sm:grid-cols-4"
          style={{ borderColor: LINE, background: LINE }}
        >
          {[
            MISSIONS.length,
            EPISODE_COUNT,
            MISSIONS.reduce((n, m) => n + topicCount(m.no), 0),
            proj.items.length,
          ].map((v, i) => (
            <div key={t.sum[i]} className="px-4 py-7" style={{ background: CARD }}>
              <dd className="text-2xl font-bold leading-none tabular-nums sm:text-3xl">
                {num(v)}
              </dd>
              <dt className="mt-2.5 text-[0.72rem] leading-relaxed" style={{ color: MUTE }}>
                {t.sum[i]}
              </dt>
            </div>
          ))}
        </dl>

        <a
          href={SUPPORT}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-85"
          style={{ background: VIOLET_INK, color: PAPER }}
        >
          {t.cta}
          <Forward className="size-4" aria-hidden="true" />
        </a>

        <p className="mt-14 text-[0.68rem] tracking-[0.24em]" style={{ color: MUTE }}>
          {t.others}
        </p>
        <div
          className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs"
          style={{ color: MUTE }}
        >
          <Link href="/ai7" className="underline underline-offset-4">
            {t.vFull}
          </Link>
          <Link
            href={bot === "bust" ? "/ai7/v2" : "/ai7/v3"}
            className="underline underline-offset-4"
          >
            {bot === "bust" ? t.vDevice : t.vBust}
          </Link>
          <Link href="/" className="underline underline-offset-4">
            {t.back}
          </Link>
        </div>
      </section>
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
/** سه مرحله روی هفت فصل — همان تقسیم‌بندیِ پرده‌های اسکرول */
const STAGE_RANGE = [
  [0, 1],
  [2, 4],
  [5, 6],
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
            className="pointer-events-none absolute inset-0 rounded-3xl"
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
      className="relative grid gap-8 overflow-hidden rounded-3xl border p-7 shadow-[0_18px_50px_-32px_rgba(26,23,20,.5)] sm:p-11 md:grid-cols-[1fr_auto] md:items-center md:gap-12"
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
        <span className="text-[0.66rem] tracking-[0.24em]" style={{ color: VIOLET_INK }}>
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
              className="h-0.5 flex-1 rounded-full"
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
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-8 flex items-center gap-3 text-[0.66rem] tracking-[0.26em] sm:text-[0.7rem] sm:tracking-[0.3em]"
      style={{ color: MUTE }}
    >
      <span className="inline-block h-px w-6" style={{ background: VIOLET }} />
      {children}
    </h2>
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
      className="h-full rounded-3xl border p-6 sm:p-8"
      style={{ borderColor: LINE, background: tone === "yes" ? CARD : "transparent" }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full"
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
  mute: MotionValue<string>;
  line: MotionValue<string>;
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
   * چند درس از هر فصل، نه فهرستِ کامل.
   *
   * فهرستِ کامل در سکشنِ سرفصل‌ها هست؛ اینجا کارِ این چند اسم فقط
   * *اثباتِ وجود* است — نشان می‌دهد پشتِ این عنوانِ کلی، درسِ مشخص
   * وجود دارد. درس‌ها از میانهٔ فصل برداشته می‌شوند نه از اولش:
   * درسِ اول تقریباً همیشه «مقدمه» است و چیزی ثابت نمی‌کند.
   */
  const lessons = missions
    .flatMap((m) => {
      const eps = m.episodes.map((e) => e[lang]);
      const picks = [eps[Math.min(2, eps.length - 1)]];
      if (eps.length > 4) picks.push(eps[Math.min(eps.length - 2, 5)]);
      return picks;
    })
    .filter(Boolean)
    .slice(0, 4);

  const outcome = OUTCOME[lang][range[1]];
  const label = lang === "fa" ? "فصل" : "Chapters";
  const lessonWord = lang === "fa" ? "درس" : "lessons";
  const after = lang === "fa" ? "بعد از این بخش" : "After this stretch";

  return (
    <motion.div
      style={{
        opacity: still ? (index === 0 ? 1 : 0) : opacity,
        y: still ? 0 : y,
      }}
      data-panel={no}
      /**
       * متنِ پرده وسط‌چین است و بالای قاب می‌نشیند — دقیقاً همان‌جایی
       * که تیترِ هیرو بود.
       *
       * نسخهٔ قبل متن را به دو ستونِ باریکِ کناری شکسته بود. مشکلش این
       * بود که هر ستون به بیست‌وپنج درصدِ عرض می‌رسید و جمله‌ها در آن
       * عرض تکه‌تکه می‌شدند؛ چشم هم مجبور بود بینِ دو لبهٔ دور از هم
       * برود و برگردد. یک لنگرِ ثابتِ وسط، هم خواندنی‌تر است و هم
       * پیوستگی می‌سازد: تیتر می‌رود، پردهٔ اول جایش می‌آید، و کاربر
       * حس می‌کند *همان جا* دارد عوض می‌شود نه اینکه صفحه پرید.
       */
      className="pointer-events-none absolute inset-x-0 top-[7dvh] px-6 text-center sm:top-[9dvh]"
    >
      <span className="block text-[0.66rem] tracking-[0.28em]" style={{ color: VIOLET }}>
        {no}
      </span>

      <h2 className="mx-auto mt-3 max-w-[20ch] text-balance font-normal leading-snug text-[clamp(1.5rem,3.6vw,2.6rem)]">
        {head}
      </h2>

      <motion.p
        className="mx-auto mt-4 max-w-[36rem] text-balance text-[0.82rem] leading-loose sm:text-[0.92rem]"
        style={{ color: still ? MUTE : mute }}
      >
        {body}
      </motion.p>

      {/*
        اسمِ چند درسِ واقعی، به‌شکلِ چیپ.
        فهرستِ عمودی اینجا بلوک را دو برابر بلند می‌کرد و روی جسم
        می‌افتاد؛ یک ردیفِ افقی همان اطلاعات را در یک خط می‌دهد. روی
        موبایل حذف می‌شود، چون آنجا ارتفاع گران‌ترین چیز است.
      */}
      <ul className="mt-6 hidden flex-wrap justify-center gap-2 sm:flex">
        {lessons.map((l) => (
          <motion.li
            key={l}
            className="rounded-full border px-3.5 py-1.5 text-[0.72rem]"
            style={{ borderColor: still ? DAY_LINE : line, color: still ? MUTE : mute }}
          >
            {l}
          </motion.li>
        ))}
        <motion.li
          className="rounded-full border border-dashed px-3.5 py-1.5 text-[0.72rem]"
          style={{ borderColor: still ? DAY_LINE : line, color: still ? MUTE : mute }}
        >
          {label} {missions[0].no}–{missions[missions.length - 1].no} ·{" "}
          {lang === "fa" ? faNum(lessonCount) : lessonCount} {lessonWord}
        </motion.li>
      </ul>

      <motion.p
        className="mx-auto mt-5 hidden max-w-[34rem] text-[0.78rem] leading-relaxed sm:block"
        style={{ color: still ? MUTE : mute }}
      >
        <span style={{ color: VIOLET_INK }}>{after} — </span>
        {outcome}
      </motion.p>
    </motion.div>
  );
}

