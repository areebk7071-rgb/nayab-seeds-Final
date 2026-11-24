import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductActions from "@/components/ProductActions";

async function getProduct(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return notFound();

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto grid md:grid-cols-2 gap-10">
      <div className="aspect-square bg-cream border border-soil/10 rounded overflow-hidden">
        {product.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div>
        <h1 className="font-display text-3xl text-soil mb-2">
          {product.name}
        </h1>
        <p className="text-clay text-xl mb-4">Rs {product.price}</p>
        <p className="text-soil/70 mb-8">{product.description}</p>
        <ProductActions product={product} />
      </div>
    </div>
  );
}
