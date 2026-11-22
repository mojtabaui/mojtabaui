"use client";

import { useState } from "react";
import { Check, CircleAlert, User, Users } from "lucide-react";
import { toPersianDigits } from "@/lib/persian-months";
import {
  GOALS,
  HOURS,
  LEVELS,
  REGIONS,
  SKILLS,
  TEAM_SIZES,
  TIME_SLOTS,
  formatOffset,
  type TeamupMode,
  type TeamupTrack,
} from "@/lib/teamup";

/**
 * فرم ترجیح پروژه، تکی یا گروهی.
 *
 * اول فقط اسم و راه تماس و انتخاب تکی/گروهی. تکی همین‌جا تمومه؛ گروهی
 * بقیهٔ سؤال‌ها رو باز می‌کنه. سؤال‌های مهارت و سطح به مسیر (UI یا UX) بستگی دارن.
 */

const field =
  "w-full bg-[var(--page)] border border-[var(--line-strong)] rounded-xl px-4 py-3 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet)] focus:ring-2 focus:ring-[var(--violet)]/25 transition-colors";
const card = "bg-[var(--card)] border border-[var(--line)] rounded-2xl";
const label = "block font-body text-xs text-[var(--ink-3)] mb-2";

/** یک گزینهٔ قابل انتخاب (رادیو یا چک‌باکس) به شکل کارت */
function Choice({
  type,
  name,
  checked,
  onChange,
  title,
  hint,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors ${
        checked
          ? "border-[var(--violet)] bg-[var(--violet)]/10"
          : "border-[var(--line-strong)] hover:border-[var(--violet)]/50"
      }`}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 accent-[var(--violet)]"
      />
      <span className="min-w-0">
        <span className="block font-body text-sm text-[var(--ink)] leading-6">{title}</span>
        {hint && (
          <span className="block font-body text-xs text-[var(--ink-4)] leading-5">{hint}</span>
        )}
      </span>
    </label>
  );
}

export default function TeamupForm({ track }: { track: TeamupTrack }) {
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [mode, setMode] = useState<TeamupMode | "">("");

  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [level, setLevel] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [hoursPerWeek, setHoursPerWeek] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [goal, setGoal] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState(""); // تله برای رباط

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<TeamupMode | null>(null);

  const allSlots = timeSlots.length === TIME_SLOTS.length;
  const toggle = (list: string[], set: (v: string[]) => void, key: string) =>
    set(list.includes(key) ? list.filter((k) => k !== key) : [...list, key]);

  const picked = REGIONS.find((r) => r.key === region);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!mode) {
      setError("تکی یا گروهی رو انتخاب کن");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/teamup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track,
          fullName,
          contact,
          mode,
          website,
          ...(mode === "GROUP"
            ? { region, city, timeSlots, level, skills, hoursPerWeek, teamSize, goal, partnerName, note }
            : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "ثبت نشد، دوباره امتحان کن");
        return;
      }
      setDone(mode);
    } catch {
      setError("اتصال برقرار نشد. اینترنتت رو چک کن و دوباره بزن.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className={`${card} p-7 text-center`}>
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[var(--ok)]/15 text-[var(--ok)]">
          <Check size={22} />
        </div>
        <h2 className="font-display text-xl text-[var(--ink)] mb-2">ثبت شد</h2>
        <p className="font-body text-sm text-[var(--ink-3)] leading-8">
          {done === "SOLO"
            ? "پروژه رو تکی انجام می‌دی. کار دیگه‌ای نداری."
            : "ترجیحت برای کار گروهی ثبت شد. بعد از جمع شدن فهرست، هم‌تیمی‌ها رو بهت اعلام می‌کنیم."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* تله‌ی رباط: برای آدم دیده نمی‌شه */}
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {/* ── هویت ── */}
      <div className={`${card} p-5 sm:p-6 space-y-5`}>
        <div>
          <label htmlFor="tu-name" className={`${label} flex items-center gap-1.5`}>
            <User size={13} />
            اسم و فامیل
          </label>
          <input
            id="tu-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            maxLength={80}
            autoComplete="name"
            placeholder="مثلاً زهرا محمدی"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="tu-contact" className={label}>
            شمارهٔ موبایل یا آیدی تلگرام
          </label>
          <input
            id="tu-contact"
            dir="ltr"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            maxLength={80}
            placeholder="09123456789 یا @your_id"
            className={`${field} text-left`}
          />
        </div>
      </div>

      {/* ── تکی یا گروهی ── */}
      <fieldset className={`${card} p-5 sm:p-6`}>
        <legend className="sr-only">تکی یا گروهی</legend>
        <p className={`${label} flex items-center gap-1.5`}>
          <Users size={13} />
          پروژه رو چطور انجام می‌دی؟
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Choice
            type="radio"
            name="mode"
            checked={mode === "SOLO"}
            onChange={() => setMode("SOLO")}
            title="تکی"
            hint="خودم تنها کار می‌کنم"
          />
          <Choice
            type="radio"
            name="mode"
            checked={mode === "GROUP"}
            onChange={() => setMode("GROUP")}
            title="گروهی"
            hint="می‌خوام با هم‌تیمی کار کنم"
          />
        </div>
      </fieldset>

      {mode === "GROUP" && (
        <>
          {/* ── محل و ساعت ── */}
          <div className={`${card} p-5 sm:p-6 space-y-5`}>
            <div>
              <label htmlFor="tu-region" className={label}>
                کجا زندگی می‌کنی؟ (برای تعیین اختلاف ساعت)
              </label>
              <select
                id="tu-region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
                className={field}
              >
                <option value="">انتخاب کن</option>
                {REGIONS.map((r) => (
                  <option key={r.key} value={r.key}>
                    {r.label}
                  </option>
                ))}
              </select>
              {picked && picked.key !== "other" && (
                <p className="mt-2 font-body text-xs text-[var(--ink-4)]">
                  اختلاف تقریبی با ایران:{" "}
                  <span dir="ltr">{toPersianDigits(formatOffset(picked.offset))}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="tu-city" className={label}>
                شهر {region === "other" ? "و کشور" : "(اختیاری)"}
              </label>
              <input
                id="tu-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                maxLength={60}
                required={region === "other"}
                placeholder={region === "other" ? "مثلاً ژاپن، توکیو" : "مثلاً برلین"}
                className={field}
              />
            </div>

            <fieldset>
              <legend className={label}>
                چه ساعتی از شبانه‌روز می‌تونی وقت بذاری؟ (به ساعت ایران، چندتا رو می‌تونی بزنی)
              </legend>
              <div className="space-y-2">
                <Choice
                  type="checkbox"
                  name="slot-all"
                  checked={allSlots}
                  onChange={() =>
                    setTimeSlots(allSlots ? [] : TIME_SLOTS.map((s) => s.key))
                  }
                  title="همهٔ موارد"
                  hint="هر ساعتی از روز"
                />
                {TIME_SLOTS.map((s) => (
                  <Choice
                    key={s.key}
                    type="checkbox"
                    name={`slot-${s.key}`}
                    checked={timeSlots.includes(s.key)}
                    onChange={() => toggle(timeSlots, setTimeSlots, s.key)}
                    title={s.label}
                    hint={`(${s.hint})`}
                  />
                ))}
              </div>
            </fieldset>

            <div>
              <p className={label}>هفته‌ای چند ساعت می‌تونی برای پروژه وقت بذاری؟</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {HOURS.map((h) => (
                  <Choice
                    key={h.key}
                    type="radio"
                    name="hours"
                    checked={hoursPerWeek === h.key}
                    onChange={() => setHoursPerWeek(h.key)}
                    title={h.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── سطح و مهارت ── */}
          <div className={`${card} p-5 sm:p-6 space-y-5`}>
            <fieldset>
              <legend className={label}>سطحت کدومه؟</legend>
              <div className="space-y-2">
                {LEVELS[track].map((l) => (
                  <Choice
                    key={l.value}
                    type="radio"
                    name="level"
                    checked={level === l.value}
                    onChange={() => setLevel(l.value)}
                    title={l.title}
                    hint={l.body}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={label}>{SKILLS[track].question} (اختیاری)</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {SKILLS[track].options.map((o) => (
                  <Choice
                    key={o.key}
                    type="checkbox"
                    name={`skill-${o.key}`}
                    checked={skills.includes(o.key)}
                    onChange={() => toggle(skills, setSkills, o.key)}
                    title={o.label}
                  />
                ))}
              </div>
            </fieldset>
          </div>

          {/* ── تیم ── */}
          <div className={`${card} p-5 sm:p-6 space-y-5`}>
            <div>
              <p className={label}>تیم چند نفره باشه؟</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {TEAM_SIZES.map((t) => (
                  <Choice
                    key={t.key}
                    type="radio"
                    name="size"
                    checked={teamSize === t.key}
                    onChange={() => setTeamSize(t.key)}
                    title={t.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className={label}>بیشتر دنبال چی هستی؟</p>
              <div className="space-y-2">
                {GOALS.map((g) => (
                  <Choice
                    key={g.key}
                    type="radio"
                    name="goal"
                    checked={goal === g.key}
                    onChange={() => setGoal(g.key)}
                    title={g.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="tu-partner" className={label}>
                کسی رو برای هم‌تیمی داری؟ اسمش رو بنویس (اختیاری)
              </label>
              <input
                id="tu-partner"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                maxLength={80}
                className={field}
              />
            </div>

            <div>
              <label htmlFor="tu-note" className={label}>
                چیز دیگه‌ای هست که بدونیم؟ (اختیاری)
              </label>
              <textarea
                id="tu-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={500}
                rows={3}
                className={`${field} resize-none`}
              />
            </div>
          </div>
        </>
      )}

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-3 font-body text-sm text-[var(--danger)]"
        >
          <CircleAlert size={16} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={busy || !mode}
        className="w-full rounded-xl bg-[var(--violet-deep)] px-5 py-3.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {busy ? "در حال ثبت…" : "ثبت"}
      </button>
    </form>
  );
}
