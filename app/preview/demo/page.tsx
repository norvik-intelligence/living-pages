import Link from "next/link";
export default function Preview() {
  return (
    <main id="content" style={{ background: "#f1efe8", minHeight: "100vh" }}>
      <nav
        style={{
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 7%",
          borderBottom: "1px solid #ddd",
        }}
      >
        <b>Northstar</b>
        <div style={{ display: "flex", gap: 24, fontSize: 13 }}>
          <span>Services</span>
          <span>Work</span>
          <span>About</span>
          <Link href="/app/sites/demo/editor/home">Exit preview</Link>
        </div>
      </nav>
      <section style={{ padding: "16vh 9%" }}>
        <span className="eyebrow">Northstar studio · Draft preview</span>
        <h1 style={{ marginLeft: 0, maxWidth: 850 }}>
          Strategy for brands moving forward.
        </h1>
        <p className="muted" style={{ fontSize: 19, maxWidth: 620 }}>
          We turn complex ambition into clear systems, distinctive identities
          and digital products built to last.
        </p>
        <button className="button dark">Explore our work</button>
      </section>
    </main>
  );
}
