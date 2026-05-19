// components/ProfileCard.tsx
// data-spec-component: ProfileCard
// data-spec-model: ContextProfile
// data-spec-source: GET /api/context-profile

import type { ContextProfile } from '@/lib/types';

function getInitials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
}

export default function ProfileCard({
  profile,
  healthScore,
}: {
  profile: ContextProfile;
  healthScore: number;
}) {
  const pct = Math.min(Math.max(healthScore, 0), 100);

  return (
    <aside
      className="card"
      style={{ padding: '24px', display: 'grid', gap: '18px' }}
      data-spec-component="ProfileCard"
    >
      {/* Avatar + Score */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
        <div
          style={{
            width: '82px',
            height: '82px',
            borderRadius: '28px',
            display: 'grid',
            placeItems: 'center',
            fontSize: '32px',
            fontWeight: 950,
            color: '#07111f',
            background: 'linear-gradient(135deg, #35f2a6, #78a7ff)',
            flexShrink: 0,
          }}
        >
          {getInitials(profile.displayName)}
        </div>
        {/* Context health donut */}
        <div
          title={`Context Health Score: ${healthScore}`}
          style={{
            width: '88px',
            height: '88px',
            borderRadius: '9999px',
            display: 'grid',
            placeItems: 'center',
            background: `conic-gradient(#35f2a6 0 ${pct}%, rgba(255,255,255,0.09) ${pct}% 100%)`,
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '67px',
              height: '67px',
              borderRadius: '9999px',
              background: '#101523',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <strong style={{ fontSize: '24px', letterSpacing: '-0.06em', color: '#f4f7ff' }}>
              {healthScore}
            </strong>
          </div>
        </div>
      </div>

      {/* Name + description */}
      <div>
        <h2 style={{ margin: 0, fontSize: '28px', letterSpacing: '-0.05em' }}>
          {profile.displayName}
        </h2>
        <p style={{ margin: '6px 0 0', color: 'var(--muted)', lineHeight: 1.55, fontSize: '14px' }}>
          {profile.preferredDescription}
        </p>
      </div>

      {/* Credibility badges */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {profile.credibilityTopics.map(t => (
          <span key={t.topicId} className="badge">{t.label}</span>
        ))}
      </div>
    </aside>
  );
}
