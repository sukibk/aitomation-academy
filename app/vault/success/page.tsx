import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { MEMBERSHIP, currentLevel } from "@/lib/pricing";
import { CheckoutButton } from "../checkout-button";
import { PurchaseTracker } from "./purchase-tracker";

export const metadata: Metadata = {
  title: "Welcome to the Claude Vault",
  robots: { index: false },
  alternates: { canonical: `${siteConfig.url}/vault/success` },
};

export default async function VaultSuccess({
  searchParams,
}: {
  searchParams: Promise<{ sub?: string; sub_cancelled?: string; session_id?: string }>;
}) {
  const params = await searchParams;
  const isSub = params.sub === "1";
  const { current, next } = currentLevel();

  // Cancelled membership checkout, or a direct visit with no Stripe session:
  // nothing was charged, so never show the purchase-success content.
  if (params.sub_cancelled === "1" || (!isSub && !params.session_id)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-900 px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold text-white">Checkout cancelled. Nothing was charged.</h1>
          <p className="mt-4 text-slate-300">
            No worries. Your card was not charged and nothing changed on your account.
            Whenever you are ready:
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/academy"
              className="inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
            >
              See the Academy membership
            </Link>
            <Link
              href="/vault"
              className="inline-flex rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-200 hover:bg-slate-800"
            >
              Get the Vault for $17
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Something put you off at checkout? Tell us: {siteConfig.email}.
          </p>
        </div>
      </main>
    );
  }

  if (isSub) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-900 px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <PurchaseTracker product="membership" />
          <CheckCircle2 className="mx-auto h-16 w-16 text-orange-400" />
          <h1 className="mt-6 text-3xl font-bold text-white">
            Welcome to the Academy. You&apos;re a full member.
          </h1>
          <p className="mt-4 text-slate-300">
            Your ${current.price}/mo founder rate is locked. Check your inbox: your
            welcome email walks you through joining the community space, and full
            access (all courses + the Vault + the weekly call) gets switched on for
            your account right after, usually within the hour.
          </p>
          <Link
            href="/skool-redirect"
            className="mt-8 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Join the community space now
          </Link>
          <p className="mt-8 text-sm text-slate-500">
            Questions or anything missing? Write us at {siteConfig.email}.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <PurchaseTracker product="vault" />
        <CheckCircle2 className="mx-auto h-16 w-16 text-orange-400" />
        <h1 className="mt-6 text-3xl font-bold text-white">You&apos;re in. Check your inbox.</h1>
        <p className="mt-4 text-slate-300">
          Your payment went through. Within a few minutes you&apos;ll get an email with your
          next steps: join the community space, and your Vault access gets unlocked on your
          account, usually within the hour. Then start with your job&apos;s section: copy one
          prompt and run it today.
        </p>

        <div className="mt-8 rounded-2xl border border-orange-500/40 bg-slate-800/60 p-6 text-left">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">
            One-time upgrade offer
          </p>
          <p className="mt-2 font-semibold text-white">
            Want everything, not just the Vault?
          </p>
          <p className="mt-2 text-slate-300">
            Full membership adds every course (the 7-Day Challenge, Cowork, Claude Code),
            the weekly live call, and keeps your Vault growing, for ${MEMBERSHIP.price}/mo,
            locked at the founder rate for life.{" "}
            {next ? `The rate rises to $${next.price}/mo as the community grows.` : "The rate rises as the community grows."}
          </p>
          <CheckoutButton
            product="membership"
            label={`Upgrade: $${MEMBERSHIP.price}/mo, locked for life`}
            className="mt-4"
          />
          <p className="mt-3 text-xs text-slate-500">
            Cancel anytime. Your Vault purchase stays yours either way.
          </p>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Didn&apos;t get your email? Write us at {siteConfig.email}.
        </p>
      </div>
    </main>
  );
}
