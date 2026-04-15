"use client";

import { FieldSchema } from "@/lib/schemas";

interface Props {
  fields: FieldSchema[];
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
}

export default function FrameworkFields({ fields, values, onChange }: Props) {
  if (fields.length === 0) return null;

  function set(id: string, val: unknown) {
    onChange({ ...values, [id]: val });
  }

  return (
    <div className="framework-fields">
      {fields.map((field) => (
        <div key={field.id} className="framework-field">
          <label className="field-label">
            {field.label}
            {field.required && <span className="field-required">*</span>}
          </label>
          {field.hint && <p className="field-hint">{field.hint}</p>}

          {field.type === "text" && (
            <input
              type="text"
              value={(values[field.id] as string) ?? ""}
              onChange={(e) => set(field.id, e.target.value)}
            />
          )}

          {field.type === "number" && (
            <input
              type="number"
              min={field.min}
              max={field.max}
              value={(values[field.id] as number) ?? ""}
              onChange={(e) => set(field.id, e.target.value === "" ? null : Number(e.target.value))}
            />
          )}

          {field.type === "boolean" && (
            <label className="field-checkbox">
              <input
                type="checkbox"
                checked={(values[field.id] as boolean) ?? false}
                onChange={(e) => set(field.id, e.target.checked)}
              />
              <span>Yes</span>
            </label>
          )}

          {field.type === "dropdown" && (
            <select
              value={(values[field.id] as string) ?? ""}
              onChange={(e) => set(field.id, e.target.value)}
            >
              <option value="">— select —</option>
              {field.vocabulary.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          )}

          {field.type === "slider" && (
            <div className="field-slider">
              <span className="slider-bound">{field.min}</span>
              <input
                type="range"
                min={field.min}
                max={field.max}
                value={(values[field.id] as number) ?? field.min}
                onChange={(e) => set(field.id, Number(e.target.value))}
              />
              <span className="slider-bound">{field.max}</span>
              <span className="slider-value">{(values[field.id] as number) ?? field.min}</span>
            </div>
          )}

          {field.type === "scale" && (
            <div className="field-scale">
              {Array.from({ length: field.max - field.min + 1 }, (_, i) => {
                const n = field.min + i;
                const active = (values[field.id] as number) === n;
                return (
                  <button
                    key={n}
                    type="button"
                    className={`scale-btn${active ? " active" : ""}`}
                    onClick={() => set(field.id, n)}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          )}

          {field.type === "multiselect" && (
            <div className="field-multiselect">
              {field.vocabulary.map((v) => {
                const current = (values[field.id] as string[]) ?? [];
                const selected = current.includes(v);
                return (
                  <button
                    key={v}
                    type="button"
                    className={`multiselect-chip${selected ? " selected" : ""}`}
                    onClick={() => {
                      if (selected) {
                        set(field.id, current.filter((x) => x !== v));
                      } else {
                        const maxAllowed = field.max ?? Infinity;
                        if (current.length < maxAllowed) {
                          set(field.id, [...current, v]);
                        }
                      }
                    }}
                  >
                    {v.replace(/_/g, " ")}
                  </button>
                );
              })}
              {field.max && (
                <p className="multiselect-hint">
                  {((values[field.id] as string[]) ?? []).length}/{field.max} selected
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
