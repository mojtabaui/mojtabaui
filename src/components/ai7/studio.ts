import * as THREE from "three";

/**
 * محیطِ بازتاب — یک استودیوی کوچک که هرگز دیده نمی‌شود و فقط در
 * سطوحِ براق می‌افتد.
 *
 * چرا دستی می‌سازیمش و از RoomEnvironment استفاده نمی‌کنیم: آن اتاق
 * نورِ یکدست و بی‌جهت می‌دهد، و شیشهٔ مشکی زیرِ نورِ یکدست همان لکهٔ
 * خاکستریِ مات می‌شود. چیزی که به مشکی حسِ «براق» می‌دهد، لبهٔ تیزِ
 * یک سافت‌باکسِ روشن است که در آن می‌افتد — نه روشناییِ کلی.
 *
 * پس یک باکس با گرادیانتِ آسمان می‌سازیم و چند صفحهٔ نورانی داخلش
 * می‌گذاریم: یک سافت‌باکسِ بزرگ بالا-چپ، یک نوارِ باریکِ راست برای
 * خطِ رفلکس، و یک بازتابِ گرم از زمین.
 */
export function studioEnvironment() {
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

  // جعبهٔ محیط — سرد در بالا، گرم پایین. همین شیب است که به سفیدِ
  // بدنه رنگ می‌دهد و از «سفیدِ مرده» درش می‌آورد.
  const shellGeo = new THREE.BoxGeometry(30, 22, 30);
  const cvs = document.createElement("canvas");
  cvs.width = 4;
  cvs.height = 128;
  const ctx = cvs.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, "#d8e6f6");
  grad.addColorStop(0.42, "#6f7680");
  grad.addColorStop(0.68, "#3b3d43");
  grad.addColorStop(1, "#231f1d");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 4, 128);
  const gradTex = new THREE.CanvasTexture(cvs);
  gradTex.colorSpace = THREE.SRGBColorSpace;
  const shell = new THREE.Mesh(
    shellGeo,
    new THREE.MeshBasicMaterial({ map: gradTex, side: THREE.BackSide }),
  );
  scene.add(shell);

  // سافت‌باکسِ اصلی — بالا-چپ-جلو. لکهٔ روشنی که در ویزور می‌بینید.
  panel(11, 7, "#ffffff", 5.2, [-7, 9, 8]);
  // نوارِ باریکِ راست — خطِ رفلکسِ کشیده روی لبهٔ بدنه
  panel(1.6, 13, "#eaf1ff", 3.4, [10, 4, 3]);
  // بازتابِ گرمِ زمین — از پایین، رنگِ خاک
  panel(20, 20, "#d99458", 0.85, [0, -9, 0], [0, 1, 0]);
  // پُرکنندهٔ پشت — تا لبهٔ پشتیِ بدنه در تاریکی گم نشود
  panel(12, 8, "#cfe0ff", 1.1, [4, 5, -11]);
  /**
   * دیوارِ تیرهٔ روبه‌رو — سطحِ آینه‌ایِ مشکی هرچه *پشتِ* دوربین است
   * را بازمی‌تاباند. اگر آنجا روشن باشد، ویزور یک مستطیلِ خاکستریِ
   * یکدست می‌شود. این پرده همان است که مشکی را مشکی نگه می‌دارد و
   * فقط سافت‌باکس را به‌صورتِ یک خطِ روشن در آن می‌گذارد.
   */
  panel(26, 20, "#0d0e12", 1, [0, 2, 15]);

  return scene;
}

/**
 * محیط را یک بار می‌پزد و تحویل می‌دهد.
 * صحنهٔ موقت بعدش دور ریخته می‌شود؛ فقط بافتِ حاصل می‌ماند.
 */
export function bakeStudio(renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const src = studioEnvironment();
  const tex = pmrem.fromScene(src, 0.02).texture;
  src.traverse((o) => {
    const m = o as THREE.Mesh;
    m.geometry?.dispose();
    const mat = m.material as THREE.MeshBasicMaterial | undefined;
    mat?.map?.dispose();
    mat?.dispose();
  });
  pmrem.dispose();
  return tex;
}

