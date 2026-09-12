"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { buildMelinaBot, type BotMaterials } from "./melinaBot";
import { buildMelinaBust } from "./melinaBust";
import { bakeStudio } from "./studio";
import { blobTexture, orangePeelNormal } from "./textures";

/**
 * نسخهٔ دومِ صحنه — رباتِ ملینا، روی زمینهٔ خالی.
 *
 * اینجا هیچ آسمانی، خاکی یا وسیله‌ای نیست: فقط جسم روی زمینهٔ خالی،
 * مثل عکسِ محصول در استودیو. کلِ کار را نور و بازتاب می‌کنند.
 *
 * دو حرکت هم‌زمان روی محورِ اسکرول سوارند:
 *
 *   روشن شدن — ربات خاموش و تقریباً مشکی شروع می‌کند و با اسکرول
 *   روشن می‌شود: اول چشم و سیبیل، بعد پلاستیکِ بدنه از زغالی به
 *   کرم. این تنها جایی است که رنگِ *جسم* عوض می‌شود، نه فقط نورِ
 *   صحنه؛ و همان چیزی است که به آن حسِ «دستگاه دارد بالا می‌آید»
 *   می‌دهد به‌جای «چراغ روشن شد».
 *
 *   چرخش — جسم می‌چرخد تا هر بار وجهِ دیگری را نشان دهد، مثل
 *   کاتالوگِ محصول.
 *
 * چهار ایست:
 *   ۰٫۰۰  روبه‌رو، وسطِ قاب، خاموش
 *   ۰٫۳۳  سه‌رخ، رفته کنار تا برای متن جا باز شود، نیمه‌روشن
 *   ۰٫۶۶  نمای نزدیکِ صورت، کاملاً روشن
 *   ۱٫۰۰  دوباره وسط، کمی دورتر
 */

/**
 * رنگ‌ها از توکن‌های برند می‌آیند (globals.css)، نه از سلیقهٔ صحنه.
 * بدنه کرم است نه سفید: سفیدِ خالص روی زمینهٔ #FAF6F1 صفحه مثل
 * وصله می‌نشیند.
 */
const CREAM = "#f8f4ee";
const CREAM_DEEP = "#e6ded1";
/** بدنه در حالتِ خاموش — زغالیِ کمی بنفش، نه خاکستریِ بی‌رنگ */
const OFF_BODY = "#17161f";
const OFF_TRIM = "#0f0e15";
const VIOLET = "#7c5cfc";
const NEAR_BLACK = "#0a0912";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** درون‌یابیِ چند ایست روی یک محور */
function stops(t: number, keys: number[], values: number[]) {
  if (t <= keys[0]) return values[0];
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i]) {
      const k = (t - keys[i - 1]) / (keys[i] - keys[i - 1]);
      // نرم‌کردنِ لبه‌ها، تا رسیدن به هر ایست کند شود
      const e = k * k * (3 - 2 * k);
      return lerp(values[i - 1], values[i], e);
    }
  }
  return values[values.length - 1];
}

