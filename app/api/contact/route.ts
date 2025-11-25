import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // TODO: integrate with email service or CRM.
  console.log("Contact request received", body);

  return NextResponse.json({ success: true });
}
