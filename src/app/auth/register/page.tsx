import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-8 h-8 rounded-xl bg-[#1a1714] flex items-center justify-center">
              <span className="text-white font-body font-bold text-xs">m</span>
            </div>
            <span className="font-body font-bold text-[#1a1714]">mojtabaui</span>
          </Link>
          <h1 className="font-body font-bold text-2xl text-[#1a1714] mb-1">بیا شروع کنیم</h1>
          <p className="text-[#a09990] font-body text-sm">حساب رایگان بساز و یاد بگیر</p>
        </div>

        <div className="bg-white border border-[#e8e2d9] rounded-3xl p-7 shadow-sm">
          <form className="space-y-4">
            <div>
              <label className="block font-body text-sm text-[#6b6560] mb-1.5">نام و نام‌خانوادگی</label>
              <input
                type="text"
                placeholder="مثلاً علی احمدی"
                className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-[#6b6560] mb-1.5">ایمیل</label>
              <input
                type="email"
                placeholder="example@email.com"
                dir="ltr"
                className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-[#6b6560] mb-1.5">شماره موبایل</label>
              <input
                type="tel"
                placeholder="09xxxxxxxxx"
                dir="ltr"
                className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
              />
            </div>
            <div>
              <label className="block font-body text-sm text-[#6b6560] mb-1.5">رمز عبور</label>
              <input
                type="password"
                placeholder="حداقل ۸ کاراکتر"
                dir="ltr"
                className="w-full bg-[#FAF6F1] border border-[#e8e2d9] rounded-xl px-4 py-3 font-body text-sm text-[#1a1714] placeholder:text-[#c8c2ba] focus:outline-none focus:border-[#1a1714]/40 transition-colors"
              />
            </div>
            <label className="flex items-start gap-2 text-[#a09990] font-body text-xs cursor-pointer">
              <input type="checkbox" className="accent-[#7c5cfc] mt-0.5 flex-shrink-0" />
              <span>
                با{" "}
                <a href="#" className="text-[#7c5cfc] hover:text-[#5b3fd4] transition-colors">قوانین و مقررات</a>
                {" "}سایت موافقم
              </span>
            </label>
            <button
              type="submit"
              className="w-full bg-[#1a1714] hover:bg-[#2d2926] text-white font-body font-semibold py-3.5 rounded-2xl transition-all mt-1"
            >
              ثبت‌نام
            </button>
          </form>
        </div>

        <p className="text-center text-[#a09990] font-body text-sm mt-6">
          قبلاً ثبت‌نام کردی؟{" "}
          <Link href="/auth/login" className="text-[#1a1714] font-semibold hover:text-[#7c5cfc] transition-colors">
            وارد شو
          </Link>
        </p>
      </div>
    </div>
  );
}
