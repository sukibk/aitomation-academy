import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-cowork-automations",
  title: "7 Claude Cowork Automations That Run Weekly",
  description:
    "7 Claude Cowork automations that run weekly, each with the scheduled-task instruction to paste — inbox triage, meeting prep, reports, and more.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Workflows",
  tags: [
    "Claude",
    "Cowork",
    "claude cowork automations",
    "cowork use cases",
    "scheduled tasks",
    "claude cowork",
    "automation",
    "workflows",
    "productivity",
  ],
  body: (
    <>
      <p>
        Claude Cowork stops being a chat window the moment you give it a
        recurring job. Instead of opening a new conversation every Monday to
        ask for the same inbox cleanup or the same status report, you write
        the instruction once, attach a cadence, and Cowork runs it in the
        background from then on — reading whatever files, connectors, and
        folders it needs at the moment it runs. If you have not set up Cowork
        yet, our{" "}
        <a href="/blog/what-is-claude-cowork">
          what is Claude Cowork guide
        </a>{" "}
        covers folders, connectors, and skills before you get to automation.
      </p>
      <p>
        This article is seven cowork use cases that are genuinely worth
        scheduling — not seven ideas, seven instructions you can paste into
        Cowork&apos;s{" "}
        <code>/schedule</code> command today and have running by Friday.
        Each one includes the exact prompt, a suggested cadence, and what to
        watch for the first few runs.
      </p>

      <h2>Weekly automation beats a fresh prompt every Monday</h2>
      <p>
        A one-off prompt only works if you remember to write it, and most
        people do not remember on a Monday that is already busy. A scheduled
        Cowork task removes the remembering — Claude runs the standing
        instruction on the cadence you picked, whether or not you thought
        about it that morning, and the output is waiting for you instead of
        being one more thing on your list.
      </p>
      <p>
        The seven automations below cover the recurring work that eats real
        time but rarely needs a fresh brief: triage, prep, reporting, and file
        hygiene. Set them up once and they keep paying off every single week.
      </p>

      <h2>How a Cowork scheduled task is actually built</h2>
      <p>
        A scheduled task in Cowork is a saved prompt plus a cadence plus a
        working folder — Claude re-reads the folder, connectors, and instructions
        fresh at every run, so nothing goes stale between weeks. You can type{" "}
        <code>/schedule</code> inside any Cowork task and answer a few
        questions, or open the Scheduled panel in the sidebar and set the
        name, prompt, frequency, model, and folder from scratch.
      </p>
      <p>
        Every prompt below is written to be pasted in as-is, with bracketed
        placeholders you fill in once. Point Cowork at the folder or
        connector the task needs (your inbox connector, a Meetings folder, a
        Downloads folder) and pick a cadence — daily, weekly, weekdays, or
        hourly.
      </p>

      {/* ── 7 automations table ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">Automation</th>
              <th className="text-center py-4 px-6 font-semibold text-slate-900">Cadence</th>
              <th className="text-center py-4 px-6 font-semibold text-slate-900">Needs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="py-4 px-6 text-slate-700">1. Inbox triage digest</td><td className="py-4 px-6 text-center text-slate-500">Weekday mornings</td><td className="py-4 px-6 text-center text-slate-500">Email connector</td></tr>
            <tr><td className="py-4 px-6 text-slate-700">2. Meeting prep briefing</td><td className="py-4 px-6 text-center text-slate-500">Daily, before 9am</td><td className="py-4 px-6 text-center text-slate-500">Calendar + notes folder</td></tr>
            <tr><td className="py-4 px-6 text-slate-700">3. Friday status report</td><td className="py-4 px-6 text-center text-slate-500">Weekly, Friday</td><td className="py-4 px-6 text-center text-slate-500">Project folder</td></tr>
            <tr><td className="py-4 px-6 text-slate-700">4. Downloads &amp; Desktop cleanup</td><td className="py-4 px-6 text-center text-slate-500">Weekly, Sunday</td><td className="py-4 px-6 text-center text-slate-500">Local folders</td></tr>
            <tr><td className="py-4 px-6 text-slate-700">5. Client folder audit</td><td className="py-4 px-6 text-center text-slate-500">Weekly, Monday</td><td className="py-4 px-6 text-center text-slate-500">Client folders</td></tr>
            <tr><td className="py-4 px-6 text-slate-700">6. Industry &amp; competitor scan</td><td className="py-4 px-6 text-center text-slate-500">Weekly</td><td className="py-4 px-6 text-center text-slate-500">Web-enabled task</td></tr>
            <tr><td className="py-4 px-6 text-slate-700">7. Content repurposing digest</td><td className="py-4 px-6 text-center text-slate-500">Weekly</td><td className="py-4 px-6 text-center text-slate-500">Content folder</td></tr>
          </tbody>
        </table>
      </div>

      <h2>1. Inbox triage that runs before you open your laptop</h2>
      <p>
        The point of this automation is not to answer your email for you — it
        is to hand you a sorted list the moment you sit down, so the first 20
        minutes of your day stop being spent scrolling. Connect your email
        connector, then paste this as a scheduled task set to run weekday
        mornings.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Review my inbox from the last connector sync and produce a triage digest.

Group messages into: NEEDS REPLY TODAY, WAITING ON SOMEONE ELSE,
FYI ONLY (no action), and LIKELY SPAM/PROMO.

For each item in "NEEDS REPLY TODAY": one-line summary of what
they want, and a suggested next action (reply, schedule, delegate).

Do not draft replies unless a message is a simple yes/no or
scheduling confirmation — for those, draft a 2-sentence reply I
can approve.

Keep the whole digest under one page. Flag anything time-sensitive
(deadline mentioned, "urgent" in subject/body) at the very top.`}
      </pre>

      <h2>2. Meeting prep briefings that beat scrambling five minutes before</h2>
      <p>
        Meeting prep is the automation people notice fastest, because
        showing up with context you did not have time to review reads as
        competence to everyone else in the room. Point this at your calendar
        connector and a shared meeting-notes folder, and schedule it daily
        early morning.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Look at today's calendar and my meeting-notes folder. For every
external or client meeting today, produce a one-page briefing:

1. WHO — attendees, their role, and the last time we met (with a
   one-line summary of what was discussed/agreed then)
2. WHY — the stated purpose of this meeting
3. OPEN ITEMS — anything we owe them or they owe us from last time
4. TALKING POINTS — 3 things I should raise or confirm
5. WATCH FOR — any sensitive topic or unresolved tension to navigate

Skip internal recurring meetings with no notes history. Order
briefings by meeting time. Keep each one under half a page.`}
      </pre>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Skip writing the prompts yourself
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has a Cowork automations section pre-built — ready
          scheduled-task instructions for triage, reporting, meeting prep,
          and file hygiene. 550+ recipes total, sorted by your job.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>3. The Friday status report that writes itself from your project folder</h2>
      <p>
        If you write a weekly status update for a manager, client, or your own
        records, this is the automation with the fastest payoff — it turns a
        20-30 minute Friday chore into a two-minute review. Point Cowork at
        the project folder that holds your notes, task lists, and any weekly
        exports.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Read everything added or changed in this project folder over the
past 7 days and draft a weekly status report.

Sections:
- WHAT SHIPPED (completed items, with a one-line outcome for each)
- IN PROGRESS (what's moving, expected finish)
- BLOCKED (what's stuck and what's needed to unstick it)
- NEXT WEEK (top 3 priorities)

Tone: plain, specific, no filler ("made progress on X" is banned —
say what actually happened). Under 300 words. End with one line
flagging anything that needs a decision from the reader.`}
      </pre>

      <h2>4. Downloads and Desktop cleanup without you lifting a finger</h2>
      <p>
        File clutter is the automation nobody schedules until they see it
        working once — a folder that has quietly become 400 files deep gets
        sorted into a clean structure while you are doing something else
        entirely. Point this at your Downloads or Desktop folder, scheduled
        weekly.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Review every file in this folder. Sort into subfolders by type and
apparent purpose: Invoices, Screenshots, Contracts, Reference Docs,
Images, Archive (anything older than 90 days with no clear current
use), and Needs Review (anything you're unsure how to categorize).

Rename files with unclear names using their content to build a
descriptive name (date + short description), keeping the original
extension. Do not delete anything — only move and rename.

Give me a short summary at the end: how many files moved, what
went to Needs Review and why, and anything that looked like a
duplicate.`}
      </pre>

      <h2>5. A client folder audit that catches drift before it becomes a mess</h2>
      <p>
        For anyone running multiple client or project folders, this
        automation is the one that prevents the slow rot where naming
        conventions drift, drafts pile up next to finals, and nobody notices
        until a deadline forces a scramble. Schedule it weekly per client
        folder, or as one task that loops through several.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Audit this client folder for structure and hygiene issues.

Check for: files named inconsistently, draft versions sitting
next to what looks like a final, documents that haven't been
touched in 60+ days that might be stale, and any obvious missing
piece (e.g. a proposal folder with no signed contract inside).

Produce a short report: ISSUES FOUND (with the specific file
names), SUGGESTED FIXES, and a confidence note on anything you're
guessing about. Do not move or rename anything yet — this is a
report-only run. I'll approve changes before the next run applies
them.`}
      </pre>

      <h2>6. A weekly scan of your industry and competitors</h2>
      <p>
        Staying current on a market or a competitor set is exactly the kind
        of task that gets skipped in a busy week and then costs you when you
        are blindsided in a meeting. A scheduled scan keeps a standing
        briefing waiting for you instead of a Google search you never got
        around to.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Research what's new this week for [industry/competitor names] and
produce a short briefing.

Cover: any product launches, pricing changes, or major
announcements; notable hiring or leadership moves; any coverage
in trade press; and one line on what, if anything, this means for
our positioning.

Cite sources with links. If nothing meaningful happened this
week, say so plainly instead of padding the report. Keep it under
half a page.`}
      </pre>

      <h2>7. Turning one asset into a week of content, automatically</h2>
      <p>
        If you publish content regularly, this automation takes whatever
        landed in a content folder this week — a transcript, a blog draft, a
        webinar recording notes — and turns it into channel-native pieces
        without you re-reading the source material every time.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Check this content folder for anything added in the last 7 days
(transcripts, drafts, notes). For each new asset, produce:

- One LinkedIn post (150-220 words, hook in the first line)
- One short-form video script outline (3 beats)
- One newsletter section (100-150 words)

Match the voice of past posts already in this folder if any exist.
No buzzwords, no hashtag spam. Save each output as its own file
named after the source asset plus the channel.`}
      </pre>

      <h2>Cowork automations versus Claude Code automations</h2>
      <p>
        If you have developers on your team, you may already have scripts or
        Claude Code running scheduled jobs — and it is worth knowing where
        each tool fits before you duplicate effort. Cowork is built for
        folder- and connector-based work that non-technical people can set up
        without writing code, while Claude Code is built for automating
        inside a codebase. Our{" "}
        <a href="/blog/claude-cowork-vs-claude-code">
          Claude Cowork vs Claude Code comparison
        </a>{" "}
        breaks down exactly which one fits which job, so you are not forcing
        a coding tool to do office work or the reverse.
      </p>
      <p>
        For a wider view of where Cowork automations fit against other
        everyday Claude use cases — one-off prompts, Projects, and the
        desktop app generally — see our{" "}
        <a href="/blog/claude-ai-use-cases">Claude AI use cases guide</a>.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want these automations built for you and kept current?
        </p>
        <p className="mt-2 text-slate-700">
          Inside Claude Code Academy you get the full Vault of scheduled-task
          instructions, the courses, and a weekly live call — with 1,200+
          professionals using this daily.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Setting up your first scheduled task this week</h2>
      <p>
        Do not try to schedule all seven at once. Pick the one that eats the
        most time in your actual week — for most people it is inbox triage or
        meeting prep — and get that one running cleanly before adding a
        second. Open Cowork, type <code>/schedule</code>, paste the
        instruction, point it at the right folder or connector, and pick a
        cadence.
      </p>
      <p>
        Watch the first two or three runs closely. Scheduled tasks re-read
        your folders and connectors fresh every time, so if something looks
        off — wrong folder scoped, a connector not connected, output too
        long or too short — it is almost always the setup, not the model.
        Adjust the instruction, save it, and let the next run confirm the
        fix. Once one automation is running reliably, add the next from the
        list above. For more copy-paste workflows beyond scheduled
        automation, our{" "}
        <a href="/blog/5-claude-workflows-for-non-technical-professionals">
          5 Claude workflows for non-technical professionals
        </a>{" "}
        guide is a good next stop, and Anthropic&apos;s own{" "}
        <a
          href="https://support.claude.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          support documentation
        </a>{" "}
        covers connector setup in detail. You can also read more about Cowork
        directly at{" "}
        <a href="https://claude.com" target="_blank" rel="noopener noreferrer">
          claude.com
        </a>
        .
      </p>

      <h2>Frequently asked questions about Cowork automations</h2>

      <h3>Does a scheduled task run if my computer is off?</h3>
      <p>
        Cowork&apos;s scheduled tasks originally required your device to be
        on and Claude Desktop open at the scheduled time, since each run
        reads live folders and connectors on that machine. Anthropic has been
        expanding Cowork to web and mobile, which is loosening that
        requirement over time, so check the current state in your own
        Cowork settings before assuming either way — this is exactly the
        kind of detail worth verifying against Anthropic&apos;s support
        documentation rather than an older article.
      </p>

      <h3>What happens if a scheduled task reads the wrong folder?</h3>
      <p>
        Nothing destructive by default — Cowork only touches folders and
        connectors you have explicitly scoped it to, so the worst case of a
        misconfigured task is a report about the wrong files, not damage to
        files it was never given access to. Fix the folder scope in the task
        settings and the next run reads the corrected location.
      </p>

      <h3>Should every automation run unattended, with no review step?</h3>
      <p>
        No. Notice that several of the prompts above (the file audit, the
        cleanup task) are deliberately written to report and wait for your
        approval before moving or renaming anything, rather than acting
        silently. For anything touching real files, financial data, or client
        communication, keep a human review step until you have watched
        several runs and trust the pattern of output.
      </p>

      <h3>How many of these should I schedule at once?</h3>
      <p>
        Start with one. Cowork automations compound in value the longer they
        run — a triage digest is more useful in week four than week one,
        because you have tuned the categories and folder scope by then.
        Adding all seven on day one just means debugging seven prompts
        simultaneously instead of one.
      </p>
    </>
  ),
};
