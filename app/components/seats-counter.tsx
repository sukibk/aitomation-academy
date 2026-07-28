"use client";

import { useEffect, useState } from "react";

// Live launch-price seat counter, same quiet editorial style as CountdownBar.
// The number comes from /api/vault-seats (real completed Stripe purchases) —
// if the API can't answer truthfully, this renders nothing.
export function SeatsCounter({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/vault-seats")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.remaining === "number") {
          setRemaining(d.remaining);
          setTotal(d.total ?? null);
        }
      })
      .catch(() => {});
  }, []);

  if (remaining === null || remaining <= 0) return null;

  const dark = variant === "dark";
  return (
    <div className={`flex items-baseline gap-2.5 ${className}`}>
      <span
        className={`text-xs font-semibold uppercase tracking-widest ${
          dark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        Only
      </span>
      <span
        className={`font-mono text-base font-semibold tabular-nums ${
          dark ? "text-orange-400" : "text-orange-600"
        }`}
      >
        {remaining}{total ? ` of ${total}` : ""}
      </span>
      <span
        className={`text-xs font-semibold uppercase tracking-widest ${
          dark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        left at this price
      </span>
    </div>
  );
}
