import { query, queryOne } from "../db";

export type RenderingRow = {
  id:                     number;
  creator_id:             number | null;
  title:                  string;
  description:            string;
  media_type:             "image" | "video" | "3d" | "interactive" | "audio" | "link";
  url:                    string | null;
  linked_interpretations: number[];
  created_at:             Date;
};

export async function listRenderings(): Promise<RenderingRow[]> {
  return query<RenderingRow>(
    `SELECT id, creator_id, title, description, media_type, url,
            linked_interpretations, created_at
     FROM renderings
     ORDER BY created_at DESC`
  );
}

export type RenderingInsert = {
  creator_id:             number | null;
  title:                  string;
  description:            string;
  media_type:             "image" | "video" | "3d" | "interactive" | "audio" | "link";
  url:                    string | null;
  linked_interpretations: number[];
};

export async function createRendering(data: RenderingInsert): Promise<{ id: number }> {
  const result = await queryOne<{ id: number }>(
    `INSERT INTO renderings (creator_id, title, description, media_type, url, linked_interpretations)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [
      data.creator_id,
      data.title,
      data.description,
      data.media_type,
      data.url,
      JSON.stringify(data.linked_interpretations),
    ]
  );
  if (!result) throw new Error("Rendering insert returned no row");
  return result;
}
