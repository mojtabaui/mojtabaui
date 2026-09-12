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

/**
 * نامِ درس‌ها و فصل‌ها عمداً در هر دو زبان انگلیسی است.
 *
 * تصمیمِ برند است، نه فراموشی: «AI Native UX Design» یک اصطلاح است و
 * ترجمه‌اش («طراحی تجربهٔ کاربری بومیِ هوش مصنوعی») نه در بازار شنیده
 * می‌شود و نه در رزومهٔ کسی می‌نشیند. شکلِ دوزبانه سرِ جایش می‌ماند تا
 * اگر روزی نظر عوض شد، فقط مقدارها عوض شوند نه ساختار.
 *
 * متنِ توضیحی (`body`) اما فارسی می‌ماند — آنجا حرف زده می‌شود، نه نام برده.
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
    chapter: { fa: "AI Thinking", en: "AI Thinking" },
    body: {
      fa: "اولین تماس. یاد می‌گیری مثل یک طراحِ AI-native فکر کنی. نه اینکه ابزار جدید یاد بگیری، اینکه بفهمی چه کاری را باید بسپاری و چه کاری هیچ‌وقت.",
      en: "First contact. You learn to think like an AI-native designer — not new tools, but which work to hand over and which work never leaves your hands.",
    },
    episodes: [
      { fa: "AI Thinking", en: "AI Thinking" },
      { fa: "Under the Hood", en: "Under the Hood" },
      { fa: "Six Built-in Weaknesses", en: "Six Built-in Weaknesses" },
      { fa: "The Line of Delegation", en: "The Line of Delegation" },
      { fa: "Anatomy of a Prompt", en: "Anatomy of a Prompt" },
      { fa: "The Techniques", en: "The Techniques" },
      { fa: "From Chat to Tool", en: "From Chat to Tool" },
      { fa: "Criteria and Stopping", en: "Criteria and Stopping" },
      { fa: "Your Prompt Kit", en: "Your Prompt Kit" },
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
    chapter: { fa: "AI Tools", en: "AI Tools" },
    body: {
      fa: "زرادخانه‌ات را می‌سازی. کلاد، چت‌جی‌پی‌تی، کودکس و فیگما AI. و مهم‌تر از همه، این‌که کدام‌شان برای کدام کار ساخته شده.",
      en: "You build your arsenal. Claude, ChatGPT, Codex and Figma AI — and more importantly, which of them was built for which job.",
    },
    episodes: [
      { fa: "Claude, Part by Part", en: "Claude, Part by Part" },
      { fa: "ChatGPT and Codex", en: "ChatGPT and Codex" },
      { fa: "Figma AI", en: "Figma AI" },
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
    planet: "Earth",
    action: { fa: "انسان را بفهم", en: "Understand Humans" },
    chapter: { fa: "AI Native UX Design", en: "AI Native UX Design" },
    body: {
      fa: "برمی‌گردی به مهم‌ترین چیز. از یک درخواستِ مبهم تا یوزکیسی که معیارِ پذیرش دارد — پژوهش، سنتز و تصمیم، با مدل توی اتاق ولی نه پشتِ فرمان.",
      en: "You come back to the thing that matters most. From a vague request to use cases with acceptance criteria — research, synthesis and decisions, with the model in the room but not at the wheel.",
    },
    episodes: [
      { fa: "Dividing the Work", en: "Dividing the Work" },
      { fa: "From Request to Problem", en: "From Request to Problem" },
      { fa: "Designing the Research", en: "Designing the Research" },
      { fa: "Extraction", en: "Extraction" },
      { fa: "Synthesis", en: "Synthesis" },
      { fa: "Use Cases", en: "Use Cases" },
      { fa: "Criteria and Handoff", en: "Criteria and Handoff" },
    ],
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
    no: "04",
    planet: "Mars",
    action: { fa: "ایجنت طراحی کن", en: "Design the Agents" },
    chapter: { fa: "Agentic UX Design", en: "Agentic UX Design" },
    body: {
      fa: "از طراحی صفحه به طراحی سیستم می‌رسی. حلقه، ابزار، کانتکست و مرز — و چهار لایه‌ای که همان پروندهٔ تجربه را به PRD و بازبینیِ خودکار تبدیل می‌کنند.",
      en: "You move from designing screens to designing systems. Loops, tools, context and boundaries — and the four layers that turn that UX folder into a PRD and an automated review.",
    },
    episodes: [
      { fa: "What an Agent Is", en: "What an Agent Is" },
      { fa: "Inside the Loop", en: "Inside the Loop" },
      { fa: "Tools", en: "Tools" },
      { fa: "Context", en: "Context" },
      { fa: "Build It, Without Code", en: "Build It, Without Code" },
      { fa: "Containment and Measure", en: "Containment and Measure" },
      { fa: "Layers and the PRD", en: "Layers and the PRD" },
      { fa: "Build It", en: "Build It" },
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
    no: "05",
    planet: "Jupiter",
    action: { fa: "رابط بساز", en: "Create Interfaces" },
    chapter: { fa: "AI Native UI Design", en: "AI Native UI Design" },
    body: {
      fa: "از پروندهٔ تجربه به رابط می‌رسی. اسکلت، ریزمتن، استایل‌گاید و نقد — و پوشه‌ای که بدونِ تو هم بازتولید می‌شود.",
      en: "You go from the UX folder to the interface itself. Skeleton, microcopy, style guide and critique — and a folder that reproduces without you.",
    },
    episodes: [
      { fa: "Dividing the Work", en: "Dividing the Work" },
      { fa: "The Skeleton", en: "The Skeleton" },
      { fa: "Microcopy", en: "Microcopy" },
      { fa: "The Style Guide", en: "The Style Guide" },
      { fa: "The Interface", en: "The Interface" },
      { fa: "Critiquing the Interface", en: "Critiquing the Interface" },
      { fa: "Handoff", en: "Handoff" },
    ],
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
    action: { fa: "تیمت را بساز", en: "Build the Team" },
    chapter: { fa: "Agentic UI Design", en: "Agentic UI Design" },
    body: {
      fa: "همان ساختارِ لایه‌ای می‌رود روی رابط — جایی که معیارها واقعاً ماشین‌سنجیدنی‌اند. یک لایه می‌سازد، یک لایه می‌سنجد، و دیزاین‌سیستم می‌شود کانتکستِ هر دو.",
      en: "The same layered structure moves onto the interface — the one place where criteria are genuinely machine-checkable. One layer builds, one layer checks, and the design system becomes context for both.",
    },
    episodes: [
      { fa: "Criteria a Machine Can Check", en: "Criteria a Machine Can Check" },
      { fa: "The Design System as Context", en: "The Design System as Context" },
      { fa: "One Layer Builds, One Reviews", en: "One Layer Builds, One Reviews" },
      { fa: "The Visual QA Agent", en: "The Visual QA Agent" },
      { fa: "Handoff Without a Document", en: "Handoff Without a Document" },
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
    action: { fa: "بسازش و منتشر کن", en: "Ship It" },
    chapter: { fa: "Vibe Coding For Designers", en: "Vibe Coding For Designers" },
    body: {
      fa: "از طراح به سازنده تبدیل می‌شوی. چیزی که طراحی کردی زنده می‌شود — واقعی، قابلِ لمس، روی یک آدرس اینترنتی که می‌شود لینکش را فرستاد.",
      en: "You turn from designer into builder. What you designed becomes real, clickable, and lives at a URL you can send someone.",
    },
    episodes: [
      { fa: "How Much Code You Need", en: "How Much Code You Need" },
      { fa: "Your First Live Page", en: "Your First Live Page" },
      { fa: "Data and Forms", en: "Data and Forms" },
      { fa: "When It Breaks", en: "When It Breaks" },
      { fa: "Shipping It", en: "Shipping It" },
      { fa: "The Final Project", en: "The Final Project" },
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
