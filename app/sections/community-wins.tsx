import Image from "next/image";
import { Trophy, ArrowRight } from "lucide-react";
import { Mark } from "@/app/components/mark";
import { VAULT } from "@/lib/pricing";
import { BuyLink } from "@/app/components/buy-link";

// Real screenshots of member posts and comments from inside the community.
const wins = [
  { src: "/images/creatives/wins/win6.png", alt: "Member comment: landed a big commercial deal using the Claude setup learned here" },
  { src: "/images/creatives/wins/win13.png", alt: "Member post: non-developer turned Claude Code into a personal assistant running a 14-person service operation" },
  { src: "/images/creatives/wins/win8.png", alt: "Member post: digital art business website and marketing system built with Claude Code" },
  { src: "/images/creatives/wins/win9.png", alt: "Member post: first-ever project, a billing system for a small business built with Claude Code" },
  { src: "/images/creatives/wins/win7.png", alt: "Member post: 5 pages on page 1 of Google 27 days after launching a Claude-built site" },
  { src: "/images/creatives/wins/win5.png", alt: "Member post: skeptic converted after trying Claude Cowork" },
  { src: "/images/creatives/wins/win10.png", alt: "Member post: AI trading bot built with Claude Code running on a Raspberry Pi" },
  { src: "/images/creatives/wins/win1.png", alt: "Member post: custom CRM and sales tracker built with Claude in an hour" },
  { src: "/images/creatives/wins/win11.png", alt: "Member post: CLAUDE.md setup that keeps every project workflow clean" },
  { src: "/images/creatives/wins/win12.png", alt: "Member comment: the course path is exactly the next step I need" },
  { src: "/images/creatives/wins/win4.png", alt: "Member post: lead generation and CRM automation flow built with Claude over a weekend" },
  { src: "/images/creatives/wins/win2.png", alt: "Member post: free AI slide generator tool built as a Claude artifact and shared with the community" },
  { src: "/images/creatives/wins/win3.png", alt: "Member post: automating weekly Wordpress blog posts with a Claude Code workflow" },
];

export function CommunityWins() {
  return (
    <section data-section="community_wins" className="bg-slate-100 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-8 rounded bg-orange-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                Live from the community
              </span>
            </div>
            <h2 className="mt-4 flex items-center gap-3 text-3xl font-display tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              <span>
                Member <Mark>wins</Mark>
              </span>
              <Trophy className="h-8 w-8 text-amber-500" />
            </h2>
            <p className="mt-4 max-w-xl text-lg text-slate-500">
              Real posts shared inside the community. No hype, no fabricated numbers.
            </p>
          </div>
          <a
            href="/academy"
            className="inline-flex items-center gap-2 font-semibold text-orange-600 transition-colors hover:text-orange-700"
          >
            Want wins like these? See the Academy
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Masonry grid of post screenshots */}
        <div className="mx-auto mt-10 max-w-4xl columns-1 gap-5 sm:columns-2">
          {wins.map((win) => (
            <div
              key={win.src}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <Image
                src={win.src}
                alt={win.alt}
                width={600}
                height={600}
                className="h-auto w-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* End-of-wall CTA */}
        <div className="mt-10 text-center">
          {VAULT.salesPaused ? (
            <a
              href="/academy"
              data-cta="community_wins_academy"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition-colors hover:border-orange-400 hover:text-orange-600"
            >
              Build your own win: see the Academy membership
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <BuyLink
              product="vault"
              dataCta="community_wins_vault"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition-colors hover:border-orange-400 hover:text-orange-600"
            >
              Get the prompts &amp; skills these members use:{" "}
              <s className="text-slate-400">${VAULT.anchorPrice}</s> ${VAULT.launchPrice}
              <ArrowRight className="h-4 w-4" />
            </BuyLink>
          )}
        </div>
      </div>
    </section>
  );
}
