import Link from "next/link";
import { listFrameworks } from "@/lib/queries/frameworks";

export const dynamic = "force-dynamic";

const FIELD_TYPE_LABELS: Record<string, string> = {
  text:        "text",
  number:      "number",
  boolean:     "yes/no",
  slider:      "slider",
  scale:       "scale",
  dropdown:    "dropdown",
  multiselect: "multi-select",
};

export default async function FrameworksPage() {
  const frameworks = await listFrameworks();

  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <h1>Frameworks</h1>
        <p className="page-desc">
          Intake structures for experience reports. Each framework is a set of fields that
          shapes what can be captured and compared. Choose one when submitting,
          or create your own.
        </p>
      </div>

      <div className="heading-actions">
        <Link href="/frameworks/new" className="button">
          New framework
        </Link>
      </div>

      <div className="frameworks-list">
        {frameworks.map((fw) => (
          <Link key={fw.slug} href={`/frameworks/${fw.slug}`} className="framework-card">
            <div className="framework-card-header">
              <h2 className="framework-name">{fw.name}</h2>
              {fw.is_system && <span className="pill pill-dim">system</span>}
            </div>
            <p className="framework-desc">{fw.description}</p>
            <div className="framework-footer">
              <span className="framework-fields-summary">
                {fw.fields.length === 0
                  ? "free form"
                  : fw.fields
                      .map((f) => `${f.label} (${FIELD_TYPE_LABELS[f.type] ?? f.type})`)
                      .join(" · ")}
              </span>
              <span className="framework-usage">
                {fw.usage_count} {fw.usage_count === 1 ? "use" : "uses"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
