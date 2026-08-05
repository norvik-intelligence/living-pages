import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  if (token_hash && type) {
    const client = await createClient();
    const { error } = await client.auth.verifyOtp({ type, token_hash });
    if (!error) return NextResponse.redirect(new URL("/onboarding", url), 303);
  }
  return NextResponse.redirect(
    new URL("/login?error=confirmation-failed", url),
    303,
  );
}
