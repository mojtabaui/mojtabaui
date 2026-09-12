"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { buildRobot, type RobotMaterials } from "./buildRobot";
import { buildWorld } from "./buildWorld";
import { bakeStudio } from "./studio";
import { blobTexture, orangePeelNormal, textTexture } from "./textures";

/**
 * صحنهٔ AI7 — ربات روی تپه، زیرِ آسمانِ آبی، با پرچم و رفیقی که
 * پرواز می‌کند.
 *
 * قوسِ اسکرول دو حرکت دارد که هم‌پوشانی می‌کنند:
 *   ۰ تا ۰٫۳۲  ربات از خاموشی روشن می‌شود و دنیا با او روز می‌شود
 *   ۰٫۵۲ به بعد  دنیا محو می‌شود و فقط خودِ ربات می‌ماند
 *
 * چیزهایی که «رندرِ حرفه‌ای» را از «رندرِ تمیز» جدا می‌کنند و اینجا
 * رعایت شده‌اند:
 *
 *   محیطِ بازتاب — ویزورِ مشکیِ براق بدون چیزی برای بازتاب دادن فقط
 *   یک لکهٔ خاکستری است. استودیوی مجازیِ studio.ts هرگز دیده نمی‌شود
 *   و تنها کارش این است که در ویزور و لبهٔ بدنه بیفتد.
 *
 *   تُن‌مپینگِ خنثی — ACES سفید را به خاکستریِ کرمی می‌بَرد و برای
 *   یک اسباب‌بازیِ سفید بدترین انتخاب است. NeutralToneMapping سفید را
 *   سفید نگه می‌دارد و فقط هایلایت‌ها را جمع می‌کند.
 *
 *   بلوم با آستانهٔ بالا — فقط چشم‌ها باید بدرخشند. آستانهٔ پایین کلِ
 *   بدنهٔ سفید را مه‌آلود می‌کند.
 *
 *   سایهٔ تماسی — یک لکهٔ نرمِ جدا زیرِ ربات، علاوه بر سایهٔ واقعی.
 *   سایهٔ shadow-map به‌تنهایی لبهٔ تیز دارد و ربات را روی زمین
 *   نمی‌نشاند.
 */

/**
 * بدنه — سفیدِ پلاستیکیِ اسباب‌بازی، در تمامِ طولِ اسکرول.
 *
 * قبلاً رنگِ بدنه با پیشرفتِ اسکرول از خاکستری به سفید می‌رفت، و
 * نتیجه این بود که ربات نیمی از صفحه را خاکستری می‌ماند. «روشن
 * شدن» حالا فقط دربارهٔ چشم‌ها و نورِ صحنه است، نه رنگِ خودِ جسم.
 */
