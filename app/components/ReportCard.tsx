import { ReportRow } from "@/lib/queries/reports";

interface Props {
  report: ReportRow;
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", {
    year:  "numeric",
    month: "short",
    day:   "numeric",
  });
}

export default function ReportCard({ report }: Props) {
  const structuredEntries = Object.entries(report.structured ?? {}).filter(
    ([k, v]) => k !== "sei_effects" && v !== null && v !== ""
  );

  return (
    <details className="report-card">
      <summary className="report-summary">
        <div className="report-meta">
          <span className="pill">{report.anonymity}</span>
          {report.mode === "blind" && <span className="pill pill-dim">blind</span>}
          {report.framework_name && (
            <span className="pill pill-dim">{report.framework_name}</span>
          )}
          <span className="report-date">{formatDate(report.reported_at)}</span>
        </div>
        {report.sei_effects && report.sei_effects.length > 0 && (
          <div className="report-effects">
            {report.sei_effects.slice(0, 5).map((e) => (
              <span key={e} className="pill pill-sm">
                {e.replace(/_/g, " ")}
              </span>
            ))}
            {report.sei_effects.length > 5 && (
              <span className="pill pill-sm pill-dim">
                +{report.sei_effects.length - 5}
              </span>
            )}
          </div>
        )}
        {structuredEntries.length > 0 && (
          <div className="report-context">
            {structuredEntries.map(([k, v]) => (
              <span key={k} className="context-item">
                <span className="context-key">{k.replace(/_/g, " ")}</span>{" "}
                <span className="context-val">{String(v)}</span>
              </span>
            ))}
          </div>
        )}
        <p className="report-preview">
          {report.narrative.slice(0, 200)}
          {report.narrative.length > 200 ? "…" : ""}
        </p>
      </summary>

      <div className="report-body">
        <div className="report-section">
          <h4>Narrative</h4>
          <p>{report.narrative}</p>
        </div>
        {report.aftereffects && (
          <div className="report-section">
            <h4>Aftereffects</h4>
            <p>{report.aftereffects}</p>
          </div>
        )}
        {structuredEntries.length > 0 && (
          <div className="report-section">
            <h4>Structured data</h4>
            <dl className="report-dl">
              {structuredEntries.map(([k, v]) => (
                <div key={k} className="report-dl-row">
                  <dt>{k.replace(/_/g, " ")}</dt>
                  <dd>{Array.isArray(v) ? (v as string[]).join(", ") : String(v)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </details>
  );
}
