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
  price: 69, // $/mo — keep in sync with LADDER current level
  annualPrice: 649, // $/yr — save $179 vs 12 x $69 (828)
  currency: "usd",
  // Live Stripe catalog prices (product prod_UvpOH91byN7C0D, verified 2026-07-22).
  // Checkout prefers these; if one is blank the route falls back to an inline
  // price so a bad/missing ID can never break checkout. Env vars override.
  priceId: "price_1Tvxk6QgUMvxzjy7NlpkL1pq", // monthly
  priceIdAnnual: "", // yearly — set once you create the $690/yr price; empty = inline $690/yr
};

// HONEST-URGENCY CONFIG. These are real, enforced deadlines — when a timer
// hits zero, the price actually changes. Fake timers are never used.
//
// 2026-07-27: the community crossed the 1,300-member threshold while the
// founder rate was still live. Marko's call: honor a public two-week
// extension, announced as such, then enforce the rise for good.
// On 2026-08-11: membership rises to $99/mo (Stripe + Skool), Vault rises
// to its $49 list price, MEMBER_COUNT gets refreshed, and these dates clear.
export const FOUNDER_RATE_ENDS_AT: string | null = "2026-08-10T23:59:59-04:00";
export const VAULT_PRICE_RISES_AT: string | null = "2026-08-10T23:59:59-04:00";

// Current member count (update from Skool; crossed 1,300 as of 2026-07-27). Drives the ladder.
export const MEMBER_COUNT = 1300;

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
  { threshold: 1300, price: 99, label: "Growth rate" },
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
