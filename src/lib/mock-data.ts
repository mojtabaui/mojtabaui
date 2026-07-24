export type Level = "مقدماتی" | "متوسط" | "پیشرفته";
export type CourseType = "infinity" | "offline" | "workshop";

export interface CourseTestimonial {
  name: string;
  avatar: string;
  text: string;
  outcome?: string;
}

export interface CourseTopic {
  title: string;
  description: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Course {
  id: string;
  slug: string;
  type: CourseType;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  videoHours: number;
  mentoringHours: number;
  supportMonths: number;
  projects: number;
  // ── فیلدهای مخصوص کارگاه (type === "workshop") ──
  durationHours?: number;
  sessionDate?: string;
  capacity?: number;
  format?: string;
  level: Level;
  students: number;
  tags: string[];
  topics: CourseTopic[];
  features: string[];
  faqs: FAQ[];
  learningOutcomes: string[];
  targetAudience: string[];
  afterCompletion: string[];
  instructor: string;
  isNew?: boolean;
  isBestseller?: boolean;
  comingSoon?: boolean;
  externalUrl?: string;
  spotplayerId?: string;
  /** موقتاً از کل سایت مخفی می‌شه: صفحه‌ی اصلی، لیست دوره‌ها و صفحه‌ی خودش (۴۰۴) */
  hidden?: boolean;
  testimonials: CourseTestimonial[];
}

const uiTopics: CourseTopic[] = [
  { title: "Chapter 1: Introduction to UX Design", description: "چرا یه طراح UI باید UX رو بشناسه؟ تفاوت و رابطه‌ی این دو در پروژه‌های واقعی." },
  { title: "Chapter 2: A Brief History of Web Development", description: "از HTML اولیه تا مدرن‌ترین رویکردهای طراحی — چرا این تاریخ به کارت میاد." },
  { title: "Chapter 3: Figma Basics", description: "محیط فیگما، Auto Layout، فریم‌ها و ابزارهایی که از روز اول ازشون استفاده می‌کنی." },
  { title: "Chapter 4: Visual Design Trends", description: "ترندهای UI روز دنیا و اینکه چطور از ترند استفاده کنی بدون اینکه طراحیت قدیمی بشه." },
  { title: "Chapter 5: Visual Design Principles", description: "اصول اثبات‌شده‌ی بصری: تضاد، تکرار، تراز و مجاورت — پایه‌ی هر طراحی خوب." },
  { title: "Chapter 6: UI Fundamentals — Layout", description: "گریدها، ستون‌ها، بریک‌پوینت‌ها و اینکه چطور ساختار بصری یه صفحه رو بسازی." },
  { title: "Chapter 7: UI Fundamentals — Spacing", description: "سیستم فاصله‌گذاری ۸px و اینکه چطور نظم بصری ایجاد کنی بدون تلاش زیاد." },
  { title: "Chapter 8: UI Fundamentals — Color Theory", description: "مدل‌های رنگی، پالت semantic، کنتراست و دسترس‌پذیری در طراحی رابط." },
  { title: "Chapter 9: UI Fundamentals — Typography", description: "انتخاب فونت، سلسله‌مراتب متن، فاصله‌گذاری خط و چطور خوانایی رو بالا ببری." },
  { title: "Chapter 10: UI Fundamentals — Images", description: "استفاده صحیح از عکس در UI، نسبت تصویر و اصول ترکیب‌بندی بصری." },
  { title: "Chapter 11: UI Fundamentals — Elevation", description: "سایه، عمق بصری و کاربرد درست elevation در کارت، مدال و نوار ناوبری." },
  { title: "Chapter 12: UI Fundamentals — Iconography", description: "انتخاب آیکون مناسب، اندازه‌بندی، یکپارچگی استایل و چطور کیت آیکون بسازی." },
  { title: "Chapter 13: Podcast Concept (Project)", description: "پروژه اول: طراحی کامل UI یه اپ پادکست — از صفحه اصلی تا پلیر با تمام المان‌های پایه." },
  { title: "Chapter 14: Basic Styleguide Design", description: "ساختن یه Styleguide اولیه که رنگ، تایپوگرافی و فاصله‌بندی پروژه رو مستند کنه." },
  { title: "Chapter 15: Introduction to Design Systems", description: "Design System چیه، چرا تیم‌های بزرگ بهش نیاز دارن و چه مزایایی داره." },
  { title: "Chapter 16: Atomic Design", description: "متدولوژی Atomic Design — از اتم و مولکول تا ارگانیسم و اینکه چطور باهاش فکر کنی." },
  { title: "Chapter 17: Advanced Figma", description: "Variables، Auto Layout پیشرفته، Smart Animate و ترفندهای حرفه‌ای که سرعتت رو چند برابر می‌کنن." },
  { title: "Chapter 18: Component Encyclopedia", description: "ساخت کتابخانه کامپوننت با تمام state‌ها، variant‌ها و property‌های ضروری." },
  { title: "Chapter 19: Responsive Design", description: "طراحی واکنش‌گرا برای موبایل، تبلت و دسکتاپ — بدون اینکه کیفیت رو فدا کنی." },
  { title: "Chapter 20: Interaction Design", description: "اصول انیمیشن در UI، micro-interaction و پیاده‌سازی با Figma Prototype." },
  { title: "Chapter 21: Instagram Dashboard (Project)", description: "پروژه دوم: طراحی داشبورد تحلیل اینستاگرام — پیچیده، واقعی و اضافه‌شدنی به پورتفولیو." },
  { title: "Chapter 22: How to Start a Project", description: "متدولوژی شروع پروژه حرفه‌ای: briefing، moodboard و ساختار فایل فیگما." },
  { title: "Chapter 23: Design Hand-offs & Design System", description: "تحویل طراحی به توسعه‌دهنده، کار با Inspect و ساختن توکن‌های طراحی." },
  { title: "Chapter 24: HaloNews (Project)", description: "پروژه سوم: طراحی اپ خبری با تمرکز روی typography، readability و سلسله‌مراتب محتوا." },
  { title: "Chapter 25: Smart Home Landing (Project)", description: "پروژه چهارم: Landing Page یه محصول هوشمند — conversion-focused با اصول persuasive design." },
  { title: "Chapter 26: Creating a Design System", description: "پروژه پنجم: ساخت Design System کامل از صفر — foundation، tokens، components و مستندات." },
];

const uxTopics: CourseTopic[] = [
  { title: "Chapter 1: UX Fundamentals", description: "UX چیه، چرا مهمه و جایگاهش در تیم محصول — پایه‌ای که همه چیز روش بنا میشه." },
  { title: "Chapter 2: Software Engineering Short History", description: "تاریخچه مختصر مهندسی نرم‌افزار و اینکه چرا یه UX‌ار باید این رو بدونه." },
  { title: "Chapter 3: Design Thinking", description: "فرآیند Design Thinking — پنج مرحله که نحوه‌ی حل مسئله رو کاملاً عوض می‌کنه." },
  { title: "Chapter 4: Design Mindsets", description: "ذهنیت‌هایی که یه UX‌ار حرفه‌ای رو از تازه‌کار جدا می‌کنن — چیزایی که دوره‌ها یاد نمیدن." },
  { title: "Chapter 5: Miro", description: "کار با Miro برای workshop، برین‌استورمینگ و همکاری تیمی روی پروژه‌های UX." },
  { title: "Chapter 6: FigJam", description: "FigJam به عنوان ابزار کار گروهی در مراحل اولیه — سریع و بصری." },
  { title: "Chapter 7: Empathize — Planning", description: "برنامه‌ریزی تحقیق کاربری: چه سوالاتی بپرسم، از چه کسایی، با چه روشی؟" },
  { title: "Chapter 8: Empathize — Qualitative Data Gathering", description: "مصاحبه کاربری، مشاهده و روش‌های کیفی جمع‌آوری داده که عمق می‌ده." },
  { title: "Chapter 9: Empathize — Quantitative Data Gathering", description: "نظرسنجی، تحلیل آمار و روش‌های کمی که وسعت تصویر رو نشون می‌ده." },
  { title: "Chapter 9.5: Projects Overview", description: "معرفی پروژه‌های دوره، مسیر پیش‌رو و اینکه چطور ازشون بیشترین بهره رو ببری." },
  { title: "Chapter 10: Empathize — Data Gathering Tools", description: "ابزارهای عملی تحقیق: Hotjar، Google Forms، Maze و چطور ازشون استفاده کنی." },
  { title: "Chapter 11: Define — Fundamentals", description: "مرحله تعریف مسئله: چطور از انبوه داده به یه Insight قابل اجرا برسیم." },
  { title: "Chapter 12: Ideate", description: "روش‌های ایده‌پردازی: How Might We، Crazy 8s، مپ ذهنی و انتخاب بهترین ایده." },
  { title: "Chapter 13: Define — Persona", description: "ساخت پرسونای واقعی بر اساس داده — نه شخصیت فرضی، بلکه نماینده‌ی کاربران واقعی." },
  { title: "Chapter 14: Define — Customer Journey Map", description: "نقشه سفر مشتری: لمس‌پوینت‌ها، احساسات کاربر و فرصت‌های بهبود تجربه." },
  { title: "Chapter 15: Define — Problem Definition", description: "تعریف دقیق مشکل با چارچوب «چطور می‌تونیم...» — پایه‌ی هر طراحی درست." },
  { title: "Chapter 16: Information Architecture — Fundamentals", description: "معماری اطلاعات چیه، چرا اینقدر مهمه و چه تاثیری روی تجربه کاربر داره." },
  { title: "Chapter 17: Information Architecture — User Flow", description: "رسم جریان کاربری برای همه سناریوها — قبل از اینکه یه خط بکشی." },
  { title: "Chapter 18: Information Architecture — Sitemap", description: "نقشه سایت و ساختار محتوا در سطح بالا — ستون فقرات هر پروداکت دیجیتال." },
  { title: "Chapter 19: Information Architecture — Card Sorting", description: "روش Card Sorting برای فهمیدن مدل ذهنی کاربر از دسته‌بندی اطلاعات." },
  { title: "Chapter 20: Information Architecture — Tree Testing", description: "اعتبارسنجی ساختار اطلاعات با Tree Testing — مطمئن شو قبل از اینکه طراحی کنی." },
  { title: "Chapter 21: Wireframe", description: "وایرفریم سریع با Figma — از ایده‌ی اولیه تا اسکچ قابل ارائه برای تیم." },
  { title: "Chapter 22: Test", description: "روش‌های تست UX: Usability Test، A/B Test و چطور از نتایج برای بهبود استفاده کنی." },
  { title: "Chapter 23: Case Study", description: "ساختار یه Case Study حرفه‌ای برای پورتفولیو که استخدام‌کننده رو متقاعد کنه." },
  { title: "Chapter 24: Instagram Redesign (Project)", description: "پروژه نهایی: ریدیزاین کامل تجربه‌ی اینستاگرام — از تحقیق تا Case Study آماده‌ی پورتفولیو." },
];

const infinityFeatures = (projects: number, mentoringHours: number) => [
  "آموزش از صفر و بدون پیش‌نیاز",
  `${projects} پروژه عملی در ویدیوها`,
  "انجام پروژه توسط دانشجو — گروهی یا فردی",
  "برنامه هفتگی برای ویدیو و تسک",
  "پشتیبانی مدرس",
  `${mentoringHours} ساعت منتورینگ — بهبود پروژه و رفع اشکال`,
  "لایسنس اسپات پلیر بعد از خرید",
];

const uiLearningOutcomes = [
  "اصول بصری پایه: رنگ، تایپوگرافی، فاصله‌بندی، elevation و آیکون",
  "طراحی با فیگما — از ابزارهای پایه تا Variables، Auto Layout پیشرفته و Prototype",
  "ساخت کامپوننت‌های حرفه‌ای با تمام state‌ها، variant‌ها و property‌ها",
  "متدولوژی Atomic Design و ساخت Design System کامل از صفر",
  "طراحی واکنش‌گرا برای موبایل، تبلت و دسکتاپ",
  "Interaction Design و اصول micro-animation در UI",
  "تحویل طراحی به توسعه‌دهنده — Inspect، توکن و مستندات",
];

const uiTargetAudience = [
  "کسی که می‌خواد از صفر وارد دیزاین بشه — بدون هیچ پیش‌نیازی",
  "کسی که طراحی می‌کنه ولی پایه‌هاش قوی نیست و می‌خواد سیستماتیک یاد بگیره",
  "توسعه‌دهنده‌ای که می‌خواد طراحی رو هم بلد باشه",
  "کسی که می‌خواد پورتفولیو واقعی بسازه و وارد بازار کار بشه",
];

const uiAfterCompletion = [
  "۵ پروژه واقعی آماده برای پورتفولیو — از اپ پادکست تا Design System",
  "توانایی طراحی UI حرفه‌ای از ایده تا تحویل به توسعه‌دهنده",
  "یه Design System کامل ساخته‌شده توسط خودت",
  "آمادگی برای مصاحبه شغلی به عنوان طراح UI",
];

const uxLearningOutcomes = [
  "فرایند کامل UX از تحقیق کاربری تا تست — مرحله به مرحله",
  "روش‌های تحقیق کیفی و کمی: مصاحبه، نظرسنجی، Hotjar، Maze",
  "ابزارهای کار: Figma، Miro و FigJam",
  "ساخت پرسونا، Customer Journey Map و تعریف دقیق مسئله",
  "معماری اطلاعات: User Flow، Sitemap، Card Sorting و Tree Testing",
  "وایرفریم سریع و روش‌های تست UX: Usability Test و A/B Test",
  "نوشتن Case Study حرفه‌ای برای پورتفولیو",
];

const uxTargetAudience = [
  "کسی که می‌خواد فرایند طراحی رو از منظر کاربر بفهمه",
  "طراح UI که می‌خواد UX رو هم یاد بگیره و دیدش عمیق‌تر بشه",
  "کسی که می‌خواد وارد حوزه UX Research بشه",
  "کسی که پورتفولیو UX ضعیف داره یا اصلاً نداره",
];

const uxAfterCompletion = [
  "یه Case Study کامل از پروژه واقعی — آماده برای پورتفولیو",
  "توانایی انجام مستقل فرایند UX از اول تا آخر",
  "تجربه کار تیمی روی پروژه واقعی",
  "آمادگی برای موقعیت‌های UX Designer یا UX Researcher",
];

const uiInfinityFAQs: FAQ[] = [
  { q: "آیا نیاز به تجربه قبلی در طراحی دارم؟", a: "نه. دوره از صفر مطلق شروع می‌شه. تنها چیزی که لازمه آشنایی پایه با کامپیوتره." },
  { q: "چه نرم‌افزاری نیاز دارم؟", a: "فقط Figma — نسخه رایگانش کاملاً کافیه. نیازی به هیچ نرم‌افزار دیگه‌ای نیست." },
  { q: "جلسات منتورینگ چطوره؟", a: "جلسات گروهی آنلاین هستن — هر هفته یه جلسه. پروژه‌ها بررسی میشن، سوال می‌پرسی و فیدبک مستقیم می‌گیری. از فیدبک بقیه هم یاد می‌گیری." },
  { q: "پروژه‌ها رو فردی انجام بدم یا گروهی؟", a: "هر دو ممکنه. می‌تونی فردی کار کنی یا با یه هم‌دوره‌ای گروه تشکیل بدی. انتخاب با خودته — هر دو مسیر در جلسه بررسی میشن." },
  { q: "اگه یه جلسه منتورینگ رو از دست بدم چی میشه؟", a: "همه جلسات ضبط میشن و بعد از جلسه در دسترسته. هیچ جلسه‌ای از دست نمیره." },
  { q: "بعد از دوره چی می‌تونم انجام بدم؟", a: "پورتفولیو داری با ۵ پروژه واقعی. آماده‌ای برای ورود به بازار کار به عنوان طراح UI یا ادامه با دوره UX." },
];

const uxInfinityFAQs: FAQ[] = [
  { q: "آیا نیاز به تجربه قبلی در طراحی دارم؟", a: "نه. دوره از صفر مطلق شروع می‌شه. تنها چیزی که لازمه آشنایی پایه با کامپیوتره." },
  { q: "چه نرم‌افزاری نیاز دارم؟", a: "Figma، Miro و FigJam — هر سه نسخه رایگان دارن و همه‌چیز لازمه کافیه." },
  { q: "جلسات منتورینگ چطوره؟", a: "جلسات گروهی آنلاین هستن — هر هفته یه جلسه. پروژه‌ها بررسی میشن، سوال می‌پرسی و فیدبک مستقیم می‌گیری. از فیدبک بقیه هم یاد می‌گیری." },
  { q: "پروژه‌ها رو فردی انجام بدم یا گروهی؟", a: "هر دو ممکنه. می‌تونی فردی کار کنی یا با یه هم‌دوره‌ای گروه تشکیل بدی. کار گروهی تجربه team work واقعی میده که تو پورتفولیوت نشون می‌ده." },
  { q: "اگه یه جلسه منتورینگ رو از دست بدم چی میشه؟", a: "همه جلسات ضبط میشن و بعد از جلسه در دسترسته. هیچ جلسه‌ای از دست نمیره." },
  { q: "بعد از دوره چی می‌تونم انجام بدم؟", a: "یه Case Study کامل و پورتفولیو UX داری. می‌تونی موقعیت UX Researcher یا UX Designer رو دنبال کنی." },
];

const uiOfflineFAQs: FAQ[] = [
  { q: "آیا نیاز به تجربه قبلی در طراحی دارم؟", a: "نه. دوره از صفر مطلق شروع می‌شه. تنها چیزی که لازمه آشنایی پایه با کامپیوتره." },
  { q: "چه نرم‌افزاری نیاز دارم؟", a: "فقط Figma — نسخه رایگانش کاملاً کافیه." },
  { q: "پشتیبانی ۱ ساله یعنی چی دقیقاً؟", a: "می‌تونی از طریق پشتیبانی تلگرام سوالاتت رو بپرسی و در طول ۱ سال پاسخ می‌گیری. سرعت پاسخ معمولاً ۲۴ تا ۴۸ ساعته." },
  { q: "آیا محتوا آپدیت می‌شه؟", a: "آره. هر بار که دوره آپدیت بشه، دسترسی به محتوای جدید برای همیشه رایگانه." },
  { q: "فرق این دوره با نسخه بی‌نهایت چیه؟", a: "محتوای ویدیویی کاملاً یکسانه. تفاوت اینه که نسخه آفلاین جلسات منتورینگ گروهی نداره — مناسب کسایی که می‌خوان به تمپو خودشون پیش برن." },
  { q: "بعد از دوره چی می‌تونم انجام بدم؟", a: "پورتفولیو داری با ۵ پروژه واقعی. آماده‌ای برای ورود به بازار کار به عنوان طراح UI." },
];

const uxOfflineFAQs: FAQ[] = [
  { q: "آیا نیاز به تجربه قبلی در طراحی دارم؟", a: "نه. دوره از صفر مطلق شروع می‌شه. تنها چیزی که لازمه آشنایی پایه با کامپیوتره." },
  { q: "چه نرم‌افزاری نیاز دارم؟", a: "Figma، Miro و FigJam — هر سه نسخه رایگان دارن." },
  { q: "پشتیبانی ۱ ساله یعنی چی دقیقاً؟", a: "می‌تونی از طریق پشتیبانی تلگرام سوالاتت رو بپرسی و در طول ۱ سال پاسخ می‌گیری. سرعت پاسخ معمولاً ۲۴ تا ۴۸ ساعته." },
  { q: "آیا محتوا آپدیت می‌شه؟", a: "آره. هر بار که دوره آپدیت بشه، دسترسی به محتوای جدید برای همیشه رایگانه." },
  { q: "فرق این دوره با نسخه بی‌نهایت چیه؟", a: "محتوای ویدیویی کاملاً یکسانه. تفاوت اینه که نسخه آفلاین جلسات منتورینگ گروهی نداره — مناسب کسایی که می‌خوان به تمپو خودشون پیش برن." },
  { q: "بعد از دوره چی می‌تونم انجام بدم؟", a: "یه Case Study کامل و پورتفولیو UX داری. می‌تونی موقعیت UX Researcher یا UX Designer رو دنبال کنی." },
];

const uiInfinityTestimonials: CourseTestimonial[] = [
  { name: "نگار", avatar: "ن", text: "از صفر شروع کردم. برنامه هفتگی باعث شد ویدیوها تلنبار نشن. منتورینگ با حوصله، و جلسات رفع اشکال خودش یه دوره جدا بود." },
  { name: "امیرحسین", avatar: "ا", text: "رفتم مصاحبه — اعتماد به نفسم فوق‌العاده بود و همه سوالات فنی رو جواب دادم. هنوز دوره تموم نشده بود.", outcome: "مصاحبه موفق" },
  { name: "ساناز", avatar: "س", text: "بعد از اتمام دوره استخدام شدم. وقتی آگهی‌های استخدام رو بررسی می‌کردم، تقریباً تمام مهارت‌هایی که درخواست شده بود توی دوره بود.", outcome: "استخدام شد" },
  { name: "آرزو", avatar: "آ", text: "یه نظم تو زندگیم اومد. با هم‌گروهی‌های بااستعداد آشنا شدم — علاوه بر کار شرکت تونستم روی پروژه‌ای دیگه هم کار کنم." },
];

const uxInfinityTestimonials: CourseTestimonial[] = [
  { name: "پریدخت", avatar: "پ", text: "تو مصاحبه، تنها نمونه‌کارم که بررسی شد کیس استادی گروهی‌مون بود. خیلی خوششون اومد و بیشتر سوالات حول همون بود.", outcome: "استخدام شد" },
  { name: "نازنین", avatar: "ن", text: "UX برام همیشه پر از ابهام بود. اینجا یاد گرفتم فرایند رو مرحله به مرحله پیش ببرم. همه علامت سوال‌هام رفع شد." },
  { name: "مهشید", avatar: "م", text: "با کار در گروه با طرز فکر هم‌گروهی‌هام آشنا شدم و نقاط ضعفم رو اصلاح کردم. دانش و اعتماد به نفسم خیلی بالا رفت." },
  { name: "نسرین", avatar: "ن", text: "رفتم مصاحبه شرکت — گفتم دوره‌های مجتبی یزدانپناه رو گذروندم. گفتن خیلی مسلطی.", outcome: "مصاحبه موفق" },
];

const uiOfflineTestimonials: CourseTestimonial[] = [
  { name: "رها", avatar: "ر", text: "وقتی آگهی‌های استخدام رو بررسی می‌کردم، تقریباً تمام مهارت‌هایی که درخواست شده بود توی دوره آموزش داده شده بود." },
  { name: "حامد", avatar: "ح", text: "روند تسک و فیلم‌ها هماهنگ بود. این باعث شد مباحث رو کامل یاد بگیرم — بدون شکاف." },
  { name: "کارن", avatar: "ک", text: "از بیرون که به این حوزه نگاه می‌کردم خیلی نگران بودم. خوشحالم که این دوره رو انتخاب کردم." },
];

const uxOfflineTestimonials: CourseTestimonial[] = [
  { name: "ندا", avatar: "ن", text: "تنها دانش یه معلم باعث یادگیری نمیشه. اون حس امنیت که اگه اشتباه کنی اشکالی نداره — این فرق می‌کنه." },
  { name: "سمیرا", avatar: "س", text: "من تجربه خوبی از دوره‌های آنلاین نداشتم. این دوره باعث شد نظرم عوض بشه." },
  { name: "رزا", avatar: "ر", text: "مطالب با توجه به گستردگیشون به شکل ساده و قابل فهم ارائه شد — این جای قدردانی داره." },
];

const offlineFeatures = (projects: number) => [
  "آموزش از صفر و بدون پیش‌نیاز",
  `${projects} پروژه عملی در ویدیوها`,
  "پشتیبانی ۱ ساله از طریق تلگرام",
  "لایسنس اسپات پلیر بعد از خرید",
  "بروزرسانی رایگان دوره",
  "بدون جلسات منتورینگ گروهی",
];

const emptyTopics: CourseTopic[] = [];

// ── سرفصل دوره پروتوتایپ ─────────────────────────────────
const prototypeTopics: CourseTopic[] = [
  { title: "تعامل در فیگما", description: "مقدمه‌ی تعامل، پروتوتایپ، تریگر و ریسپانس، اسکرول عمودی و افقی، کامپوننت تعاملی و پروتوتایپ یک پروژه‌ی کامل. سیزده درس." },
  { title: "پروژه‌ی نهایی فیگما", description: "دکمه، هاور دسته‌ها، منو، ورودی و کارت، بنر و کارت متحرک، اسپلش، صفحه‌ی محصول، کاروسل، فیلتر تعاملی و احراز هویت. سیزده درس." },
  { title: "شروع کار با پروتوپای", description: "معرفی ابزار و کانال تلگرام دوره." },
  { title: "فصل ۱: مبانی تعامل", description: "کنش و واکنش، تفاوت تعامل با انیمیشن، تریگر، ریسپانس، آبجکت و مثلث تعامل. هفت درس." },
  { title: "فصل ۲: تور پروتوپای", description: "معرفی محیط، مدیریت فایل و پلاگین فیگما." },
  { title: "فصل ۳: پروتوپای", description: "داشبورد، ابزارهای پایه و شکل، متن، کانتینر، فریم دستگاه، صحنه، پنل لایه، تایم‌لاین، تریگرها، ریسپانس‌ها، پنل پراپرتی، ناحیه‌ی لمسی و سه مینی‌پروژه. هفده درس." },
  { title: "فصل ۴: شرط‌ها", description: "توهم داشتن انتخاب، و شرط‌ها در عمل." },
  { title: "فصل ۵: زنجیره", description: "مقدمه، Start، Chain، Range و Detect. پنج درس." },
  { title: "فصل ۶: متغیر", description: "مقدمه، ساخت متغیر و سه تمرین متغیر در عمل. پنج درس." },
  { title: "فصل ۷: اسکرول", description: "اسکرول و پیجینگ." },
  { title: "فصل ۸: پروژه‌ی نهایی", description: "ساخت کامل اپ Fitsho: هیرو، درباره، و چهار مرحله‌ی محاسبه‌گر BMI. هفت درس." },
  { title: "فصل ۹: اشتراک‌گذاری و تمرین", description: "ضبط با سیستم و با گوشی، تمرینات بخش اول و Scroll to. شش درس." },
];

// ── سرفصل دوره پورتفولیو ──────────────────────────────────
const portfolioTopics: CourseTopic[] = [
  { title: "انواع پورتفولیو و Portfoliobox", description: "انواع پورتفولیو، چرایی انتخاب Portfoliobox و ساخت گام‌به‌گام آن. یازده درس." },
  { title: "پورتفولیو با وردپرس", description: "از مفهوم دامنه و هاست تا نصب وردپرس و کار با المنتور. طراحی هیرو، خدمات، مهارت‌ها، نمونه‌کار، بنر، بلاگ، نویگیشن و فوتر، به‌علاوه‌ی نسخه‌ی واکنش‌گرای همه‌شان و بهینه‌سازی تصاویر. چهل درس." },
  { title: "پورتفولیو PDF", description: "سایز و طراحی کاور، صفحه‌ی درباره من، نمونه‌کار و تماس، کاور پشت، خروجی بهینه و تکنیک‌های تکمیلی. نه درس." },
  { title: "پورتفولیو اینستاگرام", description: "پرسونال برندینگ، چیدمان پورتفولیو، ارتباط مستقیم، شبکه‌سازی، اتوماسیون و تیم‌سازی. هفت درس." },
  { title: "رزومه‌ی طراح", description: "ساخت یک رزومه‌ی حرفه‌ای در شش درس." },
];
const emptyFAQs: FAQ[] = [];

// ─── Workshops (محتوای placeholder — بعداً تکمیل می‌شه) ───────
const claudeWorkshopTopics: CourseTopic[] = [
  { title: "جلسه ۱ · چرا Claude برای طراح محصول؟", description: "جایگاه Claude در workflow طراحی، چه کارهایی رو خوب انجام می‌ده، محدودیت‌ها و کِی نباید بهش تکیه کرد." },
  { title: "جلسه ۱ · زبانِ Claude — پرامپت‌نویسی برای طراح‌ها", description: "اصول گفتگوی مؤثر، ساختار پرامپت، context دادن و ساختِ کتابخانه‌ی پرامپت شخصی." },
  { title: "جلسه ۱ · ریسرچ و اینسایت", description: "از مصاحبه و دیتای خام تا سنتز، استخراج insight و ساخت persona و customer journey map." },
  { title: "جلسه ۱ · ایده تا کانسپت + UX Writing", description: "ایده‌پردازی، ساخت user flow و نوشتن متن‌های UI و microcopy با Claude." },
  { title: "جلسه ۲ · دیزاین‌سیستم و مستندسازی", description: "کمک Claude در تعریف توکن، مستندسازی کامپوننت‌ها و نوشتن spec و گایدلاین." },
  { title: "جلسه ۲ · از دیزاین تا پروتوتایپ کدمحور", description: "ساخت پروتوتایپ تعاملی و صفحات کدمحور با Artifacts — بدون نیاز به برنامه‌نویس." },
  { title: "جلسه ۲ · نقد، تست و ممیزی", description: "نقد طراحی، ارزیابی heuristic و بررسی accessibility با کمک Claude." },
  { title: "جلسه ۲ · هندآف، iterate و جمع‌بندی", description: "آماده‌سازی تحویل به توسعه‌دهنده، بهبود تکرارشونده و نقشه‌ی راه ادامه." },
];

const claudeWorkshopFAQs: FAQ[] = [
  { q: "پیش‌نیاز فنی داره؟", a: "نه. فقط آشنایی پایه با طراحی کافیه؛ همه‌چیز از صفر و به‌صورت دستی پیش می‌ره." },
  { q: "دو جلسه چطور برگزار می‌شه؟", a: "دو جلسه‌ی زنده‌ی آنلاینِ ۳ ساعته در دو روز، به‌صورت تعاملی و دستی روی یه پروژه‌ی واقعی." },
  { q: "به اشتراک Claude نیاز دارم؟", a: "نسخه‌ی رایگان Claude برای شروع کافیه؛ اگه به امکانات بیشتری نیاز شد، توی کارگاه راهنمایی می‌شی." },
  { q: "جلسات ضبط می‌شن؟", a: "بله، هر دو جلسه ضبط می‌شن و بعد از کارگاه در دسترست هستن." },
];

const allCourses: Course[] = [
  // ── UI Infinity ──────────────────────────────────────────
  {
    id: "ui-infinity",
    slug: "ui-infinity",
    type: "infinity",
    title: "طراحی رابط کاربری بی‌نهایت",
    subtitle: "UI DESIGN INFINITY",
    description:
      "از فیگما تا دیزاین سیستم. ۵ پروژه‌ی واقعی و ۲۰ ساعت منتورینگ گروهی.",
    longDescription:
      "۵۵ ساعت ویدیو + ۲۰ ساعت منتورینگ آنلاین — یاد می‌گیری چطور با مخاطبیت ارتباط برقرار کنی، برند واقعی بسازی و به عنوان طراح UI حرفه‌ای وارد بازار کار بشی.",
    price: 9000000,
    thumbnail: "/assets/courses/ui-infinity.jpg",
    videoHours: 55,
    mentoringHours: 20,
    supportMonths: 0,
    projects: 5,
    level: "مقدماتی",
    students: 1918,
    tags: ["Figma", "UI Design", "Design System", "Typography", "Components", "Atomic Design"],
    topics: uiTopics,
    features: infinityFeatures(5, 20),
    faqs: uiInfinityFAQs,
    learningOutcomes: uiLearningOutcomes,
    targetAudience: uiTargetAudience,
    afterCompletion: uiAfterCompletion,
    instructor: "مجتبا یزدانپناه",
    isBestseller: true,
    testimonials: uiInfinityTestimonials,
  },

  // ── UX Infinity ──────────────────────────────────────────
  {
    id: "ux-infinity",
    slug: "ux-infinity",
    type: "infinity",
    title: "طراحی تجربه کاربری بی‌نهایت",
    subtitle: "UX DESIGN INFINITY",
    description:
      "از تحقیق کاربر تا معماری اطلاعات. ۲ پروژه‌ی واقعی و ۲۰ ساعت منتورینگ.",
    longDescription:
      "۳۵ ساعت ویدیو + ۲۰ ساعت منتورینگ آنلاین — از Design Thinking تا Case Study واقعی. یاد می‌گیری چطور مسئله کاربر رو پیدا کنی، تحلیل کنی و بهش راه‌حل بدی.",
    price: 9000000,
    thumbnail: "/assets/courses/ux-infinity.jpg",
    videoHours: 35,
    mentoringHours: 20,
    supportMonths: 0,
    projects: 2,
    level: "مقدماتی",
    students: 1546,
    tags: ["UX Research", "Figma", "Miro", "FigJam", "Case Study", "Wireframe"],
    topics: uxTopics,
    features: infinityFeatures(2, 20),
    faqs: uxInfinityFAQs,
    learningOutcomes: uxLearningOutcomes,
    targetAudience: uxTargetAudience,
    afterCompletion: uxAfterCompletion,
    instructor: "مجتبا یزدانپناه",
    isNew: false,
    testimonials: uxInfinityTestimonials,
  },

  // ── UI Offline ───────────────────────────────────────────
  {
    id: "ui-offline",
    slug: "ui-offline",
    type: "offline",
    title: "طراحی رابط کاربری",
    subtitle: "UI DESIGN",
    description:
      "همون محتوای دوره‌ی بی‌نهایت: ۵۵ ساعت ویدیو، ۵ پروژه‌ی واقعی و یک سال پشتیبانی. فقط جلسات منتورینگ رو نداره.",
    longDescription:
      "همون ویدیوها و پروژه‌های دوره‌ی بی‌نهایت، با یک سال پشتیبانی تلگرامی. برای کسی که می‌خواد با تمپوی خودش جلو بره.",
    price: 6000000,
    thumbnail: "/assets/courses/ui-offline.jpg",
    videoHours: 55,
    mentoringHours: 0,
    supportMonths: 12,
    projects: 5,
    level: "مقدماتی",
    students: 337,
    tags: ["Figma", "UI Design", "Design System", "Typography", "Components"],
    topics: uiTopics,
    features: offlineFeatures(5),
    faqs: uiOfflineFAQs,
    learningOutcomes: uiLearningOutcomes,
    targetAudience: uiTargetAudience,
    afterCompletion: uiAfterCompletion,
    instructor: "مجتبا یزدانپناه",
    isNew: true,
    testimonials: uiOfflineTestimonials,
  },

  // ── UX Offline ───────────────────────────────────────────
  {
    id: "ux-offline",
    slug: "ux-offline",
    type: "offline",
    title: "طراحی تجربه کاربری",
    subtitle: "UX DESIGN",
    description:
      "همان محتوای دوره بی‌نهایت — ۳۵ ساعت ویدیو، ۲ پروژه واقعی، پشتیبانی ۱ ساله. بدون جلسات منتورینگ.",
    longDescription:
      "همون ویدیوها و پروژه‌های دوره‌ی بی‌نهایت، با یک سال پشتیبانی تلگرامی. برای کسی که می‌خواد با تمپوی خودش جلو بره.",
    price: 6000000,
    thumbnail: "/assets/courses/ux-offline.jpg",
    videoHours: 35,
    mentoringHours: 0,
    supportMonths: 12,
    projects: 2,
    level: "مقدماتی",
    students: 294,
    tags: ["UX Research", "Figma", "Miro", "FigJam", "Case Study"],
    topics: uxTopics,
    features: offlineFeatures(2),
    faqs: uxOfflineFAQs,
    learningOutcomes: uxLearningOutcomes,
    targetAudience: uxTargetAudience,
    afterCompletion: uxAfterCompletion,
    instructor: "مجتبا یزدانپناه",
    isNew: true,
    testimonials: uxOfflineTestimonials,
  },

  // ── Portfolio Design ─────────────────────────────────────
  {
    id: "portfolio",
    slug: "portfolio",
    type: "offline",
    title: "طراحی پورتفولیو",
    subtitle: "PORTFOLIO DESIGN",
    description: "چطور یه پورتفولیو UI/UX بسازی که استخدام‌کننده رو متقاعد کنه — از Case Study تا نمایش پروژه.",
    longDescription: "",
    price: 4000000,
    thumbnail: "",
    videoHours: 13,
    mentoringHours: 0,
    supportMonths: 0,
    projects: 4,
    level: "مقدماتی",
    students: 431,
    tags: ["Portfolio", "Case Study", "Career", "UI/UX"],
    topics: portfolioTopics,
    features: [],
    faqs: emptyFAQs,
    learningOutcomes: [],
    targetAudience: [],
    afterCompletion: [],
    instructor: "مجتبا یزدانپناه",
    testimonials: [],
    externalUrl: "https://spotplayer.ir",
  },

  // ── Prototype Design ─────────────────────────────────────
  {
    id: "prototype",
    slug: "prototype",
    type: "offline",
    title: "طراحی پروتوتایپ",
    subtitle: "PROTOTYPE DESIGN",
    description: "ساخت پروتوتایپ تعاملی حرفه‌ای در فیگما — از انیمیشن‌های پایه تا فلوهای پیچیده.",
    longDescription: "",
    price: 2000000,
    thumbnail: "",
    videoHours: 11,
    mentoringHours: 0,
    supportMonths: 0,
    projects: 2,
    level: "متوسط",
    students: 631,
    tags: ["Figma", "Prototype", "Interaction", "Animation"],
    topics: prototypeTopics,
    features: [],
    faqs: emptyFAQs,
    learningOutcomes: [],
    targetAudience: [],
    afterCompletion: [],
    instructor: "مجتبا یزدانپناه",
    testimonials: [],
    externalUrl: "https://spotplayer.ir",
  },

  // ── Workshop: Claude for Product Designers ───────────────
  {
    id: "claude-for-designers",
    slug: "claude-for-designers",
    type: "workshop",
    title: "کارگاه Claude برای طراحان محصول",
    subtitle: "CLAUDE FOR PRODUCT DESIGNERS",
    description:
      "دو جلسه‌ی زنده و فشرده برای اینکه Claude رو وارد workflow طراحی محصولت کنی — از ریسرچ و ایده تا پروتوتایپ کدمحور.",
    longDescription:
      "در دو جلسه‌ی ۳ ساعته، قدم‌به‌قدم یاد می‌گیری چطور Claude رو در کل مسیر طراحی محصول به کار بگیری: از سنتز ریسرچ و ساخت persona، تا نوشتن UX copy، مستندسازی دیزاین‌سیستم و ساخت پروتوتایپ تعاملی کدمحور با Artifacts. کارگاه کاملاً دستیه و روی یه پروژه‌ی واقعی پیش می‌ره، همراه با کتابخانه‌ی پرامپت و فایل‌های آموزشی.",
    price: 2000000,
    thumbnail: "",
    videoHours: 0,
    mentoringHours: 0,
    supportMonths: 0,
    projects: 0,
    durationHours: 6,
    sessionDate: "به‌زودی اعلام می‌شود",
    capacity: 30,
    format: "آنلاین · ۲ جلسه‌ی ۳ ساعته",
    level: "متوسط",
    students: 0,
    tags: ["Claude", "AI", "Product Design", "Workflow"],
    topics: claudeWorkshopTopics,
    features: [
      "۲ جلسه‌ی زنده‌ی ۳ ساعته (جمعاً ۶ ساعت)",
      "کارگاه تعاملی و دستی روی یه پروژه‌ی واقعی",
      "کتابخانه‌ی پرامپت + فایل‌های آموزشی",
      "ضبط کامل هر دو جلسه",
      "ظرفیت محدود",
      "از صفر و بدون پیش‌نیاز فنی",
    ],
    faqs: claudeWorkshopFAQs,
    learningOutcomes: [
      "پرامپت‌نویسی مؤثر برای کارهای طراحی + کتابخانه‌ی پرامپت شخصی",
      "سنتز ریسرچ و ساخت persona و journey map از دیتای خام",
      "نوشتن UX copy و microcopy با Claude",
      "ساخت پروتوتایپ تعاملی کدمحور با Artifacts بدون برنامه‌نویسی",
      "مستندسازی دیزاین‌سیستم و نوشتن spec و گایدلاین",
      "نقد طراحی و ممیزی heuristic و accessibility با هوش مصنوعی",
    ],
    targetAudience: [
      "طراح‌های UI/UX و محصول که می‌خوان AI رو وارد workflow روزمره کنن",
      "طراح‌هایی که می‌خوان سریع‌تر از ریسرچ به پروتوتایپ برسن",
      "کسایی که از کد می‌ترسن و می‌خوان بدون برنامه‌نویس پروتوتایپ بسازن",
      "بدون پیش‌نیاز فنی — فقط آشنایی پایه با طراحی",
    ],
    afterCompletion: [
      "یه کتابخانه‌ی پرامپت آماده برای کارهای طراحی",
      "توانایی بردن یه فیچر واقعی از ریسرچ تا پروتوتایپ با Claude",
      "فایل‌های آموزشی و تمپلیت‌های کارگاه",
      "ضبط کامل دو جلسه",
    ],
    instructor: "مجتبا یزدانپناه",
    isNew: true,
    comingSoon: true,
    // موقتاً مخفی — تا وقتی روی کارگاه کار کنیم. برای برگردوندن، این خط رو بردار.
    hidden: true,
    testimonials: [],
  },
];

/** دوره‌های قابل نمایش — موارد hidden از کل سایت حذف می‌شن */
export const courses = allCourses.filter((c) => !c.hidden);

export const infinityCourses = courses.filter((c) => c.type === "infinity");
export const offlineCourses  = courses.filter((c) => c.type === "offline" && !c.externalUrl);
export const videoCourses    = courses.filter((c) => c.type === "offline");
export const workshopCourses = courses.filter((c) => c.type === "workshop");

export function typeLabel(type: CourseType): string {
  return type === "infinity" ? "بی‌نهایت" : type === "workshop" ? "کارگاه" : "آفلاین";
}

export const stats = [
  { value: "۶٬۵۰۰+", label: "دانشجو" },
  { value: "۴۰۰+",   label: "پروژه گروهی" },
  { value: "۴۰+",    label: "کد کلاس" },
  { value: "۹۰+",    label: "ساعت محتوا" },
];

/** تعداد دانشجو با ارقام فارسی و جداکننده‌ی هزارگان */
export function formatStudents(n: number): string {
  return n.toLocaleString("fa-IR");
}

export function formatPrice(price: number): string {
  return price.toLocaleString("fa-IR") + " تومان";
}

// ─── Articles ────────────────────────────────────────────────

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  color: string;
  accent: string;
  /** کاور مقاله در public/images/articles — نداشتنش مشکلی ایجاد نمی‌کنه */
  cover?: string;
  downloadFile?: { name: string; size: string; url: string };
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "ai-and-designer-job",
    cover: "/images/articles/ai-and-designer-job.jpg",
    title: "هوش مصنوعی جای طراح‌ها رو می‌گیره؟",
    excerpt: "جواب کوتاه: نه. ولی طراحی که از هوش مصنوعی استفاده می‌کنه، جای طراحی که استفاده نمی‌کنه رو می‌گیره. بذار دقیق‌تر حرف بزنیم.",
    body: [
      "این سوال رو تقریباً هر هفته از من می‌پرسن. یکی تازه می‌خواد وارد این حوزه بشه و می‌ترسه چند سال دیگه بازارش نباشه. یکی هم چند ساله کار می‌کنه و نگرانه مهارتش بی‌ارزش بشه. هر دو نگرانی منطقیه، ولی جوابش اونی نیست که فکر می‌کنید.",
      "واقعیت اینه که هوش مصنوعی توی تولید خروجی بصری خیلی سریع شده. می‌تونه ده تا نسخه از یک صفحه بسازه، متن دکمه پیشنهاد بده، آیکون بکشه و حتی کد کامپوننت رو بنویسه. اگر تصور شما از شغل طراح فقط همین بود، بله، اون بخش داره ارزون می‌شه.",
      "ولی کار اصلی یک طراح محصول هیچ‌وقت کشیدن مستطیل نبوده. کار اصلی اینه که بفهمه مسئله چیه، کدوم کاربر داره چه رنجی می‌کشه، کسب‌وکار دنبال چه عددیه، و بین این‌ها کجا باید مصالحه کرد. این تصمیم‌ها به بستر و آدم‌ها وابسته‌ست و هوش مصنوعی به اون بستر دسترسی نداره.",
      "چیزی که عوض شده، توزیع زمانه. قبلاً شاید هفتاد درصد وقت طراح صرف تولید می‌شد و سی درصد صرف فکر کردن. الان داره برعکس می‌شه. کسی که این سی درصد رو بلد نبود و فقط با سرعت دستش نون می‌خورد، الان تحت فشاره. کسی که تحلیل بلده، الان قوی‌تر از همیشه‌ست چون تولید براش تقریباً رایگان شده.",
      "پیشنهاد عملی من اینه: هوش مصنوعی رو مثل یک کارآموز پرانرژی ولی بی‌تجربه ببینید. کاری بهش بدید که حجمش زیاده و ریسکش کم. تولید حالت‌های مختلف یک کامپوننت، نوشتن پیش‌نویس متن‌های رابط، خلاصه کردن مصاحبه‌های کاربری، ساختن داده‌ی نمونه برای تست. تصمیم نهایی و مسئولیتش با شماست.",
      "و یک هشدار. اگر خروجی هوش مصنوعی رو بدون فهمیدن تحویل بدید، اولین جلسه‌ای که ازتون بپرسن چرا این تصمیم رو گرفتی، لو می‌رید. مهارت اصلی همچنان دفاع از تصمیمه، نه داشتن خروجی قشنگ.",
    ],
    date: "۱۴۰۵/۰۴/۲۸",
    readTime: 6,
    tags: ["AI", "Career", "Product Design"],
    category: "هوش مصنوعی",
    color: "#F3F0FF",
    accent: "#7c3aed",
  },
  {
    id: "2",
    slug: "prompting-for-designers",
    cover: "/images/articles/prompting-for-designers.jpg",
    title: "پرامپت‌نویسی برای طراح‌ها، فراتر از «یه صفحه لاگین بساز»",
    excerpt: "بیشتر طراح‌ها از هوش مصنوعی خروجی بی‌کیفیت می‌گیرن چون بد سوال می‌پرسن. ساختار یک درخواست خوب رو با هم مرور کنیم.",
    body: [
      "وقتی می‌نویسید «یک صفحه لاگین طراحی کن»، مدل مجبوره همه‌چیز رو حدس بزنه. برای کی؟ با چه لحنی؟ روی چه دستگاهی؟ نتیجه یک خروجی متوسط و بی‌روحه که شبیه هزار نمونه‌ی دیگه‌ست. مشکل از مدل نیست، از صورت سوال شماست.",
      "یک درخواست خوب چهار تا چیز داره. اول بستر: محصول چیه و کاربرش کیه. دوم هدف: قراره چه اتفاقی برای کاربر بیفته. سوم محدودیت: چه چیزهایی حتماً باید رعایت بشه، مثل رنگ برند یا اینکه فقط یک ستون داشته باشه. چهارم شکل خروجی: لیست بده، جدول بده، یا کد بده.",
      "همون مثال لاگین رو با این ساختار بنویسیم. یک اپلیکیشن مالی برای کاربران بالای چهل سال که با تکنولوژی خیلی راحت نیستن. هدف اینه که کاربر بدون سردرگمی وارد بشه و اگر رمزش رو فراموش کرده، مسیر بازیابی رو گم نکنه. محدودیت: فونت درشت، حداکثر دو فیلد در صفحه‌ی اول، رنگ اصلی سرمه‌ای. خروجی: ساختار صفحه به صورت لیست به همراه متن دقیق هر دکمه.",
      "تفاوت خروجی این دو تا درخواست از زمین تا آسمونه. توی حالت دوم شما در واقع دارید تفکر طراحیتون رو منتقل می‌کنید، نه اینکه منتظر باشید مدل به جای شما فکر کنه.",
      "یک تکنیک دیگه که خیلی جواب می‌ده اینه که به مدل نقش بدید و ازش بخواید قبل از جواب دادن سوال بپرسه. مثلاً بگید تو یک طراح محصول باتجربه‌ای، قبل از اینکه چیزی پیشنهاد بدی سه تا سوال ازم بپرس که ابهام‌ها رو رفع کنه. این کار کیفیت خروجی رو به شکل عجیبی بالا می‌بره.",
      "و آخرین نکته که مهم‌ترینه: هیچ‌وقت اولین جواب رو قبول نکنید. بهترین استفاده از این ابزارها گفت‌وگوی رفت و برگشتیه. بگید این بخش رو ساده‌تر کن، این لحن رو رسمی‌تر کن، این حالت خطا رو هم اضافه کن. کیفیت توی تکرار ساخته می‌شه.",
    ],
    date: "۱۴۰۵/۰۴/۱۵",
    readTime: 7,
    tags: ["AI", "Workflow", "Prompting"],
    category: "هوش مصنوعی",
    color: "#F5F3FF",
    accent: "#6d28d9",
  },
  {
    id: "3",
    slug: "designing-ai-interfaces",
    cover: "/images/articles/designing-ai-interfaces.jpg",
    title: "طراحی رابط برای محصولات هوش مصنوعی",
    excerpt: "محصولات هوش مصنوعی یک مشکل قدیمی رو برگردوندن: کاربر نمی‌دونه سیستم چقدر مطمئنه و کِی اشتباه می‌کنه. اینجا وظیفه‌ی ماست.",
    body: [
      "توی نرم‌افزارهای معمولی، وقتی دکمه‌ای رو می‌زنید نتیجه قابل پیش‌بینیه. توی محصولات مبتنی بر هوش مصنوعی این‌طور نیست. همون ورودی ممکنه دو تا خروجی متفاوت بده و بعضی وقت‌ها جواب کاملاً غلط ولی با اعتماد به نفس ارائه می‌شه. این عدم قطعیت، هسته‌ی همه‌ی چالش‌های طراحی این محصولاته.",
      "اولین مسئولیت ما اینه که انتظار کاربر رو درست تنظیم کنیم. قبل از اینکه کاربر چیزی تایپ کنه باید بفهمه این ابزار چه کارهایی رو خوب انجام می‌ده و چه کارهایی رو نه. نمونه‌های آماده توی صفحه‌ی خالی بهترین ابزار برای این کارن، چون هم‌زمان آموزش می‌دن و ترس صفحه‌ی سفید رو هم از بین می‌برن.",
      "دومین نکته انتظار کشیدنه. تولید جواب زمان می‌بره و سکوت باعث می‌شه کاربر فکر کنه چیزی خراب شده. نمایش تدریجی متن در حین تولید فقط یک افکت قشنگ نیست، یک ابزار جدیه برای اینکه انتظار قابل تحمل بشه و کاربر بفهمه سیستم داره کار می‌کنه.",
      "سومین نکته و شاید مهم‌ترینشون، مسیر اصلاحه. فرض رو بذارید که جواب اشتباهه. کاربر باید بتونه راحت دوباره تلاش کنه، جواب رو ویرایش کنه، یا بگه این خوب نبود و دلیلش رو بگه. اگر تنها گزینه‌ی کاربر شروع دوباره از صفر باشه، خیلی زود ابزار رو رها می‌کنه.",
      "چهارم، منبع و شفافیت. هر جا که ممکنه نشون بدید جواب از کجا اومده. اگر سیستم داره حدس می‌زنه، بگید داره حدس می‌زنه. کاربری که بدونه کجا باید دوباره چک کنه، به محصول شما بیشتر اعتماد می‌کنه تا محصولی که همیشه قاطع حرف می‌زنه و گاهی غلط می‌گه.",
      "و در نهایت، حریم خصوصی. کاربر باید بدونه چیزی که می‌نویسه کجا می‌ره و چقدر می‌مونه. این رو نباید ته صفحه‌ی قوانین قایم کنید. همون‌جا کنار فیلد ورودی، با یک جمله‌ی ساده بگید.",
    ],
    date: "۱۴۰۵/۰۳/۳۰",
    readTime: 8,
    tags: ["AI", "UX", "Product Design"],
    category: "هوش مصنوعی",
    color: "#EEF3FF",
    accent: "#1d4ed8",
  },
  {
    id: "4",
    slug: "form-design-mistakes",
    cover: "/images/articles/form-design-mistakes.jpg",
    title: "۱۰ اشتباه رایج در طراحی فرم‌ها",
    excerpt: "فرم جاییه که کاربر یا کارش راه می‌افته یا بی‌خیال می‌شه. بیشتر اشتباه‌ها هم تکراری و قابل پیشگیری‌ان.",
    body: [
      "فرم پرتکرارترین جاییه که کاربر باید کار کنه، نه فقط نگاه کنه. از ورود به حساب تا تکمیل خرید. برای همین کوچک‌ترین اصطکاک توی فرم مستقیم روی نتیجه‌ی کسب‌وکار اثر می‌ذاره.",
      "اشتباه اول، استفاده از متن راهنمای داخل فیلد به جای برچسب. به محض اینکه کاربر شروع به تایپ می‌کنه اون متن محو می‌شه و دیگه معلوم نیست این فیلد چی بوده. برچسب رو همیشه بالای فیلد و ثابت نگه دارید.",
      "اشتباه دوم، اعتبارسنجی فقط موقع ثبت نهایی. کاربر ده تا فیلد پر می‌کنه، دکمه رو می‌زنه و تازه می‌فهمه فیلد دوم اشتباه بوده. اعتبارسنجی رو موقع خروج از هر فیلد انجام بدید، ولی نه موقع تایپ کردن که آزاردهنده‌ست.",
      "اشتباه سوم، پرسیدن چیزهایی که لازم نیست. هر فیلد اضافه یعنی احتمال بیشتر رها کردن فرم. اگر اطلاعاتی رو الان لازم ندارید، بذارید برای بعد.",
      "اشتباه چهارم، پیام خطای بی‌فایده. جمله‌ی «خطایی رخ داد» هیچی به کاربر نمی‌گه. بگید مشکل چیه و راه حلش چیه. مثلاً بگید این ایمیل قبلاً ثبت شده، وارد حساب بشید یا رمزتون رو بازیابی کنید.",
      "اشتباه پنجم، مخفی نگه داشتن رمز بدون امکان دیدن. دکمه‌ی نمایش رمز یک قابلیت لوکس نیست، جلوی کلی خطای تایپی رو می‌گیره. نمایش قدرت رمز هم کمک می‌کنه کاربر بدونه چرا رمزش قبول نشده.",
      "بقیه‌ی اشتباه‌ها هم از همین جنسن. دکمه‌ای که موقع ارسال حالت انتظار نداره و کاربر چند بار می‌زندش. فیلدهایی که روی موبایل کیبورد اشتباه باز می‌کنن. چیدمانی که ترتیب حرکت با کیبورد توش بهم ریخته‌ست. و فرمی که بعد از خطا، اطلاعات پر شده رو پاک می‌کنه که تقریباً نابخشودنیه.",
    ],
    date: "۱۴۰۵/۰۳/۱۲",
    readTime: 6,
    tags: ["UI Design", "Forms", "UX"],
    category: "آموزش UI",
    color: "#FFF0EE",
    accent: "#dc2626",
  },
  {
    id: "5",
    slug: "design-system-guide",
    cover: "/images/articles/design-system-guide.jpg",
    title: "دیزاین سیستم رو از کجا شروع کنیم",
    excerpt: "دیزاین سیستم فقط مجموعه‌ای از کامپوننت‌ها نیست. یک زبان مشترکه بین طراح و برنامه‌نویس. بیاید از پایه بسازیمش.",
    body: [
      "خیلی‌ها فکر می‌کنن دیزاین سیستم یعنی یک فایل فیگما پر از دکمه. ولی اگر فقط کامپوننت داشته باشید و قاعده نداشته باشید، شش ماه بعد باز هم پنج مدل دکمه‌ی متفاوت توی محصول می‌بینید. چیزی که سیستم رو سیستم می‌کنه، قاعده‌هاشه.",
      "قبل از هر چیز پایه‌ها رو تعریف کنید. رنگ، مقیاس تایپوگرافی، سیستم فاصله‌گذاری، شعاع گوشه‌ها، سایه‌ها و آیکون‌ها. بدون این‌ها هر کامپوننتی که بسازید روی شن ساخته شده.",
      "برای رنگ‌ها یک لایه‌ی معنایی بسازید. به جای اینکه توی کامپوننت مستقیم کد رنگ بنویسید، اسم بذارید. مثلاً رنگ خطا، رنگ سطح، رنگ متن روی سطح. وقتی روزی بخواید حالت تیره اضافه کنید یا برند عوض بشه، فقط یک لایه رو عوض می‌کنید نه سیصد تا فایل رو.",
      "بعد سراغ کامپوننت‌ها برید و از ساده‌ترین‌ها شروع کنید. دکمه، فیلد ورودی، برچسب، آواتار. برای هر کدوم همه‌ی حالت‌ها رو بسازید. اندازه‌های مختلف، حالت غیرفعال، حالت در حال بارگذاری، حالت خطا. کامپوننتی که فقط حالت عادیش ساخته شده، توی پروژه‌ی واقعی به درد نمی‌خوره.",
      "مستندسازی رو جدی بگیرید و ازش نترسید. لازم نیست کتاب بنویسید. برای هر کامپوننت سه تا جمله کافیه: کِی ازش استفاده کنیم، کِی استفاده نکنیم، و چرا این‌طوری طراحی شده. همین سه جمله جلوی کلی سوال تکراری رو می‌گیره.",
      "و در آخر، سیستم رو با آدم‌ها بسازید نه برای آدم‌ها. اگر برنامه‌نویس‌ها توی ساختش نقش نداشته باشن، ازش استفاده نمی‌کنن. یک جلسه‌ی کوتاه هفتگی برای بازبینی مشترک، بیشتر از هر مستنداتی به بقای سیستم کمک می‌کنه.",
    ],
    date: "۱۴۰۵/۰۲/۲۵",
    readTime: 8,
    tags: ["Design System", "Figma", "Components"],
    category: "فیگما",
    color: "#F0FDFA",
    accent: "#0d9488",
  },
  {
    id: "6",
    slug: "color-in-ui",
    cover: "/images/articles/color-in-ui.jpg",
    title: "رنگ در رابط کاربری، فراتر از سلیقه",
    excerpt: "انتخاب رنگ توی محصول یک تصمیم کارکردیه نه ذوقی. بیاید ببینیم یک پالت درست چطور ساخته می‌شه.",
    body: [
      "خیلی وقت‌ها رنگ رو آخرین مرحله‌ی طراحی می‌بینن، یک لایه‌ی تزئینی که آخر کار روی طرح می‌کشن. ولی رنگ توی رابط کاربری وظیفه داره. باید بگه چی مهم‌تره، چی قابل کلیکه، چی خطرناکه و چی موفقیت‌آمیز بوده.",
      "پالت خودتون رو با یک رنگ برند شروع کنید، ولی همون‌جا متوقف نشید. برای هر رنگ به یک طیف نیاز دارید، معمولاً نه تا ده پله از خیلی روشن تا خیلی تیره. رنگ پررنگ برای دکمه، رنگ کم‌رنگ برای پس‌زمینه‌ی همون دکمه در حالت ثانویه، و رنگ تیره برای متن.",
      "بعد رنگ‌های وضعیت رو تعریف کنید. موفقیت، خطا، هشدار و اطلاع. اینجا یک اشتباه رایج وجود داره: خیلی‌ها فقط با رنگ پیام می‌دن. کاربری که کوررنگیه فرق سبز و قرمز رو نمی‌فهمه. همیشه کنار رنگ یک آیکون یا متن بذارید.",
      "کنتراست جاییه که بیشترین طرح‌ها می‌لنگن. متن معمولی باید حداقل نسبت چهار و نیم به یک با پس‌زمینه‌ش کنتراست داشته باشه. اون متن خاکستری روشن روی پس‌زمینه‌ی سفید که خیلی مینیمال به نظر می‌رسه، برای بخش زیادی از کاربرها عملاً ناخواناست.",
      "خنثی‌ها رو دست‌کم نگیرید. بیشتر سطح یک محصول جدی با خاکستری‌ها پر می‌شه نه با رنگ برند. یک مجموعه‌ی خوب از خاکستری‌های کمی گرم یا کمی سرد، بیشتر از رنگ اصلی توی حس نهایی کار اثر داره.",
      "قاعده‌ی ساده‌ای که همیشه جواب می‌ده اینه: هر چه رنگ کمتر، تاکید بیشتر. اگر همه‌جای صفحه رنگیه، هیچ‌جا مهم نیست. رنگ برند رو برای کاری که واقعاً می‌خواید کاربر انجام بده نگه دارید.",
    ],
    date: "۱۴۰۵/۰۲/۱۰",
    readTime: 6,
    tags: ["Color", "UI Design", "Accessibility"],
    category: "آموزش UI",
    color: "#FFF7ED",
    accent: "#ea580c",
  },
  {
    id: "7",
    slug: "accessibility-basics",
    cover: "/images/articles/accessibility-basics.jpg",
    title: "دسترس‌پذیری، کاری که نکردنش یعنی حذف کردن آدم‌ها",
    excerpt: "دسترس‌پذیری یک قابلیت اضافه برای گروه کوچکی از کاربرها نیست. کیفیت پایه‌ی کار شماست.",
    body: [
      "وقتی از دسترس‌پذیری حرف می‌زنیم، خیلی‌ها فقط نابینایی رو تصور می‌کنن. ولی طیف خیلی وسیع‌تره. کسی که دستش شکسته و با یک دست کار می‌کنه، کسی که توی آفتاب گوشیش رو نگاه می‌کنه، کسی که سنش بالاست و دستش می‌لرزه. همه‌ی این‌ها موقتاً یا دائماً از طراحی بد ضربه می‌خورن.",
      "از کنتراست شروع کنید چون ارزون‌ترین و پرتاثیرترین کاره. متن اصلی باید به اندازه‌ی کافی از پس‌زمینه جدا باشه. همین یک کار، خوانایی محصول شما رو برای همه بهتر می‌کنه، نه فقط برای گروه خاصی.",
      "اندازه‌ی ناحیه‌ی لمسی نکته‌ی بعدیه. هر چیزی که قابل زدنه باید حداقل چهل و چهار در چهل و چهار باشه. آیکون کوچیک بدون فضای اطراف، روی موبایل یعنی چند بار تلاش ناموفق و یک کاربر عصبانی.",
      "حرکت و انیمیشن رو فراموش نکنید. بعضی آدم‌ها با حرکت زیاد دچار سرگیجه می‌شن و توی تنظیمات دستگاهشون کاهش حرکت رو روشن کردن. محصول شما باید این تنظیم رو ببینه و انیمیشن‌های غیرضروری رو خاموش کنه.",
      "ترتیب حرکت با کیبورد رو خودتون تست کنید. موس رو کنار بذارید و فقط با تب توی صفحه بچرخید. اگر نتونستید کاری رو انجام بدید یا نفهمیدید الان کجای صفحه هستید، یعنی مشکل دارید. حلقه‌ی فوکوس رو هرگز حذف نکنید، فقط قشنگش کنید.",
      "و مهم‌ترین توصیه: این‌ها رو آخر پروژه انجام ندید. دسترس‌پذیری اگر از اول توی تصمیم‌ها باشه تقریباً رایگانه. اگر آخر کار بخواید بهش برسید، تبدیل می‌شه به بازطراحی.",
    ],
    date: "۱۴۰۵/۰۱/۲۲",
    readTime: 7,
    tags: ["Accessibility", "UX", "Quality"],
    category: "تجربه کاربری",
    color: "#ECFDF5",
    accent: "#059669",
  },
  {
    id: "8",
    slug: "portfolio-guide",
    cover: "/images/articles/portfolio-guide.jpg",
    title: "پورتفولیویی که کارفرما تا آخر می‌خونه",
    excerpt: "بیشتر پورتفولیوها گالری تصویرن. چیزی که استخدام‌کننده دنبالشه، طرز فکر شماست نه تعداد صفحه‌هاتون.",
    body: [
      "یک استخدام‌کننده در بهترین حالت چند دقیقه به پورتفولیوی شما وقت می‌ده. توی این چند دقیقه دنبال یک چیزه: آیا این آدم بلده مسئله رو حل کنه یا فقط بلده فتوشاپ و فیگما کار کنه.",
      "برای همین سه تا پروژه‌ی عمیق خیلی بهتر از ده تا پروژه‌ی سطحیه. پروژه‌هایی که ضعیف‌ترن، سطح کل پورتفولیو رو پایین می‌کشن. بی‌رحم باشید و حذف کنید.",
      "هر پروژه رو مثل یک داستان تعریف کنید. مسئله چی بود، محدودیت‌ها چی بودن، شما چه گزینه‌هایی رو بررسی کردید، چرا این یکی رو انتخاب کردید و در نهایت چه اتفاقی افتاد. اون بخش «چرا» همون چیزیه که شما رو از بقیه جدا می‌کنه.",
      "عدد اگر دارید حتماً بیارید. نرخ تکمیل بالا رفت، تعداد تیکت پشتیبانی کم شد، زمان انجام کار کوتاه‌تر شد. اگر عدد ندارید هم اشکالی نداره، ولی حداقل بگید چطور فهمیدید کارتون جواب داده.",
      "شکست‌ها رو هم بنویسید. جمله‌ای مثل «نسخه‌ی اول رو ساختیم و توی تست معلوم شد کاربرها اصلاً این دکمه رو نمی‌بینن، برای همین این‌طور تغییرش دادیم» بیشتر از هر ادعایی نشون می‌ده شما حرفه‌ای هستید.",
      "و از پروژه‌ی تمرینی نترسید. اگر هنوز پروژه‌ی واقعی ندارید، یک محصول موجود رو بردارید و مسئله‌ی مشخصی ازش رو حل کنید. فقط صادق باشید و بنویسید این کار تمرینیه. صداقت به اعتبارتون اضافه می‌کنه.",
    ],
    date: "۱۴۰۵/۰۱/۰۸",
    readTime: 7,
    tags: ["Portfolio", "Career", "Case Study"],
    category: "بازار کار",
    color: "#FDF2F8",
    accent: "#db2777",
  },
  {
    id: "9",
    slug: "user-research-basics",
    cover: "/images/articles/user-research-basics.jpg",
    title: "تحقیق کاربر بدون بودجه و بدون تیم",
    excerpt: "لازم نیست آزمایشگاه و بودجه داشته باشید. پنج تا مکالمه‌ی درست، بیشتر از صد تا حدس ارزش داره.",
    body: [
      "رایج‌ترین بهانه برای انجام ندادن تحقیق کاربر اینه که وقت و بودجه نیست. ولی تحقیق لزوماً یعنی مطالعه‌ی چند ماهه نیست. گاهی یعنی نیم ساعت حرف زدن با پنج نفر که واقعاً از محصول استفاده می‌کنن.",
      "قبل از هر چیز مشخص کنید دنبال چی هستید. سوال «کاربرها از محصول ما راضی‌ان؟» بی‌فایده‌ست چون جوابش تعارفه. سوال درست اینه: «کاربر برای اینکه سفارشش رو پیگیری کنه دقیقاً چه کارهایی می‌کنه؟»",
      "توی مصاحبه از پرسیدن نظر پرهیز کنید و سراغ رفتار برید. نپرسید «این طراحی رو دوست داری؟» چون آدم‌ها مودبن و دروغ مصلحتی می‌گن. بپرسید «آخرین باری که این کار رو انجام دادی، دقیقاً چی شد؟» خاطره‌ی واقعی خیلی صادق‌تر از نظر کلیه.",
      "سکوت رو یاد بگیرید. بعد از اینکه طرف حرفش تموم شد، سه ثانیه صبر کنید. بیشتر وقت‌ها همون جمله‌ای که بعد از این مکث گفته می‌شه، ارزشمندترین چیزیه که اون روز می‌شنوید.",
      "تست کردن هم لازم نیست پیچیده باشه. طرح رو بدید دست کاربر و یک کار مشخص بهش بدید. مثلاً بگید می‌خوای اشتراکت رو لغو کنی، انجام بده. بعد ساکت بشینید و فقط نگاه کنید. جایی که مکث می‌کنه، همون جای مشکله. راهنماییش نکنید، وگرنه تست بی‌معنی می‌شه.",
      "و از هوش مصنوعی برای مرتب کردن نتایج کمک بگیرید. متن مصاحبه‌ها رو بدید و بخواید الگوهای تکرارشونده رو دربیاره. ولی خودتون هم متن‌ها رو بخونید، چون جمله‌ی طلایی معمولاً توی خلاصه گم می‌شه.",
    ],
    date: "۱۴۰۴/۱۲/۱۸",
    readTime: 7,
    tags: ["Research", "UX", "Interview"],
    category: "تجربه کاربری",
    color: "#FEFCE8",
    accent: "#ca8a04",
  },
  {
    id: "10",
    slug: "first-design-job",
    cover: "/images/articles/first-design-job.jpg",
    title: "اولین کار طراحی، چطور شروع کنیم",
    excerpt: "بین «دوره رو تموم کردم» تا «اولین پروژه رو گرفتم» یک فاصله‌ای هست که کسی درباره‌ش حرف نمی‌زنه.",
    body: [
      "بعد از تموم شدن دوره، بیشتر آدم‌ها یک حس گیجی دارن. مهارت رو یاد گرفتن ولی نمی‌دونن از کجا باید مشتری یا کارفرما پیدا کنن. این فاصله طبیعیه و راه عبور ازش هم مشخصه.",
      "اول از همه، منتظر آماده شدن کامل نمونید. هیچ‌وقت حس نمی‌کنید آماده‌اید. کسی که با سه پروژه‌ی متوسط شروع کرده و شش ماه تجربه‌ی واقعی گرفته، خیلی جلوتر از کسیه که یک سال دیگه هم داره تمرین می‌کنه.",
      "برای شروع، کوچک فکر کنید. کسب‌وکارهای کوچک اطرافتون معمولاً به طراحی نیاز دارن و بودجه‌ی محدودی دارن. همین پروژه‌ها بهترین زمین تمرینن چون با آدم واقعی و محدودیت واقعی سر و کار دارید.",
      "قیمت‌گذاری اولین چالش جدیه. رایگان کار نکنید حتی اگر تازه‌کارید، چون هم ارزش کارتون رو پایین می‌آره هم مشتری اون پروژه رو جدی نمی‌گیره. عدد کوچک ولی واقعی بگید و توی هر پروژه یک پله بالا بیاید.",
      "حضور آنلاین رو دست‌کم نگیرید. لازم نیست هر روز پست بذارید. همین که هر چند وقت یک بار پروژه‌ای که انجام دادید رو با توضیح تصمیم‌هاتون منتشر کنید، بعد از چند ماه شما رو تبدیل می‌کنه به کسی که ازش کار می‌خوان.",
      "و آخرین چیز که کمتر گفته می‌شه: مهارت ارتباط با کارفرما تقریباً هم‌وزن مهارت طراحیه. کسی که سر وقت جواب می‌ده، انتظارات رو شفاف می‌کنه و بد خبر رو زود می‌گه، پروژه‌ی بعدی رو هم می‌گیره. حتی اگر طرحش از رقیبش کمی ضعیف‌تر باشه.",
    ],
    date: "۱۴۰۴/۱۲/۰۲",
    readTime: 6,
    tags: ["Career", "Freelance", "Beginners"],
    category: "بازار کار",
    color: "#EFF6FF",
    accent: "#2563eb",
  },
];

