import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * رباتِ نارنجی — یک مانیتورِ CRT که رویش صفحه‌کلید ایستاده و دورش
 * ابزارِ کارِ یک طراح شناور است.
 *
 * این ربات از رباتِ کرمِ v2 در یک چیزِ بنیادی فرق دارد: آنجا یک
 * *جسمِ واحد* بود با چند جزئیات، اینجا یک *مجموعه* است. سر یک
 * دستگاه است، تنه دستگاهِ دیگری، و بقیه اشیائی که دورش می‌گردند.
 * این تصمیم دو نتیجه دارد که هر دو عمدی‌اند:
 *
 *   سیلوئت شلوغ می‌شود و همین شلوغی، شخصیت است. یک جعبهٔ تمیز
 *   «محصول» می‌خواند؛ جعبه‌ای که وسطِ ابزارهایش گیر کرده، «کسی که
 *   دارد کار می‌کند» می‌خواند — و موضوعِ خودِ دوره هم همین است.
 *
 *   هر قطعه می‌تواند مستقل حرکت کند. وقتی صحنه می‌چرخد، اشیاء با
 *   تأخیرهای متفاوت دنبال می‌کنند و عمق می‌سازند؛ چیزی که یک تودهٔ
 *   یکپارچه هرگز نمی‌سازد.
 *
 * قواعدی که در تمامِ فایل رعایت می‌شوند:
 *
 *   هیچ لبهٔ تیزی وجود ندارد. هر جعبه پخ دارد و هر پخ یک خطِ روشن
 *   می‌گیرد. در رندرِ پلاستیکی، همان خطِ باریکِ لبه است که فرم را
 *   می‌خواناند — نه رنگِ سطح.
 *
 *   قرینگی همه‌جا کمی شکسته است: آنتن کج، دیسک بیرون‌زده از یک
 *   طرف، دست‌ها نامتقارن. قرینگیِ کامل، سیلوئت را بی‌امضا می‌کند.
 *
 *   هیچ سطحِ بزرگی بدون یک جزئیاتِ ریز رها نشده — دکمه، برچسب،
 *   پیچ، درز. همین‌ها هستند که به جسم *مقیاس* می‌دهند؛ بدون‌شان
 *   جعبهٔ نارنجی می‌تواند به هر اندازه‌ای باشد.
 */

export type DecodeMaterials = {
  /** پلاستیکِ نارنجیِ بدنه */
  orange: THREE.Material;
  /** نارنجیِ تیره‌تر — گردن، زیرسری‌ها */
  orangeDeep: THREE.Material;
  /** قرمزِ اشباع — قابِ صفحه، برچسب‌زن */
  red: THREE.Material;
  /** قرمزِ عمیق — تورفتگی‌ها و سایه‌های ساخته‌شده */
  redDeep: THREE.Material;
  /** کرمِ روشن — قابِ بیرونی، دیسکِ بالا، خط‌کش */
  cream: THREE.Material;
  /** صفحهٔ CRT */
  screen: THREE.Material;
  /** شیشهٔ روی صفحه */
  glass: THREE.Material;
  /** خاکستریِ روشن — بدنهٔ صفحه‌کلید */
  grey: THREE.Material;
  /** خاکستریِ میانی — کلیدها */
  key: THREE.Material;
  /** زغالی — آنتن، کلیدِ تیره، علامتِ بعلاوه */
  dark: THREE.Material;
  /** فلزِ براق — پیچ‌ها */
  metal: THREE.Material;
};

export type DecodeParts = {
  group: THREE.Group;
  /** مانیتور و گردن — با تأخیر نسبت به کلِ صحنه می‌چرخد */
  head: THREE.Group;
  screen: THREE.Mesh;
  antenna: THREE.Group;
  /** دستِ چپ و دستِ راست */
  hands: THREE.Group[];
  /** علامتِ بعلاوهٔ مشکیِ کنارِ دست */
  cross: THREE.Object3D;
  /**
   * چیزهایی که شناورند — هر کدام فاز و دامنهٔ خودش را دارد.
   *
   * فاز از پیش تعیین می‌شود نه در زمانِ اجرا: اگر همه با یک فاز
   * بالا و پایین بروند، به‌جای «شناور»، «کلِ صحنه می‌لرزد» دیده
   * می‌شود.
   */
  floaters: { obj: THREE.Object3D; base: THREE.Vector3; phase: number; amp: number; spin: number }[];
};

