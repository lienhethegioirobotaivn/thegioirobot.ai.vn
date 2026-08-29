import { Reveal } from "@/components/Reveal";
import { db } from "@/db";
import { homeStats } from "@/db/schema";

export async function Stats() {
  const [data] = await db.select().from(homeStats).limit(1);
  if (!data) {
    return null;
  }

  return (
    <section className="border-line-soft relative overflow-hidden border-t">
      <div className="grid-lines pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black_10%,transparent_75%)] opacity-30" />
      <div className="mx-auto px-6 py-14 sm:px-8 lg:px-12">
        <Reveal
          variant="scale"
          className="border-line bg-surface relative grid grid-cols-2 gap-y-10 rounded-3xl border px-6 py-10 sm:grid-cols-3 sm:px-10 lg:grid-cols-6 lg:items-center lg:gap-6"
        >
          {data.items.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-fade-slide-up text-center opacity-0 lg:text-left"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <p className="font-display text-gradient text-3xl font-bold sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-text-secondary mt-2 text-xs leading-snug tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
          <div
            className="animate-fade-slide-up text-text-secondary col-span-2 text-center text-[13px] leading-relaxed opacity-0 sm:col-span-3 lg:col-span-1 lg:text-left"
            style={{ animationDelay: `${data.items.length * 90}ms` }}
          >
            {data.footnote}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
