"use client";

import { AlertCircle, Check, Loader2 } from "lucide-react";

type SaveBarProps = {
  status: "idle" | "saving" | "saved" | "error";
  onSave: () => void;
  disabled?: boolean;
};

export function SaveBar({ status, onSave, disabled }: SaveBarProps) {
  return (
    <div className="flex items-center justify-end gap-3 pt-1">
      {status === "saved" ? (
        <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-emerald-400">
          <Check className="h-3.5 w-3.5" /> Đã lưu
        </span>
      ) : null}
      {status === "error" ? (
        <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-red-400">
          <AlertCircle className="h-3.5 w-3.5" /> Có lỗi, thử lại
        </span>
      ) : null}

      <button
        type="button"
        onClick={onSave}
        disabled={disabled || status === "saving"}
        className="bg-accent flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold text-white transition-shadow hover:shadow-[0_0_20px_1px_rgba(47,109,250,0.45)] disabled:opacity-60"
      >
        {status === "saving" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : null}
        {status === "saving" ? "Đang lưu..." : "Lưu thay đổi"}
      </button>
    </div>
  );
}
