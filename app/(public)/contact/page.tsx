"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import gsap from "gsap";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid 10-digit phone number required"),
  message: z.string().min(10, "Please describe your land or inquiry details"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const checkSvgRef = useRef<SVGPathElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        toast.success("Inquiry sent successfully!");
        reset();
      } else {
        toast.error("Failed to submit inquiry.");
      }
    } catch (e) {
      toast.error("Error submitting form.");
    }
  };

  useEffect(() => {
    if (submitted && checkSvgRef.current) {
      const path = checkSvgRef.current;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, { strokeDashoffset: 0, duration: 1, ease: "power2.out" });
    }
  }, [submitted]);

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono-custom text-xs text-gold tracking-widest block mb-2">
          GET IN TOUCH
        </span>
        <h1 className="font-fraunces text-4xl sm:text-5xl font-semibold text-stone-900 mb-4">
          Speak With Our Surveyors
        </h1>
        <p className="text-stone-500 text-sm sm:text-base">
          Whether you want to verify a plot title, schedule a site visit, or list your property, our team responds within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-[24px] shadow-ambient overflow-hidden border border-sand-dim relative">
        {/* Left Half: Contact Form */}
        <div className="lg:col-span-7 p-8 sm:p-12">
          <h3 className="font-fraunces text-2xl font-semibold text-stone-900 mb-6">
            Send Us an Advisory Request
          </h3>

          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-sage/15 text-sage flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" viewBox="0 0 50 50">
                  <path
                    ref={checkSvgRef}
                    d="M 12,25 L 22,35 L 38,15"
                    fill="none"
                    stroke="#6B7A5E"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="font-fraunces text-2xl text-stone-900 font-semibold">
                Message Received!
              </h4>
              <p className="text-stone-500 text-sm max-w-md mx-auto">
                Thank you for contacting Bhoomi. Our senior land advisor will reach out to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono-custom text-clay underline cursor-pointer pt-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-mono-custom text-stone-500 block mb-1">
                    FULL NAME *
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="e.g. Suresh Kumar"
                    className="w-full bg-sand/60 p-3.5 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
                  />
                  {errors.name && <span className="text-[10px] text-danger mt-1 block">{errors.name.message}</span>}
                </div>

                <div>
                  <label className="text-xs font-mono-custom text-stone-500 block mb-1">
                    PHONE NUMBER *
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="9845012345"
                    className="w-full bg-sand/60 p-3.5 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
                  />
                  {errors.phone && <span className="text-[10px] text-danger mt-1 block">{errors.phone.message}</span>}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono-custom text-stone-500 block mb-1">
                  EMAIL ADDRESS *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="suresh@example.com"
                  className="w-full bg-sand/60 p-3.5 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
                />
                {errors.email && <span className="text-[10px] text-danger mt-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <label className="text-xs font-mono-custom text-stone-500 block mb-1">
                  INQUIRY DETAILS *
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Tell us about the property location, budget, or title verification assistance you require..."
                  className="w-full bg-sand/60 p-3.5 rounded-xl border border-sand-dim text-sm text-stone-900 focus:outline-none focus:border-clay"
                />
                {errors.message && <span className="text-[10px] text-danger mt-1 block">{errors.message.message}</span>}
              </div>

              <MagneticButton type="submit" disabled={isSubmitting} variant="primary" size="lg" className="w-full sm:w-auto">
                <Send className="w-4 h-4 mr-1" />
                {isSubmitting ? "Sending..." : "Submit Advisory Request"}
              </MagneticButton>
            </form>
          )}
        </div>

        {/* Right Half: Dark Ink Info Panel with diagonal cut overlay */}
        <div className="lg:col-span-5 bg-ink text-white p-8 sm:p-12 flex flex-col justify-between relative">
          <div>
            <span className="font-mono-custom text-xs text-gold tracking-widest block mb-4">
              CENTRAL ADVISORY DESK
            </span>
            <h3 className="font-fraunces text-2xl sm:text-3xl font-semibold text-sand mb-8">
              Bhoomi Advisory HQ
            </h3>

            <div className="space-y-6 text-sm text-sand/80">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-clay/20 text-clay flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-1">Headquarters</h5>
                  <p className="text-xs text-sand/70 leading-relaxed">
                    Level 4, Survey Towers, MG Road, Bengaluru, Karnataka 560001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-1">Helpline</h5>
                  <p className="text-xs text-sand/70">
                    +91 (080) 4920-8800 / +91 98450 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/20 text-sage flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-1">Direct Email</h5>
                  <p className="text-xs text-sand/70">advisory@bhoomi.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-1">Working Hours</h5>
                  <p className="text-xs text-sand/70">Mon – Sat: 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 text-xs font-mono-custom text-gold">
            MAP COORDINATES: 12.9716° N, 77.5946° E
          </div>
        </div>
      </div>
    </div>
  );
}
