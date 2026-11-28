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

    // The first participant to draw creates the complete one-to-one derangement atomically.
    // Later participants only reveal their own preassigned recipient.
    if ((assignmentCount ?? 0) === 0) {
      const { error: drawError } = await auth.db.rpc("draw_secret_santa");
      if (drawError) {
        // A concurrent participant may have completed the draw first. Re-check below.
        const { count: afterRace } = await auth.db
          .from("ss_assignments").select("giver_id", { count: "exact", head: true });
        if ((afterRace ?? 0) === 0) throw drawError;
      }
    }

    const { error: revealError } = await auth.db
      .from("ss_assignments")
      .update({ revealed_at: new Date().toISOString() })
      .eq("giver_id", auth.id)
      .is("revealed_at", null);
    if (revealError) throw revealError;

    return NextResponse.json({
      success: true,
      message: "Your Secret Santa recipient is ready. Keep it a secret!",
    });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
