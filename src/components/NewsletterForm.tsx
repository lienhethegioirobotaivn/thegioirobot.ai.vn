"use client";

import { Send } from "lucide-react";

export function NewsletterForm() {
  return (
    <form
      className="border-line bg-void focus-within:border-accent/50 mt-4 flex items-center gap-2 rounded-full border p-1.5 pl-4 transition-colors"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Email của bạn"
        className="text-text-primary placeholder:text-text-secondary w-full bg-transparent text-[13.5px] focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Đăng ký"
        className="group bg-accent relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-white transition-transform hover:scale-105"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <Send className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </form>
  );
}
