"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

// Fires once per landing on the real success page so PostHog funnels can
// close the loop from vault_checkout_start to completed purchase, and so
// Meta's dataset learns what a buyer looks like (ads optimization + ROAS).
// The Stripe session id doubles as Meta's eventID: refreshing the success
// page won't double-count the purchase.
export function PurchaseTracker({
  product,
  sessionId,
}: {
  product: "vault" | "membership";
  sessionId?: string;
}) {
  useEffect(() => {
    try {
      posthog.capture("purchase_completed", { product });
    } catch {}
    try {
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      fbq?.(
        "track",
        "Purchase",
        {
          value: product === "membership" ? 69 : 17,
          currency: "USD",
          content_name: product,
        },
        sessionId ? { eventID: sessionId } : undefined,
      );
    } catch {}
  }, [product, sessionId]);
  return null;
}
