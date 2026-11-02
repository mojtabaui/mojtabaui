import "server-only";
import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";
import { SUPPORT_HANDLE, type LicenseCourse } from "@/lib/license-courses";

/**
 * نامهٔ خوش‌آمد — همون سندِ welcome/build.mjs، ولی از پنل و برای هر دوره.
 *
 * فایل خودبسنده‌ست: قلم‌ها base64 داخلش هستن و QR به‌صورت SVG. این
 * نامه روی دستگاهی باز می‌شه که کنترلی روش نداریم، و کلید لایسنس با
 * قلم عوضی خوانده می‌شه. فایل‌های قلم با outputFileTracingIncludes
 * (next.config.ts) کنار تابع روی Vercel می‌رن.
 */

// مسیرها عمداً از دید باندلر پنهان‌اند؛ فایل‌های لازم صریحاً در
// next.config.ts فهرست شده‌اند، وگرنه کل پروژه کنار تابع ردگیری می‌شد.
const at = (...parts: string[]) => path.join(/*turbopackIgnore: true*/ process.cwd(), ...parts);
const rd = (file: string) => fs.readFileSync(file, "utf8");
const b64 = (file: string) => fs.readFileSync(file).toString("base64");

let assets: { css: string; fonts: string; glyph: string } | null = null;
function loadAssets() {
  if (assets) return assets;
  assets = {
    css: rd(at("welcome", "welcome.css")),
    glyph: rd(at("handout", "jozve-ai-access.svg")).trim(),
    fonts: `
@font-face{font-family:"Meem";font-weight:300;font-style:normal;font-display:block;src:url(data:font/ttf;base64,${b64(at("public", "fonts", "Meem-Light.ttf"))}) format("truetype")}
@font-face{font-family:"Meem";font-weight:700;font-style:normal;font-display:block;src:url(data:font/ttf;base64,${b64(at("public", "fonts", "Meem-Bold.ttf"))}) format("truetype")}
@font-face{font-family:"Michroma";font-weight:400;font-style:normal;font-display:block;src:url(data:font/woff2;base64,${b64(at("handout", "Michroma.woff2"))}) format("woff2")}
@font-face{font-family:"Space Grotesk";font-weight:400 700;font-style:normal;font-display:block;src:url(data:font/woff2;base64,${b64(at("handout", "SpaceGrotesk.woff2"))}) format("woff2")}`,
  };
  return assets;
}

/** چند گروه کنار هم باید جا بشن؛ بقیهٔ قاعده‌ها از welcome.css میان */
const EXTRA_CSS = `
.groups{display:flex; flex-direction:column; gap:12px}
/* چند گروه کنار هم، نه زیر هم — وگرنه برگ از یک A4 بیرون می‌زنه */
.groups.many{flex-direction:row; flex-wrap:wrap; gap:8px}
.groups.many > div{flex:1 1 0; min-width:22mm}
.groups.many .link{font-size:9px}
.group-name{margin:0 0 5px; font-size:11px; font-weight:700; color:var(--mute); text-align:center}
@media screen{
  .bar{position:sticky; top:0; z-index:1; display:flex; justify-content:center; gap:8px;
    padding:10px; background:#1a1714; font-family:"Meem",sans-serif}
  .bar button,.bar a{font:inherit; font-size:13px; font-weight:700; border:0; border-radius:8px;
    padding:7px 16px; cursor:pointer; text-decoration:none; background:#7c5cfc; color:#fff}
  .bar a{background:#3a342e}
}
@media print{.bar{display:none}}`;

const esc = (s: string) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** رقم فارسی، هم‌جنس تاریخ بالای صفحه */
const fa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

const persianDate = (d: Date) =>
  new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tehran",
  }).format(d);

const qrSvg = (url: string) =>
  QRCode.toString(url, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#1a1714", light: "#00000000" },
  });

/** اسم فایل همون اسم آدمه — موقع فرستادن باید معلوم باشه مال کیه */
export const letterFileName = (name: string) =>
  `${name.replace(/[\\/:*?"<>|]/g, "-").trim() || "welcome"}.html`;

