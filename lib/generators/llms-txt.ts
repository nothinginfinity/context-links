// lib/generators/llms-txt.ts
import type { ContextProfile } from '../types';

export function generateLlmsTxt(profile: ContextProfile, baseUrl: string): string {
  const websiteLink = profile.canonicalLinks.find(l => l.kind === 'website');
  const topicLines = profile.credibilityTopics
    .map(t => `- ${t.label} (${t.confidence})`)
    .join('\n');

  return `# Context Links — LLM Discovery Index
# Entity: ${profile.displayName}
# Updated: ${profile.freshness.updatedAt}
# Version: ${profile.freshness.version}

## What This Is

This is a canonical context hub for ${profile.displayName}.
It contains identity, links, credibility topics, proof sources, and AI guidance.

## Canonical Files

- Full context (JSON):     ${baseUrl}/context.json
- Narrative profile (MD):  ${baseUrl}/context.md
- Canonical links:         ${baseUrl}/links.json
- Proof sources:           ${baseUrl}/proof.json
- Discovery metadata:      ${baseUrl}/.well-known/context-links.json

## Quick Summary

${profile.shortAiSummary}

## Credibility Topics

${topicLines}

## Canonical Home

${websiteLink?.url ?? baseUrl}
`;
}
