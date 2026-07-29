"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, EyeOff, Star, Trash2, X } from "lucide-react";

type Topic = {
  id: string;
  track: "UI" | "UX";
  title: string;
  category: string;
  platform: string;
  difficulty: string;
  detail: string;
  recommended: boolean;
  active: boolean;
};

const DIFFICULTIES = ["", "ساده", "متوسط", "سخت"];

/**
 * یک موضوع در فهرست ادمین.
 * عنوان و جزئیات همون‌جا قابل ویرایشن، مثل جدول دانشجوها.
 */
export default function TopicRow({ topic }: { topic: Topic }) {
  const router = useRouter();
  const [title, setTitle] = useState(topic.title);
  const [detail, setDetail] = useState(topic.detail);
  const [saving, setSaving] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  async function patch(payload: Record<string, unknown>) {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/topics/${topic.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "ذخیره نشد");
      } else {
        router.refresh();
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    }
    setSaving(false);
  }

  async function handleDelete() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/topics/${topic.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "حذف نشد");
        setSaving(false);
        setConfirming(false);
        return;
      }
      router.refresh();
    } catch {
      setError("خطا در ارتباط با سرور");
      setSaving(false);
      setConfirming(false);
    }
  }

  const cell =
    "w-full bg-transparent border border-transparent hover:border-[var(--line-strong)]/60 focus:border-[var(--violet)] focus:bg-[var(--page)] rounded-lg px-2.5 py-1.5 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none transition-colors";

  return (
    <tr
      className={`border-b border-[var(--line)] hover:bg-[var(--card-raised)]/60 transition-colors ${
        topic.active ? "" : "opacity-50"
      }`}
    >
      <td className="px-2 py-1.5 w-9">
        <button
          type="button"
          onClick={() => patch({ recommended: !topic.recommended })}
          disabled={saving}
          title={topic.recommended ? "از پیشنهادی‌ها بردار" : "پیشنهادی کن"}
          className={`p-1.5 rounded-lg transition-colors disabled:opacity-50 ${
            topic.recommended
              ? "text-[var(--warn)]"
              : "text-[var(--ink-faint)] hover:text-[var(--ink-3)]"
          }`}
        >
          <Star size={14} fill={topic.recommended ? "currentColor" : "none"} />
        </button>
      </td>

      <td className="px-1 py-1.5 min-w-[240px]">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => title.trim() !== topic.title && patch({ title })}
          disabled={saving}
          className={cell}
        />
      </td>

      <td className="px-3 py-1.5 whitespace-nowrap">
        <span className="font-body text-xs text-[var(--ink-3)]">
          {topic.category || "—"}
        </span>
      </td>

      <td className="px-1 py-1.5 w-28">
        <select
          value={topic.difficulty}
          onChange={(e) => patch({ difficulty: e.target.value })}
          disabled={saving}
          className={`${cell} cursor-pointer`}
        >
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d || "—"}
            </option>
          ))}
        </select>
      </td>

      <td className="px-1 py-1.5 min-w-[220px]">
        <input
          type="text"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          onBlur={() => detail.trim() !== topic.detail && patch({ detail })}
          disabled={saving}
          placeholder="بدون توضیح"
          className={cell}
        />
      </td>

      <td className="px-3 py-1.5 w-24 text-left whitespace-nowrap">
        {error ? (
          <span className="font-body text-xs text-[var(--danger)]">{error}</span>
        ) : confirming ? (
          <div className="flex items-center gap-1 justify-end">
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              title="بله، حذف کن"
              className="text-[var(--danger)] disabled:opacity-50 p-1.5 rounded-lg border border-[var(--danger)]/30 transition-colors"
            >
              <Check size={13} />
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              disabled={saving}
              title="بی‌خیال"
              className="text-[var(--ink-3)] hover:text-[var(--ink)] disabled:opacity-50 p-1.5 rounded-lg border border-[var(--line)] transition-colors"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-0.5 justify-end">
            <button
              type="button"
              onClick={() => patch({ active: !topic.active })}
              disabled={saving}
              title={topic.active ? "از فرم پنهانش کن" : "دوباره نشونش بده"}
              className={`p-1.5 rounded-lg transition-colors ${
                topic.active
                  ? "text-[var(--ink-faint)] hover:text-[var(--ink-3)]"
                  : "text-[var(--warn)]"
              }`}
            >
              <EyeOff size={13} />
            </button>
            <button
              type="button"
              onClick={() => setConfirming(true)}
              title={`حذف ${topic.title}`}
              className="text-[var(--ink-faint)] hover:text-[var(--danger)] p-1.5 rounded-lg transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
