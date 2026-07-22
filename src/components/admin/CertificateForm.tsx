"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Check, Copy, FileText } from "lucide-react";

type Track = "UI" | "UX" | "QC";

const CURRENT_YEAR = "1405";

export default function CertificateForm() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [track, setTrack] = useState<Track>("UI");
  const [year, setYear] = useState(CURRENT_YEAR);
  const [startDate, setStartDate] = useState("");

  const [nextCode, setNextCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<{ code: string; name: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const isQC = track === "QC";

  // پیش‌نمایش کدِ بعدی هر بار که دوره یا سال عوض شه.
  // کوادکمپ سال نمی‌خواد؛ بقیه به سال ۴ رقمی نیاز دارن.
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

  async function handleSubmit(e: React.FormEvent) {
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
        router.refresh(); // آمار و لیست پایین پنل به‌روز شن
      }
    } catch {
      setError("خطا در ارتباط با سرور — دوباره تلاش کن");
    }
    setLoading(false);
  }

  const inputCls =
    "w-full bg-[#0a0908] border border-[#2d2c2a] rounded-xl px-4 py-3 font-body text-sm text-[#fafaf9] placeholder:text-[#57534e] focus:outline-none focus:border-[#8b5cf6]/50 transition-colors";

  return (
    <div className="bg-[#111110] border border-[#2d2c2a] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#1e1d1c] flex items-center justify-between">
        <h2 className="font-body font-semibold text-[#fafaf9] text-sm flex items-center gap-2">
          <Award size={15} className="text-emerald-400" />
          صدور گواهینامه
        </h2>
        <span className="font-display text-xs text-[#57534e] tracking-wider uppercase">
          New Certificate
        </span>
      </div>

      <div className="p-6">
        {created && (
          <div className="mb-5 bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-4">
            <p className="font-body text-emerald-300 text-sm mb-2">
              گواهی «{created.name}» صادر شد ✓
            </p>
            <div className="flex items-center gap-2">
              <code
                dir="ltr"
                className="font-mono text-lg text-[#fafaf9] bg-[#0a0908] border border-[#2d2c2a] rounded-lg px-3 py-1.5 tracking-widest"
              >
                {created.code}
              </code>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(created.code);
                  setCopied(true);
                }}
                className="flex items-center gap-1.5 text-xs font-body text-[#a8a29e] hover:text-[#fafaf9] border border-[#2d2c2a] rounded-lg px-3 py-2 transition-colors"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "کپی شد" : "کپی کد"}
              </button>

              <a
                href={`/certificate/${created.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-body font-semibold text-white bg-[#8b5cf6] hover:bg-[#7c4ff0] rounded-lg px-3 py-2 transition-colors"
              >
                <FileText size={13} />
                دیدن و دانلود گواهی
              </a>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-body text-sm text-[#a8a29e] mb-1.5">نام دانشجو</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="نام و نام خانوادگی"
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-body text-sm text-[#a8a29e] mb-1.5">دوره</label>
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
                <label className="block font-body text-sm text-[#a8a29e] mb-1.5">سال</label>
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
              <label className="block font-body text-sm text-[#a8a29e] mb-1.5">
                تاریخ شروع <span className="text-[#57534e]">(اختیاری)</span>
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

          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="font-body text-xs text-[#57534e]">
              کد بعدی:{" "}
              {nextCode ? (
                <code dir="ltr" className="font-mono text-[#8b5cf6] tracking-widest">
                  {nextCode}
                </code>
              ) : (
                <span className="text-[#57534e]">—</span>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#8b5cf6] hover:bg-[#7c4ff0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
            >
              {loading ? "در حال صدور..." : "صدور گواهی"}
            </button>
          </div>

          {error && <p className="text-rose-400 text-xs font-body">{error}</p>}
        </form>
      </div>
    </div>
  );
}
