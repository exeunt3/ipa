import { NextResponse } from "next/server";
import { listRenderings } from "@/lib/queries/renderings";

export async function GET() {
  try {
    const renderings = await listRenderings();
    return NextResponse.json({ ok: true, renderings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Failed to load renderings" }, { status: 500 });
  }
}
