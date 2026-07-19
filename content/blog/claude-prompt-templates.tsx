import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-prompt-templates",
  title: "7 Claude Prompt Templates That Work Every Time",
  description:
    "7 reusable Claude prompt templates — role+context+task, XML-structured, few-shot, critique loop, chain-of-thought — with fill-in examples.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Prompts",
  tags: [
    "Claude",
    "claude prompt template",
    "prompt structure",
    "claude prompts",
    "prompt engineering",
    "xml tags",
    "few-shot prompting",
    "chain of thought",
    "prompt templates",
  ],
  body: (
    <>
      <p>
        A claude prompt template is a fill-in skeleton you reuse across tasks
        instead of writing every prompt from scratch — swap the bracketed
        parts, keep the structure. Most people never build one. They retype
        the same rough instructions every session, get inconsistent output,
        and conclude the model is unpredictable. It is not unpredictable. It
        is undirected. This guide gives you seven skeletons, each with a
        copy-paste example, so you have a repeatable prompt structure for
        almost anything you ask Claude to do.
      </p>
      <p>
        These are general-purpose templates you adapt per task. For the
        underlying principles behind why they work, see our{" "}
        <a href="/blog/claude-prompting-guide">Claude prompting guide</a>. If
        you want ready-made prompts instead of building your own, our{" "}
        <a href="/blog/best-claude-prompts">best Claude prompts</a> roundup
        and the{" "}
        <a href="/blog/claude-prompt-generator">Claude prompt generator</a>{" "}
        guide are the faster path.
      </p>

      <h2>Why a template beats a blank cursor</h2>
      <p>
        A template forces you to decide the four things that actually change
        output quality — role, context, task, and format — before you hit
        enter, instead of discovering you left one out after a bad answer.
        The structure itself is doing the work: Anthropic&apos;s own prompt
        engineering documentation is built around this exact idea, that
        being explicit about role, context, and the shape of the answer
        produces more reliable results than a single unstructured
        sentence.
      </p>
      <p>
        None of these seven skeletons require any special access or
        technical setup. They are plain text you type into the{" "}
        <a href="https://claude.com" target="_blank" rel="noopener noreferrer">
          Claude
        </a>{" "}
        app, on any plan. Pick the one that matches your task, fill in the
        brackets, and send it.
      </p>

      <h2>Template 1: Role + Context + Task + Format</h2>
      <p>
        This is the default skeleton — reach for it first for any single,
        well-defined deliverable. It works because it separates who Claude
        is being, what it knows, what it needs to do, and what the answer
        should look like, so nothing gets guessed.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`ROLE: You are [specific expert role, e.g. "a senior email copywriter"].

CONTEXT: [Background Claude needs - audience, business, constraints,
what has already been tried].

TASK: [The exact deliverable, one sentence. Be specific about scope.]

FORMAT: [Structure, length, tone - e.g. "3 subject lines + 150-word
body, conversational tone, one CTA."]

Ask me clarifying questions first if this brief is incomplete.`}
      </pre>
      <p>
        The last line matters more than it looks. Without it, Claude will
        fill gaps with reasonable-sounding guesses instead of flagging them.
        With it, you find out what you forgot to specify before you get an
        answer built on the wrong assumption.
      </p>

      <h2>Template 2: Ask-then-act</h2>
      <p>
        Use ask-then-act when the brief in your head is vaguer than you
        realize — new projects, first drafts for an unfamiliar audience, or
        anything where getting it wrong wastes real time. Instead of hoping
        Claude asks the right follow-up on its own, you require it.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`I want you to [end goal, e.g. "write a cold outreach sequence"].

Before you write anything, ask me up to 5 questions that would
change your approach - about audience, goal, constraints, or tone.
Wait for my answers.

Then produce the full [deliverable] using what I told you, without
repeating the questions back to me.`}
      </pre>
      <p>
        The instinct to skip this step and just describe everything upfront
        usually backfires — you do not know which details matter until
        Claude tells you what it is missing. Ask-then-act inverts who does
        the guessing.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Skip building templates from scratch
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has 550+ prompts and skills already structured
          this way, sorted by job — so you copy a finished prompt instead of
          filling in a skeleton every time.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Template 3: Critique loop</h2>
      <p>
        The critique loop makes Claude review its own first draft before you
        see it, which catches the generic phrasing and unearned confidence
        that a single-pass answer tends to have. It is the single highest-
        leverage template for anything client-facing or persuasive.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Step 1 - DRAFT: Write [deliverable] based on: [brief].

Step 2 - CRITIQUE: Now switch roles. As a skeptical editor, list the
3 weakest parts of your own draft - where it is generic, where it
contradicts the brief, or where a reader would stop reading.

