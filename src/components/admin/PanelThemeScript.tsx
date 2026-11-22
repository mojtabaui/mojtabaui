/**
 * حالت روشن/تیرهٔ صفحه‌های عمومیِ پنل‌مانند (فرم‌ها).
 *
 * قبل از اولین رنگ‌آمیزی روی <html> می‌شینه تا صفحه یک لحظه تیره
 * نپره. اولویت: انتخاب ذخیره‌شدهٔ کاربر، بعد ترجیح سیستم‌عامل. پنل
 * ادمین همین کلید ذخیره رو می‌خونه ولی پیش‌فرضش همیشه تیره‌ست.
 */
const SCRIPT = `
try {
  var s = localStorage.getItem('panel-theme');
  var light = s ? s === 'light' : window.matchMedia('(prefers-color-scheme: light)').matches;
  if (light) document.documentElement.dataset.panel = 'light';
} catch (e) {}
`;

export default function PanelThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
