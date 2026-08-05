# Architecture overview

Living Pages is a modular Next.js monolith. The App Router owns marketing, authentication, workspace and route handlers; `lib/` owns business rules and provider boundaries; Supabase owns durable tenant data, auth and storage after configuration.

Publishing uses drafts, immutable version snapshots and a selected published version. Editors manipulate validated blocks rather than HTML. External AI, billing and email services sit behind adapters and declare their operating mode. Workspace membership plus RLS form the authorization boundary.
