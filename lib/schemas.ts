import { z } from "zod";

export const ProtocolSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  status: z.enum(["draft", "published", "deprecated"]).default("draft"),
  version: z.number().default(1),
  created_at: z.string(),
  updated_at: z.string(),
  tags: z.array(z.string()).default([]),
  constraints: z.object({
    group_size: z.number().optional(),
    duration_minutes: z.number().optional(),
    setting: z.string().optional(),
  }).default({}),
  safety: z.object({
    risk_level: z.enum(["low", "medium", "high"]).default("low"),
    requires_consent: z.boolean().default(true),
  }).default({}),
});

export const ExperienceSchema = z.object({
  protocol_id: z.string(),
  protocol_slug: z.string(),
  reported_at: z.string(),
  anonymity: z.enum(["named", "pseudonymous", "anonymous"]).default("anonymous"),
  core_metrics: z.object({
    intensity: z.number(),
    valence: z.number(),
    coherence: z.number(),
    embodiment: z.number(),
    sociability: z.number(),
    non_ordinary: z.number(),
  }),
  sei_effects: z.array(z.string()).max(7).default([]),
  context: z.record(z.any()).default({}),
});
