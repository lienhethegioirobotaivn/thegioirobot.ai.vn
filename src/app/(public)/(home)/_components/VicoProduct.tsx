import { ArrowRight, MessageSquareText, Sparkles } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { db } from "@/db";
import { homeVico } from "@/db/schema";
import { getIcon } from "@/lib/icon-map";

export async function VicoProduct() {
  const [data] = await db.select().from(homeVico).limit(1);
  if (!data) {
    return null;
  }

  return (
    <section
      id="vico"
      className="border-line-soft bg-surface relative overflow-hidden border-t"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_70%_50%_at_20%_20%,black_20%,transparent_75%)] opacity-40" />
      <div className="glow-orb pointer-events-none absolute top-1/2 left-[-15%] h-125 w-125 -translate-y-1/2 rounded-full opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <Reveal className="flex justify-center lg:justify-start">
          <span className="border-accent/30 bg-accent/10 text-accent-2 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold tracking-widest uppercase backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            {data.eyebrow}
          </span>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-16">
          <Reveal
            variant="scale"
            className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
          >
            <div className="relative mx-auto w-full">
              <div className="animate-orbit-spin border-line-soft pointer-events-none absolute inset-[6%] rounded-full border border-dashed opacity-60" />
              <div className="glow-orb animate-pulse-glow pointer-events-none absolute inset-0 rounded-full opacity-70 blur-3xl" />

              {data.imageUrl ? (
                <div className="animate-float border-line bg-void/50 group relative mx-auto aspect-square w-[85%] overflow-hidden rounded-[2.5rem] border p-4 shadow-[0_0_50px_-12px_rgba(47,109,250,0.4)] sm:w-[80%] sm:p-6">
                  <img
                    src={data.imageUrl}
                    alt="Robot Vico"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="bg-accent absolute top-5 right-5 h-2 w-2 animate-ping rounded-full" />
                  <span className="bg-accent absolute top-5 right-5 h-2 w-2 rounded-full" />
                </div>
              ) : null}

              <div className="border-line bg-surface-2/95 animate-float-badge absolute -top-6 left-1/2 z-20 flex w-[70%] -translate-x-1/2 items-center gap-2 rounded-2xl border px-3.5 py-2 shadow-xl backdrop-blur-md sm:px-4 sm:py-2.5">
                <MessageSquareText className="text-accent-2 h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                <p className="text-text-primary text-xs font-medium sm:text-sm">
                  {data.speechBubbleText}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="text-gradient bg-size-[200%_auto]">
                  {data.heading}
                </span>
              </h2>
              <p className="text-text-primary mt-3 text-lg font-medium">
                {data.subheading}
              </p>
              <p className="text-text-secondary mt-3 max-w-md text-[14.5px] leading-relaxed">
                {data.description}
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.features.map((feature, i) => {
                const Icon = getIcon(feature.icon);
                return (
                  <Reveal
                    key={feature.title}
                    delay={i * 90}
                    className="border-line bg-void/60 hover:border-accent/40 hover:bg-void/80 group flex items-start gap-3.5 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(47,109,250,0.35)]"
                  >
                    <span className="bg-accent-soft group-hover:bg-accent/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors">
                      <Icon
                        className="text-accent-2 h-5 w-5 transition-transform group-hover:scale-110"
                        strokeWidth={1.75}
                      />
                    </span>
                    <div>
                      <h3 className="text-text-primary text-sm font-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary mt-1 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="mt-8">
              <Link
                href={data.ctaHref}
                className="group bg-accent relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)] sm:w-fit"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {data.ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
