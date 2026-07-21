// Stripe webhook: automated Vault delivery on purchase.
// On checkout.session.completed: (1) email the buyer access instructions via Brevo,
// (2) upsert them into the Vault Buyers list, (3) notify Marko for the Skool unlock.
// Env required: STRIPE_WEBHOOK_SECRET (from the Stripe webhook endpoint), BREVO_API_KEY (set).
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { upsertContact, sendEmail, trackEvent, contactExists } from "@/lib/brevo";
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

// POST the buyer's email to Skool's invite webhook (Group Settings -> Invite -> Automate via Webhook).
// Sends the email both as a query param and in a JSON body to tolerate either accepted format.
async function skoolInvite(email: string, name?: string): Promise<boolean> {
  const url = process.env.SKOOL_INVITE_WEBHOOK;
  if (!url) return false;
  try {
    const u = new URL(url);
    u.searchParams.set("email", email);
    if (name) u.searchParams.set("name", name);
    const res = await fetch(u.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    if (!res.ok) {
      console.error("skool invite webhook non-OK:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("skool invite webhook failed:", err);
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
<p style="margin-top:20px;padding:14px;background:#f4efe8;border-radius:6px"><b>P.S.</b> The Vault is the library — membership is the whole workshop: every course (the 7-Day Challenge, Cowork, Claude Code), the weekly live call where we fix your project together, and your rate locked for life before it rises. <a href="${siteConfig.url}/#membership" style="color:#C2571B;font-weight:600">See what members get</a>.</p>
<hr style="border:none;border-top:1px solid #e6dfd6;margin:28px 0 12px">
<p style="font-size:12px;color:#8a8078">AItomation Academy · You're receiving this because you purchased the Claude Vault at ${siteConfig.url}/vault</p>
</div>`;
}

function membershipEmail(firstName: string): string {
  const hi = firstName ? `Hey ${firstName},` : "Hey,";
  return `<div style="max-width:560px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#2a2420">
<p>${hi}</p>
<p>Welcome to Claude Code Academy — you're a full member, and your founder rate is locked for life. Two steps:</p>
<p><b>1. Join the community space (1 minute):</b></p>
<p><a href="${SKOOL_INVITE}" style="background:#C2571B;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Join here</a></p>
<p><b>2. Full access gets switched on for your account</b> — every course (the 7-Day Claude Challenge, Cowork, Claude Code), the complete Claude Vault, and the weekly live call. Usually within the hour.</p>
<p>Start with Day 1 of the Challenge tonight — by next week you'll have built something real.</p>
<p>One important note: your billing runs through our site, not Skool — so ignore any upgrade prompts inside Skool. You're already covered.</p>
<p>Any problem — reply to this email.</p>
<p>— Marko</p>
<hr style="border:none;border-top:1px solid #e6dfd6;margin:28px 0 12px">
<p style="font-size:12px;color:#8a8078">AItomation Academy · You're receiving this because you became a member at ${siteConfig.url}</p>
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

  // Subscription cancelled -> notify admin to remove Skool access
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data?.object ?? {};
    try {
      await sendEmail({
        to: siteConfig.email,
        subject: "Membership cancelled — remove Skool access",
        htmlContent: `<p>A site-billed membership was cancelled (Stripe customer: ${String(sub.customer || "?")}). Remove their premium access in Skool.</p>`,
        tag: "membership-cancelled-admin",
      });
    } catch (err) {
      console.error("stripe-webhook: cancel notify failed", err);
    }
    return NextResponse.json({ received: true });
  }

  // Abandoned checkout -> arm the Brevo recovery flow (only for contacts we may
  // email: existing contacts/members, or visitors who ticked the promotions consent).
  if (event.type === "checkout.session.expired") {
    const session = event.data?.object ?? {};
    const details = (session.customer_details ?? {}) as { email?: string };
    const email = (details.email || (session.customer_email as string) || "").toLowerCase();
    if (!email) return NextResponse.json({ received: true });

    const consent = (session.consent ?? {}) as { promotions?: string };
    const recovery = ((session.after_expiration ?? {}) as {
      recovery?: { url?: string };
    }).recovery;
    const meta = (session.metadata ?? {}) as { product?: string };
    const cart = meta.product === "membership" ? "membership" : "vault";

    try {
      const allowed = consent.promotions === "opt_in" || (await contactExists(email));
      if (allowed) {
        // Adding to list 23 triggers the Brevo "Checkout abandon" automation
        // (list trigger is more reliable than the custom-event trigger in the builder).
        await upsertContact(email, {
          ABANDONED_AT: new Date().toISOString().slice(0, 10),
          CART: cart,
          RECOVERY_URL: recovery?.url || "",
        } as never, [23]);
        await trackEvent(email, "cart_abandoned", {
          product: cart,
          recovery_url: recovery?.url || "",
        });
      }
    } catch (err) {
      console.error("stripe-webhook: abandoned-cart handling failed", err);
    }
    return NextResponse.json({ received: true });
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

  const isSubscription = session.mode === "subscription";

  // Auto-invite the buyer to Skool (no-op until SKOOL_INVITE_WEBHOOK is set)
  const invited = await skoolInvite(email, name);

  // Purchase event: exits every Brevo automation (upgrade, win-back, abandon, visitor).
  try {
    await trackEvent(email, "purchased", {
      product: isSubscription ? "membership" : "vault",
    });
  } catch (err) {
    console.error("stripe-webhook: purchased event failed", err);
  }

  try {
    await upsertContact(
      email,
      {
        FIRSTNAME: firstName,
        MEMBER_STATUS: isSubscription ? "paid" : "free",
        // PURCHASED is the tamper-proof purchase record: the join Zap overwrites
        // MEMBER_STATUS/SEQ_STATUS with free/active when a buyer later joins
        // Skool, but never touches this field. The cron self-heals from it.
        PURCHASED: isSubscription ? "membership" : "vault",
      } as never,
      [VAULT_BUYERS_LIST],
    );
  } catch (err) {
    console.error("stripe-webhook: brevo upsert failed", err);
  }

  try {
    await sendEmail({
      to: email,
      name: firstName || undefined,
      subject: isSubscription
        ? "Welcome to Claude Code Academy — your access steps"
        : "Your Claude Vault access — next steps inside",
      htmlContent: isSubscription ? membershipEmail(firstName) : deliveryEmail(firstName),
      tag: isSubscription ? "membership-delivery" : "vault-delivery",
    });
  } catch (err) {
    console.error("stripe-webhook: delivery email failed", err);
  }

  try {
    await sendEmail({
      to: siteConfig.email,
      subject: isSubscription
        ? `NEW MEMBER ($69/mo via site) — grant full Skool access: ${email}`
        : `Vault sale — unlock Skool for ${email}`,
      htmlContent: isSubscription
        ? `<p>New site-billed membership.</p><p><b>${name || "(no name)"} — ${email}</b></p><p>Skool auto-invite: <b>${invited ? "SENT" : "NOT SENT (webhook not configured/failed)"}</b>.</p><p>To do: when they join Skool, unlock ALL premium courses (Vault, 7DC, Cowork, Claude Code) on their account. They pay via Stripe, not Skool — make sure they never also subscribe inside Skool.</p>`
        : `<p>New Vault purchase.</p><p><b>${name || "(no name)"} — ${email}</b></p><p>Skool auto-invite: <b>${invited ? "SENT" : "NOT SENT (webhook not configured/failed)"}</b>.</p><p>To do (2 min): when they join Skool, unlock the Claude Vault course on their account.</p>`,
      tag: isSubscription ? "membership-sale-admin" : "vault-sale-admin",
    });
  } catch (err) {
    console.error("stripe-webhook: admin notify failed", err);
  }

  return NextResponse.json({ received: true });
}
