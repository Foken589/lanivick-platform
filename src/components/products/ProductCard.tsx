import React, { useState } from 'react';
import { Heart, Plus, Clock, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { formatNaira } from '../../services/whatsappService';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { CakeCustomizerModal } from '../cakes/CakeCustomizerModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, openCart } = useCart();
  const { currentUser, toggleFavorite } = useAuth();
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const isFav = currentUser?.favorites?.includes(product.id) || false;

  const handleAction = () => {
    if (product.allowCakeCustomization) {
      setIsCustomizerOpen(true);
    } else {
      addItem(product, 1);
      openCart();
    }
  };

  return (
    <>
      <article className="group relative bg-white rounded-3xl overflow-hidden border border-borderLine shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col justify-between">
        {/* Top Media */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.isBestSeller && (
              <span className="px-2.5 py-1 rounded-full bg-gold-400 text-ink-950 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Best Seller
              </span>
            )}
            {product.isPopular && !product.isBestSeller && (
              <span className="px-2.5 py-1 rounded-full bg-wine-900 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Popular
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isFav
                ? 'bg-wine-900 text-gold-400 shadow-md'
                : 'bg-white/80 text-ink-500 hover:text-wine-900 hover:bg-white'
            }`}
            aria-label="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-gold-400' : ''}`} />
          </button>

          {!product.inStock && (
            <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-xs flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-xl bg-white text-ink-900 font-extrabold text-xs tracking-wider uppercase shadow-md">
                Temporarily Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-ink-500 font-medium mb-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-600" />
              <span>{product.preparationTime}</span>
            </div>

            <h3 className="font-serif text-lg font-bold text-ink-900 group-hover:text-wine-900 transition-colors leading-snug">
              {product.name}
            </h3>

            <p className="mt-2 text-xs text-ink-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Bottom Price & Action */}
          <div className="mt-5 pt-4 border-t border-borderLine/70 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-ink-500 font-bold uppercase block tracking-wider">
                {product.allowCakeCustomization ? 'Starting From' : 'Price'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-lg font-extrabold text-wine-900">
                  {formatNaira(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-ink-500 line-through">
                    {formatNaira(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleAction}
              disabled={!product.inStock}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                product.allowCakeCustomization
                  ? 'bg-cream-100 hover:bg-wine-900 hover:text-white text-wine-900 border border-gold-400/40'
                  : 'bg-wine-900 hover:bg-wine-800 text-white'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {product.allowCakeCustomization ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  <span>Customize</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add +</span>
                </>
              )}
            </button>
          </div>
        </div>
      </article>

      {/* Cake Customizer Modal */}
      {isCustomizerOpen && (
        <CakeCustomizerModal product={product} onClose={() => setIsCustomizerOpen(false)} />
      )}
    </>
  );
};
