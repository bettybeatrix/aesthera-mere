import { NextRequest, NextResponse } from "next/server";
import { getSecretSantaDb, isValidSetupKey } from "@/lib/secret-santa/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isValidSetupKey(request)) {
    return NextResponse.json({ error: "Unauthorized draw request." }, { status: 401 });
  }

  try {
    const db = getSecretSantaDb();
    const { error } = await db.rpc("draw_secret_santa");
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: "The Secret Santa draw is complete. Each participant can now privately view their recipient." });
  } catch {
    return NextResponse.json({ error: "The draw could not be completed. Check that all participants have submitted their wishlists." }, { status: 500 });
  }
}
