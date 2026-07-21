import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/sections/footer";
import { LeadMagnetSection } from "@/app/sections/lead-magnet-section";

export const metadata: Metadata = {
  title: "Free Claude Resources: Guides, Prompts & the Starter System",
  description:
    "Free Claude resources for non-technical professionals: The Claude Starter System PDF, practical guides, and copy-paste prompts.",
  alternates: { canonical: `${siteConfig.url}/free` },
};

const GUIDES = [
  ["what-are-claude-skills", "What Are Claude Skills? How They Actually Work"],
  ["how-to-learn-claude", "How to Learn Claude: A 30-Day Path From Zero"],
  ["best-claude-prompts", "15 Best Claude Prompts (Copy-Paste Templates)"],
  ["claude-prompting-guide", "The Claude Prompting Guide"],
  ["what-is-claude-cowork", "What Is Claude Cowork? How It Actually Works"],
  ["is-claude-ai-free-pricing-guide", "Is Claude AI Free? The Pricing Guide"],
];

export default function FreePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <LeadMagnetSection />

        <section className="px-6 py-16 sm:px-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              More free value: start with these guides
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {GUIDES.map(([slug, title]) => (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="rounded-xl border border-slate-200 p-5 text-slate-800 transition-colors hover:border-orange-300 hover:bg-orange-50"
                >
                  {title}
                </Link>
              ))}
            </div>
            <p className="mt-10 text-center text-slate-500">
              Ready for the full library?{" "}
              <Link href="/vault" className="font-semibold text-orange-600 underline">
                The Claude Vault
              </Link>{" "}
              · Want the whole path?{" "}
              <Link href="/academy" className="font-semibold text-orange-600 underline">
                The Academy
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
