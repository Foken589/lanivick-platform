import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
  Heart,
  ShieldCheck,
  CreditCard,
  Smartphone,
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { openWhatsApp } from '../../services/whatsappService';
import { triggerAppInstall } from '../common/AppInstallBanner';

export const Footer: React.FC = () => {
  const settings = dataService.getSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-cream-100 border-t border-wine-900/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-ink-800">
          {/* Col 1: Brand & Bio */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-wine-800 to-wine-950 text-gold-400 flex items-center justify-center font-serif text-2xl font-bold border border-gold-500/30">
                L
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-wide">
                  Lanivick
                </span>
                <span className="block text-[9px] uppercase font-bold tracking-widest text-gold-400">
                  Confectionary
                </span>
              </div>
            </div>

            <p className="text-xs text-gold-300/90 italic font-serif">
              "{settings.tagline || 'Premium Taste, Healthy Treats and Perfect Craft'}"
            </p>

            <p className="text-sm text-ink-200 leading-relaxed">
              Artisan confectionery located in Pyakasa, Abuja. We craft custom celebration cakes, melt-in-mouth pastries, nutritious natural drinks, and corporate snack packs.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() =>
                  openWhatsApp(
                    settings.whatsappNumber,
                    'Hello Lanivick! I would like to make an enquiry about your cakes and confectionery.'
                  )
                }
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </button>

              <a
                href={`tel:${settings.callPhone}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-wine-900 hover:bg-wine-800 text-gold-300 text-xs font-bold transition-colors border border-gold-500/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly</span>
              </a>
            </div>
          </div>

          {/* Col 2: Confectionary & Pastries */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-base font-bold text-gold-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Cakes & Pastries
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-ink-200">
              <li>
                <Link to="/order?category=cakes" className="hover:text-gold-300 transition-colors">
                  Birthday & Celebration Cakes
                </Link>
              </li>
              <li>
                <Link to="/cakes" className="hover:text-gold-300 transition-colors">
                  Custom Cake Design Studio
                </Link>
              </li>
              <li>
                <Link to="/order?category=pastries" className="hover:text-gold-300 transition-colors">
                  Artisan Meat Pies & Chicken Pies
                </Link>
              </li>
              <li>
                <Link to="/order?category=pastries" className="hover:text-gold-300 transition-colors">
                  Fluffy Doughnuts & Sausage Rolls
                </Link>
              </li>
              <li>
                <Link to="/order?category=drinks" className="hover:text-gold-300 transition-colors">
                  Natural Fruit Juices & Parfaits
                </Link>
              </li>
              <li>
                <Link to="/order?category=snacks" className="hover:text-gold-300 transition-colors">
                  Crunchy Chin-Chin & Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Packages */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-base font-bold text-gold-400 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Services & Packages
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-ink-200">
              <li>
                <Link to="/services" className="hover:text-gold-300 transition-colors">
                  Custom Cake Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-300 transition-colors">
                  Office Breakfast Boxes
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-300 transition-colors">
                  VIP Small Chops Trays
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-300 transition-colors">
                  Event Cake Supply & Dessert Bars
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-300 transition-colors">
                  Celebration Packages
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-300 transition-colors font-semibold text-gold-300">
                  Baking & Pastry Training
                </Link>
              </li>
              <li>
                <button
                  onClick={triggerAppInstall}
                  className="hover:text-gold-300 transition-colors flex items-center gap-1.5 text-gold-400 font-bold cursor-pointer text-left"
                >
                  <Smartphone className="w-3.5 h-3.5 text-gold-400" />
                  <span>📱 Download Mobile App</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Bakery Hours */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif text-base font-bold text-gold-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location & Hours
            </h4>
            <div className="flex flex-col gap-3 text-xs text-ink-200">
              <div>
                <span className="font-bold text-white block">📍 Abuja Bakery Hub:</span>
                <p className="mt-0.5 leading-relaxed">{settings.abujaAddress || 'Area G, Pyakasa, off Airport Road, Abuja, FCT, Nigeria'}</p>
                <p className="text-gold-400 mt-1">📧 {settings.email || 'lanivick555@gmail.com'}</p>
              </div>
              <div className="pt-2 border-t border-ink-800">
                <div className="flex items-center gap-1.5 text-gold-400 font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Bakery Hours</span>
                </div>
                <p>Monday – Saturday: 8:00 AM – 7:00 PM</p>
                <p>Sunday: Closed (Pre-orders Only)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-500">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1 text-ink-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Fresh Baked Daily & Hygienic Kitchen
            </span>
            <span className="flex items-center gap-1 text-ink-400">
              <CreditCard className="w-4 h-4 text-gold-400" />
              Verified Bank Transfer & Online Payment
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-gold-400 transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-gold-400 transition-colors">
              Contact
            </Link>
            <Link to="/dashboard" className="hover:text-gold-400 transition-colors">
              Customer Portal
            </Link>
            <Link to="/admin" className="hover:text-gold-400 transition-colors font-bold text-gold-400">
              Admin Portal
            </Link>
          </div>

          <p className="text-center md:text-right">
            © {currentYear} Lanivick Confectionary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
