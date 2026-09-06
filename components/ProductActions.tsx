"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProductActions({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const router = useRouter();

  function handleAdd() {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleAdd}
        className="bg-leaf text-cream px-6 py-3 rounded hover:bg-leaf/90 transition-colors"
      >
        {added ? "Added" : "Add to cart"}
      </button>
      <button
        onClick={() => {
          addToCart(product, 1);
          router.push("/checkout");
        }}
        className="border border-soil/20 text-soil px-6 py-3 rounded hover:bg-soil/5 transition-colors"
      >
        Buy now
      </button>
    </div>
  );
}
