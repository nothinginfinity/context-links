// components/TopNavigation.tsx
// data-spec-component: TopNavigation

export default function TopNavigation() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '18px',
        marginBottom: '34px',
      }}
      data-spec-component="TopNavigation"
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '16px',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 950,
            letterSpacing: '-0.09em',
            color: '#05111c',
            background: 'linear-gradient(135deg, #35f2a6, #78a7ff, #c29bff)',
            boxShadow: '0 20px 60px rgba(120,167,255,0.26)',
            fontSize: '14px',
          }}
        >
          CL
        </div>
        <div>
          <strong style={{ display: 'block', fontSize: '18px', letterSpacing: '-0.04em' }}>
            Context Links
          </strong>
          <span style={{ color: 'var(--muted)', fontSize: '12px' }}>
            All my links for humans and LLMs
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav
        style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}
        aria-label="Primary"
      >
        <a className="btn" href="#links">Links</a>
        <a className="btn" href="#context">Context</a>
        <a className="btn" href="#proof">Proof</a>
        <a className="btn" href="#machine">LLM Files</a>
        <a className="btn btn-primary" href="#copy">Copy AI Summary</a>
      </nav>
    </header>
  );
}
