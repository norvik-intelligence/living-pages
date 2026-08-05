import Link from "next/link";
import { ArrowRight, Check, Menu } from "lucide-react";
import { Logo } from "./logo";
export function Header() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Logo />
        <nav aria-label="Main navigation">
          <Link href="/product">Product</Link>
          <Link href="/templates">Templates</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/resources">Resources</Link>
        </nav>
        <div className="nav-actions">
          <Link href="/login">Log in</Link>
          <Link className="button dark small" href="/signup">
            Start building <ArrowRight size={14} />
          </Link>
        </div>
        <button className="mobile-menu" aria-label="Open menu">
          <Menu />
        </button>
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
            The web operating system for brands that refuse to stand still.
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
