/**
 * نامهٔ خوش‌آمد — برای هر نفر یک HTML و یک PDF، با لایسنس خودش.
 *
 *   node welcome/build.mjs "نام و نام خانوادگی" "LICENSE-KEY"
 *   node welcome/build.mjs --csv welcome/students.csv
 *
 * خروجی در `welcome/out/` می‌نشیند، نه در `public/`.
 * این عمدی است: هر فایل یک کلید لایسنس دارد و هرچه در `public/`
 * باشد روی اینترنت سرو می‌شود. اگر روزی جای خروجی را عوض کردی،
 * همین یک جمله را دوباره بخوان.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import QRCode from "qrcode";

const ROOT = path.resolve(import.meta.dirname, "..");
const rd = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const b64 = (p) => fs.readFileSync(path.join(ROOT, p)).toString("base64");

/* ══ سه چیزی که باید پر کنی ══════════════════════════════════
   بقیهٔ فایل را لازم نیست دست بزنی. */
const CONFIG = {
  /** لینک دعوتِ گروه تلگرام — همان که در QR و متن می‌نشیند */
  group: "https://t.me/+AheSyWBiz1xjM2U0",

  /** روی چند دستگاه فعال می‌شود. همان عددی که در پنل اسپات‌پلیر ست کرده‌ای. */
  devices: 2,

  /** آی‌دی پشتیبانی، برای پایین صفحه */
  support: "@mojtabaui",

  course: "ROBOTYPE · AI Native Product Design",
  courseFa: "دورهٔ روبوتایپ",
  site: "mojtabaui.ir/robotype",
};
/* ════════════════════════════════════════════════════════════ */

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * رقمِ فارسی.
 *
 * تاریخِ بالای صفحه از `Intl` می‌آید و فارسی است؛ اگر «۲ دستگاه»
 * در همان صفحه «2 دستگاه» نوشته شود، دو جور عدد در یک سند داریم و
 * دومی مثلِ چیزی که از قالب جا مانده دیده می‌شود.
 */
const fa = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

/** تاریخ شمسی، همان روزی که نامه ساخته می‌شود */
const today = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(new Date());

/* سیبیلِ برند — همان فایلی که جزوه‌ها استفاده می‌کنند */
const GLYPH = rd("handout/jozve-ai-access.svg").trim();

/**
 * قلم‌ها داخل خودِ فایل‌اند (base64)، نه لینک به بیرون.
 *
 * این نامه قرار است فرستاده شود و روی دستگاهی باز شود که ما هیچ
 * کنترلی رویش نداریم. قلمِ لینک‌شده آنجا نمی‌آید و مرورگر بی‌صدا
 * به قلمِ سیستم برمی‌گردد — و کدِ لایسنس، که تنها چیزِ مهمِ این
 * صفحه است، با قلمِ عوضی خوانده می‌شود.
 */
const FONTS = `
@font-face{font-family:"Meem";font-weight:300;font-style:normal;font-display:block;src:url(data:font/ttf;base64,${b64("public/fonts/Meem-Light.ttf")}) format("truetype")}
@font-face{font-family:"Meem";font-weight:700;font-style:normal;font-display:block;src:url(data:font/ttf;base64,${b64("public/fonts/Meem-Bold.ttf")}) format("truetype")}
@font-face{font-family:"Michroma";font-weight:400;font-style:normal;font-display:block;src:url(data:font/woff2;base64,${b64("handout/Michroma.woff2")}) format("woff2")}
@font-face{font-family:"Space Grotesk";font-weight:400 700;font-style:normal;font-display:block;src:url(data:font/woff2;base64,${b64("handout/SpaceGrotesk.woff2")}) format("woff2")}`;

const CSS = rd("welcome/welcome.css");

/**
 * کدِ لایسنس، دست‌نخورده.
 *
 * وسوسه‌اش هست که مثلِ کارتِ بانکی چهارتا‌چهارتا شکسته شود، ولی
 * کلیدِ اسپات‌پلیر یک رشتهٔ یکپارچه است و هر فاصله‌ای — حتی
 * فاصله‌ای که فقط دیداری باشد — این خطر را دارد که موقعِ تایپِ
 * دستی هم تایپ شود و کلید را خراب کند. فقط فضای خالیِ دو سر
 * گرفته می‌شود.
 */
const cleanKey = (k) => String(k).trim();

