"use client";

import React, { useEffect, useState } from "react";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { X, CheckCircle, MessageSquare, Phone, Mail, Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      const json = await res.json();
      if (json.success) {
        setInquiries(json.data);
      }
    } catch (e) {
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(`Inquiry marked as ${newStatus}`);
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?._id === id) {
          setSelectedInquiry((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-sand-dim">
        <span className="font-mono-custom text-xs text-gold tracking-widest block mb-1">
          CLIENT LEADS & SITE VISITS
        </span>
        <h1 className="font-fraunces text-3xl font-semibold text-stone-900">
          Inquiries & Site Visit Requests
        </h1>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[20px] shadow-sm border border-sand-dim overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-stone-400 font-mono-custom text-xs">
            Loading client inquiries...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="py-12 text-center text-stone-400 font-mono-custom text-xs">
            No client inquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-sand/60 border-b border-sand-dim text-[11px] font-mono-custom text-stone-500">
                  <th className="py-3 px-6 font-medium">NAME</th>
                  <th className="py-3 px-4 font-medium">CONTACT</th>
                  <th className="py-3 px-4 font-medium">RELATED PROPERTY</th>
                  <th className="py-3 px-4 font-medium">STATUS</th>
                  <th className="py-3 px-4 font-medium">DATE</th>
                  <th className="py-3 px-6 font-medium text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-dim">
                {inquiries.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => setSelectedInquiry(item)}
                    className="hover:bg-sand/30 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6 font-semibold text-stone-900">
                      {item.name}
                    </td>

                    <td className="py-4 px-4 font-mono-custom text-xs text-stone-600">
                      <div>{item.phone}</div>
                      <div className="text-[10px] text-stone-400">{item.email}</div>
                    </td>

                    <td className="py-4 px-4 text-xs text-stone-700 max-w-xs truncate">
                      {item.listingId?.title || "General Site Inquiry"}
                    </td>

                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item._id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-mono-custom font-semibold focus:outline-none cursor-pointer ${
                          item.status === "new"
                            ? "bg-gold/20 text-gold"
                            : item.status === "contacted"
                            ? "bg-sage/20 text-sage"
                            : "bg-stone-200 text-stone-600"
                        }`}
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="closed">CLOSED</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 text-xs font-mono-custom text-stone-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedInquiry(item)}
                        className="text-xs font-mono-custom text-clay hover:underline"
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-over Detail Sheet */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-8 shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-sand-dim animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-sand-dim mb-6">
                <span className="font-mono-custom text-xs text-gold">
                  INQUIRY DETAILS
                </span>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1 rounded-full hover:bg-sand text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-fraunces text-2xl font-bold text-stone-900">
                    {selectedInquiry.name}
                  </h3>
                  <span className="font-mono-custom text-xs text-stone-400">
                    Received on {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="space-y-3 bg-sand/50 p-4 rounded-xl text-xs font-mono-custom text-stone-800 border border-sand-dim">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-clay" />
                      <a href={`tel:${selectedInquiry.phone}`} className="hover:underline font-bold">
                        {selectedInquiry.phone}
                      </a>
                    </div>
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hi ${selectedInquiry.name}, thank you for contacting Prime Nagpur Properties regarding ${
                          selectedInquiry.listingId?.title || "our verified plots and properties"
                        }. How can we assist your site visit?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-transform"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-white" />
                      Chat WhatsApp
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-clay" />
                    <a href={`mailto:${selectedInquiry.email}`} className="hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                </div>

                {selectedInquiry.listingId && (
                  <div className="bg-white p-4 rounded-xl border border-sand-dim">
                    <span className="text-[10px] font-mono-custom text-stone-400 block mb-1">
                      RELATED LISTING
                    </span>
                    <p className="font-fraunces font-semibold text-stone-900">
                      {selectedInquiry.listingId.title}
                    </p>
                    <p className="text-xs font-mono-custom text-clay mt-1">
                      ₹{selectedInquiry.listingId.price?.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-xs font-mono-custom text-stone-500 block mb-2">
                    CLIENT MESSAGE
                  </span>
                  <div className="bg-sand/40 p-4 rounded-xl text-sm text-stone-800 leading-relaxed border border-sand-dim">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-sand-dim space-y-3">
              {selectedInquiry.status !== "contacted" && (
                <MagneticButton
                  onClick={() => updateStatus(selectedInquiry._id, "contacted")}
                  variant="primary"
                  className="w-full"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Mark as Contacted
                </MagneticButton>
              )}
              {selectedInquiry.status !== "closed" && (
                <MagneticButton
                  onClick={() => updateStatus(selectedInquiry._id, "closed")}
                  variant="secondary"
                  className="w-full"
                >
                  Close Inquiry
                </MagneticButton>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
