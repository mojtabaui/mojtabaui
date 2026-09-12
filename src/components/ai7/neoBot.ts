import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * پیکرهٔ مشکیِ هیرو — انسان‌وار، ایستاده، رو به دوربین.
 *
 * با `melinaBot` و `decodeBot` هم‌خانواده نیست و عمداً از صفر نوشته
 * شده. آن دو یک *شخصیت*اند: رنگ دارند، صورت دارند، سیبیلِ برند
 * دارند و کارشان دوست‌داشتنی بودن است. این یکی برعکس — یک جسمِ
 * مشکیِ بی‌بیان که فقط باید **سیلوئت** و **بازتاب** داشته باشد،
 * چون قرار است جلوی یک تیترِ غول‌پیکر بایستد و آن را نصفه کند.
 *
 * سه قاعده که کلِ فرم رویشان سوار است:
 *
 *   هیچ جزئیاتی که سیلوئت را نشکند. روی مشکیِ روی مشکی، جزئیاتِ
 *   داخلیِ سطح اصلاً دیده نمی‌شود؛ تنها چیزی که خوانده می‌شود خطِ
 *   دورِ جسم است و باریکهٔ نوری که از لبه‌اش می‌لغزد. پس بودجه به
 *   جای درز و پیچ، خرجِ *فرمِ* شانه و کمر و فک شده.
 *
 *   کپسول، نه استوانه. لبهٔ تیزِ استوانه در نورِ لبه‌ای یک خطِ
 *   شکسته می‌سازد. کپسول همه‌جا انحنا دارد، پس نور رویش یک‌نواخت
 *   می‌لغزد — همان چیزی که به فرم حسِ «قطعهٔ ساخته‌شده» می‌دهد.
 *
 *   تقارنِ کامل. صحنه از روبه‌رو دیده می‌شود و کوچک‌ترین عدمِ تقارن
 *   در یک فرمِ رو به دوربین، به‌جای «طبیعی»، «خراب» خوانده می‌شود.
 *
 * مبدأ روی لگن است (y = 0) و پیکره تا حدودِ y = 3.3 بالا می‌رود.
 * ران‌ها تا زیرِ زانو ادامه دارند و از قاب بیرون می‌زنند — کادر
 * پایین را می‌بُرد، همان‌طور که در مرجع بریده شده.
 */

export type NeoMaterials = {
  /** بدنه — مشکیِ براق، همان چیزی که کلِ جسم از آن است */
  shell: THREE.Material;
  /** مفصل‌ها — کمی تیره‌تر و مات‌تر، تا بندبندی خوانده شود */
  joint: THREE.Material;
  /** چشم‌ها — همان شبکه، کوچک‌تر و روشن‌تر */
  eye: THREE.Material;
  /** نوشتهٔ روی سینه — دعوتِ اسکرول، روی خودِ بدن */
  label: THREE.Material;
};

export type NeoParts = {
  group: THREE.Group;
  /** سر — برای تکانِ آرامِ نفس، نه دنبال‌کردنِ ماوس */
  head: THREE.Group;
  /** بالاتنه — نفس از اینجا شروع می‌شود */
  torso: THREE.Group;
  /** دو بازو، از شانه */
  arms: [THREE.Group, THREE.Group];
  /** دو ساعد، لولا روی آرنج — برای گرفتنِ ساز */
  forearms: [THREE.Group, THREE.Group];
  /** دو چشم — برای باز و بسته شدن با اسکرول */
  eyes: [THREE.Mesh, THREE.Mesh];
  /** نوشتهٔ سینه — با اسکرول محو می‌شود */
  label: THREE.Mesh;
  /**
   * طولِ دو بندِ بازو: شانه تا آرنج، و آرنج تا کفِ دست.
   *
   * حل‌کنندهٔ IK این دو عدد را لازم دارد و نباید جای دیگری دوباره
   * نوشته شوند — هر بار که تناسبِ بازو عوض شود، این‌ها هم باید با
   * آن عوض شوند، و یک منبع یعنی یک جا.
   */
  bones: { upper: number; fore: number };
  /** همهٔ هندسه‌ها، برای پاک‌کردن */
  geometries: THREE.BufferGeometry[];
};

/**
 * طولِ بندهای بازو — مرجعِ واحدِ هندسه و IK.
 *
 * `upper` فاصلهٔ لولای شانه تا لولای آرنج است و `fore` فاصلهٔ لولای
 * آرنج تا مرکزِ کفِ دست. هر دو در ساختِ مدل هم از همین خوانده
 * می‌شوند، پس امکان ندارد از حل‌کننده جدا بیفتند.
 */
