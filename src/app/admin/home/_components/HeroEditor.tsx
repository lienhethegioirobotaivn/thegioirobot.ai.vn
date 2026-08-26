"use client";

import { useState, useTransition } from "react";

import { updateHomeHero } from "@/actions/admin/home-content";
import { FormField, TextArea, TextInput } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";
import type { homeHero } from "@/db/schema";

export function HeroEditor({ data }: { data: typeof homeHero.$inferSelect }) {
  const [form, setForm] = useState(data);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [, startTransition] = useTransition();

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function handleSave() {
    setStatus("saving");
    startTransition(async () => {
      const result = await updateHomeHero(form.id, form);
      setStatus(result.success ? "saved" : "error");
    });
  }

  return (
    <section className="border-line bg-surface rounded-2xl border p-6">
      <h2 className="text-text-primary text-[15px] font-semibold">
        Hero (đầu trang)
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Eyebrow (dòng nhỏ phía trên)">
          <TextInput
            value={form.eyebrow}
            onChange={(e) => set("eyebrow", e.target.value)}
          />
        </FormField>
        <div />
        <FormField label="Dòng tiêu đề 1">
          <TextInput
            value={form.titleLine1}
            onChange={(e) => set("titleLine1", e.target.value)}
          />
        </FormField>
        <FormField label="Dòng tiêu đề gradient (nổi bật)">
          <TextInput
            value={form.titleGradient}
            onChange={(e) => set("titleGradient", e.target.value)}
          />
        </FormField>
        <FormField label="Dòng tiêu đề 2">
          <TextInput
            value={form.titleLine2}
            onChange={(e) => set("titleLine2", e.target.value)}
          />
        </FormField>
        <div />
        <FormField label="Mô tả" hint="Đoạn giới thiệu ngắn bên dưới tiêu đề">
          <TextArea
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className="sm:col-span-2"
          />
        </FormField>
      </div>

      <div className="border-line-soft mt-6 grid grid-cols-1 gap-5 border-t pt-6 sm:grid-cols-2">
        <FormField label="Nút CTA chính - Text">
          <TextInput
            value={form.primaryCtaLabel}
            onChange={(e) => set("primaryCtaLabel", e.target.value)}
          />
        </FormField>
        <FormField label="Nút CTA chính - Link">
          <TextInput
            value={form.primaryCtaHref}
            onChange={(e) => set("primaryCtaHref", e.target.value)}
          />
        </FormField>
        <FormField label="Nút CTA phụ - Text">
          <TextInput
            value={form.secondaryCtaLabel}
            onChange={(e) => set("secondaryCtaLabel", e.target.value)}
          />
        </FormField>
        <FormField label="Nút CTA phụ - Link">
          <TextInput
            value={form.secondaryCtaHref}
            onChange={(e) => set("secondaryCtaHref", e.target.value)}
          />
        </FormField>
      </div>

      <div className="border-line-soft mt-6 grid grid-cols-1 gap-5 border-t pt-6 sm:grid-cols-2">
        <FormField label="Badge - Tiêu đề" hint="Ví dụ: AI COMPANION">
          <TextInput
            value={form.badgeTitle}
            onChange={(e) => set("badgeTitle", e.target.value)}
          />
        </FormField>
        <FormField label="Badge - Mô tả">
          <TextArea
            rows={2}
            value={form.badgeText}
            onChange={(e) => set("badgeText", e.target.value)}
          />
        </FormField>
      </div>

      <div className="mt-6">
        <ImageUploadField
          label="Ảnh robot"
          hint="Tỉ lệ 1:1 (vuông), khuyến nghị 960×960px, PNG nền trong suốt tốt nhất, tối đa 2MB"
          value={form.imageUrl}
          onChange={(url) => set("imageUrl", url)}
          aspectClassName="aspect-square"
        />
      </div>

      <div className="mt-6">
        <SaveBar status={status} onSave={handleSave} />
      </div>
    </section>
  );
}
