import React, { useState } from 'react';
import { BookingForm } from '../components/BookingForm';
import { Sparkles, Calculator, CheckCircle2, ShieldCheck, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config';

export const QuoteView: React.FC = () => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addonsList = [
    { id: 'sofa-steam', label: 'Sofa Steam Sanitization (3-Seater)', price: 149 },
    { id: 'balcony-wash', label: 'Balcony Jet Wash & Window Detailing', price: 99 },
    { id: 'ac-grille', label: 'AC Vents & Grilles Antibacterial Wipe', price: 120 },
    { id: 'fridge-oven', label: 'Inside Refrigerator & Oven Degrease', price: 150 },
    { id: 'carpet-shampoo', label: 'Living Room Carpet Shampoo Extraction', price: 199 }
  ];

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const totalAddonsPrice = selectedAddons.reduce((acc, curr) => {
    const found = addonsList.find(a => a.id === curr);
    return acc + (found ? found.price : 0);
  }, 0);

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-cyan-700" />
            Transparent AED Pricing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1E3A] tracking-tight">
            Get a Free Cleaning Quote in Dubai
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            No hidden charges or call-out fees. Fill in your property details for a custom, itemized estimate from AL Naveed.
          </p>

          {/* Prominent Pricing Notice Banner */}
          <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 text-left text-xs text-amber-950 flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-amber-900 block font-bold text-sm">
                Important Pricing Policy Notice:
              </strong>
              <p className="leading-relaxed">
                All prices and rates shown on this website or calculated online are <strong>starting estimates and are not fixed</strong>. Final rates will vary and change based on your property's actual square footage, layout, initial cleanliness condition, and customized service requirements. Our team will review your specifications to provide a tailored, finalized quotation before any service begins.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Calculator + Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Cols: Add-ons & Pricing Assurance */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Optional Custom Add-ons */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Popular Dubai Add-ons
                </h3>
                <span className="text-xs text-cyan-700 font-semibold">Optional</span>
              </div>
              <p className="text-xs text-slate-500">
                Enhance your clean with specialized deep sanitization add-ons:
              </p>

              <div className="space-y-2.5">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-cyan-50/70 border-cyan-400 text-cyan-950 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <span className="text-[10px] font-bold">✓</span>}
                        </div>
                        <span>{addon.label}</span>
                      </div>
                      <span className="text-xs font-bold text-[#0F2F57] shrink-0 ml-2">
                        +AED {addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              {selectedAddons.length > 0 && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-900 bg-cyan-50/60 p-2.5 rounded-xl">
                  <span>Selected Add-ons Total:</span>
                  <span className="text-sm text-[#0F2F57]">+AED {totalAddonsPrice}</span>
                </div>
              )}
            </div>

            {/* Dubai Guarantee Box */}
            <div className="bg-gradient-to-br from-[#0F2F57] to-[#0A1E3A] text-white rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Dubai Quality Guarantee</span>
              </div>
              <h4 className="text-lg font-bold text-white">
                Transparent & Finalized Quote Guarantee
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Initial numbers are starting estimates and not fixed. Once our Dubai team verifies your property specifications or does an on-site inspection, your agreed quote is locked with zero surprise surcharges.
              </p>
              <div className="pt-2 border-t border-slate-700/80 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>5% UAE VAT itemized transparently</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Free cancellation up to 4 hours before</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cash, Card, or Bank Transfer accepted</span>
                </div>
              </div>
            </div>

            {/* Direct Instant Hotline */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
              <p className="text-xs text-slate-500 font-medium">Prefer an immediate verbal quote?</p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-600" />
                  {BUSINESS_CONFIG.phone}
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappDefaultMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>

          </div>

          {/* Right 7 Cols: Full Booking Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            <h3 className="text-xl font-bold text-[#0A1E3A] mb-1">
              Your Booking & Property Details
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Complete the form below to receive your quotation within 15–30 minutes.
            </p>

            <BookingForm />
          </div>

        </div>

      </div>
    </div>
  );
};
