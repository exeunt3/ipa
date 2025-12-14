import { z } from "zod";

export const ProtocolSchema = z.object({
  id: z.string().min(3),
  title: z.string().min(3),
  summary: z.string().min(10),
  status: z.enum(["draft", "published", "deprecated"]).default("draft"),
  version: z.number().int().min(1).default(1),
  created_at: z.string(), // YYYY-MM-DD
  updated_at: z.string(), // YYYY-MM-DD
  tags: z.array(z.string()).default([]),

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
  protocol_id: z.string().min(3),
  protocol_slug: z.string().min(1),
  reported_at: z.string(), // YYYY-MM-DD

  anonymity: z.enum(["named", "pseudonymous", "anonymous"]).default("anonymous"),

  core_metrics: z.object({
    intensity: z.number().int().min(1).max(5),
    valence: z.number().int().min(-2).max(2),
    coherence: z.number().int().min(1).max(5),
    embodiment: z.number().int().min(1).max(5),
    sociability: z.number().int().min(1).max(5),
    non_ordinary: z.number().int().min(1).max(5),
  }),

  sei_effects: z.array(z.string()).max(7).default([]),

  context: z.record(z.string(), z.unknown()).default({}),
});
