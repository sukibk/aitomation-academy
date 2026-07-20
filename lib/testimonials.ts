// Consent-gated member testimonials.
//
// RULES:
// - Only add a member's name + quote here AFTER they have given written permission
//   (DM reply counts — keep the screenshot). This file is in a git repo, so adding
//   an entry publishes it; unconsented quotes must never be added, even as drafts.
// - Quotes must be verbatim from the member's own post (trim for length only).
//   Never invent or "enhance" quotes — fabricated testimonials violate the FTC
//   fake-reviews rule and get Meta ad accounts banned.
//
// Candidate quotes (mined from real community posts, awaiting permission) live
// OUTSIDE this repo in: ~/Desktop/proba kurs/TESTIMONIALS-CANDIDATES.md
// Once a member says yes, copy their entry here with approved: true.

export interface Testimonial {
  name: string; // how the member asked to be displayed
  context: string; // role/business context from their own post
  quote: string; // verbatim from the post
  sourceUrl: string; // the community post (for records; not rendered)
  approved: boolean; // written permission received
}

export const TESTIMONIALS: Testimonial[] = [
  // add consented entries here
];

export const approvedTestimonials = () => TESTIMONIALS.filter((t) => t.approved);
