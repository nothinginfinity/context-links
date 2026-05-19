// components/LinkGrid.tsx
// data-spec-component: LinkGrid
// data-spec-model: CanonicalLink[]
// data-spec-source: GET /api/links

import type { CanonicalLink } from '@/lib/types';

const KIND_ICONS: Record<string, string> = {
  website: 'W',
  social: 'X',
  newsletter: 'N',
  repository: 'G',
  portfolio: 'P',
  store: 'S',
  booking: 'B',
  document: 'D',
  other: '?',
};

export default function LinkGrid({ links }: { links: CanonicalLink[] }) {
  const sorted = [...links].sort((a, b) => a.priority - b.priority);

  return (
    <article
      className="card"
      id="links"
      style={{ padding: '24px' }}
      data-spec-component="LinkGrid"
    >
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.04em' }}>Canonical Links</h3>
        <p style={{ marginTop: '5px', color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
          Official links that humans and AI systems should treat as primary.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        {sorted.map(link => (
          <a
            key={link.linkId}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'grid',
              gridTemplateColumns: '38px 1fr auto',
              gap: '12px',
              alignItems: 'center',
              padding: '13px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '16px',
              textDecoration: 'none',
              transition: 'background 180ms',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '13px',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 950,
                background: 'rgba(120,167,255,0.16)',
                color: 'var(--blue)',
                fontSize: '14px',
              }}
            >
              {KIND_ICONS[link.kind] ?? '?'}
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '14px', marginBottom: '2px' }}>
                {link.label}
                {link.isCanonical && (
                  <span
                    style={{
                      marginLeft: '8px',
                      fontSize: '10px',
                      color: 'var(--green)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    canonical
                  </span>
                )}
              </strong>
              <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{link.description}</span>
            </div>
            <div style={{ color: 'var(--muted)', fontWeight: 900, fontSize: '16px' }}>→</div>
          </a>
        ))}
      </div>
    </article>
  );
}
