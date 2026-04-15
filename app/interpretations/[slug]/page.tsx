import { notFound } from "next/navigation";
import Link from "next/link";
import { getInterpretationBySlug } from "@/lib/queries/interpretations";
import { getReport } from "@/lib/queries/reports";
import ReportCard from "@/app/components/ReportCard";
import type { ReportRow } from "@/lib/queries/reports";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function InterpretationDetailPage({ params }: Props) {
  const { slug } = await params;
  const interpretation = await getInterpretationBySlug(slug);
  if (!interpretation) notFound();

  const reportIds = (interpretation.report_ids as number[]) ?? [];
  const reports: ReportRow[] = [];
  for (const id of reportIds) {
    const r = await getReport(id);
    if (r) reports.push(r);
  }

  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <div className="page-heading-row">
          <Link href="/interpretations" className="back-link">← Interpretations</Link>
        </div>
        <h1>{interpretation.name}</h1>
        <div className="page-heading-meta">
          <span className="pill">{reports.length} {reports.length === 1 ? "report" : "reports"}</span>
          <span className="muted" style={{ fontSize: "12px" }}>{formatDate(interpretation.created_at)}</span>
        </div>
        <p className="page-desc">{interpretation.description}</p>
      </div>

      {reports.length === 0 ? (
        <div className="empty-state">
          <p>No reports attached to this interpretation.</p>
        </div>
      ) : (
        <div className="reports-list">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </main>
  );
}
