"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { buildNeoBot, type NeoMaterials } from "./neoBot";
import { carbonWeave, dotMatrix, shellSurface, sparkleRoughness, textLabel } from "./neoTextures";
import { buildNeoGuitar, type GuitarMaterials } from "./neoGuitar";
import { solveArm } from "./armIK";
import { createSceneAudio, type SceneAudio } from "./neoAudio";
import { RobotGlyph } from "./RobotFlat";

/**
 * صحنهٔ پیکرهٔ مشکی.
 *
 * مسئلهٔ این صحنه یک جمله است: **مشکیِ براق روی زمینهٔ مشکی**. و
 * جوابش تقریباً هیچ ربطی به نورپردازیِ معمول ندارد.
 *
 * یک جسمِ روشن را نورِ اصلی می‌سازد و نورِ لبه فقط جدایش می‌کند.
 * اینجا برعکس است: نورِ رو به جلو روی مشکی هیچ نمی‌کند — سطحِ
 * تیره‌ای که مستقیم نور بخورد، همان تیره می‌ماند و فقط کمی خاکستری
 * می‌شود. چیزی که یک جسمِ مشکی را روی زمینهٔ مشکی نشان می‌دهد فقط
 * و فقط **بازتاب** است: باریکه‌های روشنی که از دو طرف روی انحنای
 * لبه می‌لغزند و خطِ دورِ جسم را می‌کشند.
 *
 * پس بودجهٔ نور اینجا این‌طور خرج شده:
 *
 *   محیطِ PMREM، نه چراغ. دو صفحهٔ نورانیِ کشیده در چپ و راست که
 *   در سطحِ براق می‌افتند. این‌ها هستند که سیلوئت را می‌سازند. هر
 *   چیزی که در `neoEnvironment` است، فقط برای همین دو خط است.
 *
 *   دیوارِ *پشتِ دوربین* باید سیاه بماند. سطحِ آینه‌ای هرچه روبه‌رویش
 *   است را بازمی‌تاباند، و اگر پشتِ دوربین روشن باشد کلِ جسم یک
 *   لکهٔ خاکستریِ یک‌دست می‌شود. تقریباً همهٔ «چرا مشکی‌ام خاکستری
 *   شد» از همین یک صفحه می‌آید.
 *
 *   یک نورِ جهت‌دارِ کم‌جان از بالا-جلو، فقط برای سایه. سایه چیزی
 *   است که جسم را روی زمین می‌نشاند؛ برای روشنایی نیست و شدتش هم
 *   عمداً پایین است.
 *
 * نکتهٔ عملکردی: صفحه چند برابرِ ارتفاعِ پنجره است و کاربر بیشترِ
 * وقتش را پایین‌تر، در حالِ خواندنِ متن می‌گذراند. رندر وقتی صحنه
 * از قاب بیرون است متوقف می‌شود، وگرنه کارتِ گرافیک تمامِ آن مدت
 * چیزی را می‌کشد که هیچ‌کس نمی‌بیند.
 */

/** محیطِ بازتاب — دو باریکهٔ روشن، و باقیِ دنیا سیاه */
function neoEnvironment() {
  const scene = new THREE.Scene();

  const panel = (
    w: number,
    h: number,
    color: string,
    intensity: number,
    pos: [number, number, number],
    look: [number, number, number] = [0, 0, 0],
  ) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(intensity),
        side: THREE.DoubleSide,
      }),
    );
    mesh.position.set(...pos);
    mesh.lookAt(...look);
    scene.add(mesh);
  };

  // جعبهٔ تقریباً سیاه — زمینهٔ همهٔ بازتاب‌ها
  const shell = new THREE.Mesh(
    new THREE.BoxGeometry(40, 30, 40),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("#0a0a0d"), side: THREE.BackSide }),
  );
  scene.add(shell);

  /**
   * دو سافت‌باکسِ **خیلی بزرگ و خیلی نزدیک** — کلِ نورپردازی همین است.
   *
   * نسخهٔ قبل چراغ‌های کوچک و پُرشدت داشت و نتیجه‌اش لکه‌های سفیدِ
   * تختِ بریده بود: روی جسم می‌نشستند مثلِ برچسب، نه مثلِ نور. دلیلش
   * ساده است — **اندازهٔ چراغ، نرمیِ نور است**. چراغِ کوچک لبهٔ تیز
   * می‌دهد و چراغِ بزرگ، شیبِ نرمی که دورِ فرم می‌پیچد.
   *
   * پس اینجا هر دو غول‌پیکرند و شدتشان یک‌سوم شده. همان مقدار نور
   * می‌رسد، ولی از سطحِ خیلی بزرگ‌تری — که یعنی به‌جای یک وِجِ
   * تخت، یک گرادیانِ بلند که از روشن به سیاه می‌رود. این تفاوت،
   * تفاوتِ «رندر» و «عکس» است.
   *
   * چپ اصلی و سردتر، راست پُرکننده و گرم‌تر و خیلی ضعیف‌تر — نسبتِ
   * حدودِ ۳ به ۱، همان نسبتِ استودیوییِ معمول برای جسمِ براق.
   */
  panel(17, 22, "#e8f0ff", 2.7, [-9.6, 4.5, 3.2]);
  panel(13, 17, "#fff2e4", 0.95, [10.2, 3.4, 2.4]);
  /** سافت‌باکسِ بالا — تارکِ سر و بالای شانه‌ها */
  panel(15, 10, "#ffffff", 1.7, [0, 10.5, 1.2], [0, 0, 0]);

  /**
   * چراغِ رو به بالا، زیرِ صورت.
   *
   * در مرجع، زیرِ فک یک باریکهٔ روشن هست که چانه را از تاریکی
   * درمی‌آورد؛ بدونِ آن، نیمهٔ پایینیِ سر یک لکهٔ سیاه است و سر به
   * نصف بریده به‌نظر می‌رسد. باریک و نزدیک است تا فقط فک را بگیرد
   * و به سینه نریزد، و رو به *بالا* نگاه می‌کند نه به مرکزِ صحنه.
   */
  /*
   * باریک‌تر و کم‌جان‌تر از دورِ اول.
   *
   * نسخهٔ اول یک صفحهٔ پهن و پُرشدت بود و روی صورتِ آینه‌ای، یک لکهٔ
   * خاکستریِ بی‌شکل بازمی‌تاباند — به‌جای خطِ روشنِ زیرِ فک، یک
   * ماسکِ خاکستری. چراغِ فک باید *باریک* باشد تا بازتابش یک خط
   * بماند، نه یک سطح.
   */
  panel(1.5, 0.5, "#eaf1ff", 3.2, [-2.4, 0.2, 4.4], [-0.8, 4.6, 0]);

  /**
   * دو باریکهٔ **پشتِ** جسم — لبهٔ روشنِ سیلوئت.
   *
   * تنها جایی که چراغِ کوچک و پُرشدت درست است. اینها از پشت می‌تابند
   * و فقط روی لبهٔ بیرونیِ فرم می‌افتند، پس خطی می‌کشند که جسم را
   * از زمینهٔ سیاه جدا می‌کند. بدونِ اینها، مشکی روی مشکی یک لکه است
   * هرچقدر هم که جلویش نور باشد.
   */
  panel(2.4, 16, "#dceaff", 11, [-6.2, 3, -7.5], [0, 2, 0]);
  panel(1.8, 13, "#ffe6c8", 7, [6.6, 2.4, -6.8], [0, 2, 0]);

  /**
   * پردهٔ روبه‌رو (پشتِ دوربین) — خاکستریِ خیلی تیره، نه سیاهِ مطلق.
   *
   * این تنها چیزی است که وجه‌های *جلوییِ* جسم بازمی‌تابانند. سیاهِ
   * مطلق که باشد، سینه و ران یک لکهٔ بی‌فرمِ سیاه می‌شوند و فقط
   * لبه‌ها دیده می‌شوند — همان ظاهرِ «سیمِ روشن» که مشکلِ نسخهٔ قبل
   * بود. یک خاکستریِ بسیار کم‌جان، میان‌پردهٔ لازم را می‌دهد بی‌آنکه
   * مشکی را بشوید.
   *
   * حساس‌ترین عددِ کلِ این صحنه. بالاتر از ۰٫۲۵ و جسم از مشکی به
   * نقره‌ای می‌رود — همان چیزی که یک دور امتحان شد و غلط بود.
   */
  panel(34, 26, "#39404c", 0.19, [0, 2, 15]);
  /** کفِ کم‌جان — تا زیرِ فک و ران‌ها کاملاً سیاه نشوند */
  panel(16, 16, "#1a1c22", 0.5, [0, -8, 1], [0, 1, 0]);

  return scene;
}

