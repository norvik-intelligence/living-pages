# Living Pages

Living Pages is a brand-governed Living Web Operating System: component-based websites, structured content, controlled automations and reviewable AI assistance in one modular core.

## Implemented foundation

- Premium responsive marketing site and product/pricing routes
- Auth forms plus real Supabase SSR adapter when configured
- Five-step onboarding and workspace shell
- Sites/pages, structured editor with undo/redo, preview and save state
- Brand, content, sources, automations, credits, billing, domains, team and analytics surfaces
- Explicit demo/mock/unconfigured service modes
- Zod block validation, centralized entitlements and deterministic AI provider
- Supabase schema with tenant RLS and indexes
- Unit/E2E scaffolding, CI, security headers and deployment documentation

Commerce checkout, production analytics ingestion, live source sync, transactional billing and production publishing remain disabled until their external services and server workflows are connected.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Without environment variables, the product runs as a visibly marked demonstration; auth and mutating production operations do not claim success.

## Supabase

Create a project, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, then apply `supabase/migrations/20260805000000_initial_core.sql`. Configure the auth site URL and `/auth/confirm` redirect. Never put a Supabase secret key in a `NEXT_PUBLIC_` variable.

## Quality

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

## Architecture and limits

See `docs/architecture/overview.md`, `docs/security/security-model.md`, and `docs/project/TASKS.md`. The current product is a launch foundation, not a claim that unconfigured integrations or delayed commerce/enterprise capabilities are live.
