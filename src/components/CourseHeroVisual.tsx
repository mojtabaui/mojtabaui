import { PenTool, Layers, Sparkles } from "lucide-react";

/**
 * تصویر گرافیکیِ هیروِ صفحه‌ی دوره — جایگزین بنر عکسی.
 *
 * الگو از اسکیل ui-ux-pro-max گرفته شده: «Bento Box Grid» (کارت‌های ماژولار با
 * اسپن‌های متفاوت، شعاع ۱۶–۲۴px، سایه‌ی ملایم) ترکیب‌شده با نرمیِ «Claymorphism»
 * که اسکیل برای محصولات آموزشی توصیه می‌کنه. رنگ‌ها از توکن‌های خود دوره میان،
 * پس هر دوره هویت رنگی خودش رو نگه می‌داره.
 */

interface Props {
  /** حرف بزرگ نمایشی — UI یا UX */
  mark: string;
  /** زیرعنوان لاتین دوره، مثل UI DESIGN INFINITY */
  subtitle: string;
  color: { bg: string; badge: string; accent: string };
  /** ساعت ویدیو — به‌عنوان عدد شاخص گوشه */
  videoHours: number;
  tags: string[];
}

const fa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

export default function CourseHeroVisual({
  mark,
  subtitle,
  color,
  videoHours,
  tags,
}: Props) {
  const card =
    "rounded-3xl border transition-transform duration-300 hover:scale-[1.02]";
  const cardStyle = {
    backgroundColor: "#ffffff",
    borderColor: `${color.accent}1f`,
    boxShadow: `0 10px 30px -18px ${color.accent}`,
  };

  return (
    <div
      className="w-full max-w-[340px] rounded-[2rem] p-3 mb-7"
      style={{ backgroundColor: color.bg, border: `1px solid ${color.accent}22` }}
    >
      <div className="grid grid-cols-3 gap-3">

        {/* بلوک بزرگ — حرف نمایشی UI/UX */}
        <div
          className={`${card} col-span-2 relative overflow-hidden flex flex-col justify-between p-4 min-h-[132px]`}
          style={cardStyle}
        >
          <span
            className="font-display font-black leading-none select-none absolute -bottom-4 -left-1 pointer-events-none"
            style={{ fontSize: "6.5rem", color: color.accent, opacity: 0.13 }}
            aria-hidden
          >
            {mark}
          </span>
          <div
            className="font-display text-[9px] font-bold tracking-[0.18em] uppercase relative"
            style={{ color: color.accent }}
          >
            {subtitle}
          </div>
          <div className="relative mt-auto">
            <div className="font-display font-black text-4xl leading-none" style={{ color: color.accent }}>
              {mark}
            </div>
          </div>
        </div>

        {/* پالت رنگ */}
        <div className={`${card} p-4 flex flex-col justify-between min-h-[132px]`} style={cardStyle}>
          <span className="font-display text-[8px] font-bold tracking-[0.15em] uppercase text-[#a09990]">
            COLOR
          </span>
          <div className="grid grid-cols-2 gap-1.5 mt-2" aria-hidden>
            {[color.accent, color.badge, "#1a1714", "#e8e2d9"].map((c, i) => (
              <span
                key={i}
                className="block w-full aspect-square rounded-lg"
                style={{ backgroundColor: c, opacity: i === 0 ? 1 : 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* نمونه‌ی تایپوگرافی */}
        <div className={`${card} p-4 flex flex-col justify-between min-h-[104px]`} style={cardStyle}>
          <span className="font-display text-[8px] font-bold tracking-[0.15em] uppercase text-[#a09990]">
            TYPE
          </span>
          <div className="flex items-end gap-1 leading-none" aria-hidden>
            <span className="font-display font-black text-3xl text-[#1a1714]">Aa</span>
            <span className="font-body text-[10px] text-[#a09990] mb-1">۱۲/۱۶/۲۴</span>
          </div>
        </div>

        {/* وایرفریم کوچک */}
        <div className={`${card} col-span-2 p-4 min-h-[104px]`} style={cardStyle}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-[8px] font-bold tracking-[0.15em] uppercase text-[#a09990]">
              LAYOUT
            </span>
            <Layers size={12} style={{ color: color.accent }} />
          </div>
          <div className="flex gap-2" aria-hidden>
            <div className="w-1/3 space-y-1.5">
              <span className="block h-2 rounded" style={{ backgroundColor: color.badge }} />
              <span className="block h-2 rounded" style={{ backgroundColor: color.badge, opacity: 0.6 }} />
              <span className="block h-2 rounded" style={{ backgroundColor: color.badge, opacity: 0.35 }} />
            </div>
            <div className="flex-1 rounded-lg" style={{ backgroundColor: `${color.accent}14` }} />
          </div>
        </div>

        {/* عدد شاخص — ساعت ویدیو */}
        <div
          className={`${card} col-span-2 p-4 flex items-center justify-between`}
          style={{ ...cardStyle, backgroundColor: color.accent, borderColor: color.accent }}
        >
          <div className="leading-none">
            <div className="font-display font-black text-3xl text-white">{fa(videoHours)}</div>
            <div className="font-body text-[10px] text-white/70 mt-1">ساعت ویدیو</div>
          </div>
          <Sparkles size={18} className="text-white/70" />
        </div>

        {/* ابزار */}
        <div className={`${card} p-4 flex flex-col items-center justify-center gap-1.5`} style={cardStyle}>
          <PenTool size={16} style={{ color: color.accent }} />
          <span className="font-body text-[9px] text-[#a09990] text-center leading-tight">
            {tags[0] ?? "Figma"}
          </span>
        </div>
      </div>
    </div>
  );
}
