/**
 * هویت بصری گروه‌های تلگرام دوره‌ها — «دستِ ورقِ ملینا».
 *
 *   node brand-kit/build.mjs
 *
 * هر دوره یک خال از یک دست ورق است، همان که آیکن‌های سایت از قبل
 * ساخته بودند (public/images/ui_infinity.png و بقیه):
 *   رابط کاربری ♥ · تجربه کاربری ♠ · پرتفولیو ♣ · تعامل ♦
 * بی‌نهایت = زمینهٔ تیره و ∞ طلایی در گوشه‌ها، آفلاین = زمینهٔ روشن.
 * روبوتایپ ژوکرِ این دست است: سیاه و طلایی، مثل پوسترش.
 *
 * خروجی در brand-kit/out/ (در gitignore):
 *   avatars/  عکس پروفایل هر گروه، ۱۲۸۰×۱۲۸۰ (تلگرام دایره‌ای می‌بُردش)
 *   covers/   کاور برنامهٔ هفتگی، A4 به‌صورت PNG و PDF
 *   sheet.png برگهٔ مرور: همه کنار هم، در اندازهٔ واقعی فهرست چت
 *
 * کارت، رنگ‌ها و کاور از همین فایل export می‌شوند و planners.mjs
 * (برنامهٔ هفتگیِ کامل) از آن‌ها استفاده می‌کند.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
export const OUT = path.join(ROOT, "brand-kit", "out");
export const TMP = path.join(OUT, ".html");

const b64 = (p) => fs.readFileSync(path.join(ROOT, p)).toString("base64");
export const FONTS = `
@font-face{font-family:"Meem";font-weight:300;src:url(data:font/ttf;base64,${b64("public/fonts/Meem-Light.ttf")}) format("truetype")}
@font-face{font-family:"Meem";font-weight:700;src:url(data:font/ttf;base64,${b64("public/fonts/Meem-Bold.ttf")}) format("truetype")}
@font-face{font-family:"Michroma";font-weight:400;src:url(data:font/woff2;base64,${b64("handout/Michroma.woff2")}) format("woff2")}
@font-face{font-family:"Space Grotesk";font-weight:400 700;src:url(data:font/woff2;base64,${b64("handout/SpaceGrotesk.woff2")}) format("woff2")}`;

/* ══ رنگ‌ها ══════════════════════════════════════════════════
   خال‌ها همان رنگِ آیکن‌های سایت‌اند. زمینه‌ها تازه‌اند: تیره‌ها از
   بنرهای دوره (شرابیِ UI، سرمه‌ایِ UX) و روشن‌ها رقیق‌شدهٔ همان خال. */
export const INK = "#1a1714";
export const CREAM = "#FAF6F1";
const FACE = "#FFFDF9";
export const GOLD = "#C9A24A";

export const SUITS = {
  heart: "M50 90 C24 70 5 54 5 33 C5 18 16 7 30 7 C39 7 46 12 50 21 C54 12 61 7 70 7 C84 7 95 18 95 33 C95 54 76 70 50 90 Z",
  spade: "M50 5 C62 22 93 38 93 60 C93 73 83 82 71 82 C63 82 57 78 53 72 C54 82 58 89 66 95 L34 95 C42 89 46 82 47 72 C43 78 37 82 29 82 C17 82 7 73 7 60 C7 38 38 22 50 5 Z",
  club: "M50 8 A19 19 0 0 1 64 40 A19 19 0 1 1 55 68 C56 80 60 88 67 95 L33 95 C40 88 44 80 45 68 A19 19 0 1 1 36 40 A19 19 0 0 1 50 8 Z",
  diamond: "M50 3 Q66 28 86 50 Q66 72 50 97 Q34 72 14 50 Q34 28 50 3 Z",
};
const INFINITY = "M28 50 C28 37 44 37 50 50 C56 63 72 63 72 50 C72 37 56 37 50 50 C44 63 28 63 28 50 Z";
export const GLYPH = "M60 54 C74 38 104 36 114 58 C104 48 80 54 68 70 C65 74 55 74 52 70 C40 54 16 48 6 58 C16 36 46 38 60 54 Z";

