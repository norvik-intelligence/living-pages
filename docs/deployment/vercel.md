# Vercel deployment

Use Node.js 22, repository root `/`, install `npm ci` and build `npm run build`. Set `NEXT_PUBLIC_APP_URL` per environment. Set `LIVING_APP_MODE=demo` for the public sample dashboard or `LIVING_APP_MODE=connected` for authenticated tenant access. Add Supabase publishable configuration to Preview/Production separately and configure the Supabase Site URL to the production origin plus an exact `/auth/confirm` redirect URL. Add provider secrets only to server environments. Apply and verify the database migration before enabling connected mode.

Demo mode is deliberately independent of Supabase availability: `/app` stays public, only bundled sample DTOs are returned, and server mutations are denied. Switching the environment value requires a new deployment. Before switching to connected mode, verify signup, callback, login, workspace bootstrap and RLS isolation.

Email confirmation uses the server callback at `/auth/confirm`. The callback supports token-hash verification and PKCE code exchange, then writes the session cookies before redirecting to onboarding. Resend requests must use the same canonical callback and are rate-limited by Supabase; users should only open the newest email link.

Verify `/`, `/pricing`, `/login`, `/signup`, `/app`, `/app/sites`, `/app/brand`, `/app/credits`, mobile navigation, server logs and browser console. A successful build alone is not production verification.
