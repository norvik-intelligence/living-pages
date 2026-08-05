"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ArrowRight, Globe2, Plus, X } from "lucide-react";
import { createSite, type ActionResult } from "@/app/actions/core";
import type { PageSummary, SiteSummary } from "@/lib/core/types";

const initial: ActionResult = { ok: false, message: "" };

export function SitesView({ sites, isDemo }: { sites: SiteSummary[]; isDemo: boolean }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createSite, initial);
  return (
    <main className="workspace-main" id="content">
      <header className="workspace-head launch-head">
        <div>
          <span className="eyebrow">Publishing system</span>
          <h1>Your sites</h1>
          <p>Structured pages, controlled versions and one deliberate path to production.</p>
        </div>
        <button className="app-button primary" onClick={() => setOpen(true)}><Plus size={14} /> New site</button>
      </header>
      {isDemo && <div className="banner demo-banner"><span>Demo data · connect Supabase to create and persist sites.</span></div>}
      {sites.length ? (
        <section className="site-grid">
          {sites.map((site, index) => (
            <article className="site-card" key={site.id}>
              <div className={`site-thumbnail theme-${index % 3}`}>
                <span className="site-thumb-logo">{site.name.slice(0, 1)}</span>
                <div><small>{site.name}</small><strong>Make the next move clear.</strong></div>
                <i />
              </div>
              <div className="site-card-body">
                <div>
                  <span className={`status ${site.status === "draft" ? "draft" : ""}`}>{site.status}</span>
                  <h2>{site.name}</h2>
                  <p>{site.pages} {site.pages === 1 ? "page" : "pages"} · /p/{site.slug}</p>
                </div>
                <Link className="app-button" href={`/app/sites/${site.id}/pages`}>Manage <ArrowRight size={12} /></Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="empty"><Globe2 /><h2>Create your first living site</h2><p>Start with a governed homepage and evolve it block by block.</p><button className="app-button primary" onClick={() => setOpen(true)}>Create site</button></div>
      )}
      {open && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section className="app-modal" role="dialog" aria-modal="true" aria-labelledby="new-site-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" aria-label="Close" onClick={() => setOpen(false)}><X size={16} /></button>
            <span className="eyebrow">New foundation</span>
            <h2 id="new-site-title">Create a site</h2>
            <p>We create a structured homepage with safe, editable blocks.</p>
            <form action={action}>
              <label className="prop-field"><span>Site name</span><input name="name" placeholder="Atlas Studio" required minLength={2} maxLength={80} /></label>
              <label className="prop-field"><span>Site type</span><select name="type" defaultValue="business"><option value="business">Business</option><option value="portfolio">Portfolio</option><option value="service">Service</option><option value="agency">Agency</option></select></label>
              {state.message && <p className={state.ok ? "form-success" : "form-error"}>{state.message}</p>}
              <button className="app-button primary wide" disabled={pending || isDemo}>{pending ? "Creating…" : isDemo ? "Connect Supabase to create" : "Create site"}</button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export function PagesView({ siteId, siteName, pages, isDemo }: { siteId: string; siteName: string; pages: PageSummary[]; isDemo: boolean }) {
  return (
    <main className="workspace-main" id="content">
      <header className="workspace-head launch-head">
        <div><span className="eyebrow">Sites / {siteName}</span><h1>Pages</h1><p>Draft freely. Preview privately. Publish only when the version is ready.</p></div>
        <Link className="app-button" href="/app/sites">All sites</Link>
      </header>
      {isDemo && <div className="banner demo-banner"><span>Interactive demo · changes remain local until Supabase is connected.</span></div>}
      <div className="page-list">
        {pages.map((page) => (
          <article className="page-row" key={page.id}>
            <div className="page-icon"><span>{page.name.slice(0, 1)}</span></div>
            <div className="page-info"><h2>{page.name} {page.isHomepage && <small>Homepage</small>}</h2><p>/{page.slug === "home" ? "" : page.slug} · {page.status}</p></div>
            <div className="page-version"><span>Published version</span><b>{page.publishedVersionId ? "Protected snapshot" : "Not published"}</b></div>
            <Link className="app-button primary" href={`/app/sites/${siteId}/pages/${page.id}/editor`}>Open editor <ArrowRight size={12} /></Link>
          </article>
        ))}
      </div>
    </main>
  );
}
