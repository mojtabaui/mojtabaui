/**
 * برنامه‌ی هفتگی دوره‌های آفلاین.
 *
 * محتوا از پلنرهای ۲۰۲۴ اومده و دست‌نخورده مونده. فقط قالبش با هویت جدید
 * بازطراحی شده: کرم و مشکی برند، با لهجه‌ی قرمز برای رابط کاربری و آبی برای
 * تجربه کاربری، همون رنگ‌هایی که توی خود سایت به این دو دوره داده شده.
 */

export interface PlannerTask {
  title: string;
  desc?: string;
}

export interface PlannerWeek {
  n: string;
  chapters: { n: string; title: string }[];
  tasks: PlannerTask[];
  /** یادداشت پایین صفحه، مثل توضیح اصطلاح */
  note?: string;
  /** وقتی باید یکی از تسک‌ها انتخاب بشه نه همه */
  either?: boolean;
}

export interface Planner {
  track: "ui" | "ux";
  title: string;
  latin: string;
  accent: string;
  tint: string;
  weeks: PlannerWeek[];
}

const startNotes = [
  {
    lead: "صفر و صدی ویدیو نبین!",
    body: "اینکه برای یادگیری مشتاق باشی خیلی خوبه، ولی اینکه به یک باره در یک هفته دوره رو سریالی ببینی باعث هیچ اتفاق خوبی نمی‌شه. بجاش تلاش کن کنار ویدیوها تسک انجام بدی و به برنامه‌ی هفتگی وفادار باشی.",
  },
  {
    lead: "با بقیه ارتباط بگیر.",
    body: "این دوره کنار کانال، یک گروه داره که بقیه‌ی اونایی که دوره رو تهیه کردن داخلش عضون. حتما با اونا شبکه سازی کن.",
  },
  {
    lead: "پشتیبانی دوره و بررسی تسک‌ها تماما داخل تلگرامه!",
    body: "اگر داخل فضای دیگه‌ای مثل اینستاگرام و... برای من تسک فرستادی و چک نشد مسئولیتش با خودته. من تلگرام رو برای پشتیبانی اختصاص دادم و اونجا با من در ارتباط باش.",
  },
  {
    lead: "حتما بصورت روزانه کانال رو چک کن.",
    body: "موقعیت‌های کاری، فایل‌های کمکی و... همه اونجا قرار میگیره.",
  },
];

export const START_NOTES = startNotes;

