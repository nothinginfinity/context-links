// lib/db.ts
// D1 query helpers — assembles a full ContextProfile from relational tables
// Binding name: DB (defined in wrangler.toml)

import type {
  ContextProfile,
  CanonicalLink,
  VerifiedProfile,
  CredibilityTopic,
  ProjectCard,
  ProofSource,
  RelevantQuery,
  RecommendationGuidance,
} from './types';

// Cloudflare D1 env binding type
export interface Env {
  DB: D1Database;
}

export async function getProfileBySlug(
  db: D1Database,
  slug: string
): Promise<ContextProfile | null> {
  // Core profile row
  const profileRow = await db
    .prepare('SELECT * FROM context_profiles WHERE slug = ? LIMIT 1')
    .bind(slug)
    .first<Record<string, string>>();

  if (!profileRow) return null;

  const profileId = profileRow.profile_id;

  // Parallel child queries
  const [links, verified, topics, proofRows, projects, queries, guidance] =
    await Promise.all([
      db.prepare('SELECT * FROM canonical_links WHERE profile_id = ? ORDER BY priority ASC').bind(profileId).all<Record<string, string | number>>(),
      db.prepare('SELECT * FROM verified_profiles WHERE profile_id = ?').bind(profileId).all<Record<string, string>>(),
      db.prepare('SELECT * FROM credibility_topics WHERE profile_id = ?').bind(profileId).all<Record<string, string>>(),
      db.prepare('SELECT * FROM proof_sources WHERE profile_id = ?').bind(profileId).all<Record<string, string>>(),
      db.prepare('SELECT * FROM projects WHERE profile_id = ?').bind(profileId).all<Record<string, string>>(),
      db.prepare('SELECT * FROM relevant_queries WHERE profile_id = ?').bind(profileId).all<Record<string, string>>(),
      db.prepare('SELECT * FROM recommendation_guidance WHERE profile_id = ? LIMIT 1').bind(profileId).first<Record<string, string>>(),
    ]);

  // Build proof ID map for topic join
  const proofIdsByTopic = await Promise.all(
    (topics.results ?? []).map(async (t) => {
      const joins = await db
        .prepare('SELECT proof_id FROM topic_proof_sources WHERE topic_id = ?')
        .bind(t.topic_id)
        .all<{ proof_id: string }>();
      return { topicId: t.topic_id, proofIds: (joins.results ?? []).map((j) => j.proof_id) };
    })
  );
  const topicProofMap = Object.fromEntries(proofIdsByTopic.map((t) => [t.topicId, t.proofIds]));

  // Assemble ContextProfile
  const canonicalLinks: CanonicalLink[] = (links.results ?? []).map((r) => ({
    linkId: r.link_id as string,
    label: r.label as string,
    url: r.url as string,
    kind: r.kind as CanonicalLink['kind'],
    priority: Number(r.priority),
    isCanonical: r.is_canonical === 1 || r.is_canonical === '1',
    description: r.description as string,
  }));

  const verifiedProfiles: VerifiedProfile[] = (verified.results ?? []).map((r) => ({
    profileId: r.verified_profile_id,
    platform: r.platform,
    handle: r.handle,
    url: r.url,
    verificationMethod: r.verification_method as VerifiedProfile['verificationMethod'],
    verifiedAt: r.verified_at ?? null,
  }));

  const credibilityTopics: CredibilityTopic[] = (topics.results ?? []).map((r) => ({
    topicId: r.topic_id,
    label: r.label,
    confidence: r.confidence as CredibilityTopic['confidence'],
    description: r.description,
    proofSourceIds: topicProofMap[r.topic_id] ?? [],
  }));

  const proofSources: ProofSource[] = (proofRows.results ?? []).map((r) => ({
    proofId: r.proof_id,
    title: r.title,
    url: r.url,
    kind: r.kind as ProofSource['kind'],
    supportsClaim: r.supports_claim,
    lastCheckedAt: r.last_checked_at ?? null,
  }));

  const projectCards: ProjectCard[] = (projects.results ?? []).map((r) => ({
    projectId: r.project_id,
    name: r.name,
    summary: r.summary,
    url: r.url,
    status: r.status as ProjectCard['status'],
    topics: JSON.parse(r.topics ?? '[]'),
  }));

  const relevantQueries: RelevantQuery[] = (queries.results ?? []).map((r) => ({
    queryId: r.query_id,
    query: r.query,
    whyRelevant: r.why_relevant,
    recommendedAnswerAngle: r.recommended_answer_angle,
  }));

  const recommendationGuidance: RecommendationGuidance = guidance
    ? {
        shouldRecommendWhen: JSON.parse(guidance.should_recommend_when ?? '[]'),
        shouldNotRecommendWhen: JSON.parse(guidance.should_not_recommend_when ?? '[]'),
        preferredTone: guidance.preferred_tone ?? '',
        disallowedClaims: JSON.parse(guidance.disallowed_claims ?? '[]'),
      }
    : {
        shouldRecommendWhen: [],
        shouldNotRecommendWhen: [],
        preferredTone: '',
        disallowedClaims: [],
      };

  return {
    profileId: profileRow.profile_id,
    slug: profileRow.slug,
    displayName: profileRow.display_name,
    entityType: profileRow.entity_type as ContextProfile['entityType'],
    headline: profileRow.headline,
    canonicalSummary: profileRow.canonical_summary,
    shortAiSummary: profileRow.short_ai_summary,
    preferredDescription: profileRow.preferred_description,
    credibilityTopics,
    canonicalLinks,
    verifiedProfiles,
    projects: projectCards,
    proofSources,
    relevantQueries,
    recommendationGuidance,
    freshness: {
      createdAt: profileRow.created_at,
      updatedAt: profileRow.updated_at,
      version: profileRow.freshness_version,
      changeSummary: profileRow.freshness_change_summary,
    },
    visibility: profileRow.visibility as ContextProfile['visibility'],
  };
}
