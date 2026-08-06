import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Eye,
  FileText,
  Globe2,
  Palette,
  PenLine,
  Sparkles,
} from "lucide-react";
import { getPages, getSites, getWorkspaceContext } from "@/lib/core/data";

export default async function Dashboard() {
  const context = await getWorkspaceContext();
  const sites = await getSites();
  const site = sites[0];
  const pages = site ? await getPages(site.id) : [];
  const firstPage = pages[0];
  const pageCount = sites.reduce((sum, item) => sum + item.pages, 0);
  const isDemo = context.mode === "demo";
  const websiteHref = site ? `/app/sites/${site.id}/pages` : "/app/sites";
  const editorHref = firstPage ? `/app/sites/${site?.id}/pages/${firstPage.id}/editor` : websiteHref;
  const nextSteps = [
    { icon: PenLine, title: "Shape your homepage", text: "Edit the message visitors see first.", href: editorHref, action: "Open editor" },
    { icon: Palette, title: "Make it feel like you", text: "Set colors, type and writing style once.", href: "/app/brand", action: "Review brand" },
    { icon: FileText, title: "Add useful content", text: "Create services, stories and answers in one place.", href: "/app/content", action: "Open content" },
  ] as const;

  return (
    <main className="workspace-main dashboard-home" id="content">
      {isDemo && (
        <div className="demo-strip" role="status">
          <span><Sparkles size={16} /> You are exploring with sample content. Nothing here affects a real website.</span>
          <Link href="/app/settings">How demo mode works <ArrowRight size={14} /></Link>
        </div>
      )}

      <header className="dashboard-welcome">
        <div>
          <span className="eyebrow">Your workspace</span>
          <h1>Your website, in one clear view.</h1>
          <p>Continue where you left off or choose one simple next step.</p>
        </div>
        <div className="welcome-actions">
          <Link className="app-button" href={site ? `/p/${site.slug}` : "/app/sites"}><Eye size={17} /> Preview</Link>
          <Link className="app-button primary" href={editorHref}><PenLine size={17} /> Edit website</Link>
        </div>
      </header>

      <section className="dashboard-focus" aria-label="Website overview">
        <article className="continue-card">
          <div className="site-visual" aria-hidden="true">
            <div className="mini-browser-bar"><i /><i /><i /></div>
            <div className="mini-site">
              <span>NORTHSTAR</span>
              <strong>Strategy that moves brands forward.</strong>
              <i />
            </div>
          </div>
          <div className="continue-copy">
            <span className="status draft"><i /> Draft preview</span>
            <p className="card-kicker">Continue working</p>
            <h2>{site?.name || "Your first website"}</h2>
            <p>{pageCount} pages · Last demo update today</p>
            <Link className="text-action" href={websiteHref}>Manage website <ArrowRight size={16} /></Link>
          </div>
        </article>

        <aside className="setup-card">
          <div className="setup-top">
            <div><span className="card-kicker">Website setup</span><h2>Almost ready to share</h2></div>
            <strong>60%</strong>
          </div>
          <div className="setup-progress" aria-label="Website setup 60 percent complete"><i /></div>
          <ul>
            <li className="done"><Check size={15} /> Homepage created</li>
            <li className="done"><Check size={15} /> Brand basics added</li>
            <li><span>3</span> Review mobile layout <ChevronRight size={15} /></li>
            <li><span>4</span> Connect your domain <ChevronRight size={15} /></li>
          </ul>
        </aside>
      </section>

      <section className="next-section">
        <div className="section-title-row">
          <div><span className="eyebrow">Suggested next</span><h2>What would you like to do?</h2></div>
          <Link href="/app/sites">See everything <ArrowRight size={15} /></Link>
        </div>
        <div className="next-grid">
          {nextSteps.map(({ icon: Icon, title, text, href, action }) => (
            <Link className="next-card" href={href} key={title}>
              <span className="next-icon"><Icon size={21} /></span>
              <span><strong>{title}</strong><small>{text}</small></span>
              <span className="next-action">{action} <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </section>

      {isDemo ? <section className="dashboard-lower">
        <article className="simple-panel">
          <div className="panel-head"><div><span className="card-kicker">At a glance</span><h2>Website health</h2></div><span className="health-score">Good</span></div>
          <div className="health-summary">
            <div><strong>88</strong><span>Overall score</span></div>
            <ul>
              <li><Check size={15} /> Easy to use on mobile</li>
              <li><Check size={15} /> Strong accessibility</li>
              <li><Globe2 size={15} /> SEO needs a little attention</li>
            </ul>
          </div>
          <Link className="text-action" href="/app/analytics">See full report <ArrowRight size={15} /></Link>
        </article>
        <article className="simple-panel activity-panel">
          <div className="panel-head"><div><span className="card-kicker">Latest changes</span><h2>Recent activity</h2></div></div>
          <div className="timeline-row"><span className="timeline-icon"><Globe2 size={16} /></span><p><b>Homepage published</b><small>Today at 10:42</small></p></div>
          <div className="timeline-row"><span className="timeline-icon"><Palette size={16} /></span><p><b>Brand colors updated</b><small>Yesterday</small></p></div>
          <div className="timeline-row"><span className="timeline-icon"><FileText size={16} /></span><p><b>New service draft added</b><small>2 days ago</small></p></div>
        </article>
      </section> : <section className="simple-panel connected-summary">
        <div><span className="card-kicker">Connected workspace</span><h2>Insights appear after your first published visit.</h2><p>Living Pages records real events only. It never fills a production dashboard with sample traffic.</p></div>
        <Link className="app-button" href="/app/analytics">Open insights <ArrowRight size={15} /></Link>
      </section>}
    </main>
  );
}
