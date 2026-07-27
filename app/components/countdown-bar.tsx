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

  const d = Math.floor(remaining / 86_400_000);
  const h = Math.floor((remaining % 86_400_000) / 3_600_000);
  const m = Math.floor((remaining % 3_600_000) / 60_000);
  const s = Math.floor((remaining % 60_000) / 1_000);
  const pad = (n: number) => String(n).padStart(2, "0");
  const dark = variant === "dark";

  // Quiet, editorial: one small line, no boxes, no pill.
  return (
    <div className={`flex items-baseline gap-2.5 ${className}`}>
      <span
        className={`text-xs font-semibold uppercase tracking-widest ${
          dark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {label}
      </span>
      <span
        className={`font-mono text-base font-semibold tabular-nums ${
          dark ? "text-orange-400" : "text-orange-600"
        }`}
      >
        {d}d {pad(h)}:{pad(m)}:{pad(s)}
      </span>
    </div>
  );
}
