import { remark } from "remark";
import html from "remark-html";

export async function mdToHtml(md: string): Promise<string> {
  if (!md) return "";
  const result = await remark().use(html).process(md);
  return result.toString();
}
