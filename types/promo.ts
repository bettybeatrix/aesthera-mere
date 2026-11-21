/**
 * Promo types for Aesthera Mère
 *
 * These interfaces mirror what the backend / Supabase table will return.
 * When the admin panel is built, the API response should match these shapes
 * exactly so the frontend needs zero changes.
 */

export type PromoCategory =
  | "all"
  | "launch"
  | "facials"
  | "injectables"
  | "contour";

export interface PromoCard {
  id: string;
  title: string;
  category: PromoCategory;
  categoryLabel: string;
  badge: string;
  subtitle: string;
  promoPrice: string;
  regularPrice?: string;
  savings?: string;
  description: string;
  recommendedFor?: string[];
  inclusions: string[];
  /**
   * Image URL.
   * - Frontend-only: a relative path like "/images/promotions/ultraformer-mpt.jpg"
   * - With backend: a fully-qualified URL from Supabase Storage or CDN,
   *   e.g. "https://<project>.supabase.co/storage/v1/object/public/promos/ultraformer-mpt.jpg"
   */
  image: string;
  bonusText?: string;
  /** ISO date string — set by admin, used to sort by newest */
  publishedAt?: string;
  /** If false, card is hidden without deleting the record */
  isActive?: boolean;
}

export interface PricingRow {
  name: string;
  regular: string;
  promo: string;
  package: string;
  effective: string;
}

export interface PricingTable {
  id: string;
  title: string;
  subtitle: string;
  packageType: "5+1" | "10+2";
  rows: PricingRow[];
}
