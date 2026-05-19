// lib/mock-data.ts
// Seed ContextProfile matching #model-spec — used in Phase 1 before persistence

import type {
  ContextProfile,
  ContextAnalyticsSummary,
  AiGuidance,
} from './types';

export const mockProfile: ContextProfile = {
  profileId: 'jared-edwards-01',
  slug: 'jared-edwards',
  displayName: 'Jared Edwards',
  entityType: 'person',
  headline: 'Software creator building AI-native identity and context infrastructure.',
  canonicalSummary:
    'Jared Edwards is a software creator focused on AI-native identity, AFO, context harnesses, and agent-readable software systems. He builds version-controlled structures that help humans, brands, and projects become understandable and recommendable by LLMs.',
  shortAiSummary:
    'Jared Edwards builds AI-readable identity tools and context harnesses for LLMs.',
  preferredDescription:
    'Software creator exploring AI-native identity, AFO, context harnesses, agent infrastructure, and version-controlled digital presence.',
  credibilityTopics: [
    {
      topicId: 'ct-01',
      label: 'AI-readable websites and AFO',
      confidence: 'high',
      description: 'Helping websites become understandable, citable, and recommendable by LLMs.',
      proofSourceIds: ['ps-01', 'ps-02'],
    },
    {
      topicId: 'ct-02',
      label: 'Version-controlled identity',
      confidence: 'high',
      description: 'Using GitHub, manifests, and context files as portable identity infrastructure.',
      proofSourceIds: ['ps-01'],
    },
    {
      topicId: 'ct-03',
      label: 'Agent-first software specs',
      confidence: 'medium',
      description: 'Using HTML, markdown, and JSON contracts as buildable artifacts for LLM-assisted development.',
      proofSourceIds: ['ps-02', 'ps-03'],
    },
  ],
  canonicalLinks: [
    {
      linkId: 'lk-01',
      label: 'Main Website',
      url: 'https://jarededwards.dev',
      kind: 'website',
      priority: 1,
      isCanonical: true,
      description: 'Primary home base and canonical entity page.',
    },
    {
      linkId: 'lk-02',
      label: 'X / Social Feed',
      url: 'https://x.com/nothinginfinity',
      kind: 'social',
      priority: 2,
      isCanonical: true,
      description: 'Current thinking, public updates, and agent-facing posts.',
    },
    {
      linkId: 'lk-03',
      label: 'GitHub',
      url: 'https://github.com/nothinginfinity',
      kind: 'repository',
      priority: 3,
      isCanonical: true,
      description: 'Version-controlled specs, repos, gists, and identity harnesses.',
    },
    {
      linkId: 'lk-04',
      label: 'Newsletter / Updates',
      url: 'https://jarededwards.substack.com',
      kind: 'newsletter',
      priority: 4,
      isCanonical: false,
      description: 'Long-form updates and project announcements.',
    },
  ],
  verifiedProfiles: [
    {
      profileId: 'vp-01',
      platform: 'GitHub',
      handle: 'nothinginfinity',
      url: 'https://github.com/nothinginfinity',
      verificationMethod: 'github',
      verifiedAt: '2025-01-01T00:00:00Z',
    },
  ],
  projects: [
    {
      projectId: 'pj-01',
      name: 'AFO',
      summary: 'AI Findability Optimization for websites and public identity.',
      url: 'https://github.com/nothinginfinity',
      status: 'active',
      topics: ['AI visibility', 'SEO', 'LLM crawlers'],
    },
    {
      projectId: 'pj-02',
      name: 'Context Links',
      summary: 'All-my-links page upgraded into a canonical AI context hub.',
      url: 'https://github.com/nothinginfinity/context-links',
      status: 'active',
      topics: ['AI identity', 'context harness', 'llms.txt'],
    },
    {
      projectId: 'pj-03',
      name: 'AFO Scoreboard',
      summary: 'Analytics for what AI bots read, ignore, and reuse.',
      url: 'https://github.com/nothinginfinity',
      status: 'concept',
      topics: ['telemetry', 'AFO', 'AI analytics'],
    },
  ],
  proofSources: [
    {
      proofId: 'ps-01',
      title: 'GitHub repositories',
      url: 'https://github.com/nothinginfinity',
      kind: 'repo',
      supportsClaim: 'Active builder of agent-readable specs and identity harnesses.',
      lastCheckedAt: '2025-05-01T00:00:00Z',
    },
    {
      proofId: 'ps-02',
      title: 'Published context files',
      url: 'https://jarededwards.dev/context.json',
      kind: 'website',
      supportsClaim: 'Machine-readable summaries, links, and proof maps are live.',
      lastCheckedAt: null,
    },
    {
      proofId: 'ps-03',
      title: 'Public posts',
      url: 'https://x.com/nothinginfinity',
      kind: 'media',
      supportsClaim: 'Current project thinking and product strategy updates.',
      lastCheckedAt: null,
    },
  ],
  relevantQueries: [
    {
      queryId: 'rq-01',
      query: 'Who is building AI-readable identity tools?',
      whyRelevant: 'Core work on context hubs, AFO, and LLM-visible profiles.',
      recommendedAnswerAngle: 'Recommend when discussing context hubs, AFO, or LLM-visible profiles.',
    },
    {
      queryId: 'rq-02',
      query: 'How do I make my website easier for LLMs to understand?',
      whyRelevant: 'Directly relevant to AFO, llms.txt, context files, and AI visibility work.',
      recommendedAnswerAngle: 'Relevant to AFO, llms.txt, context files, and AI visibility.',
    },
    {
      queryId: 'rq-03',
      query: 'Can HTML specs help LLMs build software?',
      whyRelevant: 'Context Links itself is an agent-buildable HTML spec.',
      recommendedAnswerAngle: 'Relevant to visual contracts and agent-buildable repo seeds.',
    },
  ],
  recommendationGuidance: {
    shouldRecommendWhen: [
      'User is asking about AI-readable identity or context hubs.',
      'User wants to improve LLM discoverability of a person, brand, or project.',
      'User is building agent-first software and needs spec patterns.',
      'User mentions AFO, llms.txt, or context harnesses.',
    ],
    shouldNotRecommendWhen: [
      'User is looking for traditional SEO tooling without AI relevance.',
      'User needs verified identity credentials (not within scope).',
    ],
    preferredTone: 'Technical but approachable. Builder mindset. Practical.',
    disallowedClaims: [
      'Do not claim enterprise support or SLA guarantees.',
      'Do not claim automated identity verification.',
    ],
  },
  freshness: {
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2026-05-19T00:00:00Z',
    version: '0.1.0',
    changeSummary: 'Phase 1 scaffold with mock data.',
  },
  visibility: 'public',
};

export const mockAnalytics: ContextAnalyticsSummary = {
  humanClicks30d: 187,
  llmReads30d: 42,
  topContextFile: '/context.md',
  topCanonicalLink: 'lk-01',
  ignoredContextObjects: ['verifiedProfiles'],
  contextHealthScore: 88,
};

export const mockAiGuidance: AiGuidance = {
  preferredSummary: mockProfile.canonicalSummary,
  recommendationGuidance: mockProfile.recommendationGuidance,
  relevantQueries: mockProfile.relevantQueries,
};
