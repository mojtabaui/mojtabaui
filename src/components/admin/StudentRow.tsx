"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Trash2, X } from "lucide-react";
import { intakeLabel, toPersianDigits } from "@/lib/persian-months";

type Student = {
  id: string;
  studentName: string;
  track: "UI" | "UX";
  intakeMonth: string;
  topic: string;
  taskProgress: number;
};

/**
 * یک ردیف از جدول دانشجوها.
 * موضوع و شمارهٔ تسک همون‌جا قابل ویرایشن — با blur ذخیره می‌شن
 * تا برای هر تغییر کوچیک لازم نباشه دکمه بزنی.
 */
export default function StudentRow({ student }: { student: Student }) {
  const router = useRouter();
  const [topic, setTopic] = useState(student.topic);
  const [progress, setProgress] = useState(String(student.taskProgress));
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  async function patch(payload: Record<string, unknown>) {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/students/${student.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "ذخیره نشد");
      else {
        setSavedAt(Date.now());
        router.refresh();
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    }
    setSaving(false);
  }

  function saveTopic() {
    if (topic.trim() === student.topic) return;
    patch({ topic });
  }

  function saveProgress() {
    const n = Number(progress);
    if (!Number.isInteger(n) || n < 0 || n > 99) {
      setError("عدد بین ۰ تا ۹۹");
      setProgress(String(student.taskProgress));
      return;
    }
    if (n === student.taskProgress) return;
    patch({ taskProgress: n });
  }

  async function handleDelete() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/students/${student.id}`, { method: "DELETE" });
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

  const cellInput =
    "w-full bg-transparent border border-transparent hover:border-[#2d2c2a] focus:border-[#8b5cf6]/50 focus:bg-[#0a0908] rounded-lg px-2.5 py-1.5 font-body text-sm text-[#fafaf9] placeholder:text-[#57534e] focus:outline-none transition-colors";

  const justSaved = savedAt > 0 && Date.now() - savedAt < 2500;

  return (
    <tr className="border-b border-[#1e1d1c] last:border-0 hover:bg-[#0f0e0d]/60 transition-colors">
      <td className="px-4 py-2.5 font-body text-sm text-[#fafaf9] whitespace-nowrap">
        {student.studentName}
      </td>

      <td className="px-4 py-2.5">
        <span
          className={`font-body text-xs px-2 py-0.5 rounded-md border ${
            student.track === "UI"
              ? "text-[#8b5cf6] border-[#8b5cf6]/30 bg-[#8b5cf6]/10"
              : "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
          }`}
        >
          {student.track === "UI" ? "رابط کاربری" : "تجربه کاربری"}
        </span>
      </td>

      <td className="px-4 py-2.5 font-body text-xs text-[#a8a29e] whitespace-nowrap">
        {intakeLabel(student.intakeMonth)}
      </td>

      <td className="px-2 py-1.5 min-w-[220px]">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onBlur={saveTopic}
          disabled={saving}
          placeholder="هنوز وارد نشده"
          className={cellInput}
        />
      </td>

      <td className="px-2 py-1.5 w-20">
        <input
          type="text"
          inputMode="numeric"
          dir="ltr"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          onBlur={saveProgress}
          disabled={saving}
          className={`${cellInput} text-center font-mono`}
        />
      </td>

      <td className="px-4 py-2.5 w-24 text-left">
        {error ? (
          <span className="font-body text-xs text-rose-400">{error}</span>
        ) : confirming ? (
          <div className="flex items-center gap-1 justify-end">
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              title="بله، حذف کن"
              className="text-rose-400 hover:text-rose-300 disabled:opacity-50 p-1.5 rounded-lg border border-rose-400/30 transition-colors"
            >
              <Check size={13} />
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              disabled={saving}
              title="بی‌خیال"
              className="text-[#a8a29e] hover:text-[#fafaf9] disabled:opacity-50 p-1.5 rounded-lg border border-[#2d2c2a] transition-colors"
            >
              <X size={13} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 justify-end">
            {justSaved && <span className="font-body text-xs text-emerald-400">ذخیره شد</span>}
            <button
              type="button"
              onClick={() => setConfirming(true)}
              title={`حذف ${student.studentName}`}
              className="text-[#57534e] hover:text-rose-400 p-1.5 rounded-lg transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export { toPersianDigits };
