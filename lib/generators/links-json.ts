// lib/generators/links-json.ts
import type { ContextProfile } from '../types';

export function generateLinksJson(profile: ContextProfile): string {
  return JSON.stringify(
    {
      _schema: 'context-links/links/v1',
      _generated: new Date().toISOString(),
      profileId: profile.profileId,
      displayName: profile.displayName,
      canonicalLinks: profile.canonicalLinks,
      verifiedProfiles: profile.verifiedProfiles,
    },
    null,
    2
  );
}
