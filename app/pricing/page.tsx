import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer, Header, CheckItem } from "@/components/marketing";
import { modes } from "@/lib/config";
const plans = [
  {
    n: "Portfolio",
    p: "€49",
    d: "For independent experts and creators",
    f: [
      "1 website · up to 20 pages",
      "Custom domain and no branding",
      "Brand system and SEO controls",
      "AI assistance included",
    ],
  },
  {
    n: "Pages",
    p: "€129",
    d: "For serious business websites",
    f: [
      "1 website · up to 20 pages",
      "Sources and controlled automations",
      "Advanced SEO and analytics",
      "Version history and restore",
    ],
    featured: true,
  },
  {
    n: "Business",
    p: "€349",
    d: "For growing teams and brands",
    f: [
      "5 websites · up to 100 pages",
      "3 team members with roles",
      "Shared content and asset library",
      "Approvals and advanced history",
    ],
  },
  {
    n: "Agency",
    p: "€899",
    d: "For studios managing client websites",
    f: [
      "25 websites · up to 500 pages",
      "20 team members",
      "Multi-client workspace structure",
      "Priority support and onboarding",
    ],
  },
];
export default function Pricing() {
  return (
    <>
      <Header />
      <main id="content">
        <section className="inner-hero pricing-hero">
          <div className="container">
            <span className="hero-badge">Premium infrastructure. Clear pricing.</span>
            <h1>
              Built to replace website chaos,
              <br /> not compete with cheap builders.
            </h1>
            <p className="muted">
              Every paid plan includes hosting, the structured editor and
              brand-governed publishing. Editing and normal publishing never
              consume AI credits. Prices exclude VAT.
            </p>
            <div className="pricing-assurance">
              <span>Free interactive demo</span>
              <span>No page-view tax</span>
              <span>Cancel monthly</span>
            </div>
          </div>
        </section>
        <section className="section pricing-section">
          <div className="container pricing-grid">
            {plans.map((x) => (
              <article
                className={`price-card ${x.featured ? "featured" : ""}`}
                key={x.n}
              >
                <span className="tag">
                  {x.featured ? "Best for most businesses" : x.n}
                </span>
                <h3>{x.n}</h3>
                <p>{x.d}</p>
                <div className="price">
                  {x.p}
                  <small> / month</small>
                </div>
                <ul>
                  {x.f.map((f) => (
                    <CheckItem key={f}>{f}</CheckItem>
                  ))}
                </ul>
                <Link
                  className={`button ${x.featured ? "dark" : ""}`}
                  href={modes.application === "demo" ? "/app" : "/signup"}
                >
                  {modes.application === "demo" ? "Explore with demo data" : `Choose ${x.n}`}
                  <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
          <div className="container enterprise-strip">
            <div>
              <span className="eyebrow">Enterprise</span>
              <h2>Governance for complex organizations.</h2>
              <p>Unlimited structure, custom roles, security review and rollout planning—available after the enterprise controls pass production verification.</p>
            </div>
            <Link className="button" href="/enterprise">Discuss requirements <ArrowRight size={15} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
