/**
 * GadgetHub domain types.
 *
 * These types define the data contract between the frontend and the
 * (upcoming) backend API. The backend team should return JSON matching
 * these shapes — see src/lib/api.ts and API_INTEGRATION.md.
 */

export type CategorySlug =
  | 'phones'
  | 'laptops'
  | 'smartwatches'
  | 'audio'
  | 'cameras'
  | 'gaming'
  | 'accessories';

export type PriceSignal =
  | 'Stable'
  | 'Slight increase'
  | 'Good value'
  | 'High demand'
  | 'Budget friendly'
  | 'Premium price'
  | 'Value watch'
  | 'Mixed'
  | 'High risk';

export interface Product {
  id: string;
  slug: string;
  rank?: number;
  name: string;
  brand: string;
  category: CategorySlug;
  categoryLabel: string;
  confidence: number; // AI confidence score, 0–100
  rating: number; // average owner rating out of 5
  reviewCount: number;
  bestFor: string;
  topConcern: string;
  priceMin: number; // in Naira
  priceMax: number;
  bestValue?: number;
  priceSignal: PriceSignal;
  sellerCount: number;
  warranty: string;
  strength?: string;
  complaint?: string;
  pickLabel?: string; // e.g. "Best Overall", "Best Value"
  audience?: string; // e.g. "Students, business, writers"
  imageTone: 'blue' | 'purple' | 'dark' | 'gold' | 'silver' | 'green' | 'red';
  deviceKind: 'phone' | 'laptop' | 'watch' | 'headphones' | 'earbuds' | 'camera';
  highlights?: string[]; // why it's recommended
  description?: string;
}

export interface Seller {
  id: string;
  name: string;
  area: string; // e.g. "Ikeja, Lagos"
  city: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  trustScore: number; // 0–100
  openStatus: string; // e.g. "Open now" | "Closes 9:00 PM"
  stock: string;
  price?: number;
  warranty: string;
  specialty: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  verifiedOwner: boolean;
  productId: string;
  productName: string;
  sellerName: string;
  condition: 'Brand New' | 'UK Used' | 'Open Box';
  rating: number;
  title: string;
  body: string;
  liked: string[];
  disliked: string[];
  helpfulCount: number;
  commentCount: number;
  photoCount: number;
  timeAgo: string;
}

export interface Discussion {
  id: string;
  author: string;
  location: string;
  title: string;
  tags: string[];
  answers: number;
  helpful: number;
  views: string;
  timeAgo: string;
  badges: string[]; // e.g. "AI Summary", "Verified Owner Replies", "Accepted Answer"
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  badge: string; // e.g. "Price Watch", "Scam Alert", "Gadget Launch"
  badgeTone: 'green' | 'amber' | 'red' | 'blue' | 'purple' | 'cyan';
  timeAgo: string;
  readTime: string;
  aiSummary: boolean;
  featured?: boolean;
  imageTone: Product['imageTone'];
  deviceKind: Product['deviceKind'];
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string; // e.g. "Buying Guide", "Scam Protection"
  readTime: string;
  badge?: string;
  imageTone: Product['imageTone'];
  deviceKind: Product['deviceKind'];
}

export interface Contributor {
  id: string;
  name: string;
  location: string;
  badge: string; // e.g. "Verified Owner", "Scam Watch", "Budget Expert"
  helpfulAnswers: number;
  topics: string;
}

export interface PlatformStats {
  aiQuestionsToday: number;
  ownerReviews: number;
  activeDiscussions: number;
  verifiedSellers: number;
  onlineNow: string;
}

export interface TickerItem {
  id: string;
  icon: 'review' | 'question' | 'compare' | 'seller' | 'users' | 'alert' | 'guide';
  primary: string;
  secondary: string;
  timeAgo?: string;
}

export interface ScamAlert {
  id: string;
  title: string;
  body: string;
  severity: 'warning' | 'danger' | 'info';
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

/** Auth (backend to implement — see API_INTEGRATION.md) */
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
