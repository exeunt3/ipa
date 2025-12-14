"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const SEI_SUGGESTIONS: { id: string; label: string }[] = [
  { id: "time_distortion", label: "Time distortion" },
  { id: "euphoria", label: "Euphoria" },
  { id: "anxiety", label: "Anxiety" },
  { id: "calmness", label: "Calmness" },
  { id: "dissociation", label: "Dissociation" },
  { id: "depersonalization", label: "Depersonalization" },
  { id: "derealization", label: "Derealization" },
  { id: "synesthesia", label: "Synesthesia" },
  { id: "visual_enhancement", label: "Visual enhancement" },
  { id: "auditory_enhancement", label: "Auditory enhancement" },
  { id: "ego_dissolution", label: "Ego dissolution" },
  { id: "awe", label: "Awe" },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function normalizeEffectId(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 64);
}

type ProtocolOption = { slug: string; id: string; title: string };
type Anonymity = "anonymous" | "pseudonymous" | "named";

export default function NewExperienceForm({
  protocols,
  defaultProtocolSlug,
}: {
  protocols: ProtocolOption[];
  defaultProtocolSlug: string;
}) {
  const router = useRouter();

  const protocolBySlug = useMemo(() => {
    const m = new Map<string, ProtocolOption>();
    protocols.forEach((p) => m.set(p.slug, p));
    return m;
  }, [protocols]);

  const [protocolSlug, setProtocolSlug] = useState<string>(
    defaultProtocolSlug && protocolBySlug.has(defaultProtocolSlug)
      ? defaultProtocolSlug
      : protocols[0]?.slug || ""
  );

  const protocol = protocolBySlug.get(protocolSlug);

  const [narrative, setNarrative] = useState("");
  const [aftereffects, setAftereffects] = useState("");

  const [anonymity, setAnonymity] = useState<Anonymity>("anonymous");

  const [intensity, setIntensity] = useState(3);
  const [valence, setValence] = useState(0);
  const [coherence, setCoherence] = useState(3);
  const [embodiment, setEmbodiment] = useState(3);
  const [sociability, setSociability] = useState(3);
  const [nonOrdinary, setNonOrdinary] = useState(3);

  const [setting, setSetting] = useState("");
  const [groupSize, setGroupSize] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<string>("");
  const [sound, setSound] = useState("");
  const [movement, setMovement] = useState("");

  const [seiQuery, setSeiQuery] = useState("");
  const [seiEffects, setSeiEffects] = useState<string[]>([]);
  const seiCap = 7;

  const filteredSeiSuggestions = useMemo(() => {
    const q = seiQuery.trim().toLowerCase();
    if (!q) return SEI_SUGGESTIONS.slice(0, 10);
    return SEI_SUGGESTIONS.filter((s) => s.id.includes(q) || s.label.toLowerCase().includes(q)).slice(0, 12);
  }, [seiQuery]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addEffect(effectIdRaw: string) {
    const effectId = normalizeEffectId(effectIdRaw);
    if (!effectId) return;
    if (seiEffects.includes(effectId)) return;
    if (seiEffects.length >= seiCap) return setError(`SEI effects are capped at ${seiCap} per report.`);
    setError(null);
    setSeiEffects((prev) => [...prev, effectId]);
    setSeiQuery("");
  }

  function removeEffect(effectId: string) {
    setSeiEffects((prev) => prev.filter((e) => e !== effectId));
  }

  async function onSubmit() {
    try {
      setError(null);

      if (!protocol) return setError("Please select a protocol.");
      if (narrative.trim().length < 20) return setError("Narrative is required (at least a couple sentences).");

      setSubmitting(true);

      const payload = {
        protocol_id: protocol.id,
        protocol_slug: protocol.slug,
        anonymity,
        core_metrics: {
          intensity: clamp(intensity, 1, 5),
          valence: clamp(valence, -2, 2),
          coherence: clamp(coherence, 1, 5),
          embodiment: clamp(embodiment, 1, 5),
          sociability: clamp(sociability, 1, 5),
          non_ordinary: clamp(nonOrdinary, 1, 5),
        },
        sei_effects: seiEffects,
        context: {
          ...(setting ? { setting } : {}),
          ...(groupSize ? { group_size: Number(groupSize) } : {}),
          ...(durationMinutes ? { duration_minutes: Number(durationMinutes) } : {}),
          ...(sound ? { sound } : {}),
          ...(movement ? { movement } : {}),
        },
        narrative,
        aftereffects,
      };

      const res = await fetch("/api/experiences/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json?.error || "Failed to submit experience.");

      router.push(`/protocols/${protocol.slug}`);
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
        <h1>New Experience</h1>
        <p className="muted">Prose is primary. Taxonomies are optional lenses for recall and comparability.</p>
      </div>

      <section style={card}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 8, color: "var(--muted)" }}>Protocol</label>
        <select value={protocolSlug} onChange={(e) => setProtocolSlug(e.target.value)} style={{ width: "100%" }}>
          {protocols.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
      </section>

      <section style={card}>
        <label style={{ display: "block", fontWeight: 700, marginBottom: 8 }}>Narrative (required)</label>
        <textarea value={narrative} onChange={(e) => setNarrative(e.target.value)} rows={10} style={textarea} />
      </section>

      <section style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 700 }}>Core metrics</div>
            <div className="muted" style={{ fontSize: 13 }}>Coarse sliders for comparison.</div>
          </div>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Attribution</span>
            <select value={anonymity} onChange={(e) => setAnonymity(e.target.value as Anonymity)} style={input}>
              <option value="anonymous">Anonymous</option>
              <option value="pseudonymous">Pseudonymous</option>
              <option value="named">Named</option>
            </select>
          </label>
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
          <Slider label="Overall intensity" value={intensity} min={1} max={5} onChange={setIntensity} />
          <Slider label="Valence" value={valence} min={-2} max={2} onChange={setValence} />
          <Slider label="Coherence ↔ fragmentation" value={coherence} min={1} max={5} onChange={setCoherence} />
          <Slider label="Embodiment" value={embodiment} min={1} max={5} onChange={setEmbodiment} />
          <Slider label="Relationality / sociability" value={sociability} min={1} max={5} onChange={setSociability} />
          <Slider label="Non-ordinary quality" value={nonOrdinary} min={1} max={5} onChange={setNonOrdinary} />
        </div>
      </section>

      <section style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 700 }}>Subjective Effect Index (optional)</div>
            <div className="muted" style={{ fontSize: 13 }}>Reference vocabulary only. Select up to {seiCap}.</div>
          </div>
          <a href="https://www.effectindex.com/effects" target="_blank" rel="noreferrer" className="pill">
            Open SEI definitions ↗
          </a>
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {seiEffects.map((e) => (
            <Chip key={e} text={e} onRemove={() => removeEffect(e)} />
          ))}
          {seiEffects.length === 0 ? <span className="muted" style={{ fontSize: 13 }}>No SEI effects selected.</span> : null}
        </div>

        <div style={{ marginTop: 12 }}>
          <input
            value={seiQuery}
            onChange={(e) => setSeiQuery(e.target.value)}
            placeholder="Search or type an effect id (e.g. time_distortion)…"
            style={{ width: "100%" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addEffect(seiQuery);
              }
            }}
          />
          <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
            {filteredSeiSuggestions.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => addEffect(s.id)}
                disabled={seiEffects.includes(s.id) || seiEffects.length >= seiCap}
                className="list-card"
                style={{ cursor: "pointer", opacity: seiEffects.includes(s.id) ? 0.55 : 1 }}
              >
                <strong style={{ fontSize: 13 }}>{s.label}</strong>
                <div className="muted" style={{ fontSize: 12 }}>{s.id}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={card}>
        <div style={{ fontWeight: 700 }}>Context (optional)</div>
        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          <LabeledInput label="Setting" value={setting} onChange={setSetting} />
          <div className="grid-two">
            <LabeledInput label="Group size" value={groupSize} onChange={setGroupSize} />
            <LabeledInput label="Duration (minutes)" value={durationMinutes} onChange={setDurationMinutes} />
          </div>
          <div className="grid-two">
            <LabeledInput label="Sound" value={sound} onChange={setSound} />
            <LabeledInput label="Movement" value={movement} onChange={setMovement} />
          </div>
        </div>
      </section>

      <section style={card}>
        <label style={{ display: "block", fontWeight: 700, marginBottom: 8 }}>Aftereffects / Integration (optional)</label>
        <textarea value={aftereffects} onChange={(e) => setAftereffects(e.target.value)} rows={6} style={textarea} />
      </section>

      {error ? (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 12, border: "1px solid rgba(200,0,0,0.3)", color: "rgb(140,0,0)" }}>
          {error}
        </div>
      ) : null}

      <div style={{ marginTop: 14 }}>
        <button type="button" onClick={onSubmit} disabled={submitting} className="button">
          {submitting ? "Submitting…" : "Submit experience"}
        </button>
      </div>
    </main>
  );
}

const card: React.CSSProperties = { marginTop: 12, padding: 16, border: "1px solid var(--line)", borderRadius: 16, background: "var(--card)", boxShadow: "var(--shadow)" };
const input: React.CSSProperties = { padding: 8, borderRadius: 10 };
const textarea: React.CSSProperties = { width: "100%", padding: 12, borderRadius: 10, lineHeight: 1.5 };

function Slider(props: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontWeight: 600 }}>{props.label}</span>
        <span style={{ color: "var(--muted)", fontSize: 13 }}>{props.value}</span>
      </div>
      <input type="range" min={props.min} max={props.max} step={1} value={props.value} onChange={(e) => props.onChange(Number(e.target.value))} />
    </label>
  );
}

function Chip({ text, onRemove }: { text: string; onRemove: () => void }) {
  return (
    <span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {text}
      <button type="button" onClick={onRemove} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 14, lineHeight: 1, color: "var(--muted)" }}>
        ×
      </button>
    </span>
  );
}

function LabeledInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: 600, fontSize: 13, color: "var(--muted)" }}>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10 }} />
    </label>
  );
}
