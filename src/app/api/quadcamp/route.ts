import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * فرم عمومیِ ثبت‌نام کوادکمپ.
 *
 * سه چیز می‌گیره: اسم و فامیل، لینک پرتفولیو، و رزومه.
 *
 * رزومه دو راه داره و دقیقاً یکیش لازمه — یا فایلش آپلود می‌شه که همین‌جا
 * توی دیتابیس می‌مونه، یا لینک گوگل درایوش. آپلود با multipart میاد نه JSON،
 * چون فایل رو base64 کردن حجم رو یک‌سوم زیاد می‌کنه و از سقف رد می‌شیم.
 */

/**
 * سقف حجم فایل. بدنهٔ درخواست روی ورسل ۴٫۵ مگابایته و multipart هم
 * سربار خودش رو داره، پس ۳ مگابایت حاشیهٔ امنی می‌ذاره. رزومه‌ی معمولی
 * خیلی کمتر از اینه؛ هرچی بزرگ‌تر باشه یعنی عکسِ فشرده‌نشده توشه.
 */
const MAX_RESUME_BYTES = 3 * 1024 * 1024;

const MAX_NAME = 80;
const MAX_LINK = 500;

/** پسوندهایی که به‌عنوان رزومه قبول می‌کنیم، همراه با mime مجازشون */
const ALLOWED_RESUME: Record<string, string[]> = {
  pdf: ["application/pdf"],
  doc: ["application/msword"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
};

/** فاصله‌های اضافی، نیم‌فاصله، «ی» و «ک» عربی رو یکدست می‌کنه */
function cleanName(raw: string): string {
  return raw
    .trim()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .slice(0, MAX_NAME);
}

/** فقط http و https — جلوی javascript: و امثالش رو می‌گیره */
function isSafeLink(url: string): boolean {
  try {
    const p = new URL(url).protocol;
    return p === "http:" || p === "https:";
  } catch {
    return false;
  }
}

/**
 * خطا با کد و متن.
 *
 * متن فارسیه و کد برای فرمِ انگلیسیه — سمت کلاینت کد رو به ترجمه‌اش
 * می‌رسونه و اگه کدی نشناخت، همین متن فارسی رو نشون می‌ده.
 */
function bad(code: string, message: string, status = 400) {
  return NextResponse.json({ code, error: message }, { status });
}

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    // معمولاً یعنی فایل از سقف بدنهٔ سرور رد شده و اصلاً به اینجا نرسیده
    return bad("body_too_large", "فایل خیلی بزرگ بود یا درست فرستاده نشد. کوچیک‌ترش کن یا لینکش رو بده.");
  }

  const fullName = cleanName(String(form.get("fullName") ?? ""));
  const portfolioUrl = String(form.get("portfolioUrl") ?? "").trim().slice(0, MAX_LINK);
  const resumeUrl = String(form.get("resumeUrl") ?? "").trim().slice(0, MAX_LINK);
  const file = form.get("resumeFile");

  // اسم تک‌کلمه‌ای رو رد می‌کنیم؛ «اسم و فامیل» خواستیم و بعداً باید بشناسیمش
  if (fullName.length < 3 || !fullName.includes(" ")) {
    return bad("name", "اسم و فامیلت رو کامل بنویس، مثل «زهرا محمدی»");
  }

  if (!portfolioUrl) {
    return bad("portfolio_missing", "لینک پرتفولیوت رو بذار");
  }
  if (!isSafeLink(portfolioUrl)) {
    return bad("portfolio_invalid", "لینک پرتفولیو باید کامل باشه و با https:// شروع بشه");
  }

  const hasFile = file instanceof File && file.size > 0;

  if (!hasFile && !resumeUrl) {
    return bad("resume_missing", "رزومه‌ات رو آپلود کن، یا لینک گوگل درایوش رو بذار");
  }
  if (resumeUrl && !isSafeLink(resumeUrl)) {
    return bad("resume_link_invalid", "لینک رزومه باید کامل باشه و با https:// شروع بشه");
  }

  // پریزما ۷ برای Bytes همون Uint8Array رو می‌خواد، نه Buffer
  let resumeData: Uint8Array<ArrayBuffer> | null = null;
  let resumeName = "";
  let resumeMime = "";
  let resumeSize = 0;

  if (hasFile) {
    const f = file as File;

    if (f.size > MAX_RESUME_BYTES) {
      return bad("file_too_big", "فایل رزومه باید کمتر از ۳ مگابایت باشه. PDF بگیر ازش یا لینکش رو بده.");
    }

    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    const allowedMimes = ALLOWED_RESUME[ext];
    if (!allowedMimes) {
      return bad("file_type", "فرمت فایل قبول نیست. PDF، Word یا عکس بفرست.");
    }
    // پسوند به‌تنهایی کافی نیست — فایلی که اسمش .pdf شده ولی چیز دیگه‌ایه
    // نباید با mime نادرست ذخیره بشه و بعداً توی مرورگر باز نشه
    if (f.type && !allowedMimes.includes(f.type)) {
      return bad("file_mime", "فایل با پسوندش نمی‌خونه. دوباره از رزومهٔ اصلی خروجی بگیر.");
    }

    resumeData = new Uint8Array(await f.arrayBuffer());
    resumeName = f.name.slice(-120);
    resumeMime = allowedMimes[0];
    resumeSize = resumeData.length;
  }

  await prisma.quadcampApplication.create({
    data: {
      fullName,
      portfolioUrl,
      // اگه فایل داده، لینک هم اگه پر کرده باشه نگه می‌داریم — ضرری نداره
      resumeUrl,
      resumeData,
      resumeName,
      resumeMime,
      resumeSize,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
