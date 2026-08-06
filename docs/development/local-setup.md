# Local development

Install Node.js 22 and dependencies with `npm install`. Copy `.env.example` to `.env.local`. Keep `LIVING_APP_MODE=demo` for a public, read-only workspace backed exclusively by bundled sample data. Change it to `connected` only after Supabase and the migrations are ready; restart the development server after changing modes. Run quality commands from the README before opening a pull request.
