/**
 * کوادکمپ — بوت‌کمپ طراحی محصول. محتوای گواهی و ترم‌هاش.
 *
 * بوت‌کمپ چهار دوره پشت سر همه: تجربه کاربری، رابط کاربری، تعامل، و
 * پرتفولیو. ولی تعداد پروژه‌ها بین ترم‌ها فرق داشت، پس متن گواهی باید
 * بدونه دارنده‌اش مال کدوم ترم بوده:
 *
 *   • تابستان ۱۴۰۴ → چهار پروژه: دو تجربه کاربری، دو رابط کاربری
 *   • پاییز ۱۴۰۴   → سه پروژه:  دو تجربه کاربری، یک رابط کاربری
 *
 * ترم توی ستون year جدول Certificate ذخیره می‌شه (SUMMER / FALL). کوادکمپ
 * سال نداشت و اون ستون براش خالی بود، و این‌طوری برای اضافه کردن یک فیلد
 * لازم نیست به دیتابیس زنده دست بزنیم. کد گواهی (QC0001) به این ستون
 * وابسته نیست، پس شماره‌گذاری بین ترم‌ها مشترک می‌مونه.
 */

export type QcCohort = "SUMMER" | "FALL";

export const QC_COHORTS: QcCohort[] = ["SUMMER", "FALL"];

interface CohortInfo {
  /** روی خود گواهی (انگلیسی) */
  en: string;
  /** توی پنل ادمین و نتیجه‌ی استعلام */
  fa: string;
  projects: { ux: number; ui: number };
}

export const COHORT_INFO: Record<QcCohort, CohortInfo> = {
  SUMMER: { en: "Summer 2025", fa: "تابستان ۱۴۰۴", projects: { ux: 2, ui: 2 } },
  FALL: { en: "Autumn 2025", fa: "پاییز ۱۴۰۴", projects: { ux: 2, ui: 1 } },
};

/** مقدار ورودی (از فرم یا query) رو به ترم معتبر تبدیل می‌کنه، یا null */
export function parseCohort(raw: string | null | undefined): QcCohort | null {
  const v = (raw ?? "").trim().toUpperCase();
  return (QC_COHORTS as string[]).includes(v) ? (v as QcCohort) : null;
}

const SHAMSI_MONTH = /^\s*14\d\d\s*[/.\-]\s*(\d{1,2})/;
const SUMMER_EN = /\b(jun|jul|aug)/i;

/**
 * ترمِ یک گواهی.
 *
 * گواهی‌هایی که قبل از اضافه شدن ترم صادر شدن year خالی دارن؛ برای اون‌ها
 * از تاریخ شروع حدس می‌زنیم (تیر تا شهریور، یا June تا August → تابستان).
 * اگه از تاریخ هم چیزی درنیومد، آخرین ترم یعنی پاییز.
 */
export function resolveCohort(year: string | null, startDate: string): QcCohort {
  const stored = parseCohort(year);
  if (stored) return stored;

  const shamsi = startDate.match(SHAMSI_MONTH);
  if (shamsi) {
    const m = Number(shamsi[1]);
    return m >= 4 && m <= 6 ? "SUMMER" : "FALL";
  }
  if (SUMMER_EN.test(startDate)) return "SUMMER";
  return "FALL";
}

export const QC_HOURS = 400;

export interface QcModule {
  /** کوتاه، برای برچسب کاشی */
  tag: string;
  title: string;
  skills: string[];
}

/**
 * چهار دوره‌ی بوت‌کمپ با سرفصل‌هاشون.
 *
 * تجربه و رابط از فصل‌های دوره‌های تکی همین سایت (planner.ts) خلاصه شدن،
 * تعامل از سرفصل دوره‌ی پروتوتایپ، و پرتفولیو از سرفصل دوره‌ی پرتفولیو
 * (mock-data.ts). هر کدوم پنج خط، چون روی سند چهار کاشی کنار هم می‌شینن و
 * باید هم‌قد باشن.
 */
export const QC_MODULES: QcModule[] = [
  {
    tag: "UX",
    title: "User Experience",
    skills: [
      "Design thinking and UX mindsets",
      "Qualitative and quantitative research",
      "Personas and customer journey maps",
      "Information architecture and flows",
      "Wireframes and usability testing",
    ],
  },
  {
    tag: "UI",
    title: "User Interface",
    skills: [
      "Figma, from basics to advanced",
      "Layout, spacing and visual principles",
      "Colour, typography and iconography",
      "Design systems and atomic design",
      "Responsive design and hand-off",
    ],
  },
  {
    tag: "IX",
    title: "Interaction",
    skills: [
      "Triggers, responses and motion",
      "Figma prototyping and smart animate",
      "Interactive components and variables",
      "ProtoPie conditions and chains",
      "Prototype testing and sharing",
    ],
  },
  {
    tag: "PF",
    title: "Portfolio",
    skills: [
      "Case study structure and storytelling",
      "Portfolio website and PDF portfolio",
      "Personal branding and LinkedIn",
      "Designer resume",
      "Presentation and interview",
    ],
  },
];

const WORDS = ["zero", "one", "two", "three", "four", "five", "six"];

/** جمله‌ی پروژه‌ها برای متن گواهی، بر اساس ترم */
export function deliverableSentence(cohort: QcCohort): string {
  const { ux, ui } = COHORT_INFO[cohort].projects;
  const total = WORDS[ux + ui];
  const uiPart = ui === 1 ? "one in user interface design" : `${WORDS[ui]} in user interface design`;
  return `delivering ${total} complete projects — ${WORDS[ux]} in user experience design and ${uiPart}`;
}
