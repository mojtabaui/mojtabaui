import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * گیتارِ الکتریکِ قرمز.
 *
 * تنها چیزِ رنگیِ کلِ صحنه، و همین تک‌رنگ بودنش کارش را می‌کند: در
 * قابی که همه‌چیزش مشکی و سفید است، یک جسمِ قرمز بلافاصله موضوعِ
 * تصویر می‌شود.
 *
 * محورها در فضای محلیِ گیتار:
 *   +x  به سمتِ دسته و سرِ گیتار
 *   +y  رو به بالا (پهنای بدنه)
 *   +z  رو به بیرون (روی گیتار)
 *
 * بدنه از یک `Shape` اکسترود شده، نه از جعبه‌های چسبیده. دلیلش
 * سیلوئت است: گیتار را از فرمِ دورِ بدنه‌اش می‌شناسند — دو شاخِ
 * بالا و برشِ کمر — و آن فرم را با جعبه نمی‌شود ساخت. پخِ اکسترود
 * هم همان لبهٔ گردِ رنگ‌شده را می‌دهد که نور رویش می‌لغزد.
 */

export type GuitarMaterials = {
  /** رنگِ قرمزِ بدنه — لاک‌خورده، مثلِ رنگِ خودرو */
  red: THREE.Material;
  /** سیاهِ سخت‌افزار: پیکاپ، پل، شاسی */
  dark: THREE.Material;
  /** کرومِ براق: پل، گوشی‌ها، سیم‌ها */
  chrome: THREE.Material;
  /** صفحهٔ انگشت‌گذاری — چوبِ تیره */
  board: THREE.Material;
  /** دستهٔ چوبی — افرا، روشن و مات */
  wood: THREE.Material;
};

export type GuitarParts = {
  group: THREE.Group;
  /** سیم‌ها — برای لرزشِ موقعِ نواختن */
  strings: THREE.Mesh[];
  /**
   * دو لنگرِ خالی، جایی که کفِ دست‌ها باید بنشیند.
   *
   * وجودشان همان چیزی است که حدس زدنِ زاویهٔ بازو را غیرلازم می‌کند:
   * به‌جای «شانه را چقدر بچرخانم تا دست به ساز برسد»، سؤال می‌شود
   * «دست باید *اینجا* باشد» و زاویه‌ها **حل** می‌شوند. چون فرزندِ
   * خودِ گیتارند، با هر جابه‌جاییِ ساز خودبه‌خود همراه می‌آیند.
   */
  strumAnchor: THREE.Object3D;
  fretAnchor: THREE.Object3D;
  geometries: THREE.BufferGeometry[];
};

/**
 * برشِ بیرونیِ بدنه.
 *
 * نسخهٔ اول منحنی‌ها را با دستِ باز کشیده بود و نتیجه یک لکهٔ قرمزِ
 * ابری شد، نه گیتار. مشکل این بود که هر چهار نقطهٔ کنترل آزاد
 * بودند و هیچ‌کدام لبهٔ *صافی* نمی‌ساختند — و گیتار دقیقاً از تضادِ
 * دو منحنیِ بزرگ با دو بریدگیِ تیز شناخته می‌شود.
 *
 * این یکی صریح‌تر است: دو بوتِ بیضیِ بزرگ (بالا کوچک‌تر، پایین
 * بزرگ‌تر)، کمرِ فرورفته بینشان، و دو شاخ که با خطِ تقریباً مستقیم
 * به گردنِ ساز می‌رسند. مقیاس طوری است که طولِ بدنه حدودِ ۱٫۵ و
 * پهنایش حدودِ ۱٫۲ باشد — همان نسبتِ بدنهٔ یک گیتارِ برقی.
 */
function bodyShape() {
  const s = new THREE.Shape();
  // تهِ بدنه، پایین
  s.moveTo(-0.62, -0.2);
  // بوتِ پایینیِ بزرگ (سمتِ بم)
  s.bezierCurveTo(-0.86, -0.34, -0.84, -0.72, -0.5, -0.78);
  s.bezierCurveTo(-0.18, -0.84, 0.16, -0.72, 0.3, -0.5);
  // بریدگیِ بم، بعد شاخ
  s.bezierCurveTo(0.4, -0.34, 0.62, -0.4, 0.72, -0.26);
  s.bezierCurveTo(0.8, -0.15, 0.74, -0.06, 0.62, -0.05);
  // گردنِ ساز — تنها قسمتِ صافِ برش
  s.lineTo(0.62, 0.05);
  // شاخِ زیر، کوتاه‌تر
  s.bezierCurveTo(0.74, 0.06, 0.8, 0.16, 0.7, 0.3);
  s.bezierCurveTo(0.6, 0.44, 0.4, 0.4, 0.3, 0.26);
  // کمر و بوتِ بالایی
  s.bezierCurveTo(0.14, 0.5, -0.16, 0.66, -0.46, 0.6);
  s.bezierCurveTo(-0.78, 0.54, -0.86, 0.16, -0.62, -0.2);
  return s;
}

