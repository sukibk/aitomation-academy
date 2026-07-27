"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// Real member posts, one card at a time. Auto-advances every 3.5s (pauses on
// hover/touch), swipeable, with arrows and dot indicators. Deliberately shows
// only a sample — the final slide points at the rest inside the community.
const WINS = [
  "win1.png",
  "win2.png",
  "win3.png",
  "win4.png",
  "win5.png",
  "win6.png",
  "win7.png",
  "win8.png",
  "win9.png",
  "win10.png",
];

const SLIDE_COUNT = WINS.length + 1; // + the "200+ more" teaser card
const GAP = 12; // matches gap-3

export function WinsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    const card = track?.children[0] as HTMLElement | undefined;
    if (!track || !card) return;
    const clamped = ((i % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
    track.scrollTo({
      left: clamped * (card.offsetWidth + GAP),
      behavior: smooth ? "smooth" : "auto",
    });
    setIndex(clamped);
  }, []);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      goTo(index + 1, index + 1 < SLIDE_COUNT);
    }, 3500);
    return () => clearInterval(id);
  }, [index, goTo]);

  // Keep dots in sync when the user swipes by hand
  const handleScroll = () => {
    const track = trackRef.current;
    const card = track?.children[0] as HTMLElement | undefined;
    if (!track || !card) return;
    const i = Math.round(track.scrollLeft / (card.offsetWidth + GAP));
    if (i !== index && i >= 0 && i < SLIDE_COUNT) setIndex(i);
  };

  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-6 rounded bg-orange-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
            Member wins
          </span>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Previous win"
            onClick={() => goTo(index - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next win"
            onClick={() => goTo(index + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => (pausedRef.current = false)}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {WINS.map((file) => (
          <div
            key={file}
            className="relative h-44 w-[86%] shrink-0 snap-start overflow-hidden rounded-xl bg-white p-2 shadow-lg ring-1 ring-white/10 sm:h-48"
          >
            {/* Screenshots vary wildly in aspect ratio (some are tall posts,
                some one-liners) — contain + center keeps the card height
                steady and the white card is the constant frame. */}
            <Image
              src={`/images/creatives/wins/${file}`}
              alt="Real member post from inside the community"
              fill
              sizes="(min-width: 1024px) 480px, 86vw"
              className="object-contain p-2"
            />
          </div>
        ))}
        {/* Final slide: the rest live inside */}
        <a
          href="/skool-redirect"
          className="flex h-44 w-[86%] shrink-0 snap-start flex-col items-center justify-center gap-2 rounded-xl bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10 sm:h-48"
        >
          <span className="text-2xl font-bold text-white">200+ more</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-400">
            See them inside the community
            <ArrowRight className="h-4 w-4" />
          </span>
        </a>
      </div>
      {/* Dots */}
      <div className="mt-3 flex justify-center gap-1.5">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to win ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-orange-400" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
