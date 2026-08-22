import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Building2,
  Eye,
  GraduationCap,
  HandHeart,
  Languages,
  Navigation,
  Warehouse,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

/* --------------------------- Section: Giải pháp doanh nghiệp --------------------------- */
const solutionItems = [
  { icon: HandHeart, label: "Lễ tân & Chăm sóc khách hàng" },
  { icon: GraduationCap, label: "Hỗ trợ giáo dục & đào tạo" },
  { icon: Warehouse, label: "Tự động hóa nhà máy & kho vận" },
  { icon: Building2, label: "Y tế & Chăm sóc sức khỏe" },
];

/* --------------------------- Section: Công nghệ cốt lõi --------------------------- */
const techItems = [
  { icon: Languages, label: "Xử lý ngôn ngữ tự nhiên (NLP)" },
  { icon: Eye, label: "Thị giác máy tính (Computer Vision)" },
  { icon: Brain, label: "Học máy & Học tăng cường (ML, RL)" },
  { icon: Navigation, label: "Robot tự hành & Điều hướng thông minh" },
];
/* TODO: thay bằng ảnh minh hoạ công nghệ lõi thật. */
const techImageSrc =
  "https://placehold.co/560x280/0a0e1a/5ec8ff?text=AI+Core&font=raleway";

/* --------------------------- Section: Về chúng tôi --------------------------- */
const aboutStats = [
  { value: "2018", label: "Năm thành lập" },
  { value: "100+", label: "Kỹ sư & chuyên gia" },
  { value: "10+", label: "Quốc gia có mặt" },
  { value: "1M+", label: "Người dùng tin dùng" },
];

export function SolutionsTechAbout() {
  return (
    <section className="border-t border-line-soft">
      <div className="mx-auto grid grid-cols-1 gap-4 px-6 lg:px-12 py-16 sm:px-8 lg:grid-cols-3 lg:py-20">
        {/* --- Giải pháp doanh nghiệp --- */}
        <Reveal
          id="giai-phap"
          className="rounded-3xl border border-line hover:border-accent/40 bg-surface p-7"
        >
          <span className="text-sm font-black uppercase tracking-wider text-accent-2">
            Giải pháp cho doanh nghiệp
          </span>
          <h3 className="mt-3 text-[19px] font-semibold leading-snug text-text-primary">
            Tối ưu vận hành, nâng tầm trải nghiệm
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-text-secondary">
            Robot AI của chúng tôi được ứng dụng trong nhiều lĩnh vực giúp doanh
            nghiệp tự động hóa, tiết kiệm chi phí và nâng cao chất lượng dịch
            vụ.
          </p>
          <ul className="mt-6 space-y-3">
            {solutionItems.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <item.icon
                  className="h-4 w-4 shrink-0 text-accent-2"
                  strokeWidth={1.75}
                />
                <span className="text-[13px] text-text-secondary">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="#"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2 text-[13.5px] font-medium text-white transition-shadow hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)]"
          >
            Xem giải pháp
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* --- Công nghệ cốt lõi --- */}
        <Reveal
          id="cong-nghe"
          delay={100}
          className="rounded-3xl border border-line hover:border-accent/40 bg-surface p-7"
        >
          <span className="text-sm font-black uppercase tracking-wider text-accent-2">
            Công nghệ cốt lõi
          </span>
          <h3 className="mt-3 text-[19px] font-semibold leading-snug text-text-primary">
            Sức mạnh từ đổi mới
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-text-secondary">
            Chúng tôi làm chủ các công nghệ AI tiên tiến nhất để tạo ra những
            robot thực sự thông minh và hữu ích.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-line-soft">
            <img
              src={techImageSrc}
              alt="Minh hoạ công nghệ lõi AI của Thegioirobot"
              className="h-40 w-full object-cover"
            />
          </div>

          <ul className="mt-6 space-y-3">
            {techItems.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <item.icon
                  className="h-4 w-4 shrink-0 text-accent-2"
                  strokeWidth={1.75}
                />
                <span className="text-[13px] text-text-secondary">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="#"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2 text-[13.5px] font-medium text-white transition-shadow hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)]"
          >
            Tìm hiểu thêm
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* --- Về chúng tôi --- */}
        <Reveal
          id="ve-chung-toi"
          delay={200}
          className="rounded-3xl border border-line hover:border-accent/40 bg-surface p-7"
        >
          <span className="text-sm font-black uppercase tracking-wider text-accent-2">
            Về chúng tôi
          </span>
          <h3 className="mt-3 text-[19px] font-semibold leading-snug text-text-primary">
            Sứ mệnh của chúng tôi
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-text-secondary">
            Thegioirobot được thành lập với sứ mệnh mang trí tuệ nhân tạo vào
            cuộc sống, tạo ra những người bạn đồng hành robot thông minh, thân
            thiện và đáng tin cậy.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-[12px] text-text-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="#"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2 text-[13.5px] font-medium text-white transition-shadow hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)]"
          >
            Tìm hiểu thêm
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
