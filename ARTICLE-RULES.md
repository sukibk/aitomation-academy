# Article Rules (distilled from .claude/skills/aitomation-blog-writer — writers MUST follow)

## Positioning
Claude for real work · non-technical professionals (consultants, marketers, creators, founders, freelancers, operators) · practical copy-paste workflows · no coding required. No AI hype.

## File format
Create `content/blog/{slug}.tsx` exactly like `content/blog/claude-for-marketers.tsx` (READ IT FIRST as the exemplar):
`import type { BlogPost } from "@/lib/blog";` then `export const post: BlogPost = {...}` with slug, title, description, publishedAt: "2026-07-18", author: "Marko Sudar", category (Claude Guides | Comparisons | Claude Workflows | Claude Prompts | Use Cases), tags[], body: JSX.

## Hard limits (validated mechanically — violations get rejected)
- Title ≤ 50 characters. Punchy, keyword first-ish, no "Complete Guide" filler.
- Description ≤ 155 characters, includes keyword.
- NO emojis anywhere. No em-dash-free requirement, but no "game-changer/unlock/delve/revolutionize".
- 2000+ words. 3-6 h2 sections. First 1-2 sentences under each h2 = self-contained quotable answer.
- Model names: family only (Claude, Opus, Sonnet, Haiku, Cowork, Claude Code). NEVER version numbers (no "Opus 4.x", no "Sonnet 4", no "Claude 3").
- JSX-safe: escape apostrophes as &apos; in text or use curly quotes; use {`...`} inside <pre> blocks.

## Required elements per article
1. ≥1 "graphic": a `not-prose` styled visual — comparison table (rounded-xl border, slate styling), step-flow (flex boxes), or stat band (bg-slate-900 with orange numbers). Copy patterns from claude-for-marketers.tsx / ai-for-consultants.tsx.
2. ≥1 copy-paste prompt/skill in a `<pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">{`...`}</pre>` block where relevant.
3. TWO CTA callouts (orange box pattern from claude-for-marketers.tsx): one mid-article → `/vault` ("550+ Claude prompts & skills, sorted by your job"), one late → `/skool-redirect` (community + weekly call). Helpful tone, not salesy.
4. Internal links (in prose, natural anchors): your assigned hub + 2 assigned siblings + 1 existing post. Sibling articles publish simultaneously — link them even though they're new.
5. External links only to official docs: https://docs.anthropic.com/... or https://code.claude.com/docs/... or https://claude.com — with target="_blank" rel="noopener noreferrer". Verify claims via web search before asserting features. NEVER link skool.com directly (use /skool-redirect).

## Research requirement
Before writing, run 1-2 web searches on the target keyword + any Claude feature you assert (features change; wrong claims are rejected). Skills = folder w/ SKILL.md instructions Claude loads when relevant (exist across Claude apps, Cowork, Claude Code). Cowork = agentic desktop workspace for non-developers (folder scoping, skills, scheduled tasks, connectors). Do not invent UI paths.

## Existing posts you may link (slugs)
claude-prompting-guide (prompts hub) · claude-prompts-for-business · is-claude-ai-free-pricing-guide (pricing hub) · claude-for-business · claude-for-marketers · ai-for-consultants · claude-for-content-creation · 5-claude-workflows-for-non-technical-professionals · how-to-use-claude-for-writing · claude-vs-chatgpt-for-real-work
