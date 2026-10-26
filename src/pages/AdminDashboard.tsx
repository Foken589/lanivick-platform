import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
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
  Package,
  Settings as SettingsIcon,
  Phone,
  Save,
  Lock,
  Cake,
  Upload,
  Image as ImageIcon,
  Camera,
  Trash2,
  Link as LinkIcon,
  Check,
  RefreshCw,
  UserCheck,
  Key,
  Users,
  Eye,
  EyeOff,
} from 'lucide-react';
import { compressImage } from '../utils/imageCompressor';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { dataService } from '../services/dataService';
import {
  Order,
  OrderStatus,
  PaymentStatus,
  CateringRequest,
  Product,
  ProductCategory,
  StoreSettings,
  UserProfile,
} from '../types';
import {
  formatNaira,
  openWhatsApp,
  formatAdminStatusUpdateWhatsAppMessage,
} from '../services/whatsappService';
import { PrintableInvoiceModal } from '../components/common/PrintableInvoiceModal';

export const AdminDashboard: React.FC = () => {
  const { currentUser, isAdmin, loginAdminWithPassword } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState('lanivick555@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [showGatePassword, setShowGatePassword] = useState(false);

  // Store Settings Password Change State
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Navigation Subtabs
  const [currentTab, setCurrentTab] = useState<
    'orders' | 'catering' | 'products' | 'settings'
  >('orders');

  // Reactive Data Sources
  const [orders, setOrders] = useState<Order[]>([]);
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
  const [newProdPrice, setNewProdPrice] = useState<number>(3000);
  const [newProdCat, setNewProdCat] = useState<ProductCategory>('pastries');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState('');
  const [imgUploadMode, setImgUploadMode] = useState<'upload' | 'url'>('upload');
  const [isCompressingImg, setIsCompressingImg] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Quick photo update for existing items
  const [targetProductForPhoto, setTargetProductForPhoto] = useState<Product | null>(null);
  const editFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP)', 'error');
      return;
    }
    try {
      setIsCompressingImg(true);
      const compressed = await compressImage(file, 1000, 1000, 0.85);
      setNewProdImg(compressed);
      showToast('Image uploaded & optimized successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Could not process this image. Please try another.', 'error');
    } finally {
      setIsCompressingImg(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleEditProductImage = async (product: Product, file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    try {
      showToast('Optimizing and updating image...', 'info');
      const compressed = await compressImage(file, 1000, 1000, 0.85);
      const updated: Product = { ...product, image: compressed };
      dataService.updateProduct(updated);
      showToast(`Updated image for "${product.name}"!`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to update image', 'error');
    } finally {
      setTargetProductForPhoto(null);
    }
  };

  const refreshAll = () => {
    setOrders(dataService.getOrders());
    setCateringRequests(dataService.getCateringRequests());
    setProducts(dataService.getProducts());
    setSettings(dataService.getSettings());
  };

  useEffect(() => {
    refreshAll();
    window.addEventListener('lanivick_update_orders', refreshAll);
    window.addEventListener('lanivick_update_catering_requests', refreshAll);
    window.addEventListener('lanivick_update_products', refreshAll);
    window.addEventListener('lanivick_update_settings', refreshAll);

    return () => {
      window.removeEventListener('lanivick_update_orders', refreshAll);
      window.removeEventListener('lanivick_update_catering_requests', refreshAll);
      window.removeEventListener('lanivick_update_products', refreshAll);
      window.removeEventListener('lanivick_update_settings', refreshAll);
    };
  }, []);

  const handleAdminPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!adminPassword.trim()) {
      showToast('Please enter the administrator password.', 'error');
      return;
    }

    const success = loginAdminWithPassword(adminPassword.trim(), adminEmail.trim());
    if (success) {
      setAdminPassword('');
    }
  };

  // Protected Gate
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-radial-gradient">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-borderLine shadow-luxury text-center">
          <div className="w-14 h-14 rounded-2xl bg-wine-100 text-wine-900 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-ink-900 mb-1">
            Protected Admin Area
          </h2>
          <p className="text-xs text-ink-500 mb-6">
            Enter your authorized administrator credentials to access store management, inventory, and order analytics.
          </p>

          <form onSubmit={handleAdminPasswordSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1.5">
                Administrator Email Address
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="lanivick555@gmail.com"
                className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:ring-2 focus:ring-wine-900 focus:outline-none bg-white"
              />
              <span className="text-[10px] text-ink-500 mt-1 block">
                Primary: Victoria Lanishe (<span className="text-wine-900 font-medium">lanivick555@gmail.com</span>)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1.5">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type={showGatePassword ? 'text' : 'password'}
                  required
                  placeholder="Enter Admin Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full p-3 pr-10 rounded-xl border border-borderLine text-xs text-center font-bold tracking-widest focus:ring-2 focus:ring-wine-900 focus:outline-none bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowGatePassword(!showGatePassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                >
                  {showGatePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Unlock Admin Console</span>
            </button>
          </form>
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
      description: newProdDesc || 'Freshly prepared confectionery item.',
      image:
        newProdImg ||
        '/images/products/cake-strawberry-drip.jpg',
      inStock: true,
      preparationTime: 'Hot & Fresh Daily',
    };

    dataService.addProduct(newProduct);
    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice(3000);
    setNewProdImg('');
    setImgUploadMode('upload');
    showToast(`Added "${newProduct.name}" to inventory!`, 'success');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    dataService.updateSettings(settings);
    showToast('Store settings updated successfully!', 'success');
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (!isAdmin) {
      showToast('Action restricted: Only administrators can delete menu items.', 'error');
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to permanently delete "${productName}" from the store menu?\n\nThis will remove the item from the online catalog.`
      )
    ) {
      dataService.deleteProduct(productId);
      setProducts(dataService.getProducts());
      showToast(`"${productName}" was removed from the store catalog.`, 'info');
    }
  };

  const handleChangeAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = currentUser?.email || 'lanivick555@gmail.com';

    if (!currentPasswordInput.trim()) {
      showToast('Please enter your current administrator password.', 'error');
      return;
    }

    if (!dataService.verifyAdminPassword(currentPasswordInput.trim(), targetEmail)) {
      showToast('Current password does not match. Please verify and try again.', 'error');
      return;
    }

    if (!newPasswordInput.trim() || newPasswordInput.trim().length < 6) {
      showToast('New password must be at least 6 characters long.', 'error');
      return;
    }

    if (newPasswordInput.trim() !== confirmPasswordInput.trim()) {
      showToast('New passwords do not match. Please re-type carefully.', 'error');
      return;
    }

    dataService.updateAdminPassword(targetEmail, newPasswordInput.trim());
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    showToast(
      'Administrator password updated successfully! Your new password is now active.',
      'success'
    );
  };

  const handlePurgeDemo = () => {
    if (
      window.confirm(
        'Purge demo accounts, test sessions, and reset browser storage to a clean production state?'
      )
    ) {
      dataService.purgeDemoData();
      showToast('Demo data & cached sessions cleared successfully! Reloading...', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
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
                Operations Management Console
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                Lanivick Confectionary
              </h1>
              <p className="text-xs text-cream-200/80 mt-0.5">
                Manage orders, track bakery production, review event &amp; breakfast quotes, and configure settlement settings.
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
            <span className="text-[11px] text-ink-500 mt-1 block">In preparation &amp; transit</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-borderLine shadow-soft">
            <div className="flex items-center justify-between text-ink-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Menu Catalogue</span>
              <Package className="w-4 h-4 text-gold-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-ink-900">
              {products.length} Items
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">Cakes, pastries &amp; packs</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-borderLine shadow-soft">
            <div className="flex items-center justify-between text-ink-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Service &amp; Event Leads</span>
              <Cake className="w-4 h-4 text-wine-900" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-ink-900">
              {newCateringCount} New Inquiries
            </div>
            <span className="text-[11px] text-ink-500 mt-1 block">Breakfast &amp; Event quotes</span>
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
            onClick={() => setCurrentTab('catering')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              currentTab === 'catering'
                ? 'bg-wine-900 text-white shadow-sm'
                : 'text-ink-800 hover:bg-cream-50'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Service &amp; Event Quotes ({cateringRequests.length})</span>
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

        {/* TAB 2: SERVICE & EVENT QUOTES */}
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
                        {cat.eventType} ({cat.guestCount} Units / Guests)
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-wine-50 text-wine-900 text-xs font-bold uppercase">
                      {cat.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-ink-800">
                    <div>
                      <span className="text-ink-500 block">Client / Organizer:</span>
                      <span className="font-bold">{cat.customerName}</span>
                    </div>
                    <div>
                      <span className="text-ink-500 block">Phone:</span>
                      <span className="font-bold">{cat.customerPhone}</span>
                    </div>
                    <div>
                      <span className="text-ink-500 block">Required Date:</span>
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
                    <span className="font-bold text-ink-900 block mb-1">Menus / Services Selected:</span>
                    <p className="text-ink-700">{cat.cuisinePreference.join(', ')}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-borderLine">
                    <div>
                      <span className="text-[10px] text-ink-500 block">Budget Range:</span>
                      <span className="text-xs font-bold text-wine-900">{cat.budgetRange}</span>
                    </div>

                    <button
                      onClick={() =>
                        openWhatsApp(
                          cat.customerPhone,
                          `Hello ${cat.customerName}! This is Victoria from Lanivick Confectionary regarding your quotation #${cat.id} for ${cat.eventType} on ${cat.eventDate}.`
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

        {/* TAB 3: PRODUCTS & INVENTORY */}
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

            {/* Hidden File Input for Quick Photo Change on Existing Product */}
            <input
              type="file"
              ref={editFileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0] && targetProductForPhoto) {
                  handleEditProductImage(targetProductForPhoto, e.target.files[0]);
                  e.target.value = '';
                }
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-4 rounded-2xl border border-borderLine shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="relative group/img overflow-hidden rounded-xl mb-3 border border-borderLine bg-cream-50">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-36 object-cover transition-transform group-hover/img:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setTargetProductForPhoto(p);
                          editFileInputRef.current?.click();
                        }}
                        className="absolute inset-0 bg-ink-900/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-bold gap-1 cursor-pointer"
                        title="Upload a new photo for this item"
                      >
                        <Camera className="w-5 h-5 text-gold-400" />
                        <span>Change Photo</span>
                      </button>
                    </div>
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

                  <div className="mt-4 pt-3 border-t border-borderLine flex items-center justify-between gap-1.5 flex-wrap">
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

                    <div className="flex items-center gap-1.5 ml-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setTargetProductForPhoto(p);
                          editFileInputRef.current?.click();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-cream-100 hover:bg-cream-200 text-ink-700 text-[10px] font-bold flex items-center gap-1 border border-borderLine transition-colors"
                        title="Directly upload photo from phone or computer"
                      >
                        <Camera className="w-3 h-3 text-gold-600" />
                        <span>Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center gap-1 border border-rose-200 transition-colors"
                        title="Permanently delete product from store"
                      >
                        <Trash2 className="w-3 h-3 text-rose-600" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Product Modal with Direct Image Upload */}
            {isAddProductOpen && (
              <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-borderLine shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-xl font-bold text-ink-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-gold-500" />
                      <span>Add New Menu Item</span>
                    </h3>
                    <button
                      onClick={() => setIsAddProductOpen(false)}
                      className="text-ink-400 hover:text-ink-700 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Item Name *</label>
                      <input
                        type="text"
                        required
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        placeholder="e.g. Gourmet Scotch Eggs (Box of 4)"
                        className="w-full p-2.5 rounded-xl border border-borderLine text-xs focus:ring-1 focus:ring-wine-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-ink-800 mb-1">Category *</label>
                        <select
                          value={newProdCat}
                          onChange={(e) => setNewProdCat(e.target.value as ProductCategory)}
                          className="w-full p-2.5 rounded-xl border border-borderLine text-xs"
                        >
                          <option value="pastries">Pastries</option>
                          <option value="cakes">Cakes</option>
                          <option value="snacks">Snacks &amp; Platters</option>
                          <option value="drinks">Natural Drinks &amp; Parfaits</option>
                          <option value="packages">Celebration Packages</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-ink-800 mb-1">Price in ₦ *</label>
                        <input
                          type="number"
                          required
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(Number(e.target.value))}
                          className="w-full p-2.5 rounded-xl border border-borderLine text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={newProdDesc}
                        onChange={(e) => setNewProdDesc(e.target.value)}
                        placeholder="Describe ingredients, taste profile, and portion size..."
                        className="w-full p-2.5 rounded-xl border border-borderLine text-xs"
                      />
                    </div>

                    {/* DIRECT IMAGE UPLOAD SECTION */}
                    <div className="pt-2 border-t border-borderLine">
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-bold text-ink-900 flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-wine-900" />
                          <span>Product Image</span>
                        </label>

                        {/* Mode Switcher */}
                        <div className="flex items-center gap-1 bg-cream-100 p-0.5 rounded-lg border border-borderLine text-[10px] font-bold">
                          <button
                            type="button"
                            onClick={() => setImgUploadMode('upload')}
                            className={`px-2 py-0.5 rounded-md transition-colors ${
                              imgUploadMode === 'upload'
                                ? 'bg-wine-900 text-white shadow-xs'
                                : 'text-ink-600 hover:text-ink-900'
                            }`}
                          >
                            📷 Direct Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => setImgUploadMode('url')}
                            className={`px-2 py-0.5 rounded-md transition-colors ${
                              imgUploadMode === 'url'
                                ? 'bg-wine-900 text-white shadow-xs'
                                : 'text-ink-600 hover:text-ink-900'
                            }`}
                          >
                            🔗 Web Link
                          </button>
                        </div>
                      </div>

                      {imgUploadMode === 'upload' ? (
                        <div className="space-y-2">
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileProcess(e.target.files[0]);
                                e.target.value = '';
                              }
                            }}
                          />

                          {!newProdImg ? (
                            <div
                              onDragEnter={handleDrag}
                              onDragLeave={handleDrag}
                              onDragOver={handleDrag}
                              onDrop={handleDrop}
                              onClick={() => fileInputRef.current?.click()}
                              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                                dragActive
                                  ? 'border-wine-900 bg-wine-50'
                                  : 'border-borderLine bg-cream-50/70 hover:bg-cream-100/70 hover:border-wine-900/40'
                              }`}
                            >
                              <div className="w-12 h-12 rounded-2xl bg-white text-wine-900 shadow-sm flex items-center justify-center mb-2 border border-borderLine">
                                {isCompressingImg ? (
                                  <RefreshCw className="w-5 h-5 text-gold-600 animate-spin" />
                                ) : (
                                  <Upload className="w-5 h-5 text-wine-900" />
                                )}
                              </div>
                              <span className="font-bold text-ink-900 text-xs block">
                                {isCompressingImg ? 'Compressing photo...' : 'Tap to Take Photo or Pick from Gallery'}
                              </span>
                              <span className="text-[10px] text-ink-500 mt-0.5 block">
                                Direct upload from phone camera or computer. Automatically optimized.
                              </span>
                              <button
                                type="button"
                                className="mt-3 px-3 py-1 rounded-lg bg-wine-900 text-white text-[11px] font-bold shadow-xs pointer-events-none"
                              >
                                Select Image File
                              </button>
                            </div>
                          ) : (
                            <div className="relative rounded-2xl overflow-hidden border border-borderLine bg-cream-100 group/preview">
                              <img
                                src={newProdImg}
                                alt="Product preview"
                                className="w-full h-44 object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                <span>Photo Ready</span>
                              </div>
                              <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-2.5 py-1.5 rounded-xl bg-white/95 text-ink-800 hover:text-wine-900 text-[11px] font-bold shadow-md flex items-center gap-1 backdrop-blur-xs"
                                >
                                  <Camera className="w-3.5 h-3.5 text-gold-600" />
                                  <span>Change</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setNewProdImg('')}
                                  className="px-2.5 py-1.5 rounded-xl bg-red-600 text-white hover:bg-red-700 text-[11px] font-bold shadow-md flex items-center gap-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="url"
                            value={newProdImg}
                            onChange={(e) => setNewProdImg(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full p-2.5 rounded-xl border border-borderLine text-xs"
                          />
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="text-[10px] text-ink-500 font-semibold self-center">Presets:</span>
                            <button
                              type="button"
                              onClick={() => setNewProdImg('/images/products/cake-strawberry-drip.jpg')}
                              className="px-2 py-0.5 rounded-md bg-cream-100 hover:bg-cream-200 text-ink-700 text-[10px]"
                            >
                              Strawberry Cake
                            </button>
                            <button
                              type="button"
                              onClick={() => setNewProdImg('/images/products/meat-pie.jpg')}
                              className="px-2 py-0.5 rounded-md bg-cream-100 hover:bg-cream-200 text-ink-700 text-[10px]"
                            >
                              Meat Pie
                            </button>
                            <button
                              type="button"
                              onClick={() => setNewProdImg('/images/products/puff-puff.jpg')}
                              className="px-2 py-0.5 rounded-md bg-cream-100 hover:bg-cream-200 text-ink-700 text-[10px]"
                            >
                              Puff-Puff
                            </button>
                            <button
                              type="button"
                              onClick={() => setNewProdImg('/images/products/zobo-drink.jpg')}
                              className="px-2 py-0.5 rounded-md bg-cream-100 hover:bg-cream-200 text-ink-700 text-[10px]"
                            >
                              Zobo
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-borderLine">
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="px-4 py-2 rounded-xl text-ink-500 hover:bg-cream-50 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isCompressingImg}
                        className="px-5 py-2.5 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5 text-gold-400" />
                        <span>Save to Menu</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STORE SETTINGS */}
        {currentTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* COLUMN 1: STORE & SETTLEMENT SETTINGS (7 COLS) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-borderLine shadow-soft">
              <h3 className="font-serif text-2xl font-bold text-ink-900 mb-2">
                Store &amp; Settlement Settings
              </h3>
              <p className="text-xs text-ink-500 mb-6">
                Configure Victoria's official contact information, verified bank settlement details, and delivery fee rates.
              </p>

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

                <div>
                  <label className="block font-bold text-ink-800 mb-1">Bakery Address (Area G, Pyakasa Hub)</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value, abujaAddress: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-borderLine"
                  />
                </div>

                <div className="pt-3 border-t border-borderLine">
                  <span className="font-bold text-wine-900 block mb-1 uppercase tracking-wider">
                    Bank Settlement Details (Shown to Customers on Checkout)
                  </span>
                  <p className="text-[11px] text-ink-500 mb-3">
                    Enter Victoria's verified Nigerian bank account details here so customers who select "Bank Transfer" receive the exact account details.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Bank Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Zenith Bank / GTBank"
                        value={settings.bankName}
                        onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-borderLine"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Account Number</label>
                      <input
                        type="text"
                        placeholder="e.g. 10-digit NUBAN"
                        value={settings.accountNumber}
                        onChange={(e) => setSettings({ ...settings, accountNumber: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-borderLine"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Account Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Victoria Danladi Lanishe"
                        value={settings.accountName}
                        onChange={(e) => setSettings({ ...settings, accountName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-borderLine"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-borderLine">
                  <span className="font-bold text-wine-900 block mb-3 uppercase tracking-wider">
                    Delivery Fees Configuration
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Pyakasa / Airport Road Local (₦)</label>
                      <input
                        type="number"
                        value={settings.deliveryFeePyakasa ?? 1500}
                        onChange={(e) =>
                          setSettings({ ...settings, deliveryFeePyakasa: Number(e.target.value) })
                        }
                        className="w-full p-2.5 rounded-xl border border-borderLine"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-ink-800 mb-1">Greater Abuja (Wuse / Maitama / Garki) (₦)</label>
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
                    className="px-6 py-2.5 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Settings</span>
                  </button>
                </div>
              </form>
            </div>

            {/* COLUMN 2: ADMINISTRATOR ACCOUNTS & DEMO PURGE (5 COLS) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Proprietor Profile */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-borderLine shadow-soft">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-wine-100 text-wine-900 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-wine-900" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-ink-900">
                      Store Proprietorship
                    </h4>
                    <span className="text-[11px] text-ink-500">
                      Verified Bakery Operations Account
                    </span>
                  </div>
                </div>

                {/* Primary Proprietor Card (Only Victoria is visible) */}
                <div className="p-4 rounded-2xl bg-cream-50/70 border border-borderLine flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-wine-900 text-gold-400 font-serif font-bold text-lg flex items-center justify-center shrink-0 shadow-sm border border-gold-400/30">
                    V
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs text-ink-900 truncate">
                        Danladi Victoria Lanishe
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-gold-400 text-ink-950 font-black text-[9px] uppercase tracking-wider">
                        Sole Proprietor
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-600 truncate mt-0.5">lanivick555@gmail.com</p>
                    <p className="text-[10px] text-ink-400 mt-0.5">+234 916 222 6176 • Abuja Hub</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-borderLine text-xs text-ink-500">
                  <span className="font-bold text-ink-700 block mb-1">
                    🛡️ Verified Administrator Account
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    This account holds official authority to manage store pricing, publish celebration cakes, and oversee order fulfillment.
                  </p>
                </div>
              </div>

              {/* Card 2: Change Admin Password */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-borderLine shadow-soft">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 text-ink-950 flex items-center justify-center">
                    <Key className="w-5 h-5 text-gold-700" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-ink-900">
                      Change Admin Password
                    </h4>
                    <span className="text-[11px] text-ink-500">
                      Update your administrator sign-in password anytime
                    </span>
                  </div>
                </div>

                <form onSubmit={handleChangeAdminPassword} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-ink-700 mb-1">
                      Current Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        required
                        placeholder="Enter current password"
                        value={currentPasswordInput}
                        onChange={(e) => setCurrentPasswordInput(e.target.value)}
                        className="w-full p-2.5 pr-10 rounded-xl border border-borderLine text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                      >
                        {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-ink-700 mb-1">
                      New Password * (Min 6 characters)
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        required
                        placeholder="Enter new password"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        className="w-full p-2.5 pr-10 rounded-xl border border-borderLine text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                      >
                        {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-ink-700 mb-1">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-type new password"
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-borderLine text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-ink-950 font-black text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Update Admin Password</span>
                  </button>
                </form>
              </div>

              {/* Card 3: Demo Data Purge & Clean Slate */}
              <div className="bg-cream-50/80 p-6 rounded-3xl border border-borderLine shadow-soft">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-ink-900">
                      Purge Demo Accounts &amp; Clean Slate
                    </h4>
                    <span className="text-[10px] text-ink-500">
                      Remove test customer (Chioma Adebayo)
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-ink-600 mb-4 leading-relaxed">
                  Reset cached browser sessions so visitors start as guests and only your real registered customers and administrators remain.
                </p>

                <button
                  type="button"
                  onClick={handlePurgeDemo}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Purge Demo Accounts &amp; Start Clean</span>
                </button>
              </div>
            </div>
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
