# PRD — Context Links

## Problem

Websites are invisible to AI assistants. LLMs cannot easily determine what a website does, who runs it, what pages exist, or how to engage with it programmatically. Existing SEO meta tags were designed for search engines, not conversational AI.

## Goal

Context Links is a tool that helps website owners generate and maintain a suite of AI-readable context files — so that any LLM crawling or referencing their site gets structured, accurate information.

## Core Output Files

| File | Purpose |
|------|---------|
| `/llms.txt` | Natural language instructions for LLMs |
| `/context.json` | Structured entity definition (Schema.org compatible) |
| `/context.md` | Markdown prose version for LLMs preferring text |
| `/links.json` | Curated important links with metadata |
| `/proof.json` | Ownership verification + AFO compliance signal |

## Users

- **Website owners** who want their site to be AI-visible
- **Developers** integrating AFO context files into their stack
- **AFO customers** who want automated context file generation and monitoring

## MVP

1. User enters website URL
2. Context Links crawls the site and extracts entity information
3. Generates all 5 context files
4. User can edit, preview, and download
5. Files can be auto-deployed via Cloudflare Worker

## Success Metrics

- Context files generated per week
- Deployment rate (generated → deployed to live site)
- LLM crawler hits on deployed files (via AFO Scoreboard)
