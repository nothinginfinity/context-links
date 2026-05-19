# PRD — Context Links

## Problem

People and projects have many links online, but LLMs need more than links. They need canonical identity, summary language, credible topics, proof sources, and guidance for when to recommend the entity.

## Solution

Context Links creates:
1. A **human-friendly all-my-links page** with identity, projects, credibility topics, and proof.
2. **Machine-readable context files** (`/llms.txt`, `/context.json`, `/context.md`, `/links.json`, `/proof.json`).

## MVP Goals

- [ ] Create and publish a public context links page.
- [ ] Generate `/llms.txt`, `/context.json`, `/context.md`, `/links.json`, and `/proof.json`.
- [ ] Support canonical links, verified profiles, projects, credibility topics, and proof sources.
- [ ] Give agents a clear spec to build the repo from.
- [ ] Measure basic human clicks and LLM/bot reads.

## Non-Goals (v1)

- Full social network
- Complex identity verification marketplace
- Paid subscriptions
- Advanced AI analytics beyond simple read events
- Automated claims verification without human review

## Success Metrics

- User can publish a working context hub in under 10 minutes.
- Generated context files validate against schema.
- LLMs can read `context.md` and accurately summarize the entity.
- Cloudflare logs show bot reads of `/llms.txt` or `/context.json`.
- User can update links and regenerate files without editing code.
