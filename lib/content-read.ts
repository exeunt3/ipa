import { remark } from "remark";
import html from "remark-html";
import { query, queryOne } from "./db";

async function mdToHtml(md: string) {
  if (!md) return "";
  const result = await remark().use(html).process(md);
  return result.toString();
}

type ProtocolRow = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  overview: string;
  steps: string;
  status: string;
  version: number;
  tags: string[];
  categories: string[];
  constraints: Record<string, unknown>;
  safety: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
};

type ExperienceRow = {
  id: number;
  protocol_slug: string;
  protocol_title: string | null;
  reported_at: Date;
  anonymity: string;
  sei_effects: string[];
  context: Record<string, unknown>;
  narrative: string;
  aftereffects: string;
  created_at: Date;
};

export async function listProtocols() {
  const rows = await query<ProtocolRow>(
    `SELECT id, slug, title, summary, overview, steps, status, version, tags, categories, constraints, safety, created_at, updated_at
     FROM protocols
     ORDER BY created_at DESC`
  );
  return rows.map((row) => ({
    slug: row.slug,
    frontMatter: {
      id: `ipa:protocol:${row.slug}`,
      title: row.title,
      summary: row.summary,
      status: row.status,
      version: row.version,
      tags: row.tags || [],
      categories: row.categories || [],
      constraints: row.constraints || {},
      safety: row.safety || {},
      created_at: row.created_at,
      updated_at: row.updated_at,
    },
    overview: row.overview,
    steps: row.steps,
  }));
}

export async function getProtocolBySlug(slug: string) {
  const row = await queryOne<ProtocolRow>(
    `SELECT id, slug, title, summary, overview, steps, status, version, tags, categories, constraints, safety, created_at, updated_at
     FROM protocols
     WHERE slug = $1`,
    [slug]
  );
  if (!row) return null;

  const contentMd = `## Overview\n\n${row.overview || ""}\n\n## Steps\n\n${row.steps || ""}`;

  return {
    slug: row.slug,
    frontMatter: {
      id: `ipa:protocol:${row.slug}`,
      title: row.title,
      summary: row.summary,
      status: row.status,
      version: row.version,
      tags: row.tags || [],
      categories: row.categories || [],
      constraints: row.constraints || {},
      safety: row.safety || {},
      created_at: row.created_at,
      updated_at: row.updated_at,
    },
    contentHtml: await mdToHtml(contentMd),
  };
}

export async function listExperiencesForProtocol(protocolId: string) {
  const slug = protocolId.replace("ipa:protocol:", "");
  const rows = await query<ExperienceRow>(
    `SELECT e.id, e.protocol_slug, e.reported_at, e.anonymity, e.sei_effects, e.context, e.narrative, e.aftereffects, e.created_at,
            p.title as protocol_title
     FROM experiences e
     LEFT JOIN protocols p ON e.protocol_id = p.id
     WHERE e.protocol_slug = $1
     ORDER BY e.created_at DESC`,
    [slug]
  );

  const results = [];
  for (const row of rows) {
    const contentMd = `## Narrative\n\n${row.narrative || ""}\n\n## Aftereffects\n\n${row.aftereffects || ""}`;
    results.push({
      filename: `${row.id}`,
      frontMatter: {
        protocol_id: `ipa:protocol:${row.protocol_slug}`,
        protocol_slug: row.protocol_slug,
        reported_at: row.reported_at,
        anonymity: row.anonymity,
        sei_effects: row.sei_effects || [],
        context: row.context || {},
      },
      contentHtml: await mdToHtml(contentMd),
    });
  }
  return results;
}

export async function listAllExperiences() {
  const rows = await query<ExperienceRow>(
    `SELECT e.id, e.protocol_slug, e.reported_at, e.anonymity, e.sei_effects, e.context, e.narrative, e.aftereffects, e.created_at,
            p.title as protocol_title
     FROM experiences e
     LEFT JOIN protocols p ON e.protocol_id = p.id
     ORDER BY e.created_at DESC`
  );

  const results = [];
  for (const row of rows) {
    const contentMd = `## Narrative\n\n${row.narrative || ""}\n\n## Aftereffects\n\n${row.aftereffects || ""}`;
    results.push({
      id: row.id,
      protocol_slug: row.protocol_slug,
      protocol_title: row.protocol_title,
      reported_at: row.reported_at,
      anonymity: row.anonymity,
      sei_effects: row.sei_effects || [],
      context: row.context || {},
      narrative: row.narrative,
      aftereffects: row.aftereffects,
      contentHtml: await mdToHtml(contentMd),
    });
  }
  return results;
}
