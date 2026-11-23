import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle, MapPin, Star, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateToQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateToQuote }) => {
  return (
    <section className="relative bg-gradient-to-b from-slate-100 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-slate-200">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines, Value Prop, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Local Dubai Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-[#0F2F57]">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-cyan-700 font-bold">AL NAVEED DUBAI</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">Residential & Commercial Cleaning</span>
            </div>

            {/* Main Headline (Exact requirement) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#0A1E3A] tracking-tight leading-[1.15]">
              Professional Cleaning Services in{' '}
              <span className="relative inline-block text-cyan-700">
                Dubai
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2.5 text-amber-400/70"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0 15 Q50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subheadline (Exact requirement) */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Reliable, affordable and professional cleaning services for homes, villas, apartments and offices across Dubai.
            </p>

            {/* Buttons (Exact requirements: Book a Cleaning & Get a Free Quote) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0F2F57] to-[#00A896] hover:from-[#0A1E3A] hover:to-[#008f80] text-white font-extrabold text-base shadow-xl hover:shadow-cyan-900/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                id="hero-book-cleaning-btn"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Book a Cleaning</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onNavigateToQuote}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 font-bold text-base shadow-xs hover:border-cyan-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="hero-get-quote-btn"
              >
                <span>Get a Free Quote</span>
              </button>
            </div>

            {/* Quick Contact Micro-bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-500 font-medium">
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="inline-flex items-center gap-1.5 text-slate-700 hover:text-cyan-700"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-600" />
                <span>Call: <strong>{BUSINESS_CONFIG.phone}</strong></span>
              </a>
              <span className="text-slate-300">•</span>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: {BUSINESS_CONFIG.whatsapp}</span>
              </a>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Same-Day Dispatch Available
              </span>
            </div>

            {/* Trust Indicators (Exact prompt requirements) */}
            <div className="pt-6 border-t border-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center lg:text-left">
                Why Dubai Residents Trust AL Naveed
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Professional Cleaners */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs text-left">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0F2F57] flex items-center justify-center mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Professional Cleaners
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Vetted, trained staff</p>
                </div>

                {/* 2. Flexible Scheduling */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs text-left">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Flexible Scheduling
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">7 days, same-day slots</p>
                </div>

                {/* 3. Quality Service */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs text-left">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-1.5">
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Quality Service
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">100% Satisfaction guarantee</p>
                </div>

                {/* 4. Dubai-Wide Coverage */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs text-left">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5">
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Dubai-Wide Coverage
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">All Dubai communities</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual of Cleaner in Modern Dubai Apartment / Villa */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Professional Cleaner Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200 aspect-4/5 sm:aspect-5/6">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80"
                  alt="Professional cleaner working in modern luxury Dubai apartment with sparkling clean interiors"
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3A]/70 via-transparent to-transparent" />

                {/* Overlay Badge at Bottom */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs font-bold text-slate-900">
                        Top Rated Cleaning Service
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Across Dubai Marina, Downtown, Palm & Arabian Ranches
                      </p>
                    </div>
                    <div className="text-right pl-3 border-l border-slate-200">
                      <span className="text-xs font-bold text-cyan-800 block">from</span>
                      <span className="text-lg font-black text-[#0F2F57]">AED 35</span>
                      <span className="text-[10px] text-slate-500 block">/ hour</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Floating Trust Card: AC System & Hygiene Synergy */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-200 hidden sm:flex items-center gap-3 animate-in fade-in slide-in-from-left duration-300">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 text-cyan-700" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Cleaning & AC Experts</div>
                  <p className="text-[11px] text-slate-500">Dust & allergen-free Dubai homes</p>
                </div>
              </div>

              {/* Floating Guaranteed Handover Card */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 hidden sm:flex items-center gap-2.5 animate-in fade-in slide-in-from-right duration-300">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Deposit Handover Ready</div>
                  <p className="text-[11px] text-slate-500">Dubai Land Department standard</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
