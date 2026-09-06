"use client";

import { useEffect, useState } from "react";
import { supabase, Order, OrderStatus } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if there's no active admin session.
    // RLS on the `orders` table also blocks reads for logged-out visitors,
    // so this is a UX check on top of a real security rule, not the only one.
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setCheckingAuth(false);
        fetchOrders();
      }
    });
  }, [router]);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setOrders(data);
    setLoading(false);
  }

  async function updateStatus(orderId: string, status: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    await supabase.from("orders").update({ status }).eq("id", orderId);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (checkingAuth) return null;

  const todayTotal = orders
    .filter(
      (o) =>
        new Date(o.created_at).toDateString() === new Date().toDateString()
    )
    .reduce((sum, o) => sum + Number(o.total), 0);

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-soil">Orders</h1>
        <button
          onClick={handleSignOut}
          className="text-sm text-soil/60 hover:text-soil"
        >
          Sign out
        </button>
      </div>

      <div className="flex gap-6 mb-8 text-sm">
        <div className="bg-cream border border-soil/10 rounded px-4 py-3">
          <p className="text-soil/50">Orders</p>
          <p className="text-xl text-soil">{orders.length}</p>
        </div>
        <div className="bg-cream border border-soil/10 rounded px-4 py-3">
          <p className="text-soil/50">Today's revenue</p>
          <p className="text-xl text-soil">Rs {todayTotal}</p>
        </div>
      </div>

      {loading ? (
        <p className="text-soil/60">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-soil/60">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-soil/50 border-b border-soil/10">
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Phone</th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2 pr-4">Payment</th>
                <th className="py-2 pr-4">Placed</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-soil/5">
                  <td className="py-3 pr-4">{order.customer_name}</td>
                  <td className="py-3 pr-4">{order.customer_phone}</td>
                  <td className="py-3 pr-4">Rs {order.total}</td>
                  <td className="py-3 pr-4">{order.payment_method}</td>
                  <td className="py-3 pr-4">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="py-3 pr-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value as OrderStatus)
                      }
                      className="border border-soil/20 rounded px-2 py-1"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
