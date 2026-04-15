import { notFound } from "next/navigation";
import Link from "next/link";
import { getFrameworkBySlug } from "@/lib/queries/frameworks";
import { listReports } from "@/lib/queries/reports";
import ReportCard from "@/app/components/ReportCard";
import FrameworkFields from "@/app/components/FrameworkFields";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

function FieldPreview({ fw }: { fw: { fields: import("@/lib/schemas").FieldSchema[] } }) {
  return <FrameworkFields fields={fw.fields} values={{}} onChange={() => {}} />;
}

export default async function FrameworkDetailPage({ params }: Props) {
  const { slug } = await params;
  const framework = await getFrameworkBySlug(slug);
  if (!framework) notFound();

  const allReports = await listReports({ limit: 100 });
  const reports = allReports.filter((r) => r.framework_id === framework.id);

  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <div className="page-heading-row">
          <Link href="/frameworks" className="back-link">← Frameworks</Link>
        </div>
        <h1>{framework.name}</h1>
        <div className="page-heading-meta">
          {framework.is_system && <span className="pill pill-dim">system</span>}
          <span className="pill">{framework.usage_count} {framework.usage_count === 1 ? "use" : "uses"}</span>
          <span className="pill">{framework.fields.length} {framework.fields.length === 1 ? "field" : "fields"}</span>
        </div>
        <p className="page-desc">{framework.description}</p>
      </div>

      {framework.fields.length > 0 ? (
        <section className="framework-preview-section">
          <h3>Fields preview</h3>
          <div className="framework-preview">
            <FieldPreview fw={framework} />
          </div>
        </section>
      ) : (
        <section className="framework-preview-section">
          <p className="muted">This framework has no structured fields; pure narrative.</p>
        </section>
      )}

      <div className="genre-submit-cta">
        <Link href={`/submit?framework=${slug}`} className="button">
          Use this framework
        </Link>
      </div>

      {reports.length > 0 && (
        <section>
          <h3>Reports using this framework</h3>
          <div className="reports-list">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
