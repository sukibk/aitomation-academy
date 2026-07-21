"use client";

import { useState } from "react";
import posthog from "posthog-js";

// A priced CTA opens Stripe checkout directly: a buyer clicking a price has
// intent, so no scroll-to-pricing or page hop in between. Falls back to the
// product page if the checkout API is unavailable.
export function BuyLink({
  product,
  className = "",
  dataCta,
  children,
}: {
  product: "vault" | "membership";
  className?: string;
  dataCta?: string;
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const fallback = product === "membership" ? "/academy#membership" : "/vault#buy";

  async function start(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      posthog.capture("vault_checkout_start", { product, source: dataCta });
    } catch {}
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url as string;
        return;
      }
    } catch {}
    window.location.href = fallback;
  }

  return (
    <a href={fallback} onClick={start} data-cta={dataCta} aria-busy={loading} className={className}>
      {loading ? "Starting checkout…" : children}
    </a>
  );
}
