import type { Lang } from "@/lib/i18n";

/**
 * متنِ صفحهٔ تکِ دوره، لندینگ کارگاه و کارت مقایسهٔ نسخه‌ها.
 *
 * چیزهایی که عدد توشون هست تابع شدن نه رشته، چون جای عدد توی جملهٔ فارسی و
 * انگلیسی یکی نیست («۵۵ ساعت ویدیو» در برابر «55 hours of video») و با
 * چسبوندنِ ساده جمله‌ها توی یکی از دو زبان می‌شکست.
 */

export const COURSE = {
  fa: {
    back: "بازگشت به دوره‌ها",
    students: "دانشجو",
    videoHours: (n: string) => `${n} ساعت ویدیو`,
    mentoringHours: (n: string) => `${n} ساعت منتورینگ`,
    support: (n: string) => `پشتیبانی ${n} ماهه`,
    projects: (n: string) => `${n} پروژه عملی`,
    discount: (n: string) => `↓ ${n}٪ تخفیف`,
    supportNote: "برای ثبت‌نام و مشاوره، در تلگرام به پشتیبانی پیام بده",
    counterpart: {
      offline: "نسخه آفلاین همین دوره:",
      infinity: "نسخه بی‌نهایت با منتورینگ:",
    },

    basics: {
      title: "اصلاً UI و UX چی هستن؟",
      focus: "تمرکز این دوره",
      goodFor: "این دوره به درد کیا می‌خوره؟",
    },

    overview: [
      { num: "۰۱", label: "چی یاد می‌گیری" },
      { num: "۰۲", label: "این دوره برای کیه" },
      { num: "۰۳", label: "بعد از دوره چی داری" },
    ],

    prerequisites: "قبلش چی باید بلد باشی؟",

    curriculum: {
      title: "سرفصل‌های دوره",
      chapters: (n: string) => `${n} فصل`,
    },

    roadmap: {
      title: "مسیر یادگیری، قدم به قدم",
      body: "از صفر شروع می‌کنی و هر قدم روی قدم قبلی سوار می‌شه — آخرش یه خروجی واقعی داری.",
    },

    mentoring: {
      title: "جلسات منتورینگ چطوره؟",
      weeksNum: "۱۰",
      weeks: "هفته",
      body: "هر هفته یه جلسه گروهی آنلاین — پروژه‌ها بررسی میشن، فیدبک مستقیم می‌گیری و از فیدبک بقیه هم یاد می‌گیری",
      items: [
        { num: "۱", title: "جلسه گروهی", desc: "همه هم‌دوره‌ای‌ها با هم. از فیدبک بقیه هم یاد می‌گیری." },
        { num: "۲", title: "بررسی پروژه", desc: "کار هفته قبل بررسی میشه — نقاط قوت، ضعف و راه بهبود." },
        { num: "۳", title: "فردی یا گروهی", desc: "پروژه رو تنها انجام بده یا با یه هم‌دوره‌ای. انتخاب با خودته." },
        { num: "۴", title: "ضبط جلسات", desc: "همه جلسات ضبط میشن. هیچ جلسه‌ای از دست نمیره." },
      ],
    },

    faq: "سوالات پرتکرار",
    testimonials: "دانشجوها می‌گن",

    work: {
      title: "نمونه‌کار دانشجوها",
      all: "همه‌ی نمونه‌کارها",
    },

    certificate: {
      title: "گواهی پایان دوره، قابل استعلام",
      body: "بعد از اتمام دوره گواهی می‌گیری که یه کد یکتا داره — هر کسی (و هر کارفرمایی) می‌تونه اعتبارش رو همین‌جا روی سایت چک کنه.",
      cta: "استعلام گواهی",
    },

    instructor: {
      avatar: "م",
      role: "طراح UI/UX — @mojtabaui",
      all: "دیدن همه دوره‌ها",
    },

    guarantees: "چی تحویل می‌گیری؟",

    finalCta: {
      title: "هنوز مطمئن نیستی این دوره مناسبته؟",
      body: "قبل از ثبت‌نام بپرس. توی تلگرام بگو الان کجای مسیری و چی می‌خوای — اگه این دوره برات مناسب نبود، خودم صادقانه می‌گم.",
      telegram: "مشاوره و ثبت‌نام در تلگرام",
      compare: "مقایسه با بقیه دوره‌ها",
    },

    heroVisual: { hours: "ساعت ویدیو" },

    compare: {
      title: "کدوم نسخه به تو می‌خوره؟",
      body: "محتوای ویدیویی هر دو نسخه دقیقاً یکیه. فرق‌شون توی همراهیه.",
      details: "جزئیات دوره",
      infinity: {
        name: "بی‌نهایت",
        tag: "ثبت‌نام بسته",
        desc: "برای کسی که می‌خواد کنارش کسی باشه. ثبت‌نامش فعلاً باز نیست.",
        rows: [
          "۵۵ ساعت ویدیوی کامل",
          "۵ پروژه عملی",
          "۲۰ ساعت منتورینگ زنده",
          "برنامه‌ی هفتگی و گروه هم‌دوره‌ای",
          "فیدبک مستقیم روی کارت",
          "گواهی پایان دوره",
        ],
      },
      offline: {
        name: "آفلاین",
        tag: "الان باز است",
        desc: "همون محتوا و همون برنامه‌ی هفتگی، با تمپوی خودت.",
        rows: [
          "۵۵ ساعت ویدیوی کامل",
          "۵ پروژه عملی",
          "۲۰ ساعت منتورینگ زنده",
          "برنامه‌ی هفتگی",
          "پشتیبانی تلگرامی ۱۲ ماهه",
          "گواهی پایان دوره",
        ],
      },
    },

    workshop: {
      back: "بازگشت به دوره‌ها",
      badge: "کارگاه زنده — ظرفیت محدود",
      hours: (n: string) => `${n} ساعت`,
      capacity: (n: string) => `ظرفیت ${n} نفر`,
      bonus: "همراه با کتابخانه‌ی پرامپت و فایل‌های آموزشی",
      values: [
        { title: "هوشمندتر کار کن", sub: "نه سخت‌تر" },
        { title: "بهتر طراحی کن", sub: "با قدرت هوش مصنوعی" },
        { title: "سریع‌تر تحویل بده", sub: "با اطمینان" },
      ],
      pillars: {
        title: "مسیر کارگاه در ۵ قدم",
        body: "از ریسرچ تا تحویل — با Claude کنارت در هر مرحله",
        items: [
          { fa: "ریسرچ و اینسایت", desc: "از دیتای خام تا persona و journey map" },
          { fa: "ایده و کانسپت", desc: "ایده‌پردازی، یوزرفلو و UX writing" },
          { fa: "دیزاین‌سیستم", desc: "توکن، کامپوننت و مستندسازی" },
          { fa: "پروتوتایپ کدمحور", desc: "با Artifacts — بدون برنامه‌نویس" },
          { fa: "تحویل و بهبود", desc: "نقد، ممیزی و هندآف" },
        ],
      },
      curriculum: {
        title: "دو جلسه، شش ساعت",
        body: "دستی و تعاملی روی یه پروژه‌ی واقعی",
        sessions: ["جلسه اول", "جلسه دوم"],
        nums: ["۰۱", "۰۲"],
        length: "۳ ساعت",
      },
      outcomes: ["چی یاد می‌گیری", "این کارگاه برای کیه", "بعد از کارگاه چی داری"],
      outcomeNums: ["۰۱", "۰۲", "۰۳"],
      faq: "سوالات پرتکرار",
      finalCta: { line1: "آماده‌ای Claude رو", line2: "وارد کارت کنی؟" },
      priceLine: (price: string, capacity: string) => `${price} · ظرفیت ${capacity} نفر`,
    },
  },

  en: {
    back: "Back to courses",
    students: "students",
    videoHours: (n: string) => `${n} hours of video`,
    mentoringHours: (n: string) => `${n} hours of mentoring`,
    support: (n: string) => `${n} months of support`,
    projects: (n: string) => `${n} hands-on projects`,
    discount: (n: string) => `↓ ${n}% off`,
    supportNote: "To enrol or ask questions, message support on Telegram",
    counterpart: {
      offline: "The offline version of this course:",
      infinity: "The Infinity version, with mentoring:",
    },

    basics: {
      title: "What actually are UI and UX?",
      focus: "What this course focuses on",
      goodFor: "Who is this course for?",
    },

    overview: [
      { num: "01", label: "What you learn" },
      { num: "02", label: "Who it's for" },
      { num: "03", label: "What you walk away with" },
    ],

    prerequisites: "What do you need to know first?",

    curriculum: {
      title: "The curriculum",
      chapters: (n: string) => `${n} chapters`,
    },

    roadmap: {
      title: "The path, step by step",
      body: "You start from zero and every step stands on the one before it — at the end you have something real to show.",
    },

    mentoring: {
      title: "How do the mentoring sessions work?",
      weeksNum: "10",
      weeks: "weeks",
      body: "One live group session a week — projects get reviewed, you get direct feedback, and you learn from everyone else's feedback too",
      items: [
        { num: "1", title: "A group session", desc: "The whole cohort together. You learn from other people's feedback as well." },
        { num: "2", title: "Project review", desc: "Last week's work gets reviewed — what works, what doesn't, how to fix it." },
        { num: "3", title: "Alone or in a group", desc: "Do the project on your own or with a classmate. Your call." },
        { num: "4", title: "Every session recorded", desc: "All sessions are recorded. You never lose one." },
      ],
    },

    faq: "Frequently asked",
    testimonials: "What students say",

    work: {
      title: "Student work",
      all: "All student work",
    },

    certificate: {
      title: "A certificate you can verify",
      body: "When you finish you get a certificate with a unique code on it — anyone, an employer included, can check it right here on the site.",
      cta: "Verify a certificate",
    },

    instructor: {
      avatar: "M",
      role: "UI/UX designer — @mojtabaui",
      all: "See all courses",
    },

    guarantees: "What you actually get",

    finalCta: {
      title: "Still not sure this course is the right one?",
      body: "Ask before you enrol. Tell me on Telegram where you are and what you want — if this course isn't right for you, I'll say so honestly.",
      telegram: "Ask and enrol on Telegram",
      compare: "Compare with the other courses",
    },

    heroVisual: { hours: "hours of video" },

    compare: {
      title: "Which version suits you?",
      body: "The video content of both versions is exactly the same. What differs is the company you keep.",
      details: "Course details",
      infinity: {
        name: "Infinity",
        tag: "Enrolment closed",
        desc: "For someone who wants a person alongside them. Enrolment isn't open at the moment.",
        rows: [
          "55 hours of full video",
          "5 hands-on projects",
          "20 hours of live mentoring",
          "A weekly plan and a cohort group",
          "Direct feedback on your work",
          "Certificate of completion",
        ],
      },
      offline: {
        name: "Offline",
        tag: "Open now",
        desc: "The same material and the same weekly plan, at your own tempo.",
        rows: [
          "55 hours of full video",
          "5 hands-on projects",
          "20 hours of live mentoring",
          "A weekly plan",
          "12 months of Telegram support",
          "Certificate of completion",
        ],
      },
    },

    workshop: {
      back: "Back to courses",
      badge: "Live workshop — limited places",
      hours: (n: string) => `${n} hours`,
      capacity: (n: string) => `${n} places`,
      bonus: "Comes with the prompt library and the workshop files",
      values: [
        { title: "Work smarter", sub: "not harder" },
        { title: "Design better", sub: "with AI behind you" },
        { title: "Ship faster", sub: "and with confidence" },
      ],
      pillars: {
        title: "The workshop in 5 steps",
        body: "From research to handoff — with Claude beside you at every step",
        items: [
          { fa: "Research and insight", desc: "From raw data to personas and journey maps" },
          { fa: "Ideas and concept", desc: "Ideation, user flows and UX writing" },
          { fa: "Design system", desc: "Tokens, components and documentation" },
          { fa: "Code-based prototype", desc: "With Artifacts — no developer needed" },
          { fa: "Deliver and improve", desc: "Critique, audit and handoff" },
        ],
      },
      curriculum: {
        title: "Two sessions, six hours",
        body: "Hands-on and interactive, on a real project",
        sessions: ["First session", "Second session"],
        nums: ["01", "02"],
        length: "3 hours",
      },
      outcomes: ["What you learn", "Who this workshop is for", "What you walk away with"],
      outcomeNums: ["01", "02", "03"],
      faq: "Frequently asked",
      finalCta: { line1: "Ready to bring Claude", line2: "into your work?" },
      priceLine: (price: string, capacity: string) => `${price} · ${capacity} places`,
    },
  },
} as const;

export type CourseDict = (typeof COURSE)[Lang];
