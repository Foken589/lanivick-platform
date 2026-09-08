import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Home,
  Sparkles,
  Upload,
  Check,
  CheckCircle2,
  MessageCircle,
  Scissors,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HairService, HairBooking } from '../../types';
import { dataService } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import {
  formatNaira,
  openWhatsApp,
  formatHairBookingWhatsAppMessage,
} from '../../services/whatsappService';

interface HairBookingModalProps {
  service: HairService;
  onClose: () => void;
}

export const HairBookingModal: React.FC<HairBookingModalProps> = ({ service, onClose }) => {
  const { currentUser } = useAuth();
  const { showToast } = useNotification();
  const settings = dataService.getSettings();

  // Client Details
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');

  // Hair Specifications
  const [hairLength, setHairLength] = useState(service.lengthsAvailable[1] || service.lengthsAvailable[0] || 'Mid-Back Length');
  const [hairSize, setHairSize] = useState(service.sizesAvailable[1] || service.sizesAvailable[0] || 'Medium');
  
  // Location & Dates
  const [locationType, setLocationType] = useState<'salon' | 'home_service'>('salon');
  const [studioCity, setStudioCity] = useState<'Lokoja' | 'Abuja'>('Lokoja');
  const [homeAddress, setHomeAddress] = useState(currentUser?.savedAddresses?.[0]?.streetAddress || '');
  
  const [appointmentDate, setAppointmentDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [appointmentTime, setAppointmentTime] = useState('10:00 AM');
  const [specialNotes, setSpecialNotes] = useState('');
  const [referenceImageUrl, setReferenceImageUrl] = useState<string>('');

  // Flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<HairBooking | null>(null);

  // Price Calculation
  let lengthSurcharge = 0;
  if (hairLength.toLowerCase().includes('waist')) lengthSurcharge = 4000;
  if (hairLength.toLowerCase().includes('butt') || hairLength.toLowerCase().includes('knee')) lengthSurcharge = 8000;

  let sizeSurcharge = 0;
  if (hairSize.toLowerCase().includes('small') || hairSize.toLowerCase().includes('smedium')) sizeSurcharge = 3000;

  const homeServiceSurcharge = locationType === 'home_service' ? settings.homeServiceHairSurcharge : 0;
  const totalEstimatedPrice = service.startingPrice + lengthSurcharge + sizeSurcharge + homeServiceSurcharge;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReferenceImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerPhone) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    if (locationType === 'home_service' && !homeAddress) {
      showToast('Please enter your home address for home service.', 'error');
      return;
    }

    setIsSubmitting(true);

    const bookingId = `HB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: HairBooking = {
      id: bookingId,
      userId: currentUser?.id,
      serviceId: service.id,
      serviceName: service.name,
      customerName,
      customerEmail: customerEmail || 'guest@lanivick.ng',
      customerPhone,
      appointmentDate,
      appointmentTime,
      locationType,
      studioCity,
      homeAddress: locationType === 'home_service' ? homeAddress : undefined,
      hairLength,
      hairSize,
      referenceImageUrl,
      specialNotes,
      estimatedPrice: totalEstimatedPrice,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    dataService.createHairBooking(newBooking);
    setIsSubmitting(false);
    setConfirmedBooking(newBooking);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6d1530', '#d8a83e', '#fff8ed'],
      });
    } catch {
      // safe fallback
    }

    showToast(`Appointment #${bookingId} booked successfully!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div onClick={confirmedBooking ? undefined : onClose} className="fixed inset-0 bg-ink-900/70 backdrop-blur-sm" />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden z-10 border border-borderLine my-8">
        {!confirmedBooking ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-borderLine">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-wine-100 text-wine-900 flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-600">
                    Vicky's Hairplace • Booking
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink-900">
                    {service.name}
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
              {/* Service Highlight Card */}
              <div className="p-3.5 rounded-2xl bg-cream-50 border border-borderLine flex items-center gap-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-borderLine"
                />
                <div className="flex-1">
                  <span className="text-xs font-bold text-ink-900 block">{service.name}</span>
                  <span className="text-[11px] text-ink-500 block">
                    Duration: ~{service.duration} • Base Price: {formatNaira(service.startingPrice)}
                  </span>
                </div>
              </div>

              {/* 1. Client Details */}
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
                  1. Client Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Dr. Nkechi Okafor"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-sm focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0803 123 4567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-sm focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Style Specifications: Length & Size */}
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
                  2. Hair Length & Size
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1">Preferred Length</label>
                    <select
                      value={hairLength}
                      onChange={(e) => setHairLength(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-white"
                    >
                      {service.lengthsAvailable.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-800 mb-1">Braids / Twists Size</label>
                    <select
                      value={hairSize}
                      onChange={(e) => setHairSize(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-white"
                    >
                      {service.sizesAvailable.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Location: Studio Salon vs Home Service */}
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
                  3. Location Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                      locationType === 'salon'
                        ? 'border-wine-900 bg-wine-50/60 ring-2 ring-wine-900/20'
                        : 'border-borderLine bg-white hover:bg-cream-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="locationType"
                      value="salon"
                      checked={locationType === 'salon'}
                      onChange={() => setLocationType('salon')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-wine-900">Salon Studio Visit</span>
                      <MapPin className="w-4 h-4 text-wine-900" />
                    </div>
                    <span className="text-[11px] text-ink-500">Lokoja Studio / Abuja Hub</span>
                  </label>

                  <label
                    className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                      locationType === 'home_service'
                        ? 'border-wine-900 bg-wine-50/60 ring-2 ring-wine-900/20'
                        : 'border-borderLine bg-white hover:bg-cream-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="locationType"
                      value="home_service"
                      checked={locationType === 'home_service'}
                      onChange={() => setLocationType('home_service')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-wine-900">Home Service</span>
                      <Home className="w-4 h-4 text-wine-900" />
                    </div>
                    <span className="text-[11px] text-ink-500">
                      +{formatNaira(settings.homeServiceHairSurcharge)} Surcharge
                    </span>
                  </label>
                </div>

                <div className="mt-3 p-3.5 rounded-2xl bg-cream-50/70 border border-borderLine">
                  <div className="flex items-center gap-4 mb-2">
                    <label className="text-xs font-bold text-ink-800">City Hub:</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="hairCity"
                          value="Lokoja"
                          checked={studioCity === 'Lokoja'}
                          onChange={() => setStudioCity('Lokoja')}
                          className="text-wine-900 focus:ring-wine-900"
                        />
                        <span>Lokoja Studio</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="hairCity"
                          value="Abuja"
                          checked={studioCity === 'Abuja'}
                          onChange={() => setStudioCity('Abuja')}
                          className="text-wine-900 focus:ring-wine-900"
                        />
                        <span>Abuja Branch</span>
                      </label>
                    </div>
                  </div>

                  {locationType === 'home_service' && (
                    <div>
                      <label className="block text-xs font-semibold text-ink-800 mb-1">
                        Home / Hotel Address in {studioCity} *
                      </label>
                      <input
                        type="text"
                        required
                        value={homeAddress}
                        onChange={(e) => setHomeAddress(e.target.value)}
                        placeholder="Street address, estate name, house number..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-wine-900" />
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-cream-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-wine-900" />
                    Time Slot *
                  </label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-cream-50/50"
                  >
                    <option value="9:00 AM">9:00 AM (Morning Slot)</option>
                    <option value="11:30 AM">11:30 AM (Midday Slot)</option>
                    <option value="2:00 PM">2:00 PM (Afternoon Slot)</option>
                    <option value="4:30 PM">4:30 PM (Evening Slot)</option>
                  </select>
                </div>
              </div>

              {/* 5. Hairstyle Reference Photo Upload */}
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1">
                  Upload Reference Hairstyle Photo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer border-2 border-dashed border-borderLine hover:border-wine-800 rounded-2xl p-3 text-center transition-colors bg-cream-50/50">
                    <Upload className="w-5 h-5 text-wine-900 mx-auto mb-1" />
                    <span className="text-xs font-semibold text-ink-800 block">
                      Click to upload style reference
                    </span>
                    <span className="text-[10px] text-ink-500">Attach sample photo from Instagram / Pinterest</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>

                  {referenceImageUrl && (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gold-400 shrink-0">
                      <img
                        src={referenceImageUrl}
                        alt="Style reference"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-emerald-900/30 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1">
                  Hair Notes / Specific Colour Blend
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Color 1/30 ombré, sensitive scalp, bring styling mousse."
                  className="w-full px-3.5 py-2 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                />
              </div>

              {/* Price & Submit */}
              <div className="pt-4 border-t border-borderLine flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-ink-500 block">Estimated Service Cost:</span>
                  <span className="font-serif text-2xl font-extrabold text-wine-900">
                    {formatNaira(totalEstimatedPrice)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-6 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated flex items-center gap-2 transition-all active:scale-98 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Book Hair Appointment</span>
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
              Booking Reserved
            </span>

            <h2 className="font-serif text-3xl font-bold text-ink-900 mt-2 mb-1">
              You're Booked, {confirmedBooking.customerName.split(' ')[0]}!
            </h2>
            <p className="text-sm text-ink-500 max-w-md mx-auto">
              Your appointment <span className="font-bold text-wine-900">#{confirmedBooking.id}</span> for{' '}
              <span className="font-bold text-ink-800">{confirmedBooking.serviceName}</span> is locked into Vicky's schedule.
            </p>

            <div className="my-6 p-5 rounded-2xl bg-cream-50 border border-borderLine text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-ink-500">Booking Ref:</span>
                <span className="font-bold font-mono text-ink-900">#{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Service:</span>
                <span className="font-bold text-wine-900">{confirmedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Date & Slot:</span>
                <span className="font-semibold text-ink-800">
                  {confirmedBooking.appointmentDate} at {confirmedBooking.appointmentTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Location:</span>
                <span className="font-semibold text-ink-800">
                  {confirmedBooking.locationType === 'home_service'
                    ? `Home Service (${confirmedBooking.homeAddress})`
                    : `Salon Studio (${confirmedBooking.studioCity})`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">Est. Price:</span>
                <span className="font-bold text-wine-900 font-serif text-sm">
                  {formatNaira(confirmedBooking.estimatedPrice)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  openWhatsApp(
                    settings.whatsappNumber,
                    formatHairBookingWhatsAppMessage(confirmedBooking)
                  );
                }}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Send Booking to WhatsApp for Instant Confirmation</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 px-6 rounded-2xl border border-borderLine text-ink-800 hover:bg-cream-100 font-bold text-xs transition-colors"
              >
                Close & Return to Styles
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
