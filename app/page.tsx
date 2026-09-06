import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/supabase";

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

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="font-display text-4xl text-soil mb-2">
        Seeds worth growing
      </h1>
      <p className="text-soil/70 mb-10 max-w-md">
        Rare and heirloom varieties, hand-picked for balconies, rooftops, and
        small gardens across Pakistan.
      </p>

      {products.length === 0 ? (
        <p className="text-soil/60">
          No products yet — add some in your Supabase table editor.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="aspect-square bg-cream border border-soil/10 rounded overflow-hidden mb-3">
                {product.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                )}
              </div>
              <h2 className="font-medium text-soil">{product.name}</h2>
              <p className="text-clay">Rs {product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
