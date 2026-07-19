import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-prompt-generator",
  title: "Claude Prompt Generator: The Meta-Prompt Template",
  description:
    "Turn Claude into your own claude prompt generator with one meta-prompt template, an improver workflow, and 5 ready-made generators to copy.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Prompts",
  tags: [
    "Claude",
    "claude prompt generator",
    "meta prompt",
    "prompt engineering",
    "claude prompts",
    "prompt improver",
    "ai prompts",
    "productivity",
  ],
  body: (
    <>
      <p>
        A claude prompt generator is not a separate tool you have to go find
        — it is Claude, given the right instructions, writing your next
        prompt for you. Instead of staring at a blank chat box trying to
        phrase what you want, you hand Claude a short brief and it hands back
        a structured, ready-to-run prompt built on the same techniques
        Anthropic&apos;s own prompt engineering team uses.
      </p>
      <p>
        This guide gives you the full meta-prompt template, a workflow for
        improving prompts you already have, a clear answer to when generated
        prompts actually beat handwritten ones, and five ready-made generator
        templates for common jobs. Everything below works in the{" "}
        <a href="https://claude.com" target="_blank" rel="noopener noreferrer">
          Claude
        </a>{" "}
        app — no console, no API key, no code.
      </p>

      <h2>What a claude prompt generator actually is</h2>
      <p>
        A prompt generator is a prompt whose job is to produce another
        prompt — you describe the task, and Claude returns a structured
        template with role, context, instructions, and format built in. This
        is the same idea behind Anthropic&apos;s own console tools: the{" "}
        <a
          href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          prompt generator
        </a>{" "}
        in the developer Console exists specifically to solve what Anthropic
        calls the &quot;blank page problem&quot; — giving you a solid
        starting point instead of a blinking cursor. You do not need console
        access to get the same benefit. You can run the identical pattern as
        a plain conversation in the Claude app, which is exactly what the
        meta-prompt below does.
      </p>
      <p>
        The technique of asking a model to write prompts for itself is often
        called meta-prompting, and it works because Claude has absorbed
        thousands of examples of well-structured prompts during training. Ask
        it to apply that pattern to your specific task, and it will draft a
        far more complete prompt than most people write by hand on a first
        try — with role framing, explicit constraints, and an output format
        already specified. If you have not read the fundamentals yet, our{" "}
        <a href="/blog/claude-prompting-guide">Claude prompting guide</a> is
        the hub for how Claude reads instructions in the first place.
      </p>

      <h2>The full meta-prompt template</h2>
      <p>
        This is the core template. Paste it into Claude, fill in the four
        bracketed fields, and Claude will return a complete, ready-to-use
        prompt for your task — not a vague description of what a prompt
        should contain, but the actual prompt, formatted and ready to paste
        into a new conversation.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`You are an expert prompt engineer. Your job is to write a complete,
ready-to-use prompt for the task I describe below — not advice about
prompting, the actual prompt text.

TASK: [what you need Claude to do, one or two sentences]
AUDIENCE OR OUTPUT USER: [who reads or uses the result]
INPUTS AVAILABLE: [what I will paste in — notes, a doc, data, none]
FORMAT NEEDED: [email, table, outline, report, script, etc.]
CONSTRAINTS: [length, tone, things to avoid, must-include items]

Build the prompt using these elements, in this order:
1. A role/persona line matched to the task
2. Context — what background Claude needs before starting
3. Numbered, explicit instructions (not vague asks)
4. A placeholder section for my inputs, marked with [BRACKETS]
5. Output format requirements (structure, length, tone)
6. One line telling Claude what NOT to do (the most common failure
   mode for this kind of task)

After the prompt, add a 2-3 sentence note explaining the one design
choice you made that most affects the output quality, so I can adjust
it if it does not match how I actually work.

Return only the finished prompt in a code block, followed by your note.`}
      </pre>
      <p>
        Notice what this template does: it forces Claude to make the same
        structural decisions a prompt engineer would make manually — role,
        context, explicit steps, format, and a negative constraint — instead
        of leaving them implicit. That last field, asking for the reasoning
        behind one design choice, is what turns a one-off output into
        something you can actually edit with confidence next time.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Skip writing the prompts yourself
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has 550+ prompts and skills already built and
          sorted by job — so you can compare a hand-built prompt against a
          proven one instead of generating from scratch every time.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>The improver workflow: fixing a prompt that half-works</h2>
      <p>
        Generating a prompt from scratch is only half the job — most of the
        time you already have a prompt that mostly works, and you need
        Claude to sharpen it. Anthropic&apos;s{" "}
        <a
          href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-improver"
          target="_blank"
          rel="noopener noreferrer"
        >
          prompt improver
        </a>{" "}
        does this in the Console by adding chain-of-thought reasoning steps,
        clearer structure, and stronger examples to an existing prompt
        template. You can run the same improvement loop as a conversation,
        using real examples of where the current prompt went wrong.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Improve this prompt. Do not rewrite it from nothing — strengthen what
