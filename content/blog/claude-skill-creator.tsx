import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-skill-creator",
  title: "Skill-Creator Claude: Build Skills That Activate",
  description:
    "How to use Claude's skill-creator to build skills, fix activation with better descriptions, and place folders correctly. Templates included.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Workflows",
  tags: [
    "Claude",
    "skill-creator claude",
    "claude code skills",
    "how to activate claude code skill",
    "claude skills",
    "meta-skill",
    "SKILL.md",
    "claude code",
    "workflows",
    "automation",
  ],
  body: (
    <>
      <p>
        The fastest way to build a good Claude skill is to not write the
        SKILL.md by hand — you ask Claude to write it for you, using the
        skill-creator meta-skill. It interviews you about what the skill
        should do, drafts the file, structures the folder correctly, and even
        helps you test whether the skill actually fires when it should. This
        guide covers both halves of that job: using skill-creator to build
        skills, and fixing the single most common failure mode people hit
        after — a skill that exists but never activates.
      </p>
      <p>
        If you have not built a skill before, start with our{" "}
        <a href="/blog/what-are-claude-skills">
          guide to what Claude skills are
        </a>{" "}
        for the fundamentals. This article assumes you know the basic shape
        of a skill and want to go faster and get activation right.
      </p>

      <h2>Skill-creator is a skill that writes skills</h2>
      <p>
        Skill-creator is a meta-skill — a skill whose job is producing other
        skills. Instead of hand-writing a SKILL.md file, opening a
        conversation, and describing what you want a skill to do, skill-creator
        walks you through naming it, scoping its trigger conditions, drafting
        the instructions, and laying out the folder. It ships as an
        official skill from Anthropic and is available as a built-in
        option in Claude Code and as an{" "}
        <a
          href="https://claude.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          installable plugin
        </a>
        .
      </p>
      <p>
        The practical value is not that it saves typing. It is that
        skill-creator knows the structural mistakes beginners make —
        descriptions too vague to trigger reliably, instructions that read
        like documentation instead of steps an agent can execute, folders in
        the wrong place — and it corrects for them while you are still in the
        drafting conversation, not three failed activations later.
      </p>
      <p>
        A skill itself is just a folder containing a SKILL.md file: a short
        YAML frontmatter block (name, description) followed by plain-language
        instructions Claude reads when it decides the skill is relevant. For
        the deeper mechanics of what goes inside that file, see our companion
        piece on{" "}
        <a href="/blog/how-to-build-a-claude-skill">
          how to build a Claude skill
        </a>
        .
      </p>

      <h2>What activation actually depends on</h2>
      <p>
        Claude does not run every installed skill on every prompt. At the
        start of a session, Claude loads just the name and description of
        every available skill — a lightweight index, not the full
        instructions — and matches your request against those descriptions
        using its own reasoning, the same way it would match a request to any
        other tool. Only when a description looks relevant does Claude load
        the rest of that skill&apos;s SKILL.md into context.
      </p>
      <p>
        That means the description field is not documentation for humans. It
        is the entire routing signal. A skill with a perfect set of
        instructions and a vague description will sit unused, and a mediocre
        skill with a sharp description will fire every time it should. This
        is the single most common reason a freshly built skill &quot;does
        nothing&quot; — the instructions were never wrong, they were simply
        never loaded.
      </p>

      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Description style
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Example
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Activation result
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 text-slate-700">Too vague</td>
              <td className="py-4 px-6 text-slate-700">
                &quot;Helps with code review.&quot;
              </td>
              <td className="py-4 px-6 text-red-700">
                Rarely triggers — no concrete phrases to match against
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700">Feature-only</td>
              <td className="py-4 px-6 text-slate-700">
                &quot;A tool for reviewing pull requests.&quot;
              </td>
              <td className="py-4 px-6 text-amber-700">
                Triggers sometimes — misses phrasing users actually type
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700">
                Specific + trigger phrases
              </td>
              <td className="py-4 px-6 text-slate-700">
                &quot;Review code for bugs, security issues, and
                maintainability. Use when reviewing a PR, checking code
                quality, analyzing a diff, or the user mentions &apos;review&apos;,
                &apos;PR&apos;, or &apos;code quality&apos;.&quot;
              </td>
              <td className="py-4 px-6 text-green-700">
                Triggers reliably across the phrasings people actually use
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Notice the pattern in the third row: it states what the skill does,
        then explicitly lists the situations and words that should trigger
        it. Skill-creator is built to push your draft toward that third row —
        when you describe a skill in vague terms during the interview, it
        will ask follow-up questions until you have named the concrete
        triggers.
      </p>

      <h2>Folder placement decides whether a skill exists at all</h2>
      <p>
        Before activation matters, the skill has to be somewhere Claude
        actually looks. There are three valid locations, and mixing them up
        is the second most common reason a new skill seems to vanish.
      </p>

      <div className="not-prose my-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4 md:p-5">
            <p className="font-semibold text-blue-800 mb-2">
              Personal — ~/.claude/skills/
            </p>
            <p className="text-sm text-blue-700">
              Available in every project on your machine. Use this for
              general-purpose skills you want everywhere — writing style,
              personal checklists, tools that are not tied to one codebase.
            </p>
          </div>
          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4 md:p-5">
            <p className="font-semibold text-green-800 mb-2">
              Project — .claude/skills/
            </p>
            <p className="text-sm text-green-700">
              Lives inside a specific repo and gets committed to version
              control, so every teammate who clones the project gets the same
              skill automatically. Use this for anything tied to one
              codebase&apos;s conventions.
            </p>
          </div>
          <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4 md:p-5">
            <p className="font-semibold text-orange-800 mb-2">
              Plugin — bundled + distributed
            </p>
            <p className="text-sm text-orange-700">
              Packaged with a plugin manifest and installed via a marketplace
              or `claude plugin install`. Use this when you want to share a
              skill across teams or publish it publicly.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">
          If a personal and a project skill share the same name, the project
          version wins — the more specific location always takes priority.
        </p>
      </div>

      <p>
        Skill-creator asks where you want the skill to live as one of its
        first questions and writes the folder to the correct path for you —
        which removes an entire class of &quot;I wrote the file but nothing
        happened&quot; reports that come from a skill sitting one directory
        off from where Claude scans. For a broader map of how skills fit
        alongside CLAUDE.md, hooks, and subagents inside Claude Code, see our{" "}
        <a href="/blog/claude-code-skills">Claude Code skills guide</a>.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want proven prompts instead of building from scratch every time
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has 550+ ready prompts and skill templates, sorted
          by job — including several for skill creation, evaluation, and
          documentation you can adapt in minutes instead of starting from a
          blank file.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Building, testing, and iterating with skill-creator</h2>
      <p>
        The interaction is conversational, not a form. You open Claude Code
        (or Claude.ai, where skill-creator is also available), invoke it, and
        describe the skill in plain language — what problem it solves, when
        you want it to fire, and roughly what steps it should follow.
        Skill-creator then drafts the SKILL.md, proposes a name and folder
        location, and — critically — proposes a description built around
        trigger phrases rather than a feature summary.
      </p>
      <p>
        Here is a prompt template that gets a productive first draft out of
        skill-creator on the first pass, instead of a vague back-and-forth:
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Use skill-creator to build a new skill.

WHAT IT DOES: [one sentence — the concrete outcome, not "helps with X"]
WHEN IT SHOULD FIRE: [list 4-6 phrasings a real user would type,
e.g. "format this changelog", "clean up my release notes",
"write a changelog entry for this PR"]
WHEN IT SHOULD NOT FIRE: [anything adjacent that would be a false trigger]
STEPS IT SHOULD FOLLOW: [numbered, in the order you actually do this
task yourself — treat this like training a new hire, not summarizing
a policy]
SCOPE: personal (~/.claude/skills) or project (.claude/skills) — [pick one]

Draft the SKILL.md, propose the folder path, and flag anything in my
description that is too vague to trigger reliably before you finalize it.`}
      </pre>
      <p>
        The line asking it to flag vague phrasing is doing real work — it is
        the difference between skill-creator handing back whatever you typed
        and skill-creator doing the job it is actually good at, which is
        catching the description problems before you find them the hard way,
        mid-project, three weeks from now.
      </p>

      <h3>Testing whether it actually activates</h3>
      <p>
        Do not assume a skill works because the file looks right. Skill-creator
        also supports an evaluation loop: you (or it) write a handful of test
        prompts — some that should trigger the skill, some adjacent prompts
        that should not — and run them to see what actually happens. This
        catches two failure modes at once: under-triggering, where a
        reasonable request does not activate the skill, and over-triggering,
        where the skill fires on requests it has no business handling.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Use skill-creator to evaluate my [skill-name] skill.

Run these test prompts and tell me, for each one, whether the skill
activated and whether that was the correct call:

SHOULD trigger:
1. [realistic phrasing #1]
2. [realistic phrasing #2]
3. [realistic phrasing #3]

SHOULD NOT trigger:
1. [an adjacent but out-of-scope request]
2. [a request that sounds similar but isn't the same task]

If any result is wrong, rewrite only the description field to fix it —
do not touch the instructions unless the activation logic itself is
the problem.`}
      </pre>
      <p>
        That last instruction matters. Most activation failures are
        description problems, not instruction problems — rewriting the whole
        skill when only the trigger phrasing needed a fix wastes a revision
        cycle and can introduce new bugs into instructions that were already
        working.
      </p>

      <h3>A troubleshooting checklist for skills that will not fire</h3>
      <p>
        When a skill you built is not activating, work through these in
        order rather than rewriting the whole file — the fix is usually one
        of the first three.
      </p>

      <div className="my-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
        <p className="text-center font-semibold text-slate-800 mb-6 text-lg">
          Why a skill isn&apos;t activating
        </p>
        <div className="flex flex-col gap-0 items-center">
          <div className="w-full max-w-lg rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 text-blue-800 text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Check the folder path
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Personal skills belong in ~/.claude/skills/, project
                  skills in .claude/skills/ at the repo root. A skill one
                  level off — inside a subfolder, or under the wrong
                  directory entirely — is invisible to Claude no matter how
                  good the file is.
                </p>
              </div>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
          <div className="w-full max-w-lg rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 text-blue-800 text-sm font-bold">
                2
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Rewrite the description around trigger phrases
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  State what it does, then explicitly list situations and
                  words that should trigger it — &quot;use when the user
                  mentions X, Y, or Z.&quot; Vague, feature-style descriptions
                  are the top cause of missed activations.
                </p>
              </div>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
          <div className="w-full max-w-lg rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 text-blue-800 text-sm font-bold">
                3
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Check for a name collision
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  If a personal skill and a project skill share a name, the
                  project one wins — silently. If you are testing the
                  personal version and it never seems to run, check whether
                  the project has its own skill shadowing it.
                </p>
              </div>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
          <div className="w-full max-w-lg rounded-lg border border-orange-200 bg-orange-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-orange-200 text-orange-800 text-sm font-bold">
                4
              </span>
              <div>
                <p className="text-sm font-semibold text-orange-800">
                  Ask directly, then fix the gap it reveals
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Prompt &quot;which skills do you currently see available,
                  and would [your request] have triggered [skill name]?&quot;
                  Claude will tell you honestly — use the answer to see
                  exactly which phrase in your description was too weak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p>
        Skill-creator&apos;s evaluation loop essentially automates this
        checklist for you, but it is worth understanding the four causes
        directly — most real-world reports of a skill &quot;not working&quot;
        turn out to be step one or two, not a deeper problem with the
        instructions themselves.
      </p>

      <h3>Iterating on a skill after it ships</h3>
      <p>
        A skill you built once is rarely the final version. As you use it,
        you will notice edge cases the instructions did not cover, or
        requests that should have triggered it but did not. Skill-creator is
        also the right tool for that revision pass — feed it a real
        transcript of a failed or awkward run and ask it to update the file.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Use skill-creator to update my [skill-name] skill.

