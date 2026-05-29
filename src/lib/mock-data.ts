export type Level = "مقدماتی" | "متوسط" | "پیشرفته";
export type CourseType = "infinity" | "offline";

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
  { q: "پشتیبانی ۱ ساله یعنی چی دقیقاً؟", a: "می‌تونی از طریق تیکت سوالاتت رو بپرسی و در طول ۱ سال پاسخ می‌گیری. سرعت پاسخ معمولاً ۲۴ تا ۴۸ ساعته." },
  { q: "آیا محتوا آپدیت می‌شه؟", a: "آره. هر بار که دوره آپدیت بشه، دسترسی به محتوای جدید برای همیشه رایگانه." },
  { q: "فرق این دوره با نسخه بی‌نهایت چیه؟", a: "محتوای ویدیویی کاملاً یکسانه. تفاوت اینه که نسخه آفلاین جلسات منتورینگ گروهی نداره — مناسب کسایی که می‌خوان به تمپو خودشون پیش برن." },
  { q: "بعد از دوره چی می‌تونم انجام بدم؟", a: "پورتفولیو داری با ۵ پروژه واقعی. آماده‌ای برای ورود به بازار کار به عنوان طراح UI." },
];

const uxOfflineFAQs: FAQ[] = [
  { q: "آیا نیاز به تجربه قبلی در طراحی دارم؟", a: "نه. دوره از صفر مطلق شروع می‌شه. تنها چیزی که لازمه آشنایی پایه با کامپیوتره." },
  { q: "چه نرم‌افزاری نیاز دارم؟", a: "Figma، Miro و FigJam — هر سه نسخه رایگان دارن." },
  { q: "پشتیبانی ۱ ساله یعنی چی دقیقاً؟", a: "می‌تونی از طریق تیکت سوالاتت رو بپرسی و در طول ۱ سال پاسخ می‌گیری. سرعت پاسخ معمولاً ۲۴ تا ۴۸ ساعته." },
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
  "پشتیبانی ۱ ساله از طریق تیکت",
  "لایسنس اسپات پلیر بعد از خرید",
  "بروزرسانی رایگان دوره",
  "بدون جلسات منتورینگ گروهی",
];

const emptyTopics: CourseTopic[] = [];
const emptyFAQs: FAQ[] = [];

export const courses: Course[] = [
  // ── UI Infinity ──────────────────────────────────────────
  {
    id: "ui-infinity",
    slug: "ui-infinity",
    type: "infinity",
    title: "طراحی رابط کاربری بی‌نهایت",
    subtitle: "UI DESIGN INFINITY",
    description:
      "جامع‌ترین دوره UI — از فیگما تا دیزاین سیستم، ۵ پروژه واقعی + ۲۰ ساعت منتورینگ گروهی.",
    longDescription:
      "۵۵ ساعت ویدیو + ۲۰ ساعت منتورینگ آنلاین — یاد می‌گیری چطور با مخاطبیت ارتباط برقرار کنی، برند واقعی بسازی و به عنوان طراح UI حرفه‌ای وارد بازار کار بشی.",
    price: 7000000,
    originalPrice: 9000000,
    thumbnail: "/assets/courses/ui-infinity.jpg",
    videoHours: 55,
    mentoringHours: 20,
    supportMonths: 0,
    projects: 5,
    level: "مقدماتی",
    students: 1634,
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
      "یادگیری کامل UX — از تحقیق کاربری تا معماری اطلاعات، ۲ پروژه واقعی + ۲۰ ساعت منتورینگ.",
    longDescription:
      "۳۵ ساعت ویدیو + ۲۰ ساعت منتورینگ آنلاین — از Design Thinking تا Case Study واقعی. یاد می‌گیری چطور مسئله کاربر رو پیدا کنی، تحلیل کنی و بهش راه‌حل بدی.",
    price: 7000000,
    originalPrice: 9000000,
    thumbnail: "/assets/courses/ux-infinity.jpg",
    videoHours: 35,
    mentoringHours: 20,
    supportMonths: 0,
    projects: 2,
    level: "مقدماتی",
    students: 990,
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
      "همان محتوای دوره بی‌نهایت — ۵۵ ساعت ویدیو، ۵ پروژه واقعی، پشتیبانی ۱ ساله. بدون جلسات منتورینگ.",
    longDescription:
      "تمام ویدیوها، پروژه‌ها و محتوای دوره UI بی‌نهایت — با پشتیبانی ۱ ساله از طریق تیکت. برای کسایی که می‌خوان به تمپو خودشون پیش برن.",
    price: 4000000,
    originalPrice: 6000000,
    thumbnail: "/assets/courses/ui-offline.jpg",
    videoHours: 55,
    mentoringHours: 0,
    supportMonths: 12,
    projects: 5,
    level: "مقدماتی",
    students: 0,
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
      "تمام ویدیوها، پروژه‌ها و محتوای دوره UX بی‌نهایت — با پشتیبانی ۱ ساله از طریق تیکت. برای کسایی که می‌خوان به تمپو خودشون پیش برن.",
    price: 4000000,
    originalPrice: 6000000,
    thumbnail: "/assets/courses/ux-offline.jpg",
    videoHours: 35,
    mentoringHours: 0,
    supportMonths: 12,
    projects: 2,
    level: "مقدماتی",
    students: 0,
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
    title: "طراحی پرتفولیو",
    subtitle: "PORTFOLIO DESIGN",
    description: "چطور یه پرتفولیو UI/UX بسازی که استخدام‌کننده رو متقاعد کنه — از Case Study تا نمایش پروژه.",
    longDescription: "",
    price: 0,
    thumbnail: "",
    videoHours: 0,
    mentoringHours: 0,
    supportMonths: 0,
    projects: 0,
    level: "مقدماتی",
    students: 0,
    tags: ["Portfolio", "Case Study", "Career", "UI/UX"],
    topics: emptyTopics,
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
    price: 0,
    thumbnail: "",
    videoHours: 0,
    mentoringHours: 0,
    supportMonths: 0,
    projects: 0,
    level: "متوسط",
    students: 0,
    tags: ["Figma", "Prototype", "Interaction", "Animation"],
    topics: emptyTopics,
    features: [],
    faqs: emptyFAQs,
    learningOutcomes: [],
    targetAudience: [],
    afterCompletion: [],
    instructor: "مجتبا یزدانپناه",
    testimonials: [],
    externalUrl: "https://spotplayer.ir",
  },
];

