// Creates Stripe hosted Checkout Sessions for:
//   - product "vault":      one-time $ (VAULT.launchPrice)
//   - product "membership": recurring $/month (MEMBERSHIP.price)
// Direct REST calls, no SDK. Env:
//   STRIPE_SECRET_KEY        — required
//   STRIPE_VAULT_PRICE       — optional price_... for the Vault (else inline price)
//   STRIPE_MEMBERSHIP_PRICE  — optional recurring price_... (else inline monthly price)
import { NextRequest, NextResponse } from "next/server";
import { VAULT, MEMBERSHIP } from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (VAULT.salesPaused) {
    return NextResponse.json(
      { error: "Purchases are paused for a few days — check back shortly." },
      { status: 503 },
    );
  }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Checkout is not configured yet." },
      { status: 503 },
    );
  }

  let email: string | undefined;
  let product: "vault" | "membership" = "vault";
  try {
    const body = await req.json();
    if (typeof body?.email === "string") email = body.email;
    if (body?.product === "membership") product = "membership";
  } catch {
    // no body is fine — defaults to vault
  }

  const base = siteConfig.url;
  const form = new URLSearchParams();
  form.set("allow_promotion_codes", "true");
  form.set("billing_address_collection", "auto");
  if (email) form.set("customer_email", email);

  if (product === "membership") {
    form.set("mode", "subscription");
    form.set("success_url", `${base}/vault/success?sub=1&session_id={CHECKOUT_SESSION_ID}`);
    form.set("cancel_url", `${base}/vault/success?sub_cancelled=1`);
    const priceId = process.env.STRIPE_MEMBERSHIP_PRICE;
    if (priceId) {
      form.set("line_items[0][price]", priceId);
    } else {
      form.set("line_items[0][price_data][currency]", MEMBERSHIP.currency);
      form.set("line_items[0][price_data][unit_amount]", String(MEMBERSHIP.price * 100));
      form.set("line_items[0][price_data][recurring][interval]", "month");
      form.set("line_items[0][price_data][product_data][name]", MEMBERSHIP.name);
      form.set(
        "line_items[0][price_data][product_data][description]",
        MEMBERSHIP.tagline,
      );
    }
    form.set("line_items[0][quantity]", "1");
  } else {
    form.set("mode", "payment");
    form.set("success_url", `${base}/vault/success?session_id={CHECKOUT_SESSION_ID}`);
    form.set("cancel_url", `${base}/vault?cancelled=1`);
    const priceId = process.env.STRIPE_VAULT_PRICE;
    if (priceId) {
      form.set("line_items[0][price]", priceId);
    } else {
      form.set("line_items[0][price_data][currency]", VAULT.currency);
      form.set("line_items[0][price_data][unit_amount]", String(VAULT.launchPrice * 100));
      form.set("line_items[0][price_data][product_data][name]", VAULT.name);
      form.set(
        "line_items[0][price_data][product_data][description]",
        VAULT.tagline,
      );
    }
    form.set("line_items[0][quantity]", "1");
  }

  try {
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });
    const data = (await res.json()) as { url?: string; error?: { message?: string } };
    if (!res.ok || !data.url) {
      console.error("Stripe checkout error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Could not start checkout." },
        { status: 502 },
      );
    }
    return NextResponse.json({ url: data.url });
  } catch (err) {
    console.error("Stripe request failed:", err);
    return NextResponse.json({ error: "Could not start checkout." }, { status: 502 });
  }
}
