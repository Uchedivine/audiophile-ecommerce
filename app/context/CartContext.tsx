// app/context/CartContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  subtotal: number;
  shipping: number;
  tax: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session ID on client side
  useEffect(() => {
    setSessionId(getSessionId());
    setIsLoading(false);
  }, []);

  // Convex queries and mutations
  const cart = useQuery(
    api.cart.getCart,
    sessionId ? { sessionId } : 'skip'
  );
  
  const addToCartMutation = useMutation(api.cart.addToCart);
  const updateQuantityMutation = useMutation(api.cart.updateQuantity);
  const removeFromCartMutation = useMutation(api.cart.removeFromCart);
  const clearCartMutation = useMutation(api.cart.clearCart);

  // Convert Convex cart items to CartItem format
  const cartItems: CartItem[] = cart?.items.map(item => ({
    id: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image || '',
    slug: item.productId, // Use productId as slug fallback
  })) || [];

  const addToCart = async (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    if (!sessionId) return;
    
    try {
      await addToCartMutation({
        sessionId,
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity,
        image: item.image,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (id: string) => {
    if (!sessionId) return;
    
    try {
      await removeFromCartMutation({
        sessionId,
        productId: id,
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!sessionId) return;
    
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    try {
      await updateQuantityMutation({
        sessionId,
        productId: id,
        quantity,
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!sessionId) return;
    
    try {
      await clearCartMutation({ sessionId });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Calculate totals from Convex cart or fallback to 0
  const subtotal = cart?.subtotal || 0;
  const shipping = cart?.shipping || 0;
  const tax = cart?.tax || 0;
  const cartTotal = cart?.total || 0;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        subtotal,
        shipping,
        tax,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}