import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { openWhatsApp } from '../services/whatsappService';
import { useNotification } from '../context/NotificationContext';

export const Contact: React.FC = () => {
  const settings = dataService.getSettings();
  const { showToast } = useNotification();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState<'Lokoja' | 'Abuja' | 'Other'>('Lokoja');
  const [subject, setSubject] = useState('General Question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      showToast('Please fill in your name, contact phone, and message.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Your message has been received! Victoria will respond shortly.', 'success');
  };

  const handleWhatsAppSend = () => {
    const formatted = `Hello Lanivick!
My Name: ${name}
Phone: ${phone}
City: ${city}
Subject: ${subject}
Message: ${message}`;

    openWhatsApp(settings.whatsappNumber, formatted);
  };

  return (
    <div className="bg-[#fffdfa] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink-900">
            We'd Love to Hear From You
          </h1>
          <p className="mt-3 text-sm text-ink-500">
            Questions regarding an order, cake customization, salon appointment, or event catering?
            Reach us by phone, WhatsApp, or through this form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details & Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Action Channels */}
            <div className="p-6 rounded-3xl bg-wine-900 text-white shadow-elevated">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block mb-2">
                Instant Response
              </span>
              <h3 className="font-serif text-2xl font-bold mb-4">Direct WhatsApp &amp; Call</h3>

              <div className="space-y-3">
                <button
                  onClick={() =>
                    openWhatsApp(
                      settings.whatsappNumber,
                      'Hello Lanivick! I would like to inquire about your services.'
                    )
                  }
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp: 0916 222 6176</span>
                </button>

                <a
                  href={`tel:${settings.callPhone}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call: {settings.callPhone}</span>
                </a>
              </div>
            </div>

            {/* Studio Locations */}
            <div className="p-6 rounded-3xl bg-white border border-borderLine space-y-4">
              <h4 className="font-serif text-lg font-bold text-ink-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-wine-900" />
                <span>Our Physical Hubs</span>
              </h4>

              <div className="space-y-3 text-xs text-ink-800">
                <div className="p-3 rounded-xl bg-cream-50 border border-borderLine">
                  <span className="font-bold text-wine-900 block">📍 Lokoja Hub:</span>
                  <p className="text-ink-500 mt-0.5">{settings.lokojaAddress}</p>
                </div>

                <div className="p-3 rounded-xl bg-cream-50 border border-borderLine">
                  <span className="font-bold text-wine-900 block">📍 Abuja Branch:</span>
                  <p className="text-ink-500 mt-0.5">{settings.abujaAddress}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-borderLine text-xs text-ink-500 flex items-start gap-2">
                <Clock className="w-4 h-4 text-wine-900 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-ink-800 block">Business Hours:</span>
                  <p>Monday – Saturday: 8:00 AM – 7:30 PM</p>
                  <p>Sunday: 1:00 PM – 6:00 PM (By Pre-booking)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-borderLine shadow-soft">
            {!submitted ? (
              <>
                <h3 className="font-serif text-2xl font-bold text-ink-900 mb-2">Send a Message</h3>
                <p className="text-xs text-ink-500 mb-6">
                  Fill out the form below and we will get back to you promptly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink-900 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Fatima Bello"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-900 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0803 123 4567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink-900 mb-1">Your Location *</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value as typeof city)}
                        className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-cream-50/50"
                      >
                        <option value="Lokoja">Lokoja, Kogi State</option>
                        <option value="Abuja">Abuja, FCT</option>
                        <option value="Other">Other Location</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink-900 mb-1">Subject / Inquiry Type *</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-cream-50/50"
                      >
                        <option value="Custom Cake Inquiry">Custom Cake Inquiry</option>
                        <option value="Event Catering Quote">Event Catering Quote</option>
                        <option value="Hair Appointment Question">Hair Appointment Question</option>
                        <option value="Home Service Booking">Home Service Booking</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-900 mb-1">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your question, date requirements, or feedback..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-ink-900 mb-2">Message Sent!</h3>
                <p className="text-xs text-ink-500 max-w-sm mx-auto mb-6">
                  Thank you, {name}. Your inquiry has been logged. Want a response in minutes?
                  Send it directly to our WhatsApp.
                </p>

                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                  <button
                    onClick={handleWhatsAppSend}
                    className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Continue on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-2.5 px-4 rounded-xl border border-borderLine text-xs font-semibold text-ink-800 hover:bg-cream-50"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
