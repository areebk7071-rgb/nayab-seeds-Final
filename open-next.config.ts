import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No R2 cache bucket: every page here reads live data from Supabase,
// so there is nothing worth caching yet. Add one later if you need it.
export default defineCloudflareConfig();
