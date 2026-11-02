"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import CampaignForm, { type CampaignCourseOption } from "@/components/admin/CampaignForm";
import { campaignPhase, formatTehran, type CampaignInfo } from "@/lib/campaign";
import { toPersianDigits } from "@/lib/persian-months";

const PHASE = {
  upcoming: { label: "در انتظار شروع", tone: "var(--info)" },
  live: { label: "در جریان", tone: "var(--ok)" },
  ended: { label: "تمام‌شده", tone: "var(--ink-4)" },
} as const;

export default function CampaignRow({
  campaign,
  courses,
  now,
}: {
  campaign: CampaignInfo;
  courses: CampaignCourseOption[];
  now: number;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);

  const phase = campaignPhase(campaign, now);
  const p = campaign.active ? PHASE[phase] : { label: "خاموش", tone: "var(--ink-faint)" };
  const discounted = courses.filter((c) => campaign.prices[c.id]);

  async function toggle() {
    setBusy(true);
    await fetch(`/api/admin/campaigns/${campaign.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !campaign.active }),
    }).catch(() => null);
    router.refresh();
    setBusy(false);
  }

  async function remove() {
    if (!confirm(`کمپین «${campaign.title}» حذف بشه؟`)) return;
    setBusy(true);
    await fetch(`/api/admin/campaigns/${campaign.id}`, { method: "DELETE" }).catch(() => null);
    router.refresh();
    setBusy(false);
  }

  if (editing) {
    return (
      <div className="px-5 sm:px-6 py-5">
        <CampaignForm courses={courses} initial={campaign} onDone={() => setEditing(false)} />
      </div>
    );
  }

  const iconBtn =
    "w-8 h-8 rounded-lg flex items-center justify-center text-[var(--ink-4)] hover:text-[var(--ink)] hover:bg-[var(--card-raised)] transition-colors disabled:opacity-40";

  return (
    <div className="px-5 sm:px-6 py-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2.5 flex-wrap mb-1">
          <span className="font-body font-semibold text-[var(--ink)] text-sm">{campaign.title}</span>
          <span
            className="text-[10px] font-body px-2 py-0.5 rounded-full"
            style={{ color: p.tone, backgroundColor: `color-mix(in srgb, ${p.tone} 14%, transparent)` }}
          >
            {p.label}
          </span>
        </div>
        {campaign.subtitle && (
          <p className="font-body text-xs text-[var(--ink-3)] mb-1">{campaign.subtitle}</p>
        )}
        <p className="font-body text-xs text-[var(--ink-4)] leading-6">
          از {formatTehran(campaign.startsAt)}
          <br />
          تا {formatTehran(campaign.endsAt)}
        </p>
        <p className="font-body text-xs text-[var(--ink-4)] mt-1">
          {discounted.length === 0
            ? "هیچ دوره‌ای قیمت کمپینی نداره"
            : discounted
                .map((c) => {
                  const pct = Math.round((1 - campaign.prices[c.id] / c.price) * 100);
                  return `${c.title} ${toPersianDigits(pct)}٪`;
                })
                .join(" · ")}
        </p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={toggle}
          disabled={busy}
          className={iconBtn}
          title={campaign.active ? "خاموش کردن" : "روشن کردن"}
          aria-label={campaign.active ? "خاموش کردن کمپین" : "روشن کردن کمپین"}
        >
          {campaign.active ? <Eye size={15} /> : <EyeOff size={15} />}
        </button>
        <button
          type="button"
          onClick={() => setEditing(true)}
          disabled={busy}
          className={iconBtn}
          title="ویرایش"
          aria-label="ویرایش کمپین"
        >
          <Pencil size={14} />
        </button>
        <button
          type="button"
          onClick={remove}
          disabled={busy}
          className={iconBtn + " hover:!text-[var(--danger)]"}
          title="حذف"
          aria-label="حذف کمپین"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