const ui: Planner = {
  track: "ui",
  title: "دوره طراحی رابط کاربری",
  latin: "USER INTERFACE DESIGN",
  accent: "#dc2626",
  tint: "#FFF0EE",
  weeks: [
    {
      n: "۱",
      chapters: [
        { n: "یک", title: "UX introduction" },
        { n: "دو", title: "A brief history of web development" },
        { n: "سه", title: "Figma basics" },
        { n: "چهار", title: "Visual design trends" },
      ],
      tasks: [
        { title: "تسک یک: ساخت حساب در فیگما", desc: "مطابق ویدیوها، در سایت فیگما حساب بسازید." },
        {
          title: "تسک دو: طراحی مینی پروژه یا کپی از طرح",
          desc: "یا مثل من در فصل سوم صفحات آنبوردینگ طراحی کنید، و یا یک طرح از سایت dribbble برداشته و آن را عینا کپی کنید.",
        },
      ],
    },
    {
      n: "۲",
      chapters: [
        { n: "پنج", title: "Visual design principles" },
        { n: "شش", title: "UI fundamentals · Layout" },
        { n: "هفت", title: "UI fundamentals · Space system" },
        { n: "هشت", title: "UI fundamentals · Color theory" },
        { n: "نه", title: "UI fundamentals · Typography" },
      ],
      tasks: [
        {
          title: "تسک سه: انتخاب موضوع پروژه",
          desc: "بر اساس لیست موضوعات قرار گرفته در کانال، یک موضوع را انتخاب کرده و در فرم انتخاب موضوع در کانال وارد کنید.",
        },
      ],
    },
    {
      n: "۳",
      chapters: [
        { n: "ده", title: "UI fundamentals · Images" },
        { n: "یازده", title: "UI fundamentals · Elevation" },
        { n: "دوازده", title: "UI fundamentals · Iconography" },
        { n: "سیزده", title: "Podcast Concept" },
        { n: "چهارده", title: "Creating styleguide" },
      ],
      tasks: [
        {
          title: "تسک چهار: ساخت استایل گاید پروژه",
          desc: "رنگ بندی، تایپوگرافی، سیستم فاصله، سیستم گرید، آیکن گرافی، دکمه‌ها و اینپوت‌ها و...",
        },
      ],
    },
    {
      n: "۴",
      chapters: [
        { n: "پانزده", title: "Design system" },
        { n: "شانزده", title: "Atomic design" },
        { n: "هفده", title: "Advanced Figma" },
      ],
      tasks: [
        { title: "تسک پنج: اگر موضوعتون لندینگه", desc: "طراحی بخش هیرو" },
        { title: "اگر موضوعتون فروشگاهیه", desc: "طراحی ۲ الی ۳ بنر" },
        { title: "اگر موضوعتون اپلیکیشنه", desc: "طراحی صفحه خانه" },
      ],
      note: "بخش هیرو: اولین سکشن سایت در لندینگ پیج‌ها، مثل ردلینک و زرین‌پال.",
    },
    {
      n: "۵",
      chapters: [
        { n: "هجده", title: "Components encyclopedia" },
        { n: "بیست و چهار", title: "Smart home Landing" },
      ],
      tasks: [
        { title: "تسک شش: طراحی صفحه خانه پروژه", desc: "کل صفحه خانه پروژه را طراحی کنید." },
      ],
    },
    {
      n: "۶",
      chapters: [
        { n: "نوزده", title: "Responsive design" },
        { n: "بیست", title: "UI fundamentals · Interaction" },
      ],
      tasks: [
        { title: "تسک هفت: اگر موضوعتون لندینگه", desc: "طراحی ریسپانسیو گوشی" },
        { title: "اگر موضوعتون فروشگاهیه", desc: "طراحی ریسپانسیو گوشی" },
        { title: "اگر موضوعتون اپلیکیشنه", desc: "طراحی صفحات دیگه" },
      ],
    },
    {
      n: "۷",
      chapters: [{ n: "بیست و پنج", title: "Instaplus dashboard" }],
      tasks: [
        { title: "تسک هشت: طراحی صفحات دیگر پروژه", desc: "برای طراحی صفحات دیگر وقت بگذارید." },
      ],
    },
    {
      n: "۸",
      chapters: [
        { n: "بیست و دو", title: "Mockup and presentation" },
        { n: "بیست و سه", title: "Design hand-off" },
      ],
      tasks: [
        {
          title: "تسک نهایی: ارائه کار",
          desc: "آماده‌سازی کار برای اشتراک در کامیونیتی فیگما، اینستا و...",
        },
      ],
    },
  ],
};

