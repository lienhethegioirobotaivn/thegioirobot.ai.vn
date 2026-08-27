"use client";

import {
  Home,
  LayoutGrid,
  LogOut,
  Menu,
  PanelTop,
  Settings,
  Undo2,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/", label: "Quay về website", icon: Undo2 },
  { href: "/admin", label: "Cấu hình SEO", icon: Settings },
  { href: "/admin/header-footer", label: "Header & Footer", icon: PanelTop },
  { href: "/admin/home", label: "Trang chủ", icon: Home },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const content = (
    <>
      <div className="flex items-center gap-2 px-5 py-6">
        <span className="bg-accent flex h-8 w-8 items-center justify-center rounded-xl">
          <LayoutGrid className="h-4 w-4 text-white" />
        </span>
        <span className="font-display text-text-primary text-[15px] font-bold">
          Thegioirobot
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" || item.href === "/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition-colors ${
                isActive
                  ? "bg-accent-soft text-accent-2"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-line-soft border-t px-3 py-4">
        <button
          onClick={handleLogout}
          className="text-text-secondary flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition-colors hover:bg-white/5 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="border-line-soft bg-surface/95 sticky top-0 z-40 flex items-center justify-between border-b px-4 py-3 backdrop-blur-md lg:hidden">
        <span className="font-display text-text-primary text-[14px] font-bold">
          Admin
        </span>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="text-text-primary p-1.5"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="bg-surface border-line-soft absolute top-0 left-0 flex h-full w-72 flex-col border-r">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-text-secondary absolute top-5 right-4 p-1"
            >
              <X className="h-5 w-5" />
            </button>
            {content}
          </div>
        </div>
      ) : null}

      {/* Desktop sidebar */}
      <aside className="border-line-soft bg-surface sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r lg:flex">
        {content}
      </aside>
    </>
  );
}
