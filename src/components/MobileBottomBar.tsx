import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config';

interface MobileBottomBarProps {
  onOpenBooking: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Now */}
        <a
          href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          id="mobile-sticky-call"
        >
          <Phone className="w-4 h-4 text-cyan-700 mb-0.5" />
          <span className="text-[11px] font-bold">Call Now</span>
        </a>

        {/* WhatsApp Us */}
        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappDefaultMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          id="mobile-sticky-whatsapp"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>

        {/* Book Now */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-[#0F2F57] to-[#00A896] text-white shadow-md transition-all active:scale-95"
          id="mobile-sticky-book"
        >
          <Sparkles className="w-4 h-4 text-amber-300 mb-0.5" />
          <span className="text-[11px] font-bold">Book Now</span>
        </button>
      </div>
    </div>
  );
};
