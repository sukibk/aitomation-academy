import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-skills-marketplace",
  title: "Claude Skills Marketplace: Where to Get Skills",
  description:
    "There is no single Claude Skills marketplace. Here is an honest comparison of official plugins, GitHub, and curated libraries like the Claude Vault.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Use Cases",
  tags: [
    "Claude",
    "claude skills marketplace",
    "skills for claude",
    "claude skills",
    "claude plugins",
    "agent skills",
    "claude code",
    "claude vault",
    "prompt library",
  ],
  body: (
    <>
      <p>
        There is no single &quot;Claude Skills Marketplace&quot; the way
        there is an Apple App Store or a Chrome Web Store. What actually
        exists is three very different places to get skills for Claude —
        Anthropic&apos;s own plugin directory, a sprawling and uneven GitHub
        ecosystem, and a handful of curated libraries that charge money to do
        the sorting for you. Each has a real tradeoff, and this guide walks
        through all three honestly so you pick the right one for how you
        actually work.
      </p>
      <p>
        If you are new to the concept, start with our{" "}
        <a href="/blog/what-are-claude-skills">
          plain-English explainer on what Claude Skills are
        </a>{" "}
        before you go shopping for them — knowing what a skill actually does
        makes every option below easier to evaluate.
      </p>

      <h2>There is no single Claude Skills marketplace — yet</h2>
      <p>
        Searching &quot;claude skills marketplace&quot; suggests a
        centralized storefront, but what you land on is closer to three
        parallel ecosystems: Anthropic&apos;s official, reviewed directory;
        an open GitHub landscape anyone can publish to; and independent
        creators packaging their own tested collections. None of them is
        wrong. They just serve different people at different stages of
        comfort with installing things onto their machine, and confusing
        them is how people end up either overpaying for something free or
        installing something they should not trust.
      </p>
      <p>
        The distinction that matters most before you install anything: a
        skill is a folder containing a{" "}
        <code>SKILL.md</code> instruction file (plus optional scripts and
        resources) that Claude loads when it is relevant to your task. A
        plugin is a larger bundle that can include one or more skills, plus
        commands, agents, hooks, and MCP server connections. Most of what
        people call &quot;skills&quot; in casual conversation ships inside
        plugins — which is why the official directory is organized around
        plugins, not a flat list of skills.
      </p>
      <p>
        That framing matters because it changes what you are actually
        searching for. If you want Claude to reliably format a proposal the
        same way every time, you want a skill. If you want Claude to also
        pull ticket data from Jira or push a commit to GitHub while it does
        that work, you want a plugin that bundles a skill with an MCP
        connection. Conflating the two is the fastest way to end up
        installing something far heavier than the job actually required.
      </p>

      <h2>Option 1: Anthropic&apos;s official plugin directory</h2>
      <p>
        The official marketplace, called{" "}
        <code>claude-plugins-official</code>, is automatically available the
        moment you open Claude Code — no setup required. Run{" "}
        <code>/plugin</code> and open the Discover tab, or browse the same
        catalog at{" "}
        <a href="https://claude.com" target="_blank" rel="noopener noreferrer">
          claude.com
        </a>
        . Anthropic reviews and curates every entry, covering categories like
        source control integrations (GitHub, GitLab), project management
        (Jira, Asana, Linear, Notion), design (Figma), infrastructure
        (Vercel, Firebase, Supabase), monitoring (Sentry), and development
        workflows like commit automation and PR review.
      </p>
      <p>
        Sitting next to it is a separate, still-official public repository
        of Agent Skills that Anthropic maintains directly — a smaller,
        more focused set of example skills spanning creative tasks, testing
        workflows, and enterprise document work. It exists specifically to
        show what a well-built skill looks like, which makes it a good
        reference even if you end up writing your own.
      </p>
      <p>
        There is also a community marketplace,{" "}
        <code>claude-plugins-community</code>, that Anthropic runs
        automated safety screening against before anything gets listed —
        but it is not editorially reviewed the way the official directory
        is. You add it with{" "}
        <code>/plugin marketplace add</code> rather than getting it by
        default, which is a deliberate signal that it carries more trust-at-
        your-own-risk than the official one.
      </p>
      <p>
        The honest tradeoff with the official directory: it is small and
        skews toward developer-tool integrations. If you are a marketer,
        consultant, or operator looking for a skill that drafts SOWs or
        reformats meeting notes, you will not find much here yet. It is the
        safest source, not the deepest one.
      </p>

      <h2>Option 2: GitHub — the biggest source, and the messiest</h2>
      <p>
        GitHub is where the actual volume lives. Search for skill and plugin
        repositories and you will find community collections claiming
        hundreds or even thousands of individual skills, curated
        &quot;awesome list&quot; style repos that organize skills by
        category, and thousands of one-off skills built by individual
        developers for a narrow personal use case and shared publicly
        afterward.
      </p>
      <p>
        The appeal is obvious: it is free, it is enormous, and if you know
        what to search for, you can usually find someone who already built
        the skill you need. The catch is equally obvious once you have spent
        an afternoon there. Quality is wildly inconsistent — a repo with a
        thousand skills often means a thousand different authors with a
        thousand different levels of care, no consistent testing, and no
        one accountable if a <code>SKILL.md</code> file quietly breaks after
        a Claude update. Duplication is rampant; the same idea gets rebuilt
        under five different names with five different bugs. And because
        anyone can publish a skill, you are trusting whatever instructions
        and scripts are bundled inside it — worth treating with real
        caution, especially anything that bundles executable scripts rather
        than plain markdown instructions.
      </p>
      <p>
        GitHub is the right source when you have a specific, narrow need,
        you are comfortable reading through a <code>SKILL.md</code> file
        before you trust it, and you do not mind the time cost of
        evaluating five candidates to find one good one. It is the wrong
        source if what you want is a reliable set of skills for your actual
        job, ready today, with someone else having already done the quality
        control.
      </p>

      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Before I install this, review it for me.

Here is the SKILL.md and any accompanying files from a skill I found
on GitHub:
"""
[paste the full SKILL.md content, plus any scripts it includes]
"""

Tell me:
1. In plain language, what does this skill actually do when Claude
   loads it?
2. Does it execute any scripts, call external URLs, or read/write
   files outside what it needs to do its stated job? Flag anything
   suspicious specifically.
3. Is the instruction quality good — clear, specific, testable — or
   vague and likely to produce inconsistent results?
4. Would you recommend installing this as-is, installing with
   modifications, or skipping it? Be direct.`}
      </pre>
      <p>
        Run that prompt before installing anything you did not write
        yourself. It takes two minutes and it is the single best habit for
        using the GitHub ecosystem safely.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Skip the sorting entirely
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault is 550+ tested prompts and skills, sorted by job —
          marketing, consulting, ops, content, sales — so you are not
          evaluating five GitHub candidates to find one good one. Every
          entry is built and checked before it ships.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Option 3: Curated paid libraries, and what you are actually paying for</h2>
      <p>
        The third option is a curated library — a smaller, deliberately
        limited set of skills and prompts, built and tested by one team, and
        sold or bundled rather than crowdsourced. This is where a resource
        like the Claude Vault sits: 550+ recipes organized by job function
        instead of alphabetically or by star count, with each one built to
        produce a finished output rather than a starting point you still
        have to shape.
      </p>
      <p>
        What you are paying for is not access to something you could not
        find for free eventually — it is the removal of the sorting
        problem. Free sources are free at the point of download and
        expensive at the point of evaluation: every skill you install is
        time spent reading, testing, and often discarding. A curated paid
        library moves that cost from your afternoon to the person who built
        it, once, for everyone.
      </p>
      <p>
        That trade is worth it for people whose time is worth more than the
        subscription cost, and worth skipping for people who enjoy the
        hunting and have the hours to spend on it. Neither is the
        &quot;correct&quot; choice in the abstract — it depends on what your
        hour is worth and how much you like sifting through GitHub search
        results on a Tuesday night.
      </p>

      <h2>Comparing all three sources honestly</h2>
      <p>
        Here is the comparison without the marketing gloss — cost, quality
        control, breadth, and who each option actually fits.
      </p>

      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">Source</th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">Cost</th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">Quality control</th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">Best for</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 text-slate-700 font-medium">Official Anthropic directory</td>
              <td className="py-4 px-6 text-slate-700">Free</td>
              <td className="py-4 px-6 text-slate-700">Editorially reviewed</td>
              <td className="py-4 px-6 text-slate-700">Dev-tool integrations (GitHub, Jira, Figma, Sentry)</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700 font-medium">Community marketplace</td>
              <td className="py-4 px-6 text-slate-700">Free</td>
              <td className="py-4 px-6 text-slate-700">Automated safety scan only</td>
              <td className="py-4 px-6 text-slate-700">Developers comfortable vetting entries themselves</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700 font-medium">Raw GitHub repos</td>
              <td className="py-4 px-6 text-slate-700">Free</td>
              <td className="py-4 px-6 text-slate-700">None — you are the reviewer</td>
              <td className="py-4 px-6 text-slate-700">Narrow, specific needs; technically comfortable users</td>
            </tr>
            <tr className="bg-slate-50 border-t-2 border-slate-200">
              <td className="py-4 px-6 font-bold text-slate-900">Curated library (Claude Vault)</td>
              <td className="py-4 px-6 font-bold text-slate-900">Paid, one-time</td>
              <td className="py-4 px-6 font-bold text-slate-900">Built and tested by one team</td>
              <td className="py-4 px-6 font-bold text-slate-900">Non-technical professionals who want it working today</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Pricing on Claude itself is a separate question from where you get
        skills — if you have not settled on a plan yet, our{" "}
        <a href="/blog/is-claude-ai-free-pricing-guide">
          Claude pricing guide
        </a>{" "}
        breaks down free vs Pro vs Max, since some skills and Projects
        features require a paid plan to use at all.
      </p>

      <h2>How to actually install a plugin once you have picked a source</h2>
      <p>
        Whichever source you choose, the mechanics in Claude Code are the
        same two-step process: add the marketplace, then install the
        specific plugin you want.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`# The official marketplace is already available — no add step needed.
/plugin install github@claude-plugins-official

# Third-party marketplaces need to be added first.
/plugin marketplace add owner/repo-name
/plugin install plugin-name@repo-name

# After installing, activate changes without restarting:
/reload-plugins`}
      </pre>
      <p>
        A useful habit regardless of source: check a plugin&apos;s detail
        view before installing. Claude Code shows you exactly what
        commands, skills, agents, hooks, and MCP or LSP servers a plugin
        will add, plus a rough estimate of how much context it will cost you
        on every turn. Read that before you click install, not after.
      </p>

      <h2>Which source actually fits your situation</h2>
      <p>
        There is a version of this decision that has nothing to do with
        which source is objectively best and everything to do with what you
        are optimizing for this week: coverage, safety, or speed to a
        finished workflow. Picking based on habit — always GitHub, always
        the official directory — is how people end up either missing a
        perfectly good skill or wasting an afternoon vetting five broken
        ones when a tested option already existed.
      </p>
      <p>
        If you are a developer integrating Claude Code into an existing
        toolchain — GitHub, Jira, Figma, Sentry — start with the official
        directory. It is free, reviewed, and covers exactly that use case
        well.
      </p>
      <p>
        If you have a narrow, unusual need and enjoy digging, GitHub will
        eventually have something close to what you want — just run every
        candidate through the audit prompt above first, and budget real time
        for the search.
      </p>
      <p>
        If you are a marketer, consultant, coach, or operator who wants
        skills that produce finished work — not a starting point you still
        have to shape — a curated library is the faster path. For a
        shortlist of specific skills worth having regardless of source, see
        our{" "}
        <a href="/blog/best-claude-skills">
          roundup of the best Claude Skills
        </a>
        . And if what you actually need is reusable prompts rather than
        installable skills, our{" "}
        <a href="/blog/claude-prompt-library">Claude prompt library</a>{" "}
        covers that adjacent territory.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want the sorting done and a place to ask questions?
        </p>
        <p className="mt-2 text-slate-700">
          Inside AItomation Academy you get the full Claude Vault, structured
          courses, and a weekly live call — with 1,200+ professionals
          comparing notes on what actually works.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Frequently asked questions</h2>

      <h3>Is there an official Claude Skills store?</h3>
      <p>
        Not a dedicated skills store specifically — Anthropic&apos;s
        official plugin directory, <code>claude-plugins-official</code>,
        covers skills as part of larger plugin bundles, and it ships
        automatically inside Claude Code. A separate, smaller public
        repository of example Agent Skills also exists directly from
        Anthropic for reference.
      </p>

      <h3>Are skills from GitHub safe to install?</h3>
      <p>
        Some are, many are fine, and a few are not worth the risk. Because
        anyone can publish a skill, treat every one you did not write
        yourself as untrusted until you have read the <code>SKILL.md</code>{" "}
        and any bundled scripts, or run it through an audit prompt like the
        one above. Prefer skills that are plain instructions over ones that
        bundle executable code you have not reviewed.
      </p>

      <h3>Is a paid skills library actually worth it over free options?</h3>
      <p>
        It depends on what your time is worth. Free sources cost you hours
        of evaluation before you find something reliable; a curated paid
        library shifts that cost to the people who built and tested it. If
        you would rather spend an afternoon working than searching, it is
        worth it. If you enjoy the search and have the time, it is not
        necessary.
      </p>

      <h3>Can I use skills without Claude Code?</h3>
      <p>
        Skills also work inside Claude&apos;s desktop and web apps and
        inside Cowork, not just the terminal CLI — the installation
        mechanics differ by surface, but the underlying skill format is the
        same everywhere.
      </p>

      <h3>Will an official, unified skills marketplace ever exist?</h3>
      <p>
        Possibly, and the pieces are already converging in that direction —
        the official directory has grown past 200 listed plugins, and the
        community marketplace now runs through the same automated review
        pipeline rather than sitting completely outside it. Until Anthropic
        merges discovery, review, and installation into one surface, though,
        the practical answer stays the same: know which of the three
        ecosystems you are pulling from before you install anything, because
        the trust level is not the same across all of them.
      </p>
    </>
  ),
};
