import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  MessageCircle,
  ArrowRight,
  Coffee,
  Gift,
  Cake,
  GraduationCap,
} from 'lucide-react';
import { CateringQuoteModal } from '../components/catering/CateringQuoteModal';
import { dataService } from '../services/dataService';
import { openWhatsApp } from '../services/whatsappService';

export const Catering: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const settings = dataService.getSettings();

  const services = [
    {
      title: 'Executive Office Breakfast & Snack Boxes',
      subtitle: 'Corporate Meetings & AGMs',
      description:
        'Individually packaged, hot and fresh breakfast boxes designed for executive seminars, morning board meetings, and office staff treats.',
      highlights: [
        '1 Flaky Gourmet Meat Pie or Savory Chicken Pie',
        '1 Seasoned Golden Sausage Roll',
        '1 Bottle of Chilled Fresh Natural Fruit Juice or Greek Yogurt Parfait',
        'Neat, hygienic individual branded packaging with napkins',
        'Scheduled early morning delivery across Abuja business districts',
      ],
      priceGuide: '₦4,000 per box (Minimum 10 boxes)',
      icon: <Coffee className="w-5 h-5 text-wine-900" />,
    },
    {
      title: 'VIP Small Chops & Cocktail Finger Foods',
      subtitle: '50 to 500+ Pieces',
      description:
        'The centerpiece of Nigerian gatherings. Crispy golden samosas, crunchy spring rolls, fluffy sweet puff-puffs, and spicy peppered gizzards.',
      highlights: [
        'Party Platters: 20 Puff-puffs, 10 Samosas, 10 Spring Rolls, 10 Peppered Gizzards',
        'Freshly fried and delivered hot in temperature-retaining platters or individual cocktail packs',
        'Custom packaging with event stickers or company branding on request',
        'Add-ons: Barbecue chicken bites and peppered snails',
      ],
      priceGuide: 'From ₦15,000 per 50-piece platter',
      icon: <Gift className="w-5 h-5 text-wine-900" />,
    },
    {
      title: 'Event Cake Supply & Dessert Bars',
      subtitle: 'Weddings, Milestones & Anniversaries',
      description:
        'Showcase celebration cakes from single-tier stunners to 3-tier wedding centerpieces, accompanied by assorted cupcake towers and dessert bars.',
      highlights: [
        'Choice of 8 signature flavours (Red Velvet, Coconut, Chocolate, Vanilla, etc.)',
        'Handcrafted sugar flowers, gold leaf, and custom acrylic plaques',
        'Coordinated dessert tables: Cupcakes, mini fruit parfaits, brownies & chin-chin jars',
        'Safe, temperature-controlled delivery and on-site setup anywhere in Abuja',
      ],
      priceGuide: 'Custom Cakes: ₦60,000 – ₦150,000+',
      icon: <Cake className="w-5 h-5 text-wine-900" />,
    },
    {
      title: 'Baking & Pastry Training Programme',
      subtitle: 'Practical Masterclass & Mentorship',
      description:
        'Learn the science, precision, and business of confectionery directly from founder Danladi Victoria Lanishe in Area G, Pyakasa.',
      highlights: [
        'Hands-on training in cake baking techniques and foolproof sponge chemistry',
        'Fondant draping, whipped buttercream piping, and modern cake styling',
        'Commercial pastry production: Meat pies, chicken pies, sausage rolls, doughnuts',
        'Costing, pricing, recipe scaling, and bakery business management fundamentals',
      ],
      priceGuide: 'Enquire for Upcoming Cohorts & Fees',
      icon: <GraduationCap className="w-5 h-5 text-wine-900" />,
    },
  ];

  const faqs = [
    {
      q: 'How early should we place corporate breakfast or bulk pastry orders?',
      a: 'For office breakfast boxes (10 to 100 boxes), we appreciate 24 to 48 hours notice to source the freshest ingredients and schedule early morning baking. For same-day emergency needs, contact us on WhatsApp directly.',
    },
    {
      q: 'Do you deliver across Abuja?',
      a: 'Yes! Our central bakery hub is located at Area G, Pyakasa, off Airport Road. We deliver across Pyakasa, Lugbe, Central Area, Maitama, Wuse, Garki, Jabi, Utako, and surrounding Abuja districts.',
    },
    {
      q: 'Can we customize the items inside the Office Breakfast Box?',
      a: 'Absolutely. You can swap meat pie for chicken pie, add a fruit parfait, replace juice with tigernut drink, or add cookies. Contact us with your team’s preferences and we will prepare a tailored invoice.',
    },
    {
      q: 'How do I enroll in the Baking & Pastry Training Programme?',
      a: 'Reach out to Victoria via WhatsApp or click "Request Event / Service Quotation". We will provide the course outline, schedule, and registration details for the next cohort.',
    },
  ];

  return (
    <div className="bg-[#fffdfa] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
            Lanivick Confectionary Services &amp; Packages
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-ink-900 leading-tight">
            Artisan Bakes &amp; Snack Solutions for Every Milestone
          </h1>
          <p className="mt-4 text-sm sm:text-base text-ink-500 leading-relaxed">
            From executive office breakfast boxes in Abuja to grand celebration cakes, VIP small chops platters, and professional baking training in Pyakasa.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated transition-all flex items-center gap-2.5 active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Request Service / Event Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() =>
                openWhatsApp(
                  settings.whatsappNumber,
                  'Hello Victoria! I would like to enquire about your corporate snack catering and event services.'
                )
              }
              className="px-6 py-4 rounded-2xl bg-white text-ink-800 hover:bg-cream-50 font-bold text-sm border border-borderLine transition-all flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Discuss via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900">
              Our Signature Services &amp; Event Formats
            </h2>
            <p className="text-xs text-ink-500 mt-1">
              Freshly baked to order with pure ingredients, strict hygiene, and punctual Abuja delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((svc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-soft hover:shadow-luxury transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-wine-900 px-2.5 py-1 rounded-full bg-wine-50">
                      {svc.subtitle}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center">
                      {svc.icon}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-ink-900 mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-ink-500 leading-relaxed mb-6">{svc.description}</p>

                  <div className="space-y-2.5 pt-4 border-t border-borderLine">
                    {svc.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-ink-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-borderLine flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-ink-500 uppercase font-bold block">
                      Pricing Guide
                    </span>
                    <span className="font-serif text-base font-bold text-wine-900">
                      {svc.priceGuide}
                    </span>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs transition-colors"
                  >
                    Select &amp; Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Lanivick Standard */}
        <div className="mb-20 rounded-3xl bg-wine-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-2">
              The Lanivick Standard
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Why Corporate Clients &amp; Event Hosts Choose Lanivick
            </h2>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-cream-200">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-wine-800 text-gold-400 flex items-center justify-center font-bold shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Pure Butter &amp; Premium Fillings</h4>
                  <p className="mt-1 leading-relaxed">
                    No artificial dough extenders or cheap shortcuts. We use genuine butter, savory seasoned minced meats, and natural fruits for rich flavor.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-wine-800 text-gold-400 flex items-center justify-center font-bold shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Hygienic Individual Packaging</h4>
                  <p className="mt-1 leading-relaxed">
                    Every breakfast box and snack platter is sealed in food-safe, tamper-evident containers with cutlery and napkins for seamless office distribution.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-wine-800 text-gold-400 flex items-center justify-center font-bold shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Punctual Abuja Dispatch</h4>
                  <p className="mt-1 leading-relaxed">
                    We understand office schedules. Morning breakfast deliveries arrive on time so your meetings run without interruption.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-wine-800 text-gold-400 flex items-center justify-center font-bold shrink-0">
                  04
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">8 Signature Cake Flavours</h4>
                  <p className="mt-1 leading-relaxed">
                    From Red Velvet and Belgian Chocolate to Coconut and Walnut Banana Bread, give your guests a delicious variety of taste experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-ink-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-borderLine">
                <h4 className="font-bold text-sm text-wine-900 mb-2">{faq.q}</h4>
                <p className="text-xs text-ink-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && <CateringQuoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
