import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { HowItWorks } from '../components/HowItWorks';
import { ServiceAreas } from '../components/ServiceAreas';
import { Testimonials } from '../components/Testimonials';
import { FAQAccordion } from '../components/FAQAccordion';
import { FinalCTA } from '../components/FinalCTA';
import { ContactSection } from '../components/ContactSection';
import { BookingForm } from '../components/BookingForm';
import { SERVICES } from '../data/services';
import { BLOG_POSTS } from '../data/blog';
import { ServiceItem, PageId } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, BookOpen, Clock } from 'lucide-react';

interface HomeViewProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigateToQuote: () => void;
  onSelectServiceDetail: (service: ServiceItem) => void;
  onNavigate?: (page: PageId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenBooking,
  onNavigateToQuote,
  onSelectServiceDetail,
  onNavigate
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'commercial' | 'specialized'>('all');

  const filteredServices = SERVICES.filter(
    s => activeCategory === 'all' || s.category === activeCategory
  );

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero
        onOpenBooking={() => onOpenBooking()}
        onNavigateToQuote={onNavigateToQuote}
      />

      {/* 2. Services Section (Exact requirements: 10 service cards with icons/images, short descriptions, Learn More buttons) */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200" id="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full">
              Full Cleaning Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1E3A] tracking-tight">
              Our Professional Cleaning Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore our wide range of residential, villa, and commercial cleaning packages tailored to Dubai standards.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
              {[
                { id: 'all', label: 'All Services (10)' },
                { id: 'residential', label: 'Residential & Villas' },
                { id: 'commercial', label: 'Commercial & Offices' },
                { id: 'specialized', label: 'Specialized (Sofa, Carpet, Steam)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#0F2F57] text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Pricing Transparency Note Banner */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-950 text-xs font-medium max-w-2xl text-left">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Pricing Notice:</strong> All listed prices are starting baseline estimates and are not fixed. Final rates will vary and change based on property size, layout, condition, and personalized requirements.
                </span>
              </div>
            </div>
          </div>

          {/* 10 Services Grid */}
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

          {/* Bottom Custom Quote banner */}
          <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Looking for a tailored cleaning combination?
                </h4>
                <p className="text-xs text-slate-500">
                  Combine deep cleaning with sofa steam extraction or AC maintenance for package savings.
                </p>
              </div>
            </div>
            <button
              onClick={onNavigateToQuote}
              className="px-5 py-2.5 rounded-xl bg-[#0F2F57] hover:bg-[#00A896] text-white font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              Configure Custom Package
            </button>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 4. How It Works Section */}
      <HowItWorks onOpenBooking={() => onOpenBooking()} />

      {/* 5. Service Areas Section */}
      <ServiceAreas onOpenBooking={() => onOpenBooking()} />

      {/* 6. Customer Reviews Section */}
      <Testimonials />

      {/* 7. FAQ Accordion Section */}
      <FAQAccordion />

      {/* 7b. Latest Cleaning Guides & Blog Section */}
      <section className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                Dubai Cleaning Insights
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1E3A] tracking-tight">
                Latest Expert Cleaning Articles & Guides
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Practical hygiene advice, tenancy handover tips, and AC filter care directly from Dubai specialists.
              </p>
            </div>

            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate ? onNavigate('blog') : window.history.pushState({ page: 'blog' }, '', '/blog');
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-700 hover:text-cyan-800 shrink-0 cursor-pointer"
            >
              <span>Explore All Articles ({BLOG_POSTS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <a
                key={post.id}
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate ? onNavigate('blog') : window.history.pushState({ page: 'blog' }, '', '/blog');
                }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-600" /> {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.publishedDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#0A1E3A] group-hover:text-cyan-700 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-700">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8. On-Page Booking / Free Quote Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200" id="booking-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full">
              Quick & Easy Booking
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1E3A] tracking-tight">
              Request Your Free Dubai Cleaning Quote
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Submit your requirements below to receive a customized estimate in AED.
            </p>
            <p className="text-xs text-slate-500">
              *Please note: All online prices are starting estimates and not fixed. Final rates will vary and change based on property size, layout, condition, and specific requirements.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            <BookingForm onSuccess={() => {}} />
          </div>
        </div>
      </section>

      {/* 9. Contact & Map Section */}
      <ContactSection />

      {/* 10. Final CTA Section */}
      <FinalCTA onOpenBooking={() => onOpenBooking()} />
    </div>
  );
};
