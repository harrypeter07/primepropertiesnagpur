"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Providers } from "@/components/shared/Providers";
import { LayoutDashboard, Building2, MessageSquare, LogOut, ArrowUpRight } from "lucide-react";
import { BhoomiLogo } from "@/components/shared/BhoomiLogo";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Listings", href: "/admin/listings", icon: Building2 },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex bg-sand">
      {/* Sidebar */}
      <aside className="w-64 bg-ink text-sand flex flex-col justify-between p-6 border-r border-stone-800 shrink-0">
        <div>
          {/* Logo */}
          <Link href="/" className="inline-block mb-10 pb-6 border-b border-stone-800 w-full group">
            <BhoomiLogo size="sm" theme="dark" />
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors relative ${
                    isActive
                      ? "bg-stone-800 text-gold font-semibold"
                      : "text-stone-400 hover:text-white hover:bg-stone-800/50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-r-full" />
                  )}
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          {/* Public site shortcut */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-stone-900 text-xs font-mono-custom text-stone-300 hover:text-white mb-4 border border-stone-800"
          >
            <span>VIEW PUBLIC SITE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* User info & Signout */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
            <div className="truncate pr-2">
              <p className="text-xs font-semibold text-white truncate">
                {session?.user?.name || "Admin"}
              </p>
              <p className="text-[10px] font-mono-custom text-stone-400 truncate">
                {session?.user?.email || "admin@bhoomi.com"}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="p-2 rounded-lg text-stone-400 hover:text-danger hover:bg-stone-800 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Providers>
  );
}
