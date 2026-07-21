"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VAULT, MEMBER_COUNT } from "@/lib/pricing";

export function SocialProof() {
  return (
    <section className="relative py-10">
      <div className="px-6 sm:px-12 lg:px-20">
        <div className="rounded-2xl bg-slate-900 px-8 py-10">

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-700">
            <div className="text-center py-6 sm:py-0">
              <div className="text-5xl font-bold text-white tracking-tight">{MEMBER_COUNT.toLocaleString()}+</div>
              <div className="mt-2 text-sm text-slate-400 uppercase tracking-wider">Members Inside</div>
            </div>
            <div className="text-center py-6 sm:py-0">
              <div className="text-5xl font-bold text-orange-400 tracking-tight">{VAULT.itemCount}</div>
              <div className="mt-2 text-sm text-slate-400 uppercase tracking-wider">Prompts &amp; Skills in the Vault</div>
            </div>
            <div className="text-center py-6 sm:py-0">
              <div className="text-5xl font-bold text-white tracking-tight">1M+</div>
              <div className="mt-2 text-sm text-slate-400 uppercase tracking-wider">Views on Marko&apos;s Tutorials</div>
            </div>
          </div>

          {/* Audience + next step */}
          <div className="mt-8 pt-7 border-t border-slate-700 text-center">
            <span className="text-sm text-slate-500 uppercase tracking-widest">Built for&nbsp;&nbsp;</span>
            <span className="text-sm font-medium text-slate-300">
              Consultants · Marketers · Creators · Founders · Agencies. No coding required.
            </span>
            <div className="mt-4">
              <Link
                href="/academy"
                data-cta="social_proof_academy"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
              >
                See everything the membership includes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
