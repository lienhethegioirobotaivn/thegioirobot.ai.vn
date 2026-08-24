"use client";

import { ArrowRight, Heart, Play } from "lucide-react";
import Link from "next/link";

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
      <div className="grid-lines pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black_20%,transparent_80%)]" />
      <div className="glow-orb pointer-events-none absolute top-[-10%] right-[-10%] h-150 w-150 rounded-full sm:right-[5%]" />

      <div className="relative mx-auto grid grid-cols-1 items-center gap-14 px-6 pt-14 pb-20 sm:px-8 sm:pt-20 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:pt-24 lg:pb-28">
        {/* Copy */}
        <Reveal className="max-w-xl">
          <span className="text-text-secondary inline-block text-sm font-semibold tracking-widest uppercase">
            {heroContent.eyebrow}
          </span>

          <h1 className="font-display mt-5 text-[34px] leading-[1.12] font-bold tracking-tight sm:text-[44px] lg:text-[50px]">
            {heroContent.titleLine1}
            <br />
            <span className="text-gradient">{heroContent.titleGradient}</span>
            <br />
            <span className="text-text-primary">{heroContent.titleLine2}</span>
          </h1>

          <p className="text-text-secondary mt-6 max-w-md text-[15px] leading-relaxed">
            {heroContent.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={heroContent.primaryCta.href}
              className="group bg-accent flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_0_0_0_rgba(47,109,250,0.5)] transition-all duration-300 hover:shadow-[0_0_28px_2px_rgba(47,109,250,0.5)]"
            >
              {heroContent.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="group text-text-primary hover:border-accent/40 hover:bg-surface flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/4 px-6 py-3.5 text-[14px] font-semibold transition-colors"
            >
              <Play className="text-accent-2 h-3.5 w-3.5" />
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
            <div className="animate-orbit-spin border-line absolute inset-0 rounded-full border border-dashed" />
            <div className="border-line-soft absolute inset-6 rounded-full border" />
            {/* Glow disc */}
            <div className="glow-orb animate-pulse-glow absolute inset-0 rounded-full" />

            {/* Robot image */}
            <div className="animate-float border-line absolute inset-[14%] overflow-hidden rounded-[2.5rem] border shadow-[0_0_60px_-10px_rgba(47,109,250,0.6)]">
              <img
                src={heroContent.imageSrc}
                alt="Robot AI đồng hành của Thegioirobot"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Base platform */}
            <div className="bg-accent/20 absolute bottom-2 left-1/2 h-3 w-40 -translate-x-1/2 rounded-full blur-md sm:w-48" />

            {/* Feature badge */}
            <div className="border-line bg-surface/90 absolute top-4 -right-2 z-10 hidden w-52 rounded-2xl border p-4 backdrop-blur-md sm:block lg:-right-6">
              <span className="text-text-secondary text-[10px] font-semibold tracking-[0.18em] uppercase">
                {heroContent.badge.title}
              </span>
              <p className="text-text-secondary mt-2 text-[13px] leading-snug">
                {heroContent.badge.text}
              </p>
              <span className="bg-accent-soft mt-3 flex h-7 w-7 items-center justify-center rounded-full">
                <Heart
                  className="text-accent-2 h-3.5 w-3.5"
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