Step 3 - REVISE: Rewrite the draft fixing only what you flagged in
Step 2. Do not introduce new sections. Show only the final version.`}
      </pre>
      <p>
        Run this on anything you would normally edit by hand anyway — ad
        copy, a proposal opening, a difficult email. You get the editing
        pass for free, and the flagged weaknesses often tell you something
        about the brief itself, not just the draft.
      </p>

      <h2>Template 4: XML-structured</h2>
      <p>
        Reach for XML tags the moment a prompt mixes more than two kinds of
        content — instructions, background context, and examples all in one
        message. Anthropic&apos;s own documentation recommends this
        explicitly: wrapping each type of content in its own tag reduces the
        chance Claude blends an example with an instruction or misreads
        where context ends and the task begins.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`<role>You are [expert role].</role>

<context>
[Background info, prior examples, business context - as much as
Claude needs and no more]
</context>

<task>
[Exact task, one to two sentences]
</task>

<examples>
<example>[input] -> [ideal output]</example>
<example>[input] -> [ideal output]</example>
</examples>

<format>
[Output shape: length, structure, sections]
</format>`}
      </pre>
      <p>
        You do not need exotic tag names — Claude parses any descriptive
        label you give it, so <code>&lt;client_notes&gt;</code> or{" "}
        <code>&lt;past_examples&gt;</code> work exactly as well as generic
        ones, as long as you are consistent across the prompt.
      </p>

      <h2>Template 5: Few-shot (multishot)</h2>
      <p>
        Few-shot prompting teaches Claude a pattern by example instead of by
        description, and it is the most reliable way to lock in a specific
        voice or format. Anthropic&apos;s guidance is to use three to five
        examples that are relevant to your real use case and different
        enough from each other that Claude generalizes the pattern instead
        of copying one example&apos;s specifics.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Match the pattern in these examples. Do not explain the pattern back
to me - just produce output #4 in the same style.

<example>
Input: [example input 1]
Output: [ideal output 1]
</example>

<example>
Input: [example input 2]
Output: [ideal output 2]
</example>

<example>
Input: [example input 3]
Output: [ideal output 3]
</example>

Now do this one:
Input: [your real input]
Output:`}
      </pre>
      <p>
        The catch is that Claude will faithfully copy whatever is wrong with
        your examples too — an awkward phrase or a format quirk in example
        two shows up in the real output. Only feed it examples that
        represent the quality bar you actually want.
      </p>

      <h2>Template 6: Chain-of-thought</h2>
      <p>
        Chain-of-thought forces Claude to work through a decision before
        committing to an answer, which matters most for anything involving
        analysis, prioritization, or a choice between competing approaches —
        not for simple rewrites or formatting jobs, where it just adds
        noise.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Before you answer, think through this step by step inside <thinking>
tags: identify the constraints, weigh 2-3 possible approaches, and
pick one with a one-line reason.

Then, outside the thinking tags, give me only the final
[deliverable] - no visible reasoning in the answer itself.

