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
  currency: "usd",
  // Live Stripe catalog price (product prod_UvpOH91byN7C0D, verified 2026-07-22).
  // Checkout prefers this; if it's ever blank the route falls back to an inline
  // price so a bad ID can never break checkout. Env STRIPE_MEMBERSHIP_PRICE overrides.
  priceId: "price_1Tvxk6QgUMvxzjy7NlpkL1pq",
};

// Current member count (update from Skool; 1,276 as of 2026-07-21). Drives the ladder.
export const MEMBER_COUNT = 1276;

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
  let current = LADDER[0];
  for (const lvl of LADDER) if (members >= lvl.threshold) current = lvl;
  const next = LADDER.find((l) => l.threshold > members) ?? null;
  const spotsToNext = next ? next.threshold - members : null;
  return { current, next, spotsToNext };
}
