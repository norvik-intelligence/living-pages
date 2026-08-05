import { NextResponse } from "next/server";
import { modes } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (modes.auth === "connected") {
    const client = await createClient();
    await client.auth.signOut();
  }
  return NextResponse.redirect(new URL("/login?status=signed-out", request.url), 303);
}
