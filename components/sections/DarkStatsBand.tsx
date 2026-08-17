"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContourDivider } from "@/components/shared/ContourDivider";
import { FileCheck, Sparkles, ShieldCheck, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const DarkStatsBand: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const strokePathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const strokePath = strokePathRef.current;
    if (!strokePath) return;

    const length = strokePath.getTotalLength();
    gsap.set(strokePath, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(strokePath, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-ink text-white overflow-hidden">
      {/* Top Organic Contour Transition */}
      <ContourDivider variant="wave-2" fill="#14140F" position="top" />

      {/* Blueprint Crane & Construction Line Art Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] flex items-center justify-between">
        <svg viewBox="0 0 400 400" className="w-80 h-80 -left-10" fill="none" stroke="#C9A227">
          <line x1="100" y1="350" x2="100" y2="50" strokeWidth="2" />
          <line x1="100" y1="80" x2="300" y2="80" strokeWidth="2" />
          <line x1="100" y1="80" x2="50" y2="120" strokeWidth="1.5" />
          <line x1="100" y1="120" x2="250" y2="80" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        <svg viewBox="0 0 1000 400" className="w-full h-full absolute inset-0" preserveAspectRatio="none">
          <path
            ref={strokePathRef}
            d="M 0,200 Q 250,50 500,200 T 1000,200"
            fill="none"
            stroke="#C9A227"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 15+ Years Roman Emblem */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left relative">
            {/* Concentric Elevation Circles behind numeral */}
            <div className="absolute -left-6 -top-6 w-48 h-48 rounded-full border border-gold/15 pointer-events-none" />
            <div className="absolute -left-12 -top-12 w-60 h-60 rounded-full border border-gold/10 pointer-events-none" />

            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-serif-luxury text-7xl sm:text-8xl lg:text-9xl text-gold leading-none font-normal">
                15<span className="text-sand font-light">+</span>
              </span>
            </div>
            <span className="font-serif-luxury text-3xl sm:text-4xl text-sand font-light tracking-wide block mb-3">
              Years
            </span>
            <p className="text-sand/70 text-xs sm:text-sm font-sans max-w-xs leading-relaxed">
              Pioneering transparent land acquisitions, survey precision, and undisputed title conveyance.
            </p>
          </div>

          {/* Right Column: Experience That Builds Confidence */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div>
              <span className="font-mono-custom text-xs text-gold tracking-widest block mb-2 font-medium">
                BUILT ON TRUST
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-sand leading-tight mb-4">
                Experience That Builds Confidence
              </h2>
              <p className="text-sand/75 text-sm sm:text-base font-light leading-relaxed font-sans max-w-xl">
                For over 15 years, Bhoomi has delivered exceptional land advisory and certified boundary solutions. From due diligence to sub-registrar conveyance, we bring transparency to every plot.
              </p>
            </div>

            {/* 4 Trust Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-stone-800">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                <div className="w-11 h-11 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center text-gold mb-1">
                  <FileCheck className="w-5 h-5" />
                </div>
                <span className="font-mono-custom font-semibold text-lg text-white">300+</span>
                <span className="text-[11px] text-sand/65 font-sans leading-tight">Verified Parcels</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                <div className="w-11 h-11 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center text-gold mb-1">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-mono-custom font-semibold text-lg text-white">98%</span>
                <span className="text-[11px] text-sand/65 font-sans leading-tight">Client Satisfaction</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                <div className="w-11 h-11 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center text-gold mb-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-mono-custom font-semibold text-lg text-white">Expert</span>
                <span className="text-[11px] text-sand/65 font-sans leading-tight">Survey & Legal Panel</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
                <div className="w-11 h-11 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center text-gold mb-1">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-mono-custom font-semibold text-lg text-white">Assured</span>
                <span className="text-[11px] text-sand/65 font-sans leading-tight">Litigation-Free Titles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Organic Contour Transition */}
      <ContourDivider variant="wave-3" fill="#F5F0E6" position="bottom" />
    </div>
  );
};
