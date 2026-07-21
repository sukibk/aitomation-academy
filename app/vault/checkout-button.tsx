"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import posthog from "posthog-js";
import { VAULT } from "@/lib/pricing";

export function CheckoutButton({
  label = "Get instant access",
  sublabel,
  className = "",
  product = "vault",
}: {
  label?: string;
  sublabel?: string;
  className?: string;
  product?: "vault" | "membership";
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setLoading(true);
    setError(null);
    try {
      posthog.capture("vault_checkout_start", { product });
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
      } else {
        setError(data.error || "Checkout is not available right now.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (VAULT.salesPaused) {
    return (
      <div className={className}>
        <p className="rounded-xl border border-slate-600 px-6 py-4 text-sm text-slate-300">
          Purchases are paused for a few days while we onboard the current batch of
          buyers. Check back shortly: the launch price will still be here.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        onClick={start}
        disabled={loading}
        className={`group inline-flex w-full items-center justify-center bg-orange-500 font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-70 sm:w-auto ${
          sublabel ? "flex-col rounded-full px-6 py-3.5 sm:px-10 sm:py-4" : "rounded-xl px-6 py-3.5 text-base sm:px-8 sm:py-4"
        }`}
      >
        {loading ? (
          <span className="inline-flex items-center text-base">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Starting checkout…
          </span>
        ) : sublabel ? (
          <>
            <span className="inline-flex items-center text-center text-base leading-snug sm:text-lg">
              {label}
              <ArrowRight className="ml-2 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-0.5 hidden text-xs font-medium text-orange-100 sm:block">{sublabel}</span>
          </>
        ) : (
          <>
            {label}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
      {sublabel && (
        <p className="mt-2 text-center text-xs text-slate-400 sm:hidden">{sublabel}</p>
      )}
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
    </div>
  );
}
