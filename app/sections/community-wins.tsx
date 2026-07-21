import Image from "next/image";
import { Trophy, ArrowRight } from "lucide-react";
import { Mark } from "@/app/components/mark";

// Real screenshots of member posts from inside the community.
const wins = [
  { src: "/images/creatives/wins/win1.png", alt: "Community win from member" },
  { src: "/images/creatives/wins/win2.png", alt: "Community win from member" },
  { src: "/images/creatives/wins/win3.png", alt: "Community win from member" },
  { src: "/images/creatives/wins/win4.png", alt: "Community win from member" },
  { src: "/images/creatives/wins/win5.png", alt: "Community win from member" },
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
      </div>
    </section>
  );
}