function bakeNeo(renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const src = neoEnvironment();
  const tex = pmrem.fromScene(src, 0.02).texture;
  src.traverse((o) => {
    const m = o as THREE.Mesh;
    m.geometry?.dispose();
    (m.material as THREE.Material | undefined)?.dispose();
  });
  pmrem.dispose();
  return tex;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * ضربِ حرکتِ نواختن — فقط برای انیمیشن، چون آهنگی پخش نمی‌شود.
 * حدودِ ۱۰۴ ضرب در دقیقه، همان تمپوی راحتِ یک ریفِ ساده.
 */
const BEAT_PER_SEC = 104 / 60;

/**
 * جهتی که هر آرنج به سمتش می‌شکند.
 *
 * بیرون و کمی عقب — همان‌طور که آرنجِ آدم. اگر قطب رو به جلو باشد،
 * آرنج برعکس خم می‌شود و بیننده بی‌آنکه بداند چرا، می‌فهمد چیزی
 * غلط است.
 */
const POLE_L = new THREE.Vector3(-1, -0.32, -0.2).normalize();
const POLE_R = new THREE.Vector3(1, -0.32, -0.2).normalize();

export default function NeoStudio({
  progress,
  shift,
  chestText,
  muted,
  className,
}: {
  /** ۰ تا ۱ — پیشرفتِ اسکرول در صحنهٔ چسبیده */
  progress: MotionValue<number>;
  /**
   * پیکره با اسکرول به کدام طرف برود: ‎-۱ چپ، ‎+۱ راست.
   *
   * در قابِ اول وسط می‌ایستد چون خودش تنها چیزِ صحنه است. به‌محضِ
   * آمدنِ متن باید کنار برود، وگرنه متن رویش می‌افتد و هیچ‌کدام
   * خوانده نمی‌شوند. جهت از زبانِ صفحه می‌آید: متن سمتِ شروع
   * می‌نشیند، پیکره سمتِ پایان.
   */
  shift: 1 | -1;
  /** نوشتهٔ روی سینه، خط به خط — از صفحه می‌آید تا ترجمه یک‌جا بماند */
  chestText: readonly string[];
  /**
   * صدا خاموش باشد.
   *
   * صفحه‌ای که صدا می‌دهد و راهِ خاموش کردنش نیست، خصمانه است.
   * وضعیتِ کلید در خودِ صفحه نگه داشته می‌شود، نه اینجا.
   */
  muted: boolean;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  /**
   * صدا بیرونِ افکتِ صحنه زندگی می‌کند.
   *
   * اگر داخلش ساخته می‌شد، هر بار که یکی از پراپ‌ها عوض شود کلِ
   * صحنه — رندرر، محیط، مدل‌ها — از نو ساخته می‌شد و آهنگ از اول
   * شروع می‌کرد.
   */
  const audio = useRef<SceneAudio | null>(null);

  /** خاموش‌کردنِ کاملِ صدا موقعِ رفتن از صفحه */
  useEffect(() => {
    audio.current?.setMuted(muted);
  }, [muted]);

  useEffect(
    () => () => {
      audio.current?.dispose();
      audio.current = null;
    },
    [],
  );

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /**
     * گوشی، نه فقط «صفحهٔ باریک».
     *
     * همان صحنه‌ای که روی لپ‌تاپ روان است، روی یک گوشیِ میان‌رده
     * می‌تواند کانتکست را از دست بدهد و آن‌وقت کاربر یک قابِ سیاهِ
     * خالی می‌بیند، نه یک صحنهٔ کندتر. دو گران‌ترین چیز — تعدادِ
     * پیکسل و نقشهٔ سایه — روی گوشی پایین می‌آیند؛ بقیهٔ نورپردازی
     * دست‌نخورده می‌ماند چون همان است که جسم را مشکی نگه می‌دارد.
     */
    const small = window.matchMedia("(max-width: 820px)").matches;
    const disposables: { dispose(): void }[] = [];
    const keep = <T extends { dispose(): void }>(v: T) => (disposables.push(v), v);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.5, 60);

    /**
     * نبودِ WebGL نباید صفحه را ببرد.
     *
     * سازندهٔ رندرر در نبودِ کانتکست پرتاب می‌کند و چون اینجا داخلِ
     * `useEffect` است، آن استثنا کلِ درخت را می‌اندازد: کاربری که
     * شتاب‌دهنده‌اش خاموش است به‌جای صفحه‌ای بدونِ پیکره، یک صفحهٔ
     * سفید می‌بیند. تیتر و بقیهٔ صفحه هیچ ربطی به سه‌بعدی ندارند.
     */
    /**
     * دو تلاش، نه یکی.
     *
     * سافاریِ آی‌فون سخت‌گیرترین جایی است که این صحنه اجرا می‌شود و
     * وقتی نتواند کانتکست بدهد چیزی نمی‌گوید — فقط یک کانواسِ خالی
     * می‌ماند. گران‌ترین درخواستِ ما هم `antialias` است: روی iOS یک
     * بافرِ چندنمونه‌ایِ جدا می‌خواهد و همان اولین چیزی است که رد
     * می‌شود.
     *
     * پس روی صفحهٔ کوچک اصلاً درخواستش نمی‌کنیم، و اگر باز هم نشد،
     * یک بار دیگر با کمینه‌ترین تنظیمات. لبهٔ کمی دندانه‌دار،
     * بی‌نهایت بهتر از نبودنِ پیکره است.
     */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer(
        small
          ? { antialias: false, alpha: true }
          : { antialias: true, alpha: true, powerPreference: "high-performance" },
      );
    } catch {
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true });
      } catch {
        el.dataset.scene = "down";
        return;
      }
    }
    /*
      ۱٫۵ روی گوشی.

      دورِ اول ۱٫۲ گذاشته شد و افتش دیده می‌شد — روی جسمِ براق لبه‌ها
      پله‌پله شدند. ۱٫۵ هنوز نزدیکِ نصفِ مساحتِ ۱٫۷۵ است ولی لبه‌ها
      سرِ جایشان می‌مانند، و حالا که ضدِ دندانه روی گوشی خاموش است،
      همین چگالیِ بیشتر جایش را می‌گیرد.
    */
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    /**
     * AgX، نه Neutral.
     *
     * Neutral هرچه از یک بریزد را می‌بُرد، و روی سطحِ براق یعنی
     * لکه‌های سفیدِ تخت با لبهٔ کاغذی — همان چیزی که رندر را «سه‌بعدیِ
     * آماتور» نشان می‌دهد. AgX رول‌آفِ بلندِ فیلمی دارد: هستهٔ
     * بازتاب روشن می‌ماند ولی تا سیاه یک شیبِ طولانی طی می‌کند، و
     * سیاه هم سیاه می‌ماند (برخلافِ ACES که خاکستریِ کرم‌رنگ می‌دهد).
     *
     * چون AgX کل تصویر را تیره‌تر می‌کند، نوردهی بالا رفته.
     */
    renderer.toneMapping = THREE.AgXToneMapping;
    renderer.toneMappingExposure = 1.12;
    /*
      سایه روی گوشی هم روشن می‌ماند، ولی با نقشهٔ یک‌چهارم و
      به‌روزرسانیِ نصف.

      خاموش‌کردنش امتحان شد و پیکره روی زمین شناور شد — سایه تنها
      چیزی است که می‌گوید جسم *ایستاده*، نه چسبیده به پس‌زمینه.
      گرانیِ سایه هم بیشتر از اندازهٔ نقشه می‌آید تا از وجودش: ۱۰۲۴
      به‌جای ۲۰۴۸ یعنی یک‌چهارمِ پیکسل، و در این فاصله لبهٔ سایه
      آن‌قدر نرم هست که تفاوتش دیده نشود.
    */
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    /** سایه دستی به‌روز می‌شود: هر به‌روزرسانی یک رندرِ کاملِ دیگر است */
    renderer.shadowMap.autoUpdate = false;
    /**
     * گم‌شدنِ کانتکست باید *دیده* شود.
     *
     * وقتی مرورگر بافرِ WebGL را پس می‌گیرد — کمبودِ حافظه روی گوشی،
     * یا رفتن به تبِ دیگر و برگشتن — کانواس بی‌سروصدا خالی می‌ماند و
     * کاربر یک هیروِ سیاهِ بی‌جسم می‌بیند و فکر می‌کند صفحه خراب است.
     * این پرچم همان حالت را به CSS می‌گوید تا جایگزینِ ثابت بنشیند.
     *
     * `preventDefault` لازم است وگرنه مرورگر هیچ‌وقت رویدادِ بازیابی
     * را نمی‌فرستد.
     */
    renderer.domElement.addEventListener("webglcontextcreationerror", () => {
      el.dataset.scene = "down";
    });
    renderer.domElement.addEventListener("webglcontextlost", (ev) => {
      ev.preventDefault();
      el.dataset.scene = "down";
    });
    renderer.domElement.addEventListener("webglcontextrestored", () => {
      delete el.dataset.scene;
    });
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      width: "100%",
      height: "100%",
      display: "block",
    });

    scene.environment = keep(bakeNeo(renderer));

    /* ── مواد ───────────────────────────────────────────────── */

    /**
     * بدنه: **آینهٔ مشکی**، نه پلاستیکِ براق.
     *
     * نسخهٔ اول زبریِ ۰٫۱۹ داشت و سطحی می‌ساخت که نور را *پخش*
     * می‌کند: لکه‌های نرمِ خاکستری روی مشکی. در مرجع هیچ خاکستریِ
     * میانی‌ای وجود ندارد — یا سیاهِ عمیق است، یا یک وِجِ روشن با
     * لبهٔ تیز. آن لبهٔ تیز فقط از زبریِ نزدیک به صفر درمی‌آید.
     *
     * فلزی‌بودن هم پایین آمد. فلزِ زیاد بازتاب را به رنگِ خودِ سطح
     * می‌بَرد، و روی مشکی یعنی بازتابِ مشکی، یعنی هیچ. دی‌الکتریکِ
     * تیره با لاکِ آینه‌ای، بازتابِ سفید می‌دهد — همان وِج‌های روشن.
     */
    /**
     * درخششِ نقره‌ای از **نقشهٔ زبری** می‌آید، نه از روشن‌کردنِ رنگ.
     *
     * راهِ ساده این بود که رنگِ بدنه را خاکستری کنیم؛ ولی آن‌وقت
     * مشکیِ صحنه از بین می‌رفت. با نقشهٔ زبری، رنگ همان مشکی می‌ماند
     * و فقط *بازتاب* نقطه‌نقطه تیز می‌شود — یعنی جسم وقتی می‌چرخد
     * جرقه می‌زند ولی در سکون هنوز سیاه است. همان رفتارِ رنگِ متالیک.
     *
     * لایهٔ تداخلی (`iridescence`) در زاویه‌های مایل یک رنگین‌کمانِ
     * خیلی کم‌رنگ روی لبه‌ها می‌گذارد — همان چیزی که سطحِ فلزیِ
     * گران‌قیمت را از پلاستیکِ مشکی جدا می‌کند.
     */
    /**
     * سطحِ بدنه.
     *
     * تا اینجا یک اشتباهِ ساده کلِ بافت را بی‌اثر کرده بود:
     * `roughness` روی ۰٫۱۴ بود و `roughnessMap` هم حولِ ۰٫۱۵ —
     * و در `three` این دو در هم **ضرب** می‌شوند. یعنی زبریِ واقعیِ
     * سطح حدودِ ۰٫۰۲ بود: آینه. هر بافتی که می‌ساختیم، در آن آینه
     * گم می‌شد.
     *
     * حالا پایه ۱ است و تمامِ زبری از نقشه می‌آید.
     *
     * دامنه‌اش اما عمداً باریک و پایین است. اولین تلاش ۰٫۱۲ تا ۰٫۵
     * بود و نتیجه‌اش بدنه‌ای شد که *روشن‌تر* از قبل به نظر می‌رسید،
     * نه تیره‌تر: سطحِ زبر بازتابِ نرم‌افزارهای بزرگِ نور را پخش
     * می‌کند و کلِ سینه را خاکستری می‌کند، در حالی که سطحِ صیقلی
     * همان نور را در یک لکهٔ کوچک جمع می‌کند و بقیه سیاه می‌ماند.
     *
     * مرجع سیاهِ عمیق است، پس دامنه ۰٫۰۲ تا ۰٫۱۱ ماند — بافت از
     * نرمال می‌آید و از تیزیِ لبهٔ همان لکه، نه از کدرکردنِ سطح.
     */
    const shellTex = shellSurface({
      /*
        روی گوشی نصف.

        سه بافتِ ۱۰۲۴ روی حافظهٔ ویدیو حدودِ ۱۶ مگابایت می‌گیرند و
        روی آی‌فون همین‌هاست که کانتکست را از پا درمی‌آورد. ۵۱۲ یک
        چهارمِ آن است و در این اندازه‌ی نمایش، تفاوتش دیده نمی‌شود.
      */
      size: small ? 512 : 1024,
      cells: 58,
      depth: 1.0,
      base: 0.02,
      rough: 0.11,
      seed: 7,
    });
    /*
      قطعه‌ها باید بزرگ باشند.

      تکرارِ ۳ روی یک سینه یعنی شش صفحه در عرض — شبکه‌ای که به کاشی
      می‌زند. ۱٫۶ همان چند قطعهٔ بزرگی را می‌دهد که در مرجع هست.
    */
    for (const t of [shellTex.normalMap, shellTex.roughnessMap, shellTex.aoMap]) {
      t.repeat.set(1.6, 1.6);
    }
    keep(shellTex.normalMap);
    keep(shellTex.roughnessMap);
    keep(shellTex.aoMap);
    /*
      سایهٔ محیطی روی همان UVِ اول می‌نشیند.

      پیش‌فرضِ `three` برای `aoMap` مجموعهٔ دومِ UV است و این
      هندسه‌ها — کره، کپسول، اکسترود — فقط یکی دارند. بدونِ این خط،
      نقشه بی‌صدا نادیده گرفته می‌شود.
    */
    shellTex.aoMap.channel = 0;

    const shell = keep(
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#08080b"),
        metalness: 0.38,
        /** پایه ۱: تمامِ زبری از نقشه می‌آید، نه از این عدد */
        roughness: 1,
        roughnessMap: shellTex.roughnessMap,
        normalMap: shellTex.normalMap,
        normalScale: new THREE.Vector2(0.26, 0.26),
        aoMap: shellTex.aoMap,
        aoMapIntensity: 0.34,
        /**
         * لاک کامل می‌ماند، ولی **بافت‌دار**.
         *
         * نصف‌کردنِ لاک امتحان شد و نتیجه‌اش بدنه‌ای بود که از فاصله
         * یک لکهٔ مشکیِ تخت با یک خطِ نور دورش می‌شد. دلیلش این است
         * که در این صحنه تمامِ حجمِ جسم از بازتابِ محیط می‌آید؛ سطحِ
         * مات، بازتاب ندارد، پس حجم هم ندارد.
         *
         * راهِ درست این نیست که آینه را کدر کنیم، این است که آینه
         * خودش سطح داشته باشد: `clearcoatNormalMap` همان بافتِ بدنه
         * را به لایهٔ براق هم می‌دهد. نتیجه‌اش بازتابی است که روی
         * تار و پودِ سطح می‌شکند — همان چیزی که در مرجع می‌بینی.
         */
        clearcoat: 1,
        clearcoatRoughness: 0.055,
        clearcoatNormalMap: shellTex.normalMap,
        clearcoatNormalScale: new THREE.Vector2(0.3, 0.3),
        iridescence: 0.2,
        iridescenceIOR: 1.9,
        iridescenceThicknessRange: [120, 460],
        reflectivity: 1,
        envMapIntensity: 1.55,
      }),
    );

    /**
     * مفصل‌ها — همان سطح، ولی ماشین‌کاری‌شده نه بافته‌شده.
     *
     * منفذها خاموش‌اند و تکرار بیشتر: قطعهٔ فلزیِ کوچک، نه پوسته.
     */
    const jointTex = shellSurface({
      size: small ? 256 : 512,
      cells: 36,
      depth: 1.15,
      base: 0.08,
      rough: 0.24,
      perf: false,
      seed: 77,
    });
    for (const t of [jointTex.normalMap, jointTex.roughnessMap, jointTex.aoMap]) {
      t.repeat.set(7, 7);
      keep(t);
    }
    jointTex.aoMap.channel = 0;

    const joint = keep(
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#101014"),
        metalness: 0.8,
        roughness: 1,
        roughnessMap: jointTex.roughnessMap,
        normalMap: jointTex.normalMap,
        normalScale: new THREE.Vector2(0.42, 0.42),
        aoMap: jointTex.aoMap,
        aoMapIntensity: 0.7,
        envMapIntensity: 1.25,
      }),
    );

    /**
     * نقاب — تنها سطحِ آینه‌ایِ کلِ پیکره.
     *
     * در مرجع، بدنه مات است و صورت **خیس**: یک صفحهٔ مشکیِ براق که
     * نورِ صحنه را تیز برمی‌گرداند و چشم‌ها از داخلش می‌تابند. همین
     * تضاد است که سر را از یک توپِ مشکی جدا می‌کند.
     *
     * نه بافت دارد نه زبری: هر لکهٔ ریزی روی نقاب، شیشه را به
     * پلاستیکِ خش‌دار تبدیل می‌کند.
     */
    const visor = keep(
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#050508"),
        metalness: 0.1,
        roughness: 0.035,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        iridescence: 0.45,
        iridescenceIOR: 2.2,
        iridescenceThicknessRange: [180, 620],
        reflectivity: 1,
        envMapIntensity: 2.1,
      }),
    );

    /**
     * چشم‌ها — تنها سطحِ روشنِ کلِ پیکره.
     *
     * `toneMapped: false` یعنی تُن‌مپینگِ رندرر رویشان اثر نگذارد؛
     * وگرنه سفیدِ LED به خاکستری می‌رود و شبکهٔ نقطه‌ای محو می‌شود —
     * و کلِ کارِ این دو لکه همین است که *تیز* باشند.
     */
    const eyeTex = keep(dotMatrix({ cols: 8, rows: 5, fill: 0.5, dropout: 0.04, seed: 23 }));
    const eye = keep(
      new THREE.MeshBasicMaterial({
        map: eyeTex,
        transparent: true,
        color: new THREE.Color("#ffffff"),
        toneMapped: false,
        depthWrite: false,
      }),
    );

    /**
     * نوشتهٔ سینه — کم‌نورتر از چشم‌ها.
     *
     * اگر هم‌روشناییِ چشم‌ها باشد، با آن‌ها رقابت می‌کند و صورت را
     * از مرکزِ توجه بیرون می‌اندازد. اینجا فقط باید *خوانده* شود.
     */
    const labelTex = keep(textLabel([...chestText]));
    const label = keep(
      new THREE.MeshBasicMaterial({
        map: labelTex,
        transparent: true,
        opacity: 0.96,
        color: new THREE.Color("#f2efe9"),
        toneMapped: false,
        depthWrite: false,
      }),
    );

    const mats: NeoMaterials = { shell, joint, eye, label, visor };
    const bot = buildNeoBot(mats);
    scene.add(bot.group);

    /* ── گیتار ──────────────────────────────────────────────── */

    /**
     * تنها جسمِ رنگیِ صحنه.
     *
     * قرمزش اشباع و تیره است، نه قرمزِ روشن: روی زمینهٔ سیاه، قرمزِ
     * روشن می‌درخشد و لبه‌هایش در بلوم می‌سوزد. قرمزِ عمیق با لاکِ
     * براق، همان رنگی است که فقط *جایی* که نور می‌خورد روشن می‌شود
     * — و همان تکه‌های روشن، فرمِ بدنه را می‌کشند.
     */
    const gMats: GuitarMaterials = {
      /**
       * بدنه از **همان جنسِ پیکره** است: مشکیِ متالیکِ جرقه‌دار.
       *
       * دو دور قبل قرمز بود و نگاه را می‌دزدید؛ بعد سفید شد و
       * روشن‌ترین چیزِ قاب — که همان مشکل را از سرِ دیگر داشت: چشم
       * به‌جای صورتِ نوازنده، روی سازِ سفید می‌نشست.
       *
       * حالا ساز و نوازنده یک خانواده‌اند و تفاوتشان فقط در *درجه*
       * است، نه در نوع: بدنهٔ ساز کمی روشن‌تر و فلزی‌تر، تا از تنه
       * جدا بشود ولی از آن بیرون نزند. همان نقشهٔ جرقهٔ بدنه را هم
       * می‌گیرد، با بذر و تکرارِ دیگر تا الگویشان یکی نیفتد.
       */
      red: keep(
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#17171b"),
          metalness: 0.62,
          roughness: 0.17,
          roughnessMap: keep(
            sparkleRoughness({ base: 0.17, spread: 0.1, flecks: 0.06, seed: 41 }),
          ),
          clearcoat: 1,
          clearcoatRoughness: 0.04,
          iridescence: 0.26,
          iridescenceIOR: 1.85,
          iridescenceThicknessRange: [140, 500],
          envMapIntensity: 1.6,
        }),
      ),
      dark: keep(
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#0b0b0d"),
          metalness: 0.35,
          roughness: 0.22,
          envMapIntensity: 1.1,
        }),
      ),
      chrome: keep(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#cfd3d8"),
          metalness: 1,
          roughness: 0.14,
          envMapIntensity: 1.5,
        }),
      ),
      board: keep(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#241713"),
          metalness: 0.05,
          roughness: 0.55,
          envMapIntensity: 0.6,
        }),
      ),
      /**
       * دسته از جنسِ **چوب** است، نه هم‌رنگِ بدنه.
       *
       * وقتی دسته و بدنه یک ماده داشتند، ساز یک قطعهٔ یک‌پارچهٔ سفید
       * می‌شد و از دور به گیتار نمی‌خورد. گیتارِ واقعی سه جنسِ کاملاً
       * متفاوت کنارِ هم دارد — رنگِ لاکی، چوبِ مات، و کرومِ براق — و
       * همان کنارِ هم بودنشان است که شناسایی‌اش می‌کند. زبریِ بالا و
       * فلزیِ صفر، چوب را از پلاستیک جدا نگه می‌دارد.
       */
      wood: keep(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#c69a5e"),
          metalness: 0,
          roughness: 0.62,
          envMapIntensity: 0.7,
        }),
      ),
    };

    const guitar = buildNeoGuitar(gMats);
    /**
     * روی بالاتنه سوار می‌شود، نه روی صحنه.
     *
     * ساز باید با نفس و تابِ بدن حرکت کند، وگرنه بدن می‌جنبد و
     * گیتار سرِ جایش میخ‌کوب می‌ماند — و همان یک ناهماهنگی، کلِ
     * نواختن را ساختگی نشان می‌دهد.
     *
     * وضعیت: بدنه روی لگنِ سمتِ راستِ نوازنده (چپِ بیننده)، دسته
     * رو به بالا و سمتِ دیگر. همان زاویهٔ حدودِ ۲۵ درجه که هر
     * نوازندهٔ راست‌دست می‌گیرد.
     */
    guitar.group.position.set(-0.5, 0.95, 1.12);
    guitar.group.rotation.set(0.1, 0.56, 0.5);
    guitar.group.scale.setScalar(0.68);
    guitar.group.visible = false;
    bot.torso.add(guitar.group);

    /* ── چراغ‌ها ────────────────────────────────────────────── */

    /**
     * محیط کارِ دیدن را کرده؛ این‌ها فقط سایه و کمی تفکیک می‌دهند.
     * شدت‌ها عمداً پایین‌اند: نورِ مستقیمِ زیاد روی سطحِ براق، همان
     * خطوطِ تمیزِ بازتاب را با یک لکهٔ پخشِ روشن خراب می‌کند.
     */
    const key = new THREE.DirectionalLight(0xffffff, 0.5);
    key.position.set(-3.4, 7.2, 5.2);
    key.castShadow = true;
    key.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 22;
    key.shadow.camera.left = -3.2;
    key.shadow.camera.right = 3.2;
    key.shadow.camera.top = 5;
    key.shadow.camera.bottom = -4;
    key.shadow.bias = -0.0012;
    key.shadow.normalBias = 0.02;
    scene.add(key);

    /** لبهٔ سردِ پشتِ شانهٔ چپ — همان خطی که شانه را از سیاهی درمی‌آورد */
    const rim = new THREE.DirectionalLight(0xcfe0ff, 0.8);
    rim.position.set(-6.5, 3.5, -4.5);
    scene.add(rim);

    /** لبهٔ گرمِ سمتِ راست، ضعیف‌تر — تا دو طرف قرینه نخوانند */
    const rimWarm = new THREE.DirectionalLight(0xffd9b0, 0.45);

    rimWarm.position.set(6.2, 2.4, -3.8);
    scene.add(rimWarm);

    /**
     * چراغِ صحنه — قرمز، از پایین، و فقط روی ضربِ اولِ هر میزان.
     *
     * از پایین می‌تابد چون نورِ رنگیِ پایینی امضای نورِ صحنهٔ اجراست؛
     * از بالا که بیاید، فقط رنگِ کلیدِ صحنه عوض می‌شود و چیزی
     * نمی‌گوید. شدتش در حالتِ عادی صفر است، پس تا وقتی گیتار نیامده
     * انگار وجود ندارد.
     */
    const stage = new THREE.PointLight(0xff2a18, 0, 9, 2.4);
    stage.position.set(-0.9, -0.4, 2.2);
    scene.add(stage);

    /** پُرکنندهٔ بسیار کم — فقط تا زیرِ فک کاملاً سیاه نشود */
    scene.add(new THREE.HemisphereLight(0x181c24, 0x0a0806, 0.22));

    /**
     * زمینِ نامرئی که فقط سایه می‌گیرد.
     *
     * صفحه‌ای که خودش رنگ داشته باشد، روی زمینهٔ مشکیِ صفحه یک
     * مستطیلِ کمی متفاوت می‌سازد که لبه‌اش دیده می‌شود. مادهٔ
     * سایه‌گیر فقط تیرگیِ سایه را می‌کشد و باقیِ صفحه شفاف می‌ماند.
     */
    const floorMat = keep(new THREE.ShadowMaterial({ opacity: 0.5 }));
    const floorGeo = keep(new THREE.PlaneGeometry(26, 26));
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.42;
    floor.receiveShadow = true;
    scene.add(floor);

    /* ── اندازهٔ قاب ────────────────────────────────────────── */

    /**
     * قاب‌بندی با عرض عوض می‌شود، نه فقط مقیاس.
     *
     * روی موبایل پیکره باید کوچک‌تر و بالاتر بنشیند تا زیرِ تیتر جا
     * شود؛ روی دسکتاپ می‌تواند بزرگ باشد و تیتر را از وسط بشکند —
     * که اصلِ همین ترکیب‌بندی است.
     */
    let dist = 13;
    let wide = true;
    let baseScale = 1;
    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // قابِ باریک، جسم را دورتر می‌خواهد وگرنه از دو طرف بریده می‌شود
      wide = w >= 860;
      dist = w < 640 ? 17.5 : w < 1024 ? 15.5 : 14.2;
      baseScale = w < 640 ? 0.92 : 1;
      camera.updateProjectionMatrix();
      renderer.shadowMap.needsUpdate = true;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    /* ── رندر فقط وقتی دیده می‌شود ──────────────────────────── */

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

    /* ── حلقه ───────────────────────────────────────────────── */

    let t = progress.get();

    audio.current ??= createSceneAudio("/guitar_sound.mp3");
    const sound = audio.current;
    sound.setMuted(muted);

    /**
     * آهنگ **یک بار** پخش می‌شود، و دقیقاً وقتی ساز به دست می‌آید.
     *
     * نه موقعِ باز شدنِ صفحه (که آن را می‌بندد) و نه با اولین تکانِ
     * اسکرول. لحظه‌اش همان‌جایی است که پیکره ساز را برمی‌دارد، تا
     * صدا و تصویر یک اتفاق باشند نه دو تا.
     *
     * (مرورگر اسکرول را «تعامل» حساب نمی‌کند و اولین `play` معمولاً
     * رد می‌شود؛ خودِ ماژولِ صدا آن را می‌گیرد و تا اولین کلیک یا
     * کلید صبر می‌کند.)
     */
    const stopWatch = progress.on("change", (v) => {
      // همان لحظه‌ای که ساز به دست می‌آید — نه زودتر، و فقط یک بار
      if (!reduce && v >= 0.18) sound.play();
      t = v;
    });

    /** بردارهای کاری — ساختنِ Vector3 در هر فریم، زباله تولید می‌کند */
    const strumTarget = new THREE.Vector3();
    const fretTarget = new THREE.Vector3();
    /** جای کفِ دست وقتی بازو کنارِ بدن آویزان است — سرِ دیگرِ سفر */
    const restL = new THREE.Vector3();
    const restR = new THREE.Vector3();
    /** بازوی تقریباً صاف؛ کمی کمتر از مجموع، تا آرنج قفل نشود */
    const reach = (bot.bones.upper + bot.bones.fore) * 0.97;

    let raf = 0;
    let frame = 0;
    const timer = new THREE.Timer();

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
       * چیزی که با اسکرول عوض می‌شود.
       *
       * سه حرکتِ هم‌زمان و کند، نه یک حرکتِ بزرگ: دوربین کمی پایین
       * می‌آید و نزدیک می‌شود، پیکره آرام می‌چرخد تا از سه‌رخ دیده
       * شود، و نگاهِ دوربین از سینه به سمتِ سر بالا می‌رود. با هم،
       * حس می‌دهند که دورِ جسم می‌چرخی — نه اینکه جسم دارد تکان
       * می‌خورد.
       */
      const ease = p * p * (3 - 2 * p);
      camera.position.set(
        Math.sin(ease * 0.62) * dist * 0.42,
        1.95 + ease * 0.55,
        Math.cos(ease * 0.62) * dist,
      );
      camera.lookAt(0, 1.55 - ease * 0.12, 0);

      // چرخشِ خودِ پیکره، در جهتِ مخالفِ دوربین و کندتر — تا صورت
      // زیادی زود از قاب بیرون نرود
      bot.group.rotation.y = -ease * 0.34;

      /**
       * کنار رفتن، تا متن جا باز کند.
       *
       * قابِ اول مالِ پیکره است و وسط می‌ایستد. از لحظه‌ای که پردهٔ
       * اول می‌آید (p ≈ ۰٫۲۲) باید کنار رفته باشد، پس جابه‌جایی کمی
       * زودتر تمام می‌شود. روی قابِ باریک اصلاً جابه‌جا نمی‌شود —
       * آنجا متن *زیرِ* پیکره می‌نشیند نه کنارش، و بردنِ جسم به یک
       * گوشه فقط نصفش را از کادر بیرون می‌اندازد.
       */
      const side = THREE.MathUtils.clamp((p - 0.08) / 0.12, 0, 1);
      const slide = side * side * (3 - 2 * side);
      bot.group.position.x = wide ? shift * slide * 2.35 : 0;
      // هم‌زمان کمی عقب می‌رود: جسمِ کنارِ متن نباید هم‌وزنِ آن باشد
      const back = 1 - slide * (wide ? 0.12 : 0.16);
      bot.group.scale.setScalar(baseScale * back);

      /**
       * نفس.
       *
       * تنها حرکتِ مستقل از اسکرول، و عمداً خیلی کم: بالاتنه کمی
       * بالا و پایین می‌رود، سر با تأخیر دنبالش می‌آید. جسمی که
       * کاملاً بی‌حرکت باشد مجسمه است؛ همین چند صدمِ واحد کافی است
       * که زنده به‌نظر برسد. در حالتِ کاهشِ حرکت، هیچ.
       */
      if (!reduce) {
        const breath = Math.sin(time * 0.85);
        bot.torso.position.y = breath * 0.022;
        bot.torso.rotation.x = breath * 0.006;
        bot.head.rotation.x = Math.sin(time * 0.85 - 0.5) * 0.012;
        bot.arms[0].rotation.z = -0.075 + Math.sin(time * 0.7) * 0.008;
        bot.arms[1].rotation.z = 0.075 - Math.sin(time * 0.7 + 0.4) * 0.008;
      }

      /**
       * چشم‌ها بسته شروع می‌کنند و با اسکرول باز می‌شوند.
       *
       * این اولین چیزی است که در صفحه اتفاق می‌افتد، و عمداً قبل از
       * هر حرکتِ دیگری: تا وقتی چشم بسته است، جسم یک **مجسمه** است؛
       * لحظه‌ای که باز می‌شود، *بیدار* می‌شود. همان یک تفاوت، کلِ
       * رابطهٔ بیننده با آن را عوض می‌کند.
       *
       * بسته‌بودن با فشردنِ ارتفاعِ صفحهٔ چشم ساخته می‌شود نه با
       * خاموش کردنش — شبکهٔ نقطه‌ایِ فشرده، یک خطِ باریکِ نورانی
       * می‌شود، که دقیقاً شکلِ چشمِ بسته است.
       *
       * کمی هم پله‌پله: چشمِ راست چند صدم دیرتر باز می‌شود. هم‌زمانیِ
       * کامل، مکانیکی به‌نظر می‌رسد.
       */
      const wake = clamp01((p - 0.02) / 0.1);
      const open = reduce ? 1 : wake * wake * (3 - 2 * wake);
      bot.eyes[0].scale.y = 0.07 + 0.93 * open;
      bot.eyes[1].scale.y = 0.07 + 0.93 * clamp01((open - 0.08) / 0.92);

      /**
       * نوشتهٔ سینه با بیدار شدن می‌رود.
       *
       * یک *دستورالعمل* است نه بخشی از طراحی: تا وقتی کاربر اسکرول
       * نکرده لازم است، و لحظه‌ای که کرد، کارش تمام شده. ماندنش
       * بعد از آن، فقط یک برچسبِ اضافه روی سینه است.
       */
      label.opacity = 0.96 * (1 - open);
      bot.label.visible = label.opacity > 0.01;

      /* ── نواختن ─────────────────────────────────────────── */

      /**
       * گیتار از میانهٔ اسکرول می‌آید و پیکره شروع به نواختن می‌کند.
       *
       * `play` صفر تا یک است و *همه‌چیز* از آن ضرب می‌خورد: اندازهٔ
       * ساز، دامنهٔ حرکتِ دست‌ها، تابِ بدن، و شدتِ ضربانِ نور. با یک
       * متغیر، ورود و خروج خودبه‌خود هماهنگ است و هیچ‌جا چیزی وسطِ
       * راه نمی‌پرد.
       */
      /**
       * پنجرهٔ ورود، عمداً پهن.
       *
       * نسخهٔ قبل در ۱۰٪ اسکرول تمام می‌شد و نتیجه‌اش این بود که
       * دست‌ها *می‌پریدند* سرِ جایشان. حرکتی که کاربر آن را «ناگهانی»
       * می‌بیند، معمولاً همین است: نه سرعتِ زیاد، بلکه *کوتاهیِ*
       * بازه. با پنجرهٔ دوبرابر، همان مسیر در دو برابرِ اسکرول طی
       * می‌شود و چشم می‌تواند دنبالش کند.
       */
      const rawPlay = reduce ? 0 : clamp01((p - 0.18) / 0.2);
      /** نرم در هر دو سر — بدونِ آن، شروع و پایانِ حرکت تکان دارد */
      const play = rawPlay * rawPlay * (3 - 2 * rawPlay);
      const playing = rawPlay > 0.002;
      guitar.group.visible = playing;

      if (playing) {
        /**
         * ساز **از داخلِ دست** بیرون می‌آید و بزرگ می‌شود.
         *
         * قبلاً با اندازهٔ تقریباً کاملش ظاهر می‌شد و همان «یک‌باره
         * پیدا شدن» بود که آزار می‌داد. حالا از یک نقطهٔ تقریباً صفر
         * روی کفِ دستِ مضراب شروع می‌کند و هم‌زمان با رفتنِ دست‌ها
         * سرِ جای خودش، باز می‌شود — پس چشم می‌بیند ساز *از جایی*
         * آمد، نه اینکه ناگهان آنجا بود.
         *
         * توانِ ۱٫۶ روی مقیاس یعنی اولش کند باز می‌شود و آخرش تند:
         * رشدِ خطی، بادکنکی به‌نظر می‌رسد.
         */
        const grow = Math.pow(play, 1.6);
        guitar.group.scale.setScalar(0.68 * (0.04 + 0.96 * grow));

        /**
         * ساعتِ ضرب، از تایمرِ رندر.
         *
         * تا وقتی یک ریفِ پیوسته پخش می‌شد، این ساعت از
         * `AudioContext.currentTime` خوانده می‌شد تا حرکت و صدا
         * نلغزند. حالا که فقط یک ضربِ کوتاهِ بازخوردی مانده، چیزی
         * برای هم‌زمان ماندن وجود ندارد و تایمرِ صحنه کافی است.
         */
        const beat = time * (BEAT_PER_SEC);
        /** فاز داخلِ هر ضرب، ۰ تا ۱ */
        const ph = beat - Math.floor(beat);
        /** ضربهٔ مضراب: تیزِ اول، رهایی نرم — نه یک سینوسِ متقارن */
        const hit = Math.pow(1 - ph, 2.4);

        /**
         * نور و دامنهٔ حرکت از **خودِ صدا** می‌آیند، نه از یک سینوسِ جدا.
         *
         * `level` بلندیِ همین لحظهٔ آهنگ است. وقتی صدا خاموش باشد صفر
         * می‌شود و همه‌چیز به ضربِ داخلی برمی‌گردد — پس صحنه در سکوت
         * هم مرده نیست. ولی وقتی آهنگ هست، نور دقیقاً روی همان چیزی
         * می‌زند که شنیده می‌شود، و همین است که «انگار دارد می‌نوازد»
         * را می‌سازد.
         */
        const amp = sound.level();
        const pulse = hit * 0.5 + amp * 1.4;

        /**
         * دست‌ها **حل** می‌شوند، نه تنظیم.
         *
         * هدف‌ها دو شیءِ خالی روی خودِ گیتارند، پس هرجا ساز برود
         * دست‌ها دنبالش می‌روند و هیچ عددی دستی هماهنگ نمی‌شود.
         * قطب‌ها می‌گویند آرنج کدام طرف بشکند: هر دو به بیرون و کمی
         * عقب، همان‌طور که آرنجِ آدم می‌شکند. آرنجی که به جلو خم شود
         * فوراً غلط خوانده می‌شود.
         *
         * زخمه هم روی همین سوار است: هدفِ دستِ مضراب در قوسِ ضرب کمی
         * بالا و پایین می‌رود ولی *روی صفحهٔ ساز* می‌ماند — پس دست
         * هیچ‌وقت از سیم‌ها جدا نمی‌شود.
         */
        guitar.group.updateWorldMatrix(true, false);

        guitar.strumAnchor.getWorldPosition(strumTarget);
        bot.torso.worldToLocal(strumTarget);
        strumTarget.y += (hit - 0.4) * (0.32 + amp * 0.3);
        strumTarget.z += (hit - 0.4) * 0.12;
        strumTarget.x += (hit - 0.4) * 0.08;

        /**
         * آکورد هر دو ضرب یک‌بار عوض می‌شود، و دستِ چپ روی دسته
         * می‌لغزد.
         *
         * پله‌ای است نه پیوسته: لغزشِ نرم روی دسته «سُر خوردن» است،
         * و جهشِ ناگهانی «آکورد عوض کردن». همین یک تفاوت است که
         * نواختن را باورپذیر می‌کند.
         */
        const chord = Math.floor(beat / 2) % 4;
        const fretSlide = [0, 0.3, 0.12, 0.46][chord];

        guitar.fretAnchor.getWorldPosition(fretTarget);
        bot.torso.worldToLocal(fretTarget);
        fretTarget.x += fretSlide * shift;

        /**
         * هدف‌ها از کنارِ بدن **سفر می‌کنند** تا روی ساز.
         *
         * تا اینجا IK همیشه روی لنگرِ گیتار حل می‌شد و `play` فقط
         * اندازهٔ ساز را عوض می‌کرد — یعنی بازوها در همان فریمی که
         * نواختن شروع می‌شد، یک‌باره سرِ جایشان بودند. حالا خودِ
         * نقطهٔ هدف بینِ «دستِ آویزان» و «دست روی ساز» درون‌یابی
         * می‌شود، پس دست مسیر را طی می‌کند و IK در هر فریم همان
         * وسطِ راه را حل می‌کند.
         */
        restL.set(bot.arms[0].position.x - 0.1, bot.arms[0].position.y - reach, 0.1);
        restR.set(bot.arms[1].position.x + 0.1, bot.arms[1].position.y - reach, 0.1);
        strumTarget.lerpVectors(restL, strumTarget, play);
        fretTarget.lerpVectors(restR, fretTarget, play);

        const fitStrum = solveArm(
          bot.arms[0],
          bot.forearms[0],
          strumTarget,
          POLE_L,
          bot.bones.upper,
          bot.bones.fore,
        );
        const fitFret = solveArm(
          bot.arms[1],
          bot.forearms[1],
          fretTarget,
          POLE_R,
          bot.bones.upper,
          bot.bones.fore,
        );

        /**
         * فاصلهٔ واقعیِ دست تا هدف، برای سنجشِ روبریک.
         *
         * با چشم نمی‌شود گفت دست «روی» ساز نشسته یا دو سانت کنارش؛
         * این عدد می‌گوید. فقط در حالتِ توسعه نوشته می‌شود.
         */
        if (process.env.NODE_ENV !== "production") {
          (window as unknown as { __neoFit?: unknown }).__neoFit = {
            strum: +fitStrum.miss.toFixed(3),
            fret: +fitFret.miss.toFixed(3),
          };
        }

        /** سر روی ضرب تکان می‌خورد، و کمی دیرتر از دست */
        bot.head.rotation.x += hit * (0.09 + amp * 0.09) * play;
        bot.head.rotation.z = Math.sin(beat * Math.PI) * 0.05 * play;

        /** تابِ بدن روی هر دو ضرب، نه هر ضرب — وگرنه عصبی می‌شود */
        bot.torso.rotation.z = Math.sin(beat * Math.PI * 0.5) * (0.045 + amp * 0.05) * play;
        bot.torso.position.y += hit * 0.03 * play;

        /**
         * لرزشِ سیم‌ها.
         *
         * سیم واقعاً جابه‌جا نمی‌شود، فقط در محورِ ضخامتش کشیده
         * می‌شود — و همان کشیدگیِ چند فریمی، همان تصویرِ محوی است که
         * از سیمِ زخمه‌خورده در ذهن داریم.
         */
        for (let i = 0; i < guitar.strings.length; i++) {
          const lag = clamp01(hit - i * 0.06);
          guitar.strings[i].scale.set(1 + lag * 5, 1, 1 + lag * 5);
        }

        /**
         * نورِ صحنه با ضرب کار می‌کند.
         *
         * دو چیزِ جدا: نورِ سفید روی ضرب کمی بالا و پایین می‌رود، و
         * یک چراغِ قرمز از پایین که فقط روی ضربِ اولِ هر میزان
         * می‌زند. دومی است که فضا را از «استودیوی محصول» به «صحنهٔ
         * اجرا» می‌برد — و چون کم و کوتاه است، هیچ‌وقت به دیسکو
         * نمی‌رسد.
         */
        const bar = beat / 4 - Math.floor(beat / 4);
        const down = Math.pow(1 - (bar * 4 - Math.floor(bar * 4)), 6);
        rim.intensity = 0.8 + pulse * 0.9 * play;
        rimWarm.intensity = 0.45 + pulse * 0.4 * play;
        stage.intensity = (0.12 + down * 0.6 + amp * 1.1) * play;
        key.intensity = 0.5 + pulse * 0.25 * play;
        // ساز کم‌کم می‌آید: با play هم بزرگ می‌شود هم به جای خودش می‌رسد
        /**
         * جای ساز هم از کفِ دست به جای نهایی‌اش سفر می‌کند.
         *
         * بدونِ این، ساز *سرِ جای آخرش* کوچک شروع می‌کرد و بزرگ
         * می‌شد — که باز هم «ظاهر شدن» است نه «درآمدن از دست». مبدأ
         * تقریباً همان‌جایی است که دستِ مضراب در حالتِ آویزان قرار
         * دارد.
         */
        guitar.group.position.set(
          THREE.MathUtils.lerp(-1.1, -0.5, grow),
          THREE.MathUtils.lerp(-0.2, 0.95 - 0.05 * play, grow),
          THREE.MathUtils.lerp(0.3, 0.92 + 0.2 * play, grow),
        );
      } else {
        /**
         * برگشت به حالتِ آویزان.
         *
         * چون IK مستقیم روی `quaternion` می‌نویسد، صفر کردنِ
         * `rotation` کافی نیست — آن دو نمایشِ یک چیزند و آخرین
         * نوشته برنده است. پس اینجا هم کواترنیون نوشته می‌شود.
         */
        bot.arms[0].quaternion.identity();
        bot.arms[1].quaternion.identity();
        bot.forearms[0].quaternion.identity();
        bot.forearms[1].quaternion.identity();
        bot.arms[0].rotation.z = -0.06;
        bot.arms[1].rotation.z = 0.06;
        rim.intensity = 0.8;
        rimWarm.intensity = 0.45;
        key.intensity = 0.5;
        stage.intensity = 0;
        for (const str of guitar.strings) str.scale.set(1, 1, 1);
      }

      // یک‌درمیانِ سه فریم؛ جسم آرام می‌چرخد و کسی نمی‌فهمد
      renderer.shadowMap.needsUpdate = frame % (small ? 6 : 3) === 1;
      renderer.render(scene, camera);
    }
    tick();

    /**
     * دیدبان — تنها راهِ دیدنِ شکستِ خاموش.
     *
     * همهٔ راه‌هایی که این صحنه می‌تواند بی‌سروصدا نیاید یک نشانهٔ
     * مشترک دارند: هیچ فریمی رندر نمی‌شود. کانتکست ساخته شد ولی
     * مرورگر پسش گرفت، شیدر کامپایل نشد، حلقه پشتِ یک ناظر ماند —
     * از بیرون هر سه یک قابِ سیاه‌اند.
     *
     * پس به‌جای حدسِ علت، خودِ نشانه گرفته می‌شود: سه ثانیه بعد،
     * اگر شمارندهٔ فریم هنوز صفر باشد، جایگزینِ ثابت بالا می‌آید.
     */
    const watchdog = window.setTimeout(() => {
      if (frame === 0) el.dataset.scene = "down";
    }, 3000);

    return () => {
      window.clearTimeout(watchdog);
      cancelAnimationFrame(raf);
      stopWatch();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      sound.pause();
      bot.geometries.forEach((g) => g.dispose());
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progress, shift, chestText, muted]);

  /*
    جایگزین همیشه در درخت هست و با CSS پنهان می‌ماند، نه با state.
    اگر با state بود، خودِ تشخیصِ خرابی یک رندرِ دیگر لازم داشت —
    درست همان لحظه‌ای که مرورگر دارد حافظه کم می‌آورد.
  */
  return (
    <div ref={host} className={className} aria-hidden="true">
      <style>{`
        .neo-down { display: none }
        [data-scene="down"] .neo-down { display: flex }
      `}</style>
      <div className="neo-down absolute inset-0 items-center justify-center">
        <RobotGlyph className="h-[38dvh] w-auto" style={{ color: "rgba(244,239,232,.22)" }} />
      </div>
    </div>
  );
}
