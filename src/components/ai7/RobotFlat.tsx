/**
 * کاشیِ سرِ ربات.
 *
 * پایینِ صفحه جای یک صحنهٔ سه‌بعدیِ دوم نیست — بومِ WebGL دیگری برای
 * فوتر هم گران است و هم توجه را از جایی که باید برود می‌دزدد. ولی
 * نوارِ پایانیِ مشکیِ خالی هم چیزی نیست جز یک بلوکِ تیره.
 *
 * پس فقط یک ردیفِ محو از سرها: از همان نسبت‌های `neoBot.ts` درآمده —
 * جمجمهٔ گِرد، یقهٔ پهن‌ترِ زیرش، دو چشمِ مستطیل — و آن‌قدر کم‌رنگ که
 * خوانده نشود، فقط حس شود.
 */

type Props = { className?: string; style?: React.CSSProperties };

/**
 * کاشی عمداً بزرگ‌تر از سر است تا بینشان هوا بماند؛ کاشیِ چسبیده
 * بافت نیست، کاغذدیواری است. چرخشِ هشت‌درجه هم برای همین است که
 * ردیف‌ها شبکهٔ صاف نشوند.
 *
 * چشم‌ها با رنگِ زمینه بریده می‌شوند (`--robot-cut`)، نه با رنگِ
 * روشن — یعنی هر جا بگذاریش، سوراخ‌ها همان زمینه را نشان می‌دهند.
 */
/**
 * همان سر، تک و بزرگ.
 *
 * فقط یک جا استفاده می‌شود: وقتی صحنهٔ سه‌بعدی بالا نمی‌آید. قابِ
 * سیاهِ خالی به کاربر می‌گوید «صفحه خراب است»؛ یک سیلوئتِ ساکت
 * می‌گوید «اینجا چیزی هست که دستگاهِ تو نتوانست نشانش بدهد» — و
 * بقیهٔ صفحه سرِ جایش می‌ماند.
 */
export function RobotGlyph({ className, style }: Props) {
  return (
    <svg viewBox="0 0 48 70" className={className} style={style} aria-hidden="true">
      <g fill="currentColor">
        <circle cx="24" cy="24" r="24" />
        <rect x="14" y="50" width="20" height="9" />
        <rect x="4" y="62" width="40" height="5" />
      </g>
      {/* چشم‌ها با رنگِ زمینه بریده می‌شوند، مثلِ کاشی */}
      <g fill="var(--robot-cut, #0a0908)">
        <rect x="7.5" y="19" width="12" height="8" />
        <rect x="28.5" y="19" width="12" height="8" />
      </g>
    </svg>
  );
}

export function RobotPattern({ className, style }: Props) {
  const id = "neo-head-tile";
  return (
    <svg className={className} style={style} aria-hidden="true">
      <defs>
        <pattern id={id} width="86" height="86" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <g fill="currentColor" transform="translate(24 26) scale(0.55)">
            <circle cx="24" cy="24" r="24" />
            <rect x="14" y="50" width="20" height="9" />
            <rect x="4" y="62" width="40" height="5" />
          </g>
          <g fill="var(--robot-cut, #0a0908)" transform="translate(24 26) scale(0.55)">
            <rect x="7.5" y="19" width="12" height="8" />
            <rect x="28.5" y="19" width="12" height="8" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
