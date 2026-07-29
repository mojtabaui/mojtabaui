"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, ExternalLink, Trash2, X } from "lucide-react";
import { intakeLabel, toPersianDigits } from "@/lib/persian-months";
import { GOAL_LABEL, GOAL_VALUES, taskCount, tasksByWeek } from "@/lib/student-tasks";

type Student = {
  id: string;
  studentName: string;
  track: "UI" | "UX";
  intakeMonth: string;
  topic: string;
  fileLink: string;
  reviewedTasks: number[];
  background: string | null;
  goal: string;
  note: string | null;
};

/**
 * یک ردیف از جدول دانشجوها.
 * موضوع و هدف همون‌جا قابل ویرایشن. تیک تسک‌ها و سابقه با باز کردن ردیف
 * دیده می‌شن تا جدول اصلی شلوغ نشه.
 */
export default function StudentRow({ student }: { student: Student }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState(student.topic);
  const [fileLink, setFileLink] = useState(student.fileLink);
  const [background, setBackground] = useState(student.background ?? "");
  const [reviewed, setReviewed] = useState<number[]>(student.reviewedTasks);
  const [saving, setSaving] = useState(false);
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

  function toggleTask(id: number) {
    const next = reviewed.includes(id)
      ? reviewed.filter((t) => t !== id)
      : [...reviewed, id].sort((a, b) => a - b);
    setReviewed(next);
    patch({ reviewedTasks: next });
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
    "w-full bg-transparent border border-transparent hover:border-[var(--line-strong)]/60 focus:border-[var(--violet)] focus:bg-[var(--page)] rounded-lg px-2.5 py-1.5 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none transition-colors";

  // هر دوره تسک‌های خودش رو داره، پس شمارش و فهرست بر اساس دورهٔ همین ردیفه
  const total = taskCount(student.track);
  const weeks = tasksByWeek(student.track);
  const done = reviewed.filter((id) => id >= 1 && id <= total).length;

  return (
    <>
      <tr className="border-b border-[var(--line)] hover:bg-[var(--card-raised)]/60 transition-colors">
        <td className="px-3 py-2.5 w-8">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            title={open ? "بستن" : "تسک‌ها و سابقه"}
            className="text-[var(--ink-4)] hover:text-[var(--ink-3)] p-1 rounded-md transition-colors"
          >
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </td>

        <td className="px-3 py-2.5 font-body text-sm text-[var(--ink)] whitespace-nowrap">
          {student.studentName}
          {student.note && (
            <span className="block font-body text-[10px] text-[var(--warn)]/70 mt-0.5">
              {student.note}
            </span>
          )}
        </td>

        <td className="px-3 py-2.5">
          <span
            className={`font-body text-xs px-2 py-0.5 rounded-md border whitespace-nowrap ${
              student.track === "UI"
                ? "text-[var(--violet)] border-[var(--violet-deep)]/30 bg-[var(--violet-deep)]/10"
                : "text-[var(--ok)] border-[var(--ok)]/30 bg-[var(--ok)]/10"
            }`}
          >
            {student.track === "UI" ? "رابط" : "تجربه"}
          </span>
        </td>

        <td className="px-3 py-2.5 font-body text-xs text-[var(--ink-3)] whitespace-nowrap">
          {intakeLabel(student.intakeMonth)}
        </td>

        <td className="px-1 py-1.5 min-w-[240px]">
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onBlur={() => topic.trim() !== student.topic && patch({ topic })}
              disabled={saving}
              placeholder="هنوز وارد نشده"
              className={cellInput}
            />
            {/* وضعیت فایل همیشه دیده می‌شه، چون همون چیزیه که دنبالش می‌گردی */}
            {student.fileLink ? (
              <a
                href={student.fileLink}
                target="_blank"
                rel="noopener noreferrer"
                title={student.fileLink}
                className="shrink-0 flex items-center gap-1 rounded-lg border border-[var(--violet)]/40 bg-[var(--violet)]/10 px-2 py-1 font-body text-[11px] text-[var(--violet)] hover:bg-[var(--violet)]/20 transition-colors"
              >
                <ExternalLink size={11} />
                فایل
              </a>
            ) : (
              <span
                title="هنوز لینک فایلی نداده"
                className="shrink-0 rounded-lg border border-dashed border-[var(--line-strong)]/60 px-2 py-1 font-body text-[11px] text-[var(--ink-4)]"
              >
                بی‌فایل
              </span>
            )}
          </div>
        </td>

        <td className="px-1 py-1.5 w-40">
          <select
            value={student.goal}
            onChange={(e) => patch({ goal: e.target.value })}
            disabled={saving}
            className={`${cellInput} cursor-pointer`}
          >
            {GOAL_VALUES.map((g) => (
              <option key={g} value={g}>
                {GOAL_LABEL[g]}
              </option>
            ))}
          </select>
        </td>

        <td className="px-3 py-2.5 w-24 whitespace-nowrap">
          <span
            className={`font-body text-xs ${done === 0 ? "text-[var(--ink-4)]" : "text-[var(--ok)]"}`}
          >
            {toPersianDigits(done)} از {toPersianDigits(total)}
          </span>
        </td>

        <td className="px-3 py-2.5 w-20 text-left">
          {error ? (
            <span className="font-body text-xs text-[var(--danger)]">{error}</span>
          ) : confirming ? (
            <div className="flex items-center gap-1 justify-end">
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                title="بله، حذف کن"
                className="text-[var(--danger)] hover:text-[var(--danger)] disabled:opacity-50 p-1.5 rounded-lg border border-[var(--danger)]/30 transition-colors"
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
            <button
              type="button"
              onClick={() => setConfirming(true)}
              title={`حذف ${student.studentName}`}
              className="text-[var(--ink-4)] hover:text-[var(--danger)] p-1.5 rounded-lg transition-colors float-left"
            >
              <Trash2 size={13} />
            </button>
          )}
        </td>
      </tr>

      {open && (
        <tr className="border-b border-[var(--line)] bg-[var(--card-raised)]">
          <td />
          <td colSpan={6} className="px-3 py-4">
            <div className="space-y-4">
              {/* ── تیک بررسی تسک‌ها ── */}
              <div>
                <p className="font-body text-xs text-[var(--ink-4)] mb-2">
                  تیک یعنی <span className="text-[var(--ink-3)]">منتور بررسی کرده</span>، نه اینکه
                  دانشجو تحویل داده
                </p>
                <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 xl:grid-cols-4">
                  {weeks.map(({ week, tasks }) => (
                    <div key={week} className="min-w-0">
                      <p className="font-body text-[10px] text-[var(--ink-4)] mb-1.5">
                        هفتهٔ {toPersianDigits(week)}
                      </p>
                      <div className="space-y-1">
                        {tasks.map((t) => {
                          const on = reviewed.includes(t.id);
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => toggleTask(t.id)}
                              disabled={saving}
                              title={t.desc || t.title}
                              className={`w-full flex items-start gap-2 text-right rounded-lg border px-2 py-1.5 font-body text-[11px] leading-5 transition-colors disabled:opacity-50 ${
                                on
                                  ? "bg-[var(--ok)]/10 border-[var(--ok)]/40 text-[var(--ok)]"
                                  : "bg-[var(--page)] border-[var(--line)] text-[var(--ink-3)] hover:border-[var(--violet-deep)]/40"
                              } ${t.alternative ? "opacity-80" : ""}`}
                            >
                              <span
                                className={`shrink-0 mt-0.5 w-3.5 h-3.5 rounded border grid place-items-center ${
                                  on
                                    ? "border-[var(--ok)]/60 bg-[var(--ok)]/20"
                                    : "border-[#3a3937]"
                                }`}
                              >
                                {on && <Check size={9} />}
                              </span>
                              <span className="min-w-0">
                                {t.alternative && (
                                  <span className="text-[var(--ink-4)]">یا </span>
                                )}
                                {t.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── لینک فایل ── */}
              <div>
                <label className="block font-body text-xs text-[var(--ink-4)] mb-1.5">
                  لینک فایل کار
                </label>
                <input
                  type="url"
                  dir="ltr"
                  value={fileLink}
                  onChange={(e) => setFileLink(e.target.value)}
                  onBlur={() => fileLink.trim() !== student.fileLink && patch({ fileLink })}
                  disabled={saving}
                  placeholder="https://figma.com/file/..."
                  className="w-full text-left bg-[var(--page)] border border-[var(--line)] focus:border-[var(--violet-deep)]/50 rounded-xl px-3 py-2 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none transition-colors"
                />
              </div>

              {/* ── سابقه ── */}
              <div>
                <label className="block font-body text-xs text-[var(--ink-4)] mb-1.5">
                  سابقه و آشنایی قبلی
                </label>
                <textarea
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  onBlur={() =>
                    background.trim() !== (student.background ?? "") && patch({ background })
                  }
                  disabled={saving}
                  rows={2}
                  placeholder="از معرفی خودش توی گروه"
                  className="w-full bg-[var(--page)] border border-[var(--line)] focus:border-[var(--violet-deep)]/50 rounded-xl px-3 py-2 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none transition-colors resize-y leading-6"
                />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
