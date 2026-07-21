"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Rocket,
  FolderOpen,
  Wrench,
  Code2,
  Video,
  Users,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Mark } from "@/app/components/mark";
import { VAULT, currentLevel } from "@/lib/pricing";

// Sells the two products block by block: what the membership and the Vault
// actually hand you, with a transactional link at the end of every block.
const features: {
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
}[] = [
  {
    icon: Rocket,
    title: "The 7-Day Claude Challenge",
    description:
      "Start at zero. Seven days later you have a real website live on the internet, built by talking to Claude. No coding, no theory marathon. This is where every member starts.",
    linkLabel: "Included with membership",
    href: "/academy",
  },
  {
    icon: FolderOpen,
    title: `The Claude Vault: ${VAULT.itemCount} prompts & skills`,
    description:
      "Stop starting from a blank box. Find your job, paste the prompt, get a real deliverable: a client report, a deck, a week of content. Sorted into 20 sections, updated weekly.",
    linkLabel: VAULT.salesPaused
      ? "See the Vault"
      : `Get it for $${VAULT.launchPrice}`,
    href: "/vault",
  },
  {
    icon: Wrench,
    title: "The Claude Cowork course",
    description:
      "Connect your email and calendar, build your first reusable skill, and put weekly busywork on autopilot with scheduled tasks.",
    linkLabel: "Included with membership",
    href: "/academy",
  },
  {
    icon: Code2,
    title: "The Claude Code course",
    description:
      "Build real tools and apps with no coding background. Releasing mid-August, included with your membership at no extra cost.",
    linkLabel: "Included with membership",
    href: "/academy",
  },
  {
    icon: Video,
    title: "The weekly live call",
    description:
      "Bring your project, your question, or the automation that almost works, and we fix it live on the call. Every single week.",
    linkLabel: "Included with membership",
    href: "/academy",
  },
  {
    icon: Users,
    title: "A community that ships",
    description:
      "1,200+ consultants, marketers, creators, and founders building alongside you. One member built a CRM in an hour. Another put 5 pages on page 1 of Google in 27 days.",
    linkLabel: "See member wins",
    href: "/academy",
  },
];

function CardLink({
  href,
  label,
  dark,
}: {
  href: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
        dark
          ? "text-orange-400 hover:text-orange-300"
          : "text-orange-600 hover:text-orange-700"
      }`}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function WhatYouGet() {
  const PrimaryIcon = features[0].icon;
  const SecondaryIcon = features[1].icon;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { current } = currentLevel();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.scrollWidth / features.length;
      setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="features" data-section="what_you_get" className="relative py-28 overflow-x-hidden">

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-orange-400" />
            <span className="text-sm font-medium tracking-wide text-orange-600 uppercase">
              What you get
            </span>
          </div>
          <h2 className="text-3xl font-display tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-[1.1]">
            Everything you need to ship <Mark>real work</Mark> with Claude
          </h2>
          <p className="mt-5 text-lg text-slate-500">
            Not another course you watch. Courses that end with something built, a prompt
            library sorted by your job, and a weekly call where your project gets fixed.
          </p>
        </div>

        {/* Mobile: swipeable carousel */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="w-full overflow-x-auto pb-2 flex gap-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="snap-start shrink-0 w-[78vw]">
                  <div className={`h-full rounded-2xl p-6 ${i === 0 ? "bg-slate-900" : "bg-white border border-slate-200"}`}>
                    <Icon className={`h-6 w-6 mb-4 ${i === 0 ? "text-orange-400" : "text-orange-600"}`} />
                    <h3 className={`text-base font-semibold mb-2 ${i === 0 ? "text-white" : "text-slate-900"}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${i === 0 ? "text-slate-400" : "text-slate-500"}`}>
                      {feature.description}
                    </p>
                    <CardLink href={feature.href} label={feature.linkLabel} dark={i === 0} />
                  </div>
                </div>
              );
            })}
            {/* Peek spacer so last card isn't flush */}
            <div className="shrink-0 w-4" />
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  const cardWidth = el.scrollWidth / features.length;
                  el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? "w-6 h-2 bg-orange-500"
                    : "w-2 h-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: asymmetric layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-5">
          {/* Primary block: dark, large left */}
          <div className="lg:col-span-7">
            <div className="relative h-full rounded-3xl bg-slate-900 p-10 sm:p-12 overflow-hidden">
              <div className="relative">
                <PrimaryIcon className="h-8 w-8 text-orange-400 mb-6" />
                <h3 className="text-2xl sm:text-3xl font-display text-white mb-4 leading-tight">
                  {features[0].title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                  {features[0].description}
                </p>
                <CardLink href={features[0].href} label={features[0].linkLabel} dark />
              </div>
            </div>
          </div>

          {/* Secondary block: bordered, large right */}
          <div className="lg:col-span-5">
            <div className="relative h-full rounded-3xl border-2 border-slate-200 bg-white p-10 sm:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-60" />
              <div className="relative">
                <SecondaryIcon className="h-8 w-8 text-orange-600 mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                  {features[1].title}
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  {features[1].description}
                </p>
                <CardLink href={features[1].href} label={features[1].linkLabel} />
              </div>
            </div>
          </div>

          {/* Four compact blocks */}
          {features.slice(2).map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="lg:col-span-3">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-orange-200">
                  <Icon className="h-6 w-6 text-orange-600 mb-4" />
                  <h3 className="text-base font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                  <CardLink href={feature.href} label={feature.linkLabel} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/academy"
            data-cta="what_you_get_academy"
            className="group inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-white hover:bg-orange-600 transition-colors"
          >
            Lock ${current.price}/mo for life
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          {!VAULT.salesPaused && (
            <Link
              href="/vault"
              data-cta="what_you_get_vault"
              className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-800 hover:border-orange-400 hover:text-orange-600 transition-colors"
            >
              Get {VAULT.itemCount} prompts &amp; skills for{" "}
              <s className="mx-1 text-slate-400">${VAULT.anchorPrice}</s> ${VAULT.launchPrice}
            </Link>
          )}
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">
          {VAULT.guaranteeDays}-day refund on the Vault. Cancel the membership in two clicks.
        </p>
      </div>
    </section>
  );
}
