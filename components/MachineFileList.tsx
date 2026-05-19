// components/MachineFileList.tsx
// data-spec-component: MachineFileList
// data-spec-source: #file-output-spec

const FILES = [
  { path: '/llms.txt',                    desc: 'Discovery index that points agents to canonical context files.' },
  { path: '/context.json',                desc: 'Structured identity, links, topics, claims, projects, proof, and guidance.' },
  { path: '/context.md',                  desc: 'LLM-readable narrative profile optimized for summarization and recommendation.' },
  { path: '/links.json',                  desc: 'Canonical links and verified social/profile endpoints.' },
  { path: '/proof.json',                  desc: 'Proof sources and claim support mapping.' },
  { path: '/.well-known/context-links.json', desc: 'Discovery metadata for agents, crawlers, and AFO tooling.' },
];

export default function MachineFileList() {
  return (
    <section
      className="card"
      id="machine"
      style={{ padding: '24px', marginBottom: '0' }}
      data-spec-component="MachineFileList"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '18px',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.04em' }}>Generated LLM Files</h3>
          <p style={{ marginTop: '5px', color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
            Machine-readable outputs published beside the human page.
          </p>
        </div>
        <a className="btn btn-primary" href="/llms.txt" target="_blank" rel="noopener noreferrer">
          View llms.txt
        </a>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        {FILES.map(f => (
          <a
            key={f.path}
            href={f.path}
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
            <strong style={{ display: 'block', marginBottom: '4px' }}>
              <code
                style={{
                  color: 'var(--green)',
                  fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace',
                  fontSize: '12px',
                }}
              >
                {f.path}
              </code>
            </strong>
            <span style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.5 }}>
              {f.desc}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
