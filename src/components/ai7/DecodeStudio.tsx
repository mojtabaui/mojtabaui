"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { buildDecodeBot, type DecodeMaterials } from "./decodeBot";
import { bakeDecode } from "./studio";
import { blobTexture, orangePeelNormal, rng } from "./textures";
import {
  arrowBadge,
  crtSurface,
  decodeStrip,
  embossNormal,
  microPrint,
  smudgeRoughness,
  textGloss,
  warnLabel,
} from "./decodeTextures";

/**
 * صحنهٔ رباتِ نارنجی.
 *
 * از `RobotStudio` جدا نگه داشته شده و کپیِ آن نیست. آن صحنه برای
 * یک جسمِ کرم روی زمینهٔ کرم ساخته شده: نورِ کم، محیطِ سرد، و کلِ
 * کار روی لبه‌های ظریف. این یکی تقریباً در هر تصمیمی برعکس است —
 * محیطِ پُرنور، بازتابِ گرم، تضادِ بالا. یکی‌کردنشان در یک فایل،
 * یک کامپوننت با دو حالتِ کاملاً مجزا می‌ساخت که هیچ خطی را واقعاً
 * با هم شریک نیستند.
 *
 * سه چیز که کیفیتِ رندر را می‌سازند و در نسخهٔ قبل نبودند:
 *
 *   بدونِ زنجیرهٔ پست‌پروسس. نسخهٔ اول AO و بلوم و SMAA داشت و روی
 *   یک صفحهٔ اسکرول‌شونده کُند بود: هر کدام یک پاسِ تمام‌صفحهٔ اضافه
 *   در هر فریم است. حالا مستقیم رندر می‌شود و ضدِپله‌شدن را خودِ
 *   MSAA سخت‌افزاری انجام می‌دهد — که هم ارزان‌تر است و هم لبهٔ
 *   تمیزتری از SMAA می‌دهد. تابشِ صفحه هم به‌جای بلوم، یک صفحهٔ
 *   نورِ افزایشی است؛ یک draw call در برابرِ پنج پاسِ محو.
 *
 *   نقشهٔ زبری. زبریِ ثابت روی کلِ بدنه یعنی بازتاب همه‌جا یک‌شکل
 *   است. لکه‌های محوِ زبری، بازتاب را جایی تیز و جایی نرم می‌کند و
 *   همان است که سطح را از «جنسِ پیش‌فرضِ موتور» درمی‌آورد.
 *
 *   لاکِ رویی با نقشهٔ پوستِ‌پرتقال. پلاستیکِ رنگ‌شده دو لایه است:
 *   رنگ، و لاکِ شفافِ رویش. موجِ ریزِ لاک فقط بازتاب را می‌شکند و
 *   رنگِ زیرین را دست نمی‌زند — و همین دولایگی است که به سطح عمق
 *   می‌دهد.
 *
 * روشن‌شدن با اسکرول از نسخهٔ قبل می‌ماند، چون زمینهٔ خودِ صفحه هم
 * همان کار را می‌کند: ربات از تاریکی درمی‌آید و پلاستیکش رنگ
 * می‌گیرد. اینجا سرِ خاموشِ قوس، قهوه‌ایِ سوخته است نه خاکستری —
 * نارنجیِ بی‌نور به قهوه‌ای می‌رود، نه به زغالی.
 */

const ON = {
  orange: "#f28712",
  orangeDeep: "#c94e04",
  red: "#de2c08",
  redDeep: "#8f0104",
  cream: "#f4efe4",
  grey: "#bcb2a2",
  key: "#a89e8e",
  dark: "#332e29",
};

/** سرِ خاموشِ قوس — هر رنگ، بی‌نور */
const OFF = {
  orange: "#2b1608",
  orangeDeep: "#200f05",
  red: "#2a0803",
  redDeep: "#150301",
  cream: "#241f19",
  grey: "#1c1a18",
  key: "#171513",
  dark: "#0e0d0c",
};

/**
 * آنچه ربات روی صورتش تایپ می‌کند.
 *
 * این تنها جای صفحه است که خودِ *جسم* حرف می‌زند، و همان چیزی است
 * که یک شیءِ چرخان را به یک شخصیت تبدیل می‌کند. متن با اسکرول جلو
 * می‌رود و همان قوسِ صفحه را می‌گوید: گیر کرده‌ای، می‌فهمی،
 * می‌سازی، منتشر می‌کنی.
 *
 * لاتین می‌ماند چون شوخیِ خودِ مرجع است — یک خطِ فرمانِ داس. فارسی
 * روی ترمینال هم نمی‌نشیند: حروف به هم می‌چسبند و راست‌به‌چپ با
 * مسیرِ `c:\\...` می‌جنگد.
 */
