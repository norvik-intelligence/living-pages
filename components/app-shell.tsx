"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BarChart3, Box, ChevronDown, Coins, Command, Compass, FileText, Globe2, Home, Menu, Palette, Settings, Users, X, Zap } from "lucide-react";
import type { WorkspaceContext } from "@/lib/core/types";
import { Logo } from "./logo";

const nav = [
  ["Overview", "/app", Home], ["Sites", "/app/sites", Globe2], ["Content", "/app/content", FileText],
  ["Sources", "/app/sources", Compass], ["Automations", "/app/automations", Zap], ["Analytics", "/app/analytics", BarChart3],
  ["Brand", "/app/brand", Palette], ["Assets", "/app/assets", Box], ["Domains", "/app/domains", Globe2],
  ["Team", "/app/team", Users], ["AI credits", "/app/credits", Coins], ["Settings", "/app/settings", Settings],
] as const;

export function AppShell({ children, context }: { children: React.ReactNode; context: WorkspaceContext }) {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="app-root">
      <button className="mobile-sidebar-trigger" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={18} /></button>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="side-logo"><Logo compact /><span className="product-wordmark">Living <b>Pages</b></span><button aria-label="Close sidebar" onClick={() => setMobileOpen(false)}><X size={16} /></button></div>
        <button className="workspace" type="button"><span className="avatar">{context.workspace.name.slice(0, 1)}</span><span><b>{context.workspace.name}</b><small>{context.workspace.role} workspace</small></span><ChevronDown size={14} /></button>
        <nav aria-label="Workspace navigation">
          <span className="side-label">Workspace</span>
          {nav.slice(0, 6).map(([label, href, Icon]) => <Link key={href} className={path === href || (href !== "/app" && path.startsWith(href)) ? "active" : ""} href={href} onClick={() => setMobileOpen(false)}><Icon size={16} /><span>{label}</span></Link>)}
          <span className="side-label">System</span>
          {nav.slice(6).map(([label, href, Icon]) => <Link key={href} className={path.startsWith(href) ? "active" : ""} href={href} onClick={() => setMobileOpen(false)}><Icon size={16} /><span>{label}</span></Link>)}
        </nav>
        <div className="side-bottom">
          <div className="credit-mini"><span><Coins size={13} /> AI credits</span><b>100</b><i><em style={{ width: "18%" }} /></i></div>
          {context.mode === "demo" ? (
            <Link className="account" href="/"><span className="avatar small">{context.user.name.slice(0, 1)}</span><span><b>{context.user.name}</b><small>Demo data · back to website</small></span></Link>
          ) : (
            <form action="/api/auth/logout" method="post"><button className="account"><span className="avatar small">{context.user.name.slice(0, 1)}</span><span><b>{context.user.name}</b><small>{context.user.email} · Log out</small></span></button></form>
          )}
        </div>
      </aside>
      <section className="app-area">
        <header className="app-top">
          <div className="site-switch"><span className={context.site?.status === "published" ? "live-dot" : "draft-dot"} /><span>{context.site?.name || "No site selected"}</span><ChevronDown size={13} /></div>
          <div className="top-actions"><button aria-label="Command menu"><Command size={15} /><span>Quick actions</span><kbd>⌘ K</kbd></button><span className={`environment-pill ${context.mode}`}>{context.mode === "demo" ? "Demo" : "Connected"}</span></div>
        </header>
        {children}
      </section>
    </div>
  );
}
