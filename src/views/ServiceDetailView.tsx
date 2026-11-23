import React from 'react';
import { ServiceItem, PageId } from '../types';
import { BookingForm } from '../components/BookingForm';
import { SERVICES } from '../data/services';
import { BUSINESS_CONFIG } from '../data/config';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  Zap,
  Droplets,
  AlertCircle
} from 'lucide-react';

interface ServiceDetailViewProps {
  service: ServiceItem;
  onBackToServices: () => void;
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  service,
  onBackToServices,
  onSelectService,
  onOpenBooking
}) => {
  const otherServices = SERVICES.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToServices}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0F2F57] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Cleaning Services</span>
          </button>

          <span className="text-[11px] text-cyan-700 font-semibold bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100">
            Available Across Dubai
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#0A1E3A] via-[#0F2F57] to-[#004d40] text-white py-14 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-extrabold uppercase tracking-wider border border-cyan-500/30">
                  {service.category} Cleaning Dubai
                </span>
                {service.popular && (
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                    Most Booked
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {service.title} in Dubai
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
                {service.fullDesc}
              </p>

              {/* Price & Duration Strip */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 px-4 border border-white/15">
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider block">Starting Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-amber-300">AED {service.priceStartingAed}*</span>
                    <span className="text-xs text-slate-300">/{service.pricingUnit}</span>
                  </div>
                  <span className="text-[10px] text-amber-200/90 block pt-0.5">
                    *Starting estimate · Not a fixed rate
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 px-4 border border-white/15 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="text-[10px] text-slate-300 uppercase tracking-wider block">Typical Duration</span>
                    <span className="text-sm font-bold text-white">{service.duration}</span>
                  </div>
                </div>
              </div>

              {/* Price disclaimer caption */}
              <div className="text-xs text-slate-300 flex items-start gap-1.5 pt-0.5 max-w-lg">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Rates are baseline starting guides and are not fixed. Actual pricing will be calculated based on your property layout, square footage, and condition.
                </span>
              </div>

              {/* Instant CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-[#00A896] hover:from-cyan-300 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-900" />
                  <span>Book This Service Now</span>
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(`Hello AL Naveed, I would like to book ${service.title} in Dubai.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </div>

            {/* Service Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-4/3">
                <img
                  src={service.image}
                  alt={`${service.title} by AL Naveed Dubai`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Detail Content & Embedded Booking Form */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 7 Cols: Detailed Scope & Checklist */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* What is Included Checklist */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-cyan-800">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                  <h3 className="text-xl font-bold text-[#0A1E3A]">
                    What's Included in Our {service.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  We follow a strict Dubai-approved cleaning protocol to ensure every corner meets five-star hygiene benchmarks:
                </p>

                <div className="space-y-3 pt-2">
                  {service.includedList.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                        ✓
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal For Recommendation */}
              <div className="bg-cyan-50/70 rounded-3xl p-6 sm:p-8 border border-cyan-200/80 space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-900">
                  Recommended For:
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {service.idealFor}
                </p>
              </div>

              {/* Equipment & Standards */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-[#0A1E3A]">
                  Equipment & Chemicals Used
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Industrial Steam Machines
                    </div>
                    <p>Heats water to 140°C+ to dissolve grease, kill 99.9% of bacteria, and sanitize tile grout.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Droplets className="w-4 h-4 text-cyan-600" />
                      Eco-Friendly Cleaners
                    </div>
                    <p>Pet-safe, child-safe, and biodegradable formulas certified for Dubai residential indoor use.</p>
                  </div>
                </div>
              </div>

              {/* Related Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0A1E3A]">
                  Customers Also Booked:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {otherServices.map((other) => (
                    <div
                      key={other.id}
                      onClick={() => onSelectService(other)}
                      className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <img
                        src={other.image}
                        alt={other.title}
                        className="w-full h-24 object-cover rounded-xl mb-3"
                        referrerPolicy="no-referrer"
                      />
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-cyan-700">
                        {other.title}
                      </h4>
                      <span className="text-[11px] text-slate-500">from AED {other.priceStartingAed}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Sticky Booking Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-2.5 py-0.5 rounded-full">
                    Instant Dubai Booking
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0A1E3A]">
                    Book {service.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Guaranteed confirmation within 15–30 minutes across Dubai.
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Notice:</strong> Listed rates are starting baselines and are not fixed. Final pricing is customized according to property dimensions and condition.
                  </span>
                </div>

                {/* Embedded Form with initialService pre-filled */}
                <BookingForm initialServiceId={service.id} isCompact={true} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
