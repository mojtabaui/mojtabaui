/**
 * جزوه‌ساز — از یک فایلِ متن و یک فایلِ استایل، HTML و PDF می‌سازد.
 *
 *   node handout/build.mjs <نام>
 *
 * `<نام>` هم اسمِ ورودی‌هاست هم اسمِ خروجی‌ها:
 *
 *   handout/<نام>.md   متنِ جزوه — تنها جایی که جمله‌ها هستند
 *   handout/<نام>.css  ظاهرِ همان جزوه
 *   public/<نام>.html  و  public/<نام>.pdf
 *
 * هر جزوه استایلِ خودش را دارد و نه یک پوستهٔ مشترک، چون این دو
 * سند از دو دنیای بصریِ متفاوت‌اند: یکی مشکیِ ROBOTYPE و آن یکی
 * کاغذِ کرمِ خودِ سایت. پوستهٔ مشترک یعنی هر تغییرِ یکی باید در آن
 * یکی هم بی‌اثر بماند، و این را هیچ‌کس مدت زیادی رعایت نمی‌کند.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const rd = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const b64 = (p) => fs.readFileSync(path.join(ROOT, p)).toString("base64");

/** نامِ جزوه — هم ورودی‌ها را نام می‌دهد هم خروجی‌ها */
const SLUG = (process.argv[2] || "jozve-claude").replace(/[^a-z0-9-]/gi, "");

/* ── نشانه‌گذاری ───────────────────────────────────────────── */

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * سه نشانه: **پررهنگ**، *تأکید*، و `کد`.
 *
 * سومی فقط تزئین نیست. یک نامِ لاتین وسطِ جملهٔ فارسی — مثلِ نامِ
 * پوشه‌ای که با زیرخط شروع می‌شود — را موتورِ دوجهتهٔ مرورگر
 * جابه‌جا می‌کند و زیرخط می‌پرد آن سرِ کلمه. جداسازیِ جهت این را
 * حل می‌کند، و تنها راهِ اعمالش این است که آن تکه نشانه‌گذاری
 * داشته باشد.
 */
