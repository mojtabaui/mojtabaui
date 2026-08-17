/**
 * حرف‌های دانشجوها روی صفحهٔ خانه.
 *
 * نسخهٔ انگلیسی ترجمهٔ همون حرفه، نه بازنویسیِ تبلیغاتیش — لحن محاوره‌ای
 * و چیزی که واقعاً گفتن باید بمونه، وگرنه از شهادت به شعار تبدیل می‌شه.
 * اسم‌ها آوانگاری شدن و حرف اول آواتار هم با همون عوض می‌شه.
 */

export interface HomeTestimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
  color: string;
  accent: string;
}

const RED = { color: "#FFF0EE", accent: "#dc2626" };
const BLUE = { color: "#EEF3FF", accent: "#1d4ed8" };
const VIOLET = { color: "#F5F0FF", accent: "#7c5cfc" };

export const TESTIMONIALS: Record<"fa" | "en", HomeTestimonial[]> = {
  fa: [
    {
      name: "غزاله حلاجی",
      role: "الان: طراح UI/UX",
      text: "بعد از اتمام دوره استخدام شدم و الان روزهای اول کاریمه به‌عنوان طراح UI/UX. مشخصه که تلاش شده همه‌ی مطالب به ساده‌ترین شکل ممکن آموزش داده بشه. یه تشکر ویژه بابت زحماتتون.",
      avatar: "غ",
      ...RED,
    },
    {
      name: "حنانه ملک‌زاده",
      role: "الان: یو‌ایکس ریسرچر",
      text: "اول با یه دوره‌ی اقتصادی رفتم و نصفه موند، ولی بی‌نهایت برام جواب داد. اگه می‌دونستم UX انقدر جذابه خیلی زودتر میومدم سمتش. بعد از یه ماه دنبال کار، به‌عنوان یو‌ایکس ریسرچر جوین شدم.",
      avatar: "ح",
      ...BLUE,
    },
    {
      name: "سحر نژادبهرام",
      role: "دوره‌های UI و UX بی‌نهایت",
      text: "هم UI بی‌نهایت رو گذروندم هم UX. چیزهایی که سال‌ها پیش دانشگاه، رشته‌ی تجارت الکترونیک، خونده بودم اینجا عملی یاد گرفتم و حسرت خوردم که چرا زودتر نبود. این کلاس برای من بیشتر از مهارت، انرژی و انگیزه بود.",
      avatar: "س",
      ...VIOLET,
    },
    {
      name: "زهرا امینی",
      role: "دوره رابط کاربری بی‌نهایت",
      text: "دوره اونقدر کامل بود که وقتی آگهی‌های استخدام رو می‌دیدم، تقریباً همه‌ی مهارت‌های خواسته‌شده توش آموزش داده شده بود. توی جلسات رفع اشکال برای تک‌تک سوال‌ها وقت می‌ذاشتین و چیزی که هیچ‌جا ندیدم، نظم و برنامه‌ریزی دقیق بود.",
      avatar: "ز",
      ...RED,
    },
    {
      name: "الینا آبیان",
      role: "دوره‌های UI و UX بی‌نهایت",
      text: "هیچ زمینه‌ای در UI/UX نداشتم و از صفر شروع کردم، ولی دوره کامل و عالی بود. صبوری و انرژی مثبتی که به بچه‌ها می‌دادین انگیزه‌ی ادامه رو چند برابر می‌کرد. یکی از بهترین اتفاق‌ها آشنایی با هم‌گروهی‌هام بود که الان روی پروژه‌های دیگه هم با هم کار می‌کنیم.",
      avatar: "ا",
      ...VIOLET,
    },
    {
      name: "زهرا حبیبیان",
      role: "دوره رابط کاربری بی‌نهایت",
      text: "گروه‌بندی و منتورینگ هفتگی مزیت خیلی خوب دوره بود؛ اگه این‌ها نبود نه ویدیوها رو کامل می‌دیدم نه ایراد کارم رو می‌فهمیدم. از وقتی دوره تموم شده تا الان سه تا پروژه زدم و دارم چهارمی رو می‌گیرم.",
      avatar: "ز",
      ...RED,
    },
    {
      name: "ریحانه فلاحتی",
      role: "دوره رابط کاربری بی‌نهایت",
      text: "مشخص بودنِ تسک‌های هفتگی و جلسات هر هفته باعث شد هیچ جای ابهامی نمونه. من معمولاً کارهای بی‌برنامه رو نصفه رها می‌کنم، ولی اینجا برعکس شد و به خروجی رسیدم. اولین مصاحبه‌م هم رفتم و هر سوال فنی‌ای پرسیدن جواب دادم.",
      avatar: "ر",
      ...RED,
    },
    {
      name: "آرزو",
      role: "دوره رابط کاربری بی‌نهایت",
      text: "برای یادگیری صرف نیومده بودم؛ هدفم پروژه زدن و ساختن کانکشن بود، ولی هیچ‌وقت فکر نمی‌کردم جلسات رفع اشکال هفتگی انقدر توی روند دوره تاثیر بذاره. یه نظم قشنگ به کارم داد و با هم‌گروهی‌های بااستعدادم آشنا شدم.",
      avatar: "آ",
      ...RED,
    },
    {
      name: "مرضیه",
      role: "دوره رابط کاربری بی‌نهایت",
      text: "پروژه‌ی گروهی‌مون با همه‌ی چالش‌هاش بالاخره به پایان رسید و خیلی خوشحالم که این تجربه رو داشتم. با هم‌تیمیم خیلی خوب پیش رفتیم و شما همیشه پاسخگوی سوال‌هامون بودین. حالا یه پروژه‌ی تکی هم دارم که ادامه‌ش می‌دم.",
      avatar: "م",
      ...RED,
    },
    {
      name: "صدف لیاقت‌فر",
      role: "دوره رابط کاربری بی‌نهایت",
      text: "اگه یه کار خوب در حق خودم کرده باشم، اون خرید دوره‌ی شماست. گذشته از آموزش عالیتون، تو رفع اشکال و راهنمایی و امید دادن برای ادامه‌ی مسیر طراحی، استاد فوق‌العاده‌ای هستین.",
      avatar: "ص",
      ...RED,
    },
    {
      name: "سمین غفاری",
      role: "دوره رابط کاربری بی‌نهایت",
      text: "قبلاً پراکنده از منابع مختلف، مخصوصاً یوتیوب، یه چیزایی یاد گرفته بودم ولی انسجام نداشت. روندی که پیش بردین عالیه و سلسله‌مراتب به بهترین شکل رعایت شده. امیدوارم زودتر به جایی برسم که بتونم توی تیم‌تون همکاری کنم.",
      avatar: "س",
      ...RED,
    },
    {
      name: "محمد",
      role: "دوره رابط کاربری بی‌نهایت",
      text: "توی کل عمرم هیچ‌وقت انگیزه‌ی ادامه‌ی دوره‌ای نداشتم و فقط دوره‌ی شما بود که همه‌جوره دوست داشتم یاد بگیرم و پیشرفت کنم. انقدر دوستانه هوای همه‌ی بچه‌ها رو دارین که اسم شما سر زبونِ هر کسیه که تو این حوزه‌ست.",
      avatar: "م",
      ...RED,
    },
    {
      name: "ندا زارعیان",
      role: "دوره تجربه کاربری بی‌نهایت",
      text: "برای منی که از دوره‌های آنلاین تجربه‌ی خوبی نداشتم، این کلاس نظرم رو عوض کرد. تنها دانشِ یه معلم باعث یادگیری نمیشه؛ اون صبر و شوق و حس امنیتی که اگه اشتباه کنی اشکالی نداره، نقش مهمی داره.",
      avatar: "ن",
      ...BLUE,
    },
    {
      name: "نازنین",
      role: "دوره‌های UI و UX بی‌نهایت",
      text: "این دوره خیلی چیزا بهم یاد داد و بهترین تجربه‌م بود. خیلی از آموزش‌ها فقط فیگما نبود و به نحوه‌ی آموزش و انرژی شما وابسته بود. ممنون بابت تک‌تک لحظه‌هایی که تو کلاس گذاشتین.",
      avatar: "ن",
      ...VIOLET,
    },
    {
      name: "پریدخت",
      role: "دوره تجربه کاربری بی‌نهایت",
      text: "توی مصاحبه، تنها نمونه‌کاری که بررسی شد کیس‌استادی گروهیمون بود و خیلی خوششون اومد؛ بیشتر سوال‌ها حول همون بود. جلسات آنلاین و دیدن کار بقیه هم از جذابیت‌های دوره بود.",
      avatar: "پ",
      ...BLUE,
    },
    {
      name: "امیرحسین",
      role: "دوره رابط کاربری بی‌نهایت",
      text: "رفتم مصاحبه و اعتماد به‌نفسم فوق‌العاده بود؛ همه‌ی سوال‌های فنی رو جواب دادم، اونم وقتی هنوز دوره تموم نشده بود. فهمیدم چیزایی که یاد گرفتیم واقعاً به کار بازار می‌خوره.",
      avatar: "ا",
      ...RED,
    },
    {
      name: "نسرین",
      role: "دوره‌های UI و UX بی‌نهایت",
      text: "رفتم مصاحبه‌ی شرکت مهرام و گفتم دوره‌های مجتبی یزدان‌پناه رو گذروندم. گفتن خیلی مسلطی.",
      avatar: "ن",
      ...VIOLET,
    },
    {
      name: "کیمیا",
      role: "دوره رابط کاربری بی‌نهایت",
      text: "ممنونم بابت دوره‌ی عالی و آموزش‌های مفیدتون. خوشحالم که این راه رو با شما شروع کردم و توی این سه ماهی که کنار هم بودیم چیزهای زیادی یاد گرفتیم.",
      avatar: "ک",
      ...RED,
    },
    {
      name: "نگار",
      role: "دوره رابط کاربری بی‌نهایت",
      text: "از صفر شروع کردم و برنامه‌ی هفتگی باعث شد ویدیوها روی هم تلنبار نشن. منتورینگ با حوصله بود و جلسات رفع اشکال خودش یه دوره‌ی جدا بود.",
      avatar: "ن",
      ...RED,
    },
  ],

  en: [
    {
      name: "Ghazaleh Hallaji",
      role: "Now: UI/UX designer",
      text: "I got hired right after finishing the course and I'm in my first days of work as a UI/UX designer. You can tell real effort went into explaining everything in the simplest way possible. A special thank you for all of it.",
      avatar: "G",
      ...RED,
    },
    {
      name: "Hananeh Malekzadeh",
      role: "Now: UX researcher",
      text: "I first took a cheap course and never finished it, but Infinity worked for me. If I'd known UX was this interesting I'd have come to it much sooner. After a month of job hunting I joined as a UX researcher.",
      avatar: "H",
      ...BLUE,
    },
    {
      name: "Sahar Nejadbahram",
      role: "UI and UX Infinity courses",
      text: "I took both UI Infinity and UX. Things I'd studied years ago at university in e-commerce, I finally learned here in practice — and regretted that it hadn't come sooner. For me this class was energy and motivation more than skills.",
      avatar: "S",
      ...VIOLET,
    },
    {
      name: "Zahra Amini",
      role: "UI Infinity course",
      text: "The course was so complete that when I read job ads, almost every skill they asked for had been covered. In the Q&A sessions you gave time to every single question, and the thing I'd never seen anywhere else was the discipline and the precise planning.",
      avatar: "Z",
      ...RED,
    },
    {
      name: "Elina Abian",
      role: "UI and UX Infinity courses",
      text: "I had no background in UI/UX and started from zero, but the course was complete and excellent. The patience and the positive energy you gave everyone multiplied the motivation to keep going. One of the best parts was meeting my group — we still work on other projects together.",
      avatar: "E",
      ...VIOLET,
    },
    {
      name: "Zahra Habibian",
      role: "UI Infinity course",
      text: "The grouping and the weekly mentoring were the course's real advantage; without them I wouldn't have watched the videos through or understood what was wrong with my work. Since it ended I've done three projects and I'm taking on a fourth.",
      avatar: "Z",
      ...RED,
    },
    {
      name: "Reyhaneh Falahati",
      role: "UI Infinity course",
      text: "Having the weekly tasks spelled out and a session every week meant nothing stayed vague. I usually abandon anything unstructured halfway, but here it went the other way and I finished with something to show. I went to my first interview and answered every technical question they asked.",
      avatar: "R",
      ...RED,
    },
    {
      name: "Arezoo",
      role: "UI Infinity course",
      text: "I hadn't come just to learn; I wanted to build projects and make connections. I never expected the weekly Q&A sessions to matter this much to how the course went. They gave my work a rhythm, and I met genuinely talented teammates.",
      avatar: "A",
      ...RED,
    },
    {
      name: "Marzieh",
      role: "UI Infinity course",
      text: "Our group project finally came together, challenges and all, and I'm so glad I had the experience. My teammate and I worked well together and you always answered our questions. Now I have a solo project I'm carrying on with.",
      avatar: "M",
      ...RED,
    },
    {
      name: "Sadaf Liaghatfar",
      role: "UI Infinity course",
      text: "If I've done one good thing for myself, it was buying your course. Beyond the teaching itself, in answering questions and guiding people and giving them hope to stay on the design path, you're an extraordinary teacher.",
      avatar: "S",
      ...RED,
    },
    {
      name: "Samin Ghaffari",
      role: "UI Infinity course",
      text: "I'd picked things up here and there before, mostly from YouTube, but none of it held together. The path you took us down is excellent and the order of things is exactly right. I hope I get good enough to work on your team one day.",
      avatar: "S",
      ...RED,
    },
    {
      name: "Mohammad",
      role: "UI Infinity course",
      text: "In my whole life I've never had the motivation to finish a course, and yours was the only one where I genuinely wanted to learn and improve. You look after everyone so warmly that your name comes up with anyone working in this field.",
      avatar: "M",
      ...RED,
    },
    {
      name: "Neda Zareian",
      role: "UX Infinity course",
      text: "I'd had bad experiences with online courses, and this class changed my mind. A teacher's knowledge alone doesn't make learning happen; the patience, the enthusiasm and the sense that it's fine to get things wrong matter just as much.",
      avatar: "N",
      ...BLUE,
    },
    {
      name: "Nazanin",
      role: "UI and UX Infinity courses",
      text: "This course taught me a great deal and was my best experience yet. Much of it wasn't about Figma at all — it came down to how you teach and the energy you bring. Thank you for every moment you spent in class.",
      avatar: "N",
      ...VIOLET,
    },
    {
      name: "Paridokht",
      role: "UX Infinity course",
      text: "In my interview the only piece of work they looked at was our group case study, and they liked it a lot — most of the questions were about it. The live sessions and seeing everyone else's work were part of what made the course.",
      avatar: "P",
      ...BLUE,
    },
    {
      name: "Amirhossein",
      role: "UI Infinity course",
      text: "I went into the interview with real confidence and answered every technical question — and the course wasn't even finished yet. I realised what we'd learned genuinely matches what the market wants.",
      avatar: "A",
      ...RED,
    },
    {
      name: "Nasrin",
      role: "UI and UX Infinity courses",
      text: "I interviewed at Mahram and mentioned I'd taken Mojtaba Yazdanpanah's courses. They told me I really knew my stuff.",
      avatar: "N",
      ...VIOLET,
    },
    {
      name: "Kimia",
      role: "UI Infinity course",
      text: "Thank you for such a good course and for teaching that actually helps. I'm glad I started this path with you, and we learned a lot in the three months we spent together.",
      avatar: "K",
      ...RED,
    },
    {
      name: "Negar",
      role: "UI Infinity course",
      text: "I started from zero and the weekly plan kept the videos from piling up. The mentoring was patient, and the Q&A sessions were a course of their own.",
      avatar: "N",
      ...RED,
    },
  ],
};
