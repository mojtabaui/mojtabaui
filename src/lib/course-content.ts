import type { Lang } from "@/lib/i18n";

/**
 * محتوای مشترکِ صفحه‌ی دوره‌ها — معرفی رشته، پیش‌نیازها، مسیر یادگیری و ضمانت‌ها.
 *
 * به‌جای تکرار این متن‌ها داخل تک‌تک دوره‌ها در mock-data، بر اساس «رشته‌ی» دوره
 * (UI / UX / مهارتی) ساخته می‌شن. اضافه‌کردن دوره‌ی جدید نیاز به تغییر اینجا نداره.
 *
 * این فایل برخلاف mock-data متنه نه داده، پس دو زبان همین‌جا کنار هم می‌شینن
 * به‌جای اینکه انگلیسی توی فایل جدا روش سوار بشه — جدا که باشن یکی عوض می‌شه و
 * اون یکی جا می‌مونه.
 */

export type Discipline = "UI" | "UX" | "SKILL";

/** رشته‌ی دوره را از روی slug تشخیص می‌ده */
export function disciplineOf(slug: string): Discipline {
  if (slug.startsWith("ui-")) return "UI";
  if (slug.startsWith("ux-")) return "UX";
  return "SKILL";
}

interface ComparisonCard {
  label: string;
  question: string;
  desc: string;
  items: string[];
}

/** دو کارت ثابتِ مقایسه — در همه‌ی دوره‌ها نمایش داده می‌شه */
const UI_VS_UX: Record<Lang, { ui: ComparisonCard; ux: ComparisonCard }> = {
  fa: {
    ui: {
      label: "UI — طراحی رابط کاربری",
      question: "«محصول چه شکلیه؟»",
      desc: "لایه‌ی دیداری محصول: رنگ، تایپوگرافی، فاصله‌ها، آیکون‌ها، کامپوننت‌ها و دیزاین‌سیستم. کاری می‌کنه محصول تمیز، حرفه‌ای و قابل‌اعتماد به‌نظر برسه.",
      items: ["رنگ و تایپوگرافی", "گرید و فاصله‌گذاری", "کامپوننت و دیزاین‌سیستم", "ظاهر نهایی صفحه‌ها"],
    },
    ux: {
      label: "UX — طراحی تجربه کاربری",
      question: "«کار کردن باهاش چه حسیه؟»",
      desc: "لایه‌ی منطقی محصول: فهمیدن مسئله‌ی کاربر، معماری اطلاعات، طراحی مسیرها و تست‌کردن. کاری می‌کنه کاربر بدون سردرگمی به هدفش برسه.",
      items: ["تحقیق کاربر", "معماری اطلاعات", "جریان کاربری و وایرفریم", "تست و بازطراحی"],
    },
  },
  en: {
    ui: {
      label: "UI — user interface design",
      question: "“What does the product look like?”",
      desc: "The visual layer of a product: colour, typography, spacing, icons, components and the design system. It's what makes a product look clean, professional and worth trusting.",
      items: ["Colour and typography", "Grids and spacing", "Components and design systems", "How the screens finally look"],
    },
    ux: {
      label: "UX — user experience design",
      question: "“What is it like to use?”",
      desc: "The reasoning layer of a product: understanding the user's problem, information architecture, designing the paths through it, and testing. It's what gets a user to their goal without confusion.",
      items: ["User research", "Information architecture", "User flows and wireframes", "Testing and redesign"],
    },
  },
};

export function uiVsUxFor(lang: Lang) {
  return UI_VS_UX[lang];
}

interface DisciplineContent {
  /** پاراگراف معرفیِ مخصوص همین رشته */
  intro: string;
  /** این رشته به درد کیا می‌خوره */
  goodFor: string[];
  prerequisites: string[];
  roadmap: { title: string; desc: string }[];
}

