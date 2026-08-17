"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { BhoomiLogo } from "@/components/shared/BhoomiLogo";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/listings" },
    { name: "NMRDA Plots", href: "/listings?type=plot" },
    { name: "Luxury Flats", href: "/listings?type=flat" },
    { name: "Commercial", href: "/listings?type=commercial" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto mx-auto flex items-center justify-between rounded-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B0F19]/95 backdrop-blur-2xl py-2.5 px-6 shadow-2xl border border-slate-700/80 text-white"
            : "bg-[#0B0F19]/90 backdrop-blur-xl py-3 px-6 sm:px-8 shadow-luxury border border-slate-800 text-white"
        }`}
      >
        {/* Sleek Minimalist Brand Logo in Dark Mode */}
        <Link href="/" className="flex items-center group">
          <BhoomiLogo size="sm" theme="dark" />
        </Link>

        {/* Center Minimal Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-semibold tracking-wide transition-colors relative py-1 ${
                  isActive
                    ? "text-amber-400 font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-amber-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:+917122567890"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono-custom text-[11px]">+91 712 2567890</span>
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold tracking-wide shadow-sm hover:shadow-md transition-all duration-200 hover:scale-102 cursor-pointer"
          >
            <span>Book Visit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden mt-2 bg-[#0B0F19]/95 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl border border-slate-800 space-y-3 text-white animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="tel:+917122567890"
              className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 py-2 rounded-lg bg-slate-900 font-mono-custom"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              +91 712 2567890
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center bg-amber-400 text-slate-950 rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              Book Site Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
