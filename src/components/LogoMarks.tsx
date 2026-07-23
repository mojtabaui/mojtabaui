/**
 * کاندیدهای لوگو، نسخه‌ی دوم.
 *
 * سه خانواده:
 *   • M لاتین با ساخت هندسی
 *   • سیبیل و عینک، یعنی همون چیزی که مخاطب باهاش می‌شناستش
 *   • فرم‌های مینیمال داخل مربع گردگوشه، هم‌خانواده با رفرنسی که پسندید
 *
 * قاعده‌های مشترک: قاب ۱۲۰×۱۲۰، ضخامت خط ۱۱، سر خط گرد.
 * هر مارک uid می‌گیره چون ماسک‌ها id یکتا لازم دارن.
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

/* ── اجزای مشترک ───────────────────────────────────────── */

/** سیبیل: دو سوئیش قرینه که وسط به هم می‌رسن */
function Stache({ color, sw = SW }: { color: string; sw?: number }) {
  return (
    <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round">
      <path d="M60 74 C48 88 28 86 20 68" />
      <path d="M60 74 C72 88 92 86 100 68" />
    </g>
  );
}

/** عینک: دو حلقه با پل وسط */
function Glasses({ color, sw = 9 }: { color: string; sw?: number }) {
  return (
    <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round">
      <circle cx="36" cy="44" r="17" />
      <circle cx="84" cy="44" r="17" />
      <path d="M53 44 H67" />
    </g>
  );
}

