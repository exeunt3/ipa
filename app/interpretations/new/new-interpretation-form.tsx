"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ReportRow } from "@/lib/queries/reports";

interface Props {
  reports: ReportRow[];
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function NewInterpretationForm({ reports }: Props) {
  const router = useRouter();
  const [name,        setName]        = useState("");
  const [description, setDescription] = useState("");
  const [selected,    setSelected]    = useState<Set<number>>(new Set());
  const [filter,      setFilter]      = useState("");
  const [error,       setError]       = useState("");
  const [submitting,  setSubmitting]  = useState(false);

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filtered = filter.trim()
    ? reports.filter((r) =>
        r.narrative.toLowerCase().includes(filter.toLowerCase()) ||
        r.genre_name?.toLowerCase().includes(filter.toLowerCase()) ||
        (r.sei_effects ?? []).some((e) => e.includes(filter.toLowerCase()))
      )
    : reports;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Name is required."); return; }
    if (!description.trim() || description.trim().length < 10) {
      setError("Description must be at least 10 characters.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/interpretations/new", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          report_ids: Array.from(selected),
          operations: [],
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Submission failed.");
        return;
      }
      router.push(`/interpretations/${data.slug}`);
    } catch {
      setError("Network error.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <div className="form-field">
        <label className="field-label">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Dissolution clusters in psychedelic reports"
          required
        />
      </div>

      <div className="form-field">
        <label className="field-label">Description *</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What patterns or structures are you mapping? What is the organizing principle of this interpretation?"
        />
      </div>

      <div className="form-field">
        <label className="field-label">
          Select reports ({selected.size} selected)
        </label>
        {reports.length === 0 ? (
          <p className="muted">No reports available yet.</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Filter by narrative, genre, or effect…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ marginBottom: "12px" }}
            />
            <div className="report-selector">
              {filtered.map((report) => {
                const isSelected = selected.has(report.id);
                return (
                  <label
                    key={report.id}
                    className={`report-selector-item${isSelected ? " selected" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(report.id)}
                      style={{ display: "none" }}
                    />
                    <div className="report-selector-meta">
                      {report.genre_name && (
                        <span className="pill pill-xs">{report.genre_name}</span>
                      )}
                      <span className="muted" style={{ fontSize: "12px" }}>
                        {formatDate(report.reported_at)}
                      </span>
                    </div>
                    <p className="report-selector-preview">
                      {report.narrative.slice(0, 140)}
                      {report.narrative.length > 140 ? "…" : ""}
                    </p>
                  </label>
                );
              })}
              {filtered.length === 0 && filter && (
                <p className="muted">No reports match &ldquo;{filter}&rdquo;.</p>
              )}
            </div>
          </>
        )}
      </div>

      <button type="submit" className="button" disabled={submitting}>
        {submitting ? "Creating…" : "Create interpretation"}
      </button>
    </form>
  );
}
