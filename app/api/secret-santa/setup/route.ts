import { NextRequest, NextResponse } from "next/server";
import { createAccessCode, getSecretSantaDb, isValidSetupKey, sha256 } from "@/lib/secret-santa/server";

export const runtime = "nodejs";

const participants = [
  "Ma'am Zophia",
  "Sir Jace",
  "Sir Lui",
  "Ma'am Tarah",
  "Ma'am Chi",
  "Ma'am Mae",
  "Ma'am Danna",
  "Ma'am Acel",
  "Sir Popoy",
  "Doc Ian",
  "Doc Raine",
  "Cianna",
  "James",
];

export async function POST(request: NextRequest) {
  if (!isValidSetupKey(request)) {
    return NextResponse.json({ error: "Unauthorized setup request." }, { status: 401 });
  }

  try {
    const db = getSecretSantaDb();
    const { count, error: countError } = await db
      .from("ss_participants")
      .select("id", { count: "exact", head: true });

    if (countError) throw countError;
    if ((count ?? 0) > 0) {
      return NextResponse.json({ error: "Participants have already been initialized. Setup cannot be repeated." }, { status: 409 });
    }

    const issued = participants.map((name) => {
      const accessCode = createAccessCode();
      return { name, accessCode, access_code_hash: sha256(accessCode) };
    });

    const { error } = await db.from("ss_participants").insert(
      issued.map(({ name, access_code_hash }) => ({ name, access_code_hash }))
    );
    if (error) throw error;

    return NextResponse.json({
      message: "Participants initialized. Save and privately distribute these access codes; they cannot be retrieved again.",
      accessCodes: issued.map(({ name, accessCode }) => ({ name, accessCode })),
    });
  } catch {
    return NextResponse.json({ error: "Setup failed. Confirm the database migration and environment variables." }, { status: 500 });
  }
}
