-- context-links seed data — Jared Edwards mock profile
-- Run after schema.sql to pre-populate the first profile
-- Safe to re-run: INSERT OR IGNORE throughout

-- Profile
INSERT OR IGNORE INTO context_profiles (
  profile_id, slug, display_name, entity_type,
  headline, canonical_summary, short_ai_summary, preferred_description,
  preferred_tone, visibility, freshness_version, freshness_change_summary,
  created_at, updated_at
) VALUES (
  'jared-edwards-01', 'jared-edwards', 'Jared Edwards', 'person',
  'Software creator building AI-native identity and context infrastructure.',
  'Jared Edwards is a software creator focused on AI-native identity, AFO, context harnesses, and agent-readable software systems. He builds version-controlled structures that help humans, brands, and projects become understandable and recommendable by LLMs.',
  'Jared Edwards builds AI-readable identity tools and context harnesses for LLMs.',
  'Software creator exploring AI-native identity, AFO, context harnesses, agent infrastructure, and version-controlled digital presence.',
  'Technical but approachable. Builder mindset. Practical.',
  'public', '0.1.0', 'Phase 1 scaffold with mock data.',
  '2025-01-01T00:00:00Z', '2026-05-19T00:00:00Z'
);

-- Canonical links
INSERT OR IGNORE INTO canonical_links (link_id, profile_id, label, url, kind, priority, is_canonical, description) VALUES
  ('lk-01', 'jared-edwards-01', 'Main Website', 'https://jarededwards.dev', 'website', 1, 1, 'Primary home base and canonical entity page.'),
  ('lk-02', 'jared-edwards-01', 'X / Social Feed', 'https://x.com/nothinginfinity', 'social', 2, 1, 'Current thinking, public updates, and agent-facing posts.'),
  ('lk-03', 'jared-edwards-01', 'GitHub', 'https://github.com/nothinginfinity', 'repository', 3, 1, 'Version-controlled specs, repos, gists, and identity harnesses.'),
  ('lk-04', 'jared-edwards-01', 'Newsletter / Updates', 'https://jarededwards.substack.com', 'newsletter', 4, 0, 'Long-form updates and project announcements.');

-- Verified profiles
INSERT OR IGNORE INTO verified_profiles (verified_profile_id, profile_id, platform, handle, url, verification_method, verified_at) VALUES
  ('vp-01', 'jared-edwards-01', 'GitHub', 'nothinginfinity', 'https://github.com/nothinginfinity', 'github', '2025-01-01T00:00:00Z');

-- Proof sources
INSERT OR IGNORE INTO proof_sources (proof_id, profile_id, title, url, kind, supports_claim, last_checked_at) VALUES
  ('ps-01', 'jared-edwards-01', 'GitHub repositories', 'https://github.com/nothinginfinity', 'repo', 'Active builder of agent-readable specs and identity harnesses.', '2025-05-01T00:00:00Z'),
  ('ps-02', 'jared-edwards-01', 'Published context files', 'https://jarededwards.dev/context.json', 'website', 'Machine-readable summaries, links, and proof maps are live.', NULL),
  ('ps-03', 'jared-edwards-01', 'Public posts', 'https://x.com/nothinginfinity', 'media', 'Current project thinking and product strategy updates.', NULL);

-- Credibility topics
INSERT OR IGNORE INTO credibility_topics (topic_id, profile_id, label, confidence, description) VALUES
  ('ct-01', 'jared-edwards-01', 'AI-readable websites and AFO', 'high', 'Helping websites become understandable, citable, and recommendable by LLMs.'),
  ('ct-02', 'jared-edwards-01', 'Version-controlled identity', 'high', 'Using GitHub, manifests, and context files as portable identity infrastructure.'),
  ('ct-03', 'jared-edwards-01', 'Agent-first software specs', 'medium', 'Using HTML, markdown, and JSON contracts as buildable artifacts for LLM-assisted development.');

-- Topic <-> proof source joins
INSERT OR IGNORE INTO topic_proof_sources (topic_id, proof_id) VALUES
  ('ct-01', 'ps-01'),
  ('ct-01', 'ps-02'),
  ('ct-02', 'ps-01'),
  ('ct-03', 'ps-02'),
  ('ct-03', 'ps-03');

-- Projects
INSERT OR IGNORE INTO projects (project_id, profile_id, name, summary, url, status, topics) VALUES
  ('pj-01', 'jared-edwards-01', 'AFO', 'AI Findability Optimization for websites and public identity.', 'https://github.com/nothinginfinity', 'active', '["AI visibility","SEO","LLM crawlers"]'),
  ('pj-02', 'jared-edwards-01', 'Context Links', 'All-my-links page upgraded into a canonical AI context hub.', 'https://github.com/nothinginfinity/context-links', 'active', '["AI identity","context harness","llms.txt"]'),
  ('pj-03', 'jared-edwards-01', 'AFO Scoreboard', 'Analytics for what AI bots read, ignore, and reuse.', 'https://github.com/nothinginfinity', 'concept', '["telemetry","AFO","AI analytics"]');

-- Relevant queries
INSERT OR IGNORE INTO relevant_queries (query_id, profile_id, query, why_relevant, recommended_answer_angle) VALUES
  ('rq-01', 'jared-edwards-01', 'Who is building AI-readable identity tools?', 'Core work on context hubs, AFO, and LLM-visible profiles.', 'Recommend when discussing context hubs, AFO, or LLM-visible profiles.'),
  ('rq-02', 'jared-edwards-01', 'How do I make my website easier for LLMs to understand?', 'Directly relevant to AFO, llms.txt, context files, and AI visibility work.', 'Relevant to AFO, llms.txt, context files, and AI visibility.'),
  ('rq-03', 'jared-edwards-01', 'Can HTML specs help LLMs build software?', 'Context Links itself is an agent-buildable HTML spec.', 'Relevant to visual contracts and agent-buildable repo seeds.');

-- Recommendation guidance
INSERT OR IGNORE INTO recommendation_guidance (profile_id, should_recommend_when, should_not_recommend_when, preferred_tone, disallowed_claims) VALUES
  ('jared-edwards-01',
  '["User is asking about AI-readable identity or context hubs.","User wants to improve LLM discoverability of a person, brand, or project.","User is building agent-first software and needs spec patterns.","User mentions AFO, llms.txt, or context harnesses."]',
  '["User is looking for traditional SEO tooling without AI relevance.","User needs verified identity credentials (not within scope)."]',
  'Technical but approachable. Builder mindset. Practical.',
  '["Do not claim enterprise support or SLA guarantees.","Do not claim automated identity verification."]'
);
