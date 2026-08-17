"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ContourDivider } from "@/components/shared/ContourDivider";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { BhoomiLogo } from "@/components/shared/BhoomiLogo";
import { toast } from "sonner";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing to Bhoomi Land Advisory Insights!");
    setEmail("");
  };

  return (
    <footer className="relative bg-ink text-sand overflow-hidden">
      <ContourDivider variant="wave-2" fill="#14140F" position="top" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-12 relative z-10">
        {/* Newsletter Bar */}
        <div className="bg-stone-900/90 rounded-[20px] p-6 sm:p-10 mb-16 border border-stone-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-fraunces text-2xl text-white font-semibold mb-1">
              Stay Ahead of Land & Plot Market Trends
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm">
              Get bi-weekly title verification alerts & new layout launches delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-ink border border-stone-700 text-white placeholder-stone-500 px-4 py-3 rounded-full text-sm focus:outline-none focus:border-gold w-full sm:w-72"
            />
            <MagneticButton type="submit" variant="primary" size="md">
              <Send className="w-4 h-4 mr-1" />
              Subscribe
            </MagneticButton>
          </form>
        </div>

        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Col 1: Logo & Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <BhoomiLogo size="md" theme="dark" />
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed mb-6">
              South India's premier surveyor-backed advisory platform for residential plots, agricultural land, and luxury flats.
            </p>
            <div className="font-mono-custom text-[11px] text-gold">
              REGISTRATION NO: KA-RERA-2026-0819
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-fraunces text-lg text-white font-semibold mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-gold transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact Advisory Team
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-gold transition-colors">
                  Admin Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="font-fraunces text-lg text-white font-semibold mb-4">
              Property Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/listings?type=plot" className="hover:text-gold transition-colors">
                  Residential Plots
                </Link>
              </li>
              <li>
                <Link href="/listings?type=land" className="hover:text-gold transition-colors">
                  Agricultural Farmland
                </Link>
              </li>
              <li>
                <Link href="/listings?type=flat" className="hover:text-gold transition-colors">
                  Flats & Apartments
                </Link>
              </li>
              <li>
                <Link href="/listings?type=farmhouse" className="hover:text-gold transition-colors">
                  Farmhouse Estates
                </Link>
              </li>
              <li>
                <Link href="/listings?type=commercial" className="hover:text-gold transition-colors">
                  Commercial Highway Land
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-fraunces text-lg text-white font-semibold mb-4">
              Headquarters
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-clay shrink-0 mt-0.5" />
                <span>Level 4, Survey Towers, MG Road, Bengaluru, KA 560001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-clay shrink-0" />
                <span>+91 (080) 4920-8800 / +91 98450 12345</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-clay shrink-0" />
                <span>advisory@bhoomi.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono-custom">
          <div>
            © {new Date().getFullYear()} BHOOMI REAL ESTATE ADVISORY PVT LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-stone-300 transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="#" className="hover:text-stone-300 transition-colors">
              TERMS OF SERVICE
            </Link>
            <Link href="#" className="hover:text-stone-300 transition-colors">
              TITLE DISCLAIMER
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
