import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, getParticipantFromRequest } from "@/lib/secret-santa/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const auth = await getParticipantFromRequest(request);
  if (auth) {
    await auth.db.from("ss_sessions").delete().eq("token_hash", auth.tokenHash);
  }
  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);
  return response;
}
