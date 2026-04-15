import { z } from "zod";

// ── FieldSchema: discriminated union for dynamic framework fields ─────────────

const FieldSchemaBase = z.object({
  id:       z.string(),
  label:    z.string(),
  required: z.boolean().default(false),
  hint:     z.string().optional(),
});

export const FieldSchema = z.discriminatedUnion("type", [
  FieldSchemaBase.extend({ type: z.literal("text") }),
  FieldSchemaBase.extend({
    type: z.literal("number"),
    min:  z.number().optional(),
    max:  z.number().optional(),
  }),
  FieldSchemaBase.extend({ type: z.literal("boolean") }),
  FieldSchemaBase.extend({
    type: z.literal("slider"),
    min:  z.number(),
    max:  z.number(),
  }),
  FieldSchemaBase.extend({
    type: z.literal("scale"),
    min:  z.number(),
    max:  z.number(),
  }),
  FieldSchemaBase.extend({
    type:       z.literal("dropdown"),
    vocabulary: z.array(z.string()),
  }),
  FieldSchemaBase.extend({
    type:       z.literal("multiselect"),
    vocabulary: z.array(z.string()),
    max:        z.number().optional(),
  }),
]);

export type FieldSchema = z.infer<typeof FieldSchema>;
export type FieldType = FieldSchema["type"];

// ── Framework schemas ─────────────────────────────────────────────────────────

export const FrameworkCreateSchema = z.object({
  name:        z.string().min(3),
  description: z.string().default(""),
  fields:      z.array(FieldSchema).default([]),
});

// ── Report schemas ────────────────────────────────────────────────────────────

export const ReportSubmitSchema = z.object({
  genre_id:     z.number().int().nullable(),
  framework_id: z.number().int().nullable(),
  mode:         z.enum(["blind", "open"]).default("open"),
  structured:   z.record(z.string(), z.unknown()).default({}),
  narrative:    z.string().min(20),
  aftereffects: z.string().default(""),
  sei_effects:  z.array(z.string()).default([]),
  anonymity:    z.enum(["anonymous", "pseudonymous", "named"]).default("anonymous"),
});

// ── Interpretation schemas ────────────────────────────────────────────────────

export const InterpretationCreateSchema = z.object({
  name:        z.string().min(3),
  description: z.string().min(10),
  report_ids:  z.array(z.number().int()).default([]),
  operations:  z.array(z.record(z.string(), z.unknown())).default([]),
});

// ── Rendering schemas ─────────────────────────────────────────────────────────

export const RenderingCreateSchema = z.object({
  title:                  z.string().min(3),
  description:            z.string().default(""),
  media_type:             z.enum(["image", "video", "3d", "interactive", "audio", "link"]).default("link"),
  url:                    z.string().url().optional().or(z.literal("")),
  linked_interpretations: z.array(z.number().int()).default([]),
});
