# Test strategy

Unit tests cover pure business rules and schemas. Integration tests must cover authenticated workspace/site/page writes, publishing transactions and credit reservations against a temporary Supabase project. Playwright covers the public funnel and critical editor flow across desktop/mobile. CI blocks merging on lint, types, unit tests or production build failure.
