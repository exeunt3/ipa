import Link from "next/link";
import { listProtocols } from "@/lib/content-read";

export const dynamic = "force-dynamic";

export default async function ProtocolIndexPage() {
  const protocols = await listProtocols();

  return (
    <main className="section-grid">
      <div className="page-heading">
        <h1>Protocols</h1>
        <p>
          Explore the archive of intensive protocols—reproducible methods for 
          engaging with perception, embodiment, and altered states.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Link className="button" href="/protocols/new">
          + New Protocol
        </Link>
      </div>

      {protocols.length === 0 ? (
        <div className="card" style={{ padding: 24, textAlign: "center" }}>
          <p className="muted">No protocols yet. Create your first one!</p>
        </div>
      ) : (
        <div className="section-grid" style={{ gap: 16 }}>
          {protocols.map((protocol) => (
            <Link
              key={protocol.slug}
              href={`/protocols/${protocol.slug}`}
              className="card link-plain"
              style={{ padding: 20, display: "block" }}
            >
              <h3 style={{ margin: 0, marginBottom: 8 }}>{protocol.frontMatter.title}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 14 }}>
                {protocol.frontMatter.summary}
              </p>
              {protocol.frontMatter.tags?.length > 0 && (
                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {protocol.frontMatter.tags.map((tag: string) => (
                    <span className="pill" key={tag} style={{ fontSize: 12 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
