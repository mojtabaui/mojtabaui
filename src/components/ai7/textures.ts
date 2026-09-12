import * as THREE from "three";

/**
 * بافت‌های صحنهٔ AI7 — همه روی canvas ساخته می‌شوند، هیچ فایلی دانلود
 * نمی‌شود.
 *
 * چیزی که یک صحنهٔ سه‌بعدی را از «خام» به «رندرشده» می‌برد، بیشتر از
 * هندسه، بافت است. یک کرهٔ نارنجیِ بی‌بافت همیشه توپ به‌نظر می‌رسد؛
 * همان کره با دانه و لکه و سایه‌روشن، خاک می‌شود.
 */

const cvs = (w: number, h = w) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")!] as const;
};

/** تولیدکنندهٔ عددِ قطعی، تا صحنه هر بار یکسان ساخته شود */
export function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

/**
 * هر بافتی که قرار است کاشی شود باید بی‌درز باشد.
 *
 * این کمک‌کننده هر نقشِ محلی را نُه بار می‌کشد — خودش و هشت
 * همسایه‌اش — تا هر چیزی که از یک لبه بیرون می‌زند از لبهٔ مقابل
 * وارد شود. بدون این، هر نقشی که روی مرز بیفتد نصفه می‌ماند و
 * خطِ کاشی را نشان می‌دهد.
 */
function wrapped(size: number, draw: (dx: number, dy: number) => void) {
  for (let ox = -1; ox <= 1; ox++) {
    for (let oy = -1; oy <= 1; oy++) draw(ox * size, oy * size);
  }
}

/**
 * خاک — چهار مقیاس روی هم: رگه‌های بزرگ، گودال‌ها، ذراتِ میانی و
 * دانه‌های ریز.
 *
 * تک‌لایه که باشد نویزِ تلویزیون می‌شود نه خاک. چیزی که به آن حسِ
 * خاک می‌دهد، وجودِ همزمانِ سه مقیاس است: لکه‌های درشت که از دور
 * دیده می‌شوند، دانه‌های ریز که از نزدیک، و ذراتِ میانی که این دو
 * را به هم وصل می‌کنند.
 *
 * زمینه عمداً یک‌رنگِ تخت است. نسخهٔ قبلی گرادیانتِ گوشه‌به‌گوشه
 * داشت و چون یک گوشه روشن و گوشهٔ مقابل تیره بود، هر بار که بافت
 * تکرار می‌شد لبهٔ کاشی به‌صورتِ یک خطِ تیز دیده می‌شد. تنوعِ
 * بزرگ‌مقیاس به‌جای اینجا، از رنگِ رئوسِ زمین می‌آید.
 */
