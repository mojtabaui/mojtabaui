"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { PERSIAN_MONTHS, buildIntake } from "@/lib/persian-months";

/** همون منطق سمت سرور — فقط برای شمردن زندهٔ تعداد اسم‌ها */
function parseNames(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.split("\t")[0])
    .map((line) => line.replace(/^\s*[\d۰-۹]+\s*[.)-]\s*/, ""))
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function AddStudentsForm({
  defaultYear,
  defaultMonth,
}: {
  defaultYear: string;
  defaultMonth: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [namesRaw, setNamesRaw] = useState("");
  const [track, setTrack] = useState<"UI" | "UX">("UI");
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ added: number; skipped: string[] } | null>(null);

  const parsed = parseNames(namesRaw);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (parsed.length === 0) {
      setError("فهرست اسم‌ها خالیه");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          names: namesRaw,
          track,
          intakeMonth: buildIntake(year, month),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطایی رخ داد");
      } else {
        setResult({ added: data.added ?? 0, skipped: data.skipped ?? [] });
        setNamesRaw("");
        router.refresh();
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    }
    setLoading(false);
  }

  const inputCls =
    "w-full bg-[var(--page)] border border-[var(--line)] rounded-xl px-4 py-2.5 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[#8b5cf6]/50 transition-colors";

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 bg-[#8b5cf6] hover:bg-[#7c4ff0] text-white font-body font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
      >
        <UserPlus size={15} />
        افزودن دانشجو
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 space-y-4 w-full"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-body font-semibold text-[var(--ink)] text-sm">افزودن دانشجو</h3>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setResult(null);
            setError("");
          }}
          className="font-body text-xs text-[var(--ink-4)] hover:text-[var(--ink-3)] transition-colors"
        >
          بستن
        </button>
      </div>

      {result && (
        <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-3">
          <p className="font-body text-emerald-300 text-sm">
            {result.added} نفر اضافه شد
            {result.skipped.length > 0 && (
              <span className="text-[var(--ink-3)]">
                {" "}
                · {result.skipped.length} نفر از قبل توی همین ماه و دوره بودن
              </span>
            )}
          </p>
        </div>
      )}

      <div>
        <label className="block font-body text-sm text-[var(--ink-3)] mb-1.5">
          اسم‌ها <span className="text-[var(--ink-4)]">(هر نفر یک خط)</span>
        </label>
        <textarea
          value={namesRaw}
          onChange={(e) => setNamesRaw(e.target.value)}
          rows={7}
          placeholder={"زهرا اویسی\nعلی رضایی\nمریم کریمی"}
          className={`${inputCls} resize-y leading-7`}
        />
        <p className="mt-1.5 font-body text-xs text-[var(--ink-4)]">
          از اکسل هم می‌تونی مستقیم کپی کنی — ستون اول برداشته می‌شه.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block font-body text-sm text-[var(--ink-3)] mb-1.5">دوره</label>
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value as "UI" | "UX")}
            className={inputCls}
          >
            <option value="UI">رابط کاربری (UI)</option>
            <option value="UX">تجربه کاربری (UX)</option>
          </select>
        </div>
        <div>
          <label className="block font-body text-sm text-[var(--ink-3)] mb-1.5">ماه ثبت‌نام</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className={inputCls}>
            {PERSIAN_MONTHS.map((m, i) => (
              <option key={m} value={String(i + 1).padStart(2, "0")}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-body text-sm text-[var(--ink-3)] mb-1.5">سال</label>
          <input
            type="text"
            inputMode="numeric"
            dir="ltr"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="1405"
            className={`${inputCls} text-center`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <span className="font-body text-xs text-[var(--ink-4)]">
          {parsed.length > 0 ? `${parsed.length} نفر` : "فهرست خالیه"}
        </span>
        <button
          type="submit"
          disabled={loading || parsed.length === 0}
          className="bg-[#8b5cf6] hover:bg-[#7c4ff0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
        >
          {loading ? "در حال افزودن..." : `افزودن ${parsed.length || ""}`}
        </button>
      </div>

      {error && <p className="text-rose-400 text-xs font-body">{error}</p>}
    </form>
  );
}
