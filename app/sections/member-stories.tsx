import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import { Mark } from "@/app/components/mark";
import { approvedTestimonials } from "@/lib/testimonials";

// CONSENT-GATED testimonial wall, styled as community post cards.
// Every entry in lib/testimonials.ts is a verbatim quote from a real member's
// own community post, and starts with approved=false. The site owner flips
// approved=true ONLY after that member has explicitly agreed (in writing) to
// have their quote shown on the website. Until then this section renders
// nothing at all. No quote is ever displayed without the member's permission.
export function MemberStories() {
  const stories = approvedTestimonials();
  if (stories.length === 0) return null;

  return (
    <section data-section="member_stories" className="px-6 py-20 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-0.5 w-8 rounded bg-orange-400" />
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-600">
              Member stories
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            What members are <Mark>building</Mark>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Real posts from inside the community, shared with permission.
          </p>
        </div>
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {stories.map((t) => (
            <figure
              key={t.sourceUrl + t.quote.slice(0, 20)}
              className="mb-4 break-inside-avoid rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                    {t.name.charAt(0)}
                  </span>
                  <figcaption>
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.context}</div>
                  </figcaption>
                </div>
                <Trophy className="h-5 w-5 shrink-0 text-amber-500" />
              </div>
              <blockquote className="mt-4 text-slate-700">“{t.quote}”</blockquote>
            </figure>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/academy"
            data-cta="member_stories_academy"
            className="inline-flex items-center gap-2 font-semibold text-orange-600 transition-colors hover:text-orange-700"
          >
            Build something like this: see the Academy membership
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