const BONES = { upper: 1.08, fore: 1.15 } as const;

/** کپسول: استوانه با دو سرِ گرد. ستون‌فقراتِ هر عضو در این پیکره. */
function capsule(radius: number, length: number, cap = 10, radial = 20) {
  return new THREE.CapsuleGeometry(radius, length, cap, radial);
}

export function buildNeoBot(m: NeoMaterials): NeoParts {
  const group = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];

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

  /* ── بالاتنه ───────────────────────────────────────────────── */

  const torso = new THREE.Group();
  group.add(torso);

  /**
   * سینه — **یک سپرِ اکسترودشده**، نه جعبهٔ گرد.
   *
   * نسخه‌های قبل یک `RoundedBox` بودند با کمی باریک‌شدن روی رئوس، و
   * هرچه تنظیم شد باز «جعبه» خوانده می‌شد. دلیلش این است که فرمِ
   * درست اصلاً جعبه نیست: در مرجع، شانه‌ها *بخشی از خودِ پوستهٔ
   * سینه‌اند* و از گردن با یک شیبِ پیوسته باز می‌شوند تا پهن‌ترین
   * نقطه، بعد تا کمرِ باریک جمع می‌شوند. یک سیلوئتِ ذوزنقه‌ایِ
   * منحنی، نه شش وجه.
   *
   * با اکسترودِ یک برشِ جلویی، همان سیلوئت مستقیم به‌دست می‌آید و
   * پخ، لبهٔ گردِ زره‌مانند را می‌دهد. بعد روی رئوس فقط *تحدب* اضافه
   * می‌شود تا سینه تخت نماند.
   */
  const chestShape = new THREE.Shape();
  // یقه
  chestShape.moveTo(-0.17, 0.9);
  // شیبِ شانه — تقریباً مستقیم، فقط کمی منحنی
  chestShape.bezierCurveTo(-0.36, 0.86, -0.52, 0.72, -0.6, 0.5);
  // پهلو، رو به کمر
  chestShape.bezierCurveTo(-0.64, 0.32, -0.6, 0.06, -0.54, -0.2);
  chestShape.bezierCurveTo(-0.5, -0.46, -0.46, -0.76, -0.42, -0.96);
  chestShape.lineTo(0.42, -0.96);
  chestShape.bezierCurveTo(0.46, -0.76, 0.5, -0.46, 0.54, -0.2);
  chestShape.bezierCurveTo(0.6, 0.06, 0.64, 0.32, 0.6, 0.5);
  chestShape.bezierCurveTo(0.52, 0.72, 0.36, 0.86, 0.17, 0.9);
  chestShape.lineTo(-0.17, 0.9);

  const chest = mesh(
    new THREE.ExtrudeGeometry(chestShape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.11,
      bevelSize: 0.11,
      bevelSegments: 12,
      curveSegments: 40,
    }),
    m.shell,
    torso,
  );
  chest.position.set(0, 1.4, -0.22);
  {
    const pos = chest.geometry.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      // قفسهٔ سینه به جلو می‌آید و به سمتِ کمر جمع می‌شود
      const up = THREE.MathUtils.clamp((v.y + 1.02) / 1.94, 0, 1);
      if (v.z > 0.2) v.z += (0.07 - Math.abs(v.x) * 0.05) * Math.pow(up, 0.8);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
    chest.geometry.computeVertexNormals();
  }

  /**
   * نوشتهٔ روی سینه.
   *
   * جایش بالای شکم و پایینِ قفسهٔ سینه است — همان‌جایی که روی یک
   * ربات، برچسبِ کارخانه یا صفحهٔ وضعیت می‌نشیند. کمی هم به جلو
   * خم است تا در قابِ روبه‌رو تخت دیده شود نه از زاویه.
   *
   * `renderOrder` بالا و `depthWrite` خاموش: نوشته باید *روی*
   * سطحِ سینه بنشیند، و با فاصلهٔ ناچیزی که دارد، بدونِ این دو،
   * جاهایی از داخلِ بدنه بیرون می‌زند و جاهایی فرو می‌رود.
   */
  const label = mesh(new THREE.PlaneGeometry(0.98, 0.51), m.label, torso);
  label.position.set(0, 0.99, 0.43);
  label.rotation.x = -0.14;
  label.castShadow = false;
  label.receiveShadow = false;
  label.renderOrder = 2;

  /** کمر — حلقهٔ باریکِ مفصلی بینِ سینه و لگن */
  const waist = mesh(capsule(0.22, 0.18, 8, 18), m.joint, torso);
  waist.position.y = 0.34;

  /** لگن — پهن‌تر از کمر، تا پاها جایی برای نشستن داشته باشند */
  const pelvis = mesh(new RoundedBoxGeometry(1.02, 0.6, 0.7, 14, 0.24), m.shell, group);
  pelvis.position.y = 0.04;

  /* ── گردن و سر ─────────────────────────────────────────────── */

  /**
   * گردن دو تکه است: استوانهٔ تیره، و یک یقهٔ پهن‌تر زیرش.
   *
   * آن یقه در مرجع صریح دیده می‌شود و کارش این است که مرزِ سر و
   * تنه را *اعلام* کند. بدونش، گردن فقط یک میلهٔ نازک است و سر
   * انگار روی تنه شناور است.
   */
  const neck = mesh(new THREE.CylinderGeometry(0.17, 0.2, 0.36, 18), m.joint, torso);
  neck.position.y = 2.46;

  const collar = mesh(new THREE.CylinderGeometry(0.27, 0.3, 0.1, 22), m.joint, torso);
  collar.position.y = 2.3;

  const head = new THREE.Group();
  head.position.y = 2.96;
  torso.add(head);

  /**
   * جمجمه — کره‌ای که روی رئوسش فک پیدا کرده.
   *
   * کرهٔ خالص یک توپ است و توپ صورت ندارد. سه جابه‌جایی آن را به
   * کلاه‌خود تبدیل می‌کند: باریک‌شدن به سمتِ چانه، پهن‌شدنِ تارک، و
   * بیرون‌زدنِ پسِ‌سر. هیچ‌کدام روی سیلوئتِ روبه‌رو دیده نمی‌شوند جز
   * اولی — و دقیقاً همان یکی است که «سر» را از «توپ» جدا می‌کند.
   */
  const skull = mesh(new THREE.SphereGeometry(0.5, 72, 54), m.shell, head);
  {
    const pos = skull.geometry.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const up = THREE.MathUtils.clamp((v.y / 0.5 + 1) / 2, 0, 1);
      v.y *= 1.22;
      // چانه جمع می‌شود، تارک کمی پهن
      const w = THREE.MathUtils.lerp(0.8, 1.14, Math.pow(up, 0.55));
      v.x *= w;
      v.z *= THREE.MathUtils.lerp(0.86, 1.06, Math.pow(up, 0.5));
      // پسِ‌سر بیرون می‌زند — جمجمه از پهنایش عمیق‌تر است
      if (v.z < 0) v.z *= 1.16;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
    skull.geometry.computeVertexNormals();
  }
  skull.position.y = 0.04;

  /**
   * ویزورِ جدا ندارد — و این یک تصمیم است، نه جا افتادن.
   *
   * نسخهٔ اول یک پوستهٔ شیشه‌ایِ جدا روی صورت می‌گذاشت، کمی
   * بزرگ‌تر از جمجمه. مشکلش لبهٔ خودِ آن پوسته بود: روی سطحِ
   * آینه‌ای، آن لبه یک کمانِ روشنِ نازک می‌شد و صورت را مثلِ یک
   * حلقهٔ کشیده‌شده دور می‌زد — چیزی که در مرجع اصلاً وجود ندارد.
   *
   * در مرجع، سر یک گنبدِ پیوسته است و چشم‌ها مستقیم رویش نشسته‌اند.
   * همان کار را می‌کنیم: یک پوسته، بدونِ درز.
   */

  /**
   * چشم‌ها — دو شبکهٔ نقطه‌ای روی ویزور.
   *
   * تنها جایی از کلِ پیکره که «نگاه» می‌سازد، و کلِ شخصیتِ جسم به
   * همین دو لکهٔ کوچک بند است. سه تصمیم درشان هست:
   *
   *   پایینِ میانهٔ صورت، نه وسط. چشمِ وسطِ سر، عروسکی است؛ در
   *   تناسبِ انسانی چشم حدودِ نیمهٔ پایینیِ کلهٔ سر می‌نشیند.
   *
   *   جدا از هم و کوچک. دو لکهٔ ریزِ دور از هم، صورتِ پهن می‌سازند —
   *   همان چیزی که کلاه‌خود را از ماسک جدا می‌کند.
   *
   *   کمی چرخیده به بیرون، چون سطحِ زیرشان منحنی است. بدونِ این،
   *   لبهٔ صفحه از کنارِ ویزور بیرون می‌زند.
   */
  const eyes: THREE.Mesh[] = [];
  for (const side of [-1, 1] as const) {
    const eye = mesh(new THREE.PlaneGeometry(0.235, 0.145), m.eye, head);
    eyes.push(eye);
    /**
     * z اینجا باید *بیرونِ* پوستهٔ جمجمه بیفتد.
     *
     * نسخهٔ اول روی ۰٫۵ بود در حالی که سطحِ سر در همان ارتفاع تا
     * ۰٫۵۷ می‌آمد: صفحه کاملاً داخلِ سر دفن شده بود و هیچ‌وقت دیده
     * نمی‌شد. عددِ زیر از شعاعِ جمجمه در ضریبِ همان ارتفاع می‌آید،
     * به‌علاوهٔ یک ذره فاصله تا z-fighting نشود.
     */
    eye.position.set(side * 0.16, 0.04, 0.504);
    eye.rotation.y = side * 0.26;
    eye.rotation.x = 0.1;
    eye.castShadow = false;
    eye.receiveShadow = false;
  }

  /* ── شانه و بازو ───────────────────────────────────────────── */

  /**
   * بازو **دو بند** است، نه یک تکهٔ صُلب.
   *
   * نسخهٔ اول همهٔ قطعه‌ها را در یک گروه گذاشته بود و فقط از شانه
   * می‌چرخید. برای دستی که کنارِ بدن آویزان است کافی بود، ولی
   * به‌محضِ اینکه باید چیزی را *بگیرد*، غلط می‌شود: بازوی صاف هیچ‌وقت
   * به گیتار نمی‌رسد، و اگر آن‌قدر بچرخد که برسد، مثلِ تخته‌ای است
   * که از شانه بیرون زده — دقیقاً همان چیزی که یک دور دیده شد.
   *
   * حالا `fore` گروهِ خودش را دارد با لولا روی آرنج. با دو زاویه —
   * شانه و آرنج — می‌شود کف دست را هرجای فضا برد، که برای گرفتنِ
   * ساز لازم است.
   */
  const makeArm = (side: 1 | -1) => {
    const arm = new THREE.Group();
    arm.position.set(side * 0.88, 2.02, 0);
    torso.add(arm);

    /**
     * مفصلِ شانه — یک قرصِ تیره **پشتِ** فاصله، نه یک توپِ چسبیده.
     *
     * در مرجع، بازو از تنه جداست: یک شکافِ تاریک بینشان هست و ته آن
     * شکاف، چرخِ مفصل دیده می‌شود. همان شکاف است که به جسم حسِ
     * «قطعاتِ مونتاژشده» می‌دهد؛ بازویی که به تنه بچسبد، مجسمهٔ یک
     * تکه می‌شود.
     */
    const joint = mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.34, 32), m.joint, torso);
    joint.rotation.z = Math.PI / 2;
    /**
     * فرزندِ **تنه** است، نه بازو.
     *
     * وقتی داخلِ گروهِ بازو بود، با هر چرخشِ شانه خودش هم می‌چرخید و
     * از کنارِ بدن بیرون می‌زد — یک استوانهٔ معلق که انگار مفصل در
     * رفته. مفصل نقطهٔ *ثابت* است؛ چیزی که دورش می‌چرخد بازوست.
     */
    joint.position.set(side * 0.78, 2.02, 0);

    /**
     * کلاهکِ سرشانه — روی مفصل، از جنسِ بدنه.
     *
     * مفصلِ لخت از بیرون یک استوانهٔ تیره است و شانه را بی‌تمام‌شده
     * نشان می‌دهد. در مرجع، روی هر مفصل یک قطعهٔ زرهیِ گرد نشسته که
     * از بالا و بیرون می‌پوشاندش و فقط شکافِ باریکِ زیرش پیداست —
     * همان شکاف است که «مونتاژشده» را می‌سازد.
     *
     * نیم‌کره است نه کره: نیمهٔ پایینی هیچ‌وقت دیده نمی‌شود و
     * نساختنش هم مثلث کم می‌کند هم از هم‌پوشانی با بازو جلوگیری
     * می‌کند.
     */
    const cap = mesh(
      new THREE.SphereGeometry(0.27, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.62),
      m.shell,
      torso,
    );
    cap.position.set(side * 0.8, 2.05, 0);
    cap.scale.set(1.08, 0.92, 1.02);
    cap.rotation.z = side * -0.22;

    /**
     * بازو یک **تیغهٔ پهن و تخت** است، نه استوانه.
     *
     * این تفاوتِ اصلی با نسخهٔ قبل است. کپسول از هر زاویه یک لولهٔ
     * گرد است و سیلوئتش هیچ‌وقت عوض نمی‌شود؛ تیغهٔ تخت از روبه‌رو
     * پهن است و از کنار نازک، پس نور روی وجهِ پهنش یک سطحِ گرادیان
     * می‌سازد — همان صفحهٔ روشنِ کشیده که روی بازوهای مرجع دیده
     * می‌شود. بالا پهن‌تر و پایین باریک‌تر، مثلِ زره.
     */
    const upper = mesh(new RoundedBoxGeometry(0.3, 0.92, 0.26, 12, 0.1), m.shell, arm);
    upper.position.set(side * 0.02, -0.58, 0);
    {
      const pos = upper.geometry.attributes.position;
      const v = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        const up = THREE.MathUtils.clamp((v.y + 0.46) / 0.92, 0, 1);
        const taper = THREE.MathUtils.lerp(0.72, 1.08, Math.pow(up, 0.7));
        v.x *= taper;
        v.z *= THREE.MathUtils.lerp(0.82, 1.05, Math.pow(up, 0.6));
        pos.setXYZ(i, v.x, v.y, v.z);
      }
      pos.needsUpdate = true;
      upper.geometry.computeVertexNormals();
    }

    /** لولای آرنج — هرچه زیرش است با یک زاویه خم می‌شود */
    const fore = new THREE.Group();
    fore.position.set(side * 0.04, -BONES.upper, 0);
    arm.add(fore);

    const elbow = mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.24, 18), m.joint, fore);
    elbow.rotation.z = Math.PI / 2;

    /** ساعد — همان تیغه، یک اندازه کوچک‌تر */
    const lower = mesh(new RoundedBoxGeometry(0.24, 0.84, 0.21, 12, 0.085), m.shell, fore);
    lower.position.y = -0.48;
    {
      const pos = lower.geometry.attributes.position;
      const v = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        const up = THREE.MathUtils.clamp((v.y + 0.42) / 0.84, 0, 1);
        v.x *= THREE.MathUtils.lerp(0.7, 1.05, Math.pow(up, 0.7));
        v.z *= THREE.MathUtils.lerp(0.78, 1.02, Math.pow(up, 0.6));
        pos.setXYZ(i, v.x, v.y, v.z);
      }
      pos.needsUpdate = true;
      lower.geometry.computeVertexNormals();
    }

    const wrist = mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.18, 14), m.joint, fore);
    wrist.rotation.z = Math.PI / 2;
    wrist.position.y = -0.94;

    /** دست — یک تیغهٔ ساده، بی‌انگشت */
    const hand = mesh(new RoundedBoxGeometry(0.2, 0.32, 0.13, 10, 0.055), m.shell, fore);
    hand.position.y = -BONES.fore;
    // انگشت ندارد. در این اندازه، شست فقط یک زائدهٔ ریز روی سیلوئت
    // بود و از فاصلهٔ هیرو مثلِ نقصِ مدل خوانده می‌شد.

    // بازوها کمی از بدنه فاصله می‌گیرند تا خطِ نور بینشان بیفتد؛
    // چسبیده که باشند، تنه و بازو یک لکهٔ مشکیِ واحد می‌شوند
    arm.rotation.z = side * -0.06;
    return { arm, fore };
  };

  const left = makeArm(-1);
  const right = makeArm(1);
  const arms: [THREE.Group, THREE.Group] = [left.arm, right.arm];
  const forearms: [THREE.Group, THREE.Group] = [left.fore, right.fore];

  /* ── پاها ──────────────────────────────────────────────────── */

  /**
   * تا زیرِ زانو و نه بیشتر.
   *
   * کادرِ هیرو پایین را می‌بُرد، پس ساق و پا هرگز دیده نمی‌شوند —
   * ساختنشان فقط مثلث است و هیچ پیکسلی. ران‌ها می‌مانند چون
   * پهنایشان، پایینِ سیلوئت را می‌بندد.
   */
  for (const side of [-1, 1] as const) {
    const hip = mesh(new THREE.SphereGeometry(0.21, 22, 16), m.joint, group);
    hip.position.set(side * 0.3, -0.2, 0);

    const thigh = mesh(capsule(0.185, 1.02, 10, 20), m.shell, group);
    thigh.position.set(side * 0.31, -0.9, 0);

    const knee = mesh(new THREE.SphereGeometry(0.155, 20, 14), m.joint, group);
    knee.position.set(side * 0.31, -1.56, 0);

    const shin = mesh(capsule(0.145, 0.8, 8, 18), m.shell, group);
    shin.position.set(side * 0.31, -2.06, 0);
  }

  return {
    group,
    head,
    torso,
    arms,
    forearms,
    eyes: eyes as [THREE.Mesh, THREE.Mesh],
    label,
    bones: BONES,
    geometries,
  };
}
