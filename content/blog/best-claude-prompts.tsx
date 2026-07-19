import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "best-claude-prompts",
  title: "15 Best Claude Prompts (Copy-Paste Templates)",
  description:
    "15 best Claude prompts for decks, reports, email sequences, and analysis — each with a full copy-paste template and why it works.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Prompts",
  tags: [
    "Claude",
    "best claude prompts",
    "claude prompts",
    "prompt templates",
    "claude prompt engineering",
    "productivity",
    "email sequences",
    "reports",
    "presentations",
    "analysis",
  ],
  body: (
    <>
      <p>
        The best Claude prompts are not clever one-liners — they are
        finished templates that specify the role, the inputs, the structure,
        and the format, so Claude returns a deliverable instead of a rough
        draft you still have to rebuild. Below are 15 of the highest-value
        prompts we use across decks, reports, email sequences, content, and
        planning, organized by outcome so you can find the one you need and
        copy it in under a minute.
      </p>
      <p>
        Every template below works in the{" "}
        <a href="https://claude.com" target="_blank" rel="noopener noreferrer">
          Claude
        </a>{" "}
        app on any paid plan. If you want the fundamentals behind why these
        prompts are built this way, read our{" "}
        <a href="/blog/claude-prompting-guide">Claude prompting guide</a>{" "}
        first — this article assumes you already know what a role, a
        constraint, and a format requirement do.
      </p>

      {/* ── Quick index graphic ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Outcome
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Prompt
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Best for
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-3 px-6 text-slate-700">Deck</td>
              <td className="py-3 px-6 text-slate-700">
                Sales pitch deck outline
              </td>
              <td className="py-3 px-6 text-slate-500">First-draft structure fast</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Deck</td>
              <td className="py-3 px-6 text-slate-700">
                Board / investor update
              </td>
              <td className="py-3 px-6 text-slate-500">Monthly or quarterly updates</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Deck</td>
              <td className="py-3 px-6 text-slate-700">
                Training / onboarding deck
              </td>
              <td className="py-3 px-6 text-slate-500">New hire or client onboarding</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Report</td>
              <td className="py-3 px-6 text-slate-700">
                Quarterly business report
              </td>
              <td className="py-3 px-6 text-slate-500">Leadership-ready summaries</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Analysis</td>
              <td className="py-3 px-6 text-slate-700">
                Data summary in plain English
              </td>
              <td className="py-3 px-6 text-slate-500">Turning exports into decisions</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Analysis</td>
              <td className="py-3 px-6 text-slate-700">
                Competitive analysis
              </td>
              <td className="py-3 px-6 text-slate-500">Positioning and strategy work</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Email</td>
              <td className="py-3 px-6 text-slate-700">
                Cold outreach sequence
              </td>
              <td className="py-3 px-6 text-slate-500">Pipeline generation</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Email</td>
              <td className="py-3 px-6 text-slate-700">
                Welcome / onboarding sequence
              </td>
              <td className="py-3 px-6 text-slate-500">New customers and leads</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Email</td>
              <td className="py-3 px-6 text-slate-700">
                Win-back sequence
              </td>
              <td className="py-3 px-6 text-slate-500">Lapsed customers</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Content</td>
              <td className="py-3 px-6 text-slate-700">
                LinkedIn thought-leadership post
              </td>
              <td className="py-3 px-6 text-slate-500">Personal brand and inbound</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Content</td>
              <td className="py-3 px-6 text-slate-700">
                Blog post outline + draft
              </td>
              <td className="py-3 px-6 text-slate-500">SEO and long-form content</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Content</td>
              <td className="py-3 px-6 text-slate-700">
                Repurpose one asset into a week
              </td>
              <td className="py-3 px-6 text-slate-500">Content consistency</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Planning</td>
              <td className="py-3 px-6 text-slate-700">
                Project plan with milestones
              </td>
              <td className="py-3 px-6 text-slate-500">Kicking off new work</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Planning</td>
              <td className="py-3 px-6 text-slate-700">
                Decision memo
              </td>
              <td className="py-3 px-6 text-slate-500">Options + recommendation</td>
            </tr>
            <tr>
              <td className="py-3 px-6 text-slate-700">Planning</td>
              <td className="py-3 px-6 text-slate-700">
                Meeting prep briefing
              </td>
              <td className="py-3 px-6 text-slate-500">Walking in prepared</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What makes a Claude prompt one of the best, not just a prompt</h2>
      <p>
        A great Claude prompt names a role, states the real inputs, and
        specifies the exact output structure — three things most people skip
        and then wonder why the response feels generic. Claude follows
        structure closely, so the more precisely you define the shape of the
        deliverable, the closer the first response lands to something you
        can actually use.
      </p>
      <p>
        Every template below follows the same skeleton: role, inputs
        (bracketed for you to fill in), required sections, and format
        constraints (length, tone, what to leave out). If you want more
        prompts built this way, our{" "}
        <a href="/blog/claude-prompt-templates">Claude prompt templates</a>{" "}
        library has dozens more sorted by department, and the{" "}
        <a href="/blog/claude-prompt-generator">Claude prompt generator</a>{" "}
        will build a custom one from your specific job in under a minute.
      </p>

      <h2>Decks and presentations</h2>
      <p>
        A deck prompt only works if you feed Claude the argument you want to
        make, not just the topic — Claude structures slides well, but it
        cannot invent the strategic point of view that makes a deck
        persuasive. Give it your conclusion and evidence, and let it handle
        the structure, pacing, and slide-by-slide breakdown.
      </p>

      <h3>1. Sales pitch deck outline</h3>
      <p>
        Use this before a big sales call to turn your talking points into a
        deck structure your designer or you can build from directly, or ask
        Claude to render it as an artifact for a quick working draft.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Act as a sales enablement specialist. Build a 10-12 slide pitch
deck outline for a sales call.

Prospect: [company, industry, size]
Their stated problem: [one sentence, in their words]
Our product/service: [one sentence]
Proof points: [2-3 results, case studies, or numbers we can cite]
Deal stage: [discovery / demo / closing]

Structure: title, the problem (framed in their language), cost of
inaction, our approach, how it works (3 steps max), proof, pricing
framing (no numbers, just structure), objection pre-empt, next
step. For each slide: headline, 2-3 supporting bullets, and a note
on what visual would work best. End with 3 alternate closing
slides for different objection scenarios.`}
      </pre>

      <h3>2. Board or investor update deck</h3>
      <p>
        Board updates fail when they bury the one number that matters under
        five that do not. This prompt forces Claude to lead with what
        changed and why, not a status report.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Act as a chief of staff preparing a board/investor update deck.

Period covered: [month/quarter]
Key metrics: [paste your numbers — revenue, growth, churn, runway,
whatever is relevant]
Wins: [2-4 things that went well]
Challenges: [1-3 things that did not, stated plainly]
Asks: [what you need from the board — decisions, intros, budget]

Build a 6-8 slide outline: headline slide (the single most
important takeaway this period, stated as a sentence, not a
title), metrics dashboard, wins, challenges (framed with what
we are doing about each, not just the problem), asks, and next
period's priorities. Tone: direct and confident, no spin. Do not
bury bad news — name it and pair it with the plan.`}
      </pre>

      <h3>3. Training or onboarding deck</h3>
      <p>
        For internal training, the failure mode is a wall of text slides.
        This prompt makes Claude think in teaching units, not bullet dumps.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Act as an instructional designer. Build a training deck outline.

Topic: [what you're training on]
Audience: [role, experience level, what they already know]
Goal: [what they should be able to DO after this training]
Format: [live session / self-paced / new-hire onboarding]
Length: [target number of slides or minutes]

Structure each section as: the concept (1 slide, plain language),
why it matters to THEM specifically (1 slide), a worked example
(1-2 slides), and a quick check-for-understanding question. End
with a one-page summary slide and a list of 5 follow-up questions
a sharp learner would ask, with brief answers.`}
      </pre>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Skip writing prompts from scratch every time
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has 550+ prompts and skills like these, pre-built
          and sorted by job — decks, reports, email, content, and more.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Reports and analysis</h2>
      <p>
        Reports and analysis prompts work best when you separate the data
        from the judgment — feed Claude the raw numbers and let it draft the
        narrative, then you correct anything that misreads the business
        context only you know.
      </p>

      <h3>4. Quarterly business report</h3>
      <p>
        This turns a pile of metrics and notes into a report leadership can
        actually skim in two minutes and still get the point.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Act as a business analyst writing a quarterly report for
leadership.

Business: [what we do]
Quarter: [Q_ 20__]
Metrics: [paste your numbers — revenue, pipeline, retention,
headcount, whatever applies]
Context notes: [anything numbers alone don't explain — a launch,
a market shift, a hire, a loss]

Write the report with these sections: executive summary (3
sentences max, the headline finding first), performance vs.
target (table format), what drove the results (2-3 factors,
ranked by impact), risks to watch next quarter, and 3 specific
recommendations. Every claim must trace to a number I gave you —
flag anything you are inferring rather than stating as fact.`}
      </pre>

      <h3>5. Data summary in plain English</h3>
      <p>
        Paste a spreadsheet export or analytics dump and get a readable
        summary instead of staring at rows of numbers trying to spot the
        story yourself.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`I'm pasting a data export below. Read it and tell me, in plain
English:

1. The 3 things that changed most since [last period/comparison]
2. For each, a plausible reason why — clearly labeled as a
   hypothesis, not a fact
3. One thing in this data that looks like it needs attention
   before it becomes a bigger problem
4. What you would test or investigate next, ranked by how much
   it could move the outcome

Do not just describe every column. Tell me what matters and skip
the rest.

DATA:
[paste export]`}
      </pre>

      <h3>6. Competitive analysis</h3>
      <p>
        Feed Claude what you know about competitors and it will structure a
        comparison you can act on, rather than a list of company names with
        no point of view.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Act as a competitive strategist. Build a competitive analysis.

Our product: [one sentence]
Our positioning: [how we currently describe ourselves]
Competitors: [list 3-5, with anything you know — pricing,
messaging, recent moves]

For each competitor: positioning, key differentiator, pricing
approach (if known), and one likely vulnerability. Then produce
a comparison table across all of them on the 4-5 attributes
buyers actually care about. Close with: where we should NOT try
to compete head-on, and the one gap in the market none of them
are covering well.`}
      </pre>

      <h2>Email sequences</h2>
      <p>
        The best email sequence prompts assign a single job to each email —
        Claude holds that constraint reliably across a batch, which is
        exactly what makes a sequence read like one coherent argument
        instead of five disconnected messages. For a deeper set of marketing
        workflows, see our{" "}
        <a href="/blog/claude-for-marketers">Claude for marketers</a> guide.
      </p>

      <h3>7. Cold outreach sequence</h3>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Write a 4-email cold outreach sequence.

We sell: [offer, one sentence]
To: [target buyer — role, company type]
Their likely pain: [what keeps them up at night]
Proof we have: [a result, case study, or number]

One job per email: 1) a specific, relevant opener (no "I hope
this finds you well"), 2) the proof point as a mini case study,
3) a direct, low-friction ask, 4) a break-up email that leaves
the door open. Each email under 100 words. Subject lines under 6
words. No hype language, no exclamation points. Write like a
person, not a template.`}
      </pre>

      <h3>8. Welcome / onboarding sequence</h3>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Write a 5-email welcome sequence for new [customers/subscribers].

They signed up for: [lead magnet, product, or service]
We offer: [what we sell, price if relevant]
Voice: [2-3 adjectives]

One job per email: deliver on the promise that got them to sign
up, reframe their biggest misconception about the problem we
solve, tell a real transformation story, handle the #1 objection
we hear, make a direct offer. Each email: subject + one
alternate, 120-200 word body, single clear CTA. Write to one
person, not a list.`}
      </pre>

      <h3>9. Win-back sequence</h3>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Write a 3-email win-back sequence for lapsed [customers/users].

Product: [what we sell]
Why people likely left: [your best guess — price, lack of use,
better competitor, life got busy]
What's new or different now: [an improvement, feature, or offer
worth mentioning]

Email 1: acknowledge the gap honestly, no guilt-tripping, remind
them what they liked. Email 2: address the likely reason they
left directly, show what changed. Email 3: a time-limited,
specific incentive to return, with a clear expiration. Keep each
under 120 words. Tone: warm, not desperate.`}
      </pre>

      <h2>Content and social</h2>
      <p>
        Content prompts get generic when you ask for a topic instead of a
        point of view — hand Claude your actual opinion or observation and
        it will sharpen it into a format, rather than manufacturing a bland
        one from scratch.
      </p>

      <h3>10. LinkedIn thought-leadership post</h3>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Write a LinkedIn post from my point of view.

Topic/insight: [the specific observation or lesson you want to
share — be specific, not "AI is changing marketing"]
Audience: [who should see this]
Goal: [inbound leads / build authority / start a conversation]

Guidelines: first person, no corporate "we". No buzzwords —
"leverage," "unlock," "game-changer," "disrupt" are banned. Take
a clear, slightly contrarian position — "it depends" is not
insight. Hook in line one. 150-250 words. End with a genuine
question, not a fake one. Also give me 3 alternate opening
hooks I can pick from.`}
      </pre>

      <h3>11. Blog post outline and draft</h3>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Act as a content strategist and writer. Build a blog post.

Target keyword: [keyword]
Reader's real question: [what they actually want answered]
Our angle: [what makes our take different from the top-ranking
pages — a fact, a framework, a contrarian take]
Length: [word count target]

Step 1: give me an outline — H2s only, each with a one-sentence
promise of what it answers.
Step 2 (after I approve): write the full draft. Each H2 opens
with a 1-2 sentence answer someone could quote on its own. No
filler intros, no "in today's fast-paced world." Plain language,
short paragraphs, specific examples over generic claims.`}
      </pre>

      <h3>12. Repurpose one asset into a week of content</h3>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`I'm pasting a [blog post / transcript / webinar] below. Turn it
into a week of channel-native content, not copy-pasted excerpts.

Produce: 1 LinkedIn post (150-250 words, one specific insight
from the source), 1 X/Twitter thread (5-7 posts, one idea per
post), 1 short-form video script (60-90 seconds, hook in the
first 3 seconds), 1 email newsletter section (100-150 words with
a link back to the source).

Each piece should feel native to its platform, built around a
different angle from the source material — not the same summary
four times.

SOURCE:
[paste content]`}
      </pre>

      <h2>Planning and decisions</h2>
      <p>
        Planning prompts earn their keep when they force tradeoffs instead
        of listing options — the strongest version of this prompt makes
        Claude commit to a recommendation, not just present a menu you still
        have to decide from yourself.
      </p>

      <h3>13. Project plan with milestones</h3>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Act as a project manager. Build a project plan.

Project: [one sentence]
Goal/deadline: [what done looks like, by when]
Team: [who's involved, roughly what they own]
Constraints: [budget, dependencies, anything fixed]

Structure: phases (3-5, each with a name and objective), for each
phase: key milestones, rough duration, owner, and dependency on
prior phases. Then: top 3 risks to this timeline and a mitigation
for each. End with a one-paragraph summary I could paste into a
kickoff email.`}
      </pre>

      <h3>14. Decision memo</h3>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Act as a strategic advisor. Write a decision memo.

Decision to be made: [one sentence]
Options on the table: [list 2-4, with what you know about each]
What matters most: [cost, speed, risk, reversibility — rank
these]
Constraints: [budget, timeline, political factors]

For each option: pros, cons, and what has to be true for it to be
the right call. Then give me ONE clear recommendation, stated in
one sentence, with the top 3 reasons. Do not hedge with "it
depends" — if genuine uncertainty remains, say what information
would resolve it and how to get it fastest.`}
      </pre>

      <h3>15. Meeting prep briefing</h3>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`I have a meeting coming up. Prepare a briefing I can read in 5
minutes.

Meeting: [type — kickoff, review, negotiation, interview]
Attendees: [names, roles, anything relevant about their
perspective]
Context: [what's happened so far, what's at stake]
My goal for this meeting: [the outcome I want]

Give me: key context to have top of mind, 5 tough questions they
might ask with a confident short answer to each, 3 talking points
framed as insights not status updates, and the one decision I
should try to leave with. Keep the whole thing under one page.`}
      </pre>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want new prompts like these delivered weekly, not searched for?
        </p>
        <p className="mt-2 text-slate-700">
          Inside Claude Code Academy you get the full Vault, structured
          courses, and a weekly live call — with 1,200+ professionals using
          these workflows daily.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>How to adapt any of these prompts to your own job</h2>
      <p>
        Every template above follows the same pattern — role, inputs,
        structure, format — and once you see that pattern, you can rebuild
        it for anything you do that these 15 do not directly cover. Start by
        naming the deliverable you actually want (not the topic), list the
        real inputs you would hand a smart new hire, then specify the
        sections and the things you do not want (hedging, filler, generic
        advice).
      </p>
      <p>
        If you would rather not build the prompt yourself, the{" "}
        <a href="/blog/claude-prompt-generator">Claude prompt generator</a>{" "}
        takes your job description and outcome and builds a custom template
        in this same structure. And if you want the full library this
        article pulled from, browse the{" "}
        <a href="/blog/claude-prompt-templates">Claude prompt templates</a>{" "}
        collection next.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Do these prompts work in Claude for free, or do I need a paid plan?</h3>
      <p>
        Most of these run fine on the free tier for a single use, but longer
        prompts with heavy context (like the competitive analysis or data
        summary) work more reliably on a paid plan, where longer
        conversations and file uploads are more generous. See{" "}
        <a href="/blog/is-claude-ai-free-pricing-guide">
          our Claude pricing guide
        </a>{" "}
        for the specifics.
      </p>

      <h3>Should I use the same prompt every time or customize it?</h3>
      <p>
        Customize the bracketed inputs every time — the structure is the
        reusable part, the inputs are what make the output specific to your
        situation. A prompt with real numbers, names, and context will
        always beat the same prompt left generic.
      </p>

      <h3>Why does Claude sometimes ignore part of my prompt?</h3>
      <p>
        Usually because the prompt asks for too many things at once. Break a
        prompt that asks Claude to analyze, summarize, recommend, and format
        all in one pass into two sequential prompts — a first draft, then a
        refinement request. The second pass is consistently better than
        trying to get everything perfect in one shot.
      </p>

      <h3>Can I turn these into a document or slide deck automatically?</h3>
      <p>
        Yes — ask Claude to build the output as an artifact and it will
        generate a structured, previewable document or slide outline you can
        keep refining in plain English, rather than a plain text response
        you have to reformat yourself.
      </p>
    </>
  ),
};
