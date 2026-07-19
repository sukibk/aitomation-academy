import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "what-is-claude-cowork",
  title: "What Is Claude Cowork? How It Actually Works",
  description:
    "Claude Cowork explained: folder scoping, plan approval, skills, scheduled tasks, and connectors — what it is, who it's for, and your first automation.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Guides",
  tags: [
    "Claude",
    "claude cowork",
    "cowork",
    "claude automation",
    "claude for business",
    "ai agent",
    "scheduled tasks",
    "claude skills",
    "connectors",
    "workflows",
  ],
  body: (
    <>
      <p>
        Claude Cowork is Claude working directly inside your files, folders,
        and apps instead of just chatting about them — it plans a task,
        shows you the plan, then reads, edits, and produces real files on
        your machine while you stay in control of what it&apos;s allowed to
        touch. This guide covers exactly how it works: folder scoping, plan
        approval, skills, scheduled tasks, and connectors, plus a
        first-automation walkthrough for people who have never opened it.
      </p>
      <p>
        Everything below is written for non-technical professionals —
        operators, marketers, consultants, founders — not developers. If
        you&apos;re deciding whether to pay for it, our{" "}
        <a href="/blog/claude-cowork-pricing">Claude Cowork pricing guide</a>{" "}
        breaks down which plans include it. If you want ready-made
        automation ideas once you&apos;re set up, see{" "}
        <a href="/blog/claude-cowork-automations">
          Claude Cowork automations
        </a>
        .
      </p>

      <h2>What is Claude Cowork?</h2>
      <p>
        Claude Cowork is an agentic workspace, built into the Claude desktop
        app, that lets Claude act on a folder of real files and apps rather
        than only answering questions in a chat window. You describe a job
        in plain English — &quot;reconcile these three spreadsheets and flag
        anything that doesn&apos;t match&quot; — and Cowork breaks it into a
        visible plan, works through the steps, and leaves finished files
        behind instead of a wall of text to copy out yourself.
      </p>
      <p>
        The distinction from regular Claude chat is the difference between
        describing work and doing it. Chat is a conversation; Cowork is a
        working session. Anthropic launched it in February 2026 as a
        desktop-only tool and has since{" "}
        <a
          href="https://claude.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          expanded it to web and mobile
        </a>
        , so a task you start on your laptop can keep running in the
        background and you can check on it from your phone. Internal usage
        data Anthropic has shared shows the biggest category of Cowork tasks
        is business process work — not code — which is exactly the
        non-technical audience this guide is written for.
      </p>

      {/* ── Chat vs Cowork vs Claude Code comparison ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">

              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Claude Chat
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Claude Cowork
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Claude Code
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Best for
              </td>
              <td className="py-4 px-6 text-slate-700">
                Questions, drafts, one-off writing
              </td>
              <td className="py-4 px-6 text-slate-700">
                Multi-step work on real files and folders
              </td>
              <td className="py-4 px-6 text-slate-700">
                Software development
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Touches your files?
              </td>
              <td className="py-4 px-6 text-slate-700">
                Only what you paste or upload
              </td>
              <td className="py-4 px-6 text-slate-700">
                Yes, inside a folder you scope
              </td>
              <td className="py-4 px-6 text-slate-700">
                Yes, inside a code repository
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Runs unattended?
              </td>
              <td className="py-4 px-6 text-slate-700">No</td>
              <td className="py-4 px-6 text-slate-700">
                Yes, via scheduled tasks
              </td>
              <td className="py-4 px-6 text-slate-700">
                Yes, in supported setups
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Audience
              </td>
              <td className="py-4 px-6 text-slate-700">Everyone</td>
              <td className="py-4 px-6 text-slate-700">
                Non-technical professionals
              </td>
              <td className="py-4 px-6 text-slate-700">Developers</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        If you want the fuller side-by-side on when to reach for which one,
        we cover it in{" "}
        <a href="/blog/claude-cowork-vs-claude-code">
          Claude Cowork vs Claude Code
        </a>
        .
      </p>

      <h2>Folder scoping: Cowork&apos;s core safety boundary</h2>
      <p>
        Folder scoping means Claude never gets blanket access to your
        computer — you point it at one specific folder, and everything it
        can read, write, or run stays inside that boundary. Instead of
        turning Claude loose on your entire hard drive, you hand it
        something like <code>~/Documents/q2-launch/</code>, and from that
        moment on, its reach stops at the folder&apos;s edge.
      </p>
      <p>
        This matters because it is the mechanism that makes the rest of
        Cowork trustworthy. Once a folder is scoped, Claude can read every
        file inside it, create new ones, edit existing ones, and run
        scheduled tasks against that content — but it cannot wander into
        your Downloads folder, your other client&apos;s workspace, or system
        files it was never given. The practical habit worth building: create
        one folder per project or client, the same way you&apos;d create a
        separate Claude Project for each engagement, and only ever scope
        Cowork to the one you&apos;re actively working in.
      </p>
      <p>
        Scoping reduces lateral exposure, but it does not remove every risk
        inside the folder itself — Claude can still overwrite or delete a
        file it was scoped to touch. That is exactly what plan approval is
        for.
      </p>

      <h2>Plan approval: the three modes that decide what Claude can do</h2>
      <p>
        Before Cowork touches anything, it turns your instruction into an
        explicit, readable plan — the list of steps it intends to take — and
        you decide how much freedom it gets to run that plan without
        stopping to ask. That control lives in a mode selector in the chat
        box, and it applies to actions like using a connector, not just to
        editing files.
      </p>

      {/* ── Three modes grid ── */}
      <div className="not-prose my-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
        <p className="text-center font-semibold text-slate-800 mb-6 text-lg">
          Cowork&apos;s Three Approval Modes
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4 md:p-5">
            <p className="font-semibold text-blue-800 mb-2">
              Manually approve
            </p>
            <p className="text-sm text-blue-700">
              Claude pauses before each action and asks you to Allow or Deny.
              The safest mode, and the right default while you learn how
              Cowork behaves in a new folder.
            </p>
          </div>
          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4 md:p-5">
            <p className="font-semibold text-green-800 mb-2">
              Automatically approve
            </p>
            <p className="text-sm text-green-700">
              Claude keeps working without stopping at every step, but
              screens each action for risk — like data exfiltration or
              prompt injection — and blocks anything it flags as unsafe.
            </p>
          </div>
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 md:p-5">
            <p className="font-semibold text-red-800 mb-2">
              Skip all approvals
            </p>
            <p className="text-sm text-red-700">
              Claude never pauses and nothing checks its actions
              automatically. Reserve this for folders and tasks you have
              already run safely under the other two modes.
            </p>
          </div>
        </div>
      </div>
      <p>
        Even inside an approved plan, Cowork will still stop and check with
        you before certain sensitive actions — downloading a file or
        entering information into a page it hasn&apos;t seen before are
        common examples. It also will not silently deviate from the plan
        you approved; if the task changes shape mid-way, it asks again
        before continuing.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Not sure which prompts actually work inside Cowork
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has 550+ recipes sorted by job, including the
          exact task prompts and skill setups people use to get Cowork
          producing finished output on the first try.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Skills and plugins: how Cowork learns your workflows</h2>
      <p>
        A skill is a folder containing a SKILL.md file of instructions that
        Claude loads automatically whenever it&apos;s relevant to the task at
        hand — write it once and it works the same way across Claude chat,
        Cowork, and Claude Code. Instead of re-explaining your invoicing
        format or your report structure every single time, you write it down
        once as a skill and Cowork picks it up on its own.
      </p>
      <p>
        Plugins are the bigger unit: a plugin bundles multiple skills,
        connectors, and even sub-agents into one package built for a
        specific job — financial analysis, engineering review, HR
        onboarding. Anthropic&apos;s own teams use domain-specific plugins
        internally to encode institutional workflows so a new Cowork session
        starts already knowing how that part of the business operates,
        rather than starting from a blank instruction every time.
      </p>
      <p>
        A minimal skill file for a recurring reporting task looks like this:
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`# SKILL.md
name: weekly-status-report
description: Use when compiling the weekly team status update.

When asked to build the weekly status report:
1. Read every file in /updates/ dated within the last 7 days.
2. Group items by project, not by person.
3. Flag anything marked "blocked" at the top of the report.
4. Write the output to /reports/weekly-status-[date].md
5. Keep it under 400 words. No filler, no restating the obvious.`}
      </pre>
      <p>
        Drop that file in the scoped folder&apos;s skills directory and
        every future &quot;build the weekly status report&quot; request in
        that folder follows the same structure automatically.
      </p>

      <h2>Scheduled tasks: automation that keeps running after you close the laptop</h2>
      <p>
        A scheduled task is a Cowork job set to a human-readable cadence —
        &quot;every weekday at 8am&quot;, &quot;first Monday of the
        month&quot; — that runs in the background and writes its results to
        disk without you needing to be present. With Cowork&apos;s expansion
        to web and mobile, tasks can now run with no device online at all:
        you schedule the work, close everything, and come back to a
        finished file.
      </p>
      <p>
        This is the feature that turns Cowork from &quot;a faster way to do
        a task&quot; into &quot;a task that stops being your job.&quot; A
        weekly competitor price check, a Monday-morning inbox triage, a
        month-end expense reconciliation — anything with a fixed rhythm is a
        candidate. We go deep on specific setups worth automating first in{" "}
        <a href="/blog/claude-cowork-automations">
          Claude Cowork automations
        </a>
        .
      </p>

      <h2>Connectors: bringing your existing tools into Cowork</h2>
      <p>
        Connectors are how Cowork reaches outside the local folder into the
        apps you already run your business on — Google Drive, Gmail,
        DocuSign, and similar services — and you control exactly which ones
        are switched on through the + menu in the chat box or the
        Customize &gt; Connectors page. Nothing connects by default; each
        one is an explicit opt-in, scoped the same deliberate way folders
        are.
      </p>
      <p>
        On the organization side, Anthropic has also opened Cowork up to
        enterprise systems through a plugin framework — teams can package a
        set of connectors and skills together so an entire department starts
        from the same vetted configuration instead of everyone wiring up
        their own connections by hand. For a solo user or small team, the
        practical version of that same idea is simpler: decide once which
        two or three tools a given folder actually needs, connect only
        those, and leave the rest off.
      </p>
      <p>
        Combined with plan approval, connectors are where the safety model
        does its most important work: a connector gives Cowork reach into a
        live system, and the approval mode governs how much it can do there
        without checking in first. For a first project, it is worth turning
        on exactly one connector — whichever tool the task actually needs —
        rather than switching everything on at once. Once you have watched
        Cowork use that one connector safely a few times, adding a second one
        is a much smaller leap of faith than starting with all of them
        enabled.
      </p>

      <h2>Who Claude Cowork is actually for</h2>
      <p>
        Cowork is built for the person who has a folder of real files and a
        recurring, describable job to do with them — not for people writing
        software. Anthropic&apos;s own usage breakdown backs this up: the
        largest share of Cowork tasks is business process operations, with
        content creation and copywriting close behind, and software
        development a distant third. If your week involves spreadsheets,
        reports, client folders, or recurring admin, Cowork was built with
        you in mind. Our broader{" "}
        <a href="/blog/claude-for-business">Claude for business guide</a>{" "}
        covers where Cowork fits alongside Claude&apos;s other business
        tools.
      </p>
      <p>
        In practice, that means a good Cowork candidate looks like this:
        there is a folder that already exists (client files, weekly reports,
        research notes), the task is something you have done more than once
        by hand, and the output is a file, not a conversation. Operations
        managers reconciling data across spreadsheets, marketers repurposing
        a folder of assets into channel-specific formats, and consultants
        who keep a working folder per engagement all fit that pattern
        directly. A one-time question, by contrast, is still better handled
        in plain chat — spinning up a scoped folder and a plan for something
        you will never repeat is more setup than the task deserves.
      </p>
      <p>
        It is a poor fit for a single quick question — that is what chat is
        for — and it is not a code editor, even though it can technically
        touch code files. If your work is genuinely software development,
        our{" "}
        <a href="/blog/claude-cowork-vs-claude-code">
          Cowork vs Claude Code comparison
        </a>{" "}
        will point you to the right tool faster than trial and error will.
      </p>

      <h2>Your first Cowork automation, step by step</h2>
      <p>
        The fastest way to understand Cowork is to run one real task
        end-to-end rather than reading about it further. Here is the setup
        that gets a first-timer to a finished, useful result in under 20
        minutes.
      </p>

      {/* ── First automation steps ── */}
      <div className="not-prose my-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
        <p className="text-center font-semibold text-slate-800 mb-6 text-lg">
          First Cowork Task in Under 20 Minutes
        </p>
        <div className="flex flex-col gap-0 items-center">
          <div className="w-full max-w-lg rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 text-blue-800 text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Pick one small, real folder
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Not your whole Documents drive. A single project or client
                  folder with 5-20 files is the right size to start.
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
                  Scope Cowork to that folder
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Open Cowork and select the folder as the working
                  directory. This is the only place Claude can act.
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
                  Set the mode to Manually approve
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Watch the first plan carefully. You&apos;ll switch to Auto
                  once you trust how Cowork behaves in this folder.
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
                  Describe the job in plain English
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Say what you want done and what &quot;done&quot; looks like. Review
                  the plan Cowork proposes before approving it.
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
                  Turn the winning task into a schedule
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Once the task produces a file you&apos;d actually use, schedule
                  it to run on its own cadence and stop doing it by hand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p>A prompt that works well for that first run, adjusted to your folder:</p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Look at every file in this folder. Build a single summary document
