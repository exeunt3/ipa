import Link from "next/link";
import { notFound } from "next/navigation";
import { listProtocols } from "@/lib/content-read";
import { PROTOCOL_CATEGORIES, ProtocolCategory } from "@/lib/schemas";

export const dynamic = "force-dynamic";

const SLUG_TO_CATEGORY: Record<string, ProtocolCategory> = {
  "music-sound": "Music & Sound",
  "embodied-practices": "Embodied Practices",
  "environmental-spatial": "Environmental & Spatial Practices",
  "games-media-technology": "Games, Media & Technology",
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = SLUG_TO_CATEGORY[slug];

  if (!category) {
    notFound();
  }

  const allProtocols = await listProtocols();
  const protocols = allProtocols.filter((p) => {
    const cats = p.frontMatter?.categories || [];
    return cats.includes(category);
  });

  protocols.sort((a, b) =>
    String(a.frontMatter?.title || "").localeCompare(String(b.frontMatter?.title || ""))
  );

  return (
    <main className="section-grid">
      <div className="page-heading">
        <Link href="/protocols" className="small-caps" style={{ marginBottom: 8, display: "inline-block" }}>
          ← All Categories
        </Link>
        <h1>{category}</h1>
        <p>
          Protocols in this category explore practices related to {category.toLowerCase()}.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Link className="button" href="/protocols/new">
          + New Protocol
        </Link>
      </div>

      {protocols.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 60 }}>
          <h2 style={{ marginTop: 0, marginBottom: 12 }}>No protocols yet</h2>
          <p style={{ marginBottom: 24, opacity: 0.7 }}>
            Be the first to document a protocol in this category.
          </p>
          <Link className="button" href="/protocols/new" style={{ background: "var(--card-fg)", color: "var(--card-bg)" }}>
            Create Protocol
          </Link>
        </div>
      ) : (
        <div className="protocol-grid">
          {protocols.map((p) => (
            <Link 
              key={p.slug} 
              href={`/protocols/${p.slug}`} 
              className="protocol-card link-plain"
            >
              <div className="protocol-card-header">
                <h3 className="protocol-card-title">
                  {p.frontMatter?.title || p.slug}
                </h3>
                {p.frontMatter?.summary && (
                  <p className="protocol-card-summary">
                    {p.frontMatter.summary}
                  </p>
                )}
              </div>
              {(p.frontMatter?.categories || []).length > 0 && (
                <div className="protocol-card-tags" style={{ marginBottom: 4 }}>
                  {(p.frontMatter?.categories || []).map((c: string) => (
                    <span className="pill" key={c} style={{ background: "var(--card-fg)", color: "var(--card-bg)", fontSize: 10 }}>{c}</span>
                  ))}
                </div>
              )}
              {(p.frontMatter?.tags || []).length > 0 && (
                <div className="protocol-card-tags">
                  {(p.frontMatter?.tags || []).slice(0, 4).map((t: string) => (
                    <span className="pill" key={t}>{t}</span>
                  ))}
                </div>
              )}
              <div className="protocol-card-meta">
                <span>{(p.frontMatter?.tags || []).length} tags</span>
                <span>View →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
