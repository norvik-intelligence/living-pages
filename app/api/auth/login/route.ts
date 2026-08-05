import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { modes } from "@/lib/config";
const schema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(Object.fromEntries(await request.formData()));
  if (!parsed.success) return NextResponse.redirect(new URL("/login?error=invalid-details", request.url), 303);
  if (modes.auth === "unconfigured") return NextResponse.redirect(new URL("/login?error=not-configured", request.url), 303);
  const client = await createClient();
  const { error } = await client.auth.signInWithPassword(parsed.data);
  if (error) return NextResponse.redirect(new URL("/login?error=invalid-credentials", request.url), 303);
  return NextResponse.redirect(new URL("/app", request.url), 303);
}