const SCRIPT: { at: number; lines: string[] }[] = [
  { at: 0, lines: ["c:\\designer\\stuck>", "orange_colour"] },
  { at: 0.24, lines: ["c:\\designer\\stuck>", "why --before-how"] },
  { at: 0.5, lines: ["c:\\designer\\build>", "agent.run()"] },
  { at: 0.76, lines: ["c:\\designer\\ship>", "deploy --live"] },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** درون‌یابیِ چند ایست روی یک محور، با نرم‌شدنِ لبه‌ها */
function stops(t: number, keys: number[], values: number[]) {
  if (t <= keys[0]) return values[0];
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i]) {
      const k = (t - keys[i - 1]) / (keys[i] - keys[i - 1]);
      return lerp(values[i - 1], values[i], k * k * (3 - 2 * k));
    }
  }
  return values[values.length - 1];
}

export default function DecodeStudio({
  progress,
  flip = 1,
  className = "",
}: {
  progress: MotionValue<number>;
  /** ۱ وقتی چیدمان راست‌به‌چپ است — ربات به سمتِ مخالفِ متن می‌رود */
  flip?: number;
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
    // far کوچک عمدی است: AO عمق را از بافرِ عمق می‌خواند و بردِ
    // بزرگ، دقتِ آن بافر را در محدودهٔ جسم می‌خورد
    const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 60);

    /**
     * اگر WebGL در دسترس نباشد، صفحه نباید بیفتد.
     *
     * سازندهٔ رندرر در نبودِ کانتکست *پرتاب* می‌کند، و چون این کد
     * داخلِ useEffect است، آن استثنا کلِ درخت را می‌بَرد: کاربری که
     * شتاب‌دهندهٔ سخت‌افزاری‌اش خاموش است، به‌جای صفحه‌ای بدونِ ربات،
     * یک صفحهٔ سفید می‌بیند. متن و بقیهٔ صفحه هیچ ربطی به سه‌بعدی
     * ندارند و باید سرِ جایشان بمانند.
     */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    // سقفِ ۱٫۷۵ به‌جای ۲: روی نمایشگرِ رتینا اختلافِ دیده‌شدنی نیست،
    // ولی تعدادِ پیکسل‌های سایه‌زده‌شده حدودِ یک‌سوم کم می‌شود
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    /**
     * نقشهٔ سایه دستی به‌روز می‌شود، نه در هر فریم.
     *
     * هر به‌روزرسانیِ سایه یک رندرِ کاملِ دیگر از کلِ صحنه است. جسم
     * آرام می‌چرخد و سایه‌اش هم آرام عوض می‌شود؛ یک‌درمیانِ سه فریم
     * هیچ‌جا دیده نمی‌شود، ولی یک‌سومِ کارِ رندر را برمی‌دارد.
     */
    renderer.shadowMap.autoUpdate = false;
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      width: "100%",
      height: "100%",
      display: "block",
    });

    scene.environment = keep(bakeDecode(renderer));

    /* ── بافت‌ها ─────────────────────────────────────────────── */

    const peel = keep(orangePeelNormal());
    const smudge = keep(smudgeRoughness(148, 42));
    const crt = crtSurface();
    keep(crt.map);
    keep(crt.emissiveMap);

    const decals = {
      warn: keep(warnLabel("INPUT FAILED")),
      strip: keep(decodeStrip("DECODE")),
      arrow: keep(arrowBadge("↑")),
      micro: keep(microPrint()),
      ignoreGloss: keep(textGloss("IGNORE", 1024, 4.8)),
      ignore: keep(
        embossNormal(
          1024,
          (x, w, h) => {
            x.fillStyle = "#fff";
            x.font = '900 150px "Arial Black", Impact, sans-serif';
            x.textAlign = "center";
            x.textBaseline = "middle";
            const word = [..."IGNORE"];
            const widths = word.map((c) => x.measureText(c).width);
            const gap = 22;
            const total = widths.reduce((a, b) => a + b, 0) + gap * (word.length - 1);
            let px = w / 2 - total / 2;
            word.forEach((c, i) => {
              x.fillText(c, px + widths[i] / 2, h / 2);
              px += widths[i] + gap;
            });
          },
          { blur: 9, strength: 2.6, aspect: 4.8 },
        ),
      ),
    };

    /* ── متریال‌ها ───────────────────────────────────────────── */

    /**
     * پلاستیکِ رنگ‌شده — رنگ زیر، لاکِ شفاف رو.
     *
     * `clearcoat` جدا از زبریِ پایه است و همین جداییِ لایه‌هاست که
     * به سطح عمق می‌دهد: بازتابِ تیزِ لاک روی یک زیرلایهٔ نسبتاً
     * مات می‌نشیند. اگر همه را با یک زبریِ پایینِ واحد می‌ساختیم،
     * نتیجه پلاستیک نبود، شیشه بود.
     */
    /**
     * لاک کم است، و این عمدی است.
     *
     * لاکِ کامل روی وجهی که با دوربین زاویهٔ تند دارد، از فرنل
     * تقریباً یک آینهٔ تمام می‌سازد؛ آن وجه دیگر رنگِ خودش را نشان
     * نمی‌دهد و محیط را نشان می‌دهد — نتیجه‌اش وجهِ کناریِ سفید بود
     * به‌جای نارنجی. با لاکِ کم و زبریِ پایینِ خودِ رنگ، براقی
     * می‌ماند ولی *پهن* می‌شود، و رنگ زیرش می‌ماند.
     */
    const plastic = (hex: string, rough = 0.32, coat = 0.8) =>
      keep(
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(hex),
          roughness: rough,
          roughnessMap: smudge,
          metalness: 0,
          clearcoat: coat,
          clearcoatRoughness: 0.09,
          clearcoatNormalMap: peel,
          clearcoatNormalScale: new THREE.Vector2(0.19, 0.19),
          envMapIntensity: 1.15,
        }),
      );

    const orange = plastic(OFF.orange, 0.3, 0.85);
    const orangeDeep = plastic(OFF.orangeDeep, 0.36, 0.7);
    const red = plastic(OFF.red, 0.26, 0.9);
    const redDeep = plastic(OFF.redDeep, 0.46, 0.5);
    const cream = plastic(OFF.cream, 0.36, 0.6);
    const grey = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(OFF.grey),
        roughness: 0.5,
        roughnessMap: smudge,
        metalness: 0,
        envMapIntensity: 0.95,
      }),
    );

    /**
     * کلیدها — مات، و بدونِ لایهٔ لاک.
     *
     * دو دلیل، و هر دو مهم‌اند: کلیدِ براق به دکمهٔ اسباب‌بازی می‌زند
     * نه به صفحه‌کلید، و مهم‌تر اینکه صفحه‌کلید سطحِ بزرگی از قاب را
     * می‌گیرد. متریالِ بدونِ clearcoat شیدرِ سبک‌تری کامپایل می‌کند،
     * و روی سطحِ بزرگ همان اختلاف در نرخِ فریم دیده می‌شود.
     */
    const key = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(OFF.key),
        roughness: 0.62,
        roughnessMap: smudge,
        metalness: 0,
        envMapIntensity: 0.95,
      }),
    );

    const dark = keep(
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(OFF.dark),
        roughness: 0.44,
        metalness: 0,
        clearcoat: 0.6,
        clearcoatRoughness: 0.24,
        envMapIntensity: 1,
      }),
    );

    const metal = keep(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#b6b9bf"),
        roughness: 0.24,
        metalness: 1,
        envMapIntensity: 1.4,
      }),
    );

    const screenMat = keep(
      new THREE.MeshStandardMaterial({
        map: crt.map,
        emissiveMap: crt.emissiveMap,
        emissive: new THREE.Color("#bfeaf6"),
        emissiveIntensity: 0,
        color: new THREE.Color("#0c0c0c"),
        roughness: 0.66,
        metalness: 0,
        envMapIntensity: 0.14,
      }),
    );

    /**
     * شیشهٔ جلوی صفحه — تقریباً نامرئی، و عمداً.
     *
     * کارش فقط این است که سافت‌باکس را به شکلِ یک کشِ نوریِ منحنی
     * روی صفحه بیندازد. اگر شفافیتش را بالا ببریم، صفحه شیری
     * می‌شود و نوشته‌اش خوانده نمی‌شود.
     */
    const glass = keep(
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#0a0a0c"),
        roughness: 0.04,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        transparent: true,
        opacity: 0.13,
        ior: 1.5,
        envMapIntensity: 1.5,
        depthWrite: false,
      }),
    );

    const mats: DecodeMaterials = {
      orange,
      orangeDeep,
      red,
      redDeep,
      cream,
      screen: screenMat,
      glass,
      grey,
      key,
      dark,
      metal,
    };

    const hero = buildDecodeBot(mats, decals);
    const rig = new THREE.Group();
    rig.add(hero.group);
    scene.add(rig);

    // دو سرِ قوسِ رنگ — یک بار ساخته می‌شوند تا هر فریم شیءِ جدید
    // ساخته نشود
    const arc = (
      [
        [orange, OFF.orange, ON.orange],
        [orangeDeep, OFF.orangeDeep, ON.orangeDeep],
        [red, OFF.red, ON.red],
        [redDeep, OFF.redDeep, ON.redDeep],
        [cream, OFF.cream, ON.cream],
        [grey, OFF.grey, ON.grey],
        [key, OFF.key, ON.key],
        [dark, OFF.dark, ON.dark],
      ] as const
    ).map(([mat, a, b]) => ({
      mat: mat as THREE.MeshPhysicalMaterial,
      off: new THREE.Color(a),
      on: new THREE.Color(b),
    }));

    /* ── سایهٔ زمین ──────────────────────────────────────────── */

    const blobMat = keep(
      new THREE.MeshBasicMaterial({
        map: keep(blobTexture("rgba(58,36,24,")),
        transparent: true,
        depthWrite: false,
        opacity: 0.34,
      }),
    );
    const blob = new THREE.Mesh(keep(new THREE.PlaneGeometry(12, 12)), blobMat);
    blob.rotation.x = -Math.PI / 2;
    // بیرونِ rig: اگر با ربات بچرخد، از نیم‌رخ دیده می‌شود و به‌جای
    // سایه، یک هالهٔ روشن پشتِ او می‌سازد
    scene.add(blob);

    /* ── نورها ──────────────────────────────────────────────── */

    const ambient = new THREE.AmbientLight(0xffffff, 0.04);
    scene.add(ambient);

    /**
     * نورِ نیم‌کره — روشناییِ پایه، بدونِ بازتاب.
     *
     * تا اینجا کارِ پُرکردنِ سایه‌ها را محیطِ بازتاب می‌کرد، و همان
     * وجهِ کناری را سفید می‌کرد: محیط هم به سطح نور می‌دهد و هم در
     * آن *می‌افتد*، و در زاویهٔ تند دومی بر اولی می‌چربد. نورِ
     * نیم‌کره فقط پخشِ نور است — هیچ‌جا بازتاب نمی‌شود — پس می‌شود
     * صحنه را روشن نگه داشت و محیط را تیره، که یعنی رنگِ خودِ جسم
     * سرِ جایش می‌ماند و براقی فقط جایی می‌آید که واقعاً پرده‌ای
     * روبه‌رویش باشد.
     */
        // آسمانِ سرد و پُرقدرت، نارنجی را از پهلو به صورتی می‌بُرد.
    // نیم‌کرهٔ گرم، همان کارِ روشن‌کردن را می‌کند بی‌آنکه رنگ را
    // بشوید.
    const hemi = new THREE.HemisphereLight(0xefdcbe, 0xd8661a, 0);
    scene.add(hemi);

    /**
     * نورِ اصلی — تنها نوری که سایه می‌اندازد.
     *
     * چند نورِ سایه‌انداز، سایه‌های متقاطع می‌سازد و بلافاصله
     * «صحنهٔ آزمایشی» می‌خواند. عکسِ محصول همیشه یک منبعِ اصلی دارد
     * و بقیه فقط پُر می‌کنند.
     */
    const keyLight = new THREE.DirectionalLight(0xffeec4, 0.12);
    keyLight.position.set(-6, 11, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0009;
    keyLight.shadow.normalBias = 0.03;
    {
      const c = keyLight.shadow.camera;
      c.left = -8;
      c.right = 8;
      c.top = 10;
      c.bottom = -10;
      c.near = 1;
      c.far = 34;
      c.updateProjectionMatrix();
    }
    scene.add(keyLight);

    const fill = new THREE.DirectionalLight(0xe8ecf5, 0.04);
    fill.position.set(7, 1.5, 6);
    scene.add(fill);

    /** لبه — نارنجی روی زمینهٔ روشن بدونِ این خطِ جداکننده گم می‌شود */
    const rim = new THREE.DirectionalLight(0xfff0dd, 0.25);
    rim.position.set(2.5, 5, -8);
    scene.add(rim);

    /** تابشِ صفحه روی قابِ قرمز — همان چیزی که نور را «واقعی» می‌کند */
    const screenGlow = new THREE.PointLight(0x9fdcf0, 0, 6, 2);
    scene.add(screenGlow);

    /**
     * تابشِ صفحه — یک لکهٔ نورِ افزایشی، به‌جای بلوم.
     *
     * بلوم پنج پاسِ محو در هر فریم است، و تنها چیزی که اینجا از آن
     * می‌خواستیم هالهٔ نرمِ دورِ نوشتهٔ صفحه بود. یک صفحهٔ شفاف با
     * ترکیبِ افزایشی همان را با یک draw call می‌دهد و برخلافِ بلوم،
     * دقیقاً همان‌جا می‌ماند که باید.
     */
    const haloMat = keep(
      new THREE.MeshBasicMaterial({
        map: keep(blobTexture("rgba(140,214,238,")),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0,
      }),
    );
    const halo = new THREE.Mesh(keep(new THREE.PlaneGeometry(2.5, 2.2)), haloMat);
    halo.position.z = 0.14;
    halo.renderOrder = 3;
    hero.screen.add(halo);

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    /**
     * وقتی صحنه از قاب بیرون است، اصلاً رندر نمی‌شود.
     *
     * این صفحه چند برابرِ ارتفاعِ پنجره است و کاربر بیشترِ وقتش را
     * پایین‌ترِ صحنه، در حالِ خواندنِ متن، می‌گذراند. بدونِ این، کارتِ
     * گرافیک تمامِ آن مدت دارد چیزی را می‌کشد که هیچ‌کس نمی‌بیند —
     * و روی لپ‌تاپ یعنی فن، و اسکرولِ کند.
     */
    let onScreen = true;
    const io = new IntersectionObserver(
      ([e]) => {
        const was = onScreen;
        onScreen = e.isIntersecting;
        if (onScreen && !was) tick();
      },
      { rootMargin: "120px" },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.visibilityState === "visible" && onScreen) tick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const point = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      point.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      point.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    /* ── حلقهٔ رندر ─────────────────────────────────────────── */

    let t = progress.get();
    const stopWatch = progress.on("change", (v) => {
      t = v;
    });

    /**
     * حالتِ شخصیت.
     *
     * تا اینجا هر حرکتِ صحنه یک `Math.sin(time * k)` بود. سینوس
     * قابلِ پیش‌بینی است و مغز بعد از دو دور الگویش را می‌گیرد؛ از
     * آن لحظه جسم «متحرک» دیده می‌شود نه «زنده». چیزی که به حرکت
     * حسِ زندگی می‌دهد بی‌قاعدگی است: چشمکی که نمی‌دانی کِی می‌آید،
     * و تکانی که *دلیل* دارد.
     */
    const rand = rng(4231);
    let nextBlink = 2.2;
    let blinkEnd = -1;
    let nextTwitch = 5;
    let headY = 0;
    let headX = 0;
    let headPrev = 0;
    let antAngle = 0;
    let antVel = 0;
    let scriptIdx = -1;
    let typed = 0;
    let nextChar = 0;

    let raf = 0;
    let frame = 0;
    const timer = new THREE.Timer();
    const K = [0, 0.33, 0.66, 1];
    const headTarget = new THREE.Vector3();

    function tick() {
      if (!onScreen || document.visibilityState === "hidden") {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
      frame++;
      timer.update();
      const time = timer.getElapsed();
      const p = clamp01(t);

      /**
       * روشن‌شدن، در سه پلهٔ هم‌پوشان.
       *
       * اول صفحه بوت می‌شود، بعد نورِ صحنه می‌آید، و آخر رنگِ خودِ
       * پلاستیک برمی‌گردد. اگر هر سه با هم اتفاق بیفتند، به‌جای
       * «دستگاه روشن شد»، یک فِیدِ ساده دیده می‌شود.
       */
      const boot = clamp01(p / 0.15);
      const lit = clamp01((p - 0.07) / 0.26);
      const paint = clamp01((p - 0.13) / 0.32);

      for (const a of arc) {
        a.mat.color.copy(a.off).lerp(a.on, paint);
        a.mat.envMapIntensity = lerp(0.2, 1, lit);
      }
      key.envMapIntensity = lerp(0.18, 0.9, lit);
      metal.envMapIntensity = lerp(0.28, 1.2, lit);
      glass.envMapIntensity = lerp(0.35, 1.25, lit);

      // سوسوی کوتاهِ لحظهٔ بوت — بعدش ثابت
      const flicker = p < 0.09 ? 0.4 + 0.6 * Math.sin(time * 23) : 1;
      screenMat.emissiveIntensity = lerp(0.02, 1.35, boot) * flicker;
      screenGlow.intensity = lerp(0, 0.65, boot) * flicker;

      ambient.intensity = lerp(0.03, 0.12, lit);
      hemi.intensity = lerp(0, 0.5, lit);
      keyLight.intensity = lerp(0.1, 2.35, lit);
      fill.intensity = lerp(0.02, 0.18, lit);
      rim.intensity = lerp(0.2, 0.8, lit);
      blobMat.opacity = lerp(0.08, 0.32, lit);
      haloMat.opacity = lerp(0, 0.13, boot) * flicker;

      /**
       * جای ربات در قاب.
       *
       * در قابِ افقی، جسم به یک سمت می‌رود تا کنارش برای متن جا باز
       * شود. در قابِ عمودی عرض آن‌قدر کم است که این کار جسم را از
       * کادر بیرون می‌بَرد؛ آنجا به‌جای کنار رفتن، جسم بالا می‌رود و
       * متن زیرش می‌نشیند — همان چیدمانی که در CSS هم اعمال شده.
       */
      const portrait = camera.aspect < 0.92;

      /**
       * جسم همیشه وسطِ قاب می‌ماند.
       *
       * نسخهٔ قبل آن را کنار می‌بُرد تا یک طرف برای متن باز شود. حالا
       * متن خودش به دو ستونِ کناری شکسته شده و جسم محورِ ترکیب است؛
       * جابه‌جا کردنش دیگر آن قرینگی را خراب می‌کند.
       */
      rig.position.x = 0;
      rig.position.y = portrait
        ? stops(p, K, [-0.6, 0.6, 0.5, -0.4])
        : stops(p, K, [-1.4, -1.3, -0.6, -1.6]);
      camera.position.z = stops(p, K, [33, 27, 22, 26]) * (portrait ? 1.45 : 1);
      camera.position.y = stops(p, K, [0.9, 0.5, 2.1, 0.4]) + (portrait ? 0.7 : 0);
      // در ایستِ سوم دوربین به سر نگاه می‌کند نه به مرکزِ توده — همان
      // چیزی که آن ایست را از «نزدیک‌تر» به «نمای چهره» می‌بَرد
      headTarget.set(
        rig.position.x,
        rig.position.y + stops(p, K, [4.7, 3.2, 4.3, 1.6]),
        0,
      );
      camera.lookAt(headTarget);
      blob.position.set(rig.position.x, rig.position.y - 4.2, 0.4);
      screenGlow.position.set(rig.position.x, rig.position.y + 2.3, 2.6);

      // چرخش — هر ایست یک وجهِ دیگر. ایستِ اول کمی سه‌رخ است نه
      // کاملاً روبه‌رو: نمای روبه‌روی کامل، حجمِ جعبه را صاف می‌کند
      const spin = stops(p, K, [-0.34, -0.86, -0.2, 0.42]);
      const drift = reduce ? 0 : Math.sin(time * 0.3) * 0.06;
      rig.rotation.y += (spin + drift + point.x * 0.05 - rig.rotation.y) * 0.055;
      rig.rotation.x += (point.y * 0.02 - rig.rotation.x) * 0.055;

      let blinking = false;

      if (!reduce) {
        /**
         * سر به نشانگر نگاه می‌کند — نه کلِ بدن.
         *
         * قبلاً نشانگر کلِ صحنه را کج می‌کرد، که حرکتِ یک *دوربین*
         * است نه یک موجود. وقتی فقط سر برمی‌گردد و بدنه سرِ جایش
         * می‌ماند، بلافاصله «دارد نگاهم می‌کند» خوانده می‌شود. ضریبِ
         * دنبال‌کردن پایین است تا حرکت تنبل و سنگین بماند؛ سرِ سریع،
         * عصبی به‌نظر می‌رسد.
         */
        headY += (point.x * 0.52 - headY) * 0.045;
        headX += (point.y * 0.2 - headX) * 0.045;
        hero.head.rotation.y = headY;
        hero.head.rotation.x = headX;
        hero.head.position.y = 2.15 + Math.sin(time * 0.62) * 0.03;

        /**
         * آنتن فنر است، نه سینوس.
         *
         * انرژی‌اش را از حرکتِ خودِ سر می‌گیرد: وقتی سر می‌چرخد آنتن
         * عقب می‌ماند و بعد چند بار تاب می‌خورد تا بایستد. همین
         * وابستگیِ علت‌ومعلولی است که به جسمِ صُلب وزن می‌دهد — چیزی
         * که یک نوسانِ مستقل هرگز نمی‌سازد.
         */
        const dHead = headY - headPrev;
        headPrev = headY;
        antVel += -dHead * 11 - antAngle * 0.2;
        antVel *= 0.9;
        antAngle += antVel;
        hero.antenna.rotation.z = -0.1 + antAngle;

        // تیکِ گاه‌به‌گاه — یک تکانِ کوچک بی‌آنکه کسی چیزی کرده باشد
        if (time > nextTwitch) {
          antVel += 0.05;
          nextTwitch = time + 7 + rand() * 12;
        }

        // چشمک: کوتاه، و در فاصله‌های نامنظم
        if (time > nextBlink) {
          blinkEnd = time + 0.1;
          nextBlink = time + 2.6 + rand() * 5.6;
        }
        blinking = time < blinkEnd;

        hero.hands.forEach((h, i) => {
          h.rotation.x = Math.sin(time * 0.7 + i * 2.3) * 0.06;
        });

        /**
         * اشیاء شناور — هرکدام با فاز و دامنهٔ خودش.
         *
         * دامنه‌ها ریزند. حرکتِ درشت این‌ها را به «اشیاء معلق در
         * فضا» می‌بَرد؛ چیزی که می‌خواهیم «هنوز جا نیفتاده‌اند»
         * است، نه بی‌وزنی.
         */
        for (const f of hero.floaters) {
          f.obj.position.y = f.base.y + Math.sin(time * 0.55 + f.phase) * f.amp;
          f.obj.position.x = f.base.x + Math.cos(time * 0.4 + f.phase) * f.amp * 0.5;
          if (f.spin) f.obj.rotation.z += Math.sin(time * 0.45 + f.phase) * f.spin * 0.004;
        }
      }

      /**
       * تایپ‌شدنِ متنِ صفحه.
       *
       * متن یک‌باره ظاهر نمی‌شود؛ نویسه‌به‌نویسه می‌آید. تفاوتش با
       * ظاهرشدنِ ناگهانی این است که تایپ‌شدن *زمان* می‌برد، و هر
       * چیزی که زمان ببرد به‌نظر می‌رسد کسی دارد انجامش می‌دهد.
       */
      let want = 0;
      for (let i = 0; i < SCRIPT.length; i++) if (p >= SCRIPT[i].at) want = i;
      if (want !== scriptIdx) {
        scriptIdx = want;
        typed = 0;
        nextChar = time;
      }
      const full = SCRIPT[scriptIdx].lines;
      const totalChars = full.reduce((n, l) => n + l.length, 0);
      if (typed < totalChars && time >= nextChar) {
        typed++;
        nextChar = time + 0.038;
      }

      const shown: string[] = [];
      let left = typed;
      for (const l of full) {
        if (left <= 0) break;
        shown.push(l.slice(0, Math.min(l.length, left)));
        left -= l.length;
      }
      // مکان‌نما فقط وقتی دستگاه بیدار است، و در چشمک خاموش می‌ماند
      const caretOn = boot > 0.25 && !blinking && Math.floor(time * 1.9) % 2 === 0;
      crt.draw(shown, caretOn);

      // چشمک، روی خودِ نورِ صفحه هم می‌نشیند
      if (blinking) {
        screenMat.emissiveIntensity *= 0.2;
        screenGlow.intensity *= 0.2;
      }

      // سایه یک‌درمیانِ سه فریم
      renderer.shadowMap.needsUpdate = frame % 3 === 1;
      renderer.render(scene, camera);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      stopWatch();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.InstancedMesh) o.geometry.dispose();
      });
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [progress, flip]);

  return <div ref={host} className={className} aria-hidden="true" />;
}
