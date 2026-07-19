import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "claude-pdf-skill",
  title: "Claude PDF Skill: Native Reading vs. the Skill",
  description:
    "Claude PDF skill explained: what native PDF reading already does, when you need the pdf skill, plus contract review and report extraction prompts.",
  publishedAt: "2026-07-18",
  author: "Marko Sudar",
  category: "Claude Workflows",
  tags: [
    "Claude",
    "claude pdf skill",
    "claude pdf",
    "pdf skill",
    "claude skills",
    "contract review",
    "document extraction",
    "pdf workflows",
    "claude for business",
  ],
  body: (
    <>
      <p>
        Claude can already read a PDF the moment you drop it into a chat —
        text, tables, charts, even scanned pages — with no setup at all. The
        Claude PDF skill is a different, narrower thing: a packaged set of
        instructions that teaches Claude to manipulate PDFs as files — merge,
        split, fill forms, rotate pages, add watermarks, rebuild a document
        from scratch. Confusing the two leads to two failure modes: people
        who never touch the skill and manually stitch together documents
        Claude could assemble in one prompt, and people who install the
        skill for a job — like &quot;summarize this 12-page report&quot; —
        that native reading already handles better and faster.
      </p>
      <p>
        This guide draws the line clearly, then gives you two full recipes
        that sit right on either side of it: contract review (native reading
        does the heavy lifting) and multi-file report extraction into a
        clean spreadsheet-ready table (where the skill earns its place). If
        you are new to the skills system generally, start with{" "}
        <a href="/blog/what-are-claude-skills">what Claude Skills are</a>{" "}
        before this one — this article assumes you know the basic concept.
      </p>

      <h2>Native PDF reading already does more than most people assume</h2>
      <p>
        Upload a PDF to Claude — in the chat app, Claude Code, or the API —
        and Claude reads each page as both an image and an extracted text
        layer at once. That means it sees layout, tables, seals, handwriting,
        and charts the same way a person would, not just the text a
        copy-paste would grab. No skill, no setup, no extra step.
      </p>
      <p>
        In practice this covers the majority of what people actually need
        from a PDF: summarizing it, answering questions about it, pulling
        specific figures or clauses, comparing it against another document,
        rewriting a section, or flagging what is missing. If your job is
        &quot;understand this document and tell me something about it,&quot;
        native reading is the whole answer — you do not need a skill for
        that, and installing one adds a step for no benefit.
      </p>
      <p>
        The current limits worth knowing: PDFs up to 32MB and up to 100
        pages per document work natively, per{" "}
        <a
          href="https://platform.claude.com/docs/en/build-with-claude/pdf-support"
          target="_blank"
          rel="noopener noreferrer"
        >
          Anthropic&apos;s PDF support documentation
        </a>
        . For anything longer, split it into parts or summarize section by
        section — Claude&apos;s large context window means you can usually
        paste several chunks into one conversation and still get a coherent
        answer across the whole document.
      </p>

      <h2>Where the pdf skill actually earns its keep</h2>
      <p>
        The pdf skill is for when the output needs to be a PDF, or the input
        needs surgery before Claude can read it usefully. That is a
        meaningfully different job from reading and reasoning about content.
        Per Anthropic&apos;s published skill, the core capabilities are:
        extracting text and tables programmatically, merging and splitting
        documents, rotating and reordering pages, filling in form fields,
        adding watermarks, encrypting or decrypting files, extracting
        embedded images, running OCR on scanned pages that have no text
        layer at all, and assembling brand-new PDFs from scratch.
      </p>
      <p>
        The pattern to watch for: if your request has a verb like
        &quot;merge,&quot; &quot;split,&quot; &quot;fill,&quot;
        &quot;rotate,&quot; &quot;watermark,&quot; &quot;OCR,&quot; or
        &quot;rebuild,&quot; you want the skill. If the verb is
        &quot;summarize,&quot; &quot;explain,&quot; &quot;compare,&quot;
        &quot;find,&quot; or &quot;flag,&quot; you want native reading — and
        adding the skill does nothing but slow the first response down. See
        our roundup of{" "}
        <a href="/blog/best-claude-skills">the best Claude skills</a> for
        where this one ranks against everything else worth installing.
      </p>

      {/* ── Decision graphic ── */}
      <div className="not-prose my-10 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
        <p className="text-center font-semibold text-slate-800 mb-6 text-lg">
          Native Reading vs. the PDF Skill
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4 md:p-5">
            <p className="font-semibold text-blue-800 mb-2">
              Use native reading (no setup)
            </p>
            <ul className="text-sm text-blue-700 space-y-1.5 list-disc pl-4">
              <li>Summarize or explain a PDF</li>
              <li>Answer questions about its contents</li>
              <li>Pull specific numbers, clauses, or dates</li>
              <li>Compare two or more documents</li>
              <li>Flag risks, gaps, or inconsistencies</li>
              <li>Read tables, charts, and scanned images with a text layer</li>
            </ul>
          </div>
          <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4 md:p-5">
            <p className="font-semibold text-orange-800 mb-2">
              Use the pdf skill
            </p>
            <ul className="text-sm text-orange-700 space-y-1.5 list-disc pl-4">
              <li>Merge or split multiple PDFs</li>
              <li>Rotate, reorder, or delete pages</li>
              <li>Fill in PDF form fields</li>
              <li>Add a watermark or encrypt a file</li>
              <li>OCR a scanned document with no text layer</li>
              <li>Assemble a brand-new PDF from scratch</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>Recipe 1: Contract review with native reading</h2>
      <p>
        Contract review is a native-reading job almost every time — you are
        not editing the PDF, you are interrogating it. Upload the contract,
        then use a prompt that forces Claude to structure its findings by
        risk rather than just narrate the document back to you in order.
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`You are reviewing a contract for a non-lawyer business owner. I have
attached the PDF. Read the entire document before answering.

CONTEXT: [what this contract is for — e.g. "vendor agreement for
a marketing agency we are hiring for 6 months"]
MY ROLE: [buyer / seller / employer / employee / other]
MY PRIORITIES: [e.g. "exit flexibility, IP ownership, liability cap"]

Produce:

1. PLAIN-ENGLISH SUMMARY (5-6 sentences)
   What this contract commits each party to, in the order that
   matters, not the order it appears in the document.

2. RISK FLAGS (ranked, most concerning first)
   For each: the exact clause or section reference, what it says,
   why it matters for someone in MY ROLE, and how unusual or
   aggressive it is compared to a standard version of this contract.

3. MISSING OR VAGUE TERMS
   Anything a contract like this would normally specify but this one
   does not, or specifies ambiguously.

4. NUMBERS AND DATES TABLE
   Every dollar amount, percentage, deadline, and term length in the
   document, with its section reference, in one table.

5. QUESTIONS TO ASK BEFORE SIGNING
   3-5 specific questions to raise with the other party, phrased so
   a non-lawyer can ask them without sounding adversarial.

Quote the exact contract language for anything in sections 2 and 3 —
do not paraphrase clauses you are flagging as risky. If a section is
hard to read because of scan quality or dense formatting, say so
rather than guessing at its content.`}
      </pre>
      <p>
        Two things make this work well. First, quoting exact language back
        forces Claude to point at the actual clause instead of summarizing
        loosely — you can verify every flag in seconds. Second, splitting
        risks from missing terms surfaces the omissions a first read
        usually misses, which is often where the real exposure sits. This
        is analysis and review, not editing, so no skill is involved — it
        is native reading doing the entire job.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Skip writing the prompts yourself
        </p>
        <p className="mt-2 text-slate-700">
          The Claude Vault has document-review and extraction recipes
          pre-built for contracts, reports, and forms — 550+ recipes total,
          sorted by your job.
        </p>
        <a
          href="/vault"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          See the Vault
        </a>
      </div>

      <h2>Recipe 2: Report extraction across many PDFs</h2>
      <p>
        This is where the line between native reading and the pdf skill gets
        interesting. If you are extracting data from one report Claude can
        read natively — no skill needed, just a structured extraction
        prompt. The skill becomes worth installing when the job is
        repeatable across a batch of scanned reports with no text layer, or
        when the end product itself needs to be a PDF (a combined packet, a
        cleaned-up version with pages reordered, or a watermarked copy for
        distribution).
      </p>
      <p>
        Start with the extraction prompt, which works with native reading
        alone for a handful of readable PDFs:
      </p>
      <pre className="not-prose my-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
{`I am attaching [N] reports as PDFs. Extract the following into one
consolidated table, one row per document:

FIELDS TO EXTRACT:
- Document name / source
- Report date or period covered
- [Field 1 — e.g. "total revenue"]
- [Field 2 — e.g. "headcount"]
- [Field 3 — e.g. "top risk mentioned"]
- Page/section reference for each extracted figure

RULES:
- If a field is not present in a document, write "not found" — do
  not estimate or infer a number that is not explicitly stated.
- If a number appears more than once with different values (e.g.
  a preliminary figure and a restated figure), report both and flag
  the discrepancy.
- Where a document is a scanned image with no reliable text layer,
  say so explicitly instead of guessing at unclear numbers.

Output as a markdown table I can paste into a spreadsheet, plus a
short note below it flagging any document where extraction was
low-confidence.`}
      </pre>
      <p>
        If that last rule keeps triggering — several of your reports are
        scans with no text layer, or you need the final consolidated output
        saved back out as an actual PDF packet — that is your signal to add
        the pdf skill to the conversation or Project. Ask Claude to OCR the
        scanned pages first, then rerun the same extraction prompt against
        the OCR&apos;d text; the skill handles the conversion, the prompt
        above still does the extraction work unchanged.
      </p>

      <h2>Turning the recipe into a repeatable workflow</h2>
      <p>
        For either recipe, the highest-leverage move is not the individual
        prompt — it is putting it in a Project so you are not rewriting the
        setup every time. Create one Project for &quot;contract review&quot;
        and one for &quot;report extraction,&quot; save the prompt above as
        a Project instruction, and every new document just gets dropped in
        with the specific context filled out. If your documents live in
        Obsidian rather than loose PDF files, our{" "}
        <a href="/blog/claude-skill-for-obsidian">
          Claude skill for Obsidian
        </a>{" "}
        guide covers wiring that vault in directly instead of exporting
        files by hand each time.
      </p>
      <p>
        The same before-you-automate discipline applies here that applies
        to any document workflow: run the prompt manually on 3-5 real
        documents first and check the output against the source before you
        trust it on a stack of 40. A wrong number in a contract-risk flag or
        a misread revenue figure is expensive precisely because it looks
        confident. If you are also working from meeting recordings or
        interview transcripts alongside these documents, our comparison of{" "}
        <a href="/blog/chatgpt-vs-claude-summarizing-transcripts">
          ChatGPT vs. Claude for summarizing transcripts
        </a>{" "}
        is a useful companion piece — same verification logic, different
        input format.
      </p>

      <div className="not-prose my-10 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <p className="font-semibold text-slate-900">
          Want workflows like this built and updated weekly?
        </p>
        <p className="mt-2 text-slate-700">
          Inside Claude Code Academy you get the full Vault, the courses, and
          a weekly live call — with 1,200+ professionals using this daily.
        </p>
        <a
          href="/skool-redirect"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Join the community
        </a>
      </div>

      <h2>The short version</h2>
      <p>
        Default to native reading — it is faster, needs no setup, and
        covers summarizing, answering questions, comparing, and flagging
        risk across contracts and reports alike. Reach for the pdf skill
        only when the job involves manipulating the file itself: merging,
        splitting, form-filling, watermarking, encrypting, or OCR-ing scans
        with no text layer. Most people who think they need the skill
        actually need a better extraction prompt, and most people who never
        touch it are missing an easy win the first time they have to merge
        twelve scanned invoices into one clean document. For the full
        picture of what else is worth installing alongside it, revisit{" "}
        <a href="/blog/what-are-claude-skills">what Claude Skills are</a> and{" "}
        <a href="/blog/best-claude-skills">the best Claude skills</a> to
        round out your setup.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Do I need to install anything to have Claude read a PDF?</h3>
      <p>
        No. Native PDF reading works the moment you attach a file in
        Claude.ai, Claude Code, or through the API — there is no toggle to
        enable and nothing to install. The pdf skill is a separate,
        optional addition you only need for file manipulation tasks like
        merging, splitting, or form-filling, not for reading and analysis.
      </p>

      <h3>Can Claude read a scanned PDF with no selectable text?</h3>
      <p>
        Sometimes, but not reliably. Native reading treats each page as an
        image, so it can often make sense of a clean scan on its own.
        Once quality drops — skewed pages, faint print, handwriting mixed
        with print — accuracy suffers, and that is exactly the case where
        running the pdf skill&apos;s OCR step first, then handing the
        cleaned-up text back to Claude, produces a more reliable result
        than either step alone.
      </p>

      <h3>Is the pdf skill the same as a PDF editor?</h3>
      <p>
        Functionally, yes, for the operations it covers. It cannot do
        everything a full desktop PDF editor does — there is no visual
        layout designer — but for merging, splitting, rotating, watermarking,
        encrypting, filling form fields, and rebuilding a document from
        extracted content, it replaces the editor entirely inside a
        conversation, with no separate software to open.
      </p>

      <h3>Will Claude ever get the extraction wrong on a contract or report?</h3>
      <p>
        Yes, occasionally, especially with dense financial tables, footnotes
        that modify a headline number, or clauses that reference definitions
        elsewhere in the document. That is why both recipes above ask Claude
        to quote exact language and flag low-confidence extractions rather
        than smoothing over uncertainty. Treat the output as a strong first
        pass that still needs a human check on anything that will inform a
        decision, not a final answer to forward untouched.
      </p>
    </>
  ),
};
