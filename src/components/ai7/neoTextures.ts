import * as THREE from "three";

/**
 * بافت‌های پیکرهٔ مشکی — همه روی canvas، هیچ فایلی.
 *
 * تنها چیزهای *روشن* این پیکره‌اند، و تنها جاهایی که رنگ دارند. بقیهٔ
 * جسم مشکیِ بازتابنده است و هیچ بافتی نمی‌خواهد: روی سطحِ آینه‌ای،
 * نقشِ سطح دیده نمی‌شود، فقط بازتاب دیده می‌شود.
 */

/**
 * شبکهٔ نقطه‌ایِ LED — چشم‌ها و نشانِ سینه، هر دو از همین.
 *
 * نه یک نوارِ نورانیِ یکدست. فرقش این است که نوار یک *سطحِ* روشن
 * است و در هر اندازه‌ای همان لکه می‌ماند؛ شبکهٔ نقطه‌ای یک *چیزِ
 * ساخته‌شده* است — چشم می‌بیند که از پیکسل تشکیل شده و همان است که
 * می‌گوید این یک صفحه‌نمایشِ کوچک است، نه یک چراغ.
 *
 * نقطه‌ها مربع‌اند نه دایره: LEDِ ماتریسی مربع است، و دایره فوراً به
 * «چراغِ تزئینی» می‌زند.
 *
 * زمینه شفاف می‌ماند و فقط نقطه‌ها کشیده می‌شوند، پس همین یک بافت
 * روی هر رنگی می‌نشیند بی‌آنکه مستطیلِ تیره‌ای دورش بیفتد.
 */
export function dotMatrix({
  cols,
  rows,
  /** نسبتِ پهنای نقطه به خانهٔ شبکه — کمتر یعنی فاصلهٔ بیشتر */
  fill = 0.52,
  /** چند درصدِ نقطه‌ها خاموش بمانند؛ کمی بی‌نظمی، شبکه را زنده می‌کند */
  dropout = 0.12,
  /** گوشه‌ها را گرد می‌کند: نقطه‌های بیرونِ بیضی حذف می‌شوند */
  round = true,
  seed = 7,
}: {
  cols: number;
  rows: number;
  fill?: number;
  dropout?: number;
  round?: boolean;
  seed?: number;
}) {
  /** تولیدِ عددِ شبه‌تصادفیِ تکرارپذیر — هر بار همان شبکه */
  let s = seed >>> 0;
  const rand = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);

  // چهار پیکسل برای هر خانه، تا لبهٔ مربع‌ها تیز بماند
  const cell = 8;
  const cvs = document.createElement("canvas");
  cvs.width = cols * cell;
  cvs.height = rows * cell;
  const ctx = cvs.getContext("2d")!;
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  ctx.fillStyle = "#ffffff";

  const d = Math.round(cell * fill);
  const pad = Math.round((cell - d) / 2);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (round) {
        // فاصلهٔ نرمال‌شده از مرکز؛ بیرونِ بیضی چیزی کشیده نمی‌شود
        const nx = (x + 0.5) / cols - 0.5;
        const ny = (y + 0.5) / rows - 0.5;
        if (nx * nx * 3.1 + ny * ny * 4.2 > 0.62) continue;
      }
      if (rand() < dropout) continue;
      ctx.fillRect(x * cell + pad, y * cell + pad, d, d);
    }
  }

  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  /**
   * فیلترِ نزدیک‌ترین، نه خطی.
   *
   * با فیلترِ خطی، مربع‌های ریز در فاصله محو می‌شوند و شبکه به یک
   * لکهٔ خاکستری تبدیل می‌شود — دقیقاً همان چیزی که نمی‌خواهیم. با
   * nearest، پیکسل پیکسل می‌ماند.
   */
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 4;
  return tex;
}

/**
 * درخششِ نقره‌ای — نقشهٔ زبری، نه نقشهٔ رنگ.
 *
 * برقِ ریزِ فلزی از *رنگ* نمی‌آید؛ از این می‌آید که زبریِ سطح
 * یکنواخت نباشد. جایی که زبری کمتر است بازتاب تیزتر می‌شود و یک
 * جرقهٔ ریز می‌زند، و جایی که بیشتر است نرم و مات می‌ماند. نتیجه
 * سطحی است که با چرخیدنِ جسم، نقطه‌نقطه برق می‌زند — دقیقاً رفتارِ
 * رنگِ متالیک.
 *
 * اگر همین کار را با نقشهٔ رنگ می‌کردیم، لکه‌های روشن *روی* جسم
 * می‌ماندند و با چرخش حرکت نمی‌کردند؛ آن وقت به‌جای فلز، کثیفی
 * دیده می‌شد.
 *
 * دو لایه دارد: دانه‌های درشت‌ترِ محو (موجِ کلیِ رنگ) و جرقه‌های
 * تک‌پیکسلی (فلزِ داخلِ رنگ).
 */
