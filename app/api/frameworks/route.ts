import { NextResponse } from "next/server";
import { listFrameworks } from "@/lib/queries/frameworks";

export async function GET() {
  try {
    const frameworks = await listFrameworks();
    return NextResponse.json({ ok: true, frameworks });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Failed to load frameworks" }, { status: 500 });
  }
}
