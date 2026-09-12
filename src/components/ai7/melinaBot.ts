import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { STACHE_PATH } from "@/components/BrandMark";

/**
 * ربات ملینا — نسخهٔ دوم، و این‌بار مالِ خودمان.
 *
 * ربات نسخهٔ اول از روی یک مرجعِ بیرونی ساخته شده بود: پهن، حباب‌مانند
 * و اسباب‌بازی. این یکی عمداً برعکس است — یک *دستگاه* که اتفاقاً
 * صورت دارد. تفاوت در سه تصمیمِ فرمی است:
 *
 *   شعاعِ لبه کم — لبهٔ خیلی گرد همیشه «اسباب‌بازیِ کودک» می‌خواند.
 *   لبهٔ نرم ولی مشخص، «محصول» می‌خواند. همان تفاوتِ یک عروسک و
 *   یک بلندگوی رومیزی.
 *
 *   سیلوئتِ ایستاده — بلندتر از پهن، روی یک پایهٔ تخت به‌جای دو پای
 *   حبابی. جسمی که «گذاشته شده»، نه جانوری که «نشسته».
 *
 *   قرینگیِ شکسته — یک آنتنِ کج به‌جای دو گوشِ قرینه. قرینگیِ کامل
 *   سیلوئت را بی‌امضا می‌کند.
 *
 * و سه نشانه که از هویتِ برند می‌آیند:
 *
 *   سیبیل — نشانِ ملینا، همان مسیرِ SVG که در BrandMark زندگی
 *   می‌کند، اینجا برجسته شده و روی صفحهٔ صورت نشسته. ربات واقعاً
 *   نشانِ برند را *می‌پوشد*، نه اینکه کنارش گذاشته باشیم.
 *
 *   بنفشِ برند — فقط جایی که نور می‌دهد: چشم، سیبیل، درزِ گردن،
 *   نوارِ وضعیت، نوکِ آنتن. رنگِ لهجه روی سطحِ بی‌نور به تزئین
 *   می‌زند؛ وقتی از خودِ چیز بتابد، به هویت.
 *
 *   کرم به‌جای سفید — از خانوادهٔ همان #FAF6F1 صفحه. سفیدِ خالص روی
 *   زمینهٔ کرمِ سایت مثل وصله می‌نشیند.
 */

export type BotMaterials = {
  /** پلاستیکِ کرمِ بدنه */
  body: THREE.Material;
  /** پلاستیکِ کمی تیره‌تر — قاب و درز */
  trim: THREE.Material;
  /** فلزِ براق — حلقه‌ها و پیچ‌ها */
  metal: THREE.Material;
  /** لاستیکِ مات — پایه */
  rubber: THREE.Material;
  /** شیشهٔ رویِ صورت */
  visor: THREE.Material;
  /** صفحهٔ زیرِ شیشه */
  screen: THREE.Material;
  /** چشم‌های نورانی */
  eye: THREE.Material;
  /** بنفشِ برند، هرجا که می‌تابد */
  glow: THREE.Material;
  /**
   * سیبیل — مادهٔ خودش را دارد، نه glow.
   *
   * سطحِ تمام‌تابان هیچ سایه‌روشنی نمی‌گیرد، پس هر فرمی روی آن به
   * یک لکهٔ یک‌دستِ رنگی تبدیل می‌شود — و نشانِ برند دقیقاً همان
   * چیزی است که فرمش باید خوانده شود. این یکی تابشِ کمتر و زبریِ
   * واقعی دارد تا نور روی پخ‌هایش بشکند و حجم پیدا کند.
   */
  stache: THREE.Material;
};

export type BotParts = {
  group: THREE.Group;
  shell: THREE.Mesh;
  screen: THREE.Mesh;
  eyes: THREE.Mesh[];
  /** سیبیل — برای تکان‌های ریزِ خودش */
  stache: THREE.Mesh;
  antenna: THREE.Group;
  arms: THREE.Group[];
};

/**
 * مسیرِ SVG را به یک Shape سه‌بعدی تبدیل می‌کند.
 *
 * فقط M، C و Z را می‌فهمد — و همین کافی است، چون نشانِ برند دقیقاً
 * از همین سه ساخته شده. استفاده از SVGLoader برای یک مسیر، یک
 * لودرِ کامل را وارد باندل می‌کند که ارزشش را ندارد.
 *
 * محورِ y در SVG رو به پایین است و در three رو به بالا، پس همه‌جا
 * قرینه می‌شود.
 */
