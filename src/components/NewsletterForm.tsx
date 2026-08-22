"use client";

import { Send } from "lucide-react";

export function NewsletterForm() {
  return (
    <form
      className="mt-4 flex items-center gap-2 rounded-full border border-line bg-void p-1.5 pl-4 focus-within:border-accent/50"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Email của bạn"
        className="w-full bg-transparent text-[13.5px] text-text-primary placeholder:text-text-secondary focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Đăng ký"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-105"
      >
        <Send className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </form>
  );
}
