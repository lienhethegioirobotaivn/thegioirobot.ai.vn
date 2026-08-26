import { Reveal } from "@/components/Reveal";
import { db } from "@/db";
import { homeStats } from "@/db/schema";

export async function Stats() {
  const [data] = await db.select().from(homeStats).limit(1);
  if (!data) {
    return null;
  }

  return (
    <section className="border-line-soft border-t">
      <div className="mx-auto px-6 py-14 sm:px-8 lg:px-12">
        <div className="border-line bg-surface grid grid-cols-2 gap-y-10 rounded-3xl border px-6 py-10 sm:grid-cols-3 sm:px-10 lg:grid-cols-6 lg:items-center lg:gap-6">
          {data.items.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 80}
              className="text-center lg:text-left"
            >
              <p className="font-display text-gradient text-3xl font-bold sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-text-secondary mt-2 text-xs leading-snug tracking-wide uppercase">
                {stat.label}
              </p>
            </Reveal>
          ))}
          <Reveal
            delay={data.items.length * 80}
            className="text-text-secondary col-span-2 text-center text-[13px] leading-relaxed sm:col-span-3 lg:col-span-1 lg:text-left"
          >
            {data.footnote}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
