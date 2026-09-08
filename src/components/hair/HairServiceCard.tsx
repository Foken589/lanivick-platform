import React, { useState } from 'react';
import { Scissors, Clock, Home, Sparkles, ArrowRight } from 'lucide-react';
import { HairService } from '../../types';
import { formatNaira } from '../../services/whatsappService';
import { HairBookingModal } from './HairBookingModal';

interface HairServiceCardProps {
  service: HairService;
}

export const HairServiceCard: React.FC<HairServiceCardProps> = ({ service }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <article className="group bg-white rounded-3xl overflow-hidden border border-borderLine shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col justify-between">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100">
          <img
            src={service.image}
            alt={service.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {service.popular && (
              <span className="px-2.5 py-1 rounded-full bg-gold-400 text-ink-950 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Popular Style
              </span>
            )}
            {service.homeServiceEligible && (
              <span className="px-2.5 py-1 rounded-full bg-wine-900/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <Home className="w-3 h-3 text-gold-300" />
                Home Service Available
              </span>
            )}
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-ink-500 font-medium mb-1.5">
              <Clock className="w-3.5 h-3.5 text-wine-900" />
              <span>Est. {service.duration}</span>
            </div>

            <h3 className="font-serif text-lg font-bold text-ink-900 group-hover:text-wine-900 transition-colors leading-snug">
              {service.name}
            </h3>

            <p className="mt-2 text-xs text-ink-500 line-clamp-2 leading-relaxed">
              {service.description}
            </p>

            {/* Lengths Available Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {service.lengthsAvailable.slice(0, 3).map((length) => (
                <span
                  key={length}
                  className="px-2 py-0.5 rounded-md bg-cream-100 text-wine-900 text-[10px] font-semibold"
                >
                  {length}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-borderLine/70 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-ink-500 font-bold uppercase block tracking-wider">
                Starting From
              </span>
              <span className="font-serif text-lg font-extrabold text-wine-900">
                {formatNaira(service.startingPrice)}
              </span>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-4 py-2 rounded-xl bg-wine-900 hover:bg-wine-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm group-hover:shadow-md active:scale-98"
            >
              <Scissors className="w-3.5 h-3.5 text-gold-400" />
              <span>Book Service</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </article>

      {isBookingOpen && (
        <HairBookingModal service={service} onClose={() => setIsBookingOpen(false)} />
      )}
    </>
  );
};
