import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const experiences = await query(
      `SELECT e.id, e.protocol_slug, e.reported_at, e.anonymity, e.sei_effects, e.context, e.narrative, e.aftereffects, e.created_at,
              p.title as protocol_title
       FROM experiences e
       LEFT JOIN protocols p ON e.protocol_id = p.id
       ORDER BY e.created_at DESC`
    );
    return NextResponse.json({ ok: true, experiences });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