export function sandTexture() {
  const S = 2048;
  const [c, x] = cvs(S);
  const r = rng(7);

  x.fillStyle = "#d4854b";
  x.fillRect(0, 0, S, S);

  // رگه‌های بزرگ
  for (let i = 0; i < 200; i++) {
    const cx = r() * S;
    const cy = r() * S;
    const rad = 90 + r() * 340;
    const warm = r() > 0.5;
    wrapped(S, (dx, dy) => {
      const g = x.createRadialGradient(cx + dx, cy + dy, 0, cx + dx, cy + dy, rad);
      g.addColorStop(0, warm ? "rgba(252,196,140,.26)" : "rgba(146,76,36,.22)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = g;
      x.fillRect(cx + dx - rad, cy + dy - rad, rad * 2, rad * 2);
    });
  }

  // گودال‌ها — حلقهٔ روشن با مرکزِ تیره، مثل ردِ برخورد
  for (let i = 0; i < 60; i++) {
    const cx = r() * S;
    const cy = r() * S;
    const rad = 24 + r() * 76;
    wrapped(S, (dx, dy) => {
      const g = x.createRadialGradient(cx + dx, cy + dy, rad * 0.2, cx + dx, cy + dy, rad);
      g.addColorStop(0, "rgba(96,46,18,.28)");
      g.addColorStop(0.82, "rgba(96,46,18,.1)");
      g.addColorStop(0.95, "rgba(252,208,158,.26)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = g;
      x.fillRect(cx + dx - rad, cy + dy - rad, rad * 2, rad * 2);
    });
  }

  // ذراتِ میانی — سنگ‌ریزه‌های نقاشی‌شده، هرکدام با یک هایلایتِ ریز
  for (let i = 0; i < 3200; i++) {
    const cx = r() * S;
    const cy = r() * S;
    const rad = 2.5 + r() * 7;
    const tilt = r() * 3.14;
    const squash = 0.55 + r() * 0.5;
    const dark = r() > 0.45;
    wrapped(S, (dx, dy) => {
      x.fillStyle = dark ? `rgba(88,42,18,${0.14 + r() * 0.24})` : `rgba(255,220,176,${0.12 + r() * 0.26})`;
      x.beginPath();
      x.ellipse(cx + dx, cy + dy, rad, rad * squash, tilt, 0, 6.29);
      x.fill();
      // لبهٔ روشنِ بالای هر ذره — همان چیزی که به آن حجم می‌دهد
      x.fillStyle = "rgba(255,236,206,.2)";
      x.beginPath();
      x.ellipse(cx + dx, cy + dy - rad * 0.3, rad * 0.6, rad * squash * 0.4, tilt, 0, 6.29);
      x.fill();
    });
  }

  // دانه‌ها — بدون wrap لازم، چون یک پیکسل‌اند
  for (let i = 0; i < 150000; i++) {
    const v = r();
    x.fillStyle =
      v > 0.55
        ? `rgba(255,232,196,${0.05 + r() * 0.22})`
        : `rgba(96,48,20,${0.04 + r() * 0.22})`;
    const sz = 1 + r() * 2;
    x.fillRect(r() * S, r() * S, sz, sz);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  return tex;
}

/**
 * نقشهٔ نرمالِ خاک — بدون این، بافتِ خاک فقط یک عکسِ چاپ‌شده روی
 * سطحِ صاف است و نور رویش نمی‌شکند.
 *
 * ارتفاع را از الگوی برجستگی می‌سازیم و بعد با تفاضلِ همسایه‌ها به
 * نرمال تبدیلش می‌کنیم. همه‌جا با پیمانهٔ N نوشته شده تا نتیجه
 * خودبه‌خود بی‌درز باشد.
 */
export function sandNormal() {
  const N = 1024;
  const r = rng(19);
  const height = new Float32Array(N * N);
  const bump = (cx: number, cy: number, rad: number, amp: number) => {
    const R = Math.ceil(rad);
    for (let dy = -R; dy <= R; dy++) {
      for (let dx = -R; dx <= R; dx++) {
        const d = Math.hypot(dx, dy) / rad;
        if (d >= 1) continue;
        const px = (((cx + dx) | 0) % N + N) % N;
        const py = (((cy + dy) | 0) % N + N) % N;
        height[py * N + px] += amp * (1 - d * d) ** 2;
      }
    }
  };

  // برجستگی‌های نرمِ درشت — پستی‌بلندیِ خاک
  for (let i = 0; i < 700; i++) bump(r() * N, r() * N, 8 + r() * 40, (r() - 0.4) * 1.1);
  // سنگ‌ریزه‌های ریزِ برجسته
  for (let i = 0; i < 3000; i++) bump(r() * N, r() * N, 1.5 + r() * 4, 0.5 + r() * 0.8);
  // دانهٔ ریز
  for (let i = 0; i < N * N; i++) height[i] += (r() - 0.5) * 0.3;

  const [c, ctx] = cvs(N);
  const img = ctx.createImageData(N, N);
  const at = (x: number, y: number) => height[((y + N) % N) * N + ((x + N) % N)];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const dx = at(x + 1, y) - at(x - 1, y);
      const dy = at(x, y + 1) - at(x, y - 1);
      // بردار (-dx, -dy, 1) نرمال‌شده و به بازهٔ ۰..۲۵۵ برده
      const len = Math.hypot(dx, dy, 1);
      const i = (y * N + x) * 4;
      img.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = (1 / len) * 0.5 * 255 + 127;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

/** زبریِ متغیرِ خاک — بعضی لکه‌ها صیقلی‌ترند، مثل خاکِ فشرده */
export function sandRoughness() {
  const S = 512;
  const [c, x] = cvs(S);
  const r = rng(31);
  x.fillStyle = "#dcdcdc";
  x.fillRect(0, 0, S, S);
  for (let i = 0; i < 300; i++) {
    const cx = r() * S;
    const cy = r() * S;
    const rad = 14 + r() * 78;
    const light = r() > 0.5;
    wrapped(S, (dx, dy) => {
      const g = x.createRadialGradient(cx + dx, cy + dy, 0, cx + dx, cy + dy, rad);
      g.addColorStop(0, light ? "rgba(255,255,255,.42)" : "rgba(140,140,140,.42)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = g;
      x.fillRect(cx + dx - rad, cy + dy - rad, rad * 2, rad * 2);
    });
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/**
 * ابر — چند دایرهٔ نرمِ روی‌هم، با کفِ کمی خاکستری.
 *
 * ابرِ تخت و یکدست همیشه شبیه لکهٔ رنگ می‌شود. چیزی که به آن حجم
 * می‌دهد، تفاوتِ روشناییِ بالا و پایین است: تاجِ ابر نورِ آسمان را
 * می‌گیرد، کفش سایهٔ خودش را دارد.
 */
export function cloudTexture(seed = 3) {
  const [c, x] = cvs(768, 384);
  const r = rng(seed);

  const puff = (cx: number, cy: number, rad: number, a: number, tint: string) => {
    const g = x.createRadialGradient(cx, cy - rad * 0.2, rad * 0.1, cx, cy, rad);
    g.addColorStop(0, `rgba(255,255,255,${a})`);
    g.addColorStop(0.5, `rgba(${tint},${a * 0.72})`);
    g.addColorStop(0.82, `rgba(${tint},${a * 0.26})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = g;
    x.beginPath();
    x.arc(cx, cy, rad, 0, 6.29);
    x.fill();
  };

  // لایهٔ پایینی، کمی خاکستری‌تر — کفِ ابر
  for (let i = 0; i < 9; i++) {
    const t = i / 8;
    puff(120 + t * 540, 250 + Math.sin(t * 3.1) * 22, 58 + r() * 46, 0.8, "205,214,228");
  }
  // تاجِ روشن
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    const hump = Math.sin(t * Math.PI);
    puff(160 + t * 460, 232 - hump * 88 - r() * 26, 46 + hump * 66 + r() * 26, 0.94, "246,250,255");
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** پارچهٔ پرچم */
export function flagTexture() {
  const [c, x] = cvs(384, 256);
  const g = x.createLinearGradient(0, 0, 384, 256);
  g.addColorStop(0, "#f7a83a");
  g.addColorStop(1, "#e07d16");
  x.fillStyle = g;
  x.fillRect(0, 0, 384, 256);
  // نوارِ تیرهٔ لبهٔ پایین — پرچم را از یک مستطیلِ تخت درمی‌آورد
  x.fillStyle = "rgba(120,58,6,.16)";
  x.fillRect(0, 214, 384, 42);
  x.fillStyle = "rgba(255,238,200,.22)";
  x.fillRect(0, 0, 384, 10);
  x.fillStyle = "#37240c";
  x.font = "bold 132px 'Space Grotesk', Impact, system-ui, sans-serif";
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillText("AI7", 192, 112);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** پنلِ نارنجیِ رویِ کوله — همان آیکونِ صاعقهٔ مرجع */
export function boltTexture() {
  const [c, x] = cvs(256);
  x.fillStyle = "#f59320";
  x.fillRect(0, 0, 256, 256);
  const g = x.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, "rgba(255,220,150,.4)");
  g.addColorStop(1, "rgba(150,70,0,.28)");
  x.fillStyle = g;
  x.fillRect(0, 0, 256, 256);
  x.fillStyle = "#fff8e6";
  x.beginPath();
  x.moveTo(148, 40);
  x.lineTo(88, 138);
  x.lineTo(124, 138);
  x.lineTo(104, 218);
  x.lineTo(172, 112);
  x.lineTo(134, 112);
  x.closePath();
  x.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * آسمان — گرادیانتِ آبیِ عمودی با افقِ گرم.
 *
 * آبیِ یکدست از بالا تا پایین، آسمانِ نقاشیِ کودکانه می‌شود. آسمانِ
 * واقعی نزدیکِ افق روشن‌تر و گرم‌تر است، چون نور از لایهٔ ضخیم‌تری
 * از هوا می‌گذرد.
 */
export function skyTexture() {
  const [c, x] = cvs(8, 1024);
  const g = x.createLinearGradient(0, 0, 0, 1024);
  g.addColorStop(0, "#3f7fc4");
  g.addColorStop(0.24, "#5d9bd6");
  g.addColorStop(0.46, "#8ec0e6");
  g.addColorStop(0.63, "#b9dbf0");
  g.addColorStop(0.76, "#dcecf5");
  g.addColorStop(0.87, "#f2ecdf");
  g.addColorStop(1, "#f6dfc0");
  x.fillStyle = g;
  x.fillRect(0, 0, 8, 1024);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** لکهٔ نرم — هم برای سایهٔ تماسی، هم برای بوکه */
export function blobTexture(rgb = "rgba(58,24,8,") {
  const [c, x] = cvs(256);
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, rgb + ".78)");
  g.addColorStop(0.35, rgb + ".4)");
  g.addColorStop(0.72, rgb + ".1)");
  g.addColorStop(1, rgb + "0)");
  x.fillStyle = g;
  x.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

/**
 * تیترِ فارسیِ پشتِ صحنه.
 *
 * فونت از همان متغیرِ CSS سایت خوانده می‌شود تا با بقیهٔ صفحه یکی
 * باشد، و منتظرِ document.fonts می‌مانیم — وگرنه canvas با فونتِ
 * پیش‌فرض رسم می‌کند و فارسی بد درمی‌آید.
 *
 * سه لایه روی هم کشیده می‌شود چون یک رنگِ تخت روی آسمانِ روشن و
 * ابرهای سفید خوانده نمی‌شود:
 *   ۱ هالهٔ روشنِ محو — متن را از هرچه پشتش است جدا می‌کند
 *   ۲ سایهٔ نرمِ پایین — به حروف وزن و فاصله از پس‌زمینه می‌دهد
 *   ۳ خودِ حروف با گرادیانتِ عمودی — لبهٔ بالا روشن‌تر، مثل
 *     چیزی که نورِ آسمان رویش افتاده
 */
export async function textTexture(text: string) {
  const fam =
    getComputedStyle(document.documentElement).getPropertyValue("--font-meem").trim() ||
    "system-ui";
  try {
    await document.fonts.ready;
  } catch {
    /* اگر مرورگر پشتیبانی نکرد، با همان فونتِ موجود می‌کشیم */
  }

  const W = 2048;
  const H = 440;
  const [c, x] = cvs(W, H);
  x.direction = "rtl";
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.font = `700 148px ${fam}, system-ui, sans-serif`;

  const cx = W / 2;
  const cy = H / 2 - 6;

  // ۱ هالهٔ روشن
  x.save();
  x.shadowColor = "rgba(255,255,255,.95)";
  x.shadowBlur = 46;
  x.fillStyle = "rgba(255,255,255,.9)";
  for (let i = 0; i < 3; i++) x.fillText(text, cx, cy);
  x.restore();

  // ۲ سایهٔ نرم
  x.save();
  x.shadowColor = "rgba(20,48,80,.42)";
  x.shadowBlur = 22;
  x.shadowOffsetY = 12;
  x.fillStyle = "rgba(16,40,68,.55)";
  x.fillText(text, cx, cy);
  x.restore();

  // ۳ حروف
  const ink = x.createLinearGradient(0, cy - 92, 0, cy + 92);
  ink.addColorStop(0, "#2b5a86");
  ink.addColorStop(0.5, "#123b62");
  ink.addColorStop(1, "#0b2646");
  x.fillStyle = ink;
  x.fillText(text, cx, cy);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  return tex;
}

/**
 * بدنهٔ کولهٔ شارژ — پلاستیکِ سفیدِ صنعتی با خطوطِ قالب، پیچ‌های
 * گوشه، دریچهٔ تهویه و برچسبِ کوچک.
 *
 * جعبهٔ سفیدِ بی‌بافت همیشه شبیه مکعبِ تستِ رندر می‌شود. آنچه به آن
 * حسِ «دستگاه» می‌دهد، همین نشانه‌های ساخت است.
 */
export function packTexture() {
  const [c, x] = cvs(512);
  const r = rng(53);

  const g = x.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, "#fbf9f5");
  g.addColorStop(0.6, "#efece5");
  g.addColorStop(1, "#ddd8ce");
  x.fillStyle = g;
  x.fillRect(0, 0, 512, 512);

  // دانهٔ ریزِ پلاستیک
  for (let i = 0; i < 26000; i++) {
    x.fillStyle = `rgba(${r() > 0.5 ? "255,255,255" : "120,116,110"},${r() * 0.12})`;
    x.fillRect(r() * 512, r() * 512, 1.6, 1.6);
  }

  // قابِ فرورفتهٔ دورِ وجه
  x.strokeStyle = "rgba(120,114,104,.5)";
  x.lineWidth = 3;
  x.strokeRect(26, 26, 460, 460);
  x.strokeStyle = "rgba(255,255,255,.85)";
  x.lineWidth = 2;
  x.strokeRect(29, 29, 454, 454);

  // درزِ افقیِ قالب
  x.fillStyle = "rgba(112,106,96,.42)";
  x.fillRect(0, 330, 512, 3);
  x.fillStyle = "rgba(255,255,255,.7)";
  x.fillRect(0, 333, 512, 2);

  // دریچهٔ تهویه
  for (let i = 0; i < 6; i++) {
    x.fillStyle = "rgba(96,90,82,.5)";
    x.beginPath();
    x.roundRect(322, 372 + i * 16, 140, 8, 4);
    x.fill();
  }

  // پیچ‌های گوشه
  for (const [px, py] of [[52, 52], [460, 52], [52, 460], [460, 460]]) {
    x.fillStyle = "rgba(138,132,122,.75)";
    x.beginPath();
    x.arc(px, py, 9, 0, 6.29);
    x.fill();
    x.strokeStyle = "rgba(70,66,60,.7)";
    x.lineWidth = 2.4;
    x.beginPath();
    x.moveTo(px - 5, py);
    x.lineTo(px + 5, py);
    x.stroke();
  }

  // برچسبِ کوچک
  x.fillStyle = "rgba(60,56,50,.86)";
  x.beginPath();
  x.roundRect(52, 372, 210, 46, 8);
  x.fill();
  x.fillStyle = "#f4f1ea";
  x.font = "bold 26px 'Space Grotesk', system-ui, sans-serif";
  x.textBaseline = "middle";
  x.fillText("AI7 · PWR", 68, 396);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/**
 * پوستِ پرتقالیِ پلاستیکِ قالب‌گیری‌شده.
 *
 * سطحِ ریاضیاً صافِ سه‌بعدی همیشه شبیه رندر می‌ماند، نه شبیه شیء.
 * قطعهٔ پلاستیکیِ واقعی از قالب که بیرون می‌آید موجِ بسیار ریزی
 * دارد؛ چشم آن را نمی‌بیند ولی *بازتاب* را می‌بیند — هایلایت
 * به‌جای یک خطِ شیشه‌ایِ تیز، کمی موج‌دار می‌شود. همین یک تفاوت،
 * «پلاستیک» را از «سرامیک» جدا می‌کند.
 *
 * روی clearcoatNormalMap می‌نشیند نه normalMap: موج فقط در لایهٔ
 * لاک است، رنگِ زیرین صاف می‌ماند.
 */
export function orangePeelNormal() {
  const N = 512;
  const r = rng(71);
  const h = new Float32Array(N * N);
  for (let i = 0; i < 2600; i++) {
    const cx = r() * N;
    const cy = r() * N;
    const rad = 5 + r() * 16;
    const amp = (r() - 0.5) * 0.5;
    const R = Math.ceil(rad);
    for (let dy = -R; dy <= R; dy++) {
      for (let dx = -R; dx <= R; dx++) {
        const d = Math.hypot(dx, dy) / rad;
        if (d >= 1) continue;
        const px = (((cx + dx) | 0) % N + N) % N;
        const py = (((cy + dy) | 0) % N + N) % N;
        h[py * N + px] += amp * (1 - d * d) ** 2;
      }
    }
  }

  const [c, ctx] = cvs(N);
  const img = ctx.createImageData(N, N);
  const at = (x: number, y: number) => h[((y + N) % N) * N + ((x + N) % N)];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const dx = at(x + 1, y) - at(x - 1, y);
      const dy = at(x, y + 1) - at(x, y - 1);
      const len = Math.hypot(dx, dy, 1);
      const i = (y * N + x) * 4;
      img.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = (1 / len) * 0.5 * 255 + 127;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  return tex;
}
