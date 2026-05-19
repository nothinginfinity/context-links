// lib/generators/proof-json.ts
import type { ContextProfile } from '../types';

export function generateProofJson(profile: ContextProfile): string {
  return JSON.stringify(
    {
      _schema: 'context-links/proof/v1',
      _generated: new Date().toISOString(),
      profileId: profile.profileId,
      displayName: profile.displayName,
      proofSources: profile.proofSources,
      credibilityTopics: profile.credibilityTopics,
    },
    null,
    2
  );
}
