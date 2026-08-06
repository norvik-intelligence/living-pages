import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Database,
  MousePointer2,
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
            <span className="hero-badge"><Sparkles size={14} /> A new standard for business websites</span>
            <h1>
              A website that gets
              <br /> better with your business.
            </h1>
            <p>
              Design, content and publishing in one calm workspace. Living Pages
              keeps every update on-brand—and you stay in control of what goes live.
            </p>
            <div className="hero-actions">
              <Link className="button dark" href={isDemo ? "/app" : "/signup"}>
                {isDemo ? "Explore the live studio" : "Start building"} <ArrowRight size={16} />
              </Link>
              <Link className="button" href="/product">
                See the platform
              </Link>
            </div>
            <div className="hero-proof" aria-label="Platform principles">
              <span><BadgeCheck size={16} /> Brand-governed</span>
              <span><MousePointer2 size={16} /> No-code editing</span>
              <span><ShieldCheck size={16} /> Human-approved publishing</span>
            </div>
            <div className="product-stage">
              <div className="browser">
                <div className="browser-bar">
                  <i />
                  <i />
                  <i />
                  <span className="browser-url">northstar.living.page</span>
                  <span className="browser-status">Saved</span>
                </div>
                <div className="demo-canvas">
                  <aside className="demo-side">
                    <div className="demo-label">Page structure</div>
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
                    <div className="demo-label">Brand system</div>
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
                <span className="eyebrow">One foundation</span>
                <h2>Start focused. Expand without starting over.</h2>
              </div>
              <p>
                Start with a site. Extend it into a portfolio, commerce engine
                or governed enterprise platform while the brand, content and
                publishing foundation stays intact.
              </p>
            </div>
            <div className="grid-4">
              {ecosystems.map((e, i) => (
                <article
                  className={`card ecosystem-card ecosystem-${i + 1}`}
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
                <span className="eyebrow">The old workflow</span>
                <h3>Every small update becomes a project.</h3>
                <ul>
                  <CheckItem>Content drifts out of date</CheckItem>
                  <CheckItem>Brand consistency erodes</CheckItem>
                  <CheckItem>Every update becomes a project</CheckItem>
                  <CheckItem>AI adds volume, not quality</CheckItem>
                </ul>
              </div>
              <div>
                <span className="eyebrow">Living Pages</span>
                <h3>One clear system from idea to live page.</h3>
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
                <span className="eyebrow">Simple by design</span>
                <h2>Powerful underneath. Obvious on the surface.</h2>
              </div>
              <p>
                The platform handles structure, consistency and change history.
                Your team sees one clear next step and keeps editorial control.
              </p>
            </div>
            <div className="grid-3">
              {[
                {
                  I: Database,
                  t: "Bring everything together",
                  d: "Organize trusted content, business knowledge and brand rules in one shared foundation.",
                },
                {
                  I: Sparkles,
                  t: "Work with a guided system",
                  d: "Get useful suggestions inside your voice, terminology and approved design components.",
                },
                {
                  I: ShieldCheck,
                  t: "Publish with confidence",
                  d: "Review every change, understand its status and restore an earlier version whenever needed.",
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
            <span className="eyebrow">See it in action</span>
            <h2>
              Your website should feel as considered as the business behind it.
            </h2>
            <p>Explore the complete workspace with safe sample data. No account required.</p>
            <Link className="button accent" href={isDemo ? "/app" : "/signup"}>
              {isDemo ? "Open the interactive demo" : "Start building"} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
