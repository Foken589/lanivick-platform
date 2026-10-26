import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Building2,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { dataService } from '../../services/dataService';
import { paymentService } from '../../services/paymentService';
import {
  formatNaira,
  openWhatsApp,
  formatOrderWhatsAppMessage,
} from '../../services/whatsappService';
import { Order, PaymentMethod, PaymentStatus } from '../../types';

interface CheckoutModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onSuccess }) => {
  const { cart, subtotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { showToast } = useNotification();
  const settings = dataService.getSettings();

  // Form states
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [cityArea, setCityArea] = useState('Pyakasa / Airport Road');
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup-pyakasa'>('delivery');
  const [streetAddress, setStreetAddress] = useState(
    currentUser?.savedAddresses?.[0]?.streetAddress || ''
  );
  const [landmark, setLandmark] = useState(currentUser?.savedAddresses?.[0]?.landmark || '');
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('1:00 PM - 3:00 PM');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paystack');

  // UI Flow States
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Delivery Fee computation
  const deliveryFee = fulfillmentType === 'delivery' ? settings.deliveryFeeAbuja : 0;

  const totalAmount = subtotal + deliveryFee;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(settings.accountNumber);
    setCopiedBank(true);
    showToast('Account number copied to clipboard!', 'info');
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      showToast('Please fill in your name, email, and phone number.', 'error');
      return;
    }

    if (fulfillmentType === 'delivery' && !streetAddress) {
      showToast('Please enter your street address for delivery.', 'error');
      return;
    }

    setIsProcessing(true);

    const orderId = `LAN-${Math.floor(10000 + Math.random() * 90000)}`;

