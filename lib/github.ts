// lib/github.ts
import crypto from "crypto";

type CommitOptions = {
owner: string;
repo: string;
branch: string;
path: string; // e.g. "content/protocols/my-protocol.md"
content: string; // raw markdown
message: string; // commit message
};

function requireEnv(name: string): string {
const v = process.env[name];
if (!v) throw new Error(`Missing environment variable: ${name}`);
return v;
}

function ghHeaders() {
const token = requireEnv("GITHUB_TOKEN");
return {
Authorization: `Bearer ${token}`,
Accept: "application/vnd.github+json",
"Content-Type": "application/json",
// Optional but nice:
"X-GitHub-Api-Version": "2022-11-28",
"User-Agent": "ipa-wiki",
};
}

function toBase64(input: string) {
return Buffer.from(input, "utf8").toString("base64");
}

// GET the current file (to obtain sha), or return null if not found
async function getFileSha(opts: {
owner: string;
repo: string;
branch: string;
path: string;
}): Promise<string | null> {
const { owner, repo, branch, path } = opts;

const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(
path
)}?ref=${encodeURIComponent(branch)}`;

const res = await fetch(url, { headers: ghHeaders(), method: "GET" });

if (res.status === 404) return null;

if (!res.ok) {
const text = await res.text();
throw new Error(`GitHub read failed: ${res.status} ${res.statusText} — ${text}`);
}

const json = (await res.json()) as { sha?: string };
return json.sha ?? null;
}

/**
* Create or update a file in GitHub repo via Contents API.
* If the file exists, includes its sha to update.
*/
export async function upsertFileToGithub(opts: CommitOptions) {
const { owner, repo, branch, path, content, message } = opts;

const sha = await getFileSha({ owner, repo, branch, path });

const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(
path
)}`;

const body: any = {
message,
content: toBase64(content),
branch,
};

if (sha) body.sha = sha;

const putRes = await fetch(putUrl, {
method: "PUT",
headers: ghHeaders(),
body: JSON.stringify(body),
});

if (!putRes.ok) {
const text = await putRes.text();
throw new Error(
`GitHub commit failed: ${putRes.status} ${putRes.statusText} — ${text}`
);
}

return putRes.json();
}

/** Convenience helper: generate a safe-ish slug */
export function slugify(input: string) {
return input
.trim()
.toLowerCase()
.replace(/['"]/g, "")
.replace(/[^a-z0-9]+/g, "-")
.replace(/^-+|-+$/g, "")
.slice(0, 80);
}

/** Optional: deterministic id */
export function makeId(prefix = "ipa") {
return `${prefix}_${crypto.randomBytes(6).toString("hex")}`;
}