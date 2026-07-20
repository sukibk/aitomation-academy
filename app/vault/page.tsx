import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star, ShieldCheck, RefreshCw, Zap } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { VAULT, currentLevel } from "@/lib/pricing";
import { CheckoutButton } from "./checkout-button";
import { FounderPricing } from "@/app/sections/founder-pricing";

export const metadata: Metadata = {
  title: "The Claude Vault — 550+ Claude Prompts & Skills",
  description:
    "550+ copy-paste Claude skills, prompts & workflows, organized by your job. Get finished work out of Claude — not chat replies.",
  alternates: { canonical: `${siteConfig.url}/vault` },
};

const INSIDE = [
  ["Skills, not one-liners", "35 ready-to-install Claude Cowork skills that run real jobs — inbox triage, meeting prep, weekly reviews — plus 500+ prompts and multi-step workflows."],
  ["Organized by your job", "Consultant, marketer, creator, founder, agency, ops. Find your section, copy the prompt, get the deliverable. No 30,000-prompt dump to dig through."],
  ["Built for how Claude works", "XML structure, artifacts, projects, extended thinking — not ChatGPT lists pasted into Claude. Every prompt produces a finished document, deck, page, or dataset."],
  ["New prompts & skills every week", "The Vault grows every Tuesday. A prompt pack goes stale the month you buy it — this one doesn't."],
];

// Concrete outcomes — each one is a real recipe category in the Vault.
const OUTCOMES = [
  ["A client-ready report", "Paste the research-report prompt with your notes. Minutes later: a structured document with an executive summary, findings, and next steps — formatted, not a wall of chat text."],
  ["A working dashboard", "The dashboard prompt returns a live artifact — KPI cards, breakdowns by category, a working filter — from a description and a CSV. No code, no installation."],
  ["A week of content", "One prompt takes your topic and voice notes and returns seven platform-ready posts with hooks, not \"here are some ideas for posts.\""],
];

// Honest value stack: named packs with real item counts. No invented dollar values —
// the market anchor below (competitor bundle prices) does the price work truthfully.
const STACK = [
  ["35 installable Cowork skills", "inbox triage, meeting prep, weekly review, file organizer, content repurposer…"],
  ["Role packs for 6 professions", "consultant, marketer, creator, founder, agency, operations — your job has its own section"],
  ["Multi-step workflows", "research → draft → polish chains that produce deliverables, not replies"],
  ["The artifacts cookbook", "dashboards, calculators, landing pages, decks — built in the chat window"],
  ["Claude Projects setups", "reusable project instructions for recurring client and content work"],
  ["Weekly updates, forever", "new prompts & skills every Tuesday, included — the pack that doesn't go stale"],
];

const PAINS = [
  "You try a prompt from some free list, get a mediocre result, spend 20 minutes fixing it — and think you could've just asked Claude normally.",
  "You keep starting from a blank box and rewriting the same asks.",
  "You bought a \"10,000 prompts\" pack and never opened it twice.",
  "You know Claude can do more — you just don't know where to start for your job.",
];

const FAQ = [
  ["Why pay when there are free prompts everywhere?", "Because free prompt lists are written for ChatGPT and dumped in bulk — untested, unorganized, and generic. The Vault is 550 prompts &amp; skills curated for how Claude actually works, sorted by your job, and updated weekly. You aren't buying prompts; you're buying the filing system and the hours back."],
  ["Isn't Anthropic's own prompt library free?", "It is, and it's good — for learning what Claude can do. It's a general-purpose showcase, not a work system: it isn't organized by profession, it doesn't cover Cowork skills or multi-step client workflows, and it doesn't grow with your job. The Vault starts where the free library stops."],
  ["Isn't prompt engineering dead?", "The magic-words era is, yes — Claude understands plain language fine. What still separates a chat reply from finished work is context, structure, and the right ask: skills, project setups, multi-step workflows. That's what a Vault prompt is — the system around the prompt, not a clever sentence."],
  ["Which Claude plan do I need?", "Any paid Claude plan works for most prompts. A few Cowork and Claude Code items assume the desktop app — each one says what it needs."],
  ["Do I need to be technical?", "No. The Vault is built for non-technical professionals. You paste a prompt, fill the blanks, and get finished work."],
  [`What if it's not for me?`, `Use it for ${VAULT.guaranteeDays} days. If it doesn't save you real time, email ${siteConfig.email} and we refund you — no questions, no forms.`],
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
            {VAULT.itemCount} prompts & skills · {VAULT.sectionCount} sections · updated weekly
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
            <CheckoutButton label={`Get 550+ prompts — $${VAULT.launchPrice} (was $${VAULT.anchorPrice})`} />
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
            The problem was never Claude, and it isn&apos;t you. Collecting prompts doesn&apos;t work —
            running systems does. The Vault is the system: prompts that carry context, chain steps,
            and end in a deliverable.
          </p>
        </div>
      </section>

      {/* Concrete outcomes */}
      <section className="bg-slate-50 px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Paste one prompt. Minutes later:
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {OUTCOMES.map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2 text-orange-500">
                  <Zap className="h-5 w-5" />
                  <h3 className="font-semibold text-slate-900">{t}</h3>
                </div>
                <p className="mt-3 text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="px-6 py-16 sm:px-12">
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

      {/* Value stack + market anchor */}
      <section className="bg-slate-50 px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900">Everything you get for ${VAULT.launchPrice}</h2>
          <ul className="mt-6 space-y-4">
            {STACK.map(([t, d]) => (
              <li key={t} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-orange-500" />
                <span className="text-slate-700">
                  <span className="font-semibold text-slate-900">{t}</span> — {d}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-slate-600">
            &ldquo;Complete AI bundles&rdquo; with less Claude in them sell for $99–$150.
            You don&apos;t need 30,000 generic prompts. You need the {VAULT.itemCount} prompts
            that actually work in Claude — for ${VAULT.launchPrice}.
          </p>
        </div>
      </section>

      {/* Anchor + guarantee */}
      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-2xl rounded-2xl bg-slate-900 p-10 text-center">
          <p className="text-slate-300">List price <span className="line-through">${VAULT.anchorPrice}</span> — launch pricing while the Vault is new.</p>
          <p className="mt-2 text-5xl font-bold text-white">${VAULT.launchPrice}<span className="text-lg font-normal text-slate-400"> one-time</span></p>
          <div className="mt-6"><CheckoutButton label={`Get instant access — $${VAULT.launchPrice}`} /></div>
          <p className="mx-auto mt-6 max-w-md text-sm text-slate-300">
            Try three prompts from your section in the next {VAULT.guaranteeDays} days.
            If they don&apos;t save you real time, reply to your receipt and we refund you.
          </p>
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
            <Link href="/free" className="text-orange-600 underline">Grab the free Claude starter</Link>{" "}
            — you can grab the full Vault ({current.label.toLowerCase()} pricing) any time.
          </p>
        </div>
      </section>
    </main>
  );
}
