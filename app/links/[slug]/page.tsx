// app/links/[slug]/page.tsx
// Slug route — renders full context payload, destination, and share link.
// Pre-renders known slugs at build time via generateStaticParams().

import { notFound } from "next/navigation";
import { getLinks, getLinkBySlug, type ContextLink } from "@/app/page";

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const { links } = await getLinks({ limit: 100 });
    return links.map((link) => ({ slug: link.slug }));
  } catch {
    return [];
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const link = await getLinkBySlug(params.slug);

  if (!link) notFound();

  const shareUrl = link.share_url ?? `https://context-links-api.agentfeedoptimization.com/links/${link.slug}`;

  return (
    <main className="max-w-2xl mx-auto p-8 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="font-mono text-lg font-semibold">/{link.slug}</h1>
        <span className="text-xs text-gray-400">{link.click_count} clicks</span>
      </header>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
          Context Payload
        </h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm overflow-x-auto whitespace-pre-wrap break-words">
          {JSON.stringify(link.context_payload, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
          Destination
        </h2>
        <a
          href={link.destination_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all text-sm"
        >
          {link.destination_url}
        </a>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
          Share
        </h2>
        <div className="flex items-center gap-2">
          <code className="text-xs bg-gray-100 rounded px-2 py-1 break-all flex-1">
            {shareUrl}
          </code>
          <a
            href={link.destination_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs bg-gray-900 text-white rounded px-3 py-1.5 hover:bg-gray-700"
          >
            Follow link →
          </a>
        </div>
      </section>
    </main>
  );
}
