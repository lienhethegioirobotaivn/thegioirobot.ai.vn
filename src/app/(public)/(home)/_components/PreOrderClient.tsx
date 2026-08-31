"use client";

import { Check, CircleDot } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/Reveal";
import type { homePreorder } from "@/db/schema";

type PreorderData = typeof homePreorder.$inferSelect;

export function PreOrderClient({ data }: { data: PreorderData }) {
  const [selectedVersion, setSelectedVersion] = useState(
    data.versionOptions[0]?.id ?? "",
  );
  const [selectedColor, setSelectedColor] = useState(
    data.colorOptions[0]?.id ?? "",
  );
  const [selectedPayment, setSelectedPayment] = useState(
    data.paymentOptions[0]?.id ?? "",
  );

  const activeVersion = data.versionOptions.find(
    (v) => v.id === selectedVersion,
  );
  const activeColor = data.colorOptions.find((c) => c.id === selectedColor);

  return (
    <section
      id="dat-truoc"
      className="border-line-soft relative overflow-hidden border-t"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_60%_60%_at_20%_30%,black_10%,transparent_75%)] opacity-30" />
      <div className="glow-orb pointer-events-none absolute top-1/3 left-[-10%] h-125 w-125 rounded-full opacity-50" />

      <div className="relative mx-auto grid grid-cols-1 gap-14 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:items-start lg:gap-10 lg:px-12 lg:py-24">
        {/* --- Left: product showcase --- */}
        <Reveal className="lg:sticky lg:top-28">
          <span className="border-accent/30 bg-accent/10 text-accent-2 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold tracking-widest uppercase backdrop-blur-sm">
            <CircleDot className="h-3.5 w-3.5 animate-pulse" />
            {data.eyebrow}
          </span>

          <h2 className="font-display mt-5 text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {data.heading.replace(data.headingHighlight, "").trim()}{" "}
            <span className="text-gradient bg-size-[200%_auto]">
              {data.headingHighlight}
            </span>
          </h2>

          <p className="text-text-secondary mt-4 max-w-md text-[15px] leading-relaxed">
            {data.description}
          </p>

          <div className="relative mx-auto mt-12 aspect-square w-full max-w-md">
            <div className="animate-orbit-spin border-line-soft absolute inset-4 rounded-full border border-dashed opacity-60" />
            <div className="glow-orb animate-pulse-glow absolute inset-0 rounded-full opacity-70" />

            {data.imageUrl ? (
              <div className="animate-float relative h-full w-full">
                <img
                  src={data.imageUrl}
                  alt="VICO — dòng sản phẩm robot đồng hành"
                  className="h-full w-full object-contain drop-shadow-[0_25px_50px_rgba(47,109,250,0.35)]"
                />
              </div>
            ) : null}

            {data.imageLabels.map((label) => (
              <div
                key={label.title}
                className={`border-line bg-surface-2/95 absolute z-20 w-44 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md ${
                  label.position === "top-right"
                    ? "top-6 right-0"
                    : "bottom-6 left-0"
                }`}
              >
                <p className="text-text-primary text-sm font-semibold">
                  {label.title}
                </p>
                <p className="text-text-secondary mt-0.5 text-xs">
                  {label.subtitle}
                </p>
              </div>
            ))}

            <div className="bg-accent/20 absolute bottom-2 left-1/2 h-3 w-40 -translate-x-1/2 rounded-full blur-md" />
          </div>

          <div className="text-text-secondary mt-8 flex items-center gap-2 text-[13px]">
            <span className="bg-accent-soft flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
              <Check className="text-accent-2 h-3 w-3" strokeWidth={2.5} />
            </span>
            {data.footnote}
          </div>
        </Reveal>

        {/* --- Right: order form --- */}
        <Reveal
          variant="scale"
          delay={100}
          className="border-line bg-surface rounded-3xl border p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-text-primary text-xl font-bold">
                {data.formTitle}
              </h3>
              <p className="text-text-secondary mt-1 text-[13px]">
                {data.formSubtitle}
              </p>
            </div>
            <span className="border-accent/30 bg-accent/10 text-accent-2 shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
              {data.formBadge}
            </span>
          </div>

          {/* Step 01 — version */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h4 className="text-text-primary flex items-center gap-2 text-sm font-semibold">
                <span className="text-accent-2">01</span>
                {data.versionStepTitle}
              </h4>
              <span className="text-text-secondary text-xs font-medium">
                {activeVersion?.name}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {data.versionOptions.map((option) => {
                const isActive = option.id === selectedVersion;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedVersion(option.id)}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                      isActive
                        ? "border-accent bg-accent/10"
                        : "border-line hover:border-accent/40"
                    }`}
                  >
                    <span className="bg-void border-line flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border">
                      {option.imageUrl ? (
                        <img
                          src={option.imageUrl}
                          alt={option.name}
                          className="h-full w-full object-contain"
                        />
                      ) : null}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-text-primary text-[13.5px] font-semibold">
                        {option.name}
                      </p>
                      <p className="text-text-secondary text-xs">
                        {option.description}
                      </p>
                    </div>
                    <span
                      className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        isActive
                          ? "border-accent-2"
                          : "border-text-secondary/40"
                      }`}
                    >
                      {isActive ? (
                        <span className="bg-accent-2 h-2 w-2 rounded-full" />
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 02 — color */}
          <div className="mt-8">
            <h4 className="text-text-primary flex items-center gap-2 text-sm font-semibold">
              <span className="text-accent-2">02</span>
              {data.colorStepTitle}
            </h4>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {data.colorOptions.map((option) => {
                const isActive = option.id === selectedColor;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedColor(option.id)}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
                      isActive
                        ? "border-accent bg-accent/10"
                        : "border-line hover:border-accent/40"
                    }`}
                  >
                    <span
                      className="border-line-soft h-5 w-5 shrink-0 rounded-full border shadow-inner"
                      style={{ backgroundColor: option.swatch }}
                    />
                    <span className="text-text-primary text-[13px] font-medium">
                      {option.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="border-line-soft bg-void/60 mt-3 flex items-start gap-3 rounded-xl border p-3.5">
              <span className="bg-accent-soft text-accent-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold">
                {data.colorNoteBadge}
              </span>
              <p className="text-text-secondary text-[12.5px] leading-relaxed">
                {data.colorNote}
              </p>
            </div>
          </div>

          {/* Step 03 — contact */}
          <div className="mt-8">
            <h4 className="text-text-primary flex items-center gap-2 text-sm font-semibold">
              <span className="text-accent-2">03</span>
              {data.contactStepTitle}
            </h4>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {data.contactFields.map((field) => (
                <input
                  key={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  className="border-line bg-void text-text-primary placeholder:text-text-secondary focus:border-accent/50 w-full rounded-xl border px-4 py-3 text-[13.5px] transition-colors focus:outline-none"
                />
              ))}
            </div>
          </div>

          {/* Step 04 — payment */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h4 className="text-text-primary flex items-center gap-2 text-sm font-semibold">
                <span className="text-accent-2">04</span>
                {data.paymentStepTitle}
              </h4>
              <span className="text-text-secondary text-xs font-medium">
                {data.paymentBadge}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {data.paymentOptions.map((option) => {
                const isActive = option.id === selectedPayment;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedPayment(option.id)}
                    className={`relative flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
                      isActive
                        ? "border-accent bg-accent/10"
                        : "border-line hover:border-accent/40"
                    }`}
                  >
                    {option.tag ? (
                      <span className="bg-accent-2 text-void absolute -top-2.5 right-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase">
                        {option.tag}
                      </span>
                    ) : null}
                    <span className="border-line-soft bg-void text-text-secondary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[10px] font-bold">
                      {option.code}
                    </span>
                    <span className="text-text-primary text-[13px] font-medium">
                      {option.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="border-line-soft bg-void/60 mt-8 rounded-2xl border p-5">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">
                {data.summaryConfigLabel}
              </span>
              <span className="text-text-primary font-medium">
                {activeVersion?.name} • {activeColor?.name}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-text-secondary text-[13px]">
                {data.summaryDepositLabel}
              </span>
              <span className="font-display text-gradient text-2xl font-bold">
                {data.summaryDepositAmount}
              </span>
            </div>
            <p className="text-text-secondary mt-3 text-[11.5px] leading-relaxed">
              {data.summaryDisclaimer}
            </p>
          </div>

          <button
            type="button"
            className="group bg-accent relative mt-6 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-4 text-sm font-bold tracking-wide text-white uppercase transition-shadow hover:shadow-[0_0_28px_2px_rgba(47,109,250,0.5)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {data.ctaLabel}
            <span aria-hidden>→</span>
          </button>

          <div className="text-text-secondary mt-4 flex items-center justify-center gap-2 text-[12px]">
            <span className="bg-accent-2 h-1.5 w-1.5 rounded-full" />
            {data.ctaFootnote}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
