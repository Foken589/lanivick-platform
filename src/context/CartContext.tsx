import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CakeCustomization, ProductVariant } from '../types';
import { useNotification } from './NotificationContext';

interface CartContextType {
  cart: CartItem[];
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    product: Product,
    quantity?: number,
    cakeCustomization?: CakeCustomization,
    variant?: ProductVariant
  ) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lanivick_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const { showToast } = useNotification();

  useEffect(() => {
    try {
      localStorage.setItem('lanivick_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error persisting cart', e);
    }
  }, [cart]);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addItem = (
    product: Product,
    quantity = 1,
    cakeCustomization?: CakeCustomization,
    variant?: ProductVariant
  ) => {
    const unitPrice = variant ? variant.price : product.price + (cakeCustomization?.additionalPrice || 0);

    // If it's a customized cake, each customization is unique line item
    const customKey = cakeCustomization
      ? `${product.id}-${cakeCustomization.flavour}-${cakeCustomization.size}-${Date.now()}`
      : `${product.id}-${variant?.id || 'base'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === customKey);

      if (existingIndex > -1 && !cakeCustomization) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      }

      const newItem: CartItem = {
        id: customKey,
        productId: product.id,
        product,
        quantity,
        variant,
        cakeCustomization,
        unitPrice,
        totalPrice: unitPrice * quantity,
      };

      return [newItem, ...prev];
    });

    showToast(`Added "${product.name}" to cart! 🍰`, 'success');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        subtotal,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
