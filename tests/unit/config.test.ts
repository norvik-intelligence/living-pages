import { describe, expect, it } from "vitest";
import { resolveApplicationMode } from "@/lib/config";

describe("application mode", () => {
  it("keeps an explicitly requested demo isolated even when Supabase exists", () => {
    expect(resolveApplicationMode("demo")).toBe("demo");
  });

  it("allows connected mode only as an explicit product choice", () => {
    expect(resolveApplicationMode("connected")).toBe("connected");
  });

  it("fails closed to demo when the value is missing or invalid", () => {
    expect(resolveApplicationMode(undefined)).toBe("demo");
    expect(resolveApplicationMode("production")).toBe("demo");
  });
});
