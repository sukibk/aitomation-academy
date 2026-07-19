import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-linkedin-skill",
  title: "Claude LinkedIn Skill: Full SKILL.md + Workflow",
  description:
    "The Claude LinkedIn skill: full SKILL.md code for voice-true posts, a weekly content workflow, and a repurposing pipeline you can copy today.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Use Cases",
  tags: [
    "Claude",
    "claude linkedin skill",
    "linkedin skill claude",
    "claude skills",
    "linkedin content",
    "content workflow",
    "personal branding",
    "repurposing",
    "SKILL.md",
  ],
  body: (
    <>
      <p>
        A Claude LinkedIn skill is a folder with one file — SKILL.md — that
        teaches Claude your voice, your post formats, and your rules once, so
        every post after that sounds like you instead of a generic AI
        paraphrase of your notes. Paste raw thoughts, a meeting transcript, or
        a client win, and Claude turns it into a finished post that matches
        how you actually write, not how a template writes.
      </p>
      <p>
        This guide gives you the complete SKILL.md code, explains why a
        LinkedIn skill beats a one-off prompt, and lays out a weekly workflow
        for turning one piece of source material into a week of posts. If you
        have not built a skill before, start with{" "}
        <a href="/blog/what-are-claude-skills">what Claude skills are</a> and
        come back — the concepts below assume you know a skill is just a
        folder Claude loads when relevant.
      </p>

      <h2>Why a skill beats a prompt for LinkedIn content</h2>
      <p>
        A prompt only lives for one conversation. A skill lives in Claude
        permanently and loads itself automatically whenever you mention
        LinkedIn, a post, or content — so you stop re-explaining your voice,
        your hooks, your formatting rules, and your no-go words every single
        time.
      </p>
      <p>
        The gap shows up fastest in voice drift. Ask Claude cold to
        &quot;write me a LinkedIn post about this,&quot; and you get
        competent, forgettable copy — hedged, generic, sprinkled with
        &quot;game-changer&quot; and &quot;unlock.&quot; Give Claude a skill
        that spells out your actual sentence rhythm, your real opening lines,
        and the three things you never say, and the tenth post still sounds
        like the first. That consistency is the entire point of building a
        skill instead of collecting prompts — it is the difference between
        briefing a ghostwriter once and re-briefing them from scratch every
        Monday.
      </p>
      <p>
        Skills exist across the Claude app, Claude Code, and Cowork — build
        the LinkedIn skill once and it works wherever you write. For the
        broader case on what else skills can standardize, see{" "}
        <a href="/blog/claude-for-marketers">Claude for marketers</a>, which
        covers ad copy, email, and SEO workflows built the same way.
      </p>

      <h2>The complete SKILL.md, ready to copy</h2>
      <p>
        Below is a full LinkedIn content skill. Copy it into a file named
        SKILL.md, put that file inside a folder called{" "}
        <code>linkedin-posts</code>, and fill in the bracketed sections with
        your own voice details. The name in the frontmatter must match the
        folder name exactly, and skill names cannot contain the words
        &quot;claude&quot; or &quot;anthropic&quot; — those are reserved.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`---
name: linkedin-posts
description: Writes LinkedIn posts in my voice from raw notes, transcripts, or ideas. Use whenever the task involves drafting, editing, or repurposing content for LinkedIn.
---

# LinkedIn Post Writer

## My voice
- Tone: [e.g. "direct, a little dry, no corporate cheerfulness"]
- Sentence rhythm: short sentences. One idea per sentence. Break
  up anything over 20 words.
- First person only. Never "we" unless describing my team by name.
- Words I never use: game-changer, unlock, delve, leverage, synergy,
  disrupt, revolutionize, "in today's fast-paced world"
- Words/phrases that ARE my voice: [3-5 phrases you actually say]

## Post structure
1. Hook — the first line must work with feed truncation. No
   questions as openers ("Ever wonder..."). Lead with a claim,
   a number, or a scene.
2. Body — 3-6 short paragraphs, one line each is fine. Tell the
   story or make the argument in the order I'd say it out loud,
   not in "problem/solution/CTA" template order.
3. Turn — one line that reframes or contradicts the obvious take.
   This is the line people screenshot.
4. Close — a takeaway or a genuine question, not a canned CTA.
   No "Thoughts?" No "Agree?"

## Formatting rules
- 150-250 words for a standard post, up to 400 for a story post.
- Line breaks between every 1-2 sentences (LinkedIn readability).
- Maximum 3 hashtags, placed at the very end, only if they are
  specific (not #motivation #leadership #growth).
- No emojis unless I explicitly ask for them.

## When given source material
If I paste a transcript, article, or notes:
1. Extract the 2-3 most specific, least obvious claims — skip
   anything that sounds like every other post in this niche.
2. Pick ONE claim per post. Do not try to cover everything.
3. Ask me which claim to run with if there are multiple strong
   options, rather than guessing.

## Output format
Give me:
1. The post, ready to paste
2. Two alternative hook lines
3. One line on why you chose this angle over the others`}
      </pre>
      <p>
        The frontmatter is doing real work here: the <code>description</code>{" "}
        field is what Claude scans at the start of a session to decide
        whether this skill applies, so it needs to name both what the skill
        does and when to reach for it. Everything below the frontmatter is
        the instruction body Claude only reads once it decides the skill is
        relevant — that is the progressive-disclosure design that makes
        skills cheap to keep installed even when you are not using them.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Skip building this from scratch
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has a tuned LinkedIn skill plus 550+ prompts and
          skills for the rest of your content stack, sorted by job — ads,
          email, SEO, repurposing, and more.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Making the voice section actually work</h2>
      <p>
        Most LinkedIn skills fail at the voice section because people
        describe their voice the way a résumé describes a personality —
        &quot;authentic, insightful, engaging.&quot; That tells Claude
        nothing. What works is pasting 3-5 of your best past posts directly
        into the skill (or a linked reference file) and asking Claude to
        derive the actual patterns before you write the voice rules
        yourself.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Here are 5 of my best-performing LinkedIn posts. Analyze them and
