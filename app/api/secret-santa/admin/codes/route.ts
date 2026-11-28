import { NextRequest, NextResponse } from "next/server";
import { createAccessCode, getSecretSantaDb, isValidSetupKey, sha256 } from "@/lib/secret-santa/server";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  if (!isValidSetupKey(request)) return NextResponse.json({ error: "Invalid organizer key." }, { status: 401 });
  try {
    const db = getSecretSantaDb();
    const { data: people, error } = await db.from("ss_participants").select("id, name").order("name");
    if (error) throw error;
    if (!people || people.length !== 13) return NextResponse.json({ error: "Expected exactly 13 initialized participants." }, { status: 400 });
    const { count, error: assignmentError } = await db.from("ss_assignments").select("giver_id", { count: "exact", head: true });
    if (assignmentError) throw assignmentError;
    if ((count ?? 0) > 0) return NextResponse.json({ error: "Access codes cannot be reset after the draw has been completed." }, { status: 409 });

    const issued = people.map((person) => ({ id: person.id, name: person.name, accessCode: createAccessCode() }));
    for (const person of issued) {
      const { error: updateError } = await db.from("ss_participants")
        .update({ access_code_hash: sha256(person.accessCode) }).eq("id", person.id);
      if (updateError) throw updateError;
      await db.from("ss_sessions").delete().eq("participant_id", person.id);
    }
    return NextResponse.json({
      message: "New access codes generated. Save and distribute each code privately; they will not be shown again.",
      accessCodes: issued.map(({ name, accessCode }) => ({ name, accessCode })),
    });
  } catch {
    return NextResponse.json({ error: "Could not generate new codes. Please refresh the organizer dashboard and try again." }, { status: 500 });
  }
}
