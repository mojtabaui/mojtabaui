/**
 * دوره‌هایی که از پنل برایشان لایسنس اسپات‌پلیر صادر می‌شه، به‌همراه
 * چیزهایی که نامهٔ خوش‌آمد لازم داره.
 *
 * API اسپات‌پلیر فهرست دوره‌ها رو برنمی‌گردونه، پس شناسه‌ها دستی
 * این‌جا نگه داشته می‌شن (از پنل اسپات‌پلیر، صفحهٔ هر دوره).
 * دوره‌ای که `spotplayerId` نداره توی فرم غیرفعال دیده می‌شه.
 */
export interface LicenseCourse {
  /** شناسهٔ دوره در پنل اسپات‌پلیر */
  spotplayerId: string;
  /** نام فارسی — توی فرم پنل و عنوان نامه */
  title: string;
  /** نام لاتین — کنار اسم خریدار توی نامه */
  latin: string;
  /** لینک دعوت گروه تلگرام — QR نامه همین‌جا می‌بره */
  group: string;
  /** روی چند دستگاه فعال می‌شه، همون عددی که در پنل اسپات‌پلیر ست شده */
  devices: number;
  /** آدرس صفحهٔ دوره، پایین نامه */
  site: string;
  /** جزوه‌ها جدا از پلیر و از طریق گروه می‌رسن */
  handouts?: boolean;
}

export const LICENSE_COURSES: LicenseCourse[] = [
  {
    spotplayerId: "", // TODO: شناسهٔ ROBOTYPE در اسپات‌پلیر
    title: "دورهٔ روبوتایپ",
    latin: "ROBOTYPE · AI Native Product Design",
    group: "https://t.me/+AheSyWBiz1xjM2U0",
    devices: 2,
    site: "mojtabaui.ir/robotype",
    handouts: true,
  },
  {
    spotplayerId: "68fe3145d8852c4a4b5e9928",
    title: "طراحی رابط کاربری",
    latin: "UI DESIGN",
    group: "",
    devices: 2,
    site: "mojtabaui.ir/courses/ui-offline",
  },
  {
    spotplayerId: "68ff836f8017a1db77232d83",
    title: "طراحی تجربه کاربری",
    latin: "UX DESIGN",
    group: "",
    devices: 2,
    site: "mojtabaui.ir/courses/ux-offline",
  },
  {
    spotplayerId: "618a71979252d004ce2d2423",
    title: "طراحی رابط کاربری بی‌نهایت",
    latin: "UI DESIGN INFINITY",
    group: "",
    devices: 2,
    site: "mojtabaui.ir/courses/ui-infinity",
  },
  {
    spotplayerId: "621642f271e6010501a6331b",
    title: "طراحی تجربه کاربری بی‌نهایت",
    latin: "UX DESIGN INFINITY",
    group: "",
    devices: 2,
    site: "mojtabaui.ir/courses/ux-infinity",
  },
  {
    spotplayerId: "63aae70c68b2746feee711f0",
    title: "طراحی پرتفولیو",
    latin: "PORTFOLIO DESIGN",
    group: "",
    devices: 2,
    site: "mojtabaui.ir/courses/portfolio",
  },
  {
    spotplayerId: "61e06f1991ef9f762b29a93c",
    title: "طراحی پروتوتایپ",
    latin: "PROTOTYPE DESIGN",
    group: "",
    devices: 2,
    site: "mojtabaui.ir/courses/prototype",
  },
];

/** آی‌دی پشتیبانی، پایین نامه */
export const SUPPORT_HANDLE = "@melina_support";

export const findLicenseCourse = (spotplayerId: string) =>
  LICENSE_COURSES.find((c) => c.spotplayerId && c.spotplayerId === spotplayerId);
