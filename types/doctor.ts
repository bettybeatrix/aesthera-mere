export interface DoctorProfile {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  image: string;
  biography: string[];
  expertise: string[];
  credentials: string[];
  affiliations: string[];
  isOnLeave: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type DoctorProfileInput = Omit<
  DoctorProfile,
  "id" | "createdAt" | "updatedAt"
>;
