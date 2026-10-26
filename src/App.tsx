import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { AppInstallBanner } from './components/common/AppInstallBanner';
import { Home } from './pages/Home';
import { OrderOnline } from './pages/OrderOnline';
import { CakesPastries } from './pages/CakesPastries';
import { Catering } from './pages/Catering';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Auth } from './pages/Auth';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { MobileApp } from './pages/MobileApp';
import { dataService } from './services/dataService';
import { openWhatsApp } from './services/whatsappService';

// Auto scroll to top on page navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const settings = dataService.getSettings();

  return (
    <NotificationProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen relative selection:bg-wine-900 selection:text-white">
              {/* Header */}
              <Navbar />

              {/* Page View */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/order" element={<OrderOnline />} />
                  <Route path="/cakes" element={<CakesPastries />} />
                  <Route path="/services" element={<Catering />} />
                  <Route path="/packages" element={<Catering />} />
                  <Route path="/catering" element={<Catering />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/mobile-app" element={<MobileApp />} />
                  <Route path="/app" element={<MobileApp />} />
                  <Route path="/download" element={<MobileApp />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<CustomerDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  {/* Clean fallback for any legacy hair link */}
                  <Route path="/hair" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Cart Drawer */}
              <CartDrawer />

              {/* Mobile App Install Trigger & Guide */}
              <AppInstallBanner />

              {/* Floating WhatsApp Action Button */}
              <aside aria-label="WhatsApp customer support" className="fixed bottom-6 left-6 z-40">
                <button
                  onClick={() =>
                    openWhatsApp(
                      settings.whatsappNumber,
                      'Hello Lanivick Confectionary! I am browsing your website and have an enquiry.'
                    )
                  }
                  className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-elevated border-2 border-white transition-all transform hover:scale-105 active:scale-95"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-white animate-bounce" />
                  <span className="text-xs font-extrabold pr-1 hidden sm:inline">
                    Chat with Victoria
                  </span>
                </button>
              </aside>

              {/* Footer */}
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
