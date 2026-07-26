"use client";

import Image from "next/image";
import BrandMark from "@/components/BrandMark";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  Frame as FrameIcon,
  Hand,
  MousePointer2,
  PenTool,
  Sparkles,
  Square as SquareIcon,
  Star,
  Type as TypeIcon,
} from "lucide-react";

/**
 * ویژوالِ هیرو: پنجره‌ی مرورگرِ زاویه‌دار که یک برشِ موربِ نورانی از راست به چپ
 * می‌ره و «وایرفریم» رو به «رابط نهایی» تبدیل می‌کنه.
 *
 * قاعده‌ی اصلیِ طراحی این قطعه: هر دو لایه **هندسه‌ی یکسان** دارن — همون هدر،
 * همون تیتر، همون کارت، همون شبکه. فقط سطحِ کیفیت عوض می‌شه. اگر چیدمانِ دو
 * طرف فرق کنه، برش به‌جای «تکاملِ یک صفحه»، مثل جابه‌جاییِ دو صفحه‌ی بی‌ربط
 * دیده می‌شه و کلِ پیام از بین می‌ره.
 *
 * سمتِ وایرفریم مفاهیمِ تجربه‌ی کاربری روش پین‌گذاری شده (همون کاری که سرِ
 * کلاس روی وایرفریم انجام می‌شه)؛ سمتِ رابط نهایی عمداً بدون لیبله تا شلوغ نشه.
 *
 * استیجِ ثابتِ ۱۱۸۰×۶۶۰ با scale کوچک می‌شه. پنجره وسطِ استیج نشسته و دورش
 * حاشیه داره تا چرخشِ سه‌بعدی از قاب بیرون نزنه (مشکلِ بریده‌شدنِ لبه‌ی بالا).
 */

/** استیج عمداً از پنجره پهن‌تر و بلندتره: حاشیه‌ی کناری جای کارت‌های شناور و
    نشانگرهاست، و فضای پایین جای سایه — سایه ۱۳۰ پیکسل زیرِ پنجره ادامه داره و
    اگر استیج فقط به قدِ پنجره باشه لبه‌ش بریده می‌شه. */
const STAGE_W = 1420;
const STAGE_H = 790;
const WIN_W = 1000;
const WIN_H = 520;
const WIN_X = (STAGE_W - WIN_W) / 2;
const WIN_Y = 56;

/** انحرافِ افقیِ خطِ برش (درصد) — از بالا به پایین به چپ متمایل می‌شه */
const LEAN = 6;
const CYCLE = 12;
const TIMES = [0, 0.1, 0.45, 0.62, 1];

/** ناحیه‌ی چپِ خطِ مورب = رابطِ نهایی */
const clipAt = (p: number) =>
  `polygon(0% 0%, ${p + LEAN}% 0%, ${p - LEAN}% 100%, 0% 100%)`;

const CLIP_KEYS = [clipAt(-1), clipAt(-1), clipAt(101), clipAt(101), clipAt(-1)];
const BEAM_KEYS = ["-1%", "-1%", "101%", "101%", "-1%"];
const WIRE_FADE = [1, 1, 0, 0, 1];
const UI_FADE = [0, 0, 1, 1, 0];

const timeline = (reduce: boolean | null, delay = 0) =>
  reduce
    ? { duration: 0 }
    : {
        duration: CYCLE,
        times: TIMES,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay,
      };

/* ═══ اجزای وایرفریم ═══════════════════════════════════════════════════
   قراردادهای وایرفریم: همه‌چیز خطِ خاکستری روی کاغذِ مات، متن به‌صورت میله،
   تصویر به‌صورت کادرِ ضربدردار، و هیچ رنگِ برندی در کار نیست. */

const WIRE_LINE = "#b5ada0";
const WIRE_FILL = "#e5e0d7";

function Bar({ w, h = 10 }: { w: string | number; h?: number }) {
  return (
    <div
      className="rounded-[3px]"
      style={{ width: w, height: h, backgroundColor: WIRE_FILL }}
    />
  );
}