that lists:
- what each file is and its last-modified date
- anything that looks incomplete, outdated, or inconsistent with
  the others
- a short recommended next action for each flagged item

Save the result as summary-[today's date].md in this folder.
Show me your plan before you start.`}
      </pre>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want a live walkthrough instead of reading one more guide?
        </p>
        <p className="mt-2 text-slate-700">
          Inside AItomation Academy, 1,200+ professionals share their actual
          Cowork setups on a weekly live call — folder structures, skills,
          and the automations that stuck.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Frequently asked questions</h2>

      <h3>Does Claude Cowork cost extra on top of Claude Pro?</h3>
      <p>
        Availability depends on your plan, and Anthropic has been rolling
        Cowork out gradually across desktop, web, and mobile. Our{" "}
        <a href="/blog/claude-cowork-pricing">Cowork pricing guide</a> has
        the current breakdown by plan so you&apos;re not guessing.
      </p>

      <h3>Can Cowork delete or overwrite files I care about?</h3>
      <p>
        Yes, within whatever folder you&apos;ve scoped it to — that is
        exactly why plan approval and starting in Manually approve mode
        matter. Folder scoping limits where Claude can act; it does not
        remove the need to review what it&apos;s about to do inside that
        folder, especially the first few times.
      </p>

      <h3>Is Claude Cowork the same as Claude Code?</h3>
      <p>
        No. Claude Code is built for software development in a code
        repository; Cowork is built for non-technical, file-and-folder work
        like reports, research, and admin. See{" "}
        <a href="/blog/claude-cowork-vs-claude-code">
          Cowork vs Claude Code
        </a>{" "}
        for the full comparison.
      </p>

      <h3>What happens if a scheduled task goes wrong while I&apos;m away?</h3>
      <p>
        Cowork writes results to disk rather than taking irreversible
        external actions unless you&apos;ve explicitly approved that
        connector and mode combination. Start any new scheduled task in
        Manually approve or Automatically approve mode until you&apos;ve
        seen it run correctly a few times, then loosen the mode once you
        trust it.
      </p>
    </>
  ),
};
