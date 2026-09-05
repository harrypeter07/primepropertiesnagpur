"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin, ArrowRight, ShieldCheck, Sparkles, Building, Landmark } from "lucide-react";

export const NagpurSeoHub: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const topLocalities = [
    { name: "Wardha Road Corridor", tag: "Fastest Growth", count: "140+ Properties", href: "/listings?search=Wardha+Road" },
    { name: "Besa-Pipla Gated Plots", tag: "Top Residential", count: "95+ Plots", href: "/listings?search=Besa" },
    { name: "Civil Lines VIP Mansions", tag: "Luxury Sector", count: "42+ Flats", href: "/listings?search=Civil+Lines" },
    { name: "MIHAN SEZ Commercial", tag: "High ROI", count: "60+ Units", href: "/listings?search=MIHAN" },
    { name: "Dharampeth & Ram Nagar", tag: "Premium Heart", count: "38+ Residences", href: "/listings?search=Dharampeth" },
    { name: "Hingna Expressway Land", tag: "Agri & Farmhouses", count: "50+ Acres", href: "/listings?search=Hingna" },
    { name: "Koradi Industrial Zone", tag: "Warehousing & Plots", count: "30+ Land Parcels", href: "/listings?search=Koradi" },
    { name: "Manish Nagar & Somalwada", tag: "Connected Urban", count: "75+ Flats", href: "/listings?search=Manish+Nagar" },
  ];

  const faqs = [
    {
      q: "Why is Nagpur one of India's top real estate investment destinations?",
      a: "Nagpur sits at the geographical heart of India, with massive infrastructural developments including the Multi-modal International Cargo Hub and Airport at Nagpur (MIHAN SEZ), Nagpur Metro Phase 2, and the Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Mahamarg connecting Nagpur to Mumbai in under 8 hours. These projects have driven rapid land value appreciation across Wardha Road, Besa, and Hingna.",
    },
    {
      q: "What makes Properties Nagpur the #1 verified real estate advisory?",
      a: "Unlike generic aggregators, Properties Nagpur specializes strictly in 100% legal-cleared NMRDA (Nagpur Metropolitan Region Development Authority) sanctioned plots, RERA approved apartments, and direct NA (Non-Agricultural) lands. Every single listing comes with 30-year title verification, 7/12 extract validation, and pre-approved bank loans (SBI, HDFC, ICICI) with up to 80% LTV.",
    },
    {
      q: "What are the price trends for residential plots in Besa-Pipla and Wardha Road?",
      a: "Plot rates in Besa-Pipla and Wardha Road currently range from ₹3,000 to ₹5,500/sqft for NMRDA RL approved layouts. Gated communities with concrete roads, underground drainage, and landscaped parks have shown an average annual capital appreciation of 14% to 18% over the past 3 years.",
    },
    {
      q: "Can I schedule a guided doorstep site visit in Nagpur?",
      a: "Yes! Properties Nagpur offers complimentary doorstep pickup, site visit transportation, and guided legal survey inspections with our certified real estate advisors. You can request a visit via our 1-click WhatsApp button or directly through our site schedule form.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-mono-custom tracking-widest font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Nagpur Real Estate & Locality Guide</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          Explore Prime <span className="text-clay">Properties in Nagpur</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          The definitive search portal for genuine buyers and investors seeking verified residential plots, luxury flats, and commercial lands across Nagpur's highest-yielding corridors.
        </p>
      </div>

      {/* Nagpur Prime Localities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topLocalities.map((loc) => (
          <Link
            key={loc.name}
            href={loc.href}
            className="group p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-luxury hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-custom font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 group-hover:bg-amber-400/20 group-hover:text-amber-800 transition-colors">
                  {loc.tag}
                </span>
                <MapPin className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
                {loc.name}
              </h3>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-900 font-mono-custom">
              <span>{loc.count}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-amber-500" />
            </div>
          </Link>
        ))}
      </div>

      {/* Google SEO FAQ Accordion Container */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-card space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-mono-custom font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Buyer Intelligence</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Frequently Asked Questions About Nagpur Real Estate
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shrink-0 transition-colors"
          >
            <span>Ask a Legal Advisor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 py-2 cursor-pointer group"
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-amber-400 text-slate-950 rotate-180" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200 pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
