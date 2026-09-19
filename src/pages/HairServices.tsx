import React, { useState } from 'react';
import { Scissors, Sparkles, Home, CheckCircle2, Heart, Clock, MessageCircle } from 'lucide-react';
import { dataService } from '../services/dataService';
import { HairServiceCard } from '../components/hair/HairServiceCard';
import { HairCategory } from '../types';
import { openWhatsApp } from '../services/whatsappService';

export const HairServices: React.FC = () => {
  const hairServices = dataService.getHairServices();
  const settings = dataService.getSettings();

  const [activeCategory, setActiveCategory] = useState<'all' | HairCategory>('all');

  const filteredServices =
    activeCategory === 'all'
      ? hairServices
      : hairServices.filter((s) => s.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All 12 Styles' },
    { id: 'braids', label: 'Nutted & Nut-less Braids' },
    { id: 'twists', label: 'Passion & Kinky Twists' },
    { id: 'weaving', label: 'Ganna Weaving & Cornrows' },
    { id: 'locs', label: 'Locs & Dreads Relock' },
    { id: 'wigs', label: 'Making Wigs & Revamp' },
    { id: 'natural', label: 'Threading, Ponytail & Packing Gel' },
  ];

  return (
    <div className="bg-[#fffdfa] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wine-50 text-wine-900 border border-wine-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Vikky's Hairplace • Master Artistry</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-ink-900 leading-tight">
            Transforming Your Hair.{' '}
            <span className="italic font-serif text-wine-900 font-normal">Revealing Your Beauty.</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-ink-500 leading-relaxed">
            From pain-free knotless braids to traditional African threading, dreads relock, and custom wig construction. Experience edge-protective salon care or doorstep home service across <strong className="text-wine-900">Lokoja</strong> &amp; <strong className="text-wine-900">Abuja</strong>.
          </p>
        </div>

        {/* Home Service & Official Flyer Banner */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-wine-900 via-wine-950 to-wine-900 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-gold-500/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-gold-400 flex items-center justify-center font-bold text-2xl shrink-0">
              <Home className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                VIP Salon &amp; Home Service
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Book Vicky's Luxury Doorstep Service
              </h3>
              <p className="text-xs text-cream-200/90 mt-1 max-w-xl">
                Skip salon wait times. Our master stylists bring professional tools directly to your home in Lokoja or Abuja for stress-free styling.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() =>
                openWhatsApp(
                  settings.whatsappNumber,
                  'Hello Vicky! I would like to book a hair service appointment.'
                )
              }
              className="px-6 py-3.5 rounded-2xl bg-gold-400 hover:bg-gold-500 text-ink-950 font-bold text-xs shadow-md transition-all whitespace-nowrap flex items-center gap-2 shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-ink-950" />
              <span>Book via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-wine-900 text-white shadow-sm'
                  : 'bg-white text-ink-800 border border-borderLine hover:bg-cream-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Hair Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredServices.map((service) => (
            <HairServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Salon Etiquette & Preparation Guide */}
        <div className="p-8 sm:p-10 rounded-3xl bg-cream-50 border border-borderLine">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h3 className="font-serif text-2xl font-bold text-ink-900">
              Hair Preparation &amp; Studio Guidelines
            </h3>
            <p className="text-xs text-ink-500 mt-1">
              For the longest-lasting, neatest braids and comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-ink-800">
            <div className="p-4 rounded-2xl bg-white border border-borderLine">
              <span className="font-bold text-wine-900 block mb-1">1. Freshly Washed &amp; Detangled</span>
              <p className="text-ink-500">
                Please wash and thoroughly blow dry or stretch your natural hair prior to your appointment.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-borderLine">
              <span className="font-bold text-wine-900 block mb-1">2. Hair Extensions Advice</span>
              <p className="text-ink-500">
                We provide pre-stretched X-pression extensions upon request, or you may bring your favorite brand and colour blend.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-borderLine">
              <span className="font-bold text-wine-900 block mb-1">3. Zero Tension Guarantee</span>
              <p className="text-ink-500">
                We strictly protect your edges. If at any point you feel excessive pull, let our stylist know for immediate adjustment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
