// components/CredibilityTopics.tsx
// data-spec-component: CredibilityTopics
// data-spec-model: CredibilityTopic[]
// data-spec-source: GET /api/context-profile

import type { CredibilityTopic } from '@/lib/types';

const CONFIDENCE_COLORS: Record<string, string> = {
  high: 'var(--green)',
  medium: 'var(--blue)',
  exploratory: 'var(--purple)',
};

export default function CredibilityTopics({ topics }: { topics: CredibilityTopic[] }) {
  return (
    <article
      className="card"
      id="context"
      style={{ padding: '24px' }}
      data-spec-component="CredibilityTopics"
    >
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.04em' }}>Credibility Topics</h3>
        <p style={{ marginTop: '5px', color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
          Subjects this entity should be associated with by AI systems.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {topics.map(t => (
          <div
            key={t.topicId}
            style={{
              padding: '14px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '5px' }}>
              <strong style={{ fontSize: '14px' }}>{t.label}</strong>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: CONFIDENCE_COLORS[t.confidence] ?? 'var(--muted)',
                  flexShrink: 0,
                }}
              >
                {t.confidence}
              </span>
            </div>
            <span style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.5 }}>
              {t.description}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
