export type TestimonialStatus = "pending" | "approved" | "hidden";

export type TestimonialSource =
  | "Google"
  | "Facebook"
  | "Instagram"
  | "Direct feedback"
  | "Other"
  | "Not recorded";

export type TestimonialRecord = {
  id: string;
  quote: string;
  name: string;
  detail: string;
  rating?: number;
  treatment: string;
  source: TestimonialSource;
  permissionDate: string;
  permissionReference: string;
  status: TestimonialStatus;
  isFeatured: boolean;
  isLegacy: boolean;
};
