"use client";

import { useState, useTransition } from "react";

import { updateHomeFinalCta } from "@/actions/admin/home-content";
import { FormField, TextArea, TextInput } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";
import type { homeFinalCta } from "@/db/schema";

type FinalCtaData = typeof homeFinalCta.$inferSelect;

export function FinalCtaEditor({ data }: { data: FinalCtaData }) {
  const [form, setForm] = useState(data);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [, startTransition] = useTransition();

  function set<K extends keyof FinalCtaData>(key: K, value: FinalCtaData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function handleSave() {
    setStatus("saving");
    startTransition(async () => {
      const result = await updateHomeFinalCta(form.id, form);
      setStatus(result.success ? "saved" : "error");
    });
  }

  return (
    <section className="border-line bg-surface rounded-2xl border p-6">
      <h2 className="text-text-primary text-[15px] font-semibold">
        Khối kêu gọi hành động cuối trang
      </h2>

      <div className="mt-5">
        <ImageUploadField
          label="Icon/Ảnh nhỏ"
          hint="Tỉ lệ 1:1, khuyến nghị 128×128px, PNG, tối đa 500KB"
          value={form.imageUrl}
          onChange={(url) => set("imageUrl", url)}
          aspectClassName="aspect-square"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <FormField label="Tiêu đề">
          <TextInput
            value={form.heading}
            onChange={(e) => set("heading", e.target.value)}
          />
        </FormField>
        <FormField label="Mô tả">
          <TextArea
            rows={2}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Nút CTA - Text">
            <TextInput
              value={form.ctaLabel}
              onChange={(e) => set("ctaLabel", e.target.value)}
            />
          </FormField>
          <FormField label="Nút CTA - Link">
            <TextInput
              value={form.ctaHref}
              onChange={(e) => set("ctaHref", e.target.value)}
            />
          </FormField>
        </div>
      </div>

      <div className="mt-6">
        <SaveBar status={status} onSave={handleSave} />
      </div>
    </section>
  );
}
