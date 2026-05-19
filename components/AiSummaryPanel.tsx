// components/AiSummaryPanel.tsx
// data-spec-component: AiSummaryPanel
// data-spec-model: AiGuidance
// data-spec-source: GET /api/ai-guidance

'use client';

import { useState } from 'react';

export default function AiSummaryPanel({ summary }: { summary: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: noop
    }
  }

  return (
    <section
      className="card"
      id="copy"
      style={{
        padding: '26px',
        background:
          'linear-gradient(135deg,rgba(53,242,166,0.1),rgba(120,167,255,0.09)),linear-gradient(180deg,rgba(255,255,255,0.095),rgba(255,255,255,0.065))',
      }}
      data-spec-component="AiSummaryPanel"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
        <div>
          <div className="eyebrow">Preferred AI summary</div>
          <h3 style={{ margin: 0, fontSize: '24px', letterSpacing: '-0.05em' }}>
            How an AI should summarize this entity
          </h3>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleCopy}
          style={{ flexShrink: 0, marginTop: '4px' }}
          aria-label="Copy AI summary to clipboard"
        >
          {copied ? '✓ Copied' : 'Copy summary'}
        </button>
      </div>

      <blockquote
        style={{
          margin: '18px 0 0',
          padding: '18px',
          borderLeft: '3px solid var(--green)',
          background: 'rgba(0,0,0,0.18)',
          borderRadius: '16px',
          color: 'var(--soft)',
          lineHeight: 1.68,
          fontSize: '15px',
        }}
      >
        {summary}
      </blockquote>
    </section>
  );
}
