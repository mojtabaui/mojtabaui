import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { pickCampaign, type CampaignInfo } from "@/lib/campaign";
import { robotypeOffer } from "@/lib/ai7-curriculum";

export const CAMPAIGN_TAG = "campaign";

/**
 * کمپین‌های فعال، کش‌شده. هر بازدید از صفحهٔ اصلی یک کوئری به Neon نمی‌زنه؛
 * ادمین که ذخیره کنه تگ باطل می‌شه، وگرنه هر پنج دقیقه تازه می‌شه.
 *
 * مرحلهٔ کمپین (شروع/پایان) این‌جا حساب نمی‌شه، چون نتیجهٔ کش ممکنه
 * چند دقیقه کهنه باشه؛ صفحه با ساعتِ لحظهٔ خودش تصمیم می‌گیره.
 */
const loadActiveCampaigns = unstable_cache(
  async (): Promise<CampaignInfo[]> => {
    try {
      const rows = await prisma.campaign.findMany({
        where: { active: true },
        orderBy: { startsAt: "asc" },
      });
      return rows.map((r) => ({
        id: r.id,
        title: r.title,
        subtitle: r.subtitle,
        startsAt: r.startsAt.toISOString(),
        endsAt: r.endsAt.toISOString(),
        active: r.active,
        prices: normalizePrices(r.prices),
      }));
    } catch (err) {
      // جدول هنوز ساخته نشده یا دیتابیس در دسترس نیست: صفحهٔ اصلی نباید بخوابه
      console.error("[campaign] load failed", err);
      return [];
    }
  },
  ["active-campaigns"],
  { tags: [CAMPAIGN_TAG], revalidate: 300 },
);

/** کمپینی که الان باید روی سایت دیده بشه، به‌همراه لحظه‌ای که باهاش سنجیده شد */
export async function getCurrentCampaign(): Promise<{ campaign: CampaignInfo | null; now: number }> {
  const now = Date.now();
  const list = await loadActiveCampaigns();
  return { campaign: pickCampaign(list, now), now };
}

/** قیمت کمپینی روبوتایپ برای این لحظه؛ null یعنی همون قیمت اصلی */
export async function getRobotypeOffer(lang: "fa" | "en") {
  const { campaign, now } = await getCurrentCampaign();
  return robotypeOffer(campaign, now, lang);
}

export function normalizePrices(raw: unknown): Record<string, number> {
  const out: Record<string, number> = {};
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      const n = Math.round(Number(v));
      if (Number.isFinite(n) && n > 0) out[k] = n;
    }
  }
  return out;
}
