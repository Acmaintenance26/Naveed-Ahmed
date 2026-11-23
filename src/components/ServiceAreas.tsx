import React, { useState } from 'react';
import { MapPin, Search, Phone, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { DUBAI_AREAS } from '../data/areas';
import { BUSINESS_CONFIG } from '../data/config';

interface ServiceAreasProps {
  onOpenBooking: () => void;
}

export const ServiceAreas: React.FC<ServiceAreasProps> = ({ onOpenBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAreas = DUBAI_AREAS.filter((area) =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full">
            Emirate of Dubai
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1E3A] tracking-tight">
            Comprehensive Dubai Service Areas
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Our specialized mobile cleaning teams are strategically stationed across Dubai to ensure rapid dispatch and punctual arrivals.
          </p>

          {/* Quick Search Input */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search your Dubai community (e.g. Marina, Arabian Ranches)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 mb-10">
          {filteredAreas.map((area) => (
            <div
              key={area.name}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-cyan-400 hover:bg-cyan-50/40 hover:shadow-sm transition-all text-left flex items-start justify-between group"
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  <span className="leading-snug">{area.name}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 pl-5">
                  {area.zone}
                </p>
                {area.estArrivalTime && (
                  <p className="text-[10px] text-emerald-700 font-medium pl-5 mt-0.5">
                    Est: {area.estArrivalTime}
                  </p>
                )}
              </div>
              {area.popular && (
                <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-1" title="Daily Service Hub" />
              )}
            </div>
          ))}
        </div>

        {filteredAreas.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            No matching areas found for "{searchTerm}". Don't worry, we cover all parts of Dubai!
          </div>
        )}

        {/* Explicit Note Required By Prompt */}
        <div className="bg-gradient-to-r from-slate-900 to-[#0F2F57] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Don't see your area? Contact us to check availability.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We frequently service outer communities, private developments, and commercial towers across the UAE upon request.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello AL Naveed, is cleaning service available in my area?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Check on WhatsApp
            </a>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Book Anyway
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
