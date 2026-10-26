import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  MapPin,
  MessageCircle,
  Phone,
  CheckCircle2,
  ArrowRight,
  Heart,
  Star,
  Cake,
  Award,
  Gift,
  Coffee,
  GraduationCap,
  Smartphone,
  Download,
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { ProductCard } from '../components/products/ProductCard';
import { CateringQuoteModal } from '../components/catering/CateringQuoteModal';
import { openWhatsApp } from '../services/whatsappService';
import { triggerAppInstall } from '../components/common/AppInstallBanner';

export const Home: React.FC = () => {
  const settings = dataService.getSettings();
  const products = dataService.getProducts();
  const reviews = dataService.getReviews();
  const gallery = dataService.getGallery();

  const [activeCategory, setActiveCategory] = useState<'all' | 'cakes' | 'pastries' | 'snacks' | 'drinks' | 'packages'>('all');
  const [isCateringModalOpen, setIsCateringModalOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'cakes' | 'pastries'>('all');

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
      {/* 1. LUXURY CONFECTIONERY HERO */}
      <section className="relative overflow-hidden bg-radial-gradient pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-borderLine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-100 border border-gold-400/40 text-wine-900 text-xs font-black uppercase tracking-widest mb-6 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>Handcrafted Cakes &amp; Pastries.</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-ink-900 tracking-tight leading-[1.06]">
                Premium Taste • Healthy Treats • Perfect Craft.{' '}
                <em className="italic font-serif text-wine-900 font-normal block sm:inline">
                  Baked with Passion.
                </em>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-ink-500 max-w-2xl leading-relaxed">
                Artisan celebration cakes, flaky golden pies, wholesome natural fruit drinks, and
                corporate snack catering — baked fresh daily in{' '}
                <strong className="text-wine-900">Area G, Pyakasa, Abuja</strong>.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <Link
                  to="/order"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated transition-all flex items-center justify-center gap-2.5 group active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-400" />
                  <span>Order Fresh Treats</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/cakes"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-cream-50 text-wine-900 font-bold text-sm border-2 border-wine-900/20 hover:border-wine-900 transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-98"
                >
                  <Cake className="w-4 h-4 text-gold-600" />
                  <span>Design Custom Cake</span>
                </Link>

                <Link
                  to="/services"
                  className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-cream-100 hover:bg-cream-200 text-ink-900 font-bold text-xs border border-gold-400/30 transition-all flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4 text-wine-900" />
                  <span>Services &amp; Packages</span>
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
                  Pure Butter &amp; Hygienic Kitchen
                </span>
                <span className="flex items-center gap-1.5 text-ink-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Same-Day Abuja Delivery
                </span>
              </div>
            </div>

            {/* Right Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card (CEO Victoria Lanishe Showcase) */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-cream-100 aspect-[4/5]">
                  <img
                    src="/images/ceo-lanishe-pink.jpg"
                    alt="Danladi Victoria Lanishe - Founder & Master Baker"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                      Founder &amp; Master Baker
                    </span>
                    <h3 className="font-serif text-2xl font-bold">Danladi Victoria Lanishe</h3>
                    <p className="font-script text-xl text-cream-200 mt-1">
                      "{settings.ceoQuote || 'Life is what you bake it. We just make it sweeter!'}"
                    </p>
                  </div>
                </div>

                {/* Overlapping Bakery Location Floating Badge */}
                <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-elevated border border-borderLine flex items-center gap-3.5 max-w-[260px] animate-float">
                  <div className="w-12 h-12 rounded-xl bg-wine-900 text-gold-400 flex items-center justify-center font-bold shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-ink-900">Pyakasa Bakery Hub</h4>
                    <p className="text-[11px] text-ink-500">Area G, off Airport Road</p>
                    <span className="text-[10px] font-bold text-emerald-700">Abuja Deliveries Daily</span>
                  </div>
                </div>

                {/* Overlapping Rating Badge */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-wine-900 text-white p-3.5 rounded-2xl shadow-elevated border border-gold-500/30 flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                  <div>
                    <span className="font-serif text-base font-bold block leading-none">4.9 / 5</span>
                    <span className="text-[9px] text-gold-200 uppercase tracking-wider font-bold">
                      500+ Happy Customers
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
                🎂
              </div>
              <div>
                <h4 className="font-bold text-sm text-gold-300">Bespoke Cakes</h4>
                <p className="text-xs text-cream-200/80">Birthday, wedding &amp; bento</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-wine-800/80 border border-gold-500/30 flex items-center justify-center text-xl shrink-0">
                🥧
              </div>
              <div>
                <h4 className="font-bold text-sm text-gold-300">Gourmet Pastries</h4>
                <p className="text-xs text-cream-200/80">Flaky pies &amp; fluffy doughnuts</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-wine-800/80 border border-gold-500/30 flex items-center justify-center text-xl shrink-0">
                🥤
              </div>
              <div>
                <h4 className="font-bold text-sm text-gold-300">Natural Drinks</h4>
                <p className="text-xs text-cream-200/80">Juices, yogurt &amp; berry parfaits</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-wine-800/80 border border-gold-500/30 flex items-center justify-center text-xl shrink-0">
                🎁
              </div>
              <div>
                <h4 className="font-bold text-sm text-gold-300">Snack Packs &amp; Chops</h4>
                <p className="text-xs text-cream-200/80">Office breakfasts &amp; VIP small chops</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 CEO LANISHE SPOTLIGHT & AUTHENTIC MENU SPOTLIGHT */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-cream-50 via-white to-cream-50 border-b border-borderLine relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Authentic CEO Photo Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-cream-100 group">
                <img
                  src="/images/ceo-lanishe-main.jpg"
                  alt="Danladi Victoria Lanishe - Founder & Master Baker"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wine-950 via-wine-950/70 to-transparent p-6 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30 text-[10px] font-bold uppercase tracking-widest mb-1.5 backdrop-blur-sm">
                    <Award className="w-3.5 h-3.5" />
                    <span>Founder &amp; Creative Master Baker</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold">Danladi Victoria Lanishe</h3>
                  <p className="text-xs text-cream-200">
                    Proprietor, Lanivick Confectionary • Area G, Pyakasa, Abuja
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Signature Brand Philosophy & Services */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-gold-600 block mb-2">
                Meet The Artisan
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 leading-tight">
                "Life is what you bake it.{' '}
                <span className="font-script text-3xl sm:text-5xl text-wine-900 block sm:inline font-normal">
                  We just make it sweeter!"
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-ink-500 leading-relaxed">
                Welcome to <strong className="text-wine-900">Lanivick Confectionary</strong>. Founded by Danladi Victoria Lanishe, our bakery is driven by a deep passion for culinary excellence, premium butter formulations, and authentic natural goodness. From celebratory cakes that steal the spotlight to warm, flaky pastries for morning coffee breaks, every creation is crafted with love.
              </p>

              {/* The 8 Official Cake Flavours from Business Plan */}
              <div className="mt-6 p-5 rounded-2xl bg-cream-100/80 border border-gold-400/30">
                <span className="text-[11px] font-bold uppercase tracking-wider text-wine-900 block mb-2.5 flex items-center gap-1.5">
                  <Cake className="w-4 h-4 text-wine-900" />
                  <span>8 Signature Cake Flavours Handcrafted by Victoria Lanishe:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Coconut', emoji: '🥥' },
                    { name: 'Strawberry', emoji: '🍓' },
                    { name: 'Banana Bread', emoji: '🍌' },
                    { name: 'Banana Cake', emoji: '🍌' },
                    { name: 'Red Velvet', emoji: '❤️' },
                    { name: 'Vanilla', emoji: '🍦' },
                    { name: 'Chocolate', emoji: '🍫' },
                    { name: 'Marble', emoji: '🍰' },
                  ].map((flv) => (
                    <span
                      key={flv.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-ink-900 font-bold text-xs border border-borderLine shadow-xs"
                    >
                      <span>{flv.emoji}</span>
                      <span>{flv.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Confectionery Highlights Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-borderLine shadow-xs">
                  <h4 className="font-serif text-sm font-bold text-wine-900 flex items-center gap-2 mb-2">
                    <span>🎂</span>
                    <span>Bespoke Celebration Cakes</span>
                  </h4>
                  <p className="text-xs text-ink-500 leading-relaxed">
                    Custom Decorated Cakes, Naked Cakes, Bento Cakes, Foil Pan Comfort Cakes, Cupcakes (Boxes of 6 &amp; 12), and Grand Wedding Tiers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-borderLine shadow-xs">
                  <h4 className="font-serif text-sm font-bold text-wine-900 flex items-center gap-2 mb-2">
                    <span>🥧</span>
                    <span>Gourmet Pastries &amp; Snacks</span>
                  </h4>
                  <p className="text-xs text-ink-500 leading-relaxed">
                    Buttery Meat Pies, Seasoned Chicken Pies, Fluffy Glazed Doughnuts, Golden Sausage Rolls, Crunchy Chin-Chin, and Greek Yogurt Berry Parfaits.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Our Story &amp; Vision</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() =>
                    openWhatsApp(
                      settings.whatsappNumber,
                      'Hello Victoria! I would like to make an enquiry about Lanivick Confectionary.'
                    )
                  }
                  className="px-6 py-3 rounded-2xl bg-white hover:bg-cream-50 text-ink-900 font-bold text-xs border border-borderLine transition-all flex items-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat with Victoria</span>
                </button>
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
                Fresh From The Oven
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
                Today's Confectionery Menu
              </h2>
              <p className="text-sm text-ink-500 mt-2 max-w-xl">
                Freshly prepared artisanal cakes, pastries, and natural drinks delivered across Pyakasa, Airport Road, and greater Abuja.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {(
                [
                  { id: 'all', label: 'All Items' },
                  { id: 'cakes', label: 'Cakes' },
                  { id: 'pastries', label: 'Pastries' },
                  { id: 'snacks', label: 'Snacks' },
                  { id: 'drinks', label: 'Natural Drinks' },
                  { id: 'packages', label: 'Packages' },
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
              <span>Explore Complete Menu &amp; Place Order</span>
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
                  Interactive Studio
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
                Whether you envision a grand multi-tier wedding centrepiece, a luxury fondant milestone cake, or an intimate bento surprise, choose from our 8 authentic sponge flavours, fillings, toppers, and custom plaques.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-semibold text-ink-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Red Velvet, Coconut &amp; Vanilla</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Whipped Buttercream &amp; Fondant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Gold Lettering &amp; Custom Plaque</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom Inscription &amp; Candles</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/cakes"
                  className="px-7 py-3.5 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Open Custom Cake Builder</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORPORATE & CELEBRATION CONFECTIONERY SERVICES SPOTLIGHT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 lg:order-2 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80"
                  alt="Corporate and Event Confectionery by Lanivick"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
                Corporate &amp; Event Confectionery
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 leading-tight">
                Office Breakfast Boxes &amp; VIP Small Chops
              </h2>
              <p className="mt-4 text-sm sm:text-base text-ink-500 leading-relaxed">
                Hosting a corporate meeting, AGM, wedding cocktail, or birthday party in Abuja? Lanivick prepares packaged snack boxes, finger-food platters, and dessert stations with punctual delivery and high hygiene standards.
              </p>

              <div className="mt-6 space-y-2 text-xs font-medium text-ink-800">
                <div className="p-3.5 rounded-xl bg-cream-50 border border-borderLine flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Coffee className="w-4 h-4 text-wine-900" />
                    <span className="font-bold">Executive Office Breakfast Boxes (Pies, Roll &amp; Juice)</span>
                  </div>
                  <span className="text-wine-900 font-bold">From ₦4,000 / box</span>
                </div>
                <div className="p-3.5 rounded-xl bg-cream-50 border border-borderLine flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Gift className="w-4 h-4 text-wine-900" />
                    <span className="font-bold">VIP Small Chops Party Platters (50 – 100+ pieces)</span>
                  </div>
                  <span className="text-wine-900 font-bold">From ₦15,000 / tray</span>
                </div>
                <div className="p-3.5 rounded-xl bg-cream-50 border border-borderLine flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-wine-900" />
                    <span className="font-bold">Baking &amp; Pastry Training Programme</span>
                  </div>
                  <span className="text-wine-900 font-bold">Hands-On Practical</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsCateringModalOpen(true)}
                  className="px-7 py-3.5 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated transition-all flex items-center gap-2"
                >
                  <span>Request Event / Corporate Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/services"
                  className="px-6 py-3.5 rounded-2xl bg-cream-100 hover:bg-cream-200 text-ink-900 font-bold text-xs border border-borderLine transition-all"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE PACKAGES HIGHLIGHT */}
      <section className="py-20 bg-radial-gradient border-t border-borderLine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-gold-600 block mb-1">
              Curated Bundles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900">
              Celebration &amp; Snack Packages
            </h2>
            <p className="mt-3 text-sm text-ink-500">
              Save time with our pre-configured bundles, designed for birthdays, executive meetings, and family gifting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-borderLine shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-wine-900 uppercase tracking-wider block mb-1">Office Pack</span>
                <h3 className="font-serif text-xl font-bold text-ink-900">Corporate Breakfast Box</h3>
                <p className="text-xs text-ink-500 mt-2 leading-relaxed">
                  1 Flaky Meat or Chicken Pie, 1 Golden Sausage Roll, and 1 Chilled Fresh Fruit Juice. Ideal for board meetings and team training sessions.
                </p>
                <div className="mt-4 text-2xl font-bold text-wine-900">₦4,000 <span className="text-xs font-normal text-ink-500">/ box</span></div>
              </div>
              <div className="mt-6 pt-4 border-t border-borderLine">
                <Link
                  to="/services"
                  className="block text-center py-2.5 rounded-xl bg-wine-900 text-white font-bold text-xs hover:bg-wine-800 transition-colors"
                >
                  Book Corporate Order
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border-2 border-wine-900/30 shadow-md flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-wine-900 text-gold-300 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-bold text-wine-900 uppercase tracking-wider block mb-1">Event Favorite</span>
                <h3 className="font-serif text-xl font-bold text-ink-900">VIP Small Chops Platter</h3>
                <p className="text-xs text-ink-500 mt-2 leading-relaxed">
                  50-piece gourmet platter: 20 sweet puff-puffs, 10 crispy spring rolls, 10 savory samosas, and 10 peppered gizzards.
                </p>
                <div className="mt-4 text-2xl font-bold text-wine-900">₦15,000 <span className="text-xs font-normal text-ink-500">/ tray</span></div>
              </div>
              <div className="mt-6 pt-4 border-t border-borderLine">
                <Link
                  to="/order?category=snacks"
                  className="block text-center py-2.5 rounded-xl bg-wine-900 text-white font-bold text-xs hover:bg-wine-800 transition-colors"
                >
                  Order Tray Online
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-borderLine shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-wine-900 uppercase tracking-wider block mb-1">Celebration Bundle</span>
                <h3 className="font-serif text-xl font-bold text-ink-900">Birthday Surprise Package</h3>
                <p className="text-xs text-ink-500 mt-2 leading-relaxed">
                  1 8-inch Decorated Cake (flavour of choice), 6 Assorted Cupcakes, 2 Natural Fruit Juices, Birthday Candles, and Custom Topper.
                </p>
                <div className="mt-4 text-2xl font-bold text-wine-900">₦45,000 <span className="text-xs font-normal text-ink-500">/ bundle</span></div>
              </div>
              <div className="mt-6 pt-4 border-t border-borderLine">
                <Link
                  to="/order?category=packages"
                  className="block text-center py-2.5 rounded-xl bg-wine-900 text-white font-bold text-xs hover:bg-wine-800 transition-colors"
                >
                  Order Celebration Pack
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-cream-100 hover:bg-wine-900 hover:text-white text-wine-900 font-bold text-sm border border-gold-400/40 transition-all shadow-sm"
            >
              <span>Explore All Celebration Packages &amp; Training</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="py-20 bg-white border-t border-borderLine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
              Testimonials
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
                Our Bakery Creations
              </h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {(
                [
                  { id: 'all', label: 'All Items' },
                  { id: 'cakes', label: 'Cakes' },
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

      {/* 8.5. GET THE MOBILE APP SECTION */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-cream-100 via-[#fff8f2] to-cream-50 border-t border-borderLine relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-wine-950 via-wine-900 to-wine-950 rounded-3xl p-8 sm:p-14 text-white shadow-luxury border-2 border-gold-400/30 relative overflow-hidden">
            {/* Background Decorative Rings */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-400/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400 text-ink-950 font-black text-xs uppercase tracking-wider mb-4 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Official Mobile App • Android &amp; iPhone</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
                  Taste Lanivick in 1 Tap — Install Our Mobile App
                </h2>

                <p className="mt-3 text-cream-200 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Install the official Lanivick Confectionary app directly on your smartphone in under 10 seconds. Enjoy lightning-fast re-ordering, live cake tracking, and an instant ₦1,000 welcome discount!
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => triggerAppInstall()}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-ink-950 font-black text-sm sm:text-base shadow-luxury flex items-center gap-2.5 transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Download className="w-5 h-5 stroke-[2.5]" />
                    <span>Download / Install App Now</span>
                  </button>

                  <Link
                    to="/mobile-app"
                    className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>View Launch &amp; Setup Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-gold-400/40 text-center max-w-[280px]">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 p-1 mx-auto mb-3 shadow-lg">
                    <img
                      src="/icons/icon-192x192.png"
                      alt="Lanivick Mobile App Icon"
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  <h4 className="font-serif font-bold text-white text-base">
                    Lanivick Confectionary
                  </h4>
                  <p className="text-[11px] text-cream-200 mt-1">
                    No 100MB download. Runs offline and opens instantly on your phone.
                  </p>
                  <div className="mt-3 py-1.5 px-3 rounded-xl bg-gold-400/20 text-gold-300 font-extrabold text-xs">
                    ₦1,000 Off Code: LANIVICKAPP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. STRATEGIC WHATSAPP & CALL CTA */}
      <section className="py-20 bg-wine-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-2">
                Fresh From Pyakasa, Abuja
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
                Ready to Taste Something Truly Delicious?
              </h2>
              <p className="mt-4 text-cream-200 text-sm sm:text-base max-w-2xl leading-relaxed">
                Our ovens are warm and our bakers are ready. Reach out directly on WhatsApp for custom cake design, bulk corporate snack orders, or fast delivery along Airport Road and across Abuja.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <button
                onClick={() =>
                  openWhatsApp(
                    settings.whatsappNumber,
                    'Hello Victoria! I would like to place an order with Lanivick Confectionary.'
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

      {/* Confectionery Event Quote Modal */}
      {isCateringModalOpen && (
        <CateringQuoteModal onClose={() => setIsCateringModalOpen(false)} />
      )}
    </div>
  );
};
