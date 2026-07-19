// Stripe webhook: automated Vault delivery on purchase.
// On checkout.session.completed: (1) email the buyer access instructions via Brevo,
// (2) upsert them into the Vault Buyers list, (3) notify Marko for the Skool unlock.
// Env required: STRIPE_WEBHOOK_SECRET (from the Stripe webhook endpoint), BREVO_API_KEY (set).
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { upsertContact, sendEmail } from "@/lib/brevo";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VAULT_BUYERS_LIST = 20; // Brevo list for external Vault buyers
const SKOOL_INVITE = "https://www.skool.com/claude-academy";

// Verify Stripe-Signature (t=timestamp,v1=hmac) without the SDK.
function verifyStripeSignature(payload: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((kv) => kv.split("=") as [string, string]),
  );
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;
  // Reject events older than 5 minutes (replay protection)
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${t}.${payload}`)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1));
  } catch {
    return false;
  }
}

function deliveryEmail(firstName: string): string {
  const hi = firstName ? `Hey ${firstName},` : "Hey,";
  return `<div style="max-width:560px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#2a2420">
<p>${hi}</p>
<p>Thank you — your Claude Vault purchase went through. Here is exactly what happens next:</p>
<p><b>1. Join the community space (1 minute).</b> The Vault lives inside our Skool community. Join with the same name you'd like your access under:</p>
<p><a href="${SKOOL_INVITE}" style="background:#C2571B;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Join here</a></p>
<p><b>2. Your Vault access gets unlocked on your account</b> — within a few hours, usually much faster. You'll see "Claude Vault" open up in the Classroom tab: 550+ skills, prompts, and workflows sorted by your job, updated weekly.</p>
<p><b>3. Start with your job's section.</b> Consultant, marketer, creator, founder, or agency — copy one recipe and run it today. That first 10 minutes is where the "oh, THAT's how this works" moment happens.</p>
<p>Any problem at all — just reply to this email. 7-day money-back guarantee, no questions.</p>
<p>— Marko</p>
<hr style="border:none;border-top:1px solid #e6dfd6;margin:28px 0 12px">
<p style="font-size:12px;color:#8a8078">AItomation Academy · You're receiving this because you purchased the Claude Vault at ${siteConfig.url}/vault</p>
</div>`;
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "webhook not configured" }, { status: 503 });
  }

  const payload = await req.text();
  if (!verifyStripeSignature(payload, req.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  let event: { type?: string; data?: { object?: Record<string, unknown> } };
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: "bad payload" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data?.object ?? {};
  const details = (session.customer_details ?? {}) as { email?: string; name?: string };
  const email = (details.email || (session.customer_email as string) || "").toLowerCase();
  const name = details.name || "";
  const firstName = name.split(" ")[0] || "";

  if (!email) {
    console.error("stripe-webhook: completed session without email", session.id);
    return NextResponse.json({ received: true });
  }

  try {
    await upsertContact(
      email,
      { FIRSTNAME: firstName, MEMBER_STATUS: "free" },
      [VAULT_BUYERS_LIST],
    );
  } catch (err) {
    console.error("stripe-webhook: brevo upsert failed", err);
  }

  try {
    await sendEmail({
      to: email,
      name: firstName || undefined,
      subject: "Your Claude Vault access — next steps inside",
      htmlContent: deliveryEmail(firstName),
      tag: "vault-delivery",
    });
  } catch (err) {
    console.error("stripe-webhook: delivery email failed", err);
  }

  try {
    await sendEmail({
      to: siteConfig.email,
      subject: `Vault sale — unlock Skool for ${email}`,
      htmlContent: `<p>New Vault purchase.</p><p><b>${name || "(no name)"} — ${email}</b></p><p>To do (2 min): when they join Skool, unlock the Claude Vault course on their account. Buyer was told access appears within a few hours.</p>`,
      tag: "vault-sale-admin",
    });
  } catch (err) {
    console.error("stripe-webhook: admin notify failed", err);
  }

  return NextResponse.json({ received: true });
}
