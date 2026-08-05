"use client";

import { useState } from "react";

export function ResendConfirmationForm() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="auth-resend"
      action="/api/auth/resend"
      method="post"
      onSubmit={() => setSubmitting(true)}
    >
      <div className="field">
        <label htmlFor="resend-email">Confirmation email</label>
        <input
          id="resend-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />
      </div>
      <button className="button secondary" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send a new confirmation email"}
      </button>
    </form>
  );
}
