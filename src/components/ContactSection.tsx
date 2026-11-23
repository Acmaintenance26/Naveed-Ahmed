import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, Send, CheckCircle2, Sparkles, Navigation, AlertCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Cleaning Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const generateWhatsAppFallbackUrl = () => {
    const text = `*New Website Inquiry - AL Naveed Dubai*\n` +
      `👤 Name: ${formData.name || 'Not specified'}\n` +
      `📞 Phone: ${formData.phone || 'Not specified'}\n` +
      `📧 Email: ${formData.email || 'Not provided'}\n` +
      `📌 Subject: ${formData.subject}\n` +
      `💬 Message: ${formData.message || 'Need assistance'}`;
    return `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitError('Please fill in your name and phone number.');
      return;
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    const payload: Record<string, string | boolean> = {
      'Name': formData.name.trim(),
      'Phone Number': formData.phone.trim(),
      'Email': formData.email.trim() || 'Not provided',
      'Subject': formData.subject,
      'Message': formData.message.trim() || 'No message provided',
      _subject: `New Website Message - ${formData.subject}`,
      _template: 'table',
      _captcha: false
    };

    if (formData.email.trim()) {
      payload._replyto = formData.email.trim();
    }

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
        throw new Error(result?.message || 'Unable to send your message right now.');
      }

      setIsSent(true);
    } catch (error) {
      const errorMessage = error instanceof Error && error.message
        ? error.message
        : 'Unable to send your message right now.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1E3A] tracking-tight">
            Contact AL Naveed Cleaning Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Have an inquiry about villa deep cleaning, office contracts, or emergency same-day slots? Our team in Dubai is here to help 7 days a week.
          </p>
        </div>

        {/* 4 Contact Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Phone */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-cyan-700 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Phone Call</h3>
            <p className="text-xs text-slate-500 mb-3">Direct hotline for fast assistance</p>
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="text-sm font-extrabold text-[#0F2F57] hover:text-cyan-700 block transition-colors"
            >
              {BUSINESS_CONFIG.phone}
            </a>
            <span className="text-[10px] text-slate-500 mt-1 block">Direct call & WhatsApp</span>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">WhatsApp Chat</h3>
            <p className="text-xs text-slate-500 mb-3">Instant booking & price quotes</p>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-extrabold text-emerald-600 hover:text-emerald-700 block transition-colors"
            >
              {BUSINESS_CONFIG.whatsapp}
            </a>
            <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">Active 24/7</span>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all text-center">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Email Inquiries</h3>
            <p className="text-xs text-slate-500 mb-3">Corporate contracts & tenders</p>
            <a
              href={`mailto:${BUSINESS_CONFIG.email}`}
              className="text-xs font-bold text-[#0F2F57] hover:text-cyan-700 block transition-colors break-all"
            >
              {BUSINESS_CONFIG.email}
            </a>
            <span className="text-[10px] text-slate-400 mt-1 block">Replies within 1 hour</span>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Location</h3>
            <p className="text-xs text-slate-500 mb-3">Operations & Dispatch Hub</p>
            <span className="text-xs font-bold text-slate-800 block">
              {BUSINESS_CONFIG.location}
            </span>
            <span className="text-[10px] text-slate-500 mt-1 block">Dubai, UAE</span>
          </div>
        </div>

        {/* Contact Form & Google Maps Section Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Direct Message Form (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#0A1E3A] mb-1">Send a Message</h3>
              <p className="text-xs text-slate-500 mb-6">
                Have a question or custom cleaning request? Leave your details below.
              </p>

              {isSent ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">Message Received!</h4>
                  <p className="text-xs text-emerald-700">
                    Thank you for reaching out. An AL Naveed representative will respond shortly via phone or WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setSubmitError(null);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        subject: 'General Cleaning Inquiry',
                        message: ''
                      });
                    }}
                    className="text-xs font-bold text-emerald-800 underline pt-2 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Al-Hashemi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="General Cleaning Inquiry">General Cleaning Inquiry</option>
                      <option value="Villa Deep Cleaning Quote">Villa Deep Cleaning Quote</option>
                      <option value="Commercial Office Cleaning">Commercial Office Cleaning Contract</option>
                      <option value="Move-In / Out Handover">Move-In / Out Handover</option>
                      <option value="AC Cleaning & Maintenance">AC Cleaning & Duct Sanitization</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your property location, rooms, or any specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-900 space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-rose-950">Message could not be sent</p>
                          <p className="text-rose-800 mt-0.5 leading-relaxed">
                            {submitError} Please try again or reach us directly on WhatsApp at{' '}
                            <strong className="font-bold">{BUSINESS_CONFIG.whatsapp}</strong> ({BUSINESS_CONFIG.phoneDisplay}).
                          </p>
                        </div>
                      </div>
                      <a
                        href={generateWhatsAppFallbackUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat on WhatsApp ({BUSINESS_CONFIG.whatsapp})
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-[#0F2F57] hover:bg-[#00A896] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending Message...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Working Hours: 7:30 AM – 9:00 PM
              </span>
              <span>Sunday – Saturday</span>
            </div>
          </div>

          {/* Google Maps Section Placeholder (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative min-h-[380px] flex flex-col justify-between">
            {/* Interactive Dubai Map Simulation Graphic */}
            <div className="absolute inset-0 bg-[#1e293b]">
              {/* Map stylized background grid and water body */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Dubai Coastline SVG stylized curves */}
              <svg className="absolute inset-0 w-full h-full text-cyan-900/40 pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="none">
                <path d="M0,300 C150,280 250,340 380,260 C500,180 650,220 800,150 L800,0 L0,0 Z" fill="currentColor" />
                <circle cx="280" cy="240" r="45" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                <circle cx="520" cy="220" r="60" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
              </svg>

              {/* Hub Indicators */}
              <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block animate-ping"></span>
                <span className="block text-[11px] font-bold text-cyan-200 bg-slate-900/80 px-2 py-0.5 rounded mt-1">
                  Dubai Marina Hub
                </span>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center mx-auto shadow-lg">
                  <MapPin className="w-5 h-5 text-amber-300" />
                </div>
                <div className="bg-slate-950/90 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl border border-slate-700 mt-2">
                  <span>AL Naveed Operations Hub</span>
                  <span className="block text-[10px] text-cyan-300 font-normal">Business Bay / Sheikh Zayed Rd</span>
                </div>
              </div>

              <div className="absolute bottom-1/4 right-1/4 text-center">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                <span className="block text-[11px] font-bold text-slate-200 bg-slate-900/80 px-2 py-0.5 rounded mt-1">
                  Arabian Ranches Mobile Team
                </span>
              </div>
            </div>

            {/* Map Top Header Badge */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <div className="bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-white flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span>Google Maps View • Dubai Service Network</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                Live Coverage: 100% Dubai
              </span>
            </div>

            {/* Map Bottom Information Strip */}
            <div className="relative z-10 p-5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
                <div>
                  <h4 className="font-bold text-white text-sm">
                    AL Naveed Cleaning & AC System Installation LLC
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Dubai Business Bay & Deira Operations Center, UAE
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Dubai+Business+Bay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
