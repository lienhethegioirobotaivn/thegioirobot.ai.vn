import { Reveal } from "@/components/Reveal";

/* Headline stats — plain data today, easy to swap for a fetched metrics payload. */
const stats = [
  { value: "10+", label: "Năm nghiên cứu và phát triển" },
  { value: "50+", label: "Kỹ sư & nhà khoa học hàng đầu" },
  { value: "100K+", label: "Giờ huấn luyện AI mỗi ngày" },
  { value: "∞", label: "Khả năng tiến hóa" },
  { value: "1M+", label: "Người dùng trên toàn cầu" },
];

export function Stats() {
  return (
    <section className="border-line-soft border-t">
      <div className="mx-auto px-6 py-14 sm:px-8 lg:px-12">
        <div className="border-line bg-surface grid grid-cols-2 gap-y-10 rounded-3xl border px-6 py-10 sm:grid-cols-3 sm:px-10 lg:grid-cols-6 lg:items-center lg:gap-6">
          {stats.map((stat, i) => (
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
            delay={stats.length * 80}
            className="text-text-secondary col-span-2 text-center text-[13px] leading-relaxed sm:col-span-3 lg:col-span-1 lg:text-left"
          >
            Chúng tôi tin rằng công nghệ tốt nhất là công nghệ phục vụ con
            người.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
