import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Prisma, type CertTrack } from "@prisma/client";
import { ArrowRight, Award, Search } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DeleteCertificateButton from "@/components/admin/DeleteCertificateButton";

const PER_PAGE = 50;

const TRACK_LABEL: Record<CertTrack, string> = {
  UI: "رابط کاربری",
  UX: "تجربه کاربری",
  QC: "کوادکمپ",
};

interface Props {
  searchParams: Promise<{
    q?: string;
    track?: string;
    year?: string;
    page?: string;
  }>;
}

/** ارقام فارسی/عربی رو به لاتین تبدیل می‌کنه تا جست‌وجوی سال با هر کیبوردی کار کنه */
function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

export default async function CertificatesPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const track = ["UI", "UX", "QC"].includes(sp.track ?? "") ? (sp.track as CertTrack) : null;
  const year = toLatinDigits(sp.year ?? "").trim();
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const where: Prisma.CertificateWhereInput = {};
  if (q) {
    where.OR = [
      { studentName: { contains: q, mode: "insensitive" } },
      { code: { contains: q, mode: "insensitive" } },
    ];
  }
  if (track) where.track = track;
  if (year) where.year = year;

  const [total, certs, allCount] = await Promise.all([
    prisma.certificate.count({ where }),
    prisma.certificate.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.certificate.count(),
  ]);

  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const isFiltered = Boolean(q || track || year);

  /** لینک صفحه‌بندی که فیلترهای فعلی رو نگه می‌داره */
  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (track) params.set("track", track);
    if (year) params.set("year", year);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/admin/certificates?${qs}` : "/admin/certificates";
  }

  const inputCls =
    "w-full bg-[#0a0908] border border-[#2d2c2a] rounded-xl px-4 py-2.5 font-body text-sm text-[#fafaf9] placeholder:text-[#57534e] focus:outline-none focus:border-[#8b5cf6]/50 transition-colors";

  return (
    <div className="min-h-screen bg-[#0a0908] py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-body text-xs text-[#57534e] hover:text-[#a8a29e] transition-colors mb-2"
            >
              <ArrowRight size={13} />
              برگشت به پنل
            </Link>
            <h1 className="font-body font-semibold text-[#fafaf9] text-xl flex items-center gap-2">
              <Award size={18} className="text-emerald-400" />
              همهٔ گواهی‌ها
            </h1>
          </div>
          <div className="font-body text-sm text-[#57534e]">
            {isFiltered ? (
              <>
                <span className="text-[#fafaf9]">{total}</span> نتیجه از {allCount}
              </>
            ) : (
              <>
                مجموع <span className="text-[#fafaf9]">{allCount}</span> گواهی
              </>
            )}
          </div>
        </div>

        {/* ── Filters ── */}
        <form
          method="GET"
          action="/admin/certificates"
          className="bg-[#111110] border border-[#2d2c2a] rounded-2xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-3"
        >
          <div className="relative">
            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#57534e] pointer-events-none"
            />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="نام دانشجو یا کد گواهی"
              className={`${inputCls} pr-10`}
            />
          </div>

          <select name="track" defaultValue={track ?? ""} className={inputCls}>
            <option value="">همهٔ دوره‌ها</option>
            <option value="UI">رابط کاربری</option>
            <option value="UX">تجربه کاربری</option>
            <option value="QC">کوادکمپ</option>
          </select>

          <input
            type="text"
            name="year"
            inputMode="numeric"
            dir="ltr"
            defaultValue={year}
            placeholder="سال"
            className={`${inputCls} sm:w-28 text-center`}
          />

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="bg-[#8b5cf6] hover:bg-[#7c4ff0] text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              جست‌وجو
            </button>
            {isFiltered && (
              <Link
                href="/admin/certificates"
                className="font-body text-sm text-[#a8a29e] hover:text-[#fafaf9] px-3 py-2.5 transition-colors"
              >
                پاک کردن
              </Link>
            )}
          </div>
        </form>

        {/* ── List ── */}
        <div className="bg-[#111110] border border-[#2d2c2a] rounded-2xl overflow-hidden">
          {certs.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <Award size={24} className="text-[#2d2c2a] mx-auto mb-3" />
              <p className="font-body text-[#57534e] text-sm">
                {isFiltered ? "چیزی با این فیلترها پیدا نشد" : "هنوز گواهی‌ای صادر نشده"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#1e1d1c]">
              {certs.map((cert) => (
                <div
                  key={cert.id}
                  className="px-5 py-3.5 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-body text-[#fafaf9] text-sm truncate">
                      {cert.studentName}
                    </p>
                    <p className="font-body text-[#57534e] text-xs mt-0.5">
                      {TRACK_LABEL[cert.track]}
                      {cert.year ? ` — سال ${cert.year}` : ""}
                      {cert.startDate ? ` — شروع ${cert.startDate}` : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`/certificate/${cert.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="دیدن گواهی"
                      dir="ltr"
                      className="font-mono text-xs text-[#8b5cf6] hover:text-[#a78bfa] bg-[#0a0908] border border-[#2d2c2a] hover:border-[#8b5cf6]/50 rounded-lg px-2.5 py-1 tracking-widest transition-colors"
                    >
                      {cert.code}
                    </a>
                    <DeleteCertificateButton id={cert.id} name={cert.studentName} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        {pages > 1 && (
          <div className="flex items-center justify-between gap-4 mt-5 font-body text-sm">
            {page > 1 ? (
              <Link
                href={pageHref(page - 1)}
                className="text-[#a8a29e] hover:text-[#fafaf9] border border-[#2d2c2a] rounded-xl px-4 py-2 transition-colors"
              >
                قبلی
              </Link>
            ) : (
              <span />
            )}

            <span className="text-[#57534e]">
              صفحهٔ <span className="text-[#fafaf9]">{page}</span> از {pages}
            </span>

            {page < pages ? (
              <Link
                href={pageHref(page + 1)}
                className="text-[#a8a29e] hover:text-[#fafaf9] border border-[#2d2c2a] rounded-xl px-4 py-2 transition-colors"
              >
                بعدی
              </Link>
            ) : (
              <span />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
