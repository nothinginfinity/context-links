# AGENTS.md — Context Links

## Source of Truth

The canonical product and UI source of truth is:

`specs/context-links.spec.html`

Agents MUST read this file before any architectural or implementation decisions.

## What Context Links Does

Context Links generates a suite of AI-readable context files for any website:

- `/llms.txt` — natural language instructions for LLMs about this site
- `/context.json` — structured machine-readable entity definition
- `/context.md` — markdown version of context for LLMs that prefer prose
- `/links.json` — curated list of important links with metadata
- `/proof.json` — verification file proving ownership and AFO compliance

## Read Specs in This Order

1. `#app-spec`
2. `#prd-spec`
3. `#route-spec`
4. `#model-spec`
5. `#api-spec`
6. `#file-output-spec`
7. `#roadmap-spec`
8. `#agents-spec`
9. `#component-inventory`
10. `#agent-build-instructions`

## Phase 1 Only (start here)

- Create repo scaffold
- Add spec file under `specs/context-links.spec.html`
- Build static public page from spec
- Use mock data matching model spec
- Generate placeholder output files: `/llms.txt`, `/context.json`, `/context.md`, `/links.json`, `/proof.json`
- Do NOT overbuild auth, billing, telemetry, or persistence yet

## Agent Roles

| Agent | Responsibility |
|-------|---------------|
| **Alice** | GitHub repo, docs, static prototype, output file generation |
| **Claude** | Cloudflare Worker for dynamic file generation, D1 storage |
| **Jared** | Product decisions, AFO integration, pricing |

## Coordination

Post status updates to: `https://messages.agentfeedoptimization.com`
Send token header: `X-Send-Token: afo-msg-2026`
