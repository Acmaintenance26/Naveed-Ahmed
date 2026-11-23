import React from 'react';
import { ShieldCheck, Award, Sparkles, Wind, Users, CheckCircle, ArrowRight, Clock, MapPin, HeartHandshake } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config';

interface AboutViewProps {
  onOpenBooking: () => void;
  onNavigateToQuote: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenBooking, onNavigateToQuote }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0A1E3A] via-[#0F2F57] to-[#00A896] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-white/20">
            <Sparkles className="w-3.5 h-3.5" /> About AL Naveed
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Setting the Benchmark for Cleanliness in Dubai
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto">
            Combining rigorous European hospitality standards with specialized AC airflow and climate sanitation across the United Arab Emirates.
          </p>
        </div>
      </section>

      {/* Main Story & Vision */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full">
                Our Dubai Story
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1E3A] leading-tight">
                More Than Just Cleaning — A Healthier Indoor Environment for Your Family & Team
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Living in Dubai is synonymous with luxury, modern architectural marvels, and sunshine. However, the desert climate also means fine particulate sand, dust storms, and heavy air conditioning usage year-round.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                <strong>{BUSINESS_CONFIG.companyName}</strong> was established with a singular mission: to provide comprehensive residential and commercial cleaning that addresses both visible surfaces and the indoor air quality of your home or workspace.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                By pairing professional deep cleaning with AC system technical insight, our clients enjoy homes that aren’t just aesthetically spotless—they feel noticeably fresher, healthier, and free of persistent dust and allergens.
              </p>

              {/* Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  '100% Background-Vetted Cleaners',
                  'Hospital-Grade Disinfection',
                  'Dubai DED Compliant & Licensed',
                  'Transparent Pricing in AED',
                  'Eco-Safe, Non-Toxic Detergents',
                  'Rapid Dubai-Wide Mobile Dispatch'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80"
                  alt="AL Naveed cleaning professional in modern Dubai residence"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Synergy Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-200 hidden sm:flex items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">AC & Cleaning Synergy</h4>
                  <p className="text-[11px] text-slate-500">Cleaner vents mean cleaner floors for longer</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1E3A]">
              Our Guiding Principles
            </h2>
            <p className="text-slate-600 text-sm">
              How we maintain excellence across thousands of visits every month in Dubai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0F2F57] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Uncompromising Trust</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your home is your sanctuary. We strictly vet, train, and supervise our staff so you feel completely at ease whether you are present or away at the office.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Hospitality Polish</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From precision bed-making to sparkling shower glass free of Dubai hard water stains, we obsess over the microscopic details other services overlook.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Guaranteed Satisfaction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If any aspect of your cleaning does not meet your expectations, let us know within 24 hours and our team will return to rectify it free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A1E3A]">
            Experience the AL Naveed Difference in Dubai
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Book your deep clean, villa maintenance, or regular housekeeping visit today and join thousands of satisfied Dubai clients.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-[#0F2F57] hover:bg-[#00A896] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Book a Cleaning
            </button>
            <button
              onClick={onNavigateToQuote}
              className="px-6 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm transition-all cursor-pointer"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
