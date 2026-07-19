import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-skill-for-obsidian",
  title: "Claude Skill for Obsidian: Full Setup Guide",
  description:
    "Build a Claude skill for Obsidian that tags, files, and links your notes automatically. Full SKILL.md code plus a daily notes workflow.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Workflows",
  tags: [
    "Claude",
    "claude skill for obsidian",
    "obsidian",
    "claude skills",
    "claude code",
    "cowork",
    "note-taking",
    "daily notes",
    "second brain",
    "workflows",
  ],
  body: (
    <>
      <p>
        A Claude skill for Obsidian is a folder of instructions that teaches
        Claude how to read, tag, file, and link the notes in your vault the
        same way every time — instead of you re-explaining your folder
        structure and tagging conventions in every conversation. Point Claude
        at your vault through Cowork or Claude Code, drop in one skill, and
        the messy inbox of half-written notes you have been meaning to
        organize for six months becomes a five-minute weekly pass.
      </p>
      <p>
        This guide covers both ways to give Claude folder access to a real
        Obsidian vault, a complete note-processing skill you can copy in
        today, and a daily-notes workflow built around it. If you have not
        built a skill before, start with our{" "}
        <a href="/blog/how-to-build-a-claude-skill">
          how to build a Claude skill
        </a>{" "}
        walkthrough — this article assumes you know what a skill is and
        wants to show you a specific, working one.
      </p>

      <h2>What a Claude skill for Obsidian actually does</h2>
      <p>
        It is not a plugin, and Claude does not run inside Obsidian itself —
        the skill is a set of markdown instructions that Claude loads when it
        detects you are working on vault-related notes, and it operates on
        the files directly through whatever tool has folder access to that
        vault. For the full definition of what a skill is and how Claude
        decides when to load one, see our{" "}
        <a href="/blog/what-are-claude-skills">what are Claude skills</a>{" "}
        guide.
      </p>
      <p>
        Concretely, a note-processing skill for Obsidian tells Claude: here
        is my folder structure, here is my tagging taxonomy, here is how I
        want a raw note turned into a filed, linked, properly-tagged one. You
        write that logic once. After that, saying &quot;process my
        inbox&quot; triggers the same routine every time, with the same
        judgment calls, instead of Claude guessing at your conventions from
        scratch in each session.
      </p>

      <h2>Two ways to open your vault to Claude: Cowork vs Claude Code</h2>
      <p>
        You need something with real file access to your vault folder before
        any skill can act on it — Claude in a browser tab cannot read or
        write local markdown files. There are two practical routes for
        non-developers: Cowork, Anthropic&apos;s agentic desktop workspace,
        or Claude Code run from a terminal pointed at your vault directory.
      </p>

      {/* ── Cowork vs Claude Code table ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Setup
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Cowork
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Claude Code
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 text-slate-700">How you grant access</td>
              <td className="py-4 px-6 text-slate-700">
                Point it at your vault folder from the desktop app; access is
                scoped to that folder
              </td>
              <td className="py-4 px-6 text-slate-700">
                Open a terminal, <code>cd</code> into the vault, run{" "}
                <code>claude</code>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700">Best for</td>
              <td className="py-4 px-6 text-slate-700">
                Non-technical users who want a normal desktop app, no
                terminal
              </td>
              <td className="py-4 px-6 text-slate-700">
                Anyone comfortable typing a folder path and a command
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700">Skills</td>
              <td className="py-4 px-6 text-slate-700">
                Installs and loads skills automatically when relevant
              </td>
              <td className="py-4 px-6 text-slate-700">
                Reads skill folders you place under{" "}
                <code>.claude/skills/</code>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700">Scheduling</td>
              <td className="py-4 px-6 text-slate-700">
                Built-in scheduled tasks — e.g. run the vault skill every
                morning
              </td>
              <td className="py-4 px-6 text-slate-700">
                Runs on demand per session, or via your own scheduler
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700">Connectors</td>
              <td className="py-4 px-6 text-slate-700">
                Can also reach calendar, email, and other connected apps
              </td>
              <td className="py-4 px-6 text-slate-700">
                Vault and local files only, unless you wire up MCP yourself
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        For most people who just want their notes organized without touching
        a terminal, Cowork is the easier front door — you scope it to the
        vault folder once, and it keeps that access across sessions. If you
        already have Claude Code installed for other work, running it from
        inside your vault directory costs you nothing extra and gets you the
        same skill support.
      </p>

      <h2>The note-processing skill: full code you can drop in today</h2>
      <p>
        Below is a complete skill for processing raw Obsidian notes: it adds
        frontmatter, assigns tags from a fixed taxonomy, decides which folder
        a note belongs in, links it to related existing notes, and appends a
        reference in today&apos;s daily note. Save this as{" "}
        <code>SKILL.md</code> inside a folder named{" "}
        <code>obsidian-note-processor</code>, and put that folder under{" "}
        <code>.claude/skills/</code> in your vault (or your user-level skills
        folder if you want it available in every vault you open).
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`---
name: obsidian-note-processor
description: Use when the user asks to process, clean up, file, tag, or
  link raw notes in their Obsidian vault. Triggers on phrases like "process
  my inbox", "file this note", "clean up my notes", "tag and link this".
---

# Obsidian Note Processor

You are processing raw notes from this vault's Inbox/ folder into
properly tagged, filed, and linked permanent notes.

## Vault structure
- Inbox/        — unprocessed notes land here, filename = rough title
- Areas/         — ongoing responsibilities (Work, Health, Finances, ...)
- Projects/      — time-bound efforts with a defined end state
- Reference/     — reusable knowledge, no action attached
- Daily/         — one note per day, named YYYY-MM-DD.md

## Tag taxonomy (only use these — do not invent new top-level tags)
#project #area #reference #idea #decision #followup #person #meeting

## For each file in Inbox/
1. Read the note. If it has no frontmatter, add:
   ---
   created: [today's date]
   tags: []
   status: inbox
   ---
2. Read the content and assign 2-5 tags from the taxonomy above based on
   what the note is actually about — not what folder you think it should
   land in. A meeting note about a project still gets both #meeting and
   #project.
3. Decide the destination folder:
   - Tagged #project -> Projects/[Project Name]/
   - Tagged #area -> Areas/[Area Name]/
   - Tagged #reference -> Reference/
   - Everything else stays in Inbox/ and gets flagged for the user to
     decide manually — never guess on ambiguous notes.
4. Search the vault for existing notes sharing 2+ tags or obvious keyword
   overlap. Add a "## Related" section at the bottom of the note with
   [[wikilinks]] to the 2-4 most relevant matches. Do not force links that
   are not genuinely related.
5. If the note references a specific date, event, or decision made today,
   append one line to Daily/[today].md under a "## Notes filed today"
   heading, linking back to the processed note.
6. Move the file from Inbox/ to its resolved folder. Update the
   frontmatter status field from "inbox" to "filed".
7. Append one line to Reference/Processing-Log.md:
   [date] — filed [[note title]] -> [destination folder], tags: [list]

## Rules
- Never delete a note. If you are unsure where something belongs, leave
  it in Inbox/ with a comment rather than guessing.
- Never overwrite existing frontmatter fields you don't understand —
  add to them, don't replace them.
- Process one note at a time and report what you did before moving to
  the next, so mistakes are easy to catch.
- If Inbox/ has more than 15 unprocessed notes, process the 10 oldest
  first and tell the user how many remain.`}
      </pre>
      <p>
        The rule at the end — never delete, never guess silently — matters
        more than it looks. A skill that files things wrong is annoying. A
        skill that deletes or overwrites something is a trust problem you do
        not get back easily, so the instructions are written to fail toward
        &quot;leave it and flag it&quot; rather than toward &quot;make a
        confident guess.&quot;
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Skip building skills from scratch
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has ready-made skills and prompts for note-taking,
          writing, and vault organization — 550+ recipes total, sorted by
          your job, so you copy instead of drafting from a blank file.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <p>
        A second thing worth deciding up front is scope. You do not have to
        connect your entire vault on day one — if your Obsidian setup mixes
        personal journaling with work notes, scope Cowork or Claude Code to
        just the Inbox/ and Daily/ folders while you get comfortable, then
        widen access once you trust the output. Folder access in both tools
        is granular by design specifically so you can start narrow and
        expand later rather than handing over the whole vault before you
        have seen a single run.
      </p>

      <h2>Wiring the skill into a daily notes workflow</h2>
      <p>
        The skill above processes what already exists. The daily-notes
        workflow is what feeds it — a short end-of-day routine where Claude
        reads today&apos;s daily note, pulls out anything that should become
        a permanent note, and hands it to the processor. Run this once in
        the evening and your inbox never grows past what a single pass can
        clear.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Read Daily/[today's date].md.

1. Pull out anything that looks like a standalone idea, decision, or
   task that deserves its own note rather than living only in today's
   log — a new project mention, a decision with reasoning attached, a
   person's contact context, a reusable idea.
2. For each one, create a new file in Inbox/ with a clear title and
   the extracted content, plus a one-line frontmatter note pointing
   back to today's daily note as the source.
3. Leave the daily note itself untouched except for a "## Extracted
   today" section listing what you pulled out, linked to the new
   Inbox files.
4. Then run the obsidian-note-processor skill on the Inbox/ files you
   just created.
5. Report a short summary: how many notes extracted, how many filed,
   how many left in Inbox for a manual decision.`}
      </pre>
      <p>
        In practice this turns a daily note from a write-once scratchpad
        into the front door of your whole vault. You write freely during the
        day, and the two routines together — extract, then process — do the
        organizing you would otherwise put off until the backlog got
        uncomfortable. It is the same principle behind good writing
        workflows generally: capture messy first, structure second. Our{" "}
        <a href="/blog/how-to-use-claude-for-writing">
          how to use Claude for writing
        </a>{" "}
        guide covers that same split for longer-form drafts.
      </p>

      <h2>Guardrails before you trust Claude with your whole vault</h2>
      <p>
        Folder access means real write access to real files, so the failure
        mode to design against is silent damage — a note filed to the wrong
        place is recoverable, a note that got overwritten or merged
        incorrectly may not be, especially if you do not notice for weeks.
        A few checks are worth doing before you let any skill run unattended
        on your full vault.
      </p>
      <ul>
        <li>
          <strong>Test on a copy first.</strong> Duplicate your vault folder,
          point Cowork or Claude Code at the copy, and run the skill against
          a realistic Inbox/ before you trust it on the original.
        </li>
        <li>
          <strong>Use version control if you can.</strong> A vault that is a
          git repository (or synced through a tool with version history)
          means any bad file operation is one revert away from fixed.
        </li>
        <li>
          <strong>Start with read-heavy tasks.</strong> Ask Claude to
          summarize or tag-suggest before you let it move and rewrite files
          on its own — see the output for a week, then hand over more.
        </li>
        <li>
          <strong>Keep the taxonomy small and explicit.</strong> A skill that
          can invent new tags or folders on the fly will drift from your
          system within a month. The skill above deliberately restricts tags
          to a fixed list for this reason.
        </li>
      </ul>
      <p>
        None of this is specific to Obsidian — it is the same discipline you
        would want for any skill with write access to files you cannot
        easily reconstruct. If you are still deciding what your first skill
        should even be, our{" "}
        <a href="/blog/best-claude-skills">best Claude skills</a> roundup is
        a good place to see which ones are worth building versus which ones
        are worth skipping.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want the vault skills and workflows built for you?
        </p>
        <p className="mt-2 text-slate-700">
          Inside Claude Code Academy you get the full Vault, step-by-step
          courses, and a weekly live call — with 1,200+ professionals
          building workflows like this one daily.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Frequently asked questions</h2>
      <h3>Do I need Claude Code, or is Cowork enough on its own?</h3>
      <p>
        Cowork is enough for most people. It gives Claude scoped folder
        access to your vault, supports skills, and can run them on a
        schedule without a terminal in sight. Claude Code is worth adding if
        you already use it for other work, or if you want to run the vault
        skill as one more step in a larger automated setup.
      </p>
      <h3>Can the skill break my existing note-taking system?</h3>
      <p>
        Only if the taxonomy and folder rules in the skill do not match your
        real system — which is why the skill above spells out your folders
        and tags explicitly rather than letting Claude infer them. Copy it,
        edit the taxonomy and folder list to match your actual vault, and
        test on a duplicate before running it on the original.
      </p>
      <h3>Does this work with Obsidian plugins like Dataview or Templater?</h3>
      <p>
        Yes, as long as the frontmatter and file structure the skill
        produces are compatible with what those plugins expect — Claude is
        just reading and writing plain markdown files, the same files your
        plugins already read. If a plugin depends on a specific frontmatter
        field, add that field to the skill&apos;s instructions explicitly.
      </p>
      <h3>Where do I go to learn how to build my own skills from here?</h3>
      <p>
        Start with our{" "}
        <a href="/blog/what-are-claude-skills">what are Claude skills</a>{" "}
        guide for the concept, then{" "}
        <a href="/blog/how-to-build-a-claude-skill">
          how to build a Claude skill
        </a>{" "}
        for the step-by-step process of writing your own SKILL.md from a
        blank folder — the same structure used for the Obsidian skill above
        applies to any repeatable task you want Claude to handle
        consistently.
      </p>
      <h3>What if my vault does not use the Inbox-Areas-Projects layout?</h3>
      <p>
        The folder names in the skill above are a placeholder, not a
        requirement. If your vault follows a different system — a flat
        structure, a Zettelkasten-style numbered sequence, or a
        calendar-first layout with no separate Areas or Projects folders at
        all — replace the &quot;Vault structure&quot; section with your own
        folder names and skip step 3&apos;s folder-routing logic entirely if
        it does not apply. The parts worth keeping regardless of layout are
        the tag taxonomy discipline, the never-delete rule, and the daily
        note backlink, since those three are what keep a vault searchable
        as it grows past a few hundred notes.
      </p>
    </>
  ),
};
