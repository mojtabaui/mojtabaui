import type { Lang } from "@/lib/i18n";

/**
 * متنِ صفحه‌های فهرستی — دوره‌ها، رایگان‌ها، نمونه‌کارها، چک‌لیست، گواهی و مقاله.
 *
 * عنوان‌های لاتینِ تزئینی (COURSES، FREE، WORK…) اینجا نیستن چون توی هر دو
 * زبان یکی‌ان و ترجمه‌شون فقط شلوغی اضافه می‌کرد.
 *
 * ارقامِ داخل متن هم مثل بقیهٔ دیکشنری‌ها با زبان عوض می‌شن؛ برای عددهایی که
 * از داده میان، تابعِ fa/en سرِ خودِ صفحه انتخاب می‌شه.
 */

export const PAGES = {
  fa: {
    courses: {
      metaTitle: "دوره‌ها | مدرسه دیزاین ملینا",
      metaDescription:
        "دوره‌های طراحی رابط و تجربه کاربری، از مقدماتی تا حرفه‌ای، همه با منتورینگ.",
      title: "دوره‌ها",
      body: "از مقدماتی تا حرفه‌ای. همه‌ی دوره‌ها منتورینگ دارن؛ بعضی‌ها هیبریدن و بعضی آفلاین برگزار می‌شن.",
      instructor: "مجتبا یزدانپناه",
      experience: "۸ سال تجربه",
      portraitAlt: "مجتبا یزدانپناه، مدرس دوره‌ها",
      stats: { courses: "دوره", hours: "ساعت آموزش", projects: "پروژه عملی" },
    },

    free: {
      metaTitle: "منابع رایگان | مدرسه دیزاین ملینا",
      metaDescription:
        "ویدیو، ویس و فایل آماده برای یادگیری طراحی رابط و تجربه کاربری. بدون ثبت‌نام.",
      title: "آموزش‌های رایگان",
      body: "ویدیو، ویس و فایل آماده. بدون ثبت‌نام، بردار و استفاده کن.",
      sections: {
        courses: {
          title: "دوره‌های رایگان",
          desc: "دوره‌ها و کتابچه‌ی رایگان، روی کانال تلگرام. بدون ثبت‌نام",
        },
        voices: {
          title: "ویس‌های رایگان",
          desc: "پادکست‌های کوتاه برای شنیدن در مسیر",
        },
        files: {
          title: "فایل‌های رایگان",
          desc: "تمپلیت، کیت و چک‌لیست آماده",
        },
      },
      download: "دانلود رایگان",
      cta: {
        courseCta: "شروع دوره در تلگرام",
        voiceCta: "گوش بده در تلگرام",
        fileCta: "دریافت در تلگرام",
      },
      outro: {
        title: "می‌خوای عمیق‌تر یاد بگیری؟",
        body: "دوره‌های بی‌نهایت شامل ویدیو کامل، منتورینگ ۱۰ هفته‌ای و پروژه واقعیه.",
        button: "مشاهده دوره‌ها",
      },
    },

    projects: {
      metaTitle: "نمونه کارها | مدرسه دیزاین ملینا",
      metaDescription:
        "پروژه‌های واقعی دانشجوهای دوره‌های رابط و تجربه کاربری، روی فیگما یا به شکل کیس استادی.",
      title: "نمونه کارها",
      body: "پروژه‌های واقعی دانشجوهای دوره‌های رابط و تجربه کاربری، روی فیگما یا به شکل کیس استادی.",
      filters: { all: "همه", ui: "رابط کاربری", ux: "تجربه کاربری" },
      empty: "به‌زودی پروژه‌ها اضافه می‌شن...",
      openFigma: "باز کن در Figma",
      downloadPdf: "دانلود PDF",
      outro: {
        title: "می‌خوای پروژه‌ات اینجا باشه؟",
        body: "دوره بی‌نهایت رو بخر، پروژه بزن، اینجا نمایش بده.",
        button: "مشاهده دوره‌ها",
      },
    },

    checklist: {
      metaTitle: "چک‌لیست یادگیری طراحی محصول | مدرسه دیزاین ملینا",
      metaDescription:
        "مسیر کامل یادگیری طراحی رابط کاربری و تجربه کاربری از صفر، به ترتیب و بدون حدس زدن. دو مسیر مجزا با آیتم‌های مشخص.",
      title: "چک‌لیست یادگیری از صفر",
      body: "بیشتر آدم‌ها به‌خاطر نداشتن منبع شکست نمی‌خورن، به‌خاطر نداشتن ترتیب شکست می‌خورن. این همون ترتیبیه که توی دوره‌ها طی می‌کنیم، برای هر دو مسیر رابط کاربری و تجربه کاربری.",
      stats: { tracks: "مسیر", stages: "مرحله", items: "آیتم" },
      trackStages: "مرحله",
      trackItems: "آیتم",
      index: "فهرست مسیر",
      courseNoteBefore: "این مرحله رو قدم به قدم توی",
      courseNoteAfter: "با پروژه و فیدبک کار می‌کنیم.",
      courseCta: "ثبت‌نام در دوره",
      outro: {
        title: "این مسیر رو تنها نرو",
        body: "همه‌ی این چک‌لیست رو می‌شه خودت جلو بری. فقط معمولاً وسط راه گیر می‌کنی و کسی نیست بگه کجا رو اشتباه رفتی. کار ما دقیقاً همینه.",
        courses: "دیدن دوره‌ها",
        consult: "مشاوره‌ی رایگان",
      },
    },

    certificates: {
      metaTitle: "استعلام گواهی | مدرسه دیزاین ملینا",
      metaDescription:
        "اعتبار گواهی دوره‌های مدرسه دیزاین ملینا را با کد گواهی بررسی کنید.",
      title: "استعلام گواهی",
      body: "هر گواهی ملینا یک کد یکتا داره. کد رو وارد کن تا اعتبارش رو همین‌جا ببینی.",
      sampleAlt: "نمونه گواهی مدرسه دیزاین ملینا",
      steps: [
        {
          title: "کد رو از روی گواهی بردار",
          desc: "روی هر گواهی یک کد یکتا چاپ شده. همون رو کپی کن.",
        },
        {
          title: "توی کادر واردش کن",
          desc: "اعداد فارسی، حروف کوچک و خط تیره هم قبوله. خودمون مرتبش می‌کنیم.",
        },
        {
          title: "نتیجه رو ببین",
          desc: "اگر گواهی معتبر باشه، نام دانشجو و دوره‌ش رو نشون می‌دیم.",
        },
      ],
      stepNums: ["۰۱", "۰۲", "۰۳"],
      help: {
        title: "کدت جواب نداد؟",
        body: "اگر مطمئنی کد درسته ولی پیدا نشد، یک پیام بده تا دستی بررسیش کنم.",
        link: "پیام در تلگرام",
      },
    },

    certificate: {
      notFoundTitle: "گواهی یافت نشد | مدرسه دیزاین ملینا",
      titleFor: (name: string) => `گواهی ${name} | مدرسه دیزاین ملینا`,
      descriptionFor: (name: string, code: string) =>
        `گواهی پایان دوره‌ی ${name} با کد ${code}`,
      back: "استعلام گواهی دیگر",
      valid: "این گواهی معتبر است",
      dragHint: "برای دیدن کامل، افقی بکش →",
      printNote:
        "برای ذخیره به صورت PDF، دکمه‌ی بالا را بزنید و در پنجره‌ی چاپ مقصد را روی «Save as PDF» بگذارید. اندازه‌ی کاغذ روی A4 افقی تنظیم شده است.",
    },

    articles: {
      metaTitle: "مقالات | مدرسه دیزاین ملینا",
      metaDescription:
        "آموزش‌های متنی طراحی رابط و تجربه کاربری، هوش مصنوعی برای طراح‌ها و مسیر بازار کار.",
      title: "مقالات",
      body: "آموزش متنی، نکته‌های عملی و تجربه‌های واقعی از طراحی محصول. همه رایگان.",
      /** توی نسخهٔ انگلیسی بالای فهرست می‌شینه؛ در فارسی لازم نیست */
      persianOnly: "",
      newest: "تازه‌ترین",
      read: "بخون",
      minutes: "دقیقه",
      readTime: "دقیقه مطالعه",
      all: "ALL ARTICLES",
      author: "مجتبا یزدانپناه",
      back: "بازگشت به مقالات",
      download: "دانلود",
      cta: {
        title: "سوالی برات پیش اومد؟",
        body: "اگر جایی از این مطلب برات مبهم بود یا می‌خوای بدونی کدوم دوره به کارت میاد، در تلگرام بپرس. خودم جواب می‌دم.",
        telegram: "پرسیدن در تلگرام",
        courses: "دیدن دوره‌ها",
      },
      keepReading: "KEEP READING",
    },

    dashboard: {
      greeting: (name: string) => `سلام، ${name} 👋`,
      memberSince: (date: string) => `عضو از ${date}`,
      nav: { courses: "دوره‌های من", licenses: "لایسنس‌ها", profile: "پروفایل" },
      payment: {
        success: "✓ پرداخت موفق بود. لایسنس شما در پنل فعال شده است.",
        failed: "پرداخت ناموفق بود. در صورت کسر مبلغ، ظرف ۷۲ ساعت بازگشت داده می‌شه.",
      },
      stats: {
        purchased: "دوره خریداری‌شده",
        licenses: "لایسنس فعال",
        paid: "تومان پرداخت‌شده",
      },
      sectionTitle: "دوره‌ها و لایسنس‌ها",
      empty: "هنوز دوره‌ای خریداری نکردی",
      browse: "مشاهده دوره‌ها",
      paid: "موفق",
      license: "لایسنس اسپات پلیر",
      expires: "انقضا:",
      lifetime: "مادام‌العمر",
      spotplayer: "ورود به اسپات پلیر",
      pending:
        "لایسنس در حال پردازش است. اگه بعد از چند دقیقه هنوز ندیدی باهام در تماس باش.",
      purchasedOn: (date: string) => `تاریخ خرید: ${date}`,
      currency: "تومان",
      more: {
        title: "دوره بیشتری می‌خوای یاد بگیری؟",
        body: "همه دوره‌ها در یه جا",
        button: "مشاهده دوره‌ها",
      },
    },
  },

  en: {
    courses: {
      metaTitle: "Courses | Melina Design School",
      metaDescription:
        "UI and UX design courses, from first steps to professional — every one of them mentored.",
      title: "Courses",
      body: "From first steps to professional. Every course is mentored; some run hybrid, some run offline.",
      instructor: "Mojtaba Yazdanpanah",
      experience: "8 years of practice",
      portraitAlt: "Mojtaba Yazdanpanah, who teaches the courses",
      stats: { courses: "courses", hours: "hours of teaching", projects: "hands-on projects" },
    },

    free: {
      metaTitle: "Free resources | Melina Design School",
      metaDescription:
        "Videos, voice notes and ready-made files for learning UI and UX design. No sign-up.",
      title: "Free material",
      body: "Videos, voice notes and ready-made files. No sign-up — take them and use them.",
      sections: {
        courses: {
          title: "Free courses",
          desc: "Free courses and the handbook, on the Telegram channel. No sign-up",
        },
        voices: {
          title: "Free voice notes",
          desc: "Short podcasts to listen to on the way",
        },
        files: {
          title: "Free files",
          desc: "Templates, kits and ready-made checklists",
        },
      },
      download: "Free download",
      cta: {
        courseCta: "Start the course on Telegram",
        voiceCta: "Listen on Telegram",
        fileCta: "Get it on Telegram",
      },
      outro: {
        title: "Want to go deeper?",
        body: "The Infinity courses come with the full video, ten weeks of mentoring and a real project.",
        button: "Browse courses",
      },
    },

    projects: {
      metaTitle: "Student work | Melina Design School",
      metaDescription:
        "Real projects by students of the UI and UX courses, on Figma or as case studies.",
      title: "Student work",
      body: "Real projects by students of the UI and UX courses, on Figma or written up as case studies.",
      filters: { all: "All", ui: "UI design", ux: "UX design" },
      empty: "Projects are being added soon…",
      openFigma: "Open in Figma",
      downloadPdf: "Download PDF",
      outro: {
        title: "Want your project up here?",
        body: "Take an Infinity course, build the project, show it here.",
        button: "Browse courses",
      },
    },

    checklist: {
      metaTitle: "Product design learning checklist | Melina Design School",
      metaDescription:
        "The full path for learning UI and UX design from zero — in order, with nothing left to guess. Two separate tracks with concrete items.",
      title: "The learning checklist, from zero",
      body: "Most people don't fail for want of material, they fail for want of an order. This is the order we follow in the courses, for both the UI and the UX track.",
      stats: { tracks: "tracks", stages: "stages", items: "items" },
      trackStages: "stages",
      trackItems: "items",
      index: "Contents of the",
      courseNoteBefore: "We work through this stage step by step in",
      courseNoteAfter: "with a project and feedback.",
      courseCta: "Enrol in the course",
      outro: {
        title: "Don't walk this path alone",
        body: "You can work through all of this yourself. It's just that you usually get stuck halfway, with nobody to tell you where you went wrong. That's exactly what we're for.",
        courses: "See the courses",
        consult: "Free consultation",
      },
    },

    certificates: {
      metaTitle: "Verify a certificate | Melina Design School",
      metaDescription:
        "Check whether a Melina Design School course certificate is valid, using its code.",
      title: "Verify a certificate",
      body: "Every Melina certificate carries a unique code. Enter it and see its status right here.",
      sampleAlt: "A sample Melina Design School certificate",
      steps: [
        {
          title: "Take the code off the certificate",
          desc: "Every certificate has a unique code printed on it. Copy that.",
        },
        {
          title: "Type it into the box",
          desc: "Persian digits, lowercase letters and dashes are all fine. We tidy it up.",
        },
        {
          title: "Read the result",
          desc: "If the certificate is valid, we show the student's name and their course.",
        },
      ],
      stepNums: ["01", "02", "03"],
      help: {
        title: "Code didn't work?",
        body: "If you're sure the code is right but it wasn't found, send a message and I'll check it by hand.",
        link: "Message on Telegram",
      },
    },

    certificate: {
      notFoundTitle: "Certificate not found | Melina Design School",
      titleFor: (name: string) => `${name}'s certificate | Melina Design School`,
      descriptionFor: (name: string, code: string) =>
        `Course completion certificate for ${name}, code ${code}`,
      back: "Verify another certificate",
      valid: "This certificate is valid",
      dragHint: "← Drag sideways to see it all",
      printNote:
        "To save it as a PDF, press the button above and set the destination in the print dialog to “Save as PDF”. The paper size is already set to A4 landscape.",
    },

    articles: {
      metaTitle: "Articles | Melina Design School",
      metaDescription:
        "Written lessons on UI and UX design, AI for designers, and finding your way into the job market.",
      title: "Articles",
      body: "Written lessons, practical notes and real experience from product design. All free.",
      persianOnly:
        "These articles are written in Persian. The site chrome follows your language, but the pieces themselves have not been translated.",
      newest: "Newest",
      read: "Read it",
      minutes: "min",
      readTime: "min read",
      all: "ALL ARTICLES",
      author: "Mojtaba Yazdanpanah",
      back: "Back to articles",
      download: "Download",
      cta: {
        title: "Something you want to ask?",
        body: "If any part of this was unclear, or you want to know which course fits you, ask on Telegram. I answer myself.",
        telegram: "Ask on Telegram",
        courses: "See the courses",
      },
      keepReading: "KEEP READING",
    },

    dashboard: {
      greeting: (name: string) => `Hello, ${name} 👋`,
      memberSince: (date: string) => `Member since ${date}`,
      nav: { courses: "My courses", licenses: "Licences", profile: "Profile" },
      payment: {
        success: "✓ Payment went through. Your licence is now active in the panel.",
        failed:
          "The payment failed. If money was taken, it comes back within 72 hours.",
      },
      stats: {
        purchased: "courses bought",
        licenses: "active licences",
        paid: "toman paid",
      },
      sectionTitle: "Courses and licences",
      empty: "You haven't bought a course yet",
      browse: "Browse courses",
      paid: "Paid",
      license: "SpotPlayer licence",
      expires: "Expires:",
      lifetime: "Never",
      spotplayer: "Open SpotPlayer",
      pending:
        "The licence is being issued. If you still don't see it after a few minutes, get in touch.",
      purchasedOn: (date: string) => `Bought on ${date}`,
      currency: "toman",
      more: {
        title: "Want to learn something else?",
        body: "Every course in one place",
        button: "Browse courses",
      },
    },
  },
} as const;

export type PagesDict = (typeof PAGES)[Lang];
