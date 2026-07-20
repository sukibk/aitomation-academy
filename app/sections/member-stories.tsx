import { Quote } from "lucide-react";
import { approvedTestimonials } from "@/lib/testimonials";

// CONSENT-GATED testimonial wall.
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
        <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
          What members are building
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
          Real posts from inside the community, shared with permission.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((t) => (
            <figure
              key={t.sourceUrl + t.quote.slice(0, 20)}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6"
            >
              <Quote className="h-6 w-6 text-orange-400" />
              <blockquote className="mt-4 flex-1 text-slate-700">“{t.quote}”</blockquote>
              <figcaption className="mt-4">
                <div className="font-semibold text-slate-900">{t.name}</div>
                <div className="text-sm text-slate-500">{t.context}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
