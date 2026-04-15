import { NextResponse } from "next/server";
import { listReports } from "@/lib/queries/reports";

export async function GET() {
  try {
    const reports = await listReports();
    return NextResponse.json({ ok: true, reports });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Failed to load reports" }, { status: 500 });
  }
}
