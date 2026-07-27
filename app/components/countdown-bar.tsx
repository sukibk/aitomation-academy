"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

// Honest countdown: renders ONLY when a real deadline is configured
// (VAULT.priceRisesAt in lib/pricing). If the date passes, it disappears
// on its own — never a fake reset. The deadline must be enforced: when it
// hits, the price actually changes, or this component gets removed.
export function CountdownBar({
  deadline,
  label,
  className = "",
}: {
  deadline: string | null | undefined;
  label: string;
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

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border border-orange-300 bg-orange-50 px-5 py-2.5 text-sm font-semibold text-orange-800 ${className}`}
    >
      <Clock className="h-4 w-4 shrink-0" />
      <span>{label}</span>
      <span className="font-mono text-base font-bold tabular-nums text-orange-700">
        {d > 0 ? `${d}d ` : ""}
        {pad(h)}:{pad(m)}:{pad(s)}
      </span>
    </div>
  );
}
