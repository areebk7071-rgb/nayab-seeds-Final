"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { lines, total, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (lines.length === 0) return;
    setSubmitting(true);
    setError(null);

    // 1. Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: name,
        customer_phone: phone,
        customer_address: address,
        payment_method: paymentMethod,
        total,
        status: "pending",
      })
      .select()
      .single();

    if (orderError || !order) {
      setError("Couldn't place the order. Please try again.");
      setSubmitting(false);
      return;
    }

    // 2. Create the order items, linked to that order
    const itemsPayload = lines.map((line) => ({
      order_id: order.id,
      product_id: line.product.id,
      product_name: line.product.name,
      unit_price: line.product.price,
      quantity: line.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemsPayload);

    if (itemsError) {
      setError("Order created, but items failed to save. Contact us.");
      setSubmitting(false);
      return;
    }

    clearCart();
    router.push(`/checkout/success?order=${order.id}`);
  }

  if (lines.length === 0) {
    return (
      <div className="px-6 py-10 max-w-2xl mx-auto">
        <p className="text-soil/60">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 max-w-2xl mx-auto">
      <h1 className="font-display text-3xl text-soil mb-8">Checkout</h1>

      <div className="mb-8 space-y-3">
        {lines.map((line) => (
          <div
            key={line.product.id}
            className="flex justify-between items-center border-b border-soil/10 pb-3"
          >
            <div>
              <p className="text-soil">{line.product.name}</p>
              <p className="text-soil/50 text-sm">Qty: {line.quantity}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-clay">
                Rs {line.product.price * line.quantity}
              </p>
              <button
                onClick={() => removeFromCart(line.product.id)}
                className="text-soil/40 text-sm hover:text-soil"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between font-medium pt-2">
          <span>Total</span>
          <span>Rs {total}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-soil/70 mb-1">Full name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-soil/20 rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-soil/70 mb-1">
            Phone number
          </label>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-soil/20 rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-soil/70 mb-1">
            Delivery address
          </label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-soil/20 rounded px-4 py-2"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm text-soil/70 mb-1">
            Payment method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-soil/20 rounded px-4 py-2"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="jazzcash">JazzCash (coming soon)</option>
            <option value="easypaisa">Easypaisa (coming soon)</option>
          </select>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-leaf text-cream py-3 rounded hover:bg-leaf/90 transition-colors disabled:opacity-50"
        >
          {submitting ? "Placing order..." : "Place order"}
        </button>
      </form>
    </div>
  );
}
