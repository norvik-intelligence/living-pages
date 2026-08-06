# Security model

Trust boundaries are browser, Next.js server, Supabase and external providers. The browser receives only publishable configuration. Server handlers validate input with Zod and re-check identity, membership, role and entitlement. RLS is enabled on every exposed tenant table. Workspace authorization never trusts user-editable metadata.

The public demo is a separate server-owned operating mode, not an authenticated tenant or an RLS bypass. It returns only bundled sample DTOs, skips Supabase session handling and rejects onboarding, create, save, publish and rollback mutations at the server-action boundary. Activating connected mode requires an environment change and redeployment.

Structured blocks reject arbitrary block types and are rendered as escaped React text; arbitrary scripts/HTML are never interpreted. Draft payloads are capped at 80 blocks and 1 MiB at the database boundary. Publish and rollback re-check authenticated editor membership inside transaction-scoped security-definer functions and write audit events. Public reads expose only the selected immutable snapshot.

Upload implementation must check MIME by content, size, ownership and storage RLS before launch. Distributed rate limiting remains required on auth, AI, import, publish and analytics ingestion before an open beta. Logs must exclude tokens, content bodies and PII. CSP should be tightened after all production provider domains are known.
