"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  CircleAlert,
  CloudUpload,
  ExternalLink,
  FileText,
  Info,
  Link2,
  Trash2,
  User,
} from "lucide-react";
import { toPersianDigits } from "@/lib/persian-months";

/**
 * فرم ثبت‌نام کوادکمپ.
 *
 * سه چیز می‌گیره: اسم و فامیل، لینک پرتفولیو، و رزومه.
 *
 * رزومه دو راه داره. راه اول آپلود مستقیمه، ولی همیشه جواب نمی‌ده — فایل
 * ممکنه بزرگ باشه یا اینترنت وسط کار قطع بشه. پس راه دوم لینک گوگل درایوه
 * و راهنماش همین‌جا باز می‌شه، نه توی یک صفحهٔ دیگه. هر آپلودی که شکست
 * بخوره خودش کاربر رو می‌بره سراغ همین راه دوم.
 */

/** باید با MAX_RESUME_BYTES توی api/quadcamp یکی باشه */
const MAX_RESUME_BYTES = 3 * 1024 * 1024;

/** همون فهرست سمت سرور — اینجا فقط برای اینکه زودتر بفهمه، نه به‌جای اون */
const ALLOWED_EXT = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

const field =
  "w-full bg-[var(--page)] border border-[var(--line-strong)] rounded-xl px-4 py-3 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet)] focus:ring-2 focus:ring-[var(--violet)]/25 transition-colors";

const card = "bg-[var(--card)] border border-[var(--line)] rounded-2xl";

