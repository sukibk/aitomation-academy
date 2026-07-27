import Image from "next/image";

// Real member posts from inside the community, drifting left-to-right.
// Pure CSS marquee (keyframes in globals.css): the track is rendered twice
// and translated by 50%, so the loop is seamless. Pauses on hover, and
// respects prefers-reduced-motion.
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

export function WinsMarquee() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-center gap-3">
        <span className="h-0.5 w-8 rounded bg-orange-400" />
        <span className="text-sm font-semibold uppercase tracking-widest text-orange-400">
          Member wins
        </span>
        <span className="h-0.5 w-8 rounded bg-orange-400" />
      </div>
      <div className="group relative overflow-hidden">
        {/* Edge fades so cards emerge from / dissolve into the section bg */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-900 to-transparent" />
        <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
          {[...WINS, ...WINS].map((file, i) => (
            <div
              key={`${file}-${i}`}
              className="w-[240px] shrink-0 overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-white/10 sm:w-[270px]"
            >
              <Image
                src={`/images/creatives/wins/${file}`}
                alt="Real member post from inside the community"
                width={270}
                height={100}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
