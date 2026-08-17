"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Search, FileText } from "lucide-react";
import { useLang } from "@/components/Providers";
import { FORMS } from "@/lib/i18n/dict/forms";

interface Result {
  found: boolean;
  code?: string;
  studentName?: string;
  courseTitle?: string;
  startDate?: string;
}

export default function CertificateLookup() {
  const t = FORMS[useLang()].lookup;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) {
      setError(t.needCode);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/certificates/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.error);
      } else {
        setResult(data);
      }
    } catch {
      setError(t.failed);
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border border-[#e8e2d9] rounded-3xl p-7 shadow-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-body text-sm text-[#6b6560] mb-1.5">
              {t.label}
            </label>
            <input
              type="text"
              dir="ltr"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setResult(null);
              }}
              placeholder="MU1405001"
              className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
            />
            <p className="text-[#a09990] font-body text-xs mt-1.5">
              {t.hint}
            </p>
          </div>

          {error && (
            <p className="text-rose-500 text-xs font-body text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold py-3.5 rounded-2xl transition-all mt-1"
          >
            {loading ? (
              t.checking
            ) : (
              <>
                <Search size={15} />
                {t.submit}
              </>
            )}
          </button>
        </form>
      </div>

      {result?.found && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mt-5">
          <div className="flex items-center gap-2 text-emerald-700 mb-4">
            <CheckCircle size={16} />
            <span className="font-body font-semibold text-sm">{t.valid}</span>
          </div>
          <div className="space-y-3">
            {[
              { label: t.studentName, value: result.studentName },
              { label: t.course, value: result.courseTitle },
              { label: t.startDate, value: result.startDate },
            ]
              .filter((row) => row.value && row.value.trim() !== "")
              .map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4">
                <span className="font-body text-xs text-emerald-700/60 flex-shrink-0">
                  {row.label}
                </span>
                <span className="font-body text-sm text-emerald-900 font-medium text-end">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {result.code && (
            <a
              href={`/certificate/${result.code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-body font-bold text-sm px-5 py-3 rounded-xl transition-colors"
            >
              <FileText size={15} />
              {t.view}
            </a>
          )}
        </div>
      )}

      {result && !result.found && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 mt-5 text-center">
          <div className="flex items-center justify-center gap-2 text-rose-600 mb-1.5">
            <XCircle size={16} />
            <span className="font-body font-semibold text-sm">{t.notFoundTitle}</span>
          </div>
          <p className="font-body text-xs text-rose-500/80">{t.notFoundBody}</p>
        </div>
      )}
    </div>
  );
}
