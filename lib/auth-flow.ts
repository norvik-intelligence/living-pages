type PublicAuthError = {
  code?: string;
  status?: number;
};

export type SignupError = "rate-limited" | "account-failed";

export function signupError(error: PublicAuthError): SignupError {
  if (error.status === 429 || error.code === "over_email_send_rate_limit") {
    return "rate-limited";
  }

  return "account-failed";
}

export function authCallbackUrl(requestUrl: string, appUrl?: string) {
  const origin = new URL(appUrl || requestUrl).origin;
  return new URL("/auth/confirm", origin).toString();
}
