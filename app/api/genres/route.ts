import { NextResponse } from "next/server";
import { listGenres } from "@/lib/queries/genres";

export async function GET() {
  try {
    const genres = await listGenres();
    return NextResponse.json({ ok: true, genres });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Failed to load genres" }, { status: 500 });
  }
}
