# Security model

Trust boundaries are browser, Next.js server, Supabase and external providers. The browser receives only publishable configuration. Server handlers validate input with Zod and re-check identity, membership, role and entitlement. RLS is enabled on every exposed tenant table. Workspace authorization never trusts user-editable metadata.

Structured blocks reject arbitrary scripts/HTML. Upload implementation must check MIME by content, size, ownership and storage RLS before launch. Rate limiting is required on auth, AI, import, publish and analytics ingestion endpoints. Logs must exclude tokens, content bodies and PII. CSP should be tightened after all production provider domains are known.
