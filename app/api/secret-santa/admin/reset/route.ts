import { NextRequest, NextResponse } from "next/server";
import { getSecretSantaDb, isValidSetupKey } from "@/lib/secret-santa/server";

export const runtime = "nodejs";

// Organizer-only reset for rehearsal. Keeps the 13 participant accounts and
// their access-code hashes; removes only wishlists, assignments, and sessions.
export async function POST(request: NextRequest) {
  if (!isValidSetupKey(request)) {
    return NextResponse.json({ error: "Invalid organizer key." }, { status: 401 });
  }

  try {
    const db = getSecretSantaDb();
    const { count, error: countError } = await db
      .from("ss_participants")
      .select("id", { count: "exact", head: true });
    if (countError) throw countError;
    if ((count ?? 0) !== 13) {
      return NextResponse.json({ error: "Reset stopped: the database does not contain exactly 13 participants." }, { status: 409 });
    }

    const { error: assignmentError } = await db
      .from("ss_assignments")
      .delete()
      .not("giver_id", "is", null);
    if (assignmentError) throw assignmentError;

    const { error: wishlistError } = await db
      .from("ss_wishlists")
      .delete()
      .not("participant_id", "is", null);
    if (wishlistError) throw wishlistError;

    const { error: sessionError } = await db
      .from("ss_sessions")
      .delete()
      .not("token_hash", "is", null);
    if (sessionError) throw sessionError;

    return NextResponse.json({
      success: true,
      message: "Rehearsal data cleared. All 13 participant accounts and access codes were kept. Everyone can submit a fresh wishlist for the real exchange.",
    });
  } catch {
    return NextResponse.json({ error: "Reset failed. No success was reported; please refresh the dashboard and inspect the database before retrying." }, { status: 500 });
  }
}
