"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldSchema, FieldType } from "@/lib/schemas";

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text",        label: "Text" },
  { value: "number",      label: "Number" },
  { value: "boolean",     label: "Yes/No" },
  { value: "slider",      label: "Slider (range)" },
  { value: "scale",       label: "Scale (buttons)" },
  { value: "dropdown",    label: "Dropdown" },
  { value: "multiselect", label: "Multi-select" },
];

function makeField(type: FieldType): FieldSchema {
  const base = { id: `field_${Date.now()}`, label: "", required: false };
  if (type === "slider" || type === "scale") return { ...base, type, min: 1, max: 10 };
  if (type === "dropdown" || type === "multiselect") return { ...base, type, vocabulary: [] };
  if (type === "number") return { ...base, type };
  return { ...base, type } as FieldSchema;
}

interface FieldEditorProps {
  field: FieldSchema;
  onChange: (updated: FieldSchema) => void;
  onRemove: () => void;
}

function FieldEditor({ field, onChange, onRemove }: FieldEditorProps) {
  function update(patch: Partial<FieldSchema>) {
    onChange({ ...field, ...patch } as FieldSchema);
  }

  return (
    <div className="field-editor">
      <div className="field-editor-row">
        <input
          type="text"
          placeholder="Field label"
          value={field.label}
          onChange={(e) => update({ label: e.target.value })}
          style={{ flex: 1 }}
        />
        <select
          value={field.type}
          onChange={(e) => onChange(makeField(e.target.value as FieldType))}
        >
          {FIELD_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <label className="field-checkbox" style={{ whiteSpace: "nowrap" }}>
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => update({ required: e.target.checked })}
          />
          Required
        </label>
        <button type="button" className="button button-outline" onClick={onRemove}
          style={{ padding: "4px 10px", fontSize: "12px" }}>
          ✕
        </button>
      </div>

      {(field.type === "slider" || field.type === "scale") && (
        <div className="field-editor-row">
          <label>Min</label>
          <input type="number" value={field.min} style={{ width: 70 }}
            onChange={(e) => update({ min: Number(e.target.value) } as Partial<FieldSchema>)} />
          <label>Max</label>
          <input type="number" value={field.max} style={{ width: 70 }}
            onChange={(e) => update({ max: Number(e.target.value) } as Partial<FieldSchema>)} />
        </div>
      )}

      {(field.type === "dropdown" || field.type === "multiselect") && (
        <div className="field-editor-vocab">
          <label className="field-label">
            Vocabulary (one option per line)
          </label>
          <textarea
            rows={4}
            value={(field.vocabulary ?? []).join("\n")}
            onChange={(e) =>
              update({
                vocabulary: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
              } as Partial<FieldSchema>)
            }
            placeholder="option one&#10;option two&#10;option three"
          />
          {field.type === "multiselect" && (
            <div className="field-editor-row">
              <label>Max selections (blank = unlimited)</label>
              <input
                type="number"
                min={1}
                value={(field as { max?: number }).max ?? ""}
                style={{ width: 70 }}
                onChange={(e) =>
                  update({ max: e.target.value ? Number(e.target.value) : undefined } as Partial<FieldSchema>)
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function NewFrameworkForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<FieldSchema[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function addField(type: FieldType) {
    setFields((prev) => [...prev, makeField(type)]);
  }

  function updateField(i: number, updated: FieldSchema) {
    setFields((prev) => prev.map((f, idx) => (idx === i ? updated : f)));
  }

  function removeField(i: number) {
    setFields((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Name is required."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/frameworks/new", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, description, fields }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Submission failed.");
        return;
      }
      router.push(`/frameworks/${data.slug}`);
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
        <label className="field-label">Framework name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Somatic Intensity Report"
          required
        />
      </div>

      <div className="form-field">
        <label className="field-label">Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this framework for? What does it try to capture?"
        />
      </div>

      <div className="form-field">
        <label className="field-label">Fields</label>
        {fields.length === 0 && (
          <p className="muted" style={{ fontSize: "14px" }}>
            No structured fields. Reports using this framework will be free narrative only.
          </p>
        )}
        <div className="field-editors">
          {fields.map((field, i) => (
            <FieldEditor
              key={i}
              field={field}
              onChange={(updated) => updateField(i, updated)}
              onRemove={() => removeField(i)}
            />
          ))}
        </div>
        <div className="add-field-row">
          {FIELD_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              className="button button-outline"
              style={{ fontSize: "12px", padding: "4px 10px" }}
              onClick={() => addField(t.value)}
            >
              + {t.label}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="button" disabled={submitting}>
        {submitting ? "Creating…" : "Create framework"}
      </button>
    </form>
  );
}
