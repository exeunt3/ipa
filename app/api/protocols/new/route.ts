import { NextResponse } from "next/server";
import { ProtocolSchema } from "@/lib/schemas";
import { commitFileToGithub } from "@/lib/github";
import { slugify, toFrontMatterMarkdown } from "@/lib/content";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const today = new Date().toISOString().slice(0, 10);
    const slug = slugify(json.title);

    const protocol = ProtocolSchema.parse({
      id: `ipa:protocol:${slug}`,
      created_at: today,
      updated_at: today,
      ...json,
    });

    const body = `## Overview\n\n${json.overview || ""}\n\n## Steps\n\n${json.steps || ""}\n`;
    const md = toFrontMatterMarkdown(protocol, body);

    await commitFileToGithub({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      branch: process.env.GITHUB_BRANCH || "main",
      path: `content/protocols/${slug}.md`,
      content: md,
      message: `Add protocol: ${protocol.title}`,
    });

    return NextResponse.json({ ok: true, slug });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
