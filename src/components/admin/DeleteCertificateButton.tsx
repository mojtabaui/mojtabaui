"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Check, X } from "lucide-react";

/**
 * حذف یک گواهی از فهرست پنل.
 * دو مرحله‌ایه تا با یه کلیک اشتباهی چیزی پاک نشه.
 */
export default function DeleteCertificateButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/certificates/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "حذف نشد");
        setLoading(false);
        setConfirming(false);
        return;
      }
      router.refresh();
    } catch {
      setError("خطا در ارتباط با سرور");
      setLoading(false);
      setConfirming(false);
    }
  }

  if (error) {
    return (
      <span className="font-body text-xs text-rose-400 shrink-0" title={error}>
        {error}
      </span>
    );
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        title={`حذف گواهی ${name}`}
        aria-label={`حذف گواهی ${name}`}
        className="text-[var(--ink-4)] hover:text-rose-400 p-1.5 rounded-lg transition-colors shrink-0"
      >
        <Trash2 size={14} />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1 shrink-0">
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        title="بله، حذف کن"
        aria-label="تأیید حذف"
        className="text-rose-400 hover:text-rose-300 disabled:opacity-50 p-1.5 rounded-lg border border-rose-400/30 transition-colors"
      >
        <Check size={14} />
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        disabled={loading}
        title="بی‌خیال"
        aria-label="انصراف"
        className="text-[var(--ink-3)] hover:text-[var(--ink)] disabled:opacity-50 p-1.5 rounded-lg border border-[var(--line)] transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
