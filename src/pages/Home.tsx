import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Scissors,
  ShoppingBag,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  CheckCircle2,
  ArrowRight,
  Heart,
  Star,
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { ProductCard } from '../components/products/ProductCard';
import { HairServiceCard } from '../components/hair/HairServiceCard';
import { CateringQuoteModal } from '../components/catering/CateringQuoteModal';
import { openWhatsApp } from '../services/whatsappService';

export const Home: React.FC = () => {
  const settings = dataService.getSettings();
  const products = dataService.getProducts();
  const hairServices = dataService.getHairServices();
  const reviews = dataService.getReviews();
  const gallery = dataService.getGallery();

  const [activeCategory, setActiveCategory] = useState<'all' | 'cakes' | 'pastries' | 'meals' | 'treats'>('all');
  const [isCateringModalOpen, setIsCateringModalOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'cakes' | 'hair' | 'catering' | 'pastries'>('all');

  const filteredProducts =
    activeCategory === 'all'
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeCategory).slice(0, 8);

  const filteredGallery =
    galleryFilter === 'all'
      ? gallery
      : gallery.filter((item) => item.category === galleryFilter);

  return (
    <div className="flex flex-col gap-0">
      {/* 1. LUXURY DUAL HERO */}
      <section className="relative overflow-hidden bg-radial-gradient pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-borderLine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-100 border border-gold-400/40 text-wine-900 text-xs font-black uppercase tracking-widest mb-6 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>Cakes • Pastries • Catering • Hair</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-ink-900 tracking-tight leading-[1.06]">
                Made with love.{' '}
                <em className="italic font-serif text-wine-900 font-normal block sm:inline">
                  Served with style.
                </em>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-ink-500 max-w-2xl leading-relaxed">
                Handcrafted celebration cakes, melt-in-the-mouth pastries, traditional Nigerian party
                catering, and master salon hairstyling — all under one trusted, luxury experience in
                <strong className="text-wine-900"> Lokoja</strong> &amp;{' '}
                <strong className="text-wine-900">Abuja</strong>.
              </p>

              {/* High-Converting Dual Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <Link
                  to="/order"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated transition-all flex items-center justify-center gap-2.5 group active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-400" />
                  <span>Order Something Delicious</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/hair"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-cream-50 text-wine-900 font-bold text-sm border-2 border-wine-900/20 hover:border-wine-900 transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-98"
                >
                  <Scissors className="w-4 h-4 text-gold-600" />
                  <span>Book a Hair Service</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 pt-6 border-t border-borderLine/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-bold text-ink-500">
                <span className="flex items-center gap-1.5 text-ink-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Freshly Baked Daily
                </span>
                <span className="flex items-center gap-1.5 text-ink-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Premium Butter &amp; Pure Flavours
                </span>
                <span className="flex items-center gap-1.5 text-ink-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Master Salon &amp; Home Service
                </span>
              </div>
            </div>

            {/* Right Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card (Cake Showcase) */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-cream-100 aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80"
                    alt="Lanivick Signature Cake"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                      Signature Collection
                    </span>
                    <h3 className="font-serif text-2xl font-bold">Vanilla Celebration Crown</h3>
                    <p className="text-xs text-cream-200 mt-1">
                      Available for delivery across Lokoja &amp; Abuja
                    </p>
                  </div>
                </div>

                {/* Overlapping Hair Stylist Floating Badge */}
                <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-elevated border border-borderLine flex items-center gap-3.5 max-w-[260px] animate-float">
                  <div className="w-12 h-12 rounded-xl bg-wine-900 text-gold-400 flex items-center justify-center font-bold shrink-0">
                    <Scissors className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-ink-900">Vicky's Hairplace</h4>
                    <p className="text-[11px] text-ink-500">Knotless Braids, Locs &amp; Wigs</p>
                    <span className="text-[10px] font-bold text-emerald-700">Home Service Ready</span>
                  </div>
                </div>

                {/* Overlapping Rating Badge */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-wine-900 text-white p-3.5 rounded-2xl shadow-elevated border border-gold-500/30 flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                  <div>
                    <span className="font-serif text-base font-bold block leading-none">4.9 / 5</span>
                    <span className="text-[9px] text-gold-200 uppercase tracking-wider font-bold">
                      500+ Happy Clients
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION STRIP */}
      <section className="bg-wine-900 text-white py-8 border-b border-wine-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-wine-800/80 border border-gold-500/30 flex items-center justify-center text-xl shrink-0">
                🍰
              </div>
              <div>
                <h4 className="font-bold text-sm text-gold-300">Confectionery</h4>
                <p className="text-xs text-cream-200/80">Cakes, parfaits &amp; pastries</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-wine-800/80 border border-gold-500/30 flex items-center justify-center text-xl shrink-0">
                🍲
              </div>
              <div>
                <h4 className="font-bold text-sm text-gold-300">Party Catering</h4>
                <p className="text-xs text-cream-200/80">Jollof, small chops &amp; buffets</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-wine-800/80 border border-gold-500/30 flex items-center justify-center text-xl shrink-0">
                💇🏾‍♀️
              </div>
              <div>
                <h4 className="font-bold text-sm text-gold-300">Vicky's Hairplace</h4>
                <p className="text-xs text-cream-200/80">Braids, locs, twists &amp; wigs</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-wine-800/80 border border-gold-500/30 flex items-center justify-center text-xl shrink-0">
                🎁
              </div>
              <div>
                <h4 className="font-bold text-sm text-gold-300">Special Occasions</h4>
                <p className="text-xs text-cream-200/80">Weddings, birthdays &amp; surprises</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CATALOG PREVIEW */}
      <section className="py-20 bg-[#fffdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
                Order Online
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
                Cravings, Handled.
              </h2>
              <p className="text-sm text-ink-500 mt-2 max-w-xl">
                Freshly prepared artisanal treats and meals delivered to your doorstep in Lokoja and
                Abuja.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {(
                [
                  { id: 'all', label: 'All Items' },
                  { id: 'cakes', label: 'Cakes' },
                  { id: 'pastries', label: 'Pastries & Snacks' },
                  { id: 'meals', label: 'Meals' },
                  { id: 'treats', label: 'Treats' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-wine-900 text-white shadow-md'
                      : 'bg-white text-ink-800 border border-borderLine hover:bg-cream-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/order"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-cream-100 hover:bg-wine-900 hover:text-white text-wine-900 font-bold text-sm border border-gold-400/40 transition-all shadow-sm"
            >
              <span>View Full Menu &amp; Pastry Selection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CUSTOM CAKE DESIGN SPOTLIGHT */}
      <section className="py-20 bg-cream-100/60 border-y border-borderLine relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80"
                  alt="Custom Chocolate Cake"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-elevated border border-borderLine hidden sm:block max-w-[220px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-wine-900 block">
                  Interactive Builder
                </span>
                <p className="font-serif text-sm font-bold text-ink-900 mt-1">
                  Choose Flavours, Fillings &amp; Custom Plaque
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-gold-600 block mb-1">
                Bespoke Cake Studio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 leading-tight">
                Design Your Dream Cake for That Special Milestone
              </h2>
              <p className="mt-4 text-sm sm:text-base text-ink-500 leading-relaxed">
                Whether you envision a romantic 2-tier wedding masterpiece or an intimate Korean
                bento surprise, customize every inch from sponge flavour to custom gold lettering.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-semibold text-ink-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Madagascar Vanilla &amp; Red Velvet</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Molded Fondant &amp; Gold Foil</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Personalized Inscription Plaque</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Reference Photo Upload</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/cakes"
                  className="px-7 py-3.5 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Launch Custom Cake Builder</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CATERING SPOTLIGHT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 lg:order-2 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80"
                  alt="Party Catering by Lanivick"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
                Event &amp; Feast Catering
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 leading-tight">
                From Firewood Jollof to Continental Platters
              </h2>
              <p className="mt-4 text-sm sm:text-base text-ink-500 leading-relaxed">
                Planning a wedding in Abuja, corporate summit in Lokoja, or an anniversary dinner?
                We cater seamlessly for 20 to 800+ guests with buffet warmers, uniform stewards,
                and unmatched flavour consistency.
              </p>

              <div className="mt-6 space-y-2 text-xs font-medium text-ink-800">
                <div className="p-3 rounded-xl bg-cream-50 border border-borderLine flex items-center justify-between">
                  <span className="font-bold">Smoky Party Jollof, Fried Rice &amp; Dodo</span>
                  <span className="text-wine-900 font-bold">Party Favorite</span>
                </div>
                <div className="p-3 rounded-xl bg-cream-50 border border-borderLine flex items-center justify-between">
                  <span className="font-bold">VIP Small Chops Platters (Puff-Puff, Samosa, Spring Roll)</span>
                  <span className="text-wine-900 font-bold">Cocktail Bites</span>
                </div>
                <div className="p-3 rounded-xl bg-cream-50 border border-borderLine flex items-center justify-between">
                  <span className="font-bold">Continental Pastas &amp; Fresh Salad Bars</span>
                  <span className="text-wine-900 font-bold">Corporate</span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setIsCateringModalOpen(true)}
                  className="px-7 py-3.5 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated transition-all flex items-center gap-2"
                >
                  <span>Request Instant Catering Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VICKY'S HAIRPLACE SPOTLIGHT */}
      <section className="py-20 bg-radial-gradient border-t border-borderLine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-gold-600 block mb-1">
              Vicky's Hairplace
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900">
              Transforming Your Hair.{' '}
              <em className="italic text-wine-900 font-normal">Revealing Your Radiance.</em>
            </h2>
            <p className="mt-3 text-sm text-ink-500">
              Gentle tension-free braids, locs retwist, customized frontal wigs, and luxury home
              service across Lokoja and Abuja.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hairServices.slice(0, 4).map((service) => (
              <HairServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/hair"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated transition-all"
            >
              <Scissors className="w-4 h-4 text-gold-400" />
              <span>Explore All Hairstyles &amp; Pricing</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="py-20 bg-white border-t border-borderLine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
              Loved Across Lokoja &amp; Abuja
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
              Kind Words from Cherished Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-cream-50/60 border border-borderLine flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-gold-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-wine-100 text-wine-900">
                      {rev.category}
                    </span>
                  </div>

                  <p className="text-xs text-ink-800 italic leading-relaxed mb-4">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-borderLine flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-ink-900">{rev.author}</h4>
                    <span className="text-[11px] text-ink-500">{rev.role}</span>
                  </div>
                  <span className="text-[10px] font-bold text-wine-900">📍 {rev.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. VISUAL GALLERY */}
      <section className="py-20 bg-cream-50/50 border-t border-borderLine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
                Visual Portfolio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
                Our Living Gallery
              </h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {(
                [
                  { id: 'all', label: 'All' },
                  { id: 'cakes', label: 'Cakes' },
                  { id: 'hair', label: 'Hairstyling' },
                  { id: 'catering', label: 'Catering' },
                  { id: 'pastries', label: 'Pastries' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setGalleryFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    galleryFilter === f.id
                      ? 'bg-wine-900 text-white shadow-sm'
                      : 'bg-white text-ink-800 border border-borderLine hover:bg-cream-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-cream-100 shadow-soft border border-borderLine"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-90 p-5 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-bold text-gold-400">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-base font-bold">{item.title}</h4>
                  <p className="text-xs text-cream-200/90 mt-0.5">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. STRATEGIC WHATSAPP & CALL CTA */}
      <section className="py-20 bg-wine-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-2">
                We're Here For You
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
                Ready to Taste Something Delicious or Transform Your Look?
              </h2>
              <p className="mt-4 text-cream-200 text-sm sm:text-base max-w-2xl leading-relaxed">
                Our kitchen stoves are lit and Vicky's salon chair is ready. Reach out directly on
                WhatsApp for quick bookings, custom orders, or questions.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <button
                onClick={() =>
                  openWhatsApp(
                    settings.whatsappNumber,
                    'Hello Lanivick! I would like to make an inquiry.'
                  )
                }
                className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-elevated transition-all flex items-center justify-center gap-2.5 active:scale-98"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat with Lanivick on WhatsApp</span>
              </button>

              <a
                href={`tel:${settings.callPhone}`}
                className="py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2.5"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call {settings.callPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Catering Modal */}
      {isCateringModalOpen && (
        <CateringQuoteModal onClose={() => setIsCateringModalOpen(false)} />
      )}
    </div>
  );
};
