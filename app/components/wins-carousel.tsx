"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Real member posts, one card at a time. Auto-advances every 3.5s and wraps
// back to the start; the next card peeks in from the right so it's obvious
// there's more. Swipeable by hand (scroll-snap); auto-advance pauses while
// the user is hovering or touching it.
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

export function WinsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || pausedRef.current) return;
      const card = track.children[0] as HTMLElement | undefined;
      if (!card) return;
      indexRef.current = (indexRef.current + 1) % WINS.length;
      const gap = 12; // matches gap-3
      track.scrollTo({
        left: indexRef.current * (card.offsetWidth + gap),
        behavior: indexRef.current === 0 ? "auto" : "smooth",
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-0.5 w-6 rounded bg-orange-400" />
        <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
          Member wins
        </span>
      </div>
      <div
        ref={trackRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => (pausedRef.current = false)}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {WINS.map((file) => (
          <div
            key={file}
            className="w-[86%] shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-white/10"
          >
            <Image
              src={`/images/creatives/wins/${file}`}
              alt="Real member post from inside the community"
              width={560}
              height={200}
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
