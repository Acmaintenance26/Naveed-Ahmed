import React from 'react';
import { Star, MessageSquare, Quote, Sparkles, CheckCircle } from 'lucide-react';
import { SAMPLE_TESTIMONIALS } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Customer Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1E3A] tracking-tight">
            What Our Dubai Clients Say
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Read feedback from residential villa owners, apartment tenants, and business managers who rely on our cleaning standards.
          </p>

          {/* Explicit sample content notice as mandated by prompt */}
          <div className="inline-block bg-slate-200/70 border border-slate-300 text-slate-600 text-[11px] px-3 py-1 rounded-lg">
            ℹ️ <strong>Developer Note:</strong> The reviews below are realistic sample placeholders structured for demonstration and easily replaced with your verified Google / Trustpilot reviews.
          </div>
        </div>

        {/* Testimonials 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Rating Stars & Service Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
                    {t.service}
                  </span>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.reviewText}"
                </p>
              </div>

              {/* Author & Location Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {t.authorName}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {t.location}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">
                  {t.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0F2F57]">4.9 / 5.0</div>
            <p className="text-xs text-slate-500 font-medium mt-1">Average Client Rating</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#00A896]">100%</div>
            <p className="text-xs text-slate-500 font-medium mt-1">Satisfaction Guarantee</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0F2F57]">20+</div>
            <p className="text-xs text-slate-500 font-medium mt-1">Dubai Communities</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-500">7 Days</div>
            <p className="text-xs text-slate-500 font-medium mt-1">Weekly Coverage</p>
          </div>
        </div>

      </div>
    </section>
  );
};
