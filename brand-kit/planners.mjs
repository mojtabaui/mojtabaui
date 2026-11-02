/**
 * برنامهٔ هفتگیِ کامل — کاور + ده صفحهٔ هفته، در هویت «دستِ ورق».
 *
 *   node brand-kit/planners.mjs
 *
 * خروجی: brand-kit/out/planners/<slug>.pdf (یازده صفحهٔ A4) و چند
 * پیش‌نمایش PNG از صفحه‌ها در همان پوشه.
 *
 * محتوا در planner-content.mjs است؛ برای عوض کردن یک تسک فقط همان
 * فایل را ویرایش کن و دوباره اجرا کن.
 */
import path from "node:path";
import { DECK, FONTS, INK, CREAM, GOLD, GLYPH, SUITS, card, coverParts, shot, pdf, OUT, ensureDirs } from "./build.mjs";
import { PLANS } from "./planner-content.mjs";

const fa = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** خالِ کوچک به‌صورت SVG درون‌خطی */
const suit = (c, size, { fill = c.color, stroke = null, opacity = 1 } = {}) =>
  `<svg viewBox="0 0 100 100" width="${size}" height="${size}" style="display:block;opacity:${opacity}"><path d="${SUITS[c.suit]}" fill="${stroke ? "none" : fill}" ${stroke ? `stroke="${stroke}" stroke-width="7"` : ""}/></svg>`;

function weekCss(c) {
  const dark = c.infinity;
  const bandInk = dark ? CREAM : INK;
  const bandMute = dark ? "rgba(250,246,241,.7)" : "rgba(26,23,20,.62)";
  return `
.week{width:210mm;height:297mm;box-sizing:border-box;background:${CREAM};color:${INK};font-family:"Meem",sans-serif;display:flex;flex-direction:column;position:relative;overflow:hidden;break-before:page}
/* نوار بالا همان زمینهٔ آواتار گروه است: تیره برای بی‌نهایت، روشن برای آفلاین */
.week .band{background:${c.ground};color:${bandInk};padding:7mm 15mm 6mm;display:flex;justify-content:space-between;align-items:center}
.week .band b{font-size:12.5px;font-weight:700}
.week .band .sub{font-size:11px;font-weight:300;color:${bandMute};margin-inline-start:6px}
.week .band .lock{display:flex;align-items:center;gap:6px;direction:ltr}
.week .band .lock svg{height:12px;width:auto}
.week .band .lock span{font-family:"Michroma";font-size:8.5px;letter-spacing:.22em}
.week .body{flex:1;padding:12mm 15mm 0;display:flex;flex-direction:column}
.week .head{display:flex;justify-content:space-between;align-items:flex-start;gap:10mm}
.week .eyebrow{font-family:"Space Grotesk";font-weight:700;font-size:10px;letter-spacing:.26em;color:${c.deep};direction:ltr;text-align:right}
.week h1{margin:2mm 0 0;font-size:46px;font-weight:700;line-height:1.3}
.week h1 .n{color:${c.color};font-size:64px;margin-inline-start:12px}
.week .pips{display:flex;gap:5px;margin-top:4mm;align-items:center}
.week .pips small{font-size:11px;color:#6b6560;margin-inline-start:8px}
.week .mini{width:30mm;height:42mm;transform:rotate(-8deg);margin-top:2mm;flex-shrink:0;filter:drop-shadow(0 4mm 5mm rgba(26,23,20,.14))}
.week .mini svg{width:100%;height:100%;display:block}
.week h2{font-size:13px;font-weight:700;color:#6b6560;margin:11mm 0 3mm;display:flex;align-items:center;gap:8px}
.week h2::after{content:"";flex:1;height:1px;background:#e8e2d9}
.week ol.videos{list-style:none;margin:0;padding:0}
.week ol.videos li{display:flex;align-items:baseline;gap:12px;padding:2.6mm 0;border-bottom:1px solid #eee7dd}
.week .ch{flex-shrink:0;width:15mm;font-size:12px;font-weight:700;color:${c.deep}}
.week .vt{font-family:"Space Grotesk";font-weight:500;font-size:16px;direction:ltr;unicode-bidi:isolate;text-align:right;flex:1}
.week .tasks{display:flex;flex-direction:column;gap:3.2mm}
.week .task{background:#fff;border:1px solid #ece5db;border-inline-start:3px solid ${c.color};border-radius:3mm;padding:3.6mm 5mm 3.8mm}
.week .task .lbl{font-size:11px;font-weight:700;color:${c.deep};display:flex;gap:8px;align-items:center}
.week .task .opt{font-size:10px;font-weight:700;color:#6b6560;background:#f1ebe3;border-radius:99px;padding:0 8px}
.week .task h3{margin:1mm 0 0;font-size:17px;font-weight:700;line-height:1.6}
.week .task p{margin:1mm 0 0;font-size:13px;font-weight:300;line-height:1.9;color:#3d3833}
.week .or{align-self:center;font-size:11px;font-weight:700;color:#6b6560;margin:-1mm 0}
/* هفتهٔ بررسی: بدون ویدیو و تسک، یک قابِ بزرگ */
.week .review{flex:1;margin:12mm 0 14mm;border-radius:6mm;background:${dark ? c.ground : c.deep};color:${CREAM};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4mm;position:relative;overflow:hidden}
.week .review .big{position:absolute;opacity:.12;inset-inline-end:-18mm;bottom:-22mm}
.week .review .en{font-family:"Space Grotesk";font-weight:500;font-size:44px;direction:ltr}
.week .review .fa{font-size:20px;font-weight:700}
.week .review .inf{color:${GOLD};font-family:"Space Grotesk";letter-spacing:.3em;font-size:10px;font-weight:700}
.week .foot{padding:5mm 15mm 7mm;display:flex;justify-content:space-between;font-size:10.5px;color:#a09990;border-top:1px solid #eee7dd;margin-top:8mm}
.week .ltr{direction:ltr;unicode-bidi:isolate}
/* فاصلهٔ قلم Meem خیلی باریکه و «فصل ۱» می‌چسبید به هم */
.week .ch,.week .lbl,.week .pips small,.week .band .sub{word-spacing:.22em}`;
}

