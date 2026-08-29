import { ArrowRight, Heart, Play } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { db } from "@/db";
import { homeHero } from "@/db/schema";

export async function Hero() {
  const [data] = await db.select().from(homeHero).limit(1);
  if (!data) {
    return null;
  }

  return (
    <section className="relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black_20%,transparent_80%)]" />
      <div className="glow-orb pointer-events-none absolute top-[-10%] right-[-10%] h-150 w-150 rounded-full sm:right-[5%]" />

      <div className="relative mx-auto grid grid-cols-1 gap-14 px-6 pt-14 pb-20 sm:px-8 sm:pt-20 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:pt-24 lg:pb-28">
        <Reveal className="max-w-xl">
          <span className="text-text-secondary inline-block text-sm font-semibold tracking-widest uppercase">
            {data.eyebrow}
          </span>

          <h1 className="font-display mt-5 text-[34px] leading-[1.12] font-bold tracking-tight sm:text-[44px] lg:text-[50px]">
            {data.titleLine1}
            <br />
            <span className="text-gradient">{data.titleGradient}</span>
            <br />
            <span className="text-text-primary">{data.titleLine2}</span>
          </h1>

          <p className="text-text-secondary mt-6 max-w-md text-[15px] leading-relaxed">
            {data.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={data.primaryCtaHref}
              className="group bg-accent flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_0_0_0_rgba(47,109,250,0.5)] transition-all duration-300 hover:shadow-[0_0_28px_2px_rgba(47,109,250,0.5)]"
            >
              {data.primaryCtaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={data.secondaryCtaHref}
              className="group text-text-primary hover:border-accent/40 hover:bg-surface flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/4 px-6 py-3.5 text-[14px] font-semibold transition-colors"
            >
              <Play className="text-accent-2 h-3.5 w-3.5" />
              {data.secondaryCtaLabel}
            </Link>
          </div>
        </Reveal>

        <Reveal
          variant="scale"
          delay={120}
          className="relative mx-auto h-full w-full max-w-lg lg:max-w-none"
        >
          <div className="relative mx-auto block h-auto min-h-0 w-full max-w-140 flex-col sm:h-full sm:min-h-87.5">
            <div className="border-line bg-surface/90 relative z-20 mb-6 block w-full rounded-2xl border p-4 backdrop-blur-md sm:absolute sm:-top-8 sm:-left-4 sm:mb-0 sm:w-52 sm:p-4 lg:-left-8">
              <span className="text-text-secondary text-[13px] font-semibold tracking-[0.18em] uppercase sm:text-[10px]">
                {data.badgeTitle}
              </span>
              <p className="text-text-secondary mt-2 text-sm leading-snug sm:text-[13px]">
                {data.badgeText}
              </p>
              <span className="bg-accent-soft mt-3 flex h-7 w-7 items-center justify-center rounded-full">
                <Heart
                  className="text-accent-2 h-3.5 w-3.5"
                  fill="currentColor"
                />
              </span>
            </div>

            <div className="relative mx-auto aspect-square w-full sm:aspect-auto sm:h-full">
              <div className="animate-orbit-spin border-line absolute inset-0 rounded-full border border-dashed" />
              <div className="border-line-soft absolute inset-6 rounded-full border" />
              <div className="glow-orb animate-pulse-glow absolute inset-0 rounded-full" />

              {data.imageUrl ? (
                <div className="animate-float border-line absolute inset-[4%] overflow-hidden rounded-[2.5rem] border shadow-[0_0_60px_-10px_rgba(47,109,250,0.6)]">
                  <img
                    src={data.imageUrl}
                    alt="Robot AI đồng hành của Thegioirobot"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : null}

              <div className="bg-accent/20 absolute bottom-2 left-1/2 h-3 w-40 -translate-x-1/2 rounded-full blur-md sm:w-48" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
