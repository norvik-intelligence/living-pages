import Link from "next/link";
import { Logo } from "@/components/logo";
export default function Login() {
  return (
    <main id="content" className="auth-page">
      <aside className="auth-aside">
        <Logo />
        <div>
          <p className="auth-quote">
            A website that remembers what your brand stands for.
          </p>
          <p style={{ color: "#aeb3ab" }}>
            Controlled. Connected. Always current.
          </p>
        </div>
        <span className="eyebrow">Build once. Stay alive.</span>
      </aside>
      <section className="auth-main">
        <form className="auth-form" action="/api/auth/login" method="post">
          <span className="eyebrow">Welcome back</span>
          <h1>Log in</h1>
          <p className="muted">Continue to your Living Pages workspace.</p>
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
              autoComplete="current-password"
              minLength={8}
              required
            />
          </div>
          <button className="button dark" type="submit">
            Log in
          </button>
          <p className="form-note">
            No account?{" "}
            <Link href="/signup">
              <u>Start free</u>
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
