import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import {
  sandTexture,
  sandNormal,
  sandRoughness,
  cloudTexture,
  flagTexture,
  boltTexture,
  packTexture,
  skyTexture,
  blobTexture,
  rng,
} from "./textures";

/**
 * دنیای اطرافِ ربات: تپه، آسمان، ابر، پرچم، بوته، سنگ، باتری‌های
 * ریخته و کولهٔ شارژ.
 *
 * همه در یک Group جمع می‌شوند چون با اسکرول باید یکجا محو شوند و
 * فقط خودِ ربات بماند.
 *
 * چیدمان‌ها از یک مولدِ قطعی می‌آیند نه Math.random: صحنه‌ای که هر
 * بار جور دیگری چیده شود، قابلِ تنظیم نیست.
 */

export type World = {
  group: THREE.Group;
  /** ارتفاعِ سطحِ زمین در هر نقطه — برای نشاندنِ چیزها روی آن */
  groundY: (x: number, z: number) => number;
  flag: THREE.Mesh;
  flagBase: THREE.BufferAttribute;
  clouds: THREE.Object3D[];
  materials: THREE.Material[];
  textures: THREE.Texture[];
  geometries: THREE.BufferGeometry[];
};

/**
 * یک تیغهٔ علف: نواری که در فضا خم می‌شود، به‌سمتِ نوک باریک، و در
 * مقطع کمی کاسه‌ای.
 *
 * کپسول و مخروط هیچ‌وقت علف نمی‌شوند چون هر دو مقطعِ ثابت دارند.
 * چیزی که برگ را برگ می‌کند سه چیزِ همزمان است: باریک شدن به‌سمتِ
 * نوک، خمِ ناشی از وزنِ خودش، و گودیِ مقطع که نور را در طولِ برگ
 * می‌شکند.
 */