function page({ name, license, qr }) {
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<title>${esc(name)} — ثبت‌نام ${esc(CONFIG.courseFa)}</title>
<style>${CSS}</style>
<style>${FONTS}</style>
</head>
<body>
<main class="sheet">

  <header class="top">
    <span class="school">مدرسه دیزاین ملینا</span>
    <span class="lockup">${GLYPH}<span class="wordmark">ROBOTYPE</span></span>
  </header>

  <h1>ثبت‌نامت ثبت شد.</h1>
  <p class="who"><strong>${esc(name)}</strong> · ${esc(CONFIG.course)}</p>
  <p class="date">${esc(today)}</p>

  <section class="key">
    <span class="key-cap">کد لایسنس</span>
    <p class="key-code">${esc(cleanKey(license))}</p>
    <p class="key-note">روی <strong>${fa(CONFIG.devices)} دستگاه</strong> فعال می‌شود · مخصوصِ خودت است و قابل انتقال نیست</p>
  </section>

  <div class="cols">
    <section class="col">
      <h2>فعال‌سازی</h2>
      <ol class="steps">
        <li><strong>اسپات‌پلیر را روی کامپیوتر نصب کن.</strong> از <code>spotplayer.ir</code> — ویندوز، مک یا لینوکس. نسخهٔ موبایل هم هست، ولی <strong>همیشه دسکتاپ را ترجیح بده</strong>: صفحهٔ بزرگ‌تر یعنی کدی که روی اسلاید نوشته شده واقعاً خوانده می‌شود. موبایل برای مرور خوب است، نه برای کار کردن همراهِ درس.</li>
        <li><strong>بازش کن و کد بالا را وارد کن.</strong> همین یک کد، هم دوره را می‌آورد هم بازش می‌کند؛ چیز دیگری لازم نیست.</li>
        <li><strong>فصل‌ها را دانلود کن.</strong> بعد از دانلود، بدون اینترنت هم پخش می‌شوند.</li>
        <li><strong>جزوه‌ها جدا می‌آیند.</strong> لینکشان در گروه است و لازم نیست داخل پلیر دنبالشان بگردی.</li>
      </ol>
      <p class="tip">نسخهٔ تحت‌وب هم دارد، ولی روی دستگاه‌های قدیمی‌تر پلیر کند می‌شود. اگر ویدیو برید یا لگ داشت، قبل از اینکه اینترنتت را مقصر بدانی، اپِ دسکتاپ را امتحان کن.</p>
    </section>

    <section class="col">
      <h2>گروه دوره</h2>
      <p class="lede">اطلاع‌رسانی و رفع اشکال هر دو همین‌جاست. کانال جدا نداریم، پس خبر فصل‌های تازه هم اول همین‌جا می‌آید.</p>
      <figure class="qr">${qr}</figure>
      <p class="link"><a href="${esc(CONFIG.group)}">${esc(CONFIG.group.replace(/^https?:\/\//, ""))}</a></p>
    </section>
  </div>

  <section class="notes">
    <h2>دو چیز که بعداً به کارت می‌آید</h2>
    <ul>
      <li><strong>این فایل را نگه دار.</strong> اگر دستگاهت عوض شد یا ویندوز را از نو نصب کردی، همین کد را دوباره لازم داری.</li>
      <li><strong>کد را برای کسی نفرست.</strong> هر فعال‌سازی یکی از ${fa(CONFIG.devices)} سهمیه را می‌سوزاند و برگشتنش دست ما نیست.</li>
    </ul>
  </section>

  <footer class="foot">
    <span>پشتیبانی: <span class="ltr">${esc(CONFIG.support)}</span></span>
    <span class="ltr">${esc(CONFIG.site)}</span>
  </footer>

</main>
</body>
</html>`;
}

/* ── ورودی ─────────────────────────────────────────────────── */

/** `name,license` در هر سطر. سطرِ خالی و سطرِ `#` نادیده گرفته می‌شوند. */
function readCsv(file) {
  return fs
    .readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l, i) => {
      const at = l.indexOf(",");
      if (at < 0) throw new Error(`سطر ${i + 1} کاما ندارد: ${l}`);
      return { name: l.slice(0, at).trim(), license: l.slice(at + 1).trim() };
    });
}

const argv = process.argv.slice(2);
let people;
if (argv[0] === "--csv") {
  people = readCsv(path.resolve(ROOT, argv[1] ?? "welcome/students.csv"));
} else if (argv.length >= 2) {
  people = [{ name: argv[0], license: argv[1] }];
} else {
  console.error(`استفاده:
  node welcome/build.mjs "نام و نام خانوادگی" "LICENSE-KEY"
  node welcome/build.mjs --csv welcome/students.csv`);
  process.exit(1);
}

if (CONFIG.group.includes("REPLACE_ME"))
  console.warn("⚠  لینک گروه در CONFIG هنوز پر نشده — QR به جای اشتباهی می‌برد.");

/* ── خروجی ─────────────────────────────────────────────────── */

const OUT = path.join(ROOT, "welcome", "out");
fs.mkdirSync(OUT, { recursive: true });

const CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const browser = CANDIDATES.find((p) => fs.existsSync(p));

/* QR یک بار ساخته می‌شود، نه برای هر نفر: لینک گروه برای همه یکی است */
const qr = await QRCode.toString(CONFIG.group, {
  type: "svg",
  margin: 0,
  errorCorrectionLevel: "M",
  color: { dark: "#1a1714", light: "#00000000" },
});

for (const { name, license } of people) {
  /* نامِ فایل همان نامِ آدم است — موقع فرستادن باید بدانی کدام مالِ کیست */
  const safe = name.replace(/[\\/:*?"<>|]/g, "-").trim();
  const htmlPath = path.join(OUT, `${safe}.html`);
  fs.writeFileSync(htmlPath, page({ name, license, qr }));

  if (!browser) {
    console.log(`html  welcome/out/${safe}.html  (کروم پیدا نشد؛ PDF ساخته نشد)`);
    continue;
  }
  const pdfPath = path.join(OUT, `${safe}.pdf`);
  execFileSync(
    browser,
    [
      "--headless",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=6000",
      `--print-to-pdf=${pdfPath}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: "pipe" }
  );
  const pages = fs
    .readFileSync(pdfPath)
    .toString("latin1")
    .match(/\/Type\s*\/Page[^s]/g);
  console.log(
    `${safe}  →  ${(fs.statSync(pdfPath).size / 1024).toFixed(0)} KB، ${pages ? pages.length : "?"} صفحه`
  );
}
