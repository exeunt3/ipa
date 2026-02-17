import Link from "next/link";
import { getProtocolBySlug, listExperiencesForProtocol } from "@/lib/content-read";

export const dynamic = "force-dynamic";

type MetricKey = "intensity" | "valence" | "coherence" | "embodiment" | "sociability" | "non_ordinary";
type CountItem = { key: string; count: number };

type ExperienceFrontMatter = {
  anonymity?: string;
  reported_at?: string | Date;
  core_metrics?: Partial<Record<MetricKey, number>>;
  context?: {
    setting?: string;
    group_size?: number;
    duration_minutes?: number;
    sound?: string;
    movement?: string;
  };
  sei_effects?: string[];
};

function formatDate(value: string | Date | undefined): string {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString().split("T")[0];
  return String(value);
}

type ExperienceRecord = { filename: string; frontMatter: ExperienceFrontMatter; contentHtml: string };

type ExperienceStats = {
  reportCount: number;
  averages: Record<MetricKey, number | null>;
  topEffects: CountItem[];
  commonContext: {
    setting: CountItem[];
    group_size: CountItem[];
    duration_bucket: CountItem[];
    sound: CountItem[];
    movement: CountItem[];
  };
};

export default async function ProtocolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const protocol = await getProtocolBySlug(slug);
  if (!protocol) return <main className="section-grid">Protocol not found.</main>;

  const experiences = await listExperiencesForProtocol(protocol.frontMatter.id);
  const stats = computeExperienceStats(experiences);

  return (
    <main className="section-grid">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 18, flexWrap: "wrap" }}>
        <div className="page-heading" style={{ gap: 10 }}>
          <h1 style={{ margin: 0 }}>{protocol.frontMatter.title}</h1>
          <div className="muted" style={{ marginTop: 4 }}>{protocol.frontMatter.summary}</div>
          <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(protocol.frontMatter.tags || []).map((t: string) => (
              <span className="pill" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="button button-outline link-plain" href="/protocols">
            All protocols
          </Link>
          <Link className="button link-plain" href={`/experiences/new?protocol=${encodeURIComponent(protocol.slug)}`}>
            + Add experience
          </Link>
        </div>
      </div>

      <article className="card-light" style={{ lineHeight: 1.65, padding: 28 }} dangerouslySetInnerHTML={{ __html: protocol.contentHtml }} />

      <ExperienceStatsPanel stats={stats} />

      <section className="section-grid" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0 }}>Experiences</h2>
          <Link className="pill link-plain" href={`/experiences/new?protocol=${encodeURIComponent(protocol.slug)}`}>
            + Add experience
          </Link>
        </div>

        {experiences.length === 0 ? (
          <p className="muted">No experiences yet.</p>
        ) : (
          <div className="section-grid" style={{ marginTop: 4 }}>
            {experiences.map((exp) => (
              <ExperienceCard key={exp.filename} exp={exp} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ExperienceCard({ exp }: { exp: ExperienceRecord }) {
  const fm = exp.frontMatter || {};
  const metrics = fm.core_metrics || {};
  const context = fm.context || {};
  const sei: string[] = Array.isArray(fm.sei_effects) ? fm.sei_effects : [];

  return (
    <details className="card" style={{ padding: 20 }}>
      <summary style={{ cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
          <strong className="sans" style={{ display: "inline-flex", gap: 10, alignItems: "baseline" }}>
            <span>Report</span>
            <span style={{ fontSize: 12, opacity: 0.7 }}>{fm.anonymity ? fm.anonymity : "anonymous"}</span>
          </strong>
          <span className="sans" style={{ opacity: 0.7, fontSize: 13 }}>{formatDate(fm.reported_at)}</span>
        </div>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <MetricPill label="intensity" value={metrics.intensity} />
            <MetricPill label="valence" value={metrics.valence} />
            <MetricPill label="coherence" value={metrics.coherence} />
            <MetricPill label="embodiment" value={metrics.embodiment} />
            <MetricPill label="sociability" value={metrics.sociability} />
            <MetricPill label="non-ordinary" value={metrics.non_ordinary} />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <ContextPill label="setting" value={context.setting} />
            <ContextPill label="group" value={context.group_size} />
            <ContextPill label="duration" value={context.duration_minutes ? `${context.duration_minutes}m` : undefined} />
            <ContextPill label="sound" value={context.sound} />
            <ContextPill label="movement" value={context.movement} />
          </div>

          {sei.length ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {sei.slice(0, 7).map((e) => (
                <Chip key={e} text={e} />
              ))}
              <a
                href="https://www.effectindex.com/effects"
                target="_blank"
                rel="noreferrer"
                className="sans"
                style={{ fontSize: 11, opacity: 0.6, background: "none" }}
              >
                SEI ↗
              </a>
            </div>
          ) : null}

          <div className="sans" style={{ fontSize: 12, opacity: 0.5, marginTop: 4 }}>Click to expand narrative</div>
        </div>
      </summary>

      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.2)", lineHeight: 1.65, color: "rgba(255,255,255,0.9)" }}
        dangerouslySetInnerHTML={{ __html: exp.contentHtml }}
      />
    </details>
  );
}

function MetricPill({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <span style={{ 
      display: "inline-flex", 
      alignItems: "center", 
      gap: 6, 
      padding: "4px 10px", 
      background: "rgba(255,255,255,0.15)", 
      fontFamily: "var(--font-sans)", 
      fontSize: 11, 
      textTransform: "uppercase", 
      letterSpacing: "0.04em" 
    }}>
      <span style={{ opacity: 0.7 }}>{label}</span>
      <strong style={{ fontWeight: 600 }}>{String(value)}</strong>
    </span>
  );
}

function ContextPill({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <span style={{ 
      display: "inline-flex", 
      alignItems: "center", 
      gap: 4, 
      padding: "4px 10px", 
      background: "rgba(255,255,255,0.1)", 
      fontFamily: "var(--font-sans)", 
      fontSize: 11, 
      letterSpacing: "0.02em" 
    }}>
      <span style={{ opacity: 0.6 }}>{label}:</span> {String(value)}
    </span>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <span style={{ 
      display: "inline-block", 
      padding: "4px 10px", 
      background: "rgba(255,255,255,0.12)", 
      fontFamily: "var(--font-sans)", 
      fontSize: 11, 
      letterSpacing: "0.02em" 
    }}>
      {text}
    </span>
  );
}

function computeExperienceStats(experiences: ExperienceRecord[]): ExperienceStats {
  const metricKeys: MetricKey[] = [
    "intensity",
    "valence",
    "coherence",
    "embodiment",
    "sociability",
    "non_ordinary",
  ];

  const sums: Record<string, number> = {};
  const counts: Record<string, number> = {};
  metricKeys.forEach((k) => {
    sums[k] = 0;
    counts[k] = 0;
  });

  const effectCounts = new Map<string, number>();
  const ctxCounts = {
    setting: new Map<string, number>(),
    group_size: new Map<string, number>(),
    duration_bucket: new Map<string, number>(),
    sound: new Map<string, number>(),
    movement: new Map<string, number>(),
  };

  function inc(map: Map<string, number>, key: unknown) {
    const k = String(key ?? "").trim();
    if (!k) return;
    map.set(k, (map.get(k) || 0) + 1);
  }

  function durationBucket(minutes: unknown) {
    const m = Number(minutes);
    if (!Number.isFinite(m) || m <= 0) return null;
    if (m <= 10) return "≤10m";
    if (m <= 30) return "11–30m";
    if (m <= 60) return "31–60m";
    if (m <= 120) return "61–120m";
    if (m <= 240) return "2–4h";
    return "≥4h";
  }

  for (const exp of experiences) {
    const fm = exp.frontMatter || {};
    const metrics = fm.core_metrics || {};
    const ctx = fm.context || {};
    const sei: string[] = Array.isArray(fm.sei_effects) ? fm.sei_effects : [];

    metricKeys.forEach((k) => {
      const num = Number(metrics?.[k]);
      if (Number.isFinite(num)) {
        sums[k] += num;
        counts[k] += 1;
      }
    });

    for (const e of sei) {
      const id = String(e).trim();
      if (!id) continue;
      effectCounts.set(id, (effectCounts.get(id) || 0) + 1);
    }

    inc(ctxCounts.setting, ctx.setting);
    inc(ctxCounts.group_size, ctx.group_size);
    const bucket = durationBucket(ctx.duration_minutes);
    if (bucket) inc(ctxCounts.duration_bucket, bucket);
    inc(ctxCounts.sound, ctx.sound);
    inc(ctxCounts.movement, ctx.movement);
  }

  function topN(map: Map<string, number>, limit: number): CountItem[] {
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([key, count]) => ({ key, count }));
  }

  const averages: Record<string, number | null> = {};
  metricKeys.forEach((k) => {
    averages[k] = counts[k] ? Number((sums[k] / counts[k]).toFixed(2)) : null;
  });

  return {
    reportCount: experiences.length,
    averages,
    topEffects: topN(effectCounts, 10),
    commonContext: {
      setting: topN(ctxCounts.setting, 6),
      group_size: topN(ctxCounts.group_size, 6),
      duration_bucket: topN(ctxCounts.duration_bucket, 6),
      sound: topN(ctxCounts.sound, 6),
      movement: topN(ctxCounts.movement, 6),
    },
  };
}

function ExperienceStatsPanel({ stats }: { stats: ExperienceStats }) {
  const a = stats.averages || {};
  const ctx = stats.commonContext || {};

  const showAny =
    stats.reportCount > 0 &&
    (stats.topEffects?.length || ctx.setting?.length || ctx.duration_bucket?.length || ctx.sound?.length || ctx.movement?.length);

  if (!showAny) {
    return (
      <section className="card-light" style={{ marginBottom: 4, padding: 24 }}>
        <h3 className="sans" style={{ fontSize: 15, margin: 0 }}>At a glance</h3>
        <p className="muted" style={{ marginTop: 8, marginBottom: 0 }}>
          No reports yet—this panel populates once experiences are submitted.
        </p>
      </section>
    );
  }

  return (
    <section className="card-light" style={{ marginBottom: 4, padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <h3 className="sans" style={{ fontSize: 15, margin: 0 }}>At a glance</h3>
          <p className="muted sans" style={{ fontSize: 13, marginTop: 4, marginBottom: 0 }}>
            Aggregated from {stats.reportCount} report{stats.reportCount === 1 ? "" : "s"}.
          </p>
        </div>

        <a href="https://www.effectindex.com/effects" target="_blank" rel="noreferrer" className="pill link-plain">
          SEI reference
        </a>
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        <div>
          <div className="small-caps" style={{ marginBottom: 10 }}>Average metrics</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <AvgPill label="intensity" value={a.intensity} />
            <AvgPill label="valence" value={a.valence} />
            <AvgPill label="coherence" value={a.coherence} />
            <AvgPill label="embodiment" value={a.embodiment} />
            <AvgPill label="sociability" value={a.sociability} />
            <AvgPill label="non-ordinary" value={a.non_ordinary} />
          </div>
        </div>

        {stats.topEffects?.length ? (
          <div>
            <div className="small-caps" style={{ marginBottom: 10 }}>Top SEI effects</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {stats.topEffects.slice(0, 10).map((x: CountItem) => (
                <CountChip key={x.key} text={x.key} count={x.count} />
              ))}
            </div>
            <p className="muted sans" style={{ fontSize: 12, marginTop: 10, marginBottom: 0 }}>
              Counts reflect tags used in submitted reports; prose may contain more nuance than tags.
            </p>
          </div>
        ) : null}

        <div>
          <div className="small-caps" style={{ marginBottom: 10 }}>Common contexts</div>
          <div style={{ display: "grid", gap: 10 }}>
            <ContextRow title="Setting" items={ctx.setting} />
            <ContextRow title="Duration" items={ctx.duration_bucket} />
            <ContextRow title="Sound" items={ctx.sound} />
            <ContextRow title="Movement" items={ctx.movement} />
            <ContextRow title="Group size" items={ctx.group_size} />
          </div>
        </div>
      </div>
    </section>
  );
}

function AvgPill({ label, value }: { label: string; value: number | null }) {
  if (value === null || value === undefined) return null;
  return (
    <span className="pill">
      <span className="muted">{label}</span>
      <strong style={{ fontWeight: 600 }}>{value}</strong>
    </span>
  );
}

function CountChip({ text, count }: { text: string; count: number }) {
  return (
    <span className="pill" style={{ display: "inline-flex", gap: 6, alignItems: "baseline" }}>
      <span>{text}</span>
      <span className="muted">x{count}</span>
    </span>
  );
}

function ContextRow({ title, items }: { title: string; items: Array<{ key: string; count: number }> }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
      <div className="sans muted" style={{ width: 80, fontSize: 12 }}>{title}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {items.slice(0, 6).map((x) => (
          <CountChip key={x.key} text={x.key} count={x.count} />
        ))}
      </div>
    </div>
  );
}