function bladeGeometry(segments = 7, curl = 0.55, width = 0.075) {
  const pos: number[] = [];
  const nor: number[] = [];
  const idx: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // مسیر: بالا می‌رود و همزمان به بیرون خم می‌شود
    const y = t * (1 - t * 0.18) * 1.12;
    const z = curl * t * t;
    const w = width * (1 - t) ** 0.7;
    const cup = w * 0.55;
    // سه نقطه در مقطع: چپ، وسطِ برجسته، راست
    pos.push(-w, y, z, 0, y, z + cup, w, y, z);
    nor.push(-0.6, 0.2, 0.78, 0, 0.3, 1, 0.6, 0.2, 0.78);
    if (i < segments) {
      const a = i * 3;
      const b = (i + 1) * 3;
      idx.push(a, b, a + 1, a + 1, b, b + 1);
      idx.push(a + 1, b + 1, a + 2, a + 2, b + 1, b + 2);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/**
 * نویزِ ارزشیِ دوبعدی با درون‌یابیِ هموار — پایهٔ ناهمواریِ زمین.
 *
 * جمعِ چند سینوس (که نسخهٔ قبلی بود) الگوی شبکه‌ایِ تکرارشونده
 * می‌سازد و چشم آن را به‌عنوان «کاشی» می‌گیرد. نویزِ شبکه‌ای این
 * مشکل را ندارد.
 */
function makeNoise(seed: number) {
  const P = 256;
  const perm = new Uint8Array(P * 2);
  const rr = rng(seed);
  for (let i = 0; i < P; i++) perm[i] = i;
  for (let i = P - 1; i > 0; i--) {
    const j = Math.floor(rr() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  for (let i = 0; i < P; i++) perm[i + P] = perm[i];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const grad = (h: number, x: number, y: number) => {
    // هشت جهتِ یکنواخت روی دایره
    const a = (h & 7) * (Math.PI / 4);
    return Math.cos(a) * x + Math.sin(a) * y;
  };

  return (x: number, y: number) => {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[perm[xi] + yi];
    const ab = perm[perm[xi] + yi + 1];
    const ba = perm[perm[xi + 1] + yi];
    const bb = perm[perm[xi + 1] + yi + 1];
    const x1 = grad(aa, xf, yf) + u * (grad(ba, xf - 1, yf) - grad(aa, xf, yf));
    const x2 = grad(ab, xf, yf - 1) + u * (grad(bb, xf - 1, yf - 1) - grad(ab, xf, yf - 1));
    return x1 + v * (x2 - x1);
  };
}

const noise = makeNoise(2029);

/**
 * ناهمواریِ سطح در نقطهٔ (x,z) — چهار اکتاو، از موجِ نرم تا دانه.
 *
 * دامنه با فاصله از ربات زیاد می‌شود. دلیلش تجربی است: ناهمواریِ
 * یکنواخت یا آن‌قدر کم است که دوردست تخت و بی‌جان می‌شود، یا آن‌قدر
 * زیاد که دورِ خودِ ربات تپه‌های هم‌قدِ او سبز می‌شوند — و آن‌وقت
 * ربات نه روی زمین، که پشتِ یک برجستگی معلق به‌نظر می‌رسد.
 */
function relief(x: number, z: number) {
  const base =
    noise(x * 0.055, z * 0.055) * 0.62 +
    noise(x * 0.14, z * 0.14) * 0.22 +
    noise(x * 0.42, z * 0.42) * 0.07 +
    noise(x * 1.1, z * 1.1) * 0.022;
  // نزدیکِ ربات آرام، دوردست پرتپه
  const far = Math.min(1, (x * x + z * z) / 420);
  return base * (0.22 + 1.5 * far);
}

/**
 * انحنای سیاره — زمین باید در دوردست پایین برود تا خطِ افق قوس
 * بگیرد. سهمی به‌جای کره: همان قوس را می‌دهد بدون قطب و بدون درزِ
 * UV، و مختصاتِ بافت روی کلِ سطح یکنواخت می‌ماند.
 */
const CURVE = 1 / 34;
const groundHeight = (x: number, z: number) => {
  const d2 = x * x + z * z;
  // گودیِ ملایم دورِ مبدأ، با یک لبهٔ کمی برآمده
  const dip = Math.exp(-d2 / 9) * 0.22 - Math.exp(-((Math.sqrt(d2) - 3.4) ** 2) / 3) * 0.12;
  return -d2 * CURVE + relief(x, z) - dip - 1.72;
};

export function buildWorld(): World {
  const group = new THREE.Group();
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const M = <T extends THREE.Material>(m: T) => (materials.push(m), m);
  const T = <T extends THREE.Texture>(t: T) => (textures.push(t), t);
  const G = <T extends THREE.BufferGeometry>(g: T) => (geometries.push(g), g);

  const r = rng(1337);

  // ── زمین ───────────────────────────────────────────────────────
  const sandTex = T(sandTexture());
  const sandNrm = T(sandNormal());
  const sandRgh = T(sandRoughness());

  /**
   * صفحهٔ افقیِ متراکم به‌جای کره.
   *
   * کره دو مشکلِ حل‌نشدنی داشت: UV در قطب جمع می‌شد و بافت را شعاعی
   * می‌کشید، و نگاشتِ تختِ جایگزین دقیقاً بالای سر تا می‌خورد و آن
   * خطِ عمودیِ وسطِ تصویر را می‌ساخت. صفحه هیچ‌کدام را ندارد: UV
   * یکنواخت، بدون قطب، بدون درز.
   */
  const SPAN = 150;
  const SEG = 320;
  const groundGeo = G(new THREE.PlaneGeometry(SPAN, SPAN, SEG, SEG));
  groundGeo.rotateX(-Math.PI / 2);

  {
    const pos = groundGeo.attributes.position;
    const uv = groundGeo.attributes.uv;
    // رنگِ رأس: تنوعِ بزرگ‌مقیاسی که تکرارِ کاشی را پنهان می‌کند.
    // بدون آن، هر بافتِ کاشی‌شده‌ای از فاصله الگوی شطرنجی نشان می‌دهد.
    const col = new Float32Array(pos.count * 3);
    const warm = new THREE.Color("#ffcf9e");
    const cool = new THREE.Color("#a35f2e");
    const mid = new THREE.Color("#ffffff");
    const c = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, groundHeight(x, z));

      // بافتِ ریز روی مختصاتِ جهانی می‌نشیند، نه روی UVِ صفحه —
      // این‌طور اندازهٔ دانه در همه‌جا یکسان است.
      uv.setXY(i, x * 0.16, z * 0.16);

      const blotch = noise(x * 0.031 + 40, z * 0.031 - 25);
      c.copy(mid)
        .lerp(warm, Math.max(0, blotch) * 0.55)
        .lerp(cool, Math.max(0, -blotch) * 0.5);
      // دورترها کمی تیره‌تر، تا عمق حس شود
      const dim = 1 - Math.min(0.34, (x * x + z * z) / 5200);
      col[i * 3] = c.r * dim;
      col[i * 3 + 1] = c.g * dim;
      col[i * 3 + 2] = c.b * dim;
    }
    pos.needsUpdate = true;
    uv.needsUpdate = true;
    groundGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    groundGeo.computeVertexNormals();
  }

  const ground = new THREE.Mesh(
    groundGeo,
    M(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffffff"),
        vertexColors: true,
        map: sandTex,
        normalMap: sandNrm,
        normalScale: new THREE.Vector2(1.15, 1.15),
        roughnessMap: sandRgh,
        roughness: 1,
        metalness: 0,
        envMapIntensity: 0.5,
      }),
    ),
  );
  ground.receiveShadow = true;
  group.add(ground);

  /** ارتفاعِ سطح — تا چیزها روی زمین بنشینند نه در هوا */
  const groundY = (x: number, z: number) => groundHeight(x, z);

  /** نرمالِ سطح در یک نقطه، از تفاضلِ همسایه‌ها */
  const groundNormal = (x: number, z: number) => {
    const d = 0.4;
    return new THREE.Vector3(
      groundHeight(x - d, z) - groundHeight(x + d, z),
      2 * d,
      groundHeight(x, z - d) - groundHeight(x, z + d),
    ).normalize();
  };

  // ── بوته و گل ──────────────────────────────────────────────────
  // سه سبزِ نزدیک به هم، نه سه سبزِ متفاوت: تنوعِ رنگ در طبیعت
  // باریک است، و همان باریکی است که دسته‌ای برگ را یکپارچه نشان
  // می‌دهد به‌جای «چند شیءِ رنگی کنارِ هم».
  const leafMats = [
    M(new THREE.MeshStandardMaterial({ color: new THREE.Color("#4e7a35"), roughness: 0.8, metalness: 0, side: THREE.DoubleSide, envMapIntensity: 0.35 })),
    M(new THREE.MeshStandardMaterial({ color: new THREE.Color("#3a5f2a"), roughness: 0.84, metalness: 0, side: THREE.DoubleSide, envMapIntensity: 0.28 })),
    M(new THREE.MeshStandardMaterial({ color: new THREE.Color("#62914a"), roughness: 0.76, metalness: 0, side: THREE.DoubleSide, envMapIntensity: 0.4 })),
  ];
  // سه بلندیِ متفاوتِ تیغه، تا دسته یکنواخت نباشد
  const bladeGeos = [
    G(bladeGeometry(7, 0.5, 0.078)),
    G(bladeGeometry(7, 0.72, 0.062)),
    G(bladeGeometry(6, 0.34, 0.09)),
  ];

  const petalGeo = G(new THREE.SphereGeometry(0.05, 10, 8));
  const flowerMats = [
    M(new THREE.MeshStandardMaterial({ color: new THREE.Color("#f6e9c8"), roughness: 0.66 })),
    M(new THREE.MeshStandardMaterial({ color: new THREE.Color("#f0a5b8"), roughness: 0.66 })),
  ];

  /**
   * یک دسته علف. تیغه‌ها از یک نقطه بیرون می‌آیند و هر کدام به
   * سمتی خم می‌شوند؛ همین شعاعی‌بودن است که دسته را «رُسته» نشان
   * می‌دهد نه «کاشته‌شده».
   */
  const tuft = (x: number, z: number, scale: number, flowered = false) => {
    const g = new THREE.Group();
    const blades = 6 + Math.floor(r() * 5);
    for (let i = 0; i < blades; i++) {
      const a = (i / blades) * Math.PI * 2 + r() * 0.9;
      const leaf = new THREE.Mesh(bladeGeos[i % 3], leafMats[i % 3]);
      leaf.rotation.y = a;
      leaf.rotation.x = (r() - 0.5) * 0.3;
      leaf.scale.set(0.85 + r() * 0.4, 0.7 + r() * 0.6, 0.85 + r() * 0.4);
      leaf.castShadow = true;
      g.add(leaf);
    }
    if (flowered) {
      for (let i = 0; i < 3; i++) {
        const bud = new THREE.Mesh(petalGeo, flowerMats[i % 2]);
        const a = r() * 6.28;
        bud.position.set(Math.cos(a) * 0.22, 0.8 + r() * 0.24, Math.sin(a) * 0.22);
        bud.castShadow = true;
        g.add(bud);
      }
    }
    // نشستن روی سطحِ تپه: محور باید در راستای شعاعِ کره باشد،
    // وگرنه گیاه‌های دور از مرکز کج روی شیب می‌ایستند.
    const y = groundY(x, z);
    g.position.set(x, y, z);
    g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), groundNormal(x, z));
    g.scale.setScalar(scale);
    group.add(g);
  };

  // ── سنگ‌ها ─────────────────────────────────────────────────────
  const rockMat = M(
    new THREE.MeshStandardMaterial({
      color: new THREE.Color("#a9673a"),
      map: sandTex,
      normalMap: sandNrm,
      normalScale: new THREE.Vector2(0.8, 0.8),
      roughness: 0.94,
      metalness: 0,
    }),
  );

  /** سنگِ ساییده: کره‌ای که رئوسش کمی به‌هم ریخته. چندوجهی، سنگ نمی‌شود. */
  const rockGeo = (() => {
    const g = G(new THREE.SphereGeometry(0.14, 18, 14));
    const pos = g.attributes.position;
    const v = new THREE.Vector3();
    const rr = rng(99);
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      v.multiplyScalar(0.86 + rr() * 0.28);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  })();

  const rock = (x: number, z: number, s: number) => {
    const m = new THREE.Mesh(rockGeo, rockMat);
    m.position.set(x, groundY(x, z) + s * 0.05, z);
    m.scale.set(s, s * (0.55 + r() * 0.4), s * (0.8 + r() * 0.4));
    m.rotation.set(r() * 6, r() * 6, r() * 6);
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);
  };

  // دسته‌های علف: نزدیک‌ترها بزرگ‌تر، دورترها ریزتر — همین شیبِ
  // اندازه است که عمق می‌سازد.
  // جوانه‌های ریز، پخش‌شده تا عمق. اندازه در مرجع حدودِ یک‌دهمِ
  // قدِ ربات است؛ هرچه بزرگ‌تر، صحنه بیشتر شبیه چمنِ حیاط می‌شود
  // تا خاکِ بایر.
  ([
    [-2.6, 3.6, 0.4, 1], [-4.0, 2.8, 0.34, 0], [-3.2, 4.4, 0.3, 0],
    [2.8, 3.4, 0.38, 1], [4.1, 2.5, 0.32, 0], [2.0, 4.3, 0.28, 0],
    [-5.8, 1.6, 0.3, 0], [6.1, 1.3, 0.3, 1], [-1.0, 5.0, 0.26, 0],
    [1.2, 5.3, 0.24, 0], [-7.2, 2.4, 0.27, 0], [7.3, 2.2, 0.26, 0],
    [-4.8, 3.8, 0.28, 1], [4.6, 4.0, 0.26, 0], [0.0, 5.8, 0.22, 0],
    [-8.4, 1.0, 0.24, 0], [8.5, 0.8, 0.23, 0], [-6.4, 4.6, 0.24, 0],
    [6.6, 4.4, 0.22, 1], [-2.0, 6.4, 0.2, 0], [2.2, 6.6, 0.2, 0],
    [-10.2, 2.6, 0.22, 0], [10.4, 2.4, 0.21, 0], [-3.8, 7.2, 0.18, 0],
    [3.6, 7.4, 0.18, 0], [-9.0, 5.0, 0.2, 0], [9.2, 4.8, 0.19, 0],
    [-1.6, 8.4, 0.16, 0], [1.8, 8.6, 0.16, 0], [-5.4, 6.0, 0.2, 1],
    [5.6, 6.2, 0.19, 0], [-12.0, 1.2, 0.2, 0], [12.2, 1.0, 0.19, 0],
  ] as const).forEach(([x, z, sc, f]) => tuft(x, z, sc, !!f));

  ([
    [-3.1, 2.9, 0.62], [4.5, 2.5, 0.5], [-4.9, 1.5, 0.4],
    [1.7, 4.2, 0.55], [-1.6, 3.9, 0.34], [3.1, 1.1, 0.3],
    [-5.9, 2.3, 0.46], [5.9, 1.7, 0.38], [0.4, 4.9, 0.3],
    [-2.2, 1.4, 0.24], [2.6, 0.4, 0.26], [7.1, 0.9, 0.42],
    [-7.4, 1.1, 0.37], [-0.8, 5.4, 0.28], [-9.2, 2.0, 0.4],
    [9.4, 1.8, 0.36], [-6.2, 5.2, 0.3], [6.4, 5.4, 0.28],
    [-1.2, 7.0, 0.24], [1.4, 7.2, 0.22], [-11.0, 3.2, 0.34],
    [11.2, 3.0, 0.32], [-4.4, 6.6, 0.26], [4.6, 6.8, 0.25],
    [0.8, 2.2, 0.2], [-0.6, 3.2, 0.18], [8.0, 6.0, 0.3],
    [-8.2, 6.2, 0.28],
  ] as const).forEach(([x, z, s]) => rock(x, z, s));

  // ── باتری‌های ریخته ────────────────────────────────────────────
  // در مرجع، چند باتریِ کوچک روی خاک افتاده‌اند. همین یک جزئیاتِ
  // روایی است که صحنه را از «ربات روی تپه» به «ربات وسطِ ماجرا»
  // می‌برد.
  const cellBody = G(new THREE.CylinderGeometry(0.085, 0.085, 0.34, 20));
  const cellCap = G(new THREE.CylinderGeometry(0.048, 0.048, 0.05, 16));
  const cellMat = M(
    new THREE.MeshStandardMaterial({ color: new THREE.Color("#f1ede4"), roughness: 0.42, metalness: 0.05 }),
  );
  const capMat = M(
    new THREE.MeshStandardMaterial({ color: new THREE.Color("#c9c2b4"), roughness: 0.3, metalness: 0.7 }),
  );
  ([
    [-1.5, 2.6, 0.9], [0.9, 3.1, 2.3], [2.0, 2.2, 0.2],
    [-2.9, 1.8, 1.6], [1.4, 1.2, 2.9], [-0.4, 3.6, 0.6],
  ] as const).forEach(([x, z, rot]) => {
    const g = new THREE.Group();
    const b = new THREE.Mesh(cellBody, cellMat);
    b.castShadow = true;
    b.receiveShadow = true;
    g.add(b);
    const c = new THREE.Mesh(cellCap, capMat);
    c.position.y = 0.19;
    c.castShadow = true;
    g.add(c);
    g.rotation.set(Math.PI / 2, 0, rot);
    g.position.set(x, groundY(x, z) + 0.085, z);
    group.add(g);
  });

  // ── کولهٔ شارژ ─────────────────────────────────────────────────
  // در مرجع کنارِ ربات یک باتریِ همراه ایستاده. جعبهٔ سفیدِ ساده
  // شبیه مکعبِ تستِ رندر می‌شود؛ آنچه آن را «دستگاه» می‌کند لبهٔ
  // گرد، خطوطِ قالب، پیچ، دستگیره و چراغِ وضعیت است.
  const pack = new THREE.Group();
  const packTex = T(packTexture());
  const packMat = M(
    new THREE.MeshPhysicalMaterial({
      map: packTex,
      color: new THREE.Color("#ffffff"),
      roughness: 0.42,
      metalness: 0,
      clearcoat: 0.7,
      clearcoatRoughness: 0.22,
      envMapIntensity: 1,
    }),
  );
  const shellMat = M(
    new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f2eee6"),
      roughness: 0.4,
      metalness: 0,
      clearcoat: 0.7,
      clearcoatRoughness: 0.22,
      envMapIntensity: 1,
    }),
  );

  const box = new THREE.Mesh(G(new RoundedBoxGeometry(1.54, 1.5, 1.02, 6, 0.14)), packMat);
  box.castShadow = true;
  box.receiveShadow = true;
  pack.add(box);

  // پنلِ نارنجیِ صاعقه، در یک قابِ فرورفته
  const bezel = new THREE.Mesh(G(new RoundedBoxGeometry(0.94, 0.94, 0.08, 4, 0.09)), shellMat);
  bezel.position.set(0, 0.04, 0.5);
  bezel.castShadow = false;
  pack.add(bezel);
  const panel = new THREE.Mesh(
    G(new RoundedBoxGeometry(0.8, 0.8, 0.05, 4, 0.07)),
    M(
      new THREE.MeshStandardMaterial({
        map: T(boltTexture()),
        roughness: 0.34,
        metalness: 0.1,
        envMapIntensity: 1.1,
      }),
    ),
  );
  panel.position.set(0, 0.04, 0.54);
  panel.castShadow = false;
  pack.add(panel);

  // نوارِ لاستیکیِ دورِ بدنه — همان چیزی که به دستگاه حسِ «ضدضربه» می‌دهد
  const bumper = new THREE.Mesh(
    G(new RoundedBoxGeometry(1.58, 0.16, 1.06, 4, 0.07)),
    M(new THREE.MeshStandardMaterial({ color: new THREE.Color("#5f6169"), roughness: 0.86, metalness: 0 })),
  );
  bumper.position.y = -0.62;
  bumper.castShadow = true;
  pack.add(bumper);

  // چراغ‌های وضعیتِ شارژ
  const ledOn = M(
    new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1d2410"),
      emissive: new THREE.Color("#8ff05a"),
      emissiveIntensity: 2.4,
      roughness: 0.3,
    }),
  );
  const ledOff = M(
    new THREE.MeshStandardMaterial({ color: new THREE.Color("#3b3e44"), roughness: 0.5, metalness: 0.3 }),
  );
  const ledGeo = G(new THREE.CapsuleGeometry(0.028, 0.1, 6, 12));
  [0, 1, 2, 3].forEach((i) => {
    const led = new THREE.Mesh(ledGeo, i < 3 ? ledOn : ledOff);
    led.rotation.z = Math.PI / 2;
    led.position.set(-0.44 + i * 0.29, 0.62, 0.5);
    pack.add(led);
  });

  // دستگیرهٔ بالا، با دو پایهٔ فلزی
  const handle = new THREE.Mesh(G(new THREE.TorusGeometry(0.3, 0.052, 12, 32, Math.PI)), shellMat);
  handle.position.set(0, 0.76, 0);
  handle.castShadow = true;
  pack.add(handle);
  for (const s2 of [-1, 1]) {
    const mount = new THREE.Mesh(G(new THREE.CylinderGeometry(0.06, 0.07, 0.12, 16)), capMat);
    mount.position.set(s2 * 0.3, 0.74, 0);
    pack.add(mount);
  }

  // آنتنِ باریکِ کنارِ کوله
  const whip = new THREE.Mesh(
    G(new THREE.CylinderGeometry(0.018, 0.026, 1.5, 10)),
    M(new THREE.MeshStandardMaterial({ color: new THREE.Color("#c8c2b5"), roughness: 0.3, metalness: 0.7, envMapIntensity: 1.2 })),
  );
  whip.position.set(0.62, 1.42, -0.3);
  whip.rotation.z = -0.16;
  whip.castShadow = true;
  pack.add(whip);
  const tip = new THREE.Mesh(G(new THREE.SphereGeometry(0.05, 16, 12)), capMat);
  tip.position.set(0.74, 2.16, -0.3);
  pack.add(tip);

  pack.position.set(3.6, groundY(3.6, 1.3) + 0.72, 1.3);
  pack.rotation.y = -0.4;
  group.add(pack);

  // ── پرچم ───────────────────────────────────────────────────────
  const poleMat = M(
    new THREE.MeshStandardMaterial({
      color: new THREE.Color("#e8e2d4"),
      roughness: 0.32,
      metalness: 0.45,
      envMapIntensity: 1,
    }),
  );
  const pole = new THREE.Mesh(G(new THREE.CylinderGeometry(0.05, 0.058, 3.9, 20)), poleMat);
  pole.position.set(-4.7, groundY(-4.7, 1.2) + 1.7, 1.2);
  pole.castShadow = true;
  group.add(pole);
  const knob = new THREE.Mesh(G(new THREE.SphereGeometry(0.08, 16, 12)), poleMat);
  knob.position.set(-4.7, pole.position.y + 2.0, 1.2);
  group.add(knob);

  const flagGeo = G(new THREE.PlaneGeometry(1.7, 1.12, 28, 3));
  const flag = new THREE.Mesh(
    flagGeo,
    M(
      new THREE.MeshStandardMaterial({
        map: T(flagTexture()),
        roughness: 0.74,
        metalness: 0,
        side: THREE.DoubleSide,
      }),
    ),
  );
  flag.position.set(-3.83, pole.position.y + 1.28, 1.2);
  flag.castShadow = true;
  group.add(flag);
  const flagBase = flagGeo.attributes.position.clone() as THREE.BufferAttribute;

  // ── آسمان ──────────────────────────────────────────────────────
  const sky = new THREE.Mesh(
    G(new THREE.SphereGeometry(140, 48, 32)),
    M(new THREE.MeshBasicMaterial({ map: T(skyTexture()), side: THREE.BackSide, fog: false })),
  );
  sky.renderOrder = -10;
  group.add(sky);

  // ── ابرها ──────────────────────────────────────────────────────
  // سه بافتِ متفاوت، تا ابرها کپیِ هم به‌نظر نرسند.
  const clouds: THREE.Object3D[] = [];
  const cloudMats = [3, 11, 29].map((seed) =>
    M(
      new THREE.SpriteMaterial({
        map: T(cloudTexture(seed)),
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        fog: false,
      }),
    ),
  );
  ([
    [-19, 7.5, -30, 13], [15, 10, -34, 16], [-31, 5.5, -30, 11],
    [27, 8, -38, 15], [2, 13.5, -44, 20], [-9, 4.6, -26, 9],
    [37, 12, -46, 18], [-42, 10, -40, 15], [10, 3.6, -24, 8],
    [-6, 16, -52, 22], [22, 17, -56, 19],
  ] as const).forEach(([x, y, z, s], i) => {
    const sp = new THREE.Sprite(cloudMats[i % 3]);
    sp.position.set(x, y, z);
    sp.scale.set(s, s * 0.5, 1);
    group.add(sp);
    clouds.push(sp);
  });

  // بوکهٔ نرم — دایره‌های محوِ نزدیک‌تر که عمقِ جلوی ابرها را می‌سازند
  const bokehMat = M(
    new THREE.SpriteMaterial({
      map: T(blobTexture("rgba(255,255,255,")),
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      fog: false,
    }),
  );
  ([
    [-13, 6.4, -26, 6], [10, 8.2, -28, 7.5], [-19, 3.6, -24, 5],
    [17, 5.4, -27, 6.5], [4, 10, -30, 8], [-8, 12, -32, 5.5],
  ] as const).forEach(([x, y, z, s]) => {
    const sp = new THREE.Sprite(bokehMat);
    sp.position.set(x, y, z);
    sp.scale.setScalar(s);
    group.add(sp);
    clouds.push(sp);
  });

  return { group, groundY, flag, flagBase, clouds, materials, textures, geometries };
}
