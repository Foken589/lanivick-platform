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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
            Artisanal Confectionery
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink-900">
            Cakes &amp; Fresh Pastries
          </h1>
          <p className="mt-3 text-sm text-ink-500">
            Slow-baked with premium European butter, real Madagascar vanilla, and pure cocoa.
            Celebration cakes, mini bentos, and savory snacks.
          </p>
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
