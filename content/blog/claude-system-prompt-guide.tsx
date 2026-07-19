import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-system-prompt-guide",
  title: "Claude System Prompts: A Non-Dev Guide",
  description:
    "What a Claude system prompt is, how Project instructions and Styles give you the same control, and how to write persistent instructions that stick.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Guides",
  tags: [
    "Claude",
    "claude system prompt",
    "claude system prompts",
    "custom instructions",
    "claude projects",
    "claude styles",
    "prompt engineering",
    "persistent instructions",
    "claude guide",
  ],
  body: (
    <>
      <p>
        A Claude system prompt is a standing instruction that shapes every
        response before your message even arrives — a layer of context Claude
        reads first, every time, so you stop repeating yourself. Developers
        set these through the API. Everyone else gets the same control
        through two features already sitting inside the Claude app: Project
        custom instructions and Styles. This guide explains what a system
        prompt actually does, why the developer version and your version
        solve the same problem, and how to write persistent instructions that
        hold up over dozens of conversations instead of degrading into vague
        noise.
      </p>
      <p>
        If you have not yet worked through prompting fundamentals, start with
        our{" "}
        <a href="/blog/claude-prompting-guide">Claude prompting guide</a> —
        this article assumes you can already write a decent single prompt and
        focuses specifically on the instructions that persist across many of
        them.
      </p>

      <h2>What a system prompt is, in plain terms</h2>
      <p>
        A system prompt is the instruction layer that runs before your actual
        question — it tells Claude who to be, what to prioritize, and what
        rules to follow, and it applies to every message in the conversation
        rather than just the one you just typed. Developers building on the{" "}
        <a
          href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Claude API
        </a>{" "}
        set this directly: a block of text passed alongside every request
        that establishes role, tone, constraints, and output format ahead of
        the user&apos;s message.
      </p>
      <p>
        You do not have API access, and you do not need it. The mental model
        is simple: anywhere you can save an instruction once and have Claude
        apply it automatically going forward, you are using a system prompt
        in every practical sense — you are just doing it through the
        interface instead of through code. That is the entire premise of this
        article, and it is why the concept is worth understanding even if you
        never touch a line of code.
      </p>

      <h2>The two places you already control this</h2>
      <p>
        Claude gives non-developers two user-facing equivalents of a system
        prompt, and they solve different problems. Confusing them is the
        single most common reason people give up on &quot;customizing
        Claude&quot; after one bad attempt.
      </p>

      {/* ── Comparison table: where persistent instructions live ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Feature
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                What it controls
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Scope
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Closest equivalent to
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Project custom instructions
              </td>
              <td className="py-4 px-6 text-slate-700">
                Context, role, rules, and facts specific to one body of work
              </td>
              <td className="py-4 px-6 text-slate-700">
                One Project (all chats inside it)
              </td>
              <td className="py-4 px-6 text-slate-700">
                A developer system prompt scoped to one app
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                Styles
              </td>
              <td className="py-4 px-6 text-slate-700">
                Tone, length, formatting, and voice of the response
              </td>
              <td className="py-4 px-6 text-slate-700">
                Any conversation where you apply it
              </td>
              <td className="py-4 px-6 text-slate-700">
                A system prompt&apos;s output-formatting instructions
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                One-off prompt instructions
              </td>
              <td className="py-4 px-6 text-slate-700">
                Whatever you type in the message box
              </td>
              <td className="py-4 px-6 text-slate-700">
                That single message only
              </td>
              <td className="py-4 px-6 text-slate-700">
                A user message, not a system prompt at all
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Project custom instructions carry the weight of a real system prompt:
        they load automatically into every conversation inside that Project,
        alongside any files you have uploaded, so Claude already knows who
        the client is, what the deliverable looks like, or what rules govern
        the work before you ask anything. Styles solve a narrower but equally
        persistent problem — matching voice and formatting — and can be
        built from a writing sample or a plain description, then applied
        across conversations and Projects alike. Neither requires touching a
        settings file or writing code.
      </p>

      <h2>Project instructions: the closest thing to a real system prompt</h2>
      <p>
        When you create a Project and open its custom instructions field, you
        are writing the equivalent of what a developer would pass as a system
        prompt to the API — text that Claude treats as standing context for
        every conversation in that Project, not just the current one. The
        difference from a one-off prompt is persistence: write it once, and
        every new chat in that Project inherits it without you retyping
        anything.
      </p>
      <p>
        Good Project instructions answer four questions Claude would
        otherwise have to guess at from scratch in every conversation: who
        you are, what this Project is for, what &quot;good&quot; looks like,
        and what to never do. Here is a template you can adapt directly.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`ROLE: You are supporting [your role, e.g. "a freelance brand strategist"]
working on [what this Project covers, e.g. "client X's Q3 rebrand"].

CONTEXT: [2-4 sentences of standing facts Claude should treat as always
true — client name, industry, audience, key constraints, anything you
would otherwise repeat in every chat.]

DEFAULT OUTPUT: Unless I say otherwise, [format preference, e.g. "write in
full paragraphs, not bullet lists" or "always return a table first, then
notes"]. Tone: [2-3 adjectives].

ALWAYS:
- [A standing rule, e.g. "flag any claim you are not confident about"]
- [A standing rule, e.g. "ask before assuming a number or date"]

NEVER:
- [A hard boundary, e.g. "never suggest pricing without me providing it"]
- [A hard boundary, e.g. "never use the word 'leverage' or 'synergy'"]`}
      </pre>
      <p>
        Notice what this template is not: it is not a personality
        transplant, and it is not a wall of vague adjectives like
        &quot;professional and helpful.&quot; It is a small set of concrete
        facts and rules that would otherwise cost you two or three sentences
        of retyping in every single message. That is the actual value of a
        system prompt — developer or user-facing — it removes repeated
        setup, not creativity.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want instructions and prompts you do not have to write from scratch
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has ready-made Project instruction sets and
          prompt templates across 550+ recipes, sorted by your job — copy,
          adjust the bracketed parts, and skip the blank-page problem
          entirely.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Styles: your persistent instruction for voice and format</h2>
      <p>
        A Style is a saved formatting and tone instruction you can apply on
        top of any conversation, which makes it the closest thing to a
        portable, reusable system prompt fragment that follows you across
        Projects instead of living inside just one. Claude ships with
        built-in presets — including Concise, Explanatory, and Formal —
        tuned for shorter direct replies, more educational detail, or
        business-appropriate polish, and you can also build a custom Style
        by uploading a writing sample or describing the voice you want in
        plain language.
      </p>
      <p>
        The practical split is this: Project instructions carry facts and
        rules specific to one piece of work, and Styles carry voice and
        format that should stay consistent regardless of which Project
        you are in. If you write client emails in one Project and internal
        notes in another, both can use the same &quot;Concise, no
        buzzwords&quot; Style while carrying entirely different context
        underneath.
      </p>

      <h2>Anatomy of a persistent instruction that actually holds up</h2>
      <p>
        Most custom instructions fail for the same reason most one-off
        prompts fail — they are vague where they need to be specific, and
        specific where being flexible would serve better. A persistent
        instruction gets read dozens or hundreds of times, so vagueness
        compounds instead of costing you once.
      </p>

      {/* ── Step flow: writing effective persistent instructions ── */}
      <div className="my-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
        <p className="text-center font-semibold text-slate-800 mb-6 text-lg">
          Writing Instructions That Hold Up Over 50 Conversations, Not 1
        </p>
        <div className="flex flex-col gap-0 items-center">
          <div className="w-full max-w-lg rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 text-blue-800 text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  State facts, not vibes
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  &quot;Our audience is mid-market ops managers, not
                  founders&quot; beats &quot;write for a business
                  audience.&quot; Facts do not decay across conversations;
                  vibes do.
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
                  Write rules as ALWAYS / NEVER, not paragraphs
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  A short bulleted rule is easy for Claude to apply
                  consistently. A rule buried in the third sentence of a
                  paragraph gets missed more often.
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
                  Separate what never changes from what changes per chat
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Put standing facts in the Project instructions. Put
                  per-task specifics — this week&apos;s topic, this
                  email&apos;s recipient — in the message itself.
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
                  Revisit it after real use, not before
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  You will not know which rules matter until you have run 10
                  real conversations against them. Edit the instructions
                  after you see what Claude actually gets wrong.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p>
        This is the same discipline that makes a developer&apos;s system
        prompt good instead of bloated: fewer, sharper rules outperform a
        long list of soft preferences every time, because Claude has to
        weigh every instruction against your actual message, and a pile of
        vague guidance gives it nothing firm to anchor to.
      </p>

      <h2>Mistakes that quietly break persistent instructions</h2>
      <p>
        The failure mode is rarely dramatic — it is a Project that slowly
        stops feeling &quot;tuned&quot; and starts feeling generic again,
        usually for one of a few avoidable reasons.
      </p>
      <p>
        <strong>Piling on instructions instead of editing them.</strong>{" "}
        Every time something goes wrong, it is tempting to add one more rule
        to the pile. Six months later the instructions are 40 rules long, half
        of them contradicting each other, and Claude is doing its best to
        average across noise. Edit and consolidate instead of only adding.
      </p>
      <p>
        <strong>Confusing a Style with Project instructions.</strong> Putting
        client-specific facts inside a Style means they will not travel with
        the right Project, and putting a voice preference inside Project
        instructions means you have to redefine that same voice in every new
        Project you create. Keep facts in Projects and voice in Styles.
      </p>
      <p>
        <strong>Writing instructions nobody would recognize as rules.</strong>{" "}
        &quot;Try to be helpful and thorough&quot; is not an instruction — it
        is a description of what every AI response should already do. Replace
        it with the specific thing that actually goes wrong when Claude
        guesses: a format it defaults to that you do not want, a term it
        overuses, a step it skips.
      </p>
      <p>
        <strong>Never testing against a real edge case.</strong> Custom
        instructions look fine on a simple request and fall apart on the
        messy real one — the client email with three competing asks, the
        report with an unusual data point. Test your instructions against the
        hardest version of the task you actually do, not the easiest one.
      </p>

      <h2>Where Project instructions meet the rest of your setup</h2>
      <p>
        Persistent instructions are one layer of a larger system. Once you
        have Project instructions and a Style dialed in, the natural next
        step is reusable prompt templates for the recurring tasks inside that
        Project — see our{" "}
        <a href="/blog/claude-prompt-templates">Claude prompt templates</a>{" "}
        guide for a library you can drop straight into a Project&apos;s
        conversations. And if you are wondering whether a custom instruction
        is the right tool versus a Skill or an MCP connector, our{" "}
        <a href="/blog/claude-skills-vs-mcp">Skills vs MCP guide</a> draws the
        line: instructions shape how Claude responds, Skills give it
        packaged expertise to load when relevant, and MCP connects it to
        outside tools and data.
      </p>
      <p>
        Teams evaluating Claude more broadly — beyond one person&apos;s
        Projects — should also look at our{" "}
        <a href="/blog/claude-for-business">Claude for business guide</a>,
        which covers how these same instruction patterns scale once multiple
        people share a workspace.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Get the Project instruction sets other members already built
        </p>
        <p className="mt-2 text-slate-700">
          Inside Claude Code Academy, 1,200+ professionals share the exact
          Project setups, Styles, and instruction templates they use every
          day — plus a weekly live call where you can bring your own setup
          for feedback.
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
        Pick the one Project or recurring task you use most, and write its
        custom instructions using the four questions from earlier: who you
        are, what this is for, what good looks like, and what to never do.
        Keep it short enough to reread in thirty seconds. Run it against your
        next five real tasks, then edit — do not add — based on what actually
        went wrong. That single loop is what separates a Claude setup that
        feels like it &quot;gets it&quot; from one you are still explaining
        yourself to every morning. For the prompting fundamentals underneath
        all of this, our{" "}
        <a href="/blog/claude-prompting-guide">Claude prompting guide</a> is
        the place to go deeper.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Do I need API access to use a Claude system prompt?</h3>
      <p>
        No. Developers set system prompts directly through the API, but
        anyone using the Claude app gets the same functional control through
        Project custom instructions and Styles, both accessible without
        writing any code.
      </p>

      <h3>What is the difference between a Style and Project instructions?</h3>
      <p>
        Project instructions carry facts, context, and rules specific to one
        body of work and load automatically in every chat inside that
        Project. Styles carry tone, length, and formatting preferences and
        can be applied across any conversation, in any Project.
      </p>

      <h3>How long should custom instructions be?</h3>
      <p>
        Short enough to reread in under a minute. A handful of concrete facts
        and a short ALWAYS/NEVER list outperforms a long document of soft
        preferences, because every added rule competes for weight against
        the others.
      </p>

      <h3>Can I have different instructions for different clients or tasks?</h3>
      <p>
        Yes — create a separate Project for each client or recurring body of
        work, each with its own custom instructions and uploaded files, and
        apply the same or different Styles on top depending on the voice
        each one needs.
      </p>
    </>
  ),
};
