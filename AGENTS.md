# Living Pages agent contract

Read this file and the relevant `docs/` files before changing code.

## Mission

Build a brand-governed Living Web Operating System. AI may suggest; it must not silently overwrite public content.

## Architecture

- Next.js App Router modular monolith, strict TypeScript and Server Components by default.
- Feature logic stays out of visual components. Entitlements, credits, authorization and publishing are server-owned.
- Supabase tenant tables require RLS plus server authorization. Never expose secret/service keys to the browser.
- Blocks are Zod-validated structures. Never accept arbitrary HTML or JavaScript.
- External services require explicit connected, mock or unconfigured status. Never fabricate success.

## UI and accessibility

Use shared tokens in `app/globals.css`; avoid scattered colors. Preserve keyboard navigation, focus, semantic landmarks, contrast and reduced-motion behavior. Every workflow needs loading, empty, error and unauthorized states.

## Commands and definition of done

Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`. A feature is done only when persisted, authorized, validated, responsive, tested and documented. Never commit secrets, build output, fake analytics, fake billing or fake integrations.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
