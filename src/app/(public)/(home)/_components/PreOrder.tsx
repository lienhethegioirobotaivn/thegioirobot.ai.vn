"use client";

import { Check, CircleDot } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/Reveal";

const DATA = {
  eyebrow: "PRE-ORDER • VICO_V1",
  heading: "Chọn VICO của bạn",
  headingHighlight: "của bạn",
  description:
    "Đặt trước hôm nay để giữ vị trí trong lô sản xuất đầu tiên — chọn phiên bản và màu sắc phù hợp với gia đình bạn.",
  footnote: "Ưu tiên lô sản xuất đầu tiên • Nhận xác nhận đặt trước tự động",
  imageUrl:
    "https://tlcweotcoorspkxyatwd.supabase.co/storage/v1/object/public/media/4c22d8c7-2793-4d02-90fe-9f62181488ac.png",
  imageLabels: [
    {
      title: "VICO TRÒN",
      subtitle: "Nhỏ gọn, gần gũi",
      position: "bottom-left",
    },
    {
      title: "VICO DÀI",
      subtitle: "Tinh gọn • Nổi bật",
      position: "top-right",
    },
  ],
  formTitle: "Cấu hình đơn đặt trước",
  formBadge: "Lô đầu tiên",
  formSubtitle: "Hoàn tất trong khoảng 2 phút",
  versionStep: {
    number: "01",
    title: "Chọn phiên bản",
    activeLabel: "VICO Tròn",
    options: [
      {
        id: "vico-tron",
        name: "VICO Tròn",
        description: "Nhỏ gọn, thân thiện",
        imageUrl: "",
      },
      {
        id: "vico-dai",
        name: "VICO Dài",
        description: "Cao hơn, nổi bật",
        imageUrl: "",
      },
    ],
  },
  colorStep: {
    number: "02",
    title: "Chọn màu sắc",
    options: [
      { id: "xanh-vico", name: "Xanh VICO", swatch: "#3B82F6" },
      { id: "trang-anh-kim", name: "Trắng ánh kim", swatch: "#E5E7EB" },
      { id: "den-thien-ha", name: "Đen thiên hà", swatch: "#111827" },
    ],
    note: "Bạn được đổi phiên bản hoặc màu miễn phí đến 10 ngày trước ngày giao dự kiến.",
    noteBadge: "10",
  },
  contactStep: {
    number: "03",
    title: "Thông tin nhận hàng",
    fields: [
      { id: "fullName", label: "Họ và tên", placeholder: "Họ và tên" },
      { id: "phone", label: "Số điện thoại", placeholder: "Số điện thoại" },
    ],
  },
  paymentStep: {
    number: "04",
    title: "Thanh toán tự động",
    badge: "An toàn & bảo mật",
    options: [
      { id: "qr", code: "QR", name: "Quét QR", tag: "Nhanh nhất" },
      { id: "bank", code: "CK", name: "Chuyển khoản", tag: null },
      { id: "visa", code: "VISA", name: "Thẻ quốc tế", tag: null },
    ],
  },
  summary: {
    configLabel: "Cấu hình đã chọn",
    depositLabel: "Tiền đặt trước (minh hoạ)",
    depositAmount: "1.000.000đ",
    disclaimer:
      "* Số tiền chỉ dùng để minh hoạ giao diện. Giá và chính sách đặt trước sẽ được cập nhật khi mở bán chính thức.",
  },
  ctaLabel: "Tiếp tục thanh toán",
  ctaFootnote: "Xác nhận thanh toán tự động qua email/SMS",
};

