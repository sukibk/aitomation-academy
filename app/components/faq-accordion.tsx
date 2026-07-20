"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

// Card-style FAQ accordion: each question is its own rounded card with a +/x chip.
export function FaqAccordion({ items }: { items: ReadonlyArray<ReadonlyArray<string>> }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-4">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-slate-900">{q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isOpen
                    ? "bg-orange-400 text-white"
                    : "border border-slate-300 text-slate-500"
                }`}
              >
                {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 leading-relaxed text-slate-600">{a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
