import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "what-are-claude-skills",
  title: "What Are Claude Skills? How They Actually Work",
  description:
    "Claude Skills are folders of instructions Claude loads on demand. What they are, how they differ from prompts, Projects, and MCP, and how to build one.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Guides",
  tags: [
    "Claude",
    "claude skills",
    "what are claude skills",
    "agent skills",
    "SKILL.md",
    "claude code",
    "cowork",
    "automation",
    "workflows",
  ],
  body: (
    <>
      <p>
        Claude Skills are folders of instructions, scripts, and reference
        files that Claude loads automatically the moment a task matches what
        the skill describes. You write the workflow once — how you format a
        report, how you structure a proposal, how you want a spreadsheet
        built — and Claude retrieves it exactly when it is relevant, without
        you re-explaining it in every new conversation.
      </p>
      <p>
        This guide covers what skills actually are, how they differ from
        prompts, Projects, and MCP servers (people mix these up constantly),
        and how to build your first one in about 10 minutes. If you want the
        fundamentals of instructing Claude well before you get here, our{" "}
        <a href="/blog/claude-prompting-guide">Claude prompting guide</a> is
        the right starting point.
      </p>

      <h2>What Claude Skills actually are</h2>
      <p>
        A skill is a folder that contains at minimum one file — SKILL.md —
        with a short description of when to use it and a body of
        instructions for what to do. Claude reads the description at the
        start of a session, and if your current task matches it, Claude
        loads the full instructions and follows them. Skills can also bundle
        scripts, templates, and reference documents that Claude opens only
        when the instructions tell it to.
      </p>
      <p>
        The point of a skill is repeatability. A prompt gets your task done
        once. A skill gets the same kind of task done the same correct way
        every time, across every conversation, without you rebuilding the
        instructions from scratch — because the instructions live in a file,
        not in your memory of what you typed last time.
      </p>

      <h2>Skills vs prompts vs Projects vs MCP: what is actually different</h2>
      <p>
        A prompt is a one-time instruction for a single conversation. A
        Project is a persistent workspace with a knowledge base and standing
        instructions scoped to one body of work. An MCP server gives Claude a
        new tool or a new data source it did not have before. A skill is
        portable, reusable expertise — a specific &quot;how&quot; that
        follows Claude across conversations, Projects, and even different
        apps, rather than staying locked to one workspace.
      </p>
      <p>
        The clearest way to separate them: Projects tell Claude{" "}
        <em>what it needs to know</em> about a specific piece of work. MCP
        gives Claude <em>something it can do</em> — query a database, read a
        calendar, hit an API. Skills tell Claude{" "}
        <em>how to do a specific kind of task well</em>, and that instruction
        set is reusable anywhere the skill is installed.
      </p>

      {/* ── Comparison table ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Tool
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                What it actually is
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Best for
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Scope
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Prompt
              </td>
              <td className="py-4 px-6 text-slate-700">
                A one-time instruction you type or paste
              </td>
              <td className="py-4 px-6 text-slate-700">
                A single task you will not repeat often
              </td>
              <td className="py-4 px-6 text-slate-500">
                This conversation only
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Project
              </td>
              <td className="py-4 px-6 text-slate-700">
                A workspace with uploaded files and standing instructions
              </td>
              <td className="py-4 px-6 text-slate-700">
                One client, one product, one ongoing body of work
              </td>
              <td className="py-4 px-6 text-slate-500">One Project</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Skill
              </td>
              <td className="py-4 px-6 text-slate-700">
                A folder of instructions Claude loads when relevant
              </td>
              <td className="py-4 px-6 text-slate-700">
                A repeatable task you want done the same correct way
              </td>
              <td className="py-4 px-6 text-slate-500">
                Everywhere it is installed
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                MCP server
              </td>
              <td className="py-4 px-6 text-slate-700">
                A connection that gives Claude a new tool or data source
              </td>
              <td className="py-4 px-6 text-slate-700">
                Reaching a live system — a database, a calendar, an app
              </td>
              <td className="py-4 px-6 text-slate-500">
                Wherever the connector is enabled
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        These are not competing choices — most serious setups use all four
        together. A Project holds the client&apos;s files, an MCP connector
        lets Claude pull live data from a tool you use, and a skill sitting
        on top tells Claude exactly how to turn that data into the report you
        want, formatted the way you want it, every time.
      </p>

      <h2>How Claude decides which skill to use</h2>
      <p>
        Claude does not load every installed skill&apos;s full instructions
        into every conversation — that would waste context on skills you are
        not using right now. Instead it uses a system called progressive
        disclosure, which keeps skills nearly free until the moment they are
        actually needed.
      </p>
      <p>
        There are three levels. First, the skill&apos;s name and description
        sit in Claude&apos;s system prompt at all times, costing roughly 100
        tokens per skill regardless of how many you have installed — that is
        just enough for Claude to recognize &quot;this task matches that
        skill.&quot; Second, once Claude decides a skill applies, it loads
        the full SKILL.md body: the actual step-by-step instructions. Third,
        anything the skill bundles beyond that — scripts, templates, longer
        reference documents — only gets opened if the instructions
        explicitly point Claude to it. A skill with a 500-line reference file
        costs you nothing extra unless that specific task needs that
        specific file.
      </p>
      <p>
        This is why you can have dozens of skills installed without slowing
        anything down or degrading response quality on unrelated tasks — the
        skills you are not using stay dormant at the cost of a single line of
        metadata each.
      </p>

      <h2>What is inside a skill folder</h2>
      <p>
        Every skill needs a SKILL.md file with YAML frontmatter — at minimum
        a <code>name</code> and a <code>description</code> — followed by a
        markdown body with the instructions Claude follows. That is the
        entire required structure. More elaborate skills add a{" "}
        <code>scripts/</code> folder for executable code, a{" "}
        <code>references/</code> folder for documentation Claude reads only
        when it needs it, and an <code>assets/</code> folder for templates or
        boilerplate files the skill produces.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`---
name: weekly-client-report
description: Use when drafting a weekly status report for a client engagement. Formats findings, wins, blockers, and next steps in our standard structure.
---

# Weekly client report

When asked to draft a weekly report, follow this structure exactly:

1. One-paragraph summary — the single most important update first.
2. Wins this week — bullet points, each with a concrete result.
3. Blockers — what is stuck, why, and what is needed to unstick it.
4. Next week's priorities — 3 items maximum, ranked.

Rules:
- No filler sentences. Every line should be information the client needs.
- Pull specific numbers from any data the user pastes in — never round vaguely.
- If a section has nothing to report, write "Nothing to flag" instead of
  inventing content to fill the space.`}
      </pre>
      <p>
        That is a complete, working skill. Save the description well and
        Claude will pull this structure into any conversation where you ask
        for a weekly client report — no re-pasting the format, no forgetting
        a section, no drift as different team members write reports
        differently.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Do not build your skill library from a blank page
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has 550+ prompts and skills already built and
          sorted by job — including formatting, reporting, and
          client-workflow skills you can install today instead of writing
          your own from scratch.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Build your first skill in 10 minutes</h2>
      <p>
        You do not need to hand-write YAML frontmatter or study a spec to
        ship a working skill today. The fastest path is to describe the
        recurring task to Claude in plain English and let it draft the
        SKILL.md for you, then you refine it.
      </p>

      {/* ── Step flow ── */}
      <div className="my-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
        <p className="text-center font-semibold text-slate-800 mb-6 text-lg">
          From recurring task to working skill
        </p>
        <div className="flex flex-col gap-0 items-center">
          <div className="w-full max-w-lg rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 text-blue-800 text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Pick one task you redo every week
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Not a one-off. Something with a format you keep
                  re-explaining — a report, a summary, a naming convention.
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
                  Ask Claude to draft the skill
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Use the prompt template below. Claude writes the
                  frontmatter and the instruction body for you.
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
                  Save it as a folder named SKILL.md
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  One file is enough to start. Zip the folder if your app
                  requires a zip upload.
                </p>
              </div>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
          <div className="w-full max-w-lg rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 text-blue-800 text-sm font-bold">
                4
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Upload it and enable it
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Location varies by app — this is where the exact steps
                  differ between claude.ai, Cowork, and Claude Code.
                </p>
              </div>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-300" aria-hidden="true" />
          <div className="w-full max-w-lg rounded-lg border border-orange-200 bg-orange-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-orange-200 text-orange-800 text-sm font-bold">
                5
              </span>
              <div>
                <p className="text-sm font-semibold text-orange-800">
                  Test it, then tighten the description
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  If Claude does not trigger the skill when it should, the
                  description is too vague — make it more specific about
                  when to use it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p>
        Here is the prompt for step 2. Fill in the brackets and Claude will
        return a complete SKILL.md draft you can save and upload directly.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`I want to turn a recurring task into a Claude skill. Write a complete
SKILL.md file for it — YAML frontmatter with a name and a description
specific enough that you would know exactly when to load this skill,
followed by clear step-by-step instructions in the body.

THE TASK: [describe what you do repeatedly, e.g. "turning raw meeting
notes into a client follow-up email"]

THE FORMAT I WANT EVERY TIME: [describe the structure, tone, sections,
or rules you always apply — the things you currently have to re-explain]

THINGS THAT GO WRONG WHEN I DO THIS MANUALLY: [common mistakes or
inconsistencies you want the skill to prevent]

Keep the description precise enough to avoid the skill triggering on
unrelated tasks. Return only the finished SKILL.md content.`}
      </pre>
      <p>
        For a longer walkthrough — including when to add scripts or
        reference files, and how to structure a skill with multiple
        sub-tasks — see our dedicated guide on{" "}
        <a href="/blog/how-to-build-a-claude-skill">
          how to build a Claude skill
        </a>
        . If you would rather start from something proven than build from
        zero, our{" "}
        <a href="/blog/best-claude-skills">roundup of the best Claude skills</a>{" "}
        covers the ones worth installing first.
      </p>

      <h2>Where skills work: claude.ai, Cowork, and Claude Code</h2>
      <p>
        Skills are not locked to one product — the same SKILL.md format
        works across Claude&apos;s apps, though the install path differs by
        surface. In the{" "}
        <a href="https://claude.com" target="_blank" rel="noopener noreferrer">
          claude.ai
        </a>{" "}
        app, skills are managed under your customization settings, where you
        upload a zipped skill folder and Claude reads the SKILL.md
        automatically. In Cowork, Anthropic&apos;s agentic desktop workspace
        for non-developers, skills sit alongside folder scoping, connectors,
        and scheduled tasks as one of the building blocks you combine to
        automate a job end to end.
      </p>
      <p>
        Claude Code — the command-line and IDE-integrated coding agent — uses
        the same skill format for developer workflows: linting conventions,
        deployment checklists, code review standards, and repo-specific
        rules. If you write code or run a technical workflow day to day, our{" "}
        <a href="/blog/claude-code-skills">Claude Code skills guide</a> goes
        deeper on that surface specifically, including how project-scoped
        skills differ from personal ones. The official docs at{" "}
        <a
          href="https://code.claude.com/docs/en/skills"
          target="_blank"
          rel="noopener noreferrer"
        >
          code.claude.com
        </a>{" "}
        cover the exact file locations for that environment.
      </p>
      <p>
        Team and Enterprise plans add one more layer: an organization owner
        can enable skill sharing so a skill one person builds and refines
        becomes available to the whole workspace, instead of staying stuck
        on one person&apos;s account.
      </p>

      <h2>When to build a skill, and when a skill is the wrong tool</h2>
      <p>
        Build a skill when you catch yourself re-explaining the same
        structure, rules, or format for the third time — that repetition is
        the signal. A skill is the wrong tool when the task is genuinely
        one-off (just write the prompt), when what you actually need is
        Claude reaching a live system it cannot currently touch (that is an
        MCP connector, not a skill), or when the context is really about one
        specific client or project rather than a repeatable method (that
        belongs in a Project&apos;s knowledge base instead).
      </p>
      <p>
        A useful test: if you deleted the skill tomorrow, would you have to
        retype the same paragraph of instructions into your next ten
        conversations? If yes, it was worth building. If the task will not
        come up again, a skill just adds a file you never reopen.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want the skills library built for you and kept current?
        </p>
        <p className="mt-2 text-slate-700">
          Inside AItomation Academy you get the full Vault of prompts and
          skills, the courses on building your own, and a weekly live call —
          with 1,200+ professionals already using this daily.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Frequently asked questions</h2>

      <h3>Do I need to know how to code to build a Claude skill?</h3>
      <p>
        No. A SKILL.md file is plain markdown with a short YAML header — no
        programming required. Scripts are optional, and most useful skills
        for non-technical work are pure instructions with no code at all.
      </p>

      <h3>Can a skill call an MCP tool or is that a separate thing?</h3>
      <p>
        A skill&apos;s instructions can absolutely tell Claude to use a tool
        an MCP connector provides — the two are complementary, not
        competing. The MCP server supplies the capability; the skill
        supplies the procedure for using it correctly and consistently.
      </p>

      <h3>Are Claude Skills the same thing as custom instructions?</h3>
      <p>
        Not quite. Custom instructions in a Project apply everywhere inside
        that one Project, all the time. A skill only loads when its
        description matches the task at hand, and it travels with you
        outside any single Project — that targeted, portable loading is the
        whole point of the design.
      </p>

      <h3>Will installing many skills slow Claude down?</h3>
      <p>
        Not meaningfully. Because of progressive disclosure, an unused
        skill costs only its short description in the system prompt —
        roughly 100 tokens — until the moment Claude decides it is relevant.
        Dozens of installed skills add negligible overhead to unrelated
        conversations.
      </p>

      <p>
        Skills are the piece that turns Claude from a tool you re-brief
        every session into one that already knows how you like things done.
        Start with the one task you retype most often, draft it with the
        prompt above, and refine the description once you see how Claude
        triggers it. Everything else — Projects, MCP, more skills — stacks
        on top of that foundation once it is working.
      </p>
    </>
  ),
};
