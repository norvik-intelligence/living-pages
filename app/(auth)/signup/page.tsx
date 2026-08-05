import Link from "next/link";
import { Logo } from "@/components/logo";
import { SignupForm } from "@/components/signup-form";

const messages: Record<string, string> = {
  "not-configured": "Account creation is not configured yet.",
  "invalid-details": "Use a valid email and a password with at least 8 characters.",
  "rate-limited": "Your confirmation email was already sent. Check your inbox and spam folder, then wait 60 seconds before trying again.",
  "account-failed": "We could not create the account. Try again in a moment or log in if you already registered.",
};
export default async function Signup({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const query = await searchParams;
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
        <div>
          {query.error && <p className="auth-message error" role="alert">{messages[query.error] || messages["account-failed"]}</p>}
          <SignupForm />
          <p className="form-note">
            Already have an account?{" "}
            <Link href="/login"><u>Log in</u></Link>
          </p>
        </div>
      </section>
    </main>
  );
}
