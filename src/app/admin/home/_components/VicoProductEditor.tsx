"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { updateHomeVico } from "@/actions/admin/home-content";
import { FormField, TextArea, TextInput } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";
import type { homeVico } from "@/db/schema";
import { iconOptions } from "@/lib/icon-map";

type VicoData = typeof homeVico.$inferSelect;

export function VicoProductEditor({ data }: { data: VicoData }) {
  const [form, setForm] = useState(data);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [, startTransition] = useTransition();

  function set<K extends keyof VicoData>(key: K, value: VicoData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function updateFeature(
    index: number,
    patch: Partial<VicoData["features"][number]>,
  ) {
    setForm((prev) => ({
      ...prev,
      features: prev.features.map((f, i) =>
        i === index ? { ...f, ...patch } : f,
      ),
    }));
    setStatus("idle");
  }

  function addFeature() {
    setForm((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        { icon: "Heart", title: "", description: "" },
      ],
    }));
    setStatus("idle");
  }

  function removeFeature(index: number) {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
    setStatus("idle");
  }

  function handleSave() {
    setStatus("saving");
    startTransition(async () => {
      const result = await updateHomeVico(form.id, form);
      setStatus(result.success ? "saved" : "error");
    });
  }

  return (
    <section className="border-line bg-surface rounded-2xl border p-6">
      <h2 className="text-text-primary text-[15px] font-semibold">
        Sản phẩm Vico
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Eyebrow" hint="Ví dụ: Sản phẩm đầu tiên">
          <TextInput
            value={form.eyebrow}
            onChange={(e) => set("eyebrow", e.target.value)}
          />
        </FormField>
        <FormField label="Tên sản phẩm (heading lớn)">
          <TextInput
            value={form.heading}
            onChange={(e) => set("heading", e.target.value)}
          />
        </FormField>
        <FormField label="Câu giới thiệu ngắn">
          <TextInput
            value={form.subheading}
            onChange={(e) => set("subheading", e.target.value)}
          />
        </FormField>
        <FormField label="Câu thoại trong bong bóng chat">
          <TextInput
            value={form.speechBubbleText}
            onChange={(e) => set("speechBubbleText", e.target.value)}
          />
        </FormField>
        <FormField label="Mô tả" hint="Đoạn văn dài hơn bên dưới">
          <TextArea
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className="sm:col-span-2"
          />
        </FormField>
      </div>

      <div className="border-line-soft mt-6 grid grid-cols-1 gap-5 border-t pt-6 sm:grid-cols-2">
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

      <div className="mt-6">
        <ImageUploadField
          label="Ảnh robot Vico"
          hint="Tỉ lệ 1:1 (vuông), khuyến nghị 640×640px, PNG nền trong suốt, tối đa 2MB"
          value={form.imageUrl}
          onChange={(url) => set("imageUrl", url)}
          aspectClassName="aspect-square"
        />
      </div>

      <div className="border-line-soft mt-6 border-t pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-text-primary text-[13.5px] font-semibold">
            Tính năng nổi bật
          </h3>
          <button
            type="button"
            onClick={addFeature}
            className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm tính năng
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {form.features.map((feature, i) => (
            <div
              key={i}
              className="border-line-soft space-y-3 rounded-xl border p-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Icon">
                  <select
                    value={feature.icon}
                    onChange={(e) => updateFeature(i, { icon: e.target.value })}
                    className="border-line bg-void text-text-primary w-full rounded-xl border px-3 py-2 text-[13px] outline-none"
                  >
                    {iconOptions.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Tiêu đề">
                  <TextInput
                    value={feature.title}
                    onChange={(e) =>
                      updateFeature(i, { title: e.target.value })
                    }
                  />
                </FormField>
              </div>
              <FormField label="Mô tả">
                <TextInput
                  value={feature.description}
                  onChange={(e) =>
                    updateFeature(i, { description: e.target.value })
                  }
                />
              </FormField>
              <button
                type="button"
                onClick={() => removeFeature(i)}
                className="flex cursor-pointer items-center gap-1.5 text-[12px] font-medium text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" /> Xoá
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <SaveBar status={status} onSave={handleSave} />
      </div>
    </section>
  );
}