const inline = (s) =>
  esc(s)
    .replace(/`([^`]+)`/g, '<code dir="ltr">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");

/**
 * بلوک‌های یک بدنه.
 *
 * بازگشتی است چون کادر (`::: card`) خودش می‌تواند تیتر و فهرست و
 * متنِ آمادهٔ کپی داشته باشد — و اگر بازگشتی نبود، هر چیزی داخلِ
 * کادر باید دوباره و جداگانه پشتیبانی می‌شد.
 */
function blocks(lines) {
  const out = [];
  let i = 0;
  const flushPara = (buf) => {
    if (buf.length) out.push(`<p>${inline(buf.join(" "))}</p>`);
    return [];
  };
  let para = [];

  while (i < lines.length) {
    const ln = lines[i];

    if (!ln.trim()) { para = flushPara(para); i++; continue; }

    if (ln.startsWith("### ")) {
      para = flushPara(para);
      out.push(`<h3>${inline(ln.slice(4).trim())}</h3>`);
      i++; continue;
    }

    if (ln.startsWith("> ")) {
      para = flushPara(para);
      const buf = [];
      while (i < lines.length && lines[i].startsWith("> ")) buf.push(lines[i++].slice(2));
      out.push(`<div class="why">${inline(buf.join(" "))}</div>`);
      continue;
    }

    /*
      کادرها: `::: card` و هم‌خانواده‌هایش.

      نامِ کادر آزاد است و مستقیم می‌شود نامِ کلاس، پس یک جزوه
      می‌تواند کادرِ خودش را داشته باشد بدونِ اینکه این فایل عوض
      شود. `step` تنها استثناست: آرگومان می‌گیرد — شماره و عنوان —
      چون قدمِ یک آموزشِ تصویری باید سرش را قبل از بدنه نشان بدهد.

          ::: card
          ::: warn
          ::: step ۰۴ | آدرس را از خودِ اپ بردار
    */
    const fence = ln.trim().match(/^::: +([a-z]+)(?: +(.*))?$/);
    if (fence) {
      para = flushPara(para);
      const [, kind, args] = fence;
      const buf = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") buf.push(lines[i++]);
      i++;
      if (kind === "step") {
        const [no, title] = (args ?? "").split("|").map((s) => s.trim());
        out.push(
          `<div class="step"><span class="step-n">${esc(no ?? "")}</span>` +
            `<div class="step-b"><h3>${inline(title ?? "")}</h3>${blocks(buf)}</div></div>`
        );
      } else {
        out.push(`<div class="${kind}">${blocks(buf)}</div>`);
      }
      continue;
    }

    /*
      تصویر: `@fig <نام> | زیرنویس`

      فایل از `handout/figures/<نام>.svg` خوانده و *داخلِ* سند
      چسبانده می‌شود، نه لینک. دلیلش همانِ قلم‌هاست: جزوه باید
      آفلاین و داخلِ یک فایل کامل باشد. جاسازی این را هم می‌دهد
      که نقشه‌ها رنگِ متن را به ارث ببرند — یعنی با تمِ سند عوض
      شوند، به‌جای اینکه یک تصویرِ روشن وسطِ صفحهٔ تیره بنشیند.
    */
    const figm = ln.trim().match(/^@fig +([a-z0-9-]+)(?: *\| *(.*))?$/);
    if (figm) {
      para = flushPara(para);
      const [, name, cap] = figm;
      const file = path.join(ROOT, "handout", "figures", `${name}.svg`);
      if (!fs.existsSync(file)) throw new Error(`figure not found: ${name}.svg`);
      out.push(
        `<figure class="fig">${fs.readFileSync(file, "utf8").trim()}` +
          (cap ? `<figcaption>${inline(cap)}</figcaption>` : "") +
          `</figure>`
      );
      i++; continue;
    }

    if (ln.startsWith("```")) {
      para = flushPara(para);
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) buf.push(lines[i++]);
      i++;
      out.push(`<div class="pre">${esc(buf.join("\n"))}</div>`);
      continue;
    }

    if (/^\d+\.\s/.test(ln)) {
      para = flushPara(para);
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i]))
        items.push(inline(lines[i++].replace(/^\d+\.\s/, "")));
      out.push(`<ol>${items.map((t) => `<li>${t}</li>`).join("")}</ol>`);
      continue;
    }

    if (ln.startsWith("- ")) {
      para = flushPara(para);
      const items = [];
      while (i < lines.length && lines[i].startsWith("- "))
        items.push(inline(lines[i++].slice(2)));
      out.push(`<ul>${items.map((t) => `<li>${t}</li>`).join("")}</ul>`);
      continue;
    }

    para.push(ln.trim());
    i++;
  }
  flushPara(para);
  return out.join("\n");
}

/** `# cover` و `# cta` فقط جفتِ کلید-مقدارند، نه متنِ آزاد */
function fields(lines) {
  const f = {};
  for (const ln of lines) {
    const m = ln.match(/^([a-z]+):\s*(.*)$/);
    if (m) f[m[1]] = m[2].trim();
  }
  return f;
}

