import * as THREE from "three";

/**
 * حلِ بازوی دو‌بنده — شانه و آرنج، تا کفِ دست روی یک نقطهٔ مشخص بنشیند.
 *
 * چرا این لازم شد: چند دور تلاش کردیم زاویهٔ شانه و آرنج را با حدس
 * تنظیم کنیم تا دست به ساز برسد. هیچ‌وقت نرسید، و دلیلش این نیست که
 * حدس‌ها بد بودند — این است که مسئله *حل* دارد. سه عدد معلوم است
 * (طولِ دو بند، و نقطهٔ هدف) و زاویه‌ها از آن‌ها درمی‌آیند، نه از
 * چشم. با تغییرِ کوچک‌ترین چیز — جای ساز، طولِ بازو، تناسبِ تنه —
 * زاویه‌ها خودشان به‌روز می‌شوند.
 *
 * هندسه‌اش مثلثِ ساده است: شانه، آرنج، دست. دو ضلعش طولِ بندها و
 * ضلعِ سومش فاصلهٔ شانه تا هدف. قانونِ کسینوس هر دو زاویه را می‌دهد.
 *
 * همهٔ بردارها در فضای **والدِ بازو** (تنه) هستند.
 */

const DOWN = new THREE.Vector3(0, -1, 0);

const _dir = new THREE.Vector3();
const _ref = new THREE.Vector3();
const _upper = new THREE.Vector3();
const _elbow = new THREE.Vector3();
const _fore = new THREE.Vector3();
const _qArm = new THREE.Quaternion();
const _qFore = new THREE.Quaternion();
const _inv = new THREE.Quaternion();

export type ArmSolve = {
  /** فاصلهٔ کفِ دست تا هدف بعد از حل — صفر یعنی دقیقاً رسیده */
  miss: number;
};

/**
 * @param arm      گروهِ بازو؛ مبدأش روی لولای شانه است
 * @param fore     گروهِ ساعد، فرزندِ بازو، مبدأ روی لولای آرنج
 * @param target   نقطهٔ هدف در فضای والدِ بازو
 * @param pole     جهتی که آرنج باید به آن سمت بزند (در همان فضا)
 * @param lUpper   طولِ شانه تا آرنج
 * @param lFore    طولِ آرنج تا کفِ دست
 */
export function solveArm(
  arm: THREE.Object3D,
  fore: THREE.Object3D,
  target: THREE.Vector3,
  pole: THREE.Vector3,
  lUpper: number,
  lFore: number,
): ArmSolve {
  _dir.copy(target).sub(arm.position);
  const reach = lUpper + lFore;
  const raw = _dir.length();

  /**
   * فاصله در بازهٔ رسیدنی محبوس می‌شود.
   *
   * اگر هدف دورتر از مجموعِ دو بند باشد، مثلث وجود ندارد و کسینوس
   * از یک بیرون می‌زند — که به `NaN` و بازویی می‌رسد که ناگهان
   * ناپدید می‌شود. با محبوس‌کردن، بدترین حالت این است که دست تا
   * جایی که می‌تواند دراز می‌شود و همان‌جا می‌ماند.
   *
   * حاشیهٔ کوچک هم لازم است: دقیقاً روی حدِ بالا، بازو کاملاً صاف
   * می‌شود و در فریمِ بعد ممکن است جهتِ خمش بپرد.
   */
  const d = THREE.MathUtils.clamp(raw, Math.abs(lUpper - lFore) + 0.02, reach - 0.02);
  if (raw < 1e-5) return { miss: raw };
  _dir.normalize();

  /**
   * جهتِ قطبی، عمود بر خطِ شانه‌به‌هدف.
   *
   * `pole` می‌گوید آرنج کدام طرف بشکند. مؤلفهٔ موازی‌اش با `dir`
   * بی‌معنا است و کنار گذاشته می‌شود؛ آنچه می‌ماند صفحهٔ خمش را
   * تعریف می‌کند. اگر قطب تقریباً هم‌راستای هدف باشد، صفحه مبهم
   * می‌شود و یک جایگزینِ ثابت برمی‌داریم تا بازو نلرزد.
   */
  _ref.copy(pole).addScaledVector(_dir, -pole.dot(_dir));
  if (_ref.lengthSq() < 1e-6) _ref.set(0, 0, 1).addScaledVector(_dir, -_dir.z);
  _ref.normalize();

  // زاویهٔ بینِ بندِ بالا و خطِ شانه‌به‌هدف
  const cosA = THREE.MathUtils.clamp(
    (lUpper * lUpper + d * d - lFore * lFore) / (2 * lUpper * d),
    -1,
    1,
  );
  const a = Math.acos(cosA);

  // جهتِ بندِ بالا: خطِ هدف، به اندازهٔ a به سمتِ قطب چرخیده
  _upper.copy(_dir).multiplyScalar(Math.cos(a)).addScaledVector(_ref, Math.sin(a)).normalize();

  // آرنج کجا می‌افتد، و ساعد از آنجا کجا را نگاه می‌کند
  _elbow.copy(arm.position).addScaledVector(_upper, lUpper);
  _fore.copy(target).sub(_elbow);
  const foreLen = _fore.length();
  if (foreLen < 1e-5) return { miss: 0 };
  _fore.divideScalar(foreLen);

  /**
   * چرخشِ ساعد **نسبی** نوشته می‌شود، نه مطلق.
   *
   * `fore` فرزندِ `arm` است، پس چرخشِ محلی‌اش روی چرخشِ بازو سوار
   * می‌شود. اگر جهتِ مطلق را مستقیم بنویسیم، چرخشِ شانه دوباره
   * روی آن اعمال می‌شود و ساعد جای دیگری می‌رود — یکی از همان
   * باگ‌هایی که با چشم «انگار تصادفی است» دیده می‌شود.
   */
  _qArm.setFromUnitVectors(DOWN, _upper);
  _qFore.setFromUnitVectors(DOWN, _fore);
  arm.quaternion.copy(_qArm);
  fore.quaternion.copy(_inv.copy(_qArm).invert().multiply(_qFore));

  // فاصلهٔ واقعیِ دست تا هدف — همان عددی که روبریک با آن سنجیده می‌شود
  return { miss: Math.abs(raw - d) };
}
