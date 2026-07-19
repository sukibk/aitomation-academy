# Skool → Brevo Sequence Engine

Self-hosted replacement for Skoot CRM / Fiducia ($100+/mo). No database, no monthly tool.
**Brevo** is CRM + sender + open/click tracker + state store. **Vercel Cron** is the scheduler.
**Zapier** bridges Skool events to our backend (Skool has no native webhooks).

## Files
- `lib/brevo.ts` — Brevo API helpers (upsert, list, send, update).
- `lib/sequence.ts` — the emails (D0,1,2,4,6,8,11,14 + paid welcome). Edit copy here.
- `app/api/skool/route.ts` — ingest webhook (Zapier → here). Sends D0 on join; paid welcome on upgrade.
- `app/api/cron/sequence/route.ts` — daily stepper. Sends each member's next due email (one/day, idempotent).
- `app/api/brevo-events/route.ts` — open/click/unsub webhook. Stops sequence on unsub/spam.
- `vercel.json` — cron: daily 15:00 UTC.

## State model (all in Brevo contact attributes, list 19)
FIRSTNAME · LASTNAME · ROLE · EXPERIENCE · SKOOL_JOINED_AT (date) · MEMBER_STATUS (free|paid) ·
SEQ_STATUS (active|paid|done|unsub) · SEQ_LAST_DAY (highest step day sent; -1=none) · ENGAGED_AT (date).
Idempotency: a step sends only if `step.day > SEQ_LAST_DAY && step.day <= daysSinceJoin`. Proven one-per-day, dupe-free, catch-up-safe.

## Env vars to add in Vercel (Project → Settings → Environment Variables)
- `BREVO_API_KEY` — already set.
- `SKOOL_WEBHOOK_SECRET` — invent a long random string. Used by the Zapier POST.
- `CRON_SECRET` — invent another. Vercel auto-sends it as `Authorization: Bearer` to the cron.
- `BREVO_WEBHOOK_SECRET` — invent another. Used by the Brevo events webhook.

## Zapier setup (2 Zaps — you already have Skool connected)
**Zap 1 — new member:**
1. Trigger: Skool → "Answered Membership Questions".
2. Action: Webhooks by Zapier → POST
   - URL: `https://www.aitomationacademy.com/api/skool?secret=YOUR_SKOOL_WEBHOOK_SECRET`
   - Payload type: JSON
   - Data: `email` → the E-mail answer · `firstName` → member first name · `role` → the "What best describes you?" answer · `experience` → the "Level of experience" answer · `event` → `join`

**Zap 2 — upgrade:**
1. Trigger: Skool → "New Paid Member".
2. Action: Webhooks by Zapier → POST same URL, Data: `email`, `firstName`, `event` → `paid`.

## Brevo webhook (open/click/unsub tracking)
Brevo → Settings → Webhooks → Add. Events: opened, clicks, unsubscribed, spam.
URL: `https://www.aitomationacademy.com/api/brevo-events?secret=YOUR_BREVO_WEBHOOK_SECRET`
(Opens/clicks are also visible natively per email in the Brevo "Transactional → Logs / Statistics" view.)

## Day-0 Skool DM (native, free)
Set the one native auto-DM via the Apify actor `groups:setAutoDM` (300 chars, #NAME# token).
Days 2/5 DMs have no Skool API. Options, cheapest first: (a) keep DMs to Day-0 only + let email carry the rest;
(b) a future `/api/cron/dm-worklist` that emails Marko a daily "DM these people this text" list for 5-min manual sends;
(c) reverse-engineer Skool's internal chat endpoint with the admin cookie (fragile, not built).

## Go-live checklist
1. Add the 4 env vars in Vercel (above). Redeploy.
2. Marko: swap Skool membership Q3 to the role question; flip community to freemium (lock all courses except Start Here / Automations / Discount Codes); **lock the Claude Vault**.
3. Fill the real mailing address in `lib/sequence.ts` (MAILING_ADDRESS) — anti-spam law requires it.
4. Build the 2 Zaps + the Brevo webhook.
5. Test: `curl -X POST "https://www.aitomationacademy.com/api/skool?secret=SECRET" -H "Content-Type: application/json" -d '{"email":"you@example.com","firstName":"Test","role":"Founder/Business owner","experience":"Beginner","event":"join"}'` → you should get the D0 email; a contact appears in list 19 with SEQ_LAST_DAY=0.
6. Manually hit the cron once to confirm: `curl "https://www.aitomationacademy.com/api/cron/sequence" -H "Authorization: Bearer YOUR_CRON_SECRET"` → returns `{sent, advanced, skipped}`.

## Editing the sequence
All copy + timing lives in `lib/sequence.ts` (the `SEQUENCE` array). Add/remove steps or change days freely — the stepper adapts. Model names: family only (Opus/Sonnet/Haiku), never versions.
