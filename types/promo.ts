export type PromoCategory =
  | "all"
  | "launch"
  | "facials"
  | "injectables"
  | "contour";

export interface PromoCard {
  id: string;
  title: string;
  category: Exclude<PromoCategory, "all">;
  categoryLabel: string;
  badge: string;
  subtitle: string;

  /** Numeric price when the offer has a fixed numeric price. */
  promoPrice?: number;
  /** Display text for percentage/free/starting-price offers. */
  promoPriceLabel?: string;

  /** Numeric regular price when the source provides one. */
  regularPrice?: number;
  /** Display text when a regular price is not supplied as a number. */
  regularPriceLabel?: string;

  savings?: string;
  description: string;
  recommendedFor?: string[];
  inclusions: string[];
  image: string;
  bonusText?: string;
  /** Display validity for the current frontend offer. */
  validity?: string;
  /** Offer conditions shown in the details view. */
  terms?: string[];
  /** ISO date after which the offer must not be displayed (YYYY-MM-DD). */
  validUntil?: string;
  /** Optional explicit discount label for offers with tiered or per-unit pricing. */
  discountLabel?: string;
  /** Session count or package structure displayed in the details view. */
  sessions?: string;
  publishedAt?: string;
  isActive?: boolean;
}

export interface PricingRow {
  name: string;
  regular: number;
  promo: number;
  package: number;
  effective: number;
}

export interface PricingTable {
  id: string;
  title: string;
  subtitle: string;
  packageType: "5+1" | "10+2";
  rows: PricingRow[];
}
