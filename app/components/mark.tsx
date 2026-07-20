import type { ReactNode } from "react";

// Marker-pen highlight behind a key word/number (Talas-style, in our orange).
export function Mark({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute inset-x-[-0.15em] bottom-[0.05em] h-[0.45em] rounded-sm bg-orange-300/70"
      />
    </span>
  );
}
