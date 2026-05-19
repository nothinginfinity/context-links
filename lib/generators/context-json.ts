// lib/generators/context-json.ts
import type { ContextProfile } from '../types';

export function generateContextJson(profile: ContextProfile): string {
  return JSON.stringify(
    {
      _schema: 'context-links/v1',
      _generated: new Date().toISOString(),
      _source: '/context.json',
      ...profile,
    },
    null,
    2
  );
}
