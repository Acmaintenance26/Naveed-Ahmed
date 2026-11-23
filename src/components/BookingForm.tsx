import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Building, Home, CheckCircle2, AlertCircle, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config';
import { SERVICES } from '../data/services';
import { DUBAI_AREAS } from '../data/areas';
import { BookingFormData } from '../types';

interface BookingFormProps {
  initialServiceId?: string;
  onSuccess?: () => void;
  isCompact?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialServiceId,
  onSuccess,
  isCompact = false
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceRequired: initialServiceId || 'deep-cleaning',
    propertyType: 'Apartment',
    numberOfBedrooms: '2 Bedrooms',
    preferredDate: '',
    preferredTime: 'Morning (8:00 AM - 11:00 AM)',
    locationArea: 'Downtown Dubai',
    additionalRequirements: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);

  // Approximate pricing helper in AED based on Dubai cleaning averages
  const getEstimatedPrice = () => {
    let base = 350;
    if (formData.serviceRequired === 'regular-home-cleaning') base = 120;
    else if (formData.serviceRequired === 'deep-cleaning') base = 449;
    else if (formData.serviceRequired === 'villa-cleaning') base = 799;
    else if (formData.serviceRequired === 'office-cleaning') base = 550;
    else if (formData.serviceRequired === 'move-in-out-cleaning') base = 599;
    else if (formData.serviceRequired === 'sofa-cleaning') base = 149;
    else if (formData.serviceRequired === 'carpet-cleaning') base = 199;

    let bedMultiplier = 1;
    if (formData.numberOfBedrooms === 'Studio') bedMultiplier = 0.85;
    else if (formData.numberOfBedrooms === '1 Bedroom') bedMultiplier = 0.95;
    else if (formData.numberOfBedrooms === '2 Bedrooms') bedMultiplier = 1.15;
    else if (formData.numberOfBedrooms === '3 Bedrooms') bedMultiplier = 1.45;
    else if (formData.numberOfBedrooms === '4 Bedrooms') bedMultiplier = 1.85;
    else if (formData.numberOfBedrooms === '5+ Bedrooms') bedMultiplier = 2.4;

    if (formData.propertyType === 'Villa') bedMultiplier *= 1.35;

    return Math.round(base * bedMultiplier);
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.replace(/\D/g, '').length < 7) {
      newErrors.phoneNumber = 'Please enter a valid phone number (e.g. 050 123 4567)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date';
    }

    if (!formData.locationArea) {
      newErrors.locationArea = 'Please select your area in Dubai';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const selectedServiceObj = SERVICES.find(s => s.id === formData.serviceRequired || s.slug === formData.serviceRequired);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const serviceName = selectedServiceObj?.title || formData.serviceRequired;
    const payload = {
      'Full Name': formData.fullName.trim(),
      'Phone Number': formData.phoneNumber.trim(),
      'Email': formData.email.trim(),
      'Service Required': serviceName,
      'Property Type': formData.propertyType,
      'Number of Bedrooms': formData.numberOfBedrooms,
      'Preferred Date': formData.preferredDate,
      'Preferred Time': formData.preferredTime,
      'Location / Area in Dubai': formData.locationArea,
      'Additional Requirements': formData.additionalRequirements.trim() || 'None',
      'Estimated Starting Price': `AED ~${getEstimatedPrice()} (Starting estimate, not fixed)`,
      _subject: `New Booking Request - AL Naveed Dubai (${serviceName})`,
      _template: 'table',
      _captcha: false,
      _replyto: formData.email.trim()
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${BUSINESS_CONFIG.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false || result?.success === 'false') {
        throw new Error(result?.message || 'Unable to submit your booking request right now.');
      }

      setSubmittedData({ ...formData });
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMessage = error instanceof Error && error.message
        ? error.message
        : 'We could not send your booking request right now.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate WhatsApp prefill link from submitted or current form data
  const generateWhatsAppConfirmationUrl = (sourceData: BookingFormData | null = submittedData) => {
    if (!sourceData) return '';
    const serviceTitle = SERVICES.find(s => s.id === sourceData.serviceRequired || s.slug === sourceData.serviceRequired)?.title || sourceData.serviceRequired;
    const text = `*New Cleaning Quote Request - AL Naveed Dubai*\n` +
      `👤 Name: ${sourceData.fullName}\n` +
      `📞 Phone: ${sourceData.phoneNumber}\n` +
      `📧 Email: ${sourceData.email}\n` +
      `🧹 Service: ${serviceTitle}\n` +
      `🏠 Property: ${sourceData.propertyType} (${sourceData.numberOfBedrooms})\n` +
      `📍 Dubai Area: ${sourceData.locationArea}\n` +
      `📅 Date: ${sourceData.preferredDate} | ${sourceData.preferredTime}\n` +
      `📝 Notes: ${sourceData.additionalRequirements || 'None'}\n` +
      `💰 Est. Estimate: AED ~${getEstimatedPrice()}`;
    return `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Quote Request Received
          </span>
          <h3 className="text-2xl font-extrabold text-[#0A1E3A]">
            Thank You, {submittedData.fullName}!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your booking request has been forwarded to our Dubai dispatch coordinator. We will contact you at <strong className="text-slate-900">{submittedData.phoneNumber}</strong> within 15–30 minutes with your guaranteed quotation.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-200 text-xs text-slate-700 space-y-2 max-w-md mx-auto">
          <div className="flex justify-between border-b border-slate-200 pb-1.5 font-medium">
            <span className="text-slate-500">Service:</span>
            <span className="font-bold text-[#0F2F57]">{selectedServiceObj?.title || submittedData.serviceRequired}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1.5 font-medium">
            <span className="text-slate-500">Location:</span>
            <span className="font-semibold text-slate-900">{submittedData.locationArea}, Dubai</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1.5 font-medium">
            <span className="text-slate-500">Schedule:</span>
            <span className="font-semibold text-slate-900">{submittedData.preferredDate} ({submittedData.preferredTime})</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-slate-500">Estimated Guide:</span>
            <span className="font-bold text-cyan-800 text-sm">AED ~{getEstimatedPrice()}</span>
          </div>
        </div>

        {/* WhatsApp Fast Confirmation Option */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={generateWhatsAppConfirmationUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105"
          >
            <MessageSquare className="w-4 h-4" />
            Instant WhatsApp Confirmation
          </a>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setSubmitError(null);
              setSubmittedData(null);
              setFormData({
                fullName: '',
                phoneNumber: '',
                email: '',
                serviceRequired: 'deep-cleaning',
                propertyType: 'Apartment',
                numberOfBedrooms: '2 Bedrooms',
                preferredDate: '',
                preferredTime: 'Morning (8:00 AM - 11:00 AM)',
                locationArea: 'Downtown Dubai',
                additionalRequirements: ''
              });
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors"
          >
            Book Another Service
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-slate-800" noValidate>
      {/* Dynamic Price Guide Badge with Not-Fixed Disclaimer */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-semibold text-[#0F2F57]">
              Estimated Starting Guide:
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 mr-1">from</span>
            <span className="text-base font-extrabold text-[#0F2F57]">
              AED ~{getEstimatedPrice()}*
            </span>
          </div>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          *Note: All prices are starting estimates and are not fixed. Final rate will change according to property size, layout, condition, and on-site requirements.
        </p>
      </div>

      {/* Row 1: Full Name & Phone Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="booking-fullName"
            type="text"
            placeholder="e.g. Tariq Al-Nuaimi"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all ${
              errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="booking-phoneNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="booking-phoneNumber"
              type="tel"
              placeholder="+971 50 XXX XXXX"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all ${
                errors.phoneNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Email & Service Required */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="booking-email"
            type="email"
            placeholder="e.g. name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all ${
              errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="booking-serviceRequired" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Service Required <span className="text-rose-500">*</span>
          </label>
          <select
            id="booking-serviceRequired"
            value={formData.serviceRequired}
            onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all"
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} (from AED {s.priceStartingAed})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Property Type & Bedrooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-propertyType" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Property Type
          </label>
          <select
            id="booking-propertyType"
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all"
          >
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa / Compound</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Commercial Office">Commercial Office</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Retail / Clinic">Retail / Clinic</option>
          </select>
        </div>

        <div>
          <label htmlFor="booking-numberOfBedrooms" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Number of Bedrooms / Size
          </label>
          <select
            id="booking-numberOfBedrooms"
            value={formData.numberOfBedrooms}
            onChange={(e) => setFormData({ ...formData, numberOfBedrooms: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all"
          >
            <option value="Studio">Studio Apartment</option>
            <option value="1 Bedroom">1 Bedroom</option>
            <option value="2 Bedrooms">2 Bedrooms</option>
            <option value="3 Bedrooms">3 Bedrooms</option>
            <option value="4 Bedrooms">4 Bedrooms</option>
            <option value="5+ Bedrooms">5+ Bedrooms / Large Estate</option>
          </select>
        </div>
      </div>

      {/* Row 4: Preferred Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-preferredDate" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Preferred Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="booking-preferredDate"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all ${
                errors.preferredDate ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
          </div>
          {errors.preferredDate && (
            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="booking-preferredTime" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Preferred Time
          </label>
          <select
            id="booking-preferredTime"
            value={formData.preferredTime}
            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all"
          >
            <option value="Morning (8:00 AM - 11:00 AM)">Morning (8:00 AM - 11:00 AM)</option>
            <option value="Midday (11:00 AM - 2:00 PM)">Midday (11:00 AM - 2:00 PM)</option>
            <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
            <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
            <option value="Anytime / Urgent Same-Day">Anytime / Urgent Same-Day</option>
          </select>
        </div>
      </div>

      {/* Row 5: Location / Area in Dubai */}
      <div>
        <label htmlFor="booking-locationArea" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          Location / Area in Dubai <span className="text-rose-500">*</span>
        </label>
        <select
          id="booking-locationArea"
          value={formData.locationArea}
          onChange={(e) => setFormData({ ...formData, locationArea: e.target.value })}
          className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all ${
            errors.locationArea ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
          }`}
        >
          {DUBAI_AREAS.map((area) => (
            <option key={area.name} value={area.name}>
              {area.name} ({area.zone})
            </option>
          ))}
          <option value="Other Area in Dubai">Other Dubai Area (Specify in notes)</option>
        </select>
        {errors.locationArea && (
          <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.locationArea}
          </p>
        )}
      </div>

      {/* Row 6: Additional Requirements */}
      <div>
        <label htmlFor="booking-additionalRequirements" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          Additional Requirements / Notes
        </label>
        <textarea
          id="booking-additionalRequirements"
          rows={isCompact ? 2 : 3}
          placeholder="e.g. Include oven deep clean, balcony steam washing, key handover instructions, or specific stains..."
          value={formData.additionalRequirements}
          onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all"
        />
      </div>

      {/* Error Feedback with WhatsApp Fallback */}
      {submitError && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 space-y-2.5"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-rose-950">
                Could not send booking request online
              </p>
              <p className="text-rose-800 leading-relaxed">
                {submitError} Please try again or message us directly on WhatsApp at{' '}
                <strong className="font-bold">{BUSINESS_CONFIG.whatsapp}</strong> ({BUSINESS_CONFIG.phoneDisplay}) for instant booking.
              </p>
            </div>
          </div>
          <a
            href={generateWhatsAppConfirmationUrl(formData)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Send Booking via WhatsApp ({BUSINESS_CONFIG.whatsapp})
          </a>
        </div>
      )}

      {/* Submission CTA */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          id="booking-submit-btn"
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0F2F57] to-[#00A896] hover:from-[#0A1E3A] hover:to-[#008f80] text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Sending Your Booking Request...
            </span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
        <p className="text-[11px] text-slate-500 text-center mt-2 leading-tight">
          🔒 No upfront payment required. *All quotes are starting estimates and are not fixed; actual rates will be confirmed based on property details.
        </p>
      </div>
    </form>
  );
};
