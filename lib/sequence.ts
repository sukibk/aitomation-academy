// The free-member conversion sequence. Plain, personal, one CTA per email.
// Model names use family names only (Opus, Sonnet, Haiku) — never version numbers.
// Content learnings baked in from teardown of Nate Herk / Jack Roberts / Scrapes.ai funnels:
// brevity, one link, story + objection catch, role/experience personalization.

const URL = {
  vault: "https://www.skool.com/claude-academy/classroom/6ae0125f",
  challenge: "https://www.skool.com/claude-academy/classroom/22147c21",
  cowork: "https://www.skool.com/claude-academy/classroom/e99cf18a",
  community: "https://www.skool.com/claude-academy",
};

// Physical address is required by anti-spam law. Marko: replace before go-live.
const MAILING_ADDRESS = "AItomation Academy";
const UNSUB = "mailto:contact@aitomationacademy.com?subject=unsubscribe";

export interface Ctx {
  firstName: string;
  role: string; // consultant | marketer | creator | founder | agency | developer | other
  experience: string; // learning | beginner | built | expert
}

const ROLE_SECTION: Record<string, string> = {
  consultant: "the Consultants & Advisors section (30 recipes: proposals, discovery, decks)",
  agency: "the Agencies & Client Services section (30 recipes: onboarding, reporting, retainers)",
  marketer: "the Marketers section (35 recipes: ads, landing pages, email, SEO briefs)",
  creator: "the Creators & Content section (35 recipes: scripts, hooks, repurposing)",
  founder: "the Founders & Executives section (30 recipes: strategy, board updates, hiring)",
  developer: "the Claude Code Power Setup section (CLAUDE.md, commands, subagents, hooks)",
  other: "your role's section, sorted the moment you pick it",
};

function roleLine(role: string): string {
  return ROLE_SECTION[role] ?? ROLE_SECTION.other;
}

function btn(href: string, label: string): string {
  return `<p style="margin:24px 0"><a href="${href}" style="background:#C2571B;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:600;font-family:Arial,sans-serif;display:inline-block">${label}</a></p>`;
}

function layout(inner: string): string {
  return `<div style="max-width:560px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#2a2420">
${inner}
<p style="margin-top:28px">— Marko</p>
<hr style="border:none;border-top:1px solid #e6dfd6;margin:28px 0 12px">
<p style="font-size:12px;color:#8a8078">You're getting this because you joined Claude Code Academy on Skool.<br>
${MAILING_ADDRESS} · <a href="${UNSUB}" style="color:#8a8078">Unsubscribe</a></p>
</div>`;
}

export interface Step {
  day: number;
  id: string;
  subject: (c: Ctx) => string;
  html: (c: Ctx) => string;
}

// Experience-branched line used on Day 2.
function experienceBlock(c: Ctx): string {
  if (c.experience === "expert" || c.experience === "built") {
    return `<p>You're past the basics, so skip the intro track. Go straight to the Claude Code course and the Vault's power-setup section — CLAUDE.md templates, custom commands, subagents, and hooks that most people never configure.</p>${btn(URL.vault, "Open the Vault")}`;
  }
  return `<p>Start with the 7-Day Claude Challenge. By the end you'll have a real website live on the internet, built by talking to Claude — no coding. It's the fastest way to actually understand how the tool thinks.</p>${btn(URL.challenge, "Start Day 1")}`;
}

