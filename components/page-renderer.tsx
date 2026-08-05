import type { DraftBlock } from "@/lib/core/types";

const stringValue = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback;

export function PageRenderer({ blocks, preview = false }: { blocks: DraftBlock[]; preview?: boolean }) {
  return (
    <div className={`living-site ${preview ? "is-preview" : ""}`}>
      {blocks.map((block) => {
        const content = block.content;
        if (block.type === "header") {
          const links = stringValue(content.links)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
            .slice(0, 6);
          return (
            <header className="living-header" key={block.id}>
              <strong>{stringValue(content.brand, "Living")}</strong>
              <nav aria-label="Site navigation">
                {links.map((link) => <span key={link}>{link}</span>)}
              </nav>
              <span className="living-header-cta">Let&apos;s talk</span>
            </header>
          );
        }
        if (block.type === "hero") {
          return (
            <section className="living-hero" key={block.id}>
              <span className="living-kicker">{stringValue(content.eyebrow, "Independent studio")}</span>
              <h1>{stringValue(content.headline, "Build something worth remembering.")}</h1>
              <div className="living-hero-foot">
                <p>{stringValue(content.body)}</p>
                <span className="living-site-button">{stringValue(content.button, "Start a project")} <b>↗</b></span>
              </div>
            </section>
          );
        }
        if (block.type === "feature-grid") {
          const items = Array.isArray(content.items)
            ? (content.items as Array<Record<string, unknown>>).slice(0, 6)
            : [];
          return (
            <section className="living-features" key={block.id}>
              <div className="living-section-label">What we move</div>
              <h2>{stringValue(content.heading, "Built around the work that matters.")}</h2>
              <div className="living-feature-grid">
                {items.map((item, index) => (
                  <article key={`${stringValue(item.title)}-${index}`}>
                    <span>0{index + 1}</span>
                    <h3>{stringValue(item.title, "Discipline")}</h3>
                    <p>{stringValue(item.body)}</p>
                  </article>
                ))}
              </div>
            </section>
          );
        }
        if (block.type === "text") {
          return (
            <section className="living-copy" key={block.id}>
              <span className="living-section-label">{stringValue(content.eyebrow, "Perspective")}</span>
              <h2>{stringValue(content.heading, "A clear point of view, expressed with precision.")}</h2>
              <p>{stringValue(content.body)}</p>
            </section>
          );
        }
        if (block.type === "cta") {
          return (
            <section className="living-cta" key={block.id}>
              <span className="living-section-label">Next move</span>
              <h2>{stringValue(content.headline, "Make the next move unmistakable.")}</h2>
              <span className="living-site-button light">{stringValue(content.button, "Start a project")} <b>↗</b></span>
            </section>
          );
        }
        if (block.type === "divider") return <hr className="living-divider" key={block.id} />;
        if (block.type === "footer") {
          return (
            <footer className="living-footer" key={block.id}>
              <strong>{stringValue(content.brand, "Living")}</strong>
              <p>{stringValue(content.note, "Independent by design.")}</p>
              <span>© {new Date().getFullYear()}</span>
            </footer>
          );
        }
        return null;
      })}
    </div>
  );
}
