import { currentSeason, type Season } from "@/lib/season";

const ITEMS = [
  "UI Design", "UX Design", "Figma", "Design System",
  "Atomic Design", "Typography", "Color Theory", "Interaction Design",
  "User Research", "Wireframe", "Case Study", "Mentoring",
  "Real Projects", "From Zero", "Card Sorting", "Prototyping",
];

/**
 * تمِ هر فصل: پس‌زمینهٔ گرم یا سرد، رنگ متن، و نشانه‌ای که بین کلمه‌ها
 * می‌شینه (برگ، شکوفه، خورشید، دونهٔ برف). رنگ نشانه‌ها چرخشیه تا نوار
 * یکنواخت نباشه.
 */
const THEMES: Record<Season, { bg: string; border: string; text: string; glyphs: string[] }> = {
  spring: {
    bg: "linear-gradient(90deg, #13231a, #1b3123 50%, #13231a)",
    border: "#25402d",
    text: "rgb(207 232 201 / 0.45)",
    glyphs: ["#f4a7b9", "#f7d6e0", "#b9e4a6", "#f19cb0"],
  },
  summer: {
    bg: "linear-gradient(90deg, #271d08, #36280b 50%, #271d08)",
    border: "#4a3812",
    text: "rgb(255 227 154 / 0.45)",
    glyphs: ["#ffd23f", "#ffb627", "#ffe58a", "#ff9f1c"],
  },
  autumn: {
    bg: "linear-gradient(90deg, #2a1409, #3e1d0c 50%, #2a1409)",
    border: "#55280f",
    text: "rgb(243 197 138 / 0.5)",
    glyphs: ["#d9622b", "#e8a33d", "#b5442a", "#c98a2b"],
  },
  winter: {
    bg: "linear-gradient(90deg, #101923, #172433 50%, #101923)",
    border: "#243649",
    text: "rgb(207 227 245 / 0.45)",
    glyphs: ["#e6f2ff", "#a9d1f5", "#ffffff", "#8fbfe8"],
  },
};

function Glyph({ season, color }: { season: Season; color: string }) {
  const common = { width: 12, height: 12, viewBox: "0 0 24 24", "aria-hidden": true } as const;
  switch (season) {
    case "autumn":
      // برگ با رگبرگ وسط
      return (
        <svg {...common}>
          <path d="M12 2C6.5 6.5 4 10.5 5 15.2 5.7 18.6 8.4 21 12 21s6.3-2.4 7-5.8C20 10.5 17.5 6.5 12 2Z" fill={color} />
          <path d="M12 6.5V23" stroke="rgb(0 0 0 / 0.35)" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "spring":
      // شکوفهٔ پنج‌پر
      return (
        <svg {...common}>
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx="12" cy="6.5" r="4.2" fill={color} transform={`rotate(${a} 12 12)`} />
          ))}
          <circle cx="12" cy="12" r="2.4" fill="#f9e27d" />
        </svg>
      );
    case "summer":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.5" fill={color} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} d="M12 1.5v3.5" stroke={color} strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 12 12)`} />
          ))}
        </svg>
      );
    case "winter":
      return (
        <svg {...common}>
          {[0, 60, 120].map((a) => (
            <g key={a} transform={`rotate(${a} 12 12)`} stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none">
              <path d="M12 2v20" />
              <path d="M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5" />
            </g>
          ))}
        </svg>
      );
  }
}

export default function MarqueeBand({ season = currentSeason() }: { season?: Season }) {
  const theme = THEMES[season];
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      className="overflow-hidden border-y py-3 select-none"
      style={{ background: theme.bg, borderColor: theme.border }}
      data-season={season}
      dir="ltr"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className="font-display text-[10px] font-bold tracking-[0.22em] uppercase px-5"
              style={{ color: theme.text }}
            >
              {item}
            </span>
            <span
              className="season-glyph inline-flex"
              style={{
                // هر نشانه کمی کج و با فاز خودش تاب می‌خوره، نه همه با هم
                rotate: `${((i * 47) % 70) - 35}deg`,
                animationDelay: `${-(i % 7) * 0.45}s`,
              }}
            >
              <Glyph season={season} color={theme.glyphs[i % theme.glyphs.length]} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
