/**
 * پنل ادمین ابزار کاره، نه صفحه‌ی تبلیغاتی — پس نشانگر سفارشیِ سایت
 * اینجا کنار می‌ره و نشانگر سیستم برمی‌گرده. قاعده‌هاش در globals.css.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="native-cursor">{children}</div>;
}