is already working and fix what is not.

CURRENT PROMPT:
"""
[paste your existing prompt]
"""

WHAT GOES WRONG WHEN I USE IT:
[describe the actual failure — too generic, wrong tone, misses a
section, ignores a constraint, etc. Be specific.]

AN EXAMPLE OF A GOOD OUTPUT I WOULD WANT:
[paste one real example, or describe it in detail if you don't have one]

Diagnose why the current prompt produces the problem above in 2-3
sentences, then return the improved version in a code block. Keep
everything that already works — change only what is causing the
failure. Flag any assumption you made about my intent.`}
      </pre>
      <p>
        Run this two or three times on a prompt you use often — a weekly
        report, a client update, a content brief — and you end up with a
        prompt that is measurably tighter than what you started with,
        because each pass is anchored to a real failure instead of a guess.
      </p>

      <h2>When a generated prompt beats one you wrote by hand</h2>
      <p>
        Generated prompts win on structure and coverage; handwritten prompts
        win on judgment and nuance you cannot easily articulate. Knowing
        which situation you are in decides whether you should generate,
        write from scratch, or do both.
      </p>

      {/* ── When to generate vs write by hand ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">Situation</th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">Generated prompt</th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">Handwritten prompt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 text-slate-700">New task type, no template exists yet</td>
              <td className="py-4 px-6 text-slate-700">Wins — covers structure you would forget on a first draft</td>
              <td className="py-4 px-6 text-slate-500">Slower, easy to miss a section</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700">Recurring job you run weekly</td>
              <td className="py-4 px-6 text-slate-500">Good starting point</td>
              <td className="py-4 px-6 text-slate-700">Wins — refine by hand once, reuse forever</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700">Needs your specific voice or client history</td>
              <td className="py-4 px-6 text-slate-500">Cannot know this on its own</td>
              <td className="py-4 px-6 text-slate-700">Wins — only you have that context</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700">High-stakes output (legal, financial, client-facing)</td>
              <td className="py-4 px-6 text-slate-500">Good scaffold, not the final word</td>
              <td className="py-4 px-6 text-slate-700">Wins — needs your review and edits either way</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-slate-700">You are not sure what to ask for at all</td>
              <td className="py-4 px-6 text-slate-700">Wins — solves the blank-page problem directly</td>
              <td className="py-4 px-6 text-slate-500">Hard to write what you can&apos;t define yet</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The practical rule: generate first, always. Even when you plan to
        heavily edit, a generated prompt gives you a structure to react to,
        which is faster than building one from nothing. Then apply your own
        judgment, voice, and client context on top — the same combination we
        cover for business use cases in{" "}
        <a href="/blog/claude-prompts-for-business">
          Claude prompts for business
        </a>
        .
      </p>
      <p>
        Most bad generated prompts share one root cause: the brief you gave
        Claude was as vague as the prompt you were trying to avoid writing.
        Feeding the generator a one-line task with no constraints just moves
        the blank-page problem one step upstream, and skipping the
        constraints field is the single most common mistake — without a
        length cap, a tone note, or a &quot;don&apos;t do this&quot; line, a
        generator defaults to safe, generic output, which is exactly what a
        good prompt is supposed to prevent.
      </p>
      <p>
        The second common mistake is treating the first generated prompt as
        final. It is a strong first draft, not a finished product — run it
        once, look at the actual output, and feed the specific gap back into
        the improver workflow above rather than accepting a mediocre result
        because it arrived instantly.
      </p>

      <h2>5 generator templates you can copy today</h2>
      <p>
        Below are five narrower generators, each tuned to a specific output
        type. Use these when you already know the category of prompt you
        need and want Claude to fill in the details fast.
      </p>

      <p><strong>1. Email prompt generator</strong></p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Write me a prompt for drafting [type of email, e.g. "client
follow-up after a missed deadline"]. The prompt should ask for:
recipient context, the one thing the email must accomplish, tone,
and a length cap. Include a placeholder for pasting raw notes.
Return the finished prompt only.`}
      </pre>

      <p><strong>2. Report/summary prompt generator</strong></p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Write me a prompt for summarizing [source type, e.g. "a 45-minute
sales call transcript"] into a report for [audience]. It should
request: a one-paragraph executive summary first, 3-5 key findings
each with supporting evidence, and a clearly separated action-items
section. Add a line telling Claude not to invent numbers that
aren't in the source.`}
      </pre>

      <p><strong>3. Content/social post prompt generator</strong></p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Write me a prompt for turning one source asset (a blog post,
transcript, or set of notes) into [platform, e.g. "3 LinkedIn
posts"]. Specify: hook-first structure, word count per post, a ban
on buzzwords like "unlock" and "game-changer", and a request for 2
alternate hooks per post. Return the prompt only.`}
      </pre>

      <p><strong>4. Analysis/decision prompt generator</strong></p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Write me a prompt for analyzing [decision type, e.g. "whether to
raise prices for existing customers"]. It should ask Claude to lay
out 2-3 options, the tradeoffs of each, a recommendation with
reasoning, and a section on what would have to be true for the
recommendation to be wrong. Include a placeholder for pasting
relevant data.`}
      </pre>

      <p><strong>5. Recurring-workflow prompt generator</strong></p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`I do [recurring task] every [frequency]. Write me a reusable prompt
template for it with placeholders for the parts that change each
time and fixed instructions for the parts that stay the same
(format, tone, structure). Note which fields I should fill in
manually versus which Claude should infer from context I paste in.`}
      </pre>
      <p>
        Each of these follows the same shape as the master meta-prompt: a
        task description, the constraints that matter, and an explicit
        format — Claude fills in the structure you would otherwise have to
        build by hand every time. For the sibling deep dive on organizing
        these into a personal library, see{" "}
        <a href="/blog/claude-prompt-templates">Claude prompt templates</a>.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want a shortcut past building your own generators?
        </p>
        <p className="mt-2 text-slate-700">
          Inside AItomation Academy you get the full Vault, courses on
          prompting and workflows, and a weekly live call — with 1,200+
          professionals sharing what is working right now.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Frequently asked questions</h2>

      <h3>Is a Claude-generated prompt as good as one written by a prompt engineer?</h3>
      <p>
        For most business tasks, yes — a generated prompt applies the same
        structural rules (role, context, explicit steps, format) that a
        prompt engineer would apply manually, and it does so consistently
        every time. Where a human prompt engineer still has the edge is
        judgment calls specific to your business: which objections actually
        matter to your customers, which numbers are sensitive, which tone
        fits a specific relationship. Generate the structure, then add that
        judgment yourself.
      </p>

      <h3>Do I need Claude Pro or API access to use a prompt generator?</h3>
      <p>
        No. Everything in this guide runs as a normal conversation in the
        Claude app on any plan, including the free tier, since it is simply
        Claude following instructions to produce text. Anthropic&apos;s
        console-based prompt generator and prompt improver are separate
        developer tools built for people working with the API, but the
        underlying technique — meta-prompting — works identically in a
        regular chat.
      </p>

      <h3>Can I ask Claude to generate a prompt for a different AI tool?</h3>
      <p>
        Yes, though the results are strongest when the generated prompt is
        meant for Claude itself, since Claude&apos;s training gives it the
        clearest sense of what its own instructions should look like. If you
        need the output to run in a different tool, say so explicitly in
        the brief so Claude avoids Claude-specific conventions like artifact
        requests or Project references.
      </p>

      <h3>How do I stop generated prompts from sounding generic?</h3>
      <p>
        Generic output almost always traces back to a generic brief. Fill in
        every field in the meta-prompt template above, especially
        constraints and the &quot;what not to do&quot; line — those two
        fields do more to prevent bland output than anything else in the
        template.
      </p>

      <p>
        Start with the master meta-prompt template above and run it on the
        three tasks you repeat most often this week. Save each generated
        prompt somewhere you can find it again — a note, a doc, a Claude
        Project — and you have the beginning of a personal generator
        library that gets better every time you run it through the improver
        workflow. For the fundamentals this all builds on, our{" "}
        <a href="/blog/claude-prompting-guide">Claude prompting guide</a> is
        the place to start, and{" "}
        <a href="/blog/best-claude-prompts">best Claude prompts</a> is a good
        next stop for more ready-made examples once you are comfortable
        generating your own.
      </p>
    </>
  ),
};
