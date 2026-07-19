# Landing Page Redesign — Research Findings (2026-07-18)

## The core problem
Current site sells a FREE lead magnet (the "Claude Content System" PDF). It does not sell the Vault or the paid community. Goal: make the site sell the Claude Vault ($ one-time) and upsell Academy membership, pain-point-led, with a Circle-style rising "level" price ladder.

## Findings

### Semrush (proven traffic reality)
- ~ALL organic traffic rides on ONE article: `is-claude-ai-free-pricing-guide` — ranks for dozens of commercial pricing terms: "is claude free" (8100), "anthropic claude pro pricing" (6600), "claude pro price" (2900), "claude ai cost" (1000), "claude plan" (1000), "claude max pricing" (720), "claude code pricing plans" (720)... mostly positions 12-30 (page 2) = huge upside if strengthened.
- `chatgpt-vs-claude-summarizing-transcripts` ranks #1 (vol 260).
- Everything else barely ranks yet. KEYWORD STRATEGY: (1) reinforce the pricing cluster (proven), (2) write the queued role-based/prompts articles, (3) every article must intercept → CTA to Vault/community. Pricing-cluster readers are high commercial intent comparing plans — perfect to convert with "get more from Claude" offer.
- Untapped high-volume on-brand terms (from earlier Semrush): "claude cowork" 74k, "claude code" 301k, "claude skills" 22k ($9.41 CPC), "agentic ai" 90k, "vibe coding" 90k.

### Color (web research)
- Dark site + ORANGE CTA = highest converting combo in 2026 data (orange/red first-viewport CTAs ~38.7% CTR, 2.1x blue/gray; dark-site/orange-button +38% sales lift). Contrast > hue. Solid flat buttons. WCAG AAA (7:1).
- **The site ALREADY uses slate-900 + orange-500.** That is the data-backed winner. DECISION: do NOT replace the palette — systematize it (consistent orange accent, warm neutral, dark sections for offer/CTA), improve contrast + intentionality. Changing away from orange-on-dark would hurt conversions.

### Reference funnel mechanic (ai-profit-lab.circle.so — SPA, couldn't scrape; modeling from user description)
- "Current level / next level" = a founder-rate LADDER: price rises as the community grows. Show member the price they lock now vs the higher next-tier price, with progress toward the next threshold. Creates honest urgency (only works if enforced — matches our earlier scarcity rule).

### Competitor offer pattern (God of Prompt)
- Lifetime one-time ($150, anchored from $299), pain-led copy ("stop stitching PDFs from twenty creators", "skip the $10k agency"), 25+ item stack, 7-day guarantee, 4.8/5 social proof, ONE repeated CTA ("Get Lifetime Access" x4). Structure: Hero → trust → stats → offer → 4 outcome blocks → product carousel → onboarding steps → reviews → FAQ.

### Skool (live)
- 1,200+ members, 2 admins, $69/mo membership. Use "1,200+" on site.

### PostHog
- MCP requires interactive OAuth (can't complete headless). FLAGGED for Marko. Site already tracks rich events (video_progress, CTA clicks by data-section) via posthog-js — redesign preserves + extends these.

## Build decisions
- **Offer on site:** the Claude Vault as the hero product. One-time launch price with $99 anchor (Vault sells for $99 outside; launch/front-end price configurable via env — start $27, show "$99" struck). Order-bump + community upsell downstream. Community ($69/mo) as the upsell/retention.
- **Level ladder:** a "Founder pricing" component showing current price → next tier as members grow (honest, enforce).
- **Stripe:** hosted Checkout Session (no card handling on-site). `/api/checkout` creates session; `/vault` sells it. Needs STRIPE_SECRET_KEY + price env (Marko adds).
- **Sections rewrite:** Hero (pain headline + Vault CTA), keep pain-grid (what-you-get, already pain-led), NEW Vault offer section, NEW founder-pricing ladder, community upsell, keep FAQ/social-proof (numbers updated). Lead magnet demoted to a "free taste" secondary CTA.
- **Articles:** use `aitomation-blog-writer` skill; prioritize pricing-cluster reinforcement + queued role posts; every post CTAs to Vault + community.
