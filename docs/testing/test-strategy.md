# Test strategy

Unit tests cover pure business rules and both block schemas. Integration tests must cover authenticated bootstrap, RLS tenant isolation, site creation, optimistic draft conflicts, immutable publishing, public snapshot reads and rollback against a temporary Supabase project. Playwright covers the public funnel and critical editor flow across desktop/mobile. CI blocks merging on lint, types, unit tests or production build failure.
