import React, { useState } from 'react';
import {
  Utensils,
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  MessageCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { CateringQuoteModal } from '../components/catering/CateringQuoteModal';
import { dataService } from '../services/dataService';
import { openWhatsApp } from '../services/whatsappService';

export const Catering: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const settings = dataService.getSettings();

  const packages = [
    {
      title: 'The Royal Wedding Feast',
      subtitle: '100 – 800+ Guests',
      description:
        'A show-stopping feast designed to leave every guest singing praises. Full buffet line with traditional & continental offerings.',
      highlights: [
        'Signature Smoky Firewood Jollof & Basmati Fried Rice',
        'Traditional Soups & Pounded Yam / Semo station',
        'Assorted Proteins: Peppered Goat Meat, Crispy Croaker, Grilled Herb Chicken',
        'Lanivick VIP Small Chops cocktail entry table',
        'Full set of Chafing Dish Buffet Warmers & uniform servers',
      ],
      priceGuide: 'From ₦4,500 per plate',
    },
    {
      title: 'Corporate Summit & Bento Luncheons',
      subtitle: '25 – 300 Guests',
      description:
        'Punctual, hygienic, individual luxury bento meal boxes or executive buffet lines for conferences, seminars, and AGMs.',
      highlights: [
        'Individual Executive Meal Boxes with insulated packaging',
        'Creamy Chicken Alfredo Pasta / Chinese Special Rice',
        'Gourmet Small Chops Pack + Cold Fresh Juice / Parfait',
        'Professional invoice with tax receipts provided',
        'Dedicated dispatch coordinator on site',
      ],
      priceGuide: 'From ₦4,000 per guest',
    },
    {
      title: 'VIP Small Chops & Cocktail Bites',
      subtitle: '50 – 500 Packs',
      description:
        'The life of every Nigerian celebration. Crispy golden samosas, crunchy spring rolls, fluffy sweet puff-puffs, and peppered gizzards.',
      highlights: [
        'Freshly fried on location or hot delivered in batches',
        'Custom cocktail boxes with event stickers / logo',
        'Spicy barbecue gizzard & snail add-on options',
        'Sauces: Sweet chili & hot pepper dips',
      ],
      priceGuide: 'From ₦1,200 per pack',
    },
  ];

  const faqs = [
    {
      q: 'How early should we book our event catering?',
      a: 'For weddings and large banquets (100+ guests), we recommend booking 2 to 4 weeks in advance. For corporate lunches or intimate gatherings, 3 to 5 days notice is sufficient.',
    },
    {
      q: 'Do you cater outside Lokoja and Abuja?',
      a: 'Yes! We frequently travel for outstation events across Kogi State, Niger State, Nasarawa, and surrounding regions. An outstation logistics surcharge applies.',
    },
    {
      q: 'Do you provide servers and buffet warmers?',
      a: 'Absolutely. Our full-service packages come with stainless steel chafing dish warmers, serving utensils, and trained, courteous uniform stewards.',
    },
    {
      q: 'Can we schedule a menu tasting before confirming?',
      a: 'Yes, menu tastings can be scheduled at our Lokoja studio or Abuja tasting hub for confirmed wedding and large banquet inquiries.',
    },
  ];

  return (
    <div className="bg-[#fffdfa] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
            Lanivick Professional Catering
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-ink-900 leading-tight">
            Flavours That Elevate Your Celebration
          </h1>
          <p className="mt-4 text-sm sm:text-base text-ink-500 leading-relaxed">
            From intimate birthday dinners to grand 800-guest wedding banquets across Lokoja and
            Abuja. We ensure hot, delicious food, flawless presentation, and peace of mind for the host.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated transition-all flex items-center gap-2.5 active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Request Event Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() =>
                openWhatsApp(
                  settings.whatsappNumber,
                  'Hello Lanivick! I would like to discuss catering for an upcoming event.'
                )
              }
              className="px-6 py-4 rounded-2xl bg-white text-ink-800 hover:bg-cream-50 font-bold text-sm border border-borderLine transition-all flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Discuss via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900">
              Popular Catering Formats
            </h2>
            <p className="text-xs text-ink-500 mt-1">
              Customizable to your guest count, dietary preferences, and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-soft hover:shadow-luxury transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-wine-900 px-2.5 py-1 rounded-full bg-wine-50">
                    {pkg.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-ink-900 mt-3 mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-ink-500 leading-relaxed mb-6">{pkg.description}</p>

                  <div className="space-y-2.5 pt-4 border-t border-borderLine">
                    {pkg.highlights.map((h, i) => (
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
                      Estimated Cost
                    </span>
                    <span className="font-serif text-base font-bold text-wine-900">
                      {pkg.priceGuide}
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

        {/* Why Choose Lanivick Catering */}
        <div className="mb-20 rounded-3xl bg-wine-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-2">
              The Lanivick Standard
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Why Hosts Rely On Us for Unforgettable Feasts
            </h2>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-cream-200">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-wine-800 text-gold-400 flex items-center justify-center font-bold shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Consistent Firewood Aroma</h4>
                  <p className="mt-1 leading-relaxed">
                    Our smoky party jollof is seasoned with authentic herbs and traditional slow
                    cooking for that unmatched wedding taste.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-wine-800 text-gold-400 flex items-center justify-center font-bold shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Punctual Setup Guarantee</h4>
                  <p className="mt-1 leading-relaxed">
                    We arrive hours ahead of your event to set up warmer lines and guarantee food is
                    piping hot the moment guests arrive.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-wine-800 text-gold-400 flex items-center justify-center font-bold shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Hygienic &amp; Courteous Stewards</h4>
                  <p className="mt-1 leading-relaxed">
                    Neatly attired uniform servers trained in modern hospitality, portion balance,
                    and respectful guest engagement.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-wine-800 text-gold-400 flex items-center justify-center font-bold shrink-0">
                  04
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Custom Dietary Options</h4>
                  <p className="mt-1 leading-relaxed">
                    Halal proteins, pepper-sensitive servings, vegetarian bento options, and diabetic-friendly
                    swallows available on request.
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
