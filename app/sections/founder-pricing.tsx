import { Check, ShieldCheck } from "lucide-react";
import { Mark } from "@/app/components/mark";
import { MEMBER_COUNT, currentLevel, FOUNDER_RATE_ENDS_AT } from "@/lib/pricing";
import { CountdownBar } from "@/app/components/countdown-bar";
import { MembershipCta } from "@/app/components/membership-cta";

const PERKS = [
  "The 7-Day Claude Challenge: zero to a live website",
  "The Claude Cowork & Claude Code courses",
  "The full Claude Vault, included (updated weekly)",
  "Weekly live call: we fix your project live",
  "Marko in the community daily",
  "Cancel in two clicks",
];

// Talas-style pricing card: big highlighted price, locked-rate badge,
// checkmark benefit grid, pill CTA with subcaption. Honest ladder mechanics:
// the future price is labeled as the price at the next member threshold, not a
// fake past price.
export function FounderPricing() {
  const { current, next } = currentLevel();
  return (
    <section id="membership" className="scroll-mt-20 bg-slate-50 px-6 py-20 sm:px-12" data-section="founder_pricing">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-0.5 w-8 rounded bg-orange-400" />
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-600">
              Lock your price · it only goes up
            </span>
          </div>
          <h2 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            Join the Academy at <Mark>${current.price}/mo</Mark>, locked for life.
          </h2>
          {next && (
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              We said the price rises to ${next.price}/mo at{" "}
              {next.threshold.toLocaleString()} members — and we just crossed{" "}
              {next.threshold.toLocaleString()}. Out of fairness to everyone
              mid-decision, the ${current.price} rate stays open two more
              weeks. Then it rises for good. Your rate never changes once
              you&apos;re in.
            </p>
          )}
        </div>

        {/* Price card */}
        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
          <div className="h-2 w-full bg-orange-400" />
          <div className="px-6 py-10 sm:px-12">
            {/* Price row */}
            <div className="flex items-end justify-center gap-8 sm:gap-12">
              {next && (
                <div className="pb-2 text-center">
                  <div className="text-3xl font-bold text-slate-400 sm:text-4xl">
                    ${next.price}
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    at {next.threshold.toLocaleString()} members
                  </div>
                </div>
              )}
              <div className="text-center">
                <div className="text-6xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
                  <Mark>${current.price}</Mark>
                </div>
                <div className="mt-2 text-slate-500">per month · while you&apos;re a member</div>
              </div>
            </div>

            {/* Real deadline: 1,300 crossed, publicly-announced two-week extension */}
            {next && (
              <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-2">
                <CountdownBar
                  deadline={FOUNDER_RATE_ENDS_AT}
                  label="Price increases in"
                />
                <p className="text-center text-xs text-slate-500">
                  {MEMBER_COUNT.toLocaleString()}+ members — threshold crossed. After the
                  deadline, new joiners pay ${next.price}/mo. Your rate locks for life the
                  day you join.
                </p>
              </div>
            )}

            {/* Benefit grid */}
            <div className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {PERKS.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange-400 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-slate-700">{p}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col items-center">
              <MembershipCta />
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck className="h-4 w-4 text-orange-500" />
                Your rate never rises. No emails, no retention forms.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-slate-500">
          <span className="font-bold text-slate-900">{MEMBER_COUNT.toLocaleString()}+</span>{" "}
          members are already inside
        </p>
      </div>
    </section>
  );
}
