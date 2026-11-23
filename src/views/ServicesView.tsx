import React, { useState } from 'react';
import { SERVICES } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceItem } from '../types';
import { Sparkles, Search, CheckCircle2, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

interface ServicesViewProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
  onNavigateToQuote: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onOpenBooking,
  onSelectServiceDetail,
  onNavigateToQuote
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'commercial' | 'specialized'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = SERVICES.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0A1E3A] via-[#0F2F57] to-[#00A896] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-white/20">
            <Sparkles className="w-3.5 h-3.5" /> Full Service Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Premium Cleaning Services in Dubai
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto">
            From high-rise apartments and luxury villas to corporate towers, explore our specialized cleaning services with guaranteed transparent rates in AED.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. deep cleaning, sofa, villa, office)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm shadow-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>
      </section>

      {/* Categories & Filter Bar */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-[73px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Services (10)' },
              { id: 'residential', label: 'Residential (Villas & Apartments)' },
              { id: 'commercial', label: 'Commercial & Office' },
              { id: 'specialized', label: 'Specialized (Sofa, Carpet, Kitchen)' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0F2F57] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={onNavigateToQuote}
            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Need a custom package?</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Prominent Pricing Disclaimer Banner */}
      <section className="bg-amber-50/90 border-b border-amber-200/90 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-center gap-2.5 font-medium">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Important Pricing Notice:</strong> All prices displayed below are <strong>starting estimates and are not fixed</strong>. Rates will vary and change depending on property size, layout, current cleanliness condition, and customized service selections.
            </span>
          </div>
          <button
            onClick={onNavigateToQuote}
            className="text-cyan-800 hover:text-cyan-900 font-bold underline shrink-0 cursor-pointer"
          >
            Get a Free Accurate Quote →
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-base text-slate-600 font-medium">
                No cleaning service found matching "{searchQuery}".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-3 px-4 py-2 rounded-xl bg-[#0F2F57] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onSelectService={(s) => onSelectServiceDetail(s)}
                  onBookService={(id) => onOpenBooking(id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Guarantee Banner */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-800">
                <ShieldCheck className="w-4 h-4 text-cyan-700" />
                Dubai Quality Assurance
              </span>
              <h3 className="text-xl font-bold text-[#0A1E3A]">
                Every service backed by our 100% Satisfaction Promise
              </h3>
              <p className="text-xs text-slate-600 max-w-lg">
                Not completely happy with a specific room or surface? Inform us within 24 hours of completion and we send a supervisor to re-clean at no extra cost.
              </p>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3.5 rounded-xl bg-[#0F2F57] hover:bg-[#00A896] text-white font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer"
            >
              Book a Cleaning Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
