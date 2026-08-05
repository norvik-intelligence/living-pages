"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Check,
  Database,
  FileText,
  Globe2,
  Image as ImageIcon,
  MoreHorizontal,
  Play,
  Plus,
  Rss,
  Search,
  ShieldCheck,
  ShoppingBag,
  Users,
  Zap,
} from "lucide-react";
const moduleInfo: Record<string, { title: string; desc: string }> = {
  sites: {
    title: "Sites",
    desc: "Create, manage and publish every site in this workspace.",
  },
  content: {
    title: "Content",
    desc: "Structured content that can flow into any component.",
  },
  sources: {
    title: "Sources",
    desc: "Connect trusted inputs that keep the website informed.",
  },
  automations: {
    title: "Automations",
    desc: "Turn events into controlled suggestions and review tasks.",
  },
  commerce: {
    title: "Commerce",
    desc: "Products, services and orders on the shared Living core.",
  },
  analytics: {
    title: "Analytics",
    desc: "Measured activity only—no invented production traffic.",
  },
  brand: {
    title: "Brand system",
    desc: "The rules every human and AI-assisted output must follow.",
  },
  assets: {
    title: "Assets",
    desc: "Logos, images, documents and reusable media.",
  },
  domains: {
    title: "Domains",
    desc: "Manage subdomains, DNS verification and primary domains.",
  },
  team: {
    title: "Team",
    desc: "Workspace roles, invitations and access boundaries.",
  },
  credits: {
    title: "AI credits",
    desc: "Transparent reservations, consumption and ledger history.",
  },
  billing: {
    title: "Billing",
    desc: "Plan, entitlements, invoices and payment adapters.",
  },
  settings: {
    title: "Settings",
    desc: "Workspace, locale, integrations and operational modes.",
  },
};
const pages = [
  ["Home", "/", "Published", "2 hours ago"],
  ["Services", "/services", "Published", "Yesterday"],
  ["About", "/about", "Draft", "3 days ago"],
  ["Case Studies", "/work", "Published", "5 days ago"],
  ["Contact", "/contact", "Published", "1 week ago"],
];
export function WorkspaceModule({ slug }: { slug: string }) {
  const info = moduleInfo[slug] || moduleInfo.sites;
  const [notice, setNotice] = useState("");
  return (
    <main className="workspace-main" id="content">
      <header className="workspace-head">
        <div>
          <span className="eyebrow">Workspace / {info.title}</span>
          <h1>{info.title}</h1>
          <p>{info.desc}</p>
        </div>
        <div className="actions">
          <button
            className="app-button"
            onClick={() =>
              setNotice(
                "Search and filters are ready for the connected data source.",
              )
            }
          >
            <Search size={14} />
            Search
          </button>
          <button
            className="app-button primary"
            onClick={() =>
              setNotice(
                "Creation requires a configured database. No fake record was created.",
              )
            }
          >
            <Plus size={14} />
            Add {slug === "sites" ? "site" : "new"}
          </button>
        </div>
      </header>
      {notice && (
        <div className="banner">
          <span>
            <ShieldCheck size={14} />
            {notice}
          </span>
          <button onClick={() => setNotice("")}>Dismiss</button>
        </div>
      )}
      {renderModule(slug)}
    </main>
  );
}
function renderModule(slug: string) {
  switch (slug) {
    case "sites":
      return (
        <>
          <section className="module-grid">
            <article className="module-card">
              <div className="module-top">
                <span className="module-icon">
                  <Globe2 size={15} />
                </span>
                <span className="status">Published</span>
              </div>
              <h3>Northstar Website</h3>
              <p>Business site · 5 pages · northstar.living.page</p>
              <Link className="app-button" href="/app/sites/demo/pages">
                Open site <ArrowRight size={12} />
              </Link>
            </article>
            <article className="empty" style={{ padding: 24 }}>
              <Plus />
              <h2>Create another site</h2>
              <p>
                Available after database connection and plan entitlement check.
              </p>
            </article>
          </section>
        </>
      );
    case "content":
      return (
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Updated</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {[
              ["Brand systems for scale", "Article", "Draft"],
              ["Northstar repositioning", "Case study", "Published"],
              ["Strategy intensive", "Service", "Published"],
              ["What is a living page?", "FAQ", "Draft"],
            ].map((x) => (
              <tr key={x[0]}>
                <td>
                  <b>{x[0]}</b>
                </td>
                <td>{x[1]}</td>
                <td>
                  <span className={`status ${x[2] === "Draft" ? "draft" : ""}`}>
                    {x[2]}
                  </span>
                </td>
                <td>Demo seed</td>
                <td>
                  <MoreHorizontal size={14} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "sources":
      return (
        <section className="module-grid">
          {[
            [
              Rss,
              "RSS feed",
              "Available",
              "Import feed items as reviewable content drafts.",
            ],
            [
              FileText,
              "JSON import",
              "Available",
              "Validate and import structured content manually.",
            ],
            [
              Database,
              "Manual content",
              "Available",
              "Create content directly inside the content hub.",
            ],
            [
              ShoppingBag,
              "Shopify",
              "Planned",
              "Commerce connector is not active.",
            ],
            [
              BookOpen,
              "Notion",
              "Planned",
              "Workspace knowledge connector is planned.",
            ],
            [
              Users,
              "LinkedIn",
              "Planned",
              "No unofficial scraping or fake connection.",
            ],
          ].map(([I, n, s, d]) => {
            const Icon = I as typeof Rss;
            return (
              <article className="module-card" key={String(n)}>
                <div className="module-top">
                  <span className="module-icon">
                    <Icon size={15} />
                  </span>
                  <span className="tag">{String(s)}</span>
                </div>
                <h3>{String(n)}</h3>
                <p>{String(d)}</p>
              </article>
            );
          })}
        </section>
      );
    case "automations":
      return (
        <>
          <div className="banner">
            <span>
              <ShieldCheck size={14} /> Approval is required for every
              production content change.
            </span>
          </div>
          <section className="module-grid">
            {[
              [
                "New RSS item",
                "Create content draft",
                "Requires approval",
                "Paused",
              ],
              [
                "Page becomes stale",
                "Create suggestion",
                "Suggest only",
                "Active",
              ],
              ["Manual review", "Notify owner", "Suggest only", "Active"],
            ].map((x) => (
              <article className="module-card" key={x[0]}>
                <div className="module-top">
                  <span className="module-icon">
                    <Zap size={15} />
                  </span>
                  <span
                    className={`status ${x[3] === "Paused" ? "draft" : ""}`}
                  >
                    {x[3]}
                  </span>
                </div>
                <h3>{x[0]}</h3>
                <p>
                  {x[0]} → {x[1]} → {x[2]}
                </p>
                <button className="app-button">
                  <Play size={11} />
                  Manual run
                </button>
              </article>
            ))}
          </section>
        </>
      );
    case "brand":
      return <Brand />;
    case "credits":
      return <Credits />;
    case "analytics":
      return <Analytics />;
    case "domains":
      return <Domains />;
    case "team":
      return <Team />;
    case "billing":
      return <Billing />;
    case "commerce":
      return (
        <Empty
          icon={<ShoppingBag />}
          title="Commerce core is prepared"
          text="Product, variant, customer and order schemas are included. Checkout stays disabled until a real payment adapter is connected."
        />
      );
    case "assets":
      return (
        <Empty
          icon={<ImageIcon />}
          title="No assets uploaded"
          text="Connect Supabase Storage to upload validated images, logos and documents."
        />
      );
    default:
      return (
        <section className="grid-2">
          <div className="panel">
            <div className="panel-head">
              <h2>Workspace profile</h2>
            </div>
            <div className="prop-field">
              <label>Workspace name</label>
              <input defaultValue="Northstar Studio" />
            </div>
            <div className="prop-field">
              <label>Default language</label>
              <select defaultValue="en">
                <option value="en">English</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <button className="app-button primary">Save settings</button>
          </div>
          <div className="panel">
            <div className="panel-head">
              <h2>Infrastructure status</h2>
            </div>
            {[
              ["Database", "Demo mode"],
              ["Authentication", "Not configured"],
              ["Billing", "Mock adapter"],
              ["AI", "Deterministic mock"],
            ].map((x) => (
              <div className="check-row" key={x[0]}>
                <span>{x[0]}</span>
                <span style={{ marginLeft: "auto" }} className="tag">
                  {x[1]}
                </span>
              </div>
            ))}
          </div>
        </section>
      );
  }
}
function Empty({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="empty">
      {icon}
      <h2>{title}</h2>
      <p>{text}</p>
      <button className="app-button primary">Review configuration</button>
    </div>
  );
}
function Brand() {
  return (
    <>
      <div className="tabs">
        <button className="active">Overview</button>
        {["Logos", "Colors", "Typography", "Voice", "Rules"].map((x) => (
          <button key={x}>{x}</button>
        ))}
      </div>
      <section className="brand-layout">
        <div className="panel">
          <div className="panel-head">
            <h2>Core colors</h2>
            <button>Edit palette</button>
          </div>
          <div className="swatches">
            {[
              ["Ink", "#151814"],
              ["Paper", "#F4F3ED"],
              ["Living lime", "#D8FF66"],
              ["Forest", "#23453A"],
              ["Surface", "#FFFFFF"],
            ].map((x) => (
              <div className="swatch" key={x[0]}>
                <i style={{ background: x[1] }} />
                <span>
                  {x[0]}
                  <br />
                  {x[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="panel-head">
            <h2>Typography</h2>
            <button>Edit type</button>
          </div>
          <p
            style={{ fontSize: 36, margin: "20px 0", letterSpacing: "-.05em" }}
          >
            Strategy for brands moving forward.
          </p>
          <small>Display · Geist · Medium</small>
        </div>
        <div className="panel">
          <div className="panel-head">
            <h2>Voice dimensions</h2>
          </div>
          {[
            ["Formal", "Casual", 35],
            ["Minimal", "Expressive", 28],
            ["Technical", "Simple", 64],
            ["Bold", "Reserved", 47],
            ["Premium", "Accessible", 58],
          ].map((x) => (
            <div className="health-row" key={x[0]}>
              <span>{x[0]}</span>
              <div className="bar">
                <i style={{ width: `${x[2]}%` }} />
              </div>
              <small>{x[1]}</small>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-head">
            <h2>Writing rules</h2>
          </div>
          {[
            "Prefer direct, specific language",
            "Never claim autonomous publishing",
            "Avoid “revolutionary” and “effortless”",
            "Use sentence case for headings",
          ].map((x) => (
            <div className="check-row" key={x}>
              <Check size={13} />
              {x}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
function Credits() {
  return (
    <section className="dashboard-grid">
      <div>
        <section
          className="metric-grid"
          style={{ gridTemplateColumns: "repeat(3,1fr)" }}
        >
          <div className="metric">
            <span>Available balance</span>
            <b>100</b>
            <small>Demo allowance</small>
          </div>
          <div className="metric">
            <span>Reserved</span>
            <b>0</b>
            <small>No active jobs</small>
          </div>
          <div className="metric">
            <span>Consumed</span>
            <b>0</b>
            <small>This period</small>
          </div>
        </section>
        <div className="panel">
          <div className="panel-head">
            <h2>Usage by day</h2>
            <span className="mode-badge">Demo data</span>
          </div>
          <div className="credit-chart">
            {[8, 12, 4, 18, 25, 10, 3, 14, 5, 2, 9, 16].map((x, i) => (
              <i key={i} style={{ height: `${x * 5}px` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head">
          <h2>Credit policy</h2>
        </div>
        {[
          "Reserve before every AI job",
          "Consume actual usage only",
          "Release reservation on failure",
          "Balance can never go negative",
        ].map((x) => (
          <div className="check-row" key={x}>
            <Check size={13} />
            {x}
          </div>
        ))}
      </div>
    </section>
  );
}
function Analytics() {
  return (
    <>
      <div className="banner">
        <span>
          <Activity size={14} /> Demo dataset is visible because production
          analytics is not connected.
        </span>
      </div>
      <section className="metric-grid">
        <div className="metric">
          <span>Page views</span>
          <b>—</b>
          <small>Awaiting events</small>
        </div>
        <div className="metric">
          <span>Visitors</span>
          <b>—</b>
          <small>Awaiting events</small>
        </div>
        <div className="metric">
          <span>Conversions</span>
          <b>—</b>
          <small>Awaiting events</small>
        </div>
        <div className="metric">
          <span>Publish success</span>
          <b>—</b>
          <small>Awaiting events</small>
        </div>
      </section>
      <Empty
        icon={<Activity />}
        title="No production events yet"
        text="Analytics begins after a real site is published. Seed events are never mixed with production data."
      />
    </>
  );
}
function Domains() {
  return (
    <section className="grid-2">
      <div className="panel">
        <div className="panel-head">
          <h2>Living subdomain</h2>
          <span className="status">Available</span>
        </div>
        <div className="prop-field">
          <label>Subdomain</label>
          <input value="northstar.living.page" readOnly />
        </div>
      </div>
      <div className="panel">
        <div className="panel-head">
          <h2>Custom domain</h2>
          <span className="status draft">Unverified</span>
        </div>
        <div className="prop-field">
          <label>Domain</label>
          <input placeholder="www.example.com" />
        </div>
        <button className="app-button primary">Check DNS</button>
        <p className="muted" style={{ fontSize: 11 }}>
          A domain becomes active only after DNS ownership and routing are
          verified.
        </p>
      </div>
    </section>
  );
}
function Team() {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Member</th>
          <th>Role</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <b>Mocca</b>
            <br />
            <small>Workspace creator</small>
          </td>
          <td>Owner</td>
          <td>
            <span className="status">Active</span>
          </td>
          <td>
            <ShieldCheck size={14} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
function Billing() {
  return (
    <section className="grid-2">
      <div className="panel">
        <div className="panel-head">
          <h2>Current plan</h2>
          <span className="mode-badge">Mock billing</span>
        </div>
        <p style={{ fontSize: 34, letterSpacing: "-.05em" }}>Free</p>
        <p className="muted" style={{ fontSize: 11 }}>
          No payment has been taken. Connect Stripe and create verified price
          IDs before upgrades can activate.
        </p>
        <Link href="/pricing" className="app-button primary">
          Compare plans
        </Link>
      </div>
      <div className="panel">
        <div className="panel-head">
          <h2>Entitlements</h2>
        </div>
        {[
          ["Create site", "1 of 1"],
          ["Add page", "5 of 3 demo"],
          ["Custom domain", "Unavailable"],
          ["Automation", "Unavailable"],
          ["AI action", "Available"],
        ].map((x) => (
          <div className="check-row" key={x[0]}>
            <span>{x[0]}</span>
            <b style={{ marginLeft: "auto" }}>{x[1]}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
export function PagesTable() {
  return (
    <main className="workspace-main">
      <header className="workspace-head">
        <div>
          <span className="eyebrow">Northstar Website</span>
          <h1>Pages</h1>
          <p>Manage structure, navigation and publishing status.</p>
        </div>
        <Link className="app-button primary" href="/app/sites/demo/editor/home">
          <Plus size={14} />
          New page
        </Link>
      </header>
      <table className="data-table">
        <thead>
          <tr>
            <th>Page</th>
            <th>Path</th>
            <th>Status</th>
            <th>Updated</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {pages.map((x) => (
            <tr key={x[0]}>
              <td>
                <Link href="/app/sites/demo/editor/home">
                  <b>{x[0]}</b>
                </Link>
              </td>
              <td>{x[1]}</td>
              <td>
                <span className={`status ${x[2] === "Draft" ? "draft" : ""}`}>
                  {x[2]}
                </span>
              </td>
              <td>{x[3]}</td>
              <td>
                <MoreHorizontal size={14} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
