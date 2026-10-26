import React, { useState } from 'react';
import {
  X,
  Calendar,
  Users,
  MapPin,
  Utensils,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CateringEventType, CateringRequest } from '../../types';
import { dataService } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import {
  formatNaira,
  openWhatsApp,
  formatCateringWhatsAppMessage,
} from '../../services/whatsappService';

interface CateringQuoteModalProps {
  onClose: () => void;
}

const CONFECTIONERY_STATIONS = [
  'VIP Small Chops Platters (Puff-Puffs, Samosas, Spring Rolls & Peppered Bites)',
  'Executive Office Breakfast Boxes (Meat/Chicken Pies, Rolls & Juices)',
  'Milestone Celebration Cakes & Multi-Tier Wedding Tiers',
  'Gourmet Pastry Buffet (Flaky Pies, Glazed Doughnuts, Scotch Eggs)',
  'Natural Fruit Drinks & Greek Yogurt Parfait Station',
  'Packaged Party Favours (Chin-Chin Jars, Cookies & Brownie Boxes)',
];

const EVENT_TYPES: CateringEventType[] = [
  'Corporate Event',
  'Birthday Party',
  'Wedding',
  'Office Breakfast',
  'Anniversary',
  'Graduation',
  'School Event',
  'Church Function',
  'Other',
];

const BUDGETS = [
  '₦30,000 – ₦80,000 (Small / Team Pack)',
  '₦80,000 – ₦250,000 (Medium Event 30-70 Guests)',
  '₦250,000 – ₦600,000 (Large Event 80-200 Guests)',
  '₦600,000 – ₦1,500,000+ (Grand Banquet 200+ Guests)',
];

