// Live seat counter for the Vault launch price. Counts REAL completed Stripe
// checkout sessions (mode=payment, metadata.product=vault) since the ladder
// start date and returns how many of the launch-price seats remain. If Stripe
// is unreachable, returns null — the UI hides rather than guess: this number
// is only ever shown when it is true.
import { NextResponse } from "next/server";
import { VAULT_SEATS } from "@/lib/pricing";

export const runtime = "nodejs";
export const revalidate = 300; // cache 5 minutes

export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ remaining: null });
  try {
    const since = Math.floor(new Date(VAULT_SEATS.since).getTime() / 1000);
    let sold = 0;
    let startingAfter: string | undefined;
    for (let page = 0; page < 5; page++) {
      const params = new URLSearchParams({
        limit: "100",
        "created[gte]": String(since),
      });
      if (startingAfter) params.set("starting_after", startingAfter);
      const res = await fetch(
        `https://api.stripe.com/v1/checkout/sessions?${params}`,
        { headers: { Authorization: `Bearer ${key}` }, next: { revalidate: 300 } },
      );
      if (!res.ok) return NextResponse.json({ remaining: null });
      const data = (await res.json()) as {
        data: { id: string; status: string; mode: string; metadata?: { product?: string } }[];
        has_more: boolean;
      };
      sold += data.data.filter(
        (s) => s.status === "complete" && s.mode === "payment" && s.metadata?.product === "vault",
      ).length;
      if (!data.has_more) break;
      startingAfter = data.data[data.data.length - 1]?.id;
    }
    return NextResponse.json({
      remaining: Math.max(0, VAULT_SEATS.total - sold),
      total: VAULT_SEATS.total,
    });
  } catch {
    return NextResponse.json({ remaining: null });
  }
}
