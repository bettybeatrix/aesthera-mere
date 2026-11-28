import { NextRequest, NextResponse } from "next/server";
import { errorMessage, getParticipantFromRequest } from "@/lib/secret-santa/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const auth = await getParticipantFromRequest(request);
    if (!auth) return NextResponse.json({ error: "Please sign in with your private access code." }, { status: 401 });

    const { count: wishlistCount, error: wishlistError } = await auth.db
      .from("ss_wishlists").select("participant_id", { count: "exact", head: true });
    if (wishlistError) throw wishlistError;
    const { count: participantCount, error: participantError } = await auth.db
      .from("ss_participants").select("id", { count: "exact", head: true });
    if (participantError) throw participantError;

    if ((participantCount ?? 0) !== 13 || (wishlistCount ?? 0) !== 13) {
      return NextResponse.json({
        error: "The draw will open once all 13 participants have submitted their wishlists.",
        wishlistsSubmitted: wishlistCount ?? 0,
        participants: participantCount ?? 0,
      }, { status: 409 });
    }

    const { count: assignmentCount, error: assignmentError } = await auth.db
      .from("ss_assignments").select("giver_id", { count: "exact", head: true });
    if (assignmentError) throw assignmentError;

    // First participant to press Draw creates all 13 unique, no-self assignments atomically.
    // Every subsequent participant only views their own already-created assignment.
    if ((assignmentCount ?? 0) === 0) {
      const { error: drawError } = await auth.db.rpc("draw_secret_santa");
      if (drawError) {
        const { count: afterRace, error: raceError } = await auth.db
          .from("ss_assignments").select("giver_id", { count: "exact", head: true });
        if (raceError) throw raceError;
        if ((afterRace ?? 0) !== 13) throw drawError;
      }
    }

    const { data: ownAssignment, error: ownError } = await auth.db
      .from("ss_assignments").select("recipient_id").eq("giver_id", auth.id).maybeSingle();
    if (ownError) throw ownError;
    if (!ownAssignment) {
      return NextResponse.json({ error: "Your assignment could not be found. Please contact the organizer." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Your Secret Santa recipient is ready. Keep it a secret!",
    });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
