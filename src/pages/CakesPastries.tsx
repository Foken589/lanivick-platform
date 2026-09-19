import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Cake, ArrowRight } from 'lucide-react';
import { dataService } from '../services/dataService';
import { ProductCard } from '../components/products/ProductCard';
import { CakeCustomizerModal } from '../components/cakes/CakeCustomizerModal';

export const CakesPastries: React.FC = () => {
  const products = dataService.getProducts();
  const cakeAndPastryItems = products.filter(
    (p) => p.category === 'cakes' || p.category === 'pastries'
  );

  const [activeTab, setActiveTab] = useState<'all' | 'cakes' | 'pastries'>('all');
  const [selectedCustomCake, setSelectedCustomCake] = useState(
    products.find((p) => p.allowCakeCustomization) || products[0]
  );
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const filteredItems =
    activeTab === 'all'
      ? cakeAndPastryItems
      : cakeAndPastryItems.filter((p) => p.category === activeTab);

  return (
    <div className="bg-[#fffdfa] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
            Artisanal Confectionery by CEO Lanishe
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink-900">
            Cakes &amp; Fresh Pastries
          </h1>
          <p className="font-script text-2xl sm:text-3xl text-wine-900 mt-2">
            "Life is what you bake it. We just make it sweeter! ❤️"
          </p>
          <p className="mt-2 text-sm text-ink-500 max-w-xl mx-auto">
            From Korean aesthetic bento cakes and signature foil pan comfort cakes to grand celebration tiers, freshly baked with European butter and rich Dutch cocoa.
          </p>
        </div>

        {/* 8 Signature Flavours Strip */}
        <div className="mb-12 p-6 rounded-3xl bg-cream-100/70 border border-gold-400/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-wine-900 block">
                Official Cake Collection
              </span>
              <h3 className="font-serif text-lg font-bold text-ink-900">
                8 Authentic Flavours Handcrafted Daily
              </h3>
            </div>
            <span className="text-xs font-semibold text-ink-500">
              Selectable in any custom cake size or foil pan
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { name: 'Coconut', emoji: '🥥', color: 'bg-white' },
              { name: 'Strawberry', emoji: '🍓', color: 'bg-berry-50 border-berry-200' },
              { name: 'Banana Bread', emoji: '🍌', color: 'bg-amber-50 border-amber-200' },
              { name: 'Banana Cake', emoji: '🍌', color: 'bg-amber-50/70 border-amber-200' },
              { name: 'Red Velvet', emoji: '❤️', color: 'bg-rose-50 border-rose-200' },
              { name: 'Vanilla', emoji: '🍦', color: 'bg-cream-50 border-cream-200' },
              { name: 'Chocolate', emoji: '🍫', color: 'bg-amber-100/60 border-amber-300' },
              { name: 'Marble', emoji: '🍰', color: 'bg-stone-50 border-stone-200' },
            ].map((flv) => (
              <div
                key={flv.name}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1 shadow-xs ${flv.color}`}
              >
                <span className="text-xl">{flv.emoji}</span>
                <span className="text-xs font-bold text-ink-900 leading-tight">{flv.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prominent Custom Cake Builder Callout Card */}
        <div className="mb-14 rounded-3xl bg-radial-gradient border-2 border-gold-400/40 p-6 sm:p-10 shadow-luxury relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wine-900 text-gold-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Design Studio</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ink-900 leading-tight">
                Have a Dream Cake in Mind? Customize It in Real-Time
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-ink-500 max-w-xl leading-relaxed">
                Choose your exact size (6" to 2-Tier Grand), sponge flavour, fillings, frosting,
                gold foil, custom board inscription, and even upload a photo from Pinterest or
                Instagram.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => setIsCustomizerOpen(true)}
                  className="px-7 py-3.5 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated transition-all flex items-center gap-2"
                >
                  <Cake className="w-4 h-4 text-gold-400" />
                  <span>Open Custom Cake Builder</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop&q=80"
                  alt="Custom Cake"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'bg-white text-ink-800 border border-borderLine hover:bg-cream-50'
            }`}
          >
            All Items ({cakeAndPastryItems.length})
          </button>
          <button
            onClick={() => setActiveTab('cakes')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'cakes'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'bg-white text-ink-800 border border-borderLine hover:bg-cream-50'
            }`}
          >
            Celebration Cakes 🎂
          </button>
          <button
            onClick={() => setActiveTab('pastries')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'pastries'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'bg-white text-ink-800 border border-borderLine hover:bg-cream-50'
            }`}
          >
            Pastries &amp; Snacks 🥧
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Customizer Modal */}
      {isCustomizerOpen && (
        <CakeCustomizerModal
          product={selectedCustomCake}
          onClose={() => setIsCustomizerOpen(false)}
        />
      )}
    </div>
  );
};
