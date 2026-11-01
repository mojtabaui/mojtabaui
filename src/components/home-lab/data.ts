/**
 * داده‌ی مشترک دو نسخه‌ی آزمایشی صفحه‌ی خانه (/home-v2 و /home-v3).
 *
 * هیچ عدد یا حرفی این‌جا ساخته نمی‌شه: دوره‌ها، نظر شاگردها، پروژه‌ها و
 * سؤال‌ها همون منبع صفحه‌ی خانه‌ی اصلی‌ان. فقط شکلشون برای چیدمان جدید
 * آماده می‌شه.
 */
import { infinityCourses, videoCourses, formatPrice, articles, featuredProjects } from "@/lib/mock-data";
import { HOME } from "@/lib/i18n/dict/home";
import { TESTIMONIALS } from "@/lib/i18n/dict/testimonials";
import { localizeCourses } from "@/lib/i18n/content/courses";
import { MISSIONS, EPISODE_COUNT } from "@/lib/odyssey";
import { PRICING, currentTier } from "@/lib/ai7-curriculum";
import type { Lang } from "@/lib/i18n";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export const num = (n: number, lang: Lang) =>
  lang === "fa" ? String(n).replace(/\d/g, (d) => FA_DIGITS[Number(d)]) : String(n);

/** شماره‌ی فصل دو رقمی، مثل برندبوک: ۰۱، ۰۲ */
export const chapter = (n: number, lang: Lang) => num(n, lang).padStart(2, lang === "fa" ? "۰" : "0");

export function getHomeData(lang: Lang) {
  const t = HOME[lang];
  const infinity = localizeCourses(infinityCourses, lang);
  const videos = localizeCourses(videoCourses, lang);

  const courses = [...infinity, ...videos].map((c) => ({
    slug: c.slug,
    title: c.title,
    latin: c.subtitle,
    videoHours: num(c.videoHours, lang),
    projects: num(c.projects, lang),
    price: formatPrice(c.price, lang),
    closed: Boolean(c.comingSoon),
    mentoring: c.type === "infinity",
  }));

  // عنوان پروژه‌ها «اسم — نوع» نوشته شده. دو تکه‌ش می‌کنیم تا اسم درشت و
  // نوع کوچیک زیرش بشینه.
  const projects = featuredProjects.map((p) => {
    const [name, kind] = p.projectTitle.split(/\s+—\s+/);
    return {
      id: p.id,
      name,
      kind: kind ?? "",
      cohort: p.cohort?.replace(/\s+—\s+/, lang === "fa" ? "، " : ", ") ?? "",
      url: p.url,
      cover: p.coverImage,
      figma: p.linkType === "figma",
    };
  });

  const tier = currentTier(lang);

  return {
    t,
    courses,
    projects,
    testimonials: TESTIMONIALS[lang],
    faqs: (infinity[0]?.faqs ?? []).slice(0, 6),
    articles: lang === "fa" ? articles.slice(0, 4) : [],
    tracks: t.howItWorks.tracks,
    notes: t.howItWorks.notes,
    robotype: {
      chapters: num(MISSIONS.length, lang),
      lessons: num(EPISODE_COUNT, lang),
      price: tier.price,
      unit: PRICING[lang].unit,
    },
  };
}

export const TELEGRAM = "https://t.me/melina_support";