function pathToShape(d: string) {
  const shape = new THREE.Shape();
  // اعداد را با نشانه و اعشار می‌گیرد؛ حروف فرمان جدا می‌مانند
  const tokens = d.match(/[MCZmcz]|-?\d*\.?\d+/g) ?? [];
  let i = 0;
  const num = () => parseFloat(tokens[i++]);

  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === "M") {
      const x = num();
      const y = num();
      shape.moveTo(x, -y);
    } else if (cmd === "C") {
      const c1x = num();
      const c1y = num();
      const c2x = num();
      const c2y = num();
      const x = num();
      const y = num();
      shape.bezierCurveTo(c1x, -c1y, c2x, -c2y, x, -y);
    } else if (cmd === "Z" || cmd === "z") {
      shape.closePath();
    }
  }
  return shape;
}

/** سیبیلِ برند، برجسته‌شده و مقیاس‌شده تا روی صورتِ ربات بنشیند */
export function stacheGeometry(width: number) {
  const geo = new THREE.ExtrudeGeometry(pathToShape(STACHE_PATH), {
    // ضخامت و پخ نسبت به قابِ ۱۲۰ حساب می‌شوند. پخِ بزرگ‌تر عمدی
    // است: لبهٔ تیز از روبه‌رو ناپدید می‌شود، ولی پخ همیشه یک خطِ
    // روشن می‌گیرد و همان است که فرم را از پس‌زمینه جدا می‌کند.
    depth: 9,
    bevelEnabled: true,
    bevelThickness: 4,
    bevelSize: 3.2,
    bevelSegments: 4,
    curveSegments: 32,
  });
  geo.center();
  // مسیر روی قابِ ۱۲۰ کشیده شده و پهنای مؤثرش حدودِ ۱۰۸ است
  geo.scale(width / 108, width / 108, width / 108);
  return geo;
}

