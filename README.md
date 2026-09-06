# Nayab Seeds

A storefront + admin order dashboard, built with Next.js and Supabase.

## What's included

- **Storefront** (`/`) — product listing pulled from Supabase
- **Product page** (`/product/[id]`) — detail view with add-to-cart
- **Checkout** (`/checkout`) — collects customer info, writes an order to Supabase
- **Admin dashboard** (`/admin`) — protected orders view, update order status
- **Admin login** (`/admin/login`) — Supabase Auth sign-in

## Setup

1. **Create a Supabase project** at supabase.com (free tier is fine).
2. **Run the schema** — open the SQL Editor in your Supabase project and run
   the `nayab-seeds-schema.sql` file shared earlier in this conversation.
3. **Create your admin login** — in Supabase, go to Authentication → Users →
   Add user, and create yourself an account with email + password. This is
   what you'll use to log into `/admin`.
4. **Add products** — in Supabase's Table Editor, add a few rows to the
   `products` table so the storefront has something to show.
5. **Install dependencies**:
   ```
   npm install
   ```
6. **Set environment variables** — copy `.env.local.example` to `.env.local`
   and fill in your Supabase URL and anon key (found in Project Settings → API).
7. **Run locally**:
   ```
   npm run dev
   ```
   Visit http://localhost:3000 for the storefront and
   http://localhost:3000/admin/login for the dashboard.

## Deploying

1. Push this project to a GitHub repository.
2. Go to vercel.com, import the repository.
3. Add the same two environment variables from `.env.local` in Vercel's
   project settings.
4. Deploy — Vercel gives you a live URL immediately, and redeploys
   automatically on every push to GitHub.
5. Attach your own domain under Vercel's Domains settings once you're ready.

## Not included yet (next steps)

- JazzCash/Easypaisa payment integration (currently Cash on Delivery only)
- WhatsApp/email notification when a new order comes in
- Product image upload UI (use Supabase Storage + Table Editor for now)
