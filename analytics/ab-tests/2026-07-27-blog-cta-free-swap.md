---
status: running
started: 2026-07-27
component: blog mid-article CTA boxes (certification + pricing guide), entry popup, lead magnet section
metric: /free pageviews, lead_form_submitted, popup_form_submitted, list 6 growth; secondary: vault CTA clicks
decision_date: 2026-08-10
---

# Blog CTA swap: free-first at 25% depth + product visuals

## Why
14 days of autocapture: the mid-article $17 Vault boxes on /blog/claude-certification and
/blog/is-claude-ai-free-pricing-guide got ~0 clicks while free CTAs on the same pages got 64.
Scroll depth showed the boxes sat below where most visitors ever reach (pricing guide: 18%
pass 40% depth; certification: 35%). Diagnosis: exposure (too deep) x offer (paid ask to
researcher-intent traffic) x copy (ad-style price banner).

## What changed (commit ~2026-07-27)
1. NEW free-kit capture box at ~25% depth on both posts (after the quick-answer section),
   linking to /free, with generated free-kit visual (public/images/free-kit-visual.png).
2. Existing Vault boxes kept in place but restyled dark with generated Vault visuals
   (vault-visual.png wide / vault-visual-sq.png square).
3. Entry popup got the free-kit visual header; /free lead-magnet section got the kit image.

## Decision rule (evaluate 2026-08-10)
- If the new free boxes drive meaningful /free traffic + captures: extend pattern to other
  high-traffic posts.
- If <=2 captures/week attributable: conclude mid-article CTAs are dead on this audience
  regardless of offer; strip them and rely on top banner + popup + end CTA.
- Do NOT edit these components/pages while this runs.
