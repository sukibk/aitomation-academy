import { ArrowRight, Check, Lock } from "lucide-react";
import { Mark } from "@/app/components/mark";
import { VAULT } from "@/lib/pricing";
import { BuyLink } from "@/app/components/buy-link";

const BULLETS = [
  "35 installable Claude Cowork skills + 500+ prompts & workflows",
  "Sorted by your job: consultant, marketer, creator, founder, agency",
  "Built for how Claude actually works, not recycled ChatGPT lists",
  "New prompts & skills added every week",
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
            Claude prompts &amp; skills that do the work for you
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Stop starting from a blank box. Find your job, paste the prompt, get a real
            deliverable: a client report, a deck, a week of content, a working page.
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
        <div className="overflow-hidden rounded-3xl bg-white text-center shadow-xl ring-1 ring-slate-200">
          <div className="h-2 w-full bg-orange-400" />
          <div className="px-8 py-10">
            <div className="flex items-end justify-center gap-8">
              <div className="pb-2 text-center">
                <div className="text-3xl font-bold text-slate-400">
                  <s className="decoration-red-400 decoration-2">${VAULT.anchorPrice}</s>
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  list price
                </div>
              </div>
              <div>
                <div className="text-6xl font-extrabold tracking-tight text-slate-900">
                  <Mark>${VAULT.launchPrice}</Mark>
                </div>
                <div className="mt-2 text-slate-500">one-time · yours forever</div>
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
                <Lock className="h-4 w-4" /> Launch price, locked when you buy
              </span>
            </div>
            <BuyLink
              product="vault"
              dataCta="vault_offer"
              className="group mt-7 inline-flex w-full flex-col items-center justify-center rounded-full bg-orange-500 px-10 py-4 font-semibold text-white transition-colors hover:bg-orange-600"
            >
              <span className="inline-flex items-center text-lg">
                Get 550+ prompts for ${VAULT.launchPrice}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-0.5 text-xs font-medium text-orange-100">
                Instant access · {VAULT.guaranteeDays}-day money-back guarantee
              </span>
            </BuyLink>
          </div>
        </div>
      </div>
    </section>
  );
}
