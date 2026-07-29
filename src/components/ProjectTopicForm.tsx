"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Info,
  KeyRound,
  Link2,
  ListChecks,
  PencilLine,
  User,
} from "lucide-react";
import { toPersianDigits } from "@/lib/persian-months";
import TopicPicker, { type PickableTopic } from "@/components/TopicPicker";

/**
 * فرم عمومیِ ثبت موضوع پروژه.
 *
 * دو مرحله‌ست: اول اسم و رمز دوره، بعد موضوع و لینک فایل. عمداً هیچ فهرستی
 * از اسم‌ها نشون داده نمی‌شه — لینک قراره توی کانال بره و اسم بقیه نباید
 * لو بره. به همین دلیل تطبیق اسم دستِ سروره و ما فقط راهنماییش می‌کنیم.
 *
 * هر دوره رمز خودش رو داره، پس رمز تعیین می‌کنه فرم برای کدوم دوره باز
 * بشه. کسی که هر دو دوره رو داره دو بار پر می‌کنه، یک بار با هر رمز.
 */

type Course = { id: string; track: "UI" | "UX"; topic: string; fileLink: string };
/** custom یعنی موضوع دلخواه نوشته، نه انتخاب از فهرست */
type Entry = { topic: string; fileLink: string; custom: boolean };

const TRACK_LABEL: Record<string, string> = {
  UI: "طراحی رابط کاربری",
  UX: "طراحی تجربه کاربری",
};

const field =
  "w-full bg-[var(--page)] border border-[var(--line-strong)] rounded-xl px-4 py-3 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet)] focus:ring-2 focus:ring-[var(--violet)]/25 transition-colors";

const card = "bg-[var(--card)] border border-[var(--line)] rounded-2xl";

