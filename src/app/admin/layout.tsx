/**
 * پنل ادمین ابزار کاره، نه صفحه‌ی تبلیغاتی — پس نشانگر سیستم برمی‌گرده
 * و توکن‌های سطح تیره فعال می‌شن. قاعده‌هاش در globals.css.
 */

/**
 * حالت ذخیره‌شده رو قبل از اولین رنگ‌آمیزی روی <html> می‌ذاره.
 * اگه این کار توی افکت انجام می‌شد، کاربرِ حالت روشن هر بار یک لحظه
 * صفحه‌ی تیره می‌دید و بعد می‌پرید به روشن.
 */
const THEME_SCRIPT = `
try {
  if (localStorage.getItem('panel-theme') === 'light') {
    document.documentElement.dataset.panel = 'light';
  }
} catch (e) {}
`;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      <div className="native-cursor panel">{children}</div>
    </>
  );
}
