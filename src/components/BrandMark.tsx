/**
 * نشان برند: سیبیل توپر.
 *
 * مسیر روی قاب ۱۲۰×۱۲۰ کشیده شده و قرینه‌ست. از مرکز بالا شروع می‌شه، لبه‌ی
 * بالایی تا نوک راست می‌ره، از لبه‌ی پایینی برمی‌گرده تا مرکز، و همین مسیر
 * در سمت چپ آینه می‌شه. چون فرم بسته‌ست، در هر اندازه‌ای توپر و تمیز می‌مونه.
 */

const STACHE_PATH =
  "M60 54 C74 38 104 36 114 58 C104 48 80 54 68 70 C65 74 55 74 52 70 " +
  "C40 54 16 48 6 58 C16 36 46 38 60 54 Z";

/**
 * همان فرم، ولی به دو نیمه‌ی قرینه شکسته شده تا هر بال بتونه جدا حرکت کنه.
 * هر دو از مرکز بالا شروع می‌شن و در مرکز پایین بسته می‌شن، پس کنار هم
 * دقیقاً همون سیبیل کامل رو می‌سازن.
 */
export const STACHE_RIGHT =
  "M60 54 C74 38 104 36 114 58 C104 48 80 54 68 70 C65 74 60 75 60 72 Z";

export const STACHE_LEFT =
  "M60 54 C46 38 16 36 6 58 C16 48 40 54 52 70 C55 74 60 75 60 72 Z";

/**
 * لولای بال‌ها، دقیقاً روی درز مرکزی.
 * اگر لولا پایین‌تر از درز باشه، دو نیمه موقع چرخش از هم باز می‌شن.
 */
export const STACHE_PIVOT = { x: 60, y: 63 };

/**
 * تکه‌ی ثابتِ وسط. نمی‌چرخه و درز بین دو بال را می‌پوشاند، پس هر چقدر هم
 * بال‌ها بچرخن، مرکز فرم یکپارچه می‌مونه. کاملاً داخل سیلوئت می‌شینه.
 */
export const STACHE_HINGE = { cx: 60, cy: 63, rx: 7, ry: 9.5 };

interface Props {
  /** اندازه بر حسب پیکسل */
  size?: number;
  className?: string;
}

/** سیبیل تنها، بدون قاب. رنگش را از currentColor می‌گیرد. */
export function BrandGlyph({ size = 40, className }: Props) {
  return (
    <svg
      viewBox="0 4 120 108"
      width={size}
      height={(size * 108) / 120}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d={STACHE_PATH} fill="currentColor" />
    </svg>
  );
}

interface MarkProps extends Props {
  /** رنگ مربع */
  bg?: string;
  /** رنگ سیبیل */
  fg?: string;
  rounded?: number;
}

/** سیبیل داخل مربع گردگوشه. نشان اصلی برند. */
export default function BrandMark({
  size = 40,
  bg = "#1a1714",
  fg = "#FAF6F1",
  rounded = 28,
  className,
}: MarkProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="120" rx={rounded} fill={bg} />
      <g transform="translate(60,62) scale(0.74) translate(-60,-58)">
        <path d={STACHE_PATH} fill={fg} />
      </g>
    </svg>
  );
}
