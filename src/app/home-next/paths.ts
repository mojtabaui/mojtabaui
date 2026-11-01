/**
 * چهار مسیر صفحه‌ی /home-next.
 *
 * هر مسیر فقط از چیزهایی ساخته شده که سایت واقعاً داره: دوره‌ها و
 * قیمت‌هاشون، حرف شاگردهایی که دقیقاً همون موقعیت رو داشتن، نوشته‌ها و
 * آموزش‌های رایگان. مسیر AI نظر شاگرد نداره چون دوره تازه‌ست و هنوز
 * نظری ثبت نشده؛ جاش رو با برنامه‌ی دوره پر نکردیم.
 */
import { courses as allCourses, formatPrice, articles, freeResources } from "@/lib/mock-data";
import { localizeCourses } from "@/lib/i18n/content/courses";
import { TESTIMONIALS } from "@/lib/i18n/dict/testimonials";
import { MISSIONS, EPISODE_COUNT } from "@/lib/odyssey";
import { PRICING, currentTier } from "@/lib/ai7-curriculum";
import type { Lang } from "@/lib/i18n";

export type Fact = { title: string; meta: string[]; href: string; closed?: string };
export type Quote = { text: string; name: string; role: string };
export type LinkItem = { title: string; meta: string; href: string; external?: boolean };

export type PathData = {
  id: "zero" | "ai" | "job" | "unsure";
  label: string;
  hint: string;
  route: string;
  intro: string;
  step: { label: string; href: string; external?: boolean };
  courses: Fact[];
  quotes: Quote[];
  links: { title: string; items: LinkItem[] } | null;
};

const FA = "۰۱۲۳۴۵۶۷۸۹";
export const num = (n: number, lang: Lang) =>
  lang === "fa" ? String(n).replace(/\d/g, (d) => FA[Number(d)]) : String(n);

export const TELEGRAM = "https://t.me/melina_support";

export function courseFacts(lang: Lang) {
  const fa = lang === "fa";
  return localizeCourses(allCourses, lang).map((c) => ({
    slug: c.slug,
    title: c.title,
    latin: c.subtitle,
    fact: {
      title: c.title,
      href: `/courses/${c.slug}`,
      meta: [
        fa ? `${num(c.videoHours, lang)} ساعت ویدیو` : `${c.videoHours} hours of video`,
        fa ? `${num(c.projects, lang)} پروژه` : `${c.projects} projects`,
        ...(c.comingSoon ? [] : [formatPrice(c.price, lang)]),
      ],
      closed: c.comingSoon ? (fa ? "ثبت‌نام فعلاً بسته‌ست" : "Enrolment closed for now") : undefined,
    } satisfies Fact,
    mentoring: c.type === "infinity",
  }));
}

