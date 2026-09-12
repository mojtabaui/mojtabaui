import * as THREE from "three";

/**
 * بافت‌های رباتِ نارنجی — همه روی canvas، بدون هیچ فایلِ دانلودی.
 *
 * تفاوتِ این دسته با بافت‌های دنیای v1 در هدف است: آنجا بافت‌ها
 * *سطح* می‌ساختند (خاک، ابر، پارچه) و باید کاشی می‌شدند. اینجا
 * بافت‌ها *چاپ* می‌کنند — نوشتهٔ صفحه، برچسبِ هشدار، حروفِ روی
 * خط‌کش. هیچ‌کدام تکرار نمی‌شوند، و به‌جای بی‌درزی چیزی که اهمیت
 * دارد تیزیِ لبه در بزرگ‌نمایی است. پس همه با فیلترِ آنیزوتروپیک و
 * در اندازهٔ سخاوتمندانه ساخته می‌شوند.
 */

const cvs = (w: number, h = w) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")!] as const;
};

/** بافتِ رنگ — در فضای sRGB خوانده می‌شود */
function color(c: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** بافتِ داده — نرمال، زبری، تابش. نباید تصحیحِ گاما بخورد */
function data(c: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  t.anisotropy = 8;
  return t;
}

/**
 * حروفِ برجسته، به‌شکلِ نقشهٔ نرمال.
 *
 * «IGNORE» روی بدنهٔ برچسب‌زن در مرجع *کَنده* است نه چاپ‌شده: هم‌رنگِ
 * بدنه است و فقط به این دلیل دیده می‌شود که لبه‌هایش نور را جورِ
 * دیگری برمی‌گردانند. اگر با یک بافتِ رنگی می‌ساختیمش، از هر زاویه‌ای
 * یکسان می‌ماند و تخت می‌شد؛ با نقشهٔ نرمال، وقتی جسم می‌چرخد
 * برجستگی هم با نور می‌چرخد.
 *
 * روش: ارتفاع را روی بوم می‌کشیم (سفید = بالا)، محو می‌کنیم تا لبه
 * شیب پیدا کند — لبهٔ تیز یک خطِ سوزنی می‌سازد نه پخِ نرم — و بعد با
 * سوبل به شیب تبدیلش می‌کنیم.
 */
export function embossNormal(
  size: number,
  draw: (x: CanvasRenderingContext2D, w: number, h: number) => void,
  { blur = 6, strength = 3, aspect = 1 } = {},
) {
  const W = size;
  const H = Math.round(size / aspect);
  const [c, x] = cvs(W, H);
  x.fillStyle = "#000";
  x.fillRect(0, 0, W, H);
  x.filter = "blur(" + blur + "px)";
  draw(x, W, H);
  x.filter = "none";

  const src = x.getImageData(0, 0, W, H).data;
  const lum = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) lum[i] = src[i * 4] / 255;

  const out = new Uint8Array(W * H * 4);
  // لبه‌ها گیره می‌شوند نه چرخشی: این بافت کاشی نمی‌شود، و پیچیدنِ
  // لبه یک خطِ برجستهٔ کاذب دورِ تمامِ بافت می‌سازد
  const at = (px: number, py: number) =>
    lum[Math.min(H - 1, Math.max(0, py)) * W + Math.min(W - 1, Math.max(0, px))];

  for (let y = 0; y < H; y++) {
    for (let px = 0; px < W; px++) {
      const dx =
        at(px + 1, y - 1) +
        2 * at(px + 1, y) +
        at(px + 1, y + 1) -
        (at(px - 1, y - 1) + 2 * at(px - 1, y) + at(px - 1, y + 1));
      const dy =
        at(px - 1, y + 1) +
        2 * at(px, y + 1) +
        at(px + 1, y + 1) -
        (at(px - 1, y - 1) + 2 * at(px, y - 1) + at(px + 1, y - 1));
      const nx = -dx * strength;
      // بومِ canvas محورِ y را رو به پایین می‌شمارد و فضای مماسیِ three
      // رو به بالا؛ بدون این وارونگی حروف تورفته دیده می‌شوند
      const ny = dy * strength;
      const len = Math.hypot(nx, ny, 1);
      const i = (y * W + px) * 4;
      out[i] = ((nx / len) * 0.5 + 0.5) * 255;
      out[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      out[i + 2] = (1 / len) * 0.5 * 255 + 127;
      out[i + 3] = 255;
    }
  }

  const t = new THREE.DataTexture(out, W, H, THREE.RGBAFormat);
  t.colorSpace = THREE.NoColorSpace;
  t.needsUpdate = true;
  return t;
}

/**
 * صفحهٔ CRT — دو بافت که با هم یک صفحه می‌سازند.
 *
 * `map` سطحِ خاموش است: زغالیِ گرم با تاریک‌شدنِ گوشه‌ها و خطوطِ
 * افقیِ اسکن. `emissiveMap` فقط نوشته را دارد روی سیاه، تا تنها
 * *متن* بتابد. اگر یک بافت را برای هر دو می‌گذاشتیم، کلِ صفحه
 * خودتابان می‌شد و شیشهٔ روبه‌رویش دیگر بازتاب نمی‌داد.
 *
 * خطوطِ اسکن نیم‌شفاف و کم‌تضادند. CRT واقعی خطوطِ پررنگ ندارد؛
 * چیزی که پررنگ کشیده شود به «فیلترِ رتروی اینستاگرام» می‌زند.
 */
/**
 * صفحهٔ CRT — یک سطحِ *زنده*، نه یک بافتِ پخته.
 *
 * نسخهٔ اول متن را یک بار می‌کشید و تمام. مشکلش این نبود که بد
 * دیده می‌شد؛ مشکل این بود که تنها سطحِ گویای این ربات — صورتش —
 * یک عکس بود. جسمی که می‌چرخد ولی صورتش هیچ‌وقت عوض نمی‌شود،
 * «رندر» خوانده می‌شود نه «کسی».
 *
 * پس بوم را نگه می‌داریم و هر بار که *متن* عوض شد دوباره می‌کشیم.
 * `draw` اگر چیزی تغییر نکرده باشد زود برمی‌گردد، پس هزینه به
 * تعدادِ تغییرِ واقعی بسته است نه به نرخِ فریم: در حالتِ ساکن دو
 * بار در ثانیه (چشمکِ مکان‌نما) و موقعِ تایپ‌شدن حدودِ بیست بار.
 *
 * اندازه ۵۱۲×۳۸۴ است نه ۱۰۲۴×۷۶۸. در قابِ واقعی این صفحه چند صد
 * پیکسل بیشتر نیست، و نصف‌کردنِ ابعاد یعنی یک‌چهارمِ کارِ رسم در هر
 * به‌روزرسانی.
 *
 * دو بافت جداست: `map` سطحِ خاموش را می‌سازد (زغالیِ گرم، گوشه‌های
 * تیره، خطوطِ اسکن) و `emissiveMap` فقط نوشته را روی سیاه دارد تا
 * *تنها متن* بتابد. اگر یکی بود، کلِ صفحه خودتابان می‌شد و شیشهٔ
 * رویش دیگر بازتاب نمی‌داد.
 */
export function crtSurface() {
  const W = 512;
  const H = 384;
  const [mc, mx] = cvs(W, H);
  const [gc, gx] = cvs(W, H);

  const map = color(mc);
  const emissiveMap = data(gc);

  const size = 31;
  const font = "400 " + size + 'px "Segoe UI", system-ui, sans-serif';

  const paint = (x: CanvasRenderingContext2D, glow: boolean, lines: string[], caret: boolean) => {
    if (glow) {
      x.fillStyle = "#000";
      x.fillRect(0, 0, W, H);
    } else {
      x.fillStyle = "#3c3a38";
      x.fillRect(0, 0, W, H);
      const g = x.createRadialGradient(W * 0.46, H * 0.44, H * 0.14, W * 0.5, H * 0.5, H * 0.86);
      g.addColorStop(0, "rgba(98,95,92,.5)");
      g.addColorStop(0.55, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,.5)");
      x.fillStyle = g;
      x.fillRect(0, 0, W, H);
    }

    x.font = font;
    x.textBaseline = "alphabetic";
    x.fillStyle = glow ? "#eafaff" : "#cfe6ee";
    if (glow) {
      x.shadowColor = "#9fd8ea";
      x.shadowBlur = 12;
    }

    const x0 = W * 0.09;
    let y = H * 0.4;
    let lastW = 0;
    for (const line of lines) {
      x.fillText(line, x0, y);
      lastW = x.measureText(line).width;
      y += size * 1.34;
    }
    // مکان‌نما درست بعدِ آخرین نویسه می‌ایستد، نه سرِ سطرِ بعد —
    // همان‌جایی که در یک ترمینالِ واقعی است
    if (caret) {
      const cy = y - size * 1.34;
      x.fillRect(x0 + lastW + 6, cy - size * 0.72, size * 0.5, size * 0.82);
    }
    x.shadowBlur = 0;

    if (!glow) {
      x.fillStyle = "rgba(0,0,0,.07)";
      for (let sy = 0; sy < H; sy += 4) x.fillRect(0, sy, W, 2);
    }
  };

  let key = "";

  return {
    map,
    emissiveMap,
    /** اگر چیزی عوض نشده باشد کاری نمی‌کند و false برمی‌گرداند */
    draw(lines: string[], caret: boolean) {
      const k = lines.join("\n") + (caret ? "|" : "");
      if (k === key) return false;
      key = k;
      paint(mx, false, lines, caret);
      paint(gx, true, lines, caret);
      map.needsUpdate = true;
      emissiveMap.needsUpdate = true;
      return true;
    },
  };
}

/** حروف را با فاصله‌گذاریِ دستی می‌چیند — letterSpacing روی canvas قابلِ اتکا نیست */
function tracked(
  x: CanvasRenderingContext2D,
  word: string,
  cx: number,
  cy: number,
  gap: number,
) {
  const chars = [...word];
  const widths = chars.map((ch) => x.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (chars.length - 1);
  let px = cx - total / 2;
  chars.forEach((ch, i) => {
    x.fillText(ch, px + widths[i] / 2, cy);
    px += widths[i] + gap;
  });
}

/**
 * خط‌کشِ «DECODE» — حروفِ درشتِ تیره روی نوارِ کرم.
 *
 * حروف در طولِ نوار کشیده می‌شوند و از هر دو سر بیرون می‌زنند: در
 * مرجع هم کلمه بریده است. کلمهٔ کاملِ وسط‌چین، نوار را به یک تابلو
 * تبدیل می‌کند؛ کلمهٔ بریده، به قطعه‌ای از چیزی بزرگ‌تر.
 */
export function decodeStrip(word = "DECODE") {
  const W = 2048;
  const H = 256;
  const [c, x] = cvs(W, H);
  x.fillStyle = "#f4f1ec";
  x.fillRect(0, 0, W, H);

  // شیبِ خیلی ملایم در عرض — سطحِ کاملاً یکدست پلاستیکِ ارزان می‌خواند
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "rgba(255,255,255,.55)");
  g.addColorStop(1, "rgba(198,192,184,.35)");
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);

  x.save();
  x.font = '900 176px "Arial Black", Impact, "Segoe UI", sans-serif';
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillStyle = "#3a3735";
  tracked(x, word, W * 0.5, H * 0.53, 30);
  x.restore();

  return color(c);
}

