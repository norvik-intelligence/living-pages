import Link from "next/link";
import { Logo } from "@/components/logo";
export default function Signup() {
  return (
    <main id="content" className="auth-page">
      <aside className="auth-aside">
        <Logo />
        <div>
          <p className="auth-quote">
            Build the site once. Keep the business moving.
          </p>
          <p style={{ color: "#aeb3ab" }}>
            No credit card. Start with one living site.
          </p>
        </div>
        <span className="eyebrow">Your system starts here</span>
      </aside>
      <section className="auth-main">
        <form className="auth-form" action="/api/auth/signup" method="post">
          <span className="eyebrow">Create workspace</span>
          <h1>Start free</h1>
          <p className="muted">
            Real authentication activates when Supabase is connected.
          </p>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" autoComplete="name" required />
          </div>
          <div className="field">
            <label htmlFor="email">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>
          <button className="button dark" type="submit">
            Create account
          </button>
          <p className="form-note">
            Already have an account?{" "}
            <Link href="/login">
              <u>Log in</u>
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
