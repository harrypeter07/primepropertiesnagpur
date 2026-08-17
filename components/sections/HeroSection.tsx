"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Search, MapPin, Sparkles, Building, LandPlot, ShieldCheck } from "lucide-react";

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const bgTextRef = useRef<HTMLDivElement | null>(null);

  const [locality, setLocality] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const categoryImages: Record<string, string> = {
    all: "/images/hero_estate.jpg",
    plot: "/images/hillside_residence.jpg",
    flat: "/images/luxury_interior.jpg",
    land: "/images/hero_estate.jpg",
    commercial: "/images/zenith_tower.jpg",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: 0.1 }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (locality) params.set("search", locality);
    if (propertyType !== "all") params.set("type", propertyType);
    params.set("city", "Nagpur");
    router.push(`/listings?${params.toString()}`);
  };

  const nagpurLocalities = [
    "Wardha Road Corridor",
    "Besa-Pipla Road",
    "Civil Lines",
    "Manish Nagar",
    "Dharampeth",
    "MIHAN SEZ",
    "Hingna Industrial Zone",
    "Koradi Road",
    "Trimurti Nagar",
    "Ramdaspeth",
  ];

  const categoryPills = [
    { label: "All Properties", value: "all" },
    { label: "NMRDA Plots", value: "plot" },
    { label: "Luxury Flats", value: "flat" },
    { label: "Farmland", value: "land" },
    { label: "Commercial", value: "commercial" },
  ];

  return (
    <section ref={heroRef} className="pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Floating Main Hero Container with Curved Corners (matching Reference Image 2 & 3) */}
      <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden min-h-[580px] sm:min-h-[660px] flex flex-col justify-between p-6 sm:p-12 lg:p-14 shadow-luxury bg-ink mt-2 sm:mt-3">
        {/* Dynamic Background Architectural Photo with Smooth Transition */}
        <div className="absolute inset-0 z-0">
          <Image
            key={activeTab}
            src={categoryImages[activeTab] || "/images/hero_estate.jpg"}
            alt="Prime Nagpur Luxury Real Estate & Plots"
            fill
            priority
            className="object-cover object-center scale-105 transition-all duration-700 ease-out"
          />
          {/* Subtle Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-900/40" />
        </div>

        {/* Top Floating Badge: 250+ Sold Across Nagpur */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl border border-white/40 max-w-[220px] transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-1">
              <span className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                250+
              </span>
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-slate-600 font-medium leading-snug">
              Plots & Luxury Flats Sold Across Prime Nagpur
            </p>
          </div>

          {/* Quick Category Switch Pills that Change Background Image */}
          <div className="hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/20">
            {categoryPills.map((pill) => (
              <button
                key={pill.value}
                onClick={() => {
                  setActiveTab(pill.value);
                  setPropertyType(pill.value);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === pill.value
                    ? "bg-white text-slate-900 shadow-md scale-105"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Center Title with Accented Color Words & Floating Search Capsule */}
        <div className="relative z-10 max-w-3xl mx-auto text-center w-full my-auto py-6">
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 font-heading drop-shadow-md"
          >
            Find Your <br />
            <span className="text-amber-400">Perfect Property</span> in{" "}
            <span className="text-orange-300">Nagpur</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-medium mb-8 max-w-xl mx-auto leading-relaxed">
            Direct NMRDA & RERA approved residential plots, luxury flats & commercial land across Wardha Road, Besa, Civil Lines & MIHAN.
          </p>

          {/* Floating Search Pill Bar */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full p-2.5 shadow-2xl max-w-2xl mx-auto border border-white/60">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex-1 flex items-center gap-2.5 pl-3 w-full">
                <MapPin className="w-5 h-5 text-clay shrink-0" />
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full bg-transparent text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer py-1.5"
                >
                  <option value="">Select Nagpur Prime Locality (All Zones)</option>
                  {nagpurLocalities.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hidden sm:block w-px h-8 bg-slate-200" />

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={propertyType}
                  onChange={(e) => {
                    setPropertyType(e.target.value);
                    setActiveTab(e.target.value);
                  }}
                  className="bg-slate-100 sm:bg-transparent text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none cursor-pointer w-full sm:w-auto"
                >
                  <option value="all">All Types</option>
                  <option value="plot">NMRDA Plots</option>
                  <option value="flat">Luxury Flats</option>
                  <option value="land">Agri Land</option>
                  <option value="commercial">Commercial</option>
                </select>

                <button
                  type="submit"
                  className="w-11 h-11 rounded-full bg-clay hover:bg-clay-dark text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shrink-0 shadow-md cursor-pointer ml-auto"
                  aria-label="Search Nagpur properties"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Floating Stats Strip (matching Reference Image 2) */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Over 500+ Verified Properties in Nagpur</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-center shadow-md">
              <span className="font-heading font-extrabold text-base text-slate-900 block leading-tight">
                500+
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Properties Listed</span>
            </div>

            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-center shadow-md">
              <span className="font-heading font-extrabold text-base text-slate-900 block leading-tight">
                98%
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Client Trust</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