const BODY = new THREE.Color("#fbfaf7");
const TRIM = new THREE.Color("#e8e3d9");
const ACCENT = new THREE.Color("#ff9d2e");
/** رنگِ افق — مه باید همرنگِ پایینِ آسمان باشد وگرنه خطِ افق می‌شکند */
const HORIZON = "#dbe8f2";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export default function Robot3D({
  progress,
  className = "",
}: {
  /** ۰ خاموش، ۱ روشن و تنها */
  progress: MotionValue<number>;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const disposables: { dispose(): void }[] = [];
    const keep = <T extends { dispose(): void }>(v: T) => (disposables.push(v), v);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(new THREE.Color(HORIZON).getHex(), 34, 96);

    const camera = new THREE.PerspectiveCamera(27, 1, 0.1, 400);
    camera.position.set(0, 3.4, 18.6);
    camera.lookAt(0, 0.55, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      width: "100%",
      height: "100%",
      display: "block",
    });

    scene.environment = keep(bakeStudio(renderer));

    // ── متریال‌های ربات ──────────────────────────────────────────
    const peel = keep(orangePeelNormal());
    /**
     * پلاستیکِ سفید: زیرلایهٔ نیمه‌مات با یک لایهٔ لاکِ براق رویش.
     * همین دولایگی است که به قطعهٔ قالب‌گیری‌شده حسِ «کارخانه‌ای»
     * می‌دهد؛ تک‌لایهٔ براق شبیه سرامیک می‌شود.
     */
    const body = keep(
      new THREE.MeshPhysicalMaterial({
        color: BODY.clone(),
        roughness: 0.38,
        metalness: 0,
        clearcoat: 0.9,
        clearcoatRoughness: 0.16,
        clearcoatNormalMap: peel,
        clearcoatNormalScale: new THREE.Vector2(0.16, 0.16),
        envMapIntensity: 1.1,
      }),
    );

    const trim = keep(
      new THREE.MeshPhysicalMaterial({
        color: TRIM.clone(),
        roughness: 0.44,
        metalness: 0,
        clearcoat: 0.55,
        clearcoatRoughness: 0.3,
        envMapIntensity: 0.9,
      }),
    );

    const metal = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#b9bcc4"),
        roughness: 0.24,
        metalness: 1,
        envMapIntensity: 1.4,
      }),
    );

    const rubber = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#6f727b"),
        roughness: 0.88,
        metalness: 0,
        envMapIntensity: 0.5,
      }),
    );

    /**
     * شیشهٔ ویزور — تقریباً مشکی، زبریِ نزدیکِ صفر و لاکِ کامل.
     * envMapIntensity بالا عمدی است: تمامِ چیزی که این سطح را «شیشه»
     * نشان می‌دهد، همان سافت‌باکسی است که در آن می‌افتد.
     */
    const visor = keep(
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#05060a"),
        roughness: 0.035,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.015,
        transparent: true,
        opacity: 0.72,
        ior: 1.52,
        envMapIntensity: 1.6,
      }),
    );

    /** صفحه: خودش کمی نور می‌دهد، پس عمقِ پشتِ شیشه را می‌سازد */
    const screenMat = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#04050a"),
        emissive: new THREE.Color("#0e1526"),
        emissiveIntensity: 0.02,
        roughness: 0.42,
        metalness: 0,
        envMapIntensity: 0.5,
      }),
    );

    const eyeMat = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0b10"),
        emissive: new THREE.Color("#ffffff"),
        emissiveIntensity: 0.02,
        roughness: 0.2,
      }),
    );

    const coreMat = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#241206"),
        emissive: ACCENT.clone(),
        emissiveIntensity: 0.02,
        roughness: 0.3,
      }),
    );

    const mats: RobotMaterials = {
      body,
      trim,
      metal,
      rubber,
      visor,
      screen: screenMat,
      eye: eyeMat,
      core: coreMat,
    };

    // ── ربات اصلی ────────────────────────────────────────────────
    const hero = buildRobot(mats);
    /** کمی زیرِ سطح، تا لبهٔ پا در خاک گم شود نه اینکه رویش بایستد */
    hero.group.position.y = 0.12;
    scene.add(hero.group);

    // ── رفیقِ پرنده ──────────────────────────────────────────────
    const buddy = buildRobot(mats);
    buddy.group.scale.setScalar(0.26);
    buddy.group.position.set(5.4, 3.4, -4.4);
    buddy.group.rotation.set(0.1, -0.6, -0.3);
    scene.add(buddy.group);

    // ── دنیا ─────────────────────────────────────────────────────
    const world = buildWorld();
    scene.add(world.group);
    world.materials.forEach(keep);
    world.textures.forEach(keep);
    world.geometries.forEach(keep);

    /**
     * تیترِ فارسی، بالای سرِ ربات و پشتِ او.
     *
     * غیرهمگام است چون قبل از رسم باید فونتِ سایت آماده شده باشد؛
     * وگرنه canvas با فونتِ پیش‌فرضِ مرورگر می‌کشد و فارسی بد
     * درمی‌آید. اگر کامپوننت تا آن موقع برچیده شده باشد، رها می‌کنیم.
     */
    let alive = true;
    /** تیتر دیر می‌رسد، پس حلقهٔ رندر باید بتواند نبودش را تحمل کند */
    let headline: THREE.Mesh | null = null;
    textTexture("آموزش AI برای طراحانِ محصول").then((tex) => {
      if (!alive) {
        tex.dispose();
        return;
      }
      keep(tex);
      const mat = keep(
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.92,
          depthWrite: false,
          fog: false,
        }),
      );
      const plane = new THREE.Mesh(keep(new THREE.PlaneGeometry(13.4, 2.88)), mat);
      plane.position.set(0, 4.55, -8);
      plane.renderOrder = 2;
      world.group.add(plane);
      headline = plane;
    });

    /**
     * حالتِ اصلیِ شفافیتِ هر متریال، تا موقعِ محو کردن مرجع داشته باشیم.
     *
     * transparent هم ذخیره می‌شود چون فقط opacity کافی نیست: روشن
     * کردنِ transparent روی متریالی که واقعاً شفاف نیست، آن را از صفِ
     * رندرِ مات به صفِ شفاف منتقل می‌کند. آسمان که به آن صف برود، بعد
     * از ابرها کشیده می‌شود و — چون ابرها depthWrite ندارند — رویشان
     * می‌نشیند و کاملاً محوشان می‌کند.
     */
    const baseState = new Map<THREE.Material, { opacity: number; transparent: boolean }>();

    // ── سایهٔ تماسی ──────────────────────────────────────────────
    const blobMat = keep(
      new THREE.MeshBasicMaterial({
        map: keep(blobTexture()),
        transparent: true,
        depthWrite: false,
        opacity: 0,
      }),
    );
    // دو لایه: یکی پهن و کم‌رنگ برای نشستِ کلی، یکی تنگ و تیره
    // درست زیرِ پاها. سایهٔ تک‌لایه یا لکهٔ بزرگِ محو می‌شود یا
    // دایرهٔ تیزِ چسبیده؛ هیچ‌کدام تماس را نشان نمی‌دهند.
    const blob = new THREE.Mesh(keep(new THREE.PlaneGeometry(6.6, 6.6)), blobMat);
    blob.rotation.x = -Math.PI / 2;
    blob.position.set(0.1, world.groundY(0, 0) + 0.06, 0.5);
    blob.renderOrder = 1;
    scene.add(blob);

    const coreShadeMat = keep(
      new THREE.MeshBasicMaterial({
        map: keep(blobTexture("rgba(58,24,8,")),
        transparent: true,
        depthWrite: false,
        opacity: 0,
      }),
    );
    const coreShade = new THREE.Mesh(keep(new THREE.PlaneGeometry(3.2, 2.5)), coreShadeMat);
    coreShade.rotation.x = -Math.PI / 2;
    coreShade.position.set(0.05, world.groundY(0, 0) + 0.09, 0.34);
    coreShade.renderOrder = 2;
    scene.add(coreShade);

    // ── نورها ────────────────────────────────────────────────────
    // محیطِ استودیو بیشترِ کار را می‌کند؛ این‌ها فقط جهت و سایه
    // می‌دهند.
    const ambient = new THREE.AmbientLight(0xffffff, 0.06);
    scene.add(ambient);

    const hemi = new THREE.HemisphereLight(0xbfd8f5, 0xb0693a, 0.06);
    scene.add(hemi);

    /** نورِ اصلی — از بالا-چپ-جلو، همان‌جا که سافت‌باکسِ محیط است */
    const key = new THREE.DirectionalLight(0xfff6ea, 0.2);
    key.position.set(-4.4, 13.5, 3.2);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 2;
    key.shadow.camera.far = 46;
    key.shadow.camera.left = -12;
    key.shadow.camera.right = 12;
    key.shadow.camera.top = 12;
    key.shadow.camera.bottom = -12;
    key.shadow.radius = 4;
    key.shadow.blurSamples = 20;
    key.shadow.bias = 0;
    key.shadow.normalBias = 0.07;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xe4edff, 0.08);
    fill.position.set(6.6, 1.6, 5.2);
    scene.add(fill);

    /** نورِ لبه — بدنهٔ سفید را از آسمانِ روشن جدا می‌کند */
    const rim = new THREE.DirectionalLight(0xdce9ff, 0.3);
    rim.position.set(2.6, 4.2, -8.4);
    scene.add(rim);

    const selfGlow = new THREE.PointLight(ACCENT.getHex(), 0, 9);
    selfGlow.position.set(0, -1, 2.4);
    scene.add(selfGlow);

    // ── پست‌پروسس ────────────────────────────────────────────────
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    /** آستانهٔ ۰٫۹۹: فقط چشم‌ها ردش می‌کنند، نه بدنهٔ سفید */
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.2, 0.3, 1.15);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // ── اندازه ───────────────────────────────────────────────────
    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      bloom.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // ── نشانگر ───────────────────────────────────────────────────
    const point = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      point.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      point.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // ── حلقهٔ رندر ───────────────────────────────────────────────
    let t = progress.get();
    const stop = progress.on("change", (v) => {
      t = v;
    });

    let raf = 0;
    const clock = new THREE.Clock();
    const flagGeo = world.flag.geometry;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const time = clock.getElapsedTime();

      // ── روشن شدن ──
      // فقط شدتِ بازتاب کمی بالا می‌رود؛ رنگ ثابت است.
      const tone = clamp01(t / 0.42);
      body.envMapIntensity = lerp(0.85, 1.15, tone);
      trim.envMapIntensity = lerp(0.7, 0.95, tone);
      metal.envMapIntensity = lerp(1, 1.4, tone);
      visor.envMapIntensity = lerp(1.2, 1.6, tone);

      const boot = clamp01(t / 0.32);
      const flicker = t < 0.28 ? 0.55 + 0.45 * Math.sin(time * 19) : 1;
      eyeMat.emissiveIntensity = lerp(0.02, 2.4, boot) * flicker;
      screenMat.emissiveIntensity = lerp(0.02, 0.3, boot) * flicker;
      coreMat.emissiveIntensity = lerp(0.02, 3.2, boot) * flicker;
      selfGlow.intensity = lerp(0, 1.6, boot);
      bloom.strength = lerp(0.06, 0.2, boot);

      ambient.intensity = lerp(0.34, 0.5, t);
      hemi.intensity = lerp(0.55, 0.85, t);
      key.intensity = lerp(1.7, 2.4, t);
      fill.intensity = lerp(0.36, 0.5, t);
      rim.intensity = lerp(0.5, 0.7, t);
      blobMat.opacity = lerp(0.55, 0.72, clamp01(t / 0.35));
      coreShadeMat.opacity = lerp(0.72, 0.9, clamp01(t / 0.35));

      // ── محو شدنِ دنیا، تا فقط ربات بماند ──
      const solo = clamp01((t - 0.52) / 0.26);
      world.group.visible = solo < 1;
      world.group.traverse((o) => {
        const mat = (o as THREE.Mesh).material as THREE.Material | undefined;
        if (!mat || !("opacity" in mat)) return;
        if (!baseState.has(mat)) {
          baseState.set(mat, { opacity: mat.opacity, transparent: mat.transparent });
        }
        const base = baseState.get(mat)!;
        mat.transparent = base.transparent || solo > 0;
        mat.opacity = base.opacity * (1 - solo);
      });
      buddy.group.visible = solo < 1;
      buddy.group.scale.setScalar(0.26 * (1 - solo * 0.6));
      blobMat.opacity *= 1 - solo;
      coreShadeMat.opacity *= 1 - solo;
      if (scene.fog) (scene.fog as THREE.Fog).far = lerp(96, 500, solo);

      // ── حرکت ──
      const idle = reduce ? 0 : Math.sin(time * 0.38) * 0.09;
      hero.group.rotation.y += (point.x * 0.26 + idle - hero.group.rotation.y) * 0.05;
      hero.group.rotation.x += (point.y * 0.1 - hero.group.rotation.x) * 0.05;
      hero.group.position.y = 0.12 + (reduce ? 0 : Math.sin(time * 0.62) * 0.04);

      if (!reduce) {
        // آنتن‌ها با تأخیر نسبت به بدنه تکان می‌خورند — همین تأخیر
        // است که به جسمِ صُلب حسِ وزن می‌دهد.
        hero.antennas.forEach((a, i) => {
          a.rotation.z = (i ? 1 : -1) * -0.1 + Math.sin(time * 1.4 + i * 1.7) * 0.05;
        });
        // تیتر آرام بالا-پایین می‌رود و کمی با نشانگر می‌چرخد —
        // همین حرکتِ کم است که آن را از یک برچسبِ چسبیده به آسمان
        // جدا می‌کند و پشتِ ربات می‌نشاند.
        if (headline) {
          headline.position.y = 4.55 + Math.sin(time * 0.5) * 0.16;
          headline.rotation.y = point.x * 0.06;
          headline.rotation.x = point.y * 0.03;
        }

        hero.arms.forEach((a, i) => {
          a.rotation.z = Math.sin(time * 0.9 + i * 2.1) * 0.08;
        });

        buddy.group.position.set(
          5.4 + Math.sin(time * 0.5) * 0.8,
          3.4 + Math.sin(time * 0.82) * 0.36,
          -4.4,
        );
        buddy.group.rotation.z = -0.3 + Math.sin(time * 0.6) * 0.1;

        // ابرها آرام می‌روند — حرکتِ کندِ پس‌زمینه، صحنه را زنده
        // نگه می‌دارد بدون اینکه توجه بدزدد.
        world.clouds.forEach((c, i) => {
          c.position.x += 0.0035 * (1 + (i % 3) * 0.4);
          if (c.position.x > 90) c.position.x = -90;
        });

        // موجِ پرچم
        const pos = flagGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const bx = world.flagBase.getX(i);
          const by = world.flagBase.getY(i);
          const away = (bx + 0.85) / 1.7;
          pos.setZ(i, Math.sin(time * 2.4 + bx * 4.2 + by) * 0.17 * away);
        }
        pos.needsUpdate = true;
        flagGeo.computeVertexNormals();
      }

      composer.render();
    };
    tick();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      stop();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
      disposables.forEach((d) => d.dispose());
      composer.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [progress]);

  return <div ref={host} className={className} aria-hidden="true" />;
}