write me a "voice" section I can drop into a SKILL.md file.

Cover: typical sentence length, how I open posts, how I close them,
words/phrases I repeat, what I never do (no hashtag spam, no
corporate language, etc.), and structural patterns across all five.

[paste 5 posts]`}
      </pre>
      <p>
        Run that once, drop the output into the voice section of the skill
        above, and every post after it starts from your actual patterns
        instead of a guess. This is the same principle behind{" "}
        <a href="/blog/claude-design-skills">Claude design skills</a> —
        specificity in the skill file is what separates output that looks
        AI-written from output that looks like you wrote it on a good day.
      </p>

      <h2>The weekly content workflow</h2>
      <p>
        A skill only pays off if you feed it consistently. Here is the
        weekly loop that turns one source into a full week of posts, using
        the skill above every time.
      </p>

      {/* ── Weekly workflow steps ── */}
      <div className="my-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
        <p className="text-center font-semibold text-slate-800 mb-6 text-lg">
          One Source, One Week of LinkedIn Content
        </p>
        <div className="flex flex-col gap-0 items-center">
          <div className="w-full max-w-lg rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 text-blue-800 text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Monday: capture one piece of source material
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  A client call, a mistake you fixed, a debate you had, an
                  observation from the week. Voice-note it or jot rough notes
                  — do not write full sentences yet.
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
                  Extract 5 distinct claims
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Paste the raw notes to Claude and ask for the 5 most
                  specific, least obvious claims buried in there — each one
                  becomes a candidate post, not a paragraph of one big post.
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
                  Draft one post per claim with the skill
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Run each claim through the LinkedIn skill separately. One
                  claim per post keeps every post sharp instead of trying to
                  cram the whole week&apos;s thinking into one.
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
                  Edit for the 10% only you can add
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Read each draft and add the specific number, name, or
                  detail that makes it undeniably yours. This is the step
                  people skip, and it is the whole difference.
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
                  Schedule the 5 posts across the week
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Space them out, respond to comments in your own words, and
                  start next Monday&apos;s notes with what resonated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2>The repurposing pipeline: one asset, five formats</h2>
      <p>
        The same skill setup handles repurposing, which is where most of the
        time savings actually live. A single long-form asset — a blog post,
        a webinar recording, a client case study — can feed a week of
        LinkedIn content without ever feeling copy-pasted, as long as you
        tell Claude to reshape it for the platform rather than trim it.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`Using my linkedin-posts skill, turn this source material into 3
