"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, CheckCircle2, ShieldCheck, Award, FileCheck, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseBhoomi: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!counterRef.current) return;

    const counterObj = { val: 0 };
    gsap.to(counterObj, {
      val: 800,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `${Math.floor(counterObj.val)}+`;
        }
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold text-clay tracking-widest uppercase font-mono-custom block mb-2">
          WHY CHOOSE PRIME NAGPUR PROPERTIES
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
          Trusted Real Estate Advisory in Nagpur
        </h2>
      </div>

      {/* High-Density Modern Bento Grid (fixing empty gaps) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Bento Box 1: Track Record & Stat Counter (4 cols) */}
        <div className="md:col-span-4 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold text-amber-400 uppercase font-mono-custom tracking-wider">
              VERIFIED CONVEYANCE
            </span>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-6 my-auto">
            <div>
              <span
                ref={counterRef}
                className="font-heading font-extrabold text-5xl sm:text-6xl text-white block leading-none mb-1"
              >
                0+
              </span>
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Nagpur Plots & Flats Transacted
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <span className="font-heading font-extrabold text-3xl text-amber-400 block leading-none mb-1">
                15+ Years
              </span>
              <p className="text-xs text-slate-400 font-medium">
                Premier Nagpur Land & Layout Advisory
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span>RERA Registered</span>
            <span className="font-mono-custom text-emerald-400 font-bold">100% Clear Titles</span>
          </div>
        </div>

        {/* Bento Box 2: Who We Are & Team Planning (8 cols) */}
        <div className="md:col-span-8 bg-white p-8 sm:p-10 rounded-3xl shadow-card hover:shadow-floating transition-all duration-300 border border-slate-100 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1 space-y-4">
            <span className="text-xs font-bold text-clay uppercase font-mono-custom tracking-wider">
              CERTIFIED ADVOCATES & SURVEYORS
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug font-heading">
              We eliminate the risks of unapproved plots & disputed titles in Nagpur.
            </h3>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Every parcel in our inventory undergoes a rigorous 30-year sub-registrar search report, 7/12 & 8A mutation verification, and physical Total Station GPS boundary demarcation before listing.
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>NMRDA / NIT Approved layouts with RL (Release Letter)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Complimentary doorstep cab pickup for Nagpur site visits</span>
              </div>
            </div>

            <div className="pt-3">
              <Link href="/contact">
                <MagneticButton variant="primary" size="md">
                  <span>Schedule Site Visit</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </MagneticButton>
              </Link>
            </div>
          </div>

          {/* Team Meeting Image */}
          <div className="relative w-full md:w-60 h-60 rounded-2xl overflow-hidden shrink-0 shadow-md bg-slate-100">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
              alt="Prime Nagpur Advisory Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
