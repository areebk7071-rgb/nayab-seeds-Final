"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { site } from "@/lib/site";

export default function SiteHeader() {
  const { lines } = useCart();
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  // Show the logo file if it exists, otherwise fall back to the shop name.
  // The ref check covers an image that already failed before React attached
  // its error handler.
  const [logoFailed, setLogoFailed] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = logoRef.current;
    if (img && img.complete && img.naturalWidth === 0) setLogoFailed(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-soil/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="shrink-0"
        >
          {logoFailed ? (
            <span className="font-display text-2xl text-leaf">{site.name}</span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={logoRef}
              src={site.logoSrc}
              alt={site.name}
              onError={() => setLogoFailed(true)}
              className="h-10 w-auto sm:h-12"
            />
          )}
        </Link>

        <form
          action="/"
          method="get"
          role="search"
          className="order-3 flex w-full basis-full items-center rounded border border-soil/20 bg-white/60 focus-within:border-leaf sm:order-none sm:ml-4 sm:w-auto sm:max-w-md sm:flex-1 sm:basis-auto"
        >
          <input
            type="search"
            name="q"
            placeholder="Search seeds"
            aria-label="Search seeds"
            className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-soil/50"
          />
          <button
            type="submit"
            aria-label="Search"
            className="px-3 py-2 text-soil/70 hover:text-leaf"
          >
            <svg
              viewBox="0 0 20 20"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="8.5" cy="8.5" r="5.5" />
              <path d="m13 13 4 4" strokeLinecap="round" />
            </svg>
          </button>
        </form>

        <nav className="ml-auto flex items-center gap-5 text-sm">
          <Link href="/#shop" className="hover:text-leaf">
            Shop
          </Link>
          <Link
            href="/checkout"
            className="flex items-center gap-2 hover:text-leaf"
          >
            Cart
            {count > 0 && (
              <span className="rounded-full bg-leaf px-2 py-0.5 text-xs text-cream">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