distinct LinkedIn posts. Do not summarize the same way three times —
each post should take a different angle:

POST 1: The single most counterintuitive finding, told as a
mini-story with a specific before/after.
POST 2: A mistake or wrong assumption the source corrects — written
as "I used to think X, then Y happened."
POST 3: A practical takeaway framed as a short list, but written in
my voice, not a generic listicle format.

SOURCE MATERIAL:
"""
[paste the blog post, transcript, or case study here]
"""`}
      </pre>
      <p>
        This is the same repurposing logic covered in more depth in{" "}
        <a href="/blog/claude-for-marketers">Claude for marketers</a> —
        the skill just makes it repeatable without re-explaining your voice
        in every prompt.
      </p>

      <h2>Common mistakes that make skill-written posts sound fake</h2>
      <p>
        Three mistakes account for most LinkedIn posts that read as
        obviously AI-written, and all three are fixable in the skill file
        itself rather than by editing every post after the fact.
      </p>
      <ul>
        <li>
          <strong>No banned-words list.</strong> Without an explicit list,
          Claude drifts toward safe, generic phrasing like
          &quot;game-changer&quot; and &quot;unlock.&quot; Naming the words
          you never say does more than any tone instruction.
        </li>
        <li>
          <strong>Vague voice descriptions.</strong> &quot;Professional but
          approachable&quot; describes ten thousand LinkedIn accounts.
          Pasting real past posts and deriving actual patterns, as described
          above, is what fixes this.
        </li>
        <li>
          <strong>Covering too many claims per post.</strong> A post trying
          to make five points makes none of them memorably. The skill above
          forces one claim per post — resist the urge to override that when
          you have &quot;so much to say.&quot;
        </li>
      </ul>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want the skill library and a weekly working session?
        </p>
        <p className="mt-2 text-slate-700">
          Inside AItomation Academy you get the full Vault, tuned skills for
          content, design, and business, and a weekly live call — with
          1,200+ professionals building with Claude daily.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>Where to go from here</h2>
      <p>
        Build the skill above this week, run it against one real piece of
        source material, and edit in the 10% only you can add before you
        post. That single loop — one skill, one weekly source, one honest
        edit pass — is what turns LinkedIn from a chore into a five-minute
        habit. Once the LinkedIn skill is working, the same pattern extends
        to <a href="/blog/claude-design-skills">design work</a> and
        anywhere else your voice or standards need to stay consistent —
        see our <a href="/blog/best-claude-skills">roundup of the best
        Claude skills</a> for what to build next, and{" "}
        <a href="/blog/what-are-claude-skills">what are Claude skills</a>{" "}
        if you want the fundamentals first.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Do I need Claude Pro to use a LinkedIn skill?</h3>
      <p>
        Skills work across the Claude app, Claude Code, and Cowork. Check{" "}
        <a
          href="https://claude.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          claude.com
        </a>{" "}
        for which plans include skill uploads on your surface of choice, as
        availability by plan can change.
      </p>

      <h3>Can I use one skill for LinkedIn and other platforms?</h3>
      <p>
        You can, but it fights the point of a skill. LinkedIn and X reward
        different structures and lengths. Build a separate, focused skill
        per platform rather than one skill with branching instructions for
        every channel — a small, specific skill outperforms one giant skill
        trying to do everything.
      </p>

      <h3>Will posts written with a skill sound like AI wrote them?</h3>
      <p>
        Only if the skill file is vague. The fixes are specific: ban the
        generic words, derive your voice from actual past posts instead of
        adjectives, and always do a final edit pass to add the detail only
        you know. A well-built skill removes the blank-page problem, not the
        editing step.
      </p>

      <h3>How is a skill different from just saving a good prompt?</h3>
      <p>
        A saved prompt is text you paste manually every time. A skill is a
        folder Claude loads automatically once it decides the task matches —
        it also supports linked reference files and examples the skill can
        pull in only when needed, which a single prompt cannot do.
      </p>
    </>
  ),
};
