"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { toPersianDigits } from "@/lib/persian-months";
import { INFINITY_COURSES, parseStudentLines } from "@/lib/infinity-progress";

export default function AddInfinityStudentsForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [raw, setRaw] = useState("");
  const [course, setCourse] = useState<string>(INFINITY_COURSES[0].slug);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ added: number; skipped: string[] } | null>(null);

  const parsed = parseStudentLines(raw);
  const withPhone = parsed.filter((s) => s.phone).length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (parsed.length === 0) {
      setError("فهرست خالیه");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/admin/infinity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: raw, course }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطایی رخ داد");
      } else {
        setResult({ added: data.added ?? 0, skipped: data.skipped ?? [] });
        setRaw("");
        router.refresh();
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    }
    setLoading(false);
  }

  const inputCls =
    "w-full bg-[var(--page)] border border-[var(--line-strong)] rounded-xl px-4 py-2.5 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet)] focus:ring-1 focus:ring-[var(--violet)]/40 transition-colors";

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 bg-[var(--violet-deep)] hover:bg-[#7c4ff0] text-white font-body font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
      >
        <UserPlus size={15} />
        افزودن دانشجو
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 space-y-4 w-full basis-full"
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
        <div
          role="status"
          className="bg-[var(--ok)]/10 border border-[var(--ok)]/20 rounded-xl px-4 py-3"
        >
          <p className="font-body text-[var(--ok)] text-sm">
            {toPersianDigits(result.added)} نفر اضافه شد
            {result.skipped.length > 0 && (
              <span className="text-[var(--ink-3)]">
                {" "}
                · {toPersianDigits(result.skipped.length)} نفر از قبل توی همین دوره بودن
              </span>
            )}
          </p>
        </div>
      )}

      <div>
        <label htmlFor="inf-lines" className="block font-body text-sm text-[var(--ink-3)] mb-1.5">
          دانشجوها <span className="text-[var(--ink-4)]">(هر نفر یک خط: نام و موبایل)</span>
        </label>
        <textarea
          id="inf-lines"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={7}
          placeholder={"زهرا اویسی\t09121234567\nعلی رضایی\t09351234567\nمریم کریمی"}
          className={`${inputCls} resize-y leading-7`}
        />
        <p className="mt-1.5 font-body text-xs text-[var(--ink-4)] leading-6">
          فایل اکسل یا CSV رو باز کن، ستون نام و موبایل رو کپی کن و همین‌جا بچسبون. موبایل
          اختیاریه ولی کمک می‌کنه دو نفر هم‌اسم قاطی نشن.
        </p>
      </div>

      <div className="max-w-xs">
        <label htmlFor="inf-course" className="block font-body text-sm text-[var(--ink-3)] mb-1.5">
          دوره
        </label>
        <select
          id="inf-course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className={inputCls}
        >
          {INFINITY_COURSES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label} بی‌نهایت
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <span className="font-body text-xs text-[var(--ink-4)]">
          {parsed.length > 0
            ? `${toPersianDigits(parsed.length)} نفر · ${toPersianDigits(withPhone)} موبایل`
            : "فهرست خالیه"}
        </span>
        <button
          type="submit"
          disabled={loading || parsed.length === 0}
          className="bg-[var(--violet-deep)] hover:bg-[#7c4ff0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
        >
          {loading ? "در حال افزودن..." : "افزودن به فهرست"}
        </button>
      </div>

      {error && (
        <p role="alert" className="text-[var(--danger)] text-xs font-body">
          {error}
        </p>
      )}
    </form>
  );
}
