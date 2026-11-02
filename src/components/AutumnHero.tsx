import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { HOME } from "@/lib/i18n/dict/home";
import type { Lang } from "@/lib/i18n";

/**
 * هیروی پاییزی: قطار بخاری که از دل جنگل پاییزی و از روی پل سنگی رد می‌شه.
 * الهام از یک نقاشی گواش: نارنجیِ زنگاری و هلویی، کاج‌های سبزآبیِ تیره،
 * مهِ فیروزه‌ای توی دره و ستونِ بزرگِ بخارِ کرم.
 *
 * تصویر با SVG ساخته شده و لبه‌ها با فیلتر turbulence زبر شدن تا حسِ قلم‌مو
 * بده. صحنه پنج لایهٔ SVG روی هم با viewBox یکسانه:
 *   ۱. جنگل دور و میانه، دره و رود (ثابت، با فیلتر)
 *   ۲. مه (متحرک، بدون فیلتر)
 *   ۳. خاکریز، پل سنگی و ریل (ثابت، با فیلتر)
 *   ۴. قطار و بخار (متحرک، بدون فیلتر)
 *   ۵. درخت‌های جلو که قطار از پشتشون رد می‌شه (ثابت، با فیلتر)
 * لایه‌های فیلتردار هیچ‌چیزِ متحرکی ندارن، پس فیلترِ گرون فقط یک بار رنگ
 * می‌خوره و حرکت روی موبایل روون می‌مونه.
 *
 * قطار راست‌به‌چپ می‌ره چون «جلو» توی خط فارسی سمت چپه. بخار توی فضای
 * صحنه می‌مونه (حرکت قطار رو خنثی می‌کنه) و پشت قطار ستون می‌شه.
 *
 * با Reduce Motion هیچ‌چیز پنهان نمی‌شه: قطار روی پل پارک می‌کنه، بخار در
 * یک لحظهٔ ثابت می‌مونه و برگ‌ها توی هوا می‌ایستن. قاعده‌ها در globals.css
 * زیر «ah-».
 */

const VB = "0 0 1600 700";

const P = {
  // جنگل دور (مه‌گرفته)
  hazeA: "#e9c6a8",
  hazeB: "#dfb393",
  hazeTeal: "#adc1b9",
  // جنگل میانه
  rust: "#c46a3e",
  orange: "#d9874f",
  peach: "#e9ad7e",
  deep: "#a8502e",
  spruce: "#2f4f48",
  spruce2: "#3f625a",
  // جلو
  front1: "#9c4a2a",
  front2: "#b85c33",
  frontHi: "#e39a63",
  darkSpruce: "#1e3631",
  trunk: "#4a2e22",
  // آب و مه
  mist: "#a9c3bb",
  stream: "#8fb0a7",
  ravine: "#3e5a52",
  // پل و قطار
  stone: "#b98b6a",
  stoneDk: "#8c6248",
  loco: "#221c19",
  loco2: "#2f2622",
  copper: "#b5713f",
  lamp: "#f6d8a8",
  carriage: "#3a2e2a",
  roof: "#8e4a2e",
  steam: "#fbf4ea",
};

// ── PRNG ثابت: درخت‌ها هر بار دقیقاً همون‌جا کشیده می‌شن ──
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** تاج پهن‌برگ: خوشه‌ای از لکه‌ها، روشن بالا‌چپ و تیره پایین‌راست */
function deciduous(
  rand: () => number,
  x: number,
  y: number,
  s: number,
  tones: [string, string, string],
  blobs: number,
  key: string,
) {
  const [base, dark, light] = tones;
  const h = 70 * s;
  const w = 42 * s;
  const els: React.ReactNode[] = [
    <path
      key={`${key}t`}
      d={`M${r1(x - 3 * s)} ${y} L${r1(x - 1.5 * s)} ${r1(y - h * 0.75)} L${r1(x + 1.5 * s)} ${r1(y - h * 0.75)} L${r1(x + 3 * s)} ${y}Z
          M${x} ${r1(y - h * 0.45)} L${r1(x - 14 * s)} ${r1(y - h * 0.72)} M${x} ${r1(y - h * 0.5)} L${r1(x + 12 * s)} ${r1(y - h * 0.8)}`}
      fill={P.trunk}
      stroke={P.trunk}
      strokeWidth={r1(1.6 * s)}
    />,
  ];
  for (let i = 0; i < blobs; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand());
    const bx = x + Math.cos(a) * w * d;
    const by = y - h + Math.sin(a) * h * 0.42 * d;
    const rr = (10 + rand() * 12) * s;
    const lit = Math.cos(a) * -1 + Math.sin(a) * -1; // بالا‌چپ مثبت
    const fill = lit > 0.7 ? light : lit < -0.6 ? dark : base;
    els.push(<circle key={`${key}b${i}`} cx={r1(bx)} cy={r1(by)} r={r1(rr)} fill={fill} />);
  }
  return els;
}

