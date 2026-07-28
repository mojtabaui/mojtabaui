"use client";

import { useState } from "react";

/**
 * فرم عمومیِ ثبت موضوع پروژه.
 *
 * دو مرحله‌ست: اول اسم و رمز دوره، بعد موضوع. عمداً هیچ فهرستی از اسم‌ها
 * نشون داده نمی‌شه — لینک قراره توی کانال بره و اسم بقیه نباید لو بره.
 */

type Course = { id: string; track: "UI" | "UX"; topic: string };

const TRACK_LABEL: Record<string, string> = {
  UI: "طراحی رابط کاربری",
  UX: "طراحی تجربه کاربری",
};

const field =
  "w-full bg-[#111110] border border-[#2d2c2a] focus:border-[#8b5cf6]/60 rounded-xl px-4 py-3 font-body text-sm text-[#fafaf9] placeholder:text-[#57534e] focus:outline-none transition-colors";

export default function ProjectTopicForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [matchedName, setMatchedName] = useState("");
  const [topics, setTopics] = useState<Record<string, string>>({});
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
    const seed: Record<string, string> = {};
    for (const c of data.courses as Course[]) seed[c.id] = c.topic;
    setTopics(seed);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = Object.entries(topics)
      .map(([id, topic]) => ({ id, topic: topic.trim() }))
      .filter((t) => t.topic);
    if (payload.length === 0) {
      setError("موضوع رو بنویس بعد ثبت بزن");
      return;
    }
    const data = await send("submit", { topics: payload });
    if (data) setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-6">
        <p className="font-body text-sm text-emerald-300 leading-7">
          ثبت شد. موضوعت رسید دستمون و توی جلسهٔ بعد دربارهٔ همین حرف می‌زنیم.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setCourses(null);
            setName("");
            setCode("");
          }}
          className="mt-4 font-body text-xs text-[#a8a29e] hover:text-[#fafaf9] underline underline-offset-4 transition-colors"
        >
          ثبت برای یک نفر دیگر
        </button>
      </div>
    );
  }

  // ── مرحلهٔ دوم: نوشتن موضوع ──
  if (courses) {
    return (
      <form onSubmit={handleSubmit} className="space-y-5">
        <p className="font-body text-sm text-[#a8a29e]">
          سلام <span className="text-[#fafaf9]">{matchedName}</span> 👋
        </p>

        {courses.map((c) => (
          <div key={c.id}>
            <label className="block font-body text-xs text-[#57534e] mb-2">
              {TRACK_LABEL[c.track]}
            </label>
            <textarea
              value={topics[c.id] ?? ""}
              onChange={(e) => setTopics({ ...topics, [c.id]: e.target.value })}
              rows={3}
              maxLength={300}
              placeholder="مثلاً: اپلیکیشن سفارش قهوه برای کافه‌های محلی"
              className={`${field} resize-y leading-7`}
            />
          </div>
        ))}

        {error && <p className="font-body text-sm text-rose-400">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-[#8b5cf6] hover:bg-[#7c4df1] disabled:opacity-50 px-6 py-3 font-body text-sm text-white transition-colors"
          >
            {busy ? "در حال ثبت..." : "ثبت موضوع"}
          </button>
          <button
            type="button"
            onClick={() => setCourses(null)}
            className="font-body text-xs text-[#57534e] hover:text-[#a8a29e] transition-colors"
          >
            برگرد
          </button>
        </div>
      </form>
    );
  }

  // ── مرحلهٔ اول: شناسایی ──
  return (
    <form onSubmit={handleLookup} className="space-y-5">
      <div>
        <label className="block font-body text-xs text-[#57534e] mb-2">
          اسم و فامیلت
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="همون‌طور که موقع ثبت‌نام نوشتی"
          className={field}
        />
      </div>

      <div>
        <label className="block font-body text-xs text-[#57534e] mb-2">رمز دوره</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          placeholder="توی کانال گذاشتیمش"
          className={field}
        />
      </div>

      {error && <p className="font-body text-sm text-rose-400 leading-7">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="rounded-xl bg-[#8b5cf6] hover:bg-[#7c4df1] disabled:opacity-50 px-6 py-3 font-body text-sm text-white transition-colors"
      >
        {busy ? "یک لحظه..." : "ادامه"}
      </button>
    </form>
  );
}
