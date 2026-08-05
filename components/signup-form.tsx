"use client";

import { useState } from "react";

export function SignupForm() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="auth-form"
      action="/api/auth/signup"
      method="post"
      onSubmit={() => setSubmitting(true)}
    >
      <span className="eyebrow">Create workspace</span>
      <h1>Start free</h1>
      <p className="muted">
        One account. One governed workspace. No credit card required.
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
      <button className="button dark" type="submit" disabled={submitting}>
        {submitting ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
