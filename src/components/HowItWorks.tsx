import React from 'react';
import { MessageSquare, Calculator, Sparkles, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: '1. Contact Us',
      desc: 'Tell us what type of cleaning you need for your Dubai apartment, villa, or office via our simple web form, phone, or WhatsApp.',
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      accent: 'from-[#0F2F57] to-[#0A1E3A]'
    },
    {
      num: '02',
      title: '2. Get a Quote',
      desc: 'Receive a clear, upfront quote in AED based on your exact property size and requirements with guaranteed transparent rates.',
      icon: <Calculator className="w-6 h-6 text-white" />,
      accent: 'from-[#00A896] to-cyan-600'
    },
    {
      num: '03',
      title: '3. Enjoy a Clean Space',
      desc: 'Our professional cleaners arrive right on time with premium equipment and take care of the cleaning to perfection.',
      icon: <Sparkles className="w-6 h-6 text-slate-900" />,
      accent: 'from-amber-400 to-amber-300'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full">
            Seamless 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1E3A] tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Booking professional cleaning services in Dubai has never been this effortless.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Step Number Watermark */}
              <span className="absolute top-6 right-6 text-4xl font-black text-slate-100 select-none">
                {step.num}
              </span>

              <div className="space-y-4 relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-md`}>
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-cyan-700">
                <span>Fast & hassle-free</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast Action Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F2F57] hover:bg-[#00A896] text-white text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Ready to start? Request your quote now</span>
          </button>
        </div>

      </div>
    </section>
  );
};
