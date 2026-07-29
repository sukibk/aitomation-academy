"use client";

import { useState } from "react";
import posthog from "posthog-js";

// One-field feedback form for checkout cancellers. Captures straight into
// PostHog (event: checkout_feedback) so the answer sits next to the funnel
// data instead of dying in an inbox. No backend, no mail client.
export function CheckoutFeedback({ context = "membership" }: { context?: string }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="mt-8 text-sm text-slate-400">
        Got it — thank you. This genuinely helps.
      </p>
    );
  }

  return (
    <form
      className="mx-auto mt-8 max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        try {
          posthog.capture("checkout_feedback", { feedback: text.trim(), context });
        } catch {}
        setSent(true);
      }}
    >
      <label htmlFor="checkout-feedback" className="text-sm text-slate-500">
        Something put you off at checkout? Tell me what it was — I read every one.
      </label>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id="checkout-feedback"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="It was the price / I had a question about… / etc."
          className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        />
        <button
          type="submit"
          className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-orange-400 hover:text-orange-400"
        >
          Send
        </button>
      </div>
    </form>
  );
}