/** کاج: طبقه‌های دندانه‌دار روی هم */
function conifer(rand: () => number, x: number, y: number, s: number, color: string, shade: string, key: string) {
  const tiers = 6;
  const h = 150 * s;
  const els: React.ReactNode[] = [];
  for (let i = 0; i < tiers; i++) {
    const top = y - h + (i * h) / (tiers + 0.6);
    const bot = top + h / tiers + 18 * s;
    const half = (10 + i * 7) * s * (0.9 + rand() * 0.2);
    els.push(
      <path
        key={`${key}c${i}`}
        d={`M${r1(x)} ${r1(top)} L${r1(x - half)} ${r1(bot)} L${r1(x - half * 0.4)} ${r1(bot - 4 * s)} L${r1(x)} ${r1(bot + 2 * s)} L${r1(x + half * 0.5)} ${r1(bot - 3 * s)} L${r1(x + half)} ${r1(bot)}Z`}
        fill={i % 2 ? shade : color}
      />,
    );
  }
  els.push(<rect key={`${key}k`} x={r1(x - 2 * s)} y={r1(y - 10 * s)} width={r1(4 * s)} height={r1(12 * s)} fill={P.trunk} />);
  return els;
}

/** یک ردیف جنگل بین دو مرز افقی */
function forestRow(
  seed: number,
  from: number,
  to: number,
  step: number,
  baseY: number,
  jitterY: number,
  scale: [number, number],
  deciduousTones: [string, string, string][],
  coniferTones: [string, string],
  coniferEvery: number,
  blobs: number,
  key: string,
) {
  const rand = rng(seed);
  const els: React.ReactNode[] = [];
  let i = 0;
  for (let x = from; x <= to; x += step * (0.7 + rand() * 0.6)) {
    const y = baseY + rand() * jitterY;
    const s = scale[0] + rand() * (scale[1] - scale[0]);
    if (i % coniferEvery === coniferEvery - 1) {
      els.push(...conifer(rand, x, y, s * 0.95, coniferTones[0], coniferTones[1], `${key}${i}`));
    } else {
      const tones = deciduousTones[Math.floor(rand() * deciduousTones.length)];
      els.push(...deciduous(rand, x, y, s, tones, blobs, `${key}${i}`));
    }
    i++;
  }
  return els;
}

// همهٔ لایه‌های ثابت یک بار در سطح ماژول ساخته می‌شن
const FAR = forestRow(11, -20, 1640, 46, 405, 22, [0.55, 0.72],
  [[P.hazeA, P.hazeB, "#f1d6bd"], [P.hazeB, "#d29f80", P.hazeA]],
  [P.hazeTeal, "#9bb2aa"], 4, 7, "f");

const MID = forestRow(29, -30, 1650, 52, 462, 14, [0.82, 1.05],
  [[P.rust, P.deep, P.peach], [P.orange, P.rust, P.peach], [P.peach, P.orange, "#f1c49c"]],
  [P.spruce, P.spruce2], 3, 11, "m");

// درخت‌های جلو، کنارِ قاب و جلوی پایه‌های پل
const FRONT = (() => {
  const rand = rng(53);
  const big: [string, string, string] = [P.front2, P.front1, P.frontHi];
  const alt: [string, string, string] = [P.rust, P.front1, P.peach];
  return [
    ...conifer(rand, 70, 720, 3.6, P.darkSpruce, "#2a463f", "c0"),
    ...deciduous(rand, 210, 730, 2.6, big, 34, "d0"),
    ...deciduous(rand, 420, 760, 2.1, alt, 28, "d1"),
    ...deciduous(rand, 1120, 760, 2.0, big, 26, "d2"),
    ...deciduous(rand, 1330, 735, 2.4, alt, 30, "d3"),
    ...conifer(rand, 1545, 720, 2.4, P.darkSpruce, "#2a463f", "c1"),
  ];
})();