export default function RobotStudio({
  progress,
  /** ۱ وقتی چیدمان راست‌به‌چپ است — ربات به سمتِ مخالفِ متن می‌رود */
  flip = 1,
  /** دستگاهِ ایستاده، یا نیم‌تنهٔ انسان‌وار */
  bot = "device",
  className = "",
}: {
  progress: MotionValue<number>;
  flip?: number;
  bot?: "device" | "bust";
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
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 120);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      width: "100%",
      height: "100%",
      display: "block",
    });

    scene.environment = keep(bakeStudio(renderer));

    // ── متریال‌ها ────────────────────────────────────────────────
    const peel = keep(orangePeelNormal());

    const body = keep(
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(OFF_BODY),
        roughness: 0.36,
        metalness: 0,
        clearcoat: 0.92,
        clearcoatRoughness: 0.14,
        clearcoatNormalMap: peel,
        clearcoatNormalScale: new THREE.Vector2(0.16, 0.16),
        envMapIntensity: 1.15,
      }),
    );

    const trim = keep(
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(OFF_TRIM),
        roughness: 0.44,
        metalness: 0,
        clearcoat: 0.55,
        clearcoatRoughness: 0.3,
        envMapIntensity: 0.9,
      }),
    );

    const metal = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#bcbfc6"),
        roughness: 0.22,
        metalness: 1,
        envMapIntensity: 1.5,
      }),
    );

    const rubber = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#71747d"),
        roughness: 0.88,
        metalness: 0,
        envMapIntensity: 0.5,
      }),
    );

    const visor = keep(
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(NEAR_BLACK),
        roughness: 0.035,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.015,
        transparent: true,
        opacity: 0.72,
        ior: 1.52,
        envMapIntensity: 1.7,
      }),
    );

    const screenMat = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#04040c"),
        emissive: new THREE.Color("#120e28"),
        emissiveIntensity: 0.2,
        roughness: 0.42,
        metalness: 0,
        envMapIntensity: 0.06,
      }),
    );

    const eyeMat = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0a12"),
        emissive: new THREE.Color("#f2eeff"),
        emissiveIntensity: 2.4,
        roughness: 0.2,
      }),
    );

    /**
     * بنفشِ برند — سیبیل، حلقهٔ گردن، بیدِ آنتن، دریچه.
     *
     * emissive است نه رنگِ ساده: رنگِ لهجه روی سطحِ بی‌نور به تزئین
     * می‌زند، ولی وقتی از خودِ چیز بتابد، به هویت.
     */
    const glowMat = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#150e33"),
        emissive: new THREE.Color(VIOLET),
        emissiveIntensity: 2.1,
        roughness: 0.3,
        metalness: 0,
      }),
    );

    /**
     * سیبیل: کرمِ توپُر، نه بنفش.
     *
     * در خودِ نشانِ برند، سیبیل کرم است روی مربعِ تیره. بنفش‌کردنش
     * اینجا آن را از «نشانِ ملینا» به «یک لکهٔ رنگیِ روی صفحه»
     * تبدیل می‌کرد. بنفش جای دیگری کار دارد: چشم، حلقه، نوارِ وضعیت.
     *
     * emissive پایین است تا نورِ صحنه رویش سایه‌روشن بسازد؛ ولی صفر
     * هم نیست، چون روی صفحهٔ مشکیِ صورت باید خودش دیده شود نه اینکه
     * منتظرِ نورِ بیرون بماند.
     */
    const stacheMat = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(CREAM),
        emissive: new THREE.Color("#cfc4ff"),
        emissiveIntensity: 0.28,
        roughness: 0.3,
        metalness: 0.05,
        envMapIntensity: 1.3,
      }),
    );

    const mats: BotMaterials = {
      body,
      trim,
      metal,
      rubber,
      visor,
      screen: screenMat,
      eye: eyeMat,
      glow: glowMat,
      stache: stacheMat,
    };

    // دو سرِ قوسِ رنگ، یک بار ساخته می‌شوند تا در هر فریم شیء
    // جدید ساخته نشود
    const bodyOff = new THREE.Color(OFF_BODY);
    const bodyOn = new THREE.Color(CREAM);
    const trimOff = new THREE.Color(OFF_TRIM);
    const trimOn = new THREE.Color(CREAM_DEEP);

    const hero = bot === "bust" ? buildMelinaBust(mats) : buildMelinaBot(mats);
    // ارتفاعِ استراحتِ سیبیل به ربات بستگی دارد؛ یک بار ثبت می‌شود
    hero.stache.userData.restY = hero.stache.position.y;
    const rig = new THREE.Group();
    rig.add(hero.group);
    scene.add(rig);

    /**
     * سایهٔ زمین — بدون آن، ربات در فضای خالی شناور می‌ماند.
     *
     * صفحه‌ای برای دریافتِ سایه وجود ندارد چون پس‌زمینه باید همان
     * رنگِ صفحهٔ HTML بماند؛ پس یک لکهٔ نقاشی‌شده زیرش می‌گذاریم.
     */
    const blobMat = keep(
      new THREE.MeshBasicMaterial({
        map: keep(blobTexture("rgba(46,42,38,")),
        transparent: true,
        depthWrite: false,
        opacity: 0.42,
      }),
    );
    const blob = new THREE.Mesh(keep(new THREE.PlaneGeometry(7.6, 7.6)), blobMat);
    blob.rotation.x = -Math.PI / 2;
    blob.position.set(0, -2.05, 0.3);
    // بیرونِ rig: اگر با ربات بچرخد، از نیم‌رخ دیده می‌شود و به‌جای
    // سایه، یک هالهٔ روشن پشتِ او می‌سازد.
    scene.add(blob);

    // ── نورها ────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.06);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfff8ef, 0.12);
    key.position.set(-5, 9, 6.5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xe8f0ff, 0.05);
    fill.position.set(6, 2, 5);
    scene.add(fill);

    /** لبه — بدنهٔ کرم روی زمینهٔ کرم بدون این گم می‌شود */
    const rim = new THREE.DirectionalLight(0xd8dcff, 0.3);
    rim.position.set(1.5, 3, -7);
    scene.add(rim);

    /** تابشِ بنفشِ صورت روی سینه — همان چیزی که نور را «واقعی» می‌کند */
    const faceGlow = new THREE.PointLight(new THREE.Color(VIOLET).getHex(), 0, 7, 2);
    faceGlow.position.set(0, 0.1, 2.2);
    scene.add(faceGlow);

    // ── پست‌پروسس ────────────────────────────────────────────────
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.16, 0.3, 1.2);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

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
    const K = [0, 0.33, 0.66, 1];

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const time = clock.getElapsedTime();
      const p = clamp01(t);

      /**
       * روشن شدن.
       *
       * سه پله که هم‌پوشانی دارند و عمداً هم‌زمان نیستند: اول چراغ‌ها
       * می‌آیند (دستگاه بوت می‌شود)، بعد نورِ صحنه، و آخر رنگِ خودِ
       * پلاستیک. اگر هر سه با هم اتفاق بیفتند، به‌جای «روشن شدن»،
       * «فِید» دیده می‌شود.
       */
      const boot = clamp01(p / 0.16);
      const lit = clamp01((p - 0.08) / 0.26);
      const paint = clamp01((p - 0.14) / 0.32);

      body.color.copy(bodyOff).lerp(bodyOn, paint);
      trim.color.copy(trimOff).lerp(trimOn, paint);
      body.envMapIntensity = lerp(0.25, 1.15, lit);
      trim.envMapIntensity = lerp(0.2, 0.9, lit);
      metal.envMapIntensity = lerp(0.35, 1.5, lit);
      visor.envMapIntensity = lerp(0.5, 1.7, lit);

      // سوسوی کوتاهِ لحظهٔ بوت — بعدش ثابت
      const flicker = p < 0.1 ? 0.45 + 0.55 * Math.sin(time * 21) : 1;
      eyeMat.emissiveIntensity = lerp(0.02, 2.6, boot) * flicker;
      glowMat.emissiveIntensity = lerp(0.02, 2.2, boot) * flicker;
      stacheMat.emissiveIntensity = lerp(0.01, 0.28, boot) * flicker;
      stacheMat.envMapIntensity = lerp(0.3, 1.2, lit);
      screenMat.emissiveIntensity = lerp(0.01, 0.2, boot);
      faceGlow.intensity = lerp(0, 2.2, boot);

      ambient.intensity = lerp(0.06, 0.55, lit);
      key.intensity = lerp(0.12, 2.1, lit);
      fill.intensity = lerp(0.05, 0.5, lit);
      rim.intensity = lerp(0.3, 1.1, lit);
      blobMat.opacity = lerp(0.12, 0.4, lit);

      /**
       * جای ربات در قاب.
       *
       * در قابِ افقی، جسم به یک سمت می‌رود تا کنارش برای متن جا باز
       * شود. در قابِ عمودی این کار جواب نمی‌دهد: عرض آن‌قدر کم است
       * که جسم از کادر بیرون می‌زند و متن هم جا نمی‌شود. آنجا
       * به‌جای کنار رفتن، جسم بالا می‌رود و متن زیرش می‌نشیند —
       * همان چیدمانی که در CSS هم اعمال شده.
       */
      const portrait = camera.aspect < 0.92;

      rig.position.x = portrait ? 0 : stops(p, K, [0, 3.2 * flip, 2.7 * flip, 0]);
      rig.position.y = portrait
        ? stops(p, K, [-0.1, 1.5, 1.7, 0.4])
        : stops(p, K, [-1.4, -0.7, -0.5, -0.9]);
      // قابِ عمودی میدانِ دیدِ افقیِ کمتری دارد، پس دوربین باید عقب‌تر
      // بایستد تا همان جسم کامل در کادر بماند
      // نزدیک‌تر از قبل: در ایستِ اول جسم باید قابِ اول را پر کند،
      // نه اینکه وسطش شناور باشد
      camera.position.z = stops(p, K, [11.4, 13.2, 10.2, 14.5]) * (portrait ? 1.5 : 1);
      camera.position.y = stops(p, K, [0.5, 0.7, 1.1, 0.7]) + (portrait ? 0.6 : 0);
      camera.lookAt(rig.position.x, rig.position.y + 0.6, 0);
      blob.position.set(rig.position.x, rig.position.y - 2.0, 0.3);

      // چرخش — هر ایست یک وجهِ دیگر
      const spin = stops(p, K, [0, -0.62, 0.12, 0.5]);
      const drift = reduce ? 0 : Math.sin(time * 0.34) * 0.07;
      rig.rotation.y += (spin + drift + point.x * 0.18 - rig.rotation.y) * 0.06;
      rig.rotation.x += (point.y * 0.07 - rig.rotation.x) * 0.06;

      // شناوریِ خیلی کم — این ربات روی پایه می‌ایستد، پرواز نمی‌کند
      hero.group.position.y = reduce ? 0 : Math.sin(time * 0.6) * 0.025;

      if (!reduce) {
        // آنتن با تأخیر نسبت به بدنه تکان می‌خورد — همین تأخیر است
        // که به جسمِ صُلب حسِ وزن می‌دهد
        hero.antenna.rotation.z = -0.2 + Math.sin(time * 1.25) * 0.06;
        hero.arms.forEach((a, i) => {
          a.rotation.z = Math.sin(time * 0.85 + i * 2.1) * 0.07;
        });

        // چشمک — نادر و کوتاه، وگرنه به عصبی‌بودن می‌زند
        const blink = Math.max(0, 1 - Math.abs(((time % 5.4) - 5) * 9));
        hero.eyes.forEach((e) => e.scale.setScalar(1 - blink * 0.92));

        // سیبیل با چشمک کمی بالا می‌پرد. جزئیاتِ کوچکی که شخصیت
        // می‌سازد؛ بدون آن، نشانِ برند فقط یک برچسبِ ثابت است.
        hero.stache.position.y = hero.stache.userData.restY + blink * 0.035;
        glowMat.emissiveIntensity *= 1 + blink * 0.5;
      }

      composer.render();
    };
    tick();

    return () => {
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
  }, [progress, flip, bot]);

  return <div ref={host} className={className} aria-hidden="true" />;
}
