import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Menu,
  X,
  User,
  ShieldCheck,
  PhoneCall,
  MapPin,
  Mail,
  Sparkles,
  ChevronDown,
  Smartphone,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { triggerAppInstall } from '../common/AppInstallBanner';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { currentUser, isAdmin, logout, loginDemoCustomer, loginDemoAdmin } = useAuth();
  const location = useLocation();
  const settings = dataService.getSettings();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Order Online', path: '/order' },
    { name: 'Cakes & Pastries', path: '/cakes' },
    { name: 'Our Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Mobile App', path: '/mobile-app' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-wine-950 text-gold-300 text-xs font-medium py-2 px-4 border-b border-wine-900/60 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">{settings.announcement}</span>
          </div>
          <div className="flex items-center gap-4 text-cream-200 shrink-0">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-gold-400" />
              <span>Area G, Pyakasa, Abuja</span>
            </span>
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
            >
              <Mail className="w-3 h-3 text-gold-400" />
              <span>{settings.email}</span>
            </a>
            <a
              href={`tel:${settings.callPhone}`}
              className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-gold-400" />
              <span>{settings.callPhone}</span>
            </a>
            <button
              onClick={triggerAppInstall}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-400/20 hover:bg-gold-400/30 text-gold-300 hover:text-white border border-gold-400/40 text-[10px] font-bold transition-all cursor-pointer shadow-xs"
              title="Install Mobile App on iPhone or Android"
            >
              <Smartphone className="w-3 h-3 text-gold-400" />
              <span>📱 Install App</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 glass-header border-b border-borderLine shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-wine-900 via-wine-800 to-wine-950 text-gold-400 flex items-center justify-center font-serif text-2xl font-bold shadow-md group-hover:scale-105 transition-transform border border-gold-500/30">
                L
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold text-wine-900 tracking-tight leading-none group-hover:text-wine-800 transition-colors">
                  Lanivick
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-ink-500 mt-1">
                  Confectionary • Abuja
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive(link.path)
                      ? 'text-wine-900 bg-cream-100 font-bold border border-gold-400/30'
                      : 'text-ink-800 hover:text-wine-900 hover:bg-wine-50/60'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* User Account / Switcher */}
              <div className="relative">
                {currentUser ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-borderLine bg-white text-sm font-semibold text-ink-800 hover:border-wine-800 transition-colors"
                      aria-label="User menu"
                    >
                      <div className="w-7 h-7 rounded-full bg-wine-100 text-wine-900 flex items-center justify-center text-xs font-bold">
                        {currentUser.name.charAt(0)}
                      </div>
                      <span className="hidden md:inline text-xs font-bold max-w-[90px] truncate">
                        {currentUser.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-ink-500" />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-elevated border border-borderLine py-2 z-50 animate-in fade-in zoom-in-95">
                        <div className="px-4 py-2 border-b border-borderLine/80">
                          <p className="text-xs font-bold text-ink-900 truncate">
                            {currentUser.name}
                          </p>
                          <p className="text-[11px] text-ink-500 truncate">{currentUser.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-gold-900">
                            {currentUser.role}
                          </span>
                        </div>

                        <Link
                          to="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-ink-800 hover:bg-cream-50 transition-colors"
                        >
                          <User className="w-4 h-4 text-wine-900" />
                          <span>My Customer Dashboard</span>
                        </Link>

                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-gold-700 bg-gold-50/50 hover:bg-gold-50 transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4 text-gold-600" />
                            <span>Admin Management</span>
                          </Link>
                        )}

                        <div className="border-t border-borderLine/80 mt-1 pt-1">
                          <button
                            onClick={() => {
                              logout();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-wine-900 hover:bg-cream-100 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

              {/* Shopping Bag Button */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-4 h-4 text-gold-400" />
                <span className="hidden sm:inline">Bag</span>
                {itemCount > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-gold-400 text-ink-950 font-extrabold text-[11px]">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-ink-800 hover:bg-cream-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-borderLine bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                    isActive(link.path)
                      ? 'bg-wine-900 text-white'
                      : 'text-ink-800 hover:bg-cream-100 hover:text-wine-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile App Install Card in Drawer */}
              <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-br from-wine-950 via-wine-900 to-wine-950 text-white border border-gold-400/40 shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 p-0.5 shrink-0 shadow-sm">
                      <img
                        src="/icons/icon-192x192.png"
                        alt="Lanivick App"
                        className="w-full h-full object-cover rounded-[10px]"
                      />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-xs text-white">Lanivick Mobile App</div>
                      <div className="text-[10px] text-gold-300 font-bold">₦1,000 Off First Order</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      triggerAppInstall();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-ink-950 font-black text-xs shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    Install App
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-borderLine flex flex-col gap-2">
                <div className="text-xs font-bold text-ink-500 uppercase tracking-wider px-2">
                  Account Access
                </div>
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 text-center rounded-xl bg-wine-900 text-white font-bold text-xs shadow-sm"
                >
                  Sign In / Create Account
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 w-full py-2.5 px-4 text-center rounded-xl bg-gold-400 text-ink-900 font-bold text-sm"
                  >
                    Open Admin Portal
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
