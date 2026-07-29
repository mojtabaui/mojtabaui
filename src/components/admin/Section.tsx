import Link from "next/link";
import type { LucideIcon } from "lucide-react";

/**
 * پوستهٔ مشترک بخش‌های پنل.
 *
 * قبلاً هر بخش سرتیتر خودش رو دستی می‌ساخت و نتیجه این شده بود که همه‌چیز
 * یک اندازه و یک وزن دیده می‌شد. حالا سرتیتر یک جا تعریف می‌شه و هر بخش
 * فقط محتواش رو می‌ده.
 */
export function Section({
  title,
  icon: Icon,
  accent = "var(--ink-4)",
  meta,
  href,
  hrefLabel,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  /** رنگ آیکن سرتیتر، برای اینکه بخش‌ها از هم قابل تشخیص باشن */
  accent?: string;
  /** شمارش یا توضیح کوتاه سمت چپ */
  meta?: React.ReactNode;
  href?: string;
  hrefLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[var(--card)] border border-[var(--line)] rounded-2xl overflow-hidden">
      <header className="px-5 sm:px-6 py-4 border-b border-[var(--line)] flex items-center justify-between gap-3">
        <h2 className="font-body font-semibold text-[var(--ink)] text-sm flex items-center gap-2.5 min-w-0">
          {Icon && <Icon size={15} style={{ color: accent }} className="shrink-0" />}
          <span className="truncate">{title}</span>
        </h2>

        <div className="flex items-center gap-4 shrink-0">
          {meta && <span className="font-body text-xs text-[var(--ink-4)]">{meta}</span>}
          {href && (
            <Link
              href={href}
              className="font-body text-xs text-[var(--violet)] hover:text-[#c4b5fd] transition-colors"
            >
              {hrefLabel} ←
            </Link>
          )}
        </div>
      </header>

      {children}
    </section>
  );
}

/** حالت خالی یک بخش — آیکن کم‌رنگ، متن خوانا */
export function Empty({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="px-6 py-14 text-center">
      <Icon size={22} className="text-[var(--ink-faint)] mx-auto mb-3" />
      <p className="font-body text-[var(--ink-4)] text-sm">{children}</p>
    </div>
  );
}

/**
 * فهرست‌های بلند پنل رو محدود می‌کنه.
 * صد تا شمارهٔ تلفن پشت سر هم صفحه رو غیرقابل استفاده می‌کرد.
 */
export function ScrollArea({
  children,
  max = "26rem",
}: {
  children: React.ReactNode;
  max?: string;
}) {
  return (
    <div className="overflow-y-auto overscroll-contain" style={{ maxHeight: max }}>
      {children}
    </div>
  );
}
