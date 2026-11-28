import { NextRequest, NextResponse } from "next/server";
import { errorMessage, getParticipantFromRequest } from "@/lib/secret-santa/server";

export const runtime = "nodejs";

export async function PUT(request: NextRequest) {
  try {
    const auth = await getParticipantFromRequest(request);
    if (!auth) return NextResponse.json({ error: "Please sign in with your private access code." }, { status: 401 });

    const { count: assignmentCount, error: assignmentCheckError } = await auth.db
      .from("ss_assignments")
      .select("giver_id", { count: "exact", head: true });
    if (assignmentCheckError) throw assignmentCheckError;
    if ((assignmentCount ?? 0) > 0) {
      return NextResponse.json({ error: "Wishlists are locked because the Secret Santa draw has started." }, { status: 423 });
    }

    const body = await request.json();
    const giftIdeas = Array.isArray(body.giftIdeas)
      ? body.giftIdeas.filter((item: unknown): item is string => typeof item === "string").map((item: string) => item.trim()).filter(Boolean).slice(0, 5)
      : [];

    if (giftIdeas.length < 1) {
      return NextResponse.json({ error: "Please add at least one gift idea to your wishlist." }, { status: 400 });
    }

    const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
    const { error } = await auth.db.from("ss_wishlists").upsert({
      participant_id: auth.id,
      gift_ideas: giftIdeas,
      preferred_colors: clean(body.preferredColors, 160),
      preferred_style: clean(body.preferredStyle, 160),
      avoid: clean(body.avoid, 300),
      notes: clean(body.notes, 500),
      updated_at: new Date().toISOString(),
    }, { onConflict: "participant_id" });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
