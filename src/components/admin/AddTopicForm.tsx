"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

/**
 * افزودن موضوع. کادر عنوان چندخطیه چون معمولاً چند موضوع با هم اضافه
 * می‌شن — هر خط یک موضوع، با دسته و سختیِ مشترک.
 */
export default function AddTopicForm({ track }: { track: "UI" | "UX" }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("متوسط");
  const [detail, setDetail] = useState("");
  const [recommended, setRecommended] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  const field =
    "w-full bg-[var(--page)] border border-[var(--line-strong)] rounded-xl px-4 py-2.5 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet)] transition-colors";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNote("");
    try {
      const res = await fetch("/api/admin/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track, title, category, difficulty, detail, recommended }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "اضافه نشد");
      } else {
        setNote(
          data.skipped
            ? `${data.added} تا اضافه شد، ${data.skipped} تا تکراری بود`
            : `${data.added} موضوع اضافه شد`
        );
        setTitle("");
        setDetail("");
        router.refresh();
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    }
    setBusy(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-xl bg-[var(--violet-deep)] hover:bg-[#7c4ff0] px-4 py-2.5 font-body font-semibold text-sm text-white transition-colors"
      >
        <Plus size={15} />
        موضوع جدید
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="w-full bg-[var(--card)] border border-[var(--line)] rounded-2xl p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-body font-semibold text-sm text-[var(--ink)]">
          موضوع جدید برای دورهٔ {track === "UI" ? "رابط کاربری" : "تجربه کاربری"}
        </h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[var(--ink-4)] hover:text-[var(--ink)] p-1 transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      <div>
        <label className="block font-body text-xs text-[var(--ink-3)] mb-2">
          عنوان موضوع — هر خط یک موضوع
        </label>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          rows={4}
          placeholder={"اپلیکیشن رزرو نوبت آرایشگاه\nوبسایت اجاره تجهیزات عکاسی"}
          className={`${field} resize-y leading-7`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-body text-xs text-[var(--ink-3)] mb-2">دسته</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="مثلاً فروشگاهی"
            className={field}
          />
        </div>
        <div>
          <label className="block font-body text-xs text-[var(--ink-3)] mb-2">
            درجهٔ سختی
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={field}
          >
            <option value="ساده">ساده</option>
            <option value="متوسط">متوسط</option>
            <option value="سخت">سخت</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-body text-xs text-[var(--ink-3)] mb-2">
          توضیح یا خروجی مورد انتظار
        </label>
        <input
          type="text"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="روی همهٔ خط‌های بالا یکسان اعمال می‌شه"
          className={field}
        />
      </div>

      <label className="flex items-center gap-2 font-body text-sm text-[var(--ink-2)]">
        <input
          type="checkbox"
          checked={recommended}
          onChange={(e) => setRecommended(e.target.checked)}
          className="w-4 h-4 accent-[var(--violet-deep)]"
        />
        پیشنهادی علامت بخورد
      </label>

      {error && <p className="font-body text-sm text-[var(--danger)]">{error}</p>}
      {note && <p className="font-body text-sm text-[var(--ok)]">{note}</p>}

      <button
        type="submit"
        disabled={busy}
        className="rounded-xl bg-[var(--violet-deep)] hover:bg-[#7c4ff0] disabled:opacity-50 px-6 py-2.5 font-body font-semibold text-sm text-white transition-colors"
      >
        {busy ? "در حال افزودن..." : "افزودن"}
      </button>
    </form>
  );
}
