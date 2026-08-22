import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const ctaImageSrc =
  "https://placehold.co/128x128/0a0e1a/5ec8ff?text=AI&font=raleway";

export function FinalCta() {
  return (
    <section
      id="dung-thu"
      className="relative overflow-hidden border-t border-line-soft"
    >
      <div className="glow-orb pointer-events-none absolute left-1/2 top-0 h-105 w-180 -translate-x-1/2 -translate-y-1/3" />
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 lg:px-12 lg:py-24">
        <Reveal variant="scale">
          <div className="mx-auto h-16 w-16 overflow-hidden rounded-2xl border border-line">
            <img
              src={ctaImageSrc}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="mx-auto mt-6 max-w-xl font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
            Sẵn sàng trải nghiệm tương lai cùng Vico?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-text-secondary">
            Tham gia cùng hàng triệu gia đình đang khám phá cuộc sống thông minh
            hơn, ấm áp hơn cùng Vico.
          </p>
          <Link
            href="#"
            className="group mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[14px] font-semibold text-white transition-shadow hover:shadow-[0_0_28px_2px_rgba(47,109,250,0.5)]"
          >
            Tìm hiểu thêm
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
