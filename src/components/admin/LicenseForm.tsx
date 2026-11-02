"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, User, Users, FileText, Download, AlertTriangle, Loader2 } from "lucide-react";
import CopyButton from "@/components/admin/CopyButton";
import { toLatinDigits, toPersianDigits } from "@/lib/persian-months";

export interface LicenseCourseOption {
  id: string;
  title: string;
  devices: number;
  /** شناسهٔ اسپات‌پلیر هنوز ثبت نشده */
  disabled: boolean;
  /** لینک گروه نداره — نامه بدون QR ساخته می‌شه */
  noGroup: boolean;
}

interface Person {
  name: string;
  phone: string;
}

type Result =
  | { status: "pending" | "working"; person: Person }
  | { status: "ok"; person: Person; key: string; id: string | null }
  | { status: "error"; person: Person; error: string };

/**
 * هر سطر یک نفر: «اسم، موبایل». جداکننده کاما، ویرگول فارسی یا تب
 * (کپی از اکسل). اگه فقط یک فاصله بینشون باشه، آخرین تکهٔ عددی موبایله.
 */
function parseLines(text: string): { people: Person[]; bad: string[] } {
  const people: Person[] = [];
  const bad: string[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const latin = toLatinDigits(line);
    let name = "";
    let phone = "";
    const parts = latin.split(/[\t,،;]/).map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
      const i = parts.findIndex((p) => /^\+?[\d\s-]{6,}$/.test(p));
      if (i >= 0) {
        phone = parts[i];
        name = parts.filter((_, j) => j !== i).join(" ");
      }
    } else {
      const m = latin.match(/^(.*?)[\s]+(\+?[\d-]{6,})$/) || latin.match(/^(\+?[\d-]{6,})[\s]+(.*)$/);
      if (m) {
        const digitsFirst = /^\+?[\d-]/.test(m[1]);
        name = (digitsFirst ? m[2] : m[1]).trim();
        phone = digitsFirst ? m[1] : m[2];
      }
    }
    phone = phone.replace(/[\s-]/g, "");
    if (name && phone) people.push({ name, phone });
    else bad.push(line);
  }
  return { people, bad };
}

const letterHref = (id: string) => `/api/admin/licenses/${id}/welcome`;

/**
 * صدور لایسنس اسپات‌پلیر برای خریدارهای کارت‌به‌کارت — تکی یا گروهی.
 * گروهی نفر به نفر جلو می‌ره تا خطای یک نفر بقیه رو نخوابونه و
 * کلیدهای ساخته‌شده همین‌جا بمونن.
 */