// ─── Free Resources ─────────────────────────────────────────

export type FreeResourceType = "course" | "voice" | "file";

export interface FreeResource {
  id: string;
  type: FreeResourceType;
  title: string;
  description: string;
  meta: string;
  url?: string;
  color: string;
  accent: string;
  emoji: string;
  /** کاور تصویری، فقط برای منابعی که داریم */
  image?: string;
  /** آیکون و متن دکمه، وقتی نوعِ منبع خودش گویا نیست (مثل کتابچه‌ای که کنار دوره‌ها می‌شینه) */
  icon?: "play" | "mic" | "file" | "book";
  cta?: string;
}

// ─── Student Projects ────────────────────────────────────────

export type ProjectLinkType = "figma" | "telegram";
export type ProjectCourseType = "ui" | "ux";

export interface StudentProject {
  id: string;
  studentName: string;
  projectTitle: string;
  description: string;
  courseType: ProjectCourseType;
  linkType: ProjectLinkType;
  url: string;
  tags: string[];
  cohort?: string;
  coverImage?: string;
}

export const studentProjects: StudentProject[] = [
  {
    id: "sp1",
    studentName: "محمد طالبی و تیم",
    projectTitle: "iLearn — فروشگاه دوره‌های آموزشی",
    description: "۲۵ صفحه، ۱۵۰+ کامپوننت، Auto Layout کامل، Prototype و Style Guide — دوره UI بی‌نهایت تیر ۱۴۰۴.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1554128498227554681",
    tags: ["UI Design", "Design System", "Prototype", "E-Learning"],
    cohort: "بی‌نهایت UI — تیر ۱۴۰۴",
    coverImage: "/images/student_work/ilearn.jpg",
  },
  {
    id: "sp2",
    studentName: "محمدرضا قدیانی و تیم",
    projectTitle: "Lozi — فروشگاه خدمات گرافیکی",
    description: "۴۰+ صفحه، ۴۰+ کامپوننت، Style Guide و Prototype کامل — دوره UI بی‌نهایت دی ۱۴۰۳.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1493930701191069492/lozi-graphic-services-assets-shop",
    tags: ["UI Design", "Marketplace", "Components", "Figma"],
    cohort: "بی‌نهایت UI — دی ۱۴۰۳",
    coverImage: "/images/student_work/lowzi.jpg",
  },
  {
    id: "sp3",
    studentName: "ملیحه پورهاشمی و تیم",
    projectTitle: "NFT Marketplace",
    description: "۵۰+ صفحه، ۱۰۰+ کامپوننت، فلوی کامل و Style Guide — دوره UI بی‌نهایت مهر ۱۴۰۳.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1460688492571171768",
    tags: ["UI Design", "NFT", "Marketplace", "Dark Mode"],
    cohort: "بی‌نهایت UI — مهر ۱۴۰۳",
    coverImage: "/images/student_work/digiden_nft.jpg",
  },
  {
    id: "sp4",
    studentName: "مبینا جمشیدجم، شیرین ایازی، راهیل عمرانیان، مریم محمدی",
    projectTitle: "Soundflow — دانلود و استریم موزیک",
    description: "+۲۰ صفحه، +۱۰۰ کامپوننت، Auto Layout، فول ریسپانسیو (دسکتاپ و موبایل)، Prototype و Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1470124207420369005",
    tags: ["UI Design", "Music", "Web App", "Prototype"],
    cohort: "UI — مهر ۱۴۰۳",
    coverImage: "/images/student_work/photo_2026-07-05_13-34-51.jpg",
  },
  {
    id: "sp5",
    studentName: "مینا برهانی، فاضل میکائیلی، سیران انوری",
    projectTitle: "NFT Product Marketplace",
    description: "+۶۰ صفحه، +۲۰ کامپوننت، Auto Layout، ریسپانسیو، Prototype و Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1504098789553909930",
    tags: ["UI Design", "NFT", "Marketplace", "Web"],
    cohort: "UI — بهمن ۱۴۰۳",
    coverImage: "/images/student_work/photo_2026-07-05_13-35-45.jpg",
  },
  {
    id: "sp6",
    studentName: "فاطمه یوسفی، ثنا صفایی، فاطمه صفری، آیدا اسمعیلی، زینب علی‌عباسی",
    projectTitle: "NFT Marketplace — Rare NFTs",
    description: "+۲۰۰ صفحه، +۸۰ کامپوننت و ورینت، Auto Layout، فول ریسپانسیو، Prototype و Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1467881887507428083/nft-marketplace-website",
    tags: ["UI Design", "NFT", "Marketplace", "Dark Mode"],
    cohort: "بی‌نهایت UI — آبان ۱۴۰۳",
    coverImage: "/images/student_work/photo_2026-07-05_13-36-08.jpg",
  },
  {
    id: "sp7",
    studentName: "مهدی اسحاقی، نرگس شاهبازی، ملیحه پورهاشمی",
    projectTitle: "فرنگار — گالری آنلاین نقاشی",
    description: "+۹۵ صفحه، +۵۰ کامپوننت، Auto Layout، ورینت‌نویسی، Style Guide — همراه با Case Study کامل.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1466024126630025975/art-gallery-application-farnegar",
    tags: ["UI Design", "Gallery", "Mobile App", "Case Study"],
    cohort: "بی‌نهایت UI",
    coverImage: "/images/student_work/f7a88c3d1b0c72d7d006b4fd4b5f26670d7adb62.png",
  },
  {
    id: "sp8",
    studentName: "رویا سلطان‌محمدی، زهرا محمدزاده، عاطفه نایبی، غزاله قلاعی، فاطمه سلطانی",
    projectTitle: "نماپلاس — اپلیکیشن استریم فیلم",
    description: "+۱۰۰ صفحه، +۵۰ کامپوننت، Auto Layout، ورینت‌نویسی، Prototype و انیمیشن، Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1452942610336143487",
    tags: ["UI Design", "Streaming", "Mobile App", "Animation"],
    cohort: "UI — مهر ۱۴۰۳",
    coverImage: "/images/student_work/photo_2026-07-05_13-37-18.jpg",
  },
  {
    id: "sp9",
    studentName: "بهنام موسوی، کیمیا پیرنیا، فاطمه وفایی",
    projectTitle: "IELTS — اپلیکیشن آموزش زبان",
    description: "+۵۰ صفحه، +۱۲۰ کامپوننت، Auto Layout، ورینت‌نویسی، فلوی کامل و Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1442570217140975232/ielts-applicationcommunity",
    tags: ["UI Design", "EdTech", "Mobile App", "Components"],
    cohort: "UI — مرداد ۱۴۰۳",
    coverImage: "/images/student_work/photo_2026-07-05_13-37-38.jpg",
  },
  {
    id: "sp10",
    studentName: "غزاله شیری، آرزو محمدعلیزاده، حدیث حیدری، نفس عمادلو",
    projectTitle: "رگال — فروشگاه لباس بانوان",
    description: "+۱۰۰ صفحه، +۵۰ کامپوننت، ورینت‌نویسی، نسخه موبایل، فول ریسپانسیو، Auto Layout و Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1442524078847947352",
    tags: ["UI Design", "E-Commerce", "Responsive", "Fashion"],
    cohort: "UI — مرداد ۱۴۰۳",
    coverImage: "/images/student_work/photo_2026-07-05_13-38-25.jpg",
  },
  {
    id: "sp11",
    studentName: "محمد نصراللهی، سیما شیردل، کارن علایی، مریم گل‌افزانی",
    projectTitle: "T.Movie — استریم فیلم و سریال",
    description: "+۱۰ صفحه، +۳۰ کامپوننت، پروژه داشبوردی با اینتراکشن جذاب و Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1429484601530346250/movie-series-streaming-platform",
    tags: ["UI Design", "Streaming", "Dashboard", "Interaction"],
    cohort: "UI — تیر ۱۴۰۳",
    coverImage: "/images/student_work/photo_2026-07-05_13-38-48.jpg",
  },
  {
    id: "sp12",
    studentName: "محمد عبدی، مهرداد ترابی",
    projectTitle: "تکنوشاپ — فروشگاه لوازم دیجیتال",
    description: "+۳۰ صفحه، +۸۰ کامپوننت، ریسپانسیو، همراه با نسخه اپلیکیشن و Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/design/gJn8Yaar5itb1Tu8bHZzwL/technoshop%2F-eccomerce-website-(Community)?node-id=2748-9905",
    tags: ["UI Design", "E-Commerce", "Responsive", "App"],
    cohort: "UI — دی ۱۴۰۲",
    coverImage: "/images/student_work/photo_2026-07-05_13-39-11.jpg",
  },
  {
    id: "sp13",
    studentName: "زهرا سعیدی، مینا احمدی، محمد عبدی، علیرضا رکنی، زهرا بعیدی",
    projectTitle: "ورزش ۳ — بازطراحی وبسایت",
    description: "بازطراحی +۸ صفحه، کامپوننت‌نویسی، ریسپانسیو، همراه با نسخه اپلیکیشن و Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1391495504933329979/varzesh-3-sports-news-websites",
    tags: ["UI Design", "News", "Redesign", "Sports"],
    cohort: "UI — مهر ۱۴۰۲",
    coverImage: "/images/student_work/photo_2026-07-05_13-39-35.jpg",
  },
  {
    id: "sp14",
    studentName: "الهام جراح‌زاده، محمدجواد عظیمی، پرند محمدی",
    projectTitle: "Music Streaming — دانلود و استریم موزیک",
    description: "+۲۵ صفحه، +۱۰۰ کامپوننت، ورینت‌نویسی، فول ریسپانسیو (موبایل و دسکتاپ)، Auto Layout و Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1424405619131836758",
    tags: ["UI Design", "Music", "Responsive", "Web App"],
    cohort: "UI — تیر ۱۴۰۳",
    coverImage: "/images/student_work/photo_2026-07-05_13-40-09.jpg",
  },
  {
    id: "sp15",
    studentName: "امیرحسین آذرگشت، آرش زارعی، محمدرضا جهان‌نما، زهرا وادی‌پور",
    projectTitle: "استریم فیلم و سریال — وبسایت",
    description: "+۲۰ صفحه، حالت دارک و لایت، فول ریسپانسیو، Prototype جذاب و Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1345709891812866081",
    tags: ["UI Design", "Streaming", "Dark & Light", "Prototype"],
    cohort: "UI — آذر ۱۴۰۲",
    coverImage: "/images/student_work/photo_2026-07-05_13-40-49.jpg",
  },
  {
    id: "sp16",
    studentName: "نگین نوروزی",
    projectTitle: "اپلیکیشن فروشگاه کتاب کودکان",
    description: "+۱۵ صفحه، کامپوننت‌نویسی، Prototype و Style Guide — طراح بعد از دوره به‌عنوان طراح استخدام شد.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1343499102868966569/online-book-app-ui-kit",
    tags: ["UI Design", "Kids", "Mobile App", "Books"],
    cohort: "UI — آذر ۱۴۰۲",
    coverImage: "/images/student_work/photo_2026-07-05_13-40-58.jpg",
  },
  {
    id: "sp17",
    studentName: "الهه بصیرنیا، امیرحسین تقی‌زاده، رضا عباسی",
    projectTitle: "MelodyMatrix — استریم موزیک",
    description: "+۲۵ صفحه، +۴۰ کامپوننت (Responsive Cards)، Auto Layout، فول ریسپانسیو، Prototype و Style Guide.",
    courseType: "ui",
    linkType: "figma",
    url: "https://www.figma.com/community/file/1343578815185390827",
    tags: ["UI Design", "Music", "Responsive", "Prototype"],
    cohort: "UI — آذر ۱۴۰۲",
    coverImage: "/images/student_work/photo_2026-07-05_13-41-25.jpg",
  },

  // ── UX Case Studies ──────────────────────────────────────
  {
    id: "sp18",
    studentName: "آیدا بهروزی، معصومه کمالی، زهرا قنبرطلب، محدثه آدینه، پگاه خارند",
    projectTitle: "WH — اپلیکیشن سلامت زنان",
    description: "طراحی یک راه‌حل یکپارچه برای بهبود تجربه سلامت زنان با تمرکز بر افزایش آگاهی و همدلی.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/871",
    tags: ["UX Research", "Case Study", "Health", "Mobile App"],
    coverImage: "/images/student_work/photo_2026-07-05_13-52-24.jpg",
  },
  {
    id: "sp19",
    studentName: "حنانه فرکوش",
    projectTitle: "بازطراحی دیوار — بهینه‌سازی ثبت آگهی",
    description: "بازطراحی فرایند ثبت و مدیریت آگهی برای کاهش ریزش کاربر و افزایش اعتماد و امنیت معاملات.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/845",
    tags: ["UX Research", "Case Study", "Redesign", "Marketplace"],
    coverImage: "/images/student_work/photo_2026-07-05_13-52-48.jpg",
  },
  {
    id: "sp20",
    studentName: "مرضیه نریمان‌پور، فاطمه‌سادات معتمدفر، مینا برهانی",
    projectTitle: "Calmind — اتوماسیون تکالیف دانشجویان",
    description: "راهکاری هوشمند و یکپارچه برای مدیریت تکالیف هفتگی، کنترل استرس و ثبت احساسات دانشجویان.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/820",
    tags: ["UX Research", "Case Study", "Student", "Mobile App"],
    coverImage: "/images/student_work/photo_2026-07-05_13-53-10.jpg",
  },
  {
    id: "sp21",
    studentName: "بهار جوادنیا، معصومه احمدی، فریبا حیدری، شاهین سیفی آلاگوز، تکتم مظاهری",
    projectTitle: "یونی‌مایند — سلامت روان دانشجویان",
    description: "اپلیکیشنی برای آرام‌سازی ذهن، ثبت احساسات و مبارزه با فرسودگی ذهنی دانشجویان پراسترس.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/818",
    tags: ["UX Research", "Case Study", "Mental Health", "Mobile App"],
    coverImage: "/images/student_work/photo_2026-07-05_13-53-28.jpg",
  },
  {
    id: "sp22",
    studentName: "پرند شوکت‌یاری، مژگان عبودی، سمانه عابدینی",
    projectTitle: "پتزی — نگهداری آسان از پت",
    description: "خلق تجربه‌ای کم‌دردسر در نگهداری پت برای افراد پرمشغله؛ رزرو همراه مطمئن و نظارت از راه دور.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/816",
    tags: ["UX Research", "Case Study", "Pet Care", "Mobile App"],
    coverImage: "/images/student_work/photo_2026-07-05_13-53-45.jpg",
  },
  {
    id: "sp23",
    studentName: "کیمیا پیرنیا، باران امیرخانلو، محمد نوربخش، سعیده امامی، کیمیا فولادی",
    projectTitle: "ویتا فیت — تعهد به ورزش و رژیم",
    description: "ارتقای تعهد به ورزش و رژیم غذایی از طریق شخصی‌سازی و گیمیفیکیشن برای افراد پرمشغله.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/813",
    tags: ["UX Research", "Case Study", "Fitness", "Gamification"],
    coverImage: "/images/student_work/photo_2026-07-05_13-54-01.jpg",
  },
  {
    id: "sp24",
    studentName: "ملیحه پورهاشمی، مهلا افخمی، مهسا وهاب‌زاده",
    projectTitle: "DietBetes — رژیم غذایی دیابت",
    description: "تسریع و ساده‌سازی فرایند دریافت رژیم غذایی برای افراد مبتلا به دیابت با کمک هوش مصنوعی.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/780",
    tags: ["UX Research", "Case Study", "Health", "AI"],
    coverImage: "/images/student_work/photo_2026-07-05_13-54-18.jpg",
  },
  {
    id: "sp25",
    studentName: "زینب بنی‌هاشمی، هستی رد، غزل معصوم‌پور، ناهید قهرمانی، مریم حافظی",
    projectTitle: "DevLoop — انگیزه برنامه‌نویسان تازه‌کار",
    description: "بهبود انگیزه برنامه‌نویسان تازه‌کار در مسیر یادگیری و نمایش پروژه‌ها به کارفرما.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/771",
    tags: ["UX Research", "Case Study", "EdTech", "Mobile App"],
    coverImage: "/images/student_work/photo_2026-07-05_13-54-37.jpg",
  },
  {
    id: "sp26",
    studentName: "آیدا اسماعیلی، فریماه حاصلی، مهدی حسین‌آبادی، آذرنوش میرزائی",
    projectTitle: "آیاد — دستیار دانش‌آموز",
    description: "برنامه‌ریزی شخصی و افزایش تمرکز دانش‌آموز با یادآوری هوشمند تسک‌ها و مدیریت زمان.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/690",
    tags: ["UX Research", "Case Study", "Student", "Mobile App"],
    coverImage: "/images/student_work/photo_2026-07-05_13-54-52.jpg",
  },
  {
    id: "sp27",
    studentName: "مبینا جمشیدجم، بهار سراغی، مهین خدایاری، زینب سیاح، فائزه دشتی",
    projectTitle: "تاکسی آنلاین کودک و نوجوان",
    description: "سیستم حمل‌ونقل امن با نظارت والدین و تجربه سفر مطمئن برای گروه سنی کودک و نوجوان.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/679",
    tags: ["UX Research", "Case Study", "Mobility", "Kids"],
    coverImage: "/images/student_work/photo_2026-07-05_13-55-08.jpg",
  },
  {
    id: "sp28",
    studentName: "صفا جهانخواه",
    projectTitle: "پلتفرم VOD — تماشای فیلم و سریال",
    description: "پروژه‌ای واقعی؛ تماشای فیلم و سریال، پیشنهاد هوشمند، تماشای گروهی و ارتباط با فیلم‌بازان.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/661",
    tags: ["UX Research", "Case Study", "Streaming", "Real Project"],
    coverImage: "/images/student_work/photo_2026-07-05_13-55-43.jpg",
  },
  {
    id: "sp29",
    studentName: "بهشید محمدی، عارف لنگری، فاطمه یوسفی، نگین نیک‌سرشت، شیدا هدایتی",
    projectTitle: "دستیار هوشمند تربیت فرزند",
    description: "دریافت مشاوره اختصاصی و هوشمند تربیت فرزند با حفظ امنیت داده‌های هر مراجع.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/659",
    tags: ["UX Research", "Case Study", "Parenting", "Mobile App"],
    coverImage: "/images/student_work/photo_2026-07-05_14-54-31.jpg",
  },
  {
    id: "sp30",
    studentName: "غزاله شیری",
    projectTitle: "رگال — اپلیکیشن مزون لباس بانوان",
    description: "راهنمای گام‌به‌گام اندازه‌گیری سایز، تجربه خرید آسان و جستجوی پیشرفته برای مزون لباس بانوان.",
    courseType: "ux",
    linkType: "telegram",
    url: "https://t.me/mojtabaui/648",
    tags: ["UX Research", "Case Study", "E-Commerce", "Fashion"],
    coverImage: "/images/student_work/photo_2026-07-05_13-56-07.jpg",
  },
];