/* ────────────────────────────────────────────────────────────────
   کمک‌کننده‌های هندسی
   ──────────────────────────────────────────────────────────────── */

/**
 * دیسکِ لبه‌گرد — با چرخشِ یک نیم‌رخ، نه با استوانه.
 *
 * استوانه دو لبهٔ تیز دارد و در رندرِ پلاستیکی مثل چیزی که با اره
 * بریده شده به‌نظر می‌رسد. لبهٔ کاملاً گرد، همان چیزی است که به
 * قطعه حسِ «قالب‌گیری‌شده» می‌دهد.
 */
function disc(R: number, T: number, seg = 44) {
  // نیم‌رخ از پایین به بالا خوانده می‌شود. برعکسش، نرمال‌ها را رو به
  // داخل می‌چرخاند و قطعه از بیرون تیره و مرده دیده می‌شود — همان
  // اشتباهی که همیشه شبیهِ «سایه‌ای که نباید آنجا باشد» به‌نظر
  // می‌رسد و دنبالِ نور می‌گردی، نه دنبالِ هندسه.
  const pts: THREE.Vector2[] = [new THREE.Vector2(0, -T)];
  const N = 7;
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI;
    pts.push(new THREE.Vector2(R - T + Math.sin(a) * T, -Math.cos(a) * T));
  }
  pts.push(new THREE.Vector2(0, T));
  return new THREE.LatheGeometry(pts, seg);
}

/**
 * منشورِ هشت‌ضلعیِ کشیده — بدنهٔ برچسب‌زن.
 *
 * جعبهٔ گردگوشه اینجا جواب نمی‌داد: چیزی که به این جسم حسِ «ابزارِ
 * فلزی» می‌دهد، پخ‌های *تخت* است نه گردیِ یکنواخت. هر پخ یک نوارِ
 * روشنِ جدا می‌گیرد و همان چند نوارِ موازی است که جسم را صنعتی
 * می‌کند.
 */
function chamferBar(w: number, h: number, len: number, cut = 0.3) {
  const hw = w / 2;
  const hh = h / 2;
  const cx = hw * cut;
  const cy = hh * cut;
  const shape = new THREE.Shape();
  shape.moveTo(-hw + cx, hh);
  shape.lineTo(hw - cx, hh);
  shape.lineTo(hw, hh - cy);
  shape.lineTo(hw, -hh + cy);
  shape.lineTo(hw - cx, -hh);
  shape.lineTo(-hw + cx, -hh);
  shape.lineTo(-hw, -hh + cy);
  shape.lineTo(-hw, hh - cy);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: len,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 2,
  });
  geo.center();
  return geo;
}

/**
 * صفحهٔ کمی محدب — لامپِ تصویر.
 *
 * CRT هرگز تخت نیست، و همین برآمدگیِ ملایم است که بازتاب را روی
 * صفحه *می‌کِشد*. صفحهٔ تخت، بازتاب را به یک لکهٔ ثابت تبدیل
 * می‌کند و بلافاصله «تصویرِ چسبانده‌شده» دیده می‌شود.
 */
function crtGlass(w: number, h: number, bulge: number, seg = 40) {
  const geo = new THREE.PlaneGeometry(w, h, seg, seg);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) / w) * 2;
    const v = (pos.getY(i) / h) * 2;
    // توانِ چهار به‌جای دو: مرکز تقریباً تخت می‌ماند و انحنا فقط
    // نزدیکِ لبه‌ها جمع می‌شود، دقیقاً مثلِ لامپِ واقعی
    pos.setZ(i, bulge * (1 - u ** 4) * (1 - v ** 4));
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/**
 * سیمِ فنری — یک مارپیچ که محورش خودش خم است.
 *
 * مارپیچ دورِ یک محورِ مستقیم، فنرِ کاتالوگ می‌شود. چیزی که به آن
 * حسِ «سیمِ ولشده روی میز» می‌دهد، این است که محور هم خم باشد و
 * شعاعِ حلقه‌ها در طول کمی تغییر کند.
 */
function coilCurve(turns = 11, R = 0.34) {
  const pts: THREE.Vector3[] = [];
  const N = Math.round(turns * 12);
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const a = t * turns * Math.PI * 2;
    // شعاع در دو سر کمی جمع می‌شود — سیم آنجا کشیده شده
    const r = R * (0.72 + 0.28 * Math.sin(Math.PI * Math.min(1, t * 1.15)));
    pts.push(
      new THREE.Vector3(
        -1.55 + t * 3.1,
        Math.sin(a) * r - Math.sin(t * Math.PI) * 0.34 + t * 0.1,
        Math.cos(a) * r + Math.sin(t * Math.PI * 0.8) * 0.42,
      ),
    );
  }
  return new THREE.CatmullRomCurve3(pts);
}

