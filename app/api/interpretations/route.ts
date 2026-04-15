import { NextResponse } from "next/server";
import { listInterpretations } from "@/lib/queries/interpretations";

export async function GET() {
  try {
    const interpretations = await listInterpretations();
    return NextResponse.json({ ok: true, interpretations });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Failed to load interpretations" }, { status: 500 });
  }
}
