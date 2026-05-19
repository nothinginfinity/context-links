// components/RelevantQueryList.tsx
// data-spec-component: RelevantQueryList
// data-spec-model: RelevantQuery[]
// data-spec-source: GET /api/context-profile

import type { RelevantQuery } from '@/lib/types';

export default function RelevantQueryList({ queries }: { queries: RelevantQuery[] }) {
  return (
    <article
      className="card"
      id="queries"
      style={{ padding: '24px' }}
      data-spec-component="RelevantQueryList"
    >
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.04em' }}>Relevant Queries</h3>
        <p style={{ marginTop: '5px', color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
          Questions where this entity may be a good answer.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {queries.map(q => (
          <div
            key={q.queryId}
            style={{
              padding: '14px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <strong style={{ display: 'block', fontSize: '14px', marginBottom: '5px', lineHeight: 1.4 }}>
              {q.query}
            </strong>
            <span style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.5 }}>
              {q.recommendedAnswerAngle}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
