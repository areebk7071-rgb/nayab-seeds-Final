export default function SuccessPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  return (
    <div className="px-6 py-16 max-w-xl mx-auto text-center">
      <h1 className="font-display text-3xl text-soil mb-4">
        Order placed
      </h1>
      <p className="text-soil/70">
        Thank you — we've received your order
        {searchParams.order && (
          <> (reference {searchParams.order.slice(0, 8)})</>
        )}
        . We'll reach out on WhatsApp or call to confirm delivery.
      </p>
    </div>
  );
}
