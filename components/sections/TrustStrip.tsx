"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, CheckCircle2, Award, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export const TrustStrip: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const cards = statsRef.current.children;

    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Heading & 4 Tinted Stat Cards (matching Horizon Reference Image 3) */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 font-heading">
              Your Trusted Real Estate Advisors
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Bhoomi has put together more than 15 years of surveyor-verified land acquisitions, certified GPS boundary stakes, and litigation-free title conveyance across South India.
            </p>
          </div>

          {/* 4 Tinted Stat Cards 2x2 Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4 sm:gap-5">
            {/* Card 1: 300+ Happy Clients */}
            <div className="bg-[#EDE9FE] p-6 rounded-3xl transition-transform duration-300 hover:scale-103">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#5B21B6] block mb-1">
                300+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#6D28D9]">
                Happy Landowners
              </span>
            </div>

            {/* Card 2: 5k+ Properties Sold (Deep Royal Indigo) */}
            <div className="bg-[#1E1B4B] text-white p-6 rounded-3xl shadow-lg transition-transform duration-300 hover:scale-103">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-400 block mb-1">
                5k+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                Plots & Land Sold
              </span>
            </div>

            {/* Card 3: 15+ Years of Experience */}
            <div className="bg-[#E0F2FE] p-6 rounded-3xl transition-transform duration-300 hover:scale-103">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0369A1] block mb-1">
                15+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#0284C7]">
                Years of Experience
              </span>
            </div>

            {/* Card 4: 33+ Layouts Delivered */}
            <div className="bg-[#FEF3C7] p-6 rounded-3xl transition-transform duration-300 hover:scale-103">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#B45309] block mb-1">
                33+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#D97706]">
                Layouts Delivered
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Overlapping Layered Lifestyle Imagery (matching Horizon Reference Image 3) */}
        <div className="lg:col-span-6 relative">
          {/* Main Tower / Villa Image */}
          <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-floating bg-slate-100">
            <Image
              src="/images/hillside_residence.jpg"
              alt="Luxury Estate Living"
              fill
              className="object-cover"
            />
          </div>

          {/* Floating Overlapping Lifestyle Inset Card */}
          <div className="absolute -bottom-8 -left-4 sm:-left-8 w-60 sm:w-72 aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
              alt="Happy Homeowners"
              fill
              className="object-cover"
            />
          </div>

          {/* Floating Verified Badge */}
          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">100% Clear Title</p>
              <p className="text-[10px] text-slate-500 font-mono-custom">Zero Litigation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
