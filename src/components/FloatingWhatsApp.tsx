import React, { useState } from 'react';
import { MessageSquare, X, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    BUSINESS_CONFIG.whatsappDefaultMsg
  )}`;

  return (
    <div className="fixed bottom-20 md:bottom-7 right-5 z-40 flex flex-col items-end">
      {/* Friendly conversational quick tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200 mb-2.5 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-ping"></span>
          <div className="flex-1">
            <span className="font-bold text-[#0F2F57]">Dubai Dispatch Online</span>
            <p className="text-[11px] text-slate-500 leading-tight">Need a quick price or same-day slot?</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating CTA Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
        id="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp with AL Naveed Cleaning Services"
      >
        <span className="relative flex items-center justify-center">
          <MessageSquare className="w-6 h-6 fill-white text-emerald-500" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
          </span>
        </span>
        <span className="hidden md:inline font-bold text-sm tracking-tight pr-1">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
};
