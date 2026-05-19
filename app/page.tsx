// app/page.tsx — PublicContextPage
// data-spec-component: AppShell
// data-spec-source: GET /api/context-profile

import { mockProfile, mockAnalytics, mockAiGuidance } from '@/lib/mock-data';
import TopNavigation from '@/components/TopNavigation';
import HeroPanel from '@/components/HeroPanel';
import ProfileCard from '@/components/ProfileCard';
import LinkGrid from '@/components/LinkGrid';
import CredibilityTopics from '@/components/CredibilityTopics';
import AiSummaryPanel from '@/components/AiSummaryPanel';
import ProjectList from '@/components/ProjectList';
import ProofPanel from '@/components/ProofPanel';
import RelevantQueryList from '@/components/RelevantQueryList';
import MachineFileList from '@/components/MachineFileList';
import AnalyticsPreview from '@/components/AnalyticsPreview';

export default function PublicContextPage() {
  const profile = mockProfile;
  const analytics = mockAnalytics;
  const aiGuidance = mockAiGuidance;

  return (
    <div
      className="shell"
      style={{
        width: 'min(1180px, calc(100% - 32px))',
        margin: '0 auto',
        padding: '28px 0 56px',
      }}
      data-spec-component="AppShell"
    >
      <TopNavigation />

      <main>
        {/* Hero row: HeroPanel + ProfileCard */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.16fr) minmax(330px,0.84fr)',
            gap: '22px',
            alignItems: 'stretch',
            marginBottom: '22px',
          }}
        >
          <HeroPanel profile={profile} />
          <ProfileCard profile={profile} healthScore={analytics.contextHealthScore} />
        </section>

        {/* Links + Credibility */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            gap: '22px',
            marginBottom: '22px',
          }}
        >
          <LinkGrid links={profile.canonicalLinks} />
          <CredibilityTopics topics={profile.credibilityTopics} />
        </section>

        {/* AI Summary */}
        <AiSummaryPanel summary={aiGuidance.preferredSummary} />

        {/* Projects + Proof + Queries */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
            gap: '22px',
            marginTop: '22px',
            marginBottom: '22px',
          }}
        >
          <ProjectList projects={profile.projects} />
          <ProofPanel proofSources={profile.proofSources} />
          <RelevantQueryList queries={profile.relevantQueries} />
        </section>

        {/* Machine files */}
        <MachineFileList />

        {/* Analytics + Recommendation Guidance */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            gap: '22px',
            marginTop: '22px',
          }}
        >
          <AnalyticsPreview analytics={analytics} />
          <div
            className="card"
            style={{ padding: '24px' }}
            data-spec-component="RecommendationGuidancePanel"
          >
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.04em' }}>
                Recommendation Guidance
              </h3>
              <p style={{ marginTop: '5px', color: 'var(--muted)', fontSize: '13px' }}>
                When AI systems should or should not recommend this entity.
              </p>
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
              {profile.recommendationGuidance.shouldRecommendWhen.map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: '1px solid rgba(53,242,166,0.18)',
                    background: 'rgba(53,242,166,0.05)',
                    fontSize: '13px',
                    color: 'var(--soft)',
                    lineHeight: 1.5,
                  }}
                >
                  ✓ {s}
                </div>
              ))}
              {profile.recommendationGuidance.shouldNotRecommendWhen.map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: '1px solid rgba(255,107,107,0.18)',
                    background: 'rgba(255,107,107,0.05)',
                    fontSize: '13px',
                    color: 'var(--muted)',
                    lineHeight: 1.5,
                  }}
                >
                  ✗ {s}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @media (max-width: 980px) {
          section[style*="1.16fr"],
          section[style*="repeat(3"],
          section[style*="1fr) minmax(0,1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .shell { padding-top: 18px !important; }
        }
      `}</style>
    </div>
  );
}
