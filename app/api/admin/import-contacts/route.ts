import { NextRequest, NextResponse } from "next/server";

// One-off admin endpoint: bulk-import a semicolon CSV of contacts into Brevo.
// Protected by CRON_SECRET (Authorization: Bearer <secret>). The CSV is passed
// straight to Brevo's /contacts/import as fileBody; list ids come from ?lists=19,21.
// Used for the member-base import and future churned-list imports. Server-side
// only so member PII never travels through third parties.

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "BREVO_API_KEY not set" }, { status: 500 });
  }

  const listsParam = req.nextUrl.searchParams.get("lists") || "";
  const listIds = listsParam
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  if (listIds.length === 0) {
    return NextResponse.json({ error: "pass ?lists=19,21" }, { status: 400 });
  }

  const fileBody = await req.text();
  const lines = fileBody.trim().split("\n");
  if (lines.length < 2 || !lines[0].toUpperCase().startsWith("EMAIL;")) {
    return NextResponse.json(
      { error: "body must be a semicolon CSV with an EMAIL;... header" },
      { status: 400 },
    );
  }

  const res = await fetch("https://api.brevo.com/v3/contacts/import", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      fileBody,
      listIds,
      updateExistingContacts: true,
      emptyContactsAttributes: false,
      disableNotification: true,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json({ error: "brevo import failed", detail: data }, { status: 502 });
  }
  return NextResponse.json({ ok: true, rows: lines.length - 1, processId: data.processId });
}
