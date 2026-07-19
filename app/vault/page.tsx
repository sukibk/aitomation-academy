import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star, ShieldCheck, RefreshCw } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { VAULT, currentLevel } from "@/lib/pricing";
import { CheckoutButton } from "./checkout-button";
import { FounderPricing } from "@/app/sections/founder-pricing";

export const metadata: Metadata = {
  title: "The Claude Vault — 550+ Claude Recipes",
  description:
    "550+ copy-paste Claude skills, prompts & workflows, organized by your job. Get finished work out of Claude — not chat replies.",
  alternates: { canonical: `${siteConfig.url}/vault` },
};

const INSIDE = [
  ["Skills, not one-liners", "35 ready-to-install Claude Cowork skills that run real jobs — inbox triage, meeting prep, weekly reviews — plus 500+ prompts and multi-step workflows."],
  ["Organized by your job", "Consultant, marketer, creator, founder, agency, ops. Find your section, copy the recipe, get the deliverable. No 30,000-prompt dump to dig through."],
  ["Built for how Claude works", "XML structure, artifacts, projects, extended thinking — not ChatGPT lists pasted into Claude. Every recipe produces a finished document, deck, page, or dataset."],
  ["New recipes every week", "The Vault grows every Tuesday. A prompt pack goes stale the month you buy it — this one doesn't."],
];

const PAINS = [
  "You know Claude can do more, but every prompt feels hit-or-miss.",
  "You keep starting from a blank box and rewriting the same asks.",
  "You bought a \"1,000 prompts\" pack and never opened it twice.",
  "You don't have time to figure out which of the 550 things matters for your job.",
];

const FAQ = [
  ["Which Claude plan do I need?", "Any paid Claude plan works for most recipes. A few Cowork and Claude Code recipes assume the desktop app — each recipe says what it needs."],
  ["Is this just for ChatGPT prompts?", "No — and that's the point. Every recipe is written for how Claude actually works (skills, artifacts, projects), not recycled ChatGPT lists."],
  ["Do I need to be technical?", "No. The Vault is built for non-technical professionals. You paste a recipe, fill the blanks, and get finished work."],
  [`What if it's not for me?`, `${VAULT.guaranteeDays}-day no-questions refund. If it doesn't save you real time, email ${siteConfig.email} and we refund you.`],
  ["Is this affiliated with Anthropic?", "No. AItomation Academy is independent and not endorsed by Anthropic."],
];

export default function VaultPage() {
  const { current } = currentLevel();
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 px-6 py-20 text-center sm:px-12">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-orange-500/15 px-4 py-1 text-sm font-medium text-orange-400">
            {VAULT.itemCount} recipes · {VAULT.sectionCount} sections · updated weekly
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get <span className="text-orange-400">finished work</span> out of Claude — not chat replies
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            The Claude Vault is {VAULT.itemCount} copy-paste skills, prompts, and workflows,
            organized by your job. Paste one, fill the blanks, get a real deliverable.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex items-baseline gap-3">
              <span className="text-slate-500 line-through">${VAULT.anchorPrice}</span>
              <span className="text-4xl font-bold text-white">${VAULT.launchPrice}</span>
              <span className="text-slate-400">one-time</span>
            </div>
            <CheckoutButton label={`Get the Vault — $${VAULT.launchPrice}`} />
            <p className="text-sm text-slate-500">
              {VAULT.guaranteeDays}-day refund. Instant access. No subscription.
            </p>
          </div>
        </div>
      </section>

      {/* Pain */}
      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900">If any of this sounds familiar…</h2>
          <ul className="mt-6 space-y-3">
            {PAINS.map((p) => (
              <li key={p} className="text-lg text-slate-700">— {p}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg text-slate-700">
            The problem was never Claude. It was never having the right recipe for the job in front of you.
          </p>
        </div>
      </section>

      {/* What's inside */}
      <section className="bg-slate-50 px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">What&apos;s inside the Vault</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {INSIDE.map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2 text-orange-500">
                  <Check className="h-5 w-5" />
                  <h3 className="font-semibold text-slate-900">{t}</h3>
                </div>
                <p className="mt-3 text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anchor + guarantee */}
      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-2xl rounded-2xl bg-slate-900 p-10 text-center">
          <p className="text-slate-300">Vault access sells for <span className="line-through">${VAULT.anchorPrice}</span> on its own.</p>
          <p className="mt-2 text-5xl font-bold text-white">${VAULT.launchPrice}<span className="text-lg font-normal text-slate-400"> one-time</span></p>
          <div className="mt-6"><CheckoutButton label={`Get instant access — $${VAULT.launchPrice}`} /></div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> {VAULT.guaranteeDays}-day refund</span>
            <span className="flex items-center gap-2"><RefreshCw className="h-4 w-4" /> Free weekly updates</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4" /> 1,200+ members</span>
          </div>
        </div>
      </section>

      {/* Community upsell via founder ladder */}
      <FounderPricing />

      {/* FAQ */}
      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900">Questions</h2>
          <div className="mt-6 space-y-6">
            {FAQ.map(([q, a]) => (
              <div key={q}>
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-1 text-slate-600">{a}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500">
            Prefer the free taste first?{" "}
            <Link href="/#join" className="text-orange-600 underline">Grab the free Claude starter</Link>{" "}
            — you can grab the full Vault ({current.label.toLowerCase()} pricing) any time.
          </p>
        </div>
      </section>
    </main>
  );
}
