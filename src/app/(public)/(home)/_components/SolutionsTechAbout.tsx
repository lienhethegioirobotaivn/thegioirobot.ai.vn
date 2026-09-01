import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import type { homeSolutionsTechAbout } from "@/db/schema";
import { getIcon } from "@/lib/icon-map";

type SolutionsTechAboutData = typeof homeSolutionsTechAbout.$inferSelect;

export function SolutionsTechAbout({
  data,
}: {
  data: SolutionsTechAboutData | null;
}) {
  if (!data) {
    return null;
  }

  return (
    <section className="border-line-soft relative overflow-hidden border-t">
      <div className="grid-lines pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,black_10%,transparent_70%)] opacity-20" />

      <div className="relative mx-auto grid grid-cols-1 gap-4 px-6 py-16 sm:px-8 lg:grid-cols-3 lg:px-12 lg:py-20">
        <Reveal
          id="giai-phap"
          className="border-line hover:border-accent/40 bg-surface group rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(47,109,250,0.4)]"
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
                  <span className="bg-accent-soft flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                    <Icon
                      className="text-accent-2 h-3.5 w-3.5"
                      strokeWidth={1.75}
                    />
                  </span>
                  <span className="text-text-secondary text-[13px]">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
          <Link
            href={data.solutionsCtaHref}
            className="group/cta bg-accent relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2 text-[13.5px] font-medium text-white transition-shadow hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
            {data.solutionsCtaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal
          id="cong-nghe"
          delay={100}
          className="border-line hover:border-accent/40 bg-surface group rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(47,109,250,0.4)]"
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
            <div className="border-line-soft mt-6 w-full overflow-hidden rounded-2xl border">
              <img
                src={data.techImageUrl}
                alt="Minh hoạ công nghệ lõi AI của Thegioirobot"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : null}

          <ul className="mt-6 space-y-3">
            {data.techItems.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="bg-accent-soft flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                    <Icon
                      className="text-accent-2 h-3.5 w-3.5"
                      strokeWidth={1.75}
                    />
                  </span>
                  <span className="text-text-secondary text-[13px]">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
          <Link
            href={data.techCtaHref}
            className="group/cta bg-accent relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2 text-[13.5px] font-medium text-white transition-shadow hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
            {data.techCtaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal
          id="ve-chung-toi"
          delay={200}
          className="border-line hover:border-accent/40 bg-surface group rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(47,109,250,0.4)]"
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

          <div className="border-line-soft mt-6 grid grid-cols-2 gap-4 rounded-2xl border p-4">
            {data.aboutStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-gradient text-2xl font-bold">
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
            className="group/cta bg-accent relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2 text-[13.5px] font-medium text-white transition-shadow hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
            {data.aboutCtaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
