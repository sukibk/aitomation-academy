import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { VAULT } from "@/lib/pricing";

const BULLETS = [
  "35 installable Claude Cowork skills + 500+ prompts & workflows",
  "Sorted by your job — consultant, marketer, creator, founder, agency",
  "Built for how Claude actually works, not recycled ChatGPT lists",
  "New recipes added every week",
];

// Homepage band that sells the Vault as the flagship product.
export function VaultOffer() {
  if (VAULT.salesPaused) return null;
  return (
    <section className="px-6 py-20 sm:px-12" data-section="vault_offer">
      <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-orange-600">
            The Claude Vault
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {VAULT.itemCount} recipes that turn Claude into finished work
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Stop starting from a blank box. Find your job, copy a recipe, get a real
            deliverable — a client report, a deck, a week of content, a working page.
          </p>
          <ul className="mt-6 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-slate-700">
                <Check className="mt-1 h-5 w-5 shrink-0 text-orange-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-slate-900 p-8 text-center">
          <p className="text-slate-400">
            List price <span className="line-through">${VAULT.anchorPrice}</span> — launch pricing
          </p>
          <p className="mt-2 text-5xl font-bold text-white">
            ${VAULT.launchPrice}
            <span className="text-base font-normal text-slate-400"> one-time</span>
          </p>
          <Link
            href="/vault"
            data-cta="vault_offer"
            className="group mt-6 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Get the Vault
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-4 text-sm text-slate-500">
            {VAULT.guaranteeDays}-day refund · instant access · no subscription
          </p>
        </div>
      </div>
    </section>
  );
}
