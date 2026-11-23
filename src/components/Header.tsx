import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Clock, MapPin, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/config';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceSubmenu: { label: string; page: PageId; desc: string }[] = [
    { label: 'Deep Cleaning', page: 'deep-cleaning', desc: 'Hospital-grade sanitization for homes & villas' },
    { label: 'Regular Home Cleaning', page: 'home-cleaning', desc: 'Routine housekeeping & recurring visits' },
    { label: 'Villa Cleaning', page: 'villa-cleaning', desc: 'Multi-story & estate deep cleaning' },
    { label: 'Apartment Cleaning', page: 'services', desc: 'Tower-friendly cleaning for 1BHK/2BHK' },
    { label: 'Office Cleaning', page: 'office-cleaning', desc: 'Commercial spaces & corporate hygiene' },
    { label: 'Move-In / Move-Out', page: 'move-in-out-cleaning', desc: 'Deposit-back inspection guaranteed' },
    { label: 'Sofa & Carpet Cleaning', page: 'sofa-carpet-cleaning', desc: 'Hot water & steam fiber extraction' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notification Bar - Dubai Context & Direct Hotline */}
      <div className="bg-[#0A1E3A] text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <MapPin className="w-3.5 h-3.5" />
              Dubai, UAE (Dubai-Wide Service)
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {BUSINESS_CONFIG.workingHours}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-cyan-400 transition-colors"
              id="header-top-call"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call: <strong className="text-white">{BUSINESS_CONFIG.phone}</strong></span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappDefaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              id="header-top-whatsapp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us 24/7</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'glass-nav shadow-md py-3' : 'bg-white py-4 shadow-xs'} border-b border-slate-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
            id="brand-logo-btn"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0F2F57] to-[#00A896] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg tracking-tight text-[#0A1E3A] leading-tight flex items-center gap-1.5">
                AL NAVEED
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800">
                  DUBAI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-tight">
                Cleaning Services & AC Installation
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'text-[#0F2F57] font-bold bg-slate-100'
                  : 'hover:text-[#0F2F57] hover:bg-slate-50'
              }`}
              id="nav-home-btn"
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('services')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                  ['services', 'deep-cleaning', 'home-cleaning', 'office-cleaning', 'move-in-out-cleaning', 'sofa-carpet-cleaning', 'villa-cleaning'].includes(currentPage)
                    ? 'text-[#0F2F57] font-bold bg-slate-100'
                    : 'hover:text-[#0F2F57] hover:bg-slate-50'
                }`}
                id="nav-services-dropdown-btn"
              >
                Services
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>POPULAR SERVICES</span>
                    <button
                      onClick={() => handleNavClick('services')}
                      className="text-cyan-600 hover:text-cyan-700 cursor-pointer"
                    >
                      View All
                    </button>
                  </div>
                  {serviceSubmenu.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.page)}
                      className="w-full text-left px-3 py-2.5 hover:bg-slate-50 transition-colors flex flex-col group cursor-pointer"
                    >
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-cyan-600">
                        {item.label}
                      </span>
                      <span className="text-xs text-slate-500 font-normal">
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'about'
                  ? 'text-[#0F2F57] font-bold bg-slate-100'
                  : 'hover:text-[#0F2F57] hover:bg-slate-50'
              }`}
              id="nav-about-btn"
            >
              About Us
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'blog'
                  ? 'text-[#0F2F57] font-bold bg-slate-100'
                  : 'hover:text-[#0F2F57] hover:bg-slate-50'
              }`}
              id="nav-blog-btn"
            >
              Blog
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'contact'
                  ? 'text-[#0F2F57] font-bold bg-slate-100'
                  : 'hover:text-[#0F2F57] hover:bg-slate-50'
              }`}
              id="nav-contact-btn"
            >
              Contact Us
            </button>

            <button
              onClick={() => handleNavClick('quote')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 'quote'
                  ? 'text-[#0F2F57] font-bold bg-slate-100'
                  : 'hover:text-[#0F2F57] hover:bg-slate-50'
              }`}
              id="nav-quote-btn"
            >
              Get a Quote
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400 font-semibold text-sm flex items-center gap-2 transition-all shadow-2xs"
              id="header-call-btn"
            >
              <Phone className="w-4 h-4 text-cyan-600" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0F2F57] to-[#00A896] hover:from-[#0A1E3A] hover:to-[#008f80] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              id="header-book-btn"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Book a Cleaning</span>
            </button>
          </div>

          {/* Mobile Menu & Quick Call Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="p-2 rounded-lg bg-slate-100 text-[#0F2F57] hover:bg-slate-200 transition-colors"
              aria-label="Call AL Naveed"
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1.5 font-medium text-slate-800">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 font-semibold"
            >
              Home
            </button>

            <div className="px-3 pt-2 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Cleaning Services
            </div>
            {serviceSubmenu.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className="text-left pl-6 pr-3 py-2 rounded-lg hover:bg-slate-100 text-sm flex items-center justify-between text-slate-700"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded font-semibold">View</span>
              </button>
            ))}

            <button
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 font-semibold mt-2"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 font-semibold"
            >
              Blog & Cleaning Guides
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 font-semibold"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNavClick('quote')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 font-semibold"
            >
              Get a Free Quote
            </button>

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0F2F57] to-[#00A896] text-white font-bold text-center shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Book a Cleaning Now
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="py-2.5 px-3 rounded-lg border border-slate-300 text-center font-semibold text-slate-700 text-sm flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-cyan-600" />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappDefaultMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-emerald-600 text-white text-center font-semibold text-sm flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
