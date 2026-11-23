import type { Treatment } from "@/data/treatments";

export interface ManagedTreatment extends Treatment {
  id: string;
  categorySlug: string;
  categoryName: string;
  groupSlug: string;
  groupName: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type ManagedTreatmentInput = Omit<
  ManagedTreatment,
  "id" | "createdAt" | "updatedAt"
>;
