import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  Scissors,
  Utensils,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  MessageCircle,
  Sparkles,
  Plus,
  Edit2,
  Package,
  Settings as SettingsIcon,
  Phone,
  Building2,
  Save,
  Lock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { dataService } from '../services/dataService';
import {
  Order,
  OrderStatus,
  PaymentStatus,
  HairBooking,
  CateringRequest,
  Product,
  StoreSettings,
} from '../types';
import {
  formatNaira,
  openWhatsApp,
  formatAdminStatusUpdateWhatsAppMessage,
} from '../services/whatsappService';
import { PrintableInvoiceModal } from '../components/common/PrintableInvoiceModal';

export const AdminDashboard: React.FC = () => {
  const { currentUser, isAdmin, loginDemoAdmin } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  // Navigation Subtabs
  const [currentTab, setCurrentTab] = useState<
    'orders' | 'hair' | 'catering' | 'products' | 'settings'
  >('orders');

  // Reactive Data Sources
  const [orders, setOrders] = useState<Order[]>([]);
  const [hairBookings, setHairBookings] = useState<HairBooking[]>([]);
  const [cateringRequests, setCateringRequests] = useState<CateringRequest[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(dataService.getSettings());

  // Search & Filters for Orders
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  // New Product Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState<number>(5000);
  const [newProdCat, setNewProdCat] = useState<'cakes' | 'pastries' | 'meals' | 'treats'>('pastries');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState('');

  const refreshAll = () => {
    setOrders(dataService.getOrders());
    setHairBookings(dataService.getHairBookings());
    setCateringRequests(dataService.getCateringRequests());
    setProducts(dataService.getProducts());
    setSettings(dataService.getSettings());
  };

  useEffect(() => {
    refreshAll();
    window.addEventListener('lanivick_update_orders', refreshAll);
    window.addEventListener('lanivick_update_hair_bookings', refreshAll);
    window.addEventListener('lanivick_update_catering_requests', refreshAll);
    window.addEventListener('lanivick_update_products', refreshAll);
    window.addEventListener('lanivick_update_settings', refreshAll);

    return () => {
      window.removeEventListener('lanivick_update_orders', refreshAll);
      window.removeEventListener('lanivick_update_hair_bookings', refreshAll);
      window.removeEventListener('lanivick_update_catering_requests', refreshAll);
      window.removeEventListener('lanivick_update_products', refreshAll);
      window.removeEventListener('lanivick_update_settings', refreshAll);
    };
  }, []);

  // Protected Gate
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-radial-gradient">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-borderLine shadow-luxury text-center">
          <div className="w-14 h-14 rounded-2xl bg-wine-100 text-wine-900 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-ink-900 mb-2">
            Protected Admin Area
          </h2>
          <p className="text-xs text-ink-500 mb-6">
            This management console requires administrator credentials. You can click below to
            sign in as Victoria (Admin) for demonstration purposes.
          </p>
          <button
            onClick={() => loginDemoAdmin()}
            className="w-full py-3.5 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Enter as Admin (Victoria)</span>
          </button>
        </div>
      </div>
    );
  }

  // Analytics Computation
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = orders.filter(
    (o) => o.status !== 'Completed' && o.status !== 'Cancelled'
  ).length;

  const pendingHairBookingsCount = hairBookings.filter((b) => b.status === 'Pending').length;

  const newCateringCount = cateringRequests.filter((c) => c.status === 'New').length;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerPhone.includes(orderSearch);

    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    dataService.updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} status updated to "${newStatus}"`, 'success');
  };

  const handleTogglePaymentStatus = (orderId: string, current: PaymentStatus) => {
    const next: PaymentStatus = current === 'paid' ? 'unpaid' : 'paid';
    dataService.updateOrderPayment(orderId, next);
    showToast(`Order #${orderId} marked as ${next.toUpperCase()}`, 'info');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: newProdName,
      category: newProdCat,
      price: Number(newProdPrice),
      description: newProdDesc || 'Freshly prepared item.',
      image:
        newProdImg ||
        'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=700&auto=format&fit=crop&q=80',
      inStock: true,
      preparationTime: 'Hot & Fresh',
    };

    dataService.addProduct(newProduct);
    setIsAddProductOpen(false);
    setNewProdName('');
    showToast(`Added "${newProduct.name}" to inventory!`, 'success');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    dataService.updateSettings(settings);
    showToast('Store settings updated successfully!', 'success');
  };

  return (
    <div className="bg-[#fffdfa] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Executive Header */}
        <div className="bg-wine-950 text-white rounded-3xl p-6 sm:p-8 border border-wine-900 shadow-luxury mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-wine-900 text-gold-400 flex items-center justify-center font-bold border border-gold-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-gold-400">
                Master Administration Console
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                Lanivick &amp; Vicky's Operations
              </h1>
              <p className="text-xs text-cream-200/80 mt-0.5">
                Manage orders, update live preparation statuses, hair bookings &amp; catering inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const sampleOrder = orders[0];
                if (sampleOrder) setSelectedOrderForInvoice(sampleOrder);
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-cream-100 transition-colors border border-white/10"
            >
              Preview Sample Invoice
            </button>
          </div>
        </div>

        {/* 4 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-borderLine shadow-soft">
            <div className="flex items-center justify-between text-ink-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Gross Paid Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-wine-900">
              {formatNaira(totalRevenue)}
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">From confirmed paid orders</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-borderLine shadow-soft">
            <div className="flex items-center justify-between text-ink-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Pipeline</span>
              <ShoppingBag className="w-4 h-4 text-wine-900" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-ink-900">
              {pendingOrdersCount} Orders
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">Preparing &amp; in transit</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-borderLine shadow-soft">
            <div className="flex items-center justify-between text-ink-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Hair Slots</span>
              <Scissors className="w-4 h-4 text-gold-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-ink-900">
              {pendingHairBookingsCount} Bookings
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">Awaiting confirmation</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-borderLine shadow-soft">
            <div className="flex items-center justify-between text-ink-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Catering Leads</span>
              <Utensils className="w-4 h-4 text-wine-900" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-ink-900">
              {newCateringCount} New Inquiries
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">Weddings &amp; Feasts</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-borderLine mb-8 scrollbar-none">
          <button
            onClick={() => setCurrentTab('orders')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              currentTab === 'orders'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'text-ink-800 hover:bg-cream-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Management ({orders.length})</span>
          </button>

          <button
            onClick={() => setCurrentTab('hair')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              currentTab === 'hair'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'text-ink-800 hover:bg-cream-50'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Hair Bookings ({hairBookings.length})</span>
          </button>

          <button
            onClick={() => setCurrentTab('catering')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              currentTab === 'catering'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'text-ink-800 hover:bg-cream-50'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Catering Inquiries ({cateringRequests.length})</span>
          </button>

          <button
            onClick={() => setCurrentTab('products')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              currentTab === 'products'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'text-ink-800 hover:bg-cream-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Menu &amp; Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              currentTab === 'settings'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'text-ink-800 hover:bg-cream-50'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Store Settings &amp; Bank</span>
          </button>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {currentTab === 'orders' && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-borderLine shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by Order ID, customer name, phone number..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="w-4 h-4 text-ink-500 shrink-0" />
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="w-full md:w-44 px-3 py-2 rounded-xl border border-borderLine text-xs font-bold text-ink-800 bg-cream-50/50 focus:border-wine-900 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Ready">Ready</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-borderLine shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-cream-50 border-b border-borderLine text-ink-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Order Details</th>
                      <th className="p-4">Customer &amp; Dispatch</th>
                      <th className="p-4">Items &amp; Total</th>
                      <th className="p-4">Live Status</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderLine">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-cream-50/50 transition-colors">
                        {/* Order ID & Date */}
                        <td className="p-4">
                          <span className="font-mono text-xs font-bold text-wine-900 block">
                            #{order.id}
                          </span>
                          <span className="text-[11px] text-ink-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        {/* Customer Info */}
                        <td className="p-4">
                          <span className="font-bold text-ink-900 block">{order.customerName}</span>
                          <span className="text-ink-500 block">{order.customerPhone}</span>
                          <span className="text-[10px] text-emerald-800 font-semibold block mt-0.5">
                            📍 {order.fulfillmentType.replace('-', ' ')}
                            {order.deliveryAddress?.city ? ` (${order.deliveryAddress.city})` : ''}
                          </span>
                        </td>

                        {/* Items & Amount */}
                        <td className="p-4">
                          <span className="font-bold text-ink-900 block">
                            {order.items.length} item(s)
                          </span>
                          <span className="font-serif text-sm font-bold text-wine-900 block">
                            {formatNaira(order.total)}
                          </span>
                        </td>

                        {/* Status Updater Dropdown */}
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                            }
                            className={`p-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
                              order.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : order.status === 'Cancelled'
                                ? 'bg-red-50 text-red-800 border-red-300'
                                : 'bg-wine-50 text-wine-900 border-wine-300'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Ready">Ready</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Payment Toggle */}
                        <td className="p-4">
                          <button
                            onClick={() => handleTogglePaymentStatus(order.id, order.paymentStatus)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                              order.paymentStatus === 'paid'
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            }`}
                          >
                            {order.paymentStatus}
                          </button>
                          <span className="text-[10px] text-ink-400 block mt-0.5 capitalize">
                            {order.paymentMethod}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedOrderForInvoice(order)}
                              title="Print / View Invoice"
                              className="p-1.5 rounded-lg border border-borderLine hover:bg-white text-ink-700 transition-colors"
                            >
                              <Printer className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                const msg = formatAdminStatusUpdateWhatsAppMessage(order);
                                openWhatsApp(order.customerPhone, msg);
                              }}
                              title="Message Customer on WhatsApp"
                              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HAIR BOOKINGS MANAGEMENT */}
        {currentTab === 'hair' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {hairBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-6 rounded-3xl border border-borderLine shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-borderLine mb-3">
                      <span className="font-mono text-xs font-bold text-wine-900">#{b.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-ink-900">{b.serviceName}</h3>
                    <p className="text-xs text-ink-800 font-semibold mt-1">
                      Client: {b.customerName} ({b.customerPhone})
                    </p>

                    <div className="mt-3 space-y-1 text-xs text-ink-500">
                      <p>
                        📅 Slot: <strong>{b.appointmentDate}</strong> at {b.appointmentTime}
                      </p>
                      <p>
                        📍 {b.locationType === 'home_service' ? 'Home Service' : 'Studio'} •{' '}
                        {b.studioCity}
                      </p>
                      {b.homeAddress && <p className="italic">Address: {b.homeAddress}</p>}
                      {b.specialNotes && (
                        <p className="mt-2 p-2 rounded-lg bg-cream-50 text-[11px] text-ink-800">
                          Note: "{b.specialNotes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-borderLine flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-ink-500 block">Estimated Quote:</span>
                      <span className="font-serif text-base font-bold text-wine-900">
                        {formatNaira(b.estimatedPrice)}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        openWhatsApp(
                          b.customerPhone,
                          `Hello ${b.customerName}! This is Victoria from Vicky's Hairplace regarding your booking #${b.id} for ${b.serviceName}.`
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CATERING INQUIRIES */}
        {currentTab === 'catering' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cateringRequests.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-borderLine shadow-soft space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-borderLine">
                    <div>
                      <span className="font-mono text-xs font-bold text-wine-900 block">
                        #{cat.id}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-ink-900">
                        {cat.eventType} ({cat.guestCount} Guests)
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-wine-50 text-wine-900 text-xs font-bold uppercase">
                      {cat.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-ink-800">
                    <div>
                      <span className="text-ink-500 block">Host:</span>
                      <span className="font-bold">{cat.customerName}</span>
                    </div>
                    <div>
                      <span className="text-ink-500 block">Phone:</span>
                      <span className="font-bold">{cat.customerPhone}</span>
                    </div>
                    <div>
                      <span className="text-ink-500 block">Event Date:</span>
                      <span className="font-bold">{cat.eventDate}</span>
                    </div>
                    <div>
                      <span className="text-ink-500 block">Location:</span>
                      <span className="font-bold">
                        {cat.city} ({cat.eventLocation})
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-cream-50 text-xs">
                    <span className="font-bold text-ink-900 block mb-1">Cuisines Selected:</span>
                    <p className="text-ink-500">{cat.cuisinePreference.join(', ')}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-borderLine">
                    <div>
                      <span className="text-[10px] text-ink-500 block">Host Budget Range:</span>
                      <span className="text-xs font-bold text-ink-900">{cat.budgetRange}</span>
                    </div>

                    <button
                      onClick={() =>
                        openWhatsApp(
                          cat.customerPhone,
                          `Hello ${cat.customerName}! This is Victoria from Lanivick Catering regarding your inquiry #${cat.id} for ${cat.eventType} on ${cat.eventDate}.`
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send Proposal on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS & INVENTORY */}
        {currentTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink-500">
                Total Products: {products.length}
              </span>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 rounded-xl bg-wine-900 hover:bg-wine-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4 text-gold-400" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-4 rounded-2xl border border-borderLine shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-32 object-cover rounded-xl mb-3 border border-borderLine"
                    />
                    <span className="text-[10px] uppercase font-bold text-gold-600 block">
                      {p.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-ink-900 leading-snug">
                      {p.name}
                    </h4>
                    <span className="font-serif text-base font-bold text-wine-900 mt-1 block">
                      {formatNaira(p.price)}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-borderLine flex items-center justify-between">
                    <button
                      onClick={() => dataService.toggleProductStock(p.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                        p.inStock
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Product Modal */}
            {isAddProductOpen && (
              <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-borderLine shadow-2xl">
                  <h3 className="font-serif text-xl font-bold text-ink-900 mb-4">
                    Add New Menu Item
                  </h3>
                  <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Item Name *</label>
                      <input
                        type="text"
                        required
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        placeholder="e.g. Gourmet Scotch Eggs (Box of 4)"
                        className="w-full p-2.5 rounded-xl border border-borderLine"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Category *</label>
                      <select
                        value={newProdCat}
                        onChange={(e) => setNewProdCat(e.target.value as typeof newProdCat)}
                        className="w-full p-2.5 rounded-xl border border-borderLine"
                      >
                        <option value="pastries">Pastries &amp; Snacks</option>
                        <option value="cakes">Cakes</option>
                        <option value="meals">Meals</option>
                        <option value="treats">Treats</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Price in ₦ *</label>
                      <input
                        type="number"
                        required
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-borderLine"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={newProdDesc}
                        onChange={(e) => setNewProdDesc(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-borderLine"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Image URL</label>
                      <input
                        type="url"
                        value={newProdImg}
                        onChange={(e) => setNewProdImg(e.target.value)}
                        placeholder="https://..."
                        className="w-full p-2.5 rounded-xl border border-borderLine"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="px-4 py-2 rounded-xl text-ink-500 hover:bg-cream-50 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-wine-900 text-white font-bold"
                      >
                        Save Item
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: STORE SETTINGS */}
        {currentTab === 'settings' && (
          <div className="max-w-2xl bg-white p-6 sm:p-10 rounded-3xl border border-borderLine shadow-soft">
            <h3 className="font-serif text-2xl font-bold text-ink-900 mb-6">
              Store &amp; Payment Settings
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-ink-800 mb-1">WhatsApp Business Number</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-borderLine"
                  />
                </div>
                <div>
                  <label className="block font-bold text-ink-800 mb-1">Call Line</label>
                  <input
                    type="text"
                    value={settings.callPhone}
                    onChange={(e) => setSettings({ ...settings, callPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-borderLine"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-borderLine">
                <span className="font-bold text-wine-900 block mb-3 uppercase tracking-wider">
                  Bank Settlement Details (Shown to Customers)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-ink-800 mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={settings.bankName}
                      onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-borderLine"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-ink-800 mb-1">Account Number</label>
                    <input
                      type="text"
                      value={settings.accountNumber}
                      onChange={(e) => setSettings({ ...settings, accountNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-borderLine"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-ink-800 mb-1">Account Name</label>
                    <input
                      type="text"
                      value={settings.accountName}
                      onChange={(e) => setSettings({ ...settings, accountName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-borderLine"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-borderLine">
                <span className="font-bold text-wine-900 block mb-3 uppercase tracking-wider">
                  Delivery Fees
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-ink-800 mb-1">Lokoja Delivery (₦)</label>
                    <input
                      type="number"
                      value={settings.deliveryFeeLokoja}
                      onChange={(e) =>
                        setSettings({ ...settings, deliveryFeeLokoja: Number(e.target.value) })
                      }
                      className="w-full p-2.5 rounded-xl border border-borderLine"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-ink-800 mb-1">Abuja Delivery (₦)</label>
                    <input
                      type="number"
                      value={settings.deliveryFeeAbuja}
                      onChange={(e) =>
                        setSettings({ ...settings, deliveryFeeAbuja: Number(e.target.value) })
                      }
                      className="w-full p-2.5 rounded-xl border border-borderLine"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-ink-800 mb-1">
                  Top Announcement Ticker
                </label>
                <textarea
                  rows={2}
                  value={settings.announcement}
                  onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-borderLine"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings</span>
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
