import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-soil/10 bg-soil text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-cream">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            {site.tagline}. Based in {site.location}.
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-medium text-cream">Shop</p>
          <ul className="space-y-2">
            <li>
              <Link href="/#shop" className="hover:text-husk">
                All seeds
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-husk">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-medium text-cream">Get in touch</p>
          <ul className="space-y-2">
            <li>
              <a
                href={whatsappLink("Hi Nayab Seeds, I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-husk"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-husk"
              >
                Instagram {site.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={site.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-husk"
              >
                TikTok {site.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 px-4 py-4 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}