// برگ‌های در حال افتادن: [left٪, top٪ ساکن, مدت, تأخیر, رنگ, اندازه]
const LEAVES: [number, number, number, number, string, number][] = [
  [4, 30, 13, 0, P.rust, 14], [12, 58, 16, 4, P.peach, 11], [19, 22, 11, 8, P.orange, 13],
  [27, 46, 15, 2, P.deep, 10], [35, 68, 12, 6, P.frontHi, 12], [43, 34, 17, 10, P.rust, 15],
  [51, 54, 14, 1, P.peach, 11], [58, 26, 12, 7, P.orange, 13], [66, 62, 16, 3, P.deep, 10],
  [73, 40, 13, 9, P.frontHi, 12], [81, 20, 15, 5, P.rust, 14], [88, 50, 11, 11, P.peach, 11],
  [95, 36, 14, 2.5, P.orange, 13], [47, 12, 18, 12, P.frontHi, 10],
];

// ── قطار ──
// سرعت باید با جبرانِ بخار یکی باشه: TRAIN_RUN واحد در TRAIN_S ثانیه
export const TRAIN_FROM = 1750;
export const TRAIN_TO = -800;
const TRAIN_S = 30;
const SPEED = (TRAIN_FROM - TRAIN_TO) / TRAIN_S; // واحد بر ثانیه
const PUFF_LIFE = 6.5;
const PUFFS = 24;

function Wheel({ cx, r }: { cx: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={-r} r={r} fill={P.loco2} stroke={P.copper} strokeWidth={1.4} />
      <g className="ah-wheel">
        <path d={`M${cx - r + 2} ${-r}H${cx + r - 2}M${cx} ${-2 * r + 2}V-2`} stroke={P.copper} strokeWidth={1.2} />
      </g>
      <circle cx={cx} cy={-r} r={r * 0.25} fill={P.copper} />
    </g>
  );
}

function Carriage({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <g className="ah-bob">
        <path d="M-3 -66 Q60 -82 123 -66 L123 -62 L-3 -62Z" fill={P.roof} />
        <rect x={0} y={-63} width={120} height={46} rx={5} fill={P.carriage} />
        {[10, 34, 58, 82].map((wx) => (
          <rect key={wx} x={wx} y={-55} width={16} height={16} rx={2} fill="#d9b48a" opacity={0.85} />
        ))}
        <rect x={0} y={-33} width={120} height={2} fill={P.copper} opacity={0.7} />
        <rect x={2} y={-19} width={116} height={5} rx={2} fill={P.loco} />
      </g>
      <Wheel cx={22} r={8} />
      <Wheel cx={98} r={8} />
      <rect x={-9} y={-22} width={9} height={4} fill={P.loco} />
    </g>
  );
}

function Train() {
  return (
    <g>
      {/* بخار: هر پُف از دودکش بلند می‌شه و با سرعت قطار به راست می‌ره تا
          سر جاش توی صحنه بمونه؛ نتیجه یک ستونِ بخار پشت قطاره */}
      <g>
        {Array.from({ length: PUFFS }, (_, i) => (
          <circle
            key={i}
            className="ah-steam"
            cx={30}
            cy={-112}
            r={22 + (i % 4) * 6}
            fill="url(#ah-puff)"
            style={
              {
                animationDelay: `${-(i * PUFF_LIFE) / PUFFS}s`,
                "--p": (i / PUFFS).toFixed(2),
              } as React.CSSProperties
            }
          />
        ))}
      </g>

      <g className="ah-bob">
        {/* دودکشِ دهانه‌گشاد */}
        <path d="M22 -78 L36 -78 L44 -110 L14 -110Z" fill={P.loco} />
        <rect x={12} y={-114} width={34} height={6} rx={2} fill={P.loco2} />
        {/* دیگ بخار، گنبد، کابین */}
        <rect x={8} y={-76} width={100} height={46} rx={20} fill={P.loco} />
        <rect x={60} y={-90} width={18} height={18} rx={9} fill={P.copper} />
        <rect x={102} y={-100} width={52} height={82} rx={4} fill={P.loco2} />
        <path d="M96 -104 Q128 -114 160 -104 L160 -98 L96 -98Z" fill={P.loco} />
        <rect x={112} y={-90} width={30} height={22} rx={3} fill={P.lamp} opacity={0.9} />
        {/* چراغ جلو و حلقهٔ مسی */}
        <circle cx={6} cy={-60} r={10} fill={P.copper} />
        <circle cx={6} cy={-60} r={6.5} fill={P.lamp} />
        <rect x={4} y={-24} width={154} height={8} rx={2} fill={P.loco} />
        <path d="M6 -22 L-14 -2 L8 -2Z" fill={P.loco2} />
      </g>
      <Wheel cx={32} r={11} />
      <Wheel cx={66} r={13} />
      <Wheel cx={100} r={13} />
      <rect className="ah-rod" x={64} y={-15} width={40} height={3} rx={1.5} fill={P.copper} />
      <Wheel cx={138} r={9} />

      <Carriage x={172} />
      <Carriage x={304} />
    </g>
  );
}

