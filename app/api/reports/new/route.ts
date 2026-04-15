import { NextRequest, NextResponse } from "next/server";
import { ReportSubmitSchema } from "@/lib/schemas";
import { createReport } from "@/lib/queries/reports";
import { getFrameworkById } from "@/lib/queries/frameworks";
import { getOrCreateContributor } from "@/lib/queries/contributors";
import { cookies } from "next/headers";
import { z } from "zod";
import { FieldSchema } from "@/lib/schemas";

function validateStructuredFields(
  fields: FieldSchema[],
  structured: Record<string, unknown>
): string[] {
  const errors: string[] = [];
  for (const field of fields) {
    if (!field.required) continue;
    const val = structured[field.id];
    if (val === undefined || val === null || val === "") {
      errors.push(`"${field.label}" is required`);
    }
  }
  return errors;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ReportSubmitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    // Validate structured fields against framework schema if framework selected
    if (data.framework_id) {
      const framework = await getFrameworkById(data.framework_id);
      if (framework) {
        const fieldErrors = validateStructuredFields(framework.fields, data.structured);
        if (fieldErrors.length > 0) {
          return NextResponse.json({ ok: false, errors: { fieldErrors } }, { status: 400 });
        }
      }
    }

    const cookieStore = await cookies();
    const sessionKey = cookieStore.get("iea_session")?.value ?? null;
    const { contributor, sessionKey: newKey, isNew } = await getOrCreateContributor(sessionKey);

    // Extract sei_effects from structured if using SEI framework
    const seiEffects =
      data.sei_effects.length > 0
        ? data.sei_effects
        : Array.isArray(data.structured["sei_effects"])
          ? (data.structured["sei_effects"] as string[])
          : [];

    const { id } = await createReport({
      contributor_id: contributor.id,
      genre_id:       data.genre_id,
      framework_id:   data.framework_id,
      mode:           data.mode,
      structured:     data.structured,
      narrative:      data.narrative,
      aftereffects:   data.aftereffects,
      sei_effects:    seiEffects,
      anonymity:      data.anonymity,
    });

    const res = NextResponse.json({ ok: true, reportId: id });
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
    return NextResponse.json({ ok: false, error: "Failed to submit report" }, { status: 500 });
  }
}
