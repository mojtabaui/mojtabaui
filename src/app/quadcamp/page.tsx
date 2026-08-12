import type { Metadata } from "next";
import QuadcampForm from "@/components/QuadcampForm";

export const metadata: Metadata = {
  title: "ثبت‌نام کوادکمپ",
  description: "پرتفولیو و رزومه‌ات رو برای شرکت در کوادکمپ اینجا بفرست.",
  robots: { index: false, follow: false },
};

export default function QuadcampPage() {
  return (
    <main className="panel native-cursor relative min-h-screen bg-[var(--page)] overflow-hidden">
      {/* هالهٔ بنفش پشت سربرگ، همون لهجه‌ی رنگی خود سایت */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-96 opacity-70"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, var(--violet) 22%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-xl px-5 py-14 sm:py-20">
        <header className="mb-9">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-[var(--violet)]/70" />
            <span className="font-display text-[11px] tracking-[0.2em] uppercase text-[var(--violet)]">
              Quad Camp
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-[var(--ink)] leading-tight mb-3">
            کارهات رو نشونمون بده
          </h1>

          <p className="font-body text-sm text-[var(--ink-3)] leading-7">
            برای کوادکمپ دو چیز ازت می‌خوایم: لینک پرتفولیو و رزومه. رزومه رو یا
            همین‌جا آپلود کن، یا اگه آپلود جواب نداد بذارش روی گوگل درایو و
            لینکش رو بده — راهنماش هم همین پایین هست.
          </p>
        </header>

        <QuadcampForm />

        <p className="mt-10 font-body text-xs text-[var(--ink-4)] leading-7 text-center">
          مشکلی پیش اومد؟ توی گروه پیام بده تا دستی ثبتش کنیم.
        </p>
      </div>
    </main>
  );
}
