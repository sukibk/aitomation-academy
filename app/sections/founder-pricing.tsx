import { CheckoutButton } from "@/app/vault/checkout-button";
import { TrendingUp, Check } from "lucide-react";
import { LADDER, MEMBER_COUNT, currentLevel } from "@/lib/pricing";

const PERKS = [
  "The 7-Day Claude Challenge: zero to a live website",
  "The Claude Cowork & Claude Code courses",
  "The full Claude Vault, included (updated weekly)",
  "Weekly live call: bring your project, we fix it live",
  "Marko in the community daily: questions get answers, not a ghost town",
  "1,200+ professionals at your stage, building the same systems",
];

// Circle-style rising "level" pricing: lock the current founder rate before it climbs.
export function FounderPricing() {
  const { current, next, spotsToNext } = currentLevel();
  return (
    <section id="membership" className="bg-slate-900 px-6 py-20 sm:px-12" data-section="founder_pricing">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/15 px-4 py-1 text-sm font-medium text-orange-400">
          <TrendingUp className="h-4 w-4" /> The price only goes up
        </span>
        <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
          Want everything, not just the Vault?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Academy membership includes the Vault plus every course and the weekly call.
          Members lock their rate for life, and the rate rises as the community grows.
        </p>

        {/* Ladder */}
        <div className="mt-10 flex items-end justify-center gap-3 sm:gap-6">
          {LADDER.map((lvl) => {
            const isCurrent = lvl.threshold === current.threshold;
            return (
              <div
                key={lvl.threshold}
                className={`flex-1 rounded-2xl border p-5 ${
                  isCurrent
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-slate-700 bg-slate-800/40 opacity-70"
                }`}
              >
                <div className={`text-sm ${isCurrent ? "text-orange-400" : "text-slate-400"}`}>
                  {lvl.label}
                </div>
                <div className="mt-1 text-3xl font-bold text-white">
                  ${lvl.price}
                  <span className="text-sm font-normal text-slate-400">/mo</span>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {lvl.threshold === 0 ? "now" : `at ${lvl.threshold.toLocaleString()} members`}
                </div>
                {isCurrent && (
                  <div className="mt-2 text-xs font-medium text-orange-400">← you lock this</div>
                )}
              </div>
            );
          })}
        </div>

        {next && spotsToNext !== null && (
          <p className="mt-6 text-sm text-slate-400">
            {MEMBER_COUNT.toLocaleString()} members in. Just{" "}
            <span className="font-semibold text-white">{spotsToNext.toLocaleString()} more</span>{" "}
            until the rate rises to ${next.price}/mo for new members. Lock ${current.price}
            /mo for life today.
          </p>
        )}

        <ul className="mx-auto mt-10 max-w-md space-y-3 text-left">
          {PERKS.map((p) => (
            <li key={p} className="flex items-start gap-3 text-slate-200">
              <Check className="mt-1 h-5 w-5 shrink-0 text-orange-400" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <CheckoutButton
          product="membership"
          label={`Lock $${current.price}/mo and join the Academy`}
          className="mt-10 flex justify-center"
        />
        <p className="mt-4 text-sm text-slate-500">
          Cancel in two clicks. No emails, no retention forms. Your rate never rises.
        </p>
      </div>
    </section>
  );
}
