import React, { useEffect } from 'react';
import { X, Sparkles, ShieldCheck } from 'lucide-react';
import { BookingForm } from './BookingForm';
import { SERVICES } from '../data/services';

interface BookingQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const BookingQuoteModal: React.FC<BookingQuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentService = SERVICES.find(s => s.id === preselectedServiceId || s.slug === preselectedServiceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-[#0F2F57] to-[#0A1E3A] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
            id="modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold tracking-wider uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Fast & Free Dubai Cleaning Quote</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {currentService ? `Book ${currentService.title}` : 'Book a Cleaning in Dubai'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
            Fill out your requirements below to receive an instant, accurate quotation with no hidden charges.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          <BookingForm initialServiceId={preselectedServiceId} isCompact={true} />
        </div>
      </div>
    </div>
  );
};
