"use client";

import type { Mission } from "@/lib/odyssey";

/**
 * یک سیاره، ساخته از چهار لایهٔ CSS. عمداً WebGL نیست.
 *
 * سبکِ «3D & Hyperrealism» کارایی ضعیفی روی موبایل دارد، پس عمق را از
 * چیزهایی می‌گیریم که مرورگر ارزان رندر می‌کند: یک گرادیان شعاعیِ
 * آفست‌شده (منبع نور)، یک سایهٔ داخلی (خط شب و روز)، یک هالهٔ محو
 * (جوّ) و یک بافتِ کشویی (چرخش).
 *
 *   halo      → پشت کره، محوشده، رنگِ جوّ
 *   sphere    → گرادیان شعاعی با مرکز بالا-چپ
 *   texture   → نوار یا لکه، داخل کره بریده می‌شود و آرام می‌لغزد
 *   specular  → نقطهٔ درخشانِ کوچک، همان جایی که نور می‌تابد
 *
 * چرخش با translateX روی لایهٔ بافت انجام می‌شود نه با background-position،
 * چون اولی روی GPU می‌رود و دومی هر فریم layout را دوباره حساب می‌کند.
 */

export default function Planet({
  mission,
  className = "",
}: {
  mission: Mission;
  className?: string;
}) {
  const { lit, dark, halo, tint, ring, bands } = mission;

  return (
    <div
      className={`relative aspect-square ${className}`}
      style={{ ["--lit" as string]: lit, ["--dark" as string]: dark, ["--halo" as string]: halo }}
      aria-hidden="true"
    >
      {/* جوّ — بیرون از کره می‌زند بیرون و لبه را نرم می‌کند */}
      <div
        className="absolute inset-[-18%] rounded-full opacity-45 blur-2xl"
        style={{ background: `radial-gradient(circle, ${halo} 0%, transparent 68%)` }}
      />

      {/* کره */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 26%, ${lit} 0%, ${lit} 12%, ${dark} 68%, #05050c 100%)`,
          boxShadow: `inset -14px -12px 44px rgba(0,0,0,.75), inset 8px 6px 26px ${halo}44, 0 0 60px ${halo}33`,
        }}
      >
        {/* بافت — دو نسخهٔ پشت‌سرهم تا وقتی می‌لغزد درزی دیده نشود.
            همیشه رندر می‌شود؛ کاهش حرکت را خودِ CSS خاموش می‌کند، وگرنه
            درختِ سرور و مرورگر یکی نمی‌شد و hydration می‌شکست. */}
        <div
            className="absolute inset-y-0 left-0 w-[200%] odyssey-spin"
            style={{
              background: bands
                ? // نوارهای مشتری: ضخامتِ نامساوی، وگرنه راه‌راهِ پارچه می‌شود
                  `repeating-linear-gradient(
                     0deg,
                     transparent 0 6%,
                     rgba(0,0,0,.20) 6% 9%,
                     transparent 9% 14%,
                     rgba(255,255,255,.10) 14% 17%,
                     transparent 17% 26%,
                     rgba(0,0,0,.26) 26% 32%,
                     transparent 32% 41%,
                     rgba(255,255,255,.07) 41% 44%,
                     transparent 44% 55%,
                     rgba(0,0,0,.18) 55% 60%,
                     transparent 60% 72%,
                     rgba(255,255,255,.06) 72% 75%,
                     transparent 75% 100%
                   )`
                : // لکه‌های قاره‌مانند برای بقیه
                  `radial-gradient(ellipse 22% 13% at 18% 34%, rgba(0,0,0,.30), transparent 60%),
                   radial-gradient(ellipse 15% 9%  at 44% 62%, rgba(0,0,0,.24), transparent 62%),
                   radial-gradient(ellipse 12% 16% at 68% 28%, rgba(255,255,255,.10), transparent 64%),
                   radial-gradient(ellipse 18% 10% at 84% 70%, rgba(0,0,0,.22), transparent 60%)`,
              maskImage: "radial-gradient(circle at 50% 50%, #000 62%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 62%, transparent 78%)",
          }}
        />

        {/* خط شب و روز — لبهٔ سایه را عمیق‌تر می‌کند */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 24%, transparent 30%, rgba(2,2,8,.55) 78%, rgba(2,2,8,.92) 100%)",
          }}
        />

        {/* بازتاب نور */}
        <div
          className="absolute left-[22%] top-[16%] h-[16%] w-[22%] rounded-full opacity-50 blur-lg"
          style={{ background: `radial-gradient(circle, #fff 0%, transparent 70%)` }}
        />
      </div>

      {/* حلقهٔ زحل — با چرخش سه‌بعدی، پس واقعاً دور کره می‌نشیند */}
      {ring && (
        <div
          className="pointer-events-none absolute inset-[-30%]"
          style={{ perspective: "700px" }}
        >
          <div
            className="absolute inset-0 rounded-full border-[6px]"
            style={{
              transform: "rotateX(76deg) rotateZ(-16deg)",
              borderColor: `${tint}66`,
              boxShadow: `0 0 0 6px ${tint}22, inset 0 0 0 5px ${tint}18`,
            }}
          />
          <div
            className="absolute inset-[9%] rounded-full border-2"
            style={{
              transform: "rotateX(76deg) rotateZ(-16deg)",
              borderColor: `${tint}33`,
            }}
          />
        </div>
      )}
    </div>
  );
}
