import { toPersianDigits } from "@/lib/persian-months";

/**
 * متن‌های فرم اپلای کوادکمپ، فارسی و انگلیسی.
 *
 * فقط همین یک مسیر دو زبانه‌ست — پنل و بقیهٔ سایت فارسی می‌مونن. دلیلش
 * اینه که اپلای تنها جاییه که ممکنه کسی از بیرون بازش کنه، پس هزینهٔ
 * ترجمه فقط اینجا می‌ارزه.
 *
 * قدم‌های راهنمای درایو JSX هستن نه رشته، چون توی متن فارسی اسم دکمه‌های
 * انگلیسی باید dir خودشون رو داشته باشن وگرنه پرانتز و نقطه جابه‌جا می‌شه.
 */

export type Lang = "fa" | "en";

export const LANGS: Lang[] = ["fa", "en"];

/** اسم هر زبان به خط خودش، برای دکمهٔ تعویض */
export const LANG_LABEL: Record<Lang, string> = {
  fa: "فارسی",
  en: "English",
};

/** حجم فایل با واحد و رقمِ همون زبان */
export function humanSize(bytes: number, lang: Lang): string {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) {
    const n = mb.toFixed(1);
    return lang === "fa" ? `${toPersianDigits(n)} مگابایت` : `${n} MB`;
  }
  const kb = Math.max(1, Math.round(bytes / 1024));
  return lang === "fa" ? `${toPersianDigits(kb)} کیلوبایت` : `${kb} KB`;
}

/** شمارهٔ قدم‌ها */
export function num(n: number, lang: Lang): string {
  return lang === "fa" ? toPersianDigits(n) : String(n);
}

