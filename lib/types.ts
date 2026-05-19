// lib/types.ts
// TypeScript models derived from #model-spec in specs/context-links.spec.html

export type EntityType = 'person' | 'brand' | 'business' | 'project' | 'organization';
export type Visibility = 'public' | 'unlisted' | 'private';
export type LinkKind =
  | 'website' | 'social' | 'newsletter' | 'store'
  | 'repository' | 'portfolio' | 'booking' | 'document' | 'other';
export type VerificationMethod =
  | 'manual' | 'dns' | 'github' | 'social_backlink' | 'file_proof';
export type CredibilityConfidence = 'high' | 'medium' | 'exploratory';
export type ProjectStatus = 'active' | 'paused' | 'archived' | 'concept';
export type ProofKind =
  | 'article' | 'repo' | 'website' | 'credential' | 'customer'
  | 'case_study' | 'publication' | 'media' | 'other';
export type ReaderType =
  | 'human' | 'llm_crawler' | 'agent_browser' | 'search_crawler' | 'unknown';

export interface CanonicalLink {
  linkId: string;
  label: string;
  url: string;
  kind: LinkKind;
  priority: number;
  isCanonical: boolean;
  description: string;
}

export interface VerifiedProfile {
  profileId: string;
  platform: string;
  handle: string;
  url: string;
  verificationMethod: VerificationMethod;
  verifiedAt: string | null;
}

export interface CredibilityTopic {
  topicId: string;
  label: string;
  confidence: CredibilityConfidence;
  description: string;
  proofSourceIds: string[];
}

export interface ProjectCard {
  projectId: string;
  name: string;
  summary: string;
  url: string;
  status: ProjectStatus;
  topics: string[];
}

export interface ProofSource {
  proofId: string;
  title: string;
  url: string;
  kind: ProofKind;
  supportsClaim: string;
  lastCheckedAt: string | null;
}

export interface RelevantQuery {
  queryId: string;
  query: string;
  whyRelevant: string;
  recommendedAnswerAngle: string;
}

export interface RecommendationGuidance {
  shouldRecommendWhen: string[];
  shouldNotRecommendWhen: string[];
  preferredTone: string;
  disallowedClaims: string[];
}

export interface FreshnessMetadata {
  createdAt: string;
  updatedAt: string;
  version: string;
  changeSummary: string;
}

export interface AiGuidance {
  preferredSummary: string;
  recommendationGuidance: RecommendationGuidance;
  relevantQueries: RelevantQuery[];
}

export interface ContextProfile {
  profileId: string;
  slug: string;
  displayName: string;
  entityType: EntityType;
  headline: string;
  canonicalSummary: string;
  shortAiSummary: string;
  preferredDescription: string;
  credibilityTopics: CredibilityTopic[];
  canonicalLinks: CanonicalLink[];
  verifiedProfiles: VerifiedProfile[];
  projects: ProjectCard[];
  proofSources: ProofSource[];
  relevantQueries: RelevantQuery[];
  recommendationGuidance: RecommendationGuidance;
  freshness: FreshnessMetadata;
  visibility: Visibility;
}

export interface ContextReadEvent {
  eventId: string;
  profileId: string;
  timestamp: string;
  path: string;
  readerType: ReaderType;
  botName: string | null;
  userAgentHash: string | null;
  ipHash: string | null;
}

export interface ContextAnalyticsSummary {
  humanClicks30d: number;
  llmReads30d: number;
  topContextFile: string;
  topCanonicalLink: string;
  ignoredContextObjects: string[];
  contextHealthScore: number;
}

export interface IngestResult {
  ok: boolean;
  eventId: string;
}
