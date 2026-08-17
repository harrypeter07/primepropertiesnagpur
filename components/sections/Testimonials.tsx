"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Quote } from "lucide-react";

export const Testimonials: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Bhoomi's team conducted a comprehensive 30-year title audit and physically verified GPS boundary stakes before we finalized our Devanahalli villa plot. Unmatched advisory excellence.",
      name: "Rajesh & Priya Sharma",
      city: "Bengaluru · Luxury Villa Plot Owners",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      quote:
        "Purchasing agricultural land can be fraught with local encumbrances. Bhoomi handled every Pahani check, conversion order, and sub-registrar filing with extreme precision.",
      name: "Dr. Vikram Kulkarni",
      city: "Chikkaballapur · Agri Farmland Buyer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    },
    {
      quote:
        "The most sophisticated land advisory firm in Karnataka. Direct seller transparency, zero hidden broker markups, and complimentary doorstep site tours.",
      name: "Ananya Deshmukh",
      city: "Yelahanka · High-Growth Corridor Investor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
  ];

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="bg-ink text-white py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
      {/* Background contour lines SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
        <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="none">
          <circle cx="400" cy="150" r="280" stroke="#C9A227" strokeWidth="1.5" fill="none" />
          <circle cx="400" cy="150" r="180" stroke="#C9A227" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto mb-8">
          <Quote className="w-7 h-7" />
        </div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((item, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 px-4">
                <blockquote className="font-serif-luxury italic text-2xl sm:text-3xl md:text-4xl text-sand leading-relaxed mb-8 font-light">
                  "{item.quote}"
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold shadow-md">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-serif-luxury font-medium text-xl text-white">
                      {item.name}
                    </h4>
                    <p className="font-mono-custom text-xs text-gold">
                      {item.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === i ? "w-8 bg-gold" : "w-2 bg-stone-700"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
