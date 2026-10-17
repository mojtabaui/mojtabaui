"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * تاریخ شروعِ یک گواهیِ صادرشده، همون‌جا توی فهرست قابل ویرایش.
 *
 * گواهی بعد از صدور یک کد ثابت داره که پخش شده و جای دیگه‌ای استعلام می‌شه،
 * پس برای اصلاح تاریخ نمی‌شه حذفش کرد و دوباره ساخت — کد عوض می‌شد. این
 * فیلد تنها راه درست‌کردن گواهی‌هاییه که بدون تاریخ صادر شدن.
 *
 * همین رشته بی‌کم‌وکاست زیر تیتر Start date روی سند چاپ می‌شه و سند
 * کاملاً انگلیسیه، پس میلادی وارد می‌شه نه شمسی.
 */
export default function CertificateStartDate({
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
    if (date.trim() === value.trim()) return;
    setSaving(true);
    setFailed(false);
    try {
      const res = await fetch(`/api/admin/certificates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate: date }),
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
      type="text"
      dir="ltr"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      onBlur={save}
      disabled={saving}
      placeholder="Start date"
      title={
        failed
          ? "ذخیره نشد — دوباره امتحان کن"
          : "تاریخ شروع، میلادی — همین‌طور که بنویسی روی سند چاپ می‌شه"
      }
      className={`w-32 text-center bg-transparent border rounded-lg px-2 py-1 font-body text-xs text-[var(--ink-3)] placeholder:text-[var(--ink-faint)] focus:outline-none focus:bg-[var(--page)] focus:text-[var(--ink)] transition-colors disabled:opacity-50 ${
        failed
          ? "border-[var(--danger)]"
          : "border-transparent hover:border-[var(--line-strong)]/60 focus:border-[var(--violet)]"
      }`}
    />
  );
}