function weekPage(c, w, i) {
  const n = i + 1;
  const pips = Array.from({ length: 10 }, (_, k) =>
    k < n ? suit(c, 13) : suit(c, 13, { stroke: c.color, opacity: 0.45 }),
  ).join("");
  const band = `<header class="band">
    <span><b>برنامهٔ هفتگی</b><span class="sub">${esc(c.fa)}</span></span>
    <span class="lock"><svg viewBox="0 4 120 108"><path d="${GLYPH}" fill="currentColor"/></svg><span>MOJTABAUI</span></span>
  </header>`;
  const head = `<div class="head">
    <div>
      <div class="eyebrow">WEEK ${String(n).padStart(2, "0")} · ${esc(c.latin)}</div>
      <h1>هفتهٔ<span class="n">${fa(n)}</span></h1>
      <div class="pips">${pips}<small>هفتهٔ ${fa(n)} از ۱۰</small></div>
    </div>
    <div class="mini">${card(c)}</div>
  </div>`;

  let main;
  if (w.review) {
    main = `<div class="review">
      <div class="big">${suit(c, 260, { fill: CREAM })}</div>
      ${c.infinity ? `<div class="inf">INFINITY</div>` : ""}
      <div class="en">Project Review</div>
      <div class="fa">بررسی پروژه تا اینجای کار</div>
    </div>`;
  } else {
    const videos = w.videos.length
      ? `<h2>ویدیوهای این هفته</h2><ol class="videos">${w.videos
          .map(([ch, t]) => `<li><span class="ch">فصل ${fa(ch)}</span><span class="vt">${esc(t)}</span></li>`)
          .join("")}</ol>`
      : "";
    const tasks = w.tasks
      .map((t) => {
        const label = t.n ? `تسک ${fa(t.n)}` : "تسک نهایی";
        const card = `<div class="task"><div class="lbl">${label}${t.optional ? `<span class="opt">اختیاری</span>` : ""}</div><h3>${esc(t.title)}</h3><p>${esc(t.desc)}</p></div>`;
        return t.or ? `<div class="or">یا</div>${card}` : card;
      })
      .join("");
    main = `${videos}<h2>${w.tasks.length > 1 ? "تسک‌ها" : "تسک"}</h2><div class="tasks">${tasks}</div>`;
  }

  return `<section class="week">${band}<div class="body">${head}${main}</div>
    <footer class="foot"><span>پشتیبانی: <span class="ltr">@melina_support</span></span><span class="ltr">mojtabaui.ir</span></footer>
  </section>`;
}

function plannerHtml(c, pages) {
  const { css, body } = coverParts(c);
  const weeks = PLANS[c.slug].map((w, i) => weekPage(c, w, i));
  const all = [body, ...weeks];
  const chosen = pages ? pages.map((p) => all[p]) : all;
  return `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><style>${FONTS}
@page{size:A4;margin:0}
html,body{margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
${css}${weekCss(c)}
</style></head><body>${chosen.join("")}</body></html>`;
}

ensureDirs();
for (const c of DECK.filter((c) => PLANS[c.slug])) {
  pdf(plannerHtml(c), path.join(OUT, "planners", `${c.slug}.pdf`));
  // پیش‌نمایش چند صفحه برای مرور بدون باز کردن PDF
  for (const p of [1, 3, 9, 10]) {
    shot(plannerHtml(c, [p]), path.join(OUT, "planners", `${c.slug}-p${String(p + 1).padStart(2, "0")}.png`), 794, 1123, 1);
  }
  console.log(`planner ${c.slug}`);
}
