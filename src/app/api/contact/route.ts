import { NextResponse } from "next/server";
import { parseContact, validateContact } from "@/lib/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const data = parseContact(body);

  // Honeypot filled in: most likely a bot. Respond as if successful and drop it.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: Deliver the enquiry by email before going live.
  // Use a transactional email provider (for example Resend, Postmark or SMTP
  // via Nodemailer), keep its API key in an environment variable, and send
  // `data` to the address in src/config/site.ts (siteConfig.contact.email).
  // Until then, enquiries are only acknowledged and are not stored or sent.

  return NextResponse.json({
    ok: true,
    message: "Thank you. Your enquiry has been received.",
  });
}