export function sparkleRoughness({
  size = 512,
  /** زبریِ پایه — میانگینِ سطح */
  base = 0.16,
  /** دامنهٔ نوسان حولِ پایه */
  spread = 0.1,
  /** چگالیِ جرقه‌های تیز */
  flecks = 0.05,
  seed = 3,
} = {}) {
  let s = seed >>> 0;
  const rand = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);

  const cvs = document.createElement("canvas");
  cvs.width = cvs.height = size;
  const ctx = cvs.getContext("2d")!;

  // لایهٔ اول: موجِ نرمِ زبری
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    const v = Math.round((base + (rand() - 0.5) * spread) * 255);
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  ctx.filter = "blur(1.5px)";
  ctx.drawImage(cvs, 0, 0);
  ctx.filter = "none";

  // لایهٔ دوم: جرقه‌ها — تک‌پیکسل‌های خیلی صیقلی، بدونِ محو
  const dark = Math.round(Math.max(0, base - spread * 1.6) * 255);
  ctx.fillStyle = `rgb(${dark},${dark},${dark})`;
  const n = Math.round(size * size * flecks);
  for (let i = 0; i < n; i++) {
    ctx.fillRect(Math.floor(rand() * size), Math.floor(rand() * size), 1, 1);
  }

  const tex = new THREE.CanvasTexture(cvs);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.anisotropy = 8;
  return tex;
}

/**
 * نوشتهٔ روی سینه — یک خطِ متن، روی بومِ شفاف.
 *
 * چرا روی خودِ پیکره و نه به‌صورتِ متنِ HTML روی آن: چون آن‌طور
 * برچسبی می‌شود که *جلوی* جسم شناور است و با چرخشِ بدن حرکت
 * نمی‌کند. اینجا بافت روی سطح می‌نشیند، با بدن می‌چرخد و از نورِ
 * صحنه هم سهم می‌برد — پس بخشی از خودِ ربات خوانده می‌شود، نه
 * چیزی که رویش گذاشته‌اند.
 *
 * شکل‌دهیِ فارسی را خودِ موتورِ متنِ مرورگر انجام می‌دهد؛ `fillText`
 * با `direction: "rtl"` حروف را درست به هم می‌چسباند. همین یک خط
 * است که این روش را از کشیدنِ حرف‌به‌حرف نجات می‌دهد.
 */
export function textLabel(
  /**
   * یک یا چند خط.
   *
   * چندخطی بودن اینجا فقط «زیباتر» نیست: روی سینهٔ یک پیکرهٔ
   * باریک، یک جملهٔ بلندِ تک‌خطی یا باید آن‌قدر ریز شود که خوانده
   * نشود، یا از دو طرفِ بدنه بیرون بزند. دو خطِ کوتاه، هم درشت‌تر
   * می‌شوند و هم داخلِ عرضِ سینه جا می‌گیرند.
   */
  lines: string[],
  { width = 768, height = 400, weight = 700, size = 132, rtl = true } = {},
) {
  const cvs = document.createElement("canvas");
  cvs.width = width;
  cvs.height = height;
  const ctx = cvs.getContext("2d")!;

  /**
   * فونتِ خودِ سایت، نه فونتِ سیستم.
   *
   * `next/font` نامِ خانوادهٔ تولیدشده را داخلِ یک متغیرِ CSS
   * می‌گذارد و آن نام قابلِ حدس زدن نیست — هر بیلد عوضش می‌کند. پس
   * از خودِ سند خوانده می‌شود. اگر به هر دلیل نبود، به فونتِ سیستم
   * برمی‌گردد و نوشته باز هم خوانا می‌ماند.
   */
  const family =
    getComputedStyle(document.documentElement).getPropertyValue("--font-meem").trim() ||
    "system-ui";

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${weight} ${size}px ${family}, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.direction = rtl ? "rtl" : "ltr";
    ctx.fillStyle = "#ffffff";

    /**
     * فاصلهٔ خطوط ۱٫۲۲ برابرِ اندازهٔ قلم.
     *
     * فارسی زیرخط دارد (ی، ج، ...) و با فاصلهٔ کمترِ معمول، دنبالهٔ
     * خطِ بالا روی سرِ خطِ پایین می‌افتد. کلِ بلوک هم حولِ مرکز
     * چیده می‌شود نه از بالا، تا با هر تعداد خط، وسطِ سینه بماند.
     */
    const lh = size * 1.22;
    const top = height / 2 - ((lines.length - 1) * lh) / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line, width / 2, top + i * lh, width * 0.94);
    });
  };
  draw();

  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  /**
   * یک بار دیگر، بعد از آمدنِ فونت.
   *
   * بومِ متن همان لحظه کشیده می‌شود، و اگر فونتِ سفارشی هنوز
   * دانلود نشده باشد، مرورگر بی‌صدا از فونتِ جایگزین استفاده
   * می‌کند و نتیجه برای همیشه همان می‌ماند — بافت که یک‌بار
   * ساخته شد، خودش را به‌روز نمی‌کند. پس منتظرِ فونت می‌مانیم و
   * دوباره می‌کشیم.
   */
  void document.fonts?.ready.then(() => {
    draw();
    tex.needsUpdate = true;
  });

  return tex;
}

