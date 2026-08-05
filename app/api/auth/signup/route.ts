import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { config, modes } from "@/lib/config";
import { authCallbackUrl, signupError } from "@/lib/auth-flow";
const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email(),
  password: z.string().min(8).max(128),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(Object.fromEntries(await request.formData()));
  if (!parsed.success) return NextResponse.redirect(new URL("/signup?error=invalid-details", request.url), 303);
  if (modes.auth === "unconfigured") return NextResponse.redirect(new URL("/signup?error=not-configured", request.url), 303);
  const client = await createClient();
  const { error } = await client.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.name },
      emailRedirectTo: authCallbackUrl(request.url, config.appUrl),
    },
  });
  if (error) {
    const code = signupError(error);
    return NextResponse.redirect(new URL(`/signup?error=${code}`, request.url), 303);
  }
  return NextResponse.redirect(
    new URL("/login?status=check-email", request.url),
    303,
  );
}
