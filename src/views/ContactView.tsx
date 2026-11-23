import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { FAQAccordion } from '../components/FAQAccordion';
import { Sparkles, Phone, MessageSquare, Clock, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config';

interface ContactViewProps {
  onOpenBooking: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0A1E3A] via-[#0F2F57] to-[#00A896] text-white py-16 lg:py-20 border-b border-slate-800 text-center space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-white/20">
            <Sparkles className="w-3.5 h-3.5" /> 7 Days a Week Support
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Contact AL Naveed Cleaning Dubai
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-xl mx-auto">
            Ready to book a cleaning or have questions regarding residential, villa, or commercial cleaning services? We are ready to assist you.
          </p>
        </div>
      </section>

      {/* Main Contact Section & Interactive Google Maps */}
      <ContactSection />

      {/* Emergency Same-Day Box */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                <Clock className="w-3.5 h-3.5 text-amber-700" /> Urgent Dispatch
              </span>
              <h3 className="text-xl font-bold text-amber-950">
                Need Same-Day Emergency Cleaning in Dubai?
              </h3>
              <p className="text-xs text-amber-800 max-w-lg">
                For unexpected landlord move-out inspections, post-party resets, or same-day guest arrivals, reach us directly via WhatsApp or phone hotline for immediate team dispatch.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="px-5 py-3 rounded-xl bg-[#0F2F57] text-white text-xs font-bold shadow-md hover:bg-slate-900 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                Call Hotline
              </a>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello AL Naveed, I need urgent same-day cleaning service in Dubai.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-500 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp 24/7
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQAccordion />
    </div>
  );
};
