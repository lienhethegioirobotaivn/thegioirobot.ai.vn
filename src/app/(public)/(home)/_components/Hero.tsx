import { ArrowRight, Heart, Play, Sparkles } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { db } from "@/db";
import { homeHero } from "@/db/schema";

import { HeroOrbs } from "./HeroOrbs";

export async function Hero() {
  const [data] = await db.select().from(homeHero).limit(1);
  if (!data) {
    return null;
  }

  return (
    <section className="relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black_20%,transparent_80%)]" />
      <div className="glow-orb pointer-events-none absolute top-[-10%] right-[-10%] h-150 w-150 rounded-full sm:right-[5%]" />
      <div className="glow-orb-secondary pointer-events-none absolute bottom-[-10%] left-[-10%] h-100 w-100 rounded-full opacity-40" />
      <HeroOrbs />

      <div className="relative mx-auto grid grid-cols-1 gap-14 px-6 pt-14 pb-20 sm:px-8 sm:pt-20 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:pt-24 lg:pb-28">
        <Reveal className="max-w-xl">
          <span className="border-line text-text-secondary inline-flex items-center gap-2 rounded-full border bg-white/4 px-4 py-1.5 text-sm font-semibold tracking-widest uppercase backdrop-blur-sm">
            <Sparkles className="text-accent-2 h-3.5 w-3.5 animate-pulse" />
            {data.eyebrow}
          </span>

          <h1 className="font-display mt-5 text-[34px] leading-[1.12] font-bold tracking-tight sm:text-[44px] lg:text-[50px]">
            <span className="animate-fade-slide-up inline-block [animation-delay:0ms]">
              {data.titleLine1}
            </span>
            <br />
            <span className="text-gradient animate-gradient-text inline-block bg-size-[200%_auto] [animation-delay:120ms]">
              {data.titleGradient}
            </span>
            <br />
            <span className="text-text-primary animate-fade-slide-up inline-block [animation-delay:240ms]">
              {data.titleLine2}
            </span>
          </h1>

          <p className="text-text-secondary animate-fade-slide-up mt-6 max-w-md text-[15px] leading-relaxed [animation-delay:360ms]">
            {data.description}
          </p>

          <div className="animate-fade-slide-up mt-9 flex flex-col gap-3 [animation-delay:480ms] sm:flex-row sm:items-center">
            <Link
              href={data.primaryCtaHref}
              className="group bg-accent relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_0_0_0_rgba(47,109,250,0.5)] transition-all duration-300 hover:shadow-[0_0_28px_2px_rgba(47,109,250,0.5)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {data.primaryCtaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={data.secondaryCtaHref}
              className="group text-text-primary hover:border-accent/40 hover:bg-surface flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/4 px-6 py-3.5 text-[14px] font-semibold transition-colors"
            >
              <Play className="text-accent-2 h-3.5 w-3.5 transition-transform group-hover:scale-110" />
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
            <div className="border-line bg-surface/90 animate-float-badge relative z-20 mb-6 block w-full rounded-2xl border p-4 backdrop-blur-md sm:absolute sm:-top-8 sm:-left-4 sm:mb-0 sm:w-52 sm:p-4 lg:-left-8">
              <span className="text-text-secondary text-[13px] font-semibold tracking-[0.18em] uppercase sm:text-[10px]">
                {data.badgeTitle}
              </span>
              <p className="text-text-secondary mt-2 text-sm leading-snug sm:text-[13px]">
                {data.badgeText}
              </p>
              <span className="bg-accent-soft mt-3 flex h-7 w-7 items-center justify-center rounded-full">
                <Heart
                  className="text-accent-2 animate-heartbeat h-3.5 w-3.5"
                  fill="currentColor"
                />
              </span>
            </div>

            <div className="relative mx-auto aspect-square w-full sm:aspect-auto sm:h-full">
              <div className="animate-orbit-spin border-line absolute inset-0 rounded-full border border-dashed" />
              <div className="animate-orbit-spin-reverse border-line-soft absolute inset-3 rounded-full border" />
              <div className="border-line-soft absolute inset-6 rounded-full border" />
              <div className="glow-orb animate-pulse-glow absolute inset-0 rounded-full" />

              <div className="absolute inset-0 animate-[orbit-particle_9s_linear_infinite]">
                <span className="bg-accent-2 absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full shadow-[0_0_12px_3px_rgba(90,169,255,0.8)]" />
              </div>
              <div className="absolute inset-0 animate-[orbit-particle_13s_linear_infinite_reverse]">
                <span className="bg-accent absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full shadow-[0_0_12px_3px_rgba(47,109,250,0.8)]" />
              </div>
              <div className="absolute inset-0 animate-[orbit-particle_16s_linear_infinite]">
                <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_10px_2px_rgba(255,255,255,0.6)]" />
              </div>

              {data.imageUrl ? (
                <div className="animate-float group absolute inset-[8%]">
                  <img
                    src={data.imageUrl}
                    alt="Robot AI đồng hành của Thegioirobot"
                    className="h-full w-full object-contain drop-shadow-[0_25px_50px_rgba(47,109,250,0.35)]"
                  />
                  <span className="bg-accent absolute top-2 right-6 h-2 w-2 animate-ping rounded-full" />
                  <span className="bg-accent absolute top-2 right-6 h-2 w-2 rounded-full" />
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
