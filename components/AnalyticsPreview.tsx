// components/AnalyticsPreview.tsx
// data-spec-component: AnalyticsPreview
// data-spec-model: ContextAnalyticsSummary
// data-spec-source: GET /api/analytics/summary

import type { ContextAnalyticsSummary } from '@/lib/types';

export default function AnalyticsPreview({ analytics }: { analytics: ContextAnalyticsSummary }) {
  const stats = [
    {
      label: `Context Health Score: ${analytics.contextHealthScore}`,
      detail: 'Strong canonical summary, verified links, and proof coverage.',
    },
    {
      label: `LLM Reads: ${analytics.llmReads30d} / 30 days`,
      detail: `Bot reads from /llms.txt, /context.json, and /context.md.`,
    },
    {
      label: `Top context file: ${analytics.topContextFile}`,
      detail: 'Markdown summary is currently the most-read machine artifact.',
    },
    {
      label: `Human clicks: ${analytics.humanClicks30d} / 30 days`,
      detail: 'Clicks on canonical links from the public page.',
    },
  ];

  return (
    <article
      className="card"
      style={{ padding: '24px' }}
      data-spec-component="AnalyticsPreview"
    >
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.04em' }}>Context Health</h3>
        <p style={{ marginTop: '5px', color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
          Simple MVP analytics for humans and machine reads.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              padding: '14px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <strong style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>
              {s.label}
            </strong>
            <span style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.5 }}>
              {s.detail}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
