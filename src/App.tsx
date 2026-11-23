import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomBar } from './components/MobileBottomBar';
import { BookingQuoteModal } from './components/BookingQuoteModal';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { ContactView } from './views/ContactView';
import { QuoteView } from './views/QuoteView';
import { BlogView } from './views/BlogView';
import { SERVICES } from './data/services';
import { PageId, ServiceItem } from './types';

const VALID_PAGES: PageId[] = [
  'home',
  'about',
  'services',
  'deep-cleaning',
  'home-cleaning',
  'office-cleaning',
  'move-in-out-cleaning',
  'sofa-carpet-cleaning',
  'villa-cleaning',
  'contact',
  'quote',
  'blog'
];

const getPageFromLocation = (): PageId => {
  // First check pathname (e.g. /services, /about, /deep-cleaning)
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').trim();
  if (pathname && pathname !== 'index.html' && VALID_PAGES.includes(pathname as PageId)) {
    return pathname as PageId;
  }

  // Gracefully handle and migrate legacy hash if present (e.g. /#services -> /services)
  if (window.location.hash) {
    const legacyHash = window.location.hash.replace(/^#\/?/, '').trim() as PageId;
    if (VALID_PAGES.includes(legacyHash)) {
      return legacyHash;
    }
  }

  return 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => getPageFromLocation());
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(() => {
    const initialPage = getPageFromLocation();
    return SERVICES.find(s => s.slug === initialPage || s.id === initialPage) || null;
  });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);

  // Sync browser URL and popstate navigation (Back / Forward buttons)
  useEffect(() => {
    // Clean up any legacy hash on load and normalize to clean path (e.g. /#about -> /about)
    const initialPage = getPageFromLocation();
    const expectedPath = initialPage === 'home' ? '/' : `/${initialPage}`;

    if (window.location.hash || window.location.pathname !== expectedPath) {
      window.history.replaceState({ page: initialPage }, '', expectedPath);
    }

    const handlePopState = (event: PopStateEvent) => {
      const pageFromState = event.state?.page as PageId | undefined;
      const targetPage = pageFromState && VALID_PAGES.includes(pageFromState)
        ? pageFromState
        : getPageFromLocation();

      setCurrentPage(targetPage);
      const serviceMatch = SERVICES.find(s => s.slug === targetPage || s.id === targetPage);
      setSelectedService(serviceMatch || null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageId, replace = false) => {
    setCurrentPage(page);

    // Check if navigating directly to a specialized service page
    const directService = SERVICES.find(s => s.slug === page || s.id === page);
    if (directService) {
      setSelectedService(directService);
    } else {
      setSelectedService(null);
    }

    // Clean URL without `#`
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetPath || window.location.hash) {
      if (replace) {
        window.history.replaceState({ page }, '', targetPath);
      } else {
        window.history.pushState({ page }, '', targetPath);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceDetail = (service: ServiceItem) => {
    setSelectedService(service);
    const validSlug = service.slug as PageId;
    setCurrentPage(validSlug);

    const targetPath = `/${service.slug}`;
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState({ page: validSlug }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingModal = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  // Render view based on state
  const renderCurrentView = () => {
    // If on a dedicated service subpage
    if (
      [
        'deep-cleaning',
        'home-cleaning',
        'office-cleaning',
        'move-in-out-cleaning',
        'sofa-carpet-cleaning',
        'villa-cleaning'
      ].includes(currentPage)
    ) {
      const targetService = selectedService || SERVICES.find(s => s.slug === currentPage || s.id === currentPage) || SERVICES[0];
      return (
        <ServiceDetailView
          service={targetService}
          onBackToServices={() => handleNavigate('services')}
          onSelectService={(s) => handleSelectServiceDetail(s)}
          onOpenBooking={(id) => handleOpenBookingModal(id)}
        />
      );
    }

    switch (currentPage) {
      case 'about':
        return (
          <AboutView
            onOpenBooking={() => handleOpenBookingModal()}
            onNavigateToQuote={() => handleNavigate('quote')}
          />
        );
      case 'services':
        return (
          <ServicesView
            onOpenBooking={(id) => handleOpenBookingModal(id)}
            onSelectServiceDetail={(s) => handleSelectServiceDetail(s)}
            onNavigateToQuote={() => handleNavigate('quote')}
          />
        );
      case 'contact':
        return <ContactView onOpenBooking={() => handleOpenBookingModal()} />;
      case 'quote':
        return <QuoteView />;
      case 'blog':
        return (
          <BlogView
            onOpenBooking={(id) => handleOpenBookingModal(id)}
            onNavigateToQuote={() => handleNavigate('quote')}
            onNavigateToService={(slug) => handleNavigate(slug)}
          />
        );
      case 'home':
      default:
        return (
          <HomeView
            onOpenBooking={(id) => handleOpenBookingModal(id)}
            onNavigateToQuote={() => handleNavigate('quote')}
            onSelectServiceDetail={(s) => handleSelectServiceDetail(s)}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Sticky Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={(id) => handleOpenBookingModal(id)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={(id) => handleOpenBookingModal(id)}
      />

      {/* Floating WhatsApp CTA on desktop & mobile */}
      <FloatingWhatsApp />

      {/* Sticky Bottom Bar on Mobile */}
      <MobileBottomBar onOpenBooking={() => handleOpenBookingModal()} />

      {/* Quick Booking / Quote Modal */}
      <BookingQuoteModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedServiceId={bookingServiceId}
      />
    </div>
  );
}
