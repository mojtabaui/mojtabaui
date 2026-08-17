import type { Lang } from "@/lib/i18n";

/**
 * یادداشت شخصی مدرس — تنها جای سایت که اول‌شخص حرف می‌زنه.
 *
 * انگلیسیش ترجمهٔ کلمه‌به‌کلمه نیست، چون این متن لحن داره نه اطلاعات. جمله‌ها
 * جوری بازنویسی شدن که به انگلیسی هم همون‌قدر آروم و بی‌ادعا باشن؛ اگر
 * تحت‌اللفظی ترجمه می‌شد، از یادداشت درمی‌اومد و شبیه متن تبلیغ می‌شد.
 */

export const NOTE = {
  fa: {
    kicker: "A NOTE",
    title: "چرا اسمش ملینا شد",
    paragraphs: [
      "ملینا اسم یک قناری زرده. پرنده‌ی کوچیکی که صداش رو از پشت پنجره هم می‌شنوی. وقتی دنبال اسم می‌گشتم، دنبال چیزی بودم که حس امید بده.",
      "چون آدم‌هایی که میان دیزاین یاد بگیرن، بیشترشون دارن یک چیزی رو پشت سر می‌ذارن. یکی رشته‌ای که هیچ‌وقت دوستش نداشت، یکی شغلی که خسته‌ش کرده، یکی هم چند سال این‌ور و اون‌ور رفتن بی‌نتیجه. آدم وقتی می‌خواد از نو شروع کنه، بیشتر از هر چیزی به امید احتیاج داره.",
      "سال اول تدریسم یک چیزی فهمیدم که هنوز هم باور دارم. چیزی که یادگیری رو ممکن می‌کنه تکنیک نیست. اینه که یک نفر حواسش به تو باشه. اینکه وقتی گیر کردی، کسی باشه که بگه اشکالی نداره، بیا با هم نگاهش کنیم.",
      "من خودم خیلی جاها این حس رو نداشتم. برای همین این مدرسه رو ساختم.",
    ],
    closing:
      "هر چیزی که اینجا می‌بینی، از برنامه‌ی هفتگی تا اینکه خودم جواب سوال‌ها رو می‌دم، برای همینه. که هیچ‌کس وسط راه حس نکنه تنها مونده.",
    name: "مجتبا یزدانپناه",
    role: "بنیان‌گذار مدرسه دیزاین ملینا",
  },

  en: {
    kicker: "A NOTE",
    title: "Why it's called Melina",
    paragraphs: [
      "Melina is the name of a yellow canary. A small bird you can hear even through a closed window. When I was looking for a name, I wanted one that felt like hope.",
      "Because most people who come to learn design are leaving something behind. A degree they never liked, a job that wore them out, a few years spent going nowhere in particular. When someone starts over, hope is the thing they need most.",
      "In my first year of teaching I learned something I still believe. What makes learning possible isn't technique. It's having someone paying attention to you. Someone who says, when you're stuck, that it's fine — let's look at it together.",
      "There were plenty of places where I didn't have that. That's why I built this school.",
    ],
    closing:
      "Everything you see here — the weekly plan, the fact that I answer the questions myself — is for that one reason. So that nobody feels left alone halfway through.",
    name: "Mojtaba Yazdanpanah",
    role: "Founder of Melina Design School",
  },
} as const;

export type NoteDict = (typeof NOTE)[Lang];
