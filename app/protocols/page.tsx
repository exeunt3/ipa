import Link from "next/link";
import { listProtocols } from "@/lib/content-read";

export default async function ProtocolIndexPage() {
const protocols = await listProtocols();

protocols.sort((a, b) =>
String(a.frontMatter?.title || "").localeCompare(String(b.frontMatter?.title || ""))
);

return (
<main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
<h1 style={{ margin: 0 }}>Protocols</h1>
<Link href="/protocols/new">+ New protocol</Link>
</div>

<p style={{ opacity: 0.8, marginTop: 10 }}>
Markdown-first archive. Protocols live in <code>content/protocols</code>.
</p>

{protocols.length === 0 ? (
<p style={{ opacity: 0.75 }}>No protocols yet. Create one.</p>
) : (
<div style={{ display: "grid", gap: 12, marginTop: 16 }}>
{protocols.map((p) => (
<Link
key={p.slug}
href={`/protocols/${p.slug}`}
style={{
display: "block",
padding: 14,
border: "1px solid rgba(0,0,0,0.12)",
borderRadius: 12,
textDecoration: "none",
color: "inherit",
background: "white",
}}
>
<div style={{ fontWeight: 700 }}>{p.frontMatter?.title || p.slug}</div>
<div style={{ opacity: 0.75, marginTop: 6 }}>{p.frontMatter?.summary || ""}</div>
<div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
{(p.frontMatter?.tags || []).slice(0, 8).map((t: string) => (
<span
key={t}
style={{
fontSize: 12,
padding: "2px 8px",
border: "1px solid rgba(0,0,0,0.12)",
borderRadius: 999,
opacity: 0.75,
}}
>
{t}
</span>
))}
</div>
</Link>
))}
</div>
)}
</main>
);
}