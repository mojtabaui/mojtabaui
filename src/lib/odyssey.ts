/**
 * هفت مأموریت دورهٔ AI Odyssey.
 *
 * هر مأموریت یک سیاره است و رنگ‌هایش همین‌جا زندگی می‌کنند نه توی
 * کامپوننت، چون کره از چند لایه ساخته می‌شود (بافت، برجستگی، سایه، جوّ)
 * و همه باید از یک خانوادهٔ رنگی دربیایند وگرنه مصنوعی به‌نظر می‌رسد.
 *
 * `tint` رنگی است که در متن هم استفاده می‌شود، پس روی زمینهٔ #0F0F23
 * باید دست‌کم ۴٫۵:۱ باشد. نسبت هرکدام کنارش نوشته شده.
 *
 * پارامترهای بافت به فیلترهای SVG می‌روند:
 *   freq  فرکانس نویز. یک عدد = لکه‌ای، دو عدد = نواری (مشتری و زحل)
 *   oct   تعداد اکتاو؛ بیشتر یعنی جزئیات ریزتر و رندر گران‌تر
 *   rough شدت برجستگی سطح
 *   mix   شدت لایهٔ برجستگی؛ زیاد که باشد کره سفید و شسته می‌شود
 *   blot  چقدر از سطح را لکه‌های روشن بگیرند (زمین بیشترش اقیانوس است)
 */

export type Episode = { fa: string; en: string };

