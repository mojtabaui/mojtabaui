import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { normalizePrices } from "@/lib/campaign.server";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

/**
 * بدنهٔ فرم کمپین رو می‌خونه. تاریخ‌ها از کلاینت ISO میان (تبدیل شمسی و
 * ساعت تهران همون‌جا انجام شده) و این‌جا فقط درستی‌شون سنجیده می‌شه.
 */
export function parseCampaignBody(body: Record<string, unknown>) {
  const title = String(body.title ?? "").trim().slice(0, 120);
  const subtitle = String(body.subtitle ?? "").trim().slice(0, 200);
  const startsAt = new Date(String(body.startsAt ?? ""));
  const endsAt = new Date(String(body.endsAt ?? ""));
  const active = body.active === undefined ? true : Boolean(body.active);
  const prices = normalizePrices(body.prices);

  if (!title) return { error: "عنوان کمپین خالیه" } as const;
  if (Number.isNaN(startsAt.getTime())) return { error: "تاریخ شروع درست نیست" } as const;
  if (Number.isNaN(endsAt.getTime())) return { error: "تاریخ پایان درست نیست" } as const;
  if (endsAt <= startsAt) return { error: "پایان کمپین باید بعد از شروعش باشه" } as const;

  return { data: { title, subtitle, startsAt, endsAt, active, prices } } as const;
}
