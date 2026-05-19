// components/HeroPanel.tsx
// data-spec-component: HeroPanel
// data-spec-model: ContextProfile
// data-spec-source: GET /api/context-profile

import type { ContextProfile } from '@/lib/types';

export default function HeroPanel({ profile }: { profile: ContextProfile }) {
  return (
    <article
      className="card"
      style={{ padding: 'clamp(26px,5vw,48px)', position: 'relative' }}
      data-spec-component="HeroPanel"
    >
      <div className="eyebrow">AI-readable identity hub</div>
      <h1
        style={{
          margin: 0,
          fontSize: 'clamp(40px,7vw,78px)',
          letterSpacing: '-0.075em',
          lineHeight: 0.88,
        }}
      >
        All your links,{' '}
        <span style={{ color: 'var(--muted)' }}>but with context.</span>
      </h1>
      <p
        style={{
          color: 'var(--muted)',
          fontSize: '17px',
          lineHeight: 1.68,
          maxWidth: '740px',
          margin: '24px 0 0',
        }}
      >
        {profile.headline}
      </p>
      <div style={{ marginTop: '28px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <a className="btn btn-primary" href="#machine">View LLM files</a>
        <a className="btn" href="#proof">See proof sources</a>
        <a className="btn" href="#queries">Relevant queries</a>
      </div>
    </article>
  );
}
