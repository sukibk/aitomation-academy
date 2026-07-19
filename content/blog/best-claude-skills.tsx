import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "best-claude-skills",
  title: "12 Best Claude Skills, Sorted By Job",
  description:
    "The best Claude skills for writing, research, ops, design, PDF work, and LinkedIn content — what each one does and exact install steps.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Prompts",
  tags: [
    "Claude",
    "best claude skills",
    "awesome claude skills",
    "claude skills",
    "claude code skills",
    "claude skills marketplace",
    "PDF skill",
    "LinkedIn content",
    "productivity",
  ],
  body: (
    <>
      <p>
        Most &quot;awesome Claude skills&quot; roundups are a wall of links
        with no context on which ones are worth your five minutes of setup.
        This list is twelve, chosen by the job they solve — writing, research,
        ops, design, document work, and LinkedIn content — with exactly what
        each one does and how to install it, so you can skip the ones that do
        not apply to you.
      </p>
      <p>
        If you have not used skills before, start with our{" "}
        <a href="/blog/what-are-claude-skills">
          what are Claude Skills guide
        </a>{" "}
        for the basics. This article assumes you know the concept and want the
        shortlist.
      </p>

      <h2>What makes a skill worth installing</h2>
      <p>
        A skill is a folder of instructions Claude loads only when the task
        calls for it, so a good one does something Claude would otherwise do
        inconsistently by default — not something a single well-written
        prompt already handles. The twelve below meet that bar: they either
        ship from Anthropic&apos;s own public skills repository or they are a
        pattern worth building yourself with the skill-creator skill covered
        in category six.
      </p>
      <p>
        A quick note on scope: some of these are built for{" "}
        <a href="/blog/claude-code-skills">Claude Code</a>, some work in the
        Claude.ai app, and several work in both. Each entry says where it
        runs. For the full browsing experience — categories, search, and new
        additions — see our{" "}
        <a href="/blog/claude-skills-marketplace">
          Claude skills marketplace guide
        </a>
        .
      </p>

      <h2>How to install any skill in two minutes</h2>
      <p>
        Installation differs slightly between Claude.ai and Claude Code, but
        both are fast once you have done it once. Here is the process for
        each.
      </p>

      {/* ── Install steps graphic ── */}
      <div className="my-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6 not-prose">
        <p className="text-center font-semibold text-slate-800 mb-6 text-lg">
          Installing a Skill: Two Paths
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-5">
            <p className="font-semibold text-blue-800 mb-3">Claude.ai (web app)</p>
            <div className="space-y-3 text-sm text-blue-700">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 text-xs font-bold">1</span>
                <span>Download the skill folder as a ZIP file</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 text-xs font-bold">2</span>
                <span>Open Settings &gt; Customize &gt; Skills</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 text-xs font-bold">3</span>
                <span>Upload the ZIP and turn the skill on</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 md:p-5">
            <p className="font-semibold text-purple-800 mb-3">Claude Code (terminal)</p>
            <div className="space-y-3 text-sm text-purple-700">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-200 text-purple-800 text-xs font-bold">1</span>
                <span>Run <code>/plugin</code> and open the Discover tab</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-200 text-purple-800 text-xs font-bold">2</span>
                <span>Find the plugin and press Enter to install</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-200 text-purple-800 text-xs font-bold">3</span>
                <span>Choose scope: User (all projects) or Project (this repo only)</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">
          Skills are available on Free, Pro, Max, Team, and Enterprise plans.
          Claude.ai skills require code execution to be turned on.
        </p>
      </div>

      <p>
        Claude decides on its own when a relevant skill applies to your
        request — you do not need to invoke it by name, though naming it
        explicitly (&quot;use the PDF skill to...&quot;) helps on the first
        try while you are getting a feel for what each one does.
      </p>

      <h2>Skill, Project, or a good prompt — which do you actually need</h2>
      <p>
        Not every repeated task needs a skill, and installing one for
        something a well-written prompt already handles just adds clutter to
        your skills list. The three tools solve different problems, and
        knowing which one you need saves you from over-engineering a task
        that was never the bottleneck.
      </p>
      <p>
        A good prompt is the right tool when the task is a one-off, or when
        the instructions fit comfortably in a paragraph you are willing to
        retype. A Claude Project is the right tool when the task repeats but
        the thing that changes is context — client documents, past
        conversations, a knowledge base you want Claude to draw on every
        time. A skill is the right tool when the task repeats and what
        changes is not the context but the output format or process itself —
        a spreadsheet that always needs the same structure, a document that
        always needs tracked-changes editing, a LinkedIn post that always
        needs the same voice rules applied. If you are not sure which
        applies, start with a prompt; only graduate to a skill once you have
        typed roughly the same instructions three or four times.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Skip evaluating skills one by one
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has 550+ prompts and skills pre-sorted by job —
          writing, research, ops, design, and more — so you install what
          matches your actual week instead of guessing from a list.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>1. Writing: doc-coauthoring and internal-comms</h2>
      <p>
        Writing is where most people spend the most Claude time, and these
        two skills fix the two most common failure modes: documents that
        degrade the longer you edit them, and internal messages that do not
        sound like your company.
      </p>
      <p>
        <strong>doc-coauthoring</strong> keeps Claude working like a real
        co-writer across a long document — it tracks what has already been
        drafted, edits in place instead of regenerating the whole piece, and
        preserves your structure and voice through multiple revision rounds.
        Use it for anything longer than a page that you plan to revise more
        than once: reports, proposals, strategy docs.
      </p>
      <p>
        <strong>internal-comms</strong> is built for company-facing writing —
        announcements, policy updates, all-hands recaps — where tone and
        format consistency matter more than creative flair. Load your past
        announcements once and every future one matches the house style
        automatically. Marketers writing external copy instead should start
        with our <a href="/blog/claude-for-marketers">Claude for marketers</a>{" "}
        guide, which covers ad copy, landing pages, and email specifically.
      </p>

      <h2>2. Research: xlsx and web-artifacts-builder</h2>
      <p>
        Research work has two bottlenecks — turning raw numbers into an
        analysis, and turning that analysis into something a stakeholder can
        actually explore instead of a static page of text.
      </p>
      <p>
        <strong>xlsx</strong> reads, builds, and edits real spreadsheets:
        formulas, pivot-style summaries, and formatted output, not just a
        table pasted into chat. Feed it a messy export and ask for a clean
        summary workbook with the calculations already built in.
      </p>
      <p>
        <strong>web-artifacts-builder</strong> turns findings into an
        interactive artifact — a filterable dataset, a small dashboard, a
        calculator — instead of a wall of paragraphs. For research you
        present more than once, an artifact a stakeholder can click through
        beats a report they skim once and forget.
      </p>

      <h2>3. Ops: webapp-testing and mcp-builder</h2>
      <p>
        Ops work is repetitive by nature, which is exactly what skills are
        for. These two cover the two ends of that spectrum: checking that
        something still works, and connecting Claude to the tools your
        operations actually run on.
      </p>
      <p>
        <strong>webapp-testing</strong> drives a real browser to click
        through a web app the way a user would, then reports back what broke.
        Useful for anyone who owns a site, form, or internal tool and wants a
        standing check instead of manually clicking through it before every
        release.
      </p>
      <p>
        <strong>mcp-builder</strong> is the skill that helps Claude build the
        connectors — MCP servers — that link it to your CRM, ticketing
        system, or internal database. It is more technical than the rest of
        this list, but it is the difference between Claude answering
        questions about your ops stack and Claude actually acting inside it.
      </p>

      <h2>4. Design: brand-guidelines and theme-factory</h2>
      <p>
        Design skills solve the same problem from two directions: making sure
        Claude&apos;s output matches your brand, and making sure a visual
        artifact has a coherent look before you spend time polishing it by
        hand.
      </p>
      <p>
        <strong>brand-guidelines</strong> loads your colors, fonts, logo
        rules, and voice once, then applies them automatically to anything
        Claude produces afterward — decks, one-pagers, social graphics —
        instead of you correcting the same three things every time.
      </p>
      <p>
        <strong>theme-factory</strong> generates a consistent visual theme —
        palette, spacing, type scale — for a page or artifact in one pass, so
        a first draft looks intentional instead of like unstyled boilerplate
        you have to dress up afterward.
      </p>

      <h2>5. Documents: pdf and docx</h2>
      <p>
        This is the category most people mean when they search &quot;best
        Claude skills&quot; — the two that make Claude genuinely useful for
        the document formats an office actually runs on.
      </p>
      <p>
        <strong>pdf</strong> extracts text, tables, and form fields from PDFs
        and can also generate new PDFs from scratch — contracts, reports,
        filled forms — with real formatting instead of a markdown dump you
        have to convert yourself.
      </p>
      <p>
        <strong>docx</strong> creates and edits Word documents natively:
        headings, styles, tracked changes, and comments that open correctly
        in Word, not a plain-text file with the formatting stripped out.
        Between pdf and docx, most weekly document requests — read this
        contract, draft this report, fill this form — are covered.
      </p>

      <h2>6. LinkedIn and social: pptx and skill-creator</h2>
      <p>
        There is no official Anthropic skill named &quot;LinkedIn&quot; — and
        any marketplace listing claiming one should be treated with
        suspicion. What actually works for LinkedIn and social content is one
        official skill used slightly sideways, plus the one skill built for
        exactly this situation.
      </p>
      <p>
        <strong>pptx</strong> builds and edits slide decks — and a LinkedIn
        carousel is, structurally, a slide deck. Ask for a 6-slide carousel on
        your topic and pptx will produce properly formatted slides you export
        as images, instead of you fighting Canva for twenty minutes.
      </p>
      <p>
        <strong>skill-creator</strong> is the meta-skill: it helps Claude
        build a new skill from a description of what you want repeated
        consistently. For LinkedIn specifically, that means turning your
        voice, hook style, and formatting rules into a skill Claude applies
        to every post — instead of you re-explaining your voice in every new
        chat. Here is the starting prompt:
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Use the skill-creator skill to build me a "linkedin-voice" skill.

What it should enforce every time I ask for a LinkedIn post:
- Hook in the first line, no question openers
- First person, my actual opinions, no corporate "we"
- 150-250 words, short paragraphs, no more than 2 hashtags
- No buzzwords: "unlock," "game-changer," "delve," "leverage"
- Always end with a plain statement or a genuine question, not a CTA

Voice reference (paste 2-3 of my actual past posts below):
"""
[paste your best-performing LinkedIn posts here]
"""

Package this as a skill I can reuse across every future LinkedIn
post, and tell me how to install it.`}
      </pre>

      <div className="my-8 rounded-xl border border-amber-200 bg-amber-50/70 p-4 md:p-6 not-prose">
        <p className="text-sm font-semibold text-amber-900 mb-1">
          Want the LinkedIn skill and 550+ others already built?
        </p>
        <p className="text-sm text-amber-800">
          Inside AItomation Academy you get the full Vault, live workshops,
          and a weekly call with 1,200+ professionals already running these
          skills daily.
        </p>
        <a
          href="/skool-redirect"
          className="mt-3 inline-block rounded-lg bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-700 transition-colors"
        >
          Join the free community &rarr;
        </a>
      </div>

      <h2>Which one to install first</h2>
      <p>
        Do not install all twelve today. Pick the one skill that matches the
        task eating the most of your week right now, install it, and use it
        on a real piece of work before adding a second one.
      </p>

      {/* ── Quick-pick table ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">If your biggest time sink is...</th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">Install this first</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="py-4 px-6 text-slate-700">Long reports and proposals that drift as you edit</td><td className="py-4 px-6 text-slate-900 font-medium">doc-coauthoring</td></tr>
            <tr><td className="py-4 px-6 text-slate-700">Cleaning up messy spreadsheet exports</td><td className="py-4 px-6 text-slate-900 font-medium">xlsx</td></tr>
            <tr><td className="py-4 px-6 text-slate-700">Manually re-clicking through a site before every release</td><td className="py-4 px-6 text-slate-900 font-medium">webapp-testing</td></tr>
            <tr><td className="py-4 px-6 text-slate-700">Decks and one-pagers that never match brand</td><td className="py-4 px-6 text-slate-900 font-medium">brand-guidelines</td></tr>
            <tr><td className="py-4 px-6 text-slate-700">Reading and filling out PDFs by hand</td><td className="py-4 px-6 text-slate-900 font-medium">pdf</td></tr>
            <tr><td className="py-4 px-6 text-slate-700">Rewriting your LinkedIn voice from scratch every post</td><td className="py-4 px-6 text-slate-900 font-medium">skill-creator</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        Once the first skill has earned its place in your workflow for a
        week or two, add the next one from the category that matters most to
        your job. This is the same install-one-at-a-time approach we
        recommend across every Claude workflow — it is slower than
        installing everything at once, but it is the reason people actually
        keep using skills instead of forgetting they installed them.
      </p>
      <p>
        The most common mistake with any &quot;best skills&quot; list,
        including this one, is treating it as a checklist to install in full
        on day one. A skill you never invoke is not a productivity gain, it
        is one more menu item to scroll past. Twelve skills used well beats
        thirty installed and forgotten — pick based on the table above, not
        on which name sounds most impressive.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Are these skills free?</h3>
      <p>
        Yes. Skills are available on Free, Pro, Max, Team, and Enterprise
        Claude plans — the plan changes your usage limits, not which skills
        you can install. Claude.ai skills do require code execution to be
        enabled in settings.
      </p>

      <h3>Do I need Claude Code to use any of these?</h3>
      <p>
        No. Most of the twelve — doc-coauthoring, internal-comms, xlsx,
        brand-guidelines, theme-factory, pdf, docx, pptx, skill-creator — run
        fine in the Claude.ai web app. webapp-testing and mcp-builder are
        more developer-oriented and are typically installed inside{" "}
        <a href="/blog/claude-code-skills">Claude Code</a> instead.
      </p>

      <h3>Can I write my own skill instead of using these?</h3>
      <p>
        Yes, and skill-creator is built for exactly that. A skill is just a
        folder with a SKILL.md file describing what Claude should do
        consistently — if none of these twelve match a repetitive task you
        have, describe that task to skill-creator and it will package one for
        you. This is also the better long-term move for anything highly
        specific to your business, since a skill you build yourself can
        encode rules — your exact approval process, your specific client
        list, your house style guide — that a general-purpose skill from a
        public repository never will.
      </p>

      <h3>Where do I find more skills beyond this list?</h3>
      <p>
        Our{" "}
        <a href="/blog/claude-skills-marketplace">
          Claude skills marketplace guide
        </a>{" "}
        covers browsing the full catalog, and Anthropic&apos;s own{" "}
        <a href="https://claude.com" target="_blank" rel="noopener noreferrer">
          claude.com
        </a>{" "}
        lists official skills directly. Treat third-party marketplace sites
        claiming skills Anthropic has not published with the same skepticism
        you would any unverified plugin.
      </p>
    </>
  ),
};
