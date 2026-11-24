import Link from "next/link";
import { supabase, Product } from "@/lib/supabase";
import { whatsappLink } from "@/lib/site";

// Always fetch fresh products so the shop never shows a stale, empty page.
export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading products:", error.message);
    return [];
  }
  return data ?? [];
}

type Param = string | string[] | undefined;
const first = (value: Param) => (Array.isArray(value) ? value[0] : value) ?? "";

function SeedPacketArt() {
  return (
    <svg
      viewBox="0 0 320 380"
      role="img"
      aria-label="Illustration of a seed packet with a seedling"
      className="w-full max-w-xs"
    >
      <rect
        x="40"
        y="30"
        width="240"
        height="320"
        rx="6"
        fill="#C9A24B"
        fillOpacity="0.35"
        transform="rotate(5 160 190)"
      />
      <g transform="rotate(-4 160 190)">
        <rect
          x="40"
          y="30"
          width="240"
          height="320"
          rx="6"
          fill="#F7F2E7"
          stroke="#2E2318"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        <rect x="40" y="30" width="240" height="30" rx="6" fill="#3F6C40" />
        <line
          x1="52"
          y1="45"
          x2="268"
          y2="45"
          stroke="#F7F2E7"
          strokeOpacity="0.6"
          strokeDasharray="3 5"
        />
        <circle cx="160" cy="165" r="70" fill="#C9A24B" fillOpacity="0.22" />
        <path
          d="M160 232 V150"
          stroke="#3F6C40"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M160 172 C130 172 118 152 118 132 C145 132 160 147 160 172Z"
          fill="#3F6C40"
        />
        <path
          d="M160 160 C190 160 204 142 204 122 C176 122 160 138 160 160Z"
          fill="#3F6C40"
        />
        <ellipse cx="160" cy="234" rx="34" ry="8" fill="#2E2318" />
        <text
          x="160"
          y="292"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="22"
          fill="#2E2318"
        >
          Nayab Seeds
        </text>
        <text
          x="160"
          y="318"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="13"
          fill="#2E2318"
          fillOpacity="0.7"
        >
          Rare and heirloom
        </text>
      </g>
    </svg>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: Param; category?: Param }>;
}) {
  const all = await getProducts();

  const sp = await searchParams;
  const q = first(sp.q).trim();
  const category = first(sp.category).trim();
  const filtering = Boolean(q || category);

  const categories = Array.from(
    new Set(
      all
        .map((p) => p.category?.trim())
        .filter((c): c is string => Boolean(c))
    )
  ).sort();

  const needle = q.toLowerCase();
  const products = all.filter((p) => {
    const inCategory = !category || p.category?.trim() === category;
    const matches =
      !needle ||
      p.name.toLowerCase().includes(needle) ||
      (p.description ?? "").toLowerCase().includes(needle);
    return inCategory && matches;
  });

  return (
    <div>
      {!filtering && (
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="font-display text-4xl leading-tight text-soil sm:text-5xl">
              Seeds worth growing
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-soil/75">
              Rare and heirloom varieties, hand-picked for balconies, rooftops,
              and small gardens across Pakistan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="rounded bg-leaf px-6 py-3 text-cream transition-colors hover:bg-leaf/90"
              >
                Shop seeds
              </a>
              <a
                href={whatsappLink(
                  "Hi Nayab Seeds, can you help me choose what to grow?"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-soil/25 px-6 py-3 text-soil transition-colors hover:bg-soil/5"
              >
                Ask us on WhatsApp
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <SeedPacketArt />
          </div>
        </section>
      )}

      {!filtering && categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
          <h2 className="font-display text-2xl text-soil">Shop by category</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((name) => {
              const count = all.filter((p) => p.category?.trim() === name).length;
              return (
                <Link
                  key={name}
                  href={`/?category=${encodeURIComponent(name)}#shop`}
                  className="group rounded border border-soil/10 bg-white/50 p-5 transition-colors hover:border-leaf hover:bg-white"
                >
                  <p className="font-display text-xl text-leaf">{name}</p>
                  <p className="mt-1 text-sm text-soil/60">
                    {count} {count === 1 ? "variety" : "varieties"}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section
        id="shop"
        className="mx-auto max-w-6xl scroll-mt-28 px-4 py-12 sm:px-6"
      >
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl text-soil">
            {filtering ? "Results" : "All seeds"}
          </h2>
          {filtering && (
            <p className="text-sm text-soil/70">
              {q && <span>Showing “{q}”. </span>}
              {category && <span>Category: {category}. </span>}
              <Link href="/#shop" className="text-leaf underline">
                Show all seeds
              </Link>
            </p>
          )}
        </div>

        {all.length === 0 ? (
          <p className="text-soil/70">
            No seeds are listed yet. Message us on WhatsApp and we&apos;ll tell
            you what&apos;s coming.
          </p>
        ) : products.length === 0 ? (
          <p className="text-soil/70">
            No seeds match your search.{" "}
            <Link href="/#shop" className="text-leaf underline">
              Show all seeds
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="mb-3 aspect-square overflow-hidden rounded border border-soil/10 bg-cream">
                  {product.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover motion-safe:transition-transform motion-safe:group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="font-medium text-soil">{product.name}</h3>
                <p className="text-clay">
                  Rs {product.price.toLocaleString("en-PK")}
                  {product.stock <= 0 && (
                    <span className="ml-2 text-sm text-soil/50">Sold out</span>
                  )}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {!filtering && (
        <>
          <section className="border-y border-soil/10 bg-white/40">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
              <div>
                <h3 className="font-display text-xl text-leaf">
                  Pay on delivery
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-soil/75">
                  Order now and pay in cash when your seeds arrive.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-leaf">
                  Help on WhatsApp
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-soil/75">
                  Not sure what to sow or when? Message us with any growing
                  question.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-leaf">
                  Chosen for small spaces
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-soil/75">
                  Varieties picked for balconies, rooftops, and small gardens.
                </p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <h2 className="font-display text-2xl text-soil">
              A seed shop for city gardeners
            </h2>
            <p className="mt-4 leading-relaxed text-soil/75">
              Nayab Seeds is a Karachi seed shop for rare and heirloom
              varieties. We pick seeds that suit balconies, rooftops, and small
              gardens, and we&apos;re happy to help you work out what to grow.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
