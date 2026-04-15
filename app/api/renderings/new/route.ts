import { NextRequest, NextResponse } from "next/server";
import { RenderingCreateSchema } from "@/lib/schemas";
import { createRendering } from "@/lib/queries/renderings";
import { getOrCreateContributor } from "@/lib/queries/contributors";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RenderingCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sessionKey = cookieStore.get("iea_session")?.value ?? null;
    const { contributor, sessionKey: newKey, isNew } = await getOrCreateContributor(sessionKey);

    const { id } = await createRendering({
      creator_id:             contributor.id,
      title:                  parsed.data.title,
      description:            parsed.data.description,
      media_type:             parsed.data.media_type,
      url:                    parsed.data.url || null,
      linked_interpretations: parsed.data.linked_interpretations,
    });

    const res = NextResponse.json({ ok: true, id });
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
    return NextResponse.json({ ok: false, error: "Failed to create rendering" }, { status: 500 });
  }
}
