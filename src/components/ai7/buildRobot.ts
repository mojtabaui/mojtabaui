import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * قالبِ ربات AI7 — یک بار نوشته می‌شود و دو بار استفاده: خودِ ربات و
 * رفیقی که کنارش پرواز می‌کند.
 *
 * فرمِ squircle عمدی است: کرهٔ ساده بی‌روح می‌شود و شبیه آدم‌برفی
 * درمی‌آید. جعبهٔ گرد با شعاعِ زیاد همان حسِ «اسباب‌بازیِ پلاستیکیِ
 * قالب‌گیری‌شده» را می‌دهد که این سبک رویش سوار است.
 *
 * چیزی که یک ربات را «پردیتیل» می‌کند، شلوغی نیست — درزها و لبه‌هاست.
 * هر جایی که دو قطعه به هم می‌رسند یک خطِ باریک می‌خواهد، وگرنه کل
 * بدنه یک تودهٔ یکپارچهٔ بی‌مقیاس به‌نظر می‌رسد. اینجا درزِ دورِ
 * بدنه، حلقهٔ آنتن، قابِ ویزور، پیچ‌های گوشه و شیارهای دریچه همه
 * برای همین هستند.
 */

export type RobotMaterials = {
  /** پلاستیکِ سفیدِ بدنه */
  body: THREE.Material;
  /** پلاستیکِ کمی تیره‌تر — درز و قاب */
  trim: THREE.Material;
  /** فلزِ براق — حلقهٔ آنتن، پیچ‌ها */
  metal: THREE.Material;
  /** لاستیکِ مات — کفِ پا و بالشتک‌ها */
  rubber: THREE.Material;
  /** شیشهٔ رویِ صورت */
  visor: THREE.Material;
  /** صفحهٔ زیرِ شیشه */
  screen: THREE.Material;
  /** چشم‌های نورانی */
  eye: THREE.Material;
  /** چراغِ کوچکِ نارنجی */
  core: THREE.Material;
};

export type RobotParts = {
  group: THREE.Group;
  /** خودِ بدنه — برای حرکتِ نفس‌کشیدن */
  shell: THREE.Mesh;
  /** صفحهٔ داخلِ ویزور — همان چیزی که مثل تلویزیون نور می‌دهد */
  screen: THREE.Mesh;
  eyes: THREE.Mesh[];
  antennas: THREE.Group[];
  arms: THREE.Group[];
};

