"use client";

import Link from "next/link";
import { useMemo, useReducer, useState, useTransition } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Check, Copy, Eye, GripVertical, Laptop, Plus, Redo2, Rocket, Save, Smartphone, Trash2, Undo2 } from "lucide-react";
import { publishPage, rollbackPublishedVersion, savePageDraft, type ActionResult } from "@/app/actions/core";
import { PageRenderer } from "@/components/page-renderer";
import type { DraftBlock, EditorPage } from "@/lib/core/types";

type History = { blocks: DraftBlock[]; past: DraftBlock[][]; future: DraftBlock[][] };
type HistoryAction = { type: "replace"; blocks: DraftBlock[] } | { type: "undo" | "redo" };

function historyReducer(state: History, action: HistoryAction): History {
  if (action.type === "replace") return { blocks: action.blocks, past: [...state.past, state.blocks], future: [] };
  if (action.type === "undo" && state.past.length) return { blocks: state.past.at(-1)!, past: state.past.slice(0, -1), future: [state.blocks, ...state.future] };
  if (action.type === "redo" && state.future.length) return { blocks: state.future[0], past: [...state.past, state.blocks], future: state.future.slice(1) };
  return state;
}

const blockNames: Record<DraftBlock["type"], string> = { header: "Navigation", hero: "Hero", "feature-grid": "Feature grid", text: "Text", cta: "Call to action", divider: "Divider", footer: "Footer" };

function newBlock(type: DraftBlock["type"]): DraftBlock {
  const content: Record<string, unknown> = type === "text"
    ? { eyebrow: "Perspective", heading: "Add a clear point of view.", body: "Write the supporting thought here." }
    : type === "cta"
      ? { headline: "Make the next move unmistakable.", button: "Start a project" }
      : type === "divider" ? {} : { eyebrow: "New section", headline: "A strong new statement.", body: "Add the supporting detail here.", button: "Learn more" };
  return { id: crypto.randomUUID(), type, version: 1, content, style: {}, visibility: { desktop: true, tablet: true, mobile: true } };
}

