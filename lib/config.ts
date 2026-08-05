export const config = {
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
  database: config.supabase.url && config.supabase.key ? "connected" : "demo",
  auth:
    config.supabase.url && config.supabase.key ? "connected" : "unconfigured",
  ai:
    config.ai.provider !== "mock" && config.ai.apiKey
      ? "connected"
      : "deterministic-mock",
  billing: config.billing.secret ? "connected" : "mock",
} as const;
