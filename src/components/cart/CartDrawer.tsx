import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatNaira } from '../../services/whatsappService';
import { CheckoutModal } from '../checkout/CheckoutModal';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, closeCart, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          onClick={closeCart}
          className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-borderLine">
            {/* Header */}
            <div className="p-5 border-b border-borderLine flex items-center justify-between bg-cream-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-wine-900 text-gold-400 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-wine-900">Your Basket</h3>
                  <p className="text-xs text-ink-500">{itemCount} items ready to enjoy</p>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="p-2 rounded-xl text-ink-500 hover:bg-white hover:text-ink-900 border border-transparent hover:border-borderLine transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-borderLine">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-ink-500">
                  <div className="w-16 h-16 rounded-3xl bg-cream-100 flex items-center justify-center text-3xl mb-4">
                    🍰
                  </div>
                  <h4 className="font-serif text-lg font-bold text-ink-900 mb-1">Your cart is empty</h4>
                  <p className="text-sm text-ink-500 max-w-xs mb-6">
                    Fresh celebration cakes, warm meat pies, and party jollof are waiting for you!
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 rounded-xl bg-wine-900 text-white text-sm font-bold shadow-md hover:bg-wine-800 transition-all"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover border border-borderLine shrink-0 bg-cream-100"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-sm text-ink-900 leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-ink-500 hover:text-red-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Customization Details */}
                        {item.cakeCustomization && (
                          <div className="mt-1.5 p-2 rounded-lg bg-cream-100/70 border border-gold-400/20 text-[11px] text-ink-800 space-y-0.5">
                            <p>
                              <span className="font-bold text-wine-900">Size & Flavour:</span>{' '}
                              {item.cakeCustomization.size} • {item.cakeCustomization.flavour}
                            </p>
                            <p>
                              <span className="font-bold text-wine-900">Frosting:</span>{' '}
                              {item.cakeCustomization.frosting}
                            </p>
                            {item.cakeCustomization.inscription && (
                              <p className="italic text-wine-900">
                                "{item.cakeCustomization.inscription}"
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2">
                        <span className="font-bold text-wine-900 text-sm">
                          {formatNaira(item.totalPrice)}
                        </span>

                        <div className="flex items-center gap-2 border border-borderLine rounded-lg bg-cream-50 p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded bg-white text-ink-900 flex items-center justify-center hover:bg-wine-100 transition-colors shadow-xs"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-ink-900 px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded bg-white text-ink-900 flex items-center justify-center hover:bg-wine-100 transition-colors shadow-xs"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-borderLine bg-cream-50/70">
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-ink-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-ink-900">{formatNaira(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-ink-500 text-xs">
                    <span>Estimated Delivery / Pickup</span>
                    <span className="text-emerald-700 font-medium">Calculated at checkout</span>
                  </div>
                  <div className="pt-2 border-t border-borderLine flex justify-between text-base font-bold text-ink-900">
                    <span>Estimated Total</span>
                    <span className="text-wine-900 text-lg font-extrabold font-serif">
                      {formatNaira(subtotal)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 px-6 rounded-xl bg-wine-900 text-white font-bold text-sm shadow-elevated hover:bg-wine-800 transition-all flex items-center justify-center gap-2 group active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => {
            setIsCheckoutOpen(false);
            closeCart();
          }}
        />
      )}
    </>
  );
};
