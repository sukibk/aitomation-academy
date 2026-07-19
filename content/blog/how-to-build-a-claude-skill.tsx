import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "how-to-build-a-claude-skill",
  title: "How to Build a Claude Skill: SKILL.md Guide",
  description:
    "Learn how to build a skill in Claude: SKILL.md anatomy, trigger descriptions, and a full meeting-prep skill example.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Workflows",
  tags: [
    "Claude",
    "how to build a skill in claude",
    "skill-creator claude",
    "claude skills",
    "SKILL.md",
    "claude workflows",
    "agent skills",
    "automation",
  ],
  body: (
    <>
      <p>
        A Claude Skill is a folder with one required file — SKILL.md — that
        teaches Claude a repeatable procedure and tells it exactly when to
        pull that procedure into context. You do not need to write code to
        build one. If you can write clear instructions for a new hire, you
        can build a skill. This guide walks through the SKILL.md anatomy, how
        to write a description that actually triggers loading, the
        rules-file pattern for keeping instructions organized, and a
        complete, copy-paste meeting-prep skill you can build today.
      </p>
      <p>
        If you are still fuzzy on what a skill is versus a prompt or a
        Project, start with{" "}
        <a href="/blog/what-are-claude-skills">
          our overview of what Claude Skills are
        </a>
        . This article assumes you already know the concept and want the
        build steps: the frontmatter fields that determine whether Claude
        ever opens the file, how to phrase a description so it matches real
        requests instead of your internal shorthand for the task, the pattern
        for keeping a growing skill maintainable, and a complete skill you
        can copy today rather than build from a blank page.
      </p>
      <p>
        None of what follows requires a developer setup. A skill folder can
        live in a Claude Code repository, inside a Project&apos;s uploaded
        files, or in Cowork&apos;s dedicated skills folder — the writing is
        identical in all three places, and this guide treats them
        interchangeably except where a step calls out a difference.
      </p>

      <h2>A skill is a folder Claude reads only when it matters</h2>
      <p>
        Skills work on a principle called progressive disclosure: Claude
        preloads only the skill&apos;s name and description into its system
        prompt at startup, and reads the full SKILL.md body only when the
        current task matches that description. This is why you can install
        dozens of skills without bloating every conversation — until a skill
        triggers, it costs almost nothing.
      </p>
      <p>
        That single design decision is also why most homemade skills fail:
        people write a great procedure and a lazy description, and Claude
        never loads the procedure because the description never matches the
        request. Get the description right and everything else in this guide
        is straightforward. The official{" "}
        <a
          href="https://code.claude.com/docs/en/skills"
          target="_blank"
          rel="noopener noreferrer"
        >
          skills documentation
        </a>{" "}
        covers the underlying mechanics if you want the primary source
        alongside this walkthrough, and skills work the same way whether you
        are inside Claude Code, a Project, or Cowork — only where you save
        the folder changes, not how loading behaves.
      </p>

      {/* ── Skill loading flow ── */}
      <div className="my-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
        <p className="text-center font-semibold text-slate-800 mb-6 text-lg">
          How Claude Decides to Load a Skill
        </p>
        <div className="flex flex-col gap-0 items-center">
          <div className="w-full max-w-lg rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 text-blue-800 text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Startup: only name + description load
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Every installed skill&apos;s frontmatter sits in context.
                  The full instructions stay unloaded.
                </p>
              </div>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
          <div className="w-full max-w-lg rounded-lg border border-purple-200 bg-purple-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-purple-200 text-purple-800 text-sm font-bold">
                2
              </span>
              <div>
                <p className="text-sm font-semibold text-purple-800">
                  Your request arrives
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  Claude compares what you asked for against every loaded
                  description, looking for a match.
                </p>
              </div>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
          <div className="w-full max-w-lg rounded-lg border border-orange-200 bg-orange-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-orange-200 text-orange-800 text-sm font-bold">
                3
              </span>
              <div>
                <p className="text-sm font-semibold text-orange-800">
                  Match found: full SKILL.md loads
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Claude reads the complete body and follows it as
                  instructions for the rest of the task.
                </p>
              </div>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
          <div className="w-full max-w-lg rounded-lg border border-green-200 bg-green-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-green-200 text-green-800 text-sm font-bold">
                4
              </span>
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Bundled files load only if referenced
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Reference docs, templates, and rules files inside the
                  folder load on demand as Claude needs them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2>The anatomy of a SKILL.md file</h2>
      <p>
        Every SKILL.md starts with YAML frontmatter containing two required
        fields, name and description, followed by a plain-language body.
        There is no framework and no special syntax in the body — it is
        instructions, written the way you would explain the task to a
        capable new hire who has never seen your business before.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`---
name: my-skill-name
description: >
  A clear statement of what this skill does and, critically,
  when Claude should use it. Include the trigger phrases and
  situations a user would actually type.
---

# My Skill Name

## When to use this
[The situations that should trigger this skill]

## Steps
1. [First thing Claude should do]
2. [Second thing]
3. [Third thing, including any format the output must follow]

## Output format
[Exactly what the finished result should look like]`}
      </pre>
      <p>
        That is the entire minimum viable skill. Everything past this point
        in the guide is about making the description trigger reliably and
        keeping the body from becoming an unmaintainable wall of text as the
        skill grows.
      </p>

      <h2>The description is the only part that decides if the skill fires</h2>
      <p>
        Claude matches your request against the description field, not the
        body, so the description has to say both what the skill does and
        exactly when to use it — in language that mirrors how a real person
        would phrase the request, not how you would document it internally.
      </p>
      <p>
        A weak description reads like a title: &quot;Meeting prep
        skill.&quot; A strong description reads like a matcher: it names the
        trigger words, the situation, and the deliverable, so Claude can
        connect a loosely worded request to the right skill even when the
        user does not use your exact vocabulary.
      </p>

      {/* ── Weak vs strong description ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Weak description
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Strong description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 text-slate-700 align-top">
                &quot;Helps prepare for meetings.&quot;
              </td>
              <td className="py-4 px-6 text-slate-700 align-top">
                &quot;Use when the user asks to prep for a call, meeting, or
                client check-in — builds a one-page briefing with context,
                open items, and talking points from notes or a calendar
                invite.&quot;
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700 align-top">
                &quot;Formats reports.&quot;
              </td>
              <td className="py-4 px-6 text-slate-700 align-top">
                &quot;Use when the user pastes raw data or notes and asks for
                a report, summary, or deliverable in our house style — not
                for casual questions about the data.&quot;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Write the description last, after you have written the body — it is
        much easier to summarize a finished procedure accurately than to
        guess at trigger phrasing before you know what the skill actually
        does.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Do not want to draft descriptions by hand
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has 550+ ready-made prompts and skills, sorted by
          job, including trigger-tested descriptions you can adapt instead of
          starting from a blank file.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>The rules-file pattern keeps SKILL.md thin as it grows</h2>
      <p>
        Once a skill covers anything more than a two-step task, resist the
        urge to cram every edge case into SKILL.md itself. Skills can bundle
        additional files in the same folder — reference docs, templates,
        checklists — and SKILL.md simply points to them by name. Claude only
        opens those files when the current step actually needs them, which
        is the same progressive-disclosure principle applied one level
        deeper.
      </p>
      <p>
        In practice this means a folder that looks like this, with SKILL.md
        staying under roughly a page and everything else living in its own
        file:
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`meeting-prep/
  SKILL.md              <- steps + when to load which file
  references/
    style-rules.md       <- tone, formatting, length rules
    briefing-template.md  <- the exact output structure`}
      </pre>
      <p>
        Inside SKILL.md, you reference these files in plain English: &quot;For
        formatting rules, see references/style-rules.md&quot; is enough —
        Claude reads the reference when the step calls for it. This is the
        rules-file pattern, and it is the difference between a skill that
        stays maintainable at 50 lines and one that turns into an unreadable
        500-line document you are afraid to edit.
      </p>

      <h2>Full worked example: building a meeting-prep skill</h2>
      <p>
        Here is a complete, working skill for a common non-technical use
        case: prepping for a client or team meeting from raw notes and a
        calendar invite. It follows the exact anatomy above — one required
        SKILL.md plus two reference files it points to — so you can treat it
        as a template and swap in your own steps once you see the shape.
        Create a folder named meeting-prep, then add this SKILL.md.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`---
name: meeting-prep
description: >
  Use when the user asks to prep for a meeting, call, or client
  check-in, or pastes a calendar invite plus notes and asks to
  "get ready" or "brief me." Produces a one-page briefing with
  context, open items, likely questions, and talking points.
  Do not use for writing meeting minutes after a meeting has
  already happened — that is a separate follow-up task.
---

# Meeting Prep

## When to use this
Trigger on requests like "prep me for my 2pm with Acme," "brief me
before this call," or a pasted invite plus past notes. If the user
wants a post-meeting summary instead, ask whether they mean prep or
follow-up before proceeding.

## Inputs to gather
Before writing the briefing, confirm you have:
1. Who the meeting is with and their role
2. The stated purpose or agenda
3. Any notes, emails, or history from prior meetings with this
   person or account (ask for these if not already provided)

If any of these are missing, ask one direct question rather than
guessing — a wrong assumption in a briefing is worse than a
30-second follow-up question.

## Steps
1. Read all provided context (notes, invite, prior threads).
2. Identify what changed or is outstanding since the last contact.
3. Draft the briefing using the exact structure in
   references/briefing-template.md.
4. Apply the tone and length rules in references/style-rules.md.
5. Flag anything you are inferring rather than reading directly
   from the source material, so the user can correct it fast.

## Output format
Follow references/briefing-template.md exactly. Do not add sections
that template does not include, and do not exceed the length limit
defined there.`}
      </pre>
      <p>
        Then add the two reference files the SKILL.md points to. First,
        references/briefing-template.md:
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`# Briefing Template

Keep the full briefing under one page (roughly 300-400 words).

## Context (2-3 sentences)
Who this is, the relationship history, and why this meeting is
happening now.

## Since last time
Bullet list of what has changed, been decided, or gone unresolved
since the previous meeting or contact.

## Likely questions (3-5)
Each with a one-line suggested answer.

## Your talking points (3-5)
Framed as things to say, not just topics to cover.

## Open decisions
Anything that needs a yes/no or a choice from the user in this
meeting.`}
      </pre>
      <p>
        Then references/style-rules.md, which is where you park the tone and
        formatting preferences so SKILL.md itself does not get cluttered:
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`# Style Rules

- Direct, confident tone. No hedging language like "it seems" or
  "perhaps."
- Bold the single most important line in each section.
- Use bullet points over paragraphs wherever the content allows it.
- Never invent a name, number, or fact not present in the source
  material — write "unknown, confirm before the meeting" instead.
- No emojis, no exclamation points.`}
      </pre>
      <p>
        That is a complete, working skill: one required file plus two
        reference files it points to on demand. Save the folder to your
        skills directory, and the next time you paste notes and say
        &quot;brief me before this call,&quot; the description matches and
        the whole procedure loads automatically.
      </p>

      <h2>Building the skill faster with skill-creator</h2>
      <p>
        Writing SKILL.md by hand is completely fine for a first skill, but
        once you are building several, Anthropic&apos;s own skill-creator
        tool speeds up the process: it walks you through capturing the
        procedure, drafts the SKILL.md and description for you, and can
        generate test prompts to check whether the description actually
        triggers before you rely on it. Our{" "}
        <a href="/blog/claude-skill-creator">
          dedicated guide to skill-creator
        </a>{" "}
        covers the full workflow, including its create, eval, improve, and
        benchmark modes.
      </p>
      <p>
        If you are choosing which skills to build first rather than
        starting from scratch, our{" "}
        <a href="/blog/best-claude-skills">roundup of the best Claude skills</a>{" "}
        is a faster starting point than a blank SKILL.md — several of them
        are close enough to your workflow to adapt in minutes rather than
        build from zero.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want the skill-building workflows built for you and updated weekly
        </p>
        <p className="mt-2 text-slate-700">
          Inside AItomation Academy you get the full Vault, step-by-step
          courses, and a weekly live call — with 1,200+ professionals
          building and sharing skills daily.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Common mistakes that keep a skill from triggering</h2>
      <p>
        Most skills that &quot;do not work&quot; are not broken — they are
        just never loading. Before assuming the procedure itself is wrong,
        check these first.
      </p>
      <p>
        <strong>The description is too generic.</strong> If it only restates
        the skill name in different words, Claude has nothing distinctive to
        match against. Name the actual trigger phrases and situations, not
        just the category of task.
      </p>
      <p>
        <strong>The description omits when NOT to use it.</strong> Skills
        that overlap in subject matter — like meeting prep versus meeting
        follow-up above — need an explicit exclusion, or Claude will guess
        wrong on ambiguous requests.
      </p>
      <p>
        <strong>Everything is crammed into one file.</strong> A 400-line
        SKILL.md is harder for Claude to apply consistently than a short
        SKILL.md plus well-named reference files loaded only when relevant.
        Split early using the rules-file pattern above.
      </p>
      <p>
        <strong>The output format is described but not enforced.</strong>{" "}
        Saying &quot;write a briefing&quot; is weaker than pointing to an
        exact template file with a length limit. Specificity in the output
        format is what makes a skill&apos;s results consistent run to run.
      </p>
      <p>
        <strong>The folder name and the name field do not match.</strong>{" "}
        This one is easy to miss because nothing about it looks wrong when
        you glance at the file — the mismatch only shows up as a skill that
        never triggers no matter how good the description is. Whenever a
        skill seems to be ignored entirely, check this before anything else.
      </p>

      <h2>Frequently asked questions</h2>
      <h3>Do I need to know how to code to build a Claude skill?</h3>
      <p>
        No. A SKILL.md file is plain markdown with a small YAML header — the
        same writing skill you already use for a good prompt, just organized
        so Claude can find and open it on its own instead of you re-pasting
        the instructions every time.
      </p>
      <h3>How is a skill different from a Claude Project?</h3>
      <p>
        A Project holds context and custom instructions for one ongoing body
        of work, like a single client. A skill is a portable procedure that
        can trigger inside any conversation, Project, or Cowork session where
        it is available — the two are complementary, not competing, and a
        skill can sit inside a Project&apos;s files if that is where you want
        it scoped.
      </p>
      <h3>Can I have two skills that seem to overlap?</h3>
      <p>
        Yes, but write an explicit exclusion into each description, the way
        the meeting-prep example above rules out post-meeting follow-up.
        Without that, Claude has to guess which one you meant on an ambiguous
        request, and guesses are exactly what a well-built skill is supposed
        to remove from the process.
      </p>

      <h2>Where to go from here</h2>
      <p>
        Build one skill this week around whatever you already do on repeat —
        meeting prep, a weekly report, a client update format — and treat the
        example above as a template to adapt rather than a one-off. Write the
        procedure first, write the description last, and keep anything past
        the core steps in a reference file rather than SKILL.md itself.
      </p>
      <p>
        Once the SKILL.md-plus-reference-files pattern feels natural,
        skill-creator and a small library of your own skills turn into the
        fastest lever you have for making Claude consistent across your
        actual workload — not just occasionally impressive, but reliably the
        same good output every single time you hit the same kind of task.
        For broader copy-paste workflows beyond skills specifically, see our{" "}
        <a href="/blog/5-claude-workflows-for-non-technical-professionals">
          5 Claude workflows for non-technical professionals
        </a>
        .
      </p>
    </>
  ),
};
