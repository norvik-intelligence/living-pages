import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { config } from "@/lib/config";
export async function createClient() {
  if (!config.supabase.url || !config.supabase.key)
    throw new Error("Supabase is not configured");
  const store = await cookies();
  return createServerClient(config.supabase.url, config.supabase.key, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(items) {
        try {
          items.forEach(({ name, value, options }) =>
            store.set(name, value, options),
          );
        } catch {
          /* Proxy refresh owns cookie writes from Server Components. */
        }
      },
    },
  });
}
