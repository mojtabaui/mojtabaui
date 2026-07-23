/**
 * کاندیدهای لوگو، نسخه‌ی سوم.
 *
 * تمرکز روی M لاتین با فرم‌های ساده. سیبیل توپر که پسندیده شد نگه داشته شده،
 * به‌علاوه‌ی چند هیبرید که در اون‌ها M غالبه و سیبیل فقط در دی‌ان‌ای فرمه.
 * ترکیب عینک و سیبیل حذف شد.
 *
 * قاب ۱۲۰×۱۲۰. هر مارک uid می‌گیره چون ماسک‌ها id یکتا لازم دارن.
 */

interface MarkProps {
  color?: string;
  uid: string;
  className?: string;
}

const box = {
  viewBox: "0 0 120 120",
  xmlns: "http://www.w3.org/2000/svg",
} as const;

/* ── خانواده‌ی M ────────────────────────────────────────── */

/** ۰۱ — M تک‌خط با گوشه‌های تیز */
export function MarkMSharp({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        d="M20 98 V28 L60 72 L100 28 V98"
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/** ۰۲ — همان با گوشه‌های گرد. نرم‌تر و امروزی‌تر. */
export function MarkMRound({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        d="M22 96 V34 L60 72 L98 34 V96"
        fill="none"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** ۰۳ — M توپر. سیلوئت پرکنتراست. */
export function MarkMSolid({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        fill={color}
        d="M16 100 V24 h20 L60 58 L84 24 h20 V100 H86 V52 L60 86 L34 52 V100 Z"
      />
    </svg>
  );
}

/** ۰۴ — M با درّه‌ی منحنی. همون‌جاست که سیبیل قایم شده. */
export function MarkMSoft({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        d="M22 96 V38 C22 32 30 30 34 36 L60 74 L86 36 C90 30 98 32 98 38 V96"
        fill="none"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** ۰۵ — M از دو شِوران جدا */
export function MarkMChevron({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <g
        fill="none"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 84 L40 42 L60 84" />
        <path d="M60 84 L80 42 L100 84" />
      </g>
    </svg>
  );
}

/** ۰۶ — M بریده از مربع گردگوشه */
export function MarkMSquare({ color = "#1a1714", uid, className }: MarkProps) {
  const id = `msq-${uid}`;
  return (
    <svg {...box} className={className}>
      <mask id={id}>
        <rect width="120" height="120" fill="#fff" />
        <path
          d="M36 84 V44 L60 70 L84 44 V84"
          fill="none"
          stroke="#000"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <rect width="120" height="120" rx="30" fill={color} mask={`url(#${id})`} />
    </svg>
  );
}

/** ۰۷ — M توپر داخل مربع گردگوشه */
export function MarkMSquareFill({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <rect width="120" height="120" rx="30" fill={color} />
      <path
        d="M34 86 V38 h13 L60 60 L73 38 h13 V86 H74 V56 L60 78 L46 56 V86 Z"
        fill="#FAF6F1"
      />
    </svg>
  );
}

/** ۰۸ — M پهن و کوتاه. وزن افقی. */
export function MarkMWide({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        d="M10 86 V44 L60 78 L110 44 V86"
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** ۰۹ — M با شکاف گرید */
export function MarkMGutter({ color = "#1a1714", uid, className }: MarkProps) {
  const id = `mgt-${uid}`;
  return (
    <svg {...box} className={className}>
      <mask id={id}>
        <rect width="120" height="120" fill="#fff" />
        <rect x="0" y="58" width="120" height="9" fill="#000" />
      </mask>
      <g mask={`url(#${id})`}>
        <path
          d="M22 96 V34 L60 72 L98 34 V96"
          fill="none"
          stroke={color}
          strokeWidth="13"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
      </g>
    </svg>
  );
}

/** ۱۰ — M از دو مثلث توپر */
export function MarkMTriangles({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <g fill={color}>
        <path d="M16 96 L40 32 L60 84 L44 84 L38 66 L30 96 Z" />
        <path d="M104 96 L80 32 L60 84 L76 84 L82 66 L90 96 Z" />
      </g>
    </svg>
  );
}

/** ۱۱ — M که پاهاش کمی به بیرون خم شده. اشاره‌ی دور به سیبیل. */
export function MarkMCurl({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        d="M16 92 C16 60 20 40 34 38 L60 74 L86 38 C100 40 104 60 104 92"
        fill="none"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** ۱۲ — M در حلقه. مناسب مهر و فاویکون. */
export function MarkMBadge({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <circle cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="8" />
      <path
        d="M38 78 V44 L60 66 L82 44 V78"
        fill="none"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** ۱۳ — M با یک پای بلندتر. حس حرکت و صعود. */
export function MarkMRise({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        d="M22 98 V46 L60 82 L98 26 V98"
        fill="none"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** ۱۴ — M استنسیلی، از سه پاره‌ی جدا */
export function MarkMStencil({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <g
        fill="none"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="round"
      >
        <path d="M22 96 V38" />
        <path d="M30 32 L60 62 L90 32" />
        <path d="M98 96 V38" />
      </g>
    </svg>
  );
}

/** ۱۵ — M از دو قوس. نرم و گرد. */
export function MarkMArch({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        d="M20 96 V56 a20 20 0 0 1 40 0 V96 M60 56 a20 20 0 0 1 40 0 V96"
        fill="none"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** ۱۶ — سیبیل توپر، همون که پسندیدی. بدون عینک. */
export function MarkStacheSolid({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        fill={color}
        d="M60 56 C76 40 104 40 112 60 C100 50 78 56 66 72 C63 76 57 76 54 72 C42 56 20 50 8 60 C16 40 44 40 60 56 Z"
      />
    </svg>
  );
}

/** ۱۷ — سیبیل توپر در مربع گردگوشه */
export function MarkStacheSquare({ color = "#1a1714", uid, className }: MarkProps) {
  const id = `stq-${uid}`;
  return (
    <svg {...box} className={className}>
      <mask id={id}>
        <rect width="120" height="120" fill="#fff" />
        <g transform="translate(60,62) scale(0.66) translate(-60,-58)">
          <path
            fill="#000"
            d="M60 56 C76 40 104 40 112 60 C100 50 78 56 66 72 C63 76 57 76 54 72 C42 56 20 50 8 60 C16 40 44 40 60 56 Z"
          />
        </g>
      </mask>
      <rect width="120" height="120" rx="30" fill={color} mask={`url(#${id})`} />
    </svg>
  );
}

/** ۱۸ — M توپر با درّه‌ی منحنی. جایی که M و سیبیل یکی می‌شن. */
export function MarkMStacheSolid({ color = "#1a1714", className }: MarkProps) {
  return (
    <svg {...box} className={className}>
      <path
        fill={color}
        d="M14 98 C14 56 22 32 38 30 C48 30 54 44 60 62 C66 44 72 30 82 30 C98 32 106 56 106 98 H88 C88 66 86 50 80 50 C74 50 68 68 60 88 C52 68 46 50 40 50 C34 50 32 66 32 98 Z"
      />
    </svg>
  );
}

export const MARKS = [
  { key: "msharp", label: "M تیز", Comp: MarkMSharp },
  { key: "mround", label: "M گردگوشه", Comp: MarkMRound },
  { key: "msolid", label: "M توپر", Comp: MarkMSolid },
  { key: "msoft", label: "M با درّه‌ی منحنی", Comp: MarkMSoft },
  { key: "mchevron", label: "M شِورانی", Comp: MarkMChevron },
  { key: "msquare", label: "M بریده از مربع", Comp: MarkMSquare },
  { key: "msquarefill", label: "M توپر در مربع", Comp: MarkMSquareFill },
  { key: "mwide", label: "M پهن", Comp: MarkMWide },
  { key: "mgutter", label: "M با شکاف", Comp: MarkMGutter },
  { key: "mtri", label: "M از دو مثلث", Comp: MarkMTriangles },
  { key: "mcurl", label: "M با پای خمیده", Comp: MarkMCurl },
  { key: "mbadge", label: "M در حلقه", Comp: MarkMBadge },
  { key: "mrise", label: "M صعودی", Comp: MarkMRise },
  { key: "mstencil", label: "M استنسیلی", Comp: MarkMStencil },
  { key: "march", label: "M دو قوسی", Comp: MarkMArch },
  { key: "stache", label: "سیبیل توپر", Comp: MarkStacheSolid },
  { key: "stachesq", label: "سیبیل در مربع", Comp: MarkStacheSquare },
  { key: "mstache", label: "M توپر با درّه‌ی سیبیلی", Comp: MarkMStacheSolid },
] as const;
