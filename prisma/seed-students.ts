/**
 * وارد کردن دانشجوهای ورودی تیر ۱۴۰۵ به جدول StudentProject.
 *
 * اجرا:  npx tsx prisma/seed-students.ts
 * (آدرس دیتابیس از DATABASE_URL خونده می‌شه — باید پروداکشن باشه)
 *
 * چند نکته دربارهٔ دادهٔ خام:
 *  • هر کسی هر دو دوره رو گرفته، دو ردیف می‌گیره (یکی UI یکی UX)،
 *    چون هر ردیف یعنی «یک نفر در یک دوره» و پروژه‌اش جداست.
 *  • یادداشت‌های مالی که به اسم چسبیده بود («اقساطی ۲۶۰۰ مانده») از اسم
 *    جدا شده و توی فیلد note نشسته، تا اسم تمیز بمونه.
 *  • «محمد باقری» دو بار اومده، یک بار UI و یک بار UX. چون همین‌طور هم
 *    ثبت می‌شن (نام + دوره)، فرقی نمی‌کنه یک نفر باشه یا دو نفر.
 *  • «سمانه غزنوی» دوره‌هاش تعامل و پرتفولیوئه، نه UI/UX — عمداً وارد نشده.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const INTAKE = "1405-04"; // تیر ۱۴۰۵

type Goal = "UNKNOWN" | "LEARNING" | "EMPLOYMENT" | "FREELANCE" | "BOTH";
type Row = {
  name: string;
  ui: boolean;
  ux: boolean;
  note?: string;
  /** از معرفی خودش توی گروه تلگرام */
  background?: string;
  goal?: Goal;
};