/* ────────────────────────────────────────────────────────────────
   ساخت
   ──────────────────────────────────────────────────────────────── */

export function buildDecodeBot(
  m: DecodeMaterials,
  /** بافت‌های چاپی که از بیرون می‌آیند تا این فایل به canvas وابسته نشود */
  decals: {
    warn: THREE.Texture;
    strip: THREE.Texture;
    arrow: THREE.Texture;
    micro: THREE.Texture;
    ignore: THREE.Texture;
    ignoreGloss: THREE.Texture;
  },
): DecodeParts {
  const group = new THREE.Group();

  const add = (mesh: THREE.Mesh, parent: THREE.Object3D, shadow = true) => {
    mesh.castShadow = shadow;
    mesh.receiveShadow = shadow;
    parent.add(mesh);
    return mesh;
  };

  /**
   * برچسبِ چاپی — یک صفحهٔ نازک که کمی جلوترِ سطح می‌نشیند.
   *
   * چاپ را روی UVهای خودِ جعبهٔ گردگوشه نمی‌شود گذاشت: آن UVها برای
   * پخ‌ها کش می‌آیند و هر نوشته‌ای روی لبه‌ها تاب برمی‌دارد. صفحهٔ
   * جدا با polygonOffset، هم تیز می‌ماند و هم می‌شود دقیق جایش داد.
   */
  const decal = (
    tex: THREE.Texture,
    w: number,
    h: number,
    parent: THREE.Object3D,
    opts: { emboss?: boolean; base?: THREE.Material; gloss?: THREE.Texture } = {},
  ) => {
    const mat = opts.emboss
      ? (() => {
          const src = (opts.base ?? m.red) as THREE.MeshPhysicalMaterial;
          const clone = src.clone();
          clone.normalMap = tex;
          // زبریِ حروف کمی کمتر از بدنه است. برجستگیِ تنها، در نورِ
          // پخش گم می‌شود؛ اختلافِ براقی حتی در سایه هم کلمه را
          // نگه می‌دارد. زمینهٔ بافت سفید است تا مستطیلِ صفحه
          // به‌کل ناپیدا بماند.
          if (opts.gloss) clone.roughnessMap = opts.gloss;
          // برجستگیِ ضعیف در این نور اصلاً دیده نمی‌شود. مقیاسِ
          // بزرگ‌ترِ نرمال، شیبِ لبهٔ حروف را تندتر می‌کند و همان
          // است که سایه‌روشنِ کافی می‌سازد تا کلمه خوانده شود.
          clone.normalScale = new THREE.Vector2(2.8, 2.8);
          return clone;
        })()
      : new THREE.MeshStandardMaterial({
          map: tex,
          transparent: true,
          roughness: 0.42,
          metalness: 0,
        });
    mat.polygonOffset = true;
    mat.polygonOffsetFactor = -2;
    mat.polygonOffsetUnits = -2;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    mesh.renderOrder = 1;
    parent.add(mesh);
    return mesh;
  };

  const floaters: DecodeParts["floaters"] = [];
  const float = (obj: THREE.Object3D, phase: number, amp: number, spin = 0) => {
    floaters.push({ obj, base: obj.position.clone(), phase, amp, spin });
    return obj;
  };

  /* ── سر: مانیتور ────────────────────────────────────────────── */

  const head = new THREE.Group();
  head.position.y = 2.15;
  group.add(head);

  const BW = 3.2;
  const BH = 3.0;
  const BD = 2.85;

  const box = add(new THREE.Mesh(new RoundedBoxGeometry(BW, BH, BD, 6, 0.34), m.orange), head);

  /**
   * شیبِ رو به عقبِ صورت.
   *
   * روی رئوس انجام می‌شود نه با چرخاندنِ کلِ جعبه: اگر جعبه بچرخد،
   * دیسکِ بالا و پایهٔ گردن هم با آن کج می‌شوند. این‌طور فقط
   * *صورت* عقب می‌نشیند و بقیه سرِ جایشان می‌مانند — همان کاری که
   * قالبِ یک مانیتورِ واقعی می‌کند.
   */
  {
    const pos = box.geometry.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const up = THREE.MathUtils.smoothstep(v.y, -BH / 2, BH / 2);
      const front = THREE.MathUtils.smoothstep(v.z, 0, BD / 2);
      pos.setXYZ(i, v.x * (1 - up * 0.02), v.y, v.z - front * up * 0.2);
    }
    pos.needsUpdate = true;
    box.geometry.computeVertexNormals();
  }

  // درزِ افقیِ دورِ بدنه — دو نیمهٔ قالب
  {
    const seam = add(
      new THREE.Mesh(new RoundedBoxGeometry(BW - 0.03, 0.035, BD - 0.03, 2, 0.014), m.orangeDeep),
      head,
      false,
    );
    seam.position.y = -BH / 2 + 0.62;
  }

  /* ── صورت: قابِ کرم، قابِ قرمز، صفحه ────────────────────────── */

  const face = new THREE.Group();
  face.position.set(0, 0.28, BD / 2 - 0.14);
  head.add(face);

  // قابِ کرم — کمی به بالا-چپ لغزیده. در مرجع هم فقط از دو ضلع
  // بیرون می‌زند؛ حاشیهٔ یکنواخت، قاب را به یک «خط دورِ صفحه»
  // تبدیل می‌کند و کلِ ترکیب را ساکن می‌کند.
  const creamPlate = add(
    new THREE.Mesh(new RoundedBoxGeometry(2.66, 2.42, 0.26, 6, 0.19), m.cream),
    face,
  );
  creamPlate.position.set(-0.11, 0.09, 0.0);

  /**
   * قابِ قرمز — تقریباً هم‌اندازهٔ قابِ کرم، فقط لغزیده.
   *
   * حاشیهٔ کرم از اختلافِ *جای* دو صفحه می‌آید، نه از اختلافِ
   * اندازه‌شان. با این کار کرم فقط از دو ضلع بیرون می‌ماند و ضلعِ
   * دیگر تمیز بسته می‌شود — همان چیزی که در مرجع است. حاشیهٔ
   * دورتادور، قاب را به یک «خطِ دورِ صفحه» تبدیل می‌کند و ترکیب را
   * ساکن می‌کند.
   */
  const redBezel = add(
    new THREE.Mesh(new RoundedBoxGeometry(2.6, 2.36, 0.4, 6, 0.17), m.red),
    face,
  );
  redBezel.position.set(0.05, -0.03, 0.09);

  // دهانهٔ قاب — قابِ قرمزِ تیره‌تر که صفحه تویش فرو رفته. باریک
  // است: قابِ پهن، مانیتور را به یک بالشتکِ قرمز تبدیل می‌کند
  const well = add(new THREE.Mesh(new RoundedBoxGeometry(2.3, 2.06, 0.24, 5, 0.1), m.redDeep), face);
  well.position.set(0.05, -0.03, 0.17);

  const screen = add(new THREE.Mesh(crtGlass(2.04, 1.8, 0.075, 22), m.screen), face, false);
  screen.position.set(0.05, -0.03, 0.31);

  // شیشه — پوستهٔ خیلی نازکِ جلوی صفحه. تنها کارش این است که
  // سافت‌باکس را به شکلِ یک کشِ نوری روی صفحه بیندازد.
  const glass = add(new THREE.Mesh(crtGlass(2.12, 1.88, 0.085, 16), m.glass), face, false);
  glass.position.set(0.05, -0.03, 0.35);
  glass.renderOrder = 2;

  /* ── دیسکِ کرمِ بالا ────────────────────────────────────────── */

  const cap = add(new THREE.Mesh(disc(1.6, 0.115, 56), m.cream), head);
  cap.position.set(-0.3, BH / 2 + 0.07, 0.2);
  cap.rotation.set(-0.06, 0, 0.05);
  cap.scale.set(1, 1, 0.94);

  /* ── آنتن ───────────────────────────────────────────────────── */

  const antenna = new THREE.Group();
  {
    const foot = add(new THREE.Mesh(new RoundedBoxGeometry(0.4, 0.24, 0.3, 3, 0.05), m.dark), antenna);
    foot.position.y = 0.06;

    const tag = decal(decals.micro, 0.3, 0.075, antenna);
    tag.position.set(0.201, 0.06, 0);
    tag.rotation.y = Math.PI / 2;

    const rod = add(new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.038, 1.12, 14), m.dark), antenna);
    rod.position.y = 0.72;

    const tip = add(new THREE.Mesh(new THREE.SphereGeometry(0.036, 16, 12), m.dark), antenna);
    tip.position.y = 1.28;
  }
  antenna.position.set(1.16, BH / 2 + 0.06, -1.0);
  antenna.rotation.z = -0.1;
  antenna.rotation.x = -0.04;
  head.add(antenna);

  /* ── بلندگوی قرمزِ پهلو ─────────────────────────────────────── */

  {
    const speaker = new THREE.Group();
    speaker.position.set(BW / 2 - 0.03, 0.12, 0.12);
    speaker.rotation.z = -Math.PI / 2;
    speaker.rotation.x = 0.12;
    head.add(speaker);

    // یقهٔ برجسته
    const collar = add(new THREE.Mesh(disc(0.86, 0.11, 40), m.redDeep), speaker);
    collar.scale.set(1, 1, 0.94);

    // مخروطِ تورفته — بدونِ کف، چون دُم داخلش را می‌پوشاند
    const throat = add(
      new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.34, 0.5, 36, 1, true), m.redDeep),
      speaker,
      false,
    );
    throat.position.y = -0.24;
    (throat.material as THREE.Material).side = THREE.DoubleSide;

    // گویِ براق — کمی خارج از مرکز، چون قرینگیِ کامل این قطعه را
    // به یک دکمهٔ تخت تبدیل می‌کند
    const dome = add(new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 22), m.red), speaker);
    dome.position.set(-0.1, 0.04, 0.12);
    dome.scale.set(1, 0.86, 1);
  }

  /* ── دکمه‌های خاکستری و برچسبِ خطا ──────────────────────────── */

  {
    const btnGeo = new THREE.CylinderGeometry(0.082, 0.095, 0.16, 20);
    const capGeo = new THREE.CylinderGeometry(0.075, 0.082, 0.045, 20);
    for (let i = 0; i < 3; i++) {
      const holder = new THREE.Group();
      holder.position.set(-0.34 + i * 0.25, -1.12, BD / 2 - 0.06 + i * 0.015);
      holder.rotation.x = Math.PI / 2;
      head.add(holder);
      add(new THREE.Mesh(btnGeo, m.dark), holder);
      const c = add(new THREE.Mesh(capGeo, m.grey), holder, false);
      c.position.y = 0.09;
    }

    const warn = decal(decals.warn, 0.82, 0.15, head);
    warn.position.set(0.92, -1.12, BD / 2 + 0.02);
    warn.rotation.z = 0.03;
  }

  /* ── گردن ───────────────────────────────────────────────────── */

  const neck = new THREE.Group();
  neck.position.y = 0.45;
  group.add(neck);
  {
const flange = add(new THREE.Mesh(disc(1.3, 0.095, 44), m.orange), neck);
    flange.scale.set(1, 1, 0.84);

    const collar = add(new THREE.Mesh(disc(1.1, 0.085, 44), m.orangeDeep), neck);
    collar.position.y = -0.24;
    collar.scale.set(1, 1, 0.84);

    const post = add(new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.34, 32), m.orange), neck);
    post.position.y = -0.5;
    post.scale.set(1, 1, 0.86);
  }

  /* ── تنه: صفحه‌کلید ─────────────────────────────────────────── */

  const board = new THREE.Group();
  board.position.set(-0.22, -0.62, 0.5);
  board.rotation.set(-0.44, 0.14, -0.1);
  group.add(board);

  {
    const base = add(new THREE.Mesh(new RoundedBoxGeometry(3.0, 0.44, 2.05, 5, 0.14), m.grey), board);
    base.position.y = -0.1;

    // لبهٔ بالاییِ کمی جلوآمده — بدونش صفحه‌کلید یک تختهٔ ساده است
    const lip = add(new THREE.Mesh(new RoundedBoxGeometry(3.04, 0.16, 0.28, 3, 0.065), m.grey), board);
    lip.position.set(0, 0.0, 0.95);

    /**
     * کلیدها با InstancedMesh.
     *
     * چهل کلیدِ جدا یعنی چهل فراخوانیِ رسم در هر فریم، و این صحنه
     * روی یک صفحهٔ اسکرول‌شونده زندگی می‌کند. با نمونه‌سازی، همه در
     * یک فراخوانی می‌روند و رنگِ هرکدام هم مستقل می‌ماند.
     */
    const COLS = 8;
    const ROWS = 4;
    const PITCH = 0.345;
    const capGeo = new RoundedBoxGeometry(0.285, 0.24, 0.285, 3, 0.05);

    // فرورفتگیِ سطحِ کلید — انگشت رویش می‌نشیند
    {
      const pos = capGeo.attributes.position;
      const v = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        if (v.y > 0.035) {
          const d = Math.min(1, Math.hypot(v.x, v.z) / 0.15);
          pos.setY(i, v.y - (1 - d * d) * 0.032);
        }
      }
      pos.needsUpdate = true;
      capGeo.computeVertexNormals();
    }

    // جاهایی که کلیدِ ویژه می‌نشیند و نباید کلیدِ ساده بخورد
    const taken = new Set(["1,3", "1,4", "2,3", "2,4", "0,6", "0,0"]);
    const slots: { r: number; c: number }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!taken.has(r + "," + c)) slots.push({ r, c });
      }
    }

