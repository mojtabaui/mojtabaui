/**
 * برنامه‌ی هفتگی دوره‌های آفلاین.
 *
 * محتوا از پلنرهای ۲۰۲۴ اومده و دست‌نخورده مونده. فقط قالبش با هویت جدید
 * بازطراحی شده: کرم و مشکی برند، با لهجه‌ی قرمز برای رابط کاربری و آبی برای
 * تجربه کاربری، همون رنگ‌هایی که توی خود سایت به این دو دوره داده شده.
 */

/** لینک کمکیِ کنار یک تسک — ویدیو، فرم، یا هر چیز دیگه */
export interface PlannerLink {
  label: string;
  href: string;
  /** توضیح کوتاه، وقتی خود عنوان کافی نیست */
  hint?: string;
}

export interface PlannerTask {
  title: string;
  desc?: string;
  /** منابع کمکی. در نسخهٔ چاپی آدرسشون هم کنارش می‌آد چون کلیک نمی‌شه. */
  links?: PlannerLink[];
}

export interface PlannerWeek {
  n: string;
  chapters: { n: string; title: string }[];
  tasks: PlannerTask[];
  /** یادداشت پایین صفحه، مثل توضیح اصطلاح */
  note?: string;
  /** وقتی باید یکی از تسک‌ها انتخاب بشه نه همه */
  either?: boolean;
  /**
   * منابع کمکیِ همین هفته، انتخاب‌شده برای تسکِ همین هفته نه کل دوره.
   * همه‌ی آدرس‌ها قبل از اضافه شدن تست شدن که باز می‌شن.
   */
  resources?: PlannerLink[];
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
          links: [
            {
              label: "توضیح این تسک در کانال",
              href: "https://t.me/c/2119219647/2971/2979",
            },
          ],
        },
      ],
      resources: [
        {
          label: "Figma · Learn Design",
          href: "https://www.figma.com/resources/learn-design/",
          hint: "آموزش رسمی خود فیگما، از صفر",
        },
        {
          label: "Dribbble",
          href: "https://dribbble.com/",
          hint: "برای پیدا کردن طرحی که ازش کپی کنید",
        },
        { label: "راهنمای فیگما", href: "https://help.figma.com/" },
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
          desc: "یک موضوع از فهرست انتخاب کنید و همان‌جا ثبتش کنید. اگر موضوع دلخواه خودتان را دارید، تیک «موضوع دلخواه» را بزنید و اول با منتور هماهنگ کنید.",
          links: [
            {
              label: "فهرست موضوع‌ها و ثبت انتخاب",
              href: "https://mojtabaui.ir/project",
              hint: "رمز دوره را از کانال بردارید",
            },
          ],
        },
      ],
      resources: [
        {
          label: "Laws of UX",
          href: "https://lawsofux.com/",
          hint: "قانون‌های چیدمان و ادراک، کوتاه و با مثال",
        },
        {
          label: "Type Scale",
          href: "https://typescale.com/",
          hint: "ساخت مقیاس تایپوگرافی",
        },
        { label: "Coolors", href: "https://coolors.co/", hint: "ساخت پالت رنگ" },
        {
          label: "WebAIM Contrast Checker",
          href: "https://webaim.org/resources/contrastchecker/",
          hint: "چک کنید متن روی رنگ زمینه خوانا باشد",
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
      resources: [
        {
          label: "Material Design · Styles",
          href: "https://m3.material.io/styles",
          hint: "ببینید یک استایل گاید واقعی چه چیزهایی دارد",
        },
        {
          label: "Lucide Icons",
          href: "https://lucide.dev/",
          hint: "ست آیکن یکدست و رایگان",
        },
        {
          label: "فونت وزیرمتن",
          href: "https://github.com/rastikerdar/vazirmatn",
          hint: "فونت فارسی با وزن‌های کامل",
        },
        {
          label: "Untitled UI",
          href: "https://untitledui.com/",
          hint: "نمونهٔ یک استایل گاید حرفه‌ای",
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
      resources: [
        {
          label: "Atomic Design",
          href: "https://atomicdesign.bradfrost.com/",
          hint: "کتاب کامل و رایگان، همان مفهوم فصل شانزده",
        },
        {
          label: "Figma · کامپوننت و لایبرری",
          href: "https://www.figma.com/best-practices/components-styles-and-shared-libraries/",
        },
        {
          label: "Land-book",
          href: "https://land-book.com/",
          hint: "هزاران نمونهٔ لندینگ برای دیدن هیرو",
        },
      ],
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
      resources: [
        {
          label: "Mobbin",
          href: "https://mobbin.com/",
          hint: "اسکرین‌شات صفحهٔ واقعی اپ‌ها و سایت‌ها",
        },
        {
          label: "Godly",
          href: "https://godly.website/",
          hint: "سایت‌هایی که طراحی‌شان سر و گردن بالاتر است",
        },
        {
          label: "Material Design · Components",
          href: "https://m3.material.io/components",
          hint: "دایرةالمعارف کامپوننت، مکمل فصل هجده",
        },
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
      resources: [
        {
          label: "Material Design · Foundations",
          href: "https://m3.material.io/foundations",
          hint: "چیدمان در اندازه‌های مختلف صفحه",
        },
        {
          label: "Apple Human Interface Guidelines",
          href: "https://developer.apple.com/design/human-interface-guidelines",
          hint: "مرجع طراحی اپ موبایل",
        },
        {
          label: "Refactoring UI",
          href: "https://www.refactoringui.com/",
          hint: "نکته‌های ریزی که کار آماتور را حرفه‌ای می‌کند",
        },
      ],
    },
    {
      n: "۷",
      chapters: [{ n: "بیست و پنج", title: "Instaplus dashboard" }],
      tasks: [
        { title: "تسک هشت: طراحی صفحات دیگر پروژه", desc: "برای طراحی صفحات دیگر وقت بگذارید." },
      ],
      resources: [
        {
          label: "UI Patterns",
          href: "https://ui-patterns.com/",
          hint: "الگوهای آماده برای صفحه‌هایی که نمی‌دانید چطور بچینید",
        },
        {
          label: "Mobbin",
          href: "https://mobbin.com/",
          hint: "این بار دنبال صفحه‌های داشبورد و تنظیمات بگردید",
        },
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
      resources: [
        {
          label: "Figma Community",
          href: "https://www.figma.com/community",
          hint: "هم فایل موکاپ آماده دارد، هم جایی که کارتان را منتشر می‌کنید",
        },
        {
          label: "Behance",
          href: "https://www.behance.net/",
          hint: "ببینید بقیه پروژه‌شان را چطور ارائه می‌کنند",
        },
        {
          label: "UX Collective",
          href: "https://uxdesign.cc/",
          hint: "برای یاد گرفتن نوشتن کیس استادی",
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
      resources: [
        { label: "FigJam", href: "https://www.figma.com/figjam/" },
        { label: "Miro", href: "https://miro.com/" },
        {
          label: "IDEO Design Thinking",
          href: "https://designthinking.ideo.com/",
          hint: "از خودِ جایی که این روش را ساخت",
        },
        {
          label: "Interaction Design Foundation",
          href: "https://www.interaction-design.org/",
          hint: "مقاله‌های پایه‌ای تجربه کاربری",
        },
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
          desc: "یک موضوع از فهرست انتخاب کنید و همان‌جا ثبتش کنید. اگر موضوع دلخواه خودتان را دارید، تیک «موضوع دلخواه» را بزنید و اول با منتور هماهنگ کنید.",
          links: [
            {
              label: "فهرست موضوع‌ها و ثبت انتخاب",
              href: "https://mojtabaui.ir/project",
              hint: "رمز دوره را از کانال بردارید",
            },
          ],
        },
      ],
      resources: [
        {
          label: "کدام روش تحقیق، کِی؟",
          href: "https://www.nngroup.com/articles/which-ux-research-methods/",
          hint: "نیلسن نورمن، انتخاب بین روش‌های کمی و کیفی",
        },
        {
          label: "UX Research Cheat Sheet",
          href: "https://www.nngroup.com/articles/ux-research-cheat-sheet/",
          hint: "یک صفحه، همهٔ روش‌ها کنار هم",
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
      resources: [
        {
          label: "Interviewing Users",
          href: "https://www.nngroup.com/articles/interviewing-users/",
          hint: "چطور سؤال بپرسید که جواب واقعی بگیرید، نه جواب مؤدبانه",
        },
        {
          label: "پرس‌لاین",
          href: "https://porsline.ir/",
          hint: "ساخت پرسشنامهٔ فارسی",
        },
        { label: "Google Forms", href: "https://docs.google.com/forms/" },
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
      resources: [
        {
          label: "Personas",
          href: "https://www.nngroup.com/articles/persona/",
          hint: "پرسونا چیست و چطور از داده ساخته می‌شود",
        },
        {
          label: "Customer Journey Mapping",
          href: "https://www.nngroup.com/articles/customer-journey-mapping/",
          hint: "مکمل فصل چهارده",
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
      resources: [
        {
          label: "Affinity Diagramming",
          href: "https://www.nngroup.com/articles/affinity-diagram/",
          hint: "دقیقاً همان نمودار همبستگیِ تسک هفت",
        },
        {
          label: "Ideation in Practice",
          href: "https://www.nngroup.com/articles/ideation-in-practice/",
          hint: "متدهای ایده‌پردازی و اینکه کدام کِی جواب می‌دهد",
        },
      ],
    },
    {
      n: "۶",
      chapters: [{ n: "شانزده", title: "IA · Fundamentals" }],
      tasks: [
        { title: "تسک هشت: نوشتن پرسونا", desc: "هر فرد حداقل ۳ پرسونا بسازد." },
        { title: "تسک نه: ساخت سناریوی کاربر", desc: "برای پرسوناها سناریو بنویسید." },
      ],
      resources: [
        {
          label: "همه‌چیز دربارهٔ پرسونا",
          href: "https://www.nngroup.com/topic/personas/",
          hint: "مجموعه مقاله‌ها، از ساخت تا استفادهٔ درست",
        },
        {
          label: "Information Architecture",
          href: "https://www.nngroup.com/topic/information-architecture/",
          hint: "شروع فصل شانزده",
        },
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
      resources: [
        {
          label: "Wireflows",
          href: "https://www.nngroup.com/articles/wireflows/",
          hint: "ترکیب فلو و وایرفریم، دقیقاً چیزی که تسک ده می‌خواهد",
        },
        {
          label: "FlowMapp",
          href: "https://www.flowmapp.com/",
          hint: "ابزار آنلاین ساخت یوزرفلو و سایت‌مپ",
        },
        {
          label: "GlooMaps",
          href: "https://www.gloomaps.com/",
          hint: "سایت‌مپ سریع و بدون ثبت‌نام",
        },
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
      resources: [
        {
          label: "Card Sorting",
          href: "https://www.nngroup.com/articles/card-sorting-definition/",
          hint: "مکمل فصل نوزده",
        },
        {
          label: "Optimal Workshop",
          href: "https://www.optimalworkshop.com/",
          hint: "ابزار کارت سورتینگ و تری تستینگ",
        },
        { label: "Maze", href: "https://maze.co/", hint: "تست پروتوتایپ با کاربر واقعی" },
        {
          label: "UX Collective",
          href: "https://uxdesign.cc/",
          hint: "نمونه و راهنمای نوشتن کیس استادی",
        },
      ],
    },
  ],
};

export const planners: Record<"ui" | "ux", Planner> = { ui, ux };