const ROWS: Row[] = [
  { name: "هاله جمعه‌پور", ui: true, ux: true },
  { name: "محمدرضا قربانی", ui: true, ux: true },
  { name: "حمید انصاری", ui: false, ux: true },
  { name: "میکائیل جمالی", ui: true, ux: true, note: "اقساطی ۲۶۰۰ مانده" },
  { name: "امین الفتی", ui: false, ux: true },
  { name: "عطیه احتشام", ui: true, ux: false },
  { name: "مهدی الکن", ui: true, ux: false, note: "اقساطی ۱ مانده" },
  { name: "مهدی حسینی", ui: true, ux: false },
  { name: "مارال جوادپور", ui: true, ux: true, goal: "LEARNING", background: "۲۲ ساله. شش ماه آشنایی. دوره‌های رایگان، بدون سابقهٔ کاری" },
  { name: "مهسا هدایتی زنگنه", ui: true, ux: false },
  { name: "فائزه محمدی", ui: true, ux: true, goal: "FREELANCE", background: "۲۶ ساله. یک سال پروداکت دیزاینر. دوره‌های مدرسه دیزاین ویچ و مستر اینتراکشن، به‌علاوهٔ منتورینگ" },
  { name: "نسترن پورمهدی", ui: true, ux: true, goal: "EMPLOYMENT", background: "۲۳ ساله. دوره‌های رایگان. سه ماه عضو یک تیم و سه تمپلیت طراحی کرده. آشنا با فیگما" },
  { name: "زهرا فرشچیان", ui: true, ux: true, note: "اقساطی ۲۶۰۰" },
  { name: "زهرا امامی", ui: false, ux: true },
  { name: "مهرشاد روحی", ui: true, ux: false },
  { name: "مریم نام آوری", ui: true, ux: true },
  { name: "مبینا عبد داوودی", ui: true, ux: false },
  { name: "شمیم فرامرزی", ui: true, ux: false },
  { name: "محمد باقری", ui: true, ux: false },
  { name: "معصومه علما", ui: false, ux: true },
  { name: "محیا عاطف‌بخت", ui: true, ux: true, goal: "LEARNING", background: "۳۲ ساله. دانشجوی دکتری روان‌شناسی شناختی. خودآموز، بدون سابقهٔ حرفه‌ای" },
  { name: "مبینا حاجی احمد", ui: true, ux: true, goal: "EMPLOYMENT", background: "۲۲ ساله. چند دورهٔ فیگما در ۵ تا ۶ ماه اخیر. آشنا با فیگما و ایلاستریتور" },
  { name: "مبینا جربان", ui: true, ux: true },
  { name: "مرضیه دهقانی", ui: true, ux: true, note: "اقساطی ۲۶۰۰ مانده", goal: "EMPLOYMENT", background: "۲۳ ساله. پنج ماه آشنایی. دوره‌های رایگان یوتیوب. تا حدی فیگما. دنبال کار تیمی" },
  { name: "محمود سجادی", ui: true, ux: true, note: "۲۶۰۰ مانده" },
  { name: "مهنوش عزتی", ui: false, ux: true, note: "اقساطی ۱۵۰۰ مانده" },
  { name: "زهرا علیجانتبار", ui: true, ux: true, goal: "BOTH", background: "۲۹ ساله. دورهٔ رایگان UI/UX در یک سال اخیر، هنوز پروژه‌ای انجام نداده" },
  { name: "مطهره مسلمی", ui: true, ux: false },
  { name: "نیلوفر پروندی", ui: true, ux: true, note: "اقساطی ۲۶۰۰ مانده" },
  { name: "نگین شایسته نیا", ui: true, ux: true, note: "اقساطی ۲۶۰۰ مانده" },
  { name: "راضیه حسینی", ui: true, ux: true, note: "۳۴۶۰ مانده", goal: "FREELANCE", background: "دورهٔ رایگان UI/UX. مسلط به فیگما، فتوشاپ، المنتور و وردپرس. سایت razfolio.ir" },
  { name: "فاطمه رنجبر", ui: true, ux: true, goal: "LEARNING", background: "۲۲ ساله. سه ماه آشنایی با حوزه. دوره‌های رایگان. کمی فیگما، بدون سابقهٔ نرم‌افزاری" },
  { name: "مهدیس معمار منتظرین", ui: true, ux: true },
  { name: "نسرین محمودی", ui: true, ux: true },
  { name: "سینا عبدالله زاده", ui: true, ux: true },
  { name: "نوشین پارسا", ui: true, ux: true },
  { name: "محمد باقری", ui: false, ux: true },
  { name: "مینا شهیدانی", ui: true, ux: false },
  { name: "رهام زیدی نژاد", ui: false, ux: true },
  { name: "سارا دشتیانه", ui: true, ux: false },
  { name: "شادی وحدتی", ui: false, ux: true },
  { name: "زهرا امانی نژاد", ui: false, ux: true },
  { name: "نوید الهی", ui: true, ux: false },
  // توی خروجی ثبت‌نام نبود، از معرفی گروه اضافه شد. دوره‌ش هنوز تأیید نشده.
  { name: "مریم فرهنگی", ui: true, ux: true, note: "دوره تأیید نشده", goal: "BOTH", background: "۲۹ ساله. رشتهٔ معماری، در حال تغییر مسیر. دورهٔ UX گوگل. نرم‌افزارهای معماری، فتوشاپ، ایلاستریتور و کمی فیگما" },
];

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const rows: {
    studentName: string;
    track: "UI" | "UX";
    intakeMonth: string;
    note: string | null;
    background: string | null;
    goal: Goal;
  }[] = [];

  for (const r of ROWS) {
    const base = {
      intakeMonth: INTAKE,
      note: r.note ?? null,
      background: r.background ?? null,
      goal: r.goal ?? ("UNKNOWN" as const),
    };
    if (r.ui) rows.push({ studentName: r.name, track: "UI", ...base });
    if (r.ux) rows.push({ studentName: r.name, track: "UX", ...base });
  }

  // آنچه از قبل هست رو دوباره وارد نمی‌کنیم تا اجرای دوبارهٔ اسکریپت چیزی خراب نکنه
  const existing = await prisma.studentProject.findMany({
    where: { intakeMonth: INTAKE },
    select: { studentName: true, track: true },
  });
  const seen = new Set(existing.map((e) => `${e.studentName}|${e.track}`));
  const fresh = rows.filter((r) => !seen.has(`${r.studentName}|${r.track}`));

  if (fresh.length === 0) {
    console.log("همه از قبل وارد شده بودن — چیزی اضافه نشد.");
    return;
  }

  await prisma.studentProject.createMany({ data: fresh });

  const ui = fresh.filter((r) => r.track === "UI").length;
  const ux = fresh.filter((r) => r.track === "UX").length;
  console.log(`${fresh.length} ردیف اضافه شد — ${ui} رابط کاربری، ${ux} تجربه کاربری.`);
  console.log(`از ${ROWS.length} نفر، برای ورودی ${INTAKE}.`);
}

main()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
