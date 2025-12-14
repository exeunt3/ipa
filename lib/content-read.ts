import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");

async function mdToHtml(md: string) {
  const result = await remark().use(html).process(md);
  return result.toString();
}

export async function listProtocols() {
  const dir = path.join(CONTENT, "protocols");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const { data } = matter(raw);
    return { slug: f.replace(".md", ""), frontMatter: data };
  });
}

export async function getProtocolBySlug(slug: string) {
  const file = path.join(CONTENT, "protocols", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  return {
    slug,
    frontMatter: parsed.data,
    contentHtml: await mdToHtml(parsed.content),
  };
}

export async function listExperiencesForProtocol(protocolId: string) {
  const dir = path.join(CONTENT, "experiences");
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const f of fs.readdirSync(dir)) {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const parsed = matter(raw);
    if (parsed.data.protocol_id === protocolId) {
      results.push({
        filename: f,
        frontMatter: parsed.data,
        contentHtml: await mdToHtml(parsed.content),
      });
    }
  }
  return results;
}
