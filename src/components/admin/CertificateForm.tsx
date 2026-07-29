"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Check, Copy, FileText, Users, User } from "lucide-react";

type Track = "UI" | "UX" | "QC";
type Mode = "single" | "bulk";
type Row = { name: string; code: string };

const CURRENT_YEAR = "1405";

/** همون منطق سمت سرور — فقط برای شمردن زندهٔ تعداد اسم‌ها */
function parseNames(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.split("\t")[0])
    .map((line) => line.replace(/^\s*[\d۰-۹]+\s*[.)-]\s*/, ""))
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function CertificateForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("single");

  // مشترک بین دو حالت
  const [track, setTrack] = useState<Track>("UI");
  const [year, setYear] = useState(CURRENT_YEAR);
  const [startDate, setStartDate] = useState("");
  const [nextCode, setNextCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // حالت تکی
  const [studentName, setStudentName] = useState("");
  const [created, setCreated] = useState<Row | null>(null);
  const [copied, setCopied] = useState(false);

  // حالت گروهی
  const [namesRaw, setNamesRaw] = useState("");
  const [result, setResult] = useState<{
    created: Row[];
    skipped: Row[];
    duplicatesInList: string[];
  } | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const isQC = track === "QC";
  const parsed = parseNames(namesRaw);

  // پیش‌نمایش کدِ بعدی هر بار که دوره یا سال عوض شه.
  useEffect(() => {
    if (!isQC && !/^\d{4}$/.test(year)) {
      setNextCode(null);
      return;
    }
    let active = true;
    fetch(`/api/admin/certificates?track=${track}&year=${year}`)
      .then((r) => r.json())
      .then((d) => {
        if (active) setNextCode(d.code ?? null);
      })
      .catch(() => active && setNextCode(null));
    return () => {
      active = false;
    };
  }, [track, year, isQC]);

  function switchMode(next: Mode) {
    setMode(next);
    setError("");
    setCreated(null);
    setResult(null);
  }

  async function handleSingle(e: React.FormEvent) {
    e.preventDefault();
    if (!studentName.trim()) {
      setError("نام دانشجو رو وارد کن");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName, track, year, startDate }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطایی رخ داد");
      } else {
        setCreated({ code: data.certificate.code, name: data.certificate.studentName });
        setStudentName("");
        setStartDate("");
        setCopied(false);
        router.refresh();
      }
    } catch {
      setError("خطا در ارتباط با سرور — دوباره تلاش کن");
    }
    setLoading(false);
  }

  async function handleBulk(e: React.FormEvent) {
    e.preventDefault();
    if (parsed.length === 0) {
      setError("فهرست اسم‌ها خالیه");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/admin/certificates/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names: namesRaw, track, year, startDate }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطایی رخ داد");
      } else {
        setResult({
          created: data.created ?? [],
          skipped: data.skipped ?? [],
          duplicatesInList: data.duplicatesInList ?? [],
        });
        setNamesRaw("");
        setCopiedAll(false);
        router.refresh();
      }
    } catch {
      setError("خطا در ارتباط با سرور — دوباره تلاش کن");
    }
    setLoading(false);
  }

  function copyAll() {
    if (!result) return;
    const text = [...result.created, ...result.skipped]
      .map((r) => `${r.name}\t${r.code}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
  }

  const inputCls =
    "w-full bg-[var(--page)] border border-[var(--line)] rounded-xl px-4 py-3 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet-deep)]/50 transition-colors";

  const tabCls = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs transition-colors ${
      active
        ? "bg-[var(--violet-deep)] text-white"
        : "text-[var(--ink-3)] hover:text-[var(--ink)] border border-[var(--line)]"
    }`;

  /** فیلدهای دوره و سال و تاریخ — بین دو حالت مشترکه */
  const sharedFields = (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label className="block font-body text-sm text-[var(--ink-3)] mb-1.5">دوره</label>
        <select
          value={track}
          onChange={(e) => setTrack(e.target.value as Track)}
          className={inputCls}
        >
          <option value="UI">رابط کاربری (UI)</option>
          <option value="UX">تجربه کاربری (UX)</option>
          <option value="QC">کوادکمپ (QuadCamp)</option>
        </select>
      </div>
      {!isQC && (
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
      )}
      <div>
        <label className="block font-body text-sm text-[var(--ink-3)] mb-1.5">
          تاریخ شروع <span className="text-[var(--ink-4)]">(اختیاری)</span>
        </label>
        <input
          type="text"
          dir="ltr"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="1405/01/15"
          className={`${inputCls} text-center`}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--line)] flex items-center justify-between gap-4">
        <h2 className="font-body font-semibold text-[var(--ink)] text-sm flex items-center gap-2">
          <Award size={15} className="text-[var(--ok)]" />
          صدور گواهینامه
        </h2>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => switchMode("single")} className={tabCls(mode === "single")}>
            <User size={13} />
            تکی
          </button>
          <button type="button" onClick={() => switchMode("bulk")} className={tabCls(mode === "bulk")}>
            <Users size={13} />
            گروهی
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* ── نتیجهٔ حالت تکی ── */}
        {mode === "single" && created && (
          <div className="mb-5 bg-[var(--ok)]/10 border border-[var(--ok)]/20 rounded-xl px-4 py-4">
            <p className="font-body text-[var(--ok)] text-sm mb-2">
              گواهی «{created.name}» صادر شد ✓
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <code
                dir="ltr"
                className="font-mono text-lg text-[var(--ink)] bg-[var(--page)] border border-[var(--line)] rounded-lg px-3 py-1.5 tracking-widest"
              >
                {created.code}
              </code>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(created.code);
                  setCopied(true);
                }}
                className="flex items-center gap-1.5 text-xs font-body text-[var(--ink-3)] hover:text-[var(--ink)] border border-[var(--line)] rounded-lg px-3 py-2 transition-colors"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "کپی شد" : "کپی کد"}
              </button>
              <a
                href={`/certificate/${created.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-body font-semibold text-white bg-[var(--violet-deep)] hover:bg-[#7c4ff0] rounded-lg px-3 py-2 transition-colors"
              >
                <FileText size={13} />
                دیدن و دانلود گواهی
              </a>
            </div>
          </div>
        )}

        {/* ── نتیجهٔ حالت گروهی ── */}
        {mode === "bulk" && result && (
          <div className="mb-5 space-y-3">
            <div className="bg-[var(--ok)]/10 border border-[var(--ok)]/20 rounded-xl px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
              <p className="font-body text-[var(--ok)] text-sm">
                {result.created.length} گواهی صادر شد
                {result.skipped.length > 0 && (
                  <span className="text-[var(--ink-3)]">
                    {" "}
                    · {result.skipped.length} نفر قبلاً گواهی داشتن
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={copyAll}
                className="flex items-center gap-1.5 text-xs font-body text-[var(--ink-3)] hover:text-[var(--ink)] border border-[var(--line)] rounded-lg px-3 py-2 transition-colors"
              >
                {copiedAll ? <Check size={13} /> : <Copy size={13} />}
                {copiedAll ? "کپی شد" : "کپی همه (نام و کد)"}
              </button>
            </div>

            {result.duplicatesInList.length > 0 && (
              <p className="font-body text-xs text-amber-300/90 bg-[var(--warn)]/10 border border-[var(--warn)]/20 rounded-xl px-4 py-2.5">
                این اسم‌ها توی فهرست تکراری بودن و یک بار حساب شدن:{" "}
                {result.duplicatesInList.join("، ")}
              </p>
            )}

            <div className="border border-[var(--line)] rounded-xl overflow-hidden max-h-72 overflow-y-auto">
              <table className="w-full font-body text-sm">
                <tbody>
                  {result.created.map((r) => (
                    <tr key={r.code} className="border-b border-[var(--line)] last:border-0">
                      <td className="px-4 py-2.5 text-[var(--ink)]">{r.name}</td>
                      <td className="px-4 py-2.5">
                        <code dir="ltr" className="font-mono text-xs text-[var(--violet)] tracking-widest">
                          {r.code}
                        </code>
                      </td>
                      <td className="px-4 py-2.5 text-left">
                        <a
                          href={`/certificate/${r.code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors"
                        >
                          دیدن
                        </a>
                      </td>
                    </tr>
                  ))}
                  {result.skipped.map((r) => (
                    <tr key={r.code} className="border-b border-[var(--line)] last:border-0 opacity-60">
                      <td className="px-4 py-2.5 text-[var(--ink-3)]">{r.name}</td>
                      <td className="px-4 py-2.5">
                        <code dir="ltr" className="font-mono text-xs text-[var(--ink-4)] tracking-widest">
                          {r.code}
                        </code>
                      </td>
                      <td className="px-4 py-2.5 text-left text-xs text-[var(--ink-4)]">قبلاً صادر شده</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── فرم تکی ── */}
        {mode === "single" && (
          <form onSubmit={handleSingle} className="space-y-4">
            <div>
              <label className="block font-body text-sm text-[var(--ink-3)] mb-1.5">نام دانشجو</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="نام و نام خانوادگی"
                className={inputCls}
              />
            </div>

            {sharedFields}

            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="font-body text-xs text-[var(--ink-4)]">
                کد بعدی:{" "}
                {nextCode ? (
                  <code dir="ltr" className="font-mono text-[var(--violet)] tracking-widest">
                    {nextCode}
                  </code>
                ) : (
                  <span className="text-[var(--ink-4)]">—</span>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[var(--violet-deep)] hover:bg-[#7c4ff0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
              >
                {loading ? "در حال صدور..." : "صدور گواهی"}
              </button>
            </div>

            {error && <p className="text-[var(--danger)] text-xs font-body">{error}</p>}
          </form>
        )}

        {/* ── فرم گروهی ── */}
        {mode === "bulk" && (
          <form onSubmit={handleBulk} className="space-y-4">
            <div>
              <label className="block font-body text-sm text-[var(--ink-3)] mb-1.5">
                فهرست اسم‌ها <span className="text-[var(--ink-4)]">(هر نفر یک خط)</span>
              </label>
              <textarea
                value={namesRaw}
                onChange={(e) => setNamesRaw(e.target.value)}
                rows={8}
                placeholder={"زهرا اویسی\nعلی رضایی\nمریم کریمی"}
                className={`${inputCls} resize-y leading-7`}
              />
              <p className="mt-1.5 font-body text-xs text-[var(--ink-4)]">
                مستقیم از اکسل هم می‌تونی کپی کنی — ستون اول برداشته می‌شه و شمارهٔ ردیف حذف.
              </p>
            </div>

            {sharedFields}

            <div className="flex items-center justify-between gap-4 pt-1 flex-wrap">
              <div className="font-body text-xs text-[var(--ink-4)]">
                {parsed.length > 0 ? (
                  <>
                    <span className="text-[var(--ink-3)]">{parsed.length} نفر</span>
                    {nextCode && (
                      <>
                        {" "}
                        · شروع از{" "}
                        <code dir="ltr" className="font-mono text-[var(--violet)] tracking-widest">
                          {nextCode}
                        </code>
                      </>
                    )}
                  </>
                ) : (
                  "فهرست خالیه"
                )}
              </div>
              <button
                type="submit"
                disabled={loading || parsed.length === 0}
                className="bg-[var(--violet-deep)] hover:bg-[#7c4ff0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
              >
                {loading ? "در حال صدور..." : `صدور ${parsed.length || ""} گواهی`}
              </button>
            </div>

            {error && <p className="text-[var(--danger)] text-xs font-body">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
