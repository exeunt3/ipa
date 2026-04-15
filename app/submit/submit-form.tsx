"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FrameworkFields from "@/app/components/FrameworkFields";
import type { GenreRow } from "@/lib/queries/genres";
import type { FrameworkRow } from "@/lib/queries/frameworks";

type Step = "genre" | "framework" | "compose" | "done";

interface Props {
  genres:     GenreRow[];
  frameworks: FrameworkRow[];
}

const ANONYMITY_OPTIONS = [
  { value: "anonymous",     label: "Anonymous",     desc: "No identity attached." },
  { value: "pseudonymous",  label: "Pseudonymous",  desc: "Session identifier only." },
  { value: "named",         label: "Named",         desc: "Your handle, if set." },
];

export default function SubmitForm({ genres, frameworks }: Props) {
  const router      = useRouter();
  const searchParams = useSearchParams();

  const [step,        setStep]        = useState<Step>("genre");
  const [genreId,     setGenreId]     = useState<number | null>(null);
  const [frameworkId, setFrameworkId] = useState<number | null>(null);
  const [mode,        setMode]        = useState<"blind" | "open">("open");
  const [structured,  setStructured]  = useState<Record<string, unknown>>({});
  const [narrative,   setNarrative]   = useState("");
  const [aftereffects,setAftereffects]= useState("");
  const [anonymity,   setAnonymity]   = useState<"anonymous" | "pseudonymous" | "named">("anonymous");
  const [error,       setError]       = useState("");
  const [submitting,  setSubmitting]  = useState(false);

  // Pre-select genre/framework from URL params
  useEffect(() => {
    const genreSlug = searchParams.get("genre");
    const fwSlug    = searchParams.get("framework");
    if (genreSlug) {
      const g = genres.find((g) => g.slug === genreSlug);
      if (g) { setGenreId(g.id); setStep("framework"); }
    }
    if (fwSlug) {
      const fw = frameworks.find((f) => f.slug === fwSlug);
      if (fw) { setFrameworkId(fw.id); }
    }
  }, []);

  const selectedGenre     = genres.find((g) => g.id === genreId) ?? null;
  const selectedFramework = frameworks.find((f) => f.id === frameworkId) ?? null;

  // ── Step indicators ────────────────────────────────────────────────────────

  const STEPS: { key: Step; label: string }[] = [
    { key: "genre",     label: "Genre" },
    { key: "framework", label: "Framework" },
    { key: "compose",   label: "Compose" },
  ];

  function stepIndex(s: Step) {
    return ["genre", "framework", "compose", "done"].indexOf(s);
  }

  // ── Submission ─────────────────────────────────────────────────────────────

  async function handleSubmit() {
    setError("");
    if (!narrative.trim() || narrative.trim().length < 20) {
      setError("Narrative must be at least 20 characters.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reports/new", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          genre_id:     genreId,
          framework_id: frameworkId,
          mode,
          structured,
          narrative,
          aftereffects,
          sei_effects:  [],
          anonymity,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? JSON.stringify(data.errors ?? "Submission failed."));
        return;
      }
      setStep("done");
      // Redirect to the genre page after a moment
      setTimeout(() => {
        if (selectedGenre) {
          router.push(`/genres/${selectedGenre.slug}`);
        } else {
          router.push("/genres");
        }
      }, 1800);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (step === "done") {
    return (
      <div className="submit-done">
        <p className="submit-done-icon">✓</p>
        <h2>Report submitted.</h2>
        <p className="muted">Redirecting…</p>
      </div>
    );
  }

  return (
    <div className="submit-shell">
      {/* Step indicator */}
      <div className="step-indicator">
        {STEPS.map((s, i) => (
          <div
            key={s.key}
            className={`step-dot${stepIndex(step) === i ? " active" : ""}${stepIndex(step) > i ? " done" : ""}`}
          >
            <span className="step-num">{i + 1}</span>
            <span className="step-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Step 1: Genre ── */}
      {step === "genre" && (
        <div className="submit-step">
          <h2>Choose a genre</h2>
          <p className="step-desc muted">
            Select the experiential domain that best fits your report.
            You can skip this if your experience doesn&apos;t fit any category.
          </p>
          <div className="genre-grid genre-grid-select">
            {genres.map((genre) => (
              <button
                key={genre.id}
                type="button"
                className={`genre-select-card${genreId === genre.id ? " selected" : ""}`}
                onClick={() => setGenreId(genre.id)}
              >
                <strong>{genre.name}</strong>
                <span className="genre-select-desc">{genre.description}</span>
              </button>
            ))}
          </div>
          <div className="step-actions">
            <button
              type="button"
              className="button button-outline"
              onClick={() => { setGenreId(null); setStep("framework"); }}
            >
              Skip genre
            </button>
            <button
              type="button"
              className="button"
              disabled={genreId === null}
              onClick={() => setStep("framework")}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Framework + mode ── */}
      {step === "framework" && (
        <div className="submit-step">
          <h2>Choose a framework</h2>
          <p className="step-desc muted">
            Frameworks provide structured fields alongside your narrative. Using a framework
            helps build comparable data across reports. You can always use Open Form for
            free-text only.
          </p>

          <div className="frameworks-select-list">
            {frameworks.map((fw) => (
              <button
                key={fw.id}
                type="button"
                className={`framework-select-card${frameworkId === fw.id ? " selected" : ""}`}
                onClick={() => setFrameworkId(fw.id)}
              >
                <div className="framework-select-header">
                  <strong>{fw.name}</strong>
                  {fw.is_system && <span className="pill pill-dim pill-xs">system</span>}
                </div>
                <span className="framework-select-desc">{fw.description}</span>
                <span className="framework-select-fields">
                  {fw.fields.length === 0 ? "no structured fields" : `${fw.fields.length} field${fw.fields.length !== 1 ? "s" : ""}`}
                </span>
              </button>
            ))}
          </div>

          <div className="mode-select">
            <label className="field-label">Submission mode</label>
            <div className="mode-options">
              {(["open", "blind"] as const).map((m) => (
                <label key={m} className={`mode-option${mode === m ? " selected" : ""}`}>
                  <input
                    type="radio"
                    name="mode"
                    value={m}
                    checked={mode === m}
                    onChange={() => setMode(m)}
                  />
                  <div>
                    <strong>{m === "open" ? "Open" : "Blind"}</strong>
                    <span className="muted" style={{ fontSize: "13px", display: "block" }}>
                      {m === "open"
                        ? "You can view other reports before and after submitting."
                        : "Your report is submitted before you can view others. Reduces contamination."}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="step-actions">
            <button type="button" className="button button-outline" onClick={() => setStep("genre")}>
              ← Back
            </button>
            <button
              type="button"
              className="button"
              disabled={frameworkId === null}
              onClick={() => setStep("compose")}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Compose ── */}
      {step === "compose" && (
        <div className="submit-step">
          <h2>Write your report</h2>
          {selectedGenre && (
            <div className="compose-context">
              <span className="pill">{selectedGenre.name}</span>
              {selectedFramework && (
                <span className="pill pill-dim">{selectedFramework.name}</span>
              )}
              <span className="pill pill-dim">{mode}</span>
            </div>
          )}

          {/* Dynamic framework fields */}
          {selectedFramework && selectedFramework.fields.length > 0 && (
            <div className="compose-section">
              <h3 className="compose-section-title">Structured fields</h3>
              <FrameworkFields
                fields={selectedFramework.fields}
                values={structured}
                onChange={setStructured}
              />
            </div>
          )}

          <div className="compose-section">
            <h3 className="compose-section-title">Narrative *</h3>
            <textarea
              className="narrative-textarea"
              rows={10}
              placeholder="Write your first-person account. What were you trying to do? What made it difficult? What changed? Be specific: what you noticed, felt, perceived. What you cannot easily categorize is especially valuable."
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
            />
            <p className="char-count muted">{narrative.length} characters</p>
          </div>

          <div className="compose-section">
            <h3 className="compose-section-title">Aftereffects / integration</h3>
            <textarea
              className="narrative-textarea"
              rows={4}
              placeholder="Optional. What lingered? What changed? Any reflections in the days or weeks after."
              value={aftereffects}
              onChange={(e) => setAftereffects(e.target.value)}
            />
          </div>

          <div className="compose-section">
            <h3 className="compose-section-title">Attribution</h3>
            <div className="anonymity-options">
              {ANONYMITY_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`anonymity-option${anonymity === opt.value ? " selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="anonymity"
                    value={opt.value}
                    checked={anonymity === opt.value}
                    onChange={() => setAnonymity(opt.value as typeof anonymity)}
                  />
                  <div>
                    <strong>{opt.label}</strong>
                    <span className="muted" style={{ fontSize: "13px", display: "block" }}>
                      {opt.desc}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="step-actions">
            <button type="button" className="button button-outline" onClick={() => setStep("framework")}>
              ← Back
            </button>
            <button
              type="button"
              className="button"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Submitting…" : "Submit report"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
