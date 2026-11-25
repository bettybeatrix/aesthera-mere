export type ContentCategory =
  | "About Us"
  | "FAQ"
  | "Pre-Treatment Care"
  | "Post-Treatment Care"
  | "Blog Posts"
  | "Privacy Policy"
  | "Terms & Conditions"
  | "Contact Details"
  | "Clinic Hours";

export type ContentStatus = "published" | "draft";

export type ContentEntry = {
  id: string;
  category: ContentCategory;
  title: string;
  body: string;
  status: ContentStatus;
  updatedAt: string;
};
