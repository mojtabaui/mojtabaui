import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { stacheGeometry, type BotMaterials, type BotParts } from "./melinaBot";

/**
 * نیم‌تنهٔ ملینا — همان هویت، این‌بار انسان‌وار.
 *
 * نسخهٔ «دستگاه» یک جعبه است که صورت دارد. این یکی برعکس: یک سر و
 * گردن و شانه، که اتفاقاً از جنسِ ماشین است. کادر عمداً زیرِ سینه
 * بریده می‌شود، مثل تندیسِ نیم‌تنه — و همین بریدگی است که وادارت
 * می‌کند به صورت نگاه کنی.
 *
 * چهار چیز آن را از فرمِ کارتونی دور می‌کند:
 *
 *   تناسبِ انسانی — پهنای سر حدودِ ۰٫۸ ارتفاعش است، نه مساوی. سرِ
 *   مربع همیشه عروسکی می‌خواند.
 *
 *   فک — سر به‌سمتِ پایین باریک می‌شود و پسِ‌سر بیرون‌تر می‌زند.
 *   جمجمهٔ آدم از پهنایش عمیق‌تر است؛ جعبهٔ متقارن نیست.
 *
 *   چشمِ نواری پشتِ شیشه — مردمکِ گردِ درشت مستقیم به کارتون می‌رود.
 *   نوارِ باریکِ نورانی، «دستگاهی که می‌بیند» می‌سازد.
 *
 *   جزئیاتِ ریزِ فراوان — درزِ فک، ماژولِ گوش، مهره‌های گردن، پیچ.
 *   شخصیتِ کارتونی از سادگیِ فرم می‌آید؛ تراکمِ جزئیات، خودبه‌خود
 *   آن را به سمتِ «ساخته‌شده» می‌برد.
 *
 * سیبیلِ برند سرِ جایش می‌ماند — روی لبِ بالا، جایی که سیبیل باید
 * باشد. این تنها جای صورت است که نباید هیچ توضیحی بخواهد.
 */

