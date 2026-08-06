import Link from "next/link";
import { Logo } from "@/components/logo";
import { SignupForm } from "@/components/signup-form";
import { modes } from "@/lib/config";

const messages: Record<string, string> = {
  "not-configured": "Account creation is not configured yet.",
  "invalid-details": "Use a valid email and a password with at least 8 characters.",
  "rate-limited": "Your confirmation email was already sent. Check your inbox and spam folder, then wait 60 seconds before trying again.",
  "account-failed": "We could not create the account. Try again in a moment or log in if you already registered.",
  "demo-active": "Account creation is paused while the public demo is active.",
};
export default async function Signup({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const query = await searchParams;
  const isDemo = modes.application === "demo";
  return (
    <main id="content" className="auth-page">
      <aside className="auth-aside">
        <Logo />
        <div className="auth-panel">
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
        <div className="auth-panel">
          {query.error && <p className="auth-message error" role="alert">{messages[query.error] || messages["account-failed"]}</p>}
          {isDemo ? <div className="auth-form">
            <span className="eyebrow">Public product demo</span>
            <h1>Explore first.</h1>
            <p className="muted">Registration is intentionally paused. The dashboard uses isolated sample data and requires no email or password.</p>
            <Link className="button dark auth-demo-button" href="/app">Open demo dashboard</Link>
          </div> : <SignupForm />}
          {!isDemo && <p className="form-note">
            Already have an account?{" "}
            <Link href="/login"><u>Log in</u></Link>
          </p>}
        </div>
      </section>
    </main>
  );
}
