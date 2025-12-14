export async function commitFileToGithub(opts: {
  owner: string;
  repo: string;
  branch: string;
  path: string;
  content: string;
  message: string;
}) {
  const { owner, repo, branch, path, content, message } = opts;

  const api = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

  const res = await fetch(api + `?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (res.ok) {
    throw new Error("File already exists");
  }

  const body = {
    message,
    content: Buffer.from(content).toString("base64"),
    branch,
  };

  const put = await fetch(api, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!put.ok) {
    throw new Error("GitHub commit failed");
  }

  return put.json();
}
