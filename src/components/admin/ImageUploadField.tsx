"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { FormField } from "./FormField";

type ImageUploadFieldProps = {
  label: string;
  hint: string;
  value?: string | null;
  onChange: (url: string) => void;
  aspectClassName?: string;
};

export function ImageUploadField({
  label,
  hint,
  value,
  onChange,
  aspectClassName = "aspect-square",
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Ảnh vượt quá 2MB.");
      return;
    }

    setError(null);
    setIsUploading(true);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });

    if (uploadError) {
      setError("Upload thất bại, thử lại.");
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl);
    setIsUploading(false);
  }

  // Chỉ xoá khỏi state của form, KHÔNG đụng vào storage.
  // Việc dọn file thật sự trên bucket diễn ra ở server action khi admin bấm Lưu.
  function handleRemove() {
    onChange("");
  }

  return (
    <FormField label={label} hint={hint}>
      <div
        className={`border-line group relative w-full max-w-56 overflow-hidden rounded-xl border ${aspectClassName}`}
      >
        {value ? (
          <>
            <img src={value} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 text-transparent transition-colors hover:bg-black/40 hover:text-white"
            >
              <span className="text-[11px] font-semibold">Đổi ảnh</span>
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="bg-void text-text-secondary hover:border-accent/40 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2"
          >
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ImagePlus className="h-5 w-5" />
            )}
            <span className="text-[11px] font-medium">
              {isUploading ? "Đang tải lên..." : "Chọn ảnh"}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {error ? <p className="mt-1 text-[11px] text-red-400">{error}</p> : null}
    </FormField>
  );
}
