import Link from "next/link";

export default function HomePage() {
  return (
    <main className="section-grid">
      <section className="page-heading">
        <h1>Intensive Protocol Archive</h1>
        <p>
          A calm, Markdown-first wiki for intensive protocols and the experiences they invite.
          Evidence and nuance live side by side.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
          <Link className="button" href="/protocols">
            Enter the archive
          </Link>
          <Link className="ghost-button button" href="/protocols/new">
            Publish a protocol
          </Link>
        </div>
      </section>

      <section className="card stack">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div className="stack" style={{ gap: 6 }}>
            <div style={{ fontWeight: 700 }}>What is this?</div>
            <p className="muted" style={{ margin: 0 }}>
              IPA is a quiet commons for sharing facilitation practices and lived reports. Everything is text-first and
              easy to diff, so changes stay legible over time.
            </p>
          </div>
          <Link className="pill" href="/experiences/new" style={{ textDecoration: "none" }}>
            + Add an experience report
          </Link>
        </div>

        <div className="grid-two">
          <div className="stack" style={{ gap: 6 }}>
            <div style={{ fontWeight: 700 }}>Markdown-native</div>
            <p className="muted" style={{ margin: 0 }}>
              Protocols and narratives live in versioned Markdown with gentle YAML metadata. You can read, edit, or clone
              the repo directly.
            </p>
          </div>
          <div className="stack" style={{ gap: 6 }}>
            <div style={{ fontWeight: 700 }}>Designed for clarity</div>
            <p className="muted" style={{ margin: 0 }}>
              Minimal styling, generous whitespace, and calm colors make it easy to scan tags, stats, and prose without
              noise.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}