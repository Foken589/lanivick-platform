import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Download,
  Sparkles,
  CheckCircle2,
  Share2,
  PlusSquare,
  Gift,
  Zap,
  ShieldCheck,
  ArrowRight,
  Clock,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { triggerAppInstall } from '../components/common/AppInstallBanner';

export const MobileApp: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios'>('android');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Auto-detect device
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setActivePlatform('ios');
    } else {
      setActivePlatform('android');
    }
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('LANIVICKAPP');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="bg-[#fffdfa] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. HERO HEADER */}
        <div className="bg-gradient-to-br from-wine-950 via-wine-900 to-wine-950 text-white rounded-3xl p-8 sm:p-14 border border-wine-900 shadow-luxury mb-12 relative overflow-hidden">
          {/* Background Decorative Rings */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-wine-800/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/20 text-gold-300 font-extrabold text-xs uppercase tracking-wider border border-gold-400/30 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Official Mobile Experience</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
                Get the Lanivick Mobile App
              </h1>

              <p className="mt-4 text-cream-200 text-sm sm:text-base leading-relaxed">
                Enjoy instant 1-tap ordering, real-time cake delivery tracking, and exclusive discounts straight from your Android or iPhone home screen — no slow app store downloads needed!
              </p>

              {/* Special ₦1,000 Off Incentive */}
              <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-gold-400/40 inline-flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-400 text-ink-950 flex items-center justify-center font-bold shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gold-300 uppercase tracking-wider block">
                    Mobile App Welcome Gift
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    Get ₦1,000 Off Your First In-App Order!
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="sm:ml-auto px-3 py-1.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-ink-950 font-black text-xs transition-colors"
                >
                  {isCopied ? 'Copied Code!' : 'Use Code: LANIVICKAPP'}
                </button>
              </div>

              {/* Direct Download / Install Action */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => triggerAppInstall()}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-ink-950 font-black text-sm sm:text-base shadow-luxury flex items-center gap-3 transition-transform transform hover:scale-105 active:scale-95"
                >
                  <Download className="w-5 h-5 stroke-[2.5]" />
                  <span>Download / Install App Now</span>
                </button>

                <a
                  href="#instructions"
                  className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
                >
                  View Step-by-Step Guide
                </a>
              </div>
            </div>

            {/* App Mockup Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 sm:w-72 bg-gradient-to-b from-wine-900 to-wine-950 p-4 rounded-[40px] shadow-2xl border-4 border-gold-400/40 relative">
                {/* Screen simulation */}
                <div className="bg-cream-50 rounded-[30px] p-5 text-ink-900 text-center relative overflow-hidden aspect-[9/16] flex flex-col justify-between">
                  <div>
                    {/* Top Notch */}
                    <div className="w-20 h-4 bg-ink-950 rounded-full mx-auto mb-4" />

                    <div className="w-16 h-16 rounded-2xl bg-wine-900 text-gold-400 flex items-center justify-center font-serif text-3xl font-bold mx-auto mb-3 shadow-md border border-gold-500/30">
                      L
                    </div>

                    <h4 className="font-serif text-lg font-bold text-ink-900 leading-tight">
                      Lanivick
                    </h4>
                    <span className="text-[10px] text-wine-900 font-bold block uppercase tracking-wider">
                      Confectionary App
                    </span>

                    <p className="text-[11px] text-ink-500 mt-2 px-2 leading-relaxed">
                      Fresh cakes, meat pies & natural drinks in Pyakasa, Abuja.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-wine-100 text-wine-900 text-[10px] font-bold text-left flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>Instant 1-Tap Checkout</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gold-100 text-ink-900 text-[10px] font-bold text-left flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>Offline Fast Loading</span>
                    </div>

                    <button
                      onClick={() => triggerAppInstall()}
                      className="w-full py-2.5 rounded-xl bg-wine-900 text-white font-bold text-xs shadow-md mt-2"
                    >
                      Open App Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PLATFORM STEP-BY-STEP LAUNCH INSTRUCTIONS */}
        <section id="instructions" className="mb-14 scroll-mt-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
              Installation Instructions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900">
              How to Launch on Your Device
            </h2>
            <p className="text-xs sm:text-sm text-ink-500 mt-2">
              Follow these simple instructions to install Lanivick on your phone in under 10 seconds.
            </p>
          </div>

          {/* Platform Tabs */}
          <div className="flex justify-center mb-8">
            <div className="p-1 rounded-2xl bg-cream-100 border border-borderLine inline-flex">
              <button
                onClick={() => setActivePlatform('android')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activePlatform === 'android'
                    ? 'bg-wine-900 text-white shadow-sm'
                    : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Android (Samsung, Xiaomi, Tecno, etc.)</span>
              </button>
              <button
                onClick={() => setActivePlatform('ios')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activePlatform === 'ios'
                    ? 'bg-wine-900 text-white shadow-sm'
                    : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>iPhone &amp; iPad (Apple iOS)</span>
              </button>
            </div>
          </div>

          {/* ANDROID INSTRUCTIONS */}
          {activePlatform === 'android' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-borderLine shadow-soft">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-borderLine">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink-900">
                    Android Installation Guide (Chrome / Edge / Samsung Browser)
                  </h3>
                  <p className="text-xs text-ink-500">
                    Takes just 2 taps. Uses almost zero storage space and requires no app store account.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-cream-50/70 border border-borderLine flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-wine-900 text-white font-bold text-sm flex items-center justify-center mb-3">
                      1
                    </div>
                    <h4 className="font-bold text-sm text-ink-900 mb-1">Tap Install Prompt</h4>
                    <p className="text-xs text-ink-600 leading-relaxed">
                      Click the gold <strong>"Install App"</strong> button at the top of your screen or the button below.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-borderLine/50">
                    <button
                      onClick={() => triggerAppInstall()}
                      className="w-full py-2 rounded-xl bg-gold-400 hover:bg-gold-300 text-ink-950 font-black text-xs"
                    >
                      Trigger Android Install
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50/70 border border-borderLine flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-wine-900 text-white font-bold text-sm flex items-center justify-center mb-3">
                      2
                    </div>
                    <h4 className="font-bold text-sm text-ink-900 mb-1">Confirm Installation</h4>
                    <p className="text-xs text-ink-600 leading-relaxed">
                      When Google Chrome asks <em>"Install Lanivick Confectionary?"</em>, tap <strong>Install</strong>.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-borderLine/50 text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Installs in 2 seconds</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50/70 border border-borderLine flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-wine-900 text-white font-bold text-sm flex items-center justify-center mb-3">
                      3
                    </div>
                    <h4 className="font-bold text-sm text-ink-900 mb-1">Launch from Home Screen</h4>
                    <p className="text-xs text-ink-600 leading-relaxed">
                      The official Lanivick icon is now on your home screen! Tap it anytime to order and track deliveries.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-borderLine/50 text-[11px] text-wine-900 font-bold">
                    ✨ Full-screen experience!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* IPHONE & IPAD INSTRUCTIONS */}
          {activePlatform === 'ios' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-borderLine shadow-soft">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-borderLine">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink-900">
                    iPhone &amp; iPad Installation Guide (Apple Safari)
                  </h3>
                  <p className="text-xs text-ink-500">
                    Apple allows you to install Lanivick directly from Safari onto your home screen.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-cream-50/70 border border-borderLine">
                  <div className="w-8 h-8 rounded-full bg-wine-900 text-white font-bold text-sm flex items-center justify-center mb-3">
                    1
                  </div>
                  <h4 className="font-bold text-sm text-ink-900 mb-1">Open in Safari &amp; Tap Share</h4>
                  <p className="text-xs text-ink-600 leading-relaxed">
                    Make sure you are browsing in <strong>Safari</strong>. Look at the bottom toolbar and tap the <strong>Share button</strong> (a square with an upward arrow <Share2 className="w-3.5 h-3.5 inline text-blue-600" />).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50/70 border border-borderLine">
                  <div className="w-8 h-8 rounded-full bg-wine-900 text-white font-bold text-sm flex items-center justify-center mb-3">
                    2
                  </div>
                  <h4 className="font-bold text-sm text-ink-900 mb-1">Select "Add to Home Screen"</h4>
                  <p className="text-xs text-ink-600 leading-relaxed">
                    Scroll down through the share sheet menu and tap <strong>"Add to Home Screen"</strong> (with the plus icon <PlusSquare className="w-3.5 h-3.5 inline text-ink-800" />).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-cream-50/70 border border-borderLine">
                  <div className="w-8 h-8 rounded-full bg-wine-900 text-white font-bold text-sm flex items-center justify-center mb-3">
                    3
                  </div>
                  <h4 className="font-bold text-sm text-ink-900 mb-1">Tap "Add" in Top-Right</h4>
                  <p className="text-xs text-ink-600 leading-relaxed">
                    Tap <strong>Add</strong> in the top-right corner. The Lanivick Confectionary icon will appear on your iPhone screen!
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 3. KEY APP ADVANTAGES */}
        <section className="bg-cream-50/60 rounded-3xl p-8 sm:p-10 border border-borderLine mb-14">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif text-2xl font-bold text-ink-900">
              Why Use the Mobile App?
            </h3>
            <p className="text-xs text-ink-500 mt-1">
              Engineered for the smoothest confectionery shopping experience in Abuja.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-borderLine shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-ink-900 mb-1">Lightning Fast</h4>
              <p className="text-xs text-ink-500 leading-relaxed">
                Cached locally on your phone. Opens in under 1 second without typing website links.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-borderLine shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-wine-100 text-wine-900 flex items-center justify-center mb-3">
                <Gift className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-ink-900 mb-1">₦1,000 Off</h4>
              <p className="text-xs text-ink-500 leading-relaxed">
                First-time mobile app shoppers save ₦1,000 on custom cakes and bakery snack boxes.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-borderLine shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-ink-900 mb-1">Real-Time Updates</h4>
              <p className="text-xs text-ink-500 leading-relaxed">
                Track your cake baking progress and driver dispatch status directly on your screen.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-borderLine shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-ink-900 mb-1">Zero Megabytes</h4>
              <p className="text-xs text-ink-500 leading-relaxed">
                Doesn't bloat your phone storage like 100MB store apps. Clean, fast, and battery-friendly.
              </p>
            </div>
          </div>
        </section>

        {/* 4. BOTTOM ACTION STRIP */}
        <div className="text-center">
          <button
            onClick={() => triggerAppInstall()}
            className="px-8 py-4 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-md inline-flex items-center gap-2 transition-transform active:scale-95"
          >
            <Download className="w-4 h-4 text-gold-400" />
            <span>Install Lanivick Mobile App Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
