"use client";

import Link from "next/link";
import { ArrowRight, Heart, Play } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------ */
/* Hero content — plain data today, swappable for a fetch() later.     */
/* ------------------------------------------------------------------ */
const heroContent = {
  eyebrow: "Empowering companions. Enriching lives.",
  titleLine1: "Chúng tôi tạo ra",
  titleGradient: "Trí tuệ đồng hành",
  titleLine2: "cho cuộc sống tốt đẹp hơn",
  description:
    "Thegioirobot phát triển các robot AI thông minh, thân thiện và dễ tiếp cận, mang công nghệ vào cuộc sống theo cách tự nhiên nhất.",
  primaryCta: { label: "Khám phá sản phẩm", href: "#vico" },
  secondaryCta: { label: "Tìm hiểu công nghệ", href: "#cong-nghe" },
  badge: {
    title: "AI COMPANION",
    text: "Robot đồng hành thông minh với cảm xúc và trí tuệ.",
  },
  /* TODO: thay bằng ảnh robot thật của thương hiệu. */
  imageSrc:
    "https://placehold.co/480x480/0a0e1a/5ec8ff?text=Robot+AI&font=raleway",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background: grid + radial glow */}
      <div className="pointer-events-none absolute inset-0 grid-lines mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black_20%,transparent_80%)]" />
      <div className="glow-orb pointer-events-none absolute right-[-10%] top-[-10%] h-150 w-150 rounded-full sm:right-[5%]" />

      <div className="relative mx-auto grid grid-cols-1 items-center gap-14 px-6 pb-20 pt-14 sm:px-8 lg:px-10 sm:pt-20 lg:grid-cols-2 lg:gap-8 lg:pb-28 lg:pt-24">
        {/* Copy */}
        <Reveal className="max-w-xl">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-text-secondary">
            {heroContent.eyebrow}
          </span>

          <h1 className="mt-5 font-display text-[34px] font-bold leading-[1.12] tracking-tight sm:text-[44px] lg:text-[50px]">
            {heroContent.titleLine1}
            <br />
            <span className="text-gradient">{heroContent.titleGradient}</span>
            <br />
            <span className="text-text-primary">{heroContent.titleLine2}</span>
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-text-secondary">
            {heroContent.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={heroContent.primaryCta.href}
              className="group flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_0_0_0_rgba(47,109,250,0.5)] transition-all duration-300 hover:shadow-[0_0_28px_2px_rgba(47,109,250,0.5)]"
            >
              {heroContent.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="bg-white/4 group flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3.5 text-[14px] font-semibold text-text-primary transition-colors hover:border-accent/40 hover:bg-surface"
            >
              <Play className="h-3.5 w-3.5 text-accent-2" />
              {heroContent.secondaryCta.label}
            </Link>
          </div>
        </Reveal>

        {/* Visual */}
        <Reveal
          variant="scale"
          delay={120}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative mx-auto aspect-square w-full max-w-105">
            {/* Orbit ring */}
            <div className="absolute inset-0 animate-orbit-spin rounded-full border border-dashed border-line" />
            <div className="absolute inset-6 rounded-full border border-line-soft" />
            {/* Glow disc */}
            <div className="glow-orb absolute inset-0 rounded-full animate-pulse-glow" />

            {/* Robot image */}
            <div className="absolute inset-[14%] animate-float overflow-hidden rounded-[2.5rem] border border-line shadow-[0_0_60px_-10px_rgba(47,109,250,0.6)]">
              <img
                src={heroContent.imageSrc}
                alt="Robot AI đồng hành của Thegioirobot"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Base platform */}
            <div className="absolute bottom-2 left-1/2 h-3 w-40 -translate-x-1/2 rounded-full bg-accent/20 blur-md sm:w-48" />

            {/* Feature badge */}
            <div className="absolute -right-2 top-4 z-10 hidden w-52 rounded-2xl border border-line bg-surface/90 p-4 backdrop-blur-md sm:block lg:-right-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
                {heroContent.badge.title}
              </span>
              <p className="mt-2 text-[13px] leading-snug text-text-secondary">
                {heroContent.badge.text}
              </p>
              <span className="mt-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft">
                <Heart
                  className="h-3.5 w-3.5 text-accent-2"
                  fill="currentColor"
                />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
