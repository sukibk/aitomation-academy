import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Welcome to the Claude Vault",
  robots: { index: false },
  alternates: { canonical: `${siteConfig.url}/vault/success` },
};

export default function VaultSuccess() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-orange-400" />
        <h1 className="mt-6 text-3xl font-bold text-white">You&apos;re in. Check your inbox.</h1>
        <p className="mt-4 text-slate-300">
          Your payment went through and your Claude Vault access is on its way to your email
          (give it a minute). Start with your job&apos;s section — copy one recipe and run it today.
        </p>
        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/40 p-6 text-left">
          <p className="font-semibold text-white">Want everything, not just the Vault?</p>
          <p className="mt-2 text-slate-300">
            Academy members get the Vault plus every course and the weekly live call —
            and lock the founder rate for life.
          </p>
          <Link
            href="/skool-redirect"
            className="mt-4 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            See the membership
          </Link>
        </div>
        <p className="mt-8 text-sm text-slate-500">
          Didn&apos;t get your email? Write us at {siteConfig.email}.
        </p>
      </div>
    </main>
  );
}
