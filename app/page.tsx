import Link from "next/link";

export default function HomePage() {
return (
<main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
<h1>Intensive Protocol Archive</h1>
<p style={{ opacity: 0.8, marginTop: 10 }}>
A markdown-first wiki for intensive protocols + experience attestations.
</p>
<p style={{ marginTop: 18 }}>
<Link href="/protocols">Enter the archive →</Link>
</p>
</main>
);
}