/** فیلتر لبهٔ قلم‌مویی؛ هر SVG شناسهٔ خودش رو داره */
function Rough({ id, scale = 9, freq = 0.04 }: { id: string; scale?: number; freq?: number }) {
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={2} seed={7} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale={scale} xChannelSelector="R" yChannelSelector="G" />
    </filter>
  );
}

const layer = "absolute inset-0 w-full h-full";

function Scene() {
  return (
    <>
      {/* ۱ — جنگل دور و میانه، دره و رود */}
      <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className={layer} aria-hidden>
        <defs>
          <Rough id="ah-r1" />
          <linearGradient id="ah-ravine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={P.ravine} />
            <stop offset="0.75" stopColor="#6f9189" />
            <stop offset="1" stopColor={P.stream} />
          </linearGradient>
        </defs>
        <g filter="url(#ah-r1)">
          {FAR}
          {/* نوار مه بین دور و میانه، مثل عمقِ هوای نقاشی */}
          <rect x={-20} y={392} width={1640} height={40} fill="#f2e4d4" opacity={0.5} />
          {MID}
          {/* دره زیر پل */}
          <path d="M500 470 C570 540 630 620 680 700 L920 700 C970 620 1030 540 1090 470Z" fill="url(#ah-ravine)" />
          {/* رودِ ته دره */}
          <path d="M640 700 C700 668 760 690 800 672 S880 682 960 700Z" fill="#a9c7bf" opacity={0.9} />
        </g>
      </svg>

      {/* ۲ — مه فیروزه‌ای که آروم توی دره و روی جنگل جابه‌جا می‌شه */}
      <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className={layer} aria-hidden>
        <defs>
          <radialGradient id="ah-mist">
            <stop offset="0" stopColor={P.mist} stopOpacity={0.75} />
            <stop offset="1" stopColor={P.mist} stopOpacity={0} />
          </radialGradient>
          <radialGradient id="ah-mist2">
            <stop offset="0" stopColor="#f6ece0" stopOpacity={0.7} />
            <stop offset="1" stopColor="#f6ece0" stopOpacity={0} />
          </radialGradient>
        </defs>
        <ellipse className="ah-mist" cx={790} cy={640} rx={260} ry={70} fill="url(#ah-mist)" />
        <ellipse className="ah-mist ah-mist--slow" cx={300} cy={420} rx={380} ry={60} fill="url(#ah-mist2)" />
        <ellipse className="ah-mist" cx={1300} cy={400} rx={340} ry={55} fill="url(#ah-mist2)" style={{ animationDelay: "-9s" }} />
      </svg>

      {/* ۳ — خاکریز، پل سنگیِ قوسی و ریل */}
      <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className={layer} aria-hidden>
        <defs>
          <Rough id="ah-r3" scale={5} freq={0.06} />
        </defs>
        <g filter="url(#ah-r3)">
          {/* خاکریزِ علف‌خشک دو طرف دره */}
          <path d="M-20 474 H560 C540 560 505 640 470 700 H-20Z" fill="#b87447" />
          <path d="M1030 474 H1620 V700 H1120 C1085 640 1050 560 1030 474Z" fill="#b87447" />
          {/* پل */}
          {/* عرشه و دو پایه؛ زیر عرشه دو طرفِ پایه‌ها دره دیده می‌شه */}
          <path d="M540 466 H1050 V494 C1010 496 975 502 945 512 V700 H895 V610 A105 105 0 0 0 685 610 V700 H635 V512 C605 502 570 496 540 494Z" fill={P.stone} />
          <path d="M685 610 A105 105 0 0 1 895 610" fill="none" stroke={P.stoneDk} strokeWidth={14} />
          {/* سایهٔ نرمِ زیرِ قوس؛ از پایینش رود دیده می‌شه */}
          <path d="M690 612 A100 100 0 0 1 890 612" fill="none" stroke="#2e3f3a" strokeWidth={16} opacity={0.45} />
          {/* درزهای سنگ */}
          {Array.from({ length: 9 }, (_, i) => {
            const a = Math.PI + (i + 0.5) * (Math.PI / 9);
            return (
              <path
                key={i}
                d={`M${r1(790 + Math.cos(a) * 98)} ${r1(610 + Math.sin(a) * 98)} L${r1(790 + Math.cos(a) * 118)} ${r1(610 + Math.sin(a) * 118)}`}
                stroke={P.stoneDk}
                strokeWidth={2}
              />
            );
          })}
          {[
            [640, 540, 682, 540], [898, 545, 940, 545], [640, 600, 680, 600], [900, 605, 940, 605],
            [640, 660, 684, 660], [897, 665, 940, 665],
          ].map(([x1, y1, x2], i) => (
            <path key={i} d={`M${x1} ${y1} H${x2}`} stroke={P.stoneDk} strokeWidth={1.6} opacity={0.6} />
          ))}
          <rect x={540} y={474} width={510} height={10} fill={P.stoneDk} />
          {/* علف‌های خشکِ آویزون روی لبهٔ پل */}
          {Array.from({ length: 23 }, (_, i) => (
            <circle key={i} cx={548 + i * 22} cy={490 + (i % 3) * 4} r={9 + (i % 4) * 2} fill={i % 2 ? P.rust : P.orange} />
          ))}
          {/* ریل */}
          <rect x={-20} y={466} width={1640} height={8} fill="#7a4a2c" />
          {Array.from({ length: 92 }, (_, i) => (
            <rect key={i} x={i * 18 - 10} y={466} width={8} height={8} fill="#5d3622" />
          ))}
          <rect x={-20} y={464} width={1640} height={3} fill="#3a2a22" />
        </g>
      </svg>

      {/* ۴ — قطار و بخار. overflow آزاده چون ستونِ بخار از بالای صحنه
          بیرون می‌زنه و توی آسمونِ هیرو ادامه پیدا می‌کنه */}
      <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className={layer} style={{ overflow: "visible" }} aria-hidden>
        <defs>
          <radialGradient id="ah-puff">
            <stop offset="0" stopColor={P.steam} stopOpacity={1} />
            <stop offset="0.65" stopColor={P.steam} stopOpacity={0.97} />
            <stop offset="1" stopColor={P.steam} stopOpacity={0} />
          </radialGradient>
        </defs>
        <g
          className="ah-train"
          style={
            {
              "--ah-from": `${TRAIN_FROM}px`,
              "--ah-to": `${TRAIN_TO}px`,
              "--ah-dur": `${TRAIN_S}s`,
              "--ah-comp": `${Math.round(SPEED * PUFF_LIFE)}px`,
              "--ah-life": `${PUFF_LIFE}s`,
            } as React.CSSProperties
          }
        >
          <g transform="translate(0 466)">
            <Train />
          </g>
        </g>
      </svg>

      {/* ۵ — درخت‌های جلو */}
      <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className={layer} aria-hidden>
        <defs>
          <Rough id="ah-r5" scale={11} freq={0.03} />
        </defs>
        <g filter="url(#ah-r5)">{FRONT}</g>
      </svg>

    </>
  );
}

