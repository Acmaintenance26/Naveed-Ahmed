import React from 'react';
import {
  Users,
  Clock,
  Award,
  CalendarCheck,
  Receipt,
  Wrench,
  HeartHandshake,
  MapPin,
  Sparkles
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Experienced Cleaning Professionals',
      desc: 'Every cleaner undergoes background verification, rigorous European standard training, and regular supervisor assessments in Dubai.',
      icon: <Users className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Reliable & Punctual Service',
      desc: 'We value your schedule. Our teams arrive promptly at your designated time slot, fully prepared with gate pass credentials.',
      icon: <Clock className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'High-Quality Cleaning Standards',
      desc: 'We adhere to multi-point quality inspection protocols, using hospital-grade sanitizers and surface-specific care formulations.',
      icon: <Award className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Flexible Booking Times',
      desc: 'Available 7 days a week from 7:30 AM to 9:00 PM. Same-day emergency bookings and customizable recurring schedules.',
      icon: <CalendarCheck className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Transparent Pricing in AED',
      desc: 'No hidden call-out fees or unexpected surcharges. Clear, upfront rates in Dirhams with itemized quotes before we start.',
      icon: <Receipt className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Professional Equipment & Solutions',
      desc: 'Equipped with industrial hot water extractors, steam sanitizers, HEPA vacuum systems, and non-toxic eco-detergents.',
      icon: <Wrench className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Customer-Focused Service',
      desc: '100% satisfaction guarantee. If any corner does not meet your expectations, we re-clean within 24 hours at zero extra charge.',
      icon: <HeartHandshake className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Services Across All of Dubai',
      desc: 'From waterfront penthouses in Dubai Marina to master-planned villas in Arabian Ranches and offices in Business Bay.',
      icon: <MapPin className="w-6 h-6 text-cyan-600" />
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            The AL Naveed Distinction
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1E3A] tracking-tight">
            Why Dubai Chooses AL Naveed Cleaning
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We deliver five-star hospitality standards directly to your villa, apartment, or commercial premises, combining precision cleaning with deep AC system expertise.
          </p>
        </div>

        {/* 8-Grid Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-cyan-400 hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-cyan-50 transition-all shadow-2xs">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-800 transition-colors mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
