import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowRight, Megaphone, Plus } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { courses } from "@/lib/mock-data";
import { ROBOTYPE_CAMPAIGN_ID, ROBOTYPE_PRICE } from "@/lib/ai7-curriculum";
import { normalizePrices } from "@/lib/campaign.server";
import type { CampaignInfo } from "@/lib/campaign";
import CampaignForm from "@/components/admin/CampaignForm";
import CampaignRow from "@/components/admin/CampaignRow";
import PanelThemeToggle from "@/components/admin/PanelThemeToggle";
import { Section, Empty } from "@/components/admin/Section";
import { toPersianDigits } from "@/lib/persian-months";

export const dynamic = "force-dynamic";

export default async function CampaignsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  let rows: Awaited<ReturnType<typeof prisma.campaign.findMany>> = [];
  let dbError = false;
  try {
    rows = await prisma.campaign.findMany({ orderBy: { startsAt: "desc" } });
  } catch {
    // معمولاً یعنی جدول هنوز با prisma db push ساخته نشده
    dbError = true;
  }

  const list: CampaignInfo[] = rows.map((r) => ({
    id: r.id,
    title: r.title,
    subtitle: r.subtitle,
    startsAt: r.startsAt.toISOString(),
    endsAt: r.endsAt.toISOString(),
    active: r.active,
    prices: normalizePrices(r.prices),
  }));

  // همون دوره‌هایی که روی سایت دیده می‌شن، با قیمت پایه‌شون
  // روبوتایپ صفحهٔ خودش رو داره و توی mock-data نیست، پس دستی اضافه می‌شه
  const options = [
    { id: ROBOTYPE_CAMPAIGN_ID, title: "روبوتایپ", price: ROBOTYPE_PRICE },
    ...courses.map((c) => ({ id: c.id, title: c.title, price: c.price })),
  ];
  const now = Date.now();

  return (
    <div className="min-h-screen bg-[var(--page)] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-body text-xs text-[var(--ink-4)] hover:text-[var(--ink-3)] transition-colors mb-2"
            >
              <ArrowRight size={13} />
              برگشت به پنل
            </Link>
            <h1 className="font-body font-semibold text-[var(--ink)] text-xl flex items-center gap-2">
              <Megaphone size={19} className="text-[var(--danger)]" />
              کمپین‌ها
            </h1>
            <p className="font-body text-xs text-[var(--ink-4)] mt-1.5 leading-6">
              قبل از شروع، بالای صفحهٔ اصلی بنری میاد که تا شروع کمپین می‌شمره.
              <br />
              از لحظهٔ شروع، شمارش تا پایان کمپین ادامه پیدا می‌کنه و قیمت‌های کمپینی روی
              کارت‌ها و صفحهٔ دوره‌ها می‌شینن.
            </p>
          </div>
          <PanelThemeToggle />
        </div>

        {dbError && (
          <div className="border border-[var(--warn)]/40 bg-[var(--warn)]/10 rounded-2xl px-5 py-4 font-body text-sm text-[var(--ink-2)] leading-7">
            جدول کمپین‌ها توی دیتابیس پیدا نشد. یک بار{" "}
            <code dir="ltr" className="font-mono text-xs bg-[var(--page)] px-1.5 py-0.5 rounded">
              npx prisma db push
            </code>{" "}
            لازمه.
          </div>
        )}

        <Section title="کمپین تازه" icon={Plus} accent="var(--violet)">
          <div className="px-5 sm:px-6 py-5">
            <CampaignForm courses={options} />
          </div>
        </Section>

        <Section
          title="همهٔ کمپین‌ها"
          icon={Megaphone}
          accent="var(--danger)"
          meta={`${toPersianDigits(list.length)} کمپین`}
        >
          {list.length === 0 ? (
            <Empty icon={Megaphone}>هنوز کمپینی ساخته نشده</Empty>
          ) : (
            <div className="divide-y divide-[var(--line)]">
              {list.map((c) => (
                <CampaignRow key={c.id} campaign={c} courses={options} now={now} />
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
