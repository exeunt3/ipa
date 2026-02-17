"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PROTOCOL_CATEGORIES, ProtocolCategory } from "@/lib/schemas";

type ProtocolStatus = "draft" | "published" | "deprecated";
type RiskLevel = "low" | "medium" | "high";

function slugifyPreview(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export default function NewProtocolForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const [status, setStatus] = useState<ProtocolStatus>("draft");
  const [tags, setTags] = useState<string>("intensive, protocol");
  const [categories, setCategories] = useState<ProtocolCategory[]>([]);

  const [groupSize, setGroupSize] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<string>("");
  const [setting, setSetting] = useState<string>("");

  const [riskLevel, setRiskLevel] = useState<RiskLevel>("low");
  const [requiresConsent, setRequiresConsent] = useState(true);

  const [overview, setOverview] = useState("");
  const [steps, setSteps] = useState("1. \n2. \n3. \n");
  const [variants, setVariants] = useState("");
  const [integration, setIntegration] = useState("");
  const [safetyNotes, setSafetyNotes] = useState("");
  const [lineage, setLineage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slug = slugifyPreview(title);

  function parseTags(raw: string) {
    return raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 32);
  }

  function toggleCategory(cat: ProtocolCategory) {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  async function onSubmit() {
    try {
      setError(null);

      if (title.trim().length < 3) return setError("Title is required.");
      if (summary.trim().length < 10) return setError("Summary is required.");

      setSubmitting(true);

      const payload = {
        title: title.trim(),
        summary: summary.trim(),
        status,
        tags: parseTags(tags),
        categories,
        constraints: {
          ...(groupSize ? { group_size: Number(groupSize) } : {}),
          ...(durationMinutes ? { duration_minutes: Number(durationMinutes) } : {}),
          ...(setting ? { setting } : {}),
        },
        safety: {
          risk_level: riskLevel,
          requires_consent: requiresConsent,
        },
        overview,
        steps,
        variants,
        integration,
        safety_notes: safetyNotes,
        lineage,
      };

      const res = await fetch("/api/protocols/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json?.error || "Failed to create protocol.");

      router.push(`/protocols/${json.slug}`);
      router.refresh();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="section-grid">
      <div className="page-heading" style={{ gap: 6 }}>
        <h1>New Protocol</h1>
        <p className="muted">
          Add a new protocol to the archive.
        </p>
      </div>

      <section style={card}>
        <LabeledInput label="Title (required)" value={title} onChange={setTitle} placeholder="Ritual Walk Loop" />
        <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>
          Slug preview: <code>{slug || "…"}</code>
        </div>
        <TextArea
          label="Summary (required)"
          value={summary}
          onChange={setSummary}
          rows={3}
          placeholder="One paragraph, plain language."
        />

        <div className="grid-two" style={{ marginTop: 12 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={labelStyle}>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value as ProtocolStatus)} style={input}>
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="deprecated">deprecated</option>
            </select>
          </label>
          <LabeledInput label="Tags (comma-separated)" value={tags} onChange={setTags} placeholder="walk, attention, breath" />
        </div>
      </section>

      <section style={card}>
        <div style={{ fontWeight: 700 }}>Categories</div>
        <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Select one or more categories for this protocol.</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
          {PROTOCOL_CATEGORIES.map((cat) => (
            <label
              key={cat}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                border: categories.includes(cat) ? "2px solid var(--card-fg)" : "2px solid var(--line)",
                borderRadius: 8,
                cursor: "pointer",
                background: categories.includes(cat) ? "var(--card-fg)" : "transparent",
                color: categories.includes(cat) ? "var(--card-bg)" : "inherit",
                transition: "all 0.15s ease",
              }}
            >
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                style={{ display: "none" }}
              />
              <span style={{ fontSize: 13 }}>{cat}</span>
            </label>
          ))}
        </div>
      </section>

      <section style={card}>
        <div style={{ fontWeight: 700 }}>Constraints</div>
        <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Light metadata. The body holds the practice.</div>

        <div className="grid-two" style={{ marginTop: 12 }}>
          <LabeledInput label="Group size" value={groupSize} onChange={setGroupSize} placeholder="e.g. 1, 2, 5" />
          <LabeledInput label="Duration (minutes)" value={durationMinutes} onChange={setDurationMinutes} placeholder="e.g. 15, 60, 180" />
        </div>
        <div style={{ marginTop: 12 }}>
          <LabeledInput label="Setting" value={setting} onChange={setSetting} placeholder="indoor / outdoor / urban / forest..." />
        </div>
      </section>

      <section style={card}>
        <div style={{ fontWeight: 700 }}>Safety & boundaries</div>
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={labelStyle}>Risk level</span>
            <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value as RiskLevel)} style={input}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </label>
          <label style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 18 }}>
            <input type="checkbox" checked={requiresConsent} onChange={(e) => setRequiresConsent(e.target.checked)} />
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Requires consent</span>
          </label>
        </div>
      </section>

      <section style={card}>
        <div style={{ fontWeight: 700 }}>Protocol text (Markdown)</div>
        <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>These become sections in the generated file.</div>

        <div style={{ marginTop: 12, display: "grid", gap: 14 }}>
          <TextArea label="Overview" value={overview} onChange={setOverview} rows={6} />
          <TextArea label="Steps" value={steps} onChange={setSteps} rows={10} />
          <TextArea label="Variants (optional)" value={variants} onChange={setVariants} rows={6} />
          <TextArea label="Integration (optional)" value={integration} onChange={setIntegration} rows={5} />
          <TextArea label="Safety notes (optional)" value={safetyNotes} onChange={setSafetyNotes} rows={5} />
          <TextArea label="Lineage / references (optional)" value={lineage} onChange={setLineage} rows={5} />
        </div>
      </section>

      {error ? (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 12, border: "1px solid rgba(200,0,0,0.3)", color: "rgb(140,0,0)" }}>
          {error}
        </div>
      ) : null}

      <div style={{ marginTop: 14 }}>
        <button type="button" onClick={onSubmit} disabled={submitting} className="button">
          {submitting ? "Creating…" : "Create protocol"}
        </button>
      </div>
    </main>
  );
}

const card: React.CSSProperties = {
  marginTop: 12,
  padding: 16,
  border: "1px solid var(--line)",
  borderRadius: 16,
  background: "var(--card)",
  boxShadow: "var(--shadow)",
};

const labelStyle: React.CSSProperties = { fontWeight: 600, fontSize: 13, color: "var(--muted)" };
const input: React.CSSProperties = { width: "100%" };
const textarea: React.CSSProperties = { width: "100%", lineHeight: 1.5 };

function LabeledInput(props: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={labelStyle}>{props.label}</span>
      <input value={props.value} onChange={(e) => props.onChange(e.target.value)} placeholder={props.placeholder} style={input} />
    </label>
  );
}

function TextArea(props: { label: string; value: string; onChange: (v: string) => void; rows: number; placeholder?: string }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={labelStyle}>{props.label}</span>
      <textarea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        rows={props.rows}
        placeholder={props.placeholder}
        style={textarea}
      />
    </label>
  );
}
