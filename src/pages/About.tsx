import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Award, CheckCircle2, Scissors, Cake, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-[#fffdfa] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
            Our Heritage &amp; Passion
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-ink-900 leading-tight">
            One Brand. Boundless Dedication to Quality.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-ink-500 leading-relaxed">
            Lanivick was born from a simple belief: everyday moments and grand milestones deserve
            exceptional taste, beautiful presentation, and crowns of stylish beauty.
          </p>
        </div>

        {/* The Dual Craft Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Confectionery Column */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-borderLine shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center text-2xl mb-6">
                🎂
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-wine-900 block mb-1">
                The Bakery &amp; Feast
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 mb-4">
                Lanivick Confectionary
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed mb-4">
                We believe in baking without shortcuts. That means real creamery butter, pure vanilla
                beans, rich Dutch cocoa, and slow fermentation. From our legendary flaky meat pies
                and golden egg rolls in Lokoja to custom tiered wedding cakes and smoky party jollof
                buffets in Abuja.
              </p>
              <ul className="space-y-2 text-xs font-medium text-ink-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Zero artificial flavor shortcuts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Freshly baked each morning on order
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Full banquet catering warmers &amp; stewards
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-borderLine">
              <Link
                to="/order"
                className="inline-flex items-center gap-2 text-xs font-bold text-wine-900 hover:text-wine-700"
              >
                <span>Browse Bakery &amp; Catering Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Hairstyling Column */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-borderLine shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-wine-100 text-wine-900 flex items-center justify-center text-2xl mb-6">
                💇🏾‍♀️
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-1">
                Salon &amp; Home Service
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 mb-4">
                Vicky's Hairplace
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed mb-4">
                Led by Victoria's artistry and precision, Vicky's Hairplace celebrates African
                beauty through neat, gentle, tension-free styling. Whether you are rocking
                waist-length knotless braids, rejuvenating mature locs, or revamping a closure wig,
                we treat every client's scalp with gentle TLC.
              </p>
              <ul className="space-y-2 text-xs font-medium text-ink-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Edge-protecting, painless knotless technique
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Dread relock, detoxing &amp; interlocking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Doorstep luxury home service appointments
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-borderLine">
              <Link
                to="/hair"
                className="inline-flex items-center gap-2 text-xs font-bold text-wine-900 hover:text-wine-700"
              >
                <span>Explore Hairstyling Services &amp; Book</span>
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-white border border-borderLine">
              <span className="font-serif text-2xl font-bold text-gold-600 block mb-1">01</span>
              <h4 className="font-bold text-sm text-ink-900 mb-1">Freshness First</h4>
              <p className="text-xs text-ink-500">Every pastry, cake, and meal is prepared hot.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-borderLine">
              <span className="font-serif text-2xl font-bold text-gold-600 block mb-1">02</span>
              <h4 className="font-bold text-sm text-ink-900 mb-1">Painless Artistry</h4>
              <p className="text-xs text-ink-500">Zero tension on client hairlines, guaranteed.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-borderLine">
              <span className="font-serif text-2xl font-bold text-gold-600 block mb-1">03</span>
              <h4 className="font-bold text-sm text-ink-900 mb-1">Lokoja &amp; Abuja Reach</h4>
              <p className="text-xs text-ink-500">Reliable local delivery hubs in both cities.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-borderLine">
              <span className="font-serif text-2xl font-bold text-gold-600 block mb-1">04</span>
              <h4 className="font-bold text-sm text-ink-900 mb-1">Warm Hospitality</h4>
              <p className="text-xs text-ink-500">Prompt communication on WhatsApp &amp; phone.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