export default function LicenseForm({ courses }: { courses: LicenseCourseOption[] }) {
  const router = useRouter();
  const [mode, setMode] = useState<"single" | "group">("single");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bulk, setBulk] = useState("");
  const [note, setNote] = useState("");
  const [devices, setDevices] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [test, setTest] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const parsed = useMemo(() => parseLines(bulk), [bulk]);
  const defaultDevices = useMemo(() => {
    const picked = courses.filter((c) => selected.includes(c.id));
    return picked.length ? Math.min(...picked.map((c) => c.devices)) : null;
  }, [courses, selected]);

  const field =
    "w-full bg-[var(--page)] border border-[var(--line-strong)] rounded-xl px-3 py-2.5 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet)] transition-colors";

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  async function issue(person: Person) {
    const res = await fetch("/api/admin/licenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...person, note, devices, test, courseIds: selected }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "لایسنس ساخته نشد");
    return data as { key: string; id: string | null };
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    let people: Person[];
    if (mode === "single") {
      if (!name.trim()) return setError("اسم رو بنویس");
      if (!phone.trim()) return setError("شمارهٔ موبایل لازمه — روی ویدیو واترمارک می‌شه");
      people = [{ name: name.trim(), phone: toLatinDigits(phone).replace(/[\s-]/g, "") }];
    } else {
      if (parsed.people.length === 0) return setError("هیچ سطر درستی پیدا نشد");
      if (parsed.bad.length) return setError(`${toPersianDigits(parsed.bad.length)} سطر اسم یا موبایل نداره؛ اول درستش کن`);
      people = parsed.people;
    }
    if (selected.length === 0) return setError("حداقل یک دوره انتخاب کن");
    if (
      mode === "group" &&
      !confirm(`برای ${toPersianDigits(people.length)} نفر لایسنس${test ? " آزمایشی" : ""} ساخته بشه؟`)
    ) {
      return;
    }

    setBusy(true);
    const list: Result[] = people.map((p) => ({ status: "pending", person: p }));
    setResults([...list]);

    for (let i = 0; i < people.length; i++) {
      list[i] = { status: "working", person: people[i] };
      setResults([...list]);
      try {
        const r = await issue(people[i]);
        list[i] = { status: "ok", person: people[i], key: r.key, id: r.id };
      } catch (err) {
        const msg = err instanceof Error ? err.message : "خطا در ارتباط با سرور";
        list[i] = { status: "error", person: people[i], error: msg };
      }
      setResults([...list]);
    }

    const failed = list.filter((r) => r.status === "error");
    if (failed.length === 0) {
      setName("");
      setPhone("");
      setBulk("");
    } else if (mode === "group") {
      // فقط سطرهای ناموفق می‌مونن تا با یک کلیک دوباره امتحان بشن
      setBulk(failed.map((r) => `${r.person.name}, ${r.person.phone}`).join("\n"));
    }
    setBusy(false);
    router.refresh();
  }

  const okCount = results.filter((r) => r.status === "ok").length;

  return (
    <div className="space-y-5">
      <form onSubmit={submit} className="space-y-4">
        <div className="inline-flex rounded-xl border border-[var(--line-strong)] p-1 gap-1">
          {(
            [
              ["single", "تکی", User],
              ["group", "گروهی", Users],
            ] as const
          ).map(([m, label, Icon]) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-body text-sm transition-colors ${
                mode === m
                  ? "bg-[var(--violet)]/15 text-[var(--ink)]"
                  : "text-[var(--ink-4)] hover:text-[var(--ink-2)]"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {mode === "single" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="block font-body text-xs text-[var(--ink-3)] mb-1.5">
                اسم (همونی که توی نامه میاد)
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً Sara Mohammadi یا سارا محمدی"
                className={field}
              />
            </label>
            <label className="block">
              <span className="block font-body text-xs text-[var(--ink-3)] mb-1.5">
                موبایل (واترمارک روی ویدیو)
              </span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09121234567"
                inputMode="tel"
                dir="ltr"
                className={`${field} text-left`}
              />
            </label>
          </div>
        ) : (
          <label className="block">
            <span className="block font-body text-xs text-[var(--ink-3)] mb-1.5">
              هر سطر یک نفر: اسم، موبایل — می‌تونی مستقیم از اکسل کپی کنی
            </span>
            <textarea
              value={bulk}
              onChange={(e) => setBulk(e.target.value)}
              rows={7}
              placeholder={"Sara Mohammadi, 09121234567\nعلی رضایی، ۰۹۳۵۱۲۳۴۵۶۷"}
              className={`${field} font-mono text-xs leading-6`}
            />
            {bulk.trim() && (
              <span className="block font-body text-xs mt-1.5 text-[var(--ink-4)]">
                {toPersianDigits(parsed.people.length)} نفر
                {parsed.bad.length > 0 && (
                  <span className="text-[var(--danger)]">
                    {" "}· {toPersianDigits(parsed.bad.length)} سطر ناخوانا: {parsed.bad.slice(0, 2).join(" | ")}
                  </span>
                )}
              </span>
            )}
          </label>
        )}

        <fieldset>
          <legend className="font-body text-xs text-[var(--ink-3)] mb-2">دوره‌های ثبت‌نامی</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {courses.map((c) => {
              const on = selected.includes(c.id);
              return (
                <label
                  key={c.title}
                  className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors ${
                    c.disabled
                      ? "border-[var(--line)] opacity-50 cursor-not-allowed"
                      : on
                        ? "border-[var(--violet)] bg-[var(--violet)]/10 cursor-pointer"
                        : "border-[var(--line-strong)] hover:border-[var(--violet)]/50 cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    disabled={c.disabled}
                    onChange={() => toggle(c.id)}
                    className="accent-[var(--violet)]"
                  />
                  <span className="font-body text-sm text-[var(--ink)] flex-1 min-w-0 truncate">
                    {c.title}
                  </span>
                  {c.disabled ? (
                    <span className="font-body text-[10px] text-[var(--warn)] shrink-0">شناسه ندارد</span>
                  ) : (
                    c.noGroup && (
                      <span className="font-body text-[10px] text-[var(--ink-4)] shrink-0">بدون لینک گروه</span>
                    )
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_9rem] gap-3">
          <label className="block">
            <span className="block font-body text-xs text-[var(--ink-3)] mb-1.5">
              یادداشت (اختیاری، فقط برای خودت)
            </span>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="مثلاً واریز ۱۲ آبان، کمپین پاییز"
              className={field}
            />
          </label>
          <label className="block">
            <span className="block font-body text-xs text-[var(--ink-3)] mb-1.5">تعداد دستگاه</span>
            <input
              value={devices}
              onChange={(e) => setDevices(e.target.value)}
              placeholder={defaultDevices ? toPersianDigits(defaultDevices) : "پیش‌فرض"}
              inputMode="numeric"
              className={field}
            />
          </label>
        </div>

        <label className="flex items-center gap-2 font-body text-sm text-[var(--ink-2)] cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={test}
            onChange={(e) => setTest(e.target.checked)}
            className="accent-[var(--violet)]"
          />
          لایسنس آزمایشی (تست)
        </label>

        {error && <p className="font-body text-sm text-[var(--danger)]">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 bg-[var(--violet-deep)] hover:bg-[var(--violet)] disabled:opacity-60 text-white font-body text-sm font-semibold rounded-xl px-5 py-2.5 transition-colors"
        >
          {busy ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}
          {busy
            ? "در حال ساخت…"
            : mode === "group" && parsed.people.length > 0
              ? `ساخت ${toPersianDigits(parsed.people.length)} لایسنس`
              : "ساخت لایسنس"}
        </button>
      </form>

      {results.length > 0 && (
        <div className="border border-[var(--line-strong)] rounded-2xl overflow-hidden">
          <p className="px-4 py-2.5 border-b border-[var(--line)] font-body text-xs text-[var(--ink-3)]">
            {toPersianDigits(okCount)} از {toPersianDigits(results.length)} ساخته شد
          </p>
          <ul className="divide-y divide-[var(--line)]">
            {results.map((r, i) => (
              <li key={i} className="px-4 py-3 flex items-center gap-3 flex-wrap">
                <div className="min-w-0 flex-1">
                  <p className="font-body text-sm text-[var(--ink)] truncate">
                    <bdi>{r.person.name}</bdi>
                    <span dir="ltr" className="text-[var(--ink-4)] text-xs ms-2">
                      {r.person.phone}
                    </span>
                  </p>
                  {r.status === "ok" && (
                    <p dir="ltr" className="font-mono text-[11px] text-[var(--ink-3)] truncate text-left mt-0.5">
                      {r.key}
                    </p>
                  )}
                  {r.status === "error" && (
                    <p className="font-body text-xs text-[var(--danger)] mt-0.5">{r.error}</p>
                  )}
                  {r.status === "ok" && !r.id && (
                    <p className="flex items-center gap-1 font-body text-xs text-[var(--warn)] mt-0.5">
                      <AlertTriangle size={12} />
                      توی دیتابیس ثبت نشد — کلید رو همین الان کپی کن
                    </p>
                  )}
                </div>
                {r.status === "working" && (
                  <Loader2 size={15} className="animate-spin text-[var(--ink-4)]" />
                )}
                {r.status === "ok" && (
                  <div className="flex items-center gap-1.5">
                    <CopyButton value={r.key} label="کپی کلید" />
                    {r.id && (
                      <>
                        <a
                          href={letterHref(r.id)}
                          target="_blank"
                          rel="noopener"
                          title="دیدن نامه"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--line-strong)] text-[var(--ink-3)] hover:text-[var(--ink)] hover:border-[var(--violet)]/60 transition-colors"
                        >
                          <FileText size={14} />
                        </a>
                        <a
                          href={`${letterHref(r.id)}?download=1`}
                          title="دانلود نامه"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--line-strong)] text-[var(--ink-3)] hover:text-[var(--ink)] hover:border-[var(--violet)]/60 transition-colors"
                        >
                          <Download size={14} />
                        </a>
                      </>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
