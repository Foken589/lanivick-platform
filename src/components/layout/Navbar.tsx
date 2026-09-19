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
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';

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
    { name: 'Catering', path: '/catering' },
    { name: 'Hair Services', path: '/hair' },
    { name: 'About', path: '/about' },
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
            <span>{settings.announcement}</span>
          </div>
          <div className="flex items-center gap-4 text-cream-200">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-gold-400" />
              <span>Lokoja & Abuja</span>
            </span>
            <a
              href={`tel:${settings.callPhone}`}
              className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-gold-400" />
              <span>{settings.callPhone}</span>
            </a>
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
                  Confectionary &amp; Vikky's Hairplace
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
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-elevated border border-borderLine p-2 z-50 animate-in fade-in">
                        <div className="px-3 py-2 border-b border-borderLine">
                          <p className="text-xs font-bold text-ink-900 truncate">{currentUser.name}</p>
                          <p className="text-[11px] text-ink-500 truncate">{currentUser.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-wine-50 text-wine-900 uppercase">
                            {currentUser.role}
                          </span>
                        </div>

                        <div className="py-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-ink-800 hover:bg-cream-100 rounded-lg"
                          >
                            <User className="w-4 h-4 text-wine-900" />
                            Customer Dashboard
                          </Link>

                          {isAdmin && (
                            <Link
                              to="/admin"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-wine-900 hover:bg-wine-50 rounded-lg font-bold"
                            >
                              <ShieldCheck className="w-4 h-4 text-wine-900" />
                              Admin Portal
                            </Link>
                          )}
                        </div>

                        <div className="border-t border-borderLine pt-1">
                          <button
                            onClick={() => {
                              logout();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg"
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
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-wine-900 hover:bg-wine-50 border border-wine-200 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-wine-900 text-white font-bold text-sm shadow-md hover:bg-wine-800 transition-all active:scale-95"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-4 h-4 text-gold-400" />
                <span className="hidden sm:inline">Cart</span>
                <span className="w-5 h-5 rounded-full bg-gold-400 text-ink-900 text-[11px] font-black flex items-center justify-center">
                  {itemCount}
                </span>
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-ink-800 hover:bg-cream-100 border border-borderLine"
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

              <div className="mt-4 pt-4 border-t border-borderLine flex flex-col gap-2">
                <div className="text-xs font-bold text-ink-500 uppercase tracking-wider px-2">
                  Quick Demo Access
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      loginDemoCustomer();
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 text-xs font-bold rounded-lg border border-borderLine bg-cream-50 text-ink-800 hover:bg-cream-100"
                  >
                    Demo Customer
                  </button>
                  <button
                    onClick={() => {
                      loginDemoAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 text-xs font-bold rounded-lg border border-wine-300 bg-wine-50 text-wine-900 hover:bg-wine-100"
                  >
                    Demo Admin
                  </button>
                </div>
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
