"use client";

import { useState } from "react";
import posthog from "posthog-js";

// Multiple-choice feedback for checkout cancellers. One tap = answer captured
// (event: checkout_feedback) into PostHog next to the funnel data. "Something
// else" reveals a free-text field.
const REASONS = [
  "The price is too high for me",
  "Not ready yet, still deciding",
  "I have a question that wasn't answered",
  "My payment method isn't supported",
];

export function CheckoutFeedback({ context = "membership" }: { context?: string }) {
  const [other, setOther] = useState(false);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const send = (reason: string, detail?: string) => {
    try {
      posthog.capture("checkout_feedback", {
        reason,
        detail: detail?.trim() || undefined,
        context,
      });
    } catch {}
    setSent(true);
  };

  if (sent) {
    return (
      <p className="mt-8 text-sm text-slate-400">
        Got it — thank you. This genuinely helps.
      </p>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-md">
      <p className="text-sm text-slate-500">
        Something put you off at checkout? One tap helps me fix it:
      </p>
      <div className="mt-3 flex flex-col gap-2">
        {REASONS.map((reason) => (
          <button
            key={reason}
            type="button"
            onClick={() => send(reason)}
            className="rounded-lg border border-slate-600 px-4 py-2.5 text-left text-sm text-slate-300 transition-colors hover:border-orange-400 hover:text-orange-400"
          >
            {reason}
          </button>
        ))}
        {!other ? (
          <button
            type="button"
            onClick={() => setOther(true)}
            className="rounded-lg border border-slate-600 px-4 py-2.5 text-left text-sm text-slate-300 transition-colors hover:border-orange-400 hover:text-orange-400"
          >
            Something else…
          </button>
        ) : (
          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!text.trim()) return;
              send("Something else", text);
            }}
          >
            <input
              autoFocus
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tell me in a sentence…"
              className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            <button
              type="submit"
              className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-orange-400 hover:text-orange-400"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
