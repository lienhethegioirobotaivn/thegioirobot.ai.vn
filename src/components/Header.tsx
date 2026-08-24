"use client";

import { Bot, ChevronDown, Menu, Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* Nav data — lives outside the component so it can later be swapped for a fetch/CMS call. */
const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "#vico" },
  { label: "Công nghệ", href: "#cong-nghe" },
  { label: "Giải pháp", href: "#giai-phap" },
  { label: "Về chúng tôi", href: "#ve-chung-toi" },
  { label: "Tin tức", href: "#tin-tuc" },
  { label: "Liên hệ", href: "#lien-he" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Subtle elevation once the user scrolls past the hero fold.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        isScrolled
          ? "border-line bg-void/50 backdrop-blur-xl"
          : "bg-void/40 border-transparent backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-5 sm:h-20 sm:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="border-line bg-surface group-hover:border-accent/50 relative flex h-9 w-9 items-center justify-center rounded-xl border transition-colors">
            <Bot className="text-accent-2 h-4.5 w-4.5" strokeWidth={1.75} />
          </span>
          <span className="font-display text-text-primary text-[15px] font-semibold tracking-[0.14em] sm:text-[17px]">
            THEGIOIROBOT
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === "/" && pathname === "/";
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={isActive}
                className="group/nav text-text-primary hover:text-accent-2 data-[active=true]:text-accent-2 relative py-1 text-[13.5px] font-medium tracking-wide transition-colors duration-300"
              >
                {link.label}
                <span
                  className={`bg-accent-2 absolute -bottom-1 left-0 h-px transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover/nav:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            aria-label="Tìm kiếm"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <Search className="h-4.5 w-4.5" strokeWidth={1.75} />
          </button>
          <button className="text-text-secondary hover:text-text-primary flex items-center gap-1 text-[13.5px] font-medium transition-colors">
            VI <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <Link
            href="#dung-thu"
            className="group bg-accent flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_0_0_0_rgba(47,109,250,0.5)] transition-all duration-300 hover:shadow-[0_0_24px_2px_rgba(47,109,250,0.45)]"
          >
            <Sparkles className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
            Dùng thử AI
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          aria-label={isOpen ? "Đóng menu" : "Mở menu"}
          onClick={() => setIsOpen((v) => !v)}
          className="border-line text-text-primary relative z-50 flex h-9 w-9 items-center justify-center rounded-lg border lg:hidden"
        >
          <Menu
            className={`absolute h-4.5 w-4.5 transition-all duration-300 ${
              isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <X
            className={`absolute h-4.5 w-4.5 transition-all duration-300 ${
              isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown — animated height/opacity/blur for a smooth open/close feel */}
      <div
        className={`border-line grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isOpen
            ? "grid-rows-[1fr] border-t opacity-100"
            : "grid-rows-[0fr] border-t-0 opacity-0"
        }`}
      >
        <div className="min-h-0">
          <nav className="divide-line-soft flex flex-col divide-y px-5">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  transitionDelay: isOpen ? `${i * 40 + 80}ms` : "0ms",
                }}
                className={`text-text-secondary hover:text-text-primary py-3.5 text-[15px] font-medium transition-all duration-300 ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-3 opacity-0"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 px-5 pt-4 pb-6">
            <Link
              href="#dung-thu"
              onClick={() => setIsOpen(false)}
              className="bg-accent flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold text-white"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Dùng thử AI
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