// پروژه‌های منتخب صفحه‌ی اصلی — سه‌تای اول + نماپلاس، رگال، آیلتس
export const featuredProjects = ["sp1", "sp2", "sp3", "sp8", "sp10", "sp9"]
  .map((id) => studentProjects.find((p) => p.id === id))
  .filter((p): p is StudentProject => Boolean(p));

export const freeResources: FreeResource[] = [
  {
    id: "course-earning",
    type: "course",
    title: "شروع و کسب درآمد از UI/UX دیزاین",
    description:
      "شانزده قسمت ویدیویی از صفر: اینکه UI و UX دقیقاً چی هستن، شرح شغلی هرکدوم، باورهای نادرست این حوزه و راه‌های واقعی درآمد از استخدام تا فریلنسری و درآمد غیرفعال.",
    meta: "۱۶ ویدیو · رایگان",
    url: "https://t.me/mojtabaui/704",
    color: "#EEF3FF",
    accent: "#1d4ed8",
    emoji: "🎬",
  },
  {
    id: "course-smart-designer",
    type: "course",
    title: "دیزاینر پولساز = دیزاینر باهوش",
    description:
      "هفت روز، هفت جلسه‌ی ویس، هرکدوم مستقل: درآمد هوشمندانه، نمونه‌کار پولساز، گرفتن اولین پروژه، ساختن تجربه بدون پروژه‌ی واقعی و شرایط کار بین‌المللی.",
    meta: "۷ ویس · ۷ روز",
    url: "https://t.me/mojtabaui/611",
    color: "#F0FDF4",
    accent: "#16a34a",
    emoji: "🎧",
  },
  {
    id: "voice-ideation",
    type: "voice",
    title: "ایده‌یابی برای طراحان",
    description:
      "نکته‌های کلیدی برای پیدا کردن ایده‌ی طراحی. به درد طراح UI، گرافیک و سوشال مدیا می‌خوره.",
    meta: "ویس تلگرام",
    url: "https://t.me/mojtabaui/738",
    color: "#FFF0EE",
    accent: "#dc2626",
    emoji: "🎙",
  },
  {
    id: "voice-no-experience",
    type: "voice",
    title: "چطور بدون پروژه و سابقه کار مشغول بشیم؟",
    description:
      "چرا دیگه توی این حوزه سابقه‌ی کار قبلی شرط نیست، و اون اشتباهی که نمی‌ذاره هنوز مشغول بشی.",
    meta: "ویس تلگرام",
    url: "https://t.me/mojtabaui/754",
    color: "#FFF0EE",
    accent: "#dc2626",
    emoji: "🎙",
  },
  {
    id: "file-1",
    type: "file",
    image: "/images/free/50-styles.jpg",
    title: "۵۰ پرامپت طراحی پوستر",
    description: "۵۰ پرامپت آماده برای طراحی پوستر، هرکدوم با نمونه‌ی بصری که ببینی خروجی چه شکلیه.",
    meta: "PDF · ۵.۹ مگابایت",
    url: "/downloads/melina-50-ui-styles.pdf",
    color: "#F5F0FF",
    accent: "#7c5cfc",
    emoji: "🎨",
  },
  {
    id: "file-2",
    type: "file",
    image: "/images/free/700-chatgpt.jpg",
    title: "۷۰۰ پرامپت چت جی‌پی‌تی",
    description: "مجموعه‌ی ۷۰۰ پرامپت آماده که مستقیم کپی کنی و توی کارت استفاده کنی.",
    meta: "PDF · ۱.۵ مگابایت",
    url: "/downloads/melina-700-chatgpt.pdf",
    color: "#F0FDF4",
    accent: "#16a34a",
    emoji: "📋",
  },
  {
    id: "file-capsule",
    type: "course",
    icon: "book",
    cta: "دریافت کتابچه در تلگرام",
    title: "کتابچه کپسول UI/UX",
    description:
      "شروع سریع یادگیری: مقدمه و تاریخچه‌ی این حوزه، سیستمی که یه طراح لازم داره، و خلاصه‌ی هر مبحث UX و UI همراه با منابع یادگیری همون مبحث. از مقالات و تجربه‌ی خودم جمع شده.",
    meta: "کتابچه · تلگرام",
    url: "https://t.me/mojtabaui/643",
    color: "#FFF7ED",
    accent: "#ea580c",
    emoji: "📘",
  },
];