export function buildMelinaBot(m: BotMaterials): BotParts {
  const group = new THREE.Group();

  const add = (mesh: THREE.Mesh, parent: THREE.Object3D = group) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // ── بدنه ───────────────────────────────────────────────────────
  const shell = add(new THREE.Mesh(new RoundedBoxGeometry(3.1, 3.5, 2.5, 8, 0.46), m.body));
  shell.position.y = 0.24;

  /**
   * پخِ شانه — بالای بدنه کمی باریک‌تر می‌شود.
   *
   * روی رئوس انجام می‌شود نه با scale: scale کلِ فرم را می‌کِشد و
   * لبه‌های گرد را بیضی می‌کند. این باریک‌شدنِ ملایم همان چیزی است
   * که به یک جعبه، حسِ «طراحی‌شده» می‌دهد.
   */
  {
    const pos = shell.geometry.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const t = THREE.MathUtils.smoothstep(v.y, 0.5, 1.75);
      pos.setXYZ(i, v.x * (1 - t * 0.075), v.y, v.z * (1 - t * 0.06));
    }
    pos.needsUpdate = true;
    shell.geometry.computeVertexNormals();
  }

  // ── درزها ──────────────────────────────────────────────────────
  // خطِ جدایشِ دو نیمهٔ قالب، روی هر چهار وجه. بدونِ آن بدنه یک
  // تودهٔ یکپارچهٔ بی‌مقیاس است.
  for (const s of [-1, 1]) {
    const side = add(new THREE.Mesh(new RoundedBoxGeometry(0.018, 0.036, 2.0, 2, 0.008), m.trim));
    side.position.set(s * 1.535, -0.5, 0);
    side.castShadow = false;
  }
  const backSeam = add(new THREE.Mesh(new RoundedBoxGeometry(2.6, 0.036, 0.018, 2, 0.008), m.trim));
  backSeam.position.set(0, -0.5, -1.235);
  backSeam.castShadow = false;

  // ── درزِ نورانیِ گردن ──────────────────────────────────────────
  // نوارِ بنفشِ نازکی که دورِ بالای بدنه می‌گردد و مرزِ «سر» و «تنه»
  // را می‌سازد، درحالی‌که هندسه یک قطعهٔ یکپارچه است.
  const collar = add(new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.026, 8, 96), m.glow));
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 1.34;
  collar.scale.set(1.1, 0.9, 1);
  collar.castShadow = false;

  // ── صورت ───────────────────────────────────────────────────────
  const socket = add(new THREE.Mesh(new RoundedBoxGeometry(2.48, 1.98, 0.24, 6, 0.3), m.trim));
  socket.position.set(0, 0.62, 1.1);

  const screen = add(new THREE.Mesh(new RoundedBoxGeometry(2.28, 1.78, 0.14, 6, 0.26), m.screen));
  screen.position.set(0, 0.62, 1.18);
  screen.castShadow = false;

  // چشم‌ها — نوارِ باریکِ ایستاده. مردمکِ گردِ درشت، همان چیزی است
  // که فرم را به «شخصیتِ کارتونی» می‌بَرد.
  const eyeGeo = new RoundedBoxGeometry(0.15, 0.44, 0.05, 4, 0.06);
  const eyes: THREE.Mesh[] = [];
  for (const x of [-0.44, 0.44]) {
    const eye = new THREE.Mesh(eyeGeo, m.eye);
    eye.position.set(x, 0.94, 1.25);
    group.add(eye);
    eyes.push(eye);
  }

  // ── سیبیل ──────────────────────────────────────────────────────
  const stache = new THREE.Mesh(stacheGeometry(0.92), m.stache);
  stache.castShadow = true;
  stache.position.set(0, 0.26, 1.27);
  group.add(stache);

  // شیشه روی همه
  const visor = add(new THREE.Mesh(new RoundedBoxGeometry(2.34, 1.86, 0.34, 8, 0.28), m.visor));
  visor.position.set(0, 0.62, 1.2);
  visor.castShadow = false;

  // پیچ‌های گوشهٔ قاب
  const screwGeo = new THREE.CylinderGeometry(0.036, 0.036, 0.03, 12);
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      const screw = add(new THREE.Mesh(screwGeo, m.metal));
      screw.rotation.x = Math.PI / 2;
      screw.position.set(sx * 1.11, 0.62 + sy * 0.83, 1.22);
      screw.castShadow = false;
    }
  }

  // ── آنتنِ تکی ──────────────────────────────────────────────────
  const antenna = new THREE.Group();
  {
    add(new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.23, 0.14, 28), m.body), antenna);

    const ring = add(
      new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.155, 0.07, 28), m.metal),
      antenna,
    );
    ring.position.y = 0.1;

    const stem = add(
      new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.062, 1.24, 18), m.body),
      antenna,
    );
    stem.position.y = 0.74;

    // بیدِ بنفش — تنها نقطهٔ رنگیِ بالای سیلوئت
    const bead = add(new THREE.Mesh(new THREE.SphereGeometry(0.115, 24, 18), m.glow), antenna);
    bead.position.y = 1.4;
    bead.castShadow = false;
  }
  antenna.position.set(0.72, 1.92, -0.1);
  antenna.rotation.z = -0.17;
  group.add(antenna);

  // ── شیارهای تهویهٔ پهلو ────────────────────────────────────────
  // ریز و منظم — نشانهٔ ساخت، نه تزئین. همین‌ها مقیاسِ جسم را
  // اعلام می‌کنند.
  const gillGeo = new RoundedBoxGeometry(0.03, 0.038, 0.86, 2, 0.014);
  for (const s of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      const gill = add(new THREE.Mesh(gillGeo, m.trim));
      gill.position.set(s * 1.528, 0.86 - i * 0.13, -0.2);
      gill.castShadow = false;
    }
  }

  // ── نوارِ وضعیت ────────────────────────────────────────────────
  const strip = add(new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.055, 0.05, 4, 0.024), m.glow));
  strip.position.set(0, -0.98, 1.26);
  strip.castShadow = false;

  const label = add(new THREE.Mesh(new RoundedBoxGeometry(0.86, 0.2, 0.05, 4, 0.05), m.trim));
  label.position.set(0, -1.24, 1.24);
  label.castShadow = false;

  // ── بازوها ─────────────────────────────────────────────────────
  // کوچک و چسبیده به بدنه. بازوی درشت و آویزان، دوباره به
  // «عروسک» برمی‌گرداند.
  const arms: THREE.Group[] = [];
  for (const s of [-1, 1]) {
    const arm = new THREE.Group();
    const mitt = add(new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 0.3, 12, 26), m.body), arm);
    mitt.rotation.set(0.16, 0, s * 0.5);
    mitt.scale.set(1, 1, 0.8);
    arm.position.set(s * 1.56, -0.9, 0.2);
    group.add(arm);
    arms.push(arm);
  }

  // ── پایه ───────────────────────────────────────────────────────
  // یک قاعدهٔ تخت به‌جای دو پای حبابی: جسمی که روی میز *گذاشته*
  // شده، نه جانوری که ایستاده.
  const plinth = add(new THREE.Mesh(new RoundedBoxGeometry(2.5, 0.3, 2.0, 5, 0.11), m.trim));
  plinth.position.set(0, -1.6, 0.06);

  const pad = add(new THREE.Mesh(new RoundedBoxGeometry(2.3, 0.14, 1.82, 4, 0.06), m.rubber));
  pad.position.set(0, -1.76, 0.06);

  return { group, shell, screen, eyes, stache, antenna, arms };
}
