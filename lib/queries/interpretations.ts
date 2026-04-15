import { query, queryOne } from "../db";
import { slugify } from "../content";

export type InterpretationRow = {
  id:          number;
  creator_id:  number | null;
  name:        string;
  slug:        string;
  description: string;
  report_ids:  number[];
  operations:  Record<string, unknown>[];
  outputs:     Record<string, unknown>;
  forked_from: number | null;
  created_at:  Date;
  updated_at:  Date;
};

export async function listInterpretations(): Promise<InterpretationRow[]> {
  return query<InterpretationRow>(
    `SELECT id, creator_id, name, slug, description, report_ids, operations, outputs,
            forked_from, created_at, updated_at
     FROM interpretations
     ORDER BY created_at DESC`
  );
}

export async function getInterpretationBySlug(slug: string): Promise<InterpretationRow | null> {
  return queryOne<InterpretationRow>(
    `SELECT id, creator_id, name, slug, description, report_ids, operations, outputs,
            forked_from, created_at, updated_at
     FROM interpretations
     WHERE slug = $1`,
    [slug]
  );
}

export type InterpretationInsert = {
  creator_id:  number | null;
  name:        string;
  description: string;
  report_ids:  number[];
  operations:  Record<string, unknown>[];
};

export async function createInterpretation(
  data: InterpretationInsert
): Promise<{ id: number; slug: string }> {
  const baseSlug = slugify(data.name);
  // Ensure uniqueness by appending a short timestamp suffix if needed
  const slug = `${baseSlug}-${Date.now().toString(36)}`;
  const result = await queryOne<{ id: number; slug: string }>(
    `INSERT INTO interpretations (creator_id, name, slug, description, report_ids, operations)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, slug`,
    [
      data.creator_id,
      data.name,
      slug,
      data.description,
      JSON.stringify(data.report_ids),
      JSON.stringify(data.operations),
    ]
  );
  if (!result) throw new Error("Interpretation insert returned no row");
  return result;
}
