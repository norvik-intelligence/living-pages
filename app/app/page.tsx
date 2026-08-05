import Link from "next/link";
import { ArrowRight, Check, FileText, Globe2, Palette, Plus, RefreshCw, Upload } from "lucide-react";
import { getSites, getWorkspaceContext } from "@/lib/core/data";

const demoHealth = [["Freshness",84],["Brand consistency",72],["SEO",68],["Accessibility",91],["Performance",88],["Content completeness",61]] as const;

export default async function Dashboard() {
  const context = await getWorkspaceContext();
  const sites = await getSites();
  const pageCount = sites.reduce((sum, site) => sum + site.pages, 0);
  const isDemo = context.mode === "demo";
  return (
    <main className="workspace-main" id="content">
      {isDemo && <div className="banner demo-banner"><span><i className="draft-dot" /> Demo workspace · metrics and activity below are clearly staged.</span><Link href="/app/settings">Configuration</Link></div>}
      <header className="workspace-head launch-head">
        <div><span className="eyebrow">Living control room</span><h1>{isDemo ? `Good evening, ${context.user.name}.` : `Welcome back, ${context.user.name}.`}</h1><p>{isDemo ? "Explore the complete governed publishing workflow." : "Your persisted sites and pages are ready for deliberate publishing."}</p></div>
        <div className="actions"><Link className="app-button" href="/app/content"><FileText size={14} /> Content</Link><Link className="app-button primary" href="/app/sites"><Plus size={14} /> New site</Link></div>
      </header>
      <section className="metric-grid">
        <div className="metric"><span>Sites</span><b>{sites.length}</b><small>{isDemo ? "Staged workspace" : "Persisted in this workspace"}</small></div>
        <div className="metric"><span>Pages</span><b>{pageCount}</b><small>Across active sites</small></div>
        <div className="metric"><span>Production mode</span><b className="metric-word">{isDemo ? "Demo" : "Connected"}</b><small>{isDemo ? "No fake writes" : "RLS protected"}</small></div>
        <div className="metric"><span>Publishing rule</span><b className="metric-word">Approval</b><small>Required before every release</small></div>
      </section>
      <section className="dashboard-grid">
        {isDemo ? <div className="panel"><div className="panel-head"><h2>Demonstration site health</h2><span className="mode-badge">Rule-based demo</span></div>{demoHealth.map(([name,value]) => <div className="health-row" key={name}><span>{name}</span><div className="bar"><i style={{width:`${value}%`}} /></div><b>{value}</b></div>)}</div> : <div className="panel operational-panel"><span className="eyebrow">Operational core</span><h2>From draft to a recoverable public version.</h2><p>Every edit is tenant-scoped, schema-validated and saved separately from the version currently serving visitors.</p><Link className="app-button primary" href="/app/sites">Open publishing system <ArrowRight size={12} /></Link></div>}
        <div className="panel"><div className="panel-head"><h2>Launch sequence</h2><span>{isDemo ? "2 of 5" : `${Math.min(3, sites.length ? 3 : 1)} of 5`}</span></div>{[["Workspace protected",true],["Create first site",sites.length>0],["Edit structured page",pageCount>0],["Publish immutable version",sites.some((site)=>site.status==="published")],["Connect primary domain",false]].map(([name,done]) => <div className={`check-row ${done ? "done" : ""}`} key={String(name)}><span className="check-circle">{done && <Check size={11} />}</span><span>{name}</span><ArrowRight size={12} /></div>)}</div>
        {isDemo && <><div className="panel"><div className="panel-head"><h2>Staged activity</h2><span className="mode-badge">Demo</span></div>{[[Upload,"Homepage published","2 hours ago"],[Palette,"Brand colors updated","Yesterday"],[RefreshCw,"RSS source checked","2 days ago"]].map(([Icon,name,time],index) => { const ItemIcon=Icon as typeof Upload; return <div className="activity-row" key={index}><div className="iconbox"><ItemIcon size={14}/></div><span>{String(name)}<small>{String(time)}</small></span></div>; })}</div><div className="panel"><div className="panel-head"><h2>Governance signals</h2><span>3 rules</span></div>{["No autonomous publishing","No arbitrary HTML or JavaScript","Every live version is recoverable"].map((name)=><div className="activity-row" key={name}><div className="iconbox"><Globe2 size={14}/></div><span>{name}<small>Enforced in the Pages core</small></span></div>)}</div></>}
      </section>
    </main>
  );
}
