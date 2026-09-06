import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// One shared client used by both the storefront and the admin dashboard.
// Row Level Security (set up in the SQL schema) decides what each visitor
// can actually see or change — logged-out visitors can browse products and
// place orders, only a logged-in admin can view/update the orders list.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  image_url: string | null;
  is_active: boolean;
};

export type OrderStatus =
  | "pending"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  payment_method: string;
  status: OrderStatus;
  total: number;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
};
