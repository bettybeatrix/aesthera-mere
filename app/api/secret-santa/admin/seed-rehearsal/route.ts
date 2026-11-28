import { NextRequest, NextResponse } from "next/server";
import { getSecretSantaDb, isValidSetupKey } from "@/lib/secret-santa/server";

export const runtime = "nodejs";

const sampleWishlists = [
  { name: "Ma'am Zophia", gift_ideas: ["Scented candle", "Silk pillowcase", "Skincare set"], preferred_colors: "White, beige, silver", preferred_style: "Elegant and minimalist", avoid: "Strong fragrances", notes: "Sample rehearsal wishlist only." },
  { name: "Sir Jace", gift_ideas: ["Coffee tumbler", "Wallet", "Desk organizer"], preferred_colors: "Black, gray", preferred_style: "Practical and simple", avoid: "Decorative items", notes: "Sample rehearsal wishlist only." },
  { name: "Sir Lui", gift_ideas: ["Travel mug", "Power bank", "Notebook"], preferred_colors: "Navy, black", preferred_style: "Useful everyday items", avoid: "Perfume", notes: "Sample rehearsal wishlist only." },
  { name: "Ma'am Tarah", gift_ideas: ["Hand cream", "Makeup pouch", "Insulated bottle"], preferred_colors: "Pink, neutral", preferred_style: "Soft and feminine", avoid: "Very sweet scents", notes: "Sample rehearsal wishlist only." },
  { name: "Ma'am Chi", gift_ideas: ["Planner", "Compact mirror", "Tea set"], preferred_colors: "Pastel, white", preferred_style: "Minimalist", avoid: "Large items", notes: "Sample rehearsal wishlist only." },
  { name: "Ma'am Mae", gift_ideas: ["Tumbler", "Scented lotion", "Small pouch"], preferred_colors: "Cream, brown", preferred_style: "Cozy and practical", avoid: "Strong scents", notes: "Sample rehearsal wishlist only." },
  { name: "Ma'am Danna", gift_ideas: ["Journal", "Hair accessories", "Body mist"], preferred_colors: "Lavender, white", preferred_style: "Cute and simple", avoid: "Oversized items", notes: "Sample rehearsal wishlist only." },
  { name: "Ma'am Acel", gift_ideas: ["Coffee cup", "Hand cream", "Tote bag"], preferred_colors: "Gray, beige", preferred_style: "Classic", avoid: "Bright neon colors", notes: "Sample rehearsal wishlist only." },
  { name: "Sir Popoy", gift_ideas: ["Cap", "Coffee tumbler", "Phone stand"], preferred_colors: "Black, blue", preferred_style: "Casual and useful", avoid: "Scented products", notes: "Sample rehearsal wishlist only." },
  { name: "Doc Ian", gift_ideas: ["Insulated mug", "Desk accessory", "Notebook"], preferred_colors: "Black, silver", preferred_style: "Functional", avoid: "Decorations", notes: "Sample rehearsal wishlist only." },
  { name: "Doc Raine", gift_ideas: ["Skincare pouch", "Hand cream", "Planner"], preferred_colors: "White, blush", preferred_style: "Clean and elegant", avoid: "Heavy fragrances", notes: "Sample rehearsal wishlist only." },
  { name: "Cianna", gift_ideas: ["Lip balm", "Mini bag", "Book"], preferred_colors: "Silver, pink", preferred_style: "Cute, minimalist", avoid: "Large mugs", notes: "Sample rehearsal wishlist only." },
  { name: "James", gift_ideas: ["Wallet", "Cap", "Portable charger"], preferred_colors: "Black, gray", preferred_style: "Practical", avoid: "Perfume", notes: "Sample rehearsal wishlist only." },
];

export async function POST(request: NextRequest) {
  if (!isValidSetupKey(request)) return NextResponse.json({ error: "Invalid organizer key." }, { status: 401 });

  try {
    const db = getSecretSantaDb();
    const { data: people, error: peopleError } = await db.from("ss_participants").select("id, name");
    if (peopleError) throw peopleError;
    if (!people || people.length !== 13) return NextResponse.json({ error: "Expected exactly 13 real participant accounts." }, { status: 409 });

    const { count: existingAssignments, error: assignmentCheckError } = await db
      .from("ss_assignments").select("giver_id", { count: "exact", head: true });
    if (assignmentCheckError) throw assignmentCheckError;
    if ((existingAssignments ?? 0) > 0) return NextResponse.json({ error: "A draw already exists. Rehearsal seeding is blocked to protect assignments." }, { status: 409 });

    const sampleByName = new Map(sampleWishlists.map((item) => [item.name, item]));
    const rows = people.map((person) => {
      const sample = sampleByName.get(person.name);
      if (!sample) throw new Error("Participant list does not match the prepared rehearsal data.");
      return {
        participant_id: person.id,
        gift_ideas: sample.gift_ideas,
        preferred_colors: sample.preferred_colors,
        preferred_style: sample.preferred_style,
        avoid: sample.avoid,
        notes: sample.notes,
        updated_at: new Date().toISOString(),
      };
    });

    const { error: wishlistError } = await db.from("ss_wishlists").upsert(rows, { onConflict: "participant_id" });
    if (wishlistError) throw wishlistError;

    const { error: drawError } = await db.rpc("draw_secret_santa");
    if (drawError) {
      await db.from("ss_wishlists").delete().in("participant_id", people.map((p) => p.id));
      throw drawError;
    }

    return NextResponse.json({
      success: true,
      message: "Rehearsal wishlists saved and a test draw completed. All 13 real participant accounts now have a temporary sample recipient.",
      participants: 13,
      wishlistsSeeded: 13,
      assignmentsCreated: 13,
      note: "After testing, use the organizer reset endpoint to clear rehearsal wishlists, assignments, and sessions while keeping participant accounts and access codes.",
    });
  } catch {
    return NextResponse.json({ error: "Rehearsal setup failed. Check the database status before retrying." }, { status: 500 });
  }
}
