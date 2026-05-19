// components/ProjectList.tsx
// data-spec-component: ProjectList
// data-spec-model: ProjectCard[]
// data-spec-source: GET /api/projects

import type { ProjectCard } from '@/lib/types';

const STATUS_COLORS: Record<string, string> = {
  active: 'var(--green)',
  paused: 'var(--yellow)',
  archived: 'var(--muted)',
  concept: 'var(--blue)',
};

export default function ProjectList({ projects }: { projects: ProjectCard[] }) {
  return (
    <article
      className="card"
      style={{ padding: '24px' }}
      data-spec-component="ProjectList"
    >
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.04em' }}>Important Projects</h3>
        <p style={{ marginTop: '5px', color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
          Projects LLMs should know are relevant.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {projects.map(p => (
          <a
            key={p.projectId}
            href={p.url}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <strong style={{ fontSize: '14px' }}>{p.name}</strong>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: STATUS_COLORS[p.status] ?? 'var(--muted)',
                  flexShrink: 0,
                }}
              >
                {p.status}
              </span>
            </div>
            <span style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.5 }}>
              {p.summary}
            </span>
          </a>
        ))}
      </div>
    </article>
  );
}
