-- IPA → IEA Migration
-- Run once on the production database (Replit).
-- Old tables are renamed, not dropped — data is preserved.

BEGIN;

-- ── Archive old tables ────────────────────────────────────────────────────────
ALTER TABLE protocols RENAME TO _archive_protocols;
ALTER TABLE experiences RENAME TO _archive_experiences;

-- ── Contributors (cookie-session identity, no passwords in Phase 1) ───────────
CREATE TABLE contributors (
  id          SERIAL PRIMARY KEY,
  handle      TEXT,
  session_key TEXT UNIQUE NOT NULL,
  points      INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Genres ───────────────────────────────────────────────────────────────────
CREATE TABLE genres (
  id           SERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  name         TEXT NOT NULL,
  description  TEXT NOT NULL DEFAULT '',
  created_by   INTEGER REFERENCES contributors(id),
  report_count INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Intake Frameworks ─────────────────────────────────────────────────────────
CREATE TABLE frameworks (
  id          SERIAL PRIMARY KEY,
  creator_id  INTEGER REFERENCES contributors(id),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  fields      JSONB NOT NULL DEFAULT '[]',
  version     INTEGER NOT NULL DEFAULT 1,
  forked_from INTEGER REFERENCES frameworks(id),
  usage_count INTEGER NOT NULL DEFAULT 0,
  is_system   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Reports (append-only, never updated) ─────────────────────────────────────
CREATE TABLE reports (
  id             SERIAL PRIMARY KEY,
  contributor_id INTEGER REFERENCES contributors(id),
  genre_id       INTEGER REFERENCES genres(id),
  framework_id   INTEGER REFERENCES frameworks(id),
  mode           TEXT NOT NULL DEFAULT 'open' CHECK (mode IN ('blind','open')),
  structured     JSONB NOT NULL DEFAULT '{}',
  narrative      TEXT NOT NULL DEFAULT '',
  aftereffects   TEXT NOT NULL DEFAULT '',
  sei_effects    TEXT[] NOT NULL DEFAULT '{}',
  anonymity      TEXT NOT NULL DEFAULT 'anonymous'
                 CHECK (anonymity IN ('anonymous','pseudonymous','named')),
  reported_at    DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Interpretations ───────────────────────────────────────────────────────────
CREATE TABLE interpretations (
  id          SERIAL PRIMARY KEY,
  creator_id  INTEGER REFERENCES contributors(id),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  report_ids  JSONB NOT NULL DEFAULT '[]',
  operations  JSONB NOT NULL DEFAULT '[]',
  outputs     JSONB NOT NULL DEFAULT '{}',
  forked_from INTEGER REFERENCES interpretations(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Renderings ────────────────────────────────────────────────────────────────
CREATE TABLE renderings (
  id                     SERIAL PRIMARY KEY,
  creator_id             INTEGER REFERENCES contributors(id),
  title                  TEXT NOT NULL,
  description            TEXT NOT NULL DEFAULT '',
  media_type             TEXT NOT NULL DEFAULT 'link'
                         CHECK (media_type IN ('image','video','3d','interactive','audio','link')),
  url                    TEXT,
  linked_interpretations JSONB NOT NULL DEFAULT '[]',
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Denormalized count triggers ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_genre_report_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.genre_id IS NOT NULL THEN
    UPDATE genres SET report_count = report_count + 1 WHERE id = NEW.genre_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_report_genre_count
AFTER INSERT ON reports FOR EACH ROW EXECUTE FUNCTION update_genre_report_count();

CREATE OR REPLACE FUNCTION update_framework_usage_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.framework_id IS NOT NULL THEN
    UPDATE frameworks SET usage_count = usage_count + 1 WHERE id = NEW.framework_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_report_framework_count
AFTER INSERT ON reports FOR EACH ROW EXECUTE FUNCTION update_framework_usage_count();

-- ── Seed genres ───────────────────────────────────────────────────────────────
INSERT INTO genres (slug, name, description) VALUES
  ('psychedelics',        'Psychedelics',         'Substance-induced altered states including classic psychedelics, dissociatives, and empathogens.'),
  ('bdsm',                'BDSM',                 'Bondage, discipline, dominance, submission, sadism, masochism, and related somatic practices.'),
  ('meditation',          'Meditation',           'Contemplative and mindfulness-based practices including breathwork and visualization.'),
  ('sensory-deprivation', 'Sensory Deprivation',  'Float tanks, darkness retreats, silence practices, and other deprivation environments.'),
  ('lucid-dreaming',      'Lucid Dreaming',       'WILD, MILD, DILD, and related techniques for achieving and maintaining lucidity.'),
  ('mathematics',         'Mathematics',          'Pure mathematical practice as an altered or intensive experiential domain.'),
  ('music-sound',         'Music & Sound',        'Concert, ritual, improvisation, and sound bath experiences.'),
  ('embodied-practices',  'Embodied Practices',   'Somatic, movement, and body-based intensive practices.'),
  ('group-ritual',        'Group Ritual',         'Collective ceremonial, theatrical, and community-organized intensive events.'),
  ('technology',          'Technology',           'VR, AR, biofeedback, gaming, and other technology-mediated intensive experiences.')
ON CONFLICT (slug) DO NOTHING;

-- ── Seed system frameworks ────────────────────────────────────────────────────
INSERT INTO frameworks (name, slug, description, fields, is_system) VALUES
(
  'Open Form',
  'open-form',
  'No structured fields. Pure first-person narrative, completely unconstrained.',
  '[]',
  TRUE
),
(
  'SEI Report',
  'sei-report',
  'Subjective Effects Index vocabulary tags plus intensity/valence sliders. Based on the effectindex.com taxonomy.',
  '[
    {"id":"sei_effects","label":"SEI Effects","type":"multiselect","required":false,
     "vocabulary":["time_distortion","euphoria","anxiety","calmness","dissociation",
                   "depersonalization","derealization","synesthesia","visual_enhancement",
                   "auditory_enhancement","ego_dissolution","awe","thought_acceleration",
                   "thought_deceleration","conceptual_thinking","memory_enhancement",
                   "wakefulness","sedation","nausea","headspace"],"max":12},
    {"id":"intensity","label":"Intensity (1–10)","type":"slider","min":1,"max":10,"required":false},
    {"id":"valence","label":"Valence (1–10)","type":"slider","min":1,"max":10,"required":false}
  ]',
  TRUE
),
(
  'Contextual Report',
  'contextual-report',
  'Context-first: setting, group size, duration, sound, movement, plus narrative.',
  '[
    {"id":"setting","label":"Setting","type":"text","required":false},
    {"id":"group_size","label":"Group Size","type":"number","required":false},
    {"id":"duration_minutes","label":"Duration (minutes)","type":"number","required":false},
    {"id":"sound","label":"Sound environment","type":"text","required":false},
    {"id":"movement","label":"Movement quality","type":"text","required":false}
  ]',
  TRUE
)
ON CONFLICT (slug) DO NOTHING;

COMMIT;
