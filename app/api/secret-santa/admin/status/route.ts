import { NextRequest, NextResponse } from "next/server";
import { getSecretSantaDb, isValidSetupKey } from "@/lib/secret-santa/server";
export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  if (!isValidSetupKey(request)) return NextResponse.json({ error: "Invalid organizer key." }, { status: 401 });
  try {
    const db = getSecretSantaDb();
    const [{ data: people, error: peopleError }, { data: wishlists, error: wishlistError }, { data: assignments, error: assignmentError }] = await Promise.all([
      db.from("ss_participants").select("id, name").order("name"),
      db.from("ss_wishlists").select("participant_id"),
      db.from("ss_assignments").select("giver_id, recipient_id"),
    ]);
    if (peopleError || wishlistError || assignmentError) throw peopleError || wishlistError || assignmentError;
    const wishlistIds = new Set((wishlists ?? []).map((x) => x.participant_id));
    const rows = (people ?? []).map((p) => ({ name: p.name, wishlistSubmitted: wishlistIds.has(p.id) }));
    const pairs = assignments ?? [];
    const giverIds = new Set(pairs.map((x) => x.giver_id));
    const recipientIds = new Set(pairs.map((x) => x.recipient_id));
    const selfAssignments = pairs.filter((x) => x.giver_id === x.recipient_id).length;
    return NextResponse.json({
      participants: rows,
      total: rows.length,
      wishlistsSubmitted: wishlistIds.size,
      assignments: pairs.length,
      uniqueRecipients: recipientIds.size,
      missingGivers: rows.length - giverIds.size,
      missingRecipients: rows.length - recipientIds.size,
      selfAssignments,
      drawComplete: rows.length === 13 && pairs.length === 13 && recipientIds.size === 13 && selfAssignments === 0,
    });
  } catch {
    return NextResponse.json({ error: "Unable to read Secret Santa status. Check the database configuration." }, { status: 500 });
  }
}
