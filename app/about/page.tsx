import { siteConfig } from "@/lib/site";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/sections/footer";
import { CommunityWins } from "@/app/sections/community-wins";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: `About Marko | ${siteConfig.name}`,
  description:
    "Meet Marko Sudar — software engineer, AI researcher, and the instructor behind AItomation Academy. Learn why he built this community.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

const credentials = [
  {
    stat: "1M+",
    label: "views on my online Claude and AI tutorials",
  },
  {
    stat: "1,200+",
    label: "students mentored inside the Academy",
  },
  {
    stat: "$1.8M",
    label: "GenAI startup acquired, I was the founding engineer",
  },
  {
    stat: "Daily",
    label: "I ship production AI systems with Claude every workday",
  },
];

const highlights = [
  "1M+ views on tutorials teaching Claude, Cowork, and Claude Code",
  "1,200+ professionals mentored, from first prompt to shipped projects",
  "Weekly live calls where members' real projects get fixed on screen",
  "Students have landed commercial deals, ranked on page 1 of Google, and shipped their first apps",
  "Every lesson comes from work I shipped myself, not theory",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white bg-grid">
        {/* Hero section */}
        <section className="relative py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-12"
              >
                &larr; Back
              </Link>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Photo */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-3xl bg-orange-500/10" />
                    <Image
                      src="/images/marko_sudar_profile_photo.png"
                      alt="Marko Sudar"
                      width={400}
                      height={400}
                      className="relative rounded-2xl shadow-xl"
                      priority
                    />
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1.5 shadow-md">
                      <Image
                        src="/images/creatives/aitomation_logo.png"
                        alt="AItomation Academy"
                        width={100}
                        height={25}
                        className="h-8 w-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* Intro */}
                <div>
                  <span className="inline-block text-xs font-semibold text-orange-600 uppercase tracking-widest mb-4">
                    About the Instructor
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight text-slate-900 leading-[1.1] mb-6">
                    Hey, I&apos;m Marko Sudar
                  </h1>
                  <p className="text-lg text-slate-500 leading-relaxed mb-8">
                    I teach non-technical professionals how to get finished work
                    out of Claude. Over a million people have watched my
                    tutorials, and 1,200+ of them learn with me inside the
                    Academy. By day I build production AI systems as an
                    engineer, so everything I teach is something I shipped
                    myself first.
                  </p>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {credentials.map((item) => (
                      <div
                        key={item.stat}
                        className="rounded-xl border border-slate-200 bg-white p-4"
                      >
                        <div className="text-xl font-bold text-orange-600">
                          {item.stat}
                        </div>
                        <div className="text-sm text-slate-500 mt-1">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-display tracking-tight text-slate-900 mb-8">
                Why I built this
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
                <p>
                  I started posting Claude tutorials because I was using it every
                  day as an engineer and kept watching non-technical people get
                  left behind. Those tutorials passed a million views, and the
                  same question kept landing in my inbox: this is great, but
                  where do I actually start?
                </p>
                <p>
                  Everything published out there was either written for
                  developers or too shallow to produce anything real. The people
                  who could benefit most from Claude (consultants, marketers,
                  creators, founders) had the least usable guidance.
                </p>
                <p>
                  So I built the Academy: a path that starts at zero and ends
                  with things you built yourself. 1,200+ members are on it now.
                  Some of them have landed commercial deals with what they
                  learned, put their new websites on page 1 of Google, and
                  shipped their first working apps without a line of code they
                  wrote by hand.
                </p>
                <p>
                  My background, for the record: founding engineer of a GenAI
                  startup that was acquired for $1.8M, and I still build
                  production AI systems every day. I teach it because I do it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-display tracking-tight text-slate-900 mb-8">
                Why people learn from me
              </h2>
              <ul className="space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-orange-500 shrink-0" />
                    <span className="text-lg text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Teaching approach */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-display tracking-tight text-slate-900 mb-8">
                How I teach
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
                <p>
                  Everything I teach comes from real work, not theory. I
                  don&apos;t do hype, and I don&apos;t do fluff. If I show you a
                  workflow, it&apos;s because I use it myself to ship real
                  projects.
                </p>
                <p>
                  AItomation Academy is a practical system. You set up Claude,
                  build real outputs, and walk away with something you can
                  actually use. Plus you get direct access to me for questions,
                  live weekly coaching calls, and a community of professionals
                  who are building with Claude alongside you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CommunityWins />

        {/* CTA */}
        <section data-section="about_cta" className="py-28 bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-display tracking-tight text-white sm:text-4xl mb-4">
                Ready to start?
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-lg mx-auto">
                Join 1200+ professionals who are already using Claude for real
                work. No coding required.
              </p>
              <Link
                href="/skool-redirect"
                className="group inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-white hover:bg-orange-600 transition-colors"
              >
                Join the Free Community
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Connect */}
        <section data-section="about_connect" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-display tracking-tight text-slate-900 mb-8">
                Connect with me
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:bg-orange-50/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 text-lg font-bold">
                    Y
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">YouTube</div>
                    <div className="text-sm text-slate-500">
                      Tutorials and walkthroughs
                    </div>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/marko-sudar-00918221b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:bg-orange-50/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-lg font-bold">
                    in
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">LinkedIn</div>
                    <div className="text-sm text-slate-500">
                      Professional updates
                    </div>
                  </div>
                </a>
                <a
                  href="/skool-redirect"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:bg-orange-50/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 text-lg font-bold">
                    S
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      Skool Community
                    </div>
                    <div className="text-sm text-slate-500">Join for free</div>
                  </div>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:bg-orange-50/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 text-lg font-bold">
                    @
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Email</div>
                    <div className="text-sm text-slate-500">Direct contact</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
