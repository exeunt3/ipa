import { NextRequest, NextResponse } from "next/server";
import { InterpretationCreateSchema } from "@/lib/schemas";
import { createInterpretation } from "@/lib/queries/interpretations";
import { getOrCreateContributor } from "@/lib/queries/contributors";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = InterpretationCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sessionKey = cookieStore.get("iea_session")?.value ?? null;
    const { contributor, sessionKey: newKey, isNew } = await getOrCreateContributor(sessionKey);

    const { id, slug } = await createInterpretation({
      creator_id:  contributor.id,
      name:        parsed.data.name,
      description: parsed.data.description,
      report_ids:  parsed.data.report_ids,
      operations:  parsed.data.operations,
    });

    const res = NextResponse.json({ ok: true, id, slug });
    if (isNew) {
      res.cookies.set("iea_session", newKey, {
        httpOnly: true,
        sameSite: "lax",
        maxAge:   60 * 60 * 24 * 365,
        path:     "/",
      });
    }
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Failed to create interpretation" }, { status: 500 });
  }
}
