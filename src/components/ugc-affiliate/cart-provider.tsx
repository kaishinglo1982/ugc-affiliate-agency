'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products } from '@/data/mock';

export type CartItem = { productId: string; size: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (productId: string, size: string, quantity?: number) => void;
  remove: (productId: string, size: string) => void;
  setQuantity: (productId: string, size: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'wk-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function add(productId: string, size: string, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.size === size ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { productId, size, quantity }];
    });
  }

  function remove(productId: string, size: string) {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));
  }

  function setQuantity(productId: string, size: string, quantity: number) {
    if (quantity <= 0) return remove(productId, size);
    setItems((prev) =>
      prev.map((i) => (i.productId === productId && i.size === size ? { ...i, quantity } : i)),
    );
  }

  function clear() {
    setItems([]);
  }

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const item of items) {
      c += item.quantity;
      const product = products.find((p) => p.id === item.productId);
      if (product) s += product.price * item.quantity;
    }
    return { count: c, subtotal: s };
  }, [items]);

  const value = useMemo(
    () => ({ items, count, subtotal, add, remove, setQuantity, clear }),
    [items, count, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
