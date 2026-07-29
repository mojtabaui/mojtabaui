import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Prisma, type ProjectTrack } from "@prisma/client";
import { ArrowRight, Lightbulb, Search } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TopicRow from "@/components/admin/TopicRow";
import AddTopicForm from "@/components/admin/AddTopicForm";
import PanelThemeToggle from "@/components/admin/PanelThemeToggle";
import { toPersianDigits } from "@/lib/persian-months";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ q?: string; track?: string; cat?: string }>;
}

export default async function TopicsPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const track = ["UI", "UX"].includes(sp.track ?? "")
    ? (sp.track as ProjectTrack)
    : "UI";
  const cat = (sp.cat ?? "").trim();

  const where: Prisma.ProjectTopicWhereInput = { track };
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { detail: { contains: q, mode: "insensitive" } },
    ];
  }
  if (cat) where.category = cat;

  const [topics, allCats, uiCount, uxCount] = await Promise.all([
    prisma.projectTopic.findMany({
      where,
      orderBy: [{ category: "asc" }, { recommended: "desc" }, { title: "asc" }],
    }),
    prisma.projectTopic.findMany({
      where: { track },
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    }),
    prisma.projectTopic.count({ where: { track: "UI" } }),
    prisma.projectTopic.count({ where: { track: "UX" } }),
  ]);

  const shown = topics.filter((t) => t.active).length;
  const recommended = topics.filter((t) => t.recommended && t.active).length;

  const inputCls =
    "w-full bg-[var(--page)] border border-[var(--line-strong)] rounded-xl px-4 py-2.5 font-body text-sm text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--violet)] transition-colors";

  const tabCls = (t: string) =>
    `px-4 py-2 rounded-xl font-body text-sm transition-colors ${
      track === t
        ? "bg-[var(--violet-deep)] text-white"
        : "bg-[var(--card)] border border-[var(--line)] text-[var(--ink-3)] hover:text-[var(--ink)]"
    }`;

  return (
    <div className="min-h-screen bg-[var(--page)] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* ── سربرگ ── */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 font-body text-xs text-[var(--ink-4)] hover:text-[var(--ink-3)] transition-colors mb-2"
            >
              <ArrowRight size={13} />
              برگشت به پنل
            </Link>
            <h1 className="font-body font-semibold text-[var(--ink)] text-xl flex items-center gap-2">
              <Lightbulb size={19} className="text-[var(--warn)]" />
              موضوع‌های پیشنهادی پروژه
            </h1>
            <p className="font-body text-xs text-[var(--ink-4)] mt-1.5 leading-6">
              همین فهرست توی فرم ثبت موضوع به هنرجو نشون داده می‌شه.
              <br />
              ستاره یعنی پیشنهادی، و چشمِ خط‌خورده موضوع رو از فرم پنهان می‌کنه
              بدون اینکه پاکش کنه.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PanelThemeToggle />
            <AddTopicForm track={track} />
          </div>
        </div>

        {/* ── انتخاب دوره ── */}
        <div className="flex items-center gap-2 mb-5">
          <Link href="/admin/topics?track=UI" className={tabCls("UI")}>
            رابط کاربری ({toPersianDigits(uiCount)})
          </Link>
          <Link href="/admin/topics?track=UX" className={tabCls("UX")}>
            تجربه کاربری ({toPersianDigits(uxCount)})
          </Link>
        </div>

        {/* ── آمار ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl px-4 py-3">
            <p className="font-body text-xs text-[var(--ink-4)]">در این فهرست</p>
            <p className="font-body text-lg text-[var(--ink)] mt-0.5">
              {toPersianDigits(topics.length)}
            </p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl px-4 py-3">
            <p className="font-body text-xs text-[var(--ink-4)]">در فرم دیده می‌شن</p>
            <p className="font-body text-lg text-[var(--ok)] mt-0.5">
              {toPersianDigits(shown)}
            </p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-xl px-4 py-3">
            <p className="font-body text-xs text-[var(--ink-4)]">پیشنهادی</p>
            <p className="font-body text-lg text-[var(--warn)] mt-0.5">
              {toPersianDigits(recommended)}
            </p>
          </div>
        </div>

        {/* ── فیلتر ── */}
        <form
          method="GET"
          action="/admin/topics"
          className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-4 mb-5 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3"
        >
          <input type="hidden" name="track" value={track} />
          <div className="relative">
            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-4)] pointer-events-none"
            />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="جستجو در عنوان یا توضیح"
              className={`${inputCls} pr-10`}
            />
          </div>

          <select name="cat" defaultValue={cat} className={inputCls}>
            <option value="">همهٔ دسته‌ها</option>
            {allCats
              .map((c) => c.category)
              .filter(Boolean)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>

          <button
            type="submit"
            className="bg-[var(--violet-deep)] hover:bg-[#7c4ff0] text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            فیلتر
          </button>
        </form>

        {/* ── جدول ── */}
        <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl overflow-hidden">
          {topics.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <Lightbulb size={26} className="text-[var(--ink-faint)] mx-auto mb-3" />
              <p className="font-body text-[var(--ink-4)] text-sm">
                {q || cat
                  ? "چیزی با این فیلترها پیدا نشد"
                  : "هنوز موضوعی ثبت نشده — از دکمهٔ بالا اضافه کن"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-[var(--line)]">
                    <th className="w-9" />
                    <th className="px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal">
                      عنوان موضوع
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal">
                      دسته
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal">
                      سختی
                    </th>
                    <th className="px-3 py-3 text-right font-body text-xs text-[var(--ink-4)] font-normal">
                      توضیح
                    </th>
                    <th className="px-3 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {topics.map((t) => (
                    <TopicRow
                      key={t.id}
                      topic={{
                        id: t.id,
                        track: t.track,
                        title: t.title,
                        category: t.category,
                        platform: t.platform,
                        difficulty: t.difficulty,
                        detail: t.detail,
                        recommended: t.recommended,
                        active: t.active,
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