/** برچسبِ هشدار — قرمزِ کوچک با نوشتهٔ سفید، مثلِ نوارِ خطای دستگاه */
export function warnLabel(text = "INPUT FAILED") {
  const W = 1024;
  const H = 192;
  const [c, x] = cvs(W, H);
  x.fillStyle = "#c1150b";
  x.fillRect(0, 0, W, H);
  x.fillStyle = "rgba(255,255,255,.13)";
  x.fillRect(0, 0, W, H * 0.34);
  x.font = '800 88px "Arial Black", "Segoe UI", sans-serif';
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillStyle = "#fff4f0";
  tracked(x, text, W / 2, H * 0.56, 6);
  return color(c);
}

/** نشانِ گردِ روی کلید — دایرهٔ روشن با یک پیکان */
export function arrowBadge(glyph = "↑") {
  const S = 256;
  const [c, x] = cvs(S);
  x.clearRect(0, 0, S, S);
  x.fillStyle = "#f6f4f1";
  x.beginPath();
  x.arc(S / 2, S / 2, S * 0.44, 0, Math.PI * 2);
  x.fill();
  x.strokeStyle = "rgba(0,0,0,.1)";
  x.lineWidth = 6;
  x.stroke();
  x.font = '600 148px "Segoe UI Symbol", "Segoe UI", system-ui, sans-serif';
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillStyle = "#2f2c2a";
  x.fillText(glyph, S / 2, S * 0.54);
  const t = color(c);
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

/** نوشتهٔ ریزِ کنارِ پایهٔ آنتن — خوانا نیست، فقط باید *باشد* */
export function microPrint() {
  const W = 512;
  const H = 128;
  const [c, x] = cvs(W, H);
  x.clearRect(0, 0, W, H);
  x.fillStyle = "#cdd2d8";
  for (let i = 0; i < 3; i++) {
    x.fillRect(W * 0.07, H * 0.26 + i * 22, W * (0.3 + (i % 2) * 0.22), 9);
  }
  return color(c);
}

/**
 * زبریِ ناهمگن — نقشهٔ زبری برای پلاستیکِ رنگ‌شده.
 *
 * پلاستیکِ واقعی هیچ‌جا زبریِ یکسان ندارد: قالب جایی صیقلی‌تر
 * درآمده و دست هم رویش نشسته. زبریِ ثابت است که به سطح حسِ «رندرِ
 * پیش‌فرض» می‌دهد؛ همین لکه‌های محو بازتاب را جایی تیز و جایی نرم
 * می‌کند، و همان تفاوت است.
 */
export function smudgeRoughness(base = 150, spread = 46) {
  const N = 512;
  const [c, x] = cvs(N);
  x.fillStyle = "rgb(" + base + "," + base + "," + base + ")";
  x.fillRect(0, 0, N, N);
  let seed = 9173;
  const r = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296), seed / 4294967296);
  x.filter = "blur(26px)";
  for (let i = 0; i < 70; i++) {
    const v = Math.round(base + (r() - 0.5) * 2 * spread);
    x.fillStyle = "rgb(" + v + "," + v + "," + v + ")";
    x.beginPath();
    x.ellipse(r() * N, r() * N, 20 + r() * 90, 20 + r() * 90, r() * 3.14, 0, Math.PI * 2);
    x.fill();
  }
  x.filter = "none";
  const t = data(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 2);
  return t;
}

