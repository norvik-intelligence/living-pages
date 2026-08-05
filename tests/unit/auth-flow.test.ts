import { describe, expect, it } from "vitest";
import {
  authCallbackUrl,
  signupError,
} from "../../lib/auth-flow";

describe("auth flow", () => {
  it("uses the configured production origin for confirmation emails", () => {
    expect(
      authCallbackUrl(
        "http://localhost:3000/api/auth/signup",
        "https://living-pages-gr13.vercel.app",
      ),
    ).toBe("https://living-pages-gr13.vercel.app/auth/confirm");
  });

  it("falls back to the request origin in local development", () => {
    expect(authCallbackUrl("http://localhost:3000/api/auth/signup")).toBe(
      "http://localhost:3000/auth/confirm",
    );
  });

  it("turns Supabase email throttling into an actionable state", () => {
    expect(signupError({ code: "over_email_send_rate_limit", status: 429 })).toBe(
      "rate-limited",
    );
  });

});
