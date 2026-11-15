import { NextResponse } from "next/server";

/**
 * The current contact form uses a mailto hand-off and does not POST enquiry data
 * to this application. Keep this route disabled so an old endpoint cannot
 * accidentally log or accept personal enquiry details.
 */
export async function POST() {
  return NextResponse.json(
    { ok: false, error: "The website enquiry endpoint is disabled. Please use the email link on the Contact page." },
    { status: 410 },
  );
}
