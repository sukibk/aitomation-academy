// Daily drip stepper. Vercel Cron hits this once a day.
// For each active free member it sends the next due sequence email (at most one per
// run), using the SEQ_LAST_DAY attribute as an idempotent gate. Brevo tracks opens/clicks.
import { NextRequest, NextResponse } from "next/server";
import {
  getListContacts,
  updateContact,
  sendEmail,
  FREE_LIST_ID,
} from "@/lib/brevo";
import { SEQUENCE, LAST_DAY, type Ctx } from "@/lib/sequence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function attr(c: Record<string, unknown>, k: string): string | undefined {
  const v = c[k];
  return v === undefined || v === null ? undefined : String(v);
}

function daysSince(dateStr?: string): number {
  if (!dateStr) return -1;
  const then = new Date(dateStr).getTime();
  if (Number.isNaN(then)) return -1;
  return Math.floor((Date.now() - then) / 86_400_000);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const contacts = await getListContacts(FREE_LIST_ID);
  let sent = 0;
  let advanced = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const c of contacts) {
    try {
      const a = c.attributes || {};
      // Only contacts EXPLICITLY marked active by the join webhook enter the
      // nurture. Contacts without SEQ_STATUS (e.g. bulk imports) are never
      // dripped — defaulting to active once nearly welcome-mailed 1,150
      // long-time members after the 2026-07 import.
      const status = (attr(a, "SEQ_STATUS") || "").toLowerCase();
      const member = (attr(a, "MEMBER_STATUS") || "free").toLowerCase();
      // Self-heal: a website membership buyer who later joins Skool gets
      // overwritten to free/active by the join Zap. PURCHASED survives that
      // overwrite, so restore their paid state instead of nurturing them.
      if (attr(a, "PURCHASED") === "membership" && (member !== "paid" || status === "active")) {
        await updateContact(c.email, { MEMBER_STATUS: "paid", SEQ_STATUS: "paid" });
        skipped++;
        continue;
      }
      if (c.emailBlacklisted || member === "paid" || status !== "active") {
        skipped++;
        continue;
      }

      let days = daysSince(attr(a, "SKOOL_JOINED_AT"));
      if (days < 0) {
        // Zap-created contacts may arrive without a join date. Active status is
        // only ever set at join time, so treat them as joined today.
        const todayStr = new Date().toISOString().slice(0, 10);
        await updateContact(c.email, { SKOOL_JOINED_AT: todayStr });
        days = 0;
      }
      const lastDay = Number(attr(a, "SEQ_LAST_DAY") ?? -1);

      // Next unsent step that is now due.
      const due = SEQUENCE
        .filter((s) => s.day > lastDay && s.day <= days)
        .sort((x, y) => x.day - y.day)[0];

      if (!due) {
        // No due step. If they've cleared the last day, mark the series done.
        if (lastDay >= LAST_DAY) {
          await updateContact(c.email, { SEQ_STATUS: "done" });
          advanced++;
        } else {
          skipped++;
        }
        continue;
      }

      const ctx: Ctx = {
        firstName: attr(a, "FIRSTNAME") || "there",
        role: (attr(a, "ROLE") || "other").toLowerCase(),
        experience: (attr(a, "EXPERIENCE") || "learning").toLowerCase(),
      };

      await sendEmail({
        to: c.email,
        name: ctx.firstName,
        subject: due.subject(ctx),
        htmlContent: due.html(ctx),
        tag: `seq:${due.id}`,
      });
      await updateContact(c.email, { SEQ_LAST_DAY: due.day });
      sent++;
    } catch (err) {
      errors.push(`${c.email}: ${(err as Error).message}`);
    }
  }

  return NextResponse.json({
    ok: true,
    scanned: contacts.length,
    sent,
    advanced,
    skipped,
    errors: errors.slice(0, 20),
  });
}
