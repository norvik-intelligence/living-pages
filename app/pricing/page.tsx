import Link from "next/link";
import { Footer, Header, CheckItem } from "@/components/marketing";
const plans = [
  {
    n: "Free",
    p: "€0",
    d: "Explore the core",
    f: [
      "1 site · 3 pages",
      "Living subdomain",
      "100 AI credits",
      "Basic analytics",
    ],
  },
  {
    n: "Portfolio",
    p: "€12",
    d: "For independent work",
    f: [
      "1 portfolio site",
      "Custom domain",
      "500 AI credits",
      "Remove branding",
    ],
  },
  {
    n: "Pages",
    p: "€29",
    d: "For growing businesses",
    f: [
      "1 business site · 20 pages",
      "Sources and automations",
      "1,500 AI credits",
      "SEO controls",
    ],
  },
  {
    n: "Business",
    p: "€79",
    d: "For active teams",
    f: [
      "5 sites · 100 pages",
      "3 team members",
      "5,000 AI credits",
      "Version history",
    ],
  },
];
export default function Pricing() {
  return (
    <>
      <Header />
      <main id="content">
        <section className="inner-hero">
          <div className="container">
            <span className="eyebrow">Clear pricing</span>
            <h1>
              Pay for leverage.
              <br />
              Not page views.
            </h1>
            <p className="muted">
              Normal publishing and editing never consume AI credits. Commerce,
              Agency and Enterprise plans are released only when their
              capabilities are production-ready.
            </p>
          </div>
        </section>
        <section className="section" style={{ paddingTop: 20 }}>
          <div className="container grid-4">
            {plans.map((x, i) => (
              <article
                className={`card price-card ${i === 2 ? "dark" : ""}`}
                key={x.n}
              >
                <span className="tag">
                  {i === 2 ? "Most complete" : "Available"}
                </span>
                <h3>{x.n}</h3>
                <p>{x.d}</p>
                <div className="price">
                  {x.p}
                  <small>/mo</small>
                </div>
                <ul>
                  {x.f.map((f) => (
                    <CheckItem key={f}>{f}</CheckItem>
                  ))}
                </ul>
                <Link
                  className={`button ${i === 2 ? "accent" : ""}`}
                  href="/signup"
                >
                  Choose {x.n}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
