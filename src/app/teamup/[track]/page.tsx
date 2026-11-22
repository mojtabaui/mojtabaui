import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PanelThemeToggle from "@/components/admin/PanelThemeToggle";
import PanelThemeScript from "@/components/admin/PanelThemeScript";
import TeamupForm from "@/components/TeamupForm";
import { TRACK_LABEL, TRACK_SLUG } from "@/lib/teamup";

type Props = { params: Promise<{ track: string }> };

export function generateStaticParams() {
  return Object.keys(TRACK_SLUG).map((track) => ({ track }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track } = await params;
  const t = TRACK_SLUG[track];
  return {
    title: t ? `پروژه تکی یا گروهی — ${TRACK_LABEL[t]}` : "پروژه تکی یا گروهی",
    robots: { index: false, follow: false },
  };
}

export default async function TeamupPage({ params }: Props) {
  const { track } = await params;
  const t = TRACK_SLUG[track];
  if (!t) notFound();

  return (
    <main className="panel native-cursor relative min-h-screen bg-[var(--page)] overflow-hidden">
      <PanelThemeScript />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-96 opacity-70"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, var(--violet) 22%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-xl px-5 py-14 sm:py-20">
        <div className="mb-8 flex justify-end">
          <PanelThemeToggle />
        </div>

        <header className="mb-9">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-[var(--violet)]/70" />
            <span className="font-display text-[11px] tracking-[0.2em] uppercase text-[var(--violet)]">
              Melina Design School · {TRACK_LABEL[t]}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-[var(--ink)] leading-tight mb-3">
            پروژه رو تکی کار می‌کنی یا گروهی؟
          </h1>

          <p className="font-body text-sm text-[var(--ink-3)] leading-7">
            اگه تکی رو بزنی کار همین‌جا تمومه. اگه گروهی رو بزنی چند سؤال کوتاه
            می‌پرسیم تا بتونیم کسی رو هم‌تیمیت کنیم که ساعت و سطحش به تو بخوره.
            هر وقت نظرت عوض شد دوباره فرم رو با همون شماره پر کن، جایگزین قبلی می‌شه.
          </p>
        </header>

        <TeamupForm track={t} />
      </div>
    </main>
  );
}
