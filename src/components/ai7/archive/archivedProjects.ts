/**
 * دادهٔ پروژه، منجمد در شکلی که صفحهٔ بایگانی با آن ساخته شده بود.
 *
 * این کپی برای همین وجود دارد که کپی باشد. تا وقتی صفحهٔ بایگانی
 * به `PROJECTS` زنده وصل بود، هر تغییرِ آن فایل این یکی را
 * می‌شکست — و بایگانی‌ای که با ویرایشِ کدِ جاری خراب شود، بایگانی
 * نیست، یک وابستگیِ فراموش‌شده است.
 *
 * پس این فایل **ویرایش نمی‌شود**. اگر متنی باید عوض شود، جایش
 * `src/lib/ai7-curriculum.ts` است، نه اینجا.
 */
export const ARCHIVED_PROJECTS = {
  fa: {
    title: "پروژه‌ای که با هم می‌بریم جلو",
    lede:
      "قرار نیست هرکس جدا یک چیزی بسازد. دو محصولِ واقعی روی میز است و هر فصل یک تکه‌اش را جلو می‌برد. تمرینِ ساختگی نداریم، چون روی محصولِ ساده AI همیشه درست به‌نظر می‌رسد.",
    items: [
      {
        tag: "فصل‌های ۱ و ۲",
        name: "نَفَس",
        what: "همراهِ لحظهٔ بحران",
        body:
          "محصولی که در آن یک جوابِ غلط، هزینهٔ واقعی دارد. روی همین، مرزها را می‌نویسید: چه چیزی هیچ‌وقت به مدل سپرده نمی‌شود، و با چه معیاری خروجی رد می‌شود.",
        out: ["دستورِ ثابت", "روبریک", "شرطِ توقف", "فهرستِ مرزها"],
      },
      {
        tag: "فصل‌های ۳ تا ۷",
        name: "هم‌قدم",
        what: "پیدا کردن و رزروِ جلسهٔ روان‌درمانی",
        body:
          "تناقضِ مرکزی‌اش این است که هر سؤالی می‌پرسید مطابقت را بهتر و ریزش را بیشتر می‌کند. از یک بریفِ چهارجمله‌ای شروع می‌شود و تا ایجنت، PRD و فلوهای دارای معیارِ پذیرش می‌رود.",
        out: ["جدولِ شواهد", "دو پرسونا", "هشت یوزکیس", "PRD", "ایجنتِ کیوای"],
      },
    ],
    caseTitle: "یک دورِ کاملِ پژوهش، با عددهای واقعی",
    caseLede:
      "این‌ها خروجیِ همان پروژه‌اند، همان‌طور که در دوره ساخته می‌شوند. نه نمونهٔ آماده — مسیری که خودتان تکرارش می‌کنید.",
    stats: [
      { k: "مصاحبهٔ عمیق", v: "۲" },
      { k: "منبعِ ثانویه، با درجهٔ اعتبار", v: "۱۶" },
      { k: "رقیبِ بررسی‌شده", v: "۱۱" },
      { k: "فرضِ بیرون‌کشیده از بریف", v: "۱۰" },
      { k: "خوشه، از ۹۶ یادداشتِ لنگردار", v: "۲۷" },
      { k: "تم، هرکدام دست‌کم دو منبع", v: "۷" },
      { k: "یوزکیس با معیارِ پذیرش", v: "۸" },
      { k: "سطرِ روبریکِ قابلِ رد", v: "۱۳" },
    ],
    lessonsTitle: "و چیزهایی که در همین پروژه خراب شد",
    lessons: [
      {
        t: "قاعده‌ای که خودمان نوشته بودیم، با دادهٔ خودمان شکست",
        d: "یک سطرِ روبریک پیش از دیدنِ داده نوشته شده بود و پژوهشِ ثانویه ردش کرد. روبریک حدسِ شماست، و حدس جای شاهد نمی‌نشیند.",
      },
      {
        t: "قوی‌ترین یافتهٔ کلِ پژوهش کنار گذاشته شد",
        d: "چهار منبعِ مستقل داشت، ولی کار کردن رویش یعنی تصمیم‌گیری دربارهٔ معیارِ موفقیت — و آن یکی از پنج چیزی است که سپرده نمی‌شود.",
      },
      {
        t: "برای چیزی پرسش نوشتیم که با پرسیدن جواب نمی‌دهد",
        d: "هشت پرسشِ رفتاری، و هیچ‌کدام نمی‌توانست بگوید ریزش کجای قیف اتفاق می‌افتد. این را در مرحلهٔ سنتز فهمیدیم، نه موقعِ نوشتنِ راهنما.",
      },
    ],
    filesTitle: "پرونده‌ای که آخرش دستتان است",
    files: [
      "بریف و ده فرض، هرکدام با راهِ آزمودنش",
      "جدولِ شواهد — هر ادعا با نقل‌قول و شمارهٔ سطر",
      "نمودارِ وابستگی — ۸ دسته، ۲۷ خوشه، ۹۶ یادداشت",
      "دو پرسونا، فقط از شواهد، با بخشِ «چه چیزی نمی‌دانیم»",
      "هشت یوزکیس و فلو، با مسیرهای شکست",
      "rubric.md و فهرستِ مرزها",
      "پروندهٔ تصمیم — چه تصمیمی، چرا، چه کسی",
      "PRD و ایجنتِ کیوایی که آن را می‌سنجد",
    ],
  },
  en: {
    title: "The product we carry through",
    lede:
      "Nobody builds a private toy on the side. Two real products sit on the table and each chapter moves one of them forward.",
    items: [
      {
        tag: "Chapters 1–2",
        name: "Nafas",
        what: "A companion for the moment of crisis",
        body:
          "A product where one wrong answer has a real cost. On it you write the boundaries: what never gets handed to the model, and by what rule an output is rejected.",
        out: [
          "The standing instruction",
          "The rubric",
          "The stopping condition",
          "The boundary list",
        ],
      },
      {
        tag: "Chapters 3–7",
        name: "Hamghadam",
        what: "Finding and booking a therapy session",
        body:
          "Its central tension: every question you ask improves the match and increases the drop-off. It starts from a four-sentence brief and runs all the way to agents, a PRD, and flows with acceptance criteria.",
        out: ["The evidence table", "Two personas", "Eight use cases", "A PRD", "A QA agent"],
      },
    ],
    caseTitle: "One full research round, with the real numbers",
    caseLede:
      "These are that project's outputs, built the way the course builds them — not a finished sample to admire, a path you run yourself.",
    stats: [
      { k: "depth interviews", v: "2" },
      { k: "secondary sources, credibility-graded", v: "16" },
      { k: "competitors reviewed", v: "11" },
      { k: "assumptions pulled from the brief", v: "10" },
      { k: "clusters, from 96 anchored notes", v: "27" },
      { k: "themes, each with two sources minimum", v: "7" },
      { k: "use cases with acceptance criteria", v: "8" },
      { k: "falsifiable rubric lines", v: "13" },
    ],
    lessonsTitle: "And what went wrong inside that same project",
    lessons: [
      {
        t: "A rule we wrote ourselves lost to our own data",
        d: "One rubric line was written before we saw any data, and our own desk research contradicted it. A rubric is your guess, and a guess does not outrank evidence.",
      },
      {
        t: "The strongest finding of the whole study was set aside",
        d: "Four independent sources backed it. Working on it would have meant deciding the success metric — one of the five things that never gets delegated.",
      },
      {
        t: "We wrote questions for something questions cannot answer",
        d: "Eight behavioural questions, and none of them could say where in the funnel people drop. We found that out at synthesis, not while writing the guide.",
      },
    ],
    filesTitle: "The folder you hold at the end",
    files: [
      "The brief and ten assumptions, each with how to test it",
      "The evidence table — every claim with a quote and a line number",
      "The affinity map — 8 categories, 27 clusters, 96 notes",
      "Two personas, evidence only, with a “what we do not know” section",
      "Eight use cases and flows, failure paths included",
      "rubric.md and the boundary list",
      "The decision log — what, why, and who decided",
      "A PRD, and the QA agent that measures against it",
    ],
  },
} as const;
