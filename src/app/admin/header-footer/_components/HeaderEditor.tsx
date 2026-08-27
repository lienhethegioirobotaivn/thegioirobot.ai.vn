"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { updateSiteHeader } from "@/actions/admin/site-layout";
import { FormField, TextInput } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";
import type { siteHeader } from "@/db/schema";

type HeaderData = typeof siteHeader.$inferSelect;

export function HeaderEditor({ data }: { data: HeaderData }) {
  const [form, setForm] = useState(data);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [, startTransition] = useTransition();

  function set<K extends keyof HeaderData>(key: K, value: HeaderData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function updateLink(
    index: number,
    patch: Partial<HeaderData["navLinks"][number]>,
  ) {
    set(
      "navLinks",
      form.navLinks.map((l, i) => (i === index ? { ...l, ...patch } : l)),
    );
  }

  function addLink() {
    set("navLinks", [...form.navLinks, { label: "", href: "#" }]);
  }

  function removeLink(index: number) {
    set(
      "navLinks",
      form.navLinks.filter((_, i) => i !== index),
    );
  }

  function handleSave() {
    setStatus("saving");
    startTransition(async () => {
      const result = await updateSiteHeader(form.id, form);
      setStatus(result.success ? "saved" : "error");
    });
  }

  return (
    <section className="border-line bg-surface rounded-2xl border p-6">
      <h2 className="text-text-primary text-[15px] font-semibold">Header</h2>

      <div className="mt-5">
        <ImageUploadField
          label="Logo"
          hint="Nền trong suốt, tối đa 500KB"
          value={form.logoUrl}
          onChange={(url) => set("logoUrl", url)}
          aspectClassName="aspect-[3/1]"
        />
      </div>

      <div className="border-line-soft mt-6 space-y-3 border-t pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-text-primary text-[13.5px] font-semibold">
            Menu điều hướng
          </h3>
          <button
            type="button"
            onClick={addLink}
            className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm mục
          </button>
        </div>

        {form.navLinks.map((link, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={link.label}
              onChange={(e) => updateLink(i, { label: e.target.value })}
              placeholder="Nhãn hiển thị"
              className="border-line bg-void text-text-primary flex-1 rounded-xl border px-3 py-2 text-[13px] outline-none"
            />
            <input
              value={link.href}
              onChange={(e) => updateLink(i, { href: e.target.value })}
              placeholder="#anchor hoặc /duong-dan"
              className="border-line bg-void text-text-primary flex-1 rounded-xl border px-3 py-2 text-[13px] outline-none"
            />
            <button
              type="button"
              onClick={() => removeLink(i)}
              className="cursor-pointer text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-line-soft mt-6 grid grid-cols-2 gap-3 border-t pt-6">
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
        <SaveBar status={status} onSave={handleSave} />
      </div>
    </section>
  );
}
