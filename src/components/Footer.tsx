import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";

/* Footer link columns — kept as plain data so it can be fetched/CMS-driven later. */
const footerColumns = [
  {
    title: "Sản phẩm",
    links: ["Vico", "Robot đồng hành", "Robot dịch vụ", "Phụ kiện"],
  },
  {
    title: "Giải pháp",
    links: ["Doanh nghiệp", "Giáo dục", "Y tế", "Sản xuất & Kho vận"],
  },
  {
    title: "Công nghệ",
    links: [
      "AI & Machine Learning",
      "Thị giác máy tính",
      "Robot tự hành",
      "Nền tảng phần mềm",
    ],
  },
  {
    title: "Công ty",
    links: ["Về chúng tôi", "Sứ mệnh & Tầm nhìn", "Sự nghiệp", "Tin tức"],
  },
  {
    title: "Hỗ trợ",
    links: [
      "Trung tâm trợ giúp",
      "Hướng dẫn sử dụng",
      "Bảo hành",
      "Liên hệ hỗ trợ",
    ],
  },
];

const socials = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaYoutube, href: "#", label: "Youtube" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
];

const legalLinks = [
  "Chính sách bảo mật",
  "Điều khoản sử dụng",
  "Chính sách cookie",
];

export function Footer() {
  return (
    <footer id="lien-he" className="border-line bg-surface border-t">
      <div className="mx-auto px-5 py-16 sm:px-8 lg:py-20">
        <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_2.5fr_1.4fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="TheGioiRobot Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-text-secondary mt-5 max-w-xs text-[13.5px] leading-relaxed">
              Thegioirobot phát triển các robot AI thông minh, thân thiện và dễ
              tiếp cận, mang công nghệ vào cuộc sống theo cách tự nhiên nhất.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="border-line text-text-secondary hover:border-accent/50 hover:text-accent-2 flex h-9 w-9 items-center justify-center rounded-full border transition-all"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-text-primary text-[12px] font-semibold tracking-wider uppercase">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-text-secondary hover:text-accent-2 text-[13.5px] transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-text-primary text-[12px] font-semibold tracking-wider uppercase">
              Đăng ký nhận tin
            </h4>
            <p className="text-text-secondary mt-4 text-[13.5px] leading-relaxed">
              Nhận những cập nhật mới nhất từ Thegioirobot
            </p>
            <NewsletterForm />
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="border-line-soft text-text-secondary mt-14 flex flex-col gap-4 border-t pt-8 text-[12.5px] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 Thegioirobot AI Company. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <Link key={l} href="#" className="hover:text-accent-2">
                {l}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              Hotline: <span className="text-text-secondary">1900 1234</span>
            </span>
            <span>
              Email:{" "}
              <span className="text-text-secondary">
                hello@thegioirobot.ai.vn
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
