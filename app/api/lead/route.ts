import { NextResponse } from "next/server";
import { z } from "zod";

// Contact-form endpoint for the static marketing site (replaces the app's Convex
// mutation). Input is untrusted: validate, trim and cap every field. If a
// LEAD_WEBHOOK_URL is configured, forward the lead there (Slack / Zapier / an
// email service); otherwise log it server-side.
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  product: z.string().optional(),
  message: z.string().min(10),
});

const cap = (s: string, n: number) => s.trim().slice(0, n);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 422 },
    );
  }

  const lead = {
    name: cap(parsed.data.name, 200),
    email: cap(parsed.data.email, 200),
    company: parsed.data.company ? cap(parsed.data.company, 200) : undefined,
    product: parsed.data.product ? cap(parsed.data.product, 200) : undefined,
    message: cap(parsed.data.message, 4000),
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error("Failed to forward lead to webhook:", err);
    }
  } else {
    console.log("New lead:", lead);
  }

  return NextResponse.json({ ok: true });
}
