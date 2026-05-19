-- context-links D1 schema
-- Migration 0001 — initial
-- Apply via: Claude afo-mcp:applyMigration or wrangler d1 migrations apply context-links-db

PRAGMA journal_mode=WAL;

-- Core profile row (one per user/entity)
CREATE TABLE IF NOT EXISTS context_profiles (
  profile_id    TEXT PRIMARY KEY,
  slug          TEXT NOT NULL UNIQUE,
  display_name  TEXT NOT NULL,
  entity_type   TEXT NOT NULL CHECK(entity_type IN ('person','brand','business','project','organization')),
  headline      TEXT NOT NULL DEFAULT '',
  canonical_summary      TEXT NOT NULL DEFAULT '',
  short_ai_summary       TEXT NOT NULL DEFAULT '',
  preferred_description  TEXT NOT NULL DEFAULT '',
  preferred_tone         TEXT NOT NULL DEFAULT '',
  visibility    TEXT NOT NULL DEFAULT 'public' CHECK(visibility IN ('public','unlisted','private')),
  freshness_version      TEXT NOT NULL DEFAULT '0.1.0',
  freshness_change_summary TEXT NOT NULL DEFAULT '',
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Canonical links (many per profile)
CREATE TABLE IF NOT EXISTS canonical_links (
  link_id       TEXT PRIMARY KEY,
  profile_id    TEXT NOT NULL REFERENCES context_profiles(profile_id) ON DELETE CASCADE,
  label         TEXT NOT NULL,
  url           TEXT NOT NULL,
  kind          TEXT NOT NULL CHECK(kind IN ('website','social','newsletter','store','repository','portfolio','booking','document','other')),
  priority      INTEGER NOT NULL DEFAULT 99,
  is_canonical  INTEGER NOT NULL DEFAULT 0, -- boolean: 0/1
  description   TEXT NOT NULL DEFAULT ''
);

-- Verified profiles (many per profile)
CREATE TABLE IF NOT EXISTS verified_profiles (
  verified_profile_id  TEXT PRIMARY KEY,
  profile_id           TEXT NOT NULL REFERENCES context_profiles(profile_id) ON DELETE CASCADE,
  platform             TEXT NOT NULL,
  handle               TEXT NOT NULL,
  url                  TEXT NOT NULL,
  verification_method  TEXT NOT NULL CHECK(verification_method IN ('manual','dns','github','social_backlink','file_proof')),
  verified_at          TEXT
);

-- Credibility topics (many per profile)
CREATE TABLE IF NOT EXISTS credibility_topics (
  topic_id     TEXT PRIMARY KEY,
  profile_id   TEXT NOT NULL REFERENCES context_profiles(profile_id) ON DELETE CASCADE,
  label        TEXT NOT NULL,
  confidence   TEXT NOT NULL CHECK(confidence IN ('high','medium','exploratory')),
  description  TEXT NOT NULL DEFAULT ''
);

-- Topic <-> proof source join (many-to-many)
CREATE TABLE IF NOT EXISTS topic_proof_sources (
  topic_id   TEXT NOT NULL REFERENCES credibility_topics(topic_id) ON DELETE CASCADE,
  proof_id   TEXT NOT NULL REFERENCES proof_sources(proof_id) ON DELETE CASCADE,
  PRIMARY KEY (topic_id, proof_id)
);

-- Proof sources (many per profile)
CREATE TABLE IF NOT EXISTS proof_sources (
  proof_id        TEXT PRIMARY KEY,
  profile_id      TEXT NOT NULL REFERENCES context_profiles(profile_id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  url             TEXT NOT NULL,
  kind            TEXT NOT NULL CHECK(kind IN ('article','repo','website','credential','customer','case_study','publication','media','other')),
  supports_claim  TEXT NOT NULL DEFAULT '',
  last_checked_at TEXT
);

-- Projects (many per profile)
CREATE TABLE IF NOT EXISTS projects (
  project_id  TEXT PRIMARY KEY,
  profile_id  TEXT NOT NULL REFERENCES context_profiles(profile_id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  summary     TEXT NOT NULL DEFAULT '',
  url         TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL CHECK(status IN ('active','paused','archived','concept')),
  topics      TEXT NOT NULL DEFAULT '[]' -- JSON array stored as text
);

-- Relevant queries (many per profile)
CREATE TABLE IF NOT EXISTS relevant_queries (
  query_id                 TEXT PRIMARY KEY,
  profile_id               TEXT NOT NULL REFERENCES context_profiles(profile_id) ON DELETE CASCADE,
  query                    TEXT NOT NULL,
  why_relevant             TEXT NOT NULL DEFAULT '',
  recommended_answer_angle TEXT NOT NULL DEFAULT ''
);

-- Recommendation guidance (one per profile, stored as JSON columns)
CREATE TABLE IF NOT EXISTS recommendation_guidance (
  profile_id                 TEXT PRIMARY KEY REFERENCES context_profiles(profile_id) ON DELETE CASCADE,
  should_recommend_when      TEXT NOT NULL DEFAULT '[]', -- JSON array
  should_not_recommend_when  TEXT NOT NULL DEFAULT '[]', -- JSON array
  preferred_tone             TEXT NOT NULL DEFAULT '',
  disallowed_claims          TEXT NOT NULL DEFAULT '[]'  -- JSON array
);

-- Bot read telemetry (Phase 4)
CREATE TABLE IF NOT EXISTS context_read_events (
  event_id         TEXT PRIMARY KEY,
  profile_id       TEXT NOT NULL REFERENCES context_profiles(profile_id) ON DELETE CASCADE,
  timestamp        TEXT NOT NULL DEFAULT (datetime('now')),
  path             TEXT NOT NULL,
  reader_type      TEXT NOT NULL CHECK(reader_type IN ('human','llm_crawler','agent_browser','search_crawler','unknown')),
  bot_name         TEXT,
  user_agent_hash  TEXT,
  ip_hash          TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_canonical_links_profile ON canonical_links(profile_id);
CREATE INDEX IF NOT EXISTS idx_credibility_topics_profile ON credibility_topics(profile_id);
CREATE INDEX IF NOT EXISTS idx_proof_sources_profile ON proof_sources(profile_id);
CREATE INDEX IF NOT EXISTS idx_projects_profile ON projects(profile_id);
CREATE INDEX IF NOT EXISTS idx_relevant_queries_profile ON relevant_queries(profile_id);
CREATE INDEX IF NOT EXISTS idx_read_events_profile ON context_read_events(profile_id);
CREATE INDEX IF NOT EXISTS idx_read_events_timestamp ON context_read_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_profiles_slug ON context_profiles(slug);
