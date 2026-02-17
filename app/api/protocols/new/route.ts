import { NextResponse } from "next/server";
import { ProtocolSchema } from "@/lib/schemas";
import { query } from "@/lib/db";
import { slugify } from "@/lib/content";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const slug = slugify(json.title);

    const protocol = ProtocolSchema.parse({
      id: `ipa:protocol:${slug}`,
      created_at: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString().slice(0, 10),
      ...json,
    });

    await query(
      `INSERT INTO protocols (slug, title, summary, overview, steps, status, version, tags, categories, constraints, safety)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (slug) DO UPDATE SET
         title = EXCLUDED.title,
         summary = EXCLUDED.summary,
         overview = EXCLUDED.overview,
         steps = EXCLUDED.steps,
         status = EXCLUDED.status,
         version = EXCLUDED.version,
         tags = EXCLUDED.tags,
         categories = EXCLUDED.categories,
         constraints = EXCLUDED.constraints,
         safety = EXCLUDED.safety,
         updated_at = CURRENT_TIMESTAMP`,
      [
        slug,
        protocol.title,
        protocol.summary,
        json.overview || "",
        json.steps || "",
        protocol.status,
        protocol.version,
        protocol.tags,
        protocol.categories,
        protocol.constraints,
        protocol.safety,
      ]
    );

    return NextResponse.json({ ok: true, slug });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
