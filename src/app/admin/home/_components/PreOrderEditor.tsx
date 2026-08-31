"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { saveHomePreorder } from "@/actions/admin/home-content";
import { FormField, TextArea, TextInput } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SaveBar } from "@/components/admin/SaveBar";
import type {
  homePreorder,
  PreorderColorOption,
  PreorderContactField,
  PreorderImageLabel,
  PreorderPaymentOption,
  PreorderVersionOption,
} from "@/db/schema";

type PreorderItem = typeof homePreorder.$inferSelect;

const EMPTY_PREORDER: PreorderItem = {
  id: "",
  eyebrow: "",
  heading: "",
  headingHighlight: "",
  description: "",
  footnote: "",
  imageUrl: null,
  imageLabels: [],
  formTitle: "",
  formBadge: "",
  formSubtitle: "",
  versionStepTitle: "",
  versionOptions: [],
  colorStepTitle: "",
  colorOptions: [],
  colorNote: "",
  colorNoteBadge: "",
  contactStepTitle: "",
  contactFields: [],
  paymentStepTitle: "",
  paymentBadge: "",
  paymentOptions: [],
  summaryConfigLabel: "",
  summaryDepositLabel: "",
  summaryDepositAmount: "",
  summaryDisclaimer: "",
  ctaLabel: "",
  ctaFootnote: "",
  updatedAt: new Date(),
};

