// Brevo API helpers for the Skool member sequence engine.
// Brevo is the single source of truth: CRM, transactional sender, and open/click tracker.
// No separate database — each contact's sequence position lives in Brevo attributes.

const BREVO = "https://api.brevo.com/v3";

export const FREE_LIST_ID = 19; // "Skool Members — Free Tier"

export const SENDER = {
  name: "Marko — Claude Code Academy",
  email: "contact@aitomationacademy.com", // verified + active sender in Brevo
} as const;

function headers() {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY is not set");
  return {
    "api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export interface MemberAttributes {
  FIRSTNAME?: string;
  LASTNAME?: string;
  ROLE?: string; // consultant | marketer | creator | founder | agency | developer | other
  EXPERIENCE?: string; // learning | beginner | built | expert
  SKOOL_JOINED_AT?: string; // YYYY-MM-DD
  MEMBER_STATUS?: "free" | "paid";
  SEQ_STATUS?: "active" | "paid" | "done" | "unsub";
  SEQ_LAST_DAY?: number; // highest sequence-day email already sent (-1 = none yet)
}

export interface BrevoContact {
  email: string;
  id: number;
  attributes: Record<string, unknown>;
  emailBlacklisted?: boolean;
}

export async function upsertContact(
  email: string,
  attributes: MemberAttributes,
  listIds: number[] = [FREE_LIST_ID],
): Promise<void> {
  const res = await fetch(`${BREVO}/contacts`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, attributes, listIds, updateEnabled: true }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Brevo upsertContact ${res.status}: ${txt}`);
  }
}

export async function updateContact(
  email: string,
  attributes: MemberAttributes,
): Promise<void> {
  const res = await fetch(
    `${BREVO}/contacts/${encodeURIComponent(email)}`,
    { method: "PUT", headers: headers(), body: JSON.stringify({ attributes }) },
  );
  if (!res.ok && res.status !== 204) {
    const txt = await res.text();
    throw new Error(`Brevo updateContact ${res.status}: ${txt}`);
  }
}

// Paginate all contacts in a list. Scale is small (~hundreds), so full walk is fine.
export async function getListContacts(
  listId: number = FREE_LIST_ID,
): Promise<BrevoContact[]> {
  const out: BrevoContact[] = [];
  let offset = 0;
  const limit = 500;
  for (;;) {
    const res = await fetch(
      `${BREVO}/contacts/lists/${listId}/contacts?limit=${limit}&offset=${offset}`,
      { headers: headers() },
    );
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Brevo getListContacts ${res.status}: ${txt}`);
    }
    const data = (await res.json()) as { contacts?: BrevoContact[] };
    const batch = data.contacts ?? [];
    out.push(...batch);
    if (batch.length < limit) break;
    offset += limit;
  }
  return out;
}

// Transactional send. Brevo auto-tracks opens + clicks for these.
export async function sendEmail(params: {
  to: string;
  name?: string;
  subject: string;
  htmlContent: string;
  tag: string;
}): Promise<void> {
  const res = await fetch(`${BREVO}/smtp/email`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      sender: SENDER,
      to: [{ email: params.to, name: params.name || undefined }],
      subject: params.subject,
      htmlContent: params.htmlContent,
      tags: [params.tag],
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Brevo sendEmail ${res.status}: ${txt}`);
  }
}
