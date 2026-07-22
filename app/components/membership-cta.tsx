"use client";

import { useState } from "react";
import { BuyLink } from "@/app/components/buy-link";
import { MEMBERSHIP, currentLevel } from "@/lib/pricing";

const ANNUAL_SAVINGS = MEMBERSHIP.price * 12 - MEMBERSHIP.annualPrice;

// Monthly/annual billing toggle + direct-checkout CTA for the Academy pricing card.
export function MembershipCta() {
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");
  const { current } = currentLevel();
  const isAnnual = plan === "annual";

  const tab = (value: "monthly" | "annual", label: string) => (
    <button
      type="button"
      onClick={() => setPlan(value)}
      className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
        plan === value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-slate-100 p-1">
        {tab("monthly", "Monthly")}
        {tab("annual", `Annual · save $${ANNUAL_SAVINGS}`)}
      </div>

      <BuyLink
        product="membership"
        plan={plan}
        dataCta={`membership_${plan}`}
        className="group inline-flex w-full flex-col items-center justify-center rounded-full bg-orange-500 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-orange-600 sm:w-auto sm:px-10 sm:py-4"
      >
        <span className="text-center text-base leading-snug sm:text-lg">
          {isAnnual
            ? `Join the Academy for $${MEMBERSHIP.annualPrice}/yr`
            : `Join the Academy for $${current.price}/mo`}
        </span>
        <span className="mt-0.5 text-xs font-medium text-orange-100">
          {isAnnual
            ? `That's $${ANNUAL_SAVINGS} off vs monthly · cancel anytime`
            : "Card payment via Stripe · cancel in two clicks"}
        </span>
      </BuyLink>
    </div>
  );
}
