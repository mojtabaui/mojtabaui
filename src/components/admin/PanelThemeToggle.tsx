"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * کلید روشن/تیره‌ی پنل.
 *
 * حالت روی <html> می‌شینه نه روی خود دکمه، چون اسکریپت کوچیکِ داخل
 * layout قبل از اولین رنگ‌آمیزی همون‌جا می‌ذارتش و این‌طوری صفحه یک
 * لحظه تیره ظاهر نمی‌شه که بعد بپره به روشن.
 */
export const PANEL_THEME_KEY = "panel-theme";

export default function PanelThemeToggle() {
  const [light, setLight] = useState(false);

  // اسکریپت اولیه حالت رو گذاشته؛ اینجا فقط باهاش هماهنگ می‌شیم
  useEffect(() => {
    setLight(document.documentElement.dataset.panel === "light");
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.dataset.panel = "light";
    } else {
      delete document.documentElement.dataset.panel;
    }
    try {
      localStorage.setItem(PANEL_THEME_KEY, next ? "light" : "dark");
    } catch {
      // حالت خصوصی مرورگر — تم همین جلسه کار می‌کنه، ذخیره نمی‌شه
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={light ? "حالت تیره" : "حالت روشن"}
      aria-label={light ? "رفتن به حالت تیره" : "رفتن به حالت روشن"}
      className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--line-strong)]/50 text-[var(--ink-3)] hover:text-[var(--ink)] hover:border-[var(--violet)]/50 transition-colors"
    >
      {light ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );
}