function Leaf({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2C6.5 6.5 4 10.5 5 15.2 5.7 18.6 8.4 21 12 21s6.3-2.4 7-5.8C20 10.5 17.5 6.5 12 2Z" fill={color} />
      <path d="M12 6.5V23" stroke="rgb(0 0 0 / 0.3)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function AutumnHero({ lang }: { lang: Lang }) {
  const t = HOME[lang];
  const rtl = lang === "fa";
  const Forward = rtl ? ArrowLeft : ArrowRight;
  const Next = rtl ? ChevronLeft : ChevronRight;

  return (
    <section
      className="relative overflow-hidden flex flex-col pt-[var(--nav-h)] lg:min-h-[clamp(660px,94vh,920px)]"
      style={{
        background: "linear-gradient(180deg, #f8f1e7 0%, #f5e7d6 40%, #efd5bb 70%, #e9c6a6 100%)",
      }}
    >
      {/* هالهٔ کرمِ نرم پشت متن، تا جاهایی که نوک درخت‌ها تا زیر متن می‌رسه
          متن خوانا بمونه؛ سمتِ شروعِ خط (فارسی راست، انگلیسی چپ) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 60% at ${rtl ? "82%" : "18%"} 32%, rgb(248 241 231 / 0.92) 0%, rgb(248 241 231 / 0.6) 45%, transparent 75%)`,
        }}
      />

      {/* برگ‌های در حال افتادن، روی کل هیرو */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {LEAVES.map(([left, top, dur, delay, color, size], i) => (
          <span
            key={i}
            className="ah-leaf absolute"
            style={
              {
                left: `${left}%`,
                "--ah-rest": `${top}%`,
                animationDuration: `${dur}s`,
                animationDelay: `${-delay}s`,
              } as React.CSSProperties
            }
          >
            <span className="ah-flutter inline-block" style={{ animationDuration: `${2.4 + (i % 4) * 0.5}s` }}>
              <Leaf color={color} size={size} />
            </span>
          </span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-10 lg:pt-14">
        <div className="max-w-xl 2xl:max-w-2xl">
          <div
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#e8e2d9] rounded-full px-4 py-1.5 mb-7 fade-in-up"
            style={{ animationDelay: "0ms" }}
          >
            <div className="w-2 h-2 rounded-full bg-[#c46a3e] pulse-dot" />
            <span className="font-body text-xs text-[#6b6560]">{t.hero.badge}</span>
          </div>

          <h1
            className="font-body font-extrabold text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.45] text-[#1a1714] mb-6 fade-in-up"
            style={{ animationDelay: "80ms" }}
          >
            {t.hero.title}
          </h1>

          <p
            className="text-[#5c544d] font-body text-lg leading-relaxed mb-9 max-w-lg fade-in-up"
            style={{ animationDelay: "160ms" }}
          >
            {t.hero.body}
          </p>

          <div className="flex items-center gap-4 flex-wrap fade-in-up" style={{ animationDelay: "240ms" }}>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-[#1a1714] hover:bg-[#2d2926] text-white font-body font-semibold px-7 py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.hero.primary}
              <Forward size={16} />
            </Link>
            <Link
              href="/checklist"
              className="inline-flex items-center gap-2 text-[#5c544d] hover:text-[#1a1714] font-body text-sm transition-colors border border-[#e8e2d9] hover:border-[#1a1714]/20 px-5 py-3.5 rounded-2xl bg-white/85 hover:bg-white"
            >
              {t.hero.secondary}
              <Next size={15} />
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-8 fade-in-up" style={{ animationDelay: "320ms" }}>
            <div className="flex -space-x-2 space-x-reverse">
              {t.hero.avatars.map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-[#e8e2d9] border-2 border-[#f5e7d6] flex items-center justify-center text-[10px] font-body text-[#6b6560]"
                >
                  {c}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 mb-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={11} className="text-amber-400" fill="#fbbf24" />
                ))}
              </div>
              <span className="text-[#7a7068] text-xs font-body">{t.hero.proof}</span>
            </div>
          </div>
        </div>
      </div>
      {/* صحنه. روی موبایل بعد از متن و توی جریان صفحه میاد، چون متن بلنده و
          اگه زیرش می‌نشست دکمه‌ها روی پل می‌افتادن؛ از lg به بعد پس‌زمینهٔ
          نیمهٔ پایینِ هیروئه */}
      <div className="relative h-[300px] sm:h-[380px] -mt-12 lg:mt-0 lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-[clamp(300px,54%,560px)] pointer-events-none select-none">
        <Scene />
      </div>

      {/* دونهٔ کاغذ روی کل هیرو برای حسِ گواش. روی کل سکشنه تا لبه‌ای وسط
          آسمون نسازه؛ ثابته و لایهٔ خودش رو داره تا با حرکت قطار رنگ نخوره */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: "multiply", opacity: 0.14, willChange: "transform" }}
        aria-hidden
      >
        <filter id="ah-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={4} stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.22  0 0 0 0 0.15  0 0 0 1.2 -0.2" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ah-grain)" />
      </svg>
    </section>
  );
}