export const COPY = {
  fa: {
    dir: "rtl" as const,
    eyebrow: "Quad Camp",
    title: "کارهات رو نشونمون بده",
    intro:
      "برای کوادکمپ دو چیز ازت می‌خوایم: لینک پرتفولیو و رزومه. رزومه رو یا همین‌جا آپلود کن، یا اگه آپلود جواب نداد بذارش روی گوگل درایو و لینکش رو بده — راهنماش هم همین پایین هست.",
    footer: "مشکلی پیش اومد؟ توی گروه پیام بده تا دستی ثبتش کنیم.",

    nameLabel: "اسم و فامیلت",
    namePlaceholder: "مثلاً: زهرا محمدی",

    portfolioLabel: "لینک پرتفولیوت",
    portfolioHint:
      "بی‌هنس، دریبل، سایت شخصی یا حتی یک فایل فیگما — هرجایی که کارهات رو گذاشتی. فقط حواست باشه بدون لاگین باز بشه.",

    resumeTitle: "رزومه‌ات",
    tabUpload: "آپلود فایل",
    tabLink: "لینک گوگل درایو",

    dropTitle: "فایل رزومه‌ات رو انتخاب کن",
    dropHint: "PDF، Word یا عکس — تا ۳ مگابایت",
    removeFile: "حذف فایل",
    fallbackToDrive: "آپلود جواب نمی‌ده؟ از گوگل درایو لینک بده",

    guideToggle: "چطور رزومه‌ام رو روی گوگل درایو بذارم؟",
    steps: [
      <>
        برو به <span dir="ltr">drive.google.com</span> و با اکانت گوگلت وارد شو.
      </>,
      <>فایل رزومه‌ات رو بکش و توی صفحه رها کن تا آپلود بشه.</>,
      <>
        وقتی آپلود تموم شد، روی فایل راست‌کلیک کن و <span dir="ltr">Share</span> رو
        بزن.
      </>,
      <>
        پایین پنجره، زیر <span dir="ltr">General access</span>، گزینه رو از{" "}
        <span dir="ltr">Restricted</span> بذار روی{" "}
        <span dir="ltr">Anyone with the link</span>.
      </>,
      <>
        <span dir="ltr">Copy link</span> رو بزن و لینک رو همین‌جا توی کادر بالا
        پیست کن.
      </>,
    ],
    guideWarning: (
      <>
        اگه دسترسی روی <span dir="ltr">Restricted</span> بمونه، لینک برای ما باز
        نمی‌شه و رزومه‌ات بررسی‌نشده می‌مونه. بعد از کپی، یک بار توی پنجرهٔ ناشناس
        بازش کن و مطمئن شو.
      </>
    ),
    openDrive: "باز کردن گوگل درایو",
    altHosts:
      "درایو در دسترست نیست؟ هر لینک عمومی دیگه‌ای هم قبوله — دراپ‌باکس، وان‌درایو یا حتی فایل رزومه توی پرتفولیوی خودت.",

    submit: "ثبت‌نام",
    submittingUpload: "در حال آپلود...",
    submittingLink: "در حال ثبت...",

    doneTitle: "ثبت شد",
    doneBody:
      "پرتفولیو و رزومه‌ات رسید دستمون. یکی‌یکی نگاهشون می‌کنیم و نتیجه رو بهت خبر می‌دیم.",
    doneNote:
      "اگه لینک درایو دادی، تا اون موقع دسترسی فایل رو روی «هر کسی که لینک داره» نگه دار.",
    doneAgain: "ثبت نفر بعدی",

    errName: "اسم و فامیلت رو کامل بنویس، مثل «زهرا محمدی»",
    errPortfolio: "لینک پرتفولیو باید کامل باشه و با https:// شروع بشه",
    errFileMissing: "فایل رزومه‌ات رو انتخاب کن، یا از تب کناری لینک درایو بده",
    errLinkMissing: "لینک رزومه باید کامل باشه و با https:// شروع بشه",
    errExt: "فقط PDF، Word یا عکس (JPG و PNG) قبول می‌شه.",
    errTooBig: (size: string) =>
      `این فایل ${size}ه و سقف ما ۳ مگابایته. بذارش روی گوگل درایو و لینکش رو بده.`,
    errUploadDropped:
      "فایل تا آخر نرفت — احتمالاً اینترنت وسط کار قطع شد. راه مطمئن‌تر اینه که بذاریش روی گوگل درایو.",
    errUploadRejected: "فایل فرستاده نشد. لینک درایوش رو بده.",
    errOffline: "به سرور وصل نشدیم. اینترنتت رو چک کن و دوباره بزن.",
    errGeneric: "یک جای کار ایراد داشت",
  },

  en: {
    dir: "ltr" as const,
    eyebrow: "Quad Camp",
    title: "Show us what you’ve made",
    intro:
      "Two things get you into Quad Camp: a link to your portfolio and your resume. Upload the resume here, or — if the upload won’t go through — put it on Google Drive and paste the link. The steps are right below.",
    footer: "Something broke? Message us in the group and we’ll add you by hand.",

    nameLabel: "Your full name",
    namePlaceholder: "e.g. Zahra Mohammadi",

    portfolioLabel: "Your portfolio link",
    portfolioHint:
      "Behance, Dribbble, a personal site, even a Figma file — wherever your work lives. Just make sure it opens without a login.",

    resumeTitle: "Your resume",
    tabUpload: "Upload a file",
    tabLink: "Google Drive link",

    dropTitle: "Choose your resume file",
    dropHint: "PDF, Word or an image — up to 3 MB",
    removeFile: "Remove file",
    fallbackToDrive: "Upload not working? Send a Google Drive link instead",

    guideToggle: "How do I put my resume on Google Drive?",
    steps: [
      <>
        Go to <span dir="ltr">drive.google.com</span> and sign in with your Google
        account.
      </>,
      <>Drag your resume file onto the page and let it upload.</>,
      <>
        Once it’s done, right-click the file and choose <span dir="ltr">Share</span>
        .
      </>,
      <>
        Near the bottom, under <span dir="ltr">General access</span>, switch{" "}
        <span dir="ltr">Restricted</span> to{" "}
        <span dir="ltr">Anyone with the link</span>.
      </>,
      <>
        Hit <span dir="ltr">Copy link</span> and paste it into the box above.
      </>,
    ],
    guideWarning: (
      <>
        If access stays on <span dir="ltr">Restricted</span>, the link won’t open
        for us and your resume goes unreviewed. After copying, open it once in an
        incognito window to be sure.
      </>
    ),
    openDrive: "Open Google Drive",
    altHosts:
      "No Drive access? Any public link works — Dropbox, OneDrive, or the resume file inside your own portfolio.",

    submit: "Apply",
    submittingUpload: "Uploading...",
    submittingLink: "Sending...",

    doneTitle: "You’re in the pile",
    doneBody:
      "Your portfolio and resume reached us. We go through them one by one and we’ll get back to you.",
    doneNote:
      "If you sent a Drive link, keep the file on “Anyone with the link” until then.",
    doneAgain: "Submit someone else",

    errName: "Write your full name, first and last — e.g. “Zahra Mohammadi”",
    errPortfolio: "The portfolio link has to be complete and start with https://",
    errFileMissing: "Pick your resume file, or switch to the other tab and send a Drive link",
    errLinkMissing: "The resume link has to be complete and start with https://",
    errExt: "Only PDF, Word or an image (JPG, PNG) is accepted.",
    errTooBig: (size: string) =>
      `That file is ${size} and our limit is 3 MB. Put it on Google Drive and send the link.`,
    errUploadDropped:
      "The file didn’t make it — the connection probably dropped mid-upload. Google Drive is the safer route.",
    errUploadRejected: "The file wasn’t accepted. Send its Drive link instead.",
    errOffline: "Couldn’t reach the server. Check your connection and try again.",
    errGeneric: "Something went wrong",
  },
} satisfies Record<Lang, Record<string, unknown>>;

/**
 * پیام خطاهای سرور.
 *
 * سرور کد می‌فرسته نه متن، چون متنش فارسیه و توی حالت انگلیسی وصله می‌زد.
 * اگه کدی اینجا نبود، همون متن فارسیِ سرور نشون داده می‌شه.
 */
export const SERVER_ERRORS: Record<Lang, Record<string, string>> = {
  fa: {},
  en: {
    body_too_large: "The file was too big or didn’t send properly. Shrink it or send a link.",
    name: "Write your full name, first and last — e.g. “Zahra Mohammadi”",
    portfolio_missing: "Add your portfolio link",
    portfolio_invalid: "The portfolio link has to be complete and start with https://",
    resume_missing: "Upload your resume, or paste its Google Drive link",
    resume_link_invalid: "The resume link has to be complete and start with https://",
    file_too_big: "The resume file has to be under 3 MB. Export it as a PDF or send a link.",
    file_type: "That format isn’t accepted. Send a PDF, Word file or an image.",
    file_mime: "The file doesn’t match its extension. Export it again from the original resume.",
  },
};
