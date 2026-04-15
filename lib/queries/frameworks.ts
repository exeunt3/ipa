import { query, queryOne } from "../db";
import { slugify } from "../content";
import { FieldSchema } from "../schemas";
import { z } from "zod";

export type FrameworkRow = {
  id:          number;
  creator_id:  number | null;
  name:        string;
  slug:        string;
  description: string;
  fields:      FieldSchema[];
  version:     number;
  forked_from: number | null;
  usage_count: number;
  is_system:   boolean;
  created_at:  Date;
  updated_at:  Date;
};

type RawFrameworkRow = Omit<FrameworkRow, "fields"> & { fields: unknown };

function parseFields(raw: unknown): FieldSchema[] {
  try {
    return z.array(FieldSchema).parse(raw);
  } catch {
    return [];
  }
}

function toFrameworkRow(raw: RawFrameworkRow): FrameworkRow {
  return { ...raw, fields: parseFields(raw.fields) };
}

export async function listFrameworks(): Promise<FrameworkRow[]> {
  const rows = await query<RawFrameworkRow>(
    `SELECT id, creator_id, name, slug, description, fields, version, forked_from,
            usage_count, is_system, created_at, updated_at
     FROM frameworks
     ORDER BY usage_count DESC, created_at ASC`
  );
  return rows.map(toFrameworkRow);
}

export async function getFrameworkBySlug(slug: string): Promise<FrameworkRow | null> {
  const raw = await queryOne<RawFrameworkRow>(
    `SELECT id, creator_id, name, slug, description, fields, version, forked_from,
            usage_count, is_system, created_at, updated_at
     FROM frameworks
     WHERE slug = $1`,
    [slug]
  );
  if (!raw) return null;
  return toFrameworkRow(raw);
}

export async function getFrameworkById(id: number): Promise<FrameworkRow | null> {
  const raw = await queryOne<RawFrameworkRow>(
    `SELECT id, creator_id, name, slug, description, fields, version, forked_from,
            usage_count, is_system, created_at, updated_at
     FROM frameworks
     WHERE id = $1`,
    [id]
  );
  if (!raw) return null;
  return toFrameworkRow(raw);
}

export type FrameworkInsert = {
  creator_id:  number | null;
  name:        string;
  description: string;
  fields:      FieldSchema[];
};

export async function createFramework(data: FrameworkInsert): Promise<{ id: number; slug: string }> {
  const slug = slugify(data.name);
  const result = await queryOne<{ id: number; slug: string }>(
    `INSERT INTO frameworks (creator_id, name, slug, description, fields)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, slug`,
    [data.creator_id, data.name, slug, data.description, JSON.stringify(data.fields)]
  );
  if (!result) throw new Error("Framework insert returned no row");
  return result;
}