export function PreOrderEditor({ item }: { item: PreorderItem | null }) {
  const [form, setForm] = useState<PreorderItem>(item ?? EMPTY_PREORDER);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [, startTransition] = useTransition();

  function patch(values: Partial<PreorderItem>) {
    setForm((prev) => ({ ...prev, ...values }));
    setStatus("idle");
  }

  /* ---------- imageLabels ---------- */
  function updateImageLabel(
    index: number,
    values: Partial<PreorderImageLabel>,
  ) {
    patch({
      imageLabels: form.imageLabels.map((l, i) =>
        i === index ? { ...l, ...values } : l,
      ),
    });
  }
  function addImageLabel() {
    patch({
      imageLabels: [
        ...form.imageLabels,
        { title: "", subtitle: "", position: "bottom-left" },
      ],
    });
  }
  function removeImageLabel(index: number) {
    patch({ imageLabels: form.imageLabels.filter((_, i) => i !== index) });
  }

  /* ---------- versionOptions ---------- */
  function updateVersionOption(
    index: number,
    values: Partial<PreorderVersionOption>,
  ) {
    patch({
      versionOptions: form.versionOptions.map((v, i) =>
        i === index ? { ...v, ...values } : v,
      ),
    });
  }
  function addVersionOption() {
    patch({
      versionOptions: [
        ...form.versionOptions,
        { id: crypto.randomUUID(), name: "", description: "", imageUrl: "" },
      ],
    });
  }
  function removeVersionOption(index: number) {
    patch({
      versionOptions: form.versionOptions.filter((_, i) => i !== index),
    });
  }

  /* ---------- colorOptions ---------- */
  function updateColorOption(
    index: number,
    values: Partial<PreorderColorOption>,
  ) {
    patch({
      colorOptions: form.colorOptions.map((c, i) =>
        i === index ? { ...c, ...values } : c,
      ),
    });
  }
  function addColorOption() {
    patch({
      colorOptions: [
        ...form.colorOptions,
        { id: crypto.randomUUID(), name: "", swatch: "#3B82F6" },
      ],
    });
  }
  function removeColorOption(index: number) {
    patch({ colorOptions: form.colorOptions.filter((_, i) => i !== index) });
  }

  /* ---------- contactFields ---------- */
  function updateContactField(
    index: number,
    values: Partial<PreorderContactField>,
  ) {
    patch({
      contactFields: form.contactFields.map((f, i) =>
        i === index ? { ...f, ...values } : f,
      ),
    });
  }
  function addContactField() {
    patch({
      contactFields: [
        ...form.contactFields,
        { id: crypto.randomUUID(), label: "", placeholder: "" },
      ],
    });
  }
  function removeContactField(index: number) {
    patch({ contactFields: form.contactFields.filter((_, i) => i !== index) });
  }

  /* ---------- paymentOptions ---------- */
  function updatePaymentOption(
    index: number,
    values: Partial<PreorderPaymentOption>,
  ) {
    patch({
      paymentOptions: form.paymentOptions.map((p, i) =>
        i === index ? { ...p, ...values } : p,
      ),
    });
  }
  function addPaymentOption() {
    patch({
      paymentOptions: [
        ...form.paymentOptions,
        { id: crypto.randomUUID(), code: "", name: "", tag: null },
      ],
    });
  }
  function removePaymentOption(index: number) {
    patch({
      paymentOptions: form.paymentOptions.filter((_, i) => i !== index),
    });
  }

  function handleSave() {
    setStatus("saving");
    startTransition(async () => {
      const result = await saveHomePreorder(form);
      setStatus(result.success ? "saved" : "error");
    });
  }

  return (
    <section className="border-line bg-surface rounded-2xl border p-6">
      <div className="flex items-center gap-2">
        <h2 className="text-text-primary text-[15px] font-semibold">
          Đặt trước (Pre-order)
        </h2>
        {!item ? (
          <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
            Chưa khởi tạo — nhấn Lưu để tạo mới
          </span>
        ) : null}
      </div>

      {/* ---------- Thông tin chung ---------- */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Eyebrow">
          <TextInput
            value={form.eyebrow}
            onChange={(e) => patch({ eyebrow: e.target.value })}
          />
        </FormField>
        <FormField
          label="Tiêu đề nhấn mạnh"
          hint="Phần chữ được tô gradient trong tiêu đề"
        >
          <TextInput
            value={form.headingHighlight}
            onChange={(e) => patch({ headingHighlight: e.target.value })}
          />
        </FormField>
      </div>

      <FormField
        label="Tiêu đề"
        hint="Phải chứa nguyên văn phần 'Tiêu đề nhấn mạnh' ở trên"
      >
        <TextInput
          className="mt-3"
          value={form.heading}
          onChange={(e) => patch({ heading: e.target.value })}
        />
      </FormField>

      <FormField label="Mô tả">
        <TextArea
          className="mt-3"
          rows={3}
          value={form.description}
          onChange={(e) => patch({ description: e.target.value })}
        />
      </FormField>

      <FormField label="Ghi chú dưới ảnh">
        <TextInput
          className="mt-3"
          value={form.footnote}
          onChange={(e) => patch({ footnote: e.target.value })}
        />
      </FormField>

      <div className="mt-4">
        <ImageUploadField
          label="Ảnh sản phẩm"
          hint="Nền trong suốt, khuyến nghị vuông, tối đa 2MB"
          value={form.imageUrl}
          onChange={(url) => patch({ imageUrl: url })}
          aspectClassName="aspect-square"
        />
      </div>

      {/* ---------- Nhãn nổi trên ảnh ---------- */}
      <div className="border-line-soft mt-6 border-t pt-5">
        <div className="flex items-center justify-between">
          <h3 className="text-text-primary text-[13.5px] font-semibold">
            Nhãn nổi trên ảnh
          </h3>
          <button
            type="button"
            onClick={addImageLabel}
            className="text-accent-2 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm nhãn
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {form.imageLabels.map((label, i) => (
            <div
              key={i}
              className="border-line-soft space-y-3 rounded-xl border p-4"
            >
              <FormField label="Tiêu đề nhãn">
                <TextInput
                  value={label.title}
                  onChange={(e) =>
                    updateImageLabel(i, { title: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Phụ đề">
                <TextInput
                  value={label.subtitle}
                  onChange={(e) =>
                    updateImageLabel(i, { subtitle: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Vị trí">
                <select
                  value={label.position}
                  onChange={(e) =>
                    updateImageLabel(i, {
                      position: e.target
                        .value as PreorderImageLabel["position"],
                    })
                  }
                  className="border-line bg-void text-text-primary focus:border-accent/50 w-full rounded-xl border px-3.5 py-2.5 text-[13.5px] transition-colors outline-none"
                >
                  <option value="bottom-left">Dưới trái</option>
                  <option value="top-right">Trên phải</option>
                </select>
              </FormField>
              <button
                type="button"
                onClick={() => removeImageLabel(i)}
                className="flex cursor-pointer items-center gap-1.5 text-[12px] font-medium text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" /> Xoá nhãn
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Form đặt trước — text chung ---------- */}
      <div className="border-line-soft mt-6 border-t pt-5">
        <h3 className="text-text-primary text-[13.5px] font-semibold">
          Khối form đặt trước
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="Tiêu đề form">
            <TextInput
              value={form.formTitle}
              onChange={(e) => patch({ formTitle: e.target.value })}
            />
          </FormField>
          <FormField label="Badge">
            <TextInput
              value={form.formBadge}
              onChange={(e) => patch({ formBadge: e.target.value })}
            />
          </FormField>
          <FormField label="Phụ đề form">
            <TextInput
              value={form.formSubtitle}
              onChange={(e) => patch({ formSubtitle: e.target.value })}
            />
          </FormField>
        </div>
      </div>

      {/* ---------- Bước 01: phiên bản ---------- */}
      <div className="border-line-soft mt-6 border-t pt-5">
        <div className="flex items-center justify-between">
          <FormField label="Tiêu đề bước 01 (Chọn phiên bản)">
            <TextInput
              value={form.versionStepTitle}
              onChange={(e) => patch({ versionStepTitle: e.target.value })}
            />
          </FormField>
          <button
            type="button"
            onClick={addVersionOption}
            className="text-accent-2 ml-4 flex shrink-0 cursor-pointer items-center gap-1.5 self-end pb-2.5 text-[12.5px] font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm phiên bản
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {form.versionOptions.map((option, i) => (
            <div
              key={option.id}
              className="border-line-soft space-y-3 rounded-xl border p-4"
            >
              <ImageUploadField
                label="Ảnh phiên bản"
                hint="Nền trong suốt, tối đa 1MB"
                value={option.imageUrl}
                onChange={(url) => updateVersionOption(i, { imageUrl: url })}
                aspectClassName="aspect-square"
              />
              <FormField label="Tên phiên bản">
                <TextInput
                  value={option.name}
                  onChange={(e) =>
                    updateVersionOption(i, { name: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Mô tả ngắn">
                <TextInput
                  value={option.description}
                  onChange={(e) =>
                    updateVersionOption(i, { description: e.target.value })
                  }
                />
              </FormField>
              <button
                type="button"
                onClick={() => removeVersionOption(i)}
                className="flex cursor-pointer items-center gap-1.5 text-[12px] font-medium text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" /> Xoá phiên bản
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Bước 02: màu sắc ---------- */}
      <div className="border-line-soft mt-6 border-t pt-5">
        <div className="flex items-center justify-between">
          <FormField label="Tiêu đề bước 02 (Chọn màu sắc)">
            <TextInput
              value={form.colorStepTitle}
              onChange={(e) => patch({ colorStepTitle: e.target.value })}
            />
          </FormField>
          <button
            type="button"
            onClick={addColorOption}
            className="text-accent-2 ml-4 flex shrink-0 cursor-pointer items-center gap-1.5 self-end pb-2.5 text-[12.5px] font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm màu
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {form.colorOptions.map((option, i) => (
            <div
              key={option.id}
              className="border-line-soft space-y-3 rounded-xl border p-4"
            >
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={option.swatch}
                  onChange={(e) =>
                    updateColorOption(i, { swatch: e.target.value })
                  }
                  className="border-line-soft h-9 w-9 shrink-0 cursor-pointer rounded-lg border"
                />
                <TextInput
                  value={option.swatch}
                  onChange={(e) =>
                    updateColorOption(i, { swatch: e.target.value })
                  }
                  className="flex-1"
                />
              </div>
              <FormField label="Tên màu">
                <TextInput
                  value={option.name}
                  onChange={(e) =>
                    updateColorOption(i, { name: e.target.value })
                  }
                />
              </FormField>
              <button
                type="button"
                onClick={() => removeColorOption(i)}
                className="flex cursor-pointer items-center gap-1.5 text-[12px] font-medium text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" /> Xoá màu
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr]">
          <FormField label="Số badge ghi chú" hint="VD: 10">
            <TextInput
              className="w-24"
              value={form.colorNoteBadge}
              onChange={(e) => patch({ colorNoteBadge: e.target.value })}
            />
          </FormField>
          <FormField label="Nội dung ghi chú">
            <TextInput
              value={form.colorNote}
              onChange={(e) => patch({ colorNote: e.target.value })}
            />
          </FormField>
        </div>
      </div>

      {/* ---------- Bước 03: thông tin nhận hàng ---------- */}
      <div className="border-line-soft mt-6 border-t pt-5">
        <div className="flex items-center justify-between">
          <FormField label="Tiêu đề bước 03 (Thông tin nhận hàng)">
            <TextInput
              value={form.contactStepTitle}
              onChange={(e) => patch({ contactStepTitle: e.target.value })}
            />
          </FormField>
          <button
            type="button"
            onClick={addContactField}
            className="text-accent-2 ml-4 flex shrink-0 cursor-pointer items-center gap-1.5 self-end pb-2.5 text-[12.5px] font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm trường
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {form.contactFields.map((field, i) => (
            <div
              key={field.id}
              className="border-line-soft space-y-3 rounded-xl border p-4"
            >
              <FormField label="Nhãn">
                <TextInput
                  value={field.label}
                  onChange={(e) =>
                    updateContactField(i, { label: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Placeholder">
                <TextInput
                  value={field.placeholder}
                  onChange={(e) =>
                    updateContactField(i, { placeholder: e.target.value })
                  }
                />
              </FormField>
              <button
                type="button"
                onClick={() => removeContactField(i)}
                className="flex cursor-pointer items-center gap-1.5 text-[12px] font-medium text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" /> Xoá trường
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Bước 04: thanh toán ---------- */}
      <div className="border-line-soft mt-6 border-t pt-5">
        <div className="flex items-center justify-between">
          <FormField label="Tiêu đề bước 04 (Thanh toán)">
            <TextInput
              value={form.paymentStepTitle}
              onChange={(e) => patch({ paymentStepTitle: e.target.value })}
            />
          </FormField>
          <button
            type="button"
            onClick={addPaymentOption}
            className="text-accent-2 ml-4 flex shrink-0 cursor-pointer items-center gap-1.5 self-end pb-2.5 text-[12.5px] font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm phương thức
          </button>
        </div>

        <FormField label="Badge (VD: An toàn & bảo mật)">
          <TextInput
            className="mt-3"
            value={form.paymentBadge}
            onChange={(e) => patch({ paymentBadge: e.target.value })}
          />
        </FormField>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {form.paymentOptions.map((option, i) => (
            <div
              key={option.id}
              className="border-line-soft space-y-3 rounded-xl border p-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Mã hiển thị" hint="VD: QR, CK, VISA">
                  <TextInput
                    value={option.code}
                    onChange={(e) =>
                      updatePaymentOption(i, { code: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Tên phương thức">
                  <TextInput
                    value={option.name}
                    onChange={(e) =>
                      updatePaymentOption(i, { name: e.target.value })
                    }
                  />
                </FormField>
              </div>
              <FormField
                label="Tag nổi bật"
                hint="Để trống nếu không có, VD: Nhanh nhất"
              >
                <TextInput
                  value={option.tag ?? ""}
                  onChange={(e) =>
                    updatePaymentOption(i, { tag: e.target.value || null })
                  }
                />
              </FormField>
              <button
                type="button"
                onClick={() => removePaymentOption(i)}
                className="flex cursor-pointer items-center gap-1.5 text-[12px] font-medium text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" /> Xoá phương thức
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Tóm tắt & CTA ---------- */}
      <div className="border-line-soft mt-6 border-t pt-5">
        <h3 className="text-text-primary text-[13.5px] font-semibold">
          Khối tóm tắt & nút CTA
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Nhãn cấu hình đã chọn">
            <TextInput
              value={form.summaryConfigLabel}
              onChange={(e) => patch({ summaryConfigLabel: e.target.value })}
            />
          </FormField>
          <FormField label="Nhãn tiền đặt trước">
            <TextInput
              value={form.summaryDepositLabel}
              onChange={(e) => patch({ summaryDepositLabel: e.target.value })}
            />
          </FormField>
          <FormField label="Số tiền đặt trước" hint="VD: 1.000.000đ">
            <TextInput
              value={form.summaryDepositAmount}
              onChange={(e) => patch({ summaryDepositAmount: e.target.value })}
            />
          </FormField>
          <FormField label="Nhãn nút CTA">
            <TextInput
              value={form.ctaLabel}
              onChange={(e) => patch({ ctaLabel: e.target.value })}
            />
          </FormField>
        </div>
        <FormField label="Ghi chú dưới nút CTA">
          <TextInput
            className="mt-3"
            value={form.ctaFootnote}
            onChange={(e) => patch({ ctaFootnote: e.target.value })}
          />
        </FormField>
        <FormField label="Disclaimer (chú thích nhỏ)">
          <TextArea
            className="mt-3"
            rows={2}
            value={form.summaryDisclaimer}
            onChange={(e) => patch({ summaryDisclaimer: e.target.value })}
          />
        </FormField>
      </div>

      <div className="mt-6">
        <SaveBar status={status} onSave={handleSave} />
      </div>
    </section>
  );
}