const at = (r: number, c: number) =>
      new THREE.Vector3(
        (c - (COLS - 1) / 2) * PITCH + r * 0.055,
        0.16,
        (r - (ROWS - 1) / 2) * PITCH * 1.02,
      );

    const keys = new THREE.InstancedMesh(capGeo, m.key, slots.length);
    keys.castShadow = true;
    keys.receiveShadow = true;
    const dummy = new THREE.Object3D();
    const tint = new THREE.Color();
    // دو خانوادهٔ خاکستری، درهم — صفحه‌کلیدِ واقعی هرگز یک‌رنگ نیست
const pale = new THREE.Color("#dedbd6");
    const mid = new THREE.Color("#8e8b86");
    slots.forEach((s, i) => {
      dummy.position.copy(at(s.r, s.c));
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      keys.setMatrixAt(i, dummy.matrix);
      const light = (s.c + s.r * 3) % 5 < 2 || s.c === 0 || s.c === COLS - 1;
      keys.setColorAt(i, tint.copy(light ? pale : mid));
    });
    keys.instanceMatrix.needsUpdate = true;
    if (keys.instanceColor) keys.instanceColor.needsUpdate = true;
    board.add(keys);

    // کلیدِ زغالی — تنها نقطهٔ تیرهٔ صفحه‌کلید، بالا-چپ
    const darkKey = add(new THREE.Mesh(capGeo, m.dark), board);
    darkKey.position.copy(at(0, 0));

    // کلیدِ نارنجیِ پهن با نشانِ پیکان
    const wideGeo = new RoundedBoxGeometry(0.66, 0.26, 0.66, 3, 0.06);
    const hot = add(new THREE.Mesh(wideGeo, m.red), board);
    hot.position.copy(at(1, 3)).add(new THREE.Vector3(PITCH * 0.5, 0.01, PITCH * 0.5));

    const badge = decal(decals.arrow, 0.34, 0.34, board);
    badge.position.copy(hot.position).add(new THREE.Vector3(0, 0.14, 0));
    badge.rotation.x = -Math.PI / 2;

    const badge2 = decal(decals.arrow, 0.24, 0.24, board);
    badge2.position.copy(at(0, 6)).add(new THREE.Vector3(0, 0.128, 0));
    badge2.rotation.x = -Math.PI / 2;
    badge2.rotation.z = 0.4;
  }

  /* ── دست‌ها ─────────────────────────────────────────────────── */

  /**
   * دست — یک دستکشِ سفیدِ کارتونی، نه یک دستِ آناتومیک.
   *
   * چهار انگشتِ جدا در این مقیاس به تودهٔ درهم تبدیل می‌شود. یک
   * مشتِ گرد با یک انگشتِ اشاره، هم فرمِ خواناتری دارد و هم دقیقاً
   * همان چیزی است که مرجع دارد: دستی که به چیزی اشاره می‌کند.
   */
  const makeHand = () => {
    const hand = new THREE.Group();

    const fist = add(new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 16), m.cream), hand);
    fist.scale.set(1, 0.94, 0.86);

    const finger = add(new THREE.Mesh(new THREE.CapsuleGeometry(0.088, 0.3, 6, 14), m.cream), hand);
    finger.position.set(-0.1, -0.32, 0.06);
    finger.rotation.set(0.2, 0, 0.42);
    finger.scale.set(1, 1, 0.94);

    // نوکِ باریک‌شونده
    const tip = add(new THREE.Mesh(new THREE.SphereGeometry(0.078, 14, 10), m.cream), hand);
    tip.position.set(-0.2, -0.53, 0.08);

    // شست، جمع‌شده کنارِ مشت
    const thumb = add(new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.13, 5, 12), m.cream), hand);
    thumb.position.set(0.19, -0.11, 0.16);
    thumb.rotation.set(0.5, 0, -0.7);

    // مچ — بدونش دست از هوا آویزان است
    const cuff = add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.22, 18), m.cream), hand);
    cuff.position.set(0.1, 0.27, -0.06);
    cuff.rotation.z = -0.3;

    return hand;
  };

  const hands: THREE.Group[] = [];

  const leftHand = makeHand();
  leftHand.position.set(-2.34, 0.12, 1.2);
  leftHand.rotation.set(0.14, 0.34, 0.62);
  leftHand.scale.setScalar(1.08);
  group.add(leftHand);
  hands.push(leftHand);

  /**
   * علامتِ بعلاوهٔ مشکی.
   *
   * در مرجع روی دست افتاده و از هر دو طرفش بیرون می‌زند — نه نشانه‌ای
   * که دست *گرفته*، بلکه چیزی که در همان لحظه از دستش در رفته. همان
   * ابهام است که ترکیب را زنده نگه می‌دارد.
   */
  const cross = new THREE.Group();
  {
    const barGeo = new RoundedBoxGeometry(1.0, 0.16, 0.16, 2, 0.06);
    add(new THREE.Mesh(barGeo, m.dark), cross);
    const v = add(new THREE.Mesh(barGeo, m.dark), cross);
    v.rotation.z = Math.PI / 2;
  }
  cross.position.set(-1.94, 0.82, 1.62);
  cross.rotation.set(0.1, 0.2, 0.05);
  group.add(cross);
  float(cross, 1.9, 0.05, 0.16);

  /* ── برچسب‌زنِ قرمز ─────────────────────────────────────────── */

  const gun = new THREE.Group();
  gun.position.set(1.95, -0.62, 0.62);
  /**
   * چرخشِ y مثبت است تا چرخشِ کلِ صحنه را تا حدی خنثی کند.
   *
   * وجهِ تختِ جلوییِ برچسب‌زن جایی است که کلمهٔ کَنده رویش نشسته؛ اگر
   * آن وجه با دوربین زاویهٔ تندی بسازد، حروف در پرسپکتیو له می‌شوند
   * و برجستگی هم دیده نمی‌شود. جسم باید کمی *به دوربین برگردد*.
   */
  gun.rotation.set(0.1, 0.5, -0.42);
  group.add(gun);
  float(gun, 0.4, 0.06, 0.05);

  {
    const barrel = add(new THREE.Mesh(chamferBar(0.92, 0.86, 2.4), m.red), gun);
    barrel.rotation.y = Math.PI / 2;

    // «IGNORE» — کَنده، نه چاپ‌شده
    const word = decal(decals.ignore, 1.95, 0.5, gun, {
      emboss: true,
      base: m.red,
      gloss: decals.ignoreGloss,
    });
    word.position.set(0, 0.02, 0.475);
    word.rotation.x = 0;

    // سرِ جلو — کمی باریک‌تر، مثلِ دهانهٔ دستگاه
    const nose = add(new THREE.Mesh(new RoundedBoxGeometry(0.52, 0.76, 0.84, 4, 0.1), m.redDeep), gun);
    nose.position.set(-1.32, -0.02, 0);

    // دسته و ماشه
    const grip = add(new THREE.Mesh(new RoundedBoxGeometry(0.36, 1.0, 0.6, 4, 0.14), m.redDeep), gun);
    grip.position.set(0.9, -0.66, 0);
    grip.rotation.z = 0.3;

    const guard = add(new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.07, 8, 20, Math.PI * 1.2), m.redDeep), gun);
    guard.position.set(0.42, -0.6, 0);
    guard.rotation.set(Math.PI / 2, 0, 0.5);

    const trigger = add(new THREE.Mesh(new RoundedBoxGeometry(0.1, 0.34, 0.16, 3, 0.045), m.redDeep), gun);
    trigger.position.set(0.44, -0.62, 0);
    trigger.rotation.z = 0.25;

    // پیچ‌های ریز — تنها چیزی که به این حجمِ قرمز مقیاس می‌دهد
    const screwGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 14);
    for (const p of [
      [-0.95, 0.24, 0.36],
      [0.62, 0.2, 0.36],
      [0.98, -0.98, 0.3],
    ] as const) {
      const s = add(new THREE.Mesh(screwGeo, m.metal), gun, false);
      s.position.set(p[0], p[1], p[2]);
      s.rotation.x = Math.PI / 2;
    }
  }

  const rightHand = makeHand();
  rightHand.position.set(1.62, -1.24, 0.86);
  rightHand.rotation.set(0.2, -0.5, -1.7);
  rightHand.scale.setScalar(0.94);
  group.add(rightHand);
  hands.push(rightHand);

  /* ── پشتهٔ زیرسری با لبخند ──────────────────────────────────── */

  {
    const stack = new THREE.Group();
    stack.position.set(-1.66, -2.32, 0.5);
    stack.rotation.set(0.42, 0.24, 0.1);
    group.add(stack);
    float(stack, 3.1, 0.07, -0.1);

    const padGeo = new RoundedBoxGeometry(1.36, 0.14, 1.36, 4, 0.26);
    for (let i = 0; i < 4; i++) {
      const pad = add(new THREE.Mesh(padGeo, i === 0 ? m.orange : m.orangeDeep), stack);
      pad.position.set(i * 0.02, -i * 0.155, i * 0.015);
      pad.rotation.y = i * 0.03;
    }

    const chip = add(
      new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.1, 1.0, 4, 0.2), m.red),
      stack,
    );
    chip.position.set(-0.04, 0.11, -0.02);

    /**
     * لبخند — با هندسه، نه با بافت.
     *
     * لبخندِ چاپ‌شده روی قرمز، از زاویه تخت می‌شود و بلافاصله
     * برچسب می‌خواند. با خطوطِ برجسته، هر خط سایهٔ خودش را روی
     * قرمز می‌اندازد و همان سایه است که آن را به بخشی از جسم
     * تبدیل می‌کند.
     */
    const smile = new THREE.Group();
    smile.position.set(-0.04, 0.16, -0.02);
    stack.add(smile);

    const mouth = add(
      new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.052, 9, 30, Math.PI * 0.95), m.redDeep),
      smile,
    );
    mouth.rotation.set(Math.PI / 2, 0, Math.PI);
    mouth.position.set(0, 0, 0.04);

    const eyeGeo = new THREE.CapsuleGeometry(0.052, 0.1, 8, 16);
    for (const ex of [-0.19, 0.19]) {
      const eye = add(new THREE.Mesh(eyeGeo, m.redDeep), smile);
      eye.position.set(ex, 0.0, -0.24);
      eye.rotation.x = Math.PI / 2;
    }
  }

  /* ── خط‌کشِ DECODE ──────────────────────────────────────────── */

  {
    const strip = new THREE.Group();
    strip.position.set(0.16, -2.52, 0.36);
    strip.rotation.set(0.5, 0.1, -0.95);
    group.add(strip);
    float(strip, 5.0, 0.06, 0.08);

    const slab = add(new THREE.Mesh(new RoundedBoxGeometry(3.3, 0.15, 0.74, 4, 0.09), m.cream), strip);
    const print = decal(decals.strip, 3.2, 0.7, strip);
    print.position.y = 0.077;
    print.rotation.x = -Math.PI / 2;
    slab.add(print);
    print.position.y = 0.077;

    // زبانهٔ سفیدِ جدا — در مرجع هم یک قطعهٔ کوچکِ رهاشده هست
    const tab = add(new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.12, 0.44, 3, 0.09), m.cream), strip);
    tab.position.set(-2.24, -0.34, 0.18);
    tab.rotation.set(0.2, 0.3, 0.16);
  }

  /* ── سیمِ فنری ──────────────────────────────────────────────── */

  {
    const cord = new THREE.Group();
    cord.position.set(1.0, -2.86, 0.1);
    cord.rotation.set(0.22, -0.3, 0.12);
    group.add(cord);
    float(cord, 4.2, 0.05, -0.06);

    const tube = add(
      new THREE.Mesh(new THREE.TubeGeometry(coilCurve(10, 0.36), 300, 0.078, 8, false), m.cream),
      cord,
    );
    tube.scale.set(0.92, 1, 1);
  }

  /* ── موشواره ───────────────────────────────────────────────── */

  {
    const mouse = new THREE.Group();
    mouse.position.set(-0.62, -3.42, 0.6);
    mouse.rotation.set(0.34, 0.5, 0.12);
    group.add(mouse);
    float(mouse, 2.4, 0.06, 0.12);

    const body = add(new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.26, 0.44, 5, 0.13), m.cream), mouse);
    // بالای موشواره کمی گنبدی است
    body.scale.set(1, 1, 1);
  }

  return { group, head, screen, antenna, hands, cross, floaters };
}