/** هر گروه تلگرام = یک کارت */
export const DECK = [
  { slug: "ui-infinity", fa: "طراحی رابط کاربری بی‌نهایت", latin: "UI DESIGN INFINITY", suit: "heart", color: "#E5484D", deep: "#B42634", ground: "#5A1424", infinity: true, weeks: "۱۰ هفته · منتورینگ گروهی" },
  { slug: "ux-infinity", fa: "طراحی تجربه کاربری بی‌نهایت", latin: "UX DESIGN INFINITY", suit: "spade", color: "#4F80E1", deep: "#2A57B8", ground: "#142350", infinity: true, weeks: "۱۰ هفته · منتورینگ گروهی" },
  { slug: "ui-offline", fa: "طراحی رابط کاربری", latin: "UI DESIGN", suit: "heart", color: "#E5484D", deep: "#B42634", ground: "#F8DEDB", infinity: false, weeks: "۱۰ هفته · آفلاین، با تمپوی خودت" },
  { slug: "ux-offline", fa: "طراحی تجربه کاربری", latin: "UX DESIGN", suit: "spade", color: "#4F80E1", deep: "#2A57B8", ground: "#DCE6F8", infinity: false, weeks: "۱۰ هفته · آفلاین، با تمپوی خودت" },
  { slug: "portfolio", fa: "طراحی پرتفولیو", latin: "PORTFOLIO DESIGN", suit: "club", color: "#5E9E4E", ground: "#DDEBD5", infinity: false },
  { slug: "prototype", fa: "طراحی تعامل و پروتوتایپ", latin: "PROTOTYPE DESIGN", suit: "diamond", color: "#E8A92C", ground: "#F7EACB", infinity: false },
  { slug: "robotype", fa: "روبوتایپ", latin: "ROBOTYPE", joker: true },
];

/* ══ کارت ════════════════════════════════════════════════════
   یک SVG با viewBox ثابت ۳۰۰×۴۲۰ تا آواتار و کاور یک کارت مشترک
   داشته باشند و فقط اندازه‌اش عوض شود. */
export function suitAt(d, x, y, size, fill, flip = false) {
  const s = size / 100;
  const r = flip ? ` rotate(180 50 50)` : "";
  return `<g transform="translate(${x - size / 2} ${y - size / 2}) scale(${s})"><path d="${d}" fill="${fill}" transform="${r}"/></g>`;
}
function infAt(x, y, size) {
  const s = size / 100;
  return `<g transform="translate(${x - size / 2} ${y - size / 2}) scale(${s})"><path d="${INFINITY}" fill="none" stroke="${GOLD}" stroke-width="7" stroke-linejoin="round"/></g>`;
}

export function card(c, { pip = 128, glyph = 1.55 } = {}) {
  if (c.joker) {
    // ژوکر: کارتِ سیاه با قاب طلایی و نشانِ ملینا؛ گوشه‌ها حرف R به قلمِ پوستر
    return `<svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="jg" cx="50%" cy="46%" r="60%"><stop offset="0" stop-color="#3a2f17"/><stop offset="1" stop-color="#0d0c0a"/></radialGradient>
    <linearGradient id="jgold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3D58A"/><stop offset="1" stop-color="#C9A24A"/></linearGradient>
  </defs>
  <rect x="3" y="3" width="294" height="414" rx="30" fill="url(#jg)" stroke="${GOLD}" stroke-width="3"/>
  <rect x="17" y="17" width="266" height="386" rx="20" fill="none" stroke="${GOLD}" stroke-opacity=".45" stroke-width="1.5"/>
  <g transform="translate(150 212) scale(${glyph}) translate(-60 -58)"><path d="${GLYPH}" fill="url(#jgold)"/></g>
  <text x="40" y="62" font-family="Michroma" font-size="30" fill="${GOLD}" text-anchor="middle">R</text>
  <text x="260" y="388" font-family="Michroma" font-size="30" fill="${GOLD}" text-anchor="middle" transform="rotate(180 260 377)">R</text>
</svg>`;
  }
  const corners = c.infinity
    ? `${infAt(250, 52, 52)}${infAt(50, 368, 52)}`
    : "";
  return `<svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="3" width="294" height="414" rx="30" fill="${FACE}"/>
  <rect x="17" y="17" width="266" height="386" rx="20" fill="none" stroke="${c.color}" stroke-opacity=".55" stroke-width="2.5"/>
  ${suitAt(SUITS[c.suit], 150, 210, pip, c.color)}
  ${suitAt(SUITS[c.suit], 52, 54, 40, c.color)}
  ${suitAt(SUITS[c.suit], 248, 366, 40, c.color, true)}
  ${corners}
</svg>`;
}

/* ══ آواتار ══════════════════════════════════════════════════
   تلگرام عکس را دایره می‌بُرد و در فهرست چت حدود ۵۰ پیکسل نشانش
   می‌دهد. پس فقط یک چیز باید از دور خوانده شود: خالِ رنگی روی کارت.
   کارت کمی کج است تا «ورق» خوانده شود نه یک برچسبِ صاف؛ گوشه‌هایش
   داخلِ دایرهٔ امن می‌مانند. */