export async function renderWelcomeLetter({
  name,
  licenseKey,
  courses,
  devices,
  issuedAt,
  toolbar,
}: {
  name: string;
  licenseKey: string;
  courses: LicenseCourse[];
  devices: number | null;
  issuedAt: Date;
  /** نوار چاپ/دانلود بالای صفحه — فقط وقتی توی پنل باز می‌شه */
  toolbar?: { downloadHref: string };
}) {
  const { css, fonts, glyph } = loadAssets();
  const single = courses.length === 1 ? courses[0] : null;

  const wordmark = single
    ? single.latin.split("·")[0].trim()
    : "MOJTABAUI";
  const courseFa = courses.map((c) => c.title).join(" و ");
  const courseLatin = courses.map((c) => (single ? c.latin : c.latin.split("·")[0].trim())).join(" + ");
  const handouts = courses.some((c) => c.handouts);

  // دوره‌هایی که گروهشون مشترکه یک QR می‌گیرن
  const groups = new Map<string, string[]>();
  for (const c of courses) {
    if (!c.group) continue;
    groups.set(c.group, [...(groups.get(c.group) ?? []), c.title]);
  }
  const groupBlocks = await Promise.all(
    [...groups].map(async ([url, titles]) => {
      const caption = groups.size > 1 ? `<p class="group-name">${esc(titles.join(" و "))}</p>` : "";
      return `<div>${caption}<figure class="qr">${await qrSvg(url)}</figure>
      <p class="link"><a href="${esc(url)}">${esc(url.replace(/^https?:\/\//, ""))}</a></p></div>`;
    }),
  );

  const deviceNote = devices
    ? `روی <strong>${fa(devices)} دستگاه</strong> فعال می‌شود · مخصوصِ خودت است و قابل انتقال نیست`
    : `مخصوصِ خودت است و قابل انتقال نیست`;
  const quotaNote = devices
    ? `هر فعال‌سازی یکی از ${fa(devices)} سهمیه را می‌سوزاند و برگشتنش دست ما نیست.`
    : `هر فعال‌سازی یکی از سهمیه‌های دستگاهت را می‌سوزاند و برگشتنش دست ما نیست.`;

  const groupSection = groupBlocks.length
    ? `<section class="col">
      <h2>${groupBlocks.length > 1 ? "گروه‌های دوره" : "گروه دوره"}</h2>
      <p class="lede">اطلاع‌رسانی و رفع اشکال هر دو همین‌جاست. کانال جدا نداریم، پس خبرهای تازه هم اول همین‌جا می‌آید.</p>
      <div class="groups${groupBlocks.length > 1 ? " many" : ""}">${groupBlocks.join("")}</div>
    </section>`
    : "";

  const bar = toolbar
    ? `<div class="bar"><button onclick="window.print()">چاپ / ذخیره PDF</button><a href="${esc(toolbar.downloadHref)}">دانلود HTML</a></div>`
    : "";

  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${esc(name)} — ثبت‌نام ${esc(courseFa)}</title>
<style>${css}${EXTRA_CSS}</style>
<style>${fonts}</style>
</head>
<body>
${bar}
<main class="sheet">

  <header class="top">
    <span class="school">مدرسه دیزاین ملینا</span>
    <span class="lockup">${glyph}<span class="wordmark">${esc(wordmark)}</span></span>
  </header>

  <h1>ثبت‌نامت ثبت شد.</h1>
  <p class="who"><strong><bdi>${esc(name)}</bdi></strong> <span class="sep">·</span> <span class="ltr">${esc(courseLatin)}</span></p>
  <p class="date">${esc(persianDate(issuedAt))}</p>

  <section class="key">
    <span class="key-cap">کد لایسنس</span>
    <p class="key-code">${esc(licenseKey.trim())}</p>
    <p class="key-note">${deviceNote}</p>
  </section>

  <div class="cols">
    <section class="col">
      <h2>فعال‌سازی</h2>
      <ol class="steps">
        <li><strong>اسپات‌پلیر را روی کامپیوتر نصب کن.</strong> از <code>spotplayer.ir</code> — ویندوز، مک یا لینوکس. نسخهٔ موبایل هم هست، ولی <strong>همیشه دسکتاپ را ترجیح بده</strong>: صفحهٔ بزرگ‌تر یعنی جزئیاتی که روی ویدیو نشان داده می‌شود واقعاً دیده می‌شود. موبایل برای مرور خوب است، نه برای کار کردن همراهِ درس.</li>
        <li><strong>بازش کن و کد بالا را وارد کن.</strong> همین یک کد، هم ${courses.length > 1 ? "دوره‌ها را می‌آورد هم بازشان" : "دوره را می‌آورد هم بازش"} می‌کند؛ چیز دیگری لازم نیست.</li>
        <li><strong>فصل‌ها را دانلود کن.</strong> بعد از دانلود، بدون اینترنت هم پخش می‌شوند.</li>
        ${handouts ? `<li><strong>جزوه‌ها جدا می‌آیند.</strong> لینکشان در گروه است و لازم نیست داخل پلیر دنبالشان بگردی.</li>` : ""}
      </ol>
      <p class="tip">نسخهٔ تحت‌وب هم دارد، ولی روی دستگاه‌های قدیمی‌تر پلیر کند می‌شود. اگر ویدیو برید یا لگ داشت، قبل از اینکه اینترنتت را مقصر بدانی، اپِ دسکتاپ را امتحان کن.</p>
    </section>

    ${groupSection}
  </div>

  <section class="notes">
    <h2>دو چیز که بعداً به کارت می‌آید</h2>
    <ul>
      <li><strong>این فایل را نگه دار.</strong> اگر دستگاهت عوض شد یا ویندوز را از نو نصب کردی، همین کد را دوباره لازم داری.</li>
      <li><strong>کد را برای کسی نفرست.</strong> ${quotaNote}</li>
    </ul>
  </section>

  <footer class="foot">
    <span>پشتیبانی: <span class="ltr">${esc(SUPPORT_HANDLE)}</span></span>
    <span class="ltr">${esc(single?.site ?? "mojtabaui.ir")}</span>
  </footer>

</main>
</body>
</html>`;
}
