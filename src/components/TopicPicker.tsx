"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Search, Star, X } from "lucide-react";

export type PickableTopic = {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  detail: string;
  recommended: boolean;
};

/**
 * انتخاب موضوع از فهرست پیشنهادی.
 *
 * مودال شد نه دراپ‌داون، چون فهرست نزدیک هفتاد تاست و هر موضوع جز عنوان،
 * دسته و سختی و یک خط توضیح هم داره. توی یک select بومی هیچ‌کدوم از این‌ها
 * جا نمی‌شد و انتخاب کورکورانه می‌شد.
 */
export default function TopicPicker({
  topics,
  value,
  onPick,
  onClose,
}: {
  topics: PickableTopic[];
  value: string;
  onPick: (topic: PickableTopic) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  // Escape ببنده، و اسکرول پشت مودال قفل شه
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const categories = useMemo(
    () => [...new Set(topics.map((t) => t.category).filter(Boolean))],
    [topics]
  );

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return topics.filter((t) => {
      if (cat && t.category !== cat) return false;
      if (!needle) return true;
      return (
        t.title.toLowerCase().includes(needle) ||
        t.detail.toLowerCase().includes(needle) ||
        t.category.toLowerCase().includes(needle)
      );
    });
  }, [topics, q, cat]);

  // گروه‌بندی بر اساس دسته تا فهرست بلند خوانا بمونه
  const grouped = useMemo(() => {
    const map = new Map<string, PickableTopic[]>();
    for (const t of shown) {
      const key = t.category || "دیگر";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    return [...map.entries()];
  }, [shown]);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-3 py-1.5 font-body text-xs transition-colors ${
      active
        ? "bg-[var(--violet-deep)] text-white"
        : "bg-[var(--page)] border border-[var(--line-strong)]/50 text-[var(--ink-3)] hover:text-[var(--ink)]"
    }`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-6"
      onMouseDown={(e) => {
        if (!boxRef.current?.contains(e.target as Node)) onClose();
      }}
    >
      <div
        ref={boxRef}
        role="dialog"
        aria-modal="true"
        aria-label="انتخاب موضوع پروژه"
        className="w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] flex flex-col bg-[var(--card)] border border-[var(--line)] rounded-t-3xl sm:rounded-3xl overflow-hidden"
      >
        {/* ── سربرگ و جستجو ── */}
        <div className="p-5 border-b border-[var(--line)] space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg text-[var(--ink)]">
              یک موضوع انتخاب کن
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن"
              className="text-[var(--ink-4)] hover:text-[var(--ink)] p-1 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative">
            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-4)] pointer-events-none"
            />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoFocus
              placeholder="بگرد… مثلاً فروشگاه، سلامت، کودک"
              className="w-full bg-[var(--page)] border border-[var(--line-strong)] rounded-xl pr-10 pl-4 py-2.5 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet)] transition-colors"
            />
          </div>

          {categories.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button type="button" onClick={() => setCat("")} className={chip(!cat)}>
                همه
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c === cat ? "" : c)}
                  className={chip(c === cat)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── فهرست ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3">
          {shown.length === 0 ? (
            <p className="font-body text-sm text-[var(--ink-4)] text-center py-14">
              چیزی با این جستجو پیدا نشد. می‌تونی موضوع دلخواه خودت رو بنویسی.
            </p>
          ) : (
            grouped.map(([category, items]) => (
              <section key={category} className="mb-4 last:mb-0">
                <p className="font-body text-[11px] text-[var(--ink-4)] px-2 mb-1.5">
                  {category}
                </p>
                <div className="space-y-1">
                  {items.map((t) => {
                    const picked = t.title === value;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => onPick(t)}
                        className={`w-full text-right rounded-xl border p-3 transition-colors ${
                          picked
                            ? "border-[var(--violet)] bg-[var(--violet)]/10"
                            : "border-transparent hover:border-[var(--line-strong)]/50 hover:bg-[var(--card-raised)]"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {picked && (
                            <Check
                              size={14}
                              className="mt-1 shrink-0 text-[var(--violet)]"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="flex items-start gap-1.5 font-body text-sm text-[var(--ink)] leading-6">
                              {t.recommended && (
                                <Star
                                  size={11}
                                  fill="currentColor"
                                  aria-label="پیشنهادی"
                                  className="mt-1.5 shrink-0 text-[var(--warn)]"
                                />
                              )}
                              <span className="min-w-0">{t.title}</span>
                            </p>
                            {t.detail && (
                              <p className="font-body text-[11px] text-[var(--ink-4)] leading-5 mt-1">
                                {t.detail}
                              </p>
                            )}
                          </div>
                          {t.difficulty && (
                            <span className="shrink-0 font-body text-[10px] text-[var(--ink-4)] border border-[var(--line-strong)]/40 rounded-md px-1.5 py-0.5">
                              {t.difficulty}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>

        <div className="px-5 py-3 border-t border-[var(--line)]">
          <p className="font-body text-[11px] text-[var(--ink-4)]">
            <Star
              size={10}
              fill="currentColor"
              className="inline-block ml-1 text-[var(--warn)]"
            />
            یعنی پیشنهاد خودمون. اگه هیچ‌کدوم نبود، مودال رو ببند و تیک «موضوع
            دلخواه» رو بزن.
          </p>
        </div>
      </div>
    </div>
  );
}