Task: [your actual task]`}
      </pre>
      <p>
        Keeping the reasoning inside its own tags is what makes this
        template usable — you get the benefit of Claude thinking through
        options without a wall of reasoning cluttering the deliverable you
        actually wanted.
      </p>

      <h2>Template 7: Constraints-and-format lock</h2>
      <p>
        This template exists for the situation where format compliance
        matters more than creativity — a document that has to fit an exact
        structure, or copy that has to avoid specific words and moves no
        matter what. State the non-negotiables as MUST and MUST NOT lists
        instead of burying them in a paragraph of context.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Produce [deliverable] under these constraints:

MUST: [non-negotiable requirements - length, must include X, must
match voice Y]
MUST NOT: [banned words, formats, or moves - e.g. no hedging, no
"in today's fast-paced world", no bullet-only answers]
OUTPUT FORMAT: [exact structure - e.g. "one H1, 3 H2 sections, no
intro paragraph before the H1"]

If you cannot meet a MUST constraint, say so explicitly instead of
producing an output that violates it.`}
      </pre>
      <p>
        The last line is what prevents silent failures — without it, Claude
        will sometimes quietly drop a constraint it could not satisfy rather
        than telling you it could not be done as specified.
      </p>

      <h2>Which template for which job</h2>
      <p>
        Most tasks fit one skeleton clearly. When you are unsure, start with
        Template 1 and add a second skeleton on top of it — for example,
        role+context+task+format wrapped in XML tags, with a critique loop
        as the last step.
      </p>

      {/* ── Template comparison table ── */}
      <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-200">
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Template
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Best for
              </th>
              <th className="text-left py-4 px-6 font-semibold text-slate-900">
                Skip when
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                1. Role+Context+Task+Format
              </td>
              <td className="py-4 px-6 text-slate-700">
                Any one-off task with a clear brief
              </td>
              <td className="py-4 px-6 text-slate-500">
                You do not know the brief yet
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                2. Ask-then-act
              </td>
              <td className="py-4 px-6 text-slate-700">
                Vague briefs, high-stakes first drafts
              </td>
              <td className="py-4 px-6 text-slate-500">
                You already know exactly what you want
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                3. Critique loop
              </td>
              <td className="py-4 px-6 text-slate-700">
                Client-facing or persuasive writing
              </td>
              <td className="py-4 px-6 text-slate-500">
                Quick internal or throwaway drafts
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                4. XML-structured
              </td>
              <td className="py-4 px-6 text-slate-700">
                Long prompts mixing docs, rules, examples
              </td>
              <td className="py-4 px-6 text-slate-500">
                Short, single-purpose prompts
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                5. Few-shot
              </td>
              <td className="py-4 px-6 text-slate-700">
                Matching a specific voice or format
              </td>
              <td className="py-4 px-6 text-slate-500">
                You do not have 3+ good examples yet
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                6. Chain-of-thought
              </td>
              <td className="py-4 px-6 text-slate-700">
                Analysis, prioritization, tradeoffs
              </td>
              <td className="py-4 px-6 text-slate-500">
                Simple rewrites or formatting jobs
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-900">
                7. Constraints-and-format lock
              </td>
              <td className="py-4 px-6 text-slate-700">
                Rigid formatting or compliance needs
              </td>
              <td className="py-4 px-6 text-slate-500">
                Creative work where rigidity kills it
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Stacking templates for real work</h2>
      <p>
        The seven skeletons are not mutually exclusive, and the best prompts
        for anything non-trivial usually combine two or three. A client
        deliverable might use Template 1 for the skeleton, Template 4 to
        wrap the context and examples in XML tags so nothing gets confused,
        and Template 3 as a final critique pass before you read the output.
        For long-form writing specifically, our{" "}
        <a href="/blog/how-to-use-claude-for-writing">
          guide to using Claude for writing
        </a>{" "}
        shows this stacking in practice across drafts, edits, and voice
        matching.
      </p>
      <p>
        A prompt structure is only as good as the specificity you put into
        the brackets. &quot;[Audience]&quot; filled in as &quot;marketing
        managers at B2B SaaS companies who have tried three tools already and
        are skeptical of a fourth&quot; produces a categorically better
        result than &quot;marketing managers.&quot; The template gives you
        the slots; the work is still filling them in with real detail.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want these templates built into finished prompts?
        </p>
        <p className="mt-2 text-slate-700">
          Inside AItomation Academy you get the full Vault, live weekly
          calls, and 1,200+ professionals sharing what prompt structures are
          actually working for their work right now.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Common mistakes that break these templates</h2>
      <p>
        Most template failures come from three habits: leaving the FORMAT
        section vague (&quot;make it good&quot; is not a format), stuffing
        five unrelated tasks into one TASK line instead of running them
        separately, and skipping examples when you actually do have 3-5
        good ones sitting in an old document or email thread. Fix those
        three habits and every template above gets noticeably more
        reliable.
      </p>
      <p>
        It also helps to save the filled-in version of a template once it
        works well, rather than rebuilding it from the blank skeleton every
        time. A working prompt for your voice, your audience, and your
        format is worth keeping as a reusable asset — which is the entire
        idea behind a prompt library.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Do these templates work in Claude Code or Cowork, not just the app?</h3>
      <p>
        Yes. The seven skeletons are plain-text prompt structure, not app
        features, so they work anywhere you talk to Claude — the consumer
        app, Claude Code, or Cowork. Cowork adds folder-scoped context and
        skills on top, which pairs especially well with the XML-structured
        and few-shot templates, since you can point it at a folder of past
        examples instead of pasting them inline every time.
      </p>

      <h3>How long should a claude prompt template actually be?</h3>
      <p>
        As long as the task needs and no longer — a Template 1 prompt for a
        short email might be four lines, while an XML-structured prompt
        wrapping a full brief and three examples might run twenty. Length
        is not the goal; every line should be doing something the model
        would otherwise have to guess at.
      </p>

      <h3>Can I combine chain-of-thought with few-shot examples?</h3>
      <p>
        Yes, and it is one of the stronger combinations here. Put a{" "}
        <code>&lt;thinking&gt;</code> block inside each example so Claude
        sees the reasoning pattern, not just the final answer, then it will
        generalize that same step-by-step approach to the new input you
        give it at the end of the prompt.
      </p>

      <h2>Start with one template this week</h2>
      <p>
        Pick whichever task eats the most of your week right now and run it
        through Template 1 first — role, context, task, format, in that
        order. Once that habit is automatic, layer in the critique loop for
        anything client-facing and XML tags for anything long. You do not
        need all seven in rotation on day one; you need one good prompt
        structure that you actually reuse instead of retyping from memory
        every time. For the deeper reasoning behind why structure changes
        output quality this much, our{" "}
        <a href="/blog/claude-prompting-guide">Claude prompting guide</a> is
        the place to go next.
      </p>
    </>
  ),
};
