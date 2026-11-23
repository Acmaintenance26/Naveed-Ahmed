import React from 'react';
import {
  Sparkles,
  Home,
  Building,
  Briefcase,
  Truck,
  Armchair,
  Layers,
  ChefHat,
  Droplets,
  Castle,
  ArrowRight
} from 'lucide-react';
import { ServiceItem, PageId } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService: (service: ServiceItem) => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelectService,
  onBookService
}) => {
  // Map icon string to Lucide component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'Castle': return <Castle className="w-5 h-5" />;
      case 'Building': return <Building className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      case 'Armchair': return <Armchair className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'ChefHat': return <ChefHat className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Card Header & Image */}
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={service.image}
            alt={`${service.title} in Dubai`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          {/* Category / Popular Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            {service.popular && (
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Most Popular
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider">
              {service.category}
            </span>
          </div>

          {/* Starting Price in AED */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-md text-right">
            <span className="text-[10px] text-slate-500 font-medium block">Starting from</span>
            <span className="text-xs font-black text-[#0F2F57]">AED {service.priceStartingAed}*</span>
          </div>

          {/* Floating Icon */}
          <div className="absolute -bottom-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F2F57] to-[#00A896] text-white flex items-center justify-center shadow-lg border-2 border-white">
            {getIcon(service.iconName)}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 pt-7 space-y-2.5">
          <h3 className="text-lg font-bold text-[#0A1E3A] group-hover:text-cyan-700 transition-colors">
            {service.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
            {service.shortDesc}
          </p>

          {/* Key Features Bullet List */}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            {service.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>

          {/* Price disclaimer note */}
          <p className="text-[10px] text-slate-600 italic pt-1">
            *Starting estimate · Not fixed (final price will change with size & condition)
          </p>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={() => onSelectService(service)}
          className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all text-center cursor-pointer"
        >
          Learn More
        </button>

        <button
          onClick={() => onBookService(service.id)}
          className="py-2.5 px-3 rounded-xl bg-[#0F2F57] hover:bg-[#00A896] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
        >
          <span>Book Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
