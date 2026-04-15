import { query, queryOne } from "../db";

export type GenreRow = {
  id:           number;
  slug:         string;
  name:         string;
  description:  string;
  created_by:   number | null;
  report_count: number;
  created_at:   Date;
};

export async function listGenres(): Promise<GenreRow[]> {
  return query<GenreRow>(
    `SELECT id, slug, name, description, created_by, report_count, created_at
     FROM genres
     ORDER BY name ASC`
  );
}

export async function getGenreBySlug(slug: string): Promise<GenreRow | null> {
  return queryOne<GenreRow>(
    `SELECT id, slug, name, description, created_by, report_count, created_at
     FROM genres
     WHERE slug = $1`,
    [slug]
  );
}