const CONTENT: Record<Lang, Record<Discipline, DisciplineContent>> = {
  fa: {
    UI: {
      intro:
        "طراحی رابط کاربری یعنی ساختنِ لایه‌ای که کاربر می‌بینه و لمسش می‌کنه. یه UI خوب فقط «قشنگ» نیست — با رنگ، فاصله و سلسله‌مراتب درست، مسیر چشم کاربر رو هدایت می‌کنه و به محصول اعتبار می‌ده. این دوره از صفر شروع می‌شه و کاری می‌کنه بتونی خروجیِ قابل‌ارائه به بازار کار بسازی.",
      goodFor: [
        "کسی که از صفر می‌خواد وارد دنیای دیزاین بشه",
        "گرافیستی که می‌خواد به دیجیتال و محصول کوچ کنه",
        "توسعه‌دهنده‌ای که می‌خواد خروجی کارش حرفه‌ای‌تر دیده بشه",
        "فریلنسری که دنبال پروژه‌های بهترِ طراحی رابطه",
      ],
      prerequisites: [
        "هیچ پیش‌نیاز تخصصی لازم نیست — از صفر شروع می‌کنیم",
        "یک لپ‌تاپ یا کامپیوتر برای کار با فیگما (رایگان)",
        "آشنایی معمولی با کامپیوتر و اینترنت",
        "هفته‌ای چند ساعت وقت برای تمرین — یادگیری با تمرین جا می‌افته",
      ],
      roadmap: [
        { title: "مبانی و فیگما", desc: "محیط فیگما، فریم‌ها و ابزارهای پایه — تا راحت بتونی هر ایده‌ای رو پیاده کنی." },
        { title: "اصول بصری", desc: "رنگ، تایپوگرافی، گرید و فاصله‌گذاری — چیزی که کار آماتور رو از حرفه‌ای جدا می‌کنه." },
        { title: "کامپوننت و دیزاین‌سیستم", desc: "ساختن اجزای قابل‌استفاده‌ی مجدد و یکدست‌کردن کل محصول." },
        { title: "پروژه‌ی واقعی", desc: "یه محصول کامل رو از اول تا آخر طراحی می‌کنی و فیدبک مستقیم می‌گیری." },
        { title: "پرتفولیو و بازار کار", desc: "خروجی رو جوری می‌چینی که کارفرما ببینه و جذب شه." },
      ],
    },
    UX: {
      intro:
        "طراحی تجربه کاربری یعنی قبل از اینکه چیزی رو قشنگ کنی، مطمئن شی درست کار می‌کنه. UX از مسئله‌ی کاربر شروع می‌شه: تحقیق می‌کنی، مسیر می‌سازی، تست می‌کنی و اصلاح می‌کنی. این دوره یادت می‌ده تصمیم‌های طراحی رو با دلیل بگیری، نه با سلیقه.",
      goodFor: [
        "کسی که می‌خواد پشتِ تصمیم‌های طراحی، منطق و داده داشته باشه",
        "طراح UI که می‌خواد از سطح ظاهر عبور کنه و کامل‌تر بشه",
        "مدیر محصول یا کارآفرینی که می‌خواد محصولش واقعاً استفاده بشه",
        "کسی که دنبال کیس‌استادی قوی برای پرتفولیوئه",
      ],
      prerequisites: [
        "هیچ پیش‌نیاز تخصصی لازم نیست — از مفاهیم پایه شروع می‌کنیم",
        "یک لپ‌تاپ یا کامپیوتر برای فیگما و فیگ‌جم (رایگان)",
        "کمی حوصله برای تحقیق و نوشتن — UX بخش تحلیلی داره",
        "هفته‌ای چند ساعت وقت برای تمرین و انجام پروژه",
      ],
      roadmap: [
        { title: "درک مسئله", desc: "یاد می‌گیری مسئله‌ی واقعی کاربر رو پیدا کنی، نه چیزی که فکر می‌کنی مسئله‌ست." },
        { title: "تحقیق کاربر", desc: "مصاحبه، پرسونا و جمع‌آوری داده — پایه‌ی هر تصمیم درست طراحی." },
        { title: "معماری اطلاعات و جریان", desc: "ساختار محتوا و مسیرهای کاربر رو می‌چینی تا کسی گم نشه." },
        { title: "وایرفریم و پروتوتایپ", desc: "ایده رو سریع قابل‌لمس می‌کنی تا زودتر بشه تستش کرد." },
        { title: "تست و کیس‌استادی", desc: "با کاربر واقعی تست می‌کنی و نتیجه رو به یه کیس‌استادی حرفه‌ای تبدیل می‌کنی." },
      ],
    },
    SKILL: {
      intro:
        "این دوره روی یک مهارت مشخص و کاربردی تمرکز داره — به‌جای پوشش‌دادن همه‌چیز، عمیق روی چیزی کار می‌کنی که مستقیم به کیفیت کار و پرتفولیوت اضافه می‌شه.",
      goodFor: [
        "کسی که پایه‌ی دیزاین داره و می‌خواد یک مهارت خاص رو عمیق کنه",
        "طراحی که می‌خواد سرعت و کیفیت خروجیش رو ببره بالا",
        "فریلنسری که دنبال تمایز در پرتفولیوئه",
      ],
      prerequisites: [
        "آشنایی مقدماتی با فیگما کمک می‌کنه (ولی الزامی نیست)",
        "یک لپ‌تاپ یا کامپیوتر",
        "وقت برای تمرینِ همراهِ دوره",
      ],
      roadmap: [
        { title: "مبانی", desc: "مفاهیم پایه‌ای که بقیه‌ی دوره روش ساخته می‌شه." },
        { title: "تمرین هدایت‌شده", desc: "قدم‌به‌قدم همراه دوره تمرین می‌کنی." },
        { title: "پروژه", desc: "خروجی واقعی می‌سازی که قابل ارائه باشه." },
      ],
    },
  },

  en: {
    UI: {
      intro:
        "User interface design means building the layer a person sees and touches. A good UI isn't merely “pretty” — with the right colour, spacing and hierarchy it leads the eye and lends the product credibility. This course starts from zero and gets you to output you can put in front of the market.",
      goodFor: [
        "Someone starting design from nothing at all",
        "A graphic designer moving across to digital and product work",
        "A developer who wants their work to look properly finished",
        "A freelancer after better interface design work",
      ],
      prerequisites: [
        "No specialist prerequisites — we start from zero",
        "A laptop or computer for Figma, which is free",
        "Ordinary familiarity with a computer and the internet",
        "A few hours a week to practise — this only sticks through practice",
      ],
      roadmap: [
        { title: "Fundamentals and Figma", desc: "The Figma window, frames and the basic tools — until you can build any idea comfortably." },
        { title: "Visual principles", desc: "Colour, typography, grids and spacing — what separates amateur work from professional work." },
        { title: "Components and design systems", desc: "Building reusable pieces and making the whole product consistent." },
        { title: "A real project", desc: "You design a complete product end to end and get direct feedback on it." },
        { title: "Portfolio and the job market", desc: "Arranging the work so an employer sees it and wants it." },
      ],
    },
    UX: {
      intro:
        "User experience design means making sure something works before you make it beautiful. UX starts from the user's problem: you research, you build a path, you test it and you fix it. This course teaches you to make design decisions for a reason rather than by taste.",
      goodFor: [
        "Someone who wants reasoning and data behind their design decisions",
        "A UI designer who wants to get past the surface and become complete",
        "A product manager or founder who wants their product actually used",
        "Anyone after a strong case study for their portfolio",
      ],
      prerequisites: [
        "No specialist prerequisites — we start from the basic concepts",
        "A laptop or computer for Figma and FigJam, both free",
        "Some patience for research and writing — UX has an analytical half",
        "A few hours a week to practise and work on the project",
      ],
      roadmap: [
        { title: "Understanding the problem", desc: "You learn to find the user's real problem, not the one you assume it is." },
        { title: "User research", desc: "Interviews, personas and gathering data — the foundation under every sound decision." },
        { title: "Information architecture and flows", desc: "You arrange the content and the user's routes so that nobody gets lost." },
        { title: "Wireframes and prototypes", desc: "You make the idea tangible quickly so it can be tested sooner." },
        { title: "Testing and the case study", desc: "You test with real users and turn the result into a professional case study." },
      ],
    },
    SKILL: {
      intro:
        "This course concentrates on one specific, practical skill — rather than covering everything, you go deep on something that adds directly to the quality of your work and your portfolio.",
      goodFor: [
        "Someone with design fundamentals who wants to go deep on one skill",
        "A designer who wants to raise both the speed and the quality of their output",
        "A freelancer looking for something that sets their portfolio apart",
      ],
      prerequisites: [
        "A basic familiarity with Figma helps, though it isn't required",
        "A laptop or computer",
        "Time to practise alongside the course",
      ],
      roadmap: [
        { title: "Fundamentals", desc: "The base concepts the rest of the course is built on." },
        { title: "Guided practice", desc: "You practise step by step alongside the course." },
        { title: "The project", desc: "You build something real that stands up to being shown." },
      ],
    },
  },
};

