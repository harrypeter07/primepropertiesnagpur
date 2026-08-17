"use client";

import React from "react";
import Link from "next/link";
import { ContourDivider } from "@/components/shared/ContourDivider";
import { MagneticButton } from "@/components/shared/MagneticButton";

export const CtaBanner: React.FC = () => {
  return (
    <div className="relative bg-ink text-white overflow-hidden">
      <ContourDivider variant="wave-1" fill="#14140F" position="top" />

      {/* Faint oversized gold contour background */}
      <div className="absolute -right-24 -bottom-24 w-96 h-96 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="#C9A227">
          <circle cx="100" cy="100" r="90" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="100" cy="100" r="60" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="30" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-24 sm:py-32 text-center">
        <span className="font-mono-custom text-xs text-gold uppercase tracking-widest block mb-4 font-medium">
          DIRECT ADVISORY & PROPERTY PORTAL
        </span>
        <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-sand mb-6 leading-tight">
          Let's Secure Your Next <br />
          <span className="italic text-gold font-light">Great</span> Land Asset
        </h2>
        <p className="text-sand/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light font-sans">
          Have a land parcel or property in mind? Let's connect to discuss 30-year title due diligence, boundary coordinate demarcation, and seamless registration.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <MagneticButton variant="primary" size="lg" className="shadow-luxury">
              Schedule Private Consultation
            </MagneticButton>
          </Link>
          <Link href="/admin/login">
            <MagneticButton variant="secondary" size="lg" className="border-gold text-sand hover:bg-gold/15">
              List Your Property Free
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
