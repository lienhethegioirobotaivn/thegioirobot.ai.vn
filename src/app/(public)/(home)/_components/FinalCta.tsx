import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { db } from "@/db";
import { homeFinalCta } from "@/db/schema";

export async function FinalCta() {
  const [data] = await db.select().from(homeFinalCta).limit(1);
  if (!data) {
    return null;
  }

  return (
    <section
      id="dung-thu"
      className="border-line-soft relative overflow-hidden border-t"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_70%_60%_at_50%_20%,black_10%,transparent_75%)] opacity-30" />
      <div className="glow-orb animate-pulse-glow pointer-events-none absolute top-0 left-1/2 h-105 w-180 -translate-x-1/2 -translate-y-1/3" />

      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 lg:px-12 lg:py-24">
        <Reveal variant="scale">
          {data.imageUrl ? (
            <div className="animate-float border-line bg-void/40 mx-auto aspect-square w-[30%] overflow-hidden rounded-2xl border p-2 shadow-[0_0_40px_-10px_rgba(47,109,250,0.5)] sm:rounded-3xl lg:w-[16%]">
              <img
                src={data.imageUrl}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}

          <h2 className="font-display mx-auto mt-5 max-w-xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {data.heading}
          </h2>
          <p className="text-text-secondary mx-auto mt-3 max-w-md text-sm leading-relaxed lg:text-base">
            {data.description}
          </p>
          <Link
            href={data.ctaHref}
            className="group bg-accent relative mx-auto mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[14px] font-semibold text-white transition-shadow hover:shadow-[0_0_28px_2px_rgba(47,109,250,0.5)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {data.ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
