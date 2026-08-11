// Vault offer + Circle-style founder-rate "level" ladder.
// The price rises as the community grows. Honest scarcity — the number must be enforced.
// Edit LADDER + member count as the community grows.

export const VAULT = {
  salesPaused: false, // flip to true to pause sales

  name: "The Claude Vault",
  tagline: "550+ Claude skills, prompts & workflows for real work",
  anchorPrice: 49, // list price — launch $17 rises toward this; keep Stripe list price at $49 so the discount stays honest
  // Launch/front-end price (what checkout charges). Change here + in Stripe.
  launchPrice: 17,
  currency: "usd",
  guaranteeDays: 7,
  itemCount: "550+",
  sectionCount: 20,
};

export const MEMBERSHIP = {
  name: "Claude Code Academy — Membership",
  tagline: "Every course, the full Claude Vault, and the weekly live call",
  price: 97, // $/mo — Growth rate; rise enforced 2026-08-11 (announced "up to $99", set at $97 on 2026-08-12)
  annualPrice: 649, // $/yr — CALIBRATED TO THE $69 ERA; revisit before promoting annual anywhere
  currency: "usd",
  // Monthly catalog price (product prod_UvpOH91byN7C0D). MUST match `price`
  // above — checkout prefers the catalog id; if blank it falls back to inline
  // price_data from `price`, so a bad id can never break checkout. The retired
  // $69 price (price_1Tvxk6QgUMvxzjy7NlpkL1pq) stays on existing subscribers.
  priceId: "price_1U3O8NQgUMvxzjy7cw75ehLK", // monthly $97
  priceIdAnnual: "", // yearly — set once you create a catalog price; empty = inline annualPrice
};

// HONEST-URGENCY CONFIG. These are real, enforced deadlines — when a timer
// hits zero, the price actually changes. Fake timers are never used.
//
// 2026-07-27: the community crossed the 1,300-member threshold while the
// founder rate was still live. Marko honored a public two-week extension,
// then the rise was ENFORCED on 2026-08-11 as promised: $69 → $97/mo.
// Only set a date here again with a real, enforced change behind it.
export const FOUNDER_RATE_ENDS_AT: string | null = null;
// 2026-07-29: Vault stays at launch price indefinitely as an open-ended
// discount off the $49 list price (no deadline claimed anywhere). Only set
// this again with a real, enforced rise behind it.
export const VAULT_PRICE_RISES_AT: string | null = null;

// Vault seat ladder (REAL counter): the launch price covers the next
// VAULT_SEATS.total completed Vault purchases counted from `since` via the
// Stripe API (/api/vault-seats). The site renders the live remaining count.
// COMMITMENT: when remaining hits 0, launchPrice actually rises — same
// contract as the member ladder. Never display a number that isn't derived
// from real purchases.
export const VAULT_SEATS = {
  total: 98,
  since: "2026-07-28T00:00:00Z",
};

// Current member count (update from Skool; 1,349 verified 2026-08-10). Drives the ladder.
export const MEMBER_COUNT = 1349;

// "1,200+" style label, rounded down to the nearest 100. Use this everywhere a
// member count appears in copy so updating MEMBER_COUNT updates the whole site
// (hardcoded counts went stale twice: 400+ → 700+ → 1,200+).
export const MEMBER_COUNT_LABEL = `${Math.floor(MEMBER_COUNT / 100) * 100}+`.replace(
  /^(\d)(\d{3})/,
  "$1,$2",
);

// Membership founder-rate ladder. Price locked for life at the tier you join.
export interface Level {
  threshold: number; // members at/after which this price applies
  price: number; // $/month
  label: string;
}

export const LADDER: Level[] = [
  { threshold: 0, price: 69, label: "Founder rate" },
  { threshold: 1300, price: 97, label: "Growth rate" },
  { threshold: 2000, price: 129, label: "Standard rate" },
];

export function currentLevel(members: number = MEMBER_COUNT): {
  current: Level;
  next: Level | null;
  spotsToNext: number | null;
} {
  // Founder-rate extension: we crossed the 1,300 threshold, but the rise is
  // publicly deferred to FOUNDER_RATE_ENDS_AT. Until that moment the founder
  // rate stays the live price (evaluated at build/render time — the flip on
  // Aug 11 ships with the scheduled price-change deploy).
  if (
    FOUNDER_RATE_ENDS_AT &&
    Date.now() < new Date(FOUNDER_RATE_ENDS_AT).getTime()
  ) {
    return { current: LADDER[0], next: LADDER[1], spotsToNext: null };
  }
  let current = LADDER[0];
  for (const lvl of LADDER) if (members >= lvl.threshold) current = lvl;
  const next = LADDER.find((l) => l.threshold > members) ?? null;
  const spotsToNext = next ? next.threshold - members : null;
  return { current, next, spotsToNext };
}
