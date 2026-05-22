// app/page.tsx — server component, no "use client"

import { CopyButton } from "@/components/CopyButton";

const API_BASE = "https://context-links-api.agentfeedoptimization.com";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContextLink {
  id: number;
  link_id: string;
  slug: string;
  destination_url: string;
  template_type: "ai-prompt" | "landing-brief" | "data-ref" | "agent-boot";
  context_payload: Record<string, unknown>;
  click_count: number;
  user_id: number | null;
  created_at: string;
  updated_at: string;
  share_url?: string;
}

export interface LinksResponse {
  links: ContextLink[];
  total: number;
  limit: number;
  offset: number;
}

// ─── Mock data (fallback) ─────────────────────────────────────────────────────

const MOCK_LINKS: ContextLink[] = [
  {
    id: 1,
    link_id: "lnk_mock001",
    slug: "example-ai-prompt",
    destination_url: "https://agentfeedoptimization.com",
    template_type: "ai-prompt",
    context_payload: { prompt: "Explain AFO to a developer" },
    click_count: 12,
    user_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    link_id: "lnk_mock002",
    slug: "example-landing-brief",
    destination_url: "https://agentfeedoptimization.com/pricing",
    template_type: "landing-brief",
    context_payload: { headline: "AI-native link infrastructure", audience: "developers" },
    click_count: 4,
    user_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const MOCK_LINKS_RESPONSE: LinksResponse = {
  links: MOCK_LINKS,
  total: MOCK_LINKS.length,
  limit: 50,
  offset: 0,
};

// ─── Data fetchers ─────────────────────────────────────────────────────────────

export async function getLinks(
  opts: { limit?: number; offset?: number; template?: string } = {}
): Promise<LinksResponse> {
  if (USE_MOCK) return MOCK_LINKS_RESPONSE;

  try {
    const params = new URLSearchParams();
    if (opts.limit) params.set("limit", String(opts.limit));
    if (opts.offset) params.set("offset", String(opts.offset));
    if (opts.template) params.set("template", opts.template);

    const res = await fetch(`${API_BASE}/links?${params}`, {
      next: { revalidate: 30 },
    });

    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  } catch (e) {
    console.warn("[context-links] getLinks fell back to mock:", e);
    return MOCK_LINKS_RESPONSE;
  }
}

export async function getLinkBySlug(slug: string): Promise<ContextLink | null> {
  if (USE_MOCK) return MOCK_LINKS.find((l) => l.slug === slug) ?? null;

  try {
    const res = await fetch(`${API_BASE}/links/${slug}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 30 },
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  } catch (e) {
    console.warn(`[context-links] getLinkBySlug(${slug}) fell back to mock:`, e);
    return MOCK_LINKS.find((l) => l.slug === slug) ?? null;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const { links } = await getLinks({ limit: 50 });

  return (
    <main className="p-8">
      {links.length === 0 ? (
        <p className="text-gray-500">No links yet. Create your first one.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <LinkCard key={link.link_id} link={link} />
          ))}
        </div>
      )}
    </main>
  );
}

// ─── Link card (server — CopyButton handles the client boundary) ──────────────

function LinkCard({ link }: { link: ContextLink }) {
  const shareUrl = link.share_url ?? `${API_BASE}/links/${link.slug}`;

  return (
    <div className="rounded-lg border border-gray-200 p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {link.template_type}
        </span>
        <span className="text-xs text-gray-400">{link.click_count} clicks</span>
      </div>
      <p className="font-mono text-sm text-gray-800">/{link.slug}</p>
      <p className="text-xs text-gray-500 truncate">{link.destination_url}</p>
      <CopyButton text={shareUrl} />
    </div>
  );
}