/**
 * حروف به‌شکلِ نقشهٔ زبری — همراهِ `embossNormal`، نه به‌جای آن.
 *
 * برجستگیِ تنها در نورِ پخش گم می‌شود: وقتی منبعِ نور بزرگ و نرم
 * باشد، شیبِ ملایمِ لبهٔ حروف تقریباً هیچ سایه‌ای نمی‌سازد. اما
 * اختلافِ *براقی* به نورِ جهت‌دار وابسته نیست؛ حروفِ کمی صیقلی‌تر
 * حتی در سایه هم از زمینه جدا می‌مانند.
 *
 * زمینه سفیدِ خالص است چون `roughnessMap` در three ضرب می‌شود: سفید
 * یعنی «دست نزن»، و همین باعث می‌شود مستطیلِ صفحهٔ برچسب روی بدنه
 * به‌کل ناپیدا بماند و فقط حروف دیده شوند.
 */
export function textGloss(word: string, size = 1024, aspect = 4.8) {
  const W = size;
  const H = Math.round(size / aspect);
  const [c, x] = cvs(W, H);
  x.fillStyle = "#fff";
  x.fillRect(0, 0, W, H);
  x.filter = "blur(3px)";
  x.font = '900 ' + Math.round(H * 0.72) + 'px "Arial Black", Impact, sans-serif';
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillStyle = "#a8a8a8";
  tracked(x, word, W / 2, H / 2, Math.round(H * 0.1));
  x.filter = "none";
  const t = data(c);
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}
