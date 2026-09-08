import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Scissors,
  MapPin,
  Heart,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Printer,
  MessageCircle,
  ChevronRight,
  Sparkles,
  Edit2,
  Save,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/dataService';
import { Order, HairBooking, OrderStatus } from '../types';
import {
  formatNaira,
  openWhatsApp,
  formatOrderWhatsAppMessage,
} from '../services/whatsappService';
import { PrintableInvoiceModal } from '../components/common/PrintableInvoiceModal';
import { ProductCard } from '../components/products/ProductCard';

const ORDER_STAGES: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Ready',
  'Out for Delivery',
  'Completed',
];

export const CustomerDashboard: React.FC = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const settings = dataService.getSettings();

  const [activeTab, setActiveTab] = useState<'orders' | 'hair' | 'favorites' | 'profile'>('orders');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  // Reactive Orders & Bookings
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<HairBooking[]>([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    const refreshData = () => {
      const allOrders = dataService.getOrders();
      // Filter orders by email or phone or show recent if demo
      const userOrders = allOrders.filter(
        (o) =>
          o.userId === currentUser.id ||
          o.customerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
          currentUser.email === 'chioma@lanivick.ng'
      );
      setOrders(userOrders);

      const allBookings = dataService.getHairBookings();
      const userBookings = allBookings.filter(
        (b) =>
          b.userId === currentUser.id ||
          b.customerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
          currentUser.email === 'chioma@lanivick.ng'
      );
      setBookings(userBookings);
    };

    refreshData();

    window.addEventListener('lanivick_update_orders', refreshData);
    window.addEventListener('lanivick_update_hair_bookings', refreshData);
    return () => {
      window.removeEventListener('lanivick_update_orders', refreshData);
      window.removeEventListener('lanivick_update_hair_bookings', refreshData);
    };
  }, [currentUser, navigate]);

  // Profile Edit States
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editAddress, setEditAddress] = useState(
    currentUser?.savedAddresses?.[0]?.streetAddress || ''
  );
  const [editCity, setEditCity] = useState<'Lokoja' | 'Abuja'>(
    currentUser?.savedAddresses?.[0]?.city || 'Lokoja'
  );

  if (!currentUser) return null;

  const favoriteProducts = dataService
    .getProducts()
    .filter((p) => currentUser.favorites?.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      savedAddresses: [
        {
          fullName: editName,
          phone: editPhone,
          city: editCity,
          streetAddress: editAddress,
          fulfillmentType: 'delivery',
        },
      ],
    });
  };

  const getStageIndex = (status: OrderStatus) => {
    return ORDER_STAGES.indexOf(status);
  };

  return (
    <div className="bg-[#fffdfa] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-soft mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wine-900 to-wine-950 text-gold-400 flex items-center justify-center font-serif text-2xl font-bold border border-gold-500/30">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900">
                  Welcome, {currentUser.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-cream-100 text-wine-900 text-[10px] font-bold uppercase">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-ink-500 mt-0.5">
                {currentUser.email} • {currentUser.phone}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 sm:gap-6 text-center w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-borderLine">
            <div className="px-3">
              <span className="font-serif text-2xl font-extrabold text-wine-900 block">
                {orders.length}
              </span>
              <span className="text-[10px] text-ink-500 font-bold uppercase tracking-wider">
                Total Orders
              </span>
            </div>
            <div className="h-8 w-px bg-borderLine" />
            <div className="px-3">
              <span className="font-serif text-2xl font-extrabold text-gold-600 block">
                {bookings.length}
              </span>
              <span className="text-[10px] text-ink-500 font-bold uppercase tracking-wider">
                Hair Bookings
              </span>
            </div>
            <div className="h-8 w-px bg-borderLine" />
            <div className="px-3">
              <span className="font-serif text-2xl font-extrabold text-ink-800 block">
                {currentUser.favorites?.length || 0}
              </span>
              <span className="text-[10px] text-ink-500 font-bold uppercase tracking-wider">
                Saved Favorites
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-borderLine mb-8 scrollbar-none">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'text-ink-800 hover:bg-cream-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders &amp; Deliveries ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hair')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'hair'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'text-ink-800 hover:bg-cream-50'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Hair Appointments ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'favorites'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'text-ink-800 hover:bg-cream-50'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Favorites ({favoriteProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'text-ink-800 hover:bg-cream-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile &amp; Addresses</span>
          </button>
        </div>

        {/* TAB CONTENT */}

        {/* 1. Orders & Deliveries Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-borderLine p-8">
                <ShoppingBag className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-ink-900">No orders placed yet</h3>
                <p className="text-xs text-ink-500 max-w-xs mx-auto mt-1 mb-4">
                  Fresh vanilla celebration cakes, meat pies, and party jollof are ready for you.
                </p>
                <Link
                  to="/order"
                  className="px-6 py-2.5 rounded-xl bg-wine-900 text-white text-xs font-bold inline-block"
                >
                  Explore Menu
                </Link>
              </div>
            ) : (
              orders.map((order) => {
                const currentStageIdx = getStageIndex(order.status);
                const isCancelled = order.status === 'Cancelled';

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-soft space-y-6"
                  >
                    {/* Top Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-borderLine">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-base font-bold text-wine-900">
                            #{order.id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              order.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'Cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-wine-100 text-wine-900'
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="text-[11px] text-ink-500 font-medium">
                            Placed {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-ink-500 mt-1">
                          Delivery / Slot: <strong>{order.preferredDate}</strong> ({order.preferredTime})
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrderForInvoice(order)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-borderLine text-xs font-bold text-ink-800 hover:bg-cream-50 transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>

                        <button
                          onClick={() =>
                            openWhatsApp(
                              settings.whatsappNumber,
                              formatOrderWhatsAppMessage(order)
                            )
                          }
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Update</span>
                        </button>
                      </div>
                    </div>

                    {/* Visual 7-Stage Tracker (Unless cancelled) */}
                    {!isCancelled ? (
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500 block mb-3">
                          Live Order Timeline:
                        </span>
                        <div className="grid grid-cols-6 gap-2 text-center">
                          {ORDER_STAGES.map((stage, i) => {
                            const isDone = i <= currentStageIdx;
                            const isCurrent = i === currentStageIdx;

                            return (
                              <div key={stage} className="flex flex-col items-center">
                                <div
                                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-all ${
                                    isDone
                                      ? 'bg-wine-900 text-white shadow-xs'
                                      : 'bg-cream-100 text-ink-400 border border-borderLine'
                                  } ${isCurrent ? 'ring-4 ring-gold-400/40' : ''}`}
                                >
                                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                                </div>
                                <span
                                  className={`text-[9px] sm:text-[10px] leading-tight ${
                                    isCurrent
                                      ? 'font-bold text-wine-900'
                                      : isDone
                                      ? 'font-medium text-ink-800'
                                      : 'text-ink-400'
                                  }`}
                                >
                                  {stage}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-red-50 text-red-800 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>This order was cancelled. Please contact Victoria for assistance.</span>
                      </div>
                    )}

                    {/* Order Items Table Preview */}
                    <div className="p-4 rounded-2xl bg-cream-50/70 border border-borderLine divide-y divide-borderLine text-xs">
                      {order.items.map((item) => (
                        <div key={item.id} className="py-2.5 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-ink-900">
                              {item.product.name} (x{item.quantity})
                            </span>
                            {item.cakeCustomization && (
                              <span className="text-[11px] text-ink-500 block italic">
                                {item.cakeCustomization.size} • {item.cakeCustomization.flavour}
                                {item.cakeCustomization.inscription &&
                                  ` • "${item.cakeCustomization.inscription}"`}
                              </span>
                            )}
                          </div>
                          <span className="font-bold text-wine-900">
                            {formatNaira(item.totalPrice)}
                          </span>
                        </div>
                      ))}

                      <div className="pt-2 flex justify-between font-bold text-sm text-ink-900">
                        <span>Total Paid / Payable:</span>
                        <span className="text-wine-900 font-serif text-base">
                          {formatNaira(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* 2. Hair Bookings Tab */}
        {activeTab === 'hair' && (
          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-borderLine p-8">
                <Scissors className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-ink-900">No hair bookings yet</h3>
                <p className="text-xs text-ink-500 max-w-xs mx-auto mt-1 mb-4">
                  Schedule your knotless braids, locs retwist, or home service with Victoria.
                </p>
                <Link
                  to="/hair"
                  className="px-6 py-2.5 rounded-xl bg-wine-900 text-white text-xs font-bold inline-block"
                >
                  Book a Hairstyle
                </Link>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-wine-900">
                        #{booking.id}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          booking.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-ink-900 mt-2">
                      {booking.serviceName}
                    </h3>
                    <p className="text-xs text-ink-500 mt-1">
                      Length: {booking.hairLength || 'Standard'} • Size: {booking.hairSize || 'Medium'}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-ink-800">
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-wine-900" />
                        {booking.appointmentDate} at {booking.appointmentTime}
                      </span>

                      <span className="flex items-center gap-1 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-wine-900" />
                        {booking.locationType === 'home_service'
                          ? `Home Service (${booking.homeAddress})`
                          : `Studio Visit (${booking.studioCity})`}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-ink-500 uppercase font-bold block">
                      Estimated Cost
                    </span>
                    <span className="font-serif text-xl font-bold text-wine-900 block mb-3">
                      {formatNaira(booking.estimatedPrice)}
                    </span>

                    <button
                      onClick={() =>
                        openWhatsApp(
                          settings.whatsappNumber,
                          `Hello Vicky! Checking in regarding my hair appointment #${booking.id} for ${booking.serviceName} on ${booking.appointmentDate}.`
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Message Vicky</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 3. Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-borderLine p-8">
                <Heart className="w-12 h-12 text-ink-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-ink-900">No favorites saved</h3>
                <p className="text-xs text-ink-500 max-w-xs mx-auto mt-1 mb-4">
                  Click the heart icon on any cake, pastry, or meal in the menu to save it here!
                </p>
                <Link
                  to="/order"
                  className="px-6 py-2.5 rounded-xl bg-wine-900 text-white text-xs font-bold inline-block"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. Profile & Addresses Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-10 border border-borderLine shadow-soft">
            <h3 className="font-serif text-2xl font-bold text-ink-900 mb-6">Edit Profile &amp; Addresses</h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink-800 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-800 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                />
              </div>

              <div className="pt-4 border-t border-borderLine">
                <span className="text-xs font-bold uppercase tracking-wider text-wine-900 block mb-3">
                  Default Delivery Address
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-ink-800 mb-1">City Hub</label>
                    <select
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value as 'Lokoja' | 'Abuja')}
                      className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    >
                      <option value="Lokoja">Lokoja, Kogi</option>
                      <option value="Abuja">Abuja, FCT</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink-800 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      placeholder="e.g. No 8 Confluence Boulevard"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Sign Out of Account
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {selectedOrderForInvoice && (
        <PrintableInvoiceModal
          order={selectedOrderForInvoice}
          onClose={() => setSelectedOrderForInvoice(null)}
        />
      )}
    </div>
  );
};
