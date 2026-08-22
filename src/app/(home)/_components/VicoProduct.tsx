import {
  ArrowRight,
  Heart,
  MessageCircle,
  TrendingUp,
  Users,
  MessageSquareText,
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
    <section id="vico" className="border-t border-line-soft bg-surface">
      <div className="mx-auto px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <Reveal className="flex justify-center lg:justify-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-2xl font-bold uppercase tracking-wider text-accent-2">
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
                <div className="h-52 w-52 animate-float overflow-hidden rounded-[2.5rem] border border-line shadow-[0_0_50px_-12px_rgba(47,109,250,0.55)]">
                  <img
                    src={vicoImageSrc}
                    alt="Robot Vico"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute -top-3 -right-1/4 z-10 flex items-center gap-2 whitespace-nowrap rounded-2xl rounded-br-sm border border-line bg-surface-2/95 px-4 py-2.5 shadow-lg backdrop-blur-md sm:-right-14">
                  <MessageSquareText className="h-3.5 w-3.5 shrink-0 text-accent-2" />
                  <p className="text-[12px] font-medium leading-snug text-text-primary">
                    Xin chào! Mình là Vico, rất vui được gặp bạn!
                  </p>
                </div>

                <span className="absolute -bottom-1 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft">
                  <Heart
                    className="h-4 w-4 text-accent-2"
                    fill="currentColor"
                  />
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right: copy + feature grid */}
          <div>
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-tight text-accent-2 sm:text-5xl">
                VICO
              </h2>
              <p className="mt-3 text-lg font-medium text-text-primary">
                Người bạn AI đầu tiên của mọi nhà.
              </p>
              <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-text-secondary">
                Vico thông minh, đáng yêu và luôn sẵn sàng học hỏi để trở thành
                người bạn tuyệt vời của bạn và gia đình.
              </p>
              <Link
                href="#"
                className="w-full lg:w-fit group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[13.5px] font-semibold text-white transition-shadow hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)]"
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
                  className="flex items-start gap-3 rounded-2xl border border-line bg-void p-4 transition-colors hover:border-accent/40"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft">
                    <feature.icon
                      className="h-4.5 w-4.5 text-accent-2"
                      strokeWidth={1.75}
                    />
                  </span>
                  <div>
                    <h3 className="text-[13.5px] font-semibold text-text-primary">
                      {feature.title}
                    </h3>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-text-secondary">
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
