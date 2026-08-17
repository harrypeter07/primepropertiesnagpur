"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, MapPin, Building2, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export const Parallax3DTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const badge1Ref = useRef<HTMLDivElement | null>(null);
  const badge2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !imageContainerRef.current) return;

    const ctx = gsap.context(() => {
      // 3D Parallax Y-axis translation
      gsap.fromTo(
        imageContainerRef.current,
        { y: 30, scale: 0.98 },
        {
          y: -30,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Floating badges reveal
      if (badge1Ref.current) {
        gsap.fromTo(
          badge1Ref.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      if (badge2Ref.current) {
        gsap.fromTo(
          badge2Ref.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Luxury Modern Card Container */}
      <div className="bg-white rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 lg:p-16 border border-slate-100 shadow-card hover:shadow-floating transition-all duration-500 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Architectural Development Advantage */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean Editorial Eyebrow (No cheesy pill box) */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-slate-500 font-mono-custom tracking-widest uppercase">
                NMRDA & RERA SANCTIONED CORRIDORS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12] font-heading">
              Nagpur's Landmark <br />
              <span className="text-clay">Architectural Developments</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              Explore high-growth investment plots and luxury residences positioned along Nagpur's major infrastructure corridors including the Samruddhi Mahamarg & MIHAN Metro Line.
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>100% Clear Title & Non-Agricultural (NA) Release Orders</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Pre-Approved Bank Loans (SBI, HDFC, ICICI) with 80% LTV</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link href="/listings?city=Nagpur">
                <MagneticButton variant="primary" size="md">
                  <span>Explore Nagpur Inventory</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </MagneticButton>
              </Link>

              <Link
                href="/contact"
                className="px-5 py-3 rounded-full text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 transition-colors shadow-xs"
              >
                Schedule Site Visit
              </Link>
            </div>
          </div>

          {/* Right Column: Full-Bleed Luxury Architectural Showcase with Floating Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] sm:min-h-[460px]">
            {/* High-End Architectural Photo with Rounded Corners */}
            <div
              ref={imageContainerRef}
              className="relative w-full aspect-[4/3] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-floating bg-slate-100"
            >
              <Image
                src="/images/hillside_residence.jpg"
                alt="Prime Nagpur Luxury Architectural Estate"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating Glassmorphism Badge 1: MIHAN SEZ */}
            <div
              ref={badge1Ref}
              className="absolute -top-3 -right-2 sm:right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-2xl max-w-[210px] transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-2 text-clay mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono-custom">
                  MIHAN SEZ
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 leading-snug">
                15,000 Sqft Commercial Hub
              </p>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">₹4.50 Cr · Wardha Rd</p>
            </div>

            {/* Floating Glassmorphism Badge 2: Besa-Pipla */}
            <div
              ref={badge2Ref}
              className="absolute -bottom-4 -left-2 sm:left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-2xl max-w-[220px] transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono-custom">
                  BESA-PIPLA
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 leading-snug">
                NMRDA Gated Township
              </p>
              <p className="text-[11px] text-clay font-bold mt-1">Starting ₹48 Lakhs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
