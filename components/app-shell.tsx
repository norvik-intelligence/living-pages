"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Box,
  ChevronDown,
  Coins,
  Command,
  Compass,
  FileText,
  Globe2,
  Home,
  PanelLeft,
  Palette,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Logo } from "./logo";
const nav = [
  ["Home", "/app", Home],
  ["Sites", "/app/sites", Globe2],
  ["Content", "/app/content", FileText],
  ["Sources", "/app/sources", Compass],
  ["Automations", "/app/automations", Zap],
  ["Commerce", "/app/commerce", ShoppingBag],
  ["Analytics", "/app/analytics", BarChart3],
  ["Brand", "/app/brand", Palette],
  ["Assets", "/app/assets", Box],
  ["Domains", "/app/domains", Globe2],
  ["Team", "/app/team", Users],
  ["AI Credits", "/app/credits", Coins],
  ["Billing", "/app/billing", BookOpen],
  ["Settings", "/app/settings", Settings],
] as const;
export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="side-logo">
          <Logo compact />
          <button aria-label="Collapse sidebar">
            <PanelLeft size={16} />
          </button>
        </div>
        <button className="workspace">
          <span className="avatar">N</span>
          <span>
            <b>Northstar Studio</b>
            <small>Free workspace</small>
          </span>
          <ChevronDown size={14} />
        </button>
        <nav aria-label="Workspace navigation">
          {nav.map(([label, href, Icon]) => (
            <Link
              key={href}
              className={
                path === href || (href !== "/app" && path.startsWith(href))
                  ? "active"
                  : ""
              }
              href={href}
            >
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="credit-mini">
            <span>
              <Sparkles size={14} /> AI credits
            </span>
            <b>100</b>
            <i>
              <em style={{ width: "18%" }} />
            </i>
          </div>
          <button className="account">
            <span className="avatar small">M</span>
            <span>
              <b>Mocca</b>
              <small>Account settings</small>
            </span>
          </button>
        </div>
      </aside>
      <section className="app-area">
        <header className="app-top">
          <button className="site-switch">
            <span className="live-dot" />
            Northstar Website <ChevronDown size={13} />
          </button>
          <div className="top-actions">
            <button aria-label="Command menu">
              <Command size={16} />
              <kbd>⌘ K</kbd>
            </button>
            <Link className="top-button" href="/preview/demo">
              Preview
            </Link>
            <button className="top-button publish">Publish</button>
          </div>
        </header>
        {children}
      </section>
    </div>
  );
}
