import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-design-skills",
  title: "Claude Designer Skills: Frontend, Brand & UI",
  description:
    "Claude designer skills for frontend UI generation, brand-voice design systems, and artifact mockups, plus a full brand-guidelines skill example.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Use Cases",
  tags: [
    "Claude",
    "claude designer skills",
    "claude frontend design skill",
    "claude skills",
    "ui design",
    "brand guidelines",
    "artifacts",
    "design systems",
    "frontend design",
    "mockups",
  ],
  body: (
    <>
      <p>
        Claude designer skills turn a folder of instructions and reference
        files into a repeatable design process — a frontend design skill that
        stops Claude from defaulting to the same three fonts and blue
        gradient, a brand-voice skill that keeps every artifact on-brand
        without you re-explaining your palette each time, and a mockup
        workflow that gets a clickable UI in front of a client before a
        designer opens Figma. This guide covers all three, plus a complete,
        copy-paste brand-guidelines skill you can adapt today.
      </p>
      <p>
        If you have not used skills at all yet, start with our{" "}
        <a href="/blog/what-are-claude-skills">what are Claude Skills</a>{" "}
        primer first — everything below assumes you understand the basic
        folder-and-instructions model. Every workflow here runs inside the{" "}
        <a href="https://claude.com" target="_blank" rel="noopener noreferrer">
          Claude
        </a>{" "}
        app or Claude Code on any paid plan.
      </p>

      <h2>Why design work specifically needs a skill, not just a prompt</h2>
      <p>
        A model trained on the statistical center of the internet reproduces
        the statistical center of design — the same rounded cards, the same
        Inter font, the same purple-to-blue gradient hero, on every single
        request. Anthropic&apos;s own engineering team calls this
        distributional convergence, and it is the reason a bare prompt like
        &quot;make this look nice&quot; keeps handing you the same
        forgettable output no matter how many times you ask.
      </p>
      <p>
        A skill fixes this by loading a point of view before Claude touches
        any code: banned fonts, a required commitment to one aesthetic
        direction, a rule that says take one real risk you can justify. That
        is the entire difference between a claude frontend design skill and a
        one-off styling prompt — the skill persists the taste, the prompt
        only persists the request.
      </p>

      {/* ── Three design skill categories ── */}
      <div className="not-prose my-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
            Frontend design
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Generates working React/Tailwind UI with a deliberate visual
            direction instead of generic defaults.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
            Brand-voice systems
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Encodes your colors, type, and tone so every artifact matches your
            brand without re-briefing.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
            Artifact mockups
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Turns a rough idea into a clickable preview you can hand to a
            client or developer same-day.
          </p>
        </div>
      </div>

      <h2>Frontend design: a skill, not a single prompt</h2>
      <p>
        The frontend design skill in Anthropic&apos;s public skills repository
        is built for exactly this: elaborate, multi-component artifacts built
        with React, Tailwind, and shadcn/ui, produced with a design system in
        mind before the first line of markup gets written. It explicitly
        rules out overused defaults — fonts like Inter, Roboto, and Arial are
        off the table — and pushes Claude to commit to one direction:
        brutalist, editorial, maximalist, retro-futuristic, whatever actually
        fits the brief.
      </p>
      <p>
        In practice, this changes what you get back. Instead of &quot;here is
        a landing page,&quot; you get a page with a specific typographic
        hierarchy, a palette chosen for the brand rather than pulled from a
        default theme, and micro-interactions that read as intentional. You
        can install the official version directly, or write your own with the
        same philosophy baked into a shorter SKILL.md.
      </p>
      <p>
        The distinction that matters for non-technical teams: a claude
        frontend design skill is not a plugin that makes things prettier as a
        finishing pass. It changes the order of operations. The aesthetic
        direction gets decided first, before any component gets written, the
        same way a real design lead would open a brief by picking a point of
        view rather than starting from a blank component library and hoping
        something coherent falls out the other end.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Build this as an artifact using a frontend design skill mindset.

Project: [what you're building, one sentence]
Audience: [who sees this]
Aesthetic direction: [pick one — editorial / brutalist / minimal-luxury /
retro-futuristic / maximalist — do not blend more than one]

Rules:
- No Inter, Roboto, Arial, or Space Grotesk. Pick a typeface pairing
  that supports the direction.
- Commit to one real aesthetic risk and be ready to justify it.
- Use React + Tailwind. Build it as a working artifact, not a
  description of one.
- Support light and dark mode.

Return the artifact, then a short note on the one risk you took and why.`}
      </pre>
      <p>
        For teams working inside Claude Code specifically — where a skill
        can be scoped to a repo and reused across every UI task — our{" "}
        <a href="/blog/claude-code-skills">Claude Code skills guide</a>{" "}
        covers how to install and structure this so it fires automatically
        whenever you touch a component file.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Skip writing the skill yourself
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has a pre-built design section — frontend UI
          recipes, brand-system prompts, and mockup workflows, each producing
          a finished artifact. 550+ recipes total, sorted by your job.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Brand-voice design systems: teach Claude your brand once</h2>
      <p>
        A brand-voice skill is the reference pattern for encoding an actual
        brand into something Claude loads automatically instead of something
        you retype into every prompt. Anthropic&apos;s own public
        brand-guidelines skill does exactly this for its own brand — mapping
        specific hex codes for primary, secondary, and accent colors, and
        pinning a font hierarchy for headings versus body copy, so any
        artifact that could use a brand look picks it up without being asked.
      </p>
      <p>
        The pattern generalizes cleanly to any business. Instead of pasting
        your brand guidelines PDF into every chat, you write them once as a
        skill: colors, type, logo usage rules, tone-of-voice notes, do/don&apos;t
        examples. Claude loads it whenever the task looks like it needs a
        brand look, and every deck, landing page, or social graphic comes out
        consistent — no re-briefing, no drift between what marketing ships
        and what sales ships.
      </p>
      <p>
        This matters more the bigger the team gets. A solo founder can hold
        their own brand in their head. A five-person marketing team cannot —
        someone always reaches for the wrong blue. A skill removes that
        failure mode because the rule lives in the file, not in whoever
        happened to write the prompt that day.
      </p>

      <h2>A complete brand-guidelines skill you can adapt today</h2>
      <p>
        Here is a full, working example. Save this as{" "}
        <code>brand-guidelines/SKILL.md</code> and swap in your own values —
        it is deliberately generic so you can drop your brand straight in.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`---
name: brand-guidelines
description: >
  Apply our brand's colors, typography, and voice to any artifact,
  document, or design output. Use whenever creating marketing
  materials, presentations, landing pages, or any visual asset
  that should look and sound like our brand.
---

# Brand Guidelines

## Colors
- Primary: #142033 (deep navy) — headers, primary buttons
- Secondary: #f4f1ea (warm off-white) — backgrounds
- Accent: #d97757 (burnt orange) — CTAs, highlights only
- Text: #1a1a1a on light backgrounds, #f4f1ea on dark

## Typography
- Headings: a serif with real character (e.g. Fraunces, Tiempos)
- Body: a clean grotesk (e.g. Söhne, General Sans)
- Never use Inter, Roboto, or Arial as the primary display font

## Voice
- Direct, confident, no hedging ("we think" -> "we")
- Short sentences over long ones. No corporate filler.
- Avoid: "game-changer," "unlock," "revolutionize," "delve"

## Layout rules
- Generous whitespace over dense grids
- One accent color per screen, used sparingly
- Every CTA button uses the accent color, nothing else does

## When applying this skill
1. State the aesthetic direction in one line before building.
2. Use the palette and type rules above without exception.
3. If the request conflicts with these rules, flag it and ask
   before proceeding.`}
      </pre>
      <p>
        Drop this in a project&apos;s skills folder, or the equivalent in
        Cowork, and it activates whenever the task looks visual — no need to
        invoke it by name. If you are still deciding which skills are worth
        building versus installing off the shelf, our{" "}
        <a href="/blog/best-claude-skills">best Claude skills roundup</a>{" "}
        ranks the ones worth your time first.
      </p>

      <h2>Artifact mockups: prototyping before the designer opens Figma</h2>
      <p>
        Artifacts are the fastest way to turn a vague design idea into
        something you can actually click through. Ask Claude to build a
        mockup as an artifact and you get a live, previewable interface — not
        a static image, not a wireframe description — that you can iterate on
        in plain English: &quot;make the sidebar collapsible,&quot;
        &quot;try a card layout instead of a table.&quot;
      </p>
      <p>
        The practical use case is the first draft. Before you brief a
        designer or a developer, build the mockup yourself in an afternoon.
        It forces you to make decisions about layout and hierarchy that are
        much cheaper to make in a Claude artifact than in a client meeting,
        and it gives whoever builds the real thing a concrete starting point
        instead of a page of adjectives.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Build a clickable mockup as an artifact for [product/feature].

Users: [who uses this and why]
Core screens: [list 2-4, e.g. dashboard, settings, detail view]
Aesthetic: [reference the brand-guidelines skill if you have one]

Requirements:
- Use realistic placeholder content, not "Lorem ipsum"
- Include empty states and at least one error state
- Make it responsive down to mobile width
- After building, list 3 open design questions I should decide on
  before this goes to a developer.`}
      </pre>
      <p>
        This is also where a brand skill and a frontend design skill compound
        — reference both in the same prompt and the mockup comes out on-brand
        and intentionally styled on the first pass, instead of needing three
        rounds of &quot;more like our brand&quot; feedback.
      </p>
      <p>
        Treat the artifact as disposable in the best sense. Nobody is
        precious about a mockup that took twenty minutes to produce, which
        means you can throw away a direction that is not working without the
        sunk-cost feeling that comes from a designer having spent a day on
        it. That freedom to discard bad ideas quickly is the actual
        productivity gain — not that Claude replaces a designer, but that it
        makes exploring three directions as cheap as exploring one.
      </p>

      <h2>Common mistakes that break a design skill before it starts</h2>
      <p>
        Most design skills fail for the same handful of reasons, and all of
        them are fixable in the SKILL.md file itself, not in the prompt you
        write on top of it.
      </p>
      <p>
        The first mistake is writing rules with no examples. &quot;Use a bold
        typographic hierarchy&quot; means nothing to a model without a
        concrete reference — name actual typefaces, actual hex codes, actual
        do/don&apos;t pairs. The second is cramming everything into one giant
        skill instead of splitting frontend behavior, brand rules, and
        mockup conventions into separate files that each load only when
        relevant — a bloated skill slows Claude down and makes the rules
        harder to enforce consistently. The third is skipping the &quot;when
        to use this&quot; description at the top of the file, which is the
        single thing that decides whether the skill fires automatically at
        all.
      </p>
      <p>
        The fourth, and the one that costs teams the most rework, is treating
        the skill as a one-time write. Brand guidelines change, product
        screens get added, taste evolves — a design skill that nobody
        revisits after the first quarter drifts out of date the same way a
        stale style guide does, except now it is quietly steering every
        artifact your team produces. Review it on the same cadence you would
        review an actual brand book, and version it in your repo so changes
        are visible instead of silent.
      </p>

      <h2>Where design skills fit next to your content workflow</h2>
      <p>
        Design skills rarely work in isolation. The same brand-voice skill
        that keeps your landing pages on-brand should also be shaping the
        copy that goes on them — see our{" "}
        <a href="/blog/claude-for-content-creation">
          Claude for content creation
        </a>{" "}
        guide for the writing side of this same consistency problem. Build
        both skills once, reference them together, and every asset that
        leaves your team — visual or written — reads like it came from the
        same place.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want the skills built for you and updated weekly?
        </p>
        <p className="mt-2 text-slate-700">
          Inside Claude Code Academy you get the full Vault, the courses, and
          a weekly live call — with 1,200+ professionals using this daily.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Where to start this week</h2>
      <p>
        Pick one: if you keep briefing the same visual direction over and
        over, write the brand-guidelines skill above with your real values.
        If every UI request comes back generic, install or write a frontend
        design skill and force one aesthetic decision per project. Either
        way, the win is the same — you stop re-explaining taste and start
        reusing it. For the broader picture of what skills can automate
        beyond design, our{" "}
        <a href="/blog/what-are-claude-skills">Claude Skills primer</a> is
        the right next stop.
      </p>
    </>
  ),
};
