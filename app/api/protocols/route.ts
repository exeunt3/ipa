import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const protocols = await query(
      `SELECT id, slug, title, summary, overview, steps, status, version, tags, categories, constraints, safety, created_at, updated_at
       FROM protocols
       ORDER BY created_at DESC`
    );
    return NextResponse.json({ ok: true, protocols });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
