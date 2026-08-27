"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { updateSiteFooter } from "@/actions/admin/site-layout";
import { FormField, TextArea, TextInput } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";
import type { siteFooter } from "@/db/schema";
import { socialIconOptions } from "@/lib/social-icon-map";

type FooterData = typeof siteFooter.$inferSelect;

export function FooterEditor({ data }: { data: FooterData }) {
  const [form, setForm] = useState(data);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [, startTransition] = useTransition();

  function set<K extends keyof FooterData>(key: K, value: FooterData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function handleSave() {
    setStatus("saving");
    startTransition(async () => {
      const result = await updateSiteFooter(form.id, form);
      setStatus(result.success ? "saved" : "error");
    });
  }

  /* ---------- Socials ---------- */
  function updateSocial(
    index: number,
    patch: Partial<FooterData["socials"][number]>,
  ) {
    set(
      "socials",
      form.socials.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    );
  }
  function addSocial() {
    set("socials", [
      ...form.socials,
      { icon: "Facebook", href: "#", label: "" },
    ]);
  }
  function removeSocial(index: number) {
    set(
      "socials",
      form.socials.filter((_, i) => i !== index),
    );
  }

  /* ---------- Columns ---------- */
  function updateColumnTitle(colIndex: number, title: string) {
    set(
      "columns",
      form.columns.map((c, i) => (i === colIndex ? { ...c, title } : c)),
    );
  }
  function addColumn() {
    set("columns", [...form.columns, { title: "", links: [] }]);
  }
  function removeColumn(colIndex: number) {
    set(
      "columns",
      form.columns.filter((_, i) => i !== colIndex),
    );
  }
  function updateColumnLink(
    colIndex: number,
    linkIndex: number,
    patch: Partial<{ label: string; href: string }>,
  ) {
    set(
      "columns",
      form.columns.map((c, i) =>
        i === colIndex
          ? {
              ...c,
              links: c.links.map((l, j) =>
                j === linkIndex ? { ...l, ...patch } : l,
              ),
            }
          : c,
      ),
    );
  }
  function addColumnLink(colIndex: number) {
    set(
      "columns",
      form.columns.map((c, i) =>
        i === colIndex
          ? { ...c, links: [...c.links, { label: "", href: "#" }] }
          : c,
      ),
    );
  }
  function removeColumnLink(colIndex: number, linkIndex: number) {
    set(
      "columns",
      form.columns.map((c, i) =>
        i === colIndex
          ? { ...c, links: c.links.filter((_, j) => j !== linkIndex) }
          : c,
      ),
    );
  }

  /* ---------- Legal links ---------- */
  function updateLegalLink(
    index: number,
    patch: Partial<{ label: string; href: string }>,
  ) {
    set(
      "legalLinks",
      form.legalLinks.map((l, i) => (i === index ? { ...l, ...patch } : l)),
    );
  }
  function addLegalLink() {
    set("legalLinks", [...form.legalLinks, { label: "", href: "#" }]);
  }
  function removeLegalLink(index: number) {
    set(
      "legalLinks",
      form.legalLinks.filter((_, i) => i !== index),
    );
  }

  return (
    <section className="border-line bg-surface rounded-2xl border p-6">
      <h2 className="text-text-primary text-[15px] font-semibold">Footer</h2>

      {/* Brand */}
      <div className="mt-5 space-y-4">
        <ImageUploadField
          label="Logo"
          hint="Nền trong suốt, tối đa 500KB"
          value={form.logoUrl}
          onChange={(url) => set("logoUrl", url)}
          aspectClassName="aspect-[3/1]"
        />
        <FormField label="Mô tả thương hiệu">
          <TextArea
            rows={2}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </FormField>
      </div>

      {/* Socials */}
      <div className="border-line-soft mt-6 space-y-3 border-t pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-text-primary text-[13.5px] font-semibold">
            Mạng xã hội
          </h3>
          <button
            type="button"
            onClick={addSocial}
            className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm
          </button>
        </div>
        {form.socials.map((social, i) => (
          <div key={i} className="flex items-center gap-2">
            <select
              value={social.icon}
              onChange={(e) => updateSocial(i, { icon: e.target.value })}
              className="border-line bg-void text-text-primary rounded-xl border px-2.5 py-2 text-[12.5px] outline-none"
            >
              {socialIconOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <input
              value={social.href}
              onChange={(e) => updateSocial(i, { href: e.target.value })}
              placeholder="https://..."
              className="border-line bg-void text-text-primary flex-1 rounded-xl border px-3 py-2 text-[13px] outline-none"
            />
            <button
              type="button"
              onClick={() => removeSocial(i)}
              className="cursor-pointer text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Columns */}
      <div className="border-line-soft mt-6 space-y-5 border-t pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-text-primary text-[13.5px] font-semibold">
            Cột liên kết
          </h3>
          <button
            type="button"
            onClick={addColumn}
            className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm cột
          </button>
        </div>

        {form.columns.map((col, colIndex) => (
          <div
            key={colIndex}
            className="border-line-soft space-y-3 rounded-xl border p-4"
          >
            <div className="flex items-center gap-2">
              <input
                value={col.title}
                onChange={(e) => updateColumnTitle(colIndex, e.target.value)}
                placeholder="Tiêu đề cột"
                className="border-line bg-void text-text-primary flex-1 rounded-xl border px-3 py-2 text-[13px] font-semibold outline-none"
              />
              <button
                type="button"
                onClick={() => removeColumn(colIndex)}
                className="cursor-pointer text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 pl-2">
              {col.links.map((link, linkIndex) => (
                <div key={linkIndex} className="flex items-center gap-2">
                  <input
                    value={link.label}
                    onChange={(e) =>
                      updateColumnLink(colIndex, linkIndex, {
                        label: e.target.value,
                      })
                    }
                    placeholder="Nhãn"
                    className="border-line bg-void text-text-primary flex-1 rounded-xl border px-3 py-1.5 text-[12.5px] outline-none"
                  />
                  <input
                    value={link.href}
                    onChange={(e) =>
                      updateColumnLink(colIndex, linkIndex, {
                        href: e.target.value,
                      })
                    }
                    placeholder="Link"
                    className="border-line bg-void text-text-primary flex-1 rounded-xl border px-3 py-1.5 text-[12.5px] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeColumnLink(colIndex, linkIndex)}
                    className="cursor-pointer text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addColumnLink(colIndex)}
                className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[11.5px] font-semibold"
              >
                <Plus className="h-3 w-3" /> Thêm liên kết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="border-line-soft mt-6 grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-2">
        <FormField label="Tiêu đề newsletter">
          <TextInput
            value={form.newsletterHeading}
            onChange={(e) => set("newsletterHeading", e.target.value)}
          />
        </FormField>
        <FormField label="Mô tả newsletter">
          <TextInput
            value={form.newsletterDescription}
            onChange={(e) => set("newsletterDescription", e.target.value)}
          />
        </FormField>
      </div>

      {/* Legal links */}
      <div className="border-line-soft mt-6 space-y-3 border-t pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-text-primary text-[13.5px] font-semibold">
            Liên kết pháp lý
          </h3>
          <button
            type="button"
            onClick={addLegalLink}
            className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm
          </button>
        </div>
        {form.legalLinks.map((link, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={link.label}
              onChange={(e) => updateLegalLink(i, { label: e.target.value })}
              placeholder="Nhãn"
              className="border-line bg-void text-text-primary flex-1 rounded-xl border px-3 py-2 text-[13px] outline-none"
            />
            <input
              value={link.href}
              onChange={(e) => updateLegalLink(i, { href: e.target.value })}
              placeholder="Link"
              className="border-line bg-void text-text-primary flex-1 rounded-xl border px-3 py-2 text-[13px] outline-none"
            />
            <button
              type="button"
              onClick={() => removeLegalLink(i)}
              className="cursor-pointer text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-line-soft mt-6 grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-3">
        <FormField label="Copyright text">
          <TextInput
            value={form.copyrightText}
            onChange={(e) => set("copyrightText", e.target.value)}
          />
        </FormField>
        <FormField label="Hotline">
          <TextInput
            value={form.hotline}
            onChange={(e) => set("hotline", e.target.value)}
          />
        </FormField>
        <FormField label="Email">
          <TextInput
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </FormField>
      </div>

      <div className="mt-6">
        <SaveBar status={status} onSave={handleSave} />
      </div>
    </section>
  );
}
