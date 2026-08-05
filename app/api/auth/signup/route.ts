import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { modes } from "@/lib/config";
const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email(),
  password: z.string().min(8).max(128),
});
export async function POST(request: Request) {
  const parsed = schema.safeParse(Object.fromEntries(await request.formData()));
  if (!parsed.success)
    return NextResponse.json(
      { error: "Check the account details and try again." },
      { status: 400 },
    );
  if (modes.auth === "unconfigured")
    return NextResponse.json(
      { error: "Authentication is not configured. No account was created." },
      { status: 503 },
    );
  const client = await createClient();
  const { error } = await client.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.name },
      emailRedirectTo: new URL("/auth/confirm", request.url).toString(),
    },
  });
  if (error)
    return NextResponse.json(
      { error: "Account creation failed." },
      { status: 400 },
    );
  return NextResponse.redirect(
    new URL("/login?status=check-email", request.url),
    303,
  );
}
