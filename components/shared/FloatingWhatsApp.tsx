"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = "917122567890",
  defaultMessage = "Hi Prime Nagpur Properties, I am interested in verified plots and properties in Nagpur. Please share details.",
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(true);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-auto">
      {/* Tooltip message bubble */}
      {tooltipOpen && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span>Chat directly with a Nagpur Land Advisor</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTooltipOpen(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
      </a>
    </div>
  );
};
