"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { updateHomeSolutionsTechAbout } from "@/actions/admin/home-content";
import { FormField, TextArea, TextInput } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";
import type { homeSolutionsTechAbout } from "@/db/schema";
import { iconOptions } from "@/lib/icon-map";

type StabData = typeof homeSolutionsTechAbout.$inferSelect;

function IconItemList({
  items,
  onChange,
}: {
  items: { icon: string; label: string }[];
  onChange: (items: { icon: string; label: string }[]) => void;
}) {
  return (
    <div className="space-y-2.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <select
            value={item.icon}
            onChange={(e) =>
              onChange(
                items.map((it, idx) =>
                  idx === i ? { ...it, icon: e.target.value } : it,
                ),
              )
            }
            className="border-line bg-void text-text-primary rounded-xl border px-2.5 py-2 text-[12.5px] outline-none"
          >
            {iconOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <input
            value={item.label}
            onChange={(e) =>
              onChange(
                items.map((it, idx) =>
                  idx === i ? { ...it, label: e.target.value } : it,
                ),
              )
            }
            className="border-line bg-void text-text-primary flex-1 rounded-xl border px-3 py-2 text-[13px] outline-none"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="cursor-pointer text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { icon: "Heart", label: "" }])}
        className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[12px] font-semibold"
      >
        <Plus className="h-3.5 w-3.5" /> Thêm mục
      </button>
    </div>
  );
}

export function SolutionsTechAboutEditor({ data }: { data: StabData }) {
  const [form, setForm] = useState(data);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [, startTransition] = useTransition();

  function set<K extends keyof StabData>(key: K, value: StabData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function handleSave() {
    setStatus("saving");
    startTransition(async () => {
      const result = await updateHomeSolutionsTechAbout(form.id, form);
      setStatus(result.success ? "saved" : "error");
    });
  }

  return (
    <section className="border-line bg-surface rounded-2xl border p-6">
      <h2 className="text-text-primary text-[15px] font-semibold">
        Giải pháp / Công nghệ / Về chúng tôi
      </h2>

      {/* Giải pháp */}
      <div className="border-line-soft mt-5 space-y-4 border-t pt-5">
        <h3 className="text-accent-2 text-[12.5px] font-bold tracking-wide uppercase">
          Giải pháp doanh nghiệp
        </h3>
        <FormField label="Tiêu đề">
          <TextInput
            value={form.solutionsHeading}
            onChange={(e) => set("solutionsHeading", e.target.value)}
          />
        </FormField>
        <FormField label="Mô tả">
          <TextArea
            rows={2}
            value={form.solutionsDescription}
            onChange={(e) => set("solutionsDescription", e.target.value)}
          />
        </FormField>
        <FormField label="Danh sách giải pháp">
          <IconItemList
            items={form.solutionsItems}
            onChange={(items) => set("solutionsItems", items)}
          />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="CTA - Text">
            <TextInput
              value={form.solutionsCtaLabel}
              onChange={(e) => set("solutionsCtaLabel", e.target.value)}
            />
          </FormField>
          <FormField label="CTA - Link">
            <TextInput
              value={form.solutionsCtaHref}
              onChange={(e) => set("solutionsCtaHref", e.target.value)}
            />
          </FormField>
        </div>
      </div>

      {/* Công nghệ */}
      <div className="border-line-soft mt-6 space-y-4 border-t pt-5">
        <h3 className="text-accent-2 text-[12.5px] font-bold tracking-wide uppercase">
          Công nghệ cốt lõi
        </h3>
        <FormField label="Tiêu đề">
          <TextInput
            value={form.techHeading}
            onChange={(e) => set("techHeading", e.target.value)}
          />
        </FormField>
        <FormField label="Mô tả">
          <TextArea
            rows={2}
            value={form.techDescription}
            onChange={(e) => set("techDescription", e.target.value)}
          />
        </FormField>
        <ImageUploadField
          label="Ảnh minh hoạ"
          hint="Tỉ lệ 2:1, khuyến nghị 800×400px, JPG/WebP, tối đa 2MB"
          value={form.techImageUrl}
          onChange={(url) => set("techImageUrl", url)}
          aspectClassName="aspect-2/1"
        />
        <FormField label="Danh sách công nghệ">
          <IconItemList
            items={form.techItems}
            onChange={(items) => set("techItems", items)}
          />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="CTA - Text">
            <TextInput
              value={form.techCtaLabel}
              onChange={(e) => set("techCtaLabel", e.target.value)}
            />
          </FormField>
          <FormField label="CTA - Link">
            <TextInput
              value={form.techCtaHref}
              onChange={(e) => set("techCtaHref", e.target.value)}
            />
          </FormField>
        </div>
      </div>

      {/* Về chúng tôi */}
      <div className="border-line-soft mt-6 space-y-4 border-t pt-5">
        <h3 className="text-accent-2 text-[12.5px] font-bold tracking-wide uppercase">
          Về chúng tôi
        </h3>
        <FormField label="Tiêu đề">
          <TextInput
            value={form.aboutHeading}
            onChange={(e) => set("aboutHeading", e.target.value)}
          />
        </FormField>
        <FormField label="Mô tả">
          <TextArea
            rows={2}
            value={form.aboutDescription}
            onChange={(e) => set("aboutDescription", e.target.value)}
          />
        </FormField>

        <FormField label="Thống kê (khuyến nghị 4 mục)">
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-3">
              {form.aboutStats.map((stat, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={stat.value}
                    onChange={(e) =>
                      set(
                        "aboutStats",
                        form.aboutStats.map((s, idx) =>
                          idx === i ? { ...s, value: e.target.value } : s,
                        ),
                      )
                    }
                    placeholder="2018"
                    className="border-line bg-void text-text-primary w-20 rounded-xl border px-2.5 py-2 text-[13px] outline-none"
                  />
                  <input
                    value={stat.label}
                    onChange={(e) =>
                      set(
                        "aboutStats",
                        form.aboutStats.map((s, idx) =>
                          idx === i ? { ...s, label: e.target.value } : s,
                        ),
                      )
                    }
                    placeholder="Năm thành lập"
                    className="border-line bg-void text-text-primary flex-1 rounded-xl border px-3 py-2 text-[13px] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        "aboutStats",
                        form.aboutStats.filter((_, idx) => idx !== i),
                      )
                    }
                    className="cursor-pointer text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                set("aboutStats", [
                  ...form.aboutStats,
                  { value: "", label: "" },
                ])
              }
              className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[12px] font-semibold"
            >
              <Plus className="h-3.5 w-3.5" /> Thêm số liệu
            </button>
          </div>
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="CTA - Text">
            <TextInput
              value={form.aboutCtaLabel}
              onChange={(e) => set("aboutCtaLabel", e.target.value)}
            />
          </FormField>
          <FormField label="CTA - Link">
            <TextInput
              value={form.aboutCtaHref}
              onChange={(e) => set("aboutCtaHref", e.target.value)}
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
