import {
  ArrowRight,
  Heart,
  MessageCircle,
  MessageSquareText,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";

/* Feature list for the Vico spotlight card — data kept outside the component. */
const vicoFeatures = [
  {
    icon: Heart,
    title: "Nhận diện cảm xúc",
    description: "Hiểu cảm xúc và phản hồi một cách tinh tế.",
  },
  {
    icon: TrendingUp,
    title: "Học hỏi mỗi ngày",
    description: "Càng tương tác, Vico càng hiểu bạn hơn.",
  },
  {
    icon: MessageCircle,
    title: "Giao tiếp tự nhiên",
    description: "Trò chuyện mượt mà như với một người bạn.",
  },
  {
    icon: Users,
    title: "Kết nối gia đình",
    description: "Giúp gắn kết và mang lại niềm vui mỗi ngày.",
  },
];

/* TODO: thay bằng ảnh sản phẩm Vico thật. */
const vicoImageSrc =
  "https://placehold.co/440x440/0a0e1a/5ec8ff?text=Vico&font=raleway";

export function VicoProduct() {
  return (
    <section id="vico" className="border-line-soft bg-surface border-t">
      <div className="mx-auto px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <Reveal className="flex justify-center lg:justify-start">
          <span className="border-accent/30 bg-accent/10 text-accent-2 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-2xl font-bold tracking-wider uppercase">
            Sản phẩm đầu tiên
          </span>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
          {/* Left: robot image + speech bubble */}
          <Reveal
            variant="scale"
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative flex justify-center py-6">
              <div className="glow-orb absolute inset-0 rounded-full" />

              <div className="relative">
                <div className="animate-float border-line h-52 w-52 overflow-hidden rounded-[2.5rem] border shadow-[0_0_50px_-12px_rgba(47,109,250,0.55)]">
                  <img
                    src={vicoImageSrc}
                    alt="Robot Vico"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="border-line bg-surface-2/95 absolute -top-3 -right-1/4 z-10 flex items-center gap-2 rounded-2xl rounded-br-sm border px-4 py-2.5 whitespace-nowrap shadow-lg backdrop-blur-md sm:-right-14">
                  <MessageSquareText className="text-accent-2 h-3.5 w-3.5 shrink-0" />
                  <p className="text-text-primary text-[12px] leading-snug font-medium">
                    Xin chào! Mình là Vico, rất vui được gặp bạn!
                  </p>
                </div>

                <span className="bg-accent-soft absolute -right-2 -bottom-1 z-10 flex h-8 w-8 items-center justify-center rounded-full">
                  <Heart
                    className="text-accent-2 h-4 w-4"
                    fill="currentColor"
                  />
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right: copy + feature grid */}
          <div>
            <Reveal>
              <h2 className="font-display text-accent-2 text-4xl font-bold tracking-tight sm:text-5xl">
                VICO
              </h2>
              <p className="text-text-primary mt-3 text-lg font-medium">
                Người bạn AI đầu tiên của mọi nhà.
              </p>
              <p className="text-text-secondary mt-3 max-w-md text-[14.5px] leading-relaxed">
                Vico thông minh, đáng yêu và luôn sẵn sàng học hỏi để trở thành
                người bạn tuyệt vời của bạn và gia đình.
              </p>
              <Link
                href="#"
                className="group bg-accent mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-semibold text-white transition-shadow hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)] lg:w-fit"
              >
                Khám phá Vico
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>

            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {vicoFeatures.map((feature, i) => (
                <Reveal
                  key={feature.title}
                  delay={i * 90}
                  className="border-line bg-void hover:border-accent/40 flex items-start gap-3 rounded-2xl border p-4 transition-colors"
                >
                  <span className="bg-accent-soft flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                    <feature.icon
                      className="text-accent-2 h-4.5 w-4.5"
                      strokeWidth={1.75}
                    />
                  </span>
                  <div>
                    <h3 className="text-text-primary text-[13.5px] font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary mt-0.5 text-[12.5px] leading-snug">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