export function getPaths(lang: Lang): PathData[] {
  const fa = lang === "fa";
  const facts = Object.fromEntries(courseFacts(lang).map((c) => [c.slug, c.fact]));
  const t = TESTIMONIALS[lang];
  const q = (i: number): Quote => ({ text: t[i].text, name: t[i].name, role: t[i].role });
  const tier = currentTier(lang);

  const aiArticles = fa
    ? ["ai-and-designer-job", "prompting-for-designers", "designing-ai-interfaces"]
        .map((slug) => articles.find((a) => a.slug === slug))
        .filter((a) => a !== undefined)
        .map((a) => ({ title: a.title, meta: `${num(a.readTime, lang)} دقیقه خواندن`, href: `/articles/${a.slug}` }))
    : [];

  const free = (title: string) => freeResources.find((r) => r.title === title);
  const freeStart = free("شروع و کسب درآمد از UI/UX دیزاین");
  const freeNoJob = free("چطور بدون پروژه و سابقه کار مشغول بشیم؟");

  return [
    {
      id: "zero",
      label: fa ? "از صفر شروع می‌کنم" : "I'm starting from zero",
      hint: fa ? "تا حالا دیزاین کار نکردم" : "I've never done design work",
      route: fa ? "مسیر تو: از صفر" : "Your path: from zero",
      intro: fa
        ? "لازم نیست قبلش چیزی بلد باشی. اول با چک‌لیست ببین چی قراره یاد بگیری، بعد با یکی از دو دوره‌ی پایه شروع کن. هر دو پروژه‌ی واقعی دارن."
        : "You don't need to know anything first. Use the checklist to see what's ahead, then start with one of the two foundation courses. Both have real projects.",
      step: { label: fa ? "چک‌لیست یادگیری از صفر" : "The learning checklist", href: "/checklist" },
      courses: [facts["ui-offline"], facts["ux-offline"]].filter(Boolean),
      quotes: [q(4), q(5)],
      links: null,
    },
    {
      id: "ai",
      label: fa ? "طراحم، می‌خوام AI یاد بگیرم" : "I design, and want to learn AI",
      hint: fa ? "پرامپت، ایجنت، ساختن و منتشر کردن" : "Prompts, agents, building and shipping",
      route: fa ? "مسیر تو: طراحی با هوش مصنوعی" : "Your path: designing with AI",
      intro: fa
        ? "دوره‌ی ROBOTYPE از اولین پرامپت شروع می‌شه و به محصولی می‌رسه که خودت می‌سازی و منتشر می‌کنی. هر فصل یک تکه از یک پروژه‌ی واقعی رو جلو می‌بره."
        : "ROBOTYPE starts at your first prompt and ends at a product you build and ship yourself. Each chapter moves a real project forward.",
      step: { label: fa ? "برنامه‌ی دوره‌ی ROBOTYPE" : "ROBOTYPE syllabus", href: "/robotype" },
      courses: [
        {
          title: "ROBOTYPE",
          href: "/robotype",
          meta: [
            fa ? `${num(MISSIONS.length, lang)} فصل` : `${MISSIONS.length} chapters`,
            fa ? `${num(EPISODE_COUNT, lang)} درس ضبط‌شده` : `${EPISODE_COUNT} recorded lessons`,
            `${tier.price} ${PRICING[lang].unit}`,
          ],
        },
      ],
      quotes: [],
      links: aiArticles.length ? { title: fa ? "قبلش این‌ها رو بخون" : "", items: aiArticles } : null,
    },
    {
      id: "job",
      label: fa ? "می‌خوام کار پیدا کنم" : "I want to get hired",
      hint: fa ? "پرتفولیو، مصاحبه، اولین موقعیت" : "Portfolio, interviews, a first role",
      route: fa ? "مسیر تو: اولین موقعیت کاری" : "Your path: a first design role",
      intro: fa
        ? "کارفرما اول پرتفولیو رو می‌بینه. دوره‌ی پرتفولیو یاد می‌ده کارهات رو چطور روایت کنی، و پروتوتایپ کمک می‌کنه نمونه‌ها زنده دیده بشن."
        : "Employers look at the portfolio first. The portfolio course teaches you to tell the story of your work, and prototyping makes your samples feel alive.",
      step: { label: fa ? "دوره‌ی طراحی پرتفولیو" : "Portfolio design course", href: "/courses/portfolio" },
      courses: [facts["portfolio"], facts["prototype"]].filter(Boolean),
      quotes: [q(0), q(6)],
      links:
        fa && freeNoJob?.url
          ? { title: "رایگان", items: [{ title: freeNoJob.title, meta: freeNoJob.meta, href: freeNoJob.url, external: true }] }
          : null,
    },
    {
      id: "unsure",
      label: fa ? "هنوز مطمئن نیستم" : "I'm not sure yet",
      hint: fa ? "UI یا UX؟ اصلاً این کار مال منه؟" : "UI or UX? Is this even for me?",
      route: fa ? "مسیر تو: اول مطمئن شو" : "Your path: find out first",
      intro: fa
        ? "قبل از خرج کردن، رایگان امتحانش کن. اگه بعدش هنوز سؤال داشتی، توی تلگرام بپرس. اگه دوره‌ای برات مناسب نبود، همون‌جا گفته می‌شه."
        : "Try it for free before you spend anything. If you still have questions, ask on Telegram. If a course isn't right for you, you'll be told so.",
      step: { label: fa ? "پرسیدن در تلگرام" : "Ask on Telegram", href: TELEGRAM, external: true },
      courses: [],
      quotes: [q(1)],
      links: {
        title: fa ? "رایگان" : "Free",
        items: [
          ...(fa && freeStart?.url ? [{ title: freeStart.title, meta: freeStart.meta, href: freeStart.url, external: true }] : []),
          { title: fa ? "همه‌ی آموزش‌های رایگان" : "All free resources", meta: fa ? "ویدیو، ویس و فایل" : "Videos, voice notes and files", href: "/free" },
          { title: fa ? "چک‌لیست یادگیری از صفر" : "The learning checklist", meta: fa ? "ببین چی در انتظارته" : "See what's ahead", href: "/checklist" },
        ],
      },
    },
  ];
}
