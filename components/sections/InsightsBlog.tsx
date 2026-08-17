"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

export const InsightsBlog: React.FC = () => {
  const articles = [
    {
      title: "10 Critical Due-Diligence Checks Before Buying Agricultural Land",
      date: "AUG 14",
      year: "2026",
      category: "Legal Guide",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Understanding A-Khata vs B-Khata: What Every Plot Buyer Must Know",
      date: "AUG 08",
      year: "2026",
      category: "Title Verification",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Why Bengaluru North Highway Corridor is Seeing 18% Annual Land Growth",
      date: "JUL 29",
      year: "2026",
      category: "Market Report",
      image: "/images/zenith_tower.jpg",
    },
    {
      title: "How to Verify Boundary GPS Markers & Survey Coordinates on Site",
      date: "JUL 19",
      year: "2026",
      category: "Survey Tips",
      image: "/images/hero_estate.jpg",
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 bg-sand relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 text-center md:text-left">
          <div>
            <span className="font-mono-custom text-xs text-gold tracking-widest block mb-2 font-medium">
              INSIGHTS & IDEAS
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal text-stone-900 leading-tight">
              From Our Advisory Blog
            </h2>
          </div>

          <div>
            <Link href="/listings">
              <MagneticButton variant="secondary" size="md">
                View All Articles
              </MagneticButton>
            </Link>
          </div>
        </div>

        {/* 4-Column Editorial Blog Cards Grid matching Reference Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {articles.map((item, idx) => (
            <article
              key={idx}
              className="group bg-white rounded-[24px] overflow-hidden shadow-ambient hover:shadow-ambient-hover transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between border border-sand-dim"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-sand-dim">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Date Badge overlay top-left matching reference */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-stone-900 font-mono-custom text-[10px] px-3 py-1.5 rounded-lg shadow-sm border border-stone-200 font-semibold">
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[10px] font-mono-custom text-clay uppercase block mb-2 tracking-wider font-semibold">
                    {item.category}
                  </span>
                  <h3 className="font-serif-luxury font-medium text-xl text-stone-900 leading-snug group-hover:text-clay transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <span className="inline-flex items-center gap-2 text-xs font-mono-custom text-stone-900 font-semibold group-hover:text-clay transition-colors">
                  Read More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
