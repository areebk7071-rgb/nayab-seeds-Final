import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Nayab Seeds — Rare & Heirloom Seeds",
  description:
    "Rare and heirloom seed varieties for urban gardeners in Pakistan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body min-h-screen flex flex-col">
        <CartProvider>
          <header className="border-b border-soil/10 px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-display text-2xl text-leaf">
              Nayab Seeds
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/">Shop</Link>
              <Link href="/checkout">Cart</Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-soil/10 px-6 py-8 text-sm text-soil/60">
            Nayab Seeds — Karachi, Pakistan · @nayabseeds
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