export function buildMelinaBust(m: BotMaterials): BotParts {
  const group = new THREE.Group();

  const add = (mesh: THREE.Mesh, parent: THREE.Object3D = group) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // ── سر ─────────────────────────────────────────────────────────
  const head = new THREE.Group();
  head.position.y = 1.5;
  group.add(head);

  const shell = add(new THREE.Mesh(new RoundedBoxGeometry(1.92, 2.34, 2.02, 12, 0.5), m.body), head);

  /**
   * شکل‌دادنِ جمجمه روی رئوس.
   *
   * scale کلِ فرم را می‌کِشد و لبه‌های گرد را بیضی می‌کند؛ جابه‌جاییِ
   * خودِ رئوس این مشکل را ندارد و اجازه می‌دهد هر ناحیه جدا تنظیم
   * شود — که برای فرمِ سر لازم است، چون فک، تارک و پسِ‌سر هیچ‌کدام
   * مثلِ هم رفتار نمی‌کنند.
   */
  {
    const pos = shell.geometry.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);

      // فک — از وسط به پایین باریک می‌شود
      const jaw = THREE.MathUtils.smoothstep(v.y, 0.15, -1.17);
      v.x *= 1 - jaw * 0.3;
      v.z *= 1 - jaw * 0.2;

      // تارک — بالای سر کمی جمع می‌شود
      const crown = THREE.MathUtils.smoothstep(v.y, 0.55, 1.17);
      v.x *= 1 - crown * 0.14;
      v.z *= 1 - crown * 0.12;

      // پسِ‌سر — جمجمه از پهنایش عمیق‌تر است
      if (v.z < 0) v.z *= 1.12;

      pos.setXYZ(i, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
    shell.geometry.computeVertexNormals();
  }

  // درزِ تارک — خطِ باریکی که از پیشانی تا پسِ‌سر می‌رود
  const crest = add(new THREE.Mesh(new RoundedBoxGeometry(0.05, 0.05, 1.9, 2, 0.022), m.trim), head);
  crest.position.set(0, 1.06, -0.1);
  crest.castShadow = false;

  // ── صورت ───────────────────────────────────────────────────────
  // شیارِ فرورفته‌ای که شیشه داخلش می‌نشیند
  const socket = add(new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.72, 0.22, 6, 0.24), m.trim), head);
  socket.position.set(0, 0.3, 0.9);

  const screen = add(new THREE.Mesh(new RoundedBoxGeometry(1.46, 0.58, 0.12, 6, 0.2), m.screen), head);
  screen.position.set(0, 0.3, 0.96);
  screen.castShadow = false;

  // چشم — دو نوارِ باریکِ افقی. باریک بودنشان عمدی است.
  const eyeGeo = new RoundedBoxGeometry(0.34, 0.1, 0.05, 4, 0.045);
  const eyes: THREE.Mesh[] = [];
  for (const x of [-0.31, 0.31]) {
    const eye = new THREE.Mesh(eyeGeo, m.eye);
    eye.position.set(x, 0.3, 1.0);
    head.add(eye);
    eyes.push(eye);
  }

  // شیشهٔ روی چشم‌ها
  const visor = add(new THREE.Mesh(new RoundedBoxGeometry(1.54, 0.66, 0.26, 8, 0.22), m.visor), head);
  visor.position.set(0, 0.3, 0.98);
  visor.castShadow = false;

  // ابرو — لبهٔ باریکِ بالای شیشه، که به صورت حالت می‌دهد
  const brow = add(new THREE.Mesh(new RoundedBoxGeometry(1.66, 0.09, 0.24, 4, 0.04), m.trim), head);
  brow.position.set(0, 0.73, 0.9);
  brow.castShadow = false;

  // ── سیبیل ──────────────────────────────────────────────────────
  // روی لبِ بالا، جایی که سیبیل باید باشد
  const stache = new THREE.Mesh(stacheGeometry(0.62), m.stache);
  stache.castShadow = true;
  stache.position.set(0, -0.22, 0.93);
  head.add(stache);

  // درزِ فک — مرزِ فکِ متحرک، حتی اگر واقعاً تکان نخورد
  const jawSeam = add(new THREE.Mesh(new RoundedBoxGeometry(1.2, 0.032, 0.5, 2, 0.014), m.trim), head);
  jawSeam.position.set(0, -0.62, 0.72);
  jawSeam.castShadow = false;

  // دهانه — شیارِ باریکِ زیرِ سیبیل
  const mouth = add(new THREE.Mesh(new RoundedBoxGeometry(0.56, 0.06, 0.05, 3, 0.026), m.glow), head);
  mouth.position.set(0, -0.5, 0.86);
  mouth.castShadow = false;

  // ── گوش‌ها ─────────────────────────────────────────────────────
  // ماژولِ استوانه‌ایِ دوطرف، با حلقهٔ فلزی و یک نقطهٔ بنفش
  for (const s of [-1, 1]) {
    const pod = add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.2, 28), m.body), head);
    pod.rotation.z = Math.PI / 2;
    pod.position.set(s * 0.86, 0.14, -0.02);

    const ring = add(new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.028, 10, 32), m.metal), head);
    ring.rotation.y = Math.PI / 2;
    ring.position.set(s * 0.96, 0.14, -0.02);
    ring.castShadow = false;

    const dot = add(new THREE.Mesh(new THREE.SphereGeometry(0.055, 18, 14), m.glow), head);
    dot.position.set(s * 0.99, 0.14, -0.02);
    dot.castShadow = false;
  }

  // ── آنتنِ کوتاهِ پشتِ گوش ───────────────────────────────────────
  const antenna = new THREE.Group();
  {
    const boss = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.1, 20), m.trim);
    boss.castShadow = true;
    antenna.add(boss);

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.038, 0.78, 14), m.body);
    stem.position.y = 0.44;
    stem.castShadow = true;
    antenna.add(stem);

    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 16), m.glow);
    bead.position.y = 0.87;
    antenna.add(bead);
  }
  antenna.position.set(0.6, 0.86, -0.62);
  antenna.rotation.set(-0.24, 0, -0.3);
  head.add(antenna);

  // ── گردن ───────────────────────────────────────────────────────
  // سه مهره با فاصلهٔ کم — مفصلی که واقعاً می‌چرخد، نه یک لوله
  const neck = add(new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.62, 28), m.trim));
  neck.position.y = 0.5;

  for (let i = 0; i < 3; i++) {
    const vert = add(new THREE.Mesh(new THREE.TorusGeometry(0.44 + i * 0.02, 0.036, 10, 40), m.metal));
    vert.rotation.x = Math.PI / 2;
    vert.position.y = 0.7 - i * 0.19;
    vert.castShadow = false;
  }

  const neckGlow = add(new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.02, 8, 48), m.glow));
  neckGlow.rotation.x = Math.PI / 2;
  neckGlow.position.y = 0.29;
  neckGlow.castShadow = false;

  // ── شانه و سینه ────────────────────────────────────────────────
  const chest = add(new THREE.Mesh(new RoundedBoxGeometry(2.9, 1.34, 1.66, 8, 0.42), m.body));
  chest.position.y = -0.5;

  // شیبِ شانه — بالای سینه به‌سمتِ گردن پایین می‌آید
  {
    const pos = chest.geometry.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const up = THREE.MathUtils.smoothstep(v.y, 0.1, 0.67);
      // هرچه بالاتر، باریک‌تر — و لبه‌ها پایین‌تر می‌افتند
      const away = Math.min(1, Math.abs(v.x) / 1.45);
      pos.setXYZ(i, v.x, v.y - up * away * away * 0.34, v.z * (1 - up * 0.1));
    }
    pos.needsUpdate = true;
    chest.geometry.computeVertexNormals();
  }

  // کلاهکِ شانه — قطعهٔ جدا روی هر شانه، با درزِ مشخص
  for (const s of [-1, 1]) {
    const cap = add(new THREE.Mesh(new THREE.SphereGeometry(0.56, 30, 24), m.trim));
    cap.scale.set(1, 0.72, 0.92);
    cap.position.set(s * 1.28, -0.34, 0.02);

    const capRing = add(new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.024, 8, 36), m.metal));
    capRing.rotation.y = Math.PI / 2;
    capRing.position.set(s * 1.44, -0.34, 0.02);
    capRing.castShadow = false;
  }

  // صفحهٔ سینه — قابِ فرورفته با نوارِ وضعیت
  const plate = add(new THREE.Mesh(new RoundedBoxGeometry(1.24, 0.62, 0.1, 5, 0.16), m.trim));
  plate.position.set(0, -0.62, 0.84);
  plate.castShadow = false;

  const strip = add(new THREE.Mesh(new RoundedBoxGeometry(0.86, 0.055, 0.05, 4, 0.024), m.glow));
  strip.position.set(0, -0.5, 0.9);
  strip.castShadow = false;

  for (let i = 0; i < 4; i++) {
    const led = add(new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.04, 12), m.metal));
    led.rotation.x = Math.PI / 2;
    led.position.set(-0.33 + i * 0.22, -0.74, 0.9);
    led.castShadow = false;
  }

  // ── پایهٔ نیم‌تنه ───────────────────────────────────────────────
  // بریدگی باید عمدی به‌نظر برسد، وگرنه «کادر بد گرفته شده» خوانده
  // می‌شود. یک قاعدهٔ کوتاه، همان کاری را می‌کند که پایهٔ تندیس.
  const cut = add(new THREE.Mesh(new THREE.CylinderGeometry(1.12, 1.2, 0.22, 40), m.trim));
  cut.position.y = -1.24;

  const foot = add(new THREE.Mesh(new THREE.CylinderGeometry(1.26, 1.34, 0.16, 40), m.rubber));
  foot.position.y = -1.4;

  const footGlow = add(new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.018, 8, 56), m.glow));
  footGlow.rotation.x = Math.PI / 2;
  footGlow.position.y = -1.32;
  footGlow.castShadow = false;

  return { group, shell, screen, eyes, stache, antenna, arms: [head] };
}
