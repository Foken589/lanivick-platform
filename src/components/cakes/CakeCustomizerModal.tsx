import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Image as ImageIcon,
  Check,
  ArrowRight,
  Upload,
} from 'lucide-react';
import { Product, CakeCustomization } from '../../types';
import { formatNaira } from '../../services/whatsappService';
import { useCart } from '../../context/CartContext';

interface CakeCustomizerModalProps {
  product: Product;
  onClose: () => void;
}

interface OptionItem {
  id: string;
  name: string;
  priceDelta: number;
  description?: string;
}

const SIZES: OptionItem[] = [
  { id: '6inch', name: '6 inches (6-8 slices)', priceDelta: 0, description: 'Intimate gathering' },
  { id: '8inch', name: '8 inches (12-16 slices)', priceDelta: 7000, description: 'Popular family size' },
  { id: '10inch', name: '10 inches (20-25 slices)', priceDelta: 15000, description: 'Big celebration party' },
  { id: '2tier', name: '2-Tier Grand Celebration', priceDelta: 45000, description: 'Milestone & bridal showstopper' },
];

const FLAVOURS: OptionItem[] = [
  { id: 'vanilla', name: 'Madagascar Velvet Vanilla', priceDelta: 0 },
  { id: 'chocolate', name: 'Rich Belgian Chocolate', priceDelta: 0 },
  { id: 'redvelvet', name: 'Royal Red Velvet', priceDelta: 2000 },
  { id: 'marble', name: 'Marble Swirl (Vanilla & Chocolate)', priceDelta: 1500 },
  { id: 'carrot', name: 'Spiced Carrot with Crushed Walnuts', priceDelta: 3000 },
  { id: 'coconut', name: 'Coconut Dream Sponge', priceDelta: 2000 },
];

const FILLINGS: OptionItem[] = [
  { id: 'vanilla-cream', name: 'Smooth Vanilla Buttercream', priceDelta: 0 },
  { id: 'choc-ganache', name: 'Decadent Chocolate Ganache', priceDelta: 2500 },
  { id: 'cream-cheese', name: 'Tangy Cream Cheese Frosting', priceDelta: 3000 },
  { id: 'strawberry', name: 'Artisan Strawberry Compote', priceDelta: 2500 },
  { id: 'caramel', name: 'Gourmet Salted Caramel', priceDelta: 2000 },
];

const FROSTINGS: OptionItem[] = [
  { id: 'whipped', name: 'Silky Whipped Cream (Light & Fluffy)', priceDelta: 0 },
  { id: 'buttercream', name: 'Classic Smooth Buttercream', priceDelta: 1000 },
  { id: 'fondant', name: 'Luxury Molded Fondant & Gold Foil', priceDelta: 8000 },
];

