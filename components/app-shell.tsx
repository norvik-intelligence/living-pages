"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  ChevronDown,
  CircleHelp,
  Coins,
  FileText,
  FolderOpen,
  Globe2,
  Home,
  Image as ImageIcon,
  Menu,
  Palette,
  Settings,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import type { WorkspaceContext } from "@/lib/core/types";
import { Logo } from "./logo";

const primaryNav = [
  ["Home", "/app", Home],
  ["Website", "/app/sites", Globe2],
  ["Content", "/app/content", FileText],
  ["Brand", "/app/brand", Palette],
  ["Insights", "/app/analytics", BarChart3],
] as const;

const secondaryNav = [
  ["Sources", "/app/sources", FolderOpen],
  ["Automations", "/app/automations", Zap],
  ["Assets", "/app/assets", ImageIcon],
  ["Domains", "/app/domains", Globe2],
  ["Team", "/app/team", Users],
  ["AI credits", "/app/credits", Coins],
  ["Settings", "/app/settings", Settings],
] as const;

function isActive(path: string, href: string) {
  return path === href || (href !== "/app" && path.startsWith(href));
}

export function AppShell({ children, context }: { children: React.ReactNode; context: WorkspaceContext }) {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreIsActive = secondaryNav.some(([, href]) => isActive(path, href));

  return (
    <div className="app-root">
      <button className="mobile-sidebar-trigger" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>
        <Menu size={20} />
      </button>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="side-logo">
          <Logo compact />
          <span className="product-wordmark">Living Pages</span>
          <button className="sidebar-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}>
            <X size={19} />
          </button>
        </div>

        <Link className="workspace" href="/app/sites" aria-label={`Open websites in ${context.workspace.name}`}>
          <span className="avatar">{context.workspace.name.slice(0, 1)}</span>
          <span>
            <b>{context.workspace.name}</b>
            <small>{context.mode === "demo" ? "Demo workspace" : `${context.workspace.role} workspace`}</small>
          </span>
          <ChevronDown size={16} />
        </Link>

        <nav aria-label="Main navigation">
          <span className="side-label">Build</span>
          {primaryNav.map(([label, href, Icon]) => (
            <Link key={href} className={isActive(path, href) ? "active" : ""} href={href} onClick={() => setMobileOpen(false)}>
              <Icon size={19} />
              <span>{label}</span>
            </Link>
          ))}

          <details className="more-navigation" open={moreIsActive || undefined}>
            <summary className={moreIsActive ? "active" : ""}>
              <Sparkles size={19} />
              <span>More tools</span>
              <ChevronDown className="more-chevron" size={16} />
            </summary>
            <div>
              {secondaryNav.map(([label, href, Icon]) => (
                <Link key={href} className={isActive(path, href) ? "active" : ""} href={href} onClick={() => setMobileOpen(false)}>
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </details>
        </nav>

        <div className="side-bottom">
          <Link className="help-link" href="/app/settings" onClick={() => setMobileOpen(false)}>
            <CircleHelp size={18} />
            <span>Help & setup</span>
          </Link>
          <Link className="account" href={context.mode === "demo" ? "/" : "/app/settings"}>
            <span className="avatar small">{context.user.name.slice(0, 1)}</span>
            <span>
              <b>{context.user.name}</b>
              <small>{context.mode === "demo" ? "Explore mode" : context.user.email}</small>
            </span>
          </Link>
        </div>
      </aside>

      <section className="app-area">
        <header className="app-top">
          <Link className="site-switch" href="/app/sites">
            <span className={context.site?.status === "published" ? "live-dot" : "draft-dot"} />
            <span>{context.site?.name || "Choose a website"}</span>
            <ChevronDown size={15} />
          </Link>
          <div className="top-actions">
            <Link className="top-help" href="/app/settings"><CircleHelp size={17} /> Help</Link>
            <span className={`environment-pill ${context.mode}`}>{context.mode === "demo" ? "Demo mode" : "Live workspace"}</span>
            {context.site && <Link className="app-button primary top-preview" href={`/p/${context.site.slug}`}>View website</Link>}
          </div>
        </header>
        {children}
      </section>
    </div>
  );
}