export const CateringQuoteModal: React.FC<CateringQuoteModalProps> = ({ onClose }) => {
  const { currentUser } = useAuth();
  const { showToast } = useNotification();
  const settings = dataService.getSettings();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');

  const [eventType, setEventType] = useState<CateringEventType>('Corporate Event');
  const [eventDate, setEventDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [city, setCity] = useState<'Abuja' | 'Pyakasa' | 'Other'>('Abuja');
  const [eventLocation, setEventLocation] = useState('');
  const [guestCount, setGuestCount] = useState<number>(50);
  const [cuisinePreference, setCuisinePreference] = useState<string[]>([
    CONFECTIONERY_STATIONS[0],
    CONFECTIONERY_STATIONS[1],
  ]);
  const [budgetRange, setBudgetRange] = useState<string>(BUDGETS[1]);
  const [dietaryRequirements, setDietaryRequirements] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<CateringRequest | null>(null);

  const toggleStation = (item: string) => {
    setCuisinePreference((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  // Rough estimation guideline: ~₦3,000 - ₦4,500 per guest/box based on selected stations
  const baseCostPerGuest = 2500 + cuisinePreference.length * 500;
  const estimatedTotalQuote = guestCount * baseCostPerGuest;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerPhone || !eventLocation) {
      showToast('Please fill in your name, contact phone, and event venue location.', 'error');
      return;
    }

    if (cuisinePreference.length === 0) {
      showToast('Please select at least one confectionery service or menu station.', 'warning');
      return;
    }

    setIsSubmitting(true);

    const requestId = `CAT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest: CateringRequest = {
      id: requestId,
      userId: currentUser?.id,
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'guest@lanivick.ng',
      eventType,
      eventDate,
      eventLocation,
      city,
      guestCount,
      cuisinePreference,
      budgetRange,
      dietaryRequirements,
      specialRequests,
      status: 'New',
      estimatedQuote: estimatedTotalQuote,
      createdAt: new Date().toISOString(),
    };

    dataService.createCateringRequest(newRequest);
    setIsSubmitting(false);
    setSubmittedRequest(newRequest);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7A1234', '#D8A83E', '#FFF7F0'],
      });
    } catch {
      // safe
    }

    showToast(`Confectionery quote request #${requestId} submitted successfully!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div onClick={submittedRequest ? undefined : onClose} className="fixed inset-0 bg-ink-900/70 backdrop-blur-sm" />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden z-10 border border-borderLine my-8">
        {!submittedRequest ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-borderLine">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cream-100 flex items-center justify-center text-xl">
                  🎂
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-wine-900">
                    Confectionery &amp; Event Concierge
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink-900">
                    Request Services &amp; Event Quote
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-ink-500 hover:bg-cream-100 hover:text-ink-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5 max-h-[68vh] overflow-y-auto pr-1">
              {/* 1. Event Type & Guest Count */}
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  1. Event Details &amp; Quantity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1">Occasion / Service Type *</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value as CateringEventType)}
                      className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    >
                      {EVENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-wine-900" />
                      Guest Count / Breakfast Packs: <span className="font-bold text-wine-900">{guestCount}</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      step={10}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full accent-wine-900"
                    />
                    <div className="flex justify-between text-[10px] text-ink-500 mt-1">
                      <span>10 (Team)</span>
                      <span>100 (Corporate)</span>
                      <span>500+ (Banquet)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Date & Location */}
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-500" />
                  2. Date &amp; Delivery Location
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-wine-900" />
                      Required Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1">Abuja Area *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value as 'Abuja' | 'Pyakasa' | 'Other')}
                      className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    >
                      <option value="Pyakasa">Pyakasa / Airport Road</option>
                      <option value="Abuja">Central Abuja / Wuse / Maitama / Garki</option>
                      <option value="Other">Greater Abuja / Other FCT District</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1">Venue / Office Address *</label>
                    <input
                      type="text"
                      required
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="e.g. Office Complex / Event Hall"
                      className="w-full px-3 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Desired Confectionery Menu Stations */}
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-gold-500" />
                  3. Select Services &amp; Menu Offerings
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CONFECTIONERY_STATIONS.map((station) => {
                    const isChecked = cuisinePreference.includes(station);
                    return (
                      <label
                        key={station}
                        onClick={() => toggleStation(station)}
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                          isChecked
                            ? 'border-wine-900 bg-wine-50 font-bold text-wine-900'
                            : 'border-borderLine text-ink-800 hover:bg-cream-50'
                        }`}
                      >
                        <span className="leading-snug pr-2">{station}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-wine-900 rounded shrink-0"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 4. Budget Range */}
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1">
                  4. Approximate Budget Guide
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-white"
                >
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Contact Details */}
              <div className="p-4 rounded-2xl bg-cream-50/70 border border-borderLine">
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
                  5. Contact &amp; Coordination
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Barrister Aliyu"
                      className="w-full px-3 py-2 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0916 222 6176"
                      className="w-full px-3 py-2 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="lanivick555@gmail.com"
                      className="w-full px-3 py-2 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-semibold text-ink-800 mb-1">
                    Special Packaging, Cake Flavor, or Dietary Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Individual office boxes, need 20 meat pies swapped for chicken pies, delivery required by 8:30 AM."
                    className="w-full px-3 py-2 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Estimate & Submit */}
              <div className="pt-4 border-t border-borderLine flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-ink-500 block">
                    Estimated Cost ({guestCount} packs/guests):
                  </span>
                  <span className="font-serif text-2xl font-extrabold text-wine-900">
                    ~{formatNaira(estimatedTotalQuote)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-6 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated flex items-center gap-2 transition-all active:scale-98 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Send Quotation Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-4 border-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="px-3 py-1 rounded-full bg-cream-100 text-wine-900 text-xs font-bold uppercase tracking-wider">
              Inquiry Logged
            </span>

            <h2 className="font-serif text-3xl font-bold text-ink-900 mt-2 mb-1">
              Proposal Request Received!
            </h2>
            <p className="text-sm text-ink-500 max-w-md mx-auto">
              Inquiry <span className="font-bold text-wine-900">#{submittedRequest.id}</span> for your{' '}
              <span className="font-bold text-ink-800">{submittedRequest.eventType}</span> ({submittedRequest.guestCount} units/guests) has been received by Victoria Lanishe.
            </p>

            <div className="my-6 p-5 rounded-2xl bg-cream-50 border border-borderLine text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-ink-500">Inquiry ID:</span>
                <span className="font-bold font-mono text-ink-900">#{submittedRequest.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Date &amp; Location:</span>
                <span className="font-semibold text-ink-800">
                  {submittedRequest.eventDate} • {submittedRequest.city} ({submittedRequest.eventLocation})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Budget Range:</span>
                <span className="font-semibold text-ink-800">{submittedRequest.budgetRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Selected Services:</span>
                <span className="font-semibold text-wine-900">
                  {submittedRequest.cuisinePreference.length} stations/services
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  openWhatsApp(
                    settings.whatsappNumber,
                    formatCateringWhatsAppMessage(submittedRequest)
                  );
                }}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Send Quotation Directly on WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 px-6 rounded-2xl border border-borderLine text-ink-800 hover:bg-cream-100 font-bold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