export function PreOrder() {
  const [selectedVersion, setSelectedVersion] = useState(
    DATA.versionStep.options[0].id,
  );
  const [selectedColor, setSelectedColor] = useState(
    DATA.colorStep.options[0].id,
  );
  const [selectedPayment, setSelectedPayment] = useState(
    DATA.paymentStep.options[0].id,
  );

  const activeVersion = DATA.versionStep.options.find(
    (v) => v.id === selectedVersion,
  );
  const activeColor = DATA.colorStep.options.find(
    (c) => c.id === selectedColor,
  );

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
            {DATA.eyebrow}
          </span>

          <h2 className="font-display mt-5 text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {DATA.heading.replace(DATA.headingHighlight, "").trim()}{" "}
            <span className="text-gradient bg-size-[200%_auto]">
              {DATA.headingHighlight}
            </span>
          </h2>

          <p className="text-text-secondary mt-4 max-w-md text-[15px] leading-relaxed">
            {DATA.description}
          </p>

          <div className="relative mx-auto mt-12 aspect-square w-full max-w-md">
            <div className="animate-orbit-spin border-line-soft absolute inset-4 rounded-full border border-dashed opacity-60" />
            <div className="glow-orb animate-pulse-glow absolute inset-0 rounded-full opacity-70" />

            {DATA.imageUrl ? (
              <div className="animate-float relative h-full w-full">
                <img
                  src={DATA.imageUrl}
                  alt="VICO — dòng sản phẩm robot đồng hành"
                  className="h-full w-full object-contain drop-shadow-[0_25px_50px_rgba(47,109,250,0.35)]"
                />
              </div>
            ) : null}

            {DATA.imageLabels.map((label) => (
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
            {DATA.footnote}
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
                {DATA.formTitle}
              </h3>
              <p className="text-text-secondary mt-1 text-[13px]">
                {DATA.formSubtitle}
              </p>
            </div>
            <span className="border-accent/30 bg-accent/10 text-accent-2 shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
              {DATA.formBadge}
            </span>
          </div>

          {/* Step 01 — version */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h4 className="text-text-primary flex items-center gap-2 text-sm font-semibold">
                <span className="text-accent-2">{DATA.versionStep.number}</span>
                {DATA.versionStep.title}
              </h4>
              <span className="text-text-secondary text-xs font-medium">
                {activeVersion?.name}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {DATA.versionStep.options.map((option) => {
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
              <span className="text-accent-2">{DATA.colorStep.number}</span>
              {DATA.colorStep.title}
            </h4>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {DATA.colorStep.options.map((option) => {
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
                {DATA.colorStep.noteBadge}
              </span>
              <p className="text-text-secondary text-[12.5px] leading-relaxed">
                {DATA.colorStep.note}
              </p>
            </div>
          </div>

          {/* Step 03 — contact */}
          <div className="mt-8">
            <h4 className="text-text-primary flex items-center gap-2 text-sm font-semibold">
              <span className="text-accent-2">{DATA.contactStep.number}</span>
              {DATA.contactStep.title}
            </h4>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {DATA.contactStep.fields.map((field) => (
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
                <span className="text-accent-2">{DATA.paymentStep.number}</span>
                {DATA.paymentStep.title}
              </h4>
              <span className="text-text-secondary text-xs font-medium">
                {DATA.paymentStep.badge}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {DATA.paymentStep.options.map((option) => {
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
                {DATA.summary.configLabel}
              </span>
              <span className="text-text-primary font-medium">
                {activeVersion?.name} • {activeColor?.name}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-text-secondary text-[13px]">
                {DATA.summary.depositLabel}
              </span>
              <span className="font-display text-gradient text-2xl font-bold">
                {DATA.summary.depositAmount}
              </span>
            </div>
            <p className="text-text-secondary mt-3 text-[11.5px] leading-relaxed">
              {DATA.summary.disclaimer}
            </p>
          </div>

          <button
            type="button"
            className="group bg-accent relative mt-6 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-4 text-sm font-bold tracking-wide text-white uppercase transition-shadow hover:shadow-[0_0_28px_2px_rgba(47,109,250,0.5)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {DATA.ctaLabel}
            <span aria-hidden>→</span>
          </button>

          <div className="text-text-secondary mt-4 flex items-center justify-center gap-2 text-[12px]">
            <span className="bg-accent-2 h-1.5 w-1.5 rounded-full" />
            {DATA.ctaFootnote}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
