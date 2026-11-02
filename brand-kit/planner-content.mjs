/**
 * محتوای برنامهٔ هفتگی — از روی «UI Infinity 2024 Planner.pdf» و
 * «UX Infinity 2024 Planner.pdf». نسخه‌های آفلاین همین محتوا را دارند.
 *
 * فقط غلط‌های املایی درست شده‌اند (developement، styeguide،
 * fundemantal، definiton و نیم‌فاصله‌ها). شمارهٔ تسک‌های UI از هفتهٔ ۵
 * به بعد پشت سر هم شده؛ در فایل اصلی هفته‌های ۴ تا ۷ همه «تسک هفت»
 * بودند.
 *
 * ساختار هر هفته:
 *   videos: [شمارهٔ فصل، عنوان]
 *   tasks:  { n, title, desc, optional?, or? }   n = null یعنی «تسک نهایی»
 *   review: true  → هفتهٔ بررسی پروژه، بدون ویدیو و تسک
 */

const reviewWeek = { review: true };

export const UI_PLAN = [
  {
    videos: [
      [1, "UX introduction"],
      [2, "A brief history of web development"],
      [3, "Figma basics"],
      [4, "Visual design trends"],
    ],
    tasks: [
      { n: 1, title: "ساخت حساب در فیگما", desc: "مطابق ویدیوها، در سایت فیگما حساب بسازید." },
      { n: 2, title: "طراحی مینی‌پروژه یا کپی از طرح", desc: "یا مثل من در فصل سوم صفحات آنبوردینگ طراحی کنید، یا یک طرح از سایت Dribbble بردارید و آن را عیناً کپی کنید." },
    ],
  },
  {
    videos: [
      [5, "Visual design principles"],
      [6, "UI fundamentals — Layout"],
      [7, "UI fundamentals — Space system"],
      [8, "UI fundamentals — Color theory"],
      [9, "UI fundamentals — Typography"],
    ],
    tasks: [
      { n: 3, title: "شرکت در فرم ترجیح انجام پروژه", desc: "در فرمی که در کانال قرار گرفته شرکت کنید." },
      { n: 4, title: "انتخاب موضوع پروژه", desc: "بر اساس گروه تعیین‌شده یا کار انفرادی، از جدول موضوع‌ها یک موضوع انتخاب کنید. تا انتهای دوره روی همین موضوع کار خواهید کرد." },
    ],
  },
  {
    videos: [
      [10, "UI fundamentals — Images"],
      [11, "UI fundamentals — Elevation"],
      [12, "UI fundamentals — Iconography"],
      [13, "Podcast concept"],
      [14, "Creating a styleguide"],
    ],
    tasks: [
      { n: 5, title: "انتخاب پالت رنگی پروژه", desc: "با مشورت گروه یا به‌صورت انفرادی رنگ‌بندی پروژه را تعیین کنید." },
      { n: 6, title: "ساخت استایل‌گاید پروژه", desc: "رنگ‌بندی، تایپوگرافی، سیستم فاصله، سیستم گرید، آیکون‌گرافی، دکمه‌ها، اینپوت‌ها و…" },
    ],
  },
  {
    videos: [
      [15, "Design system"],
      [16, "Atomic design"],
      [17, "Advanced Figma"],
    ],
    tasks: [
      { n: 7, title: "طراحی بخش هیرو (وب) یا صفحهٔ خانه (اپ)", desc: "با اعضای گروه، اولین بخش پروژه را طراحی کنید." },
    ],
  },
  {
    videos: [
      [18, "Components encyclopedia"],
      [24, "Smart home landing"],
    ],
    tasks: [
      { n: 8, title: "طراحی صفحهٔ خانهٔ پروژه", desc: "با اعضای گروه یا به‌تنهایی، کل صفحهٔ خانهٔ پروژه را طراحی کنید." },
    ],
  },
  {
    videos: [
      [19, "Responsive design"],
      [20, "UI fundamentals — Interaction"],
    ],
    tasks: [
      { n: 9, title: "طراحی ریسپانسیو پروژه", desc: "با اعضای گروه یا به‌تنهایی، پروژه را به‌صورت ریسپانسیو طراحی کنید." },
    ],
  },
  {
    videos: [[25, "Instaplus dashboard"]],
    tasks: [
      { n: 10, title: "طراحی صفحات دیگر پروژه", desc: "اگر وقت دارید، صفحه‌های دیگر پروژه را طراحی کنید." },
    ],
  },
  {
    videos: [
      [22, "Mockup and presentation"],
      [23, "Design hand-off"],
    ],
    tasks: [
      { n: 11, title: "طراحی صفحات دیگر پروژه", desc: "اگر وقت دارید، صفحه‌های دیگر پروژه را طراحی کنید." },
      { n: 12, title: "طراحی اینتراکشن", desc: "برای پروژهٔ خود اینتراکشن و تعامل طراحی کنید.", optional: true },
    ],
  },
  reviewWeek,
  {
    videos: [],
    tasks: [
      { n: null, title: "ارائه و ژورنال کار", desc: "کار را برای اشتراک در کامیونیتی فیگما، اینستاگرام و… آماده کنید." },
    ],
  },
];