/** حجم رو با یک رقم اعشار و عدد فارسی نشون می‌ده */
function humanSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${toPersianDigits(mb.toFixed(1))} مگابایت`;
  return `${toPersianDigits(Math.max(1, Math.round(bytes / 1024)))} کیلوبایت`;
}

const DRIVE_STEPS = [
  <>
    برو به <span dir="ltr">drive.google.com</span> و با اکانت گوگلت وارد شو.
  </>,
  <>فایل رزومه‌ات رو بکش و توی صفحه رها کن تا آپلود بشه.</>,
  <>
    وقتی آپلود تموم شد، روی فایل راست‌کلیک کن و <span dir="ltr">Share</span> رو
    بزن.
  </>,
  <>
    پایین پنجره، زیر <span dir="ltr">General access</span>، گزینه رو از{" "}
    <span dir="ltr">Restricted</span> بذار روی{" "}
    <span dir="ltr">Anyone with the link</span>.
  </>,
  <>
    <span dir="ltr">Copy link</span> رو بزن و لینک رو همین‌جا توی کادر بالا پیست
    کن.
  </>,
];

export default function QuadcampForm() {
  const [fullName, setFullName] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  /** upload یعنی فایل رو خودش می‌فرسته، link یعنی گوگل درایو */
  const [mode, setMode] = useState<"upload" | "link">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [guideOpen, setGuideOpen] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  /** وقتی آپلود شکست خورده — راهنمای درایو رو پررنگ‌تر نشون می‌دیم */
  const [uploadFailed, setUploadFailed] = useState(false);
  const [done, setDone] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);

  /** می‌بردش سراغ لینک درایو با راهنمای باز — مسیر نجاتِ هر آپلودِ شکست‌خورده */
  function switchToDrive(message: string) {
    setMode("link");
    setGuideOpen(true);
    setUploadFailed(true);
    setError(message);
    setFile(null);
    if (fileInput.current) fileInput.current.value = "";
  }

  function handlePick(picked: File | null) {
    if (!picked) return;

    const ext = picked.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXT.includes(ext)) {
      setError("فقط PDF، Word یا عکس (JPG و PNG) قبول می‌شه.");
      if (fileInput.current) fileInput.current.value = "";
      return;
    }

    // جلوی آپلودِ بی‌فایده رو همین‌جا می‌گیریم؛ سرور هم دوباره چک می‌کنه
    if (picked.size > MAX_RESUME_BYTES) {
      switchToDrive(
        `این فایل ${humanSize(picked.size)}ه و سقف ما ۳ مگابایته. بذارش روی گوگل درایو و لینکش رو بده.`
      );
      return;
    }

    setError("");
    setUploadFailed(false);
    setFile(picked);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!fullName.trim().includes(" ")) {
      setError("اسم و فامیلت رو کامل بنویس، مثل «زهرا محمدی»");
      return;
    }
    if (!/^https?:\/\//i.test(portfolioUrl.trim())) {
      setError("لینک پرتفولیو باید کامل باشه و با https:// شروع بشه");
      return;
    }
    if (mode === "upload" && !file) {
      setError("فایل رزومه‌ات رو انتخاب کن، یا از تب کناری لینک درایو بده");
      return;
    }
    if (mode === "link" && !/^https?:\/\//i.test(resumeUrl.trim())) {
      setError("لینک رزومه باید کامل باشه و با https:// شروع بشه");
      return;
    }

    const body = new FormData();
    body.set("fullName", fullName);
    body.set("portfolioUrl", portfolioUrl.trim());
    if (mode === "upload" && file) body.set("resumeFile", file);
    if (mode === "link") body.set("resumeUrl", resumeUrl.trim());

    setBusy(true);
    setError("");

    try {
      const res = await fetch("/api/quadcamp", { method: "POST", body });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // آپلودی که سرور پسش زده هم باید همون مسیر نجات رو ببینه
        if (mode === "upload") {
          switchToDrive(data.error || "فایل فرستاده نشد. لینک درایوش رو بده.");
        } else {
          setError(data.error || "یک جای کار ایراد داشت");
        }
        return;
      }
      setDone(true);
    } catch {
      if (mode === "upload") {
        switchToDrive(
          "فایل تا آخر نرفت — احتمالاً اینترنت وسط کار قطع شد. راه مطمئن‌تر اینه که بذاریش روی گوگل درایو."
        );
      } else {
        setError("به سرور وصل نشدیم. اینترنتت رو چک کن و دوباره بزن.");
      }
    } finally {
      setBusy(false);
    }
  }

  // ── تمام ──
  if (done) {
    return (
      <div className={`${card} p-7 text-center`}>
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[var(--ok)]/15 text-[var(--ok)]">
          <Check size={22} />
        </div>
        <h2 className="font-display text-xl text-[var(--ink)] mb-2">ثبت شد</h2>
        <p className="font-body text-sm text-[var(--ink-3)] leading-8">
          پرتفولیو و رزومه‌ات رسید دستمون. یکی‌یکی نگاهشون می‌کنیم و نتیجه رو
          بهت خبر می‌دیم.
        </p>
        <p className="mt-3 font-body text-xs text-[var(--ink-4)] leading-7">
          اگه لینک درایو دادی، تا اون موقع دسترسی فایل رو روی «هر کسی که لینک
          داره» نگه دار.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setFullName("");
            setPortfolioUrl("");
            setResumeUrl("");
            setFile(null);
            setUploadFailed(false);
            setError("");
            if (fileInput.current) fileInput.current.value = "";
          }}
          className="mt-5 font-body text-xs text-[var(--ink-3)] hover:text-[var(--ink)] underline underline-offset-4 transition-colors"
        >
          ثبت نفر بعدی
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ── اسم ── */}
      <div className={`${card} p-5 sm:p-6 space-y-5`}>
        <div>
          <label
            htmlFor="qc-name"
            className="flex items-center gap-1.5 font-body text-xs text-[var(--ink-3)] mb-2"
          >
            <User size={13} />
            اسم و فامیلت
          </label>
          <input
            id="qc-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            autoComplete="name"
            maxLength={80}
            placeholder="مثلاً: زهرا محمدی"
            className={field}
          />
        </div>

        {/* ── پرتفولیو ── */}
        <div>
          <label
            htmlFor="qc-portfolio"
            className="flex items-center gap-1.5 font-body text-xs text-[var(--ink-3)] mb-2"
          >
            <Link2 size={13} />
            لینک پرتفولیوت
          </label>
          <input
            id="qc-portfolio"
            type="url"
            dir="ltr"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            required
            maxLength={500}
            placeholder="https://behance.net/..."
            className={`${field} text-left`}
          />
          <p className="mt-2 font-body text-xs text-[var(--ink-4)] leading-6">
            بی‌هنس، دریبل، سایت شخصی یا حتی یک فایل فیگما — هرجایی که کارهات رو
            گذاشتی. فقط حواست باشه بدون لاگین باز بشه.
          </p>
        </div>
      </div>

      {/* ── رزومه ── */}
      <div className={`${card} p-5 sm:p-6`}>
        <p className="font-body text-xs text-[var(--ink-3)] mb-3">رزومه‌ات</p>

        {/* دو راه، یکیش کافیه */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {(
            [
              { key: "upload", label: "آپلود فایل", icon: CloudUpload },
              { key: "link", label: "لینک گوگل درایو", icon: Link2 },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setMode(tab.key);
                setError("");
              }}
              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 font-body text-xs transition-colors ${
                mode === tab.key
                  ? "border-[var(--violet)]/60 bg-[var(--violet)]/[0.09] text-[var(--ink)]"
                  : "border-[var(--line-strong)] text-[var(--ink-4)] hover:text-[var(--ink-2)]"
              }`}
            >
              <tab.icon size={14} className={mode === tab.key ? "text-[var(--violet)]" : ""} />
              {tab.label}
            </button>
          ))}
        </div>

        {mode === "upload" ? (
          <div>
            <input
              ref={fileInput}
              id="qc-file"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handlePick(e.target.files?.[0] ?? null)}
              className="sr-only"
            />

            {file ? (
              <div className="flex items-center gap-3 rounded-xl border border-[var(--ok)]/40 bg-[var(--ok)]/[0.08] px-4 py-3.5">
                <FileText size={16} className="shrink-0 text-[var(--ok)]" />
                <div className="min-w-0 flex-1">
                  <p className="font-body text-sm text-[var(--ink)] truncate">{file.name}</p>
                  <p className="font-body text-[11px] text-[var(--ink-4)] mt-0.5">
                    {humanSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    if (fileInput.current) fileInput.current.value = "";
                  }}
                  title="حذف فایل"
                  className="shrink-0 rounded-lg p-1.5 text-[var(--ink-4)] hover:text-[var(--danger)] transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="qc-file"
                className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-[var(--line-strong)] px-4 py-8 text-center hover:border-[var(--violet)] transition-colors"
              >
                <CloudUpload size={20} className="text-[var(--violet)]" />
                <span className="font-body text-sm text-[var(--ink-2)]">
                  فایل رزومه‌ات رو انتخاب کن
                </span>
                <span className="font-body text-[11px] text-[var(--ink-4)]">
                  PDF، Word یا عکس — تا ۳ مگابایت
                </span>
              </label>
            )}

            <button
              type="button"
              onClick={() => {
                setMode("link");
                setGuideOpen(true);
                setError("");
              }}
              className="mt-3 font-body text-[11px] text-[var(--violet)] hover:underline underline-offset-4"
            >
              آپلود جواب نمی‌ده؟ از گوگل درایو لینک بده
            </button>
          </div>
        ) : (
          <div>
            <input
              id="qc-resume-url"
              type="url"
              dir="ltr"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              maxLength={500}
              placeholder="https://drive.google.com/file/d/..."
              className={`${field} text-left`}
            />

            {/* راهنمای درایو — بعد از یک آپلودِ شکست‌خورده خودش بازه */}
            <div
              className={`mt-3 rounded-xl border px-4 py-3.5 transition-colors ${
                uploadFailed
                  ? "border-[var(--violet)]/45 bg-[var(--violet)]/[0.09]"
                  : "border-[var(--violet)]/25 bg-[var(--violet)]/[0.06]"
              }`}
            >
              <button
                type="button"
                onClick={() => setGuideOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-2 font-body text-xs text-[var(--ink-2)]"
              >
                <span className="flex items-center gap-2">
                  <Info size={13} className="shrink-0 text-[var(--violet)]" />
                  چطور رزومه‌ام رو روی گوگل درایو بذارم؟
                </span>
                <span className="text-[var(--ink-4)]">{guideOpen ? "−" : "+"}</span>
              </button>

              {guideOpen && (
                <>
                  <ol className="mt-3 space-y-2.5 font-body text-xs text-[var(--ink-3)] leading-6">
                    {DRIVE_STEPS.map((step, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--violet)]/15 text-[10px] text-[var(--violet)]">
                          {toPersianDigits(i + 1)}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>

                  <p className="mt-3 font-body text-[11px] text-[var(--ink-4)] leading-6">
                    اگه دسترسی روی <span dir="ltr">Restricted</span> بمونه، لینک
                    برای ما باز نمی‌شه و رزومه‌ات بررسی‌نشده می‌مونه. بعد از کپی،
                    یک بار توی پنجرهٔ ناشناس بازش کن و مطمئن شو.
                  </p>

                  <a
                    href="https://drive.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 font-body text-[11px] text-[var(--violet)] hover:underline underline-offset-4"
                  >
                    باز کردن گوگل درایو
                    <ExternalLink size={11} />
                  </a>
                </>
              )}
            </div>

            <p className="mt-2.5 font-body text-[11px] text-[var(--ink-4)] leading-6">
              درایو در دسترست نیست؟ هر لینک عمومی دیگه‌ای هم قبوله — دراپ‌باکس،
              وان‌درایو یا حتی فایل رزومه توی پرتفولیوی خودت.
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-3">
          <CircleAlert size={15} className="mt-0.5 shrink-0 text-[var(--danger)]" />
          <p className="font-body text-sm text-[var(--danger)] leading-7">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--violet-deep)] hover:bg-[#7c4df1] disabled:opacity-50 px-6 py-3.5 font-body text-sm text-white transition-colors"
      >
        {busy ? (mode === "upload" ? "در حال آپلود..." : "در حال ثبت...") : "ثبت‌نام"}
        {!busy && <ArrowRight size={15} />}
      </button>
    </form>
  );
}
