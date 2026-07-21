// The free-member conversion sequence. Plain, personal, one CTA per email.
// Model names use family names only (Opus, Sonnet, Haiku) — never version numbers.
// Post freemium-flip (2026-07-21): premium courses + Vault live behind Academy
// Premium. Free-member CTAs go to the Skool plans page (lowest-friction upgrade,
// includes the 7-day trial) — NEVER to classroom pages, which are tier-locked.

const URL = {
  plans: "https://www.skool.com/claude-academy/plans",
  challenge: "https://www.skool.com/claude-academy/classroom/22147c21", // paid members only
  community: "https://www.skool.com/claude-academy",
};

// Physical address required by anti-spam law. Matches the Brevo master templates.
const MAILING_ADDRESS = "AItomation Academy · 7901 4th St N, STE 300, St. Petersburg, FL 33702";
const UNSUB = "mailto:contact@aitomationacademy.com?subject=unsubscribe";

export interface Ctx {
  firstName: string;
  role: string; // consultant | marketer | creator | founder | agency | developer | other
  experience: string; // learning | beginner | built | expert
}

const ROLE_SECTION: Record<string, string> = {
  consultant: "the Consultants & Advisors section (30 prompts & skills: proposals, discovery, decks)",
  agency: "the Agencies & Client Services section (30 prompts & skills: onboarding, reporting, retainers)",
  marketer: "the Marketers section (35 prompts & skills: ads, landing pages, email, SEO briefs)",
  creator: "the Creators & Content section (35 prompts & skills: scripts, hooks, repurposing)",
  founder: "the Founders & Executives section (30 prompts & skills: strategy, board updates, hiring)",
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
    return `<p>You're past the basics, so skip the intro track. What you want is the Claude Code course and the Vault's power-setup section — CLAUDE.md templates, custom commands, subagents, and hooks that most people never configure. Both are inside Academy Premium, and the 7-day free trial covers all of it.</p>${btn(URL.plans, "Start the free trial")}`;
  }
  return `<p>Start with the 7-Day Claude Challenge. By the end you'll have a real website live on the internet, built by talking to Claude — no coding. It's inside Academy Premium, and the 7-day free trial covers it, so you can finish the whole Challenge before you pay anything.</p>${btn(URL.plans, "Start Day 1 free")}`;
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
<p>That prompt is 1 of 550+ in the Claude Vault — organized by your job and updated weekly. It's part of Academy Premium.</p>
${btn(URL.community, "Post your intro")}`,
      ),
  },
  {
    day: 1,
    id: "d1-path",
    subject: () => `Here's your path (free vs Premium)`,
    html: (c) =>
      layout(
        `<p>Hey ${c.firstName},</p>
<p>Quick map so you don't get lost:</p>
<p><b>Free, right now:</b> Start Here, the Claude Automations from my videos, and my discount codes.</p>
<p><b>Inside Academy Premium:</b> the 7-Day Challenge, the Cowork course, the Claude Code course, the weekly live call, and the Claude Vault.</p>
<p>Based on what you told me, the part of the Vault you'll get the most from is ${roleLine(c.role)}.</p>
<p>The Vault alone lists at $49 on our site. Premium members get it included — and it grows every week.</p>
${btn(URL.plans, "See what Premium includes")}`,
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
<p>That shift is the entire game, and it's what every course and prompt inside Academy Premium is built to teach.</p>
${btn(URL.plans, "See what's inside")}`,
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
<p><b>"I don't have time."</b> That's the reason to be inside, not to wait. The whole point is Claude doing the work you don't have time for. Most members start with one prompt that saves them an afternoon a week.</p>
<p><b>"I'm not technical enough."</b> Neither are most members. The 7-Day Challenge assumes zero coding and ends with a live website. If you can write an email, you can do this.</p>
<p>Reply to this email and tell me what you're working on — I'll point you at the exact prompt for it.</p>
${btn(URL.plans, "Unlock everything")}`,
      ),
  },
  {
    day: 8,
    id: "d8-offer",
    subject: () => `Everything you get as a Premium member`,
    html: (c) =>
      layout(
        `<p>Hey ${c.firstName},</p>
<p>Straight version — here's what Academy Premium unlocks:</p>
<ul>
<li>The 7-Day Claude Challenge — zero to a live website</li>
<li>The Claude Cowork course — put your weekly busywork on autopilot</li>
<li>The Claude Code course — build real tools</li>
<li>The Claude Vault — 550+ prompts & skills, new ones every week ($49 on its own)</li>
<li>The weekly live call — bring your project, we fix it live</li>
</ul>
<p>The founder rate is $69/mo, locked for life. At 1,300 members it rises to $99/mo for new joiners. There's a 7-day free trial, and you can cancel anytime.</p>
${btn(URL.plans, "Join Academy Premium")}`,
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
${btn(URL.plans, "Start there")}`,
      ),
  },
  {
    day: 14,
    id: "d14-decision",
    subject: () => `last note from me`,
    html: (c) =>
      layout(
        `<p>Hey ${c.firstName},</p>
<p>This is the last email in the welcome series — after this you'll just hear from me when new prompts & skills drop.</p>
<p>The free stuff is yours to keep. But the people who actually change how they work are the ones inside, using it every week. If that's you, the door's open.</p>
${btn(URL.plans, "Join Academy Premium")}
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
<li>Open the Vault and grab your first prompts from ${roleLine(c.role)}.</li>
<li>Add the weekly live call to your calendar — bring a real question.</li>
</ol>
${btn(URL.challenge, "Start the Challenge")}
<p>See you inside.</p>`,
    ),
};

export const LAST_DAY = SEQUENCE[SEQUENCE.length - 1].day;
