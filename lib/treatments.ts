import { treatmentCategories } from "@/data/treatments";
import type { Treatment } from "@/data/treatments";
import type { ManagedTreatment } from "@/types/managed-treatment";

/**
 * Frontend adapter based on the current public treatment catalogue.
 * Replace this adapter with database queries when the backend is ready.
 */
const now = "2026-11-23T00:00:00.000Z";

const MOCK_TREATMENTS: ManagedTreatment[] = treatmentCategories.flatMap(
  (category, categoryIndex) =>
    category.groups.flatMap((group, groupIndex) =>
      group.treatments.map((treatment, treatmentIndex) => ({
        ...treatment,
        id: `${category.slug}-${group.slug}-${treatment.slug}`,
        categorySlug: category.slug,
        categoryName: category.name,
        groupSlug: group.slug,
        groupName: group.title,
        isPublished: true,
        sortOrder: categoryIndex * 1000 + groupIndex * 100 + treatmentIndex,
        createdAt: now,
        updatedAt: now,
      })),
    ),
);

export async function getManagedTreatments(): Promise<ManagedTreatment[]> {
  return [...MOCK_TREATMENTS].sort((a, b) => a.sortOrder - b.sortOrder);
}

export type PublicTreatmentShape = Pick<
  Treatment,
  | "slug"
  | "name"
  | "description"
  | "price"
  | "packagePrice"
  | "priceNote"
  | "priceLabel"
  | "image"
  | "imageAvailable"
  | "benefits"
  | "duration"
  | "sessions"
  | "downtime"
  | "collection"
>;