    const finalizeOrder = (payStatus: PaymentStatus, ref?: string) => {
      const newOrder: Order = {
        id: orderId,
        userId: currentUser?.id,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        items: [...cart],
        subtotal,
        deliveryFee,
        total: totalAmount,
        fulfillmentType,
        deliveryAddress:
          fulfillmentType === 'delivery'
            ? {
                fullName: name,
                phone,
                city: `Abuja (${cityArea})`,
                streetAddress,
                landmark,
                fulfillmentType: 'delivery',
              }
            : undefined,
        preferredDate,
        preferredTime,
        notes,
        paymentMethod,
        paymentStatus: payStatus,
        paymentReference: ref,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dataService.createOrder(newOrder);
      clearCart();
      setCompletedOrder(newOrder);
      setIsProcessing(false);

      // Trigger Celebration
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#6d1530', '#d8a83e', '#fff8ed'],
        });
      } catch (err) {
        console.error('Confetti error', err);
      }

      showToast(`Order #${orderId} placed successfully!`, 'success');
    };

    if (paymentMethod === 'paystack') {
      try {
        await paymentService.initializePayment({
          orderId,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          amount: totalAmount,
          onSuccess: (ref) => {
            finalizeOrder('paid', ref);
          },
          onCancel: () => {
            setIsProcessing(false);
            showToast('Payment was cancelled.', 'warning');
          },
          onError: (err) => {
            setIsProcessing(false);
            showToast(`Payment error: ${err}`, 'error');
          },
        });
      } catch {
        setIsProcessing(false);
        showToast('Payment system encounter an issue.', 'error');
      }
    } else if (paymentMethod === 'bank_transfer') {
      // Bank Transfer: Order marked as unpaid/pending confirmation until admin checks
      finalizeOrder('unpaid', `TRF-REF-${Date.now().toString().slice(-6)}`);
    } else {
      // Pay on Delivery
      finalizeOrder('pay_on_delivery');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={completedOrder ? undefined : onClose}
        className="fixed inset-0 bg-ink-900/70 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden z-10 border border-borderLine my-8">
        {!completedOrder ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-borderLine">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-wine-900">
                  Step 2 of 2
                </span>
                <h2 className="font-serif text-2xl font-bold text-ink-900">Checkout & Dispatch</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-ink-500 hover:bg-cream-100 hover:text-ink-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* 1. Contact Information */}
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-ink-500 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-ink-800 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Fatima Bello"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-sm focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-800 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0801 234 5678"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-sm focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-800 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-sm focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Fulfillment Preference */}
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-ink-500 mb-3 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-gold-500" />
                  2. Fulfillment & Delivery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <label
                    className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                      fulfillmentType === 'delivery'
                        ? 'border-wine-900 bg-wine-50/60 ring-2 ring-wine-900/20'
                        : 'border-borderLine bg-white hover:bg-cream-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      value="delivery"
                      checked={fulfillmentType === 'delivery'}
                      onChange={() => setFulfillmentType('delivery')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-wine-900">Doorstep Delivery (Abuja)</span>
                      <Truck className="w-4 h-4 text-wine-900" />
                    </div>
                    <span className="text-[11px] text-ink-500">
                      {formatNaira(settings.deliveryFeeAbuja)} (Pyakasa, Airport Rd & Abuja environs)
                    </span>
                  </label>

                  <label
                    className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                      fulfillmentType === 'pickup-pyakasa'
                        ? 'border-wine-900 bg-wine-50/60 ring-2 ring-wine-900/20'
                        : 'border-borderLine bg-white hover:bg-cream-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      value="pickup-pyakasa"
                      checked={fulfillmentType === 'pickup-pyakasa'}
                      onChange={() => setFulfillmentType('pickup-pyakasa')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-wine-900">Pickup — Pyakasa Hub</span>
                      <MapPin className="w-4 h-4 text-wine-900" />
                    </div>
                    <span className="text-[11px] text-emerald-700 font-bold">FREE (Area G, Pyakasa)</span>
                  </label>
                </div>

                {/* Delivery Location inputs */}
                {fulfillmentType === 'delivery' && (
                  <div className="p-4 rounded-2xl bg-cream-50/70 border border-borderLine space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-ink-800 mb-1">
                        Abuja District / Delivery Area *
                      </label>
                      <select
                        value={cityArea}
                        onChange={(e) => setCityArea(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-xs font-semibold focus:border-wine-900 focus:outline-none bg-white"
                      >
                        <option value="Pyakasa (Direct Local Delivery)">Pyakasa (Direct Local Delivery)</option>
                        <option value="Airport Road Corridor & Lugbe">Airport Road Corridor & Lugbe</option>
                        <option value="Central Business District / Garki">Central Business District / Garki</option>
                        <option value="Wuse 1 & Wuse 2">Wuse 1 & Wuse 2</option>
                        <option value="Maitama & Asokoro">Maitama & Asokoro</option>
                        <option value="Jabi, Utako & Lifecamp">Jabi, Utako & Lifecamp</option>
                        <option value="Gwarinpa & Katampe">Gwarinpa & Katampe</option>
                        <option value="Kubwa & Bwari Corridor">Kubwa & Bwari Corridor</option>
                        <option value="Apo & Guzape">Apo & Guzape</option>
                        <option value="Other Abuja Location">Other Abuja Location</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-ink-800 mb-1">
                          Street Address / House No. *
                        </label>
                        <input
                          type="text"
                          required
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          placeholder="e.g. Area G, House 12 / Plot 45 Street"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-sm focus:border-wine-900 focus:outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink-800 mb-1">
                          Closest Landmark / Junction
                        </label>
                        <input
                          type="text"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          placeholder="e.g. Near Pyakasa Market / Church Junction"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-sm focus:border-wine-900 focus:outline-none bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs font-bold text-ink-800 mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-wine-900" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-sm focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-800 mb-1">Preferred Time Window *</label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-sm focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    >
                      <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="1:00 PM - 3:00 PM">Afternoon (1:00 PM - 3:00 PM)</option>
                      <option value="4:00 PM - 7:00 PM">Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-3">
                  <label className="block text-xs font-bold text-ink-800 mb-1">
                    Special Instructions / Allergy or Inscription Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Please call before leaving the kitchen; package candle carefully."
                    className="w-full px-3.5 py-2 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                  />
                </div>
              </div>

              {/* 3. Payment Method */}
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-ink-500 mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-gold-500" />
                  3. Select Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                      paymentMethod === 'paystack'
                        ? 'border-wine-900 bg-wine-50/60 ring-2 ring-wine-900/20'
                        : 'border-borderLine bg-white hover:bg-cream-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="paystack"
                      checked={paymentMethod === 'paystack'}
                      onChange={() => setPaymentMethod('paystack')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-wine-900">Card / Paystack</span>
                      <CreditCard className="w-4 h-4 text-wine-900" />
                    </div>
                    <span className="text-[11px] text-ink-500">Instant Online Verification</span>
                  </label>

                  <label
                    className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-wine-900 bg-wine-50/60 ring-2 ring-wine-900/20'
                        : 'border-borderLine bg-white hover:bg-cream-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-wine-900">Bank Transfer</span>
                      <Building2 className="w-4 h-4 text-wine-900" />
                    </div>
                    <span className="text-[11px] text-ink-500">Direct GTBank Account</span>
                  </label>

                  <label
                    className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                      paymentMethod === 'delivery'
                        ? 'border-wine-900 bg-wine-50/60 ring-2 ring-wine-900/20'
                        : 'border-borderLine bg-white hover:bg-cream-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="delivery"
                      checked={paymentMethod === 'delivery'}
                      onChange={() => setPaymentMethod('delivery')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-wine-900">Pay on Delivery</span>
                      <Truck className="w-4 h-4 text-wine-900" />
                    </div>
                    <span className="text-[11px] text-ink-500">Cash or POS on Arrival</span>
                  </label>
                </div>

                {/* Direct Bank Transfer Details Card */}
                {paymentMethod === 'bank_transfer' && (
                  <div className="mt-3 p-4 rounded-2xl bg-cream-100 border border-gold-400/40 text-ink-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-wine-900">
                          Lanivick Official Account
                        </span>
                        <h4 className="font-bold text-sm text-ink-900">{settings.bankName}</h4>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-borderLine text-xs font-bold text-wine-900 hover:bg-wine-50 transition-colors shadow-xs"
                      >
                        {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedBank ? 'Copied!' : 'Copy Number'}</span>
                      </button>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-mono text-xl font-black text-wine-900 tracking-wider">
                        {settings.accountNumber}
                      </span>
                      <span className="text-xs text-ink-500">({settings.accountName})</span>
                    </div>
                    <p className="mt-2 text-[11px] text-ink-500 italic">
                      After submitting, you will be directed to send your transfer receipt directly to our WhatsApp for instant confirmation.
                    </p>
                  </div>
                )}
              </div>

              {/* Cost Summary & Submission */}
              <div className="pt-4 border-t border-borderLine">
                <div className="flex justify-between items-center text-xs text-ink-500 mb-1">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-ink-800">{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-ink-500 mb-2">
                  <span>Fulfillment Fee</span>
                  <span className="font-semibold text-ink-800">
                    {deliveryFee > 0 ? formatNaira(deliveryFee) : 'FREE'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-ink-900 mb-4 pt-2 border-t border-borderLine">
                  <span>Grand Total</span>
                  <span className="font-serif text-2xl text-wine-900 font-extrabold">
                    {formatNaira(totalAmount)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 py-4 px-6 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-base shadow-elevated transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Securing Order...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5 text-gold-400" />
                        <span>Place Order • {formatNaira(totalAmount)}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-4 border-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="px-3 py-1 rounded-full bg-cream-100 text-wine-900 text-xs font-bold uppercase tracking-wider">
              Order Confirmed
            </span>

            <h2 className="font-serif text-3xl font-bold text-ink-900 mt-2 mb-1">
              Thank You, {completedOrder.customerName.split(' ')[0]}!
            </h2>
            <p className="text-sm text-ink-500 max-w-md mx-auto">
              Your order <span className="font-bold text-wine-900">#{completedOrder.id}</span> has
              been received and placed into our kitchen pipeline.
            </p>

            {/* Summary Details */}
            <div className="my-6 p-5 rounded-2xl bg-cream-50 border border-borderLine text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-ink-500">Order ID:</span>
                <span className="font-bold font-mono text-ink-900">#{completedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Total Amount:</span>
                <span className="font-bold text-wine-900 font-serif text-sm">
                  {formatNaira(completedOrder.total)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Payment:</span>
                <span className="font-semibold text-ink-800 capitalize">
                  {completedOrder.paymentMethod} ({completedOrder.paymentStatus})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Preferred Date & Time:</span>
                <span className="font-semibold text-ink-800">
                  {completedOrder.preferredDate} ({completedOrder.preferredTime})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Fulfillment:</span>
                <span className="font-semibold text-ink-800 capitalize">
                  {completedOrder.fulfillmentType.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Strategic WhatsApp Action Button */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  openWhatsApp(
                    settings.whatsappNumber,
                    formatOrderWhatsAppMessage(completedOrder)
                  );
                }}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Confirm & Send Receipt via WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onSuccess();
                  window.location.href = '/dashboard';
                }}
                className="w-full py-3 px-6 rounded-2xl border border-borderLine text-ink-800 hover:bg-cream-100 font-bold text-xs transition-colors"
              >
                Track in Customer Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
