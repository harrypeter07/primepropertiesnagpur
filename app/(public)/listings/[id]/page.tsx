"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { MapPin, Maximize2, ShieldCheck, CheckCircle2, Phone, Calendar, ArrowLeft, Download, FileText, MessageSquare } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid 10-digit phone number required"),
  message: z.string().min(5, "Please enter your inquiry details"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [listing, setListing] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/listings/${id}`);
        const json = await res.json();
        if (json.success) {
          setListing(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  const onInquirySubmit = async (data: InquiryFormData) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, listingId: id }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Site Visit Inquiry Submitted! Our advisor will call you shortly.");
        setSubmitted(true);
        reset();
      } else {
        toast.error("Error submitting inquiry. Please try again.");
      }
    } catch (e) {
      toast.error("Failed to submit inquiry.");
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center max-w-7xl mx-auto px-4 font-mono-custom text-stone-500">
        LOADING PROPERTY DATA...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="pt-32 pb-24 text-center max-w-7xl mx-auto px-4">
        <h2 className="font-fraunces text-3xl text-stone-900 font-semibold mb-4">
          Property Not Found
        </h2>
        <Link href="/listings">
          <MagneticButton variant="primary">Back to Listings</MagneticButton>
        </Link>
      </div>
    );
  }

  const formatPrice = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <Link href="/listings" className="inline-flex items-center gap-2 text-xs font-mono-custom text-clay mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        BACK TO ALL PROPERTIES
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
        {/* Left Column: Gallery & Details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-sand-dim shadow-ambient">
              <Image
                src={listing.images?.[activeImageIndex] || listing.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"}
                alt={listing.title}
                fill
                priority
                className="object-cover transition-opacity duration-300"
              />
              <div className="absolute top-4 left-4 bg-clay text-white px-3 py-1 rounded-full text-xs uppercase font-mono-custom">
                {listing.type}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {listing.images && listing.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {listing.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? "border-clay scale-105" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2 text-stone-500 text-xs font-mono-custom mb-2">
              <MapPin className="w-4 h-4 text-clay" />
              <span>{listing.location.address}, {listing.location.city}, {listing.location.state}</span>
            </div>
            <h1 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 leading-tight mb-4">
              {listing.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-xs font-mono-custom text-stone-700 bg-white p-4 rounded-xl border border-sand-dim">
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-gold" />
                <span>AREA: {listing.area.value} {listing.area.unit}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sage" />
                <span>VERIFIED TITLE</span>
              </div>
              {listing.bedrooms && (
                <div className="flex items-center gap-1.5">
                  <span>BEDROOMS: {listing.bedrooms} BHK</span>
                </div>
              )}
            </div>
          </div>

          {/* Overview */}
          <div className="bg-white p-8 rounded-[20px] shadow-sm border border-sand-dim space-y-4">
            <h3 className="font-fraunces text-2xl font-semibold text-stone-900">
              Property Description
            </h3>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              {listing.description}
            </p>
          </div>

          {/* Amenities */}
          {listing.amenities && listing.amenities.length > 0 && (
            <div className="bg-white p-8 rounded-[20px] shadow-sm border border-sand-dim space-y-4">
              <h3 className="font-fraunces text-2xl font-semibold text-stone-900">
                Key Features & Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {listing.amenities.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-stone-800 bg-sand/60 px-3.5 py-2.5 rounded-xl border border-sand-dim">
                    <CheckCircle2 className="w-4 h-4 text-clay shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legal Documents List */}
          {listing.legalDocs && listing.legalDocs.length > 0 && (
            <div className="bg-white p-8 rounded-[20px] shadow-sm border border-sand-dim space-y-4">
              <h3 className="font-fraunces text-2xl font-semibold text-stone-900">
                Verified Legal Documentation
              </h3>
              <div className="space-y-2">
                {listing.legalDocs.map((doc: string, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-sand/40 rounded-xl border border-sand-dim text-xs font-mono-custom text-stone-900">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-clay" />
                      <span>{doc}</span>
                    </div>
                    <button onClick={() => toast.info(`Downloading ${doc}...`)} className="text-clay hover:underline flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      Download Audit PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Panel: Price & Contact Form */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 sm:p-8 rounded-[20px] shadow-ambient border border-sand-dim sticky top-28 space-y-6">
            {/* Price Box */}
            <div className="pb-6 border-b border-sand-dim">
              <span className="text-xs font-mono-custom text-stone-500 block mb-1">
                GUIDE PRICE
              </span>
              <div className="font-mono-custom font-bold text-3xl text-clay">
                {formatPrice(listing.price)}
              </div>
              <span className="text-[11px] text-sage font-mono-custom mt-1 block">
                ✓ ZERO BROKERAGE COMMISSION
              </span>
            </div>

            {/* Direct Call & WhatsApp CTAs */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/917122567890?text=${encodeURIComponent(
                  `Hi Prime Nagpur Properties, I am interested in "${listing.title}" (ID: ${listing._id}) priced at ₹${(
                    listing.price / 100000
                  ).toFixed(2)} Lakhs in ${listing.location?.address || listing.location?.city}. Please share brochure and schedule a site visit.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 font-bold text-xs shadow-md transition-all duration-200 hover:scale-102 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              <a href="tel:+917122567890" className="w-full block">
                <MagneticButton variant="secondary" className="w-full">
                  <Phone className="w-4 h-4 mr-1 text-clay" />
                  Call Office: +91 712 2567890
                </MagneticButton>
              </a>
            </div>

            {/* Form */}
            <div className="pt-4 border-t border-sand-dim">
              <h4 className="font-fraunces text-xl font-semibold text-stone-900 mb-1">
                Schedule Site Visit
              </h4>
              <p className="text-xs text-stone-500 mb-4">
                Complimentary doorstep pickup & guided survey walkthrough.
              </p>

              {submitted ? (
                <div className="bg-sage/15 p-4 rounded-xl border border-sage text-center text-xs text-stone-900 space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-sage mx-auto" />
                  <p className="font-semibold">Inquiry Received!</p>
                  <p>Our advisor will get in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onInquirySubmit)} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono-custom text-stone-500 block mb-1">
                      YOUR FULL NAME
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-sand/60 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
                    />
                    {errors.name && <span className="text-[10px] text-danger mt-1 block">{errors.name.message}</span>}
                  </div>

                  <div>
                    <label className="text-[11px] font-mono-custom text-stone-500 block mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="ramesh@example.com"
                      className="w-full bg-sand/60 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
                    />
                    {errors.email && <span className="text-[10px] text-danger mt-1 block">{errors.email.message}</span>}
                  </div>

                  <div>
                    <label className="text-[11px] font-mono-custom text-stone-500 block mb-1">
                      PHONE NUMBER
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="9876543210"
                      className="w-full bg-sand/60 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
                    />
                    {errors.phone && <span className="text-[10px] text-danger mt-1 block">{errors.phone.message}</span>}
                  </div>

                  <div>
                    <label className="text-[11px] font-mono-custom text-stone-500 block mb-1">
                      PREFERRED DATE & MESSAGE
                    </label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      placeholder="I would like to visit this plot this Saturday morning."
                      className="w-full bg-sand/60 p-3 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
                    />
                    {errors.message && <span className="text-[10px] text-danger mt-1 block">{errors.message.message}</span>}
                  </div>

                  <MagneticButton type="submit" disabled={isSubmitting} variant="primary" className="w-full">
                    <Calendar className="w-4 h-4 mr-1" />
                    {isSubmitting ? "Submitting..." : "Confirm Free Visit"}
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