/**
 * بافتِ کربن — نقشهٔ نرمال، بافته‌شده مثلِ الیافِ واقعی.
 *
 * این تنها چیزی است که یک سطحِ مشکیِ سه‌بعدی را از «پلاستیکِ رندرشده»
 * به «قطعهٔ ساخته‌شده» می‌برد، و در مرجع هم دقیقاً روی سینه دیده
 * می‌شود. دلیلش این است که چشم برای قضاوتِ جنسِ یک سطح، به
 * *ریزساختارش* نگاه می‌کند نه به رنگش؛ سطحِ کاملاً صافِ بی‌نقش،
 * ناخودآگاه «مدلِ کامپیوتری» خوانده می‌شود.
 *
 * بافتِ توییل است نه شطرنجی: هر خانه نوارهای مورب دارد و جهتِ
 * نوارها خانه‌به‌خانه عوض می‌شود. همین جهتِ متناوب است که وقتی نور
 * می‌لغزد، خانه‌ها یکی‌درمیان روشن و تیره می‌شوند — امضای کربن.
 *
 * از ارتفاع به نرمال با سوبل تبدیل می‌شود، چون نوشتنِ مستقیمِ
 * نرمال برای یک بافتِ تناوبی، شیب‌ها را در مرزِ خانه‌ها می‌شکند.
 */
export function carbonWeave({
  size = 512,
  /** تعدادِ خانه در هر ضلع */
  cells = 32,
  /** شدتِ برجستگی — بالا برود، به شبکهٔ اسباب‌بازی می‌زند */
  depth = 1.1,
} = {}) {
  const h = new Float32Array(size * size);
  const cell = size / cells;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cx = Math.floor(x / cell);
      const cy = Math.floor(y / cell);
      // جهتِ نوار، خانه‌به‌خانه عوض می‌شود
      const flip = (cx + cy) % 2 === 0;
      const u = x % cell;
      const v = y % cell;
      const t = flip ? u + v : u - v + cell;
      // نوارهای مورب داخلِ خانه
      const strand = Math.cos((t / cell) * Math.PI * 4);
      // لبهٔ خانه کمی فرو می‌رود — بافته‌ها روی هم رد می‌شوند
      const edge =
        Math.min(u, cell - u, v, cell - v) / (cell * 0.5);
      h[y * size + x] = strand * 0.5 + 0.5 * Math.min(1, edge * 2.2);
    }
  }

  const cvs = document.createElement("canvas");
  cvs.width = cvs.height = size;
  const ctx = cvs.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  const at = (x: number, y: number) =>
    h[((y + size) % size) * size + ((x + size) % size)];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // شیبِ افقی و عمودی — سوبلِ ساده‌شده
      const dx = (at(x + 1, y) - at(x - 1, y)) * depth;
      const dy = (at(x, y + 1) - at(x, y - 1)) * depth;
      const len = Math.sqrt(dx * dx + dy * dy + 1);
      const i = (y * size + x) * 4;
      img.data[i] = Math.round(((-dx / len) * 0.5 + 0.5) * 255);
      img.data[i + 1] = Math.round(((-dy / len) * 0.5 + 0.5) * 255);
      img.data[i + 2] = Math.round((1 / len) * 255);
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(cvs);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  tex.anisotropy = 8;
  return tex;
}