/**
 * محیطِ رباتِ نارنجی — همان ساختار، ولی تنظیمِ کاملاً دیگری.
 *
 * محیطِ بالا برای پلاستیکِ کرم روی زمینهٔ کرم ساخته شده بود: کم‌نور،
 * با یک دیوارِ تیرهٔ روبه‌رو تا ویزورِ مشکی مشکی بماند. نارنجیِ
 * اشباع دقیقاً برعکس را می‌خواهد.
 *
 * دو تصمیم که کلِ ظاهر را می‌سازند:
 *
 *   بازتابِ گرم از پایین. سایهٔ نارنجی اگر فقط از نورِ محیطیِ سفید
 *   پُر شود، به خاکستری می‌رود و رنگ می‌میرد. یک صفحهٔ نارنجی‌سوختهٔ
 *   پُرقدرت زیرِ صحنه، نیمهٔ تاریکِ هر سطح را به قرمز می‌بَرد نه به
 *   خاکستری — و همان چیزی است که به این سبکِ رندر اشباعش را می‌دهد.
 *
 *   سافت‌باکسِ بزرگ و *نزدیک*. نورِ دور، لبهٔ روشنِ باریک می‌سازد؛
 *   نورِ نزدیک، یک کشِ پهن که در طولِ وجهِ بالایی می‌لغزد. آن کشِ پهن
 *   امضای این نوع رندر است.
 *
 * پردهٔ روبه‌رو اینجا خاکستریِ میانی است نه مشکی: صفحهٔ CRT مات است
 * و به دیوارِ تیره نیاز ندارد، ولی وجهِ جلوییِ بدنه باید کمی از وجهِ
 * بالایی تیره‌تر بماند تا حجمِ جعبه خوانده شود.
 */
export function decodeEnvironment() {
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

  const cvs = document.createElement("canvas");
  cvs.width = 4;
  cvs.height = 128;
  const ctx = cvs.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  /**
   * میانهٔ جعبه عمداً تیره است.
   *
   * وجهِ کناریِ بدنه با دوربین زاویهٔ تندی می‌سازد، و در آن زاویه
   * فرنل تقریباً همه‌چیز را بازمی‌تاباند. اگر میانهٔ محیط روشن
   * باشد، آن وجه به‌جای نارنجی، *محیط* را نشان می‌دهد و سفید
   * می‌شود. تیره‌کردنِ همین نوار، رنگِ خودِ جسم را برمی‌گرداند
   * بی‌آنکه براقی از دست برود.
   */
  grad.addColorStop(0, "#6b7278");
  grad.addColorStop(0.38, "#3d4145");
  grad.addColorStop(0.7, "#252325");
  grad.addColorStop(1, "#1b1310");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 4, 128);
  const gradTex = new THREE.CanvasTexture(cvs);
  gradTex.colorSpace = THREE.SRGBColorSpace;
  scene.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(30, 24, 30),
      new THREE.MeshBasicMaterial({ map: gradTex, side: THREE.BackSide }),
    ),
  );

  // سافت‌باکسِ اصلی — بزرگ، نزدیک، بالا-چپ-جلو
  panel(14, 9, "#ffffff", 6, [-6.5, 8.5, 7]);
  /**
   * نوارِ باریکِ راست — خطِ رفلکس، نه یک منبعِ نور.
   *
   * نسخهٔ اول این نوار را پُرقدرت گذاشته بود و نتیجه‌اش این شد که
   * وجهِ راستِ بدنه، به‌جای نارنجی، بازتابِ همان نوار را نشان می‌داد
   * و صورتی-سفید می‌شد. سطحِ لاک‌خورده هرچه روبه‌رویش باشد را
   * *عیناً* برمی‌گرداند؛ پس روشناییِ محیط باید در حدِ رنگ‌دادن به
   * سطح بماند، نه پوشاندنش.
   */
  panel(1.1, 12, "#fff2e4", 3.2, [9.5, 3.5, 1]);
  // تیغهٔ باریکِ بالا-پشت — لبهٔ روشنِ دورِ سیلوئت
  panel(11, 1.5, "#ffffff", 3.4, [1, 9.5, -6.5]);
  // بازتابِ گرمِ زمین — همان چیزی که سایه‌ها را قرمز نگه می‌دارد
  panel(22, 22, "#d43a10", 1.9, [0, -8.5, 1], [0, 1, 0]);
  // پُرکنندهٔ سردِ پشت
  panel(13, 9, "#c3d8f0", 0.8, [4, 3, -12]);
  // پردهٔ روبه‌رو
  panel(26, 20, "#2b2826", 1, [0, 2, 15]);

  return scene;
}

/** محیطِ نارنجی را می‌پزد و صحنهٔ موقت را دور می‌ریزد */
export function bakeDecode(renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const src = decodeEnvironment();
  const tex = pmrem.fromScene(src, 0.02).texture;
  src.traverse((o) => {
    const mesh = o as THREE.Mesh;
    mesh.geometry?.dispose();
    const mat = mesh.material as THREE.MeshBasicMaterial | undefined;
    mat?.map?.dispose();
    mat?.dispose();
  });
  pmrem.dispose();
  return tex;
}