export const CakeCustomizerModal: React.FC<CakeCustomizerModalProps> = ({ product, onClose }) => {
  const { addItem, openCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<OptionItem>(SIZES[1]);
  const [selectedFlavour, setSelectedFlavour] = useState<OptionItem>(FLAVOURS[0]);
  const [selectedFilling, setSelectedFilling] = useState<OptionItem>(FILLINGS[0]);
  const [selectedFrosting, setSelectedFrosting] = useState<OptionItem>(FROSTINGS[0]);
  const [inscription, setInscription] = useState('Happy Birthday Princess!');
  const [eventDate, setEventDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [deliveryWindow, setDeliveryWindow] = useState('1:00 PM - 3:00 PM');
  const [customNotes, setCustomNotes] = useState('');
  const [referenceImageUrl, setReferenceImageUrl] = useState<string>('');

  // Total Custom Price
  const additionalPrice =
    selectedSize.priceDelta +
    selectedFlavour.priceDelta +
    selectedFilling.priceDelta +
    selectedFrosting.priceDelta;

  const totalCalculatedPrice = product.price + additionalPrice;

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

  const handleAddToCart = () => {
    const customization: CakeCustomization = {
      size: selectedSize.name,
      flavour: selectedFlavour.name,
      filling: selectedFilling.name,
      frosting: selectedFrosting.name,
      inscription,
      eventDate,
      deliveryWindow,
      referenceImageUrl,
      customNotes,
      additionalPrice,
    };

    addItem(product, 1, customization);
    onClose();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div onClick={onClose} className="fixed inset-0 bg-ink-900/70 backdrop-blur-sm" />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden z-10 border border-borderLine my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-borderLine">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cream-100 flex items-center justify-center text-xl">
              🎂
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-wine-900">
                Custom Cake Builder
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink-900">
                {product.name}
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

        <div className="mt-5 max-h-[68vh] overflow-y-auto pr-1 space-y-6">
          {/* Step 1: Size */}
          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              1. Choose Cake Size
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SIZES.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    selectedSize.id === size.id
                      ? 'border-wine-900 bg-wine-50/70 ring-2 ring-wine-900/20'
                      : 'border-borderLine hover:bg-cream-50'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs text-ink-900 block">{size.name}</span>
                    <span className="text-[10px] text-ink-500">{size.description}</span>
                  </div>
                  <span className="text-xs font-bold text-wine-900">
                    {size.priceDelta > 0 ? `+${formatNaira(size.priceDelta)}` : 'Included'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Flavour */}
          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              2. Select Sponge Flavour
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FLAVOURS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFlavour(f)}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between text-xs transition-all ${
                    selectedFlavour.id === f.id
                      ? 'border-wine-900 bg-wine-50 font-bold text-wine-900 ring-2 ring-wine-900/20'
                      : 'border-borderLine text-ink-800 hover:bg-cream-50'
                  }`}
                >
                  <span>{f.name}</span>
                  <span className="text-[10px] mt-1 text-gold-600 font-bold">
                    {f.priceDelta > 0 ? `+${formatNaira(f.priceDelta)}` : 'Standard'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Filling & Frosting */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
                3. Inner Filling
              </label>
              <select
                value={selectedFilling.id}
                onChange={(e) => {
                  const item = FILLINGS.find((i) => i.id === e.target.value);
                  if (item) setSelectedFilling(item);
                }}
                className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-white"
              >
                {FILLINGS.map((fill) => (
                  <option key={fill.id} value={fill.id}>
                    {fill.name} {fill.priceDelta > 0 ? `(+${formatNaira(fill.priceDelta)})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
                4. Outer Frosting Finish
              </label>
              <select
                value={selectedFrosting.id}
                onChange={(e) => {
                  const item = FROSTINGS.find((i) => i.id === e.target.value);
                  if (item) setSelectedFrosting(item);
                }}
                className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-white"
              >
                {FROSTINGS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} {f.priceDelta > 0 ? `(+${formatNaira(f.priceDelta)})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 4: Custom Inscription */}
          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1">
              5. Cake Inscription / Message on Board
            </label>
            <input
              type="text"
              maxLength={60}
              value={inscription}
              onChange={(e) => setInscription(e.target.value)}
              placeholder="e.g. Happy 30th Birthday Dr. Victoria!"
              className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-sm focus:border-wine-900 focus:outline-none bg-cream-50/50"
            />
            {/* Live Inscription Preview Plaque */}
            {inscription && (
              <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-cream-100 via-white to-cream-100 border border-gold-400/40 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600 block">
                  Plaque Inscription Preview
                </span>
                <span className="font-serif italic text-sm font-bold text-wine-900 mt-0.5 block">
                  "{inscription}"
                </span>
              </div>
            )}
          </div>

          {/* Step 5: Event Date & Reference Image Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-wine-900" />
                Event Date *
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1">
                Preferred Delivery Time
              </label>
              <select
                value={deliveryWindow}
                onChange={(e) => setDeliveryWindow(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-borderLine text-xs font-medium focus:border-wine-900 focus:outline-none bg-white"
              >
                <option value="9:00 AM - 12:00 PM">Morning (9:00 AM - 12:00 PM)</option>
                <option value="1:00 PM - 3:00 PM">Afternoon (1:00 PM - 3:00 PM)</option>
                <option value="4:00 PM - 7:00 PM">Evening (4:00 PM - 7:00 PM)</option>
              </select>
            </div>
          </div>

          {/* Reference Image Upload */}
          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-wine-900" />
              Upload Reference Design Photo (Optional)
            </label>
            <div className="flex items-center gap-3">
              <label className="flex-1 cursor-pointer border-2 border-dashed border-borderLine hover:border-wine-800 rounded-2xl p-3 text-center transition-colors bg-cream-50/50">
                <Upload className="w-5 h-5 text-wine-900 mx-auto mb-1" />
                <span className="text-xs font-semibold text-ink-800 block">
                  Click to choose reference image
                </span>
                <span className="text-[10px] text-ink-500">PNG, JPG, WEBP up to 10MB</span>
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
                    alt="Reference preview"
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
              Special Baker Instructions
            </label>
            <textarea
              rows={2}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Please use pastel pink and gold butterflies; eggless option preferred."
              className="w-full px-3.5 py-2 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
            />
          </div>
        </div>

        {/* Footer with Price and Add to Basket */}
        <div className="mt-6 pt-4 border-t border-borderLine flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-ink-500 block">Custom Cake Total:</span>
            <span className="font-serif text-2xl font-extrabold text-wine-900">
              {formatNaira(totalCalculatedPrice)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="py-3 px-6 rounded-2xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-sm shadow-elevated flex items-center gap-2 transition-all active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Add Custom Cake to Basket</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
