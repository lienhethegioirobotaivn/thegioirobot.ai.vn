"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { updateHomeStats } from "@/actions/admin/home-content";
import { FormField, TextInput } from "@/components/admin/FormField";
import { SaveBar } from "@/components/admin/SaveBar";
import type { homeStats } from "@/db/schema";

type StatsData = typeof homeStats.$inferSelect;

export function StatsEditor({ data }: { data: StatsData }) {
  const [form, setForm] = useState(data);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [, startTransition] = useTransition();

  function updateItem(
    index: number,
    patch: Partial<StatsData["items"][number]>,
  ) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((it, i) =>
        i === index ? { ...it, ...patch } : it,
      ),
    }));
    setStatus("idle");
  }

  function addItem() {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { value: "", label: "" }],
    }));
    setStatus("idle");
  }

  function removeItem(index: number) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
    setStatus("idle");
  }

  function handleSave() {
    setStatus("saving");
    startTransition(async () => {
      const result = await updateHomeStats(form.id, form);
      setStatus(result.success ? "saved" : "error");
    });
  }

  return (
    <section className="border-line bg-surface rounded-2xl border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary text-[15px] font-semibold">
          Số liệu nổi bật
        </h2>
        <button
          type="button"
          onClick={addItem}
          className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold"
        >
          <Plus className="h-3.5 w-3.5" /> Thêm số liệu
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {form.items.map((item, i) => (
          <div
            key={i}
            className="border-line-soft flex items-center gap-2 rounded-xl border p-3"
          >
            <input
              value={item.value}
              onChange={(e) => updateItem(i, { value: e.target.value })}
              placeholder="10+"
              className="border-line bg-void text-text-primary w-20 rounded-xl border px-2.5 py-2 text-[13px] outline-none"
            />
            <input
              value={item.label}
              onChange={(e) => updateItem(i, { label: e.target.value })}
              placeholder="Năm nghiên cứu và phát triển"
              className="border-line bg-void text-text-primary flex-1 rounded-xl border px-3 py-2 text-[13px] outline-none"
            />
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="cursor-pointer text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <FormField label="Footnote" hint="Câu ngắn hiển thị ở cuối dải số liệu">
          <TextInput
            value={form.footnote}
            onChange={(e) =>
              setForm((p) => ({ ...p, footnote: e.target.value }))
            }
          />
        </FormField>
      </div>

      <div className="mt-6">
        <SaveBar status={status} onSave={handleSave} />
      </div>
    </section>
  );
}
