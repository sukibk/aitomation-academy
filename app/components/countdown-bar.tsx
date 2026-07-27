"use client";

import { useEffect, useState } from "react";

// Honest countdown: renders ONLY when a real deadline is configured
// (lib/pricing). If the date passes, it disappears on its own — never a fake
// reset. The deadline must be enforced: when it hits, the price actually
// changes, or this component gets removed.
//
// Design: segmented unit blocks (days / hrs / min / sec), theme-aware via
// `variant` so it sits on dark heroes and white cards without looking like
// a coupon widget.
export function CountdownBar({
  deadline,
  label,
  variant = "light",
  className = "",
}: {
  deadline: string | null | undefined;
  label: string;
  variant?: "light" | "dark";
  className?: string;
}) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!deadline) return;
    const target = new Date(deadline).getTime();
    if (Number.isNaN(target)) return;
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (!deadline || remaining === null || remaining <= 0) return null;

  const units: [string, number][] = [
    ["days", Math.floor(remaining / 86_400_000)],
    ["hrs", Math.floor((remaining % 86_400_000) / 3_600_000)],
    ["min", Math.floor((remaining % 3_600_000) / 60_000)],
    ["sec", Math.floor((remaining % 60_000) / 1_000)],
  ];

  const dark = variant === "dark";

  return (
    <div className={`flex flex-col items-center gap-2.5 ${className}`}>
      <span
        className={`text-xs font-semibold uppercase tracking-widest ${
          dark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {label}
      </span>
      <div className="flex items-start gap-2">
        {units.map(([unit, value]) => (
          <div
            key={unit}
            className={`flex w-14 flex-col items-center rounded-xl py-2.5 ${
              dark
                ? "bg-white/5 ring-1 ring-white/10"
                : "bg-slate-900 ring-1 ring-slate-800"
            }`}
          >
            <span className="font-mono text-2xl font-bold leading-none tabular-nums text-orange-400">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
