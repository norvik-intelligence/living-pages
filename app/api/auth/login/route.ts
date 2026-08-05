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
  if (!parsed.success)
    return NextResponse.json(
      { error: "Enter a valid email and password." },
      { status: 400 },
    );
  if (modes.auth === "unconfigured")
    return NextResponse.json(
      {
        error:
          "Authentication is not configured. Add Supabase environment variables.",
      },
      { status: 503 },
    );
  const client = await createClient();
  const { error } = await client.auth.signInWithPassword(parsed.data);
  if (error)
    return NextResponse.json(
      { error: "Email or password is incorrect." },
      { status: 401 },
    );
  return NextResponse.redirect(new URL("/app", request.url), 303);
}
