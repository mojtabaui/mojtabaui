/**
 * موسیقیِ صحنه — و مهم‌تر از پخشش، **دامنه‌اش**.
 *
 * یک `<audio>` تنها می‌توانست فایل را پخش کند و تمام. دلیلِ اینکه
 * از وب‌آدیو رد می‌شود این است که صحنه باید *با* صدا حرکت کند:
 * `AnalyserNode` در هر فریم می‌گوید همین الان چقدر بلند است، و
 * نور و ضربِ پیکره از همان عدد ساخته می‌شوند. بدونِ آن، حرکت یک
 * حلقهٔ زمانیِ جداست که تصادفاً کنارِ موسیقی پخش می‌شود — و گوش
 * این ناهماهنگی را فوراً می‌گیرد.
 *
 * دربارهٔ پخشِ خودکار: مرورگر اجازه نمی‌دهد صدا بدونِ تعاملِ کاربر
 * شروع شود، و **اسکرول تعامل حساب نمی‌شود**. پس اولین تلاش معمولاً
 * رد می‌شود؛ آن‌وقت یک شنوندهٔ یک‌باره روی کلیک و کلید می‌نشیند و
 * همان‌جا شروع می‌کند. یعنی صفحه هیچ‌وقت به زور صدا نمی‌دهد، ولی
 * به‌محضِ اولین لمس، بی‌آنکه کاربر کاری کند، وارد می‌شود.
 */

export type SceneAudio = {
  /** تلاش برای پخش. اگر مرورگر اجازه ندهد، تا اولین لمس صبر می‌کند. */
  play(): void;
  pause(): void;
  /** صدا خاموش باشد یا نه — حالت را هم نگه می‌دارد */
  setMuted(m: boolean): void;
  muted(): boolean;
  /**
   * بلندیِ لحظه‌ای، ۰ تا ۱ تقریبی.
   *
   * وقتی صدا پخش نمی‌شود صفر برمی‌گرداند، پس هر چیزی که از این
   * تغذیه شود، در سکوت خودبه‌خود آرام می‌گیرد.
   */
  level(): number;
  dispose(): void;
};

export function createSceneAudio(src: string): SceneAudio {
  const el = new Audio(src);
  /**
   * یک بار، نه حلقه.
   *
   * آهنگی که تکرار شود، بعد از دورِ دوم دیگر «فضا» نیست، «چیزی که
   * باید خاموشش کرد» است. یک پخشِ کامل، همان لحظهٔ ورود را می‌سازد
   * و بعد کنار می‌رود.
   */
  el.loop = false;
  el.preload = "auto";
  el.crossOrigin = "anonymous";
  /** بلندیِ پایه — عمداً کم. موسیقیِ پس‌زمینه نباید جلو بیاید. */
  const VOLUME = 0.16;
  el.volume = VOLUME;

  let ctx: AudioContext | null = null;
  let analyser: AnalyserNode | null = null;
  let data: Uint8Array | null = null;
  let gain: GainNode | null = null;
  let muted = false;
  let wantPlay = false;
  /** فقط یک بار در کلِ عمرِ صفحه — دوباره شروع نمی‌شود */
  let started = false;
  /** دامنهٔ هموارشده — عددِ خام بین فریم‌ها می‌پرد */
  let smooth = 0;

  /** گرافِ صوتی فقط یک بار، و فقط وقتی واقعاً لازم شد */
  function ensureGraph() {
    if (ctx) return;
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    ctx = new Ctor();
    const source = ctx.createMediaElementSource(el);
    gain = ctx.createGain();
    gain.gain.value = muted ? 0 : VOLUME;
    analyser = ctx.createAnalyser();
    /**
     * پنجرهٔ کوچک و هموارسازیِ بالا.
     *
     * ما ملودی نمی‌خواهیم، فقط «چقدر بلند». پنجرهٔ ۲۵۶ ارزان است و
     * `smoothingTimeConstant` بالا، پرش‌های تک‌فریمی را می‌گیرد —
     * بدونش نور مثلِ چراغِ خراب سوسو می‌زند.
     */
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.82;
    data = new Uint8Array(analyser.frequencyBinCount);
    source.connect(gain);
    gain.connect(analyser);
    analyser.connect(ctx.destination);
    // صدا از گرافِ وب‌آدیو می‌رود، پس خودِ عنصر باید تمام‌بلند بماند
    el.volume = 1;
  }

  /**
   * تلاشِ دوم، بعد از اولین لمسِ واقعی.
   *
   * `once` روی هر سه رویداد می‌نشیند و اولی که بیاید کار را تمام
   * می‌کند؛ بقیه هم چون `once`اند خودشان پاک می‌شوند.
   */
  function armUnlock() {
    const go = () => {
      if (wantPlay) start();
    };
    for (const ev of ["pointerdown", "keydown", "touchstart"] as const) {
      window.addEventListener(ev, go, { once: true, passive: true });
    }
  }

  function start() {
    if (muted) return;
    ensureGraph();
    void ctx?.resume();
    const p = el.play();
    // مرورگر اجازه نداد — منتظرِ اولین لمس می‌مانیم
    if (p) p.catch(armUnlock);
  }

  return {
    play() {
      if (started) return;
      started = true;
      wantPlay = true;
      start();
    },
    pause() {
      wantPlay = false;
      el.pause();
    },
    setMuted(m: boolean) {
      muted = m;
      if (gain) gain.gain.value = m ? 0 : VOLUME;
      else el.volume = m ? 0 : VOLUME;
      if (m) el.pause();
      else if (wantPlay) start();
    },
    muted: () => muted,
    level() {
      if (!analyser || !data || el.paused || muted) {
        // در سکوت، آرام به صفر برمی‌گردد نه اینکه یک‌باره بیفتد
        smooth *= 0.9;
        return smooth;
      }
      analyser.getByteFrequencyData(data as Uint8Array<ArrayBuffer>);
      /**
       * فقط نیمهٔ پایینِ طیف شمرده می‌شود.
       *
       * ضرب و بم، همان چیزی است که حرکت باید رویش سوار شود؛
       * فرکانس‌های بالا بیشترشان سوز و صداهای گذرا هستند و اگر وارد
       * میانگین شوند، عدد دائم پر از نویز می‌ماند.
       */
      const n = Math.floor(data.length * 0.5);
      let sum = 0;
      for (let i = 0; i < n; i++) sum += data[i];
      const raw = sum / n / 255;
      smooth += (raw - smooth) * 0.25;
      return smooth;
    },
    dispose() {
      wantPlay = false;
      el.pause();
      el.src = "";
      void ctx?.close();
      ctx = null;
      analyser = null;
      gain = null;
    },
  };
}
