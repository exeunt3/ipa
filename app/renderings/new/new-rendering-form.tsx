"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { InterpretationRow } from "@/lib/queries/interpretations";

interface Props {
  interpretations: InterpretationRow[];
}

const MEDIA_TYPES = [
  { value: "link",        label: "Link / URL" },
  { value: "image",       label: "Image" },
  { value: "video",       label: "Video" },
  { value: "audio",       label: "Audio" },
  { value: "3d",          label: "3D / Spatial" },
  { value: "interactive", label: "Interactive" },
];

export default function NewRenderingForm({ interpretations }: Props) {
  const router = useRouter();
  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [mediaType,   setMediaType]   = useState("link");
  const [url,         setUrl]         = useState("");
  const [linked,      setLinked]      = useState<Set<number>>(new Set());
  const [error,       setError]       = useState("");
  const [submitting,  setSubmitting]  = useState(false);

  function toggleInterp(id: number) {
    setLinked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim()) { setError("Title is required."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/renderings/new", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          media_type:             mediaType,
          url:                    url || undefined,
          linked_interpretations: Array.from(linked),
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Submission failed.");
        return;
      }
      router.push("/renderings");
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
        <label className="field-label">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Topography of Ego Dissolution"
          required
        />
      </div>

      <div className="form-field">
        <label className="field-label">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What does this rendering represent? What data or interpretations does it draw from? How was it made?"
        />
      </div>

      <div className="form-field">
        <label className="field-label">Media type</label>
        <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
          {MEDIA_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label className="field-label">URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
        />
      </div>

      {interpretations.length > 0 && (
        <div className="form-field">
          <label className="field-label">Linked interpretations ({linked.size} selected)</label>
          <div className="report-selector">
            {interpretations.map((interp) => {
              const isSelected = linked.has(interp.id);
              return (
                <label
                  key={interp.id}
                  className={`report-selector-item${isSelected ? " selected" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleInterp(interp.id)}
                    style={{ display: "none" }}
                  />
                  <strong>{interp.name}</strong>
                  <span className="muted" style={{ fontSize: "13px", display: "block" }}>
                    {interp.description.slice(0, 100)}{interp.description.length > 100 ? "…" : ""}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <button type="submit" className="button" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit rendering"}
      </button>
    </form>
  );
}
