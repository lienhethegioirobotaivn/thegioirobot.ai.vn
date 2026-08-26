"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { replaceHomePartners } from "@/actions/admin/home-content";
import { FormField, TextInput } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";
import type { homePartners } from "@/db/schema";

type PartnerItem = typeof homePartners.$inferSelect;

export function PartnersEditor({ items }: { items: PartnerItem[] }) {
  const [list, setList] = useState<PartnerItem[]>(items);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [, startTransition] = useTransition();

  function updateItem(index: number, patch: Partial<PartnerItem>) {
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
        name: "",
        logoUrl: null,
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
      const result = await replaceHomePartners(
        list.map((item, i) => ({ ...item, sortOrder: String(i) })),
      );
      setStatus(result.success ? "saved" : "error");
    });
  }

  return (
    <section className="border-line bg-surface rounded-2xl border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary text-[15px] font-semibold">
          Đối tác & nhà đầu tư
        </h2>
        <button
          type="button"
          onClick={addItem}
          className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold"
        >
          <Plus className="h-3.5 w-3.5" /> Thêm đối tác
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item, i) => (
          <div
            key={item.id}
            className="border-line-soft space-y-3 rounded-xl border p-4"
          >
            <ImageUploadField
              label="Logo"
              hint="Logo nền trong suốt, cao 80px, PNG/SVG, tối đa 1MB"
              value={item.logoUrl}
              onChange={(url) => updateItem(i, { logoUrl: url })}
              aspectClassName="aspect-2/1"
            />
            <FormField label="Tên đối tác">
              <TextInput
                value={item.name}
                onChange={(e) => updateItem(i, { name: e.target.value })}
              />
            </FormField>
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="flex cursor-pointer items-center gap-1.5 text-[12px] font-medium text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" /> Xoá
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <SaveBar status={status} onSave={handleSave} />
      </div>
    </section>
  );
}