export function buildRobot(m: RobotMaterials): RobotParts {
  const group = new THREE.Group();

  const add = (mesh: THREE.Mesh, parent: THREE.Object3D = group) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  // ── بدنه ───────────────────────────────────────────────────────
  // عرض کمی بیشتر از ارتفاع، و پایین‌تنه پهن‌تر: همان تناسبی که به
  // این شکل حسِ «نشسته و باثبات» می‌دهد نه «معلق».
  const shell = add(new THREE.Mesh(new RoundedBoxGeometry(3.46, 3.22, 2.96, 10, 1.04), m.body));
  shell.position.y = 0.12;

  /**
   * درزِ قالب — نوارِ نازکی که فقط روی وجهِ تختِ پهلو می‌نشیند.
   *
   * تُروس اینجا جواب نمی‌دهد: حلقهٔ گرد روی یک اسکوئرکل از وسطِ
   * پهلوها بیرون می‌زند و از گوشه‌ها تو می‌رود، و همان چیزی است که
   * بدنه را دفرمه نشان می‌دهد.
   */
  for (const s of [-1, 1]) {
    const strip = add(new THREE.Mesh(new RoundedBoxGeometry(0.02, 0.055, 1.5, 2, 0.01), m.trim));
    strip.position.set(s * 1.706, -0.34, 0.06);
    strip.castShadow = false;
  }

  // ── صورت ───────────────────────────────────────────────────────
  // فرورفتگیِ کم‌عمق که ویزور داخلش می‌نشیند. بدون آن، ویزور مثل
  // برچسبی روی بدنه می‌چسبد.
  const socket = add(new THREE.Mesh(new RoundedBoxGeometry(2.5, 2.16, 0.3, 8, 0.66), m.trim));
  socket.position.set(0, 0.42, 1.36);

  const screen = add(new THREE.Mesh(new RoundedBoxGeometry(2.24, 1.9, 0.16, 8, 0.6), m.screen));
  screen.position.set(0, 0.42, 1.44);
  screen.castShadow = false;

  // چشم‌ها — مستطیلِ گردِ ایستاده، کمی جلوتر از صفحه تا از پشتِ شیشه
  // عمق داشته باشند
  const eyeGeo = new RoundedBoxGeometry(0.3, 0.62, 0.06, 5, 0.13);
  const eyes: THREE.Mesh[] = [];
  for (const x of [-0.44, 0.44]) {
    const eye = new THREE.Mesh(eyeGeo, m.eye);
    eye.position.set(x, 0.4, 1.52);
    group.add(eye);
    eyes.push(eye);
  }

  // شیشه — کمی برجسته و کمی شفاف. برجستگی همان چیزی است که نورِ
  // سافت‌باکس را به یک خطِ کشیده تبدیل می‌کند.
  const visor = add(new THREE.Mesh(new RoundedBoxGeometry(2.34, 2.0, 0.44, 10, 0.62), m.visor));
  visor.position.set(0, 0.42, 1.42);
  visor.castShadow = false;

  // ── آنتن‌ها ────────────────────────────────────────────────────
  const antennas: THREE.Group[] = [];
  for (const s of [-1, 1]) {
    const ant = new THREE.Group();

    // پایهٔ گرد که از بدنه بیرون می‌زند
    const base = add(new THREE.Mesh(new THREE.SphereGeometry(0.33, 24, 20), m.body), ant);
    base.scale.set(1, 0.6, 1);

    // حلقهٔ فلزی — مرزِ بینِ پایه و میله
    const ring = add(new THREE.Mesh(new THREE.CylinderGeometry(0.244, 0.244, 0.09, 28), m.metal), ant);
    ring.position.y = 0.22;

    const stem = add(new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.262, 0.34, 32), m.body), ant);
    stem.position.y = 0.42;

    // نوکِ گرد — استوانهٔ بریده سرش تیز به‌نظر می‌رسد
    const dome = add(
      new THREE.Mesh(new THREE.SphereGeometry(0.245, 30, 18, 0, Math.PI * 2, 0, Math.PI / 2), m.body),
      ant,
    );
    dome.position.y = 0.58;

    ant.position.set(s * 0.74, 1.5, -0.04);
    ant.rotation.z = s * -0.13;
    group.add(ant);
    antennas.push(ant);
  }

  // ── بازوها ─────────────────────────────────────────────────────
  // در مرجع، بازو یک دستکشِ کوچکِ پهن است نه توپ. کپسولِ صاف‌شده،
  // با شستِ کوتاه.
  const arms: THREE.Group[] = [];
  for (const s of [-1, 1]) {
    const arm = new THREE.Group();

    // کپسولِ کوتاهِ رو به پایین-بیرون، با انتهای پهن‌تر
    const mitt = add(new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.3, 14, 32), m.body), arm);
    mitt.rotation.set(0.26, 0, s * 0.86);
    mitt.scale.set(1, 1, 0.84);

    arm.position.set(s * 1.6, -0.78, 0.3);
    group.add(arm);
    arms.push(arm);
  }

  // ── دریچه و چراغ ───────────────────────────────────────────────
  const vent = add(new THREE.Mesh(new RoundedBoxGeometry(1.02, 0.3, 0.12, 6, 0.14), m.trim));
  vent.position.set(0, -1.04, 1.4);
  vent.castShadow = false;

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.062, 20, 16), m.core);
  core.position.set(0.74, -1.04, 1.45);
  group.add(core);

  // ── پیچ‌های گوشهٔ صورت ─────────────────────────────────────────
  const screwGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.04, 14);
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      const screw = add(new THREE.Mesh(screwGeo, m.metal));
      screw.rotation.x = Math.PI / 2;
      screw.position.set(sx * 1.08, 0.42 + sy * 0.9, 1.44);
      screw.castShadow = false;
    }
  }

  // ── پاها ───────────────────────────────────────────────────────
  for (const s of [-1, 1]) {
    const foot = add(new THREE.Mesh(new THREE.SphereGeometry(0.46, 28, 22), m.body));
    foot.scale.set(1, 0.56, 1.2);
    foot.position.set(s * 0.74, -1.66, 0.3);

    // کفِ لاستیکی — سطحِ مات زیرِ پا، جایی که با زمین تماس دارد
    const sole = add(new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), m.rubber));
    sole.scale.set(1, 0.34, 1.18);
    sole.position.set(s * 0.74, -1.7, 0.3);
  }

  return { group, shell, screen, eyes, antennas, arms };
}
