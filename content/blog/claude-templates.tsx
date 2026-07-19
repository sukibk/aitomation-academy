import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-templates",
  title: "Claude Templates: 4 Ready-to-Paste Examples",
  description:
    "Four ready-to-paste Claude templates — project instructions, custom style, skill, and document — plus where each one lives and when to use it.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Prompts",
  tags: [
    "Claude",
    "claude templates",
    "claude ai templates",
    "project instructions",
    "custom styles",
    "skills",
    "templates",
    "prompts",
  ],
  body: (
    <>
      <p>
        Search for &quot;Claude templates&quot; and you will find a pile of
        one-off prompts pretending to be a system. A real template is
        something you set up once and reuse without rewriting it — and Claude
        actually has four distinct places where that kind of reuse lives:
        project instructions, custom styles, skills, and document templates.
        Each does a different job, and picking the wrong one is why most
        people rebuild the same prompt every week instead of running a
        template.
      </p>
      <p>
        This guide gives you one complete, ready-to-paste example of each
        type, plus the rule for when to use which. Every example works inside
        the{" "}
        <a href="https://claude.com" target="_blank" rel="noopener noreferrer">
          Claude
        </a>{" "}
        app on a paid plan. If you want the prompting fundamentals underneath
        all four, start with our{" "}
        <a href="/blog/claude-prompting-guide">Claude prompting guide</a>.
      </p>

      <h2>Claude templates are not one format — they are four</h2>
      <p>
        Project instructions set persistent context for an entire workspace.
        Custom styles set a reusable voice that travels across chats. Skills
        package a repeatable procedure Claude can load on demand. Document
        templates shape the structure of a single output. Treat these as
        interchangeable and you will paste a paragraph-long persona into a
        one-off email prompt, or rebuild a 40-line procedure by hand every
        time you need it.
      </p>
      <p>
        The table below is the fastest way to place a template correctly
        before you write a single word of it.
      </p>

      {/* ── Template type comparison ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Template type
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Lives in
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Sets
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Best for
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Project instructions
              </td>
              <td className="py-4 px-6 text-slate-700">
                A single Project&apos;s settings
              </td>
              <td className="py-4 px-6 text-slate-700">
                Context for every chat in that Project
              </td>
              <td className="py-4 px-6 text-slate-700">
                One client, one role, one recurring body of work
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Custom style
              </td>
              <td className="py-4 px-6 text-slate-700">
                Claude&apos;s style settings, applied per chat
              </td>
              <td className="py-4 px-6 text-slate-700">
                Tone, format, and voice
              </td>
              <td className="py-4 px-6 text-slate-700">
                A voice you reuse across many different Projects
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Skill
              </td>
              <td className="py-4 px-6 text-slate-700">
                A SKILL.md file Claude loads when relevant
              </td>
              <td className="py-4 px-6 text-slate-700">
                A repeatable multi-step procedure
              </td>
              <td className="py-4 px-6 text-slate-700">
                Work with the same steps every time, across apps
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Document template
              </td>
              <td className="py-4 px-6 text-slate-700">
                A prompt you paste and fill in
              </td>
              <td className="py-4 px-6 text-slate-700">
                The structure of one output
              </td>
              <td className="py-4 px-6 text-slate-700">
                A single deliverable you produce often, one at a time
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Now let&apos;s build one of each — starting with the one that saves
        the most re-typing per week.
      </p>

      <h2>Template 1: Project instructions for a recurring workspace</h2>
      <p>
        Project instructions are context you set once and Claude applies to
        every conversation inside that Project, so you stop re-explaining who
        you are, who the audience is, and what &quot;good&quot; looks like at
        the top of every chat. Create a Project per client, per role, or per
        recurring type of work, paste the instructions below into its
        settings, and every new conversation starts already briefed.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`You are supporting me inside this Project. Apply this context to
every conversation unless I explicitly say otherwise.

WHO I AM: [your role, e.g. "a freelance marketing consultant"]
WHO THIS PROJECT IS FOR: [client name, team, or purpose]
WHAT "GOOD" LOOKS LIKE HERE: [3-5 bullet standards, e.g.
- No corporate buzzwords ("synergy", "leverage", "unlock")
- Every recommendation includes a specific next step and owner
- Assume the reader skims first, reads deeply second]

WHAT YOU SHOULD ASSUME BY DEFAULT:
- [e.g. "Audience is non-technical — explain jargon in one clause"]
- [e.g. "I bill by the project, so flag scope creep"]
- [e.g. "British English spelling"]

WHEN YOU ARE UNSURE:
- Ask a clarifying question rather than guessing on anything
  client-facing.
- Flag any claim you are not confident about instead of stating
  it as fact.

FORMAT DEFAULTS (unless a specific prompt says otherwise):
- Headers and bullets over dense paragraphs
- Bold the one sentence that matters most in each section
- No em-dashes in client-facing copy`}
      </pre>
      <p>
        The instructions above are deliberately generic — that is the point.
        Fill in the bracketed lines once for a specific client or role, and
        every prompt you run inside that Project inherits it automatically.
        For more business-specific starting points, our{" "}
        <a href="/blog/claude-prompts-for-business">
          Claude prompts for business
        </a>{" "}
        collection has instructions built for common roles.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Skip building these templates from scratch
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has 550+ ready-to-paste recipes, sorted by job —
          including a dedicated section of project instructions, styles, and
          skill templates already written for common roles.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Template 2: A custom style that travels with you</h2>
      <p>
        A custom style is different from project instructions in one
        important way: it is not tied to a single Project. Set it up once and
        apply the same voice — formal for enterprise clients, plain and warm
        for a newsletter, data-heavy for a board memo — to any chat,
        regardless of which Project it lives in. That makes styles the right
        template for voice, and the wrong template for context that only
        applies to one client or one body of work.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Write in this style whenever I select it, regardless of topic:

VOICE: [3 adjectives, e.g. "direct, warm, unfussy"]
SENTENCE LENGTH: Mostly short. One idea per sentence. Break up
any sentence over 25 words.
VOCABULARY: Plain English. No jargon unless the audience is
technical and I say so. Never use: "leverage," "unlock,"
"game-changer," "delve," "revolutionize."
STRUCTURE: Lead with the conclusion, then the reasoning. Never
bury the point in the third paragraph.
PUNCTUATION: No em-dashes. No exclamation points except in
direct quotes.
WHAT TO AVOID: Hedging phrases like "it's worth noting that" or
"in today's fast-paced world." Say the thing directly.

If a specific prompt gives more detail on tone for that task,
follow the prompt's instructions over this default — this style
is the fallback, not an override.`}
      </pre>
      <p>
        Notice the last paragraph: a good style template explicitly defers to
        task-specific instructions. Without that line, a strong style can
        fight a prompt that needs a different register — for example, a
        legal disclaimer that has to sound formal even though your default
        style is casual.
      </p>

      <h2>Template 3: A skill for a procedure you run more than once</h2>
      <p>
        A skill is a folder with a SKILL.md file — a short set of
        instructions Claude loads automatically when it is relevant, across
        the Claude app, Cowork, and Claude Code. Use a skill instead of a
        style or project instruction when the thing you are reusing is a
        multi-step procedure, not just a tone. A weekly reporting process, a
        client-onboarding checklist, or a specific research method are all
        better shipped as a skill than retyped as a prompt.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`---
name: weekly-client-report
description: Turn raw notes and metrics into a formatted weekly
  client status report. Use when the user asks for a weekly
  update, status report, or client check-in summary.
---

# Weekly Client Report

When this skill is active, produce the report in this exact
structure:

1. HEADLINE (one sentence): the single most important thing
   that happened this week — good or bad.
2. METRICS SNAPSHOT: a short table of this week vs last week
   for whatever numbers were provided. Flag any metric that
   moved more than 15% in either direction.
3. WHAT WE DID: 3-5 bullets, each starting with a verb, no
   filler ("worked on," "continued") — say what shipped.
4. WHAT'S NEXT: 2-3 bullets, each with an owner and a rough
   date.
5. NEEDS FROM THEM: anything blocking progress that requires
   client input or a decision.

Rules:
- If a number is missing, ask for it rather than estimating.
- Keep the whole report under one printed page.
- Match the client's name and the reporting period exactly as
  given — never invent either.`}
      </pre>
      <p>
        Save that as <code>SKILL.md</code> inside a folder named
        <code> weekly-client-report</code>, and Claude will recognize when to
        use it based on the description you wrote — you do not need to paste
        it into every chat. For a deeper walkthrough of building, installing,
        and finding skills, see our{" "}
        <a href="/blog/claude-skills-marketplace">Claude skills marketplace</a>{" "}
        guide.
      </p>

      <h2>Template 4: A document template for a single deliverable</h2>
      <p>
        Sometimes you don&apos;t need persistent context, a voice, or a
        procedure — you need one document shaped correctly, right now. A
        document template is a prompt with the sections already laid out, so
        you fill in the brackets and get a structured first draft instead of
        staring at a blank page. This is the template type most people reach
        for first, and the one worth having a library of.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Draft a one-page project brief using the structure below.
Fill every section — if information is missing, mark it
[NEEDS INPUT] rather than inventing it.

PROJECT: [name]
OWNER: [who is accountable]
DEADLINE: [date]

1. PROBLEM (2-3 sentences): what is broken or missing today,
   and why it matters now.
2. GOAL (1 sentence): what "done" looks like, stated as an
   outcome, not an activity.
3. SCOPE: 3-5 bullets on what is included. Then a short
   "OUT OF SCOPE" list — this section prevents scope creep.
4. MILESTONES: a table with Milestone | Owner | Date.
5. RISKS: 2-3 things most likely to derail this, each with a
   one-line mitigation.
6. OPEN QUESTIONS: anything that needs a decision before work
   starts.

Format for a one-page PDF: headers, bullets, one table. No
paragraph longer than 3 sentences.`}
      </pre>
      <p>
        Build ten or fifteen of these for the documents you produce most —
        briefs, proposals, meeting recaps, social posts — and you have a
        personal template library that turns a blank page into a 90%-done
        draft in under a minute. Our{" "}
        <a href="/blog/claude-prompt-templates">Claude prompt templates</a>{" "}
        collection has a larger set organized by document type if you want to
        start from a bigger library instead of building from zero.
      </p>

      <h2>How to tell which template you actually need</h2>
      <p>
        When you catch yourself about to retype something, ask one question
        first: am I reusing context, a voice, a procedure, or a shape? The
        answer tells you which of the four templates to build, and building
        the wrong one is the single most common reason people give up on
        &quot;templating&quot; Claude after one attempt.
      </p>
      <ul>
        <li>
          <strong>Reusing context about a person, client, or ongoing body of
          work?</strong> Build project instructions.
        </li>
        <li>
          <strong>Reusing a voice across many different topics and
          Projects?</strong> Build a custom style.
        </li>
        <li>
          <strong>Reusing a multi-step procedure you run on a schedule or
          trigger?</strong> Build a skill.
        </li>
        <li>
          <strong>Reusing the shape of one document you produce often?</strong>{" "}
          Build a document template.
        </li>
      </ul>
      <p>
        Most professional workflows end up using two or three of these
        together — project instructions holding the client context, a skill
        running the recurring procedure, and a document template shaping the
        final deliverable. Trying to force one format to do all three jobs is
        what makes a template feel like it stopped working after the second
        use.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want a library of these already built, plus a place to ask questions?
        </p>
        <p className="mt-2 text-slate-700">
          Inside AItomation Academy you get the full Vault, structured
          courses on Projects, styles, and skills, and a weekly live call —
          with 1,200+ professionals using these templates daily.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Keeping templates from going stale</h2>
      <p>
        A template that never changes eventually produces output that feels
        slightly off — the client relationship shifted, your voice matured,
        or the procedure gained a step nobody wrote down. Revisit each
        template roughly every quarter: read the last five outputs it
        produced and ask whether you had to correct the same thing twice. If
        yes, that correction belongs in the template, not in your head.
      </p>
      <p>
        This is also why project instructions and skills tend to age better
        than one-off document templates: they live in one place, so updating
        them once fixes every future conversation, instead of you needing to
        remember to paste a corrected version next time.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Do skills replace project instructions?</h3>
      <p>
        No — they solve different problems. Project instructions hold
        context specific to one Project (a client, a role, an ongoing body of
        work). Skills package a procedure that should behave the same way
        regardless of which Project it runs in. Many workflows use both at
        once: instructions for who the client is, a skill for how the report
        gets built.
      </p>

      <h3>Can I use the same templates in Claude Code or Cowork?</h3>
      <p>
        Skills are designed to work across the Claude app, Cowork, and Claude
        Code, since they are just a folder with a SKILL.md file that any of
        those surfaces can load. Project instructions and custom styles are
        specific to the Claude app&apos;s Projects and style settings.
      </p>

      <h3>How many templates should I actually build?</h3>
      <p>
        Start with one of each type for your single most repeated piece of
        work, not four templates across four different jobs. A weekly report
        skill, one client&apos;s project instructions, your default style,
        and one document template you use constantly will save more time
        than a shelf of templates you built once and never touched again.
      </p>

      <h3>Where can I find more templates instead of writing my own?</h3>
      <p>
        Our{" "}
        <a href="/blog/claude-prompt-templates">Claude prompt templates</a>{" "}
        guide has a larger library organized by document type, and the{" "}
        <a href="/blog/claude-skills-marketplace">Claude skills marketplace</a>{" "}
        guide covers finding and installing pre-built skills instead of
        writing your own from scratch. For the underlying prompting skills
        that make any template work better, see our{" "}
        <a href="/blog/claude-prompting-guide">Claude prompting guide</a>.
      </p>
    </>
  ),
};
