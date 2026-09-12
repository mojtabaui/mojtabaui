/**
 * تصویرهای سه مرحله — دوبعدی، ولی از همان دنیای ربات.
 *
 * ربات سه‌بعدی است و این‌ها نیستند، و همین عمدی است: کارت‌های مرحله
 * کنارِ متن می‌نشینند و یک رندرِ سه‌بعدیِ دیگر آنجا با صحنهٔ بالای
 * صفحه رقابت می‌کرد. چیزی که هویت را نگه می‌دارد رندر نیست، *واژگانِ
 * فرم* است:
 *
 *   همان قطعه‌ها — لامپِ تصویر، دیسکِ کرمِ روی بام، آنتنِ کج، کلید،
 *   سیمِ فنری. کسی که ربات را دیده، این‌ها را می‌شناسد.
 *
 *   همان پالت، و به همان نسبت: نارنجی توده را می‌سازد، قرمز فقط
 *   لهجه است، کرم جدا می‌کند، زرشکی سایه است.
 *
 *   عمق با *لایه* ساخته می‌شود نه با گرادیانت. هر حجم یک تکهٔ
 *   تیره‌ترِ هم‌رنگ دارد که کمی جابه‌جا شده. گرادیانت این تصویرها را
 *   به تقلیدِ ناقصِ سه‌بعدی می‌بُرد؛ لایهٔ تخت، خودش یک زبان است.
 *
 * قابِ همه ۲۰۰×۲۸۰ است تا در کنارِ ستونِ متن، عمودی بنشینند.
 */

/**
 * پالت **تک‌رنگ** — هم‌خانوادهٔ پیکرهٔ هیرو.
 *
 * نسخهٔ اول نارنجی و قرمزِ اشباع بود و کنارِ هیروِ سیاه‌وسفید مثلِ
 * تکه‌ای از یک سایتِ دیگر می‌خواند. نام‌های متغیر عمداً همان ماندند
 * (`orange`، `red`، …) چون *نقش*شان همان است — روشن‌ترین سطح،
 * سطحِ میانی، تاریک‌ترین — و فقط مقدارشان عوض شده. با این کار هیچ
 * کدام از ده‌ها ارجاعِ پایین‌ترِ فایل دست نخورد.
 *
 * تفکیک حالا از *روشنایی* می‌آید نه از فام، پس فاصلهٔ پله‌ها باید
 * بیشتر باشد: دو خاکستریِ نزدیک به هم، روی کاغذ یک لکه می‌شوند.
 */
/*
 * گوشه‌های گرد از این تصویرها هم برداشته شد.
 *
 * لبهٔ تیز، زبانِ همان پیکرهٔ فلزیِ هیرو است؛ گوشهٔ گرد فوراً به
 * «اپِ موبایل» می‌زند. حذفِ `rx` روی همهٔ مستطیل‌ها انجام شد، نه
 * انتخابی — گوشهٔ گردِ باقی‌مانده در یک ترکیبِ تیز، اشتباه دیده
 * می‌شود نه لهجه.
 */
const C = {
  orange: "#bdb6ab",
  orangeDeep: "#8e8880",
  red: "#5c5852",
  crimson: "#3a3733",
  cream: "#f4efe4",
  creamDeep: "#ddd2c0",
  ink: "#33302b",
  screen: "#2a2825",
  glow: "#e8e2d6",
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 280"
      className="h-full w-full"
      role="img"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      {children}
    </svg>
  );
}

/**
 * مرحلهٔ یک — فهمیدن.
 *
 * خودِ سرِ ربات، از روبه‌رو. مکان‌نمای چشمک‌زن تنها چیزِ روی صفحه
 * است: این مرحله دربارهٔ *قبل از* ساختن است، جایی که هنوز چیزی نوشته
 * نشده.
 */
export function StageOne() {
  return (
    <Frame>
      {/* آنتن */}
      <path d="M150 62 L163 22" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
      <circle cx="163" cy="20" r="5" fill={C.ink} />
      <rect x="140" y="58" width="18" height="12" fill={C.ink} />

      {/* دیسکِ کرمِ بام */}
      <ellipse cx="96" cy="66" ry="13" fill={C.creamDeep} />
      <ellipse cx="96" cy="63" ry="13" fill={C.cream} />

      {/* بدنه — تکهٔ تیره‌تر پشتِ آن، همان سایهٔ لایه‌ای */}
      <rect x="34" y="66" width="132" height="118" fill={C.orangeDeep} />
      <rect x="30" y="63" width="128" height="115" fill={C.orange} />

      {/* قابِ کرم، بعد قابِ قرمز، بعد لامپ */}
      <rect x="38" y="71" width="106" height="86" fill={C.cream} />
      <rect x="44" y="76" width="102" height="82" fill={C.red} />
      <rect x="50" y="82" width="90" height="70" fill={C.crimson} />
      <rect x="55" y="86" width="80" height="62" fill={C.screen} />

      {/* خطِ فرمان و مکان‌نما */}
      <rect x="63" y="104" width="34" height="4" fill={C.glow} opacity="0.8" />
      <rect x="63" y="116" width="22" height="4" fill={C.glow} opacity="0.45" />
      <rect x="63" y="128" width="8" height="9" fill={C.glow}>
        <animate attributeName="opacity" values="1;1;0;0" dur="1.1s" repeatCount="indefinite" />
      </rect>

      {/* بلندگوی پهلو */}
      <circle cx="152" cy="120" r="13" fill={C.crimson} />
      <circle cx="150" cy="118" r="8" fill={C.red} />

      {/* دکمه‌ها */}
      <circle cx="48" cy="168" r="4" fill={C.ink} opacity="0.55" />
      <circle cx="60" cy="168" r="4" fill={C.ink} opacity="0.55" />
      <circle cx="72" cy="168" r="4" fill={C.ink} opacity="0.55" />

      {/* گردن و صفحه‌کلید */}
      <rect x="70" y="178" width="52" height="9" fill={C.orangeDeep} />
      <rect x="80" y="186" width="32" height="14" fill={C.orange} />
      <rect x="36" y="200" width="128" height="26" fill={C.creamDeep} />
      <rect x="34" y="197" width="128" height="24" fill={C.cream} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={43 + i * 16} y={203} width="11" height="11" fill={C.creamDeep} />
      ))}
      <rect x="43" y="203" width="11" height="11" fill={C.ink} opacity="0.6" />
    </Frame>
  );
}

