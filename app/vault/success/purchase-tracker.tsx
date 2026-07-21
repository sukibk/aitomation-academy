"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

// Fires once per landing on the real success page so PostHog funnels can
// close the loop from vault_checkout_start to completed purchase.
export function PurchaseTracker({ product }: { product: "vault" | "membership" }) {
  useEffect(() => {
    try {
      posthog.capture("purchase_completed", { product });
    } catch {}
  }, [product]);
  return null;
}
