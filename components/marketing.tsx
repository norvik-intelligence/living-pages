import Link from "next/link";
import { ArrowRight, Check, Menu } from "lucide-react";
import { modes } from "@/lib/config";
import { Logo } from "./logo";
export function Header() {
  const isDemo = modes.application === "demo";
  return (
    <header className="site-header">
      <div className="container nav">
        <Logo />
        <nav aria-label="Main navigation">
          <Link href="/product">Platform</Link>
          <Link href="/templates">Templates</Link>
          <Link href="/showcase">Showcase</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <div className="nav-actions">
          <Link href={isDemo ? "/product" : "/login"}>{isDemo ? "How it works" : "Log in"}</Link>
          <Link className="button dark small" href={isDemo ? "/app" : "/signup"}>
            {isDemo ? "Explore the studio" : "Start building"} <ArrowRight size={14} />
          </Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><Menu size={21} /></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/product">Platform</Link>
            <Link href="/templates">Templates</Link>
            <Link href="/showcase">Showcase</Link>
            <Link href="/pricing">Pricing</Link>
            <Link className="button dark" href={isDemo ? "/app" : "/signup"}>
              {isDemo ? "Explore the studio" : "Start building"} <ArrowRight size={15} />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="muted">
            A brand-governed website studio for teams that want to move faster without lowering the bar.
          </p>
        </div>
        {[
          ["Product", "Product", "Portfolio", "Commerce", "Enterprise"],
          ["Explore", "Templates", "Showcase", "Integrations", "Pricing"],
          ["Company", "Agencies", "Resources", "Security", "Privacy"],
        ].map(([h, ...x]) => (
          <div key={h}>
            <strong>{h}</strong>
            {x.map((v) => (
              <Link key={v} href={`/${v.toLowerCase()}`}>
                {v}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="container footer-base">
        <span>© 2026 Living Pages</span>
        <span>Build once. Stay alive.</span>
      </div>
    </footer>
  );
}
export const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <li>
    <Check size={15} />
    {children}
  </li>
);
