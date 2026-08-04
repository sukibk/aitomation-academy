// First-party first-touch attribution. Runs in OUR bundle, stores in OUR
// localStorage — survives ad blockers that kill PostHog/Meta (the "dark buyer"
// problem: a Vault buyer on 2026-08-02 left zero analytics trail). Captured
// once on first visit, carried into /api/checkout, stamped onto the Stripe
// session metadata, and surfaced by the webhook in sale alerts + Brevo.
const KEY = "aa_first_touch";

export type FirstTouch = {
  landing: string;
  ref: string;
  utm: string;
  ts: string;
};

export function recordFirstTouch(): void {
  try {
    if (localStorage.getItem(KEY)) return; // first touch only
    const p = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign"]
      .map((k) => (p.get(k) ? `${k.replace("utm_", "")}=${p.get(k)}` : null))
      .filter(Boolean)
      .join(",");
    const touch: FirstTouch = {
      landing: window.location.pathname.slice(0, 180),
      ref: (document.referrer || "direct").slice(0, 180),
      utm: utm.slice(0, 180),
      ts: new Date().toISOString(),
    };
    localStorage.setItem(KEY, JSON.stringify(touch));
  } catch {}
}

export function getFirstTouch(): FirstTouch | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    return null;
  }
}
