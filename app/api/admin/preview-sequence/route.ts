import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/brevo";
import { SEQUENCE, PAID_WELCOME, type Ctx } from "@/lib/sequence";

// Admin-only: send the ENTIRE nurture sequence (all days at once) to one inbox
// for copy review, rendered for a given persona. Protected by CRON_SECRET.
// POST /api/admin/preview-sequence?to=me@x.com&role=consultant&experience=beginner

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const p = req.nextUrl.searchParams;
  const to = p.get("to") || "";
  if (!to.includes("@")) {
    return NextResponse.json({ error: "pass ?to=email" }, { status: 400 });
  }
  const ctx: Ctx = {
    firstName: p.get("firstName") || "Marko",
    role: (p.get("role") || "other").toLowerCase(),
    experience: (p.get("experience") || "learning").toLowerCase(),
  };
  const label = `${ctx.role}/${ctx.experience}`;

  let sent = 0;
  const errors: string[] = [];
  for (const step of SEQUENCE) {
    try {
      await sendEmail({
        to,
        subject: `[PREVIEW ${label} D${step.day}] ${step.subject(ctx)}`,
        htmlContent: step.html(ctx),
        tag: "sequence-preview",
      });
      sent++;
    } catch (err) {
      errors.push(`D${step.day}: ${(err as Error).message}`);
    }
  }
  try {
    await sendEmail({
      to,
      subject: `[PREVIEW ${label} PAID-WELCOME] ${PAID_WELCOME.subject(ctx)}`,
      htmlContent: PAID_WELCOME.html(ctx),
      tag: "sequence-preview",
    });
    sent++;
  } catch (err) {
    errors.push(`paid-welcome: ${(err as Error).message}`);
  }

  return NextResponse.json({ ok: true, persona: label, sent, errors });
}