/**
 * مرحلهٔ دو — ساختن.
 *
 * حلقه. یک هستهٔ نارنجی و سه ابزار که دورش می‌گردند، با پیکانی که
 * مسیر را می‌بندد. این مرحله دربارهٔ ایجنت است، و ایجنت یعنی چیزی
 * که *دور خودش می‌چرخد* تا کار تمام شود.
 */
export function StageTwo() {
  const nodes = [
    { x: 100, y: 44 },
    { x: 158, y: 152 },
    { x: 42, y: 152 },
  ];
  return (
    <Frame>
      {/* مدارِ حلقه */}
      <circle
        cx="100"
        cy="122"
        r="66"
        fill="none"
        stroke={C.creamDeep}
        strokeWidth="3"
        strokeDasharray="7 9"
      />

      {/* پیکانِ جهت — حلقه یک‌طرفه است */}
      <path
        d="M158 92 A66 66 0 0 1 166 132"
        fill="none"
        stroke={C.orangeDeep}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M160 128 L168 138 L172 126 Z" fill={C.orangeDeep} />

      {/* هسته */}
      <rect x="66" y="92" width="70" height="62" fill={C.orangeDeep} />
      <rect x="62" y="88" width="70" height="62" fill={C.orange} />
      <rect x="72" y="98" width="50" height="34" fill={C.crimson} />
      <rect x="77" y="102" width="40" height="26" fill={C.screen} />
      <rect x="83" y="112" width="20" height="4" fill={C.glow} opacity="0.75" />
      <circle cx="97" cy="140" r="4" fill={C.cream} />

      {/* سه ابزارِ دورِ حلقه — هرکدام یک کلید */}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x - 19} y={n.y - 15} width="38" height="34" fill={C.creamDeep} />
          <rect x={n.x - 21} y={n.y - 18} width="38" height="34" fill={C.cream} />
          <rect
            x={n.x - 13}
            y={n.y - 10}
            width="22"
            height="18"
           
            fill={i === 0 ? C.red : C.orange}
            opacity={i === 0 ? 1 : 0.35}
          />
        </g>
      ))}

      {/* سیمِ فنری — امضای ربات */}
      <path
        d="M56 214 q9 -13 18 0 t18 0 t18 0 t18 0 t18 0"
        fill="none"
        stroke={C.creamDeep}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M56 211 q9 -13 18 0 t18 0 t18 0 t18 0 t18 0"
        fill="none"
        stroke={C.cream}
        strokeWidth="9"
        strokeLinecap="round"
      />
    </Frame>
  );
}

/**
 * مرحلهٔ سه — رساندن.
 *
 * یک پنجرهٔ مرورگر با نشانی، و پیکانی که از آن بیرون می‌زند. تفاوتِ
 * این مرحله با دو تای قبل همین بیرون‌زدن است: کار از فایل درمی‌آید و
 * جایی می‌رود که آدرس دارد.
 */
export function StageThree() {
  return (
    <Frame>
      {/* پنجره */}
      <rect x="26" y="52" width="152" height="126" fill={C.orangeDeep} />
      <rect x="22" y="48" width="152" height="126" fill={C.cream} />

      {/* نوارِ عنوان با نشانی */}
      <rect x="22" y="48" width="152" height="26" fill={C.orange} />
      <rect x="22" y="66" width="152" height="8" fill={C.orange} />
      <circle cx="36" cy="61" r="4" fill={C.crimson} />
      <circle cx="49" cy="61" r="4" fill={C.cream} opacity="0.75" />
      <circle cx="62" cy="61" r="4" fill={C.cream} opacity="0.45" />
      <rect x="78" y="56" width="82" height="10" fill={C.cream} opacity="0.85" />

      {/* محتوای صفحه — همان چیزی که ساخته‌ای */}
      <rect x="34" y="86" width="60" height="40" fill={C.red} />
      <rect x="102" y="86" width="60" height="18" fill={C.creamDeep} />
      <rect x="102" y="110" width="42" height="16" fill={C.creamDeep} />
      <rect x="34" y="136" width="128" height="8" fill={C.creamDeep} />
      <rect x="34" y="150" width="88" height="8" fill={C.creamDeep} />

      {/* پیکانِ انتشار — تنها چیزی که از قابِ پنجره بیرون می‌زند */}
      <g>
        <path d="M132 168 L186 140 L170 196 L158 172 Z" fill={C.crimson} />
        <path d="M128 164 L182 136 L166 192 L154 168 Z" fill={C.red} />
      </g>

      {/* مکان‌نمای موشواره */}
      <path d="M74 178 L74 206 L82 199 L88 212 L94 209 L88 196 L98 195 Z" fill={C.ink} />

      {/* پایه */}
      <rect x="64" y="228" width="72" height="10" fill={C.creamDeep} />
      <rect x="86" y="216" width="28" height="14" fill={C.orange} />
    </Frame>
  );
}

export const STAGE_ART = [StageOne, StageTwo, StageThree] as const;