function avatarHtml(c) {
  const dark = c.joker || c.infinity;
  const ground = c.joker ? "#070707" : c.ground;
  const halo = c.joker
    ? `<div class="halo"></div>`
    : "";
  const shadow = dark ? "rgba(0,0,0,.45)" : "rgba(26,23,20,.16)";
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
html,body{margin:0;width:640px;height:640px;overflow:hidden;background:${ground}}
.wrap{position:relative;width:640px;height:640px;display:flex;align-items:center;justify-content:center}
.card{width:322px;height:451px;transform:rotate(-8deg);filter:drop-shadow(0 22px 28px ${shadow})}
.card svg{width:100%;height:100%;display:block}
.halo{position:absolute;width:560px;height:560px;border-radius:50%;
  border:2px solid rgba(201,162,74,.75);
  box-shadow:0 0 60px rgba(201,162,74,.35), inset 0 0 50px rgba(201,162,74,.18)}
</style></head><body><div class="wrap">${halo}<div class="card">${card(c, { pip: 176, glyph: 2.15 })}</div></div></body></html>`;
}

/* ══ کاور برنامهٔ هفتگی ══════════════════════════════════════
   A4 عمودی تا جلوی PDFِ برنامه بنشیند. همان زمینه و همان کارت آواتار،
   فقط بزرگ؛ عضوِ گروه وقتی فایل را باز می‌کند همان چیزی را می‌بیند
   که بالای چتش است. */
export function coverParts(c) {
  const dark = c.infinity;
  const ink = dark ? CREAM : INK;
  const mute = dark ? "rgba(250,246,241,.62)" : "#6b6560";
  const line = dark ? "rgba(250,246,241,.18)" : "rgba(26,23,20,.14)";
  const css = `
.cover{width:210mm;height:297mm;box-sizing:border-box;padding:18mm 17mm 15mm;display:flex;flex-direction:column;background:${c.ground};color:${ink};font-family:"Meem",sans-serif;position:relative;overflow:hidden}
.cover .top{display:flex;justify-content:space-between;align-items:center;padding-bottom:4mm;border-bottom:1px solid ${line}}
.cover .school{font-size:12.5px;font-weight:700;color:${mute}}
.cover .lock{display:flex;align-items:center;gap:7px;direction:ltr}
.cover .lock svg{height:15px;width:auto}
.cover .lock span{font-family:"Michroma";font-size:10px;letter-spacing:.22em;color:${ink}}
.cover .stage{flex:1;display:flex;align-items:center;justify-content:center;position:relative}
.cover .card{width:92mm;height:128.8mm;transform:rotate(-7deg);filter:drop-shadow(0 18mm 16mm ${dark ? "rgba(0,0,0,.4)" : "rgba(26,23,20,.15)"})}
.cover .card svg{width:100%;height:100%;display:block}
.cover .ghost{position:absolute;width:92mm;height:128.8mm;transform:rotate(6deg) translate(14mm,-4mm);border-radius:9mm;background:${dark ? "rgba(250,246,241,.06)" : "rgba(255,255,255,.55)"};border:1px solid ${line}}
.cover .eyebrow{font-family:"Space Grotesk";font-weight:700;font-size:11px;letter-spacing:.28em;color:${c.infinity ? GOLD : c.deep ?? c.color};direction:ltr;text-align:right}
.cover h1{margin:3mm 0 0;font-weight:700;font-size:54px;line-height:1.3}
.cover .course{margin:2mm 0 0;font-size:22px;font-weight:700}
.cover .meta{margin:2.5mm 0 0;font-size:14px;font-weight:300;color:${mute}}
.cover .foot{margin-top:9mm;padding-top:4mm;border-top:1px solid ${line};display:flex;justify-content:space-between;font-size:11px;color:${mute}}
.cover .ltr{direction:ltr;unicode-bidi:isolate}`;
  const body = `<main class="cover">
  <header class="top">
    <span class="school">مدرسه دیزاین ملینا</span>
    <span class="lock"><svg viewBox="0 4 120 108"><path d="${GLYPH}" fill="${ink}"/></svg><span>MOJTABAUI</span></span>
  </header>
  <div class="stage"><div class="ghost"></div><div class="card">${card(c)}</div></div>
  <section>
    <div class="eyebrow">${c.latin} · WEEKLY PLAN</div>
    <h1>برنامهٔ هفتگی</h1>
    <p class="course">${c.fa}</p>
    <p class="meta">${c.weeks}</p>
  </section>
  <footer class="foot"><span>پشتیبانی: <span class="ltr">@melina_support</span></span><span class="ltr">mojtabaui.ir</span></footer>
</main>`;
  return { css, body };
}

function coverHtml(c) {
  const { css, body } = coverParts(c);
  return `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><style>${FONTS}
@page{size:A4;margin:0}
html,body{margin:0;background:${c.ground};-webkit-print-color-adjust:exact;print-color-adjust:exact}
${css}
</style></head><body>${body}</body></html>`;
}

/* ══ برگهٔ مرور ══════════════════════════════════════════════
   آواتار را باید در اندازهٔ واقعی‌اش قضاوت کرد: دایرهٔ ۵۴ پیکسلی کنار
   اسم گروه، هم در تم روشن تلگرام هم تیره. */
function sheetHtml() {
  const row = (c, theme) => `<div class="row ${theme}">
    <img src="avatars/${c.slug}.png"><div><b>${c.fa}</b><small>مجتبا: برنامهٔ این هفته رو گذاشتم 👇</small></div></div>`;
  const big = DECK.map((c) => `<figure><img src="avatars/${c.slug}.png"><figcaption>${c.fa}</figcaption></figure>`).join("");
  return `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><style>${FONTS}
body{margin:0;padding:28px;background:#efebe5;font-family:"Meem";width:1180px}
h2{font-size:15px;margin:0 0 12px;color:#6b6560}
.big{display:grid;grid-template-columns:repeat(7,1fr);gap:16px;margin-bottom:28px}
.big img{width:100%;border-radius:50%;display:block}
figure{margin:0}figcaption{font-size:12px;text-align:center;margin-top:8px;color:#3d3833;font-weight:700}
.lists{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.list{border-radius:14px;overflow:hidden}
.row{display:flex;gap:12px;align-items:center;padding:9px 14px}
.row img{width:54px;height:54px;border-radius:50%}
.row b{display:block;font-size:15px}.row small{font-size:13px;font-weight:300}
.light{background:#fff;color:#000}.light small{color:#707579}
.dark{background:#17212b;color:#fff}.dark small{color:#7f91a4}
</style></head><body>
<h2>آواتارها — دایره‌ای، همان‌طور که تلگرام می‌بُرد</h2><div class="big">${big}</div>
<h2>در فهرست چت — ۵۴ پیکسل، تم روشن و تیره</h2>
<div class="lists"><div class="list">${DECK.map((c) => row(c, "light")).join("")}</div><div class="list">${DECK.map((c) => row(c, "dark")).join("")}</div></div>
</body></html>`;
}

/* ══ رندر ════════════════════════════════════════════════════ */
const BROWSER = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find((p) => fs.existsSync(p));
if (!BROWSER) throw new Error("کروم یا اج پیدا نشد");

export function shot(html, file, w, h, scale = 2, src = path.join(TMP, path.basename(file) + ".html")) {
  fs.writeFileSync(src, html);
  execFileSync(BROWSER, ["--headless", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
    `--force-device-scale-factor=${scale}`, `--window-size=${w},${h}`, "--virtual-time-budget=4000",
    `--screenshot=${file}`, pathToFileURL(src).href], { stdio: "pipe" });
}
export function pdf(html, file) {
  const src = path.join(TMP, path.basename(file) + ".html");
  fs.writeFileSync(src, html);
  execFileSync(BROWSER, ["--headless", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=4000",
    `--print-to-pdf=${file}`, pathToFileURL(src).href], { stdio: "pipe" });
}

export function ensureDirs() {
  for (const d of [OUT, TMP, path.join(OUT, "avatars"), path.join(OUT, "covers"), path.join(OUT, "planners")])
    fs.mkdirSync(d, { recursive: true });
}

function main() {
ensureDirs();
for (const c of DECK) {
  shot(avatarHtml(c), path.join(OUT, "avatars", `${c.slug}.png`), 640, 640);
  console.log(`avatar  ${c.slug}`);
}
for (const c of DECK.filter((c) => c.weeks)) {
  const html = coverHtml(c);
  // ۷۹۴×۱۱۲۳ = A4 در ۹۶dpi؛ ضرب در ۲ برای PNG شارپ
  shot(html, path.join(OUT, "covers", `${c.slug}.png`), 794, 1123);
  pdf(html, path.join(OUT, "covers", `${c.slug}.pdf`));
  console.log(`cover   ${c.slug}`);
}
// برگهٔ مرور کنار پوشهٔ avatars ساخته می‌شه تا آدرس‌های نسبیِ عکس‌ها درست باشن
shot(sheetHtml(), path.join(OUT, "sheet.png"), 1236, 1040, 1, path.join(OUT, "sheet.html"));
fs.rmSync(TMP, { recursive: true, force: true });
console.log("sheet   brand-kit/out/sheet.png");
}

// فقط وقتی مستقیم اجرا شود؛ planners.mjs همین فایل را import می‌کند
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
