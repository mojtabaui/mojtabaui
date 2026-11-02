"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ value, label = "کپی" }: { value: string; label?: string }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      // کلیپ‌بورد روی http بسته‌ست؛ کلید قابل انتخاب هست و دستی کپی می‌شه
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={label}
      aria-label={label}
      className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--line-strong)] text-[var(--ink-3)] hover:text-[var(--ink)] hover:border-[var(--violet)]/60 transition-colors"
    >
      {done ? <Check size={14} className="text-[var(--ok)]" /> : <Copy size={14} />}
    </button>
  );
}
