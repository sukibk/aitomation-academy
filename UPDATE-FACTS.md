# Verified Claude Facts — July 19, 2026 (for article updates; sources: anthropic.com/news, platform.claude.com/docs, support.claude.com)

## Current model lineup (newest first)
- **Claude Fable 5** — Anthropic's most capable generally available model, a tier ABOVE Opus. Released June 9, 2026. Taken offline June 12–July 1 by a U.S. export-control directive (after a reported jailbreak method); **restored globally July 1, 2026** after Commerce lifted the order — Anthropic added a safety classifier that blocks the flagged technique >99% of the time (those requests reroute to Opus 4.8). Available on Claude.ai, Claude Code, Claude Cowork, and the API. API price: $10 in / $50 out per M tokens; 1M-token context.
- **Claude Mythos 5** — Fable 5's sibling with certain safeguards lifted; NOT generally available — limited to approved organizations (Project Glasswing). Mention only as "restricted availability for approved organizations".
- **Claude Opus 4.8** — premium tier below Fable. API $5 / $25.
- **Claude Sonnet 5** — released June 30, 2026; now the DEFAULT model on Free and Pro plans; strongest Sonnet for agentic work; slightly outperforms Opus 4.8 on some knowledge work. API intro $2 / $10 through Aug 31, 2026 (then $3/$15).
- **Claude Haiku 4.5** — fastest/cheapest. API $1 / $5.

## Subscription plans (claude.com/pricing)
- Free: Sonnet 5 default, usage-limited.
- Pro: $20/mo (≈$17/mo annual). Sonnet 5 default; premium models via usage.
- Max 5x: $100/mo · Max 20x: $200/mo — higher limits, priority, premium model access incl. Fable 5 usage.
- Team & Enterprise tiers exist. Fable 5 usage on subscriptions is partly usage-credit-metered.

## Products
- Claude apps (web/desktop/mobile), **Claude Cowork** (agentic workspace for non-developers: folder scoping, skills, scheduled tasks, connectors), **Claude Code** (agentic coding: terminal/IDE/desktop/web), Claude Tag (Slack). Skills exist across Claude apps, Cowork, and Claude Code.

## Update rules for old articles
1. Fix any outdated model claims (e.g. "Sonnet 4", "Opus 4.5/4.6", "Claude 3.x" as current, old default-model claims, old prices). Historical mentions may stay if clearly framed as past.
2. Comparison articles must reflect the CURRENT lineup above — name Fable 5 as the flagship and note Mythos 5's restricted status where the lineup is discussed.
3. Pricing article: exact numbers above; note Sonnet 5 is the new Free/Pro default and Fable 5's July 1 restoration.
4. Do NOT touch titles/slugs (SEO); update `description` only if factually wrong. Add/refresh `updatedAt: "2026-07-19"` in the post object.
5. Add the orange Vault CTA box (pattern from content/blog/claude-for-marketers.tsx — "550+ Claude prompts & skills... /vault") mid-article IF the article lacks one. Keep existing /skool-redirect CTAs.
6. All ARTICLE-RULES.md constraints still apply (no emojis, no banned words, JSX-safe).
