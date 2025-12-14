import matter from "gray-matter";

export function toFrontMatterMarkdown(data: Record<string, unknown>, body: string) {
  return matter.stringify(body.trim() + "\n", data);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}