/** M هندسی، خط‌کشی‌شده روی گرید */
function MStrokes({ color, sw = SW }: { color: string; sw?: number }) {
  return (
    <path
      d="M22 96 V34 L60 74 L98 34 V96"
      fill="none"
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/* ── کاندیدها ──────────────────────────────────────────── */

/** ۰۱ — M تک‌خط، خالص و بی‌ادعا */
export function MarkM({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <MStrokes color={color} />
    </svg>
  );
}

/** ۰۲ — M بریده از مربع گردگوشه. هم‌خانواده با رفرنس. */
export function MarkMSquare({ color = "#1a1714", uid, className }: MarkProps) {
  const id = `msq-${uid}`;
  return (
    <svg {...box} className={className}>
      <mask id={id}>
        <rect width="120" height="120" fill="#fff" />
        <g transform="translate(60,62) scale(0.62) translate(-60,-62)">
          <MStrokes color="#000" sw={16} />
        </g>
      </mask>
      <rect width="120" height="120" rx="30" fill={color} mask={`url(#${id})`} />
    </svg>
  );
}

/** ۰۳ — M توپر با درّه‌ی تیز. سیلوئت پرکنتراست. */
export function MarkMSolid({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        fill={color}
        d="M18 100 V30 h16 L60 62 L86 30 h16 V100 H86 V56 L60 88 L34 56 V100 Z"
      />
    </svg>
  );
}

/** ۰۴ — M با شکاف گرید از وسط */
export function MarkMGutter({ color = "#1a1714", uid, className }: MarkProps) {
  const id = `mgt-${uid}`;
  return (
    <svg {...box} className={className}>
      <mask id={id}>
        <rect width="120" height="120" fill="#fff" />
        <rect x="0" y="60" width="120" height="8" fill="#000" />
      </mask>
      <g mask={`url(#${id})`}>
        <MStrokes color={color} />
      </g>
    </svg>
  );
}

/** ۰۵ — سیبیل تنها. ساده‌ترین شکل امضای شخصی. */
export function MarkStache({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <g transform="translate(0,-12)">
        <Stache color={color} sw={13} />
      </g>
    </svg>
  );
}

/** ۰۶ — عینک و سیبیل. همون چیزی که باهاش می‌شناسنت. */
export function MarkFace({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <Glasses color={color} />
      <Stache color={color} sw={10} />
    </svg>
  );
}

/** ۰۷ — عینک و سیبیل داخل مربع گردگوشه */
export function MarkFaceSquare({ color = "#1a1714", uid, className }: MarkProps) {
  const id = `fsq-${uid}`;
  return (
    <svg {...box} className={className}>
      <mask id={id}>
        <rect width="120" height="120" fill="#fff" />
        <g transform="translate(60,60) scale(0.66) translate(-60,-60)">
          <Glasses color="#000" sw={11} />
          <Stache color="#000" sw={12} />
        </g>
      </mask>
      <rect width="120" height="120" rx="30" fill={color} mask={`url(#${id})`} />
    </svg>
  );
}

/** ۰۸ — سیبیل که هم‌زمان M هم هست. دو معنا در یک فرم. */
export function MarkMStache({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      {/* دو حلقه‌ی عینک به دو نقطه تقلیل پیدا کرده */}
      <circle cx="38" cy="34" r="7" fill={color} />
      <circle cx="82" cy="34" r="7" fill={color} />
      <g
        fill="none"
        stroke={color}
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 60 V88 M20 60 C30 56 50 60 60 76 C70 60 90 56 100 60 M100 60 V88" />
      </g>
    </svg>
  );
}

/** ۰۹ — فرم پلکانی مینیمال. مستقیم از حس رفرنس. */
export function MarkStep({ color = "#1a1714", uid, className }: MarkProps) {
  const id = `stp-${uid}`;
  return (
    <svg {...box} className={className}>
      <mask id={id}>
        <rect width="120" height="120" fill="#fff" />
        <path d="M34 34 H62 V62 H86 V86 H34 Z" fill="#000" />
      </mask>
      <rect width="120" height="120" rx="30" fill={color} mask={`url(#${id})`} />
    </svg>
  );
}

/** ۱۰ — M از دو مستطیل جابه‌جا. ساخت کاملاً هندسی. */
export function MarkMBlocks({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <g fill={color}>
        <rect x="20" y="28" width="16" height="64" rx="8" />
        <rect x="84" y="28" width="16" height="64" rx="8" />
        <rect
          x="44"
          y="34"
          width="16"
          height="46"
          rx="8"
          transform="rotate(-28 52 57)"
        />
        <rect
          x="60"
          y="34"
          width="16"
          height="46"
          rx="8"
          transform="rotate(28 68 57)"
        />
      </g>
    </svg>
  );
}

/** ۱۱ — M داخل حلقه. برای مهر و فاویکون. */
export function MarkMBadge({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <circle cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="7" />
      <g transform="translate(60,60) scale(0.56) translate(-60,-62)">
        <MStrokes color={color} sw={14} />
      </g>
    </svg>
  );
}

/** ۱۲ — سیبیل توپر، بدون خط. وزن سنگین و سیلوئت قوی. */
export function MarkStacheSolid({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        fill={color}
        d="M60 52 C74 40 100 40 108 58 C98 50 78 54 66 68 C63 71 57 71 54 68 C42 54 22 50 12 58 C20 40 46 40 60 52 Z"
      />
      <circle cx="40" cy="30" r="7" fill={color} />
      <circle cx="80" cy="30" r="7" fill={color} />
    </svg>
  );
}

export const MARKS = [
  { key: "m", label: "M تک‌خط", Comp: MarkM },
  { key: "msquare", label: "M در مربع", Comp: MarkMSquare },
  { key: "msolid", label: "M توپر", Comp: MarkMSolid },
  { key: "mgutter", label: "M با شکاف", Comp: MarkMGutter },
  { key: "mblocks", label: "M بلوکی", Comp: MarkMBlocks },
  { key: "mbadge", label: "M در حلقه", Comp: MarkMBadge },
  { key: "step", label: "فرم پلکانی", Comp: MarkStep },
  { key: "stache", label: "سیبیل تنها", Comp: MarkStache },
  { key: "face", label: "عینک و سیبیل", Comp: MarkFace },
  { key: "facesquare", label: "عینک و سیبیل در مربع", Comp: MarkFaceSquare },
  { key: "mstache", label: "سیبیل که M هم هست", Comp: MarkMStache },
  { key: "stachesolid", label: "سیبیل توپر", Comp: MarkStacheSolid },
] as const;
