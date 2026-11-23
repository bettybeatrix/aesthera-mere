import type { DoctorProfile } from "@/types/doctor";

/**
 * Frontend seed data mapped to the existing public Doctors page.
 * This adapter is intentionally isolated so it can later be replaced with
 * Supabase queries without changing the admin UI or DoctorProfile contract.
 *
 * Current limitation: updates made in the admin prototype are in-memory only.
 */
const MOCK_DOCTORS: DoctorProfile[] = [
  {
    id: "dr-dan",
    slug: "dr-john-daniel-co",
    name: "Dr. John Daniel Co",
    shortName: "Dr. Dan",
    title: "Aesthetic Physician",
    tagline: "Regenerative • Wellness • Aesthetic Medicine",
    image: "/images/doctors/dr-dan.png",
    biography: [
      "Dr. John Daniel Co is an aesthetic physician dedicated to providing personalized, patient-centered aesthetic care. His practice focuses on non-surgical treatments, with an emphasis on precision, safety, and natural-looking results.",
      "With experience in facial injectables, skin boosters, biostimulators, and thread lifting, Dr. Co combines aesthetic techniques with individualized treatment planning to help patients address their aesthetic concerns.",
    ],
    expertise: [
      "Facial Injectables",
      "Dermal Fillers",
      "Botulinum Toxin",
      "Skin Boosters",
      "Biostimulators",
      "Thread Lifting",
      "Mesolipo",
    ],
    credentials: [
      "University of the East Ramon Magsaysay Medical Center",
      "De La Salle University–Dasmariñas — Nursing",
    ],
    affiliations: [
      "American Academy of Aesthetic Medicine",
      "Philippine Academy of Aesthetic and Age Management Medicine",
      "Philippine Science of Skin and Aesthetic Medicine",
    ],
    isOnLeave: true,
    sortOrder: 1,
    createdAt: "2026-11-23T00:00:00.000Z",
    updatedAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: "dr-raine",
    slug: "dr-raine",
    name: "Dr. Raine",
    shortName: "Dr. Raine",
    title: "Aesthetic Physician",
    tagline: "Personalized Aesthetic & Skin Rejuvenation Care",
    image: "/images/doctors/dr-raine.png",
    biography: [
      "Dr. Raine is an aesthetic physician who focuses on personalized, evidence-based aesthetic care. Her approach combines individualized treatment planning with attention to patient safety, comfort, and naturally refined results.",
      "Her practice addresses concerns such as pigmentation, acne, and skin rejuvenation. She has experience in aesthetic injectables, dermal fillers, biostimulators, and other non-surgical aesthetic treatments.",
    ],
    expertise: [
      "Skin Rejuvenation",
      "Pigmentation & Acne Concerns",
      "Aesthetic Injectables",
      "Dermal Fillers",
      "Biostimulators",
      "Lipolytics",
      "Personalized Treatment Planning",
    ],
    credentials: [
      "University of the East Ramon Magsaysay Medical Center, Inc. — College of Medicine",
      "Postgraduate Internship — Jose Reyes Memorial Medical Center",
      "ECFMG-Certified",
    ],
    affiliations: [
      "Philippine Science of Skin and Aesthetic Medicine",
      "American Academy of Aesthetic Medicine",
    ],
    isOnLeave: true,
    sortOrder: 2,
    createdAt: "2026-11-23T00:00:00.000Z",
    updatedAt: "2026-11-23T00:00:00.000Z",
  },
  {
    id: "dr-ian",
    slug: "dr-ian",
    name: "Dr. Ian",
    shortName: "Dr. Ian",
    title: "Doctor Profile",
    tagline: "",
    image: "",
    biography: [],
    expertise: [],
    credentials: [],
    affiliations: [],
    isOnLeave: false,
    sortOrder: 3,
    createdAt: "2026-11-23T00:00:00.000Z",
    updatedAt: "2026-11-23T00:00:00.000Z",
  },
];

export async function getDoctorProfiles(): Promise<DoctorProfile[]> {
  return [...MOCK_DOCTORS].sort((a, b) => a.sortOrder - b.sortOrder);
}