export function contentFor(slug: string, lang: Lang): DisciplineContent {
  return CONTENT[lang][disciplineOf(slug)];
}

/** ضمانت‌های مشترک همه‌ی دوره‌ها */
const GUARANTEES: Record<Lang, { title: string; desc: string }[]> = {
  fa: [
    {
      title: "گواهی با کد استعلام",
      desc: "بعد از دوره گواهی می‌گیری که کدش روی سایت قابل استعلامه — قابل ارائه به کارفرما.",
    },
    {
      title: "پاسخ مستقیم مدرس",
      desc: "سوالت رو خودِ مجتبا جواب می‌ده، نه ربات و نه اپراتور.",
    },
    {
      title: "پروژه‌ی واقعی برای پرتفولیو",
      desc: "خروجی دوره یه فایل تمرینی نیست — پروژه‌ایه که می‌تونی نشون بدی.",
    },
    {
      title: "دسترسی دائمی به ویدیوها",
      desc: "ویدیوها بعد از دوره هم در دسترست می‌مونن تا هر وقت خواستی مرور کنی.",
    },
  ],
  en: [
    {
      title: "A certificate you can verify",
      desc: "At the end you get a certificate whose code can be checked on the site — something you can hand to an employer.",
    },
    {
      title: "Answers from the teacher",
      desc: "Mojtaba answers your question himself. Not a bot, not an operator.",
    },
    {
      title: "A real project for your portfolio",
      desc: "What comes out of the course isn't a practice file — it's a project you can show.",
    },
    {
      title: "The videos stay yours",
      desc: "The videos remain available after the course, to go back over whenever you want.",
    },
  ],
};

export function guaranteesFor(lang: Lang) {
  return GUARANTEES[lang];
}
