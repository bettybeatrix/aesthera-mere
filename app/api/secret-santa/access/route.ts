import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSecretSantaDb, sha256, SESSION_COOKIE } from "@/lib/secret-santa/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const accessCode = typeof body.accessCode === "string" ? body.accessCode.trim() : "";
    if (!/^[A-Z0-9]{8,16}$/i.test(accessCode)) {
      return NextResponse.json({ error: "Please enter your valid private access code." }, { status: 400 });
    }

    const db = getSecretSantaDb();
    const { data: participant, error } = await db
      .from("ss_participants")
      .select("id, name")
      .eq("access_code_hash", sha256(accessCode.toUpperCase()))
      .maybeSingle();

    if (error || !participant) {
      return NextResponse.json({ error: "That access code wasn't recognized. Please check it and try again." }, { status: 401 });
    }

    const token = randomBytes(32).toString("base64url");
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const { error: sessionError } = await db.from("ss_sessions").insert({
      participant_id: participant.id,
      token_hash: sha256(token),
      expires_at: expiresAt,
    });

    if (sessionError) throw sessionError;

    const response = NextResponse.json({ participant: { name: participant.name } });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "We couldn't sign you in. Please try again later." }, { status: 500 });
  }
}