export const SEQUENCE: Step[] = [
  {
    day: 0,
    id: "d0-welcome",
    subject: (c) => `${c.firstName}, welcome — do this one thing first`,
    html: (c) =>
      layout(
        `<p>Hey ${c.firstName},</p>
<p>Welcome to Claude Code Academy. No long intro — here's the one thing worth doing in your first 5 minutes.</p>
<p>Open Claude, paste this, fill the blanks:</p>
<p style="background:#f4efe8;padding:14px;border-radius:6px;font-family:monospace;font-size:14px">Write a short intro post for me for the Claude Code Academy community. I'm [NAME], I do [ROLE], and I want to use Claude to [GOAL]. 4-6 sentences, warm, end with a question for the group.</p>
<p>Post the result in the community. That's the whole pattern this place teaches: a good prompt in, finished work out.</p>
<p>That prompt is 1 of 550+ in the Claude Vault — organized by your job and updated weekly. It's part of the paid membership.</p>
${btn(URL.community, "Post your intro")}`,
      ),
  },
  {
    day: 1,
    id: "d1-path",
    subject: () => `Here's your path (and where your recipes live)`,
    html: (c) =>
      layout(
        `<p>Hey ${c.firstName},</p>
<p>Quick map so you don't get lost:</p>
<p><b>Free, right now:</b> Start Here, the Claude Automations from my videos, and my discount codes.</p>
<p><b>Inside the membership:</b> the 7-Day Challenge, the Cowork course, the Claude Code course (mid-August), the weekly live call, and the Claude Vault.</p>
<p>Based on what you told me, the part of the Vault you'll get the most from is ${roleLine(c.role)}.</p>
<p>Access to the Vault alone sells for $49 outside the community. Members get it included — and it grows every week.</p>
${btn(URL.vault, "See the Vault")}`,
      ),
  },
  {
    day: 2,
    id: "d2-experience",
    subject: (c) =>
      c.experience === "expert" || c.experience === "built"
        ? `Skip the basics, ${c.firstName} — start here instead`
        : `${c.firstName}, your first real build`,
    html: (c) =>
      layout(`<p>Hey ${c.firstName},</p>${experienceBlock(c)}`),
  },
  {
    day: 4,
    id: "d4-story",
    subject: () => `"I built that in a weekend?"`,
    html: (c) =>
      layout(
        `<p>Hey ${c.firstName},</p>
<p>Most people use Claude like a search box. Quick question in, generic answer out — about 5% of what it can do.</p>
<p>The members getting results treat it differently: they hand it a whole job with the context and the format, and it hands back a finished deliverable. A client report. A working dashboard. A week of content.</p>
<p>That shift is the entire game, and it's what every course and recipe inside the membership is built to teach.</p>
${btn(URL.vault, "See what's inside")}`,
      ),
  },
  {
    day: 6,
    id: "d6-objection",
    subject: () => `Something wrong?`,
    html: (c) =>
      layout(
        `<p>Hey ${c.firstName},</p>
<p>You joined a few days ago and I haven't seen you upgrade yet — totally fine. Usually it's one of two things:</p>
<p><b>"I don't have time."</b> That's the reason to be inside, not to wait. The whole point is Claude doing the work you don't have time for. Most members start with one recipe that saves them an afternoon a week.</p>
<p><b>"I'm not technical enough."</b> Neither are most members. The 7-Day Challenge assumes zero coding and ends with a live website. If you can write an email, you can do this.</p>
<p>Reply to this email and tell me what you're working on — I'll point you at the exact recipe for it.</p>
${btn(URL.vault, "Unlock everything")}`,
      ),
  },
  {
    day: 8,
    id: "d8-offer",
    subject: () => `Everything you get as a member`,
    html: (c) =>
      layout(
        `<p>Hey ${c.firstName},</p>
<p>Straight version — here's what upgrading unlocks:</p>
<ul>
<li>The 7-Day Claude Challenge — zero to a live website</li>
<li>The Claude Cowork course — put your weekly busywork on autopilot</li>
<li>The Claude Code course — build real tools (mid-August)</li>
<li>The Claude Vault — 550+ skills, prompts & workflows, new ones every week ($49 on its own)</li>
<li>The weekly live call — bring your project, we fix it live</li>
</ul>
<p>One automated deliverable usually pays for months of membership. Cancel anytime.</p>
${btn(URL.vault, "Become a member")}`,
      ),
  },
  {
    day: 11,
    id: "d11-reengage",
    subject: () => `the 95% nobody uses`,
    html: (c) =>
      layout(
        `<p>Hey ${c.firstName},</p>
<p>One more, then I'll leave your inbox alone.</p>
<p>The gap between people who "use AI" and people who get paid for it isn't knowledge — it's knowing which jobs to hand it and exactly how. That's the whole reason the Vault is organized by your role instead of dumped in a folder.</p>
<p>You told me your world is ${roleLine(c.role)}. That's where I'd start you.</p>
${btn(URL.vault, "Start there")}`,
      ),
  },
  {
    day: 14,
    id: "d14-decision",
    subject: () => `last note from me`,
    html: (c) =>
      layout(
        `<p>Hey ${c.firstName},</p>
<p>This is the last email in the welcome series — after this you'll just hear from me on Tuesdays when new recipes drop.</p>
<p>The free stuff is yours to keep. But the people who actually change how they work are the ones inside, using it every week. If that's you, the door's open.</p>
${btn(URL.vault, "Join the members")}
<p>Either way — glad you're here.</p>`,
      ),
  },
];

// Sent immediately when a member upgrades (any day).
export const PAID_WELCOME: Step = {
  day: -100,
  id: "paid-welcome",
  subject: (c) => `You're in, ${c.firstName} 🎉`,
  html: (c) =>
    layout(
      `<p>Hey ${c.firstName},</p>
<p>You're a full member now — everything's unlocked.</p>
<p>Do these three in order:</p>
<ol>
<li>Start the 7-Day Challenge if you haven't.</li>
<li>Open the Vault and grab your first recipe from ${roleLine(c.role)}.</li>
<li>Add the weekly live call to your calendar — bring a real question.</li>
</ol>
${btn(URL.challenge, "Start the Challenge")}
<p>See you inside.</p>`,
    ),
};

export const LAST_DAY = SEQUENCE[SEQUENCE.length - 1].day;
