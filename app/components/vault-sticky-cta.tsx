"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import posthog from "posthog-js";
import { VAULT } from "@/lib/pricing";

const DISMISS_KEY = "vault_sticky_dismissed";

// Sticky bottom-of-screen CTA shown on blog posts after the reader scrolls.
export function VaultStickyCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (VAULT.salesPaused || dismissed || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-700 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/85">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <p className="text-sm text-slate-200">
          <span className="font-semibold text-white">550+ Claude prompts &amp; skills</span>
          <span className="hidden sm:inline">, sorted by your job, updated weekly.</span>
        </p>
        <div className="flex items-center gap-2">
          <Link
            href="/vault"
            data-cta="vault_sticky"
            onClick={() => {
              try {
                posthog.capture("vault_sticky_click");
              } catch {}
            }}
            className="inline-flex items-center whitespace-nowrap rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <s className="mr-1 text-orange-200/80">${VAULT.anchorPrice}</s> ${VAULT.launchPrice}: Get it
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
          <button
            aria-label="Dismiss"
            onClick={() => {
              setDismissed(true);
              try {
                sessionStorage.setItem(DISMISS_KEY, "1");
              } catch {}
            }}
            className="rounded-md p-2 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
