import Link from "next/link";
import { listProtocols } from "@/lib/content-read";

export default async function ProtocolIndexPage() {
  const protocols = await listProtocols();

  protocols.sort((a, b) =>
    String(a.frontMatter?.title || "").localeCompare(String(b.frontMatter?.title || ""))
  );

  return (
    <main className="section-grid">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
        <div className="page-heading" style={{ gap: 6 }}>
          <h1 style={{ margin: 0 }}>Protocols</h1>
          <p className="muted" style={{ margin: 0 }}>
            Markdown-first archive. Protocols live in <code>content/protocols</code>.
          </p>
        </div>
        <Link className="button" href="/protocols/new">
          + New protocol
        </Link>
      </div>

      {protocols.length === 0 ? (
        <p className="muted">No protocols yet. Create one.</p>
      ) : (
        <div className="section-grid">
          {protocols.map((p) => (
            <Link key={p.slug} href={`/protocols/${p.slug}`} className="list-card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 700 }}>{p.frontMatter?.title || p.slug}</div>
                <span className="muted" style={{ fontSize: 13 }}>
                  {(p.frontMatter?.tags || []).length} tags
                </span>
              </div>
              <div className="muted" style={{ marginTop: 2 }}>
                {p.frontMatter?.summary || ""}
              </div>
              <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {(p.frontMatter?.tags || []).slice(0, 8).map((t: string) => (
                  <span className="pill" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}