function parse(src) {
  const doc = { cover: {}, cta: {}, sections: [] };
  const chunks = src
    .replace(/<!--[^]*?-->/g, "")
    .split(/\n(?=#{1,2} )/);

  for (const chunk of chunks) {
    const lines = chunk.split("\n");
    const head = lines[0];
    if (!head.startsWith("#")) continue;

    if (head.startsWith("# ")) {
      const key = head.slice(2).trim();
      if (key === "cover" || key === "cta") doc[key] = fields(lines.slice(1));
      continue;
    }

    /*
      عنوان دو تکه‌ای هم مجاز است.

      شکل کامل «شماره | برچسب لاتین | عنوان» است، ولی برچسب لاتین
      اختیاری است و اگر نباشد، آن سطر کوچک بالای عنوان اصلاً کشیده
      نمی‌شود. دلیلش این است که برچسب فقط وقتی می‌ارزد که خودش
      حرفی داشته باشد؛ یک کلمه انگلیسی که فقط ترجمه عنوان فارسی
      زیرش باشد، تزئین است نه اطلاعات.
    */
    const parts = head.slice(3).split("|").map((s) => s.trim());
    const [no, mark, title] =
      parts.length >= 3 ? parts : [parts[0], "", parts[1] ?? ""];
    const sec = { no, mark, title, dark: false, from: "", lede: "" };
    let i = 1;
    for (; i < lines.length; i++) {
      const ln = lines[i];
      if (ln.trim() === "dark") { sec.dark = true; continue; }
      const m = ln.match(/^(from|lede):\s*(.*)$/);
      if (m) { sec[m[1]] = m[2].trim(); continue; }
      break;
    }
    sec.body = blocks(lines.slice(i));
    doc.sections.push(sec);
  }
  return doc;
}

/* ── رندر ──────────────────────────────────────────────────── */

/**
 * سرِ ربات — همان هندسهٔ `RobotFlat.tsx`.
 *
 * روی جلد، جلوی نشانِ واژه‌ای می‌نشیند و وسطش را می‌بُرد؛ دقیقاً
 * همان کاری که پیکرهٔ سه‌بعدی در هیروِ لندینگ با کلمهٔ ROBOTYPE
 * می‌کند. بدنه هم‌رنگِ زمینه است و فقط با یک خطِ مو و دو چشمِ روشن
 * خوانده می‌شود — همان‌طور که آنجا فقط لبه و چشم‌ها دیده می‌شوند.
 */
const ROBOT_GLYPH = `<svg class="glyph" viewBox="-1 -1 50 72" aria-hidden="true">
  <g fill="var(--g-fill)" stroke="var(--g-line)" stroke-width="1">
    <circle cx="24" cy="24" r="24"/><rect x="14" y="49" width="20" height="10"/><rect x="4" y="61.5" width="40" height="6"/>
  </g>
  <g fill="var(--g-eye)"><rect x="7.5" y="19" width="12" height="8"/><rect x="28.5" y="19" width="12" height="8"/></g>
</svg>`;

const TILE = `<svg class="tile" aria-hidden="true"><rect width="100%" height="100%" fill="url(#tile)"/></svg>
  <div class="grain" aria-hidden="true"></div>`;

/**
 * نشانِ جلد، از فایلِ خودِ جزوه.
 *
 * اگر `handout/<نام>.svg` وجود داشته باشد، همان می‌نشیند؛ وگرنه سرِ
 * ربات. دلیلش این است که نشان، *هویتِ* سند است نه تزئینش: جزوه‌ای
 * که با هویتِ سایت طراحی شده باید سیبیلِ برند را داشته باشد، نه
 * ربات را. و این چیزی نیست که بشود با CSS عوضش کرد.
 */
const glyphPath = path.join(ROOT, "handout", `${SLUG}.svg`);
const GLYPH = fs.existsSync(glyphPath)
  ? rd(`handout/${SLUG}.svg`).trim()
  : ROBOT_GLYPH;

const meta = (s) =>
  s ? `<ul class="meta">${s.split("|").map((x) => `<li>${inline(x.trim())}</li>`).join("")}</ul>` : "";

/** یک نقشه از `handout/figures/` — همان مسیری که `@fig` می‌خواند */
const figSvg = (name) =>
  rd(path.join("handout", "figures", `${name}.svg`)).trim();

function render(doc) {
  const c = doc.cover;
  const t = doc.cta;

  /* `dark: no` یعنی جلد روی کاغذِ روشن بنشیند، نه روی سیاهی */
  const lit = (f) => (f.dark === "no" ? "" : " dark");

  /*
    دو جورِ جلد.

    پیش‌فرض همان لاکاپِ نشان‌روی‌کلمه است. ولی وقتی `art:` داده شده،
    نشانه کنار می‌رود و جایش یک نقشه می‌نشیند — چون جلدِ یک راهنما
    باید *حرفِ* راهنما را بزند، نه نامِ برند را. نشانه آن‌وقت به یک
    خطِ کوچکِ بالای صفحه تبدیل می‌شود، جایی که امضا باید باشد.
  */
  const cover = c.art
    ? `<header class="cover cover--art${lit(c)}">
  ${TILE}
  <div class="wrap cover-in">
    <div class="cover-bar">
      <span class="cap">${inline(c.kicker ?? "")}</span>
      <span class="wordmark wordmark--bar">${esc(c.wordmark ?? "")}</span>
    </div>
    <div class="cover-mid">
      <h1>${inline(c.title ?? "")}</h1>
      <p class="cover-sub">${inline(c.sub ?? "")}</p>
      <p class="lede">${inline(c.lede ?? "")}</p>
      <figure class="cover-art">${figSvg(c.art)}</figure>
    </div>
    ${meta(c.meta)}
  </div>
</header>`
    : `<header class="cover${lit(c)}">
  ${TILE}
  <div class="wrap cover-in">
    <span class="cap">${inline(c.kicker ?? "")}</span>
    <div class="cover-mid">
      <div class="lockup">
        ${GLYPH}
        <span class="wordmark">${esc(c.wordmark ?? "")}</span>
      </div>
      <h1>${inline(c.title ?? "")}</h1>
      <p class="cover-sub">${inline(c.sub ?? "")}</p>
      <p class="lede">${inline(c.lede ?? "")}</p>
    </div>
    ${meta(c.meta)}
  </div>
</header>`;

  const sections = doc.sections
    .map(
      (s) => `<section class="sec brk${s.dark ? " dark" : ""}">
  ${s.dark ? TILE : ""}
  <div class="wrap">
    <div class="head">
      <span class="no">${esc(s.no)}</span>
      <div class="head-t">
        ${s.mark ? `<span class="cap cap-en">${esc(s.mark)}</span>` : ""}
        <h2>${inline(s.title)}</h2>
        ${s.from ? `<p class="from">${inline(s.from)}</p>` : ""}
      </div>
    </div>
    ${s.lede ? `<p class="lede">${inline(s.lede)}</p>` : ""}
    ${s.body}
  </div>
</section>`
    )
    .join("\n");

  const cta = `<footer class="sec brk cta${lit(t)}">
  ${TILE}
  <div class="wrap">
    <span class="cap">${inline(t.kicker ?? "")}</span>
    <div class="lockup lockup--sm">
      ${GLYPH}
      <span class="wordmark">${esc(t.wordmark ?? "")}</span>
    </div>
    <p class="cap cap-en">${esc(t.sub ?? "")}</p>
    <h2 class="cta-h">${inline(t.title ?? "")}</h2>
    <p class="lede">${inline(t.lede ?? "")}</p>
    <div class="card"><p>${inline(t.note ?? "")}</p></div>
    <p><a class="btn" href="${esc(t.url ?? "")}">${inline(t.cta ?? "")}</a></p>
    <p class="url">${esc((t.url ?? "").replace(/^https?:\/\//, ""))}</p>
    <hr class="rule">
    ${t.source ? `<p class="src">${inline(t.source)}</p>` : ""}
    <p class="foot">${inline(t.foot ?? "")}</p>
  </div>
</footer>`;

  return { cover, sections, cta };
}

/* ── سند ───────────────────────────────────────────────────── */

/**
 * قلم‌ها داخلِ خودِ فایل‌اند (base64)، نه لینک به بیرون.
 *
 * جزوه قرار است فرستاده شود و روی دستگاهی باز شود که شاید اینترنت
 * ندارد. قلمِ لینک‌شده آنجا نمی‌آید و مرورگر بی‌صدا به قلمِ سیستم
 * برمی‌گردد — یعنی همان چیزی که جزوه را «همان‌جا» نشان می‌داد،
 * اولین چیزی است که از دست می‌رود. برای PDF هم لازم است: کرومِ
 * بی‌سر فایل را آفلاین باز می‌کند.
 *
 * Meem قلمِ فارسیِ سایت است. Michroma فقط برای همان یک کلمهٔ
 * ROBOTYPE، با زیرمجموعهٔ لاتین (SIL OFL).
 */
const FONTS = `
@font-face{font-family:"Meem";font-weight:300;font-style:normal;font-display:block;src:url(data:font/ttf;base64,${b64("public/fonts/Meem-Light.ttf")}) format("truetype")}
@font-face{font-family:"Meem";font-weight:700;font-style:normal;font-display:block;src:url(data:font/ttf;base64,${b64("public/fonts/Meem-Bold.ttf")}) format("truetype")}
@font-face{font-family:"Michroma";font-weight:400;font-style:normal;font-display:block;src:url(data:font/woff2;base64,${b64("handout/Michroma.woff2")}) format("woff2")}
@font-face{font-family:"Space Grotesk";font-weight:400 700;font-style:normal;font-display:block;src:url(data:font/woff2;base64,${b64("handout/SpaceGrotesk.woff2")}) format("woff2")}`;

const doc = parse(rd(`handout/${SLUG}.md`));
const { cover, sections, cta } = render(doc);

const html = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(doc.cover.title ?? "")} — ${esc(doc.cover.sub ?? "")} | مدرسه دیزاین ملینا</title>
<meta name="description" content="${esc(doc.cover.lede ?? "")}">
<!-- ساخته‌شده از handout/copy.md — این فایل را دستی ویرایش نکن؛ متن آنجاست. -->
<style>${rd(`handout/${SLUG}.css`)}</style>
<style>${FONTS}</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <pattern id="tile" width="86" height="86" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
    <g fill="#f4efe8" transform="translate(24 26) scale(0.55)"><circle cx="24" cy="24" r="24"/><rect x="14" y="50" width="20" height="9"/><rect x="4" y="62" width="40" height="5"/></g>
    <g fill="#0a0908" transform="translate(24 26) scale(0.55)"><rect x="7.5" y="19" width="12" height="8"/><rect x="28.5" y="19" width="12" height="8"/></g>
  </pattern>
</defs></svg>
${cover}
${sections}
${cta}
</body>
</html>`;

const OUT = path.join(ROOT, "public", `${SLUG}.html`);
fs.writeFileSync(OUT, html);
console.log(`html  ${(html.length / 1024).toFixed(0)} KB  public/${SLUG}.html`);

/* ── PDF ───────────────────────────────────────────────────── */

/**
 * چاپ با کرومِ بی‌سر، چون همان موتوری است که HTML را رندر می‌کند.
 *
 * هر تبدیل‌کنندهٔ دیگری یعنی یک موتورِ دوم با پشتیبانیِ متفاوت از
 * راست‌به‌چپ و از قلمِ جاسازی‌شده — و آن وقت PDF و صفحه دو چیزِ
 * متفاوت می‌شوند و هر اصلاحی باید دو بار دیده شود.
 */
const CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const browser = CANDIDATES.find((p) => fs.existsSync(p));
if (!browser) {
  console.log("pdf   — کروم یا اج پیدا نشد؛ فقط HTML ساخته شد");
} else {
  const pdf = path.join(ROOT, "public", `${SLUG}.pdf`);
  execFileSync(browser, [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    /* مهلتِ رندر: قلم‌های جاسازی‌شده باید قبل از چاپ نشسته باشند */
    "--virtual-time-budget=6000",
    `--print-to-pdf=${pdf}`,
    /* pathToFileURL، نه چسباندنِ دستیِ file:/// — مسیرِ ویندوز جداکنندهٔ دیگری دارد */
    pathToFileURL(OUT).href,
  ], { stdio: "pipe" });
  const size = fs.statSync(pdf).size;
  const pages = fs.readFileSync(pdf).toString("latin1").match(/\/Type\s*\/Page[^s]/g);
  console.log(`pdf   ${(size / 1024).toFixed(0)} KB  ${pages ? pages.length : "?"} صفحه  public/${SLUG}.pdf`);
}
