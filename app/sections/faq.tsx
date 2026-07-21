"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { VAULT, currentLevel } from "@/lib/pricing";
import { BuyLink } from "@/app/components/buy-link";

const { current, next } = currentLevel();

// Purchase-objection FAQ: every question is something a buyer asks before
// paying for the Vault or the membership. Honest answers only.
const faqs = [
  {
    question: "There's endless free Claude content. Why pay for anything?",
    answer:
      "Free content is how most members started, including Marko's own tutorials (1M+ views). The problem isn't information, it's order and feedback: YouTube has no path, nobody looks at your work, and most people stall in week two.\n\nThe Academy is a sequence. Courses that end with something built, a weekly live call where your actual project gets fixed, and the Vault so you never start from a blank box.",
  },
  {
    question: "What's the difference between the Vault and the membership?",
    answer: `The Vault ($${VAULT.launchPrice} one-time, $${VAULT.anchorPrice} list price) is the library: ${VAULT.itemCount} Claude prompts & skills sorted by your job, updated weekly.\n\nThe membership ($${current.price}/mo) is the whole workshop: every course (the 7-Day Claude Challenge, Cowork, and Claude Code), the weekly live call, the community, with the full Vault included.\n\nNot sure? Start with the Vault. You can upgrade any time.`,
  },
  {
    question: "I'm not technical. Is this actually for me?",
    answer:
      "Yes, that's exactly who it's built for. No coding, no setup rabbit holes. The 7-Day Challenge assumes zero experience and ends with a live website. A first-time builder in the community shipped a working billing app.",
  },
  {
    question: `Is $${current.price} a month actually worth it?`,
    answer: `Here's the honest math. The membership includes the full Vault, every course, and a live call every single week where your project gets worked on. One member landed a commercial deal using what he learned. Another built a CRM in an hour.\n\nIf one workflow saves you an afternoon a week, it pays for itself. And $${current.price}/mo is the founder rate, locked for life: at ${next ? next.threshold.toLocaleString() : ""} members, new joiners pay $${next ? next.price : ""}/mo.`,
  },
  {
    question: "What if I cancel? What if the Vault isn't for me?",
    answer: `Cancel the membership in two clicks. No emails, no retention forms, and everything you built stays yours.\n\nThe Vault comes with a ${VAULT.guaranteeDays}-day refund: if it doesn't save you real time, reply to your receipt and we refund you.`,
  },
];

function FAQItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left cursor-pointer"
      >
        <span className="text-lg font-semibold text-slate-900 pr-8">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[40rem] pb-6" : "max-h-0"
        }`}
      >
        <div className="text-slate-500 leading-relaxed whitespace-pre-line">{answer}</div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-orange-400" />
              <span className="text-sm font-medium tracking-wide text-orange-600 uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl font-display tracking-tight text-slate-900 sm:text-4xl leading-[1.1]">
              Questions people actually ask before buying
            </h2>
          </div>

          {/* FAQ items */}
          <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200 p-8">
            {faqs.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                defaultOpen={true}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <BuyLink
              product="membership"
              dataCta="faq_academy"
              className="group inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
            >
              Lock ${current.price}/mo for life
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </BuyLink>
            {!VAULT.salesPaused && (
              <BuyLink
                product="vault"
                dataCta="faq_vault"
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-orange-400 hover:text-orange-600 transition-colors"
              >
                Get {VAULT.itemCount} prompts &amp; skills for{" "}
                <s className="mx-1 text-slate-400">${VAULT.anchorPrice}</s> ${VAULT.launchPrice}
              </BuyLink>
            )}
          </div>

          {/* Still have questions */}
          <div className="mt-8">
            <p className="text-slate-500">
              Still have questions?{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-orange-500 hover:text-orange-600 cursor-pointer transition-colors"
              >
                Email me directly
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
