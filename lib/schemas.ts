import { z } from "zod";

export const PROTOCOL_CATEGORIES = [
  "Music & Sound",
  "Embodied Practices",
  "Environmental & Spatial Practices",
  "Games, Media & Technology",
] as const;

export type ProtocolCategory = (typeof PROTOCOL_CATEGORIES)[number];

export const ProtocolSchema = z.object({
  id: z.string().min(3),
  title: z.string().min(3),
  summary: z.string().min(10),
  status: z.enum(["draft", "published", "deprecated"]).default("draft"),
  version: z.number().int().min(1).default(1),
  created_at: z.string(), // YYYY-MM-DD
  updated_at: z.string(), // YYYY-MM-DD
  tags: z.array(z.string()).default([]),
  categories: z.array(z.enum(PROTOCOL_CATEGORIES)).default([]),

  constraints: z
    .object({
      group_size: z.number().int().min(1).optional(),
      duration_minutes: z.number().int().min(1).optional(),
      setting: z.string().optional(),
    })
    .default({}),

  safety: z
    .object({
      risk_level: z.enum(["low", "medium", "high"]).default("low"),
      requires_consent: z.boolean().default(true),
    })
    .default({ risk_level: "low", requires_consent: true }),
});

export const ExperienceSchema = z.object({
  protocol_id: z.string().min(1).optional(),
  protocol_slug: z.string().min(1),
  reported_at: z.string(), // YYYY-MM-DD

  anonymity: z.enum(["named", "pseudonymous", "anonymous"]).default("anonymous"),

  sei_effects: z.array(z.string()).max(7).default([]),

  context: z.record(z.string(), z.unknown()).default({}),
});
