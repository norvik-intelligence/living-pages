export type ApplicationMode = "demo" | "connected";

export function resolveApplicationMode(
  requestedMode: string | undefined,
): ApplicationMode {
  if (requestedMode === "connected") return "connected";
  return "demo";
}

const hasSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

const applicationMode = resolveApplicationMode(
  process.env.LIVING_APP_MODE,
);

export const config = {
  applicationMode,
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  },
  ai: {
    provider: process.env.AI_PROVIDER || "mock",
    apiKey: process.env.OPENAI_API_KEY,
  },
  billing: { secret: process.env.STRIPE_SECRET_KEY },
};
export const modes = {
  application: applicationMode,
  database:
    applicationMode === "demo"
      ? "demo"
      : hasSupabase
        ? "connected"
        : "unconfigured",
  auth:
    applicationMode === "demo"
      ? "demo"
      : hasSupabase
        ? "connected"
        : "unconfigured",
  ai:
    config.ai.provider !== "mock" && config.ai.apiKey
      ? "connected"
      : "deterministic-mock",
  billing: config.billing.secret ? "connected" : "mock",
} as const;
