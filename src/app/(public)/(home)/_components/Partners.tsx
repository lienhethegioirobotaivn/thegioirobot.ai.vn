import { Sparkles } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import type { homePartners } from "@/db/schema";

import { PartnerLogo } from "./PartnerLogo";

type PartnerItem = typeof homePartners.$inferSelect;

export function Partners({ items }: { items: PartnerItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="border-line-soft bg-surface border-t">
      <div className="mx-auto px-6 py-14 sm:px-8 lg:px-12">
        <Reveal className="flex justify-center">
          <span className="border-accent/30 bg-accent/10 text-accent-2 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold tracking-widest uppercase backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Đối tác & nhà đầu tư
          </span>
        </Reveal>
        <Reveal
          delay={100}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        >
          {items.map((partner) => (
            <PartnerLogo
              key={partner.id}
              name={partner.name}
              logoSrc={partner.logoUrl ?? undefined}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
