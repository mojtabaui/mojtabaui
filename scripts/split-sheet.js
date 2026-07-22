/**
 * برش شیت ۲×۲ تصویرهای تولیدشده به چهار فایل جدا.
 *
 * ابزارهای تصویرسازی چهار خروجی رو توی یک شیت کنار هم می‌دن. این اسکریپت
 * خطوط جداکننده رو خودکار پیدا می‌کنه (به‌جای عددِ دستی که هر شیت فرق داره)،
 * چهار قاب رو می‌بره، به ۱۶:۹ می‌رسونه و بهینه می‌کنه.
 *
 * استفاده:
 *   node scripts/split-sheet.js <شیت> <نام۱> <نام۲> <نام۳> <نام۴>
 *
 * ترتیب نام‌ها: بالا-چپ، بالا-راست، پایین-چپ، پایین-راست
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const [, , sheet, ...names] = process.argv;

if (!sheet || names.length !== 4) {
  console.error("usage: node scripts/split-sheet.js <sheet> <n1> <n2> <n3> <n4>");
  process.exit(1);
}

const OUT_DIR = path.dirname(sheet);
const PAD = 3; // چند پیکسل از لبه فاصله می‌گیریم تا اثر خط جداکننده نمونه

/** دنباله‌های پیوسته‌ی روشن (خط جداکننده) را در یک محور پیدا می‌کند */
function findRuns(isBright, length, minRun = 8) {
  const runs = [];
  let start = null;
  for (let i = 0; i < length; i++) {
    if (isBright(i)) {
      if (start === null) start = i;
    } else if (start !== null) {
      if (i - start > minRun) runs.push([start, i - 1]);
      start = null;
    }
  }
  if (start !== null && length - start > minRun) runs.push([start, length - 1]);
  return runs;
}

(async () => {
  const { data, info } = await sharp(sheet).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const px = (x, y) => {
    const i = (y * width + x) * channels;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const bright = ([r, g, b]) => r > 248 && g > 246 && b > 242;

  // ستون‌ها را روی یک سطر نمونه‌برداری می‌کنیم که داخل قاب بالایی باشد
  const sampleY = Math.floor(height * 0.25);
  const colRuns = findRuns((x) => bright(px(x, sampleY)), width);
  const sampleX = Math.floor(width * 0.25);
  const rowRuns = findRuns((y) => bright(px(sampleX, y)), height);

  if (colRuns.length < 3 || rowRuns.length < 3) {
    console.error("جداکننده‌ها پیدا نشدن. شیت ۲×۲ با حاشیه‌ی روشن انتظار می‌رفت.");
    process.exit(1);
  }

  const [lm, midCol, rm] = [colRuns[0], colRuns[1], colRuns[colRuns.length - 1]];
  const [tm, midRow, bm] = [rowRuns[0], rowRuns[1], rowRuns[rowRuns.length - 1]];

  const cols = [
    { left: lm[1] + 1, right: midCol[0] - 1 },
    { left: midCol[1] + 1, right: rm[0] - 1 },
  ];
  const rows = [
    { top: tm[1] + 1, bottom: midRow[0] - 1 },
    { top: midRow[1] + 1, bottom: bm[0] - 1 },
  ];

  let n = 0;
  for (const r of rows) {
    for (const c of cols) {
      const name = names[n++];
      const out = path.join(OUT_DIR, `${name}.jpg`);
      await sharp(sheet)
        .extract({
          left: c.left + PAD,
          top: r.top + PAD,
          width: c.right - c.left + 1 - PAD * 2,
          height: r.bottom - r.top + 1 - PAD * 2,
        })
        .resize(1600, 900, { fit: "cover" })
        .jpeg({ quality: 84, mozjpeg: true })
        .toFile(out);
      console.log(`${name}.jpg  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
    }
  }

  fs.unlinkSync(sheet);
  console.log("شیت اصلی حذف شد.");
})();
