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

---

# REVENUE FLOWS (added 2026-07-21)

Brevo Starter active. Templates 16-30 created. Lists: 19 all members · 20 buyers · 21 upgrade targets (never paid) · 22 churned. Attributes added: SEGMENT, LTV, ABANDONED_AT, CART, RECOVERY_URL. Site pushes Brevo events: `cart_abandoned`, `purchased`. Brevo tracker installed site-wide (page-visit triggers work once deployed).

## Step 1 — import the member base (one command, uses your CRON_SECRET)
```
cd "/Users/MSudar/Desktop/proba kurs"
curl -X POST "https://www.aitomationacademy.com/api/admin/import-contacts?lists=19,21" \
  -H "Authorization: Bearer YOUR_CRON_SECRET" -H "Content-Type: text/plain" \
  --data-binary @import_np1.csv
curl -X POST "https://www.aitomationacademy.com/api/admin/import-contacts?lists=19,21" \
  -H "Authorization: Bearer YOUR_CRON_SECRET" -H "Content-Type: text/plain" \
  --data-binary @import_np2.csv
```
(The 20 paying/trial members are already imported to list 19. When you export churned members from Skool, tell Claude — same pipeline, lists=19,22.)

## Step 2 — assemble 4 automations in Brevo (Automations → Create a workflow → custom)

**WF-1 "Upgrade launch"** (activate right AFTER the freemium flip)
1. Entry: Contact added to list → list 21. Also tick "allow contacts already in list to enter when activated" so the imported base enters.
2. Send template 16 (U1 announcement).
3. Wait 2 days.
4. Condition: "Email opened?" (the U1 send)
   - NO → Send template 17 (U1R resend) → Wait 1 day → continue below.
   - YES → Condition: "Clicked?" → NO → Send template 19 (U2O objections). YES → skip (site + abandon flow take over).
5. Send template 18 (U2 proof) — day 2-3 for everyone still in flow.
6. Wait 2 days → Send template 20 (U3 ladder deadline).
7. Wait 4 days → Send template 21 (U4 last call + $17 Vault downsell).
8. Exit conditions (workflow settings → exit): event `purchased` received; OR contact added to list 20; OR unsubscribed.

**WF-2 "Win-back"** (activate after churned import lands in list 22)
1. Entry: Contact added to list 22 (tick allow-existing).
2. Send 22 (W1) → Wait 2 days → If NOT opened → send 23 (W1R).
3. Wait 1 day → If opened (either) → send 24 (W2 proof).
4. Wait 3 days → send 25 (W3 final).
5. Exits: event `purchased`, list 20, unsubscribe. Suppress: SEGMENT = PAYING/TRIAL.

**WF-3 "Vault visitor"**
1. Entry: Website activity → "Visited page" URL contains `/vault` (tracker is live). Re-entry: max once per 30 days.
2. Wait 24h → Condition: event `purchased` in last 1 day? YES → exit. NO → send 26 (V1).
3. Wait 2 days → same purchase check → send 27 (V2).
4. Exits: event `purchased`, list 20, unsubscribe. Suppress list 21 members currently inside WF-1 (workflow settings → don't enter if in WF-1) to avoid double-mailing.

**WF-4 "Checkout abandon"**
1. Entry: Custom event `cart_abandoned` (arrives from Stripe via our webhook ~2h after an unfinished checkout).
2. Send 28 (A1 "finish in 60 seconds" — uses contact.RECOVERY_URL).
3. Wait 1 day → purchase check → send 29 (A2).
4. Wait 2 days → purchase check → send 30 (A3).
5. Exits: event `purchased`, unsubscribe. Priority: this WF wins over WF-1/WF-3 (set "pause other workflows" if offered, or rely on exits).

## Step 3 — Stripe dashboard (1 minute)
Developers → Webhooks → your endpoint → add event `checkout.session.expired` (keep the existing ones).

## Step 4 — the Skool twins
Every send day, publish the community post twin (titles in the plan file / ask Claude). U1's twin: pin it.

## Notes
- New-joiner nurture (D0-D14) stays on the existing cron engine; do NOT also add new joiners to WF-1 (list 21 is the historical import only).
- All templates are edit-in-place in Brevo → Templates. Ids: U1=16 U1R=17 U2=18 U2O=19 U3=20 U4=21 W1=22 W1R=23 W2=24 W3=25 V1=26 V2=27 A1=28 A2=29 A3=30.
- Mailing address used in footers: 7901 4th St N, STE 300, St. Petersburg, FL 33702 (your Brevo account address) — tell Claude if it should be something else.
- The 1,300 → $99 ladder is now promised in writing in these emails. ENFORCE IT when the community crosses 1,300.
