"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LeadCaptureTrigger } from "@/app/components/lead-capture-trigger";
import { VAULT } from "@/lib/pricing";

export function FinalCTA() {
  return (
    <section data-section="final_cta" className="relative py-28 bg-slate-900">

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-display tracking-tight text-white sm:text-4xl lg:text-5xl">
            Stop starting from a{" "}
            <span className="text-orange-400">blank box</span>
          </h2>
          <p className="mb-10 text-lg text-slate-400 max-w-2xl mx-auto">
            {VAULT.itemCount} Claude recipes, sorted by your job, that turn a blank prompt
            into finished work. Join 1,200+ professionals already using them.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/vault"
              data-cta="final_vault"
              className="group inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Get the Vault — ${VAULT.launchPrice}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <LeadCaptureTrigger className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-8 py-4 text-base font-semibold text-slate-200 cursor-pointer hover:bg-slate-800 transition-colors">
              Or grab a free taste first
            </LeadCaptureTrigger>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            {VAULT.guaranteeDays}-day refund. Instant access. No subscription.
          </p>
        </div>
      </div>
    </section>
  );
}
