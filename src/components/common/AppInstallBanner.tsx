import React, { useState, useEffect } from 'react';
import {
  Download,
  X,
  Sparkles,
  Smartphone,
  Share2,
  PlusSquare,
  CheckCircle2,
  Gift,
  Clock,
  ChevronRight
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const triggerAppInstall = () => {
  window.dispatchEvent(new CustomEvent('lanivick-trigger-install'));
};

export const AppInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // Check if running as installed standalone PWA
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    setIsStandalone(isStandaloneMode);
    if (isStandaloneMode) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(isIOSDevice);

    // Check localStorage dismissal
    const dismissedUntil = localStorage.getItem('lanivick_install_dismissed_until');
    const isDismissed = dismissedUntil && Number(dismissedUntil) > Date.now();

    // Capture Android/Chrome beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listener for manual triggers (e.g. from Navbar "Install App" button)
    const handleManualTrigger = () => {
      if (isIOSDevice) {
        setShowIOSModal(true);
      } else if (deferredPrompt) {
        deferredPrompt.prompt();
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('lanivick-trigger-install', handleManualTrigger);

    // Show after slight delay on iOS if not dismissed
    if (isIOSDevice && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3500);
      return () => clearTimeout(timer);
    }

    const handleAppInstalled = () => {
      setIsVisible(false);
      setDeferredPrompt(null);
      localStorage.setItem('lanivick_app_installed', 'true');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('lanivick-trigger-install', handleManualTrigger);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback: If prompt event has not fired yet or on other browsers, show guide modal
      setShowIOSModal(true);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    // Dismiss for 2 days
    localStorage.setItem(
      'lanivick_install_dismissed_until',
      String(Date.now() + 2 * 24 * 60 * 60 * 1000)
    );
  };

  if (isStandalone || (!isVisible && !showIOSModal)) return null;

  return (
    <>
      {/* HIGH-VISIBILITY FLOATING APP DOWNLOAD BANNER (MOBILE & DESKTOP) */}
      {isVisible && (
        <aside
          aria-label="Install mobile application"
          className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-lg z-50 animate-slide-up"
        >
          <div
            onClick={handleInstallClick}
            className="cursor-pointer bg-gradient-to-br from-wine-950 via-wine-900 to-wine-950 text-white rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-gold-400 hover:border-gold-300 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(216,168,62,0.3)] group"
          >
            {/* Background Decorative Glow */}
            <div className="absolute -top-14 -right-14 w-36 h-36 bg-gold-400/25 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="flex items-start gap-4 relative z-10">
              {/* App Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 p-1 shrink-0 shadow-xl border border-gold-300/40">
                <img
                  src="/icons/icon-192x192.png"
                  alt="Lanivick App Icon"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>

              {/* Text & Value Proposition */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-400 text-ink-950 font-black text-[11px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-ink-950" />
                    Official Mobile App
                  </span>
                  <span className="text-[11px] font-extrabold text-gold-300 bg-white/10 px-2 py-0.5 rounded-full">
                    Android &amp; iPhone
                  </span>
                </div>

                <h4 className="font-serif text-base sm:text-lg font-extrabold text-white leading-tight">
                  Download the Lanivick App
                </h4>

                <p className="mt-1 text-xs text-cream-100 leading-snug">
                  <span className="text-gold-300 font-extrabold underline decoration-gold-400">
                    ₦1,000 Off
                  </span>{' '}
                  your first order • Real-time order tracking • 1-tap fast checkout!
                </p>
              </div>

              {/* Dismiss Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-0 right-0 p-1.5 text-cream-200/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Dismiss app install banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Action Bar */}
            <div className="mt-4 pt-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <a
                href="/mobile-app"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-gold-300 hover:text-gold-200 underline font-bold flex items-center gap-1"
              >
                <span>View Full App Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="px-3 py-2 rounded-xl text-cream-200 hover:text-white text-xs font-semibold"
                >
                  Later
                </button>
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-ink-950 font-black text-xs sm:text-sm shadow-luxury flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 animate-pulse"
                >
                  <Download className="w-4 h-4 text-ink-950 stroke-[3]" />
                  <span>{isIOS ? 'Download / Add to iPhone' : 'Download / Install App'}</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* INTERACTIVE IPHONE (iOS SAFARI) INSTALLATION GUIDE MODAL */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full border border-borderLine shadow-2xl relative">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-700 flex items-center justify-center transition-colors"
              aria-label="Close installation guide"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-wine-900 text-gold-400 flex items-center justify-center shadow-md shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gold-600 block tracking-wider">
                  iPhone &amp; iPad Instructions
                </span>
                <h3 className="font-serif text-lg font-bold text-ink-900">
                  Install Lanivick on Your iPhone
                </h3>
              </div>
            </div>

            <p className="text-xs text-ink-600 mb-5 leading-relaxed">
              Install Lanivick Confectionary straight onto your home screen for full-screen ordering, instant notifications, and exclusive perks:
            </p>

            {/* Step-by-step Visual Steps */}
            <div className="space-y-3.5 text-xs text-ink-800">
              {/* Step 1 */}
              <div className="p-3 rounded-2xl bg-cream-50 border border-borderLine flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-wine-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-ink-900">
                    <span>Tap the Safari Share Button</span>
                    <Share2 className="w-4 h-4 text-wine-900" />
                  </div>
                  <p className="text-[11px] text-ink-500 mt-0.5">
                    Located in the toolbar at the bottom of your iPhone screen (or top of iPad).
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3 rounded-2xl bg-cream-50 border border-borderLine flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-wine-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-ink-900">
                    <span>Scroll down and select</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-white border border-borderLine font-black text-wine-900 flex items-center gap-1">
                      <PlusSquare className="w-3.5 h-3.5 text-gold-600" />
                      Add to Home Screen
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-500 mt-0.5">
                    Swipe down in the share options menu to find the "Add to Home Screen" action.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3 rounded-2xl bg-cream-50 border border-borderLine flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-wine-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-ink-900">
                    <span>Tap "Add" in the top right</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-ink-500 mt-0.5">
                    Lanivick will appear on your phone home screen with its gold crown icon, ready to launch anytime!
                  </p>
                </div>
              </div>
            </div>

            {/* Exclusive Perks */}
            <div className="mt-5 p-3 rounded-2xl bg-wine-50 border border-wine-900/20 flex items-center gap-3">
              <Gift className="w-5 h-5 text-gold-600 shrink-0" />
              <span className="text-[11px] text-wine-950 font-bold">
                Promo code <span className="font-mono text-wine-900 bg-white px-1.5 py-0.5 rounded border border-wine-200">APP1000</span> auto-applies in the app for ₦1,000 off!
              </span>
            </div>

            <div className="mt-5 pt-3 border-t border-borderLine flex items-center justify-between">
              <a
                href="/mobile-app"
                onClick={() => setShowIOSModal(false)}
                className="text-xs font-bold text-wine-900 hover:text-wine-800 underline flex items-center gap-1"
              >
                <span>Full App Launch Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setShowIOSModal(false)}
                className="px-6 py-2.5 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs shadow-md transition-colors"
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
