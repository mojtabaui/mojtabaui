/**
 * کاندیدهای لوگو، همه با SVG و هندسه‌ی دقیق.
 *
 * قاعده‌های مشترک تا خانواده به‌هم بخوره:
 *   • قاب ۱۲۰×۱۲۰
 *   • ضخامت خط ثابت ۱۱ واحد
 *   • سرِ خط گرد
 *   • میم = دایره‌ی سر + دمی که پایین میاد و به چپ قلاب می‌شه
 *
 * هر مارک یک uid می‌گیره چون ماسک‌ها id یکتا لازم دارن، وگرنه وقتی یک مارک
 * چند بار روی صفحه رندر بشه ماسک‌ها با هم تداخل می‌کنن.
 */

const SW = 11;

interface MarkProps {
  color?: string;
  uid: string;
  className?: string;
}

const box = {
  viewBox: "0 0 120 120",
  xmlns: "http://www.w3.org/2000/svg",
} as const;

/** بدنه‌ی مشترک میم: دایره‌ی سر و دم */
function MeemStrokes({ color }: { color: string }) {
  return (
    <g
      transform="translate(8,4)"
      fill="none"
      stroke={color}
      strokeWidth={SW}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="52" cy="44" r="22" />
      <path d="M74 44 V72 a18 18 0 0 1 -18 18 H36" />
    </g>
  );
}

/** ۰۱ — میم تک‌خط. پایه‌ی همه‌ی بقیه. */
export function MarkMonoline({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <MeemStrokes color={color} />
    </svg>
  );
}

/** ۰۲ — میم بریده‌شده از دل مربعِ گردگوشه. فیگور و گراند. */
export function MarkNegative({ color = "#1a1714", uid, className }: MarkProps) {
  const id = `neg-${uid}`;
  return (
    <svg {...box} className={className}>
      <mask id={id}>
        <rect width="120" height="120" fill="#fff" />
        <MeemStrokes color="#000" />
      </mask>
      <rect width="120" height="120" rx="30" fill={color} mask={`url(#${id})`} />
    </svg>
  );
}

/** ۰۳ — میم از ماژول‌های جدا. همون منطق دیزاین سیستم. */
export function MarkModular({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <g
        transform="translate(8,4)"
        fill="none"
        stroke={color}
        strokeWidth={SW}
        strokeLinecap="round"
      >
        {/* دایره به سه پاره‌ی مساوی با فاصله شکسته شده */}
        <circle cx="52" cy="44" r="22" strokeDasharray="38 8" strokeDashoffset="4" />
        {/* دم هم دو ماژول جدا */}
        <path d="M74 46 V70" />
        <path d="M72 78 a18 18 0 0 1 -16 12 H36" />
      </g>
    </svg>
  );
}

/** ۰۴ — شکاف گرید از وسط حرف رد می‌شه. */
export function MarkGutter({ color = "#1a1714", uid, className }: MarkProps) {
  const id = `gut-${uid}`;
  return (
    <svg {...box} className={className}>
      <mask id={id}>
        <rect width="120" height="120" fill="#fff" />
        <rect x="0" y="54" width="120" height="9" fill="#000" />
      </mask>
      <g mask={`url(#${id})`}>
        <MeemStrokes color={color} />
      </g>
    </svg>
  );
}

/** ۰۵ — میم توپر با کانتر خالی. وزن بیشتر، حضور قوی‌تر. */
export function MarkSolid({ color = "#1a1714", uid, className }: MarkProps) {
  const id = `sol-${uid}`;
  return (
    <svg {...box} className={className}>
      <mask id={id}>
        <rect width="120" height="120" fill="#000" />
        <g transform="translate(8,4)">
          <circle cx="52" cy="44" r="27.5" fill="#fff" />
          <path
            d="M68.5 44 H79.5 V72 a24 24 0 0 1 -24 24 H36 V85 h19.5 a13 13 0 0 0 13 -13 Z"
            fill="#fff"
          />
          <circle cx="52" cy="44" r="16.5" fill="#000" />
        </g>
      </mask>
      <rect width="120" height="120" fill={color} mask={`url(#${id})`} />
    </svg>
  );
}

/** ۰۶ — میم داخل حلقه. برای مهر و فاویکون. */
export function MarkBadge({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <circle cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="7" />
      <g transform="translate(60,60) scale(0.62) translate(-60,-60)">
        <MeemStrokes color={color} />
      </g>
    </svg>
  );
}

/** ۰۷ — M از دو قوس، نسخه‌ی مرتب‌شده‌ی لوگوی فعلی. */
export function MarkArchM({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <g
        fill="none"
        stroke={color}
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 100 V48 a19 19 0 0 1 38 0 V100" />
        <path d="M62 100 V48 a19 19 0 0 1 38 0 V100" />
      </g>
    </svg>
  );
}

/** ۰۸ — دو قوس توپر با درّه‌ی تیز وسط. سیلوئت پرکنتراست. */
export function MarkArchSolid({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        fill={color}
        d="M16 102 V46 a22 22 0 0 1 44 0 v0 a22 22 0 0 1 44 0 V102 H78 V52 L60 74 L42 52 V102 Z"
      />
    </svg>
  );
}

export const MARKS = [
  { key: "monoline", label: "میم تک‌خط", Comp: MarkMonoline },
  { key: "negative", label: "میم در فضای منفی", Comp: MarkNegative },
  { key: "modular", label: "میم ماژولار", Comp: MarkModular },
  { key: "gutter", label: "میم با شکاف گرید", Comp: MarkGutter },
  { key: "solid", label: "میم توپر", Comp: MarkSolid },
  { key: "badge", label: "میم در حلقه", Comp: MarkBadge },
  { key: "arch", label: "M دو قوسی", Comp: MarkArchM },
  { key: "archsolid", label: "M توپر", Comp: MarkArchSolid },
] as const;
