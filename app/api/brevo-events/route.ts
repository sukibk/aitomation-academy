// Brevo event webhook. Brevo POSTs delivery/open/click/unsubscribe/spam events here.
// We use it to (1) stop the sequence on unsubscribe or spam complaint — compliance-critical,
// and (2) stamp ENGAGED_AT on opens/clicks so hot leads are visible/segmentable.
// Opens & clicks are ALSO visible natively in the Brevo dashboard per email.
import { NextRequest, NextResponse } from "next/server";
import { updateContact } from "@/lib/brevo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: NextRequest): boolean {
  const secret = process.env.BREVO_WEBHOOK_SECRET;
  if (!secret) return false;
  return req.nextUrl.searchParams.get("secret") === secret;
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const event = String(body.event || "").toLowerCase();
  if (!email) return NextResponse.json({ ok: true });

  try {
    if (event === "unsubscribed" || event === "spam" || event === "spam_complaint") {
      await updateContact(email, { SEQ_STATUS: "unsub" });
    } else if (event === "opened" || event === "unique_opened" || event === "click" || event === "clicks") {
      await updateContact(email, { ENGAGED_AT: new Date().toISOString().slice(0, 10) } as never);
    }
  } catch (err) {
    console.error("brevo-events error:", err);
    // Always 200 so Brevo doesn't disable the webhook on transient failures.
  }
  return NextResponse.json({ ok: true });
}