function WBox({
  className,
  style,
  children,
  cross,
}: {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  cross?: boolean;
}) {
  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{ border: `1px solid ${WIRE_LINE}`, ...style }}
    >
      {cross && (
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden>
          <line x1="0" y1="0" x2="100%" y2="100%" stroke={WIRE_LINE} strokeWidth="1" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke={WIRE_LINE} strokeWidth="1" />
        </svg>
      )}
      {children}
    </div>
  );
}

/** لایه‌ی وایرفریم — همون هندسه‌ی لایه‌ی رابط، فقط بدون کیفیتِ بصری */
function WireLayer() {
  return (
    <div
      className="absolute inset-0 px-[34px] py-[30px]"
      style={{ backgroundColor: "#f6f4f0" }}
      dir="rtl"
    >
      {/* هدر */}
      <div className="flex items-center gap-4 h-10 mb-[30px]">
        <span className="flex items-center gap-2">
          <WBox className="w-8 h-8 rounded-md" />
          <Bar w={104} h={11} />
        </span>
        <div className="flex items-center gap-5 mr-1">
          <Bar w={46} h={8} />
          <Bar w={46} h={8} />
          <Bar w={46} h={8} />
        </div>
        <WBox className="w-[92px] h-9 rounded-lg ms-auto flex items-center justify-center">
          <Bar w={44} h={8} />
        </WBox>
      </div>

      <div className="flex gap-[34px]">
        {/* ستونِ متن */}
        <div className="flex-1">
          <WBox className="w-[132px] h-[26px] rounded-full mb-4 flex items-center justify-center">
            <Bar w={72} h={7} />
          </WBox>

          {/* تیتر */}
          <div className="flex flex-col gap-[9px] mb-4">
            <Bar w="94%" h={20} />
            <Bar w="66%" h={20} />
          </div>

          {/* توضیح */}
          <div className="flex flex-col gap-[7px] mb-[26px]">
            <Bar w="88%" h={9} />
            <Bar w="80%" h={9} />
            <Bar w="46%" h={9} />
          </div>

          {/* دکمه‌ها */}
          <div className="flex items-center gap-3 mb-[22px]">
            <WBox className="w-[124px] h-[42px] rounded-xl flex items-center justify-center">
              <Bar w={62} h={9} />
            </WBox>
            <WBox className="w-[104px] h-[42px] rounded-xl flex items-center justify-center">
              <Bar w={52} h={9} />
            </WBox>
          </div>

          {/* اثبات اجتماعی */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 space-x-reverse">
              {[0, 1, 2, 3, 4].map((i) => (
                <WBox key={i} className="w-7 h-7 rounded-full bg-[#f6f4f0]" />
              ))}
            </div>
            <Bar w={110} h={8} />
          </div>
        </div>

        {/* کارتِ دوره */}
        <WBox className="w-[300px] rounded-xl p-3.5" style={{ height: 214 }}>
          <WBox className="w-full h-[104px] rounded-lg mb-3" cross />
          <Bar w="68%" h={11} />
          <div className="h-2.5" />
          <Bar w="50%" h={8} />
          <div className="flex items-center justify-between mt-3">
            <Bar w={70} h={12} />
            <WBox className="w-[64px] h-7 rounded-lg" />
          </div>
        </WBox>
      </div>

      {/* سه کارتِ پایین */}
      <div className="grid grid-cols-3 gap-3.5 mt-[26px]">
        {[0, 1, 2].map((i) => (
          <WBox key={i} className="rounded-xl p-3 flex items-center gap-2.5" style={{ height: 62 }}>
            <WBox className="w-8 h-8 rounded-lg shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Bar w="70%" h={8} />
              <Bar w="46%" h={7} />
            </div>
          </WBox>
        ))}
      </div>
    </div>
  );
}

/** لایه‌ی رابطِ نهایی — همون هندسه، با زبانِ طراحیِ خودِ سایت */
function UILayer() {
  return (
    <div className="absolute inset-0 px-[34px] py-[30px] bg-white" dir="rtl">
      {/* هدر — نشانِ واقعیِ برند */}
      <div className="flex items-center gap-4 h-10 mb-[30px]">
        <span className="flex items-center gap-2">
          <BrandMark size={32} rounded={10} />
          <span className="font-body font-bold text-[12.5px] text-[#1a1714] whitespace-nowrap">
            مدرسه دیزاین ملینا
          </span>
        </span>
        <div className="flex items-center gap-5 mr-1">
          <span className="font-body text-[12px] text-[#6b6560]">دوره‌ها</span>
          <span className="font-body text-[12px] text-[#6b6560]">نمونه‌کارها</span>
          <span className="font-body text-[12px] text-[#6b6560]">مقالات</span>
        </div>
        <span className="h-9 px-4 rounded-lg bg-[#1a1714] ms-auto flex items-center">
          <span className="font-body font-semibold text-[12px] text-white">شروع کن</span>
        </span>
      </div>

      <div className="flex gap-[34px]">
        {/* ستونِ متن */}
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 h-[26px] px-3 rounded-full bg-[#f3f0ff] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc]" />
            <span className="font-body text-[11px] text-[#7c5cfc]">دوره‌ی حضوریِ آنلاین</span>
          </span>

          <h3 className="font-body font-extrabold text-[27px] leading-[1.45] text-[#1a1714] mb-4">
            طراحیِ رابط کاربری، از وایرفریم تا محصولِ واقعی
          </h3>

          <p className="font-body text-[13px] leading-[2] text-[#6b6560] mb-[26px] max-w-[92%]">
            هر هفته یک تمرینِ واقعی می‌سازی و روی همان جلسه‌ی بعد فیدبک می‌گیری.
            خروجی‌ات یک نمونه‌کارِ قابلِ ارائه است، نه چند ویدیوی تماشاشده.
          </p>

          {/* دکمه‌ها */}
          <div className="flex items-center gap-3 mb-[22px]">
            <span className="h-[42px] px-5 rounded-xl bg-[#1a1714] flex items-center gap-2">
              <span className="font-body font-semibold text-[13px] text-white">
                ثبت‌نام دوره
              </span>
              <ArrowLeft size={14} className="text-white" />
            </span>
            <span className="h-[42px] px-4 rounded-xl border border-[#e8e2d9] flex items-center">
              <span className="font-body text-[13px] text-[#6b6560]">سرفصل‌ها</span>
            </span>
          </div>

          {/* اثبات اجتماعی */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 space-x-reverse">
              {["م", "ع", "س", "ف", "ن"].map((c) => (
                <span
                  key={c}
                  className="w-7 h-7 rounded-full bg-[#f0ebe3] border-2 border-white flex items-center justify-center font-body text-[9px] text-[#6b6560]"
                >
                  {c}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={10} className="text-amber-400" fill="#fbbf24" />
              ))}
            </span>
            <span className="font-body text-[11px] text-[#a09990]">
              ۴.۹ از نظر +۶٬۵۰۰ دانشجو
            </span>
          </div>
        </div>

        {/* کارتِ دوره */}
        <div
          className="w-[300px] rounded-xl p-3.5 bg-white border border-[#e8e2d9] shadow-[0_18px_40px_-22px_rgba(26,23,20,0.35)]"
          style={{ height: 214 }}
        >
          <div className="w-full h-[104px] rounded-lg mb-3 bg-[#FAF6F1] border border-[#f0ebe3] flex items-center justify-center overflow-hidden">
            <Image
              src="/images/ui_infinity.png"
              alt=""
              width={88}
              height={93}
              className="h-[86px] w-auto"
            />
          </div>
          <div className="font-body font-bold text-[13.5px] text-[#1a1714] mb-1">
            رابط کاربری بی‌نهایت
          </div>
          <div className="font-body text-[11px] text-[#a09990]">
            ۹۰ ساعت محتوا · منتورینگ هفتگی
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="font-body font-extrabold text-[14px] text-[#1a1714]">
              ۱۲٬۸۰۰٬۰۰۰
              <span className="font-body font-normal text-[10px] text-[#a09990]"> تومان</span>
            </div>
            <span className="h-7 px-3 rounded-lg bg-[#f3f0ff] flex items-center">
              <span className="font-body font-semibold text-[11px] text-[#7c5cfc]">
                مشاهده
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* سه کارتِ پایین */}
      <div className="grid grid-cols-3 gap-3.5 mt-[26px]">
        {[
          { t: "پروژه‌ی واقعی", s: "نه تمرینِ فرضی", c: "#7c5cfc", bg: "#f3f0ff" },
          { t: "فیدبک هفتگی", s: "روی کارِ خودت", c: "#e88a5c", bg: "#fff2ea" },
          { t: "گواهیِ معتبر", s: "با کد رهگیری", c: "#10b981", bg: "#eafaf3" },
        ].map((f) => (
          <div
            key={f.t}
            className="rounded-xl p-3 flex items-center gap-2.5 bg-[#FAF6F1] border border-[#f0ebe3]"
            style={{ height: 62 }}
          >
            <span
              className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
              style={{ backgroundColor: f.bg }}
            >
              <span className="w-3 h-3 rounded-[3px]" style={{ backgroundColor: f.c }} />
            </span>
            <div className="leading-tight">
              <div className="font-body font-semibold text-[12px] text-[#1a1714]">{f.t}</div>
              <div className="font-body text-[10px] text-[#a09990]">{f.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ پینِ مفهومِ تجربه‌ی کاربری روی وایرفریم ═══════════════════════════ */
function Pin({
  n,
  x,
  y,
  text,
  to,
  reduce,
  index,
}: {
  n: string;
  x: number;
  y: number;
  text: string;
  to: { dx: number; dy: number };
  reduce: boolean | null;
  index: number;
}) {
  return (
    <motion.div
      className="absolute hidden md:flex items-center gap-2"
      style={{ left: x, top: y, transform: "translateZ(46px)" }}
      initial={{ opacity: 0 }}
      animate={reduce ? { opacity: 0 } : { opacity: WIRE_FADE }}
      transition={timeline(reduce, index * 0.04)}
    >
      {/* خطِ راهنما به المانِ هدف */}
      <svg
        className="absolute overflow-visible pointer-events-none"
        style={{ left: to.dx >= 0 ? "100%" : 0, top: "50%" }}
        width="1"
        height="1"
        aria-hidden
      >
        <line
          x1="0"
          y1="0"
          x2={to.dx}
          y2={to.dy}
          stroke="#7c5cfc"
          strokeWidth="1.25"
          strokeDasharray="3 4"
          opacity="0.75"
        />
        <circle cx={to.dx} cy={to.dy} r="3.5" fill="#7c5cfc" />
      </svg>

      <span className="w-[22px] h-[22px] shrink-0 rounded-full bg-[#7c5cfc] text-white font-body text-[11px] flex items-center justify-center shadow-[0_6px_14px_-6px_rgba(124,92,252,0.9)]">
        {n}
      </span>
      <span className="bg-white font-body text-[12px] text-[#1a1714] whitespace-nowrap px-2.5 py-1.5 rounded-lg border border-[#e8e2d9] shadow-[0_8px_20px_-12px_rgba(26,23,20,0.4)]">
        {text}
      </span>
    </motion.div>
  );
}

/* ═══ المان‌های شناورِ دورِ فریم ═══════════════════════════════════════ */

const CARD =
  "bg-white border border-[#e8e2d9] shadow-[0_26px_60px_-26px_rgba(26,23,20,0.4)]";

/** کارتِ سفیدِ شناور با ورودِ پلکانی و شناوریِ آرام */
function Float({
  x,
  y,
  w,
  delay,
  bob = 10,
  reduce,
  className,
  children,
}: {
  x: number;
  y: number;
  w: number;
  delay: number;
  bob?: number;
  reduce: boolean | null;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute hidden md:block"
      style={{ left: x, top: y, width: w }}
      initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`rounded-2xl ${CARD} ${className ?? ""}`}
        dir="rtl"
        animate={reduce ? {} : { y: [0, -bob, 0] }}
        transition={
          reduce
            ? {}
            : { duration: 5.5 + delay * 2, repeat: Infinity, ease: "easeInOut", delay }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** نشانگرِ همکار روی یک مسیرِ بسته */
function Cursor({
  x,
  y,
  name,
  color,
  path,
  duration,
  delay,
}: {
  x: number;
  y: number;
  name: string;
  color: string;
  path: { x: number[]; y: number[] };
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute hidden md:block z-30"
      style={{ left: x, top: y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: path.x, y: path.y }}
      transition={{
        opacity: { delay, duration: 0.5 },
        x: { duration, repeat: Infinity, ease: "easeInOut", delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <svg width="22" height="22" viewBox="0 0 12 12" fill="none">
        <path
          d="M1 1L11 5.2L6.4 6.4L5.2 11L1 1Z"
          fill={color}
          stroke="white"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="absolute top-4 right-3 text-white text-[10px] font-body px-1.5 py-[2px] rounded whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        {name}
      </span>
    </motion.div>
  );
}

export default function HeroPerspective() {
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  const yScroll = useTransform(scrollY, [0, 800], [0, -70]);

  // زاویه‌ی پایه ملایمه و نشانگر فقط کمی تغییرش می‌ده؛ زاویه‌ی تند باعث
  // می‌شد متنِ داخلِ پنجره کشیده و ناخوانا بشه.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, -13]), {
    stiffness: 80,
    damping: 22,
  });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5.5, 0.5]), {
    stiffness: 80,
    damping: 22,
  });

  function handlePointer(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      className="relative w-full"
      style={{ y: reduce ? 0 : yScroll }}
      onPointerMove={handlePointer}
      onPointerLeave={handleLeave}
    >
      {/* ارتفاعِ قاب دقیقاً برابرِ STAGE_H × همان scale است؛ هر ناهماهنگی یا
          فضای مرده می‌سازد یا لبه را می‌بُرد. */}
      {/* روی نمایشگرِ فوق‌عریض استیج از اندازه‌ی طبیعی هم بزرگ‌تر می‌شه؛ چون
          همه‌چیز DOM ـه نه بیت‌مپ، بزرگ‌نمایی افت کیفیت نمی‌ده. */}
      <div className="relative w-full overflow-hidden h-[213px] sm:h-[332px] md:h-[458px] lg:h-[616px] xl:h-[711px] 2xl:h-[790px] min-[1800px]:h-[885px]">
        <div
          className="absolute left-1/2 top-0 origin-top -translate-x-1/2 scale-[0.27] sm:scale-[0.42] md:scale-[0.58] lg:scale-[0.78] xl:scale-[0.9] 2xl:scale-100 min-[1800px]:scale-[1.12]"
          style={{ width: STAGE_W, height: STAGE_H, perspective: 2200 }}
        >
          {/* هاله‌ی زیرِ پنجره */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: WIN_X,
              top: WIN_Y + WIN_H - 60,
              width: WIN_W,
              height: 190,
              background:
                "radial-gradient(ellipse at center, rgba(124,92,252,0.20) 0%, transparent 70%)",
            }}
          />

          <motion.div
            className="absolute"
            style={{
              left: WIN_X,
              top: WIN_Y,
              width: WIN_W,
              height: WIN_H,
              rotateY: reduce ? -9 : rotY,
              rotateX: reduce ? 3 : rotX,
              rotateZ: -0.8,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* قابِ پنجره */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border border-[#e2dcd2]"
              style={{ boxShadow: "0 60px 110px -40px rgba(26,23,20,0.45)" }}
            >
              {/* نوارِ عنوانِ مرورگر */}
              <div className="h-11 bg-[#1a1714] flex items-center px-4 gap-2 relative z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <div className="mx-auto h-6 w-64 rounded-md bg-white/10 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-white/45">mojtabaui.ir</span>
                </div>
              </div>

              {/* محتوا — دو لایه با هندسه‌ی یکسان */}
              <div className="absolute inset-x-0 bottom-0 top-11">
                <WireLayer />

                <motion.div
                  className="absolute inset-0"
                  initial={{ clipPath: clipAt(-1) }}
                  animate={reduce ? { clipPath: clipAt(101) } : { clipPath: CLIP_KEYS }}
                  transition={timeline(reduce)}
                >
                  <UILayer />
                </motion.div>

                {/* نوارِ نور روی خطِ برش، هم‌زاویه با همان خط */}
                {!reduce && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-y-0 pointer-events-none"
                    style={{
                      width: 120,
                      marginLeft: -60,
                      transform: "skewX(-13.5deg)",
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 40%, #ffffff 50%, rgba(255,255,255,0.5) 60%, transparent 100%)",
                      mixBlendMode: "overlay",
                    }}
                    animate={{ left: BEAM_KEYS }}
                    transition={timeline(reduce)}
                  />
                )}
              </div>
            </div>

            {/* ── قابِ سلکشنِ فیگما دورِ پنجره ── */}
            <div className="absolute -inset-3 pointer-events-none hidden md:block" aria-hidden>
              <svg className="w-full h-full overflow-visible">
                <motion.rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="10"
                  fill="none"
                  stroke="#7c5cfc"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.7, ease: "easeInOut" }}
                />
              </svg>

              {["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"].map(
                (pos, i) => (
                  <motion.span
                    key={pos}
                    className={`absolute ${pos} w-3 h-3 bg-white border-[1.5px] border-[#7c5cfc] rounded-[3px]`}
                    style={{
                      translate: `${pos.includes("right") ? "50%" : "-50%"} ${
                        pos.includes("bottom") ? "50%" : "-50%"
                      }`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.75 + i * 0.05, duration: 0.45 }}
                  />
                ),
              )}

              {/* برچسبِ نامِ لایه */}
              <motion.span
                className="absolute -top-7 right-0 bg-[#7c5cfc] text-white text-[11px] font-body px-2.5 py-1 rounded-md whitespace-nowrap"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.5 }}
              >
                Landing / Hero
              </motion.span>

              {/* برچسبِ ابعاد */}
              <motion.span
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#7c5cfc] text-white text-[11px] font-mono px-2.5 py-1 rounded-md whitespace-nowrap"
                dir="ltr"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                {WIN_W} × {WIN_H}
              </motion.span>
            </div>

            {/* ── پین‌های مفاهیمِ تجربه‌ی کاربری (فقط روی وایرفریم) ── */}
            <Pin
              n="۱"
              x={772}
              y={126}
              text="سلسله‌مراتبِ بصری"
              to={{ dx: -96, dy: 26 }}
              reduce={reduce}
              index={0}
            />
            <Pin
              n="۲"
              x={796}
              y={286}
              text="فراخوانِ اصلی"
              to={{ dx: -128, dy: 24 }}
              reduce={reduce}
              index={1}
            />
            <Pin
              n="۳"
              x={742}
              y={392}
              text="اثباتِ اجتماعی"
              to={{ dx: -84, dy: 8 }}
              reduce={reduce}
              index={2}
            />
            <Pin
              n="۴"
              x={126}
              y={188}
              text="نقطه‌ی کانونی"
              to={{ dx: 118, dy: 16 }}
              reduce={reduce}
              index={3}
            />
            <Pin
              n="۵"
              x={96}
              y={470}
              text="شبکه‌ی ستونیِ منظم"
              to={{ dx: 178, dy: -14 }}
              reduce={reduce}
              index={4}
            />
          </motion.div>

          {/* ── دو کارتِ شناور، قرینه‌ی هم ──────────────────────────────
              هر دو یک عرض، یک ارتفاعِ شروع، و یک اندازه هم‌پوشانی با لبه‌ی
              پنجره دارن. نسخه‌ی قبلی شش المانِ پراکنده در ارتفاع‌های مختلف بود
              که هم شلوغ می‌شد هم بعضی‌هاش از استیج بیرون می‌زد. */}

          {/* مدرس — تصویرِ hero.png، لبه‌ی راست */}
          <Float x={1176} y={206} w={236} delay={0.7} bob={9} reduce={reduce} className="p-3">
            <div className="relative h-[132px] rounded-xl bg-[#FAF6F1] border border-[#f0ebe3] overflow-hidden dot-bg">
              <Image
                src="/images/hero.png"
                alt="مجتبا یزدان‌پناه"
                width={140}
                height={137}
                className="absolute bottom-0 left-1/2 h-[124px] w-auto"
                style={{ transform: "translateX(-50%) scaleX(-1)" }}
              />
            </div>
            <div className="flex items-center justify-between mt-2.5 px-0.5">
              <div className="leading-tight">
                <div className="font-body font-semibold text-[12.5px] text-[#1a1714]">
                  مجتبا یزدان‌پناه
                </div>
                <div className="font-body text-[10.5px] text-[#a09990]">مدرس دوره</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            </div>
          </Float>

          {/* تمرین این هفته — لبه‌ی چپ، قرینه‌ی کارتِ راست */}
          <Float x={8} y={206} w={236} delay={0.85} bob={9} reduce={reduce} className="p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#f3f0ff] text-[#7c5cfc] flex items-center justify-center">
                <Sparkles size={15} />
              </span>
              <div className="leading-tight">
                <div className="font-body font-semibold text-[13px] text-[#1a1714]">
                  تمرین این هفته
                </div>
                <div className="font-body text-[11px] text-[#a09990]">ری‌دیزاین اپ بانکی</div>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#efeae2] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#7c5cfc]"
                initial={{ width: reduce ? "72%" : 0 }}
                animate={{ width: "72%" }}
                transition={{ delay: 1.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </Float>

          {/* نوارِ ابزارِ فیگما — دقیقاً وسطِ استیج */}
          <motion.div
            className="absolute hidden md:flex items-center gap-1 rounded-2xl bg-[#1a1714] px-2 py-1.5 shadow-[0_22px_46px_-20px_rgba(26,23,20,0.7)]"
            style={{ left: "50%", translate: "-50% 0", top: 678 }}
            dir="ltr"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {[MousePointer2, FrameIcon, PenTool, SquareIcon, TypeIcon, Hand].map((Icon, i) => (
              <span
                key={i}
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  i === 0 ? "bg-[#7c5cfc] text-white" : "text-white/50"
                }`}
              >
                <Icon size={14} />
              </span>
            ))}
          </motion.div>

          {/* ── نشانگرهای همکار ── */}
          {!reduce && (
            <>
              <Cursor
                x={1146}
                y={128}
                name="مجتبا"
                color="#7c5cfc"
                path={{ x: [0, -70, 20, 50, 0], y: [0, 90, 190, 60, 0] }}
                duration={19}
                delay={1.4}
              />
              <Cursor
                x={250}
                y={604}
                name="قمر"
                color="#e88a5c"
                path={{ x: [0, 90, 30, -40, 0], y: [0, -80, -180, -60, 0] }}
                duration={23}
                delay={1.8}
              />
            </>
          )}

          {/* برچسبِ دو سر */}
          <motion.div
            className="absolute hidden md:flex items-center gap-2"
            style={{ right: WIN_X + 40, top: WIN_Y + WIN_H + 34 }}
            animate={reduce ? { opacity: 0 } : { opacity: WIRE_FADE }}
            transition={timeline(reduce)}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#a09990]" />
            <span className="font-body font-bold text-[15px] text-[#a09990]">وایرفریم</span>
          </motion.div>
          <motion.div
            className="absolute hidden md:flex items-center gap-2"
            style={{ left: WIN_X + 40, top: WIN_Y + WIN_H + 34 }}
            animate={reduce ? { opacity: 1 } : { opacity: UI_FADE }}
            transition={timeline(reduce)}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc]" />
            <span className="font-body font-bold text-[15px] text-[#1a1714]">رابطِ نهایی</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