export type Mission = {
  /** شمارهٔ دو رقمی، همان‌طور که روی صفحه دیده می‌شود */
  no: string;
  planet: string;
  /** فعلِ مأموریت — تیتر بزرگ */
  action: { fa: string; en: string };
  /** عنوان فصل دوره */
  chapter: { fa: string; en: string };
  body: { fa: string; en: string };
  /** سرفصل‌ها */
  episodes: Episode[];
  /** سرفصل‌ها هنوز نهایی نشده‌اند */
  draft?: boolean;

  tint: string;
  /** رنگ لکه‌های روشن سطح */
  hi: string;
  /** رنگ پایهٔ سطح */
  base: string;
  /** تیره‌ترین رنگ، برای شکاف حلقه */
  deep: string;
  /** رنگ جوّ و هالهٔ لبه */
  air: string;

  seed: number;
  freq: string;
  oct: number;
  rough: number;
  mix: number;
  blot?: number;
  /** قطر نسبی — عطارد کوچک است، مشتری بزرگ */
  size: number;
  ring?: boolean;
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
    episodes: [
      { fa: "طرز فکر AI", en: "AI thinking" },
      { fa: "زیر کاپوت", en: "Under the hood" },
      { fa: "شش ضعف ذاتی", en: "Six built-in weaknesses" },
      { fa: "مرز سپردن", en: "The line of delegation" },
      { fa: "آناتومی دستور", en: "Anatomy of a prompt" },
      { fa: "تکنیک‌ها", en: "The techniques" },
      { fa: "از چت به ابزار", en: "From chat to tool" },
      { fa: "معیار و توقف", en: "Criteria and stopping" },
      { fa: "کیت پرامپت", en: "Your prompt kit" },
    ],
    tint: "#c9bdb0", // 9.8:1
    hi: "#9c9182",
    base: "#4a443c",
    deep: "#191512",
    air: "#8c8279",
    seed: 7,
    freq: ".020",
    oct: 5,
    rough: 2.6,
    mix: 0.55,
    size: 0.66,
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
    episodes: [
      { fa: "کلاد و همهٔ اجزایش", en: "Claude and all its parts" },
      { fa: "چت‌جی‌پی‌تی و کودکس", en: "ChatGPT and Codex" },
      { fa: "فیگما AI", en: "Figma AI" },
    ],
    tint: "#f0cf94", // 11.4:1
    hi: "#eccf90",
    base: "#a8762f",
    deep: "#4a2f0e",
    air: "#d9a851",
    seed: 19,
    freq: ".009 .024",
    oct: 4,
    rough: 0.8,
    mix: 0.42,
    size: 0.82,
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
    episodes: [
      { fa: "ایجنت یعنی چی", en: "What an agent is" },
      { fa: "داخل حلقه", en: "Inside the loop" },
      { fa: "ابزار", en: "Tools" },
      { fa: "کانتکست", en: "Context" },
      { fa: "بسازیم، بدون کد", en: "Build it, without code" },
      { fa: "زیر کاپوت", en: "Under the hood" },
      { fa: "مهار و سنجش", en: "Containment and measure" },
      { fa: "چند ایجنت با هم", en: "Many agents together" },
    ],
    tint: "#f0937a", // 8.4:1
    hi: "#d4653a",
    base: "#8a2f16",
    deep: "#2a0c05",
    air: "#b04528",
    seed: 3,
    freq: ".017",
    oct: 5,
    rough: 1.8,
    mix: 0.5,
    size: 0.74,
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
    episodes: [
      { fa: "اول معیار، بعد ایده", en: "Criteria before ideas" },
      { fa: "از درخواست تا مسئله", en: "From request to problem" },
      { fa: "طراحی تحقیق", en: "Designing the research" },
      { fa: "استخراج", en: "Extraction" },
      { fa: "از داده تا الگو", en: "From data to pattern" },
      { fa: "تست و تصمیم", en: "Testing and deciding" },
    ],
    draft: true,
    tint: "#7fc4e8", // 10.2:1
    hi: "#3f8a52",
    base: "#0e3a68",
    deep: "#05101f",
    air: "#4a9fd4",
    seed: 41,
    freq: ".015",
    oct: 5,
    rough: 1.2,
    mix: 0.45,
    blot: -0.24,
    size: 0.86,
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
    episodes: [
      { fa: "دیزاین‌سیستم با AI", en: "Design systems with AI" },
      { fa: "از فریم تا کامپوننت", en: "From frame to component" },
      { fa: "حالت‌هایی که یادمان می‌رود", en: "The states we forget" },
      { fa: "ریزمتن و لحن", en: "Microcopy and voice" },
      { fa: "دسترس‌پذیری، خودکار", en: "Accessibility, automated" },
      { fa: "بازبینی بصری", en: "Visual review" },
    ],
    draft: true,
    tint: "#e8b98c", // 10.6:1
    hi: "#dcb488",
    base: "#8a5c32",
    deep: "#3a2112",
    air: "#d9a066",
    seed: 11,
    freq: ".004 .055",
    oct: 4,
    rough: 0.9,
    mix: 0.45,
    size: 1,
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
    episodes: [
      { fa: "چقدر کد لازم داری", en: "How much code you need" },
      { fa: "اولین صفحهٔ زنده", en: "Your first live page" },
      { fa: "داده و فرم", en: "Data and forms" },
      { fa: "وقتی خراب می‌شود", en: "When it breaks" },
      { fa: "انتشار", en: "Shipping it" },
    ],
    draft: true,
    tint: "#ecd9b4", // 13.9:1
    hi: "#e0c99c",
    base: "#8f7340",
    deep: "#3a2e17",
    air: "#e0c9a0",
    seed: 23,
    freq: ".003 .045",
    oct: 3,
    rough: 0.6,
    mix: 0.38,
    size: 0.9,
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
    episodes: [
      { fa: "انتخاب مسئله", en: "Choosing the problem" },
      { fa: "از صفر تا نسخهٔ اول", en: "Zero to first version" },
      { fa: "بازبینی و اصلاح", en: "Review and revise" },
      { fa: "ارائه و پرتفولیو", en: "Presenting it" },
    ],
    draft: true,
    tint: "#94a8f0", // 8.1:1
    hi: "#5a78dc",
    base: "#1d3080",
    deep: "#070c26",
    air: "#3552b0",
    seed: 31,
    freq: ".006 .018",
    oct: 4,
    rough: 0.8,
    mix: 0.45,
    size: 0.8,
  },
];

/** مجموع سرفصل‌ها، برای نوار آمار */
export const EPISODE_COUNT = MISSIONS.reduce((n, m) => n + m.episodes.length, 0);
