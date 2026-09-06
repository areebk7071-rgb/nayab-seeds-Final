"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/lib/supabase";

type CartLine = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  lines: CartLine[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  function addToCart(product: Product, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { product, quantity }];
    });
  }

  function removeFromCart(productId: string) {
    setLines((prev) => prev.filter((l) => l.product.id !== productId));
  }

  function clearCart() {
    setLines([]);
  }

  const total = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ lines, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
