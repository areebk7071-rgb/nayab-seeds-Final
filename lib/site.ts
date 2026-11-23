// Central place for business details used across the storefront.
// Change a value here and it updates the header, footer, and homepage.

export const site = {
  name: "Nayab Seeds",
  tagline: "Rare and heirloom seeds for city gardeners",
  location: "Karachi, Pakistan",

  // Logo file: put it in the /public folder as logo.png (or change the path here).
  // Until the file exists, the header shows the shop name as text instead.
  logoSrc: "/logo.png",

  // WhatsApp number in international format, digits only (no + or spaces).
  // Can also be set with the NEXT_PUBLIC_WHATSAPP_NUMBER environment variable.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923318226075",

  instagramUrl: "https://www.instagram.com/nayabseeds",
  tiktokUrl: "https://www.tiktok.com/@nayabseeds",
  instagramHandle: "@nayabseeds",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