/** نوار مرحله، تا معلوم باشه کجای کاریم */
function Steps({ step }: { step: 1 | 2 }) {
  const items = ["شناسایی", "موضوع و فایل"];
  return (
    <ol className="flex items-center gap-3 mb-6">
      {items.map((label, i) => {
        const n = (i + 1) as 1 | 2;
        const state = n < step ? "done" : n === step ? "now" : "next";
        return (
          <li key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full font-body text-[11px] transition-colors ${
                  state === "done"
                    ? "bg-[var(--violet)] text-white"
                    : state === "now"
                      ? "bg-[var(--violet)]/15 text-[var(--violet)] ring-1 ring-[var(--violet)]/50"
                      : "bg-[var(--card)] text-[var(--ink-4)] ring-1 ring-[var(--line-strong)]/50"
                }`}
              >
                {state === "done" ? <Check size={12} /> : n === 1 ? "۱" : "۲"}
              </span>
              <span
                className={`font-body text-xs ${
                  state === "next" ? "text-[var(--ink-4)]" : "text-[var(--ink-2)]"
                }`}
              >
                {label}
              </span>
            </div>
            {i === 0 && <span className="h-px w-6 bg-[var(--line-strong)]/50" />}
          </li>
        );
      })}
    </ol>
  );
}

export default function ProjectTopicForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [matchedName, setMatchedName] = useState("");
  const [entries, setEntries] = useState<Record<string, Entry>>({});
  const [topics, setTopics] = useState<PickableTopic[]>([]);
  /** شناسهٔ دوره‌ای که مودالش بازه */
  const [picking, setPicking] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function send(action: "lookup" | "submit", extra: object = {}) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, name, code, ...extra }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "یک جای کار ایراد داشت");
        return null;
      }
      return data;
    } catch {
      setError("به سرور وصل نشدیم. اینترنتت رو چک کن و دوباره بزن.");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    const data = await send("lookup");
    if (!data) return;
    setCourses(data.courses);
    setMatchedName(data.name);
    const list: PickableTopic[] = data.topics ?? [];
    setTopics(list);

    const known = new Set(list.map((t) => t.title));
    const seed: Record<string, Entry> = {};
    for (const c of data.courses as Course[]) {
      seed[c.id] = {
        topic: c.topic,
        fileLink: c.fileLink,
        // اگه موضوع قبلی‌اش توی فهرست نیست، یعنی دلخواه نوشته بوده
        custom: Boolean(c.topic) && !known.has(c.topic),
      };
    }
    setEntries(seed);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = Object.entries(entries)
      .map(([id, v]) => ({ id, topic: v.topic.trim(), fileLink: v.fileLink.trim() }))
      .filter((t) => t.topic || t.fileLink);

    if (payload.length === 0) {
      setError("موضوع و لینک فایلت رو بنویس بعد ثبت بزن");
      return;
    }
    const bad = payload.find((t) => t.fileLink && !/^https?:\/\//i.test(t.fileLink));
    if (bad) {
      setError("لینک باید کامل باشه و با https:// شروع بشه");
      return;
    }
    const data = await send("submit", { topics: payload });
    if (data) setDone(true);
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
          موضوعت رسید دستمون و توی جلسهٔ بعد دربارهٔ همین حرف می‌زنیم. اگه نظرت عوض
          شد، هر وقت خواستی برگرد و دوباره پرش کن.
        </p>
        <p className="mt-3 font-body text-xs text-[var(--ink-4)] leading-7">
          دورهٔ دیگه‌ای هم برداشتی؟ رمزش فرق داره. دوباره از اینجا شروع کن و رمز
          اون یکی رو بزن.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setCourses(null);
            setCode("");
            setError("");
          }}
          className="mt-5 font-body text-xs text-[var(--ink-3)] hover:text-[var(--ink)] underline underline-offset-4 transition-colors"
        >
          ثبت دورهٔ دیگر یا نفر دیگر
        </button>
      </div>
    );
  }

  // ── مرحلهٔ دوم: موضوع و لینک ──
  if (courses) {
    return (
      <div>
        <Steps step={2} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={`${card} px-5 py-4 flex items-center gap-3`}>
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--violet)]/15 text-[var(--violet)]">
              <User size={16} />
            </div>
            <div className="min-w-0">
              <p className="font-body text-sm text-[var(--ink)] truncate">{matchedName}</p>
              <p className="font-body text-xs text-[var(--ink-4)] mt-0.5">
                دورهٔ {TRACK_LABEL[courses[0]?.track ?? "UI"]}. اگه این تو نیستی برگرد و
                اسمت رو اصلاح کن.
              </p>
            </div>
          </div>

          {courses.map((c) => {
            const v = entries[c.id] ?? { topic: "", fileLink: "", custom: false };
            const set = (patch: Partial<Entry>) =>
              setEntries({ ...entries, [c.id]: { ...v, ...patch } });

            const chosen = topics.find((t) => t.title === v.topic);

            return (
              <div key={c.id} className={`${card} p-5 space-y-5`}>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--violet)]" />
                  <p className="font-body text-xs text-[var(--violet)]">
                    {TRACK_LABEL[c.track]}
                  </p>
                </div>

                <div>
                  <label className="block font-body text-xs text-[var(--ink-3)] mb-2">
                    موضوع پروژه
                  </label>

                  {/* از فهرست انتخاب کن، یا تیک پایین رو بزن و خودت بنویس */}
                  {!v.custom ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setPicking(c.id)}
                        className={`w-full text-right rounded-xl border px-4 py-3 transition-colors ${
                          v.topic
                            ? "border-[var(--violet)]/50 bg-[var(--violet)]/[0.07]"
                            : "border-[var(--line-strong)] hover:border-[var(--violet)]"
                        }`}
                      >
                        <span className="flex items-start gap-2.5">
                          <ListChecks
                            size={15}
                            className="mt-0.5 shrink-0 text-[var(--violet)]"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block font-body text-sm text-[var(--ink)] leading-6">
                              {v.topic || "از فهرست موضوع‌ها انتخاب کن"}
                            </span>
                            {chosen?.detail && (
                              <span className="block font-body text-[11px] text-[var(--ink-4)] leading-5 mt-1">
                                {chosen.detail}
                              </span>
                            )}
                            {!v.topic && (
                              <span className="block font-body text-[11px] text-[var(--ink-4)] mt-1">
                                {toPersianDigits(topics.length)} موضوع آماده، با جستجو
                              </span>
                            )}
                          </span>
                          {chosen?.difficulty && (
                            <span className="shrink-0 font-body text-[10px] text-[var(--ink-4)] border border-[var(--line-strong)]/40 rounded-md px-1.5 py-0.5">
                              {chosen.difficulty}
                            </span>
                          )}
                        </span>
                      </button>
                      {v.topic && (
                        <button
                          type="button"
                          onClick={() => setPicking(c.id)}
                          className="mt-2 font-body text-[11px] text-[var(--violet)] hover:underline underline-offset-4"
                        >
                          عوضش کن
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <textarea
                        value={v.topic}
                        onChange={(e) => set({ topic: e.target.value })}
                        rows={2}
                        maxLength={300}
                        placeholder="مثلاً: اپلیکیشن سفارش قهوه برای کافه‌های محلی"
                        className={`${field} resize-y leading-7`}
                      />
                      {v.topic.length > 0 && (
                        <p className="mt-1.5 font-body text-[11px] text-[var(--ink-4)]">
                          {toPersianDigits(300 - v.topic.length)} کاراکتر باقی مونده
                        </p>
                      )}
                    </>
                  )}

                  <label className="mt-3 flex items-start gap-2 font-body text-xs text-[var(--ink-3)] leading-6">
                    <input
                      type="checkbox"
                      checked={v.custom}
                      onChange={(e) => set({ custom: e.target.checked, topic: "" })}
                      className="mt-1 h-3.5 w-3.5 shrink-0 accent-[var(--violet-deep)]"
                    />
                    <span>
                      <PencilLine size={12} className="inline-block ml-1 align-[-1px]" />
                      موضوع دلخواه خودم رو می‌نویسم
                      <span className="block text-[var(--ink-4)] text-[11px]">
                        قبلش با منتور هماهنگ کن که برای این دوره مناسب باشه.
                      </span>
                    </span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 font-body text-xs text-[var(--ink-3)] mb-2">
                    <Link2 size={13} />
                    لینک فایل کارت
                  </label>
                  <input
                    type="url"
                    dir="ltr"
                    value={v.fileLink}
                    onChange={(e) => set({ fileLink: e.target.value })}
                    maxLength={500}
                    placeholder="https://figma.com/file/..."
                    className={`${field} text-left`}
                  />
                  <p className="mt-2 font-body text-xs text-[var(--ink-4)] leading-6">
                    لینک فیگمای پروژه‌ات. اول توی فیگما دکمهٔ{" "}
                    <span dir="ltr" className="text-[var(--ink-3)]">
                      Share
                    </span>{" "}
                    رو بزن و دسترسی رو روی «هر کسی که لینک داره» بذار، وگرنه ما
                    بازش نمی‌تونیم بکنیم.
                  </p>
                </div>
              </div>
            );
          })}

          {error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-3">
              <CircleAlert size={15} className="mt-0.5 shrink-0 text-[var(--danger)]" />
              <p className="font-body text-sm text-[var(--danger)] leading-7">{error}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-[var(--violet-deep)] hover:bg-[#7c4df1] disabled:opacity-50 px-6 py-3 font-body text-sm text-white transition-colors"
            >
              {busy ? "در حال ثبت..." : "ثبت موضوع"}
            </button>
            <button
              type="button"
              onClick={() => {
                setCourses(null);
                setError("");
              }}
              className="font-body text-xs text-[var(--ink-4)] hover:text-[var(--ink-2)] transition-colors"
            >
              برگرد
            </button>
          </div>
        </form>

        {picking && (
          <TopicPicker
            topics={topics}
            value={entries[picking]?.topic ?? ""}
            onPick={(t) => {
              const cur = entries[picking] ?? { topic: "", fileLink: "", custom: false };
              setEntries({ ...entries, [picking]: { ...cur, topic: t.title } });
              setPicking(null);
            }}
            onClose={() => setPicking(null)}
          />
        )}
      </div>
    );
  }

  // ── مرحلهٔ اول: شناسایی ──
  return (
    <div>
      <Steps step={1} />

      <form onSubmit={handleLookup} className={`${card} p-5 sm:p-6 space-y-5`}>
        <div>
          <label
            htmlFor="student-name"
            className="flex items-center gap-1.5 font-body text-xs text-[var(--ink-3)] mb-2"
          >
            <User size={13} />
            اسم و فامیلت
          </label>
          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            placeholder="مثلاً: زهرا محمدی"
            className={field}
          />

          {/* راهنمای اسم — چون فهرستی نشون نمی‌دیم، تطبیق باید راهنمایی بشه */}
          <div className="mt-3 rounded-xl border border-[var(--violet)]/25 bg-[var(--violet)]/[0.06] px-4 py-3.5">
            <p className="flex items-center gap-2 font-body text-xs text-[var(--ink-2)] mb-2.5">
              <Info size={13} className="text-[var(--violet)] shrink-0" />
              اسمت رو چطور بنویسم؟
            </p>
            <ul className="space-y-2 font-body text-xs text-[var(--ink-3)] leading-6">
              {[
                "همون اسمی که موقع ثبت‌نام دوره دادی، نه اسم مستعار یا آیدی تلگرام.",
                "اسم کوچیک و فامیل، با یک فاصله بینشون. لقب و پیشوند لازم نیست.",
                "کم و زیادِ فاصله‌ها و «ي» و «ك» عربی مشکلی نداره، خودمون درستش می‌کنیم.",
                "اگه پیدا نشدی، احتمالاً املای فامیلیت فرق داره. یک بار دیگه امتحان کن.",
              ].map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--violet)]/70" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <label
            htmlFor="course-code"
            className="flex items-center gap-1.5 font-body text-xs text-[var(--ink-3)] mb-2"
          >
            <KeyRound size={13} />
            رمز دوره
          </label>
          <input
            id="course-code"
            type="text"
            dir="ltr"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            autoComplete="off"
            placeholder="همونی که توی کانال گذاشتیم"
            className={`${field} text-left`}
          />
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
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--violet-deep)] hover:bg-[#7c4df1] disabled:opacity-50 px-6 py-3 font-body text-sm text-white transition-colors"
        >
          {busy ? "یک لحظه..." : "ادامه"}
          {!busy && <ArrowRight size={15} />}
        </button>
      </form>
    </div>
  );
}
