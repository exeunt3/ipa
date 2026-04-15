import Link from "next/link";
import { listInterpretations } from "@/lib/queries/interpretations";

export const dynamic = "force-dynamic";

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function InterpretationsPage() {
  const interpretations = await listInterpretations();

  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <h1>Interpretations</h1>
        <p className="page-desc">
          User-generated structures that organize reports into patterns: clusters,
          proto-places, taxonomies. No single interpretation is authoritative; they coexist,
          fork, and compete.
        </p>
      </div>

      <div className="heading-actions">
        <Link href="/interpretations/new" className="button">
          New interpretation
        </Link>
      </div>

      {interpretations.length === 0 ? (
        <div className="empty-state">
          <p>No interpretations yet. Once there are enough reports, you can start organizing them here.</p>
        </div>
      ) : (
        <div className="interpretations-list">
          {interpretations.map((interp) => (
            <Link
              key={interp.slug}
              href={`/interpretations/${interp.slug}`}
              className="interpretation-card"
            >
              <h2 className="interpretation-name">{interp.name}</h2>
              <p className="interpretation-desc">{interp.description}</p>
              <div className="interpretation-footer">
                <span className="pill pill-dim">
                  {(interp.report_ids as number[]).length} {(interp.report_ids as number[]).length === 1 ? "report" : "reports"}
                </span>
                <span className="muted" style={{ fontSize: "12px" }}>{formatDate(interp.created_at)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
