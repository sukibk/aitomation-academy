"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Mark } from "@/app/components/mark";
import { VAULT, currentLevel } from "@/lib/pricing";
import { BuyLink } from "@/app/components/buy-link";

const { current } = currentLevel();

// The buying path, not a free-funnel step list: join (or grab the Vault),
// follow the path, ship real work.
const steps = [
  {
    number: "01",
    title: "Join the Academy (or grab the Vault)",
    titleHref: "/academy",
    description: `Two doors in. The membership: every course, the full Vault, and the weekly live call for $${current.price}/mo, locked for life. Or start smaller: the Vault alone, ${VAULT.itemCount} Claude prompts & skills for $${VAULT.launchPrice} one-time. Both are instant access.`,
  },
  {
    number: "02",
    title: "Follow the path, paste the prompts",
    titleHref: null,
    description:
      "Start the 7-Day Claude Challenge and finish with a live website, or open your job's section in the Vault and paste your first prompt. Every step ends in something real, not a chat reply.",
  },
  {
    number: "03",
    title: "Ship real work",
    titleHref: null,
    description:
      "That is the pattern members follow. One landed a commercial deal using what he learned. One put 5 pages on page 1 of Google in 27 days. A first-time builder shipped a billing app. When you get stuck, bring it to the weekly call and we fix it live.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section data-section="how_it_works" className="relative py-28" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-orange-400" />
            <span className="text-sm font-medium tracking-wide text-orange-600 uppercase">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl font-display tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-[1.1]">
            Three steps from blank box to <Mark>shipped work</Mark>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Animated vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-slate-200">
            <div
              className={`w-full bg-orange-400 transition-all duration-[1.5s] ease-out ${
                isVisible ? "h-full" : "h-0"
              }`}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`relative flex gap-8 sm:gap-12 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                } delay-${i}`}
              >
                {/* Dot */}
                <div className="relative z-10 flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full border-2 border-orange-400 bg-white">
                  <span className="text-sm sm:text-base font-bold text-orange-600">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-2 sm:pt-3">
                  {step.titleHref ? (
                    <Link
                      href={step.titleHref}
                      className="group inline-flex items-center gap-2 text-xl sm:text-2xl font-bold text-orange-500 hover:text-orange-600 cursor-pointer transition-colors mb-3"
                    >
                      {step.title}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                  )}
                  <p className="text-slate-500 leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal CTAs */}
          <div className={`relative mt-10 ${isVisible ? "animate-fade-up" : "opacity-0"} delay-2`}>
            <div className="flex gap-8 sm:gap-12">
              <div className="shrink-0 w-12 sm:w-16" />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <BuyLink
                  product="membership"
                  dataCta="how_it_works_academy"
                  className="group inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white cursor-pointer hover:bg-orange-600 transition-colors whitespace-nowrap"
                >
                  Lock ${current.price}/mo for life
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </BuyLink>
                {!VAULT.salesPaused && (
                  <BuyLink
                    product="vault"
                    dataCta="how_it_works_vault"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-orange-400 hover:text-orange-600 transition-colors whitespace-nowrap"
                  >
                    Get {VAULT.itemCount} prompts &amp; skills for{" "}
                    <s className="mx-1 text-slate-400">${VAULT.anchorPrice}</s> ${VAULT.launchPrice}
                  </BuyLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
