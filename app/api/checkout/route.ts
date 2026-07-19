// Creates a Stripe hosted Checkout Session for the Claude Vault.
// Calls Stripe's REST API directly (no SDK dependency). Card handling stays on Stripe.
// Env required (Marko adds in Vercel):
//   STRIPE_SECRET_KEY   — sk_live_... or sk_test_...
//   STRIPE_VAULT_PRICE  — a Stripe Price ID (price_...) for the Vault. Optional:
//                         if unset, we create an inline price from lib/pricing VAULT.launchPrice.
import { NextRequest, NextResponse } from "next/server";
import { VAULT } from "@/lib/pricing";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Checkout is not configured yet." },
      { status: 503 },
    );
  }

  let email: string | undefined;
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email : undefined;
  } catch {
    // no body is fine
  }

  const base = siteConfig.url;
  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("success_url", `${base}/vault/success?session_id={CHECKOUT_SESSION_ID}`);
  form.set("cancel_url", `${base}/vault?cancelled=1`);
  form.set("allow_promotion_codes", "true");
  form.set("billing_address_collection", "auto");
  if (email) form.set("customer_email", email);

  const priceId = process.env.STRIPE_VAULT_PRICE;
  if (priceId) {
    form.set("line_items[0][price]", priceId);
    form.set("line_items[0][quantity]", "1");
  } else {
    // Inline price fallback so checkout works before a Price is created in Stripe.
    form.set("line_items[0][price_data][currency]", VAULT.currency);
    form.set("line_items[0][price_data][unit_amount]", String(VAULT.launchPrice * 100));
    form.set("line_items[0][price_data][product_data][name]", VAULT.name);
    form.set(
      "line_items[0][price_data][product_data][description]",
      VAULT.tagline,
    );
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
