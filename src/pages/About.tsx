import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Award,
  CheckCircle2,
  Cake,
  ArrowRight,
  Phone,
  MessageCircle,
  Coffee,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { openWhatsApp } from '../services/whatsappService';

export const About: React.FC = () => {
  const settings = dataService.getSettings();

  return (
    <div className="bg-[#fffdfa] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
            Our Heritage &amp; Vision
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-ink-900 leading-tight">
            Crafted with Passion. Baked for Moments That Matter.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-ink-500 leading-relaxed">
            Founded on the principle of <strong className="text-wine-900">“Premium Taste, Healthy Treats and Perfect Craft”</strong>, Lanivick Confectionary elevates everyday indulgences and milestone celebrations across Abuja.
          </p>
        </div>

        {/* Dedicated Meet the Founder Section */}
        <div className="mb-20 rounded-3xl bg-gradient-to-br from-cream-100 via-white to-cream-100/60 p-8 sm:p-12 border border-gold-400/40 shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Founder Photos */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-[3/4]">
                <img
                  src="/images/ceo-lanishe-main.jpg"
                  alt="Danladi Victoria Lanishe - Founder & Master Baker"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-[3/4] mt-6">
                <img
                  src="/images/ceo-lanishe-pink.jpg"
                  alt="Victoria Lanishe with celebration cake"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Founder Bio & Philosophy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wine-900 text-gold-300 text-[10px] font-bold uppercase tracking-widest mb-3">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                <span>Founder &amp; Creative Master Baker</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
                Danladi Victoria Lanishe
              </h2>
              <span className="text-sm font-bold text-gold-600 block mb-4">
                Proprietor, Lanivick Confectionary • Area G, Pyakasa, Abuja
              </span>

              <p className="font-script text-2xl sm:text-3xl text-wine-900 leading-snug mb-4">
                "{settings.ceoQuote || 'Life is what you bake it. We just make it sweeter!'}"
              </p>

              <p className="text-sm text-ink-500 leading-relaxed mb-4">
                Danladi Victoria Lanishe established Lanivick Confectionary with an uncompromising dedication to artisanal baking. Rooted in culinary precision and wholesome nutrition, Victoria combines time-tested pastry techniques with modern cake artistry.
              </p>

              <p className="text-sm text-ink-500 leading-relaxed mb-6">
                Operating from our dedicated bakery hub in <strong className="text-wine-900">Area G, Pyakasa, off Airport Road, Abuja</strong>, Victoria personally oversees every recipe — from our 8 signature cake sponge formulations to golden flaky meat pies and fresh fruit juices.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-borderLine">
                <button
                  onClick={() =>
                    openWhatsApp(
                      settings.whatsappNumber,
                      'Hello Victoria! I would like to make an enquiry about Lanivick Confectionary.'
                    )
                  }
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>

                <a
                  href={`tel:${settings.callPhone}`}
                  className="px-5 py-2.5 rounded-xl bg-wine-900 hover:bg-wine-800 text-gold-300 font-bold text-xs shadow-sm transition-all flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {settings.callPhone}</span>
                </a>

                <a
                  href={`https://facebook.com/search/top?q=${encodeURIComponent(settings.facebookPage || 'Danladi Victoria Lanishe')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-cream-50 text-ink-900 font-bold text-xs border border-borderLine shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Facebook: {settings.facebookPage}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Custom Cake Studio Column */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-borderLine shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center text-2xl mb-6">
                🎂
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-wine-900 block mb-1">
                Bespoke Milestone Cakes
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 mb-4">
                Bespoke Celebration Studio
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed mb-4">
                We believe in baking without shortcuts. That means real creamery butter, pure vanilla extract, rich cocoa, and natural fruit essences. From intimate Korean bento surprise boxes to majestic multi-tier wedding centerpieces, our cakes are crafted to captivate eyes and tastebuds alike.
              </p>
              <ul className="space-y-2 text-xs font-medium text-ink-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  8 authentic signature cake flavours
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Hand-piped buttercream &amp; bespoke fondant artwork
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Cupcakes (boxes of 6 &amp; 12) &amp; comfort foil pan cakes
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-borderLine">
              <Link
                to="/cakes"
                className="inline-flex items-center gap-2 text-xs font-bold text-wine-900 hover:text-wine-700"
              >
                <span>Launch Custom Cake Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pastries, Drinks & Corporate Packs Column */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-borderLine shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center text-2xl mb-6">
                🥧
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-1">
                Gourmet Pastries &amp; Corporate Packs
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 mb-4">
                Daily Pastries &amp; Event Boxes
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed mb-4">
                Our kitchen produces Abuja's flakiest meat and chicken pies, fluffy glazed doughnuts, golden sausage rolls, and crunchy jarred chin-chin. For businesses and event hosts, we offer individual Office Breakfast Boxes and VIP Small Chops platters.
              </p>
              <ul className="space-y-2 text-xs font-medium text-ink-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Freshly baked daily with premium butter crust
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  100% natural fruit juices &amp; Greek yogurt berry parfaits
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  VIP small chops platters &amp; corporate breakfast supply
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-borderLine">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-bold text-wine-900 hover:text-wine-700"
              >
                <span>Explore Services &amp; Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="rounded-3xl bg-cream-100/70 p-8 sm:p-12 border border-gold-400/40">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900">
              The Four Lanivick Pillars
            </h3>
            <p className="text-xs text-ink-500 mt-1">
              Our commitment to excellence in every treat we bake
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-white border border-borderLine">
              <span className="font-serif text-2xl font-bold text-gold-600 block mb-1">01</span>
              <h4 className="font-bold text-sm text-ink-900 mb-1">Premium Taste</h4>
              <p className="text-xs text-ink-500">Real butter, rich cocoa, and zero artificial shortcuts.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-borderLine">
              <span className="font-serif text-2xl font-bold text-gold-600 block mb-1">02</span>
              <h4 className="font-bold text-sm text-ink-900 mb-1">Healthy Treats</h4>
              <p className="text-xs text-ink-500">Natural fruit juices, greek yogurt parfaits, and balanced sweetness.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-borderLine">
              <span className="font-serif text-2xl font-bold text-gold-600 block mb-1">03</span>
              <h4 className="font-bold text-sm text-ink-900 mb-1">Perfect Craft</h4>
              <p className="text-xs text-ink-500">Meticulous pastry folding, delicate cake piping, and flawless finish.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-borderLine">
              <span className="font-serif text-2xl font-bold text-gold-600 block mb-1">04</span>
              <h4 className="font-bold text-sm text-ink-900 mb-1">Abuja Delivery</h4>
              <p className="text-xs text-ink-500">Punctual dispatch across Pyakasa, Airport Road, and FCT districts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
