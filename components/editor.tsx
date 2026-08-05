"use client";
import { useReducer, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Eye,
  GripVertical,
  Heading,
  Image,
  LayoutGrid,
  Minus,
  Plus,
  Redo2,
  Save,
  Trash2,
  Type,
  Undo2,
} from "lucide-react";
type State = {
  headline: string;
  body: string;
  history: { headline: string; body: string }[];
  future: { headline: string; body: string }[];
};
type Action =
  | { type: "edit"; key: "headline" | "body"; value: string }
  | { type: "undo" | "redo" };
function reducer(s: State, a: Action): State {
  if (a.type === "edit")
    return {
      ...s,
      history: [...s.history, { headline: s.headline, body: s.body }],
      future: [],
      [a.key]: a.value,
    };
  if (a.type === "undo" && s.history.length) {
    const prev = s.history.at(-1)!;
    return {
      ...prev,
      history: s.history.slice(0, -1),
      future: [{ headline: s.headline, body: s.body }, ...s.future],
    };
  }
  if (a.type === "redo" && s.future.length) {
    const next = s.future[0];
    return {
      ...next,
      history: [...s.history, { headline: s.headline, body: s.body }],
      future: s.future.slice(1),
    };
  }
  return s;
}
export function Editor() {
  const [state, dispatch] = useReducer(reducer, {
    headline: "Strategy for brands moving forward.",
    body: "We turn complex ambition into clear systems, distinctive identities and digital products built to last.",
    history: [],
    future: [],
  });
  const [saved, setSaved] = useState(true);
  const update = (key: "headline" | "body", value: string) => {
    dispatch({ type: "edit", key, value });
    setSaved(false);
  };
  return (
    <main className="editor-root" id="content">
      <aside className="editor-panel">
        <div className="panel-title">Page layers</div>
        {[
          "Navigation",
          "Hero",
          "Services",
          "Selected work",
          "Testimonial",
          "Call to action",
          "Footer",
        ].map((x, i) => (
          <div className="component-item" key={x}>
            <GripVertical size={12} />
            <span style={{ flex: 1 }}>{x}</span>
            {i === 1 && <Eye size={11} />}
          </div>
        ))}
        <div className="panel-title" style={{ marginTop: 25 }}>
          Add component
        </div>
        {[
          [Heading, "Heading"],
          [Type, "Text"],
          [Image, "Image"],
          [LayoutGrid, "Feature grid"],
          [Minus, "Divider"],
        ].map(([I, n]) => {
          const Icon = I as typeof Type;
          return (
            <button
              className="component-item"
              style={{ width: "100%" }}
              key={String(n)}
            >
              <Icon size={12} />
              {String(n)}
              <Plus size={11} style={{ marginLeft: "auto" }} />
            </button>
          );
        })}
      </aside>
      <section className="editor-canvas-wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginBottom: 15,
          }}
        >
          <button
            className="app-button"
            disabled={!state.history.length}
            onClick={() => dispatch({ type: "undo" })}
          >
            <Undo2 size={12} />
          </button>
          <button
            className="app-button"
            disabled={!state.future.length}
            onClick={() => dispatch({ type: "redo" })}
          >
            <Redo2 size={12} />
          </button>
          <button className="app-button primary" onClick={() => setSaved(true)}>
            <Save size={12} />
            {saved ? "Saved" : "Save changes"}
          </button>
        </div>
        <div className="editor-canvas">
          <nav className="editor-nav">
            <span>Northstar</span>
            <div>
              <span>Services</span>
              <span>Work</span>
              <span>About</span>
              <span>Contact</span>
            </div>
          </nav>
          <section className="editor-hero">
            <span className="eyebrow">Northstar studio</span>
            <h1>{state.headline}</h1>
            <p>{state.body}</p>
            <button className="button dark small">Explore our work</button>
          </section>
          <section className="editor-features">
            {[
              [
                "Direction",
                "A clear strategy that aligns teams and decisions.",
              ],
              [
                "Identity",
                "A distinctive system built for recognition and growth.",
              ],
              [
                "Experience",
                "Digital products that make the strategy tangible.",
              ],
            ].map((x) => (
              <div key={x[0]}>
                <span className="num">Structured service</span>
                <h3>{x[0]}</h3>
                <p>{x[1]}</p>
              </div>
            ))}
          </section>
        </div>
      </section>
      <aside className="editor-panel right">
        <div className="tabs" style={{ gap: 13 }}>
          <button className="active">Content</button>
          <button>Style</button>
          <button>SEO</button>
        </div>
        <div className="prop-field">
          <label>Eyebrow</label>
          <input defaultValue="Northstar studio" />
        </div>
        <div className="prop-field">
          <label>Headline</label>
          <textarea
            rows={4}
            value={state.headline}
            onChange={(e) => update("headline", e.target.value)}
          />
        </div>
        <div className="prop-field">
          <label>Description</label>
          <textarea
            rows={6}
            value={state.body}
            onChange={(e) => update("body", e.target.value)}
          />
        </div>
        <div className="prop-field">
          <label>Button label</label>
          <input defaultValue="Explore our work" />
        </div>
        <div className="panel-title" style={{ marginTop: 22 }}>
          Section actions
        </div>
        <div className="actions">
          <button className="app-button" aria-label="Move up">
            <ArrowUp size={12} />
          </button>
          <button className="app-button" aria-label="Move down">
            <ArrowDown size={12} />
          </button>
          <button className="app-button" aria-label="Duplicate">
            <Copy size={12} />
          </button>
          <button className="app-button" aria-label="Delete">
            <Trash2 size={12} />
          </button>
        </div>
        <p className="muted" style={{ fontSize: 10, marginTop: 20 }}>
          Structured block schema · arbitrary HTML and JavaScript are not
          accepted.
        </p>
      </aside>
    </main>
  );
}
