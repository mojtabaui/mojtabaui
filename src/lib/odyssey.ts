/**
 * هفت مأموریت دورهٔ AI Odyssey.
 *
 * هر مأموریت یک سیاره‌ست. رنگ‌ها همین‌جا زندگی می‌کنن نه توی کامپوننت،
 * چون هر سیاره از سه لایه ساخته می‌شه (کره، جوّ، سایه) و هر سه باید از
 * یک خانوادهٔ رنگی دربیان وگرنه کره مصنوعی به‌نظر می‌رسه.
 *
 * `tint` رنگیه که توی متن و خط زمان هم استفاده می‌شه، پس روی زمینهٔ
 * #0F0F23 باید دست‌کم ۴٫۵:۱ باشه. نسبت هرکدوم کنارش نوشته شده.
 */

export type Mission = {
  /** شمارهٔ دو رقمی، همون‌طور که روی صفحه دیده می‌شه */
  no: string;
  planet: string;
  /** فعلِ مأموریت — تیتر بزرگ انگلیسی */
  action: { fa: string; en: string };
  /** عنوان فصل دوره */
  chapter: { fa: string; en: string };
  body: { fa: string; en: string };
  /** رنگ لهجه‌ی این مأموریت */
  tint: string;
  /** روشنِ کره، سمتی که نور می‌خوره */
  lit: string;
  /** تیرهٔ کره، سمت سایه */
  dark: string;
  /** هالهٔ جوّ */
  halo: string;
  /** قطر نسبی کره — عطارد کوچیکه، مشتری بزرگ */
  size: number;
  ring?: boolean;
  bands?: boolean;
};

export const MISSIONS: Mission[] = [
  {
    no: "01",
    planet: "Mercury",
    action: { fa: "متفاوت فکر کن", en: "Think Different" },
    chapter: { fa: "تفکر با هوش مصنوعی", en: "AI Thinking" },
    body: {
      fa: "اولین تماس. یاد می‌گیری مثل یک طراحِ AI-native فکر کنی. نه اینکه ابزار جدید یاد بگیری، اینکه بفهمی چه کاری را باید بسپاری و چه کاری هیچ‌وقت.",
      en: "First contact. You learn to think like an AI-native designer — not new tools, but which work to hand over and which work never leaves your hands.",
    },
    tint: "#c9bdb0", // 9.8:1
    lit: "#a89b8c",
    dark: "#3a332c",
    halo: "#8c8279",
    size: 0.62,
  },
  {
    no: "02",
    planet: "Venus",
    action: { fa: "مجهز شو", en: "Equip Yourself" },
    chapter: { fa: "ابزارهای هوش مصنوعی", en: "AI Tools" },
    body: {
      fa: "زرادخانه‌ات را می‌سازی. کلاد، چت‌جی‌پی‌تی، کودکس و فیگما AI. و مهم‌تر از همه، این‌که کدام‌شان برای کدام کار ساخته شده.",
      en: "You build your arsenal. Claude, ChatGPT, Codex and Figma AI — and more importantly, which of them was built for which job.",
    },
    tint: "#f0cf94", // 11.4:1
    lit: "#e8c07a",
    dark: "#6b4a1e",
    halo: "#c99a48",
    size: 0.78,
  },
  {
    no: "03",
    planet: "Mars",
    action: { fa: "ایجنت طراحی کن", en: "Design the Agents" },
    chapter: { fa: "طراحی ایجنت", en: "Agentic Design" },
    body: {
      fa: "از طراحی صفحه به طراحی سیستم می‌رسی. حلقه، ابزار، کانتکست و مرز. و این‌که چطور چیزی بسازی که خودش کار کند و بشود بهش اعتماد کرد.",
      en: "You move from designing screens to designing systems. Loops, tools, context and boundaries — and how to build something that runs itself and can be trusted.",
    },
    tint: "#f0937a", // 8.4:1
    lit: "#c1502e",
    dark: "#4a1c10",
    halo: "#b04528",
    size: 0.7,
  },
  {
    no: "04",
    planet: "Earth",
    action: { fa: "انسان را بفهم", en: "Understand Humans" },
    chapter: { fa: "تجربهٔ کاربری با AI", en: "AI in UX" },
    body: {
      fa: "برمی‌گردی به مهم‌ترین چیز. پژوهش، معیار و تصمیم. جایی که هوش مصنوعی سرعت می‌دهد ولی قضاوت هنوز مال توست.",
      en: "You come back to the thing that matters most. Research, criteria and judgement — where AI adds speed but the decision stays yours.",
    },
    tint: "#7fc4e8", // 10.2:1
    lit: "#3b82c4",
    dark: "#0f2c4a",
    halo: "#2f6fa8",
    size: 0.82,
  },
  {
    no: "05",
    planet: "Jupiter",
    action: { fa: "رابط بساز", en: "Create Interfaces" },
    chapter: { fa: "رابط کاربری با AI", en: "AI in UI" },
    body: {
      fa: "قدرت هوش مصنوعی را وارد خودِ طراحی می‌کنی. از دیزاین‌سیستم تا حالت‌ها و ریزمتن، با سرعتی که قبلاً ممکن نبود.",
      en: "You bring AI into the craft itself. From design systems to states and microcopy, at a speed that was not previously available.",
    },
    tint: "#e8b98c", // 10.6:1
    lit: "#d9a066",
    dark: "#5c3a24",
    halo: "#b07a44",
    size: 1,
    bands: true,
  },
  {
    no: "06",
    planet: "Saturn",
    action: { fa: "بسازش", en: "Build It" },
    chapter: { fa: "توسعهٔ سبک", en: "Light Development" },
    body: {
      fa: "از طراح به سازنده تبدیل می‌شوی. چیزی که طراحی کردی را زنده می‌کنی. واقعی، قابل لمس، روی یک آدرس اینترنتی.",
      en: "You turn from designer into builder. What you designed becomes real, clickable, and lives at a URL you can share.",
    },
    tint: "#ecd9b4", // 13.9:1
    lit: "#e0c9a0",
    dark: "#5e4c2e",
    halo: "#b39a68",
    size: 0.86,
    ring: true,
  },
  {
    no: "07",
    planet: "Neptune",
    action: { fa: "فراتر برو", en: "Go Beyond" },
    chapter: { fa: "پروژهٔ نهایی", en: "Final Project" },
    body: {
      fa: "آخرین مأموریت. یک محصول کامل از صفر تا انتشار، تنها با چیزهایی که در این سفر یاد گرفتی.",
      en: "The final mission. One complete product from nothing to launch, using only what this journey taught you.",
    },
    tint: "#94a8f0", // 8.1:1
    lit: "#4a6fd4",
    dark: "#141f52",
    halo: "#3552b0",
    size: 0.76,
  },
];
