import Link from "next/link";
import {
  ArrowRight,
  Database,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CheckItem, Footer, Header } from "@/components/marketing";
import { modes } from "@/lib/config";
const ecosystems = [
  {
    n: "01",
    t: "Living Pages",
    d: "Business sites and landing pages that stay current without losing their craft.",
  },
  {
    n: "02",
    t: "Living Portfolio",
    d: "An evolving body of work for creators, studios and independent experts.",
  },
  {
    n: "03",
    t: "Living Commerce",
    d: "Products, services and stories connected in one conversion system.",
  },
  {
    n: "04",
    t: "Living Enterprise",
    d: "Multi-brand governance and controlled publishing at organizational scale.",
  },
];
export default function Home() {
  const isDemo = modes.application === "demo";
  return (
    <>
      <Header />
      <main id="content">
        <section className="hero">
          <div className="container">
            <span className="eyebrow">The living web operating system</span>
            <h1>
              Build once.
              <br />
              Stay alive.
            </h1>
            <p>
              Connect your content, brand and business systems to a website that
              stays current, relevant and ready to convert.
            </p>
            <div className="hero-actions">
              <Link className="button dark" href={isDemo ? "/app" : "/signup"}>
                {isDemo ? "Open dashboard demo" : "Start building free"} <ArrowRight size={16} />
              </Link>
              <Link className="button" href="/product">
                See how it works
              </Link>
            </div>
            <div className="product-stage">
              <div className="browser">
                <div className="browser-bar">
                  <i />
                  <i />
                  <i />
                  <span className="browser-url">northstar.living.page</span>
                </div>
                <div className="demo-canvas">
                  <aside className="demo-side">
                    <div className="demo-label">Layers</div>
                    {[
                      "Navigation",
                      "Hero",
                      "Services",
                      "Selected work",
                      "Footer",
                    ].map((x, i) => (
                      <div
                        className={`layer ${i === 1 ? "active" : ""}`}
                        key={x}
                      >
                        {x}
                      </div>
                    ))}
                  </aside>
                  <div className="page-preview">
                    <span className="eyebrow">Northstar studio</span>
                    <h2>Strategy for brands moving forward.</h2>
                    <p>
                      We turn complex ambition into clear systems, distinctive
                      identities and digital products built to last.
                    </p>
                    <span>
                      <button className="button dark small">
                        Explore our work
                      </button>
                    </span>
                  </div>
                  <aside className="demo-side right">
                    <div className="demo-label">Brand controls</div>
                    <div className="control">Display · Geist</div>
                    <div className="control">Ink · #151814</div>
                    <div className="control">Accent · Living lime</div>
                    <div className="demo-label" style={{ marginTop: 30 }}>
                      Status
                    </div>
                    <div className="control">● Brand aligned</div>
                    <div className="control">● Draft saved</div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">One core. Four expressions.</span>
                <h2>A system that grows with the business.</h2>
              </div>
              <p>
                Start with a site. Extend it into a portfolio, commerce engine
                or governed enterprise platform—without rebuilding the
                foundation.
              </p>
            </div>
            <div className="grid-4">
              {ecosystems.map((e, i) => (
                <article
                  className={`card ${i === 1 ? "dark" : i === 2 ? "accent" : ""}`}
                  key={e.t}
                >
                  <span className="num">{e.n}</span>
                  <h3>{e.t}</h3>
                  <p>{e.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="compare">
              <div>
                <span className="eyebrow">Static website</span>
                <h3>Published, then forgotten.</h3>
                <ul>
                  <CheckItem>Content drifts out of date</CheckItem>
                  <CheckItem>Brand consistency erodes</CheckItem>
                  <CheckItem>Every update becomes a project</CheckItem>
                  <CheckItem>AI adds volume, not quality</CheckItem>
                </ul>
              </div>
              <div>
                <span className="eyebrow">Living Page</span>
                <h3>Connected, controlled, current.</h3>
                <ul>
                  <CheckItem>Sources keep knowledge flowing</CheckItem>
                  <CheckItem>Brand rules constrain every output</CheckItem>
                  <CheckItem>Automations propose the next move</CheckItem>
                  <CheckItem>You approve what goes live</CheckItem>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">The control loop</span>
                <h2>Alive does not mean autonomous.</h2>
              </div>
              <p>
                Living Pages separates intelligence from authority. The system
                finds opportunities. Your team keeps editorial control.
              </p>
            </div>
            <div className="grid-3">
              {[
                {
                  I: Database,
                  t: "Connect sources",
                  d: "Bring RSS, structured imports and business knowledge into one governed content layer.",
                },
                {
                  I: Sparkles,
                  t: "Generate suggestions",
                  d: "AI works inside your voice, terminology and component rules—not outside them.",
                },
                {
                  I: ShieldCheck,
                  t: "Review and publish",
                  d: "Every change has status, provenance, approval and a recoverable published version.",
                },
              ].map(({ I, t, d }) => (
                <article className="card" key={t}>
                  <I size={24} />
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container final-cta">
            <span className="eyebrow">Ready when you are</span>
            <h2>
              Your next website should be the last one you rebuild from zero.
            </h2>
            <Link className="button accent" href={isDemo ? "/app" : "/signup"}>
              {isDemo ? "Explore the demo" : "Start building"} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