export const infinityCourses = courses.filter((c) => c.type === "infinity");
export const offlineCourses  = courses.filter((c) => c.type === "offline" && !c.externalUrl);
export const videoCourses    = courses.filter((c) => c.type === "offline");

export const stats = [
  { value: "۷,۰۰۰+", label: "دانشجو" },
  { value: "۴۰۰+",   label: "پروژه گروهی" },
  { value: "۴۰+",    label: "کد کلاس" },
  { value: "۹۰+",    label: "ساعت محتوا" },
];

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
  downloadFile?: { name: string; size: string; url: string };
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "form-design-mistakes",
    title: "۱۰ اشتباه رایج در طراحی فرم‌ها",
    excerpt: "فرم‌ها یکی از مهم‌ترین عناصر UI هستن. اما اکثر طراحان اشتباهاتی می‌کنن که نرخ تبدیل رو کاهش می‌ده.",
    body: [
      "فرم‌ها یکی از پرکاربردترین عناصر در طراحی رابط کاربری هستن — از صفحه لاگین تا checkout. اما خیلی از طراحان اشتباهاتی می‌کنن که تجربه کاربری رو خراب می‌کنه و کاربر رو از تکمیل فرم باز می‌داره.",
      "اول از همه، استفاده از placeholder به جای label. وقتی کاربر شروع به تایپ کردن می‌کنه، placeholder ناپدید می‌شه و کاربر فراموش می‌کنه اون فیلد چی بوده. همیشه label جداگانه داشته باش.",
      "دوم، validation فقط بعد از submit. باید inline validation داشته باشی — یعنی وقتی کاربر از یه فیلد خارج می‌شه (onBlur) بلافاصله خطا رو نشون بده. این کار frustration رو کاهش می‌ده.",
      "سوم، فیلدهای غیرضروری. هر فیلد اضافی شانس تکمیل فرم رو کاهش می‌ده. فقط اطلاعاتی که واقعاً نیاز داری رو بخواه. فیلدهایی مثل «شغل» یا «آدرس» رو به بعد از ثبت‌نام موکول کن.",
      "چهارم، پیام خطای مبهم. «خطایی رخ داده» هیچ اطلاعاتی به کاربر نمی‌ده. بگو دقیقاً چی اشتباهه: «ایمیل وارد شده قبلاً ثبت شده — وارد شو یا رمزت رو بازیابی کن».",
      "پنجم، عدم نمایش قدرت رمز عبور. برای فیلد پسورد، نشان‌دهنده قدرت رمز خیلی به کاربر کمک می‌کنه. ضمناً دکمه show/hide رو فراموش نکن — خیلی‌ها پسوردشون رو اشتباه تایپ می‌کنن.",
    ],
    date: "۱۴۰۴/۰۳/۰۵",
    readTime: 5,
    tags: ["UI Design", "Forms", "UX"],
    category: "آموزش UI",
    color: "#FFF0EE",
    accent: "#dc2626",
    downloadFile: { name: "چک‌لیست طراحی فرم — ۲۷ نکته", size: "۱۱۰ KB", url: "#" },
  },
  {
    id: "2",
    slug: "design-system-guide",
    title: "چطور Design System بسازیم — راهنمای قدم به قدم",
    excerpt: "Design System فقط یه کیت کامپوننت نیست. یه زبان مشترک بین طراح و توسعه‌دهنده‌ست. بذار از صفر بسازیمش.",
    body: [
      "Design System یکی از مهارت‌هایی‌ه که طراحان senior رو از junior جدا می‌کنه. وقتی یه DS درست داری، سرعت طراحیت چند برابر می‌شه و consistency سراسر پروداکت حفظ می‌شه.",
      "اول از همه، Foundation رو تعریف کن. این شامل Color Palette، Typography Scale، Spacing System، Border Radius، Shadow و Iconography می‌شه. این‌ها پایه همه چیزن.",
      "برای رنگ‌ها، یه سیستم semantic داشته باش نه فقط کد hex. مثلاً به جای #dc2626، بنویس color.danger.default. این کار تغییر تم در آینده رو خیلی راحت‌تر می‌کنه.",
      "بعد از Foundation، Tokens رو بساز. Design Token یه لایه abstraction بین رنگ خام و کاربردشه. مثلاً button.primary.background = color.brand.600.",
      "بعد به سراغ Components برو. با ساده‌ترین‌ها شروع کن: Button, Input, Badge, Avatar. هر کامپوننت باید همه Variant‌هاش رو داشته باشه: size, state, variant.",
      "مستندسازی رو جدی بگیر. هر کامپوننت باید داشته باشه: کِی استفاده بشه، کِی نشه، و چرا این طراحی انتخاب شده. Figma + Notion ترکیب خوبیه.",
    ],
    date: "۱۴۰۴/۰۲/۱۸",
    readTime: 8,
    tags: ["Design System", "Figma", "Components"],
    category: "فیگما",
    color: "#EEF3FF",
    accent: "#1d4ed8",
  },
  {
    id: "3",
    slug: "color-in-ui",
    title: "رنگ در UI — از تئوری تا عمل",
    excerpt: "رنگ قدرتمندترین ابزار یه طراحه. اما بدون دونستن اصول، می‌تونه همه چیز رو خراب کنه.",
    body: [
      "رنگ‌بندی اشتباه یکی از رایج‌ترین مشکلات UI طراحان تازه‌کاره. خیلی‌ها هر رنگی که دوست دارن انتخاب می‌کنن، بدون اینکه بدونن چرا.",
      "اول، تفاوت رنگ brand و رنگ semantic رو بشناس. رنگ brand اون رنگیه که هویت برندته. رنگ semantic برای انتقال معنی‌ه: سبز = موفق، قرمز = خطا، زرد = هشدار.",
      "دوم، contrast رو همیشه چک کن. متن روی پس‌زمینه باید حداقل contrast ratio 4.5:1 داشته باشه (WCAG AA). از ابزار Contrast Checker در Figma استفاده کن.",
      "سوم، یه پالت رنگی محدود داشته باش. بیشتر از ۵-۶ رنگ پایه نداشته باش. از هر رنگ، شیدهای مختلف بساز (100 تا 900) تا انعطاف داشته باشی.",
      "چهارم، رنگ تنها ابزار انتقال اطلاعات نباشه. رنگ‌کوری در مردان حدود ۸٪ شایعه. همیشه علاوه بر رنگ، از آیکون یا متن هم استفاده کن.",
    ],
    date: "۱۴۰۴/۰۱/۲۸",
    readTime: 6,
    tags: ["Color Theory", "UI Design", "Accessibility"],
    category: "آموزش UI",
    color: "#FFF0EE",
    accent: "#dc2626",
    downloadFile: { name: "پالت ۵۰ رنگ UI برای فیگما", size: "۸۵ KB", url: "#" },
  },
  {
    id: "4",
    slug: "portfolio-guide",
    title: "پورتفولیو UI/UX — چی بذاریم، چی نذاریم",
    excerpt: "پورتفولیوت اول چیزیه که استخدام‌کننده می‌بینه. یه پورتفولیو بد می‌تونه شانست رو نصف کنه.",
    body: [
      "پورتفولیو UI/UX مثل رزومه نیست — یه نمایش از طرز فکر توئه. استخدام‌کننده نمی‌خواد فقط خروجی ببینه، می‌خواد بفهمه چطور فکر می‌کنی.",
      "هر پروژه رو به شکل Case Study ارائه بده. یعنی: مشکل چی بود؟ چه راه‌حل‌هایی رو بررسی کردی؟ چرا این رو انتخاب کردی؟ نتیجه چی شد؟",
      "کمتر بهتره. ۳ پروژه عالی بهتر از ۱۰ پروژه متوسطه. هر چیزی که ضعیفه رو حذف کن، حتی اگه زمان زیادی گذاشتی.",
      "پروژه‌های واقعی رو اولویت بده — اگه داری. اگه نداری، redesign یه اپ معروف یا یه پروژه فرضی با مسئله واقعی بساز. بگو واقعی نیست — honest بودن مشکلی نیست.",
      "About page رو جدی بگیر. ۳-۴ جمله درباره خودت، تخصصت، و اینکه چرا دیزاین می‌کنی. لینک LinkedIn و راه تماس فراموش نشه.",
    ],
    date: "۱۴۰۳/۱۲/۱۰",
    readTime: 7,
    tags: ["Portfolio", "Career", "Case Study"],
    category: "کریر",
    color: "#F5F0FF",
    accent: "#7c5cfc",
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
];

