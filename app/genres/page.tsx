import Link from "next/link";
import { listGenres } from "@/lib/queries/genres";

export const dynamic = "force-dynamic";

export default async function GenresPage() {
  const genres = await listGenres();

  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <h1>Genres</h1>
        <p className="page-desc">
          Experiential domains. Select one to browse reports or contribute your own.
        </p>
      </div>

      <div className="genre-grid">
        {genres.map((genre) => (
          <Link key={genre.slug} href={`/genres/${genre.slug}`} className="genre-card">
            <div className="genre-card-inner">
              <h2 className="genre-name">{genre.name}</h2>
              <p className="genre-desc">{genre.description}</p>
              <div className="genre-footer">
                <span className="genre-count">
                  {genre.report_count} {genre.report_count === 1 ? "report" : "reports"}
                </span>
                <span className="genre-arrow">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
