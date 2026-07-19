// Ingest endpoint. Zapier ("Answered Membership Questions" + "New Paid Member")
// POSTs here. This is the "Skool webhook" — Skool has no native webhooks, so Zapier
// bridges its events to our backend. Secured by a shared secret.
import { NextRequest, NextResponse } from "next/server";
import {
  upsertContact,
  updateContact,
  sendEmail,
  type MemberAttributes,
} from "@/lib/brevo";
import { SEQUENCE, PAID_WELCOME, type Ctx } from "@/lib/sequence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: NextRequest): boolean {
  const secret = process.env.SKOOL_WEBHOOK_SECRET;
  if (!secret) return false;
  const header = req.headers.get("x-webhook-secret");
  const query = req.nextUrl.searchParams.get("secret");
  return header === secret || query === secret;
}

function normalizeRole(raw?: string): string {
  const s = (raw || "").toLowerCase();
  if (s.includes("consult")) return "consultant";
  if (s.includes("agency")) return "agency";
  if (s.includes("market")) return "marketer";
  if (s.includes("creator") || s.includes("content")) return "creator";
  if (s.includes("founder") || s.includes("business")) return "founder";
  if (s.includes("develop") || s.includes("technical")) return "developer";
  return "other";
}

function normalizeExperience(raw?: string): string {
  const s = (raw || "").toLowerCase();
  if (s.includes("expert")) return "expert";
  if (s.includes("built")) return "built";
  if (s.includes("begin")) return "beginner";
  return "learning";
}

function firstNameOf(name?: string, first?: string): string {
  if (first && first.trim()) return first.trim().split(" ")[0];
  if (name && name.trim()) return name.trim().split(" ")[0];
  return "there";
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, string | undefined>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }

  // event defaults to "join"; Zapier "New Paid Member" zap should send event=paid
  const event = (body.event || "join").toLowerCase();
  const firstName = firstNameOf(body.name, body.firstName);
  const lastName =
    body.lastName || (body.name ? body.name.split(" ").slice(1).join(" ") : "");

  try {
    if (event === "paid") {
      const attrs: MemberAttributes = {
        MEMBER_STATUS: "paid",
        SEQ_STATUS: "paid",
      };
      await updateContact(email, attrs).catch(() =>
        upsertContact(email, { FIRSTNAME: firstName, ...attrs }),
      );
      const ctx: Ctx = {
        firstName,
        role: normalizeRole(body.role),
        experience: normalizeExperience(body.experience),
      };
      await sendEmail({
        to: email,
        name: firstName,
        subject: PAID_WELCOME.subject(ctx),
        htmlContent: PAID_WELCOME.html(ctx),
        tag: `seq:${PAID_WELCOME.id}`,
      });
      return NextResponse.json({ ok: true, event: "paid" });
    }

    // join
    const role = normalizeRole(body.role);
    const experience = normalizeExperience(body.experience);
    const attrs: MemberAttributes = {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      ROLE: role,
      EXPERIENCE: experience,
      SKOOL_JOINED_AT: today(),
      MEMBER_STATUS: "free",
      SEQ_STATUS: "active",
      SEQ_LAST_DAY: -1,
    };
    await upsertContact(email, attrs);

    // Send Day 0 immediately, then mark it sent.
    const ctx: Ctx = { firstName, role, experience };
    const d0 = SEQUENCE[0];
    await sendEmail({
      to: email,
      name: firstName,
      subject: d0.subject(ctx),
      htmlContent: d0.html(ctx),
      tag: `seq:${d0.id}`,
    });
    await updateContact(email, { SEQ_LAST_DAY: 0 });

    return NextResponse.json({ ok: true, event: "join", role, experience });
  } catch (err) {
    console.error("skool ingest error:", err);
    return NextResponse.json({ error: "processing failed" }, { status: 502 });
  }
}
