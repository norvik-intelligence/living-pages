"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function WorkspaceError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Workspace route failed", { digest: error.digest });
  }, [error]);
  return (
    <main className="workspace-main" id="content">
      <div className="empty error-state"><span className="eyebrow">Workspace error</span><h1>This view could not be loaded.</h1><p>Your content was not changed. Retry the request or return to Sites.</p><div className="actions"><button className="app-button primary" onClick={reset}>Try again</button><Link className="app-button" href="/app/sites">Return to sites</Link></div></div>
    </main>
  );
}
