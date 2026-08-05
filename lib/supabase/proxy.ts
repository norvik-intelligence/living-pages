import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { config } from "@/lib/config";
export async function updateSession(request: NextRequest) {
  if (!config.supabase.url || !config.supabase.key)
    return NextResponse.next({ request });
  let response = NextResponse.next({ request });
  const client = createServerClient(config.supabase.url, config.supabase.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(items) {
        items.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        items.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });
  const { data } = await client.auth.getClaims();
  const guarded =
    request.nextUrl.pathname.startsWith("/app") ||
    request.nextUrl.pathname.startsWith("/onboarding");
  if (guarded && !data?.claims) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("error", "Please log in");
    return NextResponse.redirect(url);
  }
  return response;
}
