/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('karisme_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: '1-Champagne-S',
          productId: '1',
          name: 'Camisola Silk Rose',
          price: 45000,
          color: 'Champán',
          size: 'S',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdCRNUmOzuqXakq9Y-IVSubsl9_Mc39oKjW4pP4dfhBqQUXSptSd2Voa8AI1mtSo-0Wr-UmGjTzrk--oE8nYyYEUOseSINguK3sccXuVEPKPkiAcCW7FZKW66ym75WhNWcXIjr_S9dOHmP93E9GvMvoRrV05W7ZLnVbQkvBUy7VvoZ8v13T6LXgKntf-1k2GiRcyF_D2ryyx1ry00SFYJ-xtzGefCD1nUOhBMWMbKKQ2qg1_gBPAJQ',
          quantity: 1
        },
        {
          id: '3-Dusty Blue-M',
          productId: '3',
          name: 'Set Lounge Cloud',
          price: 38000,
          color: 'Azul Nube',
          size: 'M',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJIy2Zs3FMW065WzzbyiPlGdhog0Zv61xRX_Hwa141dXTw4pfc8Ufms15NgskBHb30qdvapEoo_GOWEAm7wNljZLu67huhsxcxBAz3_q_VqKyJHxYyEa0jTQNV59P-jt0lgO15JjBcdvTOUKtIyMy45NH6OyCzYpglA0ADfL2ZAThv5B2gzgYJWXFSh2oTUAaBL1ERObYUxfyhuRLy2Age6l1LLSZ7GjmSTASiB7GpcvSK8EFrYv9C',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [discountRate, setDiscountRate] = useState(0);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('karisme_cart', JSON.stringify(cartItems));
    } catch {
      // fallback
    }
  }, [cartItems]);

  const addToCart = (product, selectedColorObjOrId, selectedSize, quantity = 1) => {
    const colorName = typeof selectedColorObjOrId === 'object' 
      ? (selectedColorObjOrId.name || selectedColorObjOrId.id) 
      : (selectedColorObjOrId || product.colorName || product.color || 'Único');

    const size = selectedSize || product.availableSizes?.[0] || 'M';
    const itemId = `${product.id}-${colorName}-${size}`;

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            color: colorName,
            size: size,
            image: product.image,
            quantity: quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountRate(0);
  };

  const applyCoupon = (code) => {
    if (code?.trim().toUpperCase() === 'KARISME10') {
      setDiscountRate(0.10);
      return { success: true, message: '¡Descuento del 10% aplicado correctamente!' };
    }
    return { success: false, message: 'Código promocional no válido. Prueba con "KARISME10"' };
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discountRate;
  const estimatedTax = (subtotal - discountAmount) * 0.13; // 13% IVA Costa Rica
  const total = subtotal - discountAmount + estimatedTax;

  return (
    <CartContext.Provider value={{
      cartItems,
      totalItems,
      subtotal,
      discountRate,
      discountAmount,
      estimatedTax,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