const ux: Planner = {
  track: "ux",
  title: "دوره طراحی تجربه کاربری",
  latin: "USER EXPERIENCE DESIGN",
  accent: "#1d4ed8",
  tint: "#EEF3FF",
  weeks: [
    {
      n: "۱",
      chapters: [
        { n: "یک", title: "UX fundamentals" },
        { n: "دو", title: "Software Engineering history" },
        { n: "سه", title: "Design thinking" },
        { n: "چهار", title: "Design mindsets" },
        { n: "پنج", title: "Miro Tutorial" },
        { n: "شش", title: "Figjam Tutorial" },
      ],
      tasks: [
        { title: "تسک یک: ساخت حساب در فیگجم یا میرو", desc: "مطابق ویدیوها، حساب بسازید." },
      ],
    },
    {
      n: "۲",
      chapters: [
        { n: "هفت", title: "Empathize · Introduction" },
        { n: "هشت", title: "Empathize · Qualitative research" },
        { n: "نه", title: "Empathize · Quantitative research" },
      ],
      tasks: [
        {
          title: "تسک دو: انتخاب موضوع پروژه",
          desc: "بر اساس لیست موضوعات قرار گرفته در کانال، یک موضوع را انتخاب کرده و در فرم انتخاب موضوع در کانال وارد کنید.",
        },
      ],
    },
    {
      n: "۳",
      chapters: [
        { n: "ده", title: "Empathize · Quantitative tools" },
        { n: "یازده", title: "Define · Fundamentals" },
      ],
      either: true,
      tasks: [
        {
          title: "تسک سه: نوشتن سوالات مصاحبه",
          desc: "سوالات مصاحبه با کاربر را بصورت گروهی یا انفرادی بنویسید.",
        },
        {
          title: "تسک سه: نوشتن سوالات پرسشنامه",
          desc: "سوالات پرسشنامه کاربر را بصورت گروهی یا انفرادی بنویسید.",
        },
      ],
    },
    {
      n: "۴",
      chapters: [
        { n: "دوازده", title: "Ideate" },
        { n: "سیزده", title: "Define · Persona" },
        { n: "چهارده", title: "Define · Customer journey map" },
      ],
      tasks: [
        {
          title: "تسک چهار: انجام مصاحبه یا پرسشنامه",
          desc: "هر نفر حداقل با کاربر مصاحبه کند و پرسشنامه کاربری را به اشتراک گذارید.",
        },
        {
          title: "تسک پنج: تحلیل اولیه داده کمی و کیفی",
          desc: "داده‌های جمع‌آوری شده را آنالیز و تحلیل کنید.",
        },
      ],
    },
    {
      n: "۵",
      chapters: [{ n: "پانزده", title: "Define · Problem definition" }],
      tasks: [
        {
          title: "تسک شش: ایده پردازی",
          desc: "انجام حداقل یک متد ایده پردازی: طوفان فکری، ۵ چرا، نقشه ذهنی و...",
        },
        { title: "تسک هفت: نمودار همبستگی", desc: "برای پروژه خود یک نمودار همبستگی رسم کنید." },
      ],
    },
    {
      n: "۶",
      chapters: [{ n: "شانزده", title: "IA · Fundamentals" }],
      tasks: [
        { title: "تسک هشت: نوشتن پرسونا", desc: "هر فرد حداقل ۳ پرسونا بسازد." },
        { title: "تسک نه: ساخت سناریوی کاربر", desc: "برای پرسوناها سناریو بنویسید." },
      ],
    },
    {
      n: "۷",
      chapters: [
        { n: "هفده", title: "Information architecture · User flow" },
        { n: "هجده", title: "Information architecture · Sitemap" },
      ],
      tasks: [
        { title: "تسک ده: ساخت تسک فلو", desc: "حداقل ۵ تسک فلو برای پروژه خود بسازید." },
        { title: "تسک یازده: ساخت سایت مپ", desc: "سایت مپ پروژه خود را بنویسید." },
      ],
    },
    {
      n: "۸",
      chapters: [
        { n: "نوزده", title: "Card sorting" },
        { n: "بیست", title: "Tree testing" },
        { n: "بیست و یک", title: "Prototype and wireframe" },
      ],
      tasks: [
        { title: "تسک دوازده: نوشتن وایرفریم", desc: "وایرفریم صفحات موجود در سایت مپ را بنویسید." },
        { title: "تسک نهایی: کیس استادی", desc: "ساخت کیس استادی مربوط به پروژه." },
      ],
    },
  ],
};

export const planners: Record<"ui" | "ux", Planner> = { ui, ux };
