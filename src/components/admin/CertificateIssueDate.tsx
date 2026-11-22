"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * تاریخ صدورِ یک گواهی، همون‌جا توی فهرست قابل ویرایش.
 *
 * «Date of issue» روی سند از createdAt میاد، یعنی لحظه‌ای که ردیف توی
 * دیتابیس ساخته شده. برای گواهی‌هایی که دیرتر از موعد یا دسته‌جمعی وارد
 * شدن این تاریخ غلطه، و چون کد گواهی پخش شده نمی‌شه حذف و دوباره صادرش
 * کرد. این فیلد فقط همون تاریخ رو عوض می‌کنه.
 *
 * مقدار به شکل YYYY-MM-DD میاد و می‌ره (میلادی، مثل خود سند).
 */
export default function CertificateIssueDate({
  id,
  value,
}: {
  id: string;
  value: string;
}) {
  const router = useRouter();
  const [date, setDate] = useState(value);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);

  async function save() {
    if (!date || date === value) return;
    setSaving(true);
    setFailed(false);
    try {
      const res = await fetch(`/api/admin/certificates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueDate: date }),
      });
      if (res.ok) router.refresh();
      else setFailed(true);
    } catch {
      setFailed(true);
    }
    setSaving(false);
  }

  return (
    <input
      type="date"
      dir="ltr"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      onBlur={save}
      disabled={saving}
      aria-label="تاریخ صدور"
      title={
        failed
          ? "ذخیره نشد — تاریخ نامعتبره یا اتصال قطع شد"
          : "تاریخ صدور (Date of issue) — میلادی، روی سند چاپ می‌شه"
      }
      className={`w-[8.5rem] text-center bg-transparent border rounded-lg px-2 py-1 font-body text-xs text-[var(--ink-3)] focus:outline-none focus:bg-[var(--page)] focus:text-[var(--ink)] transition-colors disabled:opacity-50 ${
        failed
          ? "border-[var(--danger)]"
          : "border-transparent hover:border-[var(--line-strong)]/60 focus:border-[var(--violet)]"
      }`}
    />
  );
}