Here is a transcript where it either didn't trigger when it should have,
or triggered and then did the wrong thing:

"""
[paste the relevant exchange]
"""

Diagnose whether this was a description problem (wrong trigger) or an
instructions problem (right trigger, wrong steps), then make the
minimum edit that fixes it. Show me the diff, not just the new file.`}
      </pre>
      <p>
        Asking for a diff instead of a fresh file matters for the same
        reason it mattered during evaluation — it keeps you from silently
        losing working instructions every time you fix one small trigger
        issue.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want the skill library already built for your job
        </p>
        <p className="mt-2 text-slate-700">
          Inside AItomation Academy you get the full Vault, courses on
          building and troubleshooting skills, and a weekly live call — with
          1,200+ professionals already using Claude skills daily.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Where skill-creator fits next to everything else</h2>
      <p>
        Skill-creator is not a replacement for understanding what skills are
        or how to write one by hand — it is faster once you know the shape
        of a good SKILL.md, and it catches mistakes you would otherwise only
        discover through failed activations. If you are new to skills
        entirely, start with{" "}
        <a href="/blog/what-are-claude-skills">
          what Claude skills are and how they work
        </a>
        , then use{" "}
        <a href="/blog/how-to-build-a-claude-skill">
          our build guide
        </a>{" "}
        to understand the file structure skill-creator is generating for
        you. And because a skill is only as useful as the prompts you feed
        it and the prompts it produces, our{" "}
        <a href="/blog/claude-prompting-guide">Claude prompting guide</a>{" "}
        covers the fundamentals that make both better.
      </p>
      <p>
        The pattern worth remembering: build with skill-creator, but debug
        activation with the checklist above before you touch the
        instructions. Folder placement and description phrasing account for
        the overwhelming majority of &quot;my skill doesn&apos;t work&quot;
        reports — and both are fixable in minutes once you know to look
        there first. For the official reference on skills and the SKILL.md
        format, see{" "}
        <a
          href="https://code.claude.com/docs/en/skills"
          target="_blank"
          rel="noopener noreferrer"
        >
          Claude Code&apos;s skills documentation
        </a>
        .
      </p>

      <h2>Frequently Asked Questions</h2>
      <p>
        These are the questions people ask most often after their first
        attempt at building a skill did not activate the way they expected.
      </p>

      <h3>Do I need Claude Code to use skill-creator, or does it work in Claude.ai too?</h3>
      <p>
        Skill-creator is available both as a built-in skill you can invoke
        inside Claude Code and as part of Anthropic&apos;s public skills
        repository, which you can install and use with Claude.ai as well.
        The drafting conversation works the same way in either surface —
        what differs is where the resulting skill folder needs to live.
      </p>

      <h3>Why does my skill trigger on requests it shouldn&apos;t?</h3>
      <p>
        Over-triggering usually means the description is too broad rather
        than too narrow — it is matching on a general word or theme instead
        of specific phrasings. Narrow the description to the exact
        situations the skill handles, and explicitly note what it should not
        cover, the same way you would list what it should.
      </p>

      <h3>Can I have the same skill available personally and inside a specific project?</h3>
      <p>
        Yes, but be deliberate about it. If both a personal (~/.claude/skills/)
        and a project (.claude/skills/) skill share a name, the project
        version takes priority inside that repo. If you want one canonical
        version, keep it in only one location rather than maintaining two
        copies that can drift out of sync.
      </p>

      <h3>How do I know if a skill actually loaded during a session?</h3>
      <p>
        Ask directly — Claude can tell you which skills it currently sees
        available and whether a given request would trigger a specific one.
        This is the fastest way to confirm a fix worked before you run a
        full test suite through skill-creator&apos;s evaluation loop.
      </p>
    </>
  ),
};