export const UX_PLAN = [
  {
    videos: [
      [1, "UX fundamentals"],
      [2, "Software engineering history"],
      [3, "Design thinking"],
      [4, "Design mindsets"],
      [5, "Miro tutorial"],
      [6, "FigJam tutorial"],
    ],
    tasks: [
      { n: 1, title: "ساخت حساب در فیگجم یا میرو", desc: "مطابق ویدیوها، حساب بسازید." },
      { n: 2, title: "تحلیل نیاز سه محصول", desc: "سه محصول دیجیتال (اپلیکیشن یا وب‌سایت) مثل اسنپ یا تپسی را انتخاب کنید و نوع رفع نیاز را در هرکدام بررسی و تحلیل کنید." },
    ],
  },
  {
    videos: [
      [7, "Empathize — Introduction"],
      [8, "Empathize — Qualitative research"],
      [9, "Empathize — Quantitative research"],
    ],
    tasks: [
      { n: 3, title: "شرکت در فرم ترجیح انجام پروژه", desc: "در فرمی که در کانال قرار گرفته شرکت کنید." },
      { n: 4, title: "انتخاب موضوع پروژه", desc: "بر اساس گروه تعیین‌شده یا کار انفرادی، از جدول موضوع‌ها یک موضوع انتخاب کنید. تا انتهای دوره روی همین موضوع کار خواهید کرد." },
    ],
  },
  {
    videos: [
      [10, "Empathize — Quantitative tools"],
      [11, "Define — Fundamentals"],
    ],
    tasks: [
      { n: 5, title: "انجام فاز Planning", desc: "یک فاز برنامه‌ریزی تمرینی بنویسید: نیازها، اهداف ریسرچ و…" },
      { n: 6, title: "نوشتن سؤالات مصاحبه", desc: "سؤالات مصاحبه با کاربر را به‌صورت گروهی یا انفرادی بنویسید." },
      { n: 7, title: "نوشتن سؤالات پرسشنامه", desc: "سؤالات پرسشنامهٔ کاربر را به‌صورت گروهی یا انفرادی بنویسید.", or: true },
    ],
  },
  {
    videos: [
      [12, "Ideate"],
      [13, "Define — Persona"],
      [14, "Define — Customer journey map"],
    ],
    tasks: [
      { n: 8, title: "انجام مصاحبه یا اشتراک پرسشنامه", desc: "هر نفر حداقل با یک کاربر مصاحبه کند یا پرسشنامهٔ کاربری را به اشتراک بگذارد." },
      { n: 9, title: "تحلیل اولیهٔ دادهٔ کمی و کیفی", desc: "داده‌های جمع‌آوری‌شده را آنالیز و تحلیل کنید." },
    ],
  },
  {
    videos: [[15, "Define — Problem definition"]],
    tasks: [
      { n: 10, title: "ایده‌پردازی", desc: "دست‌کم دو متد ایده‌پردازی را اجرا کنید: طوفان فکری، ۵ چرا، نقشهٔ ذهنی و…" },
      { n: 11, title: "نمودار همبستگی", desc: "برای پروژهٔ خود یک نمودار همبستگی رسم کنید." },
    ],
  },
  {
    videos: [[16, "IA — Fundamentals"]],
    tasks: [
      { n: 12, title: "نوشتن پرسونا", desc: "هر تیم دست‌کم ۳ پرسونا بسازد." },
      { n: 13, title: "ساخت سناریوی کاربر یا CJM", desc: "برای پرسوناها سناریو یا CJM بنویسید." },
    ],
  },
  {
    videos: [
      [17, "Information architecture — User flow"],
      [18, "Information architecture — Sitemap"],
    ],
    tasks: [
      { n: 14, title: "تعریف دقیق مسئله", desc: "نیاز را دقیق و کامل تعریف کنید." },
      { n: 15, title: "ساخت دست‌کم ۷ تسک‌فلو", desc: "دست‌کم ۷ تسک‌فلو برای پروژهٔ خود بسازید." },
      { n: 16, title: "ساخت سایت‌مپ", desc: "سایت‌مپ پروژهٔ خود را بنویسید." },
    ],
  },
  {
    videos: [
      [19, "Card sorting"],
      [20, "Tree testing"],
      [21, "Prototype and wireframe"],
    ],
    tasks: [
      { n: 17, title: "نوشتن وایرفریم", desc: "وایرفریم صفحه‌های موجود در سایت‌مپ را بنویسید." },
      { n: 18, title: "تست مرتب‌سازی کارت", desc: "از سایت‌مپ خود تست بگیرید.", optional: true },
    ],
  },
  reviewWeek,
  {
    videos: [],
    tasks: [
      { n: null, title: "کیس استادی", desc: "کیس استادیِ پروژه را بسازید." },
      { n: null, title: "تست کاربر", desc: "تست‌های کاربری مثل تست پنج‌ثانیه و… را در Maze انجام دهید.", optional: true },
    ],
  },
];

export const PLANS = {
  "ui-infinity": UI_PLAN,
  "ui-offline": UI_PLAN,
  "ux-infinity": UX_PLAN,
  "ux-offline": UX_PLAN,
};
