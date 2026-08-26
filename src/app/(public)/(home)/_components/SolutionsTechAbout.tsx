import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { db } from "@/db";
import { homeSolutionsTechAbout } from "@/db/schema";
import { getIcon } from "@/lib/icon-map";

export async function SolutionsTechAbout() {
  const [data] = await db.select().from(homeSolutionsTechAbout).limit(1);
  if (!data) {
    return null;
  }

  return (
    <section className="border-line-soft border-t">
      <div className="mx-auto grid grid-cols-1 gap-4 px-6 py-16 sm:px-8 lg:grid-cols-3 lg:px-12 lg:py-20">
        {/* --- Giải pháp doanh nghiệp --- */}
        <Reveal
          id="giai-phap"
          className="border-line hover:border-accent/40 bg-surface rounded-3xl border p-7"
        >
          <span className="text-accent-2 text-sm font-black tracking-wider uppercase">
            Giải pháp cho doanh nghiệp
          </span>
          <h3 className="text-text-primary mt-3 text-[19px] leading-snug font-semibold">
            {data.solutionsHeading}
          </h3>
          <p className="text-text-secondary mt-2 text-[13.5px] leading-relaxed">
            {data.solutionsDescription}
          </p>
          <ul className="mt-6 space-y-3">
            {data.solutionsItems.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <li key={item.label} className="flex items-center gap-3">
                  <Icon
                    className="text-accent-2 h-4 w-4 shrink-0"
                    strokeWidth={1.75}
                  />
                  <span className="text-text-secondary text-[13px]">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
          <Link
            href={data.solutionsCtaHref}
            className="group bg-accent mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2 text-[13.5px] font-medium text-white transition-shadow hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)]"
          >
            {data.solutionsCtaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* --- Công nghệ cốt lõi --- */}
        <Reveal
          id="cong-nghe"
          delay={100}
          className="border-line hover:border-accent/40 bg-surface rounded-3xl border p-7"
        >
          <span className="text-accent-2 text-sm font-black tracking-wider uppercase">
            Công nghệ cốt lõi
          </span>
          <h3 className="text-text-primary mt-3 text-[19px] leading-snug font-semibold">
            {data.techHeading}
          </h3>
          <p className="text-text-secondary mt-2 text-[13.5px] leading-relaxed">
            {data.techDescription}
          </p>

          {data.techImageUrl ? (
            <div className="border-line-soft mt-6 overflow-hidden rounded-2xl border">
              <img
                src={data.techImageUrl}
                alt="Minh hoạ công nghệ lõi AI của Thegioirobot"
                className="h-40 w-full object-cover"
              />
            </div>
          ) : null}

          <ul className="mt-6 space-y-3">
            {data.techItems.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <li key={item.label} className="flex items-center gap-3">
                  <Icon
                    className="text-accent-2 h-4 w-4 shrink-0"
                    strokeWidth={1.75}
                  />
                  <span className="text-text-secondary text-[13px]">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
          <Link
            href={data.techCtaHref}
            className="group bg-accent mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2 text-[13.5px] font-medium text-white transition-shadow hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)]"
          >
            {data.techCtaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* --- Về chúng tôi --- */}
        <Reveal
          id="ve-chung-toi"
          delay={200}
          className="border-line hover:border-accent/40 bg-surface rounded-3xl border p-7"
        >
          <span className="text-accent-2 text-sm font-black tracking-wider uppercase">
            Về chúng tôi
          </span>
          <h3 className="text-text-primary mt-3 text-[19px] leading-snug font-semibold">
            {data.aboutHeading}
          </h3>
          <p className="text-text-secondary mt-2 text-[13.5px] leading-relaxed">
            {data.aboutDescription}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {data.aboutStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-text-primary text-2xl font-bold">
                  {stat.value}
                </p>
                <p className="text-text-secondary mt-1 text-[12px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <Link
            href={data.aboutCtaHref}
            className="group bg-accent mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2 text-[13.5px] font-medium text-white transition-shadow hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)]"
          >
            {data.aboutCtaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
