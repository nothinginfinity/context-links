// components/ProofPanel.tsx
// data-spec-component: ProofPanel
// data-spec-model: ProofSource[]
// data-spec-source: GET /api/proof

import type { ProofSource } from '@/lib/types';

export default function ProofPanel({ proofSources }: { proofSources: ProofSource[] }) {
  return (
    <article
      className="card"
      id="proof"
      style={{ padding: '24px' }}
      data-spec-component="ProofPanel"
    >
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.04em' }}>Proof Sources</h3>
        <p style={{ marginTop: '5px', color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
          Evidence that supports claims and credibility topics.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {proofSources.map(ps => (
          <a
            key={ps.proofId}
            href={ps.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '14px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              textDecoration: 'none',
              transition: 'background 180ms',
            }}
          >
            <strong style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>
              {ps.title}
            </strong>
            <span style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.5 }}>
              {ps.supportsClaim}
            </span>
          </a>
        ))}
      </div>
    </article>
  );
}
