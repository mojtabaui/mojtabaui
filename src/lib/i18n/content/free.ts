import type { FreeResource } from "@/lib/mock-data";
import type { Lang } from "@/lib/i18n";

/**
 * ترجمهٔ منابع رایگان. کلید همون id منبعه.
 *
 * خودِ منابع فارسی‌ان — ویدیوها و ویس‌ها فارسی ضبط شدن و PDFها فارسی نوشته
 * شدن. توضیح انگلیسی این رو صریح می‌گه به‌جای اینکه کاربر انگلیسی‌زبان دانلود
 * کنه و بعد بفهمه. عنوان و توضیح ترجمه می‌شن تا بشه فهمید چی هست، ولی وعده‌ی
 * انگلیسی بودنِ محتوا داده نمی‌شه.
 */

export type FreeOverlay = Partial<
  Pick<FreeResource, "title" | "description" | "meta" | "cta">
>;

const EN: Record<string, FreeOverlay> = {
  "course-earning": {
    title: "Starting out and earning from UI/UX design",
    description:
      "Sixteen videos from scratch: what UI and UX actually are, what each job involves, the false beliefs around this field, and the real ways to earn from it — employment, freelancing and passive income. In Persian.",
    meta: "16 videos · free",
  },
  "course-smart-designer": {
    title: "A designer who earns is a designer who thinks",
    description:
      "Seven days, seven voice sessions, each standing on its own: earning intelligently, a portfolio that sells, landing the first project, building experience without a real client, and working internationally. In Persian.",
    meta: "7 voice notes · 7 days",
  },
  "voice-ideation": {
    title: "Finding ideas, for designers",
    description:
      "The key moves for finding a design idea. Useful for UI, graphic and social media designers alike. In Persian.",
    meta: "Telegram voice note",
  },
  "voice-no-experience": {
    title: "How do you get work with no projects and no track record?",
    description:
      "Why prior work experience is no longer the gate in this field, and the one mistake that is still keeping you out. In Persian.",
    meta: "Telegram voice note",
  },
  "file-1": {
    title: "50 poster design prompts",
    description:
      "Fifty ready-made prompts for poster design, each with a visual example so you can see what comes out.",
    meta: "PDF · 5.9 MB",
  },
  "file-2": {
    title: "700 ChatGPT prompts",
    description:
      "A set of 700 ready-made prompts to copy straight across and use in your own work.",
    meta: "PDF · 1.5 MB",
  },
  "file-capsule": {
    title: "The UI/UX capsule handbook",
    description:
      "A fast way in: an introduction and a short history of the field, the system a designer needs, and a summary of every UX and UI topic with material to learn each one from. Gathered from articles and from my own practice. In Persian.",
    meta: "Handbook · Telegram",
    cta: "Get the handbook on Telegram",
  },
};

/** منابع را به زبان خواسته‌شده برمی‌گرداند؛ فارسی دست‌نخورده رد می‌شه */
export function localizeFreeResources(
  resources: readonly FreeResource[],
  lang: Lang
): FreeResource[] {
  if (lang === "fa") return [...resources];
  return resources.map((r) => ({ ...r, ...EN[r.id] }));
}
