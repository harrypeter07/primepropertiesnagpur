"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ContourDivider } from "@/components/shared/ContourDivider";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Phone, Mail, MapPin, Send, ShieldCheck, ArrowUpRight } from "lucide-react";
import { BhoomiLogo } from "@/components/shared/BhoomiLogo";
import { toast } from "sonner";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing to Properties Nagpur Market Intelligence!");
    setEmail("");
  };

  return (
    <footer className="relative bg-[#0B0F19] text-slate-300 overflow-hidden">
      <ContourDivider variant="wave-2" fill="#0B0F19" position="top" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-12 relative z-10">
        {/* Newsletter Bar */}
        <div className="bg-slate-900/90 rounded-[28px] p-6 sm:p-10 mb-16 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-custom font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Nagpur Property Alert & Investment Desk</span>
            </div>
            <h3 className="font-heading text-2xl text-white font-bold mb-1">
              Stay Ahead of Nagpur Land & Plot Launches
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Get bi-weekly NMRDA title release alerts, Wardha Road metro corridor updates & pre-launch rates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-950 border border-slate-700 text-white placeholder-slate-500 px-5 py-3 rounded-full text-xs sm:text-sm focus:outline-none focus:border-amber-400 w-full sm:w-72 transition-colors"
            />
            <MagneticButton type="submit" variant="primary" size="md">
              <Send className="w-3.5 h-3.5 mr-1" />
              Subscribe
            </MagneticButton>
          </form>
        </div>

        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Col 1: Logo & Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <BhoomiLogo size="md" theme="dark" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nagpur's benchmark surveyor-backed advisory platform for verified NMRDA plots, luxury apartments, and commercial lands across high-growth corridors.
            </p>
            <div className="font-mono-custom text-[11px] text-amber-400 font-semibold">
              RERA REG NO: MAHARERA-NAGPUR-2026
            </div>
          </div>

          {/* Col 2: Top Search Localities */}
          <div>
            <h4 className="font-heading text-base text-white font-bold mb-4">
              Top Nagpur Localities
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/listings?search=Wardha+Road" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Wardha Road Corridor</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/listings?search=Besa" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Besa-Pipla NMRDA Plots</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/listings?search=Civil+Lines" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Civil Lines Luxury Residences</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/listings?search=MIHAN" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>MIHAN SEZ Commercial Frontage</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/listings?search=Dharampeth" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Dharampeth & Ram Nagar</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Property Categories */}
          <div>
            <h4 className="font-heading text-base text-white font-bold mb-4">
              Property Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/listings?type=plot" className="hover:text-amber-400 transition-colors">
                  NMRDA Sanctioned Plots
                </Link>
              </li>
              <li>
                <Link href="/listings?type=flat" className="hover:text-amber-400 transition-colors">
                  Luxury Flats & Penthouses
                </Link>
              </li>
              <li>
                <Link href="/listings?type=commercial" className="hover:text-amber-400 transition-colors">
                  Commercial & Highway Land
                </Link>
              </li>
              <li>
                <Link href="/listings?type=land" className="hover:text-amber-400 transition-colors">
                  Agricultural Land & Orchards
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-amber-400 transition-colors">
                  Administrative Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="font-heading text-base text-white font-bold mb-4">
              Nagpur Advisory Office
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Prime Properties Hub, Wardha Road Corridor, Besa Square, Nagpur 440015</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+917122567890" className="hover:text-white font-mono-custom">
                  +91 712 2567890
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:contact@primenagpurproperties.com" className="hover:text-white">
                  contact@primenagpurproperties.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono-custom">
          <div>
            © {new Date().getFullYear()} Properties Nagpur (Prime Nagpur Properties & Advisory). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/listings" className="hover:text-slate-300 transition-colors">
              Nagpur Plots
            </Link>
            <Link href="/listings?type=flat" className="hover:text-slate-300 transition-colors">
              Nagpur Homes
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Legal Advisory
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
