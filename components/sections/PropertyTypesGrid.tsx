"use client";

import React from "react";
import Link from "next/link";
import { Home, Tag, ShieldCheck, Users, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

export const PropertyTypesGrid: React.FC = () => {
  const services = [
    {
      title: "Property & Land Buying",
      desc: "We help you find the perfect verified residential plot, apartment, or farmland that matches your exact budget.",
      icon: Home,
      bgColor: "bg-purple-100 text-purple-700",
      href: "/listings",
    },
    {
      title: "Property & Land Selling",
      desc: "We help landowners get the best market valuation and high-intent verified buyers with zero broker markups.",
      icon: Tag,
      bgColor: "bg-blue-100 text-blue-700",
      href: "/admin/login",
    },
    {
      title: "Title Audit & GPS Survey",
      desc: "Licensed surveyors and High Court advocates verify 30-year ECs, mutation records, and physical boundary stakes.",
      icon: ShieldCheck,
      bgColor: "bg-indigo-100 text-indigo-700",
      href: "/contact",
    },
    {
      title: "Real Estate Consultation",
      desc: "Dedicated relationship managers guide you through sub-registrar registration, stamp duty, and automated A-Khata transfer.",
      icon: Users,
      bgColor: "bg-amber-100 text-amber-800",
      href: "/contact",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 font-heading">
          Our Services
        </h2>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Comprehensive, surveyor-backed real estate advisory tailored for hassle-free land ownership.
        </p>
      </div>

      {/* 2x2 Services Grid matching Horizon Reference Image 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              className="group bg-white rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-floating transition-all duration-300 hover:-translate-y-1.5 border border-slate-100 flex items-start gap-5 cursor-pointer"
            >
              {/* Colored Icon Box */}
              <div
                className={`w-14 h-14 rounded-2xl ${item.bgColor} flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="w-7 h-7" />
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-clay transition-colors mb-1.5 font-heading">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Explore More CTA Button */}
      <div className="text-center">
        <Link href="/listings">
          <MagneticButton variant="primary" size="md">
            Explore All Services & Plots
          </MagneticButton>
        </Link>
      </div>
    </section>
  );
};
