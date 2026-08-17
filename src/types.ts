export interface ProductItem {
  id: string;
  name: string;
  category: 'bolos' | 'cones' | 'fatias' | 'doces';
  categoryLabel: string;
  description: string;
  longDescription?: string;
  flavorHighlights: string[];
  priceFormatted: string;
  priceValue: number;
  unit: string;
  image: string;
  badge?: string;
  servings?: string;
  prepTime?: string;
  isPopular?: boolean;
}

export interface OrderItem {
  product: ProductItem;
  quantity: number;
  notes?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PillarItem {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string;
}

export interface SeasonalKitItem {
  id: string;
  name: string;
  tagline: string;
  theme: 'presentes' | 'romantico' | 'festas' | 'aniversario';
  themeLabel: string;
  description: string;
  itemsIncluded: string[];
  microBadges: { label: string; icon?: string }[];
  priceFormatted: string;
  priceValue: number;
  image: string;
  leadTime: string;
  isFeatured?: boolean;
  defaultCardMessage: string;
}
