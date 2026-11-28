import { NextRequest, NextResponse } from "next/server";
import { errorMessage, getParticipantFromRequest } from "@/lib/secret-santa/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const auth = await getParticipantFromRequest(request);
    if (!auth) return NextResponse.json({ error: "Please sign in with your private access code." }, { status: 401 });

    const { data: wishlist } = await auth.db
      .from("ss_wishlists")
      .select("gift_ideas, preferred_colors, preferred_style, avoid, notes")
      .eq("participant_id", auth.id)
      .maybeSingle();

    const { data: assignment } = await auth.db
      .from("ss_assignments")
      .select("recipient_id")
      .eq("giver_id", auth.id)
      .maybeSingle();

    let recipient = null;
    if (assignment?.recipient_id) {
      const { data: person } = await auth.db
        .from("ss_participants")
        .select("id, name")
        .eq("id", assignment.recipient_id)
        .maybeSingle();

      if (person) {
        const { data: recipientWishlist } = await auth.db
          .from("ss_wishlists")
          .select("gift_ideas, preferred_colors, preferred_style, avoid, notes")
          .eq("participant_id", person.id)
          .maybeSingle();
        recipient = { name: person.name, wishlist: recipientWishlist };
      }
    }

    const { count: submittedCount } = await auth.db
      .from("ss_wishlists")
      .select("participant_id", { count: "exact", head: true });

    const { count: participantCount } = await auth.db
      .from("ss_participants")
      .select("id", { count: "exact", head: true });

    return NextResponse.json({
      participant: { id: auth.id, name: auth.name },
      wishlist: wishlist ?? null,
      hasDrawn: Boolean(assignment),
      recipient,
      progress: { submitted: submittedCount ?? 0, total: participantCount ?? 13 },
    });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
