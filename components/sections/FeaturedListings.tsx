"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PropertyCard, PropertyCardProps } from "@/components/shared/PropertyCard";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export const FeaturedListings: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [properties, setProperties] = useState<PropertyCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/listings?featured=true");
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          const formatted = json.data.map((item: any) => ({
            id: item._id,
            title: item.title,
            type: item.type,
            price: item.price,
            priceUnit: item.priceUnit,
            area: item.area,
            location: item.location,
            image: item.images?.[0] || "/images/hillside_residence.jpg",
            badge: item.badge,
            status: item.status,
            bedrooms: item.bedrooms,
            bathrooms: item.bathrooms,
          }));
          setProperties(formatted);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  useEffect(() => {
    if (loading || !gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, [loading]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Row (matching Horizon Reference Image 3) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2 font-heading">
            Discover Your Perfect Match
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Handpicked premium residential plots, luxury flats & farmland estates.
          </p>
        </div>

        <Link
          href="/listings"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-clay transition-colors group"
        >
          <span>View All Properties</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Modern Floating Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-96 bg-white rounded-3xl animate-pulse shadow-card border border-slate-100" />
          ))}
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {properties.slice(0, 6).map((item) => (
            <PropertyCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </section>
  );
};
