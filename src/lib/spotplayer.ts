import "server-only";

/**
 * کلاینت API اسپات‌پلیر — https://spotplayer.ir/help/api
 *
 * ساخت لایسنس: POST به /license/edit/ بدون شناسه. ویرایش: همون آدرس با
 * _id لایسنس در انتها، و فقط فیلدهایی که فرستاده می‌شن عوض می‌شن.
 * API هیچ راهی برای فهرست کردن دوره‌ها یا خواندن و حذف لایسنس نداره؛
 * شناسهٔ دوره‌ها توی mock-data نگه‌داری می‌شه.
 */
const ENDPOINT = "https://panel.spotplayer.ir/license/edit/";
const DOWNLOAD_BASE = "https://dl.spotplayer.ir";

export class SpotPlayerError extends Error {}

export interface CreateLicenseInput {
  /** شناسه‌های دوره در پنل اسپات‌پلیر */
  courses: string[];
  /** فقط برای جستجو در پنل اسپات‌پلیر */
  name: string;
  /** متن واترمارک روی ویدیو — معمولاً شمارهٔ موبایل خریدار */
  watermark: string;
  /** لایسنس آزمایشی */
  test?: boolean;
  /** موقع ارجاع به صفحهٔ پشتیبانی دوره به‌صورت پارامتر GET فرستاده می‌شه */
  payload?: string;
  /** تعداد دستگاه مجاز در کل؛ خالی یعنی تنظیم پیش‌فرض پنل */
  devices?: number;
}

export interface SpotLicenseResult {
  /** شناسهٔ لایسنس در پنل — برای ویرایش لازمه */
  id: string;
  /** کلیدی که خریدار توی اپ اسپات‌پلیر وارد می‌کنه */
  key: string;
  /** لینک دانلود/پخش همین لایسنس */
  url: string;
}

async function call(path: string, body: unknown) {
  const apiKey = process.env.SPOTPLAYER_API_KEY;
  if (!apiKey) throw new SpotPlayerError("کلید API اسپات‌پلیر تنظیم نشده (SPOTPLAYER_API_KEY)");

  const res = await fetch(ENDPOINT + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      $API: apiKey,
      // طبق مستندات همیشه -1
      $LEVEL: "-1",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await res.text();
  let data: Record<string, unknown> | null = null;
  try {
    data = JSON.parse(text);
  } catch {
    // پاسخ JSON نبود؛ پایین‌تر با کد وضعیت گزارش می‌شه
  }

  const ex = data?.ex as { msg?: string } | undefined;
  if (ex) throw new SpotPlayerError(ex.msg || "اسپات‌پلیر درخواست رو رد کرد");
  if (!res.ok || !data) {
    throw new SpotPlayerError(`پاسخ نامعتبر از اسپات‌پلیر (HTTP ${res.status})`);
  }
  return data;
}

export async function createLicense(input: CreateLicenseInput): Promise<SpotLicenseResult> {
  const body: Record<string, unknown> = {
    test: Boolean(input.test),
    course: input.courses,
    name: input.name,
    watermark: { texts: [{ text: input.watermark }] },
  };
  if (input.payload) body.payload = input.payload;
  if (input.devices) body.device = { p0: input.devices };

  const data = await call("", body);
  const id = String(data._id ?? "");
  const key = String(data.key ?? "");
  if (!id || !key) throw new SpotPlayerError("اسپات‌پلیر لایسنس رو برنگردوند");

  const path = String(data.url ?? "");
  return { id, key, url: path ? DOWNLOAD_BASE + path : "" };
}

/** فقط فیلدهای فرستاده‌شده عوض می‌شن — مثلاً { device: { p0: 2 } } */
export async function updateLicense(licenseId: string, changes: Record<string, unknown>) {
  return call(encodeURIComponent(licenseId), changes);
}
