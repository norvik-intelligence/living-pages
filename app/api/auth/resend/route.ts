import { NextResponse } from "next/server";
import { z } from "zod";
import { authCallbackUrl, signupError } from "@/lib/auth-flow";
import { config, modes } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.email(),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(Object.fromEntries(await request.formData()));

  if (!parsed.success) {
    return NextResponse.redirect(
      new URL("/login?error=invalid-email", request.url),
      303,
    );
  }

  if (modes.auth === "unconfigured") {
    return NextResponse.redirect(
      new URL("/login?error=not-configured", request.url),
      303,
    );
  }

  const client = await createClient();
  const { error } = await client.auth.resend({
    type: "signup",
    email: parsed.data.email,
    options: {
      emailRedirectTo: authCallbackUrl(request.url, config.appUrl),
    },
  });

  if (error) {
    const code = signupError(error);
    return NextResponse.redirect(
      new URL(`/login?error=${code}`, request.url),
      303,
    );
  }

  return NextResponse.redirect(
    new URL("/login?status=confirmation-resent", request.url),
    303,
  );
}
