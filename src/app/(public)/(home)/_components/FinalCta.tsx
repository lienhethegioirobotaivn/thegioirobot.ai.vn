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
      <div className="glow-orb pointer-events-none absolute top-0 left-1/2 h-105 w-180 -translate-x-1/2 -translate-y-1/3" />
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 lg:px-12 lg:py-24">
        <Reveal variant="scale">
          {data.imageUrl ? (
            <div className="mx-auto aspect-square w-[12%] max-w-28 min-w-16 overflow-hidden rounded-2xl sm:rounded-3xl">
              <img
                src={data.imageUrl}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}
          <h2 className="font-display mx-auto mt-6 max-w-xl text-2xl leading-snug font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {data.heading}
          </h2>
          <p className="text-text-secondary mx-auto mt-3 max-w-md text-sm leading-relaxed lg:text-base">
            {data.description}
          </p>
          <Link
            href={data.ctaHref}
            className="group bg-accent mx-auto mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold text-white transition-shadow hover:shadow-[0_0_28px_2px_rgba(47,109,250,0.5)]"
          >
            {data.ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
