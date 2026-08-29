import { eq } from "drizzle-orm";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { db } from "@/db";
import { homeNews } from "@/db/schema";

export async function News() {
  const items = await db
    .select()
    .from(homeNews)
    .where(eq(homeNews.isPublished, true))
    .orderBy(homeNews.sortOrder);

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="tin-tuc" className="border-line-soft bg-surface border-t">
      <div className="mx-auto px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <Reveal className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <span className="border-accent/30 bg-accent/10 text-accent-2 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold tracking-widest uppercase backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Tin tức & cập nhật
          </span>
          <Link
            href="#"
            className="group text-text-secondary hover:text-accent-2 flex shrink-0 items-center gap-1.5 text-sm font-semibold transition-colors"
          >
            Xem tất cả
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 100}
              className="group border-line bg-void hover:border-accent/40 overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-10px_rgba(47,109,250,0.35)]"
            >
              <div className="border-line-soft relative aspect-4/3 overflow-hidden border-b">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : null}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <span className="text-text-secondary text-xs font-semibold">
                  {item.publishedAt}
                </span>
                <h3 className="text-text-primary mt-2 text-[14px] leading-snug font-semibold">
                  {item.title}
                </h3>
                <Link
                  href={item.href}
                  target="_blank"
                  className="group/link text-accent-2 mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
                >
                  Tìm hiểu thêm
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Link
          href="#"
          className="text-text-secondary mt-8 flex items-center justify-center gap-1.5 text-[13px] font-semibold sm:hidden"
        >
          Xem tất cả
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
