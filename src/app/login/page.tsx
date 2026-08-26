"use client";

import { AlertCircle, Loader2, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Email hoặc mật khẩu không đúng.");
        return;
      }

      router.push("/admin");
      router.refresh();
    });
  }

  return (
    <main className="bg-void relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="grid-lines pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black_20%,transparent_80%)]" />
      <div className="glow-orb pointer-events-none absolute top-[-10%] right-[-10%] h-150 w-150 rounded-full" />

      <div className="border-line bg-surface/90 relative w-full max-w-sm rounded-3xl border p-8 backdrop-blur-md sm:p-10">
        <div className="bg-accent-soft mx-auto flex h-12 w-12 items-center justify-center rounded-2xl">
          <LockKeyhole className="text-accent-2 h-5 w-5" />
        </div>

        <h1 className="font-display text-text-primary mt-6 text-center text-xl font-bold tracking-tight">
          Đăng nhập quản trị
        </h1>
        <p className="text-text-secondary mt-2 text-center text-[13px]">
          Thegioirobot Admin Panel
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-text-secondary text-xs font-semibold tracking-wider uppercase"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-line bg-void text-text-primary focus:border-accent/50 mt-1.5 w-full rounded-xl border px-4 py-2.5 text-[14px] transition-colors outline-none"
              placeholder="admin@thegioirobot.ai.vn"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-text-secondary text-xs font-semibold tracking-wider uppercase"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-line bg-void text-text-primary focus:border-accent/50 mt-1.5 w-full rounded-xl border px-4 py-2.5 text-[14px] transition-colors outline-none"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-[13px] text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="bg-accent mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-white transition-shadow hover:shadow-[0_0_28px_2px_rgba(47,109,250,0.5)] disabled:opacity-60"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </main>
  );
}