export function Editor({ page, isDemo }: { page: EditorPage; isDemo: boolean }) {
  const [history, dispatch] = useReducer(historyReducer, { blocks: page.blocks, past: [], future: [] });
  const [selectedId, setSelectedId] = useState<string | undefined>(page.blocks.find((block) => block.type === "hero")?.id || page.blocks[0]?.id);
  const [metaTitle, setMetaTitle] = useState(page.metaTitle);
  const [metaDescription, setMetaDescription] = useState(page.metaDescription);
  const [expectedUpdatedAt, setExpectedUpdatedAt] = useState(page.updatedAt);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [result, setResult] = useState<ActionResult>({ ok: true, message: isDemo ? "Demo edits are local" : "All changes saved" });
  const [pending, startTransition] = useTransition();
  const selected = useMemo(() => history.blocks.find((block) => block.id === selectedId), [history.blocks, selectedId]);
  const dirty = history.past.length > 0 || metaTitle !== page.metaTitle || metaDescription !== page.metaDescription;

  const replaceBlocks = (blocks: DraftBlock[]) => { dispatch({ type: "replace", blocks }); setResult({ ok: true, message: "Unsaved changes" }); };
  const patchContent = (key: string, value: string) => {
    if (!selected) return;
    replaceBlocks(history.blocks.map((block) => block.id === selected.id ? { ...block, version: block.version + 1, content: { ...block.content, [key]: value } } : block));
  };
  const move = (direction: -1 | 1) => {
    const index = history.blocks.findIndex((block) => block.id === selectedId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= history.blocks.length) return;
    const next = [...history.blocks];
    [next[index], next[target]] = [next[target], next[index]];
    replaceBlocks(next);
  };
  const payload = () => ({ pageId: page.id, expectedUpdatedAt, metaTitle, metaDescription, blocks: history.blocks });
  const run = (action: "save" | "publish") => startTransition(async () => {
    const response = action === "save" ? await savePageDraft(payload()) : await publishPage(payload());
    setResult(response);
    if (response.ok && response.updatedAt) setExpectedUpdatedAt(response.updatedAt);
  });

  return (
    <main className="editor-root" id="content">
      <aside className="editor-panel layers-panel">
        <Link className="editor-back" href={`/app/sites/${page.siteId}/pages`}><ArrowLeft size={14} /> {page.siteName}</Link>
        <div className="panel-title">Page layers</div>
        {history.blocks.map((block) => (
          <button className={`component-item ${selectedId === block.id ? "selected" : ""}`} key={block.id} onClick={() => setSelectedId(block.id)}>
            <GripVertical size={12} /><span>{blockNames[block.type]}</span>{selectedId === block.id && <Check size={12} />}
          </button>
        ))}
        <div className="panel-title add-title">Add section</div>
        <div className="block-add-grid">
          {(["text", "feature-grid", "cta", "divider"] as DraftBlock["type"][]).map((type) => (
            <button key={type} onClick={() => { const block = type === "feature-grid" ? { ...newBlock(type), content: { heading: "Three reasons to believe.", items: [{ title: "Clarity", body: "Make the value immediate." }, { title: "Character", body: "Make the brand memorable." }, { title: "Momentum", body: "Make change easier." }] } } : newBlock(type); replaceBlocks([...history.blocks.slice(0, -1), block, ...history.blocks.slice(-1)]); setSelectedId(block.id); }}>
              <Plus size={13} /> {blockNames[type]}
            </button>
          ))}
        </div>
        <div className="editor-version-list">
          <div className="panel-title">Published history</div>
          {page.versions.length ? page.versions.slice(0, 5).map((version) => (
            <button key={version.id} onClick={() => startTransition(async () => setResult(await rollbackPublishedVersion(page.id, version.id)))} disabled={pending || page.publishedVersionId === version.id}>
              <span>Version {version.version}</span><small>{page.publishedVersionId === version.id ? "Live" : "Restore"}</small>
            </button>
          )) : <p>No published versions yet.</p>}
        </div>
      </aside>

      <section className="editor-canvas-wrap">
        <header className="editor-toolbar">
          <div className="editor-doc-title"><span className={dirty ? "dirty-dot" : "saved-dot"} /><b>{page.name}</b><small>{result.message}</small></div>
          <div className="toolbar-cluster">
            <button className="icon-button" disabled={!history.past.length} onClick={() => dispatch({ type: "undo" })} aria-label="Undo"><Undo2 size={14} /></button>
            <button className="icon-button" disabled={!history.future.length} onClick={() => dispatch({ type: "redo" })} aria-label="Redo"><Redo2 size={14} /></button>
          </div>
          <div className="toolbar-cluster viewport-toggle">
            <button className={viewport === "desktop" ? "active" : ""} onClick={() => setViewport("desktop")} aria-label="Desktop preview"><Laptop size={14} /></button>
            <button className={viewport === "mobile" ? "active" : ""} onClick={() => setViewport("mobile")} aria-label="Mobile preview"><Smartphone size={14} /></button>
          </div>
          <div className="toolbar-actions">
            <Link className="app-button" href={`/app/sites/${page.siteId}/pages/${page.id}/preview`}><Eye size={13} /> Preview</Link>
            <button className="app-button" disabled={pending || !dirty} onClick={() => run("save")}><Save size={13} /> {pending ? "Working…" : "Save"}</button>
            <button className="app-button publish-action" disabled={pending} onClick={() => run("publish")}><Rocket size={13} /> Publish</button>
          </div>
        </header>
        {!result.ok && <div className="editor-error" role="alert">{result.message}</div>}
        <div className={`editor-device ${viewport}`}><PageRenderer blocks={history.blocks} preview /></div>
      </section>

      <aside className="editor-panel right inspector-panel">
        <div className="inspector-title"><div><span>Selected block</span><b>{selected ? blockNames[selected.type] : "None"}</b></div>{selected && <span className="schema-pill">Structured</span>}</div>
        {selected && <>
          <div className="tabs"><button className="active">Content</button><button disabled>Style</button><button disabled>Rules</button></div>
          {Object.entries(selected.content).filter(([, value]) => typeof value === "string").map(([key, value]) => (
            <label className="prop-field" key={key}><span>{key.replace(/([A-Z])/g, " $1")}</span>{String(value).length > 50 ? <textarea rows={key === "body" ? 6 : 3} value={String(value)} onChange={(event) => patchContent(key, event.target.value)} /> : <input value={String(value)} onChange={(event) => patchContent(key, event.target.value)} />}</label>
          ))}
          {selected.type === "feature-grid" && <p className="inspector-note">Feature items remain structured. Full collection editing is the next inspector module.</p>}
          <div className="panel-title add-title">Section actions</div>
          <div className="section-actions">
            <button onClick={() => move(-1)} aria-label="Move up"><ArrowUp size={14} /></button><button onClick={() => move(1)} aria-label="Move down"><ArrowDown size={14} /></button>
            <button onClick={() => { const clone = { ...selected, id: crypto.randomUUID(), content: { ...selected.content } }; const index = history.blocks.findIndex((block) => block.id === selected.id); replaceBlocks([...history.blocks.slice(0, index + 1), clone, ...history.blocks.slice(index + 1)]); setSelectedId(clone.id); }} aria-label="Duplicate"><Copy size={14} /></button>
            <button className="danger" disabled={history.blocks.length === 1} onClick={() => { replaceBlocks(history.blocks.filter((block) => block.id !== selected.id)); setSelectedId(history.blocks.find((block) => block.id !== selected.id)?.id); }} aria-label="Delete"><Trash2 size={14} /></button>
          </div>
        </>}
        <div className="seo-panel"><div className="panel-title">Search metadata</div><label className="prop-field"><span>Title · {metaTitle.length}/70</span><input maxLength={70} value={metaTitle} onChange={(event) => setMetaTitle(event.target.value)} /></label><label className="prop-field"><span>Description · {metaDescription.length}/180</span><textarea rows={4} maxLength={180} value={metaDescription} onChange={(event) => setMetaDescription(event.target.value)} /></label></div>
        <p className="inspector-note">No arbitrary HTML or JavaScript. Every publish creates a recoverable, immutable version.</p>
      </aside>
    </main>
  );
}
