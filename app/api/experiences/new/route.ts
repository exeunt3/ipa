import { NextResponse } from "next/server";
import { ExperienceSchema } from "@/lib/schemas";
import { query, queryOne } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const today = new Date().toISOString().slice(0, 10);

    const exp = ExperienceSchema.parse({
      reported_at: today,
      ...json,
    });

    const protocol = await queryOne<{ id: number }>(
      "SELECT id FROM protocols WHERE slug = $1",
      [exp.protocol_slug]
    );

    await query(
      `INSERT INTO experiences (protocol_id, protocol_slug, reported_at, anonymity, sei_effects, context, narrative, aftereffects)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        protocol?.id || null,
        exp.protocol_slug,
        today,
        exp.anonymity,
        exp.sei_effects,
        exp.context,
        json.narrative,
        json.aftereffects || "",
      ]
    );

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
