import React from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const handlePageClick = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A1E3A] text-slate-300 pt-16 pb-28 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Info Banner */}
        <div className="bg-[#0F2F57] rounded-2xl p-6 sm:p-8 mb-14 border border-slate-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Dubai Municipality Compliance
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Need a Trusted Cleaner in Dubai Today?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              From high-rise apartments in Marina to sprawling villas in Arabian Ranches. Same-day bookings available with zero hassle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-[#00A896] hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Book a Cleaning
            </button>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappDefaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Col 1: About & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-[#00A896] flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Sparkles className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h4 className="font-extrabold text-lg text-white leading-tight">
                  AL NAVEED
                </h4>
                <p className="text-xs text-cyan-400 font-medium">Cleaning & AC Installation LLC</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Professional residential and commercial cleaning company operating across the Emirate of Dubai. Committed to European-standard hygiene, vetted professionals, and eco-friendly products.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Licensed & Insured in Dubai</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Hospital-Grade Sanitizers & Steam</span>
              </p>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-2">
              Our Cleaning Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handlePageClick('deep-cleaning')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500" /> Deep Cleaning Dubai
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('villa-cleaning')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500" /> Villa Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('home-cleaning')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500" /> Regular Home Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('office-cleaning')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500" /> Commercial Office Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('move-in-out-cleaning')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500" /> Move-In / Move-Out Clean
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('sofa-carpet-cleaning')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500" /> Sofa & Carpet Extraction
                </button>
              </li>
              <li className="pt-1 border-t border-slate-800/80">
                <button
                  onClick={() => handlePageClick('blog')}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 text-left font-semibold"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" /> Dubai Cleaning Blog & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Service Areas in Dubai */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-2">
              Dubai Coverage Areas
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-400">
              <span className="hover:text-white transition-colors">• Downtown Dubai</span>
              <span className="hover:text-white transition-colors">• Dubai Marina</span>
              <span className="hover:text-white transition-colors">• Palm Jumeirah</span>
              <span className="hover:text-white transition-colors">• Business Bay</span>
              <span className="hover:text-white transition-colors">• Arabian Ranches</span>
              <span className="hover:text-white transition-colors">• Dubai Hills</span>
              <span className="hover:text-white transition-colors">• JVC & JVT</span>
              <span className="hover:text-white transition-colors">• Jumeirah 1-3</span>
              <span className="hover:text-white transition-colors">• Al Barsha</span>
              <span className="hover:text-white transition-colors">• Deira & Bur Dubai</span>
              <span className="hover:text-white transition-colors">• Mirdif</span>
              <span className="hover:text-white transition-colors">• Umm Suqeim</span>
            </div>
            <p className="text-[11px] text-cyan-400 pt-1">
              + All residential & commercial communities across Dubai.
            </p>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-2">
              Dubai Office & Bookings
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="hover:text-white transition-colors">
                  {BUSINESS_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 font-semibold transition-colors"
                >
                  WhatsApp: {BUSINESS_CONFIG.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-white transition-colors">
                  {BUSINESS_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BUSINESS_CONFIG.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Pricing Notice & Disclaimer */}
        <div className="bg-slate-900/90 rounded-xl p-4 mb-8 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold uppercase tracking-wider text-[10px] shrink-0 border border-amber-500/30">
            *Pricing Notice
          </span>
          <p className="leading-relaxed">
            All prices and rate packages displayed on this website are <strong>starting estimates and are not fixed</strong>. Actual prices will be determined and are subject to change based on property size, layout, condition, level of dirt or grease, and customized client requests after initial consultation or inspection.
          </p>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.companyName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Dubai, United Arab Emirates</span>
            <span>Residential & Commercial Cleaning</span>
            <button
              onClick={() => handlePageClick('quote')}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Request Free Estimate
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