export const freeResources: FreeResource[] = [
  {
    id: "free-course",
    type: "course",
    title: "مقدمه‌ای بر Figma — رایگان",
    description: "۳ ویدیو رایگان برای آشنایی با محیط فیگما، ابزارهای پایه و اولین فریم.",
    meta: "۳ ویدیو · ۴۵ دقیقه",
    url: "#",
    color: "#EEF3FF",
    accent: "#1d4ed8",
    emoji: "🎬",
  },
  {
    id: "voice-1",
    type: "voice",
    title: "از کجا شروع کنم؟ — جواب سوال همیشگی",
    description: "ویس کوتاه که توش مسیر ورود به دیزاین رو توضیح دادم — بدون پیچیدگی.",
    meta: "۱۲ دقیقه",
    url: "#",
    color: "#FFF0EE",
    accent: "#dc2626",
    emoji: "🎙",
  },
  {
    id: "voice-2",
    type: "voice",
    title: "طراحی پورتفولیو — چی لازمه؟",
    description: "همه چیزی که باید بدونی قبل از اینکه پورتفولیوت رو بسازی.",
    meta: "۱۸ دقیقه",
    url: "#",
    color: "#FFF0EE",
    accent: "#dc2626",
    emoji: "🎙",
  },
  {
    id: "file-1",
    type: "file",
    title: "کیت رنگ‌بندی — ۵۰ پالت UI",
    description: "فایل فیگما با ۵۰ پالت رنگی آماده که مستقیم توی پروژه‌هات استفاده کنی.",
    meta: "Figma · ۸۵ KB",
    url: "#",
    color: "#F5F0FF",
    accent: "#7c5cfc",
    emoji: "🎨",
  },
  {
    id: "file-2",
    type: "file",
    title: "چک‌لیست طراحی فرم — ۲۷ نکته",
    description: "قبل از هر فرمی که طراحی می‌کنی، این چک‌لیست رو مرور کن.",
    meta: "PDF · ۱۱۰ KB",
    url: "#",
    color: "#F5F0FF",
    accent: "#7c5cfc",
    emoji: "📋",
  },
  {
    id: "file-3",
    type: "file",
    title: "تمپلیت Case Study — فیگما",
    description: "یه قالب آماده برای ارائه پروژه‌هات به شکل case study حرفه‌ای.",
    meta: "Figma · ۲۴۰ KB",
    url: "#",
    color: "#F0FDF4",
    accent: "#16a34a",
    emoji: "📁",
  },
];
