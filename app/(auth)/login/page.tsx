import Link from "next/link";
import { Logo } from "@/components/logo";
import { ResendConfirmationForm } from "@/components/resend-confirmation-form";
import { modes } from "@/lib/config";
export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string; status?: string }> }) {
  const query = await searchParams;
  const messages: Record<string, string> = {
    "check-email": "Check your email to confirm the account.",
    "confirmation-resent": "A fresh confirmation email was sent. Use only the newest link.",
    "signed-out": "You have been signed out.",
    "confirmation-failed": "This confirmation link is invalid or expired. Request a fresh email below.",
    "invalid-email": "Enter a valid email address.",
    "rate-limited": "A confirmation email was already sent. Wait 60 seconds, then try again.",
    "account-failed": "We could not send a confirmation email. Try again in a moment.",
    "not-configured": "Account confirmation is not configured yet.",
    "demo-active": "Account access is paused while the public demo is active.",
  };
  const message = query.status
    ? messages[query.status] || ""
    : query.error
      ? messages[query.error] || "Your session could not be verified. Please log in again."
      : "";
  const showResend =
    query.status === "check-email" ||
    query.status === "confirmation-resent" ||
    query.error === "confirmation-failed" ||
    query.error === "rate-limited" ||
    query.error === "account-failed";
  const isDemo = modes.application === "demo";
  return (
    <main id="content" className="auth-page">
      <aside className="auth-aside">
        <Logo />
        <div>
          <p className="auth-quote">
            A website that remembers what your brand stands for.
          </p>
          <p className="muted">
            Controlled. Connected. Always current.
          </p>
        </div>
        <span className="eyebrow">Build once. Stay alive.</span>
      </aside>
      <section className="auth-main">
        <div className="auth-form">
          <span className="eyebrow">{isDemo ? "Public product demo" : "Welcome back"}</span>
          <h1>{isDemo ? "No account needed." : "Log in"}</h1>
          <p className="muted">{isDemo ? "Explore the complete dashboard with isolated sample data. Nothing you do here changes production data." : "Continue to your Living Pages workspace."}</p>
          {message && <p className={query.error ? "auth-message error" : "auth-message"} role="status">{message}</p>}
          {isDemo ? (
            <Link className="button dark auth-demo-button" href="/app">Open demo dashboard</Link>
          ) : <form action="/api/auth/login" method="post">
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
          </form>}
          {!isDemo && showResend && <ResendConfirmationForm />}
          {!isDemo && <p className="form-note">
            No account?{" "}
            <Link href="/signup">
              <u>Create an account</u>
            </Link>
          </p>}
        </div>
      </section>
    </main>
  );
}
