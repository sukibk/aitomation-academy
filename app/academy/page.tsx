import type { Metadata } from "next";
import Link from "next/link";
import { Check, Calendar, BookOpen, Wrench, Users } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { MEMBERSHIP, VAULT, currentLevel } from "@/lib/pricing";
import { FounderPricing } from "@/app/sections/founder-pricing";
import { MemberStories } from "@/app/sections/member-stories";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/sections/footer";

export const metadata: Metadata = {
  title: "Claude Code Academy: Courses, Vault & Weekly Calls",
  description:
    "The membership for non-technical professionals: Claude courses that end with something built, the 550+ prompt & skill Vault, and a weekly live call.",
  alternates: { canonical: `${siteConfig.url}/academy` },
};

const STACK = [
  {
    icon: BookOpen,
    title: "The 7-Day Claude Challenge",
    desc: "Zero to a real website live on the internet, built by talking to Claude. No coding. This is where everyone starts.",
  },
  {
    icon: Wrench,
    title: "The Claude Cowork course",
    desc: "Connect your email and calendar, build your first reusable skill, and put weekly busywork on autopilot with scheduled tasks.",
  },
  {
    icon: BookOpen,
    title: "The Claude Code course",
    desc: "Build real tools and apps with no coding background. Releasing mid-August, included with your membership.",
  },
  {
    icon: Wrench,
    title: `The Claude Vault: ${VAULT.itemCount} prompts & skills`,
    desc: `Every skill, prompt, and workflow, sorted by your job and updated weekly. $${VAULT.anchorPrice} list price on its own, included.`,
  },
  {
    icon: Calendar,
    title: "The weekly live call",
    desc: "Bring your project, your question, or the automation that almost works, and we fix it live. Consistently the most valuable hour of the week.",
  },
  {
    icon: Users,
    title: "1,200+ professionals",
    desc: "Consultants, marketers, creators, founders, and agency operators building the same systems you are.",
  },
];

const FAQ = [
  ["Why not just learn from YouTube?", "You can, and most members tried. The problem isn't information, it's order and feedback: YouTube has no path, nobody looks at your work, and you quit in week two. The Academy is a sequence that ends with things built, plus a weekly call where your actual project gets fixed."],
  ["Do I need to be technical?", "No. Everything is built for non-technical professionals. The Challenge assumes zero coding and ends with a live website."],
  ["Which Claude plan do I need?", "Any paid Claude plan covers most of the curriculum. Each lesson says what it needs."],
  ["What does it cost?", "Your rate locks for life at the level you join. See the ladder below. Cancel anytime."],
  ["How is this different from the Vault?", `The Vault ($${VAULT.launchPrice}) is the prompt & skill library. The Academy is the whole workshop: the courses, the live calls, the community, with the Vault included.`],
  ["Is this affiliated with Anthropic?", "No. AItomation Academy is independent and not endorsed by Anthropic."],
];

export default function AcademyPage() {
  const { current } = currentLevel();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="bg-slate-900 px-6 py-20 text-center sm:px-12">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block rounded-full bg-orange-500/15 px-4 py-1 text-sm font-medium text-orange-400">
              Claude Code Academy
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Stop chatting with AI.{" "}
              <span className="text-orange-400">Start delegating to it.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              The exact courses, prompts, and weekly calls 1,200+ non-technical professionals
              use to put real work on Claude. Every course ends with something built,
              not something watched.
            </p>
            <Link
              href="#membership"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Join at ${current.price}/mo, locked for life
            </Link>
            <p className="mt-4 text-sm text-slate-500">${MEMBERSHIP.price}/mo · cancel anytime</p>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-bold text-slate-900">
              Everything inside the membership
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {STACK.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-orange-500" />
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                  </div>
                  <p className="mt-3 text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16 sm:px-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900">Who this is for</h2>
            <ul className="mt-6 space-y-3">
              {[
                "You use Claude, but you know you're getting 5% of what it can do",
                "You want finished deliverables (reports, pages, automations), not chat replies",
                "You've tried free communities and found beginners and spammers. You want people at your stage, actually building",
                "You don't code, and you don't want to learn to",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-lg text-slate-700">
                  <Check className="mt-1.5 h-5 w-5 shrink-0 text-orange-500" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <MemberStories />

        <FounderPricing />

        <section className="px-6 py-16 sm:px-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900">Questions</h2>
            <div className="mt-6 space-y-6">
              {FAQ.map(([q, a]) => (
                <div key={q}>
                  <h3 className="font-semibold text-slate-900">{q}</h3>
                  <p className="mt-1 text-slate-600">{a}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-slate-500">
              Just want the prompt library?{" "}
              <Link href="/vault" className="text-orange-600 underline">
                Get the Vault for ${VAULT.launchPrice}
              </Link>{" "}
              and upgrade any time.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
