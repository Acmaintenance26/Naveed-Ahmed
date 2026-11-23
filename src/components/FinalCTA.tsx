import React from 'react';
import { Sparkles, MessageSquare, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0A1E3A] via-[#0F2F57] to-[#004d40] text-white overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-6">
        {/* Dubai Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AL Naveed Cleaning Services & AC System Installation LLC</span>
        </div>

        {/* Mandatory Headline & Subheadline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Ready for a Cleaner, Fresher Space?
        </h2>

        <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
          Book your professional cleaning service in Dubai today.
        </p>

        {/* CTAs: Book Now & WhatsApp Us */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-[#00A896] hover:from-cyan-300 hover:to-emerald-400 text-slate-950 font-extrabold text-base shadow-xl hover:shadow-cyan-400/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
            id="final-cta-book-now"
          >
            <Sparkles className="w-5 h-5 text-amber-900" />
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappDefaultMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2.5"
            id="final-cta-whatsapp"
          >
            <MessageSquare className="w-5 h-5" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Micro Guarantee footer */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Satisfaction Guaranteed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            No Hidden Fees • Upfront AED Pricing
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Vetted European Standard Cleaners
          </span>
        </div>
      </div>
    </section>
  );
};
