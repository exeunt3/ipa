import Link from "next/link";
import { listRenderings } from "@/lib/queries/renderings";

export const dynamic = "force-dynamic";

const MEDIA_TYPE_LABELS: Record<string, string> = {
  image:       "image",
  video:       "video",
  "3d":        "3D",
  interactive: "interactive",
  audio:       "audio",
  link:        "link",
};

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function RenderingsPage() {
  const renderings = await listRenderings();

  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <h1>Renderings</h1>
        <p className="page-desc">
          Visual, spatial, and sensory representations of interpreted experiential data.
          Renderings make latent structures perceptible. They compete, fork, and layer.
        </p>
      </div>

      <div className="heading-actions">
        <Link href="/renderings/new" className="button">
          Submit a rendering
        </Link>
      </div>

      {renderings.length === 0 ? (
        <div className="empty-state renderings-empty">
          <p className="empty-state-heading">No renderings yet.</p>
          <p className="muted">
            Renderings are expressive outputs (maps, diagrams, spatial installations, audio
            pieces) that make experiential structures perceptible. Once interpretations exist,
            renderers can begin here.
          </p>
        </div>
      ) : (
        <div className="renderings-grid">
          {renderings.map((r) => (
            <div key={r.id} className="rendering-card">
              {r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rendering-link"
                >
                  <div className="rendering-media-placeholder">
                    <span>{MEDIA_TYPE_LABELS[r.media_type] ?? r.media_type}</span>
                  </div>
                </a>
              )}
              <div className="rendering-body">
                <h2 className="rendering-title">
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noopener noreferrer">
                      {r.title}
                    </a>
                  ) : (
                    r.title
                  )}
                </h2>
                {r.description && <p className="rendering-desc">{r.description}</p>}
                <div className="rendering-footer">
                  <span className="pill pill-dim">{MEDIA_TYPE_LABELS[r.media_type] ?? r.media_type}</span>
                  <span className="muted" style={{ fontSize: "12px" }}>{formatDate(r.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
