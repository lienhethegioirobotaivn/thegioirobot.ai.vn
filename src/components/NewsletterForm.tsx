"use client";

import { Send } from "lucide-react";

export function NewsletterForm() {
  return (
    <form
      className="border-line bg-void focus-within:border-accent/50 mt-4 flex items-center gap-2 rounded-full border p-1.5 pl-4"
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
        className="bg-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
      >
        <Send className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </form>
  );
}
