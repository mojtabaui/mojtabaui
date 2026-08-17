import type { Lang } from "@/lib/i18n";

/**
 * متنِ فرم‌ها و ویجت‌های تعاملی — چیزهایی که خودشون صفحه نیستن ولی توی
 * چند صفحه تکرار می‌شن.
 *
 * پیام‌های خطا هم اینجان، نه داخل کامپوننت. خطا هم بخشی از متنِ سایته و
 * اگه فارسی بمونه، توی نسخهٔ انگلیسی درست همون‌جایی می‌زنه بیرون که کاربر
 * از همه بیشتر بهش نگاه می‌کنه.
 */

export const FORMS = {
  fa: {
    contact: {
      name: "نام",
      namePlaceholder: "اسمت",
      email: "ایمیل",
      phone: "شماره تماس",
      optional: "(اختیاری)",
      message: "پیام",
      messagePlaceholder: "سوالت رو بنویس...",
      submit: "ارسال پیام",
      sending: "در حال ارسال...",
      required: "نام، ایمیل و پیام رو پر کن",
      failed: "خطا در ارسال — دوباره تلاش کن",
      error: "خطایی رخ داد",
      sentTitle: "پیامت رسید ✓",
      sentBody: "در اولین فرصت جوابت رو می‌دم.",
      sentAgain: "ارسال پیام دیگر",
    },

    notify: {
      title: "اطلاع از تخفیف‌ها",
      subtitle: "شماره‌ت رو بذار، خبرت می‌کنیم",
      phone: "شماره موبایل",
      name: "نام",
      optional: "(اختیاری)",
      namePlaceholder: "اسمت",
      submit: "می‌خوام از تخفیف‌ها باخبر شم",
      sending: "در حال ثبت...",
      needPhone: "شماره موبایلت رو وارد کن",
      failed: "خطا در ارسال — دوباره تلاش کن",
      error: "خطایی رخ داد",
      note: "فقط برای اطلاع‌رسانی تخفیف و دوره‌های جدید — اسپم نمی‌فرستیم.",
      doneTitle: "ثبت شد ✓",
      doneBody: "زمان تخفیف‌ها و ثبت‌نام‌های ویژه رو برات پیامک می‌کنیم.",
    },

    lookup: {
      label: "کد گواهی",
      hint: "کد درج‌شده روی گواهی — حروف کوچک و اعداد فارسی هم قبوله",
      submit: "استعلام گواهی",
      checking: "در حال بررسی...",
      needCode: "کد گواهی را وارد کنید",
      error: "خطایی رخ داد",
      failed: "خطا در برقراری ارتباط — دوباره تلاش کن",
      valid: "گواهی معتبر است",
      studentName: "نام دانشجو",
      course: "دوره",
      startDate: "تاریخ شروع",
      view: "مشاهده و دانلود گواهی",
      notFoundTitle: "گواهی یافت نشد",
      notFoundBody:
        "کدی با این شماره در سوابق ما ثبت نشده. اگه مطمئنی کد درسته، باهام تماس بگیر.",
    },

    print: {
      download: "دانلود PDF",
      building: "در حال ساخت PDF…",
      failed: "ساختِ PDF ناموفق بود. دوباره تلاش کن.",
    },

    buy: {
      closed: "ثبت‌نام باز نیست",
      closedNote: "تاریخِ برگزاریِ دوره‌ی بعدی به‌زودی اعلام می‌شود",
      telegram: "ثبت‌نام و مشاوره در تلگرام",
    },

    login: {
      title: "خوش برگشتی",
      subtitle: "وارد حسابت شو و دوره‌هاتو ببین",
      registered: "ثبت‌نام موفق بود — الان وارد شو",
      email: "ایمیل",
      password: "رمز عبور",
      forgot: "فراموشی رمز",
      remember: "مرا به خاطر بسپار",
      submit: "ورود",
      submitting: "در حال ورود...",
      wrong: "ایمیل یا رمز عبور اشتباه است",
      noAccount: "حساب نداری؟",
      register: "ثبت‌نام کن",
    },

    register: {
      title: "بیا شروع کنیم",
      subtitle: "حساب رایگان بساز و یاد بگیر",
      name: "نام و نام‌خانوادگی",
      namePlaceholder: "مثلاً علی احمدی",
      email: "ایمیل",
      phone: "شماره موبایل",
      password: "رمز عبور",
      passwordPlaceholder: "حداقل ۸ کاراکتر",
      termsBefore: "با",
      terms: "قوانین و مقررات",
      termsAfter: "سایت موافقم",
      needTerms: "پذیرش قوانین الزامی است",
      shortPassword: "رمز عبور باید حداقل ۸ کاراکتر باشد",
      error: "خطایی رخ داد",
      submit: "ثبت‌نام",
      submitting: "در حال ثبت‌نام...",
      haveAccount: "قبلاً ثبت‌نام کردی؟",
      login: "وارد شو",
    },

    logout: "خروج از حساب",
  },

  en: {
    contact: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      phone: "Phone",
      optional: "(optional)",
      message: "Message",
      messagePlaceholder: "Write your question…",
      submit: "Send message",
      sending: "Sending…",
      required: "Name, email and message are all needed",
      failed: "Could not send — try again",
      error: "Something went wrong",
      sentTitle: "Got your message ✓",
      sentBody: "I'll get back to you as soon as I can.",
      sentAgain: "Send another message",
    },

    notify: {
      title: "Discount alerts",
      subtitle: "Leave your number and we'll let you know",
      phone: "Mobile number",
      name: "Name",
      optional: "(optional)",
      namePlaceholder: "Your name",
      submit: "Tell me about discounts",
      sending: "Saving…",
      needPhone: "Enter your mobile number",
      failed: "Could not send — try again",
      error: "Something went wrong",
      note: "Only for discounts and new courses — no spam.",
      doneTitle: "You're on the list ✓",
      doneBody: "We'll text you when discounts and special enrolments open.",
    },

    lookup: {
      label: "Certificate code",
      hint: "The code printed on the certificate — lowercase and Persian digits are fine",
      submit: "Verify certificate",
      checking: "Checking…",
      needCode: "Enter the certificate code",
      error: "Something went wrong",
      failed: "Connection failed — try again",
      valid: "This certificate is valid",
      studentName: "Student",
      course: "Course",
      startDate: "Start date",
      view: "View and download the certificate",
      notFoundTitle: "No certificate found",
      notFoundBody:
        "No certificate with that code is on our records. If you're sure the code is right, get in touch.",
    },

    print: {
      download: "Download PDF",
      building: "Building the PDF…",
      failed: "The PDF could not be built. Try again.",
    },

    buy: {
      closed: "Enrolment is closed",
      closedNote: "The date of the next run will be announced soon",
      telegram: "Enrol and ask questions on Telegram",
    },

    login: {
      title: "Welcome back",
      subtitle: "Sign in and pick up your courses",
      registered: "You're registered — now sign in",
      email: "Email",
      password: "Password",
      forgot: "Forgot password",
      remember: "Remember me",
      submit: "Sign in",
      submitting: "Signing in…",
      wrong: "That email or password is wrong",
      noAccount: "No account yet?",
      register: "Create one",
    },

    register: {
      title: "Let's get started",
      subtitle: "Make a free account and start learning",
      name: "Full name",
      namePlaceholder: "e.g. Ali Ahmadi",
      email: "Email",
      phone: "Mobile number",
      password: "Password",
      passwordPlaceholder: "At least 8 characters",
      termsBefore: "I agree to the",
      terms: "terms and conditions",
      termsAfter: "of the site",
      needTerms: "You have to accept the terms",
      shortPassword: "The password must be at least 8 characters",
      error: "Something went wrong",
      submit: "Create account",
      submitting: "Creating your account…",
      haveAccount: "Already registered?",
      login: "Sign in",
    },

    logout: "Sign out",
  },
} as const;

export type FormsDict = (typeof FORMS)[Lang];
