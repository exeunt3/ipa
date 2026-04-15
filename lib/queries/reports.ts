import { query, queryOne } from "../db";

export type ReportRow = {
  id:             number;
  contributor_id: number | null;
  genre_id:       number | null;
  framework_id:   number | null;
  mode:           "blind" | "open";
  structured:     Record<string, unknown>;
  narrative:      string;
  aftereffects:   string;
  sei_effects:    string[];
  anonymity:      "anonymous" | "pseudonymous" | "named";
  reported_at:    Date;
  created_at:     Date;
  // joined fields (optional, present when queried with joins)
  genre_name?:       string;
  genre_slug?:       string;
  framework_name?:   string;
  framework_slug?:   string;
};

export async function listReports(opts?: {
  genreId?:    number;
  limit?:      number;
  offset?:     number;
}): Promise<ReportRow[]> {
  const { genreId, limit = 50, offset = 0 } = opts ?? {};
  const params: unknown[] = [limit, offset];
  let where = "";
  if (genreId !== undefined) {
    params.push(genreId);
    where = `WHERE r.genre_id = $${params.length}`;
  }
  return query<ReportRow>(
    `SELECT r.id, r.contributor_id, r.genre_id, r.framework_id, r.mode,
            r.structured, r.narrative, r.aftereffects, r.sei_effects,
            r.anonymity, r.reported_at, r.created_at,
            g.name  AS genre_name,  g.slug  AS genre_slug,
            f.name  AS framework_name, f.slug AS framework_slug
     FROM reports r
     LEFT JOIN genres     g ON r.genre_id     = g.id
     LEFT JOIN frameworks f ON r.framework_id = f.id
     ${where}
     ORDER BY r.created_at DESC
     LIMIT $1 OFFSET $2`,
    params
  );
}

export async function listReportsForGenre(genreId: number): Promise<ReportRow[]> {
  return listReports({ genreId });
}

export async function getReport(id: number): Promise<ReportRow | null> {
  return queryOne<ReportRow>(
    `SELECT r.id, r.contributor_id, r.genre_id, r.framework_id, r.mode,
            r.structured, r.narrative, r.aftereffects, r.sei_effects,
            r.anonymity, r.reported_at, r.created_at,
            g.name  AS genre_name,  g.slug  AS genre_slug,
            f.name  AS framework_name, f.slug AS framework_slug
     FROM reports r
     LEFT JOIN genres     g ON r.genre_id     = g.id
     LEFT JOIN frameworks f ON r.framework_id = f.id
     WHERE r.id = $1`,
    [id]
  );
}

export type ReportInsert = {
  contributor_id: number | null;
  genre_id:       number | null;
  framework_id:   number | null;
  mode:           "blind" | "open";
  structured:     Record<string, unknown>;
  narrative:      string;
  aftereffects:   string;
  sei_effects:    string[];
  anonymity:      "anonymous" | "pseudonymous" | "named";
};

export async function createReport(data: ReportInsert): Promise<{ id: number }> {
  const result = await queryOne<{ id: number }>(
    `INSERT INTO reports
       (contributor_id, genre_id, framework_id, mode, structured, narrative, aftereffects, sei_effects, anonymity)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id`,
    [
      data.contributor_id,
      data.genre_id,
      data.framework_id,
      data.mode,
      JSON.stringify(data.structured),
      data.narrative,
      data.aftereffects,
      data.sei_effects,
      data.anonymity,
    ]
  );
  if (!result) throw new Error("Report insert returned no row");
  return result;
}
