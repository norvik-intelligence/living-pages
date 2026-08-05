# Vercel deployment

Use Node.js 22, repository root `/`, install `npm ci` and build `npm run build`. Set `NEXT_PUBLIC_APP_URL` per environment. Add Supabase publishable configuration to Preview/Production separately and configure matching Auth redirect URLs. Add provider secrets only to server environments. Apply and verify the database migration before enabling auth.

Verify `/`, `/pricing`, `/login`, `/signup`, `/app`, `/app/sites`, `/app/brand`, `/app/credits`, mobile navigation, server logs and browser console. A successful build alone is not production verification.
