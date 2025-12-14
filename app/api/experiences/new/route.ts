import { NextResponse } from "next/server";
import { ExperienceSchema } from "@/lib/schemas";
import { commitFileToGithub } from "@/lib/github";
import { toFrontMatterMarkdown } from "@/lib/content";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const today = new Date().toISOString().slice(0, 10);

    const exp = ExperienceSchema.parse({
      reported_at: today,
      ...json,
    });

    const body = `## Narrative\n\n${json.narrative}\n\n## Aftereffects\n\n${json.aftereffects || ""}\n`;
    const md = toFrontMatterMarkdown(exp, body);

    const name = `${today}_${exp.protocol_slug}_${Math.random().toString(16).slice(2,6)}.md`;

    await commitFileToGithub({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      branch: process.env.GITHUB_BRANCH || "main",
      path: `content/experiences/${name}`,
      content: md,
      message: `Add experience for ${exp.protocol_slug}`,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