export function buildNeoGuitar(m: GuitarMaterials): GuitarParts {
  const group = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];
  const strings: THREE.Mesh[] = [];

  const mesh = (
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    parent: THREE.Object3D = group,
  ) => {
    geometries.push(geo);
    const o = new THREE.Mesh(geo, mat);
    o.castShadow = true;
    o.receiveShadow = true;
    parent.add(o);
    return o;
  };

  /* ── بدنه ──────────────────────────────────────────────────── */

  const body = mesh(
    new THREE.ExtrudeGeometry(bodyShape(), {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 4,
      curveSegments: 26,
    }),
    m.red,
  );
  body.position.z = -0.06;

  /** صفحهٔ محافظِ سیاه — همان تضادی که بدنهٔ تک‌رنگ را می‌شکند */
  const pick = mesh(new THREE.BoxGeometry(0.72, 0.46, 0.02), m.dark);
  pick.position.set(-0.05, -0.16, 0.075);

  /** دو پیکاپ */
  for (const x of [0.0, 0.28]) {
    const pu = mesh(new RoundedBoxGeometry(0.09, 0.34, 0.05, 3, 0.015), m.dark);
    pu.position.set(x, -0.1, 0.1);
  }

  /** پل — کروم، و جایی که سیم‌ها از آن شروع می‌شوند */
  const bridge = mesh(new RoundedBoxGeometry(0.1, 0.38, 0.06, 3, 0.02), m.chrome);
  bridge.position.set(-0.22, -0.1, 0.1);

  /** دو ولوم */
  for (const y of [-0.46, -0.58]) {
    const knob = mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.05, 14), m.chrome);
    knob.rotation.x = Math.PI / 2;
    knob.position.set(-0.18, y, 0.1);
  }

  /* ── دسته ──────────────────────────────────────────────────── */

  /**
   * دسته و صفحهٔ انگشت‌گذاری جدا هستند، چون در واقعیت هم دو قطعهٔ
   * جداگانه با دو رنگِ خیلی متفاوت‌اند — و همان مرزِ تیره است که
   * دسته را از دور «دستهٔ گیتار» نشان می‌دهد نه یک میلهٔ قرمز.
   */
  const neck = mesh(new RoundedBoxGeometry(1.5, 0.17, 0.1, 4, 0.035), m.wood);
  neck.position.set(1.32, -0.02, 0.02);

  const board = mesh(new THREE.BoxGeometry(1.42, 0.155, 0.035), m.board);
  board.position.set(1.34, -0.02, 0.075);

  /** فرت‌ها — نوارهای نازکِ کروم؛ فاصله‌شان به سرِ گیتار کم می‌شود */
  for (let i = 0; i < 14; i++) {
    const fret = mesh(new THREE.BoxGeometry(0.012, 0.155, 0.012), m.chrome);
    // فاصلهٔ فرت‌ها لگاریتمی است، نه یکنواخت — چشم این را می‌شناسد
    fret.position.set(0.7 + (1.32 * (1 - Math.pow(0.945, i * 2.4))) / 0.54, -0.02, 0.09);
  }

  /** خرک — مرزِ دسته و سرِ گیتار */
  const nut = mesh(new THREE.BoxGeometry(0.03, 0.165, 0.05), m.chrome);
  nut.position.set(2.04, -0.02, 0.08);

  /* ── سرِ گیتار ─────────────────────────────────────────────── */

  const head = mesh(new RoundedBoxGeometry(0.4, 0.22, 0.07, 4, 0.03), m.wood);
  head.position.set(2.24, -0.01, 0.0);
  head.rotation.z = -0.1;

  /** شش گوشی، سه‌تا یک طرف — همان چیدمانِ آشنا */
  for (let i = 0; i < 6; i++) {
    const s = i < 3 ? 1 : -1;
    const peg = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.07, 10), m.chrome);
    peg.rotation.x = Math.PI / 2;
    peg.position.set(2.14 + (i % 3) * 0.11, -0.01 + s * 0.11, 0.02);
  }

  /* ── سیم‌ها ────────────────────────────────────────────────── */

  /**
   * شش سیم، از پل تا خرک.
   *
   * استوانهٔ بسیار نازک و نه `Line`: خط، ضخامتش را با فاصله عوض
   * نمی‌کند و نور هم نمی‌گیرد. استوانه بازتاب دارد، پس وقتی چراغ
   * رویش بیفتد برق می‌زند — و سیمِ گیتار دقیقاً از همان شناخته
   * می‌شود.
   */
  for (let i = 0; i < 6; i++) {
    const y = -0.02 + (i - 2.5) * 0.028;
    const g = new THREE.CylinderGeometry(0.0055 + i * 0.0007, 0.0055 + i * 0.0007, 2.24, 6);
    geometries.push(g);
    const str = new THREE.Mesh(g, m.chrome);
    str.rotation.z = Math.PI / 2;
    str.position.set(0.92, y, 0.105);
    str.castShadow = false;
    group.add(str);
    strings.push(str);
  }

  /* ── لنگرهای دست ───────────────────────────────────────────── */

  /** روی سیم‌ها، بینِ پل و پیکاپ — جایی که مضراب می‌خورد */
  const strumAnchor = new THREE.Object3D();
  strumAnchor.position.set(-0.06, -0.1, 0.22);
  group.add(strumAnchor);

  /**
   * روی دسته، حدودِ فرتِ پنجم.
   *
   * z منفیِ کوچک، چون دستِ انگشت‌گذاری از *پشتِ* دسته می‌گیرد نه از
   * رویش؛ اگر روی صفحهٔ فرت بنشیند، انگار دارد دسته را هُل می‌دهد.
   */
  const fretAnchor = new THREE.Object3D();
  fretAnchor.position.set(1.24, -0.04, -0.02);
  group.add(fretAnchor);

  /** بندِ گیتار — بدونش گیتار در هوا شناور به‌نظر می‌رسد */
  const strap = mesh(new THREE.BoxGeometry(0.035, 1.5, 0.02), m.dark);
  strap.position.set(0.34, 0.3, -0.08);
  strap.rotation.z = -0.62;

  return { group, strings, strumAnchor, fretAnchor, geometries };
}
