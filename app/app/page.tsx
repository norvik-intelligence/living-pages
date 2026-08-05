import Link from "next/link";
import {
  ArrowRight,
  Check,
  FileText,
  Globe2,
  Palette,
  Plus,
  RefreshCw,
  Upload,
} from "lucide-react";
const health = [
  ["Freshness", 84],
  ["Brand consistency", 72],
  ["SEO", 68],
  ["Accessibility", 91],
  ["Performance", 88],
  ["Content completeness", 61],
];
export default function Dashboard() {
  return (
    <main className="workspace-main" id="content">
      <div className="banner">
        <span>
          <i className="live-dot" /> Demo workspace — connect Supabase to
          persist production data.
        </span>
        <Link href="/app/settings">Configure</Link>
      </div>
      <header className="workspace-head">
        <div>
          <span className="eyebrow">Wednesday, August 5</span>
          <h1>Good evening, Mocca.</h1>
          <p>Northstar Website has 3 suggestions waiting for review.</p>
        </div>
        <div className="actions">
          <Link className="app-button" href="/app/content">
            <FileText size={14} />
            New content
          </Link>
          <Link className="app-button primary" href="/app/sites">
            <Plus size={14} />
            New page
          </Link>
        </div>
      </header>
      <section className="metric-grid">
        <div className="metric">
          <span>Published pages</span>
          <b>5</b>
          <small>1 draft awaiting review</small>
        </div>
        <div className="metric">
          <span>Site health</span>
          <b>77</b>
          <small>Transparent rule-based score</small>
        </div>
        <div className="metric">
          <span>Connected sources</span>
          <b>1</b>
          <small>Demo RSS connector</small>
        </div>
        <div className="metric">
          <span>AI credit balance</span>
          <b>100</b>
          <small>Renews after plan activation</small>
        </div>
      </section>
      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-head">
            <h2>Site health</h2>
            <Link href="/app/analytics">
              View details <ArrowRight size={11} />
            </Link>
          </div>
          {health.map(([n, v]) => (
            <div className="health-row" key={n}>
              <span>{n}</span>
              <div className="bar">
                <i style={{ width: `${v}%` }} />
              </div>
              <b>{v}</b>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-head">
            <h2>Setup checklist</h2>
            <span>2 of 5</span>
          </div>
          {[
            ["Set up brand system", true],
            ["Create your first page", true],
            ["Connect a custom domain", false],
            ["Connect a content source", false],
            ["Publish your site", false],
          ].map(([n, d]) => (
            <div className={`check-row ${d ? "done" : ""}`} key={String(n)}>
              <span className="check-circle">{d && <Check size={11} />}</span>
              <span>{n}</span>
              <ArrowRight size={12} />
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-head">
            <h2>Recent activity</h2>
            <button>View all</button>
          </div>
          {[
            [Upload, "Homepage published", "2 hours ago"],
            [Palette, "Brand colors updated", "Yesterday"],
            [RefreshCw, "RSS source checked", "2 days ago"],
          ].map(([I, n, t], idx) => {
            const Icon = I as typeof Upload;
            return (
              <div className="activity-row" key={idx}>
                <div className="iconbox">
                  <Icon size={14} />
                </div>
                <span>
                  {String(n)}
                  <small>{String(t)}</small>
                </span>
              </div>
            );
          })}
        </div>
        <div className="panel">
          <div className="panel-head">
            <h2>Suggestions</h2>
            <span>3 open</span>
          </div>
          {[
            "Add a meta description to About",
            "Connect a primary domain",
            "Complete your brand voice",
          ].map((n) => (
            <div className="activity-row" key={n}>
              <div className="iconbox">
                <Globe2 size={14} />
              </div>
              <span>
                {n}
                <small>Rule-based recommendation</small>
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
