"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { replaceHomeNews } from "@/actions/admin/home-content";
import { FormField, TextInput } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";
import type { homeNews } from "@/db/schema";

type NewsItem = typeof homeNews.$inferSelect;

export function NewsEditor({ items }: { items: NewsItem[] }) {
  const [list, setList] = useState<NewsItem[]>(items);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [, startTransition] = useTransition();

  function updateItem(index: number, patch: Partial<NewsItem>) {
    setList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
    setStatus("idle");
  }

  function addItem() {
    setList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        imageUrl: null,
        publishedAt: new Date().toLocaleDateString("vi-VN"),
        href: "#",
        isPublished: true,
        sortOrder: String(prev.length),
        updatedAt: new Date(),
      },
    ]);
    setStatus("idle");
  }

  function removeItem(index: number) {
    setList((prev) => prev.filter((_, i) => i !== index));
    setStatus("idle");
  }

  function handleSave() {
    setStatus("saving");
    startTransition(async () => {
      const result = await replaceHomeNews(
        list.map((item, i) => ({ ...item, sortOrder: String(i) })),
      );
      setStatus(result.success ? "saved" : "error");
    });
  }

  return (
    <section className="border-line bg-surface rounded-2xl border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary text-[15px] font-semibold">Tin tức</h2>
        <button
          type="button"
          onClick={addItem}
          className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold"
        >
          <Plus className="h-3.5 w-3.5" /> Thêm tin
        </button>
      </div>

      <div className="mt-5 space-y-5">
        {list.map((item, i) => (
          <div
            key={item.id}
            className="border-line-soft grid grid-cols-1 gap-4 rounded-xl border p-4 sm:grid-cols-[auto_1fr]"
          >
            <ImageUploadField
              label="Ảnh"
              hint="Tỉ lệ 4:3, khuyến nghị 800×600px, JPG/WebP, tối đa 1.5MB"
              value={item.imageUrl}
              onChange={(url) => updateItem(i, { imageUrl: url })}
              aspectClassName="aspect-4/3"
            />

            <div className="space-y-3">
              <FormField label="Tiêu đề">
                <TextInput
                  value={item.title}
                  onChange={(e) => updateItem(i, { title: e.target.value })}
                />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Ngày đăng" hint="Định dạng: 15.05.2024">
                  <TextInput
                    value={item.publishedAt}
                    onChange={(e) =>
                      updateItem(i, { publishedAt: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Link">
                  <TextInput
                    value={item.href}
                    onChange={(e) => updateItem(i, { href: e.target.value })}
                  />
                </FormField>
              </div>
              <label className="text-text-secondary flex items-center gap-2 text-[12.5px]">
                <input
                  type="checkbox"
                  checked={item.isPublished}
                  onChange={(e) =>
                    updateItem(i, { isPublished: e.target.checked })
                  }
                />
                Hiển thị công khai
              </label>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="flex cursor-pointer items-center gap-1.5 text-[12px] font-medium text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" /> Xoá tin này
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <SaveBar status={status} onSave={handleSave} />
      </div>
    </section>
  );
}
