import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import type { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE = "aesthera_secret_santa_session";
const SESSION_DAYS = 30;

export function getSecretSantaDb() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Secret Santa database is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

export function sha256(value: string) {
  return createHash("sha256").update(value.trim()).digest("hex");
}

export function createAccessCode() {
  return randomBytes(9).toString("base64url").slice(0, 12).toUpperCase();
}

export function isValidSetupKey(request: NextRequest) {
  const supplied = request.headers.get("x-secret-santa-setup-key") ?? "";
  const expected = process.env.SECRET_SANTA_SETUP_KEY ?? "";
  if (!supplied || !expected) return false;
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function getParticipantFromRequest(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const db = getSecretSantaDb();
  const { data: session, error } = await db
    .from("ss_sessions")
    .select("participant_id, expires_at")
    .eq("token_hash", sha256(token))
    .maybeSingle();

  if (error || !session || new Date(session.expires_at).getTime() <= Date.now()) {
    if (session) {
      await db.from("ss_sessions").delete().eq("token_hash", sha256(token));
    }
    return null;
  }

  const { data: participant, error: participantError } = await db
    .from("ss_participants")
    .select("id, name")
    .eq("id", session.participant_id)
    .maybeSingle();

  if (participantError || !participant) return null;
  return { ...participant, db, tokenHash: sha256(token) };
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
