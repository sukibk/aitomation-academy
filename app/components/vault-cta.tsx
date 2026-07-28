import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { VAULT } from "@/lib/pricing";

// THE standard Vault promo card for blog posts and landing sections.
// Dark card, framed cover left, what-you-GET checklist (not prose), CTA
// bottom-right. Don't hand-roll per-page variants.
const GETS = [
  "500+ copy-paste prompts & workflows",
  "35 installable Cowork skills",
  "Role packs for 6 professions",
  "New prompts & skills every week, forever",
];

export function VaultCta({
  title,
  lede,
  dataCta = "vault_cta",
}: {
  title: string;
  lede?: string;
  dataCta?: string;
}) {
  return (
    <div className="not-prose my-10 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 p-6">
      <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
        <Image
          src="/images/vault-cover.jpg"
          alt={`The Claude Vault — ${VAULT.itemCount} prompts & skills`}
          width={170}
          height={227}
          className="mx-auto w-[170px] shrink-0 rounded-lg shadow-xl ring-1 ring-white/10"
        />
        <div>
          <p className="font-semibold text-white">{title}</p>
          {lede && <p className="mt-1.5 text-sm text-slate-400">{lede}</p>}
          <ul className="mt-4 space-y-2">
            {GETS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex sm:justify-end">
            <a
              href="/vault"
              data-cta={dataCta}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600 sm:w-auto"
            >
              See the Vault
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
