import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-code-skills",
  title: "Claude Code Skills: The Non-Dev Guide",
  description:
    "Claude Code skills live in /skills folders and load with slash commands. Where they live, 6 examples, and how they differ from CLAUDE.md and subagents.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Guides",
  tags: [
    "Claude",
    "claude code skills",
    "claude code /skills",
    "claude code",
    "skills",
    "SKILL.md",
    "slash commands",
    "subagents",
    "CLAUDE.md",
    "automation",
  ],
  body: (
    <>
      <p>
        Claude Code skills are folders with one required file — SKILL.md —
        that teach Claude a specific procedure it can run on demand instead
        of you re-explaining it every session. You reach them by typing a
        slash and the folder&apos;s name, or by just describing what you
        want and letting Claude decide the skill is relevant.
      </p>
      <p>
        This guide is specifically about skills inside{" "}
        <a href="https://claude.com" target="_blank" rel="noopener noreferrer">
          Claude Code
        </a>{" "}
        — where the files live on your machine, how the <code>/skills</code>{" "}
        menu and slash-command invocation actually work, six skills a
        non-developer can be using by the end of this article, and where
        skills stop and CLAUDE.md or subagents start. If you want the
        broader concept first, see our hub guide on{" "}
        <a href="/blog/what-are-claude-skills">what Claude skills are</a>.
        This piece assumes you already know that and want the Claude Code
        specifics.
      </p>

      <h2>Where Claude Code skills actually live</h2>
      <p>
        A skill is a directory containing a SKILL.md file, and where that
        directory sits determines who can use it. There is no database, no
        settings panel with a hidden skill list — it is files on disk that
        Claude Code watches and reads.
      </p>
      <p>
        There are three locations you will use as a non-developer, plus one
        an organization admin controls:
      </p>

      {/* ── Where skills live table ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Location
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Path
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Applies to
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Personal
              </td>
              <td className="py-4 px-6 text-slate-700 font-mono text-xs">
                ~/.claude/skills/&lt;name&gt;/SKILL.md
              </td>
              <td className="py-4 px-6 text-slate-600">
                Every project you open on this machine
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Project
              </td>
              <td className="py-4 px-6 text-slate-700 font-mono text-xs">
                .claude/skills/&lt;name&gt;/SKILL.md
              </td>
              <td className="py-4 px-6 text-slate-600">
                This one project or folder only
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Plugin
              </td>
              <td className="py-4 px-6 text-slate-700 font-mono text-xs">
                &lt;plugin&gt;/skills/&lt;name&gt;/SKILL.md
              </td>
              <td className="py-4 px-6 text-slate-600">
                Wherever that plugin is installed
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Enterprise
              </td>
              <td className="py-4 px-6 text-slate-700 text-xs">
                Managed settings, set by an admin
              </td>
              <td className="py-4 px-6 text-slate-600">
                Everyone in the organization
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Personal skills in <code>~/.claude/skills/</code> are the ones a
        non-technical user builds first — they follow you into every folder
        you point Claude Code at, so a &quot;prep my meeting notes&quot;
        skill works the same whether you are in a client folder or a
        personal one. Project skills, dropped into a shared repo&apos;s{" "}
        <code>.claude/skills/</code>, are how a team standardizes a workflow
        for everyone who opens that project.
      </p>
      <p>
        Inside the folder, SKILL.md has two parts: a short block of YAML
        frontmatter between <code>---</code> markers (a description, and
        optional settings), followed by plain-language instructions. You do
        not need to know YAML syntax beyond copying the pattern — it is a
        label, a colon, and a value, one per line.
      </p>
      <p>
        A skill folder can hold more than the one file. Add a{" "}
        <code>template.md</code> for Claude to fill in, an{" "}
        <code>examples/</code> folder showing what good output looks like,
        or a small script Claude can run — none of that extra material
        loads into context until the skill actually needs it, which is why
        a skill can carry a lot of reference detail without costing you
        anything on turns where you are not using it. And you rarely need
        to restart anything to see a change take effect: Claude Code
        watches your skills folders while you work, so editing an existing
        SKILL.md is picked up in the same session. The one exception is
        creating a brand-new top-level skills folder that did not exist
        when the session started — that one needs a fresh Claude Code
        session before it is noticed.
      </p>

      <h2>Slash-command invocation: how /skills and /skill-name work</h2>
      <p>
        Every skill becomes a slash command automatically, named after its
        folder. A skill saved at{" "}
        <code>~/.claude/skills/meeting-prep/SKILL.md</code> is invoked by
        typing <code>/meeting-prep</code> in the Claude Code chat box — no
        separate registration step.
      </p>
      <p>
        Type <code>/skills</code> on its own and Claude Code opens a menu
        listing every skill it can currently see — bundled ones that ship
        with Claude Code, your personal skills, project skills, and anything
        a plugin added. From that menu you can also toggle a skill&apos;s
        visibility (hide it from the menu, or hide its description from
        Claude entirely) without touching the file itself.
      </p>
      <p>
        You have two ways to trigger a skill once it exists, and the
        difference matters:
      </p>
      <ul>
        <li>
          <strong>You type the slash command.</strong> This is explicit and
          immediate — nothing is left to Claude&apos;s judgment about
          whether the moment is right.
        </li>
        <li>
          <strong>Claude invokes it for you.</strong> If your message
          matches the skill&apos;s description closely enough, Claude loads
          it on its own. Ask &quot;what did I change this week?&quot; and a
          skill described as summarizing recent work can fire without you
          typing its name.
        </li>
      </ul>
      <p>
        For anything with a side effect — sending an email, committing
        files, posting somewhere — set{" "}
        <code>disable-model-invocation: true</code> in the frontmatter so
        only you can trigger it by typing the command. For background
        knowledge you never want to invoke directly but want Claude to
        know, the opposite field, <code>user-invocable: false</code>, hides
        it from the menu while keeping it available for Claude to pull in
        automatically.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want the skill written for you instead of from scratch?
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has ready-to-drop SKILL.md files and prompt
          recipes for exactly the workflows below — 550+ recipes total,
          sorted by your job, no YAML fiddling required.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Six skills a non-developer can be using this week</h2>
      <p>
        None of these require writing code. Each is a folder, one SKILL.md
        file, and a description written in plain English. Below is the
        actual file for the first one so you can see the whole pattern, then
        five more you can build the same way.
      </p>

      <p>
        <strong>1. Weekly client update.</strong> Point it at a folder of
        notes, emails, or a project log and it drafts the update you send
        every Friday.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`---
name: weekly-update
description: Draft a weekly client update from this week's notes. Use
  when asked for a status update, a Friday recap, or a progress summary.
---

Read every file in the notes/ folder dated this week. Write a client-
facing update with three sections: what shipped, what is in progress,
and what we need from them. Keep it under 200 words. Plain language,
no jargon, no filler like "circling back" or "touching base."`}
      </pre>
      <p>
        Save that as <code>~/.claude/skills/weekly-update/SKILL.md</code>,
        restart or reopen Claude Code, and either type{" "}
        <code>/weekly-update</code> or ask &quot;can you draft this
        week&apos;s client update&quot; and Claude picks it up on its own.
      </p>
      <p>
        <strong>2. Meeting prep briefing.</strong> Feed it a client name and
        a Project&apos;s worth of history and it hands you a one-page
        briefing: context, likely questions, and talking points, before you
        walk into the call.
      </p>
      <p>
        <strong>3. Discovery-call-to-proposal.</strong> Paste your raw call
        notes as an argument and it returns a structured proposal draft with
        your standard sections already in place — you fill in pricing and
        polish the framing.
      </p>
      <p>
        <strong>4. Content repurposing.</strong> Point it at one blog post
        or transcript and it produces a LinkedIn post, a short-form thread,
        and a newsletter blurb, each shaped for its own channel rather than
        copy-pasted three times.
      </p>
      <p>
        <strong>5. Inbox-to-action-list.</strong> Paste in a batch of
        forwarded emails and get back a table: who needs a reply, by when,
        and a one-line draft response for each.
      </p>
      <p>
        <strong>6. Expense and receipt summary.</strong> Drop a folder of
        receipts or a CSV export in and ask for a categorized summary with
        anything that looks like a duplicate or an outlier flagged for a
        second look.
      </p>
      <p>
        The pattern across all six is the same: a short description that
        names the trigger words you would actually say, and instructions
        that state the output format precisely enough that Claude does not
        have to guess. If you want a deeper, step-by-step build process —
        including supporting files, scripts, and testing a skill before you
        trust it — our{" "}
        <a href="/blog/how-to-build-a-claude-skill">
          guide to building a Claude skill
        </a>{" "}
        walks through that in full.
      </p>

      <h2>Skills vs CLAUDE.md vs subagents: three different jobs</h2>
      <p>
        These three get confused because all three shape how Claude behaves
        in Claude Code, but they solve different problems and the mix-up
        costs you tokens and reliability if you use the wrong one.
      </p>

      {/* ── Skills vs CLAUDE.md vs subagents comparison ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                &nbsp;
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                CLAUDE.md
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Skills
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Subagents
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                When it loads
              </td>
              <td className="py-4 px-6 text-slate-700">
                Every turn, whole session
              </td>
              <td className="py-4 px-6 text-slate-700">
                Only when invoked or matched
              </td>
              <td className="py-4 px-6 text-slate-700">
                Only when delegated to
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Runs where
              </td>
              <td className="py-4 px-6 text-slate-700">
                Main conversation
              </td>
              <td className="py-4 px-6 text-slate-700">
                Main conversation (usually)
              </td>
              <td className="py-4 px-6 text-slate-700">
                Its own separate context
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Best for
              </td>
              <td className="py-4 px-6 text-slate-700">
                Rules that apply almost always
              </td>
              <td className="py-4 px-6 text-slate-700">
                A specific procedure used sometimes
              </td>
              <td className="py-4 px-6 text-slate-700">
                Heavy work you want kept out of your main thread
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Token cost
              </td>
              <td className="py-4 px-6 text-slate-700">
                Paid constantly
              </td>
              <td className="py-4 px-6 text-slate-700">
                Near zero until used
              </td>
              <td className="py-4 px-6 text-slate-700">
                Fixed overhead per spawn, but isolated
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        CLAUDE.md is always-on context: Claude reads it at the start of
        every session and it stays in working memory the whole time, which
        is exactly right for rules that apply to nearly everything you do —
        &quot;never touch the archive folder,&quot; &quot;always write dates
        as YYYY-MM-DD.&quot; The tradeoff is that every line in CLAUDE.md is
        a token cost on every single turn, whether or not that rule was
        relevant to what you just asked.
      </p>
      <p>
        A skill only costs you a hundred or so tokens for its name and
        description sitting in the background — the full instructions load
        only when the skill actually fires. That makes skills the right
        home for a specific, multi-step procedure you use sometimes, not
        constantly: prepping for a call, drafting a proposal, summarizing a
        week. If a section of your CLAUDE.md has turned into a numbered
        procedure rather than a standing rule, it has outgrown CLAUDE.md and
        belongs in a skill instead.
      </p>
      <p>
        Subagents are a different axis entirely: a subagent runs in its own
        isolated context window, does the work, and reports back a summary
        rather than flooding your main conversation with every intermediate
        step. Skills and subagents combine when a skill sets{" "}
        <code>context: fork</code> in its frontmatter — the skill becomes
        the task brief handed to a subagent, so a research or audit skill
        can chew through a large amount of material without bloating the
        conversation you are actually having. For non-developer workflows,
        this mostly matters when a skill involves reading many files: a
        &quot;summarize this quarter&apos;s invoices&quot; skill is a good
        candidate to fork; a two-paragraph email draft is not.
      </p>
      <p>
        If you split your time between Claude Code and{" "}
        <a href="https://claude.com" target="_blank" rel="noopener noreferrer">
          Cowork
        </a>
        , note that skills stored only in{" "}
        <code>~/.claude/skills/</code> on your machine do not automatically
        follow you there — Cowork sessions load the skills enabled on your
        claude.ai account instead. Our{" "}
        <a href="/blog/claude-cowork-vs-claude-code">
          Cowork vs Claude Code comparison
        </a>{" "}
        covers which tool fits which kind of work, including how skills
        travel — or don&apos;t — between the two.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want a weekly walkthrough instead of figuring this out solo?
        </p>
        <p className="mt-2 text-slate-700">
          Inside AItomation Academy you get the full Vault, step-by-step
          courses, and a weekly live call — with 1,200+ professionals
          building skills and workflows the same week you do.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Getting your first skill running today</h2>
      <p>
        Start with the weekly update or meeting prep skill above — both take
        under ten minutes and pay back on the first use. Create the folder,
        paste the SKILL.md pattern, swap in your own description and
        instructions, and test it twice: once by typing the slash command,
        once by just asking naturally to confirm the description triggers
        it.
      </p>
      <p>
        Once you have one skill working, resist the urge to build ten at
        once. Add one per week, notice which ones you actually reach for,
        and let the unused ones tell you your description was too vague or
        the task did not need a skill in the first place. For the bigger
        picture on what skills are and how they compare across every Claude
        surface — not just Claude Code — go back to our{" "}
        <a href="/blog/what-are-claude-skills">
          what are Claude skills
        </a>{" "}
        hub guide. And if you want to see how skills fit into the rest of
        how a business runs on Claude day to day, our{" "}
        <a href="/blog/claude-for-business">Claude for business guide</a>{" "}
        is the wider view.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Do I need to know how to code to build a Claude Code skill?</h3>
      <p>
        No. A SKILL.md file is plain-language instructions with a small YAML
        header on top — labels and values, no logic or syntax to debug. The
        six skills above use nothing beyond that. Skills that run scripts
        are optional, not required.
      </p>

      <h3>What is the difference between /skills and typing a skill name directly?</h3>
      <p>
        <code>/skills</code> opens a menu listing everything available so
        you can browse, and lets you toggle visibility. Typing{" "}
        <code>/weekly-update</code> (or whatever your skill is named) runs
        that specific skill immediately without opening the menu first.
      </p>

      <h3>Can Claude use a skill without me typing the slash command?</h3>
      <p>
        Yes, by default. If your message matches the skill&apos;s
        description closely, Claude loads it automatically. Set{" "}
        <code>disable-model-invocation: true</code> in the frontmatter if
        you only ever want to trigger it yourself.
      </p>

      <h3>Do personal skills work in every project, or just one?</h3>
      <p>
        Skills saved in <code>~/.claude/skills/</code> follow you into every
        project you open on that machine. Skills saved inside a specific
        project&apos;s <code>.claude/skills/</code> folder only apply there
        — useful for a workflow that is specific to one client or one repo.
      </p>

      <h3>What happens if two skills have the same name?</h3>
      <p>
        Claude Code applies a priority order: an enterprise-managed skill
        wins over a personal one, and a personal skill wins over a project
        skill with the same name. Plugin skills are namespaced by the
        plugin&apos;s name, so they never collide with anything else — a
        plugin called <code>reports</code> with a <code>weekly</code> skill
        is invoked as <code>/reports:weekly</code>, not <code>/weekly</code>.
      </p>
    </>
  ),
};
