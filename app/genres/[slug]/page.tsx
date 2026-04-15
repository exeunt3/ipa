import { notFound } from "next/navigation";
import Link from "next/link";
import { getGenreBySlug } from "@/lib/queries/genres";
import { listReportsForGenre } from "@/lib/queries/reports";
import ReportCard from "@/app/components/ReportCard";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GenreDetailPage({ params }: Props) {
  const { slug } = await params;
  const genre = await getGenreBySlug(slug);
  if (!genre) notFound();

  const reports = await listReportsForGenre(genre.id);

  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <div className="page-heading-row">
          <Link href="/genres" className="back-link">← Genres</Link>
        </div>
        <h1>{genre.name}</h1>
        <p className="page-desc">{genre.description}</p>
        <div className="page-heading-meta">
          <span className="pill">{genre.report_count} {genre.report_count === 1 ? "report" : "reports"}</span>
        </div>
      </div>

      <div className="genre-submit-cta">
        <Link href={`/submit?genre=${slug}`} className="button">
          Submit a report
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="empty-state">
          <p>No reports yet. Be the first to contribute.</p>
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
