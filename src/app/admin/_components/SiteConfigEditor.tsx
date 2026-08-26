"use client";

import { useState, useTransition } from "react";

import { updateSiteConfig } from "@/actions/admin/site-config";
import { FormField, TextArea, TextInput } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";

type SiteConfigEditorProps = {
  config: NonNullable<
    Awaited<
      ReturnType<typeof import("@/actions/admin/site-config").getSiteConfig>
    >
  >;
};

export function SiteConfigEditor({ config }: SiteConfigEditorProps) {
  const [form, setForm] = useState(config);
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
      const result = await updateSiteConfig(form.id, form);
      setStatus(result.success ? "saved" : "error");
    });
  }

  return (
    <div className="space-y-10">
      {/* --- Cơ bản --- */}
      <section className="border-line bg-surface rounded-2xl border p-6">
        <h2 className="text-text-primary text-[15px] font-semibold">
          Thông tin cơ bản
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Tên website">
            <TextInput
              value={form.siteName}
              onChange={(e) => set("siteName", e.target.value)}
            />
          </FormField>
          <FormField label="Canonical URL">
            <TextInput
              value={form.canonicalUrl}
              onChange={(e) => set("canonicalUrl", e.target.value)}
            />
          </FormField>
          <FormField
            label="Title thẻ <title>"
            hint="Nên dưới 60 ký tự để không bị cắt trên Google"
          >
            <TextInput
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </FormField>
          <FormField
            label="Theme color"
            hint="Mã hex, dùng cho thanh trạng thái trên mobile"
          >
            <TextInput
              type="color"
              value={form.themeColor}
              onChange={(e) => set("themeColor", e.target.value)}
              className="h-10 w-20"
            />
          </FormField>
          <FormField label="Meta description" hint="Nên 150–160 ký tự">
            <TextArea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </FormField>
          <FormField label="Keywords" hint="Phân cách bằng dấu phẩy">
            <TextArea
              rows={3}
              value={form.keywords}
              onChange={(e) => set("keywords", e.target.value)}
            />
          </FormField>
        </div>
      </section>

      {/* --- Icons --- */}
      <section className="border-line bg-surface rounded-2xl border p-6">
        <h2 className="text-text-primary text-[15px] font-semibold">
          Favicon & Icon
        </h2>
        <div className="mt-5 flex flex-wrap gap-8">
          <ImageUploadField
            label="Favicon"
            hint="Tỉ lệ 1:1, khuyến nghị 512×512px (PNG), hiển thị trên tab trình duyệt"
            value={form.faviconUrl}
            onChange={(url) => set("faviconUrl", url)}
            aspectClassName="aspect-square"
          />
          <ImageUploadField
            label="Apple Touch Icon"
            hint="Tỉ lệ 1:1, đúng 180×180px, dùng khi lưu website ra màn hình chính iOS"
            value={form.appleTouchIconUrl}
            onChange={(url) => set("appleTouchIconUrl", url)}
            aspectClassName="aspect-square"
          />
        </div>
      </section>

      {/* --- Open Graph --- */}
      <section className="border-line bg-surface rounded-2xl border p-6">
        <h2 className="text-text-primary text-[15px] font-semibold">
          Open Graph (Facebook, LinkedIn, Zalo…)
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="OG Title">
            <TextInput
              value={form.ogTitle ?? ""}
              onChange={(e) => set("ogTitle", e.target.value)}
            />
          </FormField>
          <FormField label="OG Type">
            <TextInput
              value={form.ogType}
              onChange={(e) => set("ogType", e.target.value)}
            />
          </FormField>
          <FormField
            label="OG Description"
            hint="Nếu để trống sẽ dùng Meta description ở trên"
          >
            <TextArea
              rows={2}
              value={form.ogDescription ?? ""}
              onChange={(e) => set("ogDescription", e.target.value)}
            />
          </FormField>
        </div>
        <div className="mt-5">
          <ImageUploadField
            label="OG Image"
            hint="Tỉ lệ 1.91:1, khuyến nghị 1200×630px, JPG/PNG, tối đa 5MB — đây là ảnh hiện khi share link lên Facebook/Zalo"
            value={form.ogImageUrl}
            onChange={(url) => set("ogImageUrl", url)}
            aspectClassName="aspect-[1.91/1]"
          />
        </div>
      </section>

      {/* --- Twitter / X --- */}
      <section className="border-line bg-surface rounded-2xl border p-6">
        <h2 className="text-text-primary text-[15px] font-semibold">
          Twitter / X Card
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label="Card type"
            hint="'summary_large_image' cho ảnh lớn, 'summary' cho ảnh nhỏ vuông"
          >
            <select
              value={form.twitterCard}
              onChange={(e) => set("twitterCard", e.target.value)}
              className="border-line bg-void text-text-primary w-full rounded-xl border px-3.5 py-2.5 text-[13.5px] outline-none"
            >
              <option value="summary_large_image">summary_large_image</option>
              <option value="summary">summary</option>
            </select>
          </FormField>
          <FormField
            label="Twitter Site"
            hint="Username của trang, ví dụ @thegioirobot"
          >
            <TextInput
              value={form.twitterSite ?? ""}
              onChange={(e) => set("twitterSite", e.target.value)}
            />
          </FormField>
          <FormField label="Twitter Creator">
            <TextInput
              value={form.twitterCreator ?? ""}
              onChange={(e) => set("twitterCreator", e.target.value)}
            />
          </FormField>
        </div>
        <div className="mt-5">
          <ImageUploadField
            label="Twitter Image"
            hint="Tỉ lệ 1.91:1, khuyến nghị 1200×675px — nếu để trống sẽ dùng OG Image"
            value={form.twitterImageUrl}
            onChange={(url) => set("twitterImageUrl", url)}
            aspectClassName="aspect-[1.91/1]"
          />
        </div>
      </section>

      {/* --- Khác --- */}
      <section className="border-line bg-surface rounded-2xl border p-6">
        <h2 className="text-text-primary text-[15px] font-semibold">Khác</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label="Google Site Verification"
            hint="Dán mã verification từ Google Search Console"
          >
            <TextInput
              value={form.googleSiteVerification ?? ""}
              onChange={(e) => set("googleSiteVerification", e.target.value)}
            />
          </FormField>
          <FormField
            label="Robots"
            hint="'index, follow' để cho phép Google index; 'noindex, nofollow' để ẩn"
          >
            <TextInput
              value={form.robotsIndex}
              onChange={(e) => set("robotsIndex", e.target.value)}
            />
          </FormField>
        </div>
      </section>

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
