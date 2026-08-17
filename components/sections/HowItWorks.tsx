"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, ShieldCheck, MapPin, FileCheck2, CreditCard, Award } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Handpicked Asset Discovery",
      desc: "Browse curated residential plots, agricultural farmland, and luxury apartments with precise GPS coordinates, drone footage, and zoning clearances.",
      image: "/images/hero_estate.jpg",
      icon: MapPin,
    },
    {
      num: "02",
      title: "Doorstep Guided Site Visit",
      desc: "Book a complimentary cab pickup. Our licensed land surveyor will walk you through the physical boundary corner markers and layout road width on site.",
      image: "/images/hillside_residence.jpg",
      icon: MapPin,
    },
    {
      num: "03",
      title: "30-Year Title Search Audit",
      desc: "Senior high court property advocates review 30-year Encumbrance Certificates (EC), conversion orders, RERA clearances, and revenue mutation entries.",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      icon: FileCheck2,
    },
    {
      num: "04",
      title: "Transparent Token & Booking",
      desc: "Secure your preferred plot with zero broker markups. Direct seller agreement drafting and escrow-backed token deposit receipts.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      icon: CreditCard,
    },
    {
      num: "05",
      title: "Registration & Khata Conveyance",
      desc: "Complete sub-registrar stamp duty execution, physical biometric signing, and automated A-Khata transfer assistance with zero friction.",
      image: "/images/aurora_retail.jpg",
      icon: Award,
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 bg-sand-dim/50 relative border-t border-sand-dim">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono-custom text-xs text-gold tracking-widest block mb-2 font-medium">
            STREAMLINED PROCESS
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal text-stone-900 leading-tight">
            How We Simplify Your Experience
          </h2>
        </div>

        {/* Interactive Step Preview Card matching Reference Image 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[32px] p-6 sm:p-12 shadow-ambient border border-sand-dim">
          {/* Left Step Navigation Selector */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 flex items-center justify-between cursor-pointer border ${
                  activeStep === idx
                    ? "bg-sand border-clay/50 shadow-sm"
                    : "bg-transparent border-transparent hover:bg-sand/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-serif-luxury text-2xl font-medium ${
                      activeStep === idx ? "text-clay" : "text-stone-400"
                    }`}
                  >
                    {step.num}
                  </span>
                  <div>
                    <h4
                      className={`font-serif-luxury text-lg leading-tight ${
                        activeStep === idx ? "text-stone-900 font-semibold" : "text-stone-600"
                      }`}
                    >
                      {step.title}
                    </h4>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    activeStep === idx ? "text-clay translate-x-1" : "text-stone-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right Active Step Visual Showcase */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full bg-sand/40 p-6 sm:p-8 rounded-[24px] border border-sand-dim">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 shadow-md bg-stone-900">
              <Image
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                fill
                className="object-cover transition-opacity duration-500"
              />
              <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-mono-custom text-gold border border-gold/30">
                PHASE {steps[activeStep].num}
              </div>
            </div>

            <div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-stone-900 font-medium mb-3">
                {steps[activeStep].title}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans mb-6">
                {steps[activeStep].